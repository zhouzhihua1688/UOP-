new Vue({
    el: '#content',
    data: {
        // 主页面相关数据
        // 规则编号
        id: '',
        // 产品
        product: "",
        // 保存弹窗产品
        saveproduct: "",
        // 业务类型
        // 业务类型
        serialno: '',
        actionType: "",
        endDate: "",
        endTime: "",
        groupid: "",
        startDate: "",
        startTime: "",
        remark: "",
        status: "",
        // 查询
        groupids:"",
        groupidList:"",
        isUpdate: false,
        //隐藏假分页节点元素
        showMysql: false,
        updateId: '',
        tableData: [],
        serviceDate:[],
        diaMsg: '',
        //主表格分页数据
        totalPage: 0,
        currentIndex: 0,
        maxSpace: 5,
        pageMaxNum: '10',
        condition: '',
        currentIndex2: 0,
        // 全选
        allCheck: false,
        // 以下操作Mysql数据库参数
        // 复核状态
        reviewStatus: 2,
        // 数据库id
        mysqlId: "",
        // 数据类型(0:业务,1:Mysql数据库)
        type: "1",
        mysqlStatus: '',
        mysqlProduct: "",
        delete_flag: "",
        // 获取数据库产品所有ID
        arrId: [],
        oneId: '',
        operator: "",
        // 对比数据
        tableData2: [],
        // 驳回备注
        revise_remark: '',
        update_timestamp: "",
        // type:1
    },

    created: function () {
        // this.select2()
    },
    mounted: function () {
        var dialogs = ['info', 'del', 'add', "update", "revise", 'reviewReject'];
        var _this = this;
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
        // 时间插件
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
        this.getTableData(0, this.type);
    },

    computed: {
        //主表格分页
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
            }
            else {
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
        pageList: function () {
            var arr = [];
            if (this.middleData.length <= 2 * this.maxSpace) {
                for (var i = 0; i < this.middleData.length; i++) {
                    arr.push(i + 1);
                }
                return arr;
            }
            if (this.currentIndex > this.maxSpace && this.middleData.length - this.currentIndex > this.maxSpace) {
                for (var i = this.currentIndex - this.maxSpace; i < this.currentIndex + this.maxSpace; i++) {
                    arr.push(i + 1);
                }
            }
            else if (this.currentIndex <= this.maxSpace && this.middleData.length - this.currentIndex > this.maxSpace) {
                for (var i = 0; i < this.currentIndex + (2 * this.maxSpace - this.currentIndex); i++) {
                    arr.push(i + 1);
                }
            }
            else if (this.currentIndex > this.maxSpace && this.middleData.length - this.currentIndex <= this.maxSpace) {
                var space = this.middleData.length - this.currentIndex;
                for (var i = this.currentIndex - (2 * this.maxSpace - space); i < this.middleData.length; i++) {
                    arr.push(i + 1);
                }
            }
            else {
                for (var i = 0; i < this.middleData.length; i++) {
                    arr.push(i + 1);
                }
            }
            return arr;
        },
    },

    watch: {
        // 真分页
        // pageMaxNum: function () {
        //     this.getTableData(0, this.type);
        // },
        // 假分页
        watch: {
            pageMaxNum: function () {
                this.currentIndex = 0;
                this.getTableData(0, this.type)
            },
            condition: function () {
                this.currentIndex = 0;
            }
        },
    },
    methods: {
        // // 获取服务端数据
        // getServiceData: function (currentIndex, type) {
        //     var _this = this;
        //     var params = {};
        //     //传过去的状态参数
        //     params.type = type;
        //     console.log(type)
        //     if (type == 0) {
        //         this.isUpdate = true;  //显示业务分页
        //         this.showMysql = false//显示数据库分页
        //         $.post({
        //             url: '/businessMgmt/combinationProductConfig/productTradeReview/getServiceData.ajax',
        //             data: params,
        //             success: function (result) {
        //                 if (result.error === 0) {
        //                     _this.tableData = result.data.tableData;
        //                 }
        //                 else {
        //                     _this.tableData = [];
        //                     _this.showDialog('', 'info', false, result.msg);
        //                 }
        //             }
        //         });
        //     }
        // },
        // // 获取经办数据
        // getTableData: function (currentIndex, type) {
        //     var _this = this;
        //     var params = {};
        //     //传过去的状态参数
        //     params.type = type;
        //     console.log("type", type)
        //     if (type == 1) {
        //         var _this = this;
        //         //分页切换
        //         this.isUpdate = false;
        //         this.showMysql = true;
        //         this.currentIndex2 = 0;
        //         params.reviewStatus = this.reviewStatus;
        //         $.post({
        //             url: '/businessMgmt/combinationProductConfig/productTradeReview/getTableData.ajax',
        //             data: params,
        //             success: function (result) {
        //                 if (result.error === 0) {
        //                     _this.tableData = result.data;
        //                     console.log(_this.tableData)
        //                 }
        //                 else {
        //                     _this.showDialog('', 'info', false, result.msg);
        //                 }
        //             }
        //         });
        //     }
        // },


        // 获取表格数据
        getTableData: function (currentIndex, type) {
            var _this = this;
            var params = {};
            //传过去的状态参数
            params.type = type;
            console.log(params)
            // 获取业务数据
            if (type == 0) {
                this.isUpdate = true;  //显示业务端分页
                this.showMysql = false//显示假分页
                // params.pageNo = currentIndex + 1;
                // params.pageSize = this.pageMaxNum;
                this.currentIndex = 0;
                params.groupid = this.groupidList;
                $.post({
                    url: '/businessMgmt/combinationProductConfig/productTradeReview/getTableData.ajax',
                    data: params,
                    success: function (result) {
                        if (result.error === 0) {
                            _this.tableData = result.data.tableData.filter(function (item) {
                                return item.groupid.indexOf(params.groupid) > -1
                            })
                        }
                        else {
                            _this.tableData = [];
                            _this.showDialog('', 'info', false, result.msg);
                        }
                    }
                });
            }
            // 获取本地数据
            if (type == 1) {
                var _this = this;
                // 真假分页切换
                this.isUpdate = false;
                this.showMysql = true;
                this.currentIndex = 0;
                params.reviewStatus = this.reviewStatus; //复核状态
                params.groupid= this.groupids;
                $.post({
                    url: '/businessMgmt/combinationProductConfig/productTradeReview/getTableData.ajax',
                    data: params,
                    success: function (result) {
                        if (result.error === 0) {
                            _this.tableData = result.data;
                            console.log(_this.tableData)
                        }
                        else {
                            _this.showDialog('', 'info', false, result.msg);

                        }
                    }
                });
            }
        },

        // 模拟点击
        select: function () {
            document.getElementById("type0").click();
        },
        select2: function () {
            document.getElementById("type1").click();
        },
        // Mysql审核通过---执行数据库和业务接口新增,修改,删除数据操作
        reviewPass: function (item) {
            var _this = this;
            var params = {};
            params.type = this.type;
            params.myqsql = item.mySQLId; //数据表字段id
            params.delete_flag = item.delete_flag //当前状态
            params.operator = item.operator
            // 产品参数
            params.id = item.id
            // params.product = item.mysqlProduct;
            params.serialno = item.serialno;
            params.groupid = item.groupid;
            params.actionType = item.actionType;
            params.startDate = item.startDate;
            params.startTime = item.startTime;
            params.endDate = item.endDate;
            params.endTime = item.endTime;
            params.operate = item.operate;
            params.reviewerTime = moment(new Date().getTime()).format("YYYY-MM-DD HH:mm:ss");//复核时间
            params.updateTime = moment(item.update_timestamp).format("YYYY-MM-DD HH:mm:ss");
            if (this.type == 1) {
                if (params.operate!= 1&&params.operate!=3) {
                    $.post({
                        url: '/businessMgmt/combinationProductConfig/productTradeReview/testDate.ajax',
                        data: {
                            groupid: params.groupid,
                            actionType: params.actionType,
                            date: params.endDate,
                            time: params.endTime,
                        },
                        success: function (result) {
                            if (result.error === 0) {
                                testBody = result.data.tableData;
                                console.log("testBody:", testBody)
                                if (result.data.tableData == true) {
                                    _this.showDialog('', 'info', false, '此产品时间段重叠,该时间段不允许创建该条记录');
                                } else {
                                    $.post({
                                        url: '/businessMgmt/combinationProductConfig/productTradeReview/reviewPass.ajax',
                                        data: params,
                                        success: function (result) {
                                            if (result.error === 0) {
                                                _this.getTableData(0, params.type);

                                            }
                                            _this.showDialog('', 'info', false, result.msg);
                                        }
                                    })
                                }
                            }
                        }
                    });
                } else if (params.operate == 3) {
                    $.post({
                        url: '/businessMgmt/combinationProductConfig/productTradeReview/reviewPass.ajax',
                        data: params,
                        success: function (result) {
                            if (result.error === 0) {
                                _this.getTableData(0, params.type);

                            }
                            _this.showDialog('', 'info', false, result.msg);
                        }
                    })
                }
                else {
                    $.post({
                        url: '/businessMgmt/combinationProductConfig/productTradeReview/testDate.ajax',
                        data: {
                            groupid: params.groupid,
                            actionType: params.actionType,
                            date: params.startDate,
                            time: params.startTime,
                        },
                        success: function (result) {
                            if (result.error === 0) {
                                testBody = result.data.tableData;
                                console.log("testBody:", testBody)
                                if (result.data.tableData == true) {
                                    _this.showDialog('', 'info', false, '此产品时间段重叠,该时间段不允许创建该条记录');
                                } else {
                                    $.post({
                                        url: '/businessMgmt/combinationProductConfig/productTradeReview/SavePass.ajax',
                                        data: params,
                                        success: function (result) {
                                            if (result.error === 0) {
                                                _this.getTableData(0, params.type);

                                            }
                                            _this.showDialog('', 'info', false, result.msg);
                                        }
                                    });
                                }
                            }
                        }
                    });
                }
            }
        },

        // Mysql审核驳回
        rejects: function (item) {
            var _this = this;

            this.itemData = JSON.stringify(item);
            this.revise_remark = '';
            this.showDialog('', 'reviewReject', false);
            this.myqsql = item.mySQLId; //数据表字段id
            this.operator = item.operator; //数据表字段id
            this.update_timestamp = item.update_timestamp;
            console.log(this.itemData)
        },
        reviewReject: function (item) {
            var _this = this;
            // var params = {};
            var params = JSON.parse(this.itemData);
            params.type = this.type;
            params.myqsql = this.myqsql; //数据表字段id
            params.operator = this.operator

            params.reviewerTime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");//复核时间
            params.update_timestamp = moment(this.update_timestamp).format("YYYY-MM-DD HH:mm:ss");
            params.revise_remark = this.revise_remark;
            console.log(params)
            $.post({
                url: '/businessMgmt/combinationProductConfig/productTradeReview/reviewReject.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(0, params.type);
                    }
                    _this.showDialog('reviewReject', 'info', false, result.msg);
                }
            });
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

        // // 单选
        // check: function (index) {
        //     index.check = !index.check;
        // },
        // // 用户全选
        // selectAll: function (allCheck) {
        //     var _this = this;
        //     //如果父级被选中，那么子集循环，全被给checked=true
        //     if (!allCheck) {
        //         _this.tableData.forEach(function (item) {
        //             item.check = true;
        //         });
        //     } else {
        //         //相反，如果没有被选中，子集应该全部checked=false
        //         _this.tableData.forEach(function (item) {
        //             item.check = false;
        //         });
        //     }
        // },
        //主表格真分页方法


        //主表格假分页方法
        prev: function () {
            this.currentIndex <= 0 ? 0 : this.currentIndex--;
        },
        next: function () {
            this.currentIndex >= this.middleData.length - 1 ? this.middleData.length - 1 : this.currentIndex++;
        },
        changeIndex: function (index) {
            this.currentIndex = index - 1;
        },
        toFirst: function () {
            this.currentIndex = 0;
        },
        toLast: function () {
            this.currentIndex = this.middleData.length - 1;
        },
    },
    // 类型状态
    filters: {
        actionType: function (item) {
            if (item) {
                return item.replace(/01/g, '申购').replace(/02/g, '赎回').replace(/03/g, '定投').replace(/04/g, '调仓').replace(/05/g, '解散')
                    .replace(/06/g, '标准转出').replace(/07/g, '自定义转出').replace(/08/g, '标准转入').replace(/09/g, '自定义转入');
            }
        },
        startTime:function(item){
            if(item){
                return item.replace(/(\d{2})(\d{2})(\d{2})/, '$1:$2:$3')
            }
        },
        endTime:function(item){
            if(item){
                return item.replace(/(\d{2})(\d{2})(\d{2})/, '$1:$2:$3')
            }
        }
    }
});