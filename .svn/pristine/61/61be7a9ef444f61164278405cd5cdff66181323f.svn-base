var vm = new Vue({
    el: '#content',
    data: {
        // 主页面相关数据
        idNo_for_emigration: '',
        tradeAcct_for_emigration: '',
        fundAcct_for_emigration: '',
        custInfoList_for_emigration: [],
        tableData_for_emigration: [],
        idNo_for_immigration: '',
        tradeAcct_for_immigration: '',
        fundAcct_for_immigration: '',
        custInfoList_for_immigration: [],
        tableData_for_immigration: [],
        diaMsg: ''
    },
    mounted: function () {
        var dialogs = ['info', 'transform'];
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
        search_for_emigration: function () {
            var _this = this;
            var params = {};
            var url = '/customerService/custAccountMgmt/accountTransform/';
            if (this.tradeAcct_for_emigration || this.fundAcct_for_emigration) { // 传了交易账户或者基金账户
                params.tradeAcct = this.tradeAcct_for_emigration;
                params.fundAcct = this.fundAcct_for_emigration;
                url += 'getTableList.ajax';
            } else if (this.idNo_for_emigration) { // 传了idNo
                params.idNo = this.idNo_for_emigration;
                url += 'getCustInfoList.ajax';
            } else { // 什么都没传
                return this.showDialog('', 'info', false, '查询条件为空!');
            }
            $.post({
                url: url,
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        if (result.data instanceof Array) {
                            _this.custInfoList_for_emigration = result.data;
                            _this.showDialog('', 'custInfoList_for_emigration');
                        } else {
                            _this.tableData_for_emigration = [_this.simpleData(result.data)];
                        }
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        search_for_immigration: function () {
            var _this = this;
            var params = {};
            var url = '/customerService/custAccountMgmt/accountTransform/';
            if (this.tradeAcct_for_immigration || this.fundAcct_for_immigration) { // 传了交易账户或者基金账户
                params.tradeAcct = this.tradeAcct_for_immigration;
                params.fundAcct = this.fundAcct_for_immigration;
                url += 'getTableList.ajax';
            } else if (this.idNo_for_immigration) { // 传了idNo
                params.idNo = this.idNo_for_immigration;
                url += 'getCustInfoList.ajax';
            } else { // 什么都没传
                return this.showDialog('', 'info', false, '查询条件为空!');
            }
            $.post({
                url: url,
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        if (result.data instanceof Array) {
                            _this.custInfoList_for_immigration = result.data;
                            _this.showDialog('', 'custInfoList_for_immigration');
                        } else {
                            _this.tableData_for_immigration = [_this.simpleData(result.data)];
                        }
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        queryCustInfoByCustNo_for_emigration: function (item) {
            var _this = this;
            var params = {};
            params.custNo = item.custNo
            $.post({
                url: '/customerService/custAccountMgmt/accountTransform/getTableList.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.tableData_for_emigration = [_this.simpleData(result.data)];
                        _this.showDialog('custInfoList_for_emigration');
                    } else {
                        _this.showDialog('custInfoList_for_emigration', 'info', false, result.msg);
                    }
                }
            });
        },
        queryCustInfoByCustNo_for_immigration: function (item) {
            var _this = this;
            var params = {};
            params.custNo = item.custNo
            $.post({
                url: '/customerService/custAccountMgmt/accountTransform/getTableList.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.tableData_for_immigration = [_this.simpleData(result.data)];
                        _this.showDialog('custInfoList_for_immigration');
                    } else {
                        _this.showDialog('custInfoList_for_immigration', 'info', false, result.msg);
                    }
                }
            });
        },
        simpleData: function (obj) {
            var tableData = {
                invnm: obj.custInfo.invnm,
                mobile: obj.custInfo.mobile,
                custNo: obj.custInfo.custNo,
                invTp: obj.custInfo.invTp,
                accoFlg: obj.custInfo.invTp == 1 ? obj.custInfo.icifPerCust.accoFlg : obj.custInfo.icifICust.accoFlg,
                idNo: obj.custInfo.idno,
                fundAcct: obj.fundAcct.map(function (item) {
                    return item.fundAcct
                }).join(','),
                tradeAcct: obj.tradeAcct.tradeAcct
            };
            var directAssetTotalRmbBalance = 0;
            var directAssetTotalDollarBalance = 0;
            var proxyAssetTotalRmbBalance = 0;
            var proxyAssetTotalDollarBalance = 0;
            if (obj.directAsset) {
                if (obj.directAsset.totalRmbBalance && obj.directAsset.totalRmbBalance.totalAmt) {
                    directAssetTotalRmbBalance = obj.directAsset.totalRmbBalance.totalAmt;
                }
                if (obj.directAsset.totalDollarBalance && obj.directAsset.totalDollarBalance.totalAmt) {
                    directAssetTotalDollarBalance = obj.directAsset.totalDollarBalance.totalAmt;
                }
            }
            if (obj.proxyAsset) {
                if (obj.proxyAsset.totalRmbBalance && obj.proxyAsset.totalRmbBalance.totalAmt) {
                    proxyAssetTotalRmbBalance = obj.proxyAsset.totalRmbBalance.totalAmt;
                }
                if (obj.proxyAsset.totalDollarBalance && obj.proxyAsset.totalDollarBalance.totalAmt) {
                    proxyAssetTotalDollarBalance = obj.proxyAsset.totalDollarBalance.totalAmt;
                }
            }
            tableData.directAsset = directAssetTotalRmbBalance + (directAssetTotalDollarBalance ? ('，美元：' + directAssetTotalDollarBalance) : '');
            tableData.proxyAsset = proxyAssetTotalRmbBalance + (proxyAssetTotalDollarBalance ? ('，美元：' + proxyAssetTotalDollarBalance) : '');
            return tableData;
        },
        showCombineAccount: function () {
            if (this.tableData_for_emigration.length === 0) {
                return this.showDialog('', 'info', false, '未选择被合并的账户');
            }
            if (this.tableData_for_immigration.length === 0) {
                return this.showDialog('', 'info', false, '请选择要合并到的账户');
            }
            if (this.tableData_for_emigration[0].custNo === this.tableData_for_immigration[0].custNo) {
                return this.showDialog('', 'info', false, '不能合并同一账户，请选择其他账户');
            }
            this.showDialog('', 'transform');
        },
        combineAccount: function () {
            var _this = this;
            $.post({
                url: '/customerService/custAccountMgmt/accountTransform/combine.ajax',
                data: {
                    accountArr: JSON.stringify([_this.tableData_for_emigration[0], this.tableData_for_immigration[0]])
                },
                success: function (result) {
                    if (result.error === 0) {
                        _this.tableData_for_emigration = [];
                        _this.tableData_for_immigration = [];
                        _this.showDialog('transform', 'info', false, result.msg);
                    } else {
                        _this.showDialog('transform', 'info', true, result.msg);
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
        }
    }
});