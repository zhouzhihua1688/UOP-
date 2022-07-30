new Vue({
    el: '#content',
    data: {
        partnerid: "",
        fundid: "",
        filepath: "/opt/ecc/psp/cmbc/productInfo/prod_summary_313_0000010300_{YYYYMMDD}_1",
        diaMsg: ""
    },
    methods: {
        /*导出产品信息概要管理文件*/
        exportExcel: function () {
            var _this = this;
            if (_this.fundid === null || _this.fundid.length === 0) {
                _this.showDialog('', 'info', false, '导出失败,基金代码未选定');
                return;
            }
            var params = {};
            params.partnerid = _this.partnerid;
            params.fundid = _this.fundid;
            params.filepath = _this.filepath;
            console.log(params);
            $.get({
                url: '/thirdPartyOperation/products/profileinformation/download.ajax',
                data: params,
                success: function (result) {
                    console.log(params)
                    console.log(result)
                    if (result.error == 0) {
                        _this.showDialog('', 'info', false, result.data.errMsg);
                    } else {
                        _this.showDialog('', 'info', false, '导出失败');
                    }
                },
                error: function () {
                    _this.showDialog('', 'info', false, '导出失败');
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
        }
    }
});
