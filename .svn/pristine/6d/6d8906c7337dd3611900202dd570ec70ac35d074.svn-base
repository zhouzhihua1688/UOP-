new Vue({
    el: '#content',
    data: {
        // 主页面相关数据
        // 规则编号
        id: '',
        userId: "",//用户ID
        distributedUser: [],
        unDistributedUser: [],
        diaMsg: '',
        tableTip: '数据获取中...',
        deleteId: [],
        //分配权限弹窗数据
        diaSearchUserId: '',
        diaSearchRoleName: '',
        AllRoleList: [],
        selectedUserList: [],
        selectedRoleList: [],
        // 保存弹窗
        saveproduct: "",
        // 业务类型
        remark: "",
        status: "",

        isUpdate: false,
        //隐藏假分页节点元素
        showMysql: false,
        updateId: '',
        tableData: [],
        serviceDate: [],
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
        $.post({
            url: '/authorityMgmt/allChannels/userAuthorityReview/getUserInfo.ajax',
            success: function (result) {
                if (result.error === 0) {
                    _this.distributedUser = result.data.distributedUser;
                    _this.unDistributedUser = result.data.unDistributedUser;
                    _this.allUserList = result.data.bodyDate
                    _this.tableTip = '暂无数据';
                }
                else {
                    _this.showDialog('', 'info', false, result.msg);
                }
            }
        });
        this.getTableData(0, this.type);
    },

    computed: {
        //业务主表格业务分页
        distributedUserMiddleData: function () {
            var middleData = [];
            var filterData = [];
            var pageMaxNum = parseInt(this.pageMaxNum);
            var _this = this;
            this.distributedUser.forEach(function (item) {
                if (item.userId.indexOf(_this.userId) > -1) {
                    filterData.push(item);
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
        distributedUserViewData: function () {
            return this.distributedUserMiddleData[parseInt(this.currentIndex)];
        },
        pageList: function () {
            var arr = [];
            if (this.distributedUserMiddleData.length <= 2 * this.maxSpace) {
                for (var i = 0; i < this.distributedUserMiddleData.length; i++) {
                    arr.push(i + 1);
                }
                return arr;
            }
            if (this.currentIndex > this.maxSpace && this.distributedUserMiddleData.length - this.currentIndex > this.maxSpace) {
                for (var i = this.currentIndex - this.maxSpace; i < this.currentIndex + this.maxSpace; i++) {
                    arr.push(i + 1);
                }
            }
            else if (this.currentIndex <= this.maxSpace && this.distributedUserMiddleData.length - this.currentIndex > this.maxSpace) {
                for (var i = 0; i < this.currentIndex + (2 * this.maxSpace - this.currentIndex); i++) {
                    arr.push(i + 1);
                }
            }
            else if (this.currentIndex > this.maxSpace && this.distributedUserMiddleData.length - this.currentIndex <= this.maxSpace) {
                var space = this.distributedUserMiddleData.length - this.currentIndex;
                for (var i = this.currentIndex - (2 * this.maxSpace - space); i < this.distributedUserMiddleData.length; i++) {
                    arr.push(i + 1);
                }
            }
            else {
                for (var i = 0; i < this.distributedUserMiddleData.length; i++) {
                    arr.push(i + 1);
                }
            }
            return arr;
        },

        // 本地数据分页
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
            var currentIndex = parseInt(this.currentIndex2);
            return this.middleData[currentIndex];
        },
        pageList1: function () {
            var arr = [];
            if (this.middleData.length <= 2 * this.maxSpace) {
                for (var i = 0; i < this.middleData.length; i++) {
                    arr.push(i + 1);
                }
                return arr;
            }
            if (this.currentIndex2 > this.maxSpace && this.middleData.length - this.currentIndex2 > this.maxSpace) {
                for (var i = this.currentIndex2 - this.maxSpace; i < this.currentIndex2 + this.maxSpace; i++) {
                    arr.push(i + 1);
                }
            }
            else if (this.currentIndex2 <= this.maxSpace && this.middleData.length - this.currentIndex2 > this.maxSpace) {
                for (var i = 0; i < this.currentIndex2 + (2 * this.maxSpace - this.currentIndex2); i++) {
                    arr.push(i + 1);
                }
            }
            else if (this.currentIndex2 > this.maxSpace && this.middleData.length - this.currentIndex2 <= this.maxSpace) {
                var space = this.middleData.length - this.currentIndex2;
                for (var i = this.currentIndex2 - (2 * this.maxSpace - space); i < this.middleData.length; i++) {
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

        //选择用户过滤
        filterUserList: function () {
            var filterData = [];
            var _this = this;
            this.unDistributedUser.forEach(function (item) {
                if (item.userId.indexOf(_this.diaSearchUserId) > -1) {
                    filterData.push(item);
                }
            });
            return filterData;
        },
        //选择角色过滤
        filterRoleList: function () {
            var filterData = [];
            var _this = this;
            this.AllRoleList.forEach(function (item) {
                if (item.name.indexOf(_this.diaSearchRoleName) > -1) {
                    filterData.push(item);
                }
            });
            return filterData;
        },
    },

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
    methods: {
        // 获取表格数据
        getTableData: function (currentIndex, type) {
            var _this = this;
            var params = {};
            //传过去的状态参数
            params.type = type;
            // 获取业务数据
            if (type == 0) {
                this.isUpdate = true;  //显示业务端分页
                this.showMysql = false//显示假分页
                this.currentIndex = 0;
                params.userId = this.userId;
                $.post({
                    url: ' /authorityMgmt/allChannels/userAuthorityReview/DataUserInfo.ajax',
                    data: params,
                    success: function (result) {
                        if (result.error === 0) {
                            this.pageMaxNum = 1;
                            // console.log("***",result.data.tableData)
                            // _this.tableData = result.data.tableData.filter(function (item) {
                            //     return item.userId.indexOf(params.userId) > -1
                            // })
                            _this.distributedUser = result.data.distributedUser.filter(function (item) {
                                return item.userId.indexOf(params.userId) > -1
                            });
                            _this.unDistributedUser = result.data.unDistributedUser;
                            console.log("业务数据：", _this.distributedUser)
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
                this.currentIndex2 = 0;
                params.reviewStatus = this.reviewStatus; //复核状态
                params.userId = this.userId;
                console.log(params)
                $.post({
                    url: '/authorityMgmt/allChannels/userAuthorityReview/DataUserInfo.ajax',
                    data: params,
                    success: function (result) {
                        if (result.error === 0) {
                            _this.tableData = result.data
                            console.log("result.data", result.data)
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

            let userIdArr=[]
            userIdArr.push(item.userId)
            params.userIds =JSON.stringify(userIdArr) ;
            params.roleIds = item.roleIds;

            params.operate = item.operate;
            params.reviewerTime = moment(new Date().getTime()).format("YYYY-MM-DD HH:mm:ss");//复核时间
            params.updateTime = moment(item.update_timestamp).format("YYYY-MM-DD HH:mm:ss");
            console.log("传数据:", params)

            if (this.type == 1) {
                if (params.operate != 1 && params.operate != 3) {
                    console.log("修改数据:", params.operate)
                    $.post({
                        url: '/authorityMgmt/allChannels/userAuthorityReview/reviewPass.ajax',
                        data: params,
                        success: function (result) {
                            if (result.error === 0) {
                                _this.getTableData(0, params.type);
                            }
                            _this.showDialog('', 'info', false, result.msg);
                        }
                    })
                } else if (params.operate == 3) {
                    console.log("删除数据:", params.operate)
                    $.post({
                        url: '/authorityMgmt/allChannels/userAuthorityReview/reviewPass.ajax',
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
                    console.log("新增数据:", params.operate)
                    $.post({
                        url: '/authorityMgmt/allChannels/userAuthorityReview/SavePass.ajax',
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
            console.log("驳回数据",params)
            $.post({
                url: '/authorityMgmt/allChannels/userAuthorityReview/reviewReject.ajax',
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
        prev1: function () {
            this.currentIndex2 <= 0 ? 0 : this.currentIndex2--;
        },
        next1: function () {
            this.currentIndex2 >= this.middleData.length - 1 ? this.middleData.length - 1 : this.currentIndex2++;
        },
        changeIndex1: function (index) {
            this.currentIndex2 = index - 1;
        },
        toFirst1: function () {
            this.currentIndex2 = 0;
        },
        toLast1: function () {
            this.currentIndex2 = this.middleData.length - 1;
        },

        inSelected: function (item, arr, prop) {
            var _index = -1;
            arr.forEach(function (value, index) {
                if (item[prop] == value[prop]) {
                    _index = index;
                }
            });
            return _index;
        },
    },
});