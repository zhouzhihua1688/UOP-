new Vue({
    el: '#content',
    data: {
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        pageMaxNum: 100,
        diaMsg: '',
        tableData: [],
        fundIdList: [],
        fundId: 'ALL',
        approveStatus: 'N',
        selectFundId: '',
        selectStatus: '',
        reviewSt: true
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
            var _this = this;
            $.post({
                url: '/businessMgmt/IPOMgmtOCReview/financialOpenDayReview/fundIdList.ajax ',
                success: function (result) {
                    if (result.error == 0) {
                        this.fundIdList = result.data
                    }
                    else {
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
                url: '/businessMgmt/IPOMgmtOCReview/financialOpenDayReview/tableData.ajax ',
                data: params,
                success: function (result) {
                    if (this.approveStatus === 'N') {
                        this.reviewSt = true
                    } else {
                        this.reviewSt = false
                    }
                    if (result.error == 0) {
                        this.tableData = result.data.map(function (item) {
                            item.check = false;
                            return item;
                        }.bind(this)).sort((b,a)=>{
                            // // UOP高端开放日复核页面，起始日 从早到后的顺序 按从上到下排列
                            // if(a.fundid == b.fundid){
                            //     return b.actionBeginDate - a.actionBeginDate;
                            // }
                            // 20211129 增加排序规则 S
                            // 先按插入时间排序，最新插入时间在最上面；
                            // 再按产品代码；
                            // 再按起始时间；（倒序）
                            if(a.inserttimestamp.slice(0,6).join('') !== b.inserttimestamp.slice(0,6).join('')){
                                // return Number(a.inserttimestamp.slice(0,6).join('')) - Number(b.inserttimestamp.slice(0,6).join(''));
                                // return new Date(a.inserttimestamp[0],a.inserttimestamp[1],a.inserttimestamp[2],a.inserttimestamp[3],a.inserttimestamp[4],a.inserttimestamp[5])
                                t_a = a.inserttimestamp;
                                t_b = b.inserttimestamp;
                                s_a = t_a[0] + ('0'+t_a[1]).slice(-2) + ('0'+t_a[2]).slice(-2) + ('0'+t_a[3]).slice(-2) + ('0'+t_a[4]).slice(-2) + ('0'+t_a[5]).slice(-2);
                                s_b = t_b[0] + ('0'+t_b[1]).slice(-2) + ('0'+t_b[2]).slice(-2) + ('0'+t_b[3]).slice(-2) + ('0'+t_b[4]).slice(-2) + ('0'+t_b[5]).slice(-2);
                                return s_a - s_b;
                            } else if(a.fundid != b.fundid){
                                return a.fundid - b.fundid;
                            } else if(a.actionBeginDate != b.actionBeginDate){
                                return a.actionBeginDate - b.actionBeginDate;
                            }
                            // 20211129 增加排序 E
                        })
                    }
                    else {
                        this.showDialog('', 'info', false, result.msg);
                    }
                }.bind(this)
            });
        },
        active: function (id, activeStatus) {
            console.log(activeStatus);
            if (activeStatus) {
                this.tableData.forEach(function (item) {
                    if (item.fundid === id) {
                        item.check = false;
                    }
                })
                this.selectFundId = '';
                return;
            }
            var status = this.tableData.every(function (item) {
                return item.apprStatus === 'N';
            })
            if (status) {
                console.log('123123');
                this.selectFundId = id;
                this.tableData.forEach(function (item) {
                    if (item.fundid === id) {
                        item.check = true;
                    } else {
                        item.check = false;
                    }
                })
            } else {
                this.showDialog('', 'info', false, '非待复核状态不能再次复核');
                this.tableData.forEach(function (item) {
                    if (item.fundid === id) {
                        this.$set(item, 'check', false)
                    }
                }.bind(this))
            }
            
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
                url: '/businessMgmt/IPOMgmtOCReview/financialOpenDayReview/review.ajax ',
                data: params,
                success: function (result) {
                    if (result.error == 0) {
                        this.getTableData()
                        this.showDialog('reviewInfo', 'info', false, result.msg);
                    }
                    else {
                        this.showDialog('reviewInfo', 'info', false, result.msg);
                    }
                }.bind(this)
            });
        },
        
    },
    filters: {
        chineseApkind: function (value) {
            var obj = {
                "020": "认购",
                "022": "申购",
                "036": "基金转换",
                "039": "银行卡经典定投申购",
                "049": "银行卡智汇定投申购",
                "920": "现金宝认购",
                "940": "现金宝智汇定投申购",
                "949": "现金宝经典定投申购",
                "950": "现金宝申购"
            }
            if (obj[value]) {
                return obj[value];
            }
            return value;
        },
        chineseApprStatus: function (value) {
            var obj = {
                "N": "待复核",
                "S": "复核通过",
                "F": "复核退回",
            }
            if (obj[value]) {
                return obj[value];
            }
            return value;
        },
        chineseActionType : function (value) {
            var obj = {
                "1": "开放申购",
                "2": "开放赎回",
                "3": "开放申赎",
                "4": "暂停交易"
            }
            if (obj[value]) {
                return obj[value];
            }
            return value;
        },

        translateActionType: function (value) {
            var obj = {
                "0": "T+1确认",
                "1": "T+N+1确认",
            }
            if (obj[value]) {
                return obj[value];
            }
            return value;
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
        },
    }
});