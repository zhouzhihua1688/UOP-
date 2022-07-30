new Vue({
    el: '#content',
    data: {
        // 主页面相关数据
        operator: '',
        isUpdate: false,
        updateId: '',
        tableData: [],
        diaMsg: '',
        // 新建弹窗相关数据
        diaOperator: '',
        mobilePrefix: '',
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        totalPage: 0,
        pageMaxNum: 10
    },
    mounted: function () {
        var dialogs = ['info', 'del', 'add'];
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
            this.operator && (params.operator = this.operator);
            params.pageNo = currentIndex + 1;
            params.pageSize = this.pageMaxNum;
            $.post({
                url: '/awardMgmt/awardSetting/phoneNumRun/getTableData.ajax',
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
        setAddData: function (obj) {
            this.diaOperator = obj.operator ? obj.operator : '';
            this.mobilePrefix = obj.mobilePrefix ? obj.mobilePrefix : '';
        },
        showAdd: function () {
            this.isUpdate = false;
            this.updateId = '';
            this.setAddData({});
            this.showDialog('', 'add');
        },
        showUpdate: function (item) {
            this.isUpdate = true;
            this.updateId = item.id;
            this.setAddData(item);
            this.showDialog('', 'add');
        },
        showDelete: function (id) {
            this.deleteId = id;
            this.showDialog('', 'del');
        },
        deleteData: function () {
            var _this = this;
            $.post({
                url: '/awardMgmt/awardSetting/phoneNumRun/delete.ajax',
                data: {id: this.deleteId},
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(0);
                    }
                    _this.showDialog('del', 'info', false, result.msg);
                }
            });

        },
        diaInfoCheck: function () {
          
            if (!this.diaOperator) {
                this.showDialog('add', 'info', true, '运营商不能为空');
                return false;
            }
            if (!this.mobilePrefix) {
                this.showDialog('add', 'info', true, '号码段不能为空');
                return false;
            }
           
            return true;
        },
        add: function () {
            var _this = this;
            if (this.diaInfoCheck()) {
                var params = {};
                params.operator = this.diaOperator;
                params.mobilePrefix = this.mobilePrefix;
                this.isUpdate && (params.id = this.updateId);
                var url = '/awardMgmt/awardSetting/phoneNumRun/';
                url += this.isUpdate ? 'update.ajax' : 'add.ajax';
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
        }
    }
});