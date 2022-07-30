new Vue({
    el: '#content',
    data: {
        diaMsg: '',
        loadingShow: false
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
        var _this = this;
        $.post({
            url: '/authorityMgmt/allChannels/menus/menuData.ajax',
            success: function (result) {
                if (result.error == 0) {
                    $('#tree').treeview({
                        data: result.data,
                        color: "#428bca",
                        backColor: "#fff",
                        multiSelect: true,
                    });
                }
                else {
                    _this.showDialog('', 'info', false, result.msg);
                }
            },
        });
    },
    methods: {
        update: function () {
            this.loadingShow = true;
            var _this = this;
            $.post({
                url: '/authorityMgmt/allChannels/menus/update.ajax',
                success: function (result) {
                    _this.loadingShow = false;
                    _this.showDialog('', 'info', false, result.msg);
                }
            });
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
        }
    }
});
