var vm = new Vue({
    el: '#content',
    data: {
        deleteId: '',
        invTp: '',
        accoFlg: 0, // 0,1: 直销 2:代销
        isForced: false, // 是否强制销户
        // 主页面相关数据
        idNo: '',
        tradeAcct: '',
        fundAcct: '',
        custInfoList: [],
        tableData: [],
        diaMsg: '',
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        pageMaxNum: 10,
        condition: ''
    },
    mounted: function () {
        var dialogs = ['info', 'delete'];
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
    computed: {
        //主表格分页
        middleData: function () {
            var middleData = [];
            var filterData = [];
            var pageMaxNum = parseInt(this.pageMaxNum);
            var _this = this;
            this.tableData.forEach(function (jsonObj) {
                var valueArr = [];
                for (var prop in jsonObj) {
                    valueArr.push(jsonObj[prop]);
                }
                for (var i = 0, len = valueArr.length; i < len; i++) {
                    if (valueArr[i]) {
                        if (valueArr[i].toString().indexOf(_this.condition) != -1) {
                            filterData.push(jsonObj);
                            break;
                        }
                    }
                }
            });
            if (filterData.length <= pageMaxNum) {
                middleData.push(filterData);
                return middleData;
            } else {
                var i = 0;
                while ((i + 1) * pageMaxNum < filterData.length) {
                    middleData.push(filterData.slice(i * pageMaxNum, (i + 1) * pageMaxNum));
                    i++;
                }
                middleData.push(filterData.slice(i * pageMaxNum, filterData.length));
                return middleData;
            }
        },
        viewData: function () {
            var currentIndex = parseInt(this.currentIndex);
            return this.middleData[currentIndex];
        },
        pageList: function () {
            var arr = [];
            if (this.middleData.length <= 2 * this.maxSpace) {
                for (var i = 0; i < this.middleData.length; i++) {
                    arr.push(i + 1);
                }
                return arr;
            }
            if (this.currentIndex > this.maxSpace && this.middleData.length - this.currentIndex > this.maxSpace) {
                for (var i = this.currentIndex - this.maxSpace; i < this.currentIndex + this.maxSpace; i++) {
                    arr.push(i + 1);
                }
            } else if (this.currentIndex <= this.maxSpace && this.middleData.length - this.currentIndex > this.maxSpace) {
                for (var i = 0; i < this.currentIndex + (2 * this.maxSpace - this.currentIndex); i++) {
                    arr.push(i + 1);
                }
            } else if (this.currentIndex > this.maxSpace && this.middleData.length - this.currentIndex <= this.maxSpace) {
                var space = this.middleData.length - this.currentIndex;
                for (var i = this.currentIndex - (2 * this.maxSpace - space); i < this.middleData.length; i++) {
                    arr.push(i + 1);
                }
            } else {
                for (var i = 0; i < this.middleData.length; i++) {
                    arr.push(i + 1);
                }
            }
            return arr;
        }
    },
    watch: {
        pageMaxNum: function () {
            this.currentIndex = 0;
        },
        condition: function () {
            this.currentIndex = 0;
        }
    },
    methods: {
        search: function () {
            var _this = this;
            var params = {};
            var url = '/customerService/custAccountMgmt/accountDelete/';
            if (this.tradeAcct || this.fundAcct) { // 传了交易账户或者基金账户
                params.tradeAcct = this.tradeAcct;
                params.fundAcct = this.fundAcct;
                url += 'getTableList.ajax';
            } else if (this.idNo) { // 传了idNo
                params.idNo = this.idNo;
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
                            _this.custInfoList = result.data;
                            _this.showDialog('', 'custInfoList');
                        } else {
                            _this.tableData = [_this.simpleData(result.data)];
                        }
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        queryCustInfoByCustNo: function (item) {
            var _this = this;
            var params = {};
            params.custNo = item.custNo
            $.post({
                url: '/customerService/custAccountMgmt/accountDelete/getTableList.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.tableData = [_this.simpleData(result.data)];
                        _this.showDialog('custInfoList');
                    } else {
                        _this.showDialog('custInfoList', 'info', false, result.msg);
                    }
                }
            });
        },
        showDelete: function (item) {
            if (!item) {
                return;
            }
            this.deleteId = item.custNo;
            this.invTp = item.invTp;
            this.accoFlg = item.accoFlg;
            this.isForced = false;
            this.showDialog('', 'delete', false);
        },
        deleteData: function () {
            if (!this.deleteId) {
                return;
            }
            var _this = this;
            $.post({
                url: '/customerService/custAccountMgmt/accountDelete/del.ajax',
                data: {
                    custNo: this.deleteId,
                    invTp: this.invTp,
                    accoFlg: this.accoFlg,
                    isForced: this.isForced
                },
                success: function (result) {
                    if (result.error === 0) {
                        _this.tableData = [];
                        _this.showDialog('delete', 'info', false, result.msg);
                    } else {
                        _this.showDialog('delete', 'info', true, result.msg);
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
                tradeAcct: obj.tradeAcct.tradeAcct,
                canDelete: obj.canDelete
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
        prev: function () {
            this.currentIndex <= 0 ? 0 : this.currentIndex--;
        },
        next: function () {
            this.currentIndex >= this.middleData.length - 1 ? this.middleData.length - 1 : this.currentIndex++;
        },
        changeIndex: function (index) {
            this.currentIndex = index - 1;
        },
        toFirst: function () {
            this.currentIndex = 0;
        },
        toLast: function () {
            this.currentIndex = this.middleData.length - 1;
        }
    }
});