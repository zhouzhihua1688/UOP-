new Vue({
    el: '#content',
    data: {
        // 主页面相关数据
        id: '',
        // isAdd: false,
        // 产品
        // product: "",
        // 保存弹窗产品
        // saveproduct: "",
        // remark: "",
        // status: "",
        // 查询
        // fundgroupTypes:'',
        // groupids:'',
        // 复核状态
        reviewStatus: "",
        //隐藏假分页节点元素
        tableData: [],
        diaMsg: '',
        // checkData: [],

        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        pageMaxNum: '10',
        condition: '',
        loadingStatus:'',
        // 全选
        allCheck: false,
        // 数据库id
        
        // 数据类型(0:业务,1:Mysql数据库)
        mysqlStatus: '',
        // mysql传产品值
        // mysqlProduct: "",
        // // 获取数据库产品所有ID
        // arrId: [],
        // oneId: '',
        // operator: "",
        // 判断Mysql数据状态
        // delete_flag: "",
        mysqlId: "",
        operate: "",
        groupid:"",
        groupname:"", 
        grouptype:"", 
        rightLimit: "",  // 权益类基金定义
        largeRedemptionPercent: "",  // 大额赎回在全平台的比例
        loadingShow: false,
        rightMaxratePerc:"",         //权益类基金占比不超过
        turnoverRatePerc:"",        //账户换手率
        singlevalueCustmaxPerc:"", // 单只基金市值不得超过客户账户资产净值
        categoryunitGroupmaxPerc:"",  // 同策略持有基金份额不得超过该基金总份额占比
        singleunitGroupmaxPerc:"",   // 持有单只指数基金的份额总和不得超过该基金总份额的
        fundgroupChangeROListForRisk:[],
        stringEstablishDateForRisk:"",
        fundgroupNewFundgroupDOForRisk:{},
        // 是否为全量修改的风控配置
        isAllUpdate:false,
        dialogData:'',
         // 20210909新增风控字段
         rightMinratePerc:"",   // 权益类基金占净值比不低于
         valueMinratePerc:"",   // 债券基金占净值比不低于
         valueMaxratePerc:"",   // 债券基金占净值比不超过
         isBlacklist:"",   // 是否禁投公司黑名单内基金
         isTradeLimit:"",   // 是否禁投流通受限基金
         noPushServerWords:""   //只存留在本地sql不存服务端的数据
    },
    // 获取本地Mysql所有Id
    created: function () {

    },
    mounted: function () {
        var dialogs = ['info', 'del', 'del2',"update", "revise", 'subMit', 'delAgain', "addFund", 'addFundHistory', 'muchFundHistory', "checkDatils","wareHouse","riskDialog"];
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
        // 时间插件
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
        }).on('blur', function (e) {
            var element = $(this)[0];
            element.id === 'onlinedate' && ($('#stringEstablishDate').val(element.value));
        }).next().on(ace.click_event, function (e) {
            $(this).prev().focus();
        });
        
        this.getTableData(0);
    },

    computed: {
        //主表格分页
        middleData: function () {
            var middleData = [];
            var filterData = [];
            var pageMaxNum = parseInt(this.pageMaxNum);
            var _this = this;
            this.tableData.forEach(function (jsonObj) {
                var valueArr = [];
                for (var prop in jsonObj) {
                    valueArr.push(jsonObj[prop]);
                }
                for (var i = 0, len = valueArr.length; i < len; i++) {
                    if (valueArr[i]) {
                        if (valueArr[i].toString().indexOf(_this.condition) != -1) {
                            filterData.push(jsonObj);
                            break;
                        }
                    }
                }
            });
            if (filterData.length <= pageMaxNum) {
                middleData.push(filterData);
                return middleData;
            }
            else {
                var i = 0;
                while ((i + 1) * pageMaxNum < filterData.length) {
                    middleData.push(filterData.slice(i * pageMaxNum, (i + 1) * pageMaxNum));
                    i++;
                }
                middleData.push(filterData.slice(i * pageMaxNum, filterData.length));
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
            this.getTableData(0);
        },
        // 假分页
        watch: {
            pageMaxNum: function () {
                this.currentIndex = 0;
                this.getTableData(0)
            },
            condition: function () {
                this.currentIndex = 0;
            }
        },
    },
    methods: {
        // 获取表格数据
        getTableData: function (currentIndex) {
            var _this = this;
            var params = {};
            // 获取本地数据
            var _this = this;
            // 真假分页切换
            this.currentIndex = 0;
            params.reviewStatus = this.reviewStatus; //复核状态
            params.fundgroupType = this.fundgroupTypes;
            _this.loadingStatus = '数据获取中...';
            params.groupid = this.groupids;
            $.post({
                url: '/investmentMgmt/investmentStrategy/combinationProductRiskReview/getTableData.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.tableData = result.data;
                        if(_this.tableData==""){
                            _this.loadingStatus = '暂无数据';
                        }
                    }
                    else {
                        _this.tableData=[];
                        _this.loadingStatus = '暂无数据';
                        _this.showDialog('', 'info', false, result.msg);

                    }
                }
            });
        },
        // 风控部分
        clearRisk:function(){
            this.groupid ='';
            this.groupname = '';
            this.grouptype = '';
            this.noPushServerWords = '';
            if(this.isAllUpdate){
                this.dialogData=null;
            }else{
                this.rightLimit = '';
                this.largeRedemptionPercent = '';
                this.rightMaxratePerc = '';
                this.singlevalueCustmaxPerc = '';
                this.categoryunitGroupmaxPerc = '';
                this.turnoverRatePerc = '';
                this.singleunitGroupmaxPerc = '';
                this.rightMinratePerc="",   
                this.valueMinratePerc="",   
                this.valueMaxratePerc="",   
                this.isBlacklist="",   
                this.isTradeLimit="",   
                this.fundgroupChangeROListForRisk = [];
                this.stringEstablishDateForRisk = '';
                this.fundgroupNewFundgroupDOForRisk = {};
            }
           
        },
        showRisk:function(item){
            console.log(item);
            this.clearRisk();
            this.mysqlId = item.mySQLId;
            this.operate = item.operate?item.operate:'2';
            this.noPushServerWords = item.comment;
            // this.groupid = item.groupid?item.groupid:'';
            // this.groupname = item.groupname?item.groupname:'';
            // this.grouptype = item.grouptype?item.grouptype:'';
            if(item.dialogData){
                this.dialogData=item.dialogData;
                this.rightLimit = item.dialogData.rightLimit?item.dialogData.rightLimit:'';
                this.largeRedemptionPercent = item.dialogData.largeRedemptionPercent?item.dialogData.largeRedemptionPercent:'';
                this.rightMaxratePerc = item.dialogData.rightMaxratePerc?item.dialogData.rightMaxratePerc:'';
                this.singlevalueCustmaxPerc = item.dialogData.singlevalueCustmaxPerc?item.dialogData.singlevalueCustmaxPerc:'';
                this.categoryunitGroupmaxPerc = item.dialogData.categoryunitGroupmaxPerc?item.dialogData.categoryunitGroupmaxPerc:'';
                this.turnoverRatePerc = item.dialogData.turnoverRatePerc?item.dialogData.turnoverRatePerc:'';
                this.singleunitGroupmaxPerc = item.dialogData.singleunitGroupmaxPerc?item.dialogData.singleunitGroupmaxPerc:'';
                this.rightMinratePerc = item.dialogData.rightMinratePerc?item.dialogData.rightMinratePerc:'';
                this.valueMinratePerc = item.dialogData.valueMinratePerc?item.dialogData.valueMinratePerc:'';
                this.valueMaxratePerc = item.dialogData.valueMaxratePerc?item.dialogData.valueMaxratePerc:'';
                this.isBlacklist = item.dialogData.isBlacklist?item.dialogData.isBlacklist:'';
                this.isTradeLimit = item.dialogData.isTradeLimit?item.dialogData.isTradeLimit:'';
                this.isAllUpdate=true;
                // this.fundgroupChangeROListForRisk = item.fundgroupChangeROList?item.fundgroupChangeROList:[];
                // this.stringEstablishDateForRisk = item.stringEstablishDate?item.stringEstablishDate:'';
                // this.fundgroupNewFundgroupDOForRisk = item.fundgroupNewFundgroupDO?item.fundgroupNewFundgroupDO:[];
            }else{
                this.groupid = item.groupid?item.groupid:'';
                this.groupname = item.groupname?item.groupname:'';
                this.grouptype = item.grouptype?item.grouptype:'';
                this.rightLimit = item.fundgroupNewFundgroupDO.rightLimit?item.fundgroupNewFundgroupDO.rightLimit:'';
                this.largeRedemptionPercent = item.fundgroupNewFundgroupDO.largeRedemptionPercent?item.fundgroupNewFundgroupDO.largeRedemptionPercent:'';
                this.rightMaxratePerc = item.fundgroupNewFundgroupDO.rightMaxratePerc?item.fundgroupNewFundgroupDO.rightMaxratePerc:'';
                this.singlevalueCustmaxPerc = item.fundgroupNewFundgroupDO.singlevalueCustmaxPerc?item.fundgroupNewFundgroupDO.singlevalueCustmaxPerc:'';
                this.categoryunitGroupmaxPerc = item.fundgroupNewFundgroupDO.categoryunitGroupmaxPerc?item.fundgroupNewFundgroupDO.categoryunitGroupmaxPerc:'';
                this.turnoverRatePerc = item.fundgroupNewFundgroupDO.turnoverRatePerc?item.fundgroupNewFundgroupDO.turnoverRatePerc:'';
                this.singleunitGroupmaxPerc = item.fundgroupNewFundgroupDO.singleunitGroupmaxPerc?item.fundgroupNewFundgroupDO.singleunitGroupmaxPerc:'';
                this.rightMinratePerc = item.fundgroupNewFundgroupDO.rightMinratePerc?item.fundgroupNewFundgroupDO.rightMinratePerc:'';
                this.valueMinratePerc = item.fundgroupNewFundgroupDO.valueMinratePerc?item.fundgroupNewFundgroupDO.valueMinratePerc:'';
                this.valueMaxratePerc = item.fundgroupNewFundgroupDO.valueMaxratePerc?item.fundgroupNewFundgroupDO.valueMaxratePerc:'';
                this.isBlacklist = item.fundgroupNewFundgroupDO.isBlacklist?item.fundgroupNewFundgroupDO.isBlacklist:'';
                this.isTradeLimit = item.fundgroupNewFundgroupDO.isTradeLimit?item.fundgroupNewFundgroupDO.isTradeLimit:'';
                this.fundgroupChangeROListForRisk = item.fundgroupChangeROList?item.fundgroupChangeROList:[];
                this.stringEstablishDateForRisk = item.stringEstablishDate?item.stringEstablishDate:'';
                this.fundgroupNewFundgroupDOForRisk = item.fundgroupNewFundgroupDO?item.fundgroupNewFundgroupDO:[];
                this.isAllUpdate=false;
            }
            this.showDialog('', 'riskDialog');
        },
        saveData:function(item){
            this.clearRisk();
            this.mysqlId = item.mySQLId;
            this.operate = item.operate?item.operate:'2';
            this.noPushServerWords = item.comment;
            // this.groupid = item.groupid?item.groupid:'';
            // this.groupname = item.groupname?item.groupname:'';
            // this.grouptype = item.grouptype?item.grouptype:'';
            if(item.dialogData){
                this.dialogData=item.dialogData;
                this.rightLimit = item.dialogData.rightLimit=='0'?'0':item.dialogData.rightLimit;
                this.largeRedemptionPercent = item.dialogData.largeRedemptionPercent=='0'?'0':item.dialogData.largeRedemptionPercent;
                this.rightMaxratePerc = item.dialogData.rightMaxratePerc=='0'?'0':item.dialogData.rightMaxratePerc;
                this.singlevalueCustmaxPerc = item.dialogData.singlevalueCustmaxPerc=='0'?'0':item.dialogData.singlevalueCustmaxPerc;
                this.categoryunitGroupmaxPerc = item.dialogData.categoryunitGroupmaxPerc=='0'?'0':item.dialogData.categoryunitGroupmaxPerc;
                this.turnoverRatePerc = item.dialogData.turnoverRatePerc=='0'?'0':item.dialogData.turnoverRatePerc;
                this.singleunitGroupmaxPerc = item.dialogData.singleunitGroupmaxPerc=='0'?'0':item.dialogData.singleunitGroupmaxPerc;
                this.rightMinratePerc = item.dialogData.rightMinratePerc=='0'?'0':item.dialogData.rightMinratePerc;
                this.valueMinratePerc = item.dialogData.valueMinratePerc=='0'?'0':item.dialogData.valueMinratePerc;
                this.valueMaxratePerc = item.dialogData.valueMaxratePerc=='0'?'0':item.dialogData.valueMaxratePerc;
                this.isBlacklist = item.dialogData.isBlacklist?item.dialogData.isBlacklist:'';
                this.isTradeLimit = item.dialogData.isTradeLimit?item.dialogData.isTradeLimit:'';
                this.isAllUpdate=true;
                // this.fundgroupChangeROListForRisk = item.fundgroupChangeROList?item.fundgroupChangeROList:[];
                // this.stringEstablishDateForRisk = item.stringEstablishDate?item.stringEstablishDate:'';
                // this.fundgroupNewFundgroupDOForRisk = item.fundgroupNewFundgroupDO?item.fundgroupNewFundgroupDO:[];
            }else{
                this.groupid = item.groupid?item.groupid:'';
                this.groupname = item.groupname?item.groupname:'';
                this.grouptype = item.grouptype?item.grouptype:'';
                this.rightLimit = item.fundgroupNewFundgroupDO.rightLimit=='0'?'0':item.fundgroupNewFundgroupDO.rightLimit;
                this.largeRedemptionPercent = item.fundgroupNewFundgroupDO.largeRedemptionPercent=='0'?'0':item.fundgroupNewFundgroupDO.largeRedemptionPercent;
                this.rightMaxratePerc = item.fundgroupNewFundgroupDO.rightMaxratePerc=='0'?'0':item.fundgroupNewFundgroupDO.rightMaxratePerc;
                this.singlevalueCustmaxPerc = item.fundgroupNewFundgroupDO.singlevalueCustmaxPerc=='0'?'0':item.fundgroupNewFundgroupDO.singlevalueCustmaxPerc;
                this.categoryunitGroupmaxPerc = item.fundgroupNewFundgroupDO.categoryunitGroupmaxPerc=='0'?'0':item.fundgroupNewFundgroupDO.categoryunitGroupmaxPerc;
                this.turnoverRatePerc = item.fundgroupNewFundgroupDO.turnoverRatePerc=='0'?'0':item.fundgroupNewFundgroupDO.turnoverRatePerc;
                this.singleunitGroupmaxPerc = item.fundgroupNewFundgroupDO.singleunitGroupmaxPerc=='0'?'0':item.fundgroupNewFundgroupDO.singleunitGroupmaxPerc;
                this.rightMinratePerc = item.fundgroupNewFundgroupDO.rightMinratePerc=='0'?'0':item.fundgroupNewFundgroupDO.rightMinratePerc;
                this.valueMinratePerc = item.fundgroupNewFundgroupDO.valueMinratePerc=='0'?'0':item.fundgroupNewFundgroupDO.valueMinratePerc;
                this.valueMaxratePerc = item.fundgroupNewFundgroupDO.valueMaxratePerc=='0'?'0':item.fundgroupNewFundgroupDO.valueMaxratePerc;
                this.isBlacklist = item.fundgroupNewFundgroupDO.isBlacklist?item.fundgroupNewFundgroupDO.isBlacklist:'';
                this.isTradeLimit = item.fundgroupNewFundgroupDO.isTradeLimit?item.fundgroupNewFundgroupDO.isTradeLimit:'';
                this.fundgroupChangeROListForRisk = item.fundgroupChangeROList?item.fundgroupChangeROList:[];
                this.stringEstablishDateForRisk = item.stringEstablishDate?item.stringEstablishDate:'';
                this.fundgroupNewFundgroupDOForRisk = item.fundgroupNewFundgroupDO?item.fundgroupNewFundgroupDO:[];
                this.isAllUpdate=false;
            }
        },
        // 复核风控
        reviewRisk:function(item){
            this.saveData(item);
            var _this=this;
            var params={};
            params.operate = this.operate;
            params.mySQLId = this.mysqlId;
            if(this.isAllUpdate){
                params.dialogData=Object.assign(this.dialogData,{
                    rightLimit:this.rightLimit,
                    largeRedemptionPercent:this.largeRedemptionPercent,
                    rightMaxratePerc:this.rightMaxratePerc,
                    singlevalueCustmaxPerc:this.singlevalueCustmaxPerc,
                    categoryunitGroupmaxPerc:this.categoryunitGroupmaxPerc,
                    turnoverRatePerc:this.turnoverRatePerc,
                    singleunitGroupmaxPerc:this.singleunitGroupmaxPerc,
                    rightMinratePerc:this.rightMinratePerc,
                    valueMinratePerc:this.valueMinratePerc,
                    valueMaxratePerc:this.valueMaxratePerc,
                    isBlacklist:this.isBlacklist,
                    isTradeLimit:this.isTradeLimit,
                    noPushServerWords:this.noPushServerWords,
                });
            }else{
                params.groupid = this.groupid;
                params.groupname = this.groupname;
                params.grouptype = this.grouptype;
                params.rightLimit = this.rightLimit;
                params.largeRedemptionPercent = this.largeRedemptionPercent;
                params.rightMaxratePerc = this.rightMaxratePerc;
                params.singlevalueCustmaxPerc = this.singlevalueCustmaxPerc;
                params.categoryunitGroupmaxPerc = this.categoryunitGroupmaxPerc;
                params.turnoverRatePerc = this.turnoverRatePerc;
                params.singleunitGroupmaxPerc = this.singleunitGroupmaxPerc;
                params.rightMinratePerc = this.rightMinratePerc;
                params.valueMinratePerc = this.valueMinratePerc;
                params.valueMaxratePerc = this.valueMaxratePerc;
                params.isBlacklist = this.isBlacklist;
                params.isTradeLimit = this.isTradeLimit;
                params.noPushServerWords = this.noPushServerWords;
                params.fundgroupChangeROListForRisk = this.fundgroupChangeROListForRisk;
                params.stringEstablishDateForRisk = this.stringEstablishDateForRisk;
                params.fundgroupNewFundgroupDOForRisk = this.fundgroupNewFundgroupDOForRisk;
            }
            params.updateTime = moment(new Date().getTime()).format("YYYY-MM-DD HH:mm:ss");
            params.isAllUpdate=this.isAllUpdate;
            console.log(params);
            $.post({
                url: '/investmentMgmt/investmentStrategy/combinationProductRiskReview/reviewRisk.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(0);
                        _this.showDialog('', 'info', false, result.msg);
                    }
                    else {
                        _this.showDialog('', 'info', true, result.msg);
                    }
                }
            });
        },
        // 复核驳回
        rejectRisk:function(item){
            var params={};
            var _this = this;
            params.updateTime = moment(new Date().getTime()).format("YYYY-MM-DD HH:mm:ss");
            params.operate = item.operate?item.operate:'2';
            params.mySQLId = item.mySQLId;
            $.post({
                url: '/investmentMgmt/investmentStrategy/combinationProductRiskReview/rejectRisk.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(0);
                        _this.showDialog('', 'info', false, result.msg);
                    }
                    else {
                        _this.showDialog('', 'info', true, result.msg);
                    }
                }
            });
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
        },
        //主表格分页方法
        prev: function () {
            this.currentIndex <= 0 ? 0 : this.currentIndex--;
        }
        ,
        next: function () {
            this.currentIndex >= this.middleData.length - 1 ? this.middleData.length - 1 : this.currentIndex++;
        }
        ,
        changeIndex: function (index) {
            this.currentIndex = index - 1;
        }
        ,
        toFirst: function () {
            this.currentIndex = 0;
        }
        ,
        toLast: function () {
            this.currentIndex = this.middleData.length - 1;
        },
       
    },
    components: {
        'date-picker': VueBootstrapDatetimePicker
    },
    // 类型状态
    filters: {
        badTimeFormat:function(val){
            if(val&&val.indexOf('-')===-1){
                if(val.length>8){
                    return this.moment(val,'YYYYMMDD HHmmss').format('YYYY-MM-DD HH:mm:ss')
                }else{
                    return this.moment(val,'YYYYMMDD').format('YYYY-MM-DD')
                }
            }else{
                return val
            }
        },
        riskLevelTransfer:function(item){
            var value=item.fundgroupNewFundgroupDO? item.fundgroupNewFundgroupDO.investRiskLevel:item.dialogData?item.dialogData.investRiskLevel:item.investRiskLevel?item.investRiskLevel:'';
            var obj = {
                "1": "R0-极低风险",
                "2": "R1-低风险",
                "3": "R2-较低风险",
                "4": "R3-中等风险",
                "5": "R4-较高风险",
                "6": "R5-高风险",
            }
            if (obj[value]) {
                return obj[value];
            }
            return value;
        },
        grouptype: function (item) {
            if (item) {
                return item.replace(/1/g, '保守型').replace(/2/g, '稳健型').replace(/3/g, '平衡型').replace(/4/g, '进取型').replace(/5/g, '积极型')
            }
        },
        createtime: function (item) {
            if (item) {
                var Arrary = [];
                for (var i = 0; i < item.length - 1; i++) {
                    Arrary.push(item[i]);
                }
                var fixZero = function (num) {
                    return num < 10 ? '0' + num : num;
                };
                return [Arrary[0], Arrary[1], Arrary[2], Arrary[3], Arrary[4], Arrary[5]].map(function (value) {
                    return fixZero(value)
                }).join('').replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/g, '$1$2$3 $4:$5');
            }
        },
        chineseGrouptype: function (value) {
            var obj = {
                "1": "保守型",
                "2": "稳健型",
                "3": "平衡型",
                "4": "进取型",
                "5": "积极型",
            }
            if (obj[value]) {
                return obj[value];
            }
            return value;
        },
        // 类型状态
        fundTypeForFundgroup: function (value) {
            var obj = {
                "V": "货币类",
                "R": "权益类",
                "F": "固收类",
                "O": "其他",
            }
            if (obj[value]) {
                return obj[value];
            }
            return value;
        },
        // 类型状态
        fundApkind: function (value) {
            var obj = {
                "V": "货币类",
                "R": "权益类",
                "F": "固收类",
                "O": "其他",
            }
            if (obj[value]) {
                return obj[value];
            }
            return value;
        },
        isUnderlyingCurrency:function(value){
            var obj = {
                "Y": "是",
                "N": "否",
            }
            if (obj[value]) {
                return obj[value];
            }
            return value;
        },
        chineseFundgroupType: function (value) {
            var obj = {
                "01": "智投组合",
                "02": "养老组合",
                "03": "指数宝",
                "04": "三方组合",
                "06": "策略组合",
                "08": "现金+",
                "11": "企业版现金+",
                "12": "发车组合",
                "13":"活钱管理",
                "14":"稳健理财",
                "15":"长期投资",
                "16":"教育金",
                "17":"养老金",
            }
            if (obj[value]) {
                return obj[value];
            }
            return value;
        }
    }
});


