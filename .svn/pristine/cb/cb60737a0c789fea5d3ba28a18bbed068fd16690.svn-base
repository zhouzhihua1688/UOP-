new Vue({
    el: '#content',
    data: {
        // 主页面相关数据
        diaMsg: '',
        invnm: {
            val: '',
            name: '客户姓名:'

        },
        idtp: {
            val: '0',
            name: '证件类型:'
        },
        idno: {
            val: '',
            name: '证件号码:'

        },
        invtp: {
            val: '1',
            name: '客户类型:',
            options: [{
                name: '机构客户',
                val: '0',
                key: 'SEATIDTP'
            }, {
                name: '个人客户',
                val: '1',
                key: 'IDTP'
            }, {
                name: '产品客户',
                val: '2',
                key: 'PRODIDTP'
            }]
        },
        idtpList: [],
        loadingShow: false,
        closeInfo: {},
        custInfo: '',
        resultVal: '',
    },
    mounted: function () {
        var dialogs = ['info','closeInfo'];
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
        this.idtpOptins()
    },
    computed: {
        invnmList: function () {
            var arr = this.idtpList[this.invtp.options.filter(function (item) {
                return item.val === this.invtp.val
            }.bind(this))[0].key];
            if (arr) {
                this.idtp.val = arr[0].pmco;
            }
            return arr;
        }
    },
    methods: {
        idtpOptins() {
            $.post({
                url: '/customerService/accountMgm/closeAcco/idtpOptins.ajax',
                success: function (result) {
                    if (result.error === 0) {
                        this.idtpList = result.data
                    } else {
                        this.showDialog("", "info", false, result.msg)
                    }
                }.bind(this)
            });
        },
        getCustInfo: function () {
            var params = {
                invTp: this.invtp.val,
                idNo: this.idno.val,
                invNm: this.invnm.val,
                idTp: this.idtp.val,
            };
            for (keys in params) {
                if (params[keys] === '') {
                    this.showDialog("", "info", false, '所有参数必填')
                    return;
                }
            }
            $.post({
                url: '/customerService/accountMgm/closeAcco/custInfo.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        if (result.data) {
                            this.showDialog("", "info", false, result.msg)
                            this.custInfo = result.data
                            this.closeInfo = {
                                invtp: params.invTp,
                                custNo: result.data.custNo
                            }
                        } else {
                            this.custInfo = '';
                            this.closeInfo = {};
                            this.showDialog("", "info", false, '未查询到客户信息')
                        }
                    } else {
                        this.custInfo = '';
                        this.closeInfo = {};
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
        tips: function () {
            this.showDialog("", "closeInfo", false, '确定将客户号:' + this.closeInfo.custNo + '的用户销户吗？')
        },
        closeAccount: function () {
            var url = '/customerService/accountMgm/closeAcco/company.ajax'
            if (this.closeInfo.invtp === '1') {
                url = '/customerService/accountMgm/closeAcco/sole.ajax'
            }
            $.post({
                url: url,
                data: {
                    custNo: this.closeInfo.custNo
                },
                success: function (result) {
                    if (result.error === 0) {
                        this.showDialog("", "info", false, result.msg)

                    } else {
                        this.showDialog("", "info", false, result.msg)
                    }
                }.bind(this)
            });
        }
    }
});