new Vue({
    el: '#content',
    data: {
        // 主页面相关数据
        searchField: '',
        updateId: '',
        tableData: [],
        diaMsg: '',
        // 新建弹窗相关数据
        isUpdate: false,
        diaUserId: '',
        diaUserName: '',
        diaPasswd: '',
        diaConfirmPasswd: '',
        diaRemark: '',
        diaPhone: '',
        diaEmail: '',
        diaStatus: '0',
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        totalPage: 0,
        pageMaxNum: 10
    },
    mounted: function () {
        var dialogs = ['info', 'add', 'del'];
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
            }
            else if (this.currentIndex <= this.maxSpace && this.totalPage - this.currentIndex > this.maxSpace) {
                for (var i = 0; i < this.currentIndex + (2 * this.maxSpace - this.currentIndex); i++) {
                    arr.push(i + 1);
                }
            }
            else if (this.currentIndex > this.maxSpace && this.totalPage - this.currentIndex <= this.maxSpace) {
                var space = this.totalPage - this.currentIndex;
                for (var i = this.currentIndex - (2 * this.maxSpace - space); i < this.totalPage; i++) {
                    arr.push(i + 1);
                }
            }
            else {
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
            params.searchField = this.searchField;
            params.page = currentIndex + 1;
            params.rows = this.pageMaxNum;
            $.post({
                url: '/operationMgmt/userMgmt/user/getTableData.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.tableData = result.data.tableData;
                        _this.currentIndex = result.data.page - 1;
                        _this.totalPage = result.data.total;
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
        showCreate: function () {
            this.isUpdate = false;
            this.updateId = '';
            this.diaUserId = '';
            this.diaUserName = '';
            this.diaPasswd = '';
            this.diaConfirmPasswd = '';
            this.diaRemark = '';
            this.diaPhone = '';
            this.diaEmail = '';
            this.diaStatus = '0';
            this.showDialog('', 'add');
        },
        showUpdate: function (item) {
            this.isUpdate = true;
            this.updateId = item.id;
            this.diaUserId = item.userId;
            this.diaUserName = item.userName;
            this.diaPasswd = '';
            this.diaConfirmPasswd = '';
            this.diaRemark = item.remark;
            this.diaPhone = item.phone;
            this.diaEmail = item.email;
            this.diaStatus = item.status;
            this.showDialog('', 'add');
        },
        showDelete: function () {
            var hasCheck = false;
            for (var i = 0; i < this.tableData.length; i++) {
                if (this.tableData[i].check) {
                    hasCheck = true;
                    break;
                }
            }
            if (!hasCheck) {
                this.showDialog('', 'info', false, '未选择任何用户');
                return;
            }
            this.showDialog('', 'del');
        },
        deleteUser: function () {
            var ids = [];
            for (var i = 0; i < this.tableData.length; i++) {
                if (this.tableData[i].check) {
                    ids.push(this.tableData[i].id);
                }
            }
            var _this = this;
            $.post({
                url: '/operationMgmt/userMgmt/user/deleteUser.ajax',
                data: {ids: ids.join(',')},
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(0);
                    }
                    _this.showDialog('del', 'info', false, result.msg);
                }
            });

        },
        diaInfoCheck: function () {
            if (!this.diaUserId) {
                this.showDialog('add', 'info', true, '用户ID不能为空');
                return false;
            }
            if (!this.diaUserName) {
                this.showDialog('add', 'info', true, '用户名不能为空');
                return false;
            }
            // if (!this.diaPasswd && !this.isUpdate) {
            //     this.showDialog('add', 'info', true, '密码不能为空');
            //     return false;
            // }
            // if (!this.diaConfirmPasswd && !this.isUpdate) {
            //     this.showDialog('add', 'info', true, '确认密码不能为空');
            //     return false;
            // }
            // if (this.diaConfirmPasswd != this.diaPasswd && !this.isUpdate) {
            //     this.showDialog('add', 'info', true, '两次密码输入不一致');
            //     return false;
            // }
            return true;
        },
        add: function () {
            var _this = this;
            if (this.diaInfoCheck()) {
                var params = {};
                params.userId = this.diaUserId;
                params.userName = this.diaUserName;
                params.remark = this.diaRemark;
                params.phone = this.diaPhone;
                params.email = this.diaEmail;
                params.status = this.diaStatus;
                this.updateId && (params.id = this.updateId);
                !this.isUpdate && (params.passwd = this.diaPasswd);
                !this.isUpdate && (params.confirmPasswd = this.diaConfirmPasswd);
                var url = this.isUpdate ? '/operationMgmt/userMgmt/user/update.ajax' : '/operationMgmt/userMgmt/user/add.ajax';
                $.post({
                    url: url,
                    data: params,
                    success: function (result) {
                        if (result.error === 0) {
                            _this.getTableData(0);
                        }
                        _this.showDialog('add', 'info', false, result.msg);
                    }
                });
            }
        },
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
    },
    filters: {
        showStatus: function(value){
            if(value == 0){
                return '刚创建';
            }
            if(value == 1){
                return '正常';
            }
            if(value == 2){
                return '无效';
            }
            if(value == 3){
                return '冻结';
            }
            if(value == 4){
                return '锁定';
            }
            return value;
        }
    }
});