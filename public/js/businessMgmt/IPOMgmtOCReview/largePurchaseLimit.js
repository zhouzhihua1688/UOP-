new Vue({
    el: '#content',
    data: {
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        totalPage: 0,
        pageMaxNum:10,
        condition: "",

        diaMsg: '',
        tableData: [],
        product:'',
        // FundIdList: [],
        fundId: '',
        approveStatus: 'N',
        selectFundId: '',
        selectStatus: ''
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
        // this.getFundIdList()
        this.getTableData(0)
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

        // 假分页
        // pageMaxNum: {
        //     handler: function (val, oldval) {
        //         this.currentIndex= 0;
        //     }
        // },
        // condition: {
        //     handler: function (val, oldval) {
        //         this.currentIndex= 0;
        //     }
        // },


        pageMaxNum: function () {
            this.currentIndex = 0;
        },

        // approveStatus:function(){
        //     this.getTableData()
        // },
        // fundId:function(){
        //     this.getTableData()
        // }
    },
    methods: {
        // getFundIdList: function () {
        //     var _this = this;
        //     $.post({
        //         url: '/businessMgmt/IPOMgmtOCReview/largePurchaseLimit/fundIdList.ajax ',
        //         success: function (result) {
        //             if (result.error == 0) {
        //                 this.FundIdList = result.data
        //             }
        //             else {
        //                 _this.showDialog('', 'info', false, result.msg);
        //             }
        //         }.bind(this)
        //     });
        // },
        getTableData: function (currentIndex) {
            // var params = {
            //     fundId: this.fundId,
            //     approveStatus: this.approveStatus
            // };
            var _this = this;
            var params ={};
            params.pageNo =currentIndex+1;
            params.pageSize = this.pageMaxNum+9998;
            params.status ='I';
            $.post({
                url: '/businessMgmt/IPOMgmtOCReview/largePurchaseLimit/tableData.ajax',
                data: params,
                success: function (result) {
                    if (result.error == 0) {
                        this.tableData = result.data.tableData.map(function (item) {
                            item.check = false;
                            return item;
                        }.bind(this)).sort(function(a,b){
                            return a.startTime < b.startTime ? 1 : -1
                        }.bind(this));
                        _this.currentIndex = 0;
                        // console.log("数据：",this.tableData )
                        // _this.currentIndex = result.data.pageNo - 1;
                        // _this.totalPage = result.data.totalSize;
                    }
                    else {
                        _this.tableData = [];
                        _this.currentIndex = 0;
                        this.showDialog('', 'info', false, result.msg);
                    }
                }.bind(this)
            });
        },

        active: function (id, activeStatus) {
            if (activeStatus) {
                this.tableData.forEach(function (item) {
                    if (item.product === id) {
                        item.check = false;
                    }
                })
                this.selectFundId = '';
                return;
            }


            // var status = this.tableData.some(function (item) {
            //     if (item.apprStatus === 'N') {
            //         return true;
            //     }
            // })

            // if (status) {
            //     this.selectFundId = id;
            // console.log("id:",id)
            //     this.tableData.forEach(function (item) {
            //         if (item.product === id) {
            //             item.check = true;
            //         } else {
            //             item.check = false;
            //         }
            //     })
            // }

                this.selectFundId = id;
                console.log("id:",id)
                this.tableData.forEach(function (item) {
                    if (item.product === id) {
                        item.check = true;
                    } else {
                        item.check = false;
                    }
                })
            // else {
            //     this.showDialog('', 'info', false, '非待复核状态不能再次复核');
            //     this.tableData.forEach(function (item) {
            //         if (item.product === id) {
            //             this.$set(item, 'check', false)
            //         }
            //     }.bind(this))
            // }
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
            // var params = {
                // fundId: this.selectFundId,
                // approveStatus: this.selectStatus
            // };
            var params = {}
            params.fundId =this.selectFundId;
            params.result =this.selectStatus;
            console.log("传参数：",params)
            $.post({
                url: '/businessMgmt/IPOMgmtOCReview/largePurchaseLimit/review.ajax ',
                data: params,
                success: function (result) {
                    if (result.error == 0) {
                        this.getTableData(0)
                        this.showDialog('reviewInfo', 'info', false, result.msg);
                    }
                    else {
                        this.showDialog('reviewInfo', 'info', false, result.msg);
                    }
                }.bind(this)
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
        //主表格真分页方法
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
        tradeType: function (value) {
            var obj = {
                "00": "申购",
                "01": "认购",
                "02": "赎回",
                "03": "定投",
                "04": "分红",
                "05": "转换",
                "09": "其它",
                "*": "*"
            }
            if (obj[value]) {
                return obj[value];
            }
            return value;
        },
        quotaType: function (value) {
            var obj = {
                "S": "单笔限额",
                "D": "日限额",
                "M": "月限额",
                "T": "总限额",
                "*":"*"
            }
            if (obj[value]) {
                return obj[value];
            }
            return value;
        },
        channel: function (value) {
            var obj = {
                "0": "柜台",
                "1": "电话",
                "2": "PC",
                "4": "H5",
                "5": "IVR",
                "6": "第三方",
                "7": "企业",
                "8": "证通",
                "9": "其它",
                "A": "蚂蚁小程序",
                "M": "APP",
                "W": "微信",
                "X": "微信小程序",
                "C": "CRM",
                "P": "机构服务平台",
                "OL": "网上(含PC/H5/APP)",
                "*":"*"
            }
            if (obj[value]) {
                return obj[value];
            }
            return value;
        },
    },
    components: {
        vueSelect: vueSelect
    }
});