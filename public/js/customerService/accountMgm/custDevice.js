new Vue({
    el: '#content',
    data: {
        // 主页面相关数据
        tableData: [],
        diaMsg: '',
        // 查询
        invnm: '123',
        idno: '341521198003031836',
        idtp: '0',
        custno: '',
        mobileno:'',
        status: ''        
    },
    mounted: function () {
        var dialogs = ['info', 'openOrCloseTips'];
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
    methods: {
        getCustInfoByIdNo: function (invnm, idtp, idno) {
            if (this.idno === '' || this.invnm === '' || this.idtp === '') {
                this.showDialog("", "info", false, '查询条件都必填')
                return;
            }
            var params = {
                idNo: idno,
                idTp: idtp,
                invNm: invnm
            };
            var url = '/customerService/accountMgm/custDevice/getCustInfoByIdNo.ajax';
            $.post({
                url: url,
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        this.custno = result.data.custNo;
                        this.invnm = result.data.invNm;
                        this.idno = result.data.idNo;
                        this.mobileno = result.data.mobile;
                        this.status = result.data.status;
                        var resultData={
                            "custno":this.custno,
                            "invnm": this.invnm,
                            "idno": this.idno,
                            "mobileno": this.mobileno,
                            "status": this.status
                        };
                        this.$set(this.tableData, 0, resultData);
                    } else {
                        this.custno = '';
                        this.tableData = []
                        this.showDialog("", "info", false, result.msg)
                    }
                }.bind(this)
            });
        },
        openOrCloseTips(val) {
            this.status = val
            this.showDialog("", "openOrCloseTips", false, '你确定要' + (val === '0' ? '打开' : '关闭') + '常用保护开关吗？')
        },
        openOrClose: function () {
            var params = {
                custNo: this.tableData[0].custno
            };
            var url = '/customerService/accountMgm/custDevice/custClose.ajax';
            if (this.status === '0') {
                url = '/customerService/accountMgm/custDevice/custOpen.ajax';
            }
            console.log(params)
            $.post({
                url: url,
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        this.getCustInfoByIdNo(this.invnm, this.idtp, this.idno);
                        this.showDialog("", "info", false, result.msg)
                    } else {
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


    },
    filters: {
        statusText: function (val) {
            if (val === '0') {
                return '未开通';
            } else if (val === '1') {
                return '已开通';
            } else {
                return val;
            }
        }
    }
});