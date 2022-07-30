new Vue({
    el: '#content',
    data: {
        //主页面相关数据
        tableData: [],
        diaMsg: '',
        // 新增参数
        id:'',
        userGroup:'',
        quanyiList:[],
        groupList:[],
        selectType:'',
        canSelectCount:'',//可选个数
        packageDesc:'',
        // 查询用
        userGroups:'',
        userGroupName:'',
        id:'',
        // 修改传序列号
        serialno:'',
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        totalPage: 0,
        pageMaxNum: 10,
        condition: "",
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
    mounted: function () {
        var _this = this;
        var dialogs = ['info','add','revise','del','detail','putAdd','putUpdate','delete'];
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

        $('#quanyiList,#quanyiList1').chosen({     //期限
            search_contains: true,
            no_results_text: '未找到该数据',
            disable_search_threshold: 6,
            width: '150px'
        });
        $('#quanyiList,#quanyiList1').on('change', function (e, params) {
            if(params && params.selected){
                if(this.quanyiList.indexOf(params.selected) === -1){ // 未选
                    this.quanyiList.push(params.selected);
                }
            }
            if(params && params.deselected){
                if(this.quanyiList.indexOf(params.deselected) > -1){ // 已选
                    var index = this.quanyiList.indexOf(params.deselected);
                    this.quanyiList.splice(index,1);
                }
            }
        }.bind(this));
        this.getTableData(0);
        this.rightPackage();
        this.rightGroupId();
    },
    methods: {
        rightGroupId:function(){  //客群Id
            var _this=this;
            var params = {};
            params.status ='1';
            $.post({
                url: '/awardMgmt/highNetWorthEquityMgmt/interestRelationConfig/rightGroupParam.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        // console.log(result.data.body)
                        _this.groupList=result.data.body;
                    }else {
                        _this.showDialog('', 'info', true, result.msg);
                    }
                }
            });
        },

        rightPackage:function(){  //权益包
            var _this=this;
            var params = {};
            params.pageNo ='1';
            params.pageSize ='9999';
            $.post({
                url: '/awardMgmt/highNetWorthEquityMgmt/interestRelationConfig/rightPackageParam.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        var str = '<option value=""></option>';
                        result.data.body.rows.forEach(function (item) {
                            str += '<option value="' + item.id + '">' + item.id + '-' + item.rightPackageName + '</option>';
                        });
                        $('#quanyiList,#quanyiList1').html(str);
                        $('#quanyiList,#quanyiList1').val(this.quanyiList);
                        $('#quanyiList,#quanyiList1').trigger('chosen:updated');

                    }else {
                        _this.showDialog('', 'info', true, result.msg);
                    }
                }
            });
        },

        getTableData: function (currentIndex) {
            var _this = this;
            var params = {};
            params.userGroup = this.userGroups;
            $.post({
                url: '/awardMgmt/highNetWorthEquityMgmt/interestRelationConfig/getTableData.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.currentIndex = 0;
                        _this.tableData = result.data.tableData;
                        // _this.tableData = result.data.tableData.filter(function (item) {
                        //     return item.bundleno.indexOf(params.bundleno) > -1
                        //         && item.startDate.indexOf(params.startDate) > -1;
                        // });
                        console.log(_this.tableData)
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
            var _this=this;
            this.userGroup ="";
            this.userGroupName="";
			this.canSelectCount="";
			this.quanyiList=[];
			this.packageDesc="";
			this.showDialog('', 'add');
        },
        // 新增必填弹框
        diaInfoCheck: function () {
            var _this = this;
            // if (this.shiftType==""||isNaN(Number(this.shiftType))) {
            //     this.showDialog('add', 'info', true, '车次号不能为空');
            //     return false;
            // }
            // if (this.shiftType.length>2) {
            //     this.showDialog('add', 'info', true, '主题不能为空');
            //     return false;
            // }
            if (!this.bundleno) {
                this.showDialog('add', 'info', true, '车次号不能为空');
                return false;
            }
            if (!this.bundleTopic) {
                this.showDialog('add', 'info', true, '主题不能为空');
                return false;
            }
            // if (!this.startDate) {
            //     this.showDialog('add', 'info', true, '发车日期不能为空');
            //     return false;
            // }
            if (!$("#startDate").val()) {
                this.showDialog('add', 'info', true, '发车日期不能为空');
                return false;
            }
            if (!this.isEnable) {
                this.showDialog('add', 'info', true, '请选择是否启用');
                return false;
            }
            return true;
        },
        saveParam:function(){
            var _this=this;
            // if (this.diaInfoCheck()) {
                var params={}
                // var time= this.$refs.startDates.value;
                params.userGroup=this.userGroup;
                params.canSelectCount=this.canSelectCount;
                params.quanyiList=this.quanyiList.toString();
                params.packageDesc=this.packageDesc;
                // params.startDate=time.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1$2$3');
                console.log(params);
                $.post({
                    url: '/awardMgmt/highNetWorthEquityMgmt/interestRelationConfig/saveParam.ajax',
                    data: params,
                    success: function (result) {
                        if (result.error === 0) {
                            _this.getTableData(0);
                            _this.showDialog('add', 'info', false, result.msg);
                        }else {
                            _this.showDialog('add', 'info', true, result.msg);
                        }
                    }
                });
            // }
        },
        // 修改数据
        showUpdate:function (item) {
            var _this=this;
            this.id=item.id;
            this.userGroup =item.userGroup ;
            this.canSelectCount=item.canSelectCount;
            this.packageDesc=item.packageDesc;
            var arrList=item.rightPackageList.split(",");
            _this.quanyiList=arrList;
            $('#quanyiList1').val(_this.quanyiList);
            $('#quanyiList1').trigger('chosen:updated');
            this.showDialog('', 'revise');
        },
        update: function () {
            var _this = this;
            var params = {};
            params.id=this.id;
            params.userGroup=this.userGroup;
            params.canSelectCount=this.canSelectCount;
            params.quanyiList=this.quanyiList.toString();
            params.packageDesc=this.packageDesc;
            console.log(params);
            $.post({
                url: '/awardMgmt/highNetWorthEquityMgmt/interestRelationConfig/update.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(0);
                        _this.showDialog('revise', 'info', false, result.msg);
                    }
                    _this.showDialog('revise', 'info', false, result.msg);
                }
            });
        },
        // 删除
        showDelete: function(item) {
            this.id =item.id;
            this.showDialog('', 'del');
        },
        del: function() {
            var _this = this;
            var params = {};
            params.id = this.id;
            console.log(params);
            $.post({
                url: '/awardMgmt/highNetWorthEquityMgmt/interestRelationConfig/deleteParam.ajax',
                data: params,
                success: function(result) {
                    if (result.error === 0) {
                        _this.getTableData();
                        _this.showDialog('del', 'info', false, result.msg);
                    } else {
                        _this.showDialog('del', 'info', true, result.msg);
                    }
                }
            });
        },

        // 管理基金
        showFund:function(item){
            var _this=this;
            this.bundleno = item.bundleno;
            var params={}
            params.bundleno=item.bundleno
            $.post({
                url: '/businessMgmt/productInfoConfig/freeRideProductConfig/showFund.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.detailList=result.data.body;
                    }else{
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
            _this.showDialog('', 'detail', false);
        },

        dataSummary: function (asynData,value, label, dom) {
            if (asynData && asynData.length > 0) {
                var data = [];
                for (var i = 0; i < asynData.length; i++) {
                    data.push({
                        value: asynData[i].fundId,
                        label: asynData[i].fundId+"-"+asynData[i].fundName
                    });
                }
                $("#" + dom).multiselect('dataprovider', data);
            }
        },

        filterToId:function(val){
            var str='';
            var _this=this;
            _this.allList.forEach(function(item){
                if(item.fundId==val){
                    str=item.fundName
                }
            })
            return str;
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
    filters:{
        isDisplay: function (item) {
            if (item) {
                return item.replace(/Y/g, '是(Y)').replace(/N/g, '否(N)')
            }
        },
        selectType: function (item) {
            if (item) {
                return item.replace(/62/g, '六选2').replace(/51/g, '五选一')
            }
        },
    }
});
