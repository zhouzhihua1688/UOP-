
new Vue({
    el: '#content',
    data: {
        // 主页面相关数据
        custInfo: [],
        diaMsg: '',
        // 查询
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
            if (this.idno === '' || this.invnm === '') {
                return this.showDialog("", "info", false, '所有查询条件都必填')
            }
            var params = {
                idno: this.idno,
                invnm: this.invnm
            };
            $.post({
                url: '/customerService/accountQuery/IDInspect/inspect.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        if (result.data === true) {
                            this.getTableData()
                            this.showDialog("", "info", false, '验证成功')
                        } else {
                            this.showDialog("", "info", false, '验证失败')
                        }
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
        getTableData: function () {
            var params = {
                idNo: this.idno,
                invNm: this.invnm
            };
            $.post({
                url: '/customerService/accountQuery/IDInspect/geiInfo.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        this.custInfo = result.data
                    }
                }.bind(this)
            });
        },

    }
});