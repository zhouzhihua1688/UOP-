new Vue({
    el: '#content',
    data: {
        // 公共数据
        diaMsg: '',
        reddotName: 'discovery'
    },
    mounted: function () {
        var dialogs = ['info', 'confirm'];
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
        $('#reddotNameList').chosen({
            search_contains: true,
            no_results_text: '未找到相关频道信息',
            disable_search_threshold: 6,
            width: '400px'
        });
        var _this = this;
        $('#reddotNameList').on('change', function (e, params) {
            _this.reddotName = params ? params.selected : '';
        });
        // this.getReddotNameList(); // 获取红点名称列表
    },
    methods: {
        getReddotNameList: function () {

        },
        showRefresh: function () {
            this.showDialog('', 'confirm');
        },
        refresh: function () {
            var reddotName = this.reddotName;
            if (!reddotName) {
                this.showDialog('confirm', 'info', false, '请选择要刷新的频道');
                return;
            }
            var _this = this;
            $.post({
                url: '/publicConfig/mobileMgmt/systemRefresh/refresh.ajax',
                data: {
                    reddotName: reddotName
                },
                success: function (result) {
                    _this.showDialog('confirm', 'info', false, result.msg);
                }
            });
        },
        showDialog: function (dia1, dia2, callback, msg) {
            this.diaMsg = msg ? msg : '输入条件错误';
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
        }
    }
});


