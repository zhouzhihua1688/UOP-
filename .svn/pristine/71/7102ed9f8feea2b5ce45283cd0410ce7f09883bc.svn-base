new Vue({
    el: '#content',
    data: {
        //主页面相关数据
        serialNo: '',
        custNo: '',
        envelopNo: '',
        tableData: [],
        diaMsg: '',
        //主表格分页数据
        serialNo_table: '',
        custNo_table: '',
        envelopNo_table: '',
        currentIndex: 0,
        total: 0,
        pages: 0,
        maxSpace: 2,
        pageMaxNum: 10
    },
    watch: {
        pageMaxNum: function () {
            this.search();
        }
    },
    computed: {
        pageList: function () {
            var arr = [];
            if (this.pages <= 2 * this.maxSpace) {
                for (var i = 0; i < this.pages; i++) {
                    arr.push(i + 1);
                }
                return arr;
            }
            if (this.currentIndex > this.maxSpace && this.pages - this.currentIndex > this.maxSpace) {
                for (var i = this.currentIndex - this.maxSpace; i < this.currentIndex + this.maxSpace; i++) {
                    arr.push(i + 1);
                }
            }
            else if (this.currentIndex <= this.maxSpace && this.pages - this.currentIndex > this.maxSpace) {
                for (var i = 0; i < this.currentIndex + (2 * this.maxSpace - this.currentIndex); i++) {
                    arr.push(i + 1);
                }
            }
            else if (this.currentIndex > this.maxSpace && this.pages - this.currentIndex <= this.maxSpace) {
                var space = this.pages - this.currentIndex;
                for (var i = this.currentIndex - (2 * this.maxSpace - space); i < this.pages; i++) {
                    arr.push(i + 1);
                }
            }
            else {
                for (var i = 0; i < this.pages; i++) {
                    arr.push(i + 1);
                }
            }
            return arr;
        }
    },
    mounted: function () {
        var dialogs = ['info'];
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
        this.search();
    },
    methods: {
        //模板管理业务方法
        search: function () {
            this.serialNo_table =  this.serialNo;
            this.custNo_table =  this.custNo;
            this.envelopNo_table =  this.envelopNo;
            var _this = this;
            $.post({
                url: '/awardMgmt/redPacketSettingMgmt/redPacketQuery/query.ajax',
                data: {
                    serialNo: this.serialNo,
                    custNo: this.custNo,
                    envelopNo: this.envelopNo,
                    pageNo: 1,
                    pageSize: this.pageMaxNum,
                },
                success: function (result) {
                    if (result.error === 0) {
                        _this.currentIndex = 0;
                        _this.total = result.data.total;
                        _this.pages = result.data.pages;
                        _this.tableData = result.data.body;
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        getTableData: function (index) {
            var _this = this;
            $.post({
                url: '/awardMgmt/redPacketSettingMgmt/redPacketQuery/query.ajax',
                data: {
                    serialNo: this.serialNo_table,
                    custNo: this.custNo_table,
                    envelopNo: this.envelopNo_table,
                    pageNo: index + 1,
                    pageSize: this.pageMaxNum,
                },
                success: function (result) {
                    if (result.error === 0) {
                        _this.currentIndex = index;
                        _this.total = result.data.total;
                        _this.pages = result.data.pages;
                        _this.tableData = result.data.body;
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        //主表格分页方法
        prev: function () {
            var index =  this.currentIndex > 0 ? this.currentIndex - 1 : 0;
            this.getTableData(index);
        },
        next: function () {
            var index =  this.currentIndex < this.pages - 1 ? this.currentIndex + 1 : this.pages - 1;
            this.getTableData(index);
        },
        changeIndex: function (index) {
            this.getTableData(index - 1);
        },
        toFirst: function () {
            this.getTableData(0);
        },
        toLast: function () {
            this.getTableData(this.pages - 1);
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
