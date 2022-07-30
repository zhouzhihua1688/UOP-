new Vue({
    el: '#content',
    data: {
        firmOfferId: '',    // 实盘ID:
        firmOfferName: '',    // 实盘名称:
        custNo: '',    // 主理人ID
        groupType: '',    // 组合类型
        rankField: 'yield_last_day',        // 排名字段
        firmOfferStatus: [], // 实盘状态
        //主页面相关数据
        tableData: [],
        diaMsg: '',
        // 查看详情
        operateId: '',
        detailInfo: {
            custInfo: {},
            showFundDetail: ''
        },
        refuseReason: '',
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        totalPage: 0,
        pageMaxNum: 10,

        statisticalList:[],  //实盘总金额等参数
    },
    computed: {
        pageList: function () {
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
    watch: {
        pageMaxNum: function () {
            this.currentIndex = 0;
            this.getTableData(0);
        },
        rankField: function () {
            this.currentIndex = 0;
            this.getTableData(0);
        }
    },
    mounted: function () {
        var _this = this;
        var dialogs = ['info', 'openNot', 'openNull'];
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
        $('#firmOfferStatus').chosen({
            search_contains: true,
            no_results_text: '未找到相关数据',
            disable_search_threshold: 6,
            width: '220px'
        });
        $('#firmOfferStatus').on('change', function (e, params) {
            if (_this.firmOfferStatus.indexOf(params.selected) === -1) {
                _this.firmOfferStatus.push(params.selected)
            }
            if (_this.firmOfferStatus.indexOf(params.deselected) > -1) {
                _this.firmOfferStatus.splice(_this.firmOfferStatus.indexOf(params.deselected), 1);
            }
            console.log(_this.firmOfferStatus);
        });
        // 2021-03-02 增加
        // 获取实盘总额等等参数
        $.post({
            url: '/messageCenter/socialMgmt/firmOfferRank/statistical.ajax',
            success: function (result) {
                if (result.error === 0) {
                    _this.statisticalList.push(result.data);
                } else {
                    _this.showDialog('', 'info', false, result.msg);
                }
            }
        });
        // 2021-03-02

        this.getTableData(0);
    },
    methods: {
        getTableData: function (currentIndex) {
            var params = {};
            params.groupType = this.groupType;
            params.rankField = this.rankField;
            params.firmOfferId = this.firmOfferId;
            params.firmOfferName = this.firmOfferName;
            params.custNo = this.custNo;
            params.firmOfferStatus = JSON.stringify(this.firmOfferStatus.filter(function (value) {
                return value;
            }));
            params.pageNo = currentIndex + 1;
            params.pageSize = this.pageMaxNum;
            var _this = this;
            $.post({
                url: '/messageCenter/socialMgmt/firmOfferRank/getTableData.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.tableData = result.data.rows;
                        _this.currentIndex = result.data.pageNum - 1;
                        _this.totalPage = result.data.pages;
                    } else {
                        _this.tableData = [];
                        _this.currentIndex = 0;
                        _this.totalPage = 0;
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        changeRankField: function (rankField) {
            this.rankField = rankField;
        },
        //查看实盘详情
        checkParams: function (item) {
            var _this = this;
            var params = {};
            params.groupId = item.firmOfferId;
            $.post({
                url: '/messageCenter/socialMgmt/firmOfferRank/checkParams.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.detailInfo = result.data;
                        _this.detailInfo.showFundDetail = result.data.fundDetails.map(function(item){
                            return item.fundName + '    ' + item.fundid + '    ' + item.fundPercent + '%'
                        }).join('\n');
                        _this.showDialog('', 'details');
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        goPublicPage: function () {
            window.location.href = '/messageCenter/socialMgmt/publicOfferReview.html?firmOfferId=' + this.detailInfo.firmOfferId;
        },
        goMessagePage: function () {
            window.location.href = '/messageCenter/auditMgmt/leaveWordMgmt.html?firmOfferId=' + this.detailInfo.firmOfferId;
        },
        //主表格分页方法
        prev: function () {
            if (this.currentIndex <= 0) {
                return;
            }
            this.getTableData(this.currentIndex - 1);
        },
        next: function () {
            if (this.currentIndex >= this.totalPage - 1) {
                return;
            }
            this.getTableData(this.currentIndex + 1);
        },
        changeIndex: function (index) {
            this.getTableData(index - 1);
        },
        toFirst: function () {
            this.getTableData(0);
        },
        toLast: function () {
            this.getTableData(this.totalPage - 1);
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
        }
    }
});
