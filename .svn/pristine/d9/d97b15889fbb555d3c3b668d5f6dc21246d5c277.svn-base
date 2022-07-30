new Vue({
    el: '#content',
    data: {
        fundId: '',
        tradeType: '',
        operate: '',
        status: '',
        itemData: '',
        remark: '',
        tableData: [],
        diaMsg: '',
        pageMaxNum: 10,
        currentIndex: 0,
        maxSpace: 2,
        // 服务端相关数据
        service: {
            fundId: '',
            tradeType: '00',
            tableData: [],
            pageMaxNum: 10,
            currentIndex: 0,
            maxSpace: 2
        },
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
        var fundArr = ['fundList', 'fundListService'];
        fundArr.forEach(function (value) {
            $('#' + value).chosen({
                search_contains: true,
                no_results_text: '未找到相关基金信息',
                disable_search_threshold: 6,
                width: '170px'
            });
        });
        var _this = this;
        $('#fundList').on('change', function (e, params) {
            _this.fundId = params ? params.selected : '';
        });
        $('#fundListService').on('change', function (e, params) {
            _this.service.fundId = params ? params.selected : '';
        });
        this.getFundList(); // 获取基金列表
        this.search(); // 获取全部本地数据
    },
    computed: {
        //服务端表格分页
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
                url: '/businessMgmt/IPOMgmtOC/datumRateReview/collection.ajax',
                success: function (result) {
                    if (result.error == 0) {
                        var str = '<option value=""></option>';
                        result.data.forEach(function (item) {
                            str += '<option value="' + item.fundId + '">' + item.fundId + ' ' + item.fundName + '</option>';
                        });
                        var fundArr = ['fundList', 'fundListService'];
                        fundArr.forEach(function (value) {
                            $('#' + value).html('<option value="">全部基金</option>' + str);
                            $('#' + value).trigger('chosen:updated');
                        });
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        search: function () {
            var fundId = this.fundId;
            var tradeType = this.tradeType;
            var operate = this.operate;
            var status = this.status;
            var _this = this;
            var params = {
                fundId: fundId,
                tradeType: tradeType,
                operate: operate,
                status: status
            };
            $.post({
                url: '/businessMgmt/IPOMgmtOC/datumRateReview/getLocalList.ajax',
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
        searchService: function () {
            var fundId = this.service.fundId;
            var tradeType = this.service.tradeType;
            if (!fundId) {
                this.showDialog('', 'info', false, '请选择要查询的基金');
                return;
            }
            if (!tradeType) {
                this.showDialog('', 'info', false, '请选择业务类型');
                return;
            }
            var _this = this;
            $.post({
                url: '/businessMgmt/IPOMgmtOC/datumRateReview/queryFeeList.ajax',
                data: {
                    fundId: fundId,
                    tradeType: tradeType,
                },
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
                url: '/businessMgmt/IPOMgmtOC/datumRateReview/reviewReject.ajax',
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
                url: '/businessMgmt/IPOMgmtOC/datumRateReview/reviewAccept.ajax',
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
    }
});