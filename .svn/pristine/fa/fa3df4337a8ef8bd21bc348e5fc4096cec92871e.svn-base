new Vue({
    el: '#content',
    data: {
        // 主页面相关数据
        tableData: [],
        diaMsg: '',

        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        totalPage: 0,
        pageMaxNum: 10,
        // 新增
        userName: '',
        // cutinPointDesc: '',
        // cutinPointName: '',
        // cutionPointKey: '',
        //查看修改
        redactStatus: true, //查看时编辑状态
        // viewChange: {
        //     id: '',
        //     cutinPointDesc: '',
        //     cutinPointName: '',
        //     cutionPointKey: '',
        // },
        queryruleId: '', //查询
        querytaskId: '',

        deleteinfo:{}
    },
    mounted: function () {
        var dialogs = ['info', 'addNotice', 'changeNotice','deleteDialog'];
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
        this.getTableData(0);
    },
    computed: {
        pageList: function () {
            var arr = [];
            if (this.totalPage <= 2 * this.maxSpace) {
                for (var i = 0; i < this.totalPage; i++) {
                    arr.push(i + 1);
                }
                return arr;
            }
            if (this.currentIndex > this.maxSpace && this.totalPage - this.currentIndex > this.maxSpace) {
                for (var i = this.currentIndex - this.maxSpace; i < this.currentIndex + this.maxSpace; i++) {
                    arr.push(i + 1);
                }
            } else if (this.currentIndex <= this.maxSpace && this.totalPage - this.currentIndex > this.maxSpace) {
                for (var i = 0; i < this.currentIndex + (2 * this.maxSpace - this.currentIndex); i++) {
                    arr.push(i + 1);
                }
            } else if (this.currentIndex > this.maxSpace && this.totalPage - this.currentIndex <= this.maxSpace) {
                var space = this.totalPage - this.currentIndex;
                for (var i = this.currentIndex - (2 * this.maxSpace - space); i < this.totalPage; i++) {
                    arr.push(i + 1);
                }
            } else {
                for (var i = 0; i < this.totalPage; i++) {
                    arr.push(i + 1);
                }
            }
            return arr;
        },
        checkAll: function () {
            if (this.tableData.length == 0) {
                return false;
            }
            for (var i = 0; i < this.tableData.length; i++) {
                if (!this.tableData[i].check) {
                    return false;
                }
            }
            return true;
        }
    },
    watch: {
        pageMaxNum: function () {
            this.getTableData(0);
        }
    },
    methods: {
        getTableData: function (currentIndex) {
            var params = {};
            var _this = this;
            params.pageNo = currentIndex + 1;
            params.pageSize = this.pageMaxNum;
            $.post({
                url: '/marketingActive/taskManage/taskRule/getList.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.tableData = result.data.rows;
                        _this.currentIndex = result.data.pageNum - 1;
                        _this.totalPage = result.data.pages;
                        _this.userName = result.data.userName;
                        console.log(result)
                    } else {
                        _this.tableData = [];
                        _this.currentIndex = 0;
                        _this.totalPage = 0;
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        showDialog: function (dia1, dia2, callback, msg) {
            if (msg) {
                this.diaMsg = msg;
            } else {
                msg = '输入条件错误';
            }
            if (!dia1) {
                $('#' + dia2).modal('show');
            } else if (!dia2) {
                $('#' + dia1).modal('hide');
            } else if (!callback) {
                $('#' + dia1).on("hidden.bs.modal", function () {
                    $('#' + dia2).modal('show');
                    $('#' + dia1).off().on("hidden", "hidden.bs.modal");
                });
                $('#' + dia1).modal('hide');
            } else {
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
        prev: function () {
            if (this.currentIndex <= 0) {
                return;
            }
            this.getTableData(this.currentIndex - 1);
        },
        next: function () {
            if (this.currentIndex >= this.totalPage - 1) {
                return;
            }
            this.getTableData(this.currentIndex + 1);
        },
        changeIndex: function (index) {
            this.getTableData(index - 1);
        },
        toFirst: function () {
            this.getTableData(0);
        },
        toLast: function () {
            this.getTableData(this.totalPage - 1);
        },
        // add: function () {
        //     if (!this.cutionPointKey) {
        //         this.showDialog('addNotice', 'info', true, '请填写唯一键');
        //         return;
        //     }
        //     var params = {
        //         modifyBy: this.userName,
        //         cutinPointDesc: this.cutinPointDesc,
        //         cutinPointName: this.cutinPointName,
        //         cutionPointKey: this.cutionPointKey,
        //     };
        //     console.log(params)
        //     var _this = this;
        //     $.post({
        //         url: '/marketingActive/taskManage/taskRule/dataAdd.ajax',
        //         data: params,
        //         success: function (result) {
        //             if (result.error === 0) {
        //                 _this.showDialog('addNotice', 'info', false, result.msg);
        //                 _this.getTableData(0)
        //                 _this.cutinPointDesc = '';
        //                 _this.cutinPointName = '';
        //                 _this.cutionPointKey = '';
        //                 console.log(result)
        //             } else {
        //                 _this.showDialog('addNotice', 'info', false, result.msg);
        //             }
        //         }
        //     });
        // },
        // deleteDialog: function (id) {
        //     this.deleteinfo.cutinPointId = id
        //     this.showDialog("", "deleteDialog")
        // },
        // deleteData: function (id) {
        //     var params = {
        //         cutinPointId: this.deleteinfo.cutinPointId,
        //         modifyBy: this.userName
        //     };
        //     console.log(params)
        //     var _this = this;
        //     $.post({
        //         url: '/marketingActive/taskManage/taskRule/dataDelete.ajax',
        //         data: params,
        //         success: function (result) {
        //             if (result.error === 0) {
        //                 _this.showDialog('deleteDialog', 'info', false, '删除成功');
        //                 _this.getTableData(0)
        //                 console.log(result)
        //             } else {
        //                 _this.showDialog('deleteDialog', 'info', false, '删除失败');
        //             }
        //         }
        //     });
        // },
        // showView: function (id) {

        //     var params = {
        //         cutinPointId: id,
        //     };
        //     console.log(params)
        //     var _this = this;
        //     _this.redactStatus = true; //查看时为不可编辑
        //     $.post({
        //         url: '/marketingActive/taskManage/taskRule/dataQuery.ajax',
        //         data: params,
        //         success: function (result) {
        //             if (result.error == 0) {

        //                 _this.viewChange.cutinPointDesc = result.data.cutinPointDesc;
        //                 _this.viewChange.cutinPointName = result.data.cutinPointName;
        //                 _this.viewChange.cutionPointKey = result.data.cutionPointKey;
        //                 _this.viewChange.id = result.data.cutinPointId;
        //                 console.log(result)
        //             } else {
        //                 _this.showDialog('', 'info', false, '查询失败');
        //             }
        //         }
        //     });

        //     this.showDialog('', 'changeNotice', false)
        // },
        // changeDate: function () {
        //     var params = {
        //         cutinPointId: this.viewChange.id,
        //         cutinPointDesc: this.viewChange.cutinPointDesc,
        //         cutinPointName: this.viewChange.cutinPointName,
        //         cutionPointKey: this.viewChange.cutionPointKey,
        //         modifyBy: this.userName,
        //     };
        //     console.log(params)
        //     var _this = this;
        //     $.post({
        //         url: '/marketingActive/taskManage/taskRule/dataChange.ajax',
        //         data: params,
        //         success: function (result) {
        //             if (result.error === 0) {
        //                 _this.showDialog('changeNotice', 'info', false, '修改成功');
        //                 _this.redactStatus = true; //查看时为不可编辑
        //                 _this.getTableData(0)
        //                 console.log(result)
        //             } else {
        //                 _this.showDialog('changeNotice', 'info', false, '修改失败');
        //                 _this.redactStatus = true; //查看时为不可编辑
        //             }
        //         }
        //     });
        // },
        queryData: function () {
            var params = {};
            var _this = this;
            params.pageNo = 1;
            params.ruleId = this.queryruleId;
            params.taskId = this.querytaskId;
            params.pageSize = this.pageMaxNum;
    
            $.post({
                url: '/marketingActive/taskManage/taskRule/getList.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.tableData = result.data.rows;
                        _this.currentIndex = result.data.pageNum - 1;
                        _this.totalPage = result.data.pages;
                        _this.userName = result.data.userName;
                        console.log(result)
                    } else {
                        _this.tableData = [];
                        _this.currentIndex = 0;
                        _this.totalPage = 0;
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        }
    }
});