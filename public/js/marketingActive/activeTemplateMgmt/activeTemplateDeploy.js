new Vue({
    el: '#content',
    data: {
        diaMsg: "",
        tableData: [],
        moduleId: '',
        //请求初始数据
        userName: '',
        viewData: {
            moduleName: ""
        },
        actComponent: [], //组件
        actCut: [], //切点
        selectCutAndComponent: [], //已选择

        selectStatus: true,
    },
    created: function () {
        this.moduleId = this.getUrlParam('moduleId')
        this.getData(this.moduleId)
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
        windowBack: function () {
            history.back()
        },
        getUrlParam: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg); //匹配目标参数
            if (r != null) return unescape(r[2]);
            return ''; //返回参数值
        },
        getData: function (id) {
            var params = {
                moduleId: id
            };
            var _this = this;
            $.post({
                url: '/marketingActive/activeTemplateMgmt/activeTemplate/deployDataQueryId.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.viewData = result.data.mcpActModuleConfig || _this.viewData; //参数
                        // _this.actComponent = result.data.mcpActComponentConfigs; //组件
                        // _this.actComponent.forEach(function (val, ind) {
                        //     val.checked = false;
                        // });
                        _this.actCut = result.data.mcpActCutinPointConfigs; //切点
                        _this.actCut.forEach(function (val, ind) {
                            val.checked = false;
                            val.mcpActComponentConfigs.forEach(function (val) { //组件
                                val.checked = false;
                            })
                        });
                        _this.selectCutAndComponent = result.data.mcpActModuleCutinpointComponentRls; //已选择
                        _this.userName = result.data.userName;

                        _this.selectCutAndComponent.forEach(function (selectVal, ind) {
                            _this.actCut.forEach(function (cutVal) {
                                if (cutVal.cutinPointId == selectVal.cutinPointId) {
                                    cutVal.checked = true
                                    cutVal.mcpActComponentConfigs.forEach(function (componentVal) {
                                        if (componentVal.componentId == selectVal.componentId) {
                                            componentVal.checked = true
                                        }
                                    })
                                }

                            })

                        })

                        console.log(result)
                    } else {
                        _this.tableData = [];
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        vueset: function (obj, check, ind) {
            Vue.set(this.actCut, ind, obj)
            Vue.set(obj, 'checked', !check)
        },
        keepData: function () {
            var params = {
                modifyBy: this.userName,
                moduleId: this.moduleId,
                cutinPointComponents: []
            };
            var _this = this;
            var components;
            this.actCut.forEach(function (val, ind) {
                if (val.checked) {
                    components = [];
                    val.mcpActComponentConfigs.forEach(function (cmp, index) {
                        if (cmp.checked) {
                            components.push({
                                componentId: cmp.componentId
                            })
                        }
                    })
                    params.cutinPointComponents.push({
                        cutinpointId: val.cutinPointId,
                        components: components
                    })
                }
            })
            console.log(params)
            // return;
            var url;
            if (this.selectCutAndComponent.length) {
                url = '/marketingActive/activeTemplateMgmt/activeTemplate/deployDataChange.ajax' //修改
            } else {
                url = '/marketingActive/activeTemplateMgmt/activeTemplate/deployDataAdd.ajax' //新增
            }
            params.cutinPointComponents = JSON.stringify(params.cutinPointComponents)
            $.post({
                url: url,
                data: params,
                traditional: true,
                success: function (result) {
                    if (result.error === 0) {
                        _this.showDialog('', 'info', false, result.msg);
                        _this.getData(_this.moduleId)
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
    },

});