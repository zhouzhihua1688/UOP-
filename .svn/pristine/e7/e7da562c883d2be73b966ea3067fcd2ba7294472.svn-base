new Vue({
    el: '#content',
    data: {
        //主页面相关数据
        tableData: [],
        diaMsg: '',
        // 查询条件
        idNo: '',               //证件号码
        custNo: '',             //客户号
        tradeMode: '0',          //交易平台 0-直销，3-代销
        productId: '',          //产品ID
        productType:'',         //交易系统
        tradeType: '',          //交易类型
        tradeState:'00',          //交易状态
        apdtStart: '',          //起始日
        apdtEnd: '',            //截止日

        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        totalPage: 0,
        pageMaxNum: 10,
        // 详情
        checkDatils: {},
        fundGroupTradeDetailsApp: [],
    },
    computed: {
        // 后端真分页
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
            }
            else if (this.currentIndex <= this.maxSpace && this.totalPage - this.currentIndex > this.maxSpace) {
                for (var i = 0; i < this.currentIndex + (2 * this.maxSpace - this.currentIndex); i++) {
                    arr.push(i + 1);
                }
            }
            else if (this.currentIndex > this.maxSpace && this.totalPage - this.currentIndex <= this.maxSpace) {
                var space = this.totalPage - this.currentIndex;
                for (var i = this.currentIndex - (2 * this.maxSpace - space); i < this.totalPage; i++) {
                    arr.push(i + 1);
                }
            }
            else {
                for (var i = 0; i < this.totalPage; i++) {
                    arr.push(i + 1);
                }
            }
            return arr;
        },
    },
    watch: {
        pageMaxNum: function () {
            this.getTableData(0);
        }
    },
    mounted: function () {
        $('#info').on('shown.bs.modal', function () {
            var $this = $(this);
            var dialog = $this.find('.modal-dialog');
            var top = ($(window).height() - dialog.height()) / 2;
            dialog.css({
                marginTop: top
            });
        });

        this.getPastMonth();
        this.getCurrentDate();

    },

    methods: {
        getTableData: function (currentIndex) {
            var params = {};
            var _this = this;
            params.idNo = _this.idNo;
            params.custNo = _this.custNo;
            params.tradeMode = _this.tradeMode;
            params.productId= _this.productId;
            params.productType = _this.productType;
            params.tradeType = _this.tradeType;
            params.tradeState = _this.tradeState;
            var apdtStart = this.$refs.apdtStart.value;
            var apdtEnd = this.$refs.apdtEnd.value;
            params.apdtStart = apdtStart.replace(/(\d{4})-(\d{2})-(\d{2})/g, '$1$2$3');
            params.apdtEnd = apdtEnd.replace(/(\d{4})-(\d{2})-(\d{2})/g, '$1$2$3');

            if(!(params.idNo||params.custNo)){
                return _this.showDialog('', 'info', false,"证件号或者客户号不能为空! (二选一)");
            }
            params.pageNo = currentIndex + 1;
            params.pageSize = this.pageMaxNum;
            _this.tableData=[];
            $.post({
                url: '/clientMgmt/information/transactionQuery/getTableData.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0 && result.data.tradeDataRsps.length!=0) {
                        _this.tableData = result.data.tradeDataRsps;
                        _this.totalPage = Math.ceil(result.data.totalSize / params.pageSize);
                        _this.currentIndex = currentIndex;
                    } else {
                        _this.tableData = [];
                        _this.currentIndex = 0;
                        _this.totalPage = 0;
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },

        showDialog: function (dia1, dia2, callback, msg) {
            // 关掉dia1，打开dia2
            // callback==false:在dia2关掉的时候，直接关掉
            // callback==true:在dia2关掉的时候，重新打开dia1
            this.diaMsg = (msg?msg:'输入条件错误');
            if (!dia1) {
                $('#' + dia2).modal('show');
            } else if (!dia2) {
                $('#' + dia1).modal('hide');
            } else if (!callback) {
                $('#' + dia1).modal('hide');
                $('#' + dia2).off("hidden.bs.modal").modal('show');
            } else {
                if($('#' + dia1).data('parentDlg')){
                    // dia1弹窗有父级弹窗，先去除关闭事件，关闭弹窗后，再恢复添加事件
                    $('#' + dia1).off("hidden.bs.modal").modal('hide');
                    $('#' + dia1).on("hidden.bs.modal", function () {
                        $('#' + $('#' + dia1).data('parentDlg')).modal("show");
                    });
                } else {
                    // dia1弹窗没有父级弹窗，直接关闭
                    $('#' + dia1).modal('hide');
                }
                $('#' + dia2).off("hidden.bs.modal").on("hidden.bs.modal", function () {
                    // dia2作为子弹窗，添加关闭事件，关闭弹窗时打开父级弹窗
                    $('#' + dia1).modal("show");
                    $('#' + dia2).data('parentDlg', dia1);
                });
                $('#' + dia2).modal('show');
            }
        },

        showDetail(item) {
            var params = {};
            var _this = this;
            params.tradeDetailApi = item.tradeDetailApi;
            $.post({
                url: '/clientMgmt/information/transactionQuery/details.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.checkDatils = result.data;
                        _this.fundGroupTradeDetailsApp =  result.data.fundGroupTradeDetailsApp ?result.data.fundGroupTradeDetailsApp: [];
                        _this.$nextTick(() => {
                            $('#details').off('shown.bs.modal').on('shown.bs.modal', function () {
                                var $this = $(this);
                                var dialog = $this.find('.modal-dialog');
                                var top = ($(window).height() - dialog.height()) / 2;
                                dialog.css({
                                    marginTop: (top>0 ? top: 20)
                                });
                            });
                            _this.showDialog('', 'details');    
                        })
                        
                    
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        getPastMonth : function () {
            // 先获取当前时间
            var curDate = (new Date()).getTime()
            // 将一个月的时间单位换算成毫秒
            var halfYear = 365 / 12 * 24 * 3600 * 1000
            var pastResult = curDate - halfYear // 一个月前的时间（毫秒单位）
      
            var pastDate = new Date(pastResult)
            var pastMonth = pastDate.getMonth() + 1
            var pastDay =  pastDate.getDate()
            if (pastDay < 10)  pastDay = '0' + pastDay;
            if (pastMonth < 10)  pastMonth = '0' + pastMonth;
            this.apdtStart= pastDate.getFullYear() + '-' + pastMonth + '-' + pastDay;
          },

        getCurrentDate : function () {
            var date = new Date()
            var month = parseInt(date.getMonth() + 1)
            var day = date.getDate()
            if (month < 10)  month = '0' + month
            if (day < 10)  day = '0' + day
            this.apdtEnd = date.getFullYear() + '-' + month + '-' + day
        },
        
        //后端主表格真分页方法
        prev: function () {
            if (this.currentIndex <= 0) {
                return;
            }
            this.getTableData(this.currentIndex - 1,this.type);
        },
        next: function () {
            if (this.currentIndex >= this.totalPage - 1) {
                return;
            }
            this.getTableData(this.currentIndex + 1,this.type);
        },
        changeIndex: function (index) {
            this.getTableData(index - 1,this.type);
        },
        toFirst: function () {
            this.getTableData(0,this.type);
        },
        toLast: function () {
            this.getTableData(this.totalPage - 1,this.type);
        },

    },
    components: {
        'date-picker': VueBootstrapDatetimePicker
    }
});
