new Vue({
    el: '#content',
    data: {
        //主页面相关数据
        tableData: [],
        diaMsg: '',
        // 新增参数
        groupid:"",
        shiftType:"",
        totalPeriod:"",
        defaultEndOperation: "",
        optionalEndOperations: "",
        bidEndDate:"",
        bidEndTime:"",
        bidStartDate:"",
        bidStartTime:"",
        operationEndDate: "",
        operationEndTime:"",
        // 运作可选操作
        // optionalList:["01","02","03"],
        //时间转换
        moment: moment,
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        totalPage: 0,
        pageMaxNum: 10,
        condition: "",
        // 所有系列描述
        SeriesList:[],
        // 新加入字段
        endTransformerGroup:"",
        isShow:false,
        isShow2:false,
    },
    mounted: function () {
        var _this = this;
        var dialogs = ['info','add','revise'];
        dialogs.forEach(function (id) {
            $('#' + id).on('shown.bs.modal', function () {
                var $this = $(this);
                var dialog = $this.find('.modal-dialog');
                var top = ($(window).height() - dialog.height()) / 2;
                dialog.css({
                    marginTop: top
                });
            });
        });
        $('.date-timepicker').datetimepicker({
            format: 'YYYY-MM-DD HH:mm:ss',//use this option to display seconds
            icons: {
                time: 'fa fa-clock-o',
                date: 'fa fa-calendar',
                up: 'fa fa-chevron-up',
                down: 'fa fa-chevron-down',
                previous: 'fa fa-chevron-left',
                next: 'fa fa-chevron-right',
                today: 'fa fa-arrows ',
                clear: 'fa fa-trash',
                close: 'fa fa-times'
            }
        }).next().on(ace.click_event, function () {
            $(this).prev().focus();
        });
        this.getTableData(0);
        this.getSeriesList();
    },
    computed: {
        //主表格假分页
        middleData: function () {
            var middleData = [];
            var filterData = [];
            var pageMaxNum = parseInt(this.pageMaxNum);
            var _this = this;
            this.tableData.forEach(function (jsonObj) {
                var valueArr = [];
                for (var prop in jsonObj) {
                    valueArr.push(jsonObj[prop]);
                }
                for (var i = 0, len = valueArr.length; i < len; i++) {
                    if (valueArr[i]) {
                        if (valueArr[i].toString().indexOf(_this.condition) != -1) {
                            filterData.push(jsonObj);
                            break;
                        }
                    }
                }
            });
            if (filterData.length <= pageMaxNum) {
                middleData.push(filterData);
                return middleData;
            } else {
                var i = 0;
                while ((i + 1) * pageMaxNum < filterData.length) {
                    middleData.push(filterData.slice(i * pageMaxNum, (i + 1) * pageMaxNum));
                    i++;
                }
                middleData.push(filterData.slice(i * pageMaxNum, filterData.length));
                return middleData;
            }
        },
        viewData: function () {
            var currentIndex = parseInt(this.currentIndex);
            return this.middleData[currentIndex];
        },
    },
    //选择基金数据过滤
    // viewData: function () {
    //     var filterData = [];
    //     var _this = this;
    //     console.log(_this.tableData)
    //     _this.tableData.forEach(function (item) {
    //         console.log("1111",item)
    //         if(item.groupid) {
    //             if (item.fundId.indexOf(_this.diaSearchFundId) > -1) {
    //                 filterData.push(item);
    //             }
    //         }
    //     });
    //     return filterData;
    // },

    watch: {
        // 假分页
        pageMaxNum: {
            handler: function (val, oldval) {
                this.currentIndex= 0;
            }
        },
        condition: {
            handler: function (val, oldval) {
                this.currentIndex= 0;
            }
        },
    },

    methods: {
        // 查询所有系列描述
        getSeriesList:function(){
            var _this = this;
            $.post({
                url: '/businessMgmt/combinationProductConfig/productParamsAdd/SeriesList.ajax',
                // data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.SeriesList = result.data.SeriesData;
                        // console.log("_this.SeriesList:",_this.SeriesList)
                    }
                    else {
                        _this.SeriesList = [];
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        getTableData: function (currentIndex) {
            var _this = this;
            var params = {};
            this.currentIndex= 0;
            // params.groupid = this.groupidList;
            params.groupid = this.groupid;

            $.post({
                url: '/businessMgmt/combinationProductConfig/productParamsAdd/getTableData.ajax',
                // data: params,
                success: function (result) {

                    if (result.error === 0) {
                        _this.currentIndex = 0;
                       if( params.groupid ==""){
                           _this.tableData = result.data.tableData
                       }else{
                           _this.tableData = result.data.tableData.filter(function (item) {
                               return item.groupid.indexOf(params.groupid) > -1
                           });
                       }

                    }
                    else {
                        _this.tableData = [];
                        _this.currentIndex = 0;
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        showAdd: function () {
            var _this=this
            this.groupid="";
            this.shiftType="";
            this.totalPeriod="";
            this.defaultEndOperation="";
            this.optionalEndOperations="";
            this.endTransformerGroup="";  //新增字段
            this.bidStartDate=$('#bidStartDate').val("");
            this.bidStartTime="";
            this.bidEndDate=$('#bidEndDate').val("");
            this.bidEndTime="";
            this.operationEndDate=$('#operationEndDate').val("");
            this.operationEndTime="";
            $("input[type='checkbox']").prop("checked",false)
            this.showDialog('', 'add');
        },
        // 新增必填弹框
        diaInfoCheck: function () {
            var _this = this;
            if (!this.groupid) {
                this.showDialog('add', 'info', true, '组合产品不能为空');
                return false;
            }
            if (!this.shiftType) {
                this.showDialog('add', 'info', true, '产品系列不能为空');
                return false;
            }
            if (!this.totalPeriod) {
                this.showDialog('add', 'info', true, '产品期数描述不能为空');
                return false;
            }
            if (!this.defaultEndOperation) {
                this.showDialog('add', 'info', true, '运作结束默认操作不能为空');
                return false;
            }
            if (!$("#bidStartDate").val()) {
                this.showDialog('add', 'info', true, '开始时间不能为空并且不能小于结束时间');
                return false;
            }
            if (!$("#bidEndDate").val()) {
                this.showDialog('add', 'info', true, '结束时间不能为空');
                return false;
            }
            if (!$("#operationEndDate").val()) {
                this.showDialog('add', 'info', true, '结束时间不能为空');
                return false;
            }

            return true;
        },
        transFormation:function(){
            var _this=this;
            var transList= "";
            $("input[type='checkbox']:checked").each(function (index, item) {
                if ($("input[type='checkbox']:checked").length - 1 == index) {
                    transList += $(this).val();
                } else {
                    transList += $(this).val() + ",";
                }
            });
            if(transList.indexOf("04")>-1){
                _this.isShow=true
            }else{
                _this.isShow=false
            }
        },
        saveParam:function(){
            var _this=this;
            var optionalList= "";
            var groupidList=[]
                // 多选
                $("input[type='checkbox']:checked").each(function (index, item) {
                    if ($("input[type='checkbox']:checked").length - 1 == index) {
                        optionalList += $(this).val();
                    } else {
                        optionalList += $(this).val() + ",";
                    }
                });
            if (this.diaInfoCheck()) {
                var params = {}
                params.groupid = this.groupid;
                params.shiftType = this.shiftType;
                params.totalPeriod = this.totalPeriod;
                params.defaultEndOperation = this.defaultEndOperation;
                params.optionalEndOperations = optionalList;
                if(optionalList.indexOf("04")>-1){
                    params.endTransformerGroup=this.endTransformerGroup||"";
                }else{
                    params.endTransformerGroup="";
                }
                params.bidStartDate = moment($('#bidStartDate').val()).format("YYYYMMDD");
                params.bidStartTime = moment($('#bidStartDate').val()).format("HHmmss");
                params.bidEndDate = moment($('#bidEndDate').val()).format("YYYYMMDD");
                params.bidEndTime = moment($('#bidEndDate').val()).format("HHmmss");
                params.operationEndDate = moment($('#operationEndDate').val()).format("YYYYMMDD");
                params.operationEndTime = moment($('#operationEndDate').val()).format("HHmmss");
                if (!params.optionalEndOperations) {
                    this.showDialog('add', 'info', true, '运作结束可选操作不能为空');
                    return false;
                }
                if (params.bidStartDate>params.bidEndDate) {
                    this.showDialog('add', 'info', true, '申购结束时间不能早于申购开始时间');
                    return false;
                }
                if (params.operationEndDate<params.bidEndDate) {
                    this.showDialog('add', 'info', true, '运作结束时间不能早于申购结束时间');
                    return false;
                }
                _this.tableData.forEach(item => {
                    groupidList.push(item.groupid)
                })
                if (groupidList.indexOf(params.groupid.toString()) != -1) {
                    return _this.showDialog('add', 'info', true, '不允许添加重复产品!');
                }
                $.post({
                    url: '/businessMgmt/combinationProductConfig/productParamsAdd/getFundGroup.ajax',
                    data: params,
                    success: function (result) {
                        if (result.error === 0) {
                            // 验证是不是发车组合
                            if(result.data.tableData!=null){
                                if(result.data.tableData.fundgroupType==="12"){
                                    console.log(params)
                                    $.post({
                                        url: '/businessMgmt/combinationProductConfig/productParamsAdd/saveParam.ajax',
                                        data: params,
                                        success: function (result) {
                                            if (result.error === 0) {
                                                _this.getTableData(0);
                                            }
                                            _this.showDialog('add', 'info', false, result.msg);
                                        }
                                    });
                                }else{
                                    _this.showDialog('add', 'info', true, '您输入的产品ID不是组合发车产品');
                                   }
                            }else{
                                _this.showDialog('add', 'info', true, '输入组合ID产品不存在');
                            }
                        }else {
                            _this.showDialog('', 'info', false, result.msg);
                        }
                    }
                });
            }
        },

        // 修改数据
        showUpdate:function (item) {
            var _this=this
            this.serialno=item.serialno;
            this.groupid=item.groupid;
            this.shiftType=item.shiftType;
            this.totalPeriod=item.totalPeriod;
            this.defaultEndOperation=item.defaultEndOperation;

            this.optionalEndOperations=item.optionalEndOperations;
            this.endTransformerGroup=item.endTransformerGroup;    //新增加字段

            var optional = this.optionalEndOperations.split(",");
            if(optional.indexOf("04")>-1){
                _this.isShow2=true
            }else{
                _this.isShow2=false
            }
            $("input[type='checkbox']").prop("checked",false)
            var inputBox=$("input[type='checkbox']")
            for (var i =0;i<inputBox.length;i++) {
                for (var n = 0; n < optional.length; n++) {
                    if (optional[n] === inputBox[i].value) {
                        inputBox[i].checked = true;
                    }
                }
            }

            this.bidStartDate=$("#bidStartDates").val(item.bidStartDate.replace(/(\d{4})(\d{2})(\d{2})/,'$1-$2-$3')+ ' ' + item.bidStartTime.replace(/(\d{2})(\d{2})(\d{2})/,'$1:$2:$3'));
            this.bidStartTime=item.bidStartTime;
            this.bidEndDate=$("#bidEndDates").val(item.bidEndDate.replace(/(\d{4})(\d{2})(\d{2})/,'$1-$2-$3')+ ' ' + item.bidEndTime.replace(/(\d{2})(\d{2})(\d{2})/,'$1:$2:$3'));
            this.bidEndTime=item.bidEndTime;
            this.operationEndDate=$("#operationEndDates").val(item.operationEndDate.replace(/(\d{4})(\d{2})(\d{2})/,'$1-$2-$3')+ ' ' + item.operationEndTime.replace(/(\d{2})(\d{2})(\d{2})/,'$1:$2:$3'));
            this.operationEndTime=item.operationEndTime;
            this.showDialog('', 'revise');
        },
        transFormations:function(){
            var _this=this;
            var transList= "";
            $("input[type='checkbox']:checked").each(function (index, item) {
                if ($("input[type='checkbox']:checked").length - 1 == index) {
                    transList += $(this).val();
                } else {
                    transList += $(this).val() + ",";
                }
            });
            if(transList.indexOf("04")>-1){
                _this.isShow2=true
            }else{
                _this.isShow2=false
            }
        },
        update: function () {
            var _this = this;
            var params = {};
            // 多选
            var optionalList = $("input[name='checkData']:checked").map(function () {
                return $(this).val();
            }).get().join(",");

            params.serialno =this.serialno;
            params.groupid=this.groupid;
            params.shiftType=this.shiftType;
            params.totalPeriod=this.totalPeriod;
            params.defaultEndOperation=this.defaultEndOperation;
            params.optionalEndOperations=optionalList;
            if(optionalList.indexOf("04")>-1){
                params.endTransformerGroup=this.endTransformerGroup||"";
            }else{
                params.endTransformerGroup="";
            }
            params.bidStartDate=moment(this.$refs.bidStartDates.value).format('YYYYMMDD');
            params.bidStartTime=moment(this.$refs.bidStartDates.value).format("HHmmss");
            params.bidEndDate=moment(this.$refs.bidEndDates.value).format('YYYYMMDD');
            params.bidEndTime=moment(this.$refs.bidEndDates.value).format("HHmmss");
            params.operationEndDate=moment(this.$refs.operationEndDates.value).format('YYYYMMDD');
            params.operationEndTime=moment(this.$refs.operationEndDates.value).format("HHmmss");
            $.post({
                url: '/businessMgmt/combinationProductConfig/productParamsAdd/update.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(0);
                        this.optionalEndOperations="";
                    }
                    _this.showDialog('revise', 'info', false, result.msg);
                }
            });
        },
        //主表格分页方法
        check: function (item) {
            item.check = !item.check;
        },
        allCheck: function () {
            var _this = this;
            var flag = this.checkAll;
            this.tableData.forEach(function (item) {
                item.check = !flag;
            });
        },
        //主表格分页方法
        prev: function () {
            this.currentIndex<= 0 ? 0 : this.currentIndex--;
        },
        next: function () {
            this.currentIndex>= this.middleData.length - 1 ? this.middleData.length - 1 : this.currentIndex++;
        },
        changeIndex: function (index) {
            this.currentIndex= index - 1;
        },
        //公共方法
        showDialog: function (dia1, dia2, callback, msg) {
            if (msg) {
                this.diaMsg = msg;
            }
            else {
                msg = '输入条件错误';
            }
            if (!dia1) {
                $('#' + dia2).modal('show');
            }
            else if (!dia2) {
                $('#' + dia1).modal('hide');
            }
            else if (!callback) {
                $('#' + dia1).on("hidden.bs.modal", function () {
                    $('#' + dia2).modal('show');
                    $('#' + dia1).off().on("hidden", "hidden.bs.modal");
                });
                $('#' + dia1).modal('hide');
            }
            else {
                $('#' + dia1).on("hidden.bs.modal", function () {
                    $('#' + dia2).on("hidden.bs.modal", function () {
                        $('#' + dia1).modal("show");
                        $('#' + dia2).off().on("hidden", "hidden.bs.modal");
                    });
                    $('#' + dia2).modal("show");
                    $('#' + dia1).off().on("hidden", "hidden.bs.modal");
                });
                $('#' + dia1).modal('hide');
            }
        },

        formatTime: function (timestamp) {
            var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
            var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
            var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
            var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
            return Y + M + D + h + m + s;
        },
        overflowHide: function (val) {
            var str = '';
            if (val) {
                str = val.toString();
                if (str.length > 10) {
                    str = str.substring(0, 10) + '...'
                }
            } else {
                str = '-'
            }
            return str;
        },
        stringTimeFat: function (val) {
            if (val) {
                if (val.length > 8) {
                    return val.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/g, '$1-$2-$3 $4:$5:$6')
                } else {
                    return val.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')
                }
            } else {
                return '-'
            }
        }
    },
    // 类型状态
    filters: {
        defaultEndOperation: function (item) {
            if(item){
                return item.replace(/01/g,'赎回').replace(/02/g,'解散').replace(/03/g,'转托管').replace(/04/g,'到期转换').replace(/05/g,'续期');
            }
        },
        optionalEndOperations: function (item) {
            if(item){
                return item.replace(/01/g,'赎回').replace(/02/g,'解散').replace(/03/g,'转托管').replace(/04/g,'到期转换').replace(/05/g,'续期');
            }
        },
    }
});
