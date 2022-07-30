new Vue({
    el: '#content',
    data: {
        diaMsg: '',
        componentId: '',
        baseData: '',
        viewData: '',
        selectCompinents: '',
        userName: ''
    },
    created: function () {
        this.componentId = this.getUrlParam('componentId')
        this.getData(this.componentId)
    },
    methods: {
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
        getUrlParam: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg); //匹配目标参数
            if (r != null) return unescape(r[2]);
            return ''; //返回参数值
        },
        windowBack: function () {
            history.back()
        },
        getData: function (id) {
            var params = {
                componentId: id
            };
            var _this = this;
            $.post({
                url: '/marketingActive/activeTemplateMgmt/activeComponent/ruleDataQueryId.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                    _this.userName = result.data.userName;

                        _this.baseData = result.data.mcpActComponentConfig;
                        _this.viewData = result.data.mcpBaseRuleTemplates;
                        _this.selectCompinents = result.data.mcpActComponentRulesRls;
                        _this.viewData.forEach(function (val) {
                            val.checked = false;
                        });
                        _this.selectCompinents.forEach(function (val) {
                            _this.viewData.forEach(function (viewVal) {
                                if (val.baseRuleId == viewVal.id) {
                                    viewVal.checked = true;
                                }
                            });
                        })

                        console.log(result)
                    } else {
                        _this.tableData = [];
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        keepData: function () {
            var params = {
                componentId: this.componentId,
                modifyBy: this.userName,
                baseRuleIds: []
            };
            this.viewData.forEach(function (val) {
                if (val.checked) {
                    params.baseRuleIds.push(val.id)
                }
            })
            var _this = this;
            var url;
            if (this.selectCompinents.length) {
                url = '/marketingActive/activeTemplateMgmt/activeComponent/ruleDataChange.ajax'
            } else {
                url = '/marketingActive/activeTemplateMgmt/activeComponent/ruleDataAdd.ajax'
            }
            params.baseRuleIds = JSON.stringify(params.baseRuleIds)
            $.post({
                url: url,
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.showDialog('', 'info', false, result.msg);
                        _this.getData(_this.componentId)
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        }
    }
});