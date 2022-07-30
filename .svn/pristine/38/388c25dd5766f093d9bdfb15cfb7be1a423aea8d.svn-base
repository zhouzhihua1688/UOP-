
new Vue({
    el: '#content',
    data: {
        // 主页面相关数据
        tableData: [],
        info:{},
        diaMsg: '',
        // 查询
        type: 'ECT',
        bankacco: '',
        invnm: '',
        idno: ''
    },
    mounted: function () {
        var dialogs = ['info'];
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
    },
    methods: {
        inspect: function () {
            if (this.idno === '' || this.invnm === '' || this.bankacco === '') {
                return this.showDialog("", "info", false, '所有查询条件都必填')
            }
            var params = {
                acceptMode: 2,
                bankacco: this.bankacco,
                idno: this.idno,
                invnm: this.invnm
            };
            var url = '/customerService/accountQuery/bankCardInspect/inspectZT.ajax';
            if (this.type === 'GEO') {
                url = '/customerService/accountQuery/bankCardInspect/inspectGEO.ajax';
            }
            $.post({
                url: url,
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        if (result.data === true) {
                            this.showDialog("", "info", false, '核查成功')
                            this.tableData = [{ channel: this.type, msg: '核查成功，验证一致' }]
                            this.info = {
                                bankacco:params.bankacco,
                                idno:params.idno,
                                invnm:params.invnm
                            }
                        } else {
                            this.showDialog("", "info", false, result.msg)
                            this.tableData = [{ channel: this.type, msg: '核查失败，验证不一致'}]
                            this.info = {
                                bankacco:params.bankacco,
                                idno:params.idno,
                                invnm:params.invnm
                            }
                        }
                    } else {
                        this.showDialog("", "info", false, result.msg)
                        this.tableData = [{ channel: this.type, msg: result.msg }]
                        this.info = {
                            bankacco:params.bankacco,
                            idno:params.idno,
                            invnm:params.invnm
                        }
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


    }
});