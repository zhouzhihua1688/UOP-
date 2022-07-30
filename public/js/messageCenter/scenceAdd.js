new Vue({
    el: '#content',
    data: {
        diaMsg: '',
        ruleId: '',
        requestUrl: '',
        sceneName: '',
        requestType: '',
        requestParam: ''
    },
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
        $('#ruleId').chosen({
            search_contains: true,
            no_results_text: '未找到站内信模板',
            disable_search_threshold: 6,
            width: '200px'
        });
        $('#ruleId').on('change', function (e, params) {
            _this.ruleId = params ? params.selected : '';
        });
        $.post({
            url: '/messageCenter/scenceMgmt/scenceAdd/getRuleList.ajax',
            success: function (result) {
                if (result.error == 0) {
                    var str = '<option value=""></option>';
                    result.data.forEach(function (item) {
                        str += '<option value="' + item.ruleId + '">' + item.ruleName + '</option>';
                    });
                    $('#ruleId').html(str);
                    $("#ruleId").trigger("chosen:updated");
                }
                else {
                    _this.showDialog('', 'info', false, result.msg);
                }
            }
        });
    },
    methods: {
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
        //请求数据
        add: function () {
            if (!this.ruleId) {
                this.showDialog('', 'info', false, '未选择规则');
                return false;
            }
            if (!this.requestUrl) {
                this.showDialog('', 'info', false, '未填写请求地址');
                return false;
            }
            if (!this.sceneName) {
                this.showDialog('', 'info', false, '未填写场景名称');
                return false;
            }
            if (!this.requestType) {
                this.showDialog('', 'info', false, '未选择请求类型');
                return false;
            }
            if (!this.requestParam) {
                this.showDialog('', 'info', false, '未填写请求参数');
                return false;
            }
            var params = {};
            var _this = this;
            params.ruleId = this.ruleId;
            params.requestUrl = this.requestUrl;
            params.sceneName = this.sceneName;
            params.requestType = this.requestType;
            params.requestParam = this.requestParam;
            $.post({
                url: '/messageCenter/scenceMgmt/scenceAdd/add.ajax',
                data: params,
                success: function (result) {
                    _this.showDialog('', 'info', false, result.msg);
                }
            });
        }
    }
});