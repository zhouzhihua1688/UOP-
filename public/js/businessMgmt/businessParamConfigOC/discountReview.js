new Vue({
    el: '#content',
    data: {
        product: '',
        tradeType: '',
        tradeTypeList: [],
		oproduct: '',
        channel: '',
        channelList: [],
        custTypeList: [],
        operate: '',
        status: '',
        // 弹窗数据
        dialog_product: '',
        dialog_custType: '',
        dialog_tradeType: '',
        dialog_branchCode: '',
        dialog_channel: '',
        dialog_bankNo: '',
        dialog_oproduct: '',
        dialog_displayDiscount: '',
        dialog_tradeDiscount: '',
        dialog_startAmount: '',
        dialog_endAmount: '',
        dialog_remark: '',
        // 展示源数据
        needShowOriginData: false,
        origin_product: '',
        origin_custType: '',
        origin_tradeType: '',
        origin_branchCode: '',
        origin_channel: '',
        origin_bankNo: '',
        origin_oproduct: '',
        origin_displayDiscount: '',
        origin_tradeDiscount: '',
        origin_startTime: '',
        origin_endTime: '',
        origin_startAmount: '',
        origin_endAmount: '',
        origin_remark: '',
        itemData: '',
        remark: '',
        tableData: [],
        diaMsg: '',
        pageMaxNum: 10,
        currentIndex: 0,
        maxSpace: 2,
        service: {
            // 查询条件
            product: '',
            tradeType: '',
            tradeTypeList: [],
			oproduct: '',
            channel: '',
            channelList: [],
            // 表格数据
            tableData: [],
            pageMaxNum: 10,
            currentIndex: 0,
            maxSpace: 2
        }
    },
    mounted: function () {
        var dialogs = ['info', 'checkItem', 'reviewReject', 'reviewAccept'];
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
        $('.date-timepicker').datetimepicker({
            format: 'YYYY-MM-DD HH:mm:ss',//use this option to display seconds
            icons: {
                time: 'fa fa-clock-o',
                date: 'fa fa-calendar',
                up: 'fa fa-chevron-up',
                down: 'fa fa-chevron-down',
                previous: 'fa fa-chevron-left',
                next: 'fa fa-chevron-right',
                today: 'fa fa-arrows ',
                clear: 'fa fa-trash',
                close: 'fa fa-times'
            }
        }).next().on(ace.click_event, function () {
            $(this).prev().focus();
        });
        var fundArr = ['fundList_local', 'fundList_service', 'oFundList_local', 'oFundList_service'];
        fundArr.forEach(function (value) {
            $('#' + value).chosen({
                search_contains: true,
                no_results_text: '未找到相关基金信息',
                disable_search_threshold: 6,
                width: '170px'
            });
        });
        var _this = this;
        $('#fundList_local').on('change', function (e, params) {
            _this.product = params ? params.selected : '';
        });
        $('#fundList_service').on('change', function (e, params) {
            _this.service.product = params ? params.selected : '';
        });
		$('#oFundList_local').on('change', function (e, params) {
		    _this.oproduct = params ? params.selected : '';
		});
		$('#oFundList_service').on('change', function (e, params) {
		    _this.service.oproduct = params ? params.selected : '';
		});
        this.getDialogList(); // 获取基金列表
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
        getDialogList: function () {
            var _this = this;
            $.post({
                url: '/businessMgmt/businessParamConfigOC/discountReview/getDialogList.ajax',
                success: function (result) {
                    if (result.error == 0) {
                        _this.tradeTypeList = result.data.tradeTypeList;
                        _this.channelList = result.data.channelList;
                        _this.custTypeList = result.data.custTypeList;
                        _this.service.tradeTypeList = result.data.tradeTypeList;
                        _this.service.channelList = result.data.channelList;
                        var str = '';
                        result.data.fundList.forEach(function (item) {
                            str += '<option value="' + item.fundId + '">' + item.fundId + ' ' + item.fundName + '</option>';
                        });
                        var fundArr = ['fundList_local', 'fundList_service', 'oFundList_local', 'oFundList_service'];
                        fundArr.forEach(function (value) {
                            $('#' + value).html('<option value="">全部</option>'+'<option value="*">*默认缺省值</option>'  + str);
                            $('#' + value).trigger('chosen:updated');
                        });
                    }
                }
            });
        },
        searchService: function () {
            var _this = this;
            var params = {};
            params.product = this.service.product;
            params.tradeType = this.service.tradeType;
			this.service.tradeType == '05' && (params.oproduct = this.service.oproduct);
            params.channel = this.service.channel;
            $.post({
                url: '/businessMgmt/businessParamConfigOC/discountReview/getServiceList.ajax',
                data: params,
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
            var product = this.product;
            var tradeType = this.tradeType;
            var channel = this.channel;
            var operate = this.operate;
            var status = this.status;
            var _this = this;
            var params = {
                product: product,
                tradeType: tradeType,
                channel: channel,
                operate: operate,
                status: status
            };
			this.tradeType == '05' && (params.oproduct = this.oproduct);
            $.post({
                url: '/businessMgmt/businessParamConfigOC/discountReview/getLocalList.ajax',
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
            this.dialog_product = item.product;
            this.dialog_custType = item.showCustType;
            this.dialog_tradeType = item.showTradeType;
            this.dialog_branchCode = item.showBranchCode;
            this.dialog_channel = item.showChannel;
            this.dialog_bankNo = item.bankNo;
            this.dialog_oproduct = item.oproduct;
            this.dialog_displayDiscount = item.displayDiscount;
            this.dialog_tradeDiscount = item.tradeDiscount;
            $('#startTime').val(item.startTime);
            $('#endTime').val(item.endTime);
            this.dialog_startAmount = item.startAmount;
            this.dialog_endAmount = item.endAmount;
            this.dialog_remark = item.remark_service || item.remark;
            this.needShowOriginData = false;
            if(item.originData){
                this.needShowOriginData = true;
                this.origin_product = item.originData.product;
                this.origin_custType = item.originData.showCustType;
                this.origin_tradeType = item.originData.showTradeType;
                this.origin_branchCode = item.originData.showBranchCode;
                this.origin_channel = item.originData.showChannel;
                this.origin_bankNo = item.originData.bankNo;
                this.origin_oproduct = item.originData.oproduct;
                this.origin_displayDiscount = item.originData.displayDiscount;
                this.origin_tradeDiscount = item.originData.tradeDiscount;
                this.origin_startTime = item.originData.startTime;
                this.origin_endTime = item.originData.endTime;
                this.origin_startAmount = item.originData.startAmount;
                this.origin_endAmount = item.originData.endAmount;
                this.origin_remark = item.originData.remark;
            }
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
                url: '/businessMgmt/businessParamConfigOC/discountReview/reviewReject.ajax',
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
                url: '/businessMgmt/businessParamConfigOC/discountReview/reviewAccept.ajax',
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
        // 客户类型转换
        printCustType: function (value) {
            value = value.split(',');
            if (value.indexOf('*') > -1) {
                return '全部';
            }
            else {
                var _this = this;
                return value.map(function (custType) {
                    for (var i = 0; i < _this.custTypeList.length; i++) {
                        if (_this.custTypeList[i].key == custType) {
                            return _this.custTypeList[i].value;
                        }
                    }
                    return custType;
                });
            }
        },
        //主表格分页方法
        prev: function (tabIndex) {
            if(tabIndex == 1){
                var tabName = 'service';
                if (this[tabName].currentIndex <= 0) {
                    this[tabName].currentIndex = 0;
                }
                else {
                    this[tabName].currentIndex--;
                }
            }
            else {
                if (this.currentIndex <= 0) {
                    this.currentIndex = 0;
                }
                else {
                    this.currentIndex--;
                }
            }
        },
        next: function (tabIndex) {
            if(tabIndex == 1){
                var tabName = 'service';
                if (this[tabName].currentIndex >= this['middleData_' + tabName].length - 1) {
                    this[tabName].currentIndex = this['middleData_' + tabName].length - 1;
                }
                else {
                    this[tabName].currentIndex++;
                }
            }
            else {
                if (this.currentIndex >= this['middleData'].length - 1) {
                    this.currentIndex = this['middleData'].length - 1;
                }
                else {
                    this.currentIndex++;
                }
            }
        },
        changeIndex: function (index, tabIndex) {
            if(tabIndex == 1){
                var tabName = 'service';
                this[tabName].currentIndex = index - 1;
            }
            else {
                this.currentIndex = index - 1;
            }
        },
        toFirst: function (tabIndex) {
            if(tabIndex == 1){
                var tabName = 'service';
                this[tabName].currentIndex = 0;
            }
            else {
                this.currentIndex = 0;
            }
        },
        toLast: function (tabIndex) {
            if(tabIndex == 1){
                var tabName = 'service';
                this[tabName].currentIndex = this['middleData_' + tabName].length - 1;
            }
            else {
                this.currentIndex = this['middleData'].length - 1;
            }
        }
    }
});