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
        showChinese: { //选项
            fundtpList: [],
            fundrisklevelList: [],
            displayfundtpList: [],
            tanoList: [],
            sharetypeList: [{
                    pmco: 'A',
                    pmnm: '前收费'
                },
                {
                    pmco: 'B',
                    pmnm: '后收费'
                },
                {
                    pmco: '*',
                    pmnm: '前后端收费都支持'
                }
            ],
        },
        fundId: 'ALL',
        approveStatus: 'N',
        queryStatus: '',
        selectFundId: '',
        selectStatus: '',
        reviewSt: 'N'
    },
    created: function () {
        $.post({ //展示类别
            url: '/businessMgmt/IPOMgmtOCReview/IPOBaseInfo/showChinese.ajax',
            data: {
                pmst: 'SYSTEM',
                pmkey: 'DISPLAYFUNDTP'
            },
            success: function (result) {
                if (result.error === 0) {
                    this.showChinese.displayfundtpList = result.data.map(function (item) {
                        return {
                            pmco: item.pmco,
                            pmnm: item.pmnm
                        }
                    })
                } else {
                    this.showDialog('', 'info', false, result.msg);
                }
            }.bind(this)
        });
        $.post({ //基金类别
            url: '/businessMgmt/IPOMgmtOCReview/IPOBaseInfo/showChinese.ajax',
            data: {
                pmst: 'SYSTEM',
                pmkey: 'FUNDTP'
            },
            success: function (result) {
                if (result.error === 0) {
                    this.showChinese.fundtpList = result.data.map(function (item) {
                        return {
                            pmco: item.pmco,
                            pmnm: item.pmnm
                        }
                    })
                } else {
                    this.showDialog('', 'info', false, result.msg);
                }
            }.bind(this)
        });
        $.post({ //风险等级
            url: '/businessMgmt/IPOMgmtOCReview/IPOBaseInfo/showChinese.ajax',
            data: {
                pmst: 'SYSTEM',
                pmkey: 'FUNDRISKLEVEL'
            },
            success: function (result) {
                if (result.error === 0) {
                    this.showChinese.fundrisklevelList = result.data.map(function (item) {
                        return {
                            pmco: item.pmco,
                            pmnm: item.pmnm
                        }
                    })
                } else {
                    this.showDialog('', 'info', false, result.msg);
                }
            }.bind(this)
        });
        $.post({ //TA代码
            url: '/businessMgmt/IPOMgmtOCReview/IPOBaseInfo/showChinese.ajax',
            data: {
                pmst: 'SYSTEM',
                pmkey: 'TANO'
            },
            success: function (result) {
                if (result.error === 0) {
                    this.showChinese.tanoList = result.data.map(function (item) {
                        return {
                            pmco: item.pmco,
                            pmnm: item.pmnm
                        }
                    })
                } else {
                    this.showDialog('', 'info', false, result.msg);
                }
            }.bind(this)
        });
    },
    mounted: function () {
        var dialogs = ['info', 'reviewInfo'];
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
        this.getFundIdList()
        this.getTableData()
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
            } else {
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
            var _this = this;
            $.post({
                url: '/businessMgmt/IPOMgmtOCReview/IPOBaseInfo/fundIdList.ajax ',
                success: function (result) {
                    if (result.error == 0) {
                        this.FundIdList = result.data
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
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
                url: '/businessMgmt/IPOMgmtOCReview/IPOBaseInfo/tableData.ajax ',
                data: params,
                success: function (result) {
                    this.reviewSt = params.approveStatus
                    if (result.error == 0) {
                        this.tableData = result.data.map(function (item) {
                            item.check = false;
                            return item;
                        })
                    } else {
                        this.showDialog('', 'info', false, result.msg);
                    }
                }.bind(this)
            });
        },
        active: function (item) {
            this.tableData.forEach(function (item) {
                item.check = false;
            })
            this.selectFundId = item.onLine.fundid ? item.onLine.fundid : item.approve.fundid;

        },
        showReviewDialog: function (status, text) {
            if (this.selectFundId === '') {
                this.showDialog('', 'info', false, '请选择基金');
                return;
            }
            this.selectStatus = status;
            this.showDialog('', 'reviewInfo', false, '确定' + text + '基金' + this.selectFundId + '吗？');

        },
        review: function () {
            var params = {
                fundId: this.selectFundId,
                approveStatus: this.selectStatus
            };
            $.post({
                url: '/businessMgmt/IPOMgmtOCReview/IPOBaseInfo/review.ajax ',
                data: params,
                success: function (result) {
                    if (result.error == 0) {
                        this.getTableData()
                        this.showDialog('reviewInfo', 'info', false, result.data ? '复核成功' : '复核失败');
                    } else {
                        this.showDialog('reviewInfo', 'info', false, result.msg);
                    }
                }.bind(this)
            });
        },
        windowsGoTo: function (item) {
            window.location.href = '/businessMgmt/IPOMgmtOCReview/IPOBaseInfo.html?pageType=Detail&fundId=' + item.approve.fundid + '&fundStatus=' + item.approve.apprStatus

        }
    },
    filters: {
        case: function (val, arr) {
            var str = val;
            if (Array.isArray(arr)) {
                arr.some(function (item) {
                    if (item.pmco == str) {
                        str = item.pmnm;
                        return true;
                    }
                })
            }
            if (!str) {
                str = '-'
            }
            return str;
        },
        timeText: function (arr) {
            if (Array.isArray(arr) && arr.length) {
                var time = arr.map(function (val) {
                    if (val < 10) {
                        val = '0' + val;
                    }
                    return val;
                })
                return time.slice(0, 3).join('-') + ' ' + time.slice(3, 6).join(':');
            }
            return '--'
        }
    }
});