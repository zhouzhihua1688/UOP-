var vm = new Vue({
    el: '#content',
    data: {
        // 主页面相关数据
        tableData: {},
        diaMsg: '',

        //查询
        custNo: '',
        custType: '1',
        tradeType: '00',
        apkind: '',
        product: '000330',
        branchCode: '247',
        channel: '2',
        shareType: 'A',
        oproduct: '',
        bankNo: '',
        accoType: '',
        discountOption: '2',
        tradeAmt: '1000',
        time:'',
        selectOption: {
            custTypeList: [],
            tradeTypeList: [],
            channelList: [],
            branchCodelList: [],
            apkindList: [],
            subApkindList: [],
            quotaTypeList: []
        }
    },
    mounted: function () {
        var dialogs = ['info', '', '', ''];
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
        // this.getTableData(0);

    },
    created: function () {
        $.post({//客户类型
            url: '/businessMgmt/businessParamConfig/discountTrial/selectOption.ajax',
            data: {
                pmst: 'COMMONSERVICE',
                pmkey: 'CUSTTYPE'
            },
            success: function (result) {
                if (result.error === 0) {
                    this.selectOption.custTypeList = result.data.map(function (item) {
                        return {
                            pmco: item.pmco,
                            pmnm: item.pmnm
                        }
                    })
                } else {
                    this.showDialog('', 'info', false, result.msg);
                }
            }.bind(this)
        });
        $.post({//折扣-交易类型
            url: '/businessMgmt/businessParamConfig/discountTrial/selectOption.ajax',
            data: {
                pmst: 'COMMONSERVICE',
                pmkey: 'DISC_TRADETYPE'
            },
            success: function (result) {
                if (result.error === 0) {
                    this.selectOption.tradeTypeList = result.data.map(function (item) {
                        return {
                            pmco: item.pmco,
                            pmnm: item.pmnm
                        }
                    })
                } else {
                    this.showDialog('', 'info', false, result.msg);
                }
            }.bind(this)
        });
        $.post({//渠道 
            url: '/businessMgmt/businessParamConfig/discountTrial/selectOption.ajax',
            data: {
                pmst: 'SYSTEM',
                pmkey: 'CHANNEL'
            },
            success: function (result) {
                if (result.error === 0) {
                    this.selectOption.channelList = result.data.map(function (item) {
                        return {
                            pmco: item.pmco,
                            pmnm: item.pmnm
                        }
                    })
                } else {
                    this.showDialog('', 'info', false, result.msg);
                }
            }.bind(this)
        });
        $.post({//网点号 
            url: '/businessMgmt/businessParamConfig/discountTrial/selectOption.ajax',
            data: {
                pmst: 'SYSTEM',
                pmkey: 'BRANCHCODE'
            },
            success: function (result) {
                if (result.error === 0) {
                    this.selectOption.branchCodelList = result.data.map(function (item) {
                        return {
                            pmco: item.pmco,
                            pmnm: item.pmnm
                        }
                    })
                } else {
                    this.showDialog('', 'info', false, result.msg);
                }
            }.bind(this)
        });
        $.post({//业务类型
            url: '/businessMgmt/businessParamConfig/discountTrial/selectOption.ajax',
            data: {
                pmst: 'SYSTEM',
                pmkey: 'TAPKIND'
            },
            success: function (result) {
                if (result.error === 0) {
                    console.log(result.data)
                    this.selectOption.apkindList = result.data.map(function (item) {
                        return {
                            pmco: item.pmco,
                            pmnm: item.pmnm
                        }
                    })
                } else {
                    this.showDialog('', 'info', false, result.msg);
                }
            }.bind(this)
        });

    },

    watch: {
        tradeType: function (newval, oldval) {
            $.post({//业务类型
                url: '/businessMgmt/businessParamConfig/discountTrial/selectOption.ajax',
                data: {
                    pmst: 'SYSTEM',
                    pmkey: 'TAPKIND',
                    pmv3: newval
                },
                success: function (result) {
                    if (result.error === 0) {
                        this.apkind = ''
                        this.selectOption.apkindList = result.data.map(function (item) {
                            return {
                                pmco: item.pmco,
                                pmnm: item.pmnm
                            }
                        })
                    } else {
                        this.showDialog('', 'info', false, result.msg);
                    }
                }.bind(this)
            });
        }
    },
    methods: {
        getTableData: function () {
            var params = {
                custNo: this.custNo,
                custType: this.custType,
                tradeType: this.tradeType,
                apkind: this.apkind,
                product: this.product,
                branchCode: this.branchCode,
                channel: this.channel,
                shareType: this.shareType,
                oproduct: this.oproduct,
                bankNo: this.bankNo,
                accoType: this.accoType,
                discountOption: this.discountOption,
                tradeAmt: this.tradeAmt,
                time: this.time,
            };
            var _this = this;
            $.post({
                url: '/businessMgmt/businessParamConfig/discountTrial/getData.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.tableData = result.data;
                        console.log(result)
                    } else {
                        _this.tableData = [];
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
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


    },
    components: {
        'date-picker': VueBootstrapDatetimePicker
    }
});