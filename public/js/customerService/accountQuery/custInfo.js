Vue.component('falsePage', {
    template: '#falsePage',
    props: {
        tableData: [Array, Object]
    },
    data: function () {
        return {
            //加分页数据
            currentIndex: 0,
            maxSpace: 5,
            pageMaxNum: '10',
            condition: '',
        }
    },
    computed: {
        //加分页数据
        middleData: function () {
            var middleData = [];
            var filterData = [];
            var pageMaxNum = parseInt(this.pageMaxNum);
            this.tableData.forEach(function (jsonObj) {
                var valueArr = [];
                for (var prop in jsonObj) {
                    valueArr.push(jsonObj[prop]);
                }
                for (var i = 0, len = valueArr.length; i < len; i++) {
                    if (valueArr[i]) {
                        if (valueArr[i].toString().indexOf(this.condition) != -1) {
                            filterData.push(jsonObj);
                            break;
                        }
                    }
                }
            }, this);
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
        },
    },
    watch: {
        pageMaxNum: function (val, oldval) {
            this.currentIndex = 0;
        },
        condition: function () {
            this.currentIndex = 0;
        }
    },
    methods: {
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
        },
    },
    filters: {
        chineseCardType: function (value) {
            if (value == '1') {
                return '信用卡';
            }
            if (value == '0') {
                return '借记卡';
            }
            return value;
        }
    }
})
new Vue({
    el: '#content',
    data: function () {
        return {
            // 主页面相关数据
            unfreezeList: [],
            freezeList: [],
            frozenReason: [],//冻结原因  对应关系
            custInfo: [],//客户基本信息
            userLabel: [],//客户标签信息
            custAsset: [],//客户资产信息
            switchInfo: [],//安全中心数据
            tiedCard: [],//客户绑卡信息
            diaMsg: '',

            // 查询
            custNo: '',//1005703921
            invNm: '',
            idNo: '',
            mobile: '',
            bankAcco: '',
            tradeAcct: '',
            // pageNo: 1,
            // pageSize: 1000,
            queryCustNo: '',
            operateData: [],
            directData: [],
            event: '',
            loading: false,
            custList: [],
            directchannelst: '',
            //主表格分页数据
            userHistoryPage: {
                userHistory: [],//账户限制记录
                currentIndex: 0,
                maxSpace: 5,
                totalPage: 0,
                pageMaxNum: 10,
                method: function (currentIndex) {
                    this.getUserHistory(currentIndex)
                }.bind(this)
            },
            tradeRecordsPage: {
                tradeRecords: [],//客户直销交易记录
                currentIndex: 0,
                maxSpace: 5,
                totalPage: 0,
                pageMaxNum: 10,
                method: function (currentIndex) {
                    this.getTradeRecords(currentIndex)
                }.bind(this)
            }
        }
    },
    created: function () {
        $.post({
            url: '/customerService/accountQuery/custInfo/frozenReason.ajax',
            success: function (result) {
                if (result.error === 0) {
                    this.frozenReason = result.data;
                } else {
                    this.showDialog("", "info", false, result.msg)
                }
            }.bind(this)
        });
    },
    mounted: function () {
        var dialogs = ['info', 'unfreezeList', 'freezeList', 'freezeInfo', 'freezeDirect', 'custList'];
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

        pageList: function () {
            return function () {
                var arr = [];
                if (this.totalPage <= 2 * this.maxSpace) {
                    for (var i = 0; i < this.totalPage; i++) {
                        arr.push(i + 1);
                    }
                    return arr;
                }
                if (this.currentIndex > this.maxSpace && this.totalPage - this.currentIndex > this.maxSpace) {
                    for (var i = this.currentIndex - this.maxSpace; i < this.currentIndex + this.maxSpace; i++) {
                        arr.push(i + 1);
                    }
                } else if (this.currentIndex <= this.maxSpace && this.totalPage - this.currentIndex > this.maxSpace) {
                    for (var i = 0; i < this.currentIndex + (2 * this.maxSpace - this.currentIndex); i++) {
                        arr.push(i + 1);
                    }
                } else if (this.currentIndex > this.maxSpace && this.totalPage - this.currentIndex <= this.maxSpace) {
                    var space = this.totalPage - this.currentIndex;
                    for (var i = this.currentIndex - (2 * this.maxSpace - space); i < this.totalPage; i++) {
                        arr.push(i + 1);
                    }
                } else {
                    for (var i = 0; i < this.totalPage; i++) {
                        arr.push(i + 1);
                    }
                }
                return arr;
            }
        },
        //主表格分页方法
        prev: function () {
            return function () {
                if (this.currentIndex <= 0) {
                    return;
                }
                this.method(this.currentIndex - 1);
            }
        },
        next: function () {
            return function () {
                if (this.currentIndex >= this.totalPage - 1) {
                    return;
                }
                this.method(this.currentIndex + 1);
            }
        },
        changeIndex: function () {
            return function (index) {
                this.method(index - 1);
            }
        },
        toFirst: function () {
            return function () {
                this.method(0);
            }
        },
        toLast: function () {
            return function () {
                this.method(this.totalPage - 1);
            }
        },
    },

    methods: {

        getTableData: function (cust) {
            this.loading = true;
            var params = {}
            params.custNo = this.queryCustNo = cust ? cust : this.custNo;
            this.getTradeRecords(0)
            this.getUserHistory(0)
            $.post({
                url: '/customerService/accountQuery/custInfo/getInfo.ajax',
                data: params,
                success: function (result) {
                    this.loading = false;
                    if (result.error === 0) {
                        this.custInfo = result.data.custInfo ? [result.data.custInfo] : [];
                        this.directchannelst = result.data.custInfo ? result.data.custInfo.directchannelst : '';
                        this.userLabel = result.data.userLabel ? [result.data.userLabel] : [];
                        this.custAsset = result.data.custAsset ? result.data.custAsset : [];
                        this.switchInfo = result.data.switchInfo ? [result.data.switchInfo] : [];
                        this.tiedCard = result.data.tiedCard ? result.data.tiedCard : [];//客户绑卡信息
                        this.showDialog("info", "", false)
                        if (result.msg !== '查询成功') {
                            this.showDialog("", "info", false, result.msg)
                        }
                    } else {
                        this.custInfo = [];
                        this.userLabel = [];
                        this.custAsset = [];
                        this.switchInfo = [];
                        this.tiedCard = [];
                        this.showDialog("", "info", false, result.msg)
                    }
                }.bind(this)
            });
        },
        getTradeRecords: function (currentIndex) {//客户直销交易记录
            var params = {
                pageNo: currentIndex + 1,
                pageSize: this.tradeRecordsPage.pageMaxNum,
                custNo: this.queryCustNo
            };
            $.post({
                url: '/customerService/accountQuery/custInfo/tradeRecords.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        this.tradeRecordsPage.tradeRecords = result.data.results ? result.data.results : [];//客户直销交易记录
                        this.tradeRecordsPage.currentIndex = result.data.pageNo - 1;
                        this.tradeRecordsPage.totalPage = result.data.totalPage;
                    } else {
                        this.tradeRecordsPage.tradeRecords = [];
                        this.tradeRecordsPage.currentdex = 0;
                        this.tradeRecordsPage.totalPage = 0;
                        this.showDialog('', 'info', false, result.msg);
                    }
                }.bind(this)
            });
        },
        getUserHistory: function (currentIndex) { //账户限制记录
            var params = {
                pageNo: currentIndex + 1,
                pageSize: this.tradeRecordsPage.pageMaxNum,
                custNo: this.queryCustNo
            };
            $.post({
                url: '/customerService/accountQuery/custInfo/userHistory.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        this.userHistoryPage.userHistory = result.data.results ? result.data.results : [];//账户限制记录
                        this.userHistoryPage.currentIndex = result.data.pageNo - 1;
                        this.userHistoryPage.totalPage = result.data.totalPage;
                    } else {
                        this.userHistoryPage.userHistory = [];
                        this.userHistoryPage.currentdex = 0;
                        this.userHistoryPage.totalPage = 0;
                        this.showDialog('', 'info', false, result.msg);
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
        getUnfreezeList: function () {
            if (this.queryCustNo === '') {
                return this.showDialog('', 'info', false, '请先查询数据')
            }
            this.loading = true;
            var params = {
                custNo: this.queryCustNo
            };
            $.post({
                url: '/customerService/accountQuery/custInfo/unfreezeList.ajax',
                data: params,
                success: function (result) {
                    this.loading = false;
                    if (result.error === 0) {
                        this.unfreezeList = result.data.map(function (item) {
                            item.check = false;
                            return item;
                        });
                        this.showDialog("", "unfreezeList")
                    } else {
                        this.unfreezeList = [];
                        this.showDialog("", "info", false, result.msg)
                    }
                }.bind(this)
            });
        },
        getFreezeList: function () {
            if (this.queryCustNo === '') {
                return this.showDialog('', 'info', false, '请先查询数据')
            }
            this.loading = true;
            var params = {
                custNo: this.queryCustNo
            };
            $.post({
                url: '/customerService/accountQuery/custInfo/freezeList.ajax',
                data: params,
                success: function (result) {
                    this.loading = false;
                    if (result.error === 0) {
                        this.freezeList = result.data.map(function (item) {
                            item.check = false;
                            return item;
                        });
                        this.showDialog("", "freezeList")
                    } else {
                        this.unfreezeList = [];
                        this.showDialog("", "info", false, result.msg)
                    }
                }.bind(this)
            });
        },
        // active: function (item) {
        //     this.$set(item, 'check', !item.check)
        // }
        freeze: function () {
            this.operateData.forEach(function (item) {
                // item.tradeFrozen = 1
                delete item.check
            })

            var params = {
                custNo: this.queryCustNo,
                branches: this.operateData
            };
            $.post({
                url: '/customerService/accountQuery/custInfo/frozen.ajax',
                data: params,
                success: function (result) {
                    this.loading = false;
                    if (result.error === 0) {
                        this.operateData = [];
                        this.getTableData(this.queryCustNo)
                        this.showDialog("freezeInfo", "info", false, result.msg + '，正在更新列表')
                    } else {
                        this.showDialog("freezeInfo", "info", false, result.msg)
                    }
                }.bind(this)
            });
        },
        unfreeze: function () {
            this.operateData.forEach(function (item) {
                // item.tradeFrozen = 1
                delete item.check
            })
            var params = {
                custNo: this.queryCustNo,
                branches: this.operateData
            };
            $.post({
                url: '/customerService/accountQuery/custInfo/unfreeze.ajax',
                data: params,
                success: function (result) {
                    this.loading = false;
                    if (result.error === 0) {
                        this.operateData = [];
                        this.getTableData(this.queryCustNo)
                        this.showDialog("freezeInfo", "info", false, result.msg + '，正在更新列表')
                    } else {
                        this.showDialog("freezeInfo", "info", false, result.msg)
                    }
                }.bind(this)
            });
        },
        confirmOperate: function () {
            this.loading = true;
            if (this.event === 'unfreezeList') {
                return this.freeze();
            }
            this.unfreeze()
        },
        operate: function (list) {
            var branches = [];
            this[list].forEach(function (item) {
                if (item.check) {
                    branches.push(item)
                }
            }, this)
            if (branches.length === 0) {
                return this.showDialog(list, "info", true, '请选择渠道')
            }
            this.operateData = branches
            this.event = list
            this.showDialog(list, "freezeInfo", false, '确定执行该操作吗？')
        },
        direct: function () {
            if (this.queryCustNo === '') {
                return this.showDialog('', 'info', false, '请先查询数据')
            }
            return this.showDialog('', 'freezeDirect')

        },
        freezeDirect: function () {
            this.loading = true;
            var params, url;
            if (this.directchannelst === 'F') {
                url = '/customerService/accountQuery/custInfo/unfreeze.ajax';
                params = {
                    custNo: this.queryCustNo,
                    branches: [
                        {
                            allowUnfreezeSelf: this.custInfo[0].allowUnfreezeSelf,
                            branchCode: "247",
                            custNo: this.queryCustNo,
                            idno: this.custInfo[0].idno,
                            idtp: this.custInfo[0].idtp,
                            invnm: this.custInfo[0].invnm,
                            reason: "直销交易解冻",
                            reasonCommont: this.custInfo[0].reasonCommont,
                            status: "",
                            invtp: this.custInfo[0].invtp,
                            tradeFrozen: 1
                        }
                    ]
                };
            } else {
                url = '/customerService/accountQuery/custInfo/frozen.ajax'
                var params = {
                    branches: [{
                        allowUnfreezeSelf: this.custInfo[0].allowUnfreezeSelf,
                        branchCode: "247",
                        custNo: this.queryCustNo,
                        idno: this.custInfo[0].idno,
                        idtp: this.custInfo[0].idtp,
                        invnm: this.custInfo[0].invnm,
                        reason: "直销交易冻结",
                        reasonCommont: this.custInfo[0].reasonCommont,
                        invtp: this.custInfo[0].invtp,
                        status: "",
                        tradeFrozen: 1
                    }],
                    custNo: this.queryCustNo
                }
            }



            $.post({
                url: url,
                data: params,
                success: function (result) {
                    this.loading = false;
                    if (result.error === 0) {
                        this.operateData = [];
                        this.getTableData(this.queryCustNo)
                        this.showDialog("freezeDirect", "info", false, result.msg + '，正在更新列表')
                    } else {
                        this.showDialog("freezeDirect", "info", false, result.msg)
                    }
                }.bind(this)
            });
        },
        checkParams: function () {
            // custNo: '',//1005703921
            // invNm:'',
            // idNo:'',
            // mobile:'',
            // bankAcco:'',
            // tradeAcct:'',
            if (this.custNo === '' && this.invNm === '' && this.idNo === '' && this.mobile === '' && this.bankAcco === '' && this.tradeAcct === '') {
                return this.showDialog("", "info", false, '请输入查询条件');
            }
            if (this.custNo !== '') {
                this.getTableData();
            } else if (this.bankAcco !== '') {
                this.getCustNo('/customerService/accountQuery/custInfo/custNoByBank.ajax', {
                    bankAcco: this.bankAcco
                })
            } else {
                this.getCustNo('/customerService/accountQuery/custInfo/getCustNo.ajax', {
                    invNm: this.invNm,
                    idNo: this.idNo,
                    tradeAcct: this.tradeAcct,
                    mobile: this.mobile,
                    custSts: ["N", "B", "F"]
                })
            }
        },
        getCustNo: function (url, params) {
            this.loading = true;
            $.post({
                url: url,
                data: params,
                success: function (result) {
                    this.loading = false;
                    if (result.error === 0) {
                        if (!result.data) {
                            this.showDialog("", "info", false, '未查询到客户')
                            return
                        }
                        if (result.data.length > 1) {
                            this.custList = result.data
                            this.showDialog("", "custList", false)
                        } else if (result.data.length === 0) {
                            this.showDialog("", "info", false, '未查询到客户')
                        } else {
                            this.getTableData(result.data[0].custNo)
                        }
                    } else {
                        this.showDialog("", "info", false, result.msg)
                    }
                }.bind(this)
            });
        },
        selectCust: function (custNo) {
            this.showDialog("custList", '', false)
            this.getTableData(custNo)
        }
    },
    filters: {
        chineseCardType: function (value) {
            if (value == '1') {
                return '信用卡';
            }
            if (value == '0') {
                return '借记卡';
            }
            return value;
        },
        chineseApplyst: function (applyst, payst) {
            if (applyst = 'S' || (applyst == 'N' && payst == 'Y')) {
                return '成功';
            } else {
                return '失败';
            }
        },
        chineseCustst: function (value) {
            if (value === 'P') {
                return '部分冻结'
            } else if (value == 'A') {
                return '全渠道冻结'
            } else if (value === '--') {
                return value;
            } else if (value === '1') {
                return '交易冻结';
            }
            return '正常';
        },
        chineseLogonallowed: function (value) {
            if (value === 'Y') {
                return '正常'
            } else if (value === 'F') {
                return '冻结'
            } else {
                return '未知';
            }
        },
        accoRiskLevelText: function (value) {
            if (value === '000') {
                return '风险账户'
            } else if (value === '100') {
                return '可疑账户'
            } else if (value === '200') {
                return '基本账户'
            } else if (value === '300') {
                return '可信账户'
            } else {
                return value
            }
        }
    }
});