
new Vue({
    el: '#content',
    data: {
        diaMsg: '',

        fundExtension: {
            transferdays: '',//资金到账日期
            deliverydays: '',//资金交付日期
            melonmddays: '',//分红划款日期
            biddays: '',//申购划款日期

        },
        tano: '',//注册登记代码
        service_id: '',//基金代码
        fundchinesenm: '',//基金中文全称

        dataFlag: '',//数据来源
        update_timestamp: '',
        selectOption: {
            investtypeList: []
        },
        initialData: {},
        local_id: '',
        alwaysClick: true,//阻止连续点击
    },
    created: function () {

        this.dataFlag = this.getUrlParam('address')
        this.service_id = this.getUrlParam('service_id')

    },
    mounted: function () {
        var dialogs = ['info', 'modifyInfo', ''];
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

        this.showInitialData({ service_id: this.getUrlParam('service_id'), local_id: this.getUrlParam('local_id') })
    },

    methods: {
        getUrlParam: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg); //匹配目标参数
            if (r != null) return unescape(r[2]);
            return ''; //返回参数值
        },
        goback: function () {
            window.history.back()
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
        //主表格分页方法

        showInitialData: function (item) {
            var params = {};
            var _this = this;
            if (this.dataFlag == 'local') {
                _this.local_id = item.local_id
                params = {
                    local_id: item.local_id,
                    service_id: item.service_id
                }
                $.post({
                    url: '/businessMgmt/IPOMgmtFD/IPOMgmtFund/modifyLocalData.ajax',
                    data: params,
                    success: function (result_parent) {
                        if (result_parent.error === 0) {
                            if (result_parent.data) {
                                _this.update_timestamp = result_parent.data.update_timestamp

                                var lineParams = {
                                    fundIdList: item.service_id
                                }
                                $.post({
                                    url: '/businessMgmt/IPOMgmtFD/IPOMgmtFund/modifyLineData.ajax',
                                    data: lineParams,
                                    success: function (result) {
                                        if (result.error === 0) {
                                            if (result.data) {
                                                _this.setModilyData(result.data[0])

                                                if (result_parent.data.content) {
                                                    _this.setModilyData(result_parent.data.content, true)
                                                }
                                            }
                                        } else {
                                            _this.showDialog('', 'info', true, result.msg);
                                        }
                                    }
                                });

                            }
                        } else {
                            _this.showDialog('', 'info', true, result_parent.msg);
                        }
                    }
                });
            } else {
                params.fundIdList = item.service_id
                $.post({
                    url: '/businessMgmt/IPOMgmtFD/IPOMgmtFund/modifyLineData.ajax',
                    data: params,
                    success: function (result) {
                        if (result.error === 0) {
                            if (result.data) {

                                _this.setModilyData(result.data[0])
                            }
                        } else {
                            _this.showDialog('', 'info', true, result.msg);
                        }
                    }
                });
            }

        },
        setModilyData: function (item, again) {

            if (item.fundExtension) {
                if (!again) {
                    this.fundchinesenm = item.fundExtension.fundchinesenm
                }
                for (var key in this.fundExtension) {
                    if (item.fundExtension[key] !== undefined) {
                        this.fundExtension[key] = item.fundExtension[key]
                    }
                }
            }
            if (!again) {
                if (item.fundInfo) {
                    this.tano = item.fundInfo.tano
                }
                this.initialData = JSON.parse(JSON.stringify(item))
            }
        },
        dataCheck: function () {

            // if (this.fundDetail.onsaleflag == 1) {
            //     if (!this.fundDetail.onsaletime) {
            //         this.showDialog('', 'info', false, '上架时间不能为空！');
            //         return false;
            //     }
            // }

            var fundExtension = JSON.parse(JSON.stringify(this.fundExtension));
            var change = {
                fundExtension: {}
            };

            for (var key in fundExtension) {
                if (this.initialData.fundExtension[key] != fundExtension[key]) {
                    if (!change.fundExtension.serialno) {
                        change.fundExtension.serialno = this.initialData.fundExtension.serialno
                    }
                    change.fundExtension[key] = fundExtension[key]
                }
            }
            return change;
        },
        modify: function () {
            var _this = this;
            var change = this.dataCheck()
            if (this.alwaysClick) {
                this.alwaysClick = false;
                if (!change) {
                    this.alwaysClick = true;
                    return;
                }

                var params = {}
                if (JSON.stringify(change.fundExtension) == '{}') {
                    params.modifyData = null
                } else {
                    params.modifyData = JSON.stringify(change);
                }
                // params.initialData = JSON.stringify(this.initialData)
                // params.operate = this.operate
                params.service_id = this.service_id
                params.local_id = this.local_id
                params.update_timestamp = this.update_timestamp

                $.post({
                    url: '/businessMgmt/IPOMgmtFD/IPOMgmtFund/modifyModify.ajax',
                    data: params,
                    success: function (result) {
                        _this.alwaysClick = true;
                        if (result.error === 0) {
                            console.log(result)
                            _this.showDialog('', 'modifyInfo', false, result.msg);
                        } else {
                            _this.showDialog('', 'info', true, result.msg);
                        }
                    }
                });
            }
        }
    }
});

