var vm = new Vue({
    el: '#content',
    data: {
        // 公共数据
        diaMsg: '',
        fundList: [],
        fundListInfo: {
            type: 1,
            position: '',
            dialogName: '',
            searchCondition: '',
            fundList1: [],
            fundList2: [],
            fundList3: []
        },
        // 服务端相关数据
        service: {
            // 查询条件
            status: '',
            // 弹窗数据
            dialog_isUpdate: true,
            dialog_updateId: '',
            dialog_folioName: '',
            dialog_folioId: '',
            dialog_folioDesc: '',
            dialog_folioRemark: '',
            dialog_version: 0,
            dialog_serialno: '',
            dialog_selectedFundList1: [],
            dialog_selectedFundList2: [],
            dialog_selectedFundList3: [],
            itemData: '',
            // 表格数据
            tableData: [],
            pageMaxNum: 10,
            currentIndex: 0,
            maxSpace: 2
        },
        // 本地相关数据
        local: {
            // 查询条件
            folioName: '',
            operate: '',
            status: '',
            // 弹窗数据
            dialog_isCheck: true,
            dialog_isUpdate: false,
            dialog_updateId: '',
            dialog_folioName: '',
            dialog_folioId: '',
            dialog_folioDesc: '',
            dialog_folioRemark: '',
            dialog_version: 0,
            dialog_serialno: '',
            dialog_selectedFundList1: [],
            dialog_selectedFundList2: [],
            dialog_selectedFundList3: [],
            // 列表数据
            itemData: '',
            dialog_isSubmitAgain: false,
            dialog_submitAgainId: '',
            tableData: [],
            pageMaxNum: 10,
            currentIndex: 0,
            maxSpace: 2
        }
    },
    created: function () {
        this.getFundList();
        this.searchLocal(); // 获取全部本地数据
        this.searchService(); // 获取服务端数据
    },
    mounted: function () {
        var dialogs = ['info', 'localRevert', 'serviceToLocalDelete', 'submitAgainDelete'];
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
        // 产品列表分页
        fundListForSearch: function () {
            var _this = this;
            return this.fundList.filter(function (item) {
                return (item.fundId && item.fundId.indexOf(_this.fundListInfo.searchCondition) > -1)
                    ||
                    (item.fundName && item.fundName.indexOf(_this.fundListInfo.searchCondition) > -1)
            });
        },
        //服务端表格分页
        middleData_service: function () {
            var pageMaxNum = parseInt(this.service.pageMaxNum);
            var tableData = this.service.tableData;
            var middleData = [];
            if (tableData.length <= pageMaxNum) {
                middleData.push(tableData);
                return middleData;
            }
            var i = 0;
            while ((i + 1) * pageMaxNum < tableData.length) {
                middleData.push(tableData.slice(i * pageMaxNum, (i + 1) * pageMaxNum));
                i++;
            }
            middleData.push(tableData.slice(i * pageMaxNum, tableData.length));
            return middleData;
        },
        viewData_service: function () {
            var currentIndex = parseInt(this.service.currentIndex);
            return this.middleData_service[currentIndex];
        },
        pageList_service: function () {
            var middleData = this.middleData_service;
            var currentIndex = this.service.currentIndex;
            var maxSpace = this.service.maxSpace;
            var arr = [];
            if (middleData.length <= 2 * maxSpace) {
                for (var i = 0; i < middleData.length; i++) {
                    arr.push(i + 1);
                }
                return arr;
            }
            if (currentIndex > maxSpace && middleData.length - currentIndex > maxSpace) {
                for (var i = currentIndex - maxSpace; i < currentIndex + maxSpace; i++) {
                    arr.push(i + 1);
                }
            } else if (currentIndex <= maxSpace && middleData.length - currentIndex > maxSpace) {
                for (var i = 0; i < currentIndex + (2 * maxSpace - currentIndex); i++) {
                    arr.push(i + 1);
                }
            } else if (currentIndex > maxSpace && middleData.length - currentIndex <= maxSpace) {
                var space = middleData.length - currentIndex;
                for (var i = currentIndex - (2 * maxSpace - space); i < middleData.length; i++) {
                    arr.push(i + 1);
                }
            } else {
                for (var i = 0; i < middleData.length; i++) {
                    arr.push(i + 1);
                }
            }
            return arr;
        },
        //本地表格分页
        middleData_local: function () {
            var pageMaxNum = parseInt(this.local.pageMaxNum);
            var tableData = this.local.tableData;
            var middleData = [];
            if (tableData.length <= pageMaxNum) {
                middleData.push(tableData);
                return middleData;
            }
            var i = 0;
            while ((i + 1) * pageMaxNum < tableData.length) {
                middleData.push(tableData.slice(i * pageMaxNum, (i + 1) * pageMaxNum));
                i++;
            }
            middleData.push(tableData.slice(i * pageMaxNum, tableData.length));
            return middleData;
        },
        viewData_local: function () {
            var currentIndex = parseInt(this.local.currentIndex);
            return this.middleData_local[currentIndex];
        },
        pageList_local: function () {
            var middleData = this.middleData_local;
            var currentIndex = this.local.currentIndex;
            var maxSpace = this.local.maxSpace;
            var arr = [];
            if (middleData.length <= 2 * maxSpace) {
                for (var i = 0; i < middleData.length; i++) {
                    arr.push(i + 1);
                }
                return arr;
            }
            if (currentIndex > maxSpace && middleData.length - currentIndex > maxSpace) {
                for (var i = currentIndex - maxSpace; i < currentIndex + maxSpace; i++) {
                    arr.push(i + 1);
                }
            } else if (currentIndex <= maxSpace && middleData.length - currentIndex > maxSpace) {
                for (var i = 0; i < currentIndex + (2 * maxSpace - currentIndex); i++) {
                    arr.push(i + 1);
                }
            } else if (currentIndex > maxSpace && middleData.length - currentIndex <= maxSpace) {
                var space = middleData.length - currentIndex;
                for (var i = currentIndex - (2 * maxSpace - space); i < middleData.length; i++) {
                    arr.push(i + 1);
                }
            } else {
                for (var i = 0; i < middleData.length; i++) {
                    arr.push(i + 1);
                }
            }
            return arr;
        }
    },
    watch: {
        'service.pageMaxNum': function () {
            this.service.currentIndex = 0;
        },
        'local.pageMaxNum': function () {
            this.local.currentIndex = 0;
        }
    },
    methods: {
        searchService: function () {
            var _this = this;
            $.post({
                url: '/publicConfig/assetAllocationMgmt/assetAllocationHandle/getServiceList.ajax',
                success: function (result) {
                    if (result.error == 0) {
                        _this.service.currentIndex = 0;
                        _this.service.tableData = result.data;
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        serviceCheckDialog: function (item) {
            this.service.dialog_isUpdate = false;
            this.service.dialog_updateId = '';
            this.service.dialog_folioName = item.portfolioInfo.folioName;
            this.service.dialog_folioId = item.portfolioInfo.folioId;
            this.service.dialog_folioDesc = item.portfolioInfo.folioDesc;
            this.service.dialog_folioRemark = item.portfolioInfo.folioRemark;
            this.service.dialog_version = 0;
            this.service.dialog_serialno = '';
            this.service.dialog_selectedFundList1 = item.prdPortfolioDetailList.filter(function (item) {
                return item.fundCategory === 'GENERAL';
            });
            this.service.dialog_selectedFundList2 = item.prdPortfolioDetailList.filter(function (item) {
                return item.fundCategory === 'VIP';
            });
            this.service.dialog_selectedFundList3 = item.prdPortfolioDetailList.filter(function (item) {
                return item.fundCategory === 'FUNDGROUP';
            });
            this.service.dialog_selectedFundList1.forEach(function (item) {
                var obj = this.fundListInfo.fundList1.filter(function (item2) {
                    return item2.fundId === item.fundid;
                })[0];
                item.fundType = obj ? obj.fundType : '-';
                item.fundName = obj ? obj.fundName : '-';
            }.bind(this));
            this.service.dialog_selectedFundList2.forEach(function (item) {
                var obj = this.fundListInfo.fundList2.filter(function (item2) {
                    return item2.fundId === item.fundid;
                })[0];
                item.fundType = obj ? obj.fundType : '-';
                item.fundName = obj ? obj.fundName : '-';
            }.bind(this));
            this.service.dialog_selectedFundList3.forEach(function (item) {
                var obj = this.fundListInfo.fundList3.filter(function (item2) {
                    return item2.fundId === item.fundid;
                })[0];
                item.fundType = obj ? obj.fundType : '-';
                item.fundName = obj ? obj.fundName : '-';
            }.bind(this));
            this.showDialog('', 'serviceToLocalUpdate');
        },
        showServiceToLocalUpdate: function (item) {
            this.service.dialog_isUpdate = true;
            this.service.dialog_updateId = item.portfolioInfo.folioId;
            this.service.dialog_folioName = item.portfolioInfo.folioName;
            this.service.dialog_folioId = item.portfolioInfo.folioId;
            this.service.dialog_folioDesc = item.portfolioInfo.folioDesc;
            this.service.dialog_folioRemark = item.portfolioInfo.folioRemark;
            this.service.dialog_version = item.portfolioInfo.version;
            this.service.dialog_serialno = item.portfolioInfo.serialno;
            this.service.dialog_selectedFundList1 = item.prdPortfolioDetailList.filter(function (item) {
                return item.fundCategory === 'GENERAL';
            });
            this.service.dialog_selectedFundList2 = item.prdPortfolioDetailList.filter(function (item) {
                return item.fundCategory === 'VIP';
            });
            this.service.dialog_selectedFundList3 = item.prdPortfolioDetailList.filter(function (item) {
                return item.fundCategory === 'FUNDGROUP';
            });
            this.service.dialog_selectedFundList1.forEach(function (item) {
                var obj = this.fundListInfo.fundList1.filter(function (item2) {
                    return item2.fundId === item.fundid;
                })[0];
                item.fundType = obj ? obj.fundType : '-';
                item.fundName = obj ? obj.fundName : '-';
            }.bind(this));
            this.service.dialog_selectedFundList2.forEach(function (item) {
                var obj = this.fundListInfo.fundList2.filter(function (item2) {
                    return item2.fundId === item.fundid;
                })[0];
                item.fundType = obj ? obj.fundType : '-';
                item.fundName = obj ? obj.fundName : '-';
            }.bind(this));
            this.service.dialog_selectedFundList3.forEach(function (item) {
                var obj = this.fundListInfo.fundList3.filter(function (item2) {
                    return item2.fundId === item.fundid;
                })[0];
                item.fundType = obj ? obj.fundType : '-';
                item.fundName = obj ? obj.fundName : '-';
            }.bind(this));
            this.showDialog('', 'serviceToLocalUpdate');
        },
        serviceToLocalUpdateCheck: function (dialogName) {
            if (!this.service.dialog_folioName) {
                this.showDialog(dialogName, 'info', true, '请填写方案名称');
                return false;
            }
            if (!this.service.dialog_folioId) {
                this.showDialog(dialogName, 'info', true, '请填写方案ID');
                return false;
            }
            if (!this.service.dialog_folioDesc) {
                this.showDialog(dialogName, 'info', true, '请填写方案说明');
                return false;
            }
            if (this.service.dialog_selectedFundList1.length === 0 && this.service.dialog_selectedFundList2.length === 0) {
                this.showDialog(dialogName, 'info', true, '公募和资管产品至少有一个不为空');
                return false;
            }
            if (this.service.dialog_selectedFundList1.length > 0 || this.service.dialog_selectedFundList3.length > 0) {
                var count = 0;
                this.service.dialog_selectedFundList1.forEach(function (item) {
                    count += Number(item.percentRatio) * 100;
                });
                this.service.dialog_selectedFundList3.forEach(function (item) {
                    count += Number(item.percentRatio) * 100;
                });
                if ((count / 100) !== 100) {
                    this.showDialog(dialogName, 'info', true, '公募基金和组合产品推荐配比之和应为100%');
                    return false;
                }
            }
            if (this.service.dialog_selectedFundList2.length > 0) {
                for (var i = 0; i < this.service.dialog_selectedFundList2.length; i++) {
                    if (this.service.dialog_selectedFundList2[i].recommendAmount < 0
                        || isNaN(Number(this.service.dialog_selectedFundList2[i].recommendAmount))) {
                        this.showDialog(dialogName, 'info', true, '资管产品列表中推荐配置金额格式错误');
                        return false;
                    }
                }
            }
            return true;
        },
        serviceToLocalUpdate: function () {
            if (!this.serviceToLocalUpdateCheck('serviceToLocalUpdate')) {
                return;
            }
            var _this = this;
            var service_id = this.service.dialog_updateId;
            var content = {
                portfolioInfo: {},
                prdPortfolioDetailList: []
            };
            content.portfolioInfo.folioName = this.service.dialog_folioName;
            content.portfolioInfo.folioId = this.service.dialog_folioId;
            content.portfolioInfo.folioDesc = this.service.dialog_folioDesc;
            content.portfolioInfo.folioRemark = this.service.dialog_folioRemark;
            content.portfolioInfo.version =  this.service.dialog_version;
            content.portfolioInfo.serialno =  this.service.dialog_serialno;
            content.prdPortfolioDetailList = this.formatTwoFundList(this.service.dialog_selectedFundList1, this.service.dialog_selectedFundList2, this.service.dialog_selectedFundList3);
            content.prdPortfolioDetailList.forEach(function (item) {
                item.folioId = this.service.dialog_folioId;
            }.bind(this));
            $.post({
                url: '/publicConfig/assetAllocationMgmt/assetAllocationHandle/serviceToLocalUpdate.ajax',
                data: {
                    service_id: service_id,
                    content: JSON.stringify(content)
                },
                success: function (result) {
                    if (result.error == 0) {
                        _this.showDialog('serviceToLocalUpdate', 'info', false, '已提交至经办数据');
                        _this.searchLocal();
                    }
                    else {
                        _this.showDialog('serviceToLocalUpdate', 'info', false, result.msg);
                    }
                }
            });
        },
        showServiceToLocalDelete: function (item) {
            this.service.itemData = JSON.stringify(item);
            this.showDialog('', 'serviceToLocalDelete');
        },
        serviceToLocalDelete: function () {
            var deleteData = JSON.parse(this.service.itemData);
            var content = {};
            var service_id = deleteData.id;
            var _this = this;
            $.post({
                url: '/publicConfig/assetAllocationMgmt/assetAllocationHandle/serviceToLocalDelete.ajax',
                data: {
                    service_id: service_id,
                    content: JSON.stringify(content)
                },
                success: function (result) {
                    if (result.error == 0) {
                        _this.showDialog('serviceToLocalDelete', 'info', false, '已提交至经办数据');
                        _this.searchLocal();
                    }
                    else {
                        _this.showDialog('serviceToLocalDelete', 'info', false, result.msg);
                    }
                }
            });
        },
        getFundList: function () {
            var _this = this;
            $.post({
                url: '/publicConfig/assetAllocationMgmt/assetAllocationHandle/getFundList.ajax',
                success: function (result) {
                    if (result.error == 0) {
                        result.data.fundList1.forEach(function (item) {
                            item.fundCategory = 'GENERAL';
                        });
                        result.data.fundList2.forEach(function (item) {
                            item.fundCategory = 'VIP';
                        });
                        result.data.fundList3.forEach(function (item) {
                            item.fundCategory = 'FUNDGROUP';
                        });
                        _this.fundListInfo.fundList1 = result.data.fundList1;
                        _this.fundListInfo.fundList2 = result.data.fundList2;
                        _this.fundListInfo.fundList3 = result.data.fundList3;
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        searchLocal: function () {
            var _this = this;
            var params = {
                folioName: this.local.folioName,
                operate: this.local.operate,
                status: this.local.status
            };
            $.post({
                url: '/publicConfig/assetAllocationMgmt/assetAllocationHandle/getLocalList.ajax',
                data: params,
                success: function (result) {
                    if (result.error == 0) {
                        _this.local.currentIndex = 0;
                        _this.local.tableData = result.data;
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        localCheckDialog: function (item) {
            this.local.dialog_isCheck = true;
            this.local.dialog_isUpdate = false;
            this.local.dialog_updateId = '';
            this.local.dialog_isSubmitAgain = false;
            this.local.dialog_submitAgainId = '';
            this.local.dialog_folioName = item.content.portfolioInfo.folioName;
            this.local.dialog_folioId = item.content.portfolioInfo.folioId;
            this.local.dialog_folioDesc = item.content.portfolioInfo.folioDesc;
            this.local.dialog_folioRemark = item.content.portfolioInfo.folioRemark;
            this.local.dialog_version = 0;
            this.local.dialog_serialno = '';
            this.local.dialog_selectedFundList1 = item.content.prdPortfolioDetailList.filter(function (item) {
                return item.fundCategory === 'GENERAL';
            });
            this.local.dialog_selectedFundList2 = item.content.prdPortfolioDetailList.filter(function (item) {
                return item.fundCategory === 'VIP';
            });
            this.local.dialog_selectedFundList3 = item.content.prdPortfolioDetailList.filter(function (item) {
                return item.fundCategory === 'FUNDGROUP';
            });
            this.local.dialog_selectedFundList1.forEach(function (item) {
                var obj = this.fundListInfo.fundList1.filter(function (item2) {
                    return item2.fundId === item.fundid;
                })[0];
                item.fundType = obj ? obj.fundType : '-';
                item.fundName = obj ? obj.fundName : '-';
            }.bind(this));
            this.local.dialog_selectedFundList2.forEach(function (item) {
                var obj = this.fundListInfo.fundList2.filter(function (item2) {
                    return item2.fundId === item.fundid;
                })[0];
                item.fundType = obj ? obj.fundType : '-';
                item.fundName = obj ? obj.fundName : '-';
            }.bind(this));
            this.local.dialog_selectedFundList3.forEach(function (item) {
                var obj = this.fundListInfo.fundList3.filter(function (item2) {
                    return item2.fundId === item.fundid;
                })[0];
                item.fundType = obj ? obj.fundType : '-';
                item.fundName = obj ? obj.fundName : '-';
            }.bind(this));
            this.showDialog('', 'updateLocal');
        },
        showAddLocal: function () {
            this.local.dialog_isCheck = false;
            this.local.dialog_isUpdate = false;
            this.local.dialog_updateId = '';
            this.local.dialog_isSubmitAgain = false;
            this.local.dialog_submitAgainId = '';
            this.local.dialog_folioName = '';
            this.local.dialog_folioId = '';
            this.local.dialog_folioDesc = '';
            this.local.dialog_folioRemark = '';
            this.local.dialog_version = 0;
            this.local.dialog_serialno = '';
            this.local.dialog_selectedFundList1 = [];
            this.local.dialog_selectedFundList2 = [];
            this.local.dialog_selectedFundList3 = [];
            this.showDialog('', 'addLocal');
        },
        showFundList: function (type, position, dialogName) { // 1:公募基金 2:资管产品 3:组合产品
            this.fundListInfo.type = type;
            this.fundListInfo.position = position;
            this.fundListInfo.dialogName = dialogName;
            this.fundListInfo.searchCondition = '';
            this.fundList = this.fundListInfo['fundList' + type];
            this.fundList.forEach(function (item) {
                item.check = false;
            });
            this.fundList.filter(function (item) {
                return this[position]['dialog_selectedFundList' + type].map(function (item) {
                        return item.fundId || item.fundid;
                    }).indexOf(item.fundId) > -1;
            }.bind(this)).forEach(function (item) {
                item.check = true;
            });
            this.showDialog(dialogName, 'fundList', true);
        },
        selectFund: function () {
            var fundListChecked = this.fundList.filter(function (item) {
                return item.check;
            });
            var _this = this;
            fundListChecked.forEach(function (item) {
                var hasSelectedFundsId = _this[_this.fundListInfo.position]['dialog_selectedFundList' + _this.fundListInfo.type].map(function (item) {
                    return item.fundId || item.fundid;
                });
                if (hasSelectedFundsId.indexOf(item.fundId || item.fundid) === -1) {
                    item.percentRatio = 0;
                    item.recommendAmount = 0;
                    _this[_this.fundListInfo.position]['dialog_selectedFundList' + _this.fundListInfo.type].push(item);
                }
            });
            this.showDialog('fundList');
        },
        removeFund: function (type, position, index) {
            var arr = this[position]['dialog_selectedFundList' + type];
            arr.splice(index, 1);
        },
        checkLocalAddDialog: function (dialogName) {
            if (!this.local.dialog_folioName) {
                this.showDialog(dialogName, 'info', true, '请填写方案名称');
                return false;
            }
            if (!this.local.dialog_folioId) {
                this.showDialog(dialogName, 'info', true, '请填写方案ID');
                return false;
            }
            if (!this.local.dialog_folioDesc) {
                this.showDialog(dialogName, 'info', true, '请填写方案说明');
                return false;
            }
            if (this.local.dialog_selectedFundList1.length === 0 && this.local.dialog_selectedFundList2.length === 0 && this.local.dialog_selectedFundList3.length === 0) {
                this.showDialog(dialogName, 'info', true, '公募，资管和组合产品至少有一个不为空');
                return false;
            }
            if (this.local.dialog_selectedFundList1.length > 0 || this.local.dialog_selectedFundList3.length > 0) {
                var count = 0;
                this.local.dialog_selectedFundList1.forEach(function (item) {
                    count += Number(item.percentRatio) * 100;
                });
                this.local.dialog_selectedFundList3.forEach(function (item) {
                    count += Number(item.percentRatio) * 100;
                });
                if ((count / 100) !== 100) {
                    this.showDialog(dialogName, 'info', true, '公募基金和组合产品推荐配比之和应为100%');
                    return false;
                }
            }
            if (this.local.dialog_selectedFundList2.length > 0) {
                for (var i = 0; i < this.local.dialog_selectedFundList2.length; i++) {
                    if (this.local.dialog_selectedFundList2[i].recommendAmount < 0
                        || isNaN(Number(this.local.dialog_selectedFundList2[i].recommendAmount))) {
                        this.showDialog(dialogName, 'info', true, '资管产品列表中推荐配置金额格式错误');
                        return false;
                    }
                }
            }
            return true;
        },
        addLocal: function () {
            if (!this.checkLocalAddDialog('addLocal')) {
                return;
            }
            var content = {
                portfolioInfo: {},
                prdPortfolioDetailList: []
            };
            content.portfolioInfo.folioName = this.local.dialog_folioName;
            content.portfolioInfo.folioId = this.local.dialog_folioId;
            content.portfolioInfo.folioDesc = this.local.dialog_folioDesc;
            content.portfolioInfo.folioRemark = this.local.dialog_folioRemark;
            content.portfolioInfo.version = this.local.dialog_version;
            content.portfolioInfo.serialno = this.local.dialog_serialno;
            content.prdPortfolioDetailList = this.formatTwoFundList(this.local.dialog_selectedFundList1, this.local.dialog_selectedFundList2, this.local.dialog_selectedFundList3);
            content.prdPortfolioDetailList.forEach(function (item) {
                item.folioId = this.local.dialog_folioId;
            }.bind(this));
            var url = '/publicConfig/assetAllocationMgmt/assetAllocationHandle/addLocalData.ajax';
            var _this = this;
            $.post({
                url: url,
                data: {
                    content: JSON.stringify(content)
                },
                success: function (result) {
                    if (result.error == 0) {
                        _this.showDialog('addLocal', 'info', false, '操作成功');
                        _this.searchLocal();
                    }
                    else {
                        _this.showDialog('addLocal', 'info', true, result.msg);
                    }
                }
            });
        },
        showLocalUpdate: function (item) {
            this.local.dialog_isCheck = false;
            this.local.dialog_isUpdate = true;
            this.local.dialog_updateId = item.local_id;
            this.local.dialog_isSubmitAgain = false;
            this.local.dialog_submitAgainId = '';
            this.local.itemData = JSON.stringify(item);
            this.local.dialog_folioName = item.content.portfolioInfo.folioName;
            this.local.dialog_folioId = item.content.portfolioInfo.folioId;
            this.local.dialog_folioDesc = item.content.portfolioInfo.folioDesc;
            this.local.dialog_folioRemark = item.content.portfolioInfo.folioRemark;
            this.local.dialog_version = item.content.portfolioInfo.version;
            this.local.dialog_serialno = item.content.portfolioInfo.serialno;
            this.local.dialog_selectedFundList1 = item.content.prdPortfolioDetailList.filter(function (item) {
                return item.fundCategory === 'GENERAL';
            });
            this.local.dialog_selectedFundList2 = item.content.prdPortfolioDetailList.filter(function (item) {
                return item.fundCategory === 'VIP';
            });
            this.local.dialog_selectedFundList3 = item.content.prdPortfolioDetailList.filter(function (item) {
                return item.fundCategory === 'FUNDGROUP';
            });
            this.local.dialog_selectedFundList1.forEach(function (item) {
                var obj = this.fundListInfo.fundList1.filter(function (item2) {
                    return item2.fundId === item.fundid;
                })[0];
                item.fundType = obj ? obj.fundType : '-';
                item.fundName = obj ? obj.fundName : '-';
            }.bind(this));
            this.local.dialog_selectedFundList2.forEach(function (item) {
                var obj = this.fundListInfo.fundList2.filter(function (item2) {
                    return item2.fundId === item.fundid;
                })[0];
                item.fundType = obj ? obj.fundType : '-';
                item.fundName = obj ? obj.fundName : '-';
            }.bind(this));
            this.local.dialog_selectedFundList3.forEach(function (item) {
                var obj = this.fundListInfo.fundList3.filter(function (item2) {
                    return item2.fundId === item.fundid;
                })[0];
                item.fundType = obj ? obj.fundType : '-';
                item.fundName = obj ? obj.fundName : '-';
            }.bind(this));
            this.showDialog('', 'updateLocal');
        },
        updateLocal: function () {
            if (!this.checkLocalAddDialog('updateLocal')) {
                return;
            }
            var params = {};
            var content = {
                portfolioInfo: {},
                prdPortfolioDetailList: []
            };
            content.portfolioInfo.folioName = this.local.dialog_folioName;
            content.portfolioInfo.folioId = this.local.dialog_folioId;
            content.portfolioInfo.folioDesc = this.local.dialog_folioDesc;
            content.portfolioInfo.folioRemark = this.local.dialog_folioRemark;
            content.portfolioInfo.version = this.local.dialog_version;
            content.portfolioInfo.serialno = this.local.dialog_serialno;
            content.prdPortfolioDetailList = this.formatTwoFundList(this.local.dialog_selectedFundList1, this.local.dialog_selectedFundList2, this.local.dialog_selectedFundList3);
            content.prdPortfolioDetailList.forEach(function (item) {
                item.folioId = this.local.dialog_folioId;
            }.bind(this));
            params.local_id = this.local.dialog_updateId;
            params.updateTime = JSON.parse(this.local.itemData).updateTime;
            params.content = JSON.stringify(content);
            var url = '/publicConfig/assetAllocationMgmt/assetAllocationHandle/updateLocalData.ajax';
            var _this = this;
            $.post({
                url: url,
                data: params,
                success: function (result) {
                    if (result.error == 0) {
                        _this.showDialog('updateLocal', 'info', false, '操作成功');
                        _this.searchLocal();
                    }
                    else {
                        _this.showDialog('updateLocal', 'info', true, result.msg);
                    }
                }
            });
        },
        formatTwoFundList: function (fundList1, fundList2, fundList3) {
            if (fundList1 && fundList2 && fundList3) {
                return fundList1.map(function (item) {
                    var obj = {
                        fundid: item.fundid || item.fundId,
                        fundCategory: item.fundCategory,
                        percentRatio: Number(item.percentRatio),
                        recommendAmount: 0
                    };
                    item.serialno && (obj.serialno = item.serialno);
                    item.hasOwnProperty('version') && (obj.version = item.version);
                    return obj;
                }).concat(fundList2.map(function (item) {
                    var obj = {
                        fundid: item.fundid || item.fundId,
                        fundCategory: item.fundCategory,
                        percentRatio: 0,
                        recommendAmount: Number(item.recommendAmount)
                    };
                    item.serialno && (obj.serialno = item.serialno);
                    item.hasOwnProperty('version') && (obj.version = item.version);
                    return obj;
                })).concat(fundList3.map(function (item) {
                    var obj = {
                        fundid: item.fundid || item.fundId,
                        fundCategory: item.fundCategory,
                        percentRatio: Number(item.percentRatio),
                        recommendAmount: 0
                    };
                    item.serialno && (obj.serialno = item.serialno);
                    item.hasOwnProperty('version') && (obj.version = item.version);
                    return obj;
                }));
            }
            return [];
        },
        showRevert: function (item) {
            this.local.itemData = JSON.stringify(item);
            this.showDialog('', 'localRevert', false);
        },
        revert: function () {
            var _this = this;
            var itemData = JSON.parse(_this.local.itemData);
            var params = {
                local_id: itemData.local_id,
                updateTime: itemData.updateTime
            };
            $.post({
                url: '/publicConfig/assetAllocationMgmt/assetAllocationHandle/revertLocalData.ajax',
                data: params,
                success: function (result) {
                    if (result.error == 0) {
                        _this.showDialog('localRevert', 'info', false, '撤销成功');
                        _this.searchLocal();
                    }
                    else {
                        _this.showDialog('localRevert', 'info', false, result.msg);
                    }
                }
            });
        },
        showSubmitAgain: function (item) {
            this.local.dialog_isCheck = false;
            this.local.dialog_isUpdate = false;
            this.local.dialog_updateId = '';
            this.local.dialog_isSubmitAgain = true;
            this.local.dialog_submitAgainId = item.local_id;
            this.local.itemData = JSON.stringify(item);
            this.local.dialog_folioName = item.content.portfolioInfo.folioName;
            this.local.dialog_folioId = item.content.portfolioInfo.folioId;
            this.local.dialog_folioDesc = item.content.portfolioInfo.folioDesc;
            this.local.dialog_folioRemark = item.content.portfolioInfo.folioRemark;
            this.local.dialog_version = item.content.portfolioInfo.version;
            this.local.dialog_serialno = item.content.portfolioInfo.serialno;
            this.local.dialog_selectedFundList1 = item.content.prdPortfolioDetailList.filter(function (item) {
                return item.fundCategory === 'GENERAL';
            });
            this.local.dialog_selectedFundList2 = item.content.prdPortfolioDetailList.filter(function (item) {
                return item.fundCategory === 'VIP';
            });
            this.local.dialog_selectedFundList3 = item.content.prdPortfolioDetailList.filter(function (item) {
                return item.fundCategory === 'FUNDGROUP';
            });
            this.local.dialog_selectedFundList1.forEach(function (item) {
                var obj = this.fundListInfo.fundList1.filter(function (item2) {
                    return item2.fundId === item.fundid;
                })[0];
                item.fundType = obj ? obj.fundType : '-';
                item.fundName = obj ? obj.fundName : '-';
            }.bind(this));
            this.local.dialog_selectedFundList2.forEach(function (item) {
                var obj = this.fundListInfo.fundList2.filter(function (item2) {
                    return item2.fundId === item.fundid;
                })[0];
                item.fundType = obj ? obj.fundType : '-';
                item.fundName = obj ? obj.fundName : '-';
            }.bind(this));
            this.local.dialog_selectedFundList3.forEach(function (item) {
                var obj = this.fundListInfo.fundList3.filter(function (item2) {
                    return item2.fundId === item.fundid;
                })[0];
                item.fundType = obj ? obj.fundType : '-';
                item.fundName = obj ? obj.fundName : '-';
            }.bind(this));
            // if (item.operate == 3) {
            //     this.showDialog('', 'submitAgainDelete');
            //     return;
            // }
            this.showDialog('', 'updateLocal');
        },
        submitAgain: function () {
            if (!this.checkLocalAddDialog('addLocal')) {
                return;
            }
            var content = {
                portfolioInfo: {},
                prdPortfolioDetailList: []
            };
            content.portfolioInfo.folioName = this.local.dialog_folioName;
            content.portfolioInfo.folioId = this.local.dialog_folioId;
            content.portfolioInfo.folioDesc = this.local.dialog_folioDesc;
            content.portfolioInfo.folioRemark = this.local.dialog_folioRemark;
            content.portfolioInfo.version = this.local.dialog_version;
            content.portfolioInfo.serialno = this.local.dialog_serialno;
            content.prdPortfolioDetailList = this.formatTwoFundList(this.local.dialog_selectedFundList1, this.local.dialog_selectedFundList2, this.local.dialog_selectedFundList3);
            content.prdPortfolioDetailList.forEach(function (item) {
                item.folioId = this.local.dialog_folioId;
            }.bind(this));
            var itemData = JSON.parse(this.local.itemData);
            var params = {};
            params.content = JSON.stringify(content);
            params.local_id = itemData.local_id;
            params.service_id = itemData.service_id;
            params.operate = itemData.operate;
            params.updateTime = itemData.updateTime;
            var _this = this;
            $.post({
                url: '/publicConfig/assetAllocationMgmt/assetAllocationHandle/submitLocalDataAgain.ajax',
                data: params,
                success: function (result) {
                    if (result.error == 0) {
                        _this.showDialog('updateLocal', 'info', false, '提交成功');
                        _this.searchLocal();
                    }
                }
            });
        },
        showDialog: function (dia1, dia2, callback, msg) {
            this.diaMsg = msg ? msg : '输入条件错误';
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
        prev: function (tabIndex) {
            var tabName = tabIndex == 1 ? 'service' : 'local';
            if (this[tabName].currentIndex <= 0) {
                this[tabName].currentIndex = 0;
            }
            else {
                this[tabName].currentIndex--;
            }
        },
        next: function (tabIndex) {
            var tabName = tabIndex == 1 ? 'service' : 'local';
            if (this[tabName].currentIndex >= this['middleData_' + tabName].length - 1) {
                this[tabName].currentIndex = this['middleData_' + tabName].length - 1;
            }
            else {
                this[tabName].currentIndex++;
            }
        },
        changeIndex: function (index, tabIndex) {
            var tabName = tabIndex == 1 ? 'service' : 'local';
            this[tabName].currentIndex = index - 1;
        },
        toFirst: function (tabIndex) {
            var tabName = tabIndex == 1 ? 'service' : 'local';
            this[tabName].currentIndex = 0;
        },
        toLast: function (tabIndex) {
            var tabName = tabIndex == 1 ? 'service' : 'local';
            this[tabName].currentIndex = this['middleData_' + tabName].length - 1;
        }
    },
    filters: {
        translateFundType: function (val) {
            if (val === 'V') {
                return '货币类';
            }
            if (val === 'R') {
                return '权益类';
            }
            if (val === 'F') {
                return '固收类';
            }
            if (val === 'O') {
                return '其他';
            }
            return val;
        }
    }
});


