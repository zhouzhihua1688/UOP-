new Vue({
    el: '#content',
    data: {
        // 主页面相关数据
        tableData: [],
        logs: [],
        diaMsg: '',
        // 查询
        route: 'ECT',
        useCache: '1',
        mobileNo: '',
        invnm: '',
        idno: '',
        flag: true
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
    methods: {
        inspect: function () {
            if (this.idno === '' || this.invnm === '' || this.mobileNo === '') {
                return this.showDialog("", "info", false, '所有查询条件都必填')
            }
            var params = {
                useCache: this.useCache,
                mobileNo: this.mobileNo,
                route: this.route,
                idno: this.idno,
                requestfrom: 'UOP',
                invnm: this.invnm
            };
            $.post({
                url: '/customerService/accountQuery/mobileNumInspect/inspect.ajax',
                data: params,
                success: function (result) {
                    this.getLogs()
                    if (result.error === 0) {
                        if (result.data === true) {
                            this.flag = true;
                            this.showDialog("", "info", false, result.msg)
                            this.tableData = [{
                                channel: this.route,
                                msg: result.msg
                            }]
                        } else {
                            this.showDialog("", "info", false, result.msg)
                            this.flag = false;
                            this.tableData = [{
                                channel: this.route,
                                msg: result.msg
                            }]
                        }
                    } else {
                        this.flag = false;
                        this.showDialog("", "info", false, result.msg)
                        this.tableData = [{
                            channel: this.route,
                            msg: result.msg
                        }]
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

        getLogs: function () {
            var params = {
                mobileNo: this.mobileNo,
                route: this.route,
                idno: this.idno,
                // requestfrom: 'UOP',
                invnm: this.invnm
            };
            $.post({
                url: '/customerService/accountQuery/mobileNumInspect/inspectLogs.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        this.logs = result.data.mobilenoValidLogs
                    }
                }.bind(this)
            });
        },
    }
});