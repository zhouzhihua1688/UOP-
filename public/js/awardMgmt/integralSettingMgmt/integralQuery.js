new Vue({
    el: '#content',
    data: {
        //主页面相关数据
        custNo: '',
        operateType: '',
        pointStatus: '',
        tableData: [],
        diaMsg: '',
        //start-20220114-需求9737 增加积分查询条件
        source:'',   //积分来源
        sourceDetail:'', //来源详情
        expendType:'',   //消费类型
        expendMore:'',   //关联详情
        startTime:'',    //开始时间
        endTime:'',      //结束时间
        integralList:[],
        consumptionList:[],
        // 挂载时间
        moment:moment,
        //end-20220114-需求9737 增加积分查询条件
        //主表格分页数据
        currentIndex: 0,
        total: 0,
        pages: 0,
        maxSpace: 2,
        pageMaxNum: 10
    },
    watch: {
        pageMaxNum: function () {
            this.currentIndex = 0;
            this.search();
        }
    },
    computed: {
        pageList: function () {
            var arr = [];
            if (this.pages <= 2 * this.maxSpace) {
                for (var i = 0; i < this.pages; i++) {
                    arr.push(i + 1);
                }
                return arr;
            }
            if (this.currentIndex > this.maxSpace && this.pages - this.currentIndex > this.maxSpace) {
                for (var i = this.currentIndex - this.maxSpace; i < this.currentIndex + this.maxSpace; i++) {
                    arr.push(i + 1);
                }
            }
            else if (this.currentIndex <= this.maxSpace && this.pages - this.currentIndex > this.maxSpace) {
                for (var i = 0; i < this.currentIndex + (2 * this.maxSpace - this.currentIndex); i++) {
                    arr.push(i + 1);
                }
            }
            else if (this.currentIndex > this.maxSpace && this.pages - this.currentIndex <= this.maxSpace) {
                var space = this.pages - this.currentIndex;
                for (var i = this.currentIndex - (2 * this.maxSpace - space); i < this.pages; i++) {
                    arr.push(i + 1);
                }
            }
            else {
                for (var i = 0; i < this.pages; i++) {
                    arr.push(i + 1);
                }
            }
            return arr;
        }
    },
    mounted: function () {
        var dialogs = ['info'];
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
        // var date = new Date();
        // var y=date.getFullYear()-1;
        // var m=date.getMonth()+1;
        // var d=date.getDate();
        // var dateStr=y+'-'+(m<10?'0'+m:m)+'-'+(d<10?'0'+d:d);
        // console.log(dateStr);
        // $("#startTime").val(dateStr);
        // $("#endTime").val(moment(new Date()).format("YYYY-MM-DD"));
        this.getIntegral();
        this.getConsumption();
        this.search();
    },
    methods: {
        // 获取积分来源类型
        getIntegral:function(){
            var _this = this;
            $.post({
                url: '/awardMgmt/integralSettingMgmt/integralQuery/getIntegral.ajax',
                success: function (result) {
                    if (result.error === 0) {
                        _this.integralList = result.data.body;
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        // 获取消费类型
        getConsumption:function(){
            var _this = this;
            $.post({
                url: '/awardMgmt/integralSettingMgmt/integralQuery/getConsumption.ajax',
                success: function (result) {
                    if (result.error === 0) {
                        _this.consumptionList = result.data.body;
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        //模板管理业务方法
        search: function () {
            var _this = this;
            $.post({
                url: '/awardMgmt/integralSettingMgmt/integralQuery/query.ajax',
                data: {
                    custNo: this.custNo,
                    operateType: this.operateType,
                    pointStatus: this.pointStatus,
                    pageNo:1,
                    pageSize: this.pageMaxNum,
                    source:this.source,
                    sourceDetail:this.sourceDetail,
                    expendType:this.expendType,
                    expendMore:this.expendMore,
                    startTime:$("#startTime").val().replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1$2$3$4$5$6'),
                    endTime:$("#endTime").val().replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1$2$3$4$5$6')
                },
                success: function (result) {
                    if (result.error === 0) {
                        _this.currentIndex = 0;
                        _this.total = result.data.total;
                        _this.pages = result.data.pages;
                        _this.tableData = result.data.body;
                        for(var i=0;i<_this.tableData.length;i++){
                            for(var j=0;j<_this.integralList.length;j++){
                                 if(_this.tableData[i].source_desc==_this.integralList[j].source){
                                     _this.tableData[i].source_desc=_this.integralList[j].sourceDec;
                                 }
                            }
                        }
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },

        getTableData: function (index) {
            var _this = this;
            $.post({
                url: '/awardMgmt/integralSettingMgmt/integralQuery/query.ajax',
                data: {
                    custNo: this.custNo,
                    operateType: this.operateType,
                    pointStatus: this.pointStatus,
                    pageNo: index + 1,
                    pageSize: this.pageMaxNum,
                    source:this.source,
                    sourceDetail:this.sourceDetail,
                    expendType:this.expendType,
                    expendMore:this.expendMore,
                    startTime:$("#startTime").val().replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1$2$3$4$5$6'),
                    endTime:$("#endTime").val().replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1$2$3$4$5$6')
                },
                success: function (result) {
                    if (result.error === 0) {
                        _this.total = result.data.total;
                        _this.pages = result.data.pages;
                        _this.tableData = result.data.body;
                        _this.currentIndex = index;
                        for(var i=0;i<_this.tableData.length;i++){
                            for(var j=0;j<_this.integralList.length;j++){
                                if(_this.tableData[i].source_desc==_this.integralList[j].source){
                                    _this.tableData[i].source_desc=_this.integralList[j].sourceDec;
                                }
                            }
                        }
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        //主表格分页方法
        // prev: function () {
        //     this.currentIndex > 0 ? this.currentIndex-- : 0;
        //     this.search();
        // },
        // next: function () {
        //     this.currentIndex < this.pages - 1 ? this.currentIndex++ : this.pages - 1;
        //     this.search();
        // },
        // changeIndex: function (index) {
        //     this.currentIndex = index - 1;
        //     this.search();
        // },
        // toFirst: function () {
        //     this.currentIndex = 0;
        //     this.search();
        // },
        // toLast: function () {
        //     this.currentIndex = this.pages - 1;
        //     this.search();
        //
        // },

        prev: function () {
            var index =  this.currentIndex > 0 ? this.currentIndex - 1 : 0;
            this.getTableData(index);
        },
        next: function () {
            var index =  this.currentIndex < this.pages - 1 ? this.currentIndex + 1 : this.pages - 1;
            this.getTableData(index);
        },
        changeIndex: function (index) {
            this.getTableData(index - 1);
        },
        toFirst: function () {
            this.getTableData(0);
        },
        toLast: function () {
            this.getTableData(this.pages - 1);
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
