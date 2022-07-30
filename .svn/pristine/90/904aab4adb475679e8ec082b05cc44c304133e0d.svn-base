new Vue({
    el: '#content',
    data: function () {
        return {
            // 主页面相关数据
            diaMsg: '',
            // 查询
            validResult: '',
            insertStartDate: '',
            insertEndDate: '',
            mobileNo: '',
            invnm: '',
            idno: '',
            //主表格分页数据
            ECTPage: { //证通
                tableData: [], //账户限制记录
                currentIndex: 0,
                maxSpace: 5,
                totalPage: 0,
                method: function (currentIndex) {
                    this.ECTPageList(currentIndex)
                }.bind(this)
            },
            GEOPage: { //集奥 
                tableData: [], //客户直销交易记录
                currentIndex: 0,
                maxSpace: 5,
                totalPage: 0,
                method: function (currentIndex) {
                    this.GEOPageList(currentIndex)
                }.bind(this)
            }
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
    },
    computed: {
        pageList: function () {
            return function () {
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
        //主表格分页方法
        prev: function () {
            return function () {
                if (this.currentIndex <= 0) {
                    return;
                }
                this.method(this.currentIndex - 1);
            }
        },
        next: function () {
            return function () {
                if (this.currentIndex >= this.totalPage - 1) {
                    return;
                }
                this.method(this.currentIndex + 1);
            }
        },
        changeIndex: function () {
            return function (index) {
                this.method(index - 1);
            }
        },
        toFirst: function () {
            return function () {
                this.method(0);
            }
        },
        toLast: function () {
            return function () {
                this.method(this.totalPage - 1);
            }
        },
    },
    methods: {
        queryAll: function () {
            this.ECTPage.method(this.ECTPage.currentIndex)
            this.GEOPage.method(this.GEOPage.currentIndex)
        },
        ECTPageList: function (start) {
            var params = {
                validResult: this.validResult,
                insertStartDate: this.insertStartDate,
                insertEndDate: this.insertEndDate,
                mobileNo: this.mobileNo,
                route: 'ECT',
                idno: this.idno,
                invnm: this.invnm,
                start: (10 * start) - 1,
                limit: 10
            };
            $.post({
                url: '/customerService/accountQuery/mobileRecordInspect/tableList.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        this.ECTPage.tableData = result.data.mobilenoValidLogs
                        this.ECTPage.currentIndex = start
                        this.ECTPage.totalPage = Math.ceil(result.data.total / 10)
                    } else {
                        this.showDialog("", "info", false, result.msg)
                    }
                }.bind(this)
            });
        },
        GEOPageList: function (start) {
            var params = {
                validResult: this.validResult,
                insertStartDate: this.insertStartDate,
                insertEndDate: this.insertEndDate,
                mobileNo: this.mobileNo,
                route: 'GEO',
                idno: this.idno,
                invnm: this.invnm,
                start: (10 * start) - 1,
                limit: 10
            };
            $.post({
                url: '/customerService/accountQuery/mobileRecordInspect/tableList.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        this.GEOPage.tableData = result.data.mobilenoValidLogs
                        this.GEOPage.currentIndex = start
                        this.GEOPage.totalPage = Math.ceil(result.data.total / 10)
                    } else {
                        this.showDialog("", "info", false, result.msg)
                    }
                }.bind(this)
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
    },
    components: {
        'date-picker': VueBootstrapDatetimePicker
    },
});