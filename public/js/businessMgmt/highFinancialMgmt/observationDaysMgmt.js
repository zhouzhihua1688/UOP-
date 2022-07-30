
new Vue({
    el: '#content',
    data: {
        // 主页面相关数据
        tableData: [],
        diaMsg:'',
        fundId:"",
        fundName:"",
        productTermDay:"",
        setTlementAuto:"",
        bindingIndexNm: "",
        referenceDayFlg:'',
        termDayId:'',
        lastDayFlg:'',
        isInUse:'',
        // 新增数据
        bindingIndexNms:"",
        fundIds:"",
        productTermDays:"",
        referenceDayFlgs:"",
        setTlementAutos:"",
        lastDayFlgs:'',
        isInUses:'',
        // 修改
        fundid:'',
        // 基金名称下拉列表
        nameList:[],
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        totalPage: 0,
        pageMaxNum: 10,
        // 挂载时间
        moment:moment,
        nowDate:"",
        endDate:"",
    },
    mounted: function () {
        var dialogs = ['info', 'add', 'revise'];
        var _this = this;
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
        //下拉列表自带搜索功能
        var fundArr = ['fundNameList'];
        fundArr.forEach(function (value) {
            $('#' + value).chosen({
                search_contains: true,
                no_results_text: '未找到相关产品信息',
                disable_search_threshold: 6,
                width: '220px'
            });
        });
        $('#fundNameList').on('change', function (e, params) {
            _this.fundId = params ? params.selected : '';
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
        $("#startDate").val(moment(new Date()).format("YYYY-MM-DD"))
        $("#endDate").val(moment(new Date()).format("YYYY-MM-DD"))
        this.getTableData(0);
        this.fundList(0);
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
        },
        checkAll: function () {
            if (this.tableData.length == 0) {
                return false;
            }
            for (var i = 0; i < this.tableData.length; i++) {
                if (!this.tableData[i].check) {
                    return false;
                }
            }
            return true;
        }
    },
    watch: {
        pageMaxNum: function () {
            this.getTableData(0);
        }
    },
    methods: {
        getTableData: function (currentIndex) {
            var _this = this;
            var params = {};
            params.startDate =$("#startDate").val();
            params.endDate =$("#endDate").val();
            params.fundId = this.fundId;
            params.pageNum = currentIndex + 1;
            params.pageSize = this.pageMaxNum;
            console.log(params)
            $.post({
                url: '/businessMgmt/highFinancialMgmt/observationDaysMgmt/getTableData.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        // _this.tableData = result.data;
                        // 后端分页 展示
                        _this.tableData = result.data.tableData;
                        _this.currentIndex = result.data.pageNo - 1;
                        _this.totalPage = result.data.totalSize;
                    }
                    else {
                        _this.tableData = [];
                        _this.currentIndex = 0;
                        _this.totalPage = 0;
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        //下拉列表-产品基金名称
        fundList:function(currentIndex){
            var _this = this;
            var params = {};
            params.pageNum =currentIndex + 1;
            params.pageSize =this.pageMaxNum+9980;
            $.post({
                url: '/businessMgmt/highFinancialMgmt/observationDaysMgmt/fundList.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.nameList = result.data.listData;
                        _this.currentIndex = result.data.pageNum - 1;
                        _this.totalPage = result.data.totalSize;

                        // 下拉列表
                        var str = '<option value="">全部</option>';
                        _this.nameList.forEach(function (item) {
                            str += '<option value="' + item.fundId + '">'+item.fundId+"-"+item.fundName + '</option>';
                        });
                        var fundArr = ['fundNameList'];
                        fundArr.forEach(function (value) {
                            $('#' + value).html(value === '' ? ('<option value="">全部基金</option>' + str) : str);
                            $('#' + value).trigger('chosen:updated');
                        });
                    }
                    else {
                        _this.nameList = [];
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        // 新增数据
        showAdd:function(){
            var _this = this;
            this.bindingIndexNms = "";
            this.fundIds = "";
            this.productTermDays = "";
            this.referenceDayFlgs = "";
            this.setTlementAutos = "";
            this.lastDayFlgs="";
            this.isInUses='';
            this.showDialog('', 'add',"false");
        },
        saveParam:function () {
            var _this = this;
            var params={};
            params.bindingIndexNm =this.bindingIndexNms;
            params.fundId =this.fundIds;
            params.productTermDay =$("#productTermDays").val();
            params.referenceDayFlg =this.referenceDayFlgs;
            params.setTlementAuto =this.setTlementAutos;
            params.lastDayFlg=this.lastDayFlgs;
            params.isInUse=this.isInUses;
            console.log(params)
            $.post({
                url: '/businessMgmt/highFinancialMgmt/observationDaysMgmt/saveParam.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(0);
                        _this.showDialog('add', 'info', false, result.msg);
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        // 修改数据
        showUpdate:function (item) {
            var _this = this;
            this.bindingIndexNm=item.bindingIndexNm;
            this.fundid=item.fundId;
            this.fundName=item.fundName;
            this.productTermDay=item.productTermDay
            this.referenceDayFlg=item.referenceDayFlg;
            this.setTlementAuto=item.setTlementAuto;
            this.lastDayFlg=item.lastDayFlg;
            this.isInUse=item.isInUse;
            this.termDayId=item.termDayId;
            this.showDialog('', 'revise');
        },
        update: function () {
            var _this = this;
            var params = {};
            params.bindingIndexNm =this.bindingIndexNm
            params.fundId = this.fundid;
            params.fundName = this.fundName;
            // params.productTermDay =moment(this.productTermDay).format('YYYY-MM-DD')
            params.productTermDay =moment(this.$refs.productTermDays.value).format('YYYY-MM-DD')
            params.referenceDayFlg = this.referenceDayFlg;
            params.setTlementAuto = this.setTlementAuto;
            params.lastDayFlg = this.lastDayFlg;
            params.isInUse = this.isInUse;
            params.termDayId = this.termDayId;
            console.log(params)
            $.post({
                url: '/businessMgmt/highFinancialMgmt/observationDaysMgmt/update.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(0);
                        // _this.showDialog('revise', 'info', false, result.msg);
                    }
                    _this.showDialog('revise', 'info', false, result.msg);
                }
            });
        },
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
        //主表格分页方法
        check: function (item) {
            item.check = !item.check;
        },
        allCheck: function () {
            var _this = this;
            var flag = this.checkAll;
            this.tableData.forEach(function (item) {
                item.check = !flag;
            });
        },
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
    },
    filters:{
        referenceDayFlg: function (item) {
            if (item === "Y") {
                return "是"
            } else if (item === "N") {
                return "否"
            }
        }
    }

    
});

