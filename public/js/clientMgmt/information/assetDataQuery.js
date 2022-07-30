new Vue({
    el: '#content',
    data: {
        //主页面相关数据
        tableData: [],
        diaMsg: '',
        // 查询条件
        fundAcct: '',   //基金账号
        tradeAcct: '',  //交易账号
        custName:'',    //客户姓名
        custNo:'',      //客户号
        idTp:'',        //证件类型
        idNo: '',       //证件号码
        type:'2',        //资产类型
        currencyType:'156', //币种
        productId:'',
        productName:'',
        combinationDirect:[], //组合弹框列表
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        totalPage: 0,
        pageMaxNum: 10,
        condition: '',
        // 详情
        checkDatils: {},
        showTime:false
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
            this.getTableData(0);
        }
    },
    mounted: function () {
        var _this = this;
        var dialogs = ['info', "details"];
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
        // 时间插件
        $('.date-timepicker').datetimepicker({
            format: 'YYYY-MM-DD',//use this option to display seconds
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
    },
    methods: {
        // 依据资产类型对资产截止日做显示隐藏处理
        showDay:function(){
            this.tableData=[];
            if(this.type==1){
                this.showTime=true;
            }else{
                this.showTime=false;
            }
        },
        getTableData: function (currentIndex) {
            var params = {};
            var _this = this;
            if(this.type==1){
                var endData=this.$refs.endDate.value;
            }else{
                // var nowDay=new Date;
                // var endData = nowDay.getFullYear()+"-" + (nowDay.getMonth()+1) + "-" + nowDay.getDate();
                var endData ='';
            }
            console.log(endData);
            params.custNo = this.custNo;     //客户号
            params.idNo = this.idNo;             //证件号码
            params.date= endData.replace(/(\d{4})-(\d{2})-(\d{2})/g, '$1$2$3');
            params.type=this.type;
            params.currencyType=this.currencyType;

            if(!(params.idNo||params.custNo)){
                return _this.showDialog('', 'info', false,"证件号或者客户号不能为空! (二选一)");
            }
            if(!params.currencyType){
                return _this.showDialog('', 'info', false,"请选择币种类型!");
            }
            if(!params.type){
               return _this.showDialog('', 'info', false,"请选择资产类型!");
            }
            if(this.type==1&&!params.date){
                return _this.showDialog('', 'info', false,"资产截止日不能为空!");
            }
            // params.pageNo = currentIndex + 1;
            // params.pageSize = this.pageMaxNum;
            console.log(params);
            _this.tableData=[];
            $.post({
                url: '/clientMgmt/information/assetDataQuery/getTableData.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        // 后端分页 展示
                        // _this.tableData = result.data.tableData;
                        result.data.tableData.directAsset.assetSliceList.sort((a, b) => {
                            return a.productType - b.productType
                        })
                        result.data.tableData.proxyAsset.assetSliceList.sort((c, d) => {
                            return c.productType - d.productType
                        })
                        _this.tableData.push(result.data.tableData);
                        console.log(_this.tableData);
                        // _this.totalPage = result.data.totalSize;
                        // _this.currentIndex = result.data.pageNo - 1;
                    } else {
                        _this.tableData = [];
                        _this.currentIndex = 0;
                        _this.totalPage = 0;
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        // 直销汇总
        directAsset:function(item,itemDirectList){
            var params = {};
            var _this = this;
            _this.combinationDirect=[];
            console.log("item",item);
            console.log("itemDirectList",itemDirectList);
            this.productId=itemDirectList.productId;  //赋值弹框
            this.productName=itemDirectList.productName;  //赋值弹框
            params.idNo = item.idNo ;
            params.custNo=item.custNo;
            params.productId=itemDirectList.productId;
            params.currencyType=itemDirectList.currencyType;
            params.type=this.type;
            var endData = (this.type==1)? this.$refs.endDate.value:'';
            params.date= endData.replace(/(\d{4})-(\d{2})-(\d{2})/g, '$1$2$3');
            console.log(params);
            // _this.showDialog('', 'details');
            $.post({
                url: '/clientMgmt/information/assetDataQuery/details.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.combinationDirect = result.data;
                        _this.$nextTick(()=>{
                            var dialog = $('#details').find('.modal-dialog');
                            var top = ($(window).height() - dialog.height()) / 2;
                            dialog.css({
                                marginTop: top
                            });
                            _this.showDialog('', 'details');
                        })
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        // 代销汇总
        proxyAsset:function(item,itemProxyList){
            var params = {};
            var _this = this;
            _this.combinationDirect=[];
            console.log("item",item);
            console.log("itemProxyList",itemProxyList);
            this.productId=itemProxyList.productId;  //赋值弹框
            this.productName=itemProxyList.productName;  //赋值弹框
            params.idNo = item.idNo ;
            params.custNo=item.custNo;
            params.productId=itemProxyList.productId;
            params.currencyType=itemProxyList.currencyType;
            params.type=this.type;
            var endData = (this.type==1)? this.$refs.endDate.value:'';
            params.date= endData.replace(/(\d{4})-(\d{2})-(\d{2})/g, '$1$2$3');
            console.log(params);
            // _this.showDialog('', 'details');
            $.post({
                url: '/clientMgmt/information/assetDataQuery/details.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.combinationDirect = result.data;
                        _this.$nextTick(()=>{
                            var dialog = $('#details').find('.modal-dialog');
                            var top = ($(window).height() - dialog.height()) / 2;
                            dialog.css({
                                marginTop: top
                            });
                            _this.showDialog('', 'details');
                        })
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        // showDetail(item) {
        //     var params = {};
        //     var _this = this;
        //     params.serialNo = item.serialNo ;
        //     $.post({
        //         url: '/clientMgmt/information/informationQuery/details.ajax',
        //         data: params,
        //         success: function (result) {
        //             if (result.error === 0) {
        //                 _this.checkDatils = result.data;
        //                 _this.showDialog('', 'details');
        //             } else {
        //                 _this.showDialog('', 'info', false, result.msg);
        //             }
        //         }
        //     });
        // },

        // totalAmt:function(items){
        //     console.log('items',items);
        //     // 求总和
        //         var sum=items.reduce((pre, cur) => {
        //             return pre + cur.totalAmt
        //         }, 0)
        //     return sum;
        // },
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
            } else {
                msg = '输入条件错误';
            }
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
        numFormat(val){
            if(val||val===0){
                val=val.toFixed(2);
                return val.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            }else{
                return '';
            }
        },
    },
    filters: {
        evalDate: function (item) {
            if (item) {
                return item.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')
            }
        },
        evalTime: function (item) {
            if (item) {
                return item.replace(/(\d{2})(\d{2})(\d{2})/, '$1:$2:$3')
            }
        }
    }
});
