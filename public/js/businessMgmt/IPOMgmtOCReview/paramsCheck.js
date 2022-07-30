new Vue({
    el: '#content',
    data: {
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        pageMaxNum: 100,
        diaMsg: '',
        tableData: [],
        FundIdList: [],
        approveStatus: 'N',
        fundId: 'ALL',
        approveData: {},
        reviewSt: true
    },
    mounted: function () {
        var dialogs = ['info', 'approveInfo'];
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
        this.getFundIdList();
        this.getTableData();
        $('#firstMenu').css('width', '180px').select2({});
        $("#firstMenu").on("select2:select", function (e) {
            // e 的话就是一个对象 然后需要什么就 “e.参数” 形式 进行获取
            this.fundId = e.params.data.id;
        }.bind(this));
    },
    computed: {
        //主表格分页
        middleData: function () {
            var middleData = [];
            var pageMaxNum = parseInt(this.pageMaxNum);
            if (this.tableData.length <= pageMaxNum) {
                middleData.push(this.tableData);
                return middleData;
            }
            else {
                var i = 0;
                while ((i + 1) * pageMaxNum < this.tableData.length) {
                    middleData.push(this.tableData.slice(i * pageMaxNum, (i + 1) * pageMaxNum));
                    i++;
                }
                middleData.push(this.tableData.slice(i * pageMaxNum, this.tableData.length));
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
            }
            else if (this.currentIndex <= this.maxSpace && this.middleData.length - this.currentIndex > this.maxSpace) {
                for (var i = 0; i < this.currentIndex + (2 * this.maxSpace - this.currentIndex); i++) {
                    arr.push(i + 1);
                }
            }
            else if (this.currentIndex > this.maxSpace && this.middleData.length - this.currentIndex <= this.maxSpace) {
                var space = this.middleData.length - this.currentIndex;
                for (var i = this.currentIndex - (2 * this.maxSpace - space); i < this.middleData.length; i++) {
                    arr.push(i + 1);
                }
            }
            else {
                for (var i = 0; i < this.middleData.length; i++) {
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
        getFundIdList: function () {
            $.post({
                url: '/businessMgmt/IPOMgmtOCReview/paramsCheck/fundIdList.ajax ',
                success: function (result) {
                    if (result.error == 0) {
                        this.FundIdList = result.data
                    }
                    else {
                        this.showDialog('', 'info', false, result.msg);
                    }
                }.bind(this)
            });
        },
        getTableData: function () {

            var params = {
                fundId: this.fundId,
                approveStatus: this.approveStatus
            };
            $.post({
                url: '/businessMgmt/IPOMgmtOCReview/paramsCheck/tableData.ajax ',
                data: params,
                success: function (result) {
                    if (this.approveStatus === 'N') {
                        this.reviewSt = true
                    } else {
                        this.reviewSt = false
                    }
                    if (result.error == 0) {
                        if (result.data.length === 0) {
                            this.tableData = []
                        } else {
                            this.tableData = result.data
                        }
                    }
                    else {
                        this.showDialog('', 'info', false, result.msg);
                    }
                }.bind(this)
            });
        },
        tips: function (fundId, status, text) {
            this.approveData = {
                fundId: fundId,
                approveStatus: status
            }
            this.showDialog('', 'approveInfo', false, '确定' + text + '基金' + fundId + '吗？');
        },
        approve: function () {
            var params = this.approveData;
            $.post({
                url: '/businessMgmt/IPOMgmtOCReview/paramsCheck/approve.ajax ',
                data: params,
                success: function (result) {
                    if (result.error == 0) {
                        this.showDialog('approveInfo', 'info', false, result.msg);
                        this.getTableData()
                    }
                    else {
                        this.showDialog('approveInfo', 'info', false, result.msg);
                    }
                }.bind(this)
            });
        }
    },
    filters: {
        statusText: function (value) {
            if (value === 'N') {
                return '待复核'
            } else if (value === 'S') {
                return '复核通过'
            } else if (value === 'F') {
                return '复核驳回'
            } else {
                return value
            }
        },
        taText: function (value) {
            if (value === '1') {
                return '支持'
            } else if (value === '0') {
                return '不支持'
            } else {
                return value
            }
        },
    }
});