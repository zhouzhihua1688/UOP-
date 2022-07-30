new Vue({
    el: '#content',
    data: {
        //主页面相关数据
        tableData: [],
        diaMsg: '',

        // 查询用
        custNo: '',
        detailList: [],
        // 修改传序列号
        serialno: '',
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
                this.currentIndex = 0;
            }
        },
        condition: {
            handler: function (val, oldval) {
                this.currentIndex = 0;
            }
        },
    },
    mounted: function () {
        var _this = this;
        var dialogs = ['info', 'details'];
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
    },
    methods: {
        getTableData: function (currentIndex) {
            var _this = this;
            var params = {};
            _this.tableData=[];
            params.custNo = this.custNo;
            // if (!this.custNo) {
            //     this.showDialog('', 'info', true, '请输入查询条件');
            //     return false;
            // }
            if (params.custNo != '') {
                $.post({
                    url: '/awardMgmt/highNetWorthEquityMgmt/interestReceiveQuery/getTableData.ajax',
                    data: params,
                    success: function (result) {
                        if (result.error === 0) {
                            _this.currentIndex = 0;
                            // result.data.tableData.map(function(item){
                            //     return item.
                            // })
                            console.log(result.data.tableData);
                            if (result.data.tableData&&result.data.tableData.rightDetailsList) {
                                var arrList = result.data.tableData.rightDetailsList.map(function (item) {
                                    item.custName = result.data.tableData.custName,
                                        item.groupId = result.data.tableData.groupId,
                                        item.custNo = result.data.tableData.custNo,
                                        item.packageListName = result.data.tableData.packageListName
                                    return item;
                                });
                                _this.tableData = arrList;
                            } else {
                                _this.tableData = [];
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
            } else {
                var arrList=[];
                $.post({
                    url: '/awardMgmt/highNetWorthEquityMgmt/interestReceiveQuery/getTableData2.ajax',
                    // data: params,
                    success: function (result) {
                        if (result.error === 0) {
                            _this.currentIndex = 0;
                            console.log(result.data.tableData);
                            if (result.data.tableData&&result.data.tableData.rightDetailsList) {
                                for (var i = 0; i < result.data.tableData.length; i++) {    //Map修改添加数组字段
                                    result.data.tableData[i].rightDetailsList.map(function (item) {
                                        item.custName = result.data.tableData[i].custName,
                                            item.groupId = result.data.tableData[i].groupId,
                                            item.custNo = result.data.tableData[i].custNo,
                                            item.packageListName = result.data.tableData[i].packageListName
                                        return;
                                    })
                                }
                                result.data.tableData.forEach(function(item){   //数组合并成一个
                                    arrList=arrList.concat(item.rightDetailsList);
                                })
                                _this.tableData=arrList;

                            } else {
                                _this.tableData = [];
                            }
                        }
                        else {
                            _this.tableData = [];
                            _this.currentIndex = 0;
                            _this.showDialog('', 'info', false, result.msg);
                        }
                    }
                });
            }
        },

        // 详情数据
        checkDetails: function (item) {
            var _this = this;
            var _this = this;
            var params = {};
            params.custNo = item.custNo;
            params.rightNo = item.rightNo;
            console.log(params);
            $.post({
                url: '/awardMgmt/highNetWorthEquityMgmt/interestReceiveQuery/checkDetails.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.detailList = result.data.body;
                        console.log(_this.detailList);
                    } else {
                        _this.showDialog('del', 'info', true, result.msg);
                    }
                }
            });
            this.showDialog('', 'details');
        },

        dataSummary: function (asynData, value, label, dom) {
            if (asynData && asynData.length > 0) {
                var data = [];
                for (var i = 0; i < asynData.length; i++) {
                    data.push({
                        value: asynData[i].fundId,
                        label: asynData[i].fundId + "-" + asynData[i].fundName
                    });
                }
                $("#" + dom).multiselect('dataprovider', data);
            }
        },

        filterToId: function (val) {
            var str = '';
            var _this = this;
            _this.allList.forEach(function (item) {
                if (item.fundId == val) {
                    str = item.fundName
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
            this.currentIndex <= 0 ? 0 : this.currentIndex--;
        },
        next: function () {
            this.currentIndex >= this.middleData.length - 1 ? this.middleData.length - 1 : this.currentIndex++;
        },
        changeIndex: function (index) {
            this.currentIndex = index - 1;
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
    filters: {
        isDisplay: function (item) {
            if (item) {
                return item.replace(/Y/g, '是(Y)').replace(/N/g, '否(N)')
            }
        },
        rightSelectState: function (item) {
            if (item) {
                return item.replace(/1/g, '已选择').replace(/0/g, '未选择')
            }
        },
        status: function (item) {
            if (item) {
                return item.replace(/0/g, '冻结').replace(/1/g, '已完成').replace(/2/g, '解冻')
            }
        },
    }
});
