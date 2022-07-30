new Vue({
    el: '#content',
    data: {
        // 主页面相关数据
        idNo: '',
        invNm: '',
        fundAcct: '',
        tradeAcct: '',
        mobile: '',
        //客户类型
        invTp: '1',
        // 查询:证件类型参数
        idTp: '0',
        // 表格数据
        updateId: '',
        dialogData: [],
        tableData: {},
        diaMsg: ''
    },
    mounted: function () {

        var dialogs = ['info', 'del', 'add', "update", "revise"];
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

    },
    computed: {},

    watch: {},
    methods: {
        //获取用户信息
        queryUserInfo: function () {
            var _this = this;
            if (!this.idNo && !this.invNm && !this.fundAcct && !this.tradeAcct && !this.mobile) {
                _this.showDialog('', 'info', false, '至少填写一项');
                return false;
            }
            $.post({//注册登记代码
                url: '/businessMgmt/attendQuery/customerDataQuery/userInfo.ajax',
                data: {
                    fundAcct: _this.fundAcct,
                    idNo: _this.idNo,
                    idTp: _this.idTp,
                    invNm: _this.invNm,
                    invTp: _this.invTp,
                    mobile: _this.mobile,
                    tradeAcct: _this.tradeAcct
                },
                success: function (result) {
                    if (result.error === 0) {
                        console.log(result);
                        if (Array.isArray(result.data)) {
                            _this.dialogData = result.data;
                            _this.showDialog('', 'select-info', '')
                        } else {
                            var fundAcct='';
                            for(var i=0 ; i<result.data.fundAcct.length;i++){
                                    fundAcct+=result.data.fundAcct[i].fundAcct+',';
                            }
                            var formatFundAcct=fundAcct.substr(0,fundAcct.length-1);
                            _this.$set(_this.tableData, 'userInfo', result.data.userInfo);
                            _this.$set(_this.tableData, 'bankCard', result.data.bankCard);
                            _this.$set(_this.tableData, 'fundAcct', formatFundAcct);
                        }
                        // _this.tableData=result.data;
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        //弹窗获取信息
        dialogQuery: function (item) {
            var _this = this;
            $.post({//注册登记代码
                url: '/businessMgmt/attendQuery/customerDataQuery/userInfoByDialog.ajax',
                data: {
                    custNo: item
                },
                success: function (result) {
                    if (result.error === 0) {
                        var fundAcct='';
                        for(var i=0 ; i<result.data.fundAcct.length;i++){
                            fundAcct+=result.data.fundAcct[i].fundAcct+',';
                        }
                        var formatFundAcct=fundAcct.substr(0,fundAcct.length-1);
                        _this.$set(_this.tableData, 'userInfo', result.data.userInfo);
                        _this.$set(_this.tableData, 'bankCard', result.data.bankCard);
                        _this.$set(_this.tableData, 'fundAcct', formatFundAcct);
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        //切换状态
        changeTy: function () {
            if (this.invTp == 0 || this.invTp == 1) {
                this.idTp = 0;
            } else {
                this.idTp = 9;
            }
        },
        //清空按钮
        wipeData: function () {
            this.idNo = '';
            this.invNm = '';
            this.fundAcct = '';
            this.tradeAcct = '';
            this.mobile = '';
            //客户类型
            this.invTp = '1';
            // 查询:证件类型参数
            this.idTp = '0';
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
        },

    },
    // 类型状态
    filters: {}
});