new Vue({
    el: '#content',
    data: {
        //主页面相关数据
        routeRuleId: '',
        batchId: '',
        diaMsg: '',
    },
    computed: {},
    watch: {},
    mounted: function () {
        var _this = this;
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
        //业务方法
        deleteData: function () {
            if (!this.routeRuleId || !this.batchId) {
                this.showDialog('', 'info', false, '未填写必要信息');
                return;
            }
            var params = {};
            params.routeRuleId = this.routeRuleId;
            params.batchId = this.batchId;
            var _this = this;
            $.post({
                url: '/messageCenter/manualMgmt/deleteMsg/del.ajax',
                data: params,
                success: function (result) {
                    _this.showDialog('', 'info', false, result.msg);
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
        }
    }
});
