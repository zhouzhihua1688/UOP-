new Vue({
    el: '#content',
    data: {
        //主页面相关数据
        groupId: '',
        dataSourceType: '',
        tableData: [],
        groupIdList: [],
        diaMsg: '',
        updateId: '',
        deleteId: '',
        // 新增弹窗相关数据
        groupId_dialog: '',
        dataSourceType_dialog: '',
        dataBizCodes_dialog: '',
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        totalPage: 0,
        pageMaxNum: 10
    },
    computed: {
        //主表格分页
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
        }
    },
    watch: {
        pageMaxNum: function () {
            this.getTableData(0);
        }
    },
    mounted: function () {
        var _this = this;
        var dialogs = ['del', 'operate', 'info'];
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
        //获取groupIDlist
        $.post({
            url: '/recommendSystem/recommendSystemGroupMgmt/realTimeSourceConfig/queryGroupId.ajax',
            success: function (result) {
                if (result.error === 0) {
                    // console.log(result,'groupIDlist');
                    _this.groupIdList=result.data;
                }
                else {
                    _this.showDialog('', 'info', false, result.msg);
                }
            }
        });
    },
    methods: {
        //业务方法
        getTableData: function (currentIndex) {
            var _this = this;
            var params = {};
            params.groupId = this.groupId;
            params.dataSourceType = this.dataSourceType;
            params.pageNo = currentIndex + 1;
            params.pageSize = this.pageMaxNum;
            $.post({
                url: '/recommendSystem/recommendSystemGroupMgmt/realTimeSourceConfig/search.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.tableData = result.data.rows;
                        _this.currentIndex = result.data.pageNum - 1;
                        _this.totalPage = result.data.pages;
                    }
                    else {
                        _this.tableData = [];
                        _this.currentIndex = 0;
                        _this.totalPage = 0;
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        clearOperateDia: function (item) {
            if (item) {
                this.groupId_dialog = item.groupId;
                this.dataSourceType_dialog = item.dataSourceType;
                this.dataBizCodes_dialog = item.dataBizCodes;
            }
            else {
                this.groupId_dialog = '';
                this.dataSourceType_dialog = '';
                this.dataBizCodes_dialog = '';
            }
        },
        checkOperateDia: function () {
            if (!this.groupId_dialog) {
                this.showDialog('operate', 'info', true, '分组ID不能为空!');
                return false;
            }
            if (!this.dataSourceType_dialog) {
                this.showDialog('operate', 'info', true, '请选择数据源类型!');
                return false;
            }
            if (!this.dataBizCodes_dialog) {
                this.showDialog('operate', 'info', true, '数据业务码不能为空!');
                return false;
            }
            return true;
        },
        showAdd: function () {
            this.updateId = '';
            this.clearOperateDia();
            this.showDialog('', 'operate');
        },
        showUpdate: function (item) {
            this.updateId = item.id;
            this.clearOperateDia(item);
            this.showDialog('', 'operate');
        },
        operate: function () {
            if (!this.checkOperateDia()) {
                return;
            }
            var _this = this;
            var params = {};
            var url = '';
            if (this.updateId) {
                params.id = this.updateId;
                url = '/recommendSystem/recommendSystemGroupMgmt/realTimeSourceConfig/update.ajax';
            }
            else {
                url = '/recommendSystem/recommendSystemGroupMgmt/realTimeSourceConfig/add.ajax';
            }
            params.groupId = this.groupId_dialog;
            params.dataSourceType = this.dataSourceType_dialog;
            params.dataBizCodes = this.dataBizCodes_dialog;
            $.post({
                url: url,
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.showDialog('operate', 'info', false, result.msg);
                        _this.getTableData(_this.currentIndex);
                    }
                    else {
                        _this.showDialog('operate', 'info', true, result.msg);
                    }
                }
            });
        },
        showDel: function (item) {
            this.deleteId = item.id;
            this.showDialog('', 'del');
        },
        del: function () {
            var _this = this;
            $.post({
                url: '/recommendSystem/recommendSystemGroupMgmt/realTimeSourceConfig/del.ajax',
                data: {id: this.deleteId},
                success: function (result) {
                    if (result.error === 0) {
                        _this.showDialog('del', 'info', false, result.msg);
                        _this.getTableData(_this.currentIndex);
                    }
                    else {
                        _this.showDialog('del', 'info', false, result.msg);
                    }
                }
            });
        },
        fresh: function () {
            var _this = this;
            $.post({
                url: '/recommendSystem/recommendSystemGroupMgmt/realTimeSourceConfig/fresh.ajax',
                success: function (result) {
                    if (result.error === 0) {
                        _this.showDialog('', 'info', false, result.msg);
                        _this.getTableData(_this.currentIndex);
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        //主表格分页方法
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
        }
    }
});
