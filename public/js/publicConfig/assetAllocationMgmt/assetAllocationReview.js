new Vue({
    el: '#content',
    data: {
        folioName: '',
        operate: '',
        status: '',
        // 弹窗数据
        dialog_folioName: '',
        dialog_folioId: '',
        dialog_folioDesc: '',
        dialog_folioRemark: '',
        dialog_selectedFundList1: [],
        dialog_selectedFundList2: [],
        dialog_selectedFundList3: [],
        itemData: '',
        remark: '',
        tableData: [],
        fundList: [],
        diaMsg: '',
        pageMaxNum: 10,
        currentIndex: 0,
        maxSpace: 2,
        service: {
            // 表格数据
            tableData: [],
            pageMaxNum: 10,
            currentIndex: 0,
            maxSpace: 2
        }
    },
    mounted: function () {
        var dialogs = ['info', 'reviewReject', 'reviewAccept'];
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
        this.getFundList(); // 获取基金列表
        this.search(); // 获取全部本地数据
        this.searchService(); // 获取服务端数据
    },
    computed: {
        middleData: function () {
            var pageMaxNum = parseInt(this.pageMaxNum);
            var tableData = this.tableData;
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
        viewData: function () {
            var currentIndex = parseInt(this.currentIndex);
            return this.middleData[currentIndex];
        },
        pageList: function () {
            var middleData = this.middleData;
            var currentIndex = this.currentIndex;
            var maxSpace = this.maxSpace;
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
    },
    watch: {
        pageMaxNum: function () {
            this.currentIndex = 0;
        }
    },
    methods: {
        getFundList: function () {
            var _this = this;
            $.post({
                url: '/publicConfig/assetAllocationMgmt/assetAllocationReview/getFundList.ajax',
                success: function (result) {
                    if (result.error == 0) {
                        _this.fundList = result.data;
                    }
                    else {
                        _this.fundList = [];
                    }
                }
            });
        },
        searchService: function () {
            var _this = this;
            $.post({
                url: '/publicConfig/assetAllocationMgmt/assetAllocationReview/getServiceList.ajax',
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
        search: function () {
            var folioName = this.folioName;
            var operate = this.operate;
            var status = this.status;
            var _this = this;
            var params = {
                folioName: folioName,
                operate: operate,
                status: status
            };
            $.post({
                url: '/publicConfig/assetAllocationMgmt/assetAllocationReview/getLocalList.ajax',
                data: params,
                success: function (result) {
                    if (result.error == 0) {
                        _this.currentIndex = 0;
                        _this.tableData = result.data;
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        checkDialog: function (item) {
            this.dialog_folioName = item.content.portfolioInfo.folioName;
            this.dialog_folioId = item.content.portfolioInfo.folioId;
            this.dialog_folioDesc = item.content.portfolioInfo.folioDesc;
            this.dialog_folioRemark = item.content.portfolioInfo.folioRemark;
            this.dialog_selectedFundList1 = item.content.prdPortfolioDetailList.filter(function(item){
                return item.fundCategory === 'GENERAL';
            });
            this.dialog_selectedFundList2 = item.content.prdPortfolioDetailList.filter(function(item){
                return item.fundCategory === 'VIP';
            });
            this.dialog_selectedFundList3 = item.content.prdPortfolioDetailList.filter(function(item){
                return item.fundCategory === 'FUNDGROUP';
            });
            this.dialog_selectedFundList1.forEach(function(item){
                var obj = this.fundList.filter(function(item2){
                    return item2.fundId === item.fundid;
                })[0];
                item.fundType = obj ? obj.fundType : '-';
                item.fundName = obj ? obj.fundName : '-';
            }.bind(this));
            this.dialog_selectedFundList2.forEach(function(item){
                var obj = this.fundList.filter(function(item2){
                    return item2.fundId === item.fundid;
                })[0];
                item.fundType = obj ? obj.fundType : '-';
                item.fundName = obj ? obj.fundName : '-';
            }.bind(this));
            this.dialog_selectedFundList3.forEach(function(item){
                var obj = this.fundList.filter(function(item2){
                    return item2.fundId === item.fundid;
                })[0];
                item.fundType = obj ? obj.fundType : '-';
                item.fundName = obj ? obj.fundName : '-';
            }.bind(this));
            this.showDialog('', 'checkItem');
        },
        checkServiceDialog: function (item) {
            this.dialog_folioName = item.portfolioInfo.folioName;
            this.dialog_folioId = item.portfolioInfo.folioId;
            this.dialog_folioDesc = item.portfolioInfo.folioDesc;
            this.dialog_folioRemark = item.portfolioInfo.folioRemark;
            this.dialog_selectedFundList1 = item.prdPortfolioDetailList.filter(function(item){
                return item.fundCategory === 'GENERAL';
            });
            this.dialog_selectedFundList2 = item.prdPortfolioDetailList.filter(function(item){
                return item.fundCategory === 'VIP';
            });
            this.dialog_selectedFundList3 = item.prdPortfolioDetailList.filter(function(item){
                return item.fundCategory === 'FUNDGROUP';
            });
            this.dialog_selectedFundList1.forEach(function(item){
                var obj = this.fundList.filter(function(item2){
                    return item2.fundId === item.fundid;
                })[0];
                item.fundType = obj ? obj.fundType : '-';
                item.fundName = obj ? obj.fundName : '-';
            }.bind(this));
            this.dialog_selectedFundList2.forEach(function(item){
                var obj = this.fundList.filter(function(item2){
                    return item2.fundId === item.fundid;
                })[0];
                item.fundType = obj ? obj.fundType : '-';
                item.fundName = obj ? obj.fundName : '-';
            }.bind(this));
            this.dialog_selectedFundList3.forEach(function(item){
                var obj = this.fundList.filter(function(item2){
                    return item2.fundId === item.fundid;
                })[0];
                item.fundType = obj ? obj.fundType : '-';
                item.fundName = obj ? obj.fundName : '-';
            }.bind(this));
            this.showDialog('', 'checkItem');
        },
        showReviewReject: function (item) {
            this.itemData = JSON.stringify(item);
            this.remark = '';
            this.showDialog('', 'reviewReject', false);
        },
        reviewReject: function () {
            var _this = this;
            var params = JSON.parse(this.itemData);
            params.remark = this.remark;
            $.post({
                url: '/publicConfig/assetAllocationMgmt/assetAllocationReview/reviewReject.ajax',
                data: params,
                success: function (result) {
                    if (result.error == 0) {
                        _this.showDialog('reviewReject', 'info', false, '已成功驳回');
                        _this.search();
                    }
                    else {
                        _this.showDialog('reviewReject', 'info', true, result.msg);
                    }
                }
            });
        },
        showReviewAccept: function (item) {
            this.itemData = JSON.stringify(item);
            this.showDialog('', 'reviewAccept', false);
        },
        reviewAccept: function () {
            var _this = this;
            var params = JSON.parse(this.itemData);
            $.post({
                url: '/publicConfig/assetAllocationMgmt/assetAllocationReview/reviewAccept.ajax',
                data: params,
                success: function (result) {
                    if (result.error == 0) {
                        _this.showDialog('reviewAccept', 'info', false, '已成功通过');
                        _this.search();
                        _this.searchService();
                    }
                    else {
                        _this.showDialog('reviewAccept', 'info', false, result.msg);
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
        prev: function () {
            if (this.currentIndex <= 0) {
                this.currentIndex = 0;
            }
            else {
                this.currentIndex--;
            }
        },
        next: function () {
            if (this.currentIndex >= this['middleData'].length - 1) {
                this.currentIndex = this['middleData'].length - 1;
            }
            else {
                this.currentIndex++;
            }
        },
        changeIndex: function (index) {
            this.currentIndex = index - 1;
        },
        toFirst: function () {
            this.currentIndex = 0;
        },
        toLast: function () {
            this.currentIndex = this['middleData'].length - 1;
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