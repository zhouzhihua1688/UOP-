new Vue({
    el: '#content',
    data: {
        //主页面相关数据
        tableData: [],
        diaMsg: '',
        // 新增参数
        rightPackageName:'',
        rightPackageTitle:'',
        rightPackageDesc:'',
        rightPackageDetail: [{
            rightNo: '',
            rightTotalCount: ''
        }],
        rightNoList:[],
        // 修改
        updatePackage:[],
        // 查询用
        id:'',
        ids:'',
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

        $('#rightNoList').chosen({     //权益编号
            search_contains: true,
            no_results_text: '未找到该数据',
            disable_search_threshold: 6,
            width: '150px'
        });
        $('#rightNoList').on('change', function (e, params) {
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
        this.rightList();
    },
    methods: {
        //获取表格数据
        rightList: function () {
            var _this = this;
            var params = {};
            params.rightNo = this.rightno;
            params.pageNo ='1';
            params.pageSize ='9999';
            $.post({
                url: '/awardMgmt/highNetWorthEquityMgmt/rightsPackageConfig/rightListParam.ajax',
                data:params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.rightNoList = result.data.rows;
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
       // 获取数据列表
        getTableData: function (currentIndex) {
            var _this = this;
            var params = {};
            params.id = this.ids;
            params.pageNo ='1';
            params.pageSize ='9999';
            $.post({
                url: '/awardMgmt/highNetWorthEquityMgmt/rightsPackageConfig/getTableData.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.currentIndex = 0;
                        _this.tableData = result.data.tableData;
                        console.log(_this.tableData)
                        if(_this.tableData==null){
                            _this.tableData=[];
                        }
                        // _this.tableData = result.data.tableData.filter(function (item) {
                        //     return item.bundleno.indexOf(params.bundleno) > -1
                        //         && item.startDate.indexOf(params.startDate) > -1;
                        // });
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

            this.rightPackageName='',
            this.rightPackageTitle='',
            this.rightPackageDesc='',
            this.rightPackageDetail= [{
                rightNo: '',
                rightTotalCount: ''
            }]
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
            // if (!this.bundleno) {
            //     this.showDialog('add', 'info', true, '车次号不能为空');
            //     return false;
            // }
            // if (!this.bundleTopic) {
            //     this.showDialog('add', 'info', true, '主题不能为空');
            //     return false;
            // }
            //
            // if (!$("#startDate").val()) {
            //     this.showDialog('add', 'info', true, '发车日期不能为空');
            //     return false;
            // }
            // if (!this.isEnable) {
            //     this.showDialog('add', 'info', true, '请选择是否启用');
            //     return false;
            // }
            // return true;
        },
        saveParam:function(){
            var _this=this;
            // if (this.diaInfoCheck()) {
                var params={}
                params.rightPackageName=this.rightPackageName;
                params.rightPackageTitle=this.rightPackageTitle;
                params.rightPackageDesc=this.rightPackageDesc;
                params.rightPackageDetail=JSON.stringify(this.rightPackageDetail);
                console.log(params)
                $.post({
                    url: '/awardMgmt/highNetWorthEquityMgmt/rightsPackageConfig/saveParam.ajax',
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
            var arrList=[];
            this.id=item.id;
            this.rightPackageName=item.rightPackageName;
            this.rightPackageTitle=item.rightPackageTitle;
            this.rightPackageDesc=item.rightPackageDesc;
            arrList=JSON.parse(item.rightPackageDetail);
            this.updatePackage=arrList;
            console.log("==",arrList);
            this.showDialog('', 'revise');
        },
        update: function () {
            var _this = this;
            var params = {};
            params.id=this.id;
            params.rightPackageName=this.rightPackageName;
            params.rightPackageTitle=this.rightPackageTitle;
            params.rightPackageDesc=this.rightPackageDesc;
            params.rightPackageDetail=JSON.stringify(this.updatePackage);
            console.log(params);
            $.post({
                url: '/awardMgmt/highNetWorthEquityMgmt/rightsPackageConfig/update.ajax',
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
            this.id = item.id;
            this.showDialog('', 'del');
        },
        del: function() {
            var _this = this;
            var params = {};
            params.id = this.id;
            $.post({
                url: '/awardMgmt/highNetWorthEquityMgmt/rightsPackageConfig/deleteParam.ajax',
                data: params,
                success: function(result) {
                    if (result.error === 0) {
                        _this.getTableData(0);
                        _this.showDialog('del', 'info', false, result.msg);
                    } else {
                        _this.showDialog('del', 'info', true, result.msg);
                    }
                }
            });
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
    }
});
