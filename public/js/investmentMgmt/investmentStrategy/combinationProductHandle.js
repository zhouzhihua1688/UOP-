let vm = new Vue({
    el: '#content',
    data: {
        // 主页面相关数据
        // 规则编号
        id: '',
        isAdd: false,
        isAllUpdate: false,
        // 产品
        product: "",
        // 保存弹窗产品
        saveproduct: "",
        // 业务类型
        serialno: '',
        actionType: "",
        endDate: "",
        endTime: "",
        groupid: "",
        startDate: "",
        startTime: "",

        remark: "",
        status: "",
        // 查询
        groupids: '',//本地数据库
        groupides: "",//业务数据
        groupidList: "",
        detailItem: [],  //业务数据基金信息
        // 修改弹窗唯一一个
        reviseAdvise: "",//修改弹窗调仓唯一一个

        fundgroupTypes: '',
        isUpdate: false,
        //隐藏假分页节点元素
        showMysql: false,
        tableData: [],
        diaMsg: '',
        checkData: [],

        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        pageMaxNum: '10',
        condition: '',
        currentIndex2: 0,
        // 全选
        allCheck: false,
        // 复核状态
        reviewStatus: "",
        // 数据库id
        mysqlId: "",
        // 数据类型(0:业务,1:Mysql数据库)
        type: "1",
        mysqlStatus: '',
        // mysql传产品值
        mysqlProduct: "",
        // 获取数据库产品所有ID
        arrId: [],
        oneId: '',
        operator: "",
        // 判断Mysql数据状态
        delete_flag: "",
        operate: '',
        // 自动获取规则编号Id
        ruleId: "",
        // type:1,
        // 新增弹窗下拉列表数据
        fundGroupType: [],// 组合类型
        branchCodeList: [], // 网点号
        ageRangeList: [],   //年龄段
        grouptypeList: [],  //组合风险类型
        risklevelList: [],  //组合风险等级
        // 组合查询相关参数
        // 所有组合
        groupId: '',
        fundGroups: [],//查询
        fundGroupList: [],//组合多选
        subGroupArr: [],
        // 新增弹窗相关参数
        fundgroupType: "",  //组合类型
        groupid: '',         //组合ID
        groupname: "",     //组合名称
        fundgroupDesc: "", //组合建议
		targetContract:"",//目标赢协议
		strategyMode:"",//策略运作模式
        fundgroupAdvise: "", // 智投建议
        onlinedate: "",      //成立上线日期
        onlinetime: "",    //成立日期的时间 (hhmmss)6位
        // sofarYield: "",       //年华收益率
        proPageurl: "",     // 专业版宣传页
        // normalPageurl: "",   // 小白版宣传页
        ageRange: "",        //年龄段
        // branchCode: "",         //网点
        branchCode: [],           //网点-多选
        acceptMode:"",           //渠道-单选
        // acceptMode: ["0"],    //渠道-多选
        acceptMode: [],         //渠道-多选
        cooPreationMode: 2,   //合作模式
        stopStatus: "0",   // 交易状态
        stopStartTime: '',  //暂停开始时间
        stopEndTime: "",   //暂停结束时间

        changeAdvises: '',  // 模板里添加调仓说明

        changeAdvise: "",       //组合调仓说明（属于历史调仓里）
        // grouptype: "01",        //组合风险类型已用(属组合成分里)
        isDisplay: 0,   //新增字段用户可以选择不展示，前端页面控制展示“是”和“否”选择，后台传入“1“或“0“
        isDisplays: "",
        strChangetime: '',//调仓时间 (YYYYMMDDHHmmss)
        strChangetimes: "",
        strCreattime: '',//鼠标点击添加调仓按钮的操作时间(YYYYMMDDHHmmss)
        fundApkind: "",      //产品类型（属于历史调仓里列表）
        fundPercent: "",           //组合历史调仓调整仓位（属于历史调仓里）
        fundid: "",        //组合历史调仓产品（属于历史调仓里）
        // displayDate: "",  //邮件里新增字段//用于控制搜索展示，需要前端让营运人员输入
        stringEstablishDate: "",   //成立调仓日期和成立日期一样，都为YYYYMMDD补上6个000000默认开始不能选择操作

        // 各种占比
        rightPercent: "",                 //权益类占比
        fixPercent: "",           //固收类占比
        vaPercent: "",           //货币类占比
        otherPercent: "",
        // 暂停交易显示时间按钮
        isTime: false,
        isCode: false,  //网点号显示
        // 组合成分的参数
        grouptype: "01",    //风险类型
        risklevel: "01",   // 风险等级
        initamount: "",   //起投金额
        commro: "",     // 费率折扣
        minRedeemAmount: "1000",   // 最低赎回金额
        minChangeAmount: "1000",   // 最低调仓金额
        minReserveAmount: "1000",  // 最低持有金额
        rightLimit: '',  // 权益类基金定义
        largeRedemptionPercent: '',  // 大额赎回在全平台的比例
        // 新增按钮调取所有基金
        diaSearchFundId: '',    //查询用
        diaSearchFundName:'',   //查询用
        fundId: '',  //查询用
        fundList: [],    //组合所有基金
        fundHistoryList: [],  //历史调仓所有基金
        muchFundHistoryList: [], //历史调仓多个按钮添加所有基金
        savedDialogName: '',
        fundInfoForOptional: {},
        fundIdSearchForOptionalFundIds: '', // 备选基金所有基金列表基金ID查询条件
        fundNameSearchForOptionalFundIds: '', // 备选基金所有基金列表基金名称查询条件
        fundListForOptionalFundIds: [], // 备选基金所有基金列表
        htmlFundList: [],
        // 添加基金到页面
        fundListAll: [],
        fundHistory: [],
        muchHistoryList: [],
        // 基金计算添加个数
        size: '0',
        size2: '',
        // muchSize: '',
        // 添加节点
        htmlList: [],
        moment: moment,
        ArrList: [],    //用于添加多个调仓
        checkDatils: [],  //详情
        paramsList: [],   //用于查询所有调仓信息,
        updateFundList: [],//用于修改里面新增调仓-添加基金到页面
        updateList: false,  //用于修改里面新增调仓
        updataAdvise: '', //修改-添加调仓里用于建议
        isDisplayAdd: "", //修改-添加调仓里用于是否展示
        loadingStatus: '数据获取中...',
        disabled:false,
        basicDetail:[],
        itemDetail:[],
        allId:[],          //所有组合ID-验证用
        fundIdList:[],
        isInvestment:"Y",//   2020.08.26  增加是否投顾
        fundgroupFeature:"",  //2020.09.28 组合投资特点
        investmentServicePerc:"",////2020.09.28 投顾服务费率
        riskControl: 'Y',  // 2020.11.04 是否过投顾风控
        service: {
            isLocalUpdate: false,           // 是否是本地修改
            mySQLId: '',                    // 本地数据库ID
            updateTimestamp: '',            // 本地数据库时间戳
            serialno: '',                   // 组合序列号
            fundGroupType: '',              // 组合类型
            fundGroupTypeList: [],          // 组合类型列表
            groupId: '',                    // 组合ID
            groupName: '',                  // 组合名称
            fundGroupDesc: '',              // 配置理念
			targetContract:"",				//目标赢协议
			strategyMode:"",				//策略运作模式
            fundGroupAdvise: '',            // 投资建议
            recommendReason: '',            // 推荐理由
            recommendHoldTime: '',        // 推荐持有时间
            onlineDate: '',                 // 成立时间
            acceptMode: '2',                // 开放渠道
            acceptModeListForFundId: [],    // 该基金下不同渠道的基金状态
            ageRange: '',                   // 适合年龄段
            ageRangeList: [],               // 适合年龄段列表
            accptType: '2',                 // 合作模式
            branchCode: [],                 // 网点号
            branchCodeList: [],             // 网点号列表
            stopStatus: '0',                // 交易状态
            manualStartTime: '',            // 暂停发起时间
            manualEndTime: '',              // 暂停终止时间
            // displayDate: '',                // 组合上架日
            status: 'N',                    // 生效状态
            fundGroupFeature: '',           // 组合投资特点
            investmentServicePerc: '',      // 投顾服务费率
            normalPageUrl: '',              // 组合攻略页
            isInvestment: 'Y',              // 是否投顾组合
            investType: 'M',                // 投顾类型(一般型/管理型)
            investCustomers: '',            // 投顾组合客户
            investPrincipal: '',            // 名义本金
            investDuration: '',             // 投顾时长
            categoryDescDoc: '',            // 策略说明书文件名
            categoryDescDisplay: '',        // 策略说明书展示文案
            riskDescDoc: '',                // 风险揭示书文件名
            riskDescDisplay: '',            // 风险揭示书展示文案
            investDescDoc: '',              // 投顾协议文件名
            investDescDisplay: '',          // 投顾协议展示文案
            riskControl: 'Y',               // 是否过投顾风控
            riskType: '1',                  // 风险类型
            riskTypeList: [],               // 风险类型列表
            initAmount: '',                 // 起投金额
            minRedeemAmount: '1000',            // 最低赎回金额
            minReserveAmount: '1000',           // 最低持有金额
            largeRedemptionPercent: '',     // 大额赎回在全平台的比例
            turnoverRatePerc: '',           // 账户换手率
            singlevalueCustmaxPerc: '',     // 单只基金市值不得超过客户账户资产净值
            categoryunitGroupmaxPerc: '',   // 同策略持有基金份额不得超过该基金总份额占比
            singleunitGroupmaxPerc: '',     // 持有单只指数基金的份额总和不得超过该基金总份额的
            rightMinratePerc:'',            //权益类基金占净值比不低于
            valueMinratePerc:'',            //债券基金占净值比不低于
            valueMaxratePerc:'',            //债券基金占净值比不超过
            isBlacklist:'',                 //是否禁投公司黑名单内基金
            isTradeLimit:'',                 //是否禁投流通受限基金
            riskLevel: '01',                 // 风险等级
            riskLevelList: [],              // 风险等级列表
            commro: '',                     // 费率折扣
            minChangeAmount: '1000',            // 最低调仓金额
            rightLimit: '',                 // 权益类基金定义
            rightMaxratePerc: '',           // 权益类基金占比不超过
            investRiskLevel: '1',           // 投顾风险等级
            isAddFundGroup: false,          // 是否添加调仓
            fundIdForSearch: '',            // 基金列表ID搜索条件
            fundNameForSearch: '',          // 基金列表名称搜索条件
            fundGroupFundListForSelect: [], // 基金列表
            fundGroupChangeDetailList: [],  // 历史调仓列表
            newFundGroupChange: {           // 新增调仓详情
                changeAdvise: '',
                isDisplay: 1,
                fundList: []
            },
            noPushServerWords:''//暂时只保留在本地字段
        },
        loadingShow: false,
        optionalFundListForShow: [],
        // 20210419新加字段
        recommendHoldTime: "", // 推荐持有时间
        recommendReason: "", // 推荐理由
        isUnderlyingCurrency:'',//是否是底层货币
        // 20210601新功能添加
        checkTradeList:[],   //验证外部基金渠道和交易状态信息

        rightMaxratePerc:"",         //权益类基金占比不超过
        turnoverRatePerc:"",        //账户换手率
        singlevalueCustmaxPerc:"", // 单只基金市值不得超过客户账户资产净值
        categoryunitGroupmaxPerc:"",  // 同策略持有基金份额不得超过该基金总份额占比
        singleunitGroupmaxPerc:"",   // 持有单只指数基金的份额总和不得超过该基金总份额的
        rightMinratePerc:'',            //权益类基金占净值比不低于
        valueMinratePerc:'',            //债券基金占净值比不低于
        valueMaxratePerc:'',            //债券基金占净值比不超过
        isBlacklist:'',                 //是否禁投公司黑名单内基金
        isTradeLimit:'',                 //是否禁投流通受限基金
        investRiskLevel:"1",     //投顾风险等级
        categoryDescDoc:"",    // 策略说明书地址
        categoryDescDisplay:'', // 策略说明书文案
        riskDescDoc:"",        // 风险揭示书地址
        riskDescDisplay:'',    // 风险揭示书文案
        investDescDoc:"",        // 投顾协议书地址
        investDescDisplay:'',   // 投顾协议书文案
        investType:'M',    //投顾类型
        investCustomers:'',    //投顾组合客户
        investPrincipal:'',    //名义本金
        investDuration:'',    //投资时长
		// 批量成分基金上传文件路径和批量上传类型
		batchFilePath:'',
		batchFileUploadType:''
    },
    // 获取本地Mysql所有Id
    created: function () {
        // this.getlocalList()
        // this.getTableData(0,this.type);
        this.userName();
        this.groupTypeList();
        this.riskLevelList();
        self = this;
        window.deleHtmlList = self.deleHtmlList;
        window.muchFundHistory = self.muchFundHistory;
        window.adviseList=self.adviseList;
        window.changeList= self.changeList;
    },
    mounted: function () {
        var dialogs = ['info', 'del', 'del2',"update", "revise", 'subMit', 'delAgain', "addFund", 'addFundHistory', 'muchFundHistory', "checkDatils","wareHouse","riskDialog",'addfile'];
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
        // 暂时去掉成立时间  2021/8/26 update 将来可能放开
        // 20220105放开，需求号9665，成立调仓时间可以选择过去的时间点
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
            // element.id === 'onlinedate' && ($('#stringEstablishDate').val(element.value));
            element.id === 'stringEstablishDate' && ($('#stringEstablishDate').val(element.value));
        }).next().on(ace.click_event, function (e) {
            $(this).prev().focus();
        });
        // 渠道多选
        var selected = [];
        $('#acceptMode').multiselect({
            buttonWidth: '175px',
            maxHeight: 300,
            // enableFiltering: true,
            enableHTML: true,
            // includeSelectAllOption: true,//全选
            // selectAllText: '全选',//全选的checkbox名称
            nonSelectedText: '请选择',
            selectAllNumber: false,//true显示allselect（6）,false显示allselect
            selectAllName: 'select-all-name',
            selectAllValue: 'select-all-value',//可以为strig或者数字
            selectAllJustVisible: false,//选择所有的。true为全选可见的
            buttonClass: 'btn btn-white btn-primary',
            buttonText: function (options, select) {
                var once = [];
                $('#acceptMode option:selected').each(function () {
                    once.push($(this).attr('label'));
                });
                // console.log(options.length);
                // console.log(options.prevObject.length);
                if (options.length === 0) {
                    return this.nonSelectedText;
                } else if (options.length === 1) {
                    return once[0];
                } else if (options.length > 1) {
                    return '已选' + once.length
                }
            },
            templates: {
                button: '<button type="button" class="multiselect dropdown-toggle" data-toggle="dropdown"><span class="multiselect-selected-text"></span> &nbsp;<b class="fa fa-caret-down"></b></button>',
                ul: '<ul class="multiselect-container dropdown-menu"></ul>',
                filter: '<li class="multiselect-item filter"><div class="input-group"><span class="input-group-addon"><i class="fa fa-search"></i></span><input class="form-control multiselect-search" type="text"></div></li>',
                filterClearBtn: '<span class="input-group-btn"><button class="btn btn-default btn-white btn-grey multiselect-clear-filter" type="button"><i class="fa fa-times-circle red2"></i></button></span>',
                li: '<li><a tabindex="0"><label></label></a></li>',
                divider: '<li class="multiselect-item divider"></li>',
                liGroup: '<li class="multiselect-item multiselect-group"><label></label></li>'
            },
            onDropdownHide: function (event) {
                selected = [];
                $('#acceptMode option:selected').each(function () {
                    selected.push($(this).val());
                });
                // console.log(selected,'selected');
                _this.acceptMode = $("#acceptMode").val() ? $("#acceptMode").val() : [];
            },
            onDropdownShown: function () {
                selected = [];
                $('#acceptMode option:selected').each(function () {
                    selected.push($(this).val());
                    // selected.push($("#acceptMode").val())
                });
                _this.acceptMode = $("#acceptMode").val() ? $("#acceptMode").val() : [];
                console.log("===", _this.acceptMode)
            }
        });
        // 网点号多选
        $('#branchCode').multiselect({
            buttonWidth: '175px',
            maxHeight: 300,
            // enableFiltering: true,
            enableHTML: true,
            // includeSelectAllOption: true,//全选
            // selectAllText: '全选',//全选的checkbox名称
            nonSelectedText: '请选择',
            selectAllNumber: false,//true显示allselect（6）,false显示allselect
            selectAllName: 'select-all-name',
            selectAllValue: 'select-all-value',//可以为strig或者数字
            selectAllJustVisible: false,//选择所有的。true为全选可见的
            buttonClass: 'btn btn-white btn-primary',
            buttonText: function (options, select) {
                var once = [];
                $('#branchCode option:selected').each(function () {
                    once.push($(this).attr('label'));
                    // once.push($(this).attr('value'));
                });
                // console.log(options.length);
                // console.log(options.prevObject.length);
                if (options.length === 0) {
                    return this.nonSelectedText;
                } else if (options.length === 1) {
                    return once[0];
                } else if (options.length > 1) {
                    return '已选' + once.length
                }
            },
            templates: {
                button: '<button type="button" class="multiselect dropdown-toggle" data-toggle="dropdown"><span class="multiselect-selected-text"></span> &nbsp;<b class="fa fa-caret-down"></b></button>',
                ul: '<ul class="multiselect-container dropdown-menu"></ul>',
                filter: '<li class="multiselect-item filter"><div class="input-group"><span class="input-group-addon"><i class="fa fa-search"></i></span><input class="form-control multiselect-search" type="text"></div></li>',
                filterClearBtn: '<span class="input-group-btn"><button class="btn btn-default btn-white btn-grey multiselect-clear-filter" type="button"><i class="fa fa-times-circle red2"></i></button></span>',
                li: '<li><a tabindex="0"><label></label></a></li>',
                divider: '<li class="multiselect-item divider"></li>',
                liGroup: '<li class="multiselect-item multiselect-group"><label></label></li>'
            },
            onDropdownHide: function (event) {
                selected = [];
                $('#branchCode option:selected').each(function () {
                    selected.push($(this).val());
                });
                // console.log(selected,'selected');
                _this.branchCode = $("#branchCode").val() ? $("#branchCode").val() : [];
            },
            onDropdownShown: function () {
                selected = [];
                $('#branchCode option:selected').each(function () {
                    selected.push($(this).val());
                    // selected.push($("#acceptMode").val())
                });
                _this.branchCode = $("#branchCode").val() ? $("#branchCode").val() : [];
                console.log("===", _this.branchCode)
            }
        });
        // 修改渠道号多选
        $('#acceptModes').multiselect({
            buttonWidth: '175px',
            maxHeight: 300,
            // enableFiltering: true,
            enableHTML: true,
            // includeSelectAllOption: true,//全选
            // selectAllText: '全选',//全选的checkbox名称
            nonSelectedText: '请选择',
            selectAllNumber: false,//true显示allselect（6）,false显示allselect
            selectAllName: 'select-all-name',
            selectAllValue: 'select-all-value',//可以为strig或者数字
            selectAllJustVisible: false,//选择所有的。true为全选可见的
            buttonClass: 'btn btn-white btn-primary',
            buttonText: function (options, select) {
                var once = [];
                $('#acceptModes option:selected').each(function () {
                    once.push($(this).attr('label'));
                });
                // console.log(options.length);
                // console.log(options.prevObject.length);
                if (options.length === 0) {
                    return this.nonSelectedText;
                } else if (options.length === 1) {
                    return once[0];
                } else if (options.length > 1) {
                    return '已选' + once.length
                }
            },
            templates: {
                button: '<button type="button" class="multiselect dropdown-toggle" data-toggle="dropdown"><span class="multiselect-selected-text"></span> &nbsp;<b class="fa fa-caret-down"></b></button>',
                ul: '<ul class="multiselect-container dropdown-menu"></ul>',
                filter: '<li class="multiselect-item filter"><div class="input-group"><span class="input-group-addon"><i class="fa fa-search"></i></span><input class="form-control multiselect-search" type="text"></div></li>',
                filterClearBtn: '<span class="input-group-btn"><button class="btn btn-default btn-white btn-grey multiselect-clear-filter" type="button"><i class="fa fa-times-circle red2"></i></button></span>',
                li: '<li><a tabindex="0"><label></label></a></li>',
                divider: '<li class="multiselect-item divider"></li>',
                liGroup: '<li class="multiselect-item multiselect-group"><label></label></li>'
            },
            onDropdownHide: function (event) {
                selected = [];
                $('#acceptModes option:selected').each(function () {
                    selected.push($(this).val());
                });
                // console.log(selected,'selected');
                _this.acceptMode = $("#acceptModes").val() ? $("#acceptModes").val() : [];
            },
            onDropdownShown: function () {
                selected = [];
                $('#acceptModes option:selected').each(function () {
                    selected.push($(this).val());
                    // selected.push($("#acceptMode").val())
                });
                _this.acceptMode = $("#acceptModes").val() ? $("#acceptModes").val() : [];
                console.log("===", _this.acceptMode)
            }
        });
        // 修改网点号多选
        $('#branchCodes').multiselect({
            buttonWidth: '175px',
            maxHeight: 300,
            // enableFiltering: true,
            enableHTML: true,
            // includeSelectAllOption: true,//全选
            // selectAllText: '全选',//全选的checkbox名称
            nonSelectedText: '请选择',
            selectAllNumber: false,//true显示allselect（6）,false显示allselect
            selectAllName: 'select-all-name',
            selectAllValue: 'select-all-value',//可以为strig或者数字
            selectAllJustVisible: false,//选择所有的。true为全选可见的
            buttonClass: 'btn btn-white btn-primary',
            buttonText: function (options, select) {
                var once = [];
                $('#branchCodes option:selected').each(function () {
                    once.push($(this).attr('label'));
                    // once.push($(this).attr('value'));
                });
                // console.log(options.length);
                // console.log(options.prevObject.length);
                if (options.length === 0) {
                    return this.nonSelectedText;
                } else if (options.length === 1) {
                    return once[0];
                } else if (options.length > 1) {
                    return '已选' + once.length
                }
            },
            templates: {
                button: '<button type="button" class="multiselect dropdown-toggle" data-toggle="dropdown"><span class="multiselect-selected-text"></span> &nbsp;<b class="fa fa-caret-down"></b></button>',
                ul: '<ul class="multiselect-container dropdown-menu"></ul>',
                filter: '<li class="multiselect-item filter"><div class="input-group"><span class="input-group-addon"><i class="fa fa-search"></i></span><input class="form-control multiselect-search" type="text"></div></li>',
                filterClearBtn: '<span class="input-group-btn"><button class="btn btn-default btn-white btn-grey multiselect-clear-filter" type="button"><i class="fa fa-times-circle red2"></i></button></span>',
                li: '<li><a tabindex="0"><label></label></a></li>',
                divider: '<li class="multiselect-item divider"></li>',
                liGroup: '<li class="multiselect-item multiselect-group"><label></label></li>'
            },
            onDropdownHide: function (event) {
                selected = [];
                $('#branchCodes option:selected').each(function () {
                    selected.push($(this).val());
                });
                // console.log(selected,'selected');
                _this.branchCode = $("#branchCodes").val() ? $("#branchCodes").val() : [];
            },
            onDropdownShown: function () {
                selected = [];
                $('#branchCodes option:selected').each(function () {
                    selected.push($(this).val());
                    // selected.push($("#acceptMode").val())
                });
                _this.branchCode = $("#branchCodes").val() ? $("#branchCodes").val() : [];
                console.log("===", _this.branchCode)
            }
        });

        // 查询
        var fundArr = ["fundGroupsList"];
        fundArr.forEach(function (value) {
            $('#' + value).chosen({
                search_contains:true,
                no_results_text: '未找到相关基金信息',
                disable_search_threshold:6,
                width: '175px'
            });
        });
        $('#fundGroupsList').on('change', function (e, params) {
            _this.groupids = params ? params.selected : '';
        });
        // $.post({
        //     url: '/investmentMgmt/investmentStrategy/combinationProductHandle/fundList.ajax',
        //     success: function (result) {
        //         if (result.error === 0) {
        //             _this.fundListForOptionalFundIds = JSON.parse(JSON.stringify(result.data.body.map(function(item){
        //                 return {
        //                     fundId: item.fundId,
        //                     fundName: item.fundName,
        //                     fundTypeForFundgroup: item.fundTypeForFundgroup,
        //                     source:item.source,
        //                     channelList:item.channelList,
        //                     priority: '1',
        //                     check: false,
        //                     canSelectForOptional: 0
        //                 };
        //             })));
        //         }
        //     }
        // });
        $('#serviceBranchCode').chosen({
            search_contains: true,
            no_results_text: '未找到该网点',
            disable_search_threshold: 6,
            width: '200px'
        });
        $('#serviceBranchCode').on('change', function (e, params) {
            if(params && params.selected){
                if(this.service.branchCode.indexOf(params.selected) === -1){ // 未选
                    this.service.branchCode.push(params.selected);
                }
            }
            if(params && params.deselected){
                if(this.service.branchCode.indexOf(params.deselected) > -1){ // 已选
                    var index = this.service.branchCode.indexOf(params.deselected);
                    this.service.branchCode.splice(index,1);
                }
            }
        }.bind(this));
        this.branchCodeLists();
        this.fundGroup();
        this.getTableData(0, this.type);
        this.groupFundType();
        this.allGroupId();
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
        //选择基金数据过滤
        filterFundList: function () {
            var filterData = [];
            var _this = this;
            this.fundList.forEach(function (item) {
                if(item.fundName) {
                    if (item.fundId.indexOf(_this.diaSearchFundId) > -1 && item.fundName.indexOf(_this.diaSearchFundName) > -1) {
                        filterData.push(item);
                    }
                }
            });
            return filterData;
        },
        filterFundList2: function () {
            var filterData = [];
            var _this = this;
            var ArrName=[]
            this.fundHistoryList.forEach(function (item) {
                ArrName.push(item.fundName)
                // 过滤没有基金名字
                if(item.fundName){
                    if (item.fundId.indexOf(_this.diaSearchFundId) > -1 && item.fundName.indexOf(_this.diaSearchFundName) > -1) {
                        filterData.push(item);
                    }
                }

                // if (item.fundId.indexOf(_this.diaSearchFundId) > -1 ) {
                //     filterData.push(item);
                // }

                // else if(ArrName.indexOf(_this.diaSearchFundName) > -1){
                //     filterData.push(item);
                // }
            });
            return filterData;
        },
        filterFundList3: function () {
            var filterData = [];
            var _this = this;
            this.muchFundHistoryList.forEach(function (item) {
                if(item.fundName) {
                    if (item.fundId.indexOf(_this.diaSearchFundId) > -1 && item.fundName.indexOf(_this.diaSearchFundName) > -1) {
                        filterData.push(item);
                    }
                }
            });
            return filterData;
        },
        fundListForOptionalFundIdsComputed: function(){
            var _this = this;
            return this.fundListForOptionalFundIds.filter(function(item){
                return String(item.fundId).indexOf(_this.fundIdSearchForOptionalFundIds) > -1 &&  String(item.fundName).indexOf(_this.fundNameSearchForOptionalFundIds) > -1;
            });
        },
        fundListForOptionalFundIdsSelectedComputed: function(){
            return this.fundListForOptionalFundIds.filter(function(item){
                return item.check;
            });
        },
        fundGroupFundListForSelectComputed: function(){
            return this.service.fundGroupFundListForSelect.filter(function(item){
                // if(this.service.isInvestment === 'N' && item.source){ // 非投顾组合，只能选内部基金
                //     return String(item.fundId).indexOf(this.service.fundIdForSearch) > -1 &&
                //         String(item.fundName).indexOf(this.service.fundNameForSearch) > -1 && item.source == 1;
                // }
                // 投顾能选内部和外部基金
                return String(item.fundId).indexOf(this.service.fundIdForSearch) > -1 &&
                    String(item.fundName).indexOf(this.service.fundNameForSearch) > -1;
            }.bind(this));
        }
    },
    watch: {
        pageMaxNum: function () {
            this.getTableData(0, this.type);
        },
        // 假分页
        watch: {
            pageMaxNum: function () {
                this.currentIndex = 0;
                this.getTableData(0, this.type)
            },
            condition: function () {
                this.currentIndex = 0;
            }
        },
        'service.fundGroupType': function(newValue,oldValue){
            if(newValue === '04'){ // 三方组合时开放渠道默认为6
                this.service.acceptMode = '6';
            }
        }
    },
    methods: {
        // 获取信息
        userName: function () {
            var _this = this;
            var operator;
            $.post({
                url: '/investmentMgmt/investmentStrategy/combinationProductHandle/userName.ajax',
                success: function (result) {
                    if (result.error === 0) {
                        operator = result.data
                    }
                    _this.operator = operator
                }
            });
        },

        // 网点号
        branchCodeLists: function () {
            var _this = this
            $.post({
                url: '/investmentMgmt/investmentStrategy/combinationProductHandle/branchCodeList.ajax',
                data: {
                    pmst: "SYSTEM",
                    pmkey: "BRANCHCODE"
                },
                success: function (result) {
                    if (result.error === 0) {
                        _this.branchCodeList = result.data.body;
                        // 网点号多选条件
                        var branchCode = result.data.body;
                        _this.dataSummary2(branchCode, 'value', 'label', 'branchCode','this.branchCode');
                        _this.dataSummary2(branchCode, 'value', 'label', 'branchCodes','this.branchCode');
                    }
                    // _this.showDialog('', 'info', false, result.msg);
                }
            });
        },
        // 获取基金所有组合-查询
        // fundGroup: function () {
        //     var _this = this;
        //     $.post({
        //         url: '/investmentMgmt/investmentStrategy/combinationProductHandle/fundGroups.ajax',
        //         success: function (result) {
        //             if (result.error === 0) {
        //                 _this.fundGroupList = result.data.body;
        //                 // console.log("_this.fundGroupList",_this.fundGroupList)
        //                 //  过滤组合-类型
        //                 // _this.fundGroupList = result.data.body.filter((x, index, self) => {
        //                 //     var arrids = []
        //                 //     result.data.body.forEach((item, i) => {
        //                 //         arrids.push(item.fundgroupType)
        //                 //     })
        //                 //     return arrids.indexOf(x.fundgroupType) === index
        //                 // })

        //                 var str = '';
        //                 result.data.body.forEach(function(item) {
        //                     str += '<option value="' + item.groupId + '">' + item.groupId + '-' + item.groupName + '</option>';
        //                 });
        //                 var fundArr = ["fundGroupsList"];
        //                 fundArr.forEach(function (value) {
        //                     $('#' + value).html('<option value=""></option>' + str);
        //                     $('#' + value).trigger('chosen:updated');
        //                 });
        //             }
        //         }
        //     });
        // },

        // 获取所有组合ID-验证用
        fundGroup: function () {
            var _this = this;
            $.post({
                url: '/investmentMgmt/investmentStrategy/combinationProductHandle/fundGroups.ajax',
                success: function (result) {
                    if (result.error === 0) {
                        _this.fundGroupList = result.data.body;
                        // console.log("_this.fundGroupList",_this.fundGroupList)
                        //  过滤组合-类型
                        // _this.fundGroupList = result.data.body.filter((x, index, self) => {
                        //     var arrids = []
                        //     result.data.body.forEach((item, i) => {
                        //         arrids.push(item.fundgroupType)
                        //     })
                        //     return arrids.indexOf(x.fundgroupType) === index
                        // })
                        // console.log(_this.fundGroupList);
                        var str = '';
                        var filterList=[];
                        filterList=result.data.body.filter((item)=>{
                            return item.isInvestment=='Y'
                        });
                        filterList.sort((a,b)=>a.groupId.replace('A','')-b.groupId.replace('A',''));
                        filterList.forEach(function(item) {
                            str += '<option value="' + item.groupId + '">' + item.groupId + '-' + item.groupName + '</option>';
                        });
                        var fundArr = ["fundGroupsList"];
                        fundArr.forEach(function (value) {
                            $('#' + value).html('<option value=""></option>' + str);
                            $('#' + value).trigger('chosen:updated');
                        });
                    }
                }
            });
        },
        allGroupId: function () {
            var _this = this
            $.post({
                url: '/investmentMgmt/investmentStrategy/combinationProductHandle/allGroupId.ajax',
                success: function (result) {
                    if (result.error === 0) {
                        _this.allId = result.data
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },

        // showList:function(){
        //     $(".show-details-btn").click(function(e){
        //             e.preventDefault();
        //             $(this).closest('tr').next().toggleClass('open');
        //             $(this).find(ace.vars['.icon']).toggleClass('fa-angle-double-down').toggleClass('fa-angle-double-up');
        //     })
        // },
        // 获取表格数据
        getTableData: function (currentIndex, type) {
            var _this = this;
            var params = {};
            //传过去的状态参数
            params.type = type;
            console.log(params)
            // 获取业务数据
            if (type == 0) {
                this.isUpdate = true;  //显示业务端分页
                this.showMysql = false//显示假分页
                this.currentIndex = 0;
                _this.loadingStatus = '数据获取中...';
                _this.tableData = [];
                // params.fundgroupType = this.fundgroupTypes;

                // if (this.groupids== "") {
                //     params.groupId = "ALL";
                // } else {
                //     params.groupId = this.groupids;
                // }
                // params.groupId = "ALL";
                var groupId = this.groupids;
                if(groupId==""){
                    params.groupId = "ALL";
                }else{
                    params.groupId =groupId;
                }
                var fundgroupType = this.fundgroupTypes;
                $.post({
                    url: '/investmentMgmt/investmentStrategy/combinationProductHandle/getTableData.ajax',
                    data: params,
                    success: function (result) {
                        if (result.error === 0) {
                            this.pageMaxNum = 1;
                            // _this.tableData = [];
                            _this.tableData =result.data.tableData.sort(_this.compare("groupId")).filter(function (item) {
                                return item.groupId.indexOf(groupId) > -1
                                    && item.fundgroupType.indexOf(fundgroupType) > -1 
                            });
                            if(_this.tableData==""){
                                _this.loadingStatus = '暂无数据';
                            }

                            // console.log("==_this.tableData",_this.tableData.ArrInfo)
                            // _this.tableData = result.data.tableData.filter(function (item) {
                            //     return item.groupid.indexOf(params.fundgroupType) > -1
                            // }).
                        }
                        else {
                            _this.tableData = [];
                            _this.loadingStatus = '暂无数据';
                            _this.showDialog('', 'info', false, result.msg);
                        }
                    }
                });
            }
            // 获取本地数据
            if (type == 1) {
                var _this = this;
                // 真假分页切换
                this.isUpdate = false;
                this.showMysql = true;
                this.currentIndex = 0;
                params.reviewStatus = this.reviewStatus; //复核状态
                params.fundgroupType = this.fundgroupTypes;
                _this.loadingStatus = '数据获取中...';
                params.groupid = this.groupids;
                $.post({
                    url: '/investmentMgmt/investmentStrategy/combinationProductHandle/getTableData.ajax',
                    data: params,
                    success: function (result) {
                        if (result.error === 0) {
                            _this.tableData = result.data;
                            if(_this.tableData==""){
                                _this.loadingStatus = '暂无数据';
                            }


                            //渠道多选条件
                            var acceptMode = [{'value': "0", "name": "柜台"}, {'value': "2", "name": "网上"}, {
                                'value': "6",
                                "name": "第三方"
                            }, {'value': "7", "name": "企业版"}]
                            _this.dataSummary(acceptMode, 'value', 'label', 'acceptMode',"this.acceptMode");
                            _this.dataSummary(acceptMode, 'value', 'label', 'acceptModes',"this.acceptMode");
                        }
                        else {
                            _this.tableData=[];
                            _this.loadingStatus = '暂无数据';
                            _this.showDialog('', 'info', false, result.msg);

                        }
                    }
                });
            }
        },
        // 业务数据排序
        compare:function (prop) {
            return function (obj1, obj2) {
                var val1 = obj1[prop];
                var val2 = obj2[prop];
                if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
                    val1 = Number(val1);
                    val2 = Number(val2);
                }
                if (val1 < val2) {
                    return 1;
                } else if (val1 > val2) {
                    return -1;
                } else {
                    return 0;
                }
            }
        },
        // 模拟点击
        select: function () {
            document.getElementById("type0").click();
        },
        select2: function () {
            document.getElementById("type1").click();
        },
        // 添加按钮弹窗
        showAdd: function () {
            
            this.isAdd = true;
            this.isAllUpdate = false;
            var _this = this;
            this.isTime=false;
            this.isCode=false;
            this.fundListAll = [];
            this.fundHistory = [];
            this.htmlList = [];
            this.size = 0;
            this.size2 = 0;
            this.id = "";
            this.mysqlId = "";

            this.fundgroupType = "01";//组合类型
            this.groupname = "";//组合名称
            this.groupid = 'A';   //组合ID
            this.fundgroupDesc = "";//组合建议
            this.targetContract = "";//目标赢协议
            this.strategyMode = "";//策略运作模式
            this.fundgroupAdvise = ""; // 智投建议
            this.onlinedate = "";     // 上线日期
            this.proPageurl = "";   // 专业版宣传页
            // this.normalPageurl = "";  // 小白版宣传页
            this.ageRange = "";      //年龄段
            // this.sofarYield = "";    //年收益率
            this.branchCode = [];       //网点
            // this.acceptMode = [];       //渠道-多选
            this.acceptMode ="2";          //渠道-单选
            this.cooPreationMode = "2";       //合作模式;
            this.stopStartTime = "";         //暂停开始时间
            this.stopEndTime = "";           //暂停结束时间
            $("#stopStartTime").val("");
            $("#stopEndTime").val("");
            $(".date-timepicker").val("");
            //成立时间默认取当天
            var currentTime = moment(new Date().getTime()).format('YYYY-MM-DD 00:00:00');
             $('#onlinedate').val(currentTime);
             $('#stringEstablishDate').val(currentTime);
            this.stopStatus = "0";  // 交易状态
            this.status="N"        //生效状态

            this.changeAdvise = "";      //组合调仓说明（属于历史调仓里）
            this.isDisplay = 0;  //新增字段用户可以选择不展示，前端页面控制展示“是”和“否”选择，后台传入“1“或“0“
            this.isDisplays = 1;  //多个模版的显示，前端页面控制展示“是”和“否”选择，后台传入“1“或“0“
            this.strChangetime = '';//调仓时间 (YYYYMMDDHHmmss)
            this.strCreattime = '';//鼠标点击添加调仓按钮的操作时间(YYYYMMDDHHmmss)
            this.fundApkind = "";      //产品类型（属于历史调仓里列表）
            this.fundPercent = "";           //组合历史调仓调整仓位（属于历史调仓里）
            this.fundid = "";        //组合历史调仓产品（属于历史调仓里）

            // this.displayDate = ""; //邮件里新增字段//用于控制搜索展示，需要前端让营运人员输入
            this.stringEstablishDate = "";   //成立调仓日期和成立日期一样，都为YYYYMMDD补上6个000000默认开始不能选择操作
            // 组合成分的参数

            this.grouptype = "1";   //风险类型
            this.risklevel = "01";  // 风险等级
            this.initamount = "";    //起投金额
            this.commro = "";     // 费率折扣
            this.minRedeemAmount = "1000";  // 最低赎回金额
            this.minChangeAmount = "1000";  // 最低调仓金额
            this.minReserveAmount = "1000";   // 最低持有金额
            this.rightLimit = '';   // 权益类基金定义
            this.largeRedemptionPercent = '';   // 大额赎回在全平台的比例
            this.isInvestment="Y";
            this.fundgroupFeature="";  //2020.09.28 组合投资特点
            this.investmentServicePerc="";////2020.09.28 投顾服务费率
            this.riskControl = 'Y';////2020.09.28 投顾服务费率

            this.investType="M";          //20210603投顾类型
            this.investCustomers='';    //投顾组合客户
            this.investPrincipal='';    //名义本金
            this.investDuration='';    //投资时长
            this.rightMaxratePerc="";         //20210603权益类基金占比不超过
            this.turnoverRatePerc="";        //20210603账户换手率
            this.singlevalueCustmaxPerc=""; //20210603单只基金市值不得超过客户账户资产净值
            this.categoryunitGroupmaxPerc="";  //20210603同策略持有基金份额不得超过该基金总份额占比
            this.singleunitGroupmaxPerc="";   //20210603持有单只指数基金的份额总和不得超过该基金总份额的
            this.rightMinratePerc='',            //权益类基金占净值比不低于
            this.valueMinratePerc='',            //债券基金占净值比不低于
            this.valueMaxratePerc='',            //债券基金占净值比不超过
            this.isBlacklist='',                 //是否禁投公司黑名单内基金
            this.isTradeLimit='',                 //是否禁投流通受限基金
            this.investRiskLevel="1";     //20210603投顾风险等级
			this.categoryDescDoc="",    // 策略说明书地址
			this.categoryDescDisplay='', // 策略说明书文案
			this.riskDescDoc="",        // 风险揭示书地址
			this.riskDescDisplay='',    // 风险揭示书文案
			this.investDescDoc="",        // 投顾协议书地址
			this.investDescDisplay='',   // 投顾协议书文案
            this.endTime = "";

            this.recommendReason="";          //推荐理由
            _this.groupFundType();
            
            //  $('#onlinedate').val(currentTime);
            this.showDialog('', 'add');
        },
        // 同步时间(调仓成立时间)
        syncTime:function(){
            var _this=this;
            var time=$("#onlinedate").val()
            $("#stringEstablishDate").val(time)
        },
        // 添加弹窗里面获取组合类型数据
        groupFundType: function () {
            var _this = this;
            $.post({
                url: '/investmentMgmt/investmentStrategy/combinationProductHandle/fundGroupType.ajax',
                data: {
                    pmst: "SYSTEM",
                    pmkey: "FUNDGROUP_TYPE"
                },
                success: function (result) {
                    if (result.error === 0) {
                        _this.fundGroupType = result.data.body
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        // 当为三方的时候-下拉框级联
        changeAccept: function (fundgroupType) {
            var _this = this;
            if (fundgroupType == "04") {
                this.acceptMode ="6";
            } else {
                this.acceptMode ="2";
            }
            if (fundgroupType == "04") {
                this.cooPreationMode = "2";
                _this.isCode = true;
            }
            if (fundgroupType != "04") {
                _this.isCode = false;
                this.cooPreationMode = "";
            }
            // 当组合类型为养老组合-获取适合年龄段信息
            if (fundgroupType == "02") {
                _this.agerangeList()
            }
        },
        changeBranch: function (cooPreationMode) {
            var _this = this;
            if (cooPreationMode == "2") {
                this.branchCode = "";
            }
            if (cooPreationMode != "2") {
                _this.isCode = true;
            }
        },

        // 适合年龄段
        agerangeList: function () {
            var _this = this;
            $.post({
                url: '/investmentMgmt/investmentStrategy/combinationProductHandle/ageRangeList.ajax',
                data: {
                    pmst: "SYSTEM",
                    pmkey: "GROUP_AGERANGE"
                },
                success: function (result) {
                    if (result.error === 0) {
                        _this.ageRangeList = result.data.body
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        // 获取风险类型
        groupTypeList: function () {
            var _this = this
            $.post({
                url: '/investmentMgmt/investmentStrategy/combinationProductHandle/grouptypeList.ajax',
                data: {
                    pmst: "SYSTEM",
                    pmkey: "GROUPRISKTYPE"
                },
                success: function (result) {
                    if (result.error === 0) {
                        _this.grouptypeList = result.data.body
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            })
        },
        // 获取风险等级
        riskLevelList: function () {
            var _this = this
            $.post({
                url: '/investmentMgmt/investmentStrategy/combinationProductHandle/risklevelList.ajax',
                data: {
                    pmst: "SYSTEM",
                    pmkey: "GROUPRISKLEVEL"
                },
                success: function (result) {
                    if (result.error === 0) {
                        _this.risklevelList = result.data.body
                    } else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            })
        },
        //点击交易状态,当为暂停交易
        showTimes: function (stopStatus) {
            var _this = this;
            if (stopStatus != 0) {
                this.isTime = true;
            } else {
                this.isTime = false;
            }
        },

        // // 修改添加调仓基金
        // showAddFund: function () {
        //     var _this = this;
        //     var fundDetails = this.fundListAll.map(function (item) {
        //         return {
        //             fundId: item.fundId,
        //             fundPercent: item.fundPercent,
        //             fundApkind: item.fundApkind,
        //             optionalFundList: item.optionalFundList,
        //             isUnderlyingCurrency:item.isUnderlyingCurrency
        //         };
        //     });
        //     if (_this.fundList.length === 0) {
        //         $.post({

        //             url: '/investmentMgmt/investmentStrategy/combinationProductHandle/fundList.ajax',
        //             success: function (result) {
        //                 if (result.error === 0) {
        //                     // _this.fundList = result.data.body;
        //                     _this.fundList = result.data.body;
        //                     // _this.fundAllIdList(_this.fundList);
        //                     _this.setListCheckStatus(fundDetails, _this.fundList);
        //                     _this.showDialog('revise', 'addFund', false);
        //                 }
        //                 else {
        //                     _this.fundList = [];
        //                     _this.showDialog('revise', 'addFund', true, result.msg);

        //                 }
        //             }
        //         });
        //     } else {
        //         _this.setListCheckStatus(fundDetails, _this.fundList);
        //         _this.showDialog('revise', 'addFund', false);
        //     }
        //     if (this.fundListAll == null) {
        //         return
        //     } else {
        //         this.fundListAll.forEach(function (item) {
        //             for (var i = 0; i < _this.fundList.length; i++) {
        //                 if (item.fundId === _this.fundList[i].fundId) {
        //                     _this.fundList[i].check = true;
        //                     break;
        //                 }
        //             }
        //         });
        //     }
        // },
        setListCheckStatus: function (fundDetails, list) {
            list.forEach(function (item) {
                item.fundPercent = '',
                    item.check = false;
            });
            fundDetails.forEach(function (item) {
                for (var i = 0; i < list.length; i++) {
                    if (item.fundId === list[i].fundId) {
                        list[i].check = true;
                        list[i].fundPercent = item.fundPercent;
                        list[i].fundApkind = item.fundApkind;
                        list[i].optionalFundList = item.optionalFundList;
                        isUnderlyingCurrency:item.isUnderlyingCurrency;
                        break;
                    }
                }
            });
            if (this.fundListAll == null) {
                return
            } else {
                this.fundListAll.forEach(function (item) {
                    for (var i = 0; i < list.length; i++) {
                        if (item.fundId === list[i].fundId) {
                            list[i].check = true;
                            break;
                        }
                    }
                });
            }
        },
        // 提交
        checkList: function () {
            var _this = this;
            this.fundListAll = this.fundList.filter(function (item) {
                return item.check;
            }).map(function (item) {
                return {
                    fundId: item.fundId,
                    fundName: item.fundName,
                    fundApkind: item.fundApkind || item.fundTypeForFundgroup,
                    fundPercent: item.fundPercent,
                    optionalFundList: item.optionalFundList,
                    isUnderlyingCurrency:item.isUnderlyingCurrency
                };
            });
            if (this.fundListAll.length === 0) {
                this.showDialog('addFund', 'info', true, '未选择任何数据');
                return;
            }

            this.size = this.fundListAll.length;
            this.showDialog('addFund', 'revise', false);
        },
        // 删除添加的基金数据
        delList: function (index) {
            this.fundListAll.splice(index, 1)
            this.size--;
        },
        // 历史调仓添加调仓基金
        addFundHistory: function () {
            var _this = this;
            _this.fundHistoryList=[];
            var fundDetails = this.fundHistory.map(function (item) {
                return {
                    fundId: item.fundId,
                    fundName: item.fundName,
                    fundPercent: item.fundPercent,
                    optionalFundList: item.optionalFundList,
                    source:item.source,
                    channelList:item.channelList,
                    isUnderlyingCurrency:item.isUnderlyingCurrency
                };
            });
            if (_this.fundHistoryList.length === 0) {
                $.post({
                    url: '/investmentMgmt/investmentStrategy/combinationProductHandle/fundList.ajax',
                    data:{groupId:this.groupid},
                    success: function (result) {
                        if (result.error === 0) {
                            // if(_this.isInvestment=="N"){
                            //     _this.fundHistoryList = result.data.body.filter(function(item){
                            //         return item.source !== '2'
                            //     });
                            // }else{
                            // }
                            _this.fundHistoryList = result.data.body
                            _this.historyListCheckStatus(fundDetails, _this.fundHistoryList);
                            _this.showDialog('add', 'addFundHistory', false);
                            // _this.fundAllIdList(_this.fundHistoryList);
                        } else {
                            _this.fundHistoryList = [];
                            _this.showDialog('add', 'addFundHistory', true, result.msg);

                        }
                    }
                });
            } else {
                _this.historyListCheckStatus(fundDetails, _this.fundHistoryList);
                _this.showDialog('add', 'addFundHistory', false);
            }
            if (this.fundHistory == null) {
                return
            } else {
                this.fundHistory.forEach(function (item) {
                    for (var i = 0; i < _this.fundHistoryList.length; i++) {
                        if (item.fundId === _this.fundHistoryList[i].fundId) {
                            _this.fundHistoryList[i].check = true;
                            break;
                        }
                    }
                });
            }
        },
        historyListCheckStatus: function (fundDetails, list) {
            list.forEach(function (item) {
                item.fundPercent = '',
                    item.check = false;
            });
            fundDetails.forEach(function (item) {
                for (var i = 0; i < list.length; i++) {
                    if (item.fundId === list[i].fundId) {
                        list[i].check = true;
                        list[i].fundPercent = item.fundPercent;
                        break;
                    }
                }
            });
            if (this.fundHistory == null) {
                return
            } else {
                this.fundHistory.forEach(function (item) {
                    for (var i = 0; i < list.length; i++) {
                        if (item.fundId === list[i].fundId) {
                            list[i].check = true;
                            break;
                        }
                    }
                });
            }
        },
        // 提交
        checkList2: function () {
            var _this = this;
            var hasfundHistory=this.fundHistory;
            this.fundHistory = this.fundHistoryList.filter(function (item) {
                return item.check;
            }).map(function (item) {
                return {
                    fundId: item.fundId,
                    fundName: item.fundName,
                    fundApkind: item.fundApkind || item.fundTypeForFundgroup,
                    fundPercent: item.fundPercent,
                    optionalFundList: item.optionalFundList,
                    source:item.source,
                    channelList:item.channelList,
                    isUnderlyingCurrency:'N'
                };
            });
            if(hasfundHistory.length>0){
                this.fundHistory.forEach(function(item){
                    hasfundHistory.forEach(function(citem){
                        if(item.fundId == citem.fundId){
                            item.isUnderlyingCurrency = citem.isUnderlyingCurrency
                        }
                    })
                })
            }
            if (this.fundHistory.length === 0) {
                this.showDialog('addFundHistory', 'info', true, '未选择任何数据');
                return;
            }
            this.size2 = this.fundHistory.length;
            this.showDialog('addFundHistory', 'add', false);
        },
        // 删除添加的基金数据
        delList2: function (index) {
            this.fundHistory.splice(index, 1)
            this.size2--;
        },
        // 取消添加基金回到添加组合弹窗
        cancelAdd2:function(){
            var _this = this;
            _this.showDialog('addFundHistory', 'add');
        },

        // 添加历史调仓-多个历史调仓
        addAdjustment: function () {
            var _this = this;
            this.muchSize = 0;
            this.htmlList.push({
                changeAdvises: "",
                strChangetimes: "",
                isDisplays: '1',
                list: [],
                strCreattime: moment(new Date().getTime()).format("YYYYMMDDHHmmss") //调仓点击一下增加一个鼠标操作时间，隐藏式的
            });
        },

        // 多个历史调仓按钮的添加
        muchFundHistory: function (index) {
            var _this = this;
            this.muchFundHistoryIndex = index;
            _this.muchFundHistoryList=[];
            var fundDetails = this.htmlList[index].list.map(function (item) {
                return {
                    fundId: item.fundId,
                    fundName: item.fundName,
                    fundPercent: item.fundPercent,
                    optionalFundList: [],
                    source:item.source,
                    channelList:item.channelList,
                    isUnderlyingCurrency:item.isUnderlyingCurrency
                };
            });
            if (_this.muchFundHistoryList.length === 0) {
                $.post({
                    url: '/investmentMgmt/investmentStrategy/combinationProductHandle/fundList.ajax',
                    data:{groupId:this.groupid},
                    success: function (result) {
                        if (result.error === 0) {
                            // if(_this.isInvestment=="Y"){
                            //     _this.muchFundHistoryList = result.data.body.filter(function(item){
                            //         return item.source !== '2'
                            //     });
                            // }else{
                            // }
                            _this.muchFundHistoryList = result.data.body
                            // _this.fundAllIdList(_this.muchFundHistoryList);
                            _this.muchFundHistoryList.forEach(function (item) {
                                item.numIndex = index;
                            })

                            _this.historyListCheckStatus2(fundDetails, _this.muchFundHistoryList);

                            _this.showDialog('add', 'muchFundHistory', false);
                        } else {
                            _this.muchFundHistoryList = [];
                            _this.showDialog('add', 'muchFundHistory', true, result.msg);
                        }
                    }
                })
            } else {
                _this.historyListCheckStatus2(fundDetails, _this.muchFundHistoryList);
                _this.showDialog('add', 'muchFundHistory', false);
            }
            if (this.htmlList[index].list == null) {
                return
            } else {
                this.htmlList[index].list.forEach(function (item) {
                    for (var i = 0; i < _this.muchFundHistoryList.length; i++) {
                        if (item.fundId === _this.muchFundHistoryList.fundId) {
                            _this.muchFundHistoryList.check = true;
                            break;
                        }
                    }
                });
            }
        },
        historyListCheckStatus2: function (fundDetails, list, index) {
            list.forEach(function (item) {
                item.fundPercent = '',
                    item.check = false;
            });
            fundDetails.forEach(function (item) {
                for (var i = 0; i < list.length; i++) {
                    if (item.fundId === list[i].fundId) {
                        list[i].check = true;
                        list[i].fundPercent = item.fundPercent;
                        break;
                    }
                }
            });
            if (this.htmlList.list == null) {
                return
            } else {
                this.htmlList.list.forEach(function (item) {
                    for (var i = 0; i < list.length; i++) {
                        if (item.fundId === list[i].fundId) {
                            list[i].check = true;
                            break;
                        }
                    }
                });
            }
        },
        // 提交
        muchCheckList: function () {
            var _this = this;
            var arrList = []
            arrList = _this.muchFundHistoryList.filter(function (item) {
                return item.check;
            }).map(function (item) {
                return {
                    fundId: item.fundId,
                    fundName: item.fundName,
                    fundApkind: item.fundApkind || item.fundTypeForFundgroup,
                    fundPercent: item.fundPercent,
                    optionalFundList: item.optionalFundList || [],
                    numIndex: item.numIndex,
                    source:item.source,
                    channelList:item.channelList,
                    isUnderlyingCurrency:item.isUnderlyingCurrency
                };
            });
            if (arrList.length === 0) {
                this.showDialog('muchFundHistory', 'info', true, '未选择任何数据');
                return;
            }
            this.htmlList[this.muchFundHistoryIndex].list = arrList
            // this.ArrList.push({
            //     list:[],
            // });
            // this.ArrList[this.muchFundHistoryIndex].list=arrList;
            // _this.htmlFundList=arrList;
            // console.log("===",this.htmlFundList)
            // this.muchSize =this.htmlList[this.muchFundHistoryIndex].list.length;
            this.showDialog('muchFundHistory', 'add', false);
        },

        // 取消添加基金回到添加组合弹窗
        cancelAdd3:function(){
            var _this = this;
            _this.showDialog('muchFundHistory', 'add');
        },

        // 删除添加的基金数据
        muchDelList: function (indexs, index) {
            this.htmlList[index].list.splice(indexs, 1)

            // this.muchSize--;
            // this.muchHistoryList = [];
        },
        // 添加按钮-调仓时间
        historyTime: function (data) {
            $('.date-timepicker').datetimepicker({
                format: 'YYYY-MM-DD HH:mm:ss',
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
        // 重置所有调仓按钮
        deleHtmlAll: function () {
            // $(".addHtml").empty()
            var _this = this;
            this.htmlList.splice(this.htmlList);
            this.muchHistoryList = [];
            this.muchSize = '0';

        },

        // 删除某个历史调仓元素按钮
        deleHtmlList: function (index) {
            var _this = this;
            // $(".deleHtml").on("click", function() {
            //     $(this).parents(".textHtml").empty();
            // })
            this.htmlList.splice(index, 1);
            this.muchHistoryList = [];
            this.muchSize = '0';
        },

        // 新增必填弹框
        diaInfoCheck: function () {
            var _this = this;
            if (!this.fundgroupType) {
                this.showDialog('add', 'info', true, '组合类型不能为空');
                return false;
            }
            // 组合ID验证
            if (!this.groupid) {
                this.showDialog('add', 'info', true, '组合ID不能为空');
                return false;
            }
            if (!/(^A[0-9]{4})$/.test(this.groupid)) {
                this.showDialog('add', 'info', true, '组合ID格式错误，应为以A开头的5位数字');
                return false;
            }
            if (_this.allId .indexOf(_this.groupid)> -1) {
                _this.showDialog('add', 'info', true, '业务数据已有该组合ID,不能重复添加!');
                return false
            }

            // if(!/^[A][0-9]{4}$/.test(this.groupid)){
            //     this.showDialog('add', 'info', true, '组合ID格式错误,以A开头的5位数');
            //     return false;
            // }
            // if (this.groupid.length<5) {
            //     this.showDialog('add', 'info', true, '组合ID格式错误');
            //     return false;
            // }

            if (!this.groupname) {
                this.showDialog('add', 'info', true, '组合名称不能为空');
                return false;
            }
            var text = $("#groupname").val();
            //中文字数统计
            str = (text.replace(/\w/g,"")).length;
            //非汉字的个数
            abcnum = text.length-str;
            total = str+abcnum;
            if(total >50){
                _this.showDialog('add', 'info', true, '您输入的名称已超50个字符!');
                return false
            }
			if (!this.strategyMode) {
                this.showDialog('add', 'info', true, '策略运作模式为必选');
                return false;
            }
            if (!this.fundgroupDesc) {
                this.showDialog('add', 'info', true, '组合配置理念不为空');
                return false;
            }
            if (!this.investmentServicePerc) {
                this.showDialog('add', 'info', true, '投顾服务费率不能为空');
                return false;
            }
            var text1= $("#fundgroupDesc").val();
            //中文字数统计
            str1 = (text1.replace(/\w/g,"")).length;
            //非汉字的个数
            abcnum1 = text1.length-str1;
            total1 = str1+abcnum1;
            if(total1 >600){
                _this.showDialog('add', 'info', true, '您输入的配置理念字数已超600个字符!');
                return false
            }


            // if(this.fundgroupAdvise!=""){
            //     var text2 = $("#fundgroupAdvise").val();
            //     //中文字数统计
            //     str2= (text2.replace(/\w/g,"")).length;
            //     //非汉字的个数
            //     abcnum2 = text2.length-str2;
            //     total2 = str2+abcnum2;
            //     if(total2 >50){
            //         _this.showDialog('add', 'info', true, '您输入的投资建议字数已超600个字符!');
            //         return false
            //     }
            // }
            // 验证收益率格式
            // if (this.sofarYield!="") {
            //     if (isNaN(Number(this.sofarYield)) || !/((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/.test(this.sofarYield)) {
            //         this.showDialog('add', 'info', true, '历史年收益率填写格式有误');
            //         return false;
            //     }
            // }
            // if (!$("#onlinedate").val()) {
            //     this.showDialog('add', 'info', true, '成立时间不能为空');
            //     return false;
            // }
            if (this.fundgroupType == "02") {
                if (!this.ageRange) {
                    this.showDialog('add', 'info', true, '年龄段不能为空');
                    return false;
                }
            }

            // if (!this.acceptMode) {
            //     this.showDialog('add', 'info', true, '开放渠道不能为空');
            //     return false;
            // }
            // if (!this.stopStatus) {
            //     this.showDialog('add', 'info', true, '交易状态不能为空');
            //     return false;
            // }
            // if (this.acceptMode.length <= 0) {
            //     this.showDialog('add', 'info', true, '请先选择开放渠道');
            //     return false;
            // }
            // var disTime=$("#displayDate").val().replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1$2$3')
            // var nowTime=moment(new Date().getTime()).format("YYYYMMDDHH")
            // if (disTime!=""&&disTime<nowTime) {
            //     this.showDialog('add', 'info', true, '组合上架日不能为过去时间');
            //     return false;
            // }

            // if (this.stopStatus != "0") {
            //     if (!$("#stopStartTime").val() && !$("#stopEndTime").val()) {
            //         this.showDialog('add', 'info', true, '暂停起止时间不能为空');
            //         return false;
            //     }
            // }
            // if (!this.grouptype) {
            //     this.showDialog('add', 'info', true, '风险类型不能为空');
            //     return false;
            // }
            // if (!this.risklevel) { // 风险等级不能为空
            //     this.showDialog('add', 'info', true, '风险等级不能为空');
            //     return false;
            // }
            //  // 验证起投金额
            if (isNaN(Number(this.initamount) || this.initamount === '') || !/((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/.test(this.initamount)) {
                this.showDialog('add', 'info', true, '请输入起投金额或者填写格式有误！');
                return false;
            }
            // if (isNaN(Number(this.commro) || this.commro === '') || !/((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/.test(this.commro)||Number(this.commro)>=10) {
            //     this.showDialog('add', 'info', true, '费率折扣填写格式有误且不能大于等于10%');
            //     return false;
            // }
            // if (isNaN(Number(this.minRedeemAmount) || this.minRedeemAmount === '') || !/((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/.test(this.minRedeemAmount)) {
            //     this.showDialog('add', 'info', true, '请输入最低赎回金额或者填写格式有误！');
            //     return false;
            // }
            // if (isNaN(Number(this.minChangeAmount) || this.minChangeAmount === '') || !/((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/.test(this.minChangeAmount)) {
            //     this.showDialog('add', 'info', true, '请输入最低调仓金额或者填写格式有误！');
            //     return false;
            // }
            // if (isNaN(Number(this.minReserveAmount) || this.minReserveAmount === '') || !/((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/.test(this.minReserveAmount)) {
            //     this.showDialog('add', 'info', true, '请输入最低持有金额或者填写格式有误！');
            //     return false;
            // }
            if (!this.investRiskLevel) { // 投顾组合风险等级不能为空
                this.showDialog('add', 'info', true, '投顾风险等级不能为空');
                return false;
            }
            // if(this.investType=='G'&&!this.investCustomers){
            //         this.showDialog('add', 'info', true, '投顾组合客户不能为空');
            //         return false;
            //     }
                if(this.investType=='G'&&!this.investPrincipal){
                    this.showDialog('add', 'info', true, '名义本金不能为空');
                    return false;
                }
            //     if(this.investType=='G'&&!this.investDuration){
            //         this.showDialog('add', 'info', true, '投资时长不能为空');
            //         return false;
            //     }
                if(this.status=='N'){
                    if (!this.categoryDescDoc) {
                        this.showDialog('add', 'info', true, '请上传策略说明书');
                        return false;
                    }
                    if (!this.riskDescDoc) {
                        this.showDialog('add', 'info', true, '请上传风险揭示书');
                        return false;
                    }
                    if (!this.investDescDoc) {
                        this.showDialog('add', 'info', true, '请上传投顾协议');
                        return false;
                    }
                }
                if (!this.categoryDescDisplay) {
                    this.showDialog('add', 'info', true, '策略说明书文案不能为空');
                    return false;
                }
                if (!this.riskDescDisplay) {
                    this.showDialog('add', 'info', true, '风险揭示书文案不能为空');
                    return false;
                }
                if (!this.investDescDisplay) {
                    this.showDialog('add', 'info', true, '投顾协议文案不能为空');
                    return false;
                }
            if(this.isInvestment === 'Y'){
                // if (isNaN(Number(this.rightLimit) || this.rightLimit === '') || !/((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/.test(this.rightLimit)) {
                //     this.showDialog('add', 'info', true, '权益类基金定义填写格式有误!');
                //     return false;
                // }
                // if (isNaN(Number(this.largeRedemptionPercent) || this.largeRedemptionPercent === '') || !/((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/.test(this.largeRedemptionPercent)) {
                //     this.showDialog('add', 'info', true, '大额赎回在全平台的比例填写格式有误!');
                //     return false;
                // }
                // 20210616无须必填
                // if (isNaN(Number(this.rightMaxratePerc) || this.rightMaxratePerc === '') || !/((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/.test(this.rightMaxratePerc)) {
                //     this.showDialog('add', 'info', true, '权益类基金占比填写格式有误!');
                //     return false;
                // }
                // if (isNaN(Number(this.turnoverRatePerc) || this.turnoverRatePerc === '') || !/((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/.test(this.turnoverRatePerc)) {
                //     this.showDialog('add', 'info', true, '账户换手率填写格式有误!');
                //     return false;
                // }
                // if (isNaN(Number(this.singlevalueCustmaxPerc) || this.singlevalueCustmaxPerc === '') || !/((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/.test(this.singlevalueCustmaxPerc)) {
                //     this.showDialog('add', 'info', true, '单只基金市值不得超过客户账户资产净值填写格式有误!');
                //     return false;
                // }
                // if (isNaN(Number(this.categoryunitGroupmaxPerc) || this.categoryunitGroupmaxPerc === '') || !/((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/.test(this.categoryunitGroupmaxPerc)) {
                //     this.showDialog('add', 'info', true, '同策略持有基金份额不得超过该基金总份额占比填写格式有误!');
                //     return false;
                // }
                // if (isNaN(Number(this.singleunitGroupmaxPerc) || this.singleunitGroupmaxPerc === '') || !/((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/.test(this.singleunitGroupmaxPerc)) {
                //     this.showDialog('add', 'info', true, '持有单只指数基金的份额总和不得超过该基金总份额的填写格式有误!');
                //     return false;
                // }
                
            }
            if (_this.fundHistory.length <1) {
                this.showDialog('add', 'info', true, '当前调仓：请为组合添加基金');
                return false;
            }
            var Percentage = 0;
            for (var i = 0; i < _this.fundHistory.length; i++) {
                if (_this.fundHistory[i].fundPercent=="") {
                    this.showDialog('add', 'info', true, '调整仓位不能为空');
                    return false;
                }
                Percentage += _this.fundHistory[i].fundPercent*10000;
            }
            if (Percentage != "") {
                if (Percentage/10000!= 100) {
                    this.showDialog('add', 'info', true, '调整仓位总和不等于100%');
                    return false;
                }
            }


            // 验证所有添加调仓时间的值比上一个要大
            // var _this=this;
            // var changeTime = $(".change");
            // var arrTime = [];
            // var stringEstablishDate = this.$refs.stringEstablishDate.value;
            // var time2 = stringEstablishDate.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1$2$3');
            // var changetimeFirst = Number(time2 + '000000') //第一个成立调仓时间
            // arrTime.push(changetimeFirst)
            // for (var i = 0; i < changeTime.length; i++) {
            //     arrTime.push(Number(changeTime.eq(i).val().replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1$2$3000000')))
            // }
            // console.log("arrTime", arrTime)
            //
            // arrTime.sort(function (a, b) {
            //     console.log(a - b)
            //     if (a - b < 0) {
            //         return _this.showDialog('add', 'info', true, '后面的调仓时间不能小于前面');
            //         // return false;
            //     }
            // })
            return true;
        },

        // 保存添加数据按钮
        saveParam: function () {
            var _this = this;
            if (this.diaInfoCheck()) {
                var params = {};
                var testBody = "";
                params.type = this.type;//状态参数
                // params.id = this.ruleId;

                // 组合ID验证
                var groupid = this.groupid;      //组合Id  A+四位数字

                // 20220105放开，需求号9665，成立调仓时间可以选择过去的时间点 S
                // // 成立调仓时间要和成立时间一致验证
                // // moment(this.$refs.onlinedates.value).format("YYYYMMDDHHmmss")
                // var onlinedate = this.$refs.onlinedate.value;
                // var time1 = onlinedate.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1$2$3');
                var stringEstablishDate = this.$refs.stringEstablishDate.value;
                // var time2 = stringEstablishDate.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1$2$3');
                // if (time1 != time2) {
                //     this.showDialog('add', 'info', true, '成立调仓时间要和成立时间一致');
                //     return false;
                // }
                this.$refs.onlinedate.value = this.$refs.stringEstablishDate.value;
                // 20220105放开，需求号9665，成立调仓时间可以选择过去的时间点 E

                var cooPreationMode = ""; //合作模式变量
                var branchCodes = ""     //网点变量
                if (this.fundgroupType == "04") {
                    cooPreationMode = this.cooPreationMode;       //合作模式;
                } else {
                    cooPreationMode = "";
                }
                if (this.fundgroupType != "04") {
                    branchCodes = "247";
                }else{
                    if (cooPreationMode == "2" || cooPreationMode == "") {
                        // branchCodes = "247";
                        branchCodes += this.branchCode;        //2021-05-12新需求
                    } else {
                        branchCodes += this.branchCode;       //网点
                    }
                }
                if(branchCodes==""){
                    this.showDialog('add', 'info', true, '请选择网点号');
                    return false;
                }

                var onlinedate = this.$refs.onlinedate.value;
                params.onlinedate = onlinedate.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1$2$3');
                // var displayDate = this.$refs.displayDate.value;
                // 成立调仓时间
                // params.onlinedate=time2;
                // var onlinetime = moment(this.$refs.onlinedate.value).format("HHmmss");
                var stopStartTime = this.$refs.stopStartTime&&this.$refs.stopStartTime.value?this.$refs.stopStartTime.value:'';
                // params.stopStartTime = stopStartTime.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1$2$3000000');
                var stopEndTime = this.$refs.stopEndTime&&this.$refs.stopEndTime.value?this.$refs.stopEndTime.value:'';
                // params.stopEndTime = stopEndTime.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1$2$3000000');

                // 组合成分的参数
                params.grouptype = this.grouptype;

                var fundgroupChangeDetailList = [];     //基金信息
                var rightPercent = 0                 //权益类占比
                var fixPercent = 0            //固收类占比
                var vaPercent = 0           //货币类占比
                var otherPercent = 0;      //其它占比
                // 第一个调仓基金列表信息-第一个基金产品列表信息

                // if(_this.isInvestment=="N"){
                //     var filterSelectArr = this.fundHistory.filter(function (item) {
                //         return item.source == 2;
                //     });
                //     if(filterSelectArr.length > 0){
                //         this.showDialog('add', 'info', true, '新增调仓基金池中的' + filterSelectArr.map(function(item){return item.fundId}).join(',') + '为外部基金，只有投顾组合类型才可选择');
                //         return false;
                //     }
                // }
                for (var i = 0; i < this.fundHistory.length; i++) {
                    fundgroupChangeDetailList.push({
                        groupid: groupid,
                        fundid: this.fundHistory[i].fundId,
                        fundName: this.fundHistory[i].fundName,
                        fundApkind: this.fundHistory[i].fundApkind,  //产品类型
                        fundPercent: this.fundHistory[i].fundPercent,           //调整仓位
                        optionalFundList: this.fundHistory[i].optionalFundList ,          //备选基金
                        isUnderlyingCurrency:this.fundHistory[i].isUnderlyingCurrency
                    })
                }
                // 给基金占比赋值
                for (var x in this.fundHistory) {
                    if (this.fundHistory[x].fundApkind === 'R') {
                        rightPercent += Number(this.fundHistory[x].fundPercent)
                        if (this.fundHistory[x].fundPercent == "") {
                            rightPercent = 0
                        }
                    }
                    if (this.fundHistory[x].fundApkind === 'F') {
                        fixPercent += Number(this.fundHistory[x].fundPercent)
                        if (this.fundHistory[x].fundPercent == "") {
                            fixPercent = 0
                        }
                    }
                    if (this.fundHistory[x].fundApkind === 'V') {
                        vaPercent += Number(this.fundHistory[x].fundPercent)
                        if (this.fundHistory[x].fundPercent == "") {
                            vaPercent = 0
                        }
                    }
                    if (this.fundHistory[x].fundApkind === 'O') {
                        otherPercent += Number(this.fundHistory[x].fundPercent)
                        if (this.fundHistory[x].fundPercent == "") {
                            otherPercent = 0
                        }
                    }
                }
                var fundgroupChangeDO = {
                    changeAdvise: this.changeAdvise,       //组合调仓说明（属于历史调仓里）
                    fundgroupType: this.fundgroupType,    //组合类型
                    groupid: groupid,          //组合ID
                    groupname: this.groupname,        //组合名称
                    grouptype: this.grouptype,        //组合风险类型已用(属组合成分里)
                    isDisplay: this.isDisplay,    //新增字段-其他默认展示，用户可以选择不展示，前端页面控制展示“是”和“否”选择，后台传入“1“或“0“
                    strChangetime: stringEstablishDate.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1$2$3$4$5$6'),//调仓时间
                    strCreattime: moment(new Date().getTime()).format("YYYYMMDDHHmmss"),  //鼠标点击添加调仓按钮的操作时间(YYYYMMDDHHmmss)（隐藏式的）后面时间要大于前面时间  否者删除重新添加。
                }
                var fundgroupChangeROList = []
                fundgroupChangeROList.push({
                    fundgroupChangeDO,
                    fundgroupChangeDetailList,
                })


                //2. 按钮添加历史调仓模板有数据，模板里面插入多个基金信息
                if (this.htmlList.length > 0) {
                    var fundgroupChangeDetailList = [];
                    var fundgroupChangeDO;
                    var changeTime = $(".change");
                    var dataArr = [];

                    var itemFundList=[]
                    this.htmlList.forEach(function(itemList){
                        itemFundList=itemList.list
                    })

                    if (itemFundList.length <1) {
                        this.showDialog('add', 'info', true, '当前调仓：请为当前组合添加基金');
                        return false;
                    }
                    var Percentage = 0;
                    for (var i = 0; i < itemFundList.length; i++) {
                        Percentage +=itemFundList[i].fundPercent*10000;
                    }
                    if (Percentage != "") {
                        if (Percentage/10000!= 100) {
                            this.showDialog('add', 'info', true, '调整仓位总和不等于100%');
                            return false;
                        }
                    }

                    // if(_this.isInvestment=="N"){
                    //     var filterSelectArr =itemFundList.filter(function (item) {
                    //         return item.source == 2;
                    //     });
                    //     if(filterSelectArr.length > 0){
                    //         this.showDialog('add', 'info', true, '新增调仓基金池中的' + filterSelectArr.map(function(item){return item.fundId}).join(',') + '为外部基金，只有投顾组合类型才可选择');
                    //         return false;
                    //     }
                    // }

                    // for (var i = 0; i < changeTime.length; i++) {
                    //     fundgroupChangeDO = {
                    //         changeAdvise:this.changeAdvises[i],//组合调仓说明（属于历史调仓里）
                    //         fundgroupType: this.fundgroupType,    //组合类型
                    //         groupid: groupid,          //组合ID
                    //         groupname: this.groupname,        //组合名称
                    //         grouptype: this.grouptype,        //组合风险类型已用(属组合成分里)
                    //         isDisplay: "",    //新增字段-其他默认展示，用户可以选择不展示，前端页面控制展示“是”和“否”选择，后台传入“1“或“0“
                    //         strChangetime: changeTime.eq(i).val().replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1$2$3$4$5$6'),//调仓时间
                    //         strCreattime: moment(new Date().getTime()).format("YYYYMMDDHHmmss"),  //鼠标点击添加调仓按钮的操作时间(YYYYMMDDHHmmss)（隐藏式的）后面时间要大于前面时间  否者删除重新添加。
                    //     }
                    // }

                    // for (var i = 0; i < this.htmlList.length; i++) {
                    //     for (var j = 0; j < this.htmlList[i].list.length; j++) {
                    //         fundgroupChangeDetailList.push({
                    //             groupid: groupid,
                    //             fundId: this.htmlList[i].list[j].fundId,
                    //             fundApkind: this.htmlList[i].list[j].fundTypeForFundgroup,  //产品类型
                    //             fundPercent: this.htmlList[i].list[j].fundPercent           //调整仓位
                    //         })
                    //     }
                    // }

                    // var strChangetimes = $(".strChangetimes").val()
                    // console.log("strChangetimes",strChangetimes)
                    var ArrTimes = $('.strChangetimes'); // 获取所有文本框

                    for (var i = 0; i < this.htmlList.length; i++) {
                        var arr = [];
                        for (var j = 0; j < this.htmlList[i].list.length; j++) {
                            arr.push({
                                groupid: groupid,
                                fundid: this.htmlList[i].list[j].fundId,
                                fundName: this.htmlList[i].list[j].fundName,
                                fundApkind: this.htmlList[i].list[j].fundApkind,  //产品类型
                                fundPercent: this.htmlList[i].list[j].fundPercent,           //调整仓位
                                optionalFundList: this.htmlList[i].list[j].optionalFundList || [] ,          //备选基金
                                isUnderlyingCurrency:this.htmlList[i].list[j].isUnderlyingCurrency
                            })
                        }
                        fundgroupChangeDetailList.push(arr)
                    }

                    var itemFundList2=[]
                    for(var i=0;i<fundgroupChangeDetailList.length;i++){
                        for(var j=0;j<_this.htmlList[i].list.length;j++){
                            itemFundList2.push(_this.htmlList[i].list[j]);
                        }
                    }
                    //  这里是验证基金池中是不是外部基金
                    // if(_this.isInvestment=="N"){
                    //     var filterSelectArr2 =itemFundList2.filter(function (item) {
                    //         return item.source == 2;
                    //     });
                    //     if(filterSelectArr2.length > 0){
                    //         this.showDialog('add', 'info', true, '新增调仓基金池中的' + filterSelectArr2.map(function(item){return item.fundId}).join(',') + '为外部基金，只有投顾组合类型才可选择');
                    //         return false;
                    //     }
                    // }
                    //
                    for (var i = 0; i < this.htmlList.length; i++) {
                        fundgroupChangeROList.push({
                            fundgroupChangeDO: {
                                changeAdvise: this.htmlList[i].changeAdvises,//组合调仓说明（属于历史调仓里）
                                fundgroupType: this.fundgroupType,    //组合类型
                                groupid: groupid,          //组合ID
                                groupname: this.groupname,        //组合名称
                                grouptype: this.grouptype,        //组合风险类型已用(属组合成分里)
                                isDisplay: this.htmlList[i].isDisplays,    //新增字段-其他默认展示，用户可以选择不展示，前端页面控制展示“是”和“否”选择，后台传入“1“或“0“
                                strChangetime: moment(ArrTimes.eq(i).val()).format("YYYYMMDDHHmmss"),//调仓时间
                                strCreattime: this.htmlList[i].strCreattime  //鼠标点击添加调仓按钮的操作时间(YYYYMMDDHHmmss)（隐藏式的）后面时间要大于前面时间  否者删除重新添加。
                            },
                            fundgroupChangeDetailList: fundgroupChangeDetailList[i]
                        })
                    }

                }


                // 第一个调仓
                params.fundgroupChangeROList = fundgroupChangeROList;
                params.fundgroupNewFundgroupDO = {
                    ageRange: this.ageRange,      //组合年临段已用(属基本信息)
                    commro: this.commro,         //组合费率折扣已用(属组合成分里)
                    // displayDate: displayDate.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1$2$3'),   //用于控制搜索展示，需要前端让营运人员输入
                    fundgroupAdvise: this.fundgroupAdvise,    // 组合智投建议已用(属基本信息)
                    fundgroupDesc: this.fundgroupDesc,     // 组合建议已用(属基本信息)
                    strategyMode: this.strategyMode,     // 策略运作模式（基本信息）
                    targetContract: this.targetContract,     // 目标赢协议（基本信息）
                    fundgroupType: this.fundgroupType,    // 组合类型已用(属基本信息)
                    groupid: groupid,          // 组合ID已用(属基本信息)
                    groupname: this.groupname,       //组合名称已用(属基本信息)
                    grouptype: this.grouptype,       //组合风险类型已用(属组合成分里)
                    initamount: this.initamount,             //组合起投金额已用(属组合成分里)
                    minChangeAmount: this.minChangeAmount,         // 组合最低调仓金额已用(属组合成分里)
                    minRedeemAmount: this.minRedeemAmount,         //组合最低赎回金额已用(属组合成分里)
                    minReserveAmount: this.minReserveAmount,        //组合最低持有金额已用(属组合成分里)
                    rightLimit: this.rightLimit? this.rightLimit : '',        //权益类基金定义(属组合成分里)
                    largeRedemptionPercent: this.largeRedemptionPercent? this.largeRedemptionPercent: '',        //大额赎回在全平台的比例(属组合成分里)
                    // normalPageurl: this.normalPageurl,  //组合小白版宣传页已用(属基本信息)
                    onlinedate: onlinedate.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1$2$3'),    //组合上线日期也就是成立日期----也属于成立日期(YYYYMMDD) 8位
                    onlinetime: moment(this.$refs.onlinedate.value).format("HHmmss"),   //成立日期的时间 (hhmmss)6位
                    proPageurl: this.proPageurl,   //组合专业版宣传页已用(属基本信息)
                    risklevel: this.risklevel,    //组合风险等级已用(属组合成分里)
                    status:this.status,
                    // sofarYield: this.sofarYield,         //组合历史年化收益率已用(属基本信息)
                    stringEstablishDate: onlinedate.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1$2$3'),   //成立调仓日期和成立日期一样，都为YYYYMMDD补上6个000000  默认开始不能选择操作
                    isInvestment:this.isInvestment ,          //新增是否投顾组合
                    fundgroupFeature:this.fundgroupFeature,  //2020.09.28 组合投资特点
                    investmentServicePerc:this.investmentServicePerc,////2020.09.28 投顾服务费率
                    riskControl: this.riskControl,
                    recommendReason:this.recommendReason,
                    recommendHoldTime:this.recommendHoldTime,   //成立日期的时间 (hhmmss)6位

                    rightMaxratePerc:  this.rightMaxratePerc?this.rightMaxratePerc : '',        //权益类基金占比不超过
                    turnoverRatePerc:  this.turnoverRatePerc?this.turnoverRatePerc : '',        //账户换手率
                    singlevalueCustmaxPerc:  this.singlevalueCustmaxPerc?this.singlevalueCustmaxPerc : '', // 单只基金市值不得超过客户账户资产净值
                    categoryunitGroupmaxPerc:  this.categoryunitGroupmaxPerc?this.categoryunitGroupmaxPerc : '',  // 同策略持有基金份额不得超过该基金总份额占比
                    singleunitGroupmaxPerc:  this.singleunitGroupmaxPerc?this.singleunitGroupmaxPerc : '',   // 持有单只指数基金的份额总和不得超过该基金总份额的
                    rightMinratePerc:this.rightMinratePerc?this.rightMinratePerc:'',            //权益类基金占净值比不低于
                    valueMinratePerc:this.valueMinratePerc?this.valueMinratePerc:'',            //债券基金占净值比不低于
                    valueMaxratePerc:this.valueMaxratePerc?this.valueMaxratePerc:'',            //债券基金占净值比不超过
                    isBlacklist:this.isBlacklist?this.isBlacklist:'',                 //是否禁投公司黑名单内基金
                    isTradeLimit:this.isTradeLimit?this.isTradeLimit:'',                 //是否禁投流通受限基金
                    investRiskLevel:  this.investRiskLevel?this.investRiskLevel : '',     //投顾风险等级
                    investType:  this.investType?this.investType : '',       //投顾类型
                    investCustomers:this.investType==='G' ?  this.investCustomers : '',       //投顾组合客户
                    investPrincipal:this.investType==='G' ?  this.investPrincipal : '',       //名义本金
                    investDuration:this.investType==='G' ?  this.investDuration : '',       //投资时长

                    categoryDescDoc: this.categoryDescDoc ? this.categoryDescDoc : '',        //策略说明书
                    riskDescDoc: this.riskDescDoc ? this.riskDescDoc : '',        //风险揭示书
                    investDescDoc: this.investDescDoc ? this.investDescDoc : '',        //投顾协议
                    categoryDescDisplay: this.categoryDescDisplay ? this.categoryDescDisplay : '', //策略说明书文案
                    riskDescDisplay: this.riskDescDisplay ? this.riskDescDisplay : '',        //风险揭示书文案
                    investDescDisplay: this.investDescDisplay ? this.investDescDisplay : '',        //投顾协议文案

                }
                params.fundgroupSubdatetimeRO = {
                    // acceptMode: this.acceptMode.join(),
                    acceptMode: this.acceptMode,
                    branchCode: branchCodes.split(','),
                    cooPreationMode: cooPreationMode,
                    fundgroupType: this.fundgroupType,
                    groupid: groupid,
                    stopEndTime: stopEndTime.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1$2$3$4$5$6'),
                    stopStartTime: stopStartTime.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1$2$3$4$5$6'),
                    stopStatus: this.stopStatus
                }
                params.fundgroupType = this.fundgroupType;
                params.groupname = this.groupname;
                params.groupid = this.groupid;
                params.stringEstablishDate = stringEstablishDate.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1$2$3$4$5$6');
                params.grouptype = this.grouptype;

                params.rightPercent = rightPercent;                //权益类占比
                params.fixPercent = fixPercent;         //固收类占比
                params.vaPercent = vaPercent;        //货币类占比
                params.otherPercent = otherPercent;  //其它
                params.mysqlId = this.mysqlId;

                params.calc_status=true;            //用作区分复核通过还是初始化中

                params.operator = this.operator;
                console.log("---saveParam",params)
                // return;
                $.post({
                    url: '/investmentMgmt/investmentStrategy/combinationProductHandle/saveParam.ajax',
                    data: params,
                    success: function (result) {
                        if (result.error === 0) {
                            _this.getTableData(0, params.type);
                            _this.showDialog('add', 'info', false, result.msg);
                        }
                        else {
                            _this.showDialog('add', 'info', true, result.msg);
                        }
                    }
                });
            }
        },

        // 修改必填弹框
        reviseCheck: function () {
            var _this = this;
            // var disTime=$("#displayDates").val().replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1$2$3')
            // var nowTime=moment(new Date().getTime()).format("YYYYMMDDHH")
            // if (disTime!=""&&disTime<nowTime) {
            //     this.showDialog('revise', 'info', true, '组合上架日不能为过去时间');
            //     return false;
            // }

            // if (isNaN(Number(this.commro) || this.commro === '') || !/((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/.test(this.commro)||Number(this.commro)>=10) {
            //     this.showDialog('revise', 'info', true, '费率折扣填写格式有误且不能大于等于10%');
            //     return false;
            // }

            if (!this.groupname) {
                this.showDialog('revise', 'info', true, '组合名称不能为空');
                return false;
            }
            var text = $("#groupnames").val();
            //中文字数统计
            str = (text.replace(/\w/g,"")).length;
            //非汉字的个数
            abcnum = text.length-str;
            total = str+abcnum;
            if(total >50){
                _this.showDialog('revise', 'info', true, '您输入的名称已超50个字符!');
                return false
            }
            if (!this.fundgroupDesc) {
                this.showDialog('revise', 'info', true, '组合配置理念不为空');
                return false;
            }
			if (!this.strategyMode) {
                this.showDialog('revise', 'info', true, '策略运作模式必选');
                return false;
            }
            if (!this.investmentServicePerc) {
                this.showDialog('revise', 'info', true, '投顾服务费率不能为空');
                return false;
            }
            var text1= $("#fundgroupDescs").val();
            //中文字数统计
            str1 = (text1.replace(/\w/g,"")).length;
            //非汉字的个数
            abcnum1 = text1.length-str1;
            total1 = str1+abcnum1;
            if(total1 >600){
                _this.showDialog('revise', 'info', true, '您输入的配置理念字数已超600个字符!');
                return false
            }


            // if(this.fundgroupAdvise!=""){
            //     var text2 = $("#fundgroupAdvises").val();
            //     //中文字数统计
            //     str2= (text2.replace(/\w/g,"")).length;
            //     //非汉字的个数
            //     abcnum2 = text2.length-str2;
            //     total2 = str2+abcnum2;
            //     if(total2 >600){
            //         _this.showDialog('revise', 'info', true, '您输入的投资建议字数已超600个字符!');
            //         return false
            //     }
            // }
            // var disTime=$("#displayDates").val().replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1$2$3') //上架日时间
            var onlineTime=$("#onlinedates").val().replace(/(\d{4})(\d{2})(\d{2})/g, '$1$2$3')
            var nowTime=moment(new Date().getTime()).format("YYYYMMDDHH")

            if (disTime!=""&&Number(disTime)<Number(nowTime)&&Number(disTime)<Number(onlineTime)) {
                this.showDialog('revise', 'info', true, '组合上架日不能为过去时间');
                return false;
            }

            return true;
        },
        // 业务详情信息
        serviceDetail: function (groupId) {
            var _this = this;
            let params = {}
            params.groupId = groupId;
            params.type = 0;
            $.post({
                url: '/investmentMgmt/investmentStrategy/combinationProductHandle/details.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        // result.data.tableData.forEach(function (item) {
                        //     _this.checkDatils = item.detailList
                        // })
                        result.data.forEach((item) => {
                            _this.checkDatils=item.detailList
                        });
                    }
                    else {
                        _this.tableData = [];
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
            this.showDialog('', 'checkDatils');
        },

        // 点击修改本地数据按钮(修改新增或者是修改业务数据传过来的基本信息）
        localUpdate: function (item) {
            var _this = this;
            // 获取所有基金列表，防止点击编辑备选基金时无法获取基金列表

            this.operate = item.operate;
            _this.fundListAll = []
            // 判断业务接口数据与数据库有没有相同数据
            // if (this.type == 0) {
            //     if (this.arrId.indexOf(item.id.toString()) != -1 && item.status == '0') {
            //         _this.oneId = item.id
            //     } else {
            //         _this.oneId = ''
            //     }
            // }
            // 1.新增的信息
            if (this.operate == "1") {
                this.mysqlId = item.mySQLId  //获取数据库表字段ID

                this.fundgroupType = item.fundgroupType;
                this.groupid = item.groupid;
                this.groupname = item.groupname;
                this.fundgroupDesc = item.fundgroupNewFundgroupDO.fundgroupDesc;
                this.strategyMode = item.fundgroupNewFundgroupDO.strategyMode;
                this.targetContract = item.fundgroupNewFundgroupDO.targetContract;
                this.fundgroupAdvise = item.fundgroupNewFundgroupDO.fundgroupAdvise;
                this.proPageurl = item.fundgroupNewFundgroupDO.proPageurl;
                // this.normalPageurl = item.fundgroupNewFundgroupDO.normalPageurl;
                this.stopStatus = item.fundgroupSubdatetimeRO.stopStatus;
                this.grouptype = item.fundgroupNewFundgroupDO.grouptype;
                this.risklevel = item.fundgroupNewFundgroupDO.risklevel;
                this.ageRange = item.fundgroupNewFundgroupDO.ageRange;
                this.acceptMode = item.fundgroupSubdatetimeRO.acceptMode;
                this.cooPreationMode = item.fundgroupSubdatetimeRO.cooPreationMode;
                //渠道多选条件
                // var acceptMode = [{'value': "0", "name": "柜台"}, {'value': "2", "name": "网上"}, {
                //     'value': "6",
                //     "name": "第三方"
                // }, {'value': "7", "name": "企业版"}]
                // _this.dataSummary(acceptMode, 'value', 'label', 'acceptMode', this.acceptMode);

                // 网点号
                this.branchCode = item.fundgroupSubdatetimeRO.branchCode;
                _this.dataSummary2(_this.branchCodeList, 'value', 'label', 'branchCode',this.branchCode);

                this.initamount = item.fundgroupNewFundgroupDO.initamount;
                // this.sofarYield = item.fundgroupNewFundgroupDO.sofarYield;
                // this.branchCode=item.fundgroupSubdatetimeRO.branchCode[0];
                this.commro = item.fundgroupNewFundgroupDO.commro;
                this.minRedeemAmount = item.fundgroupNewFundgroupDO.minRedeemAmount;
                this.minChangeAmount = item.fundgroupNewFundgroupDO.minChangeAmount;
                this.minReserveAmount = item.fundgroupNewFundgroupDO.minReserveAmount;
                this.rightLimit = item.fundgroupNewFundgroupDO.rightLimit;
                // this.largeRedemptionPercent = item.fundgroupNewFundgroupDO.largeRedemptionPercent;
                this.changeAdvise = item.fundgroupChangeROList[0].fundgroupChangeDO.changeAdvise;
                this.reviseAdvise = item.fundgroupChangeROList[0].fundgroupChangeDO.changeAdvise;
                this.strChangetime = item.fundgroupChangeROList[0].fundgroupChangeDO.strChangetime;
                this.strCreattime = item.fundgroupChangeROList[0].fundgroupChangeDO.strCreattime;
                this.stringEstablishDate = item.stringEstablishDate;
                this.stopStartTime =$("#stopStartTime").val(item.fundgroupSubdatetimeRO.stopStartTime) ;
                this.stopEndTime =$("#stopEndTime").val(item.fundgroupSubdatetimeRO.stopEndTime) ;
                // this.displayDate = item.fundgroupNewFundgroupDO.displayDate;
                this.isDisplay = item.fundgroupChangeROList[0].fundgroupChangeDO.isDisplay;
                this.onlinedate = item.onlinedate;
                var onlinedate = item.onlinedate;
                this.status = item.fundgroupNewFundgroupDO.status;
                // var displayDate = item.fundgroupNewFundgroupDO.displayDate;
                var stringEstablishDate = moment(item.stringEstablishDate).format("YYYY-MM-DD HH:mm:ss");
                $("#onlinedate").val(onlinedate)
                // $("#displayDate").val(displayDate)
                $("#stringEstablishDate").val(stringEstablishDate)
                this.isInvestment = item.fundgroupNewFundgroupDO.isInvestment;
                this.fundgroupFeature=item.fundgroupNewFundgroupDO.fundgroupFeature;  //2020.09.28 组合投资特点
                this.investmentServicePerc=item.fundgroupNewFundgroupDO.investmentServicePerc;////2020.09.28 投顾服务费率
                this.recommendReason=item.fundgroupNewFundgroupDO.recommendReason;
                this.recommendHoldTime=item.fundgroupNewFundgroupDO.recommendHoldTime;

                // this.rightMaxratePerc= item.fundgroupNewFundgroupDO.rightMaxratePerc ? item.fundgroupNewFundgroupDO.rightMaxratePerc : '';        //权益类基金占比不超过
                this.turnoverRatePerc= item.fundgroupNewFundgroupDO.turnoverRatePerc ? item.fundgroupNewFundgroupDO.turnoverRatePerc : '';        //账户换手率
                this.singlevalueCustmaxPerc= item.fundgroupNewFundgroupDO.singlevalueCustmaxPerc ? item.fundgroupNewFundgroupDO.singlevalueCustmaxPerc : ''; // 单只基金市值不得超过客户账户资产净值
                this.categoryunitGroupmaxPerc= item.fundgroupNewFundgroupDO.categoryunitGroupmaxPerc ? item.fundgroupNewFundgroupDO.categoryunitGroupmaxPerc : '';  // 同策略持有基金份额不得超过该基金总份额占比
                this.singleunitGroupmaxPerc= item.fundgroupNewFundgroupDO.singleunitGroupmaxPerc ? item.fundgroupNewFundgroupDO.singleunitGroupmaxPerc : '';   // 持有单只指数基金的份额总和不得超过该基金总份额的
                this.rightMinratePerc=item.fundgroupNewFundgroupDO.rightMinratePerc?item.fundgroupNewFundgroupDO.rightMinratePerc:''; //权益类基金占净值比不低于
                this.valueMinratePerc=item.fundgroupNewFundgroupDO.valueMinratePerc?item.fundgroupNewFundgroupDO.valueMinratePerc:''; //债券基金占净值比不低于
                this.valueMaxratePerc=item.fundgroupNewFundgroupDO.valueMaxratePerc?item.fundgroupNewFundgroupDO.valueMaxratePerc:'';  //债券基金占净值比不超过
                this.isBlacklist=item.fundgroupNewFundgroupDO.isBlacklist?item.fundgroupNewFundgroupDO.isBlacklist:''; //是否禁投公司黑名单内基金
                this.isTradeLimit=item.fundgroupNewFundgroupDO.isTradeLimit?item.fundgroupNewFundgroupDO.isTradeLimit:''; //是否禁投流通受限基金
                this.investRiskLevel= item.fundgroupNewFundgroupDO.investRiskLevel ? item.fundgroupNewFundgroupDO.investRiskLevel : '';     //投顾风险等级

                this.investType= item.fundgroupNewFundgroupDO.investType ? item.fundgroupNewFundgroupDO.investType : '';       //投顾类型
                this.investCustomers=this.investType==='G' ?  item.fundgroupNewFundgroupDO.investCustomers : '';       //投顾组合客户
                this.investPrincipal=this.investType==='G' ?  item.fundgroupNewFundgroupDO.investPrincipal : '';       //名义本金
                this.investDuration=this.investType==='G' ?  item.fundgroupNewFundgroupDO.investDuration : '';       //投资时长

                this.categoryDescDoc=item.fundgroupNewFundgroupDO.categoryDescDoc ?  item.fundgroupNewFundgroupDO.categoryDescDoc : '';        //策略说明书
                this.riskDescDoc=item.fundgroupNewFundgroupDO.riskDescDoc ?  item.fundgroupNewFundgroupDO.riskDescDoc : '';        //风险揭示书
                this.investDescDoc=item.fundgroupNewFundgroupDO.investDescDoc ?  item.fundgroupNewFundgroupDO.investDescDoc : '';        //投顾协议

                this.categoryDescDisplay=item.fundgroupNewFundgroupDO.categoryDescDisplay ?  item.fundgroupNewFundgroupDO.categoryDescDisplay : ''; //策略说明书文案
                this.riskDescDisplay=item.fundgroupNewFundgroupDO.riskDescDisplay ?  item.fundgroupNewFundgroupDO.riskDescDisplay : '';        //风险揭示书文案
                this.investDescDisplay=item.fundgroupNewFundgroupDO.investDescDisplay ?  item.fundgroupNewFundgroupDO.investDescDisplay : '';        //投顾协议文案

                if (this.stopStatus != 0) {     //暂停截止时间的展示
                    _this.isTime = true;
                } else {
                    _this.isTime = false;
                }
                if (this.fundgroupType == "04") {
                    _this.isCode = true;
                    // if (this.cooPreationMode != "2") {
                    //     _this.isCode = true;
                    // } else {
                    //     _this.isCode = true;
                    // }
                } else {
                    _this.isCode = false;
                }
                // item.fundgroupChangeROList.forEach(function (item) {
                //     for (var i = 0; i < item.fundgroupChangeDetailList.length; i++) {
                //         _this.fundListAll.push({
                //             fundId: item.fundgroupChangeDetailList[i].fundid,
                //             fundApkind: item.fundgroupChangeDetailList[i].fundApkind,  //产品类型
                //             fundPercent: item.fundgroupChangeDetailList[i].fundPercent           //调整仓位
                //         })
                //     }
                // })

                // for(var i=0; i<item.fundgroupChangeROList.length;i++){
                //     for(var j=0;j<item.fundgroupChangeROList.fundgroupChangeDetailList.length;j++){
                // ArrList.push({
                //      fundId: item.fundgroupChangeDetailList[i].fundgroupChangeDetailList[j].fundid,
                //      fundApkind: item.fundgroupChangeDetailList[i].fundgroupChangeDetailList[j].fundApkind,  //产品类型
                //      fundPercent: item.fundgroupChangeDetailList[i].fundgroupChangeDetailList[j].fundPercent           //调整仓位
                //  })
                //     }
                // }
                var ArrRoList = []
                ArrRoList .push(item.fundgroupChangeROList[0])
                for (var i = 0; i < ArrRoList.length; i++) {
                    // var ArrDetailList=[]
                    for (var j = 0; j < ArrRoList[i].fundgroupChangeDetailList.length; j++) {
                        _this.fundListAll.push({
                            fundId: ArrRoList[i].fundgroupChangeDetailList[j].fundid,
                            fundName: ArrRoList[i].fundgroupChangeDetailList[j].fundName,
                            fundApkind: ArrRoList[i].fundgroupChangeDetailList[j].fundApkind,  //产品类型
                            fundPercent: ArrRoList[i].fundgroupChangeDetailList[j].fundPercent,           //调整仓位
                            optionalFundList: ArrRoList[i].fundgroupChangeDetailList[j].optionalFundList,           //备选基金
                            isUnderlyingCurrency:ArrRoList[i].fundgroupChangeDetailList[j].isUnderlyingCurrency
                        })
                    }
                }
                _this.fundHistory = _this.fundListAll;
                this.htmlList = item.fundgroupChangeROList.slice(1).map(function(item, index){
                    $('.strChangetimes').eq(index).val(moment(item.fundgroupChangeDO.strChangetime).format("YYYY-MM-DD HH:mm:ss"));
                    return {
                        changeAdvises: item.fundgroupChangeDO.changeAdvise,
                        strChangetimes: item.fundgroupChangeDO.strChangetime,
                        isDisplays: item.fundgroupChangeDO.isDisplay,
                        list: item.fundgroupChangeDetailList.map(function(item){
                            item.fundId = item.fundid;
                            return item;
                        }),
                        strCreattime: moment(item.fundgroupChangeDO.strCreattime).format("YYYYMMDDHHmmss")
                    };
                });
                setTimeout(function(){
                    item.fundgroupChangeROList.slice(1).forEach(function(item, index){
                        $('.strChangetimes').eq(index).val(moment(item.fundgroupChangeDO.strChangetime).format("YYYY-MM-DD HH:mm:ss"));
                    });
                },0);
            }
            // 2.业务数据传过来的的信息
            if (this.operate == "2") {

                this.operate = item.operate;
                this.mysqlId = item.mySQLId  //获取数据库表字段ID

                // this.acceptMode=item.fundgroupSubdatetimeRO.acceptMode;
                // if($("#acceptModes").val()==""){
                //     this.showDialog('revise', 'info', true, '渠道不能为空');
                //         return false;
                // }

                this.fundgroupType = item.fundgroupNewFundgroupDO.fundgroupType;
                this.groupid = item.fundgroupNewFundgroupDO.groupid;
                this.groupname = item.fundgroupNewFundgroupDO.groupname;
                this.fundgroupDesc = item.fundgroupNewFundgroupDO.fundgroupDesc;
                this.targetContract = item.fundgroupNewFundgroupDO.targetContract;
                this.strategyMode = item.fundgroupNewFundgroupDO.strategyMode;
                this.fundgroupAdvise = item.fundgroupNewFundgroupDO.fundgroupAdvise;
                this.proPageurl = item.fundgroupNewFundgroupDO.proPageurl;
                // this.normalPageurl = item.fundgroupNewFundgroupDO.normalPageurl;
                this.grouptype = item.fundgroupNewFundgroupDO.grouptype;
                this.risklevel = item.fundgroupNewFundgroupDO.risklevel;
                this.ageRange = item.fundgroupNewFundgroupDO.ageRange;
                this.initamount = item.fundgroupNewFundgroupDO.initamount;
                // this.sofarYield = item.fundgroupNewFundgroupDO.sofarYield;
                this.commro = item.fundgroupNewFundgroupDO.commro;
                this.minRedeemAmount = item.fundgroupNewFundgroupDO.minRedeemAmount;
                this.minChangeAmount = item.fundgroupNewFundgroupDO.minChangeAmount;
                this.minReserveAmount = item.fundgroupNewFundgroupDO.minReserveAmount;
                this.rightLimit = item.fundgroupNewFundgroupDO.rightLimit;
                // this.largeRedemptionPercent = item.fundgroupNewFundgroupDO.largeRedemptionPercent;
                this.reviseAdvise = item.changeAdvise;
                this.stringEstablishDate = item.fundgroupNewFundgroupDO.stringEstablishDate;
                // this.displayDate = item.fundgroupNewFundgroupDO.displayDate;
                this.status = item.fundgroupNewFundgroupDO.status;
                this.isInvestment = item.fundgroupNewFundgroupDO.isInvestment;
                this.fundgroupFeature=item.fundgroupNewFundgroupDO.fundgroupFeature;  //2020.09.28 组合投资特点
                this.investmentServicePerc=item.fundgroupNewFundgroupDO.investmentServicePerc;////2020.09.28 投顾服务费率
                // $("#displayDates").val(item.fundgroupNewFundgroupDO.displayDate)
                // if(item.fundgroupNewFundgroupDO.displayDate==null||item.fundgroupNewFundgroupDO.displayDate==""){
                //     var disPlayTime="";
                //     $("#displayDates").val(disPlayTime);
                // }else{
                //     var disPlayTime=moment(item.fundgroupNewFundgroupDO.displayDate).format("YYYY-MM-DD 00:00:00");
                //     $("#displayDates").val(disPlayTime);
                // }
                this.acceptMode = item.fundgroupSubdatetimeRO.acceptMode;
                //渠道多选条件
                // var acceptMode = [{'value': "0", "name": "柜台"}, {'value': "2", "name": "网上"}, {
                //     'value': "6",
                //     "name": "第三方"
                // }, {'value': "7", "name": "企业版"}]
                // _this.dataSummary(acceptMode, 'value', 'label', 'acceptModes', this.acceptMode);

                // 网点号
                this.branchCode = item.fundgroupSubdatetimeRO.branchCode;
                _this.dataSummary2(_this.branchCodeList, 'value', 'label', 'branchCodes',this.branchCode);

                this.cooPreationMode = item.fundgroupSubdatetimeRO.cooPreationMode;
                this.stopStartTime =$("#stopStartTimes").val(item.fundgroupSubdatetimeRO.stopStartTime);
                this.stopEndTime =$("#stopEndTimes").val(item.fundgroupSubdatetimeRO.stopEndTime);
                this.stopStatus = item.fundgroupSubdatetimeRO.stopStatus;

                this.serialno = item.fundgroupNewFundgroupDO.serialno;

                this.isDisplay = 0;
                // this.onlinedate = item.onlinedate.replace(/(\d{4})(\d{2})(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1$2$3$4$5$6');
                this.onlinedate = item.fundgroupNewFundgroupDO.onlinedate;
                $("#onlinedates").val(item.fundgroupNewFundgroupDO.onlinedate)
                this.onlinetime = item.fundgroupNewFundgroupDO.onlinetime;
                this.recommendReason=item.fundgroupNewFundgroupDO.recommendReason;
                this.recommendHoldTime=item.fundgroupNewFundgroupDO.recommendHoldTime;

                // 各种占比
                this.rightPercent = item.rightPercent                //权益类占比
                this.fixPercent = item.fixPercent           //固收类占比
                this.vaPercent = item.vaPercent          //货币类占比
                this.otherPercent = item.otherPercent     //其它占比

                if (this.stopStatus != 0) {     //暂停截止时间的展示
                    _this.isTime = true;
                } else {
                    _this.isTime = false;
                }
                if (_this.fundgroupType == "04") {
                    _this.isCode = true;
                    // if (this.cooPreationMode != "2") {
                    //     _this.isCode = true;
                    // } else {
                    //     _this.isCode = false;
                    // }
                } else {
                    _this.isCode = false;
                }

            }

            this.service_id = item.service_id
            this.operate = item.operate
            this.delete_flag = item.delete_flag

            //修改弹窗里面获取组合类型数据
            _this.groupFundType();
            // 年龄段
            _this.agerangeList();
            if (this.operate == "1") {
                this.showDialog('', 'add');
            } else {
                this.showDialog('', 'revise');
            }
        },
        localBasic: function () {                                 //只针对修改基本信息
            var _this = this;
            if (this.reviseCheck()) {
                // var params = {};
                // params.type = this.type;
                // params.myqsql = this.mysqlId; //数据表字段id
                // params.oneId = _this.oneId; //根据id插入或者修改数据
                // params.product = this.mysqlProduct;
                //
                // params.groupid = this.groupid;      //组合Id  A+四位数字
                // params.fundgroupType = this.fundgroupType;
                // params.groupname = this.groupname;
                // params.grouptype = this.grouptype;
                // params.stringEstablishDate = moment(this.$refs.onlinedates.value).format("YYYYMMDDHHmmss");
                // params.onlinedate = moment(this.$refs.onlinedates.value).format("YYYYMMDD");
                //
                // var cooPreationMode = ""; //合作模式变量
                // var branchCodes = ""     //网点变量
                // if (this.fundgroupType == "04") {
                //     cooPreationMode = this.cooPreationMode;       //合作模式;
                // } else {
                //     cooPreationMode = "";
                // }
                // if (cooPreationMode == "2" || cooPreationMode == "") {
                //     branchCodes = "247";
                // } else {
                //     branchCodes += this.branchCode;       //网点
                // }
                // // 各种占比
                // var rightPercent = 0                 //权益类占比
                // var fixPercent = 0            //固收类占比
                // var vaPercent = 0           //货币类占比
                // var otherPercent = 0;      //其它占比
                // // 给基金占比赋值
                // for (var x in this.fundListAll) {
                //     if (this.fundListAll[x].fundApkind === 'R') {
                //         rightPercent += Number(this.fundListAll[x].fundPercent)
                //         if (this.fundListAll[x].fundListAll == "") {
                //             rightPercent = 0
                //         }
                //     }
                //     if (this.fundListAll[x].fundApkind === 'F') {
                //         fixPercent += Number(this.fundListAll[x].fundPercent)
                //         if (this.fundListAll[x].fundPercent == "") {
                //             fixPercent = 0
                //         }
                //     }
                //     if (this.fundListAll[x].fundApkind === 'V') {
                //         vaPercent += Number(this.fundListAll[x].fundPercent)
                //         if (this.fundListAll[x].fundPercent == "") {
                //             vaPercent = 0
                //         }
                //     }
                //     if (this.fundListAll[x].fundApkind === 'O') {
                //         otherPercent += Number(this.fundListAll[x].fundPercent)
                //         if (this.fundListAll[x].fundPercent == "") {
                //             otherPercent = 0
                //         }
                //     }
                // }
                // params.rightPercent = rightPercent;                //权益类占比
                // params.fixPercent = fixPercent;         //固收类占比
                // params.vaPercent = vaPercent;        //货币类占比
                // params.otherPercent = otherPercent;  //其它
                //
                // var fundgroupChangeDO = {
                //     changeAdvise: this.reviseAdvise,       //组合调仓说明（属于历史调仓里）
                //     fundgroupType: this.fundgroupType,    //组合类型
                //     groupid: this.groupid,          //组合ID
                //     groupname: this.groupname,        //组合名称
                //     grouptype: this.grouptype,        //组合风险类型已用(属组合成分里)
                //     isDisplay: this.isDisplay,    //新增字段-其他默认展示，用户可以选择不展示，前端页面控制展示“是”和“否”选择，后台传入“1“或“0“
                //     strChangetime: this.strChangetime,//调仓时间
                //     strCreattime: this.strCreattime,  //鼠标点击添加调仓按钮的操作时间(YYYYMMDDHHmmss)（隐藏式的）后面时间要大于前面时间  否者删除重新添加。
                // }
                //
                // var fundgroupChangeDetailList = [];     //基金信息
                // for (var i = 0; i < this.fundListAll.length; i++) {
                //     fundgroupChangeDetailList.push({
                //         groupid: this.groupid,
                //         fundid: this.fundListAll[i].fundId,
                //         fundApkind: this.fundListAll[i].fundApkind,  //产品类型
                //         fundPercent: this.fundListAll[i].fundPercent           //调整仓位
                //     })
                // }
                // var fundgroupChangeROList = []
                // fundgroupChangeROList.push({
                //     fundgroupChangeDO,
                //     fundgroupChangeDetailList,
                // })
                //
                // params.fundgroupChangeROList = fundgroupChangeROList;
                // params.fundgroupNewFundgroupDO = {
                //     ageRange: this.ageRange,      //组合年临段已用(属基本信息)
                //     commro: this.commro,         //组合费率折扣已用(属组合成分里)
                //     displayDate: moment(this.$refs.displayDates.value).format("YYYYMMDD"),   //用于控制搜索展示，需要前端让营运人员输入
                //     fundgroupAdvise: this.fundgroupAdvise,    // 组合智投建议已用(属基本信息)
                //     fundgroupDesc: this.fundgroupDesc,     // 组合建议已用(属基本信息)
                //     fundgroupType: this.fundgroupType,    // 组合类型已用(属基本信息)
                //     groupid: this.groupid,          // 组合ID已用(属基本信息)
                //     groupname: this.groupname,       //组合名称已用(属基本信息)
                //     grouptype: this.grouptype,       //组合风险类型已用(属组合成分里)
                //     initamount: this.initamount,             //组合起投金额已用(属组合成分里)
                //     minChangeAmount: this.minChangeAmount,         // 组合最低调仓金额已用(属组合成分里)
                //     minRedeemAmount: this.minRedeemAmount,         //组合最低赎回金额已用(属组合成分里)
                //     minReserveAmount: this.minReserveAmount,        //组合最低持有金额已用(属组合成分里)
                //     normalPageurl: this.normalPageurl,  //组合小白版宣传页已用(属基本信息)
                //     onlinedate: moment(this.$refs.onlinedates.value).format("YYYYMMDD"),    //组合上线日期也就是成立日期----也属于成立日期(YYYYMMDD) 8位
                //     onlinetime: moment(this.$refs.onlinedates.value).format("HHmmss"),   //成立日期的时间 (hhmmss)6位
                //     proPageurl: this.proPageurl,   //组合专业版宣传页已用(属基本信息)
                //     risklevel: this.risklevel,    //组合风险等级已用(属组合成分里)
                //     sofarYield: this.sofarYield,         //组合历史年化收益率已用(属基本信息)
                //     stringEstablishDate: moment(this.$refs.onlinedates.value).format("YYYYMMDD"),   //成立调仓日期和成立日期一样，都为YYYYMMDD补上6个000000  默认开始不能选择操作
                // }
                // params.fundgroupSubdatetimeRO = {
                //     acceptMode: this.acceptMode.join(),
                //     branchCode: branchCodes.split(','),
                //     cooPreationMode: this.cooPreationMode,
                //     fundgroupType: this.fundgroupType,
                //     groupid: this.groupid,
                //     stopEndTime: moment(this.$refs.stopEndTimes.value).format('YYYYMMDDHHmmss'),
                //     stopStartTime: moment(this.$refs.stopStartTimes.value).format('YYYYMMDDHHmmss'),
                //     stopStatus: this.stopStatus
                // }
                //
                // params.service_id=this.service_id
                // params.operator = this.operator
                // params.operate = this.operate
                // params.updateTime = moment(new Date().getTime()).format("YYYY-MM-DD HH:mm:ss");
                // // params.arrId = _this.arrId
                // params.delete_flag = this.delete_flag
                // console.log(params)
                // $.post({
                //     url: '/investmentMgmt/investmentStrategy/combinationProductHandle/localRevise.ajax',
                //     data: params,
                //     success: function (result) {
                //         if (result.error === 0) {
                //             _this.getTableData(0, params.type);
                //         }
                //         _this.showDialog('revise', 'info', false, result.msg);
                //     }
                // });

                var params = {};
                params.type = this.type;
                params.oneId = _this.oneId; //根据id插入或者修改数据
                // params.product = this.mysqlProduct;
                params.mysqlId = this.mysqlId;

                params.groupid = this.groupid;      //组合Id  A+四位数字
                params.fundgroupType = this.fundgroupType;
                params.groupname = this.groupname;
                params.grouptype = this.grouptype;
                params.stringEstablishDate = moment(this.$refs.onlinedates.value).format("YYYYMMDDHHmmss");
                params.onlinedate = moment(this.$refs.onlinedates.value).format("YYYYMMDD");

                var cooPreationMode = ""; //合作模式变量
                var branchCodes = ""     //网点变量
                if (this.fundgroupType == "04") {
                    cooPreationMode = this.cooPreationMode;       //合作模式;
                } else {
                    cooPreationMode = "";
                }

                if (this.fundgroupType != "04") {
                    branchCodes = "247";
                }else{
                    if (cooPreationMode == "2" || cooPreationMode == "") {
                        // branchCodes = "247";
                        branchCodes += this.branchCode;        //2021-05-12新需求
                    } else {
                        branchCodes += this.branchCode;       //网点
                    }
                }
                // 各种占比
                var rightPercent = 0                 //权益类占比
                var fixPercent = 0            //固收类占比
                var vaPercent = 0           //货币类占比
                var otherPercent = 0;      //其它占比

                params.rightPercent = rightPercent || this.rightPercent;                //权益类占比
                params.fixPercent = fixPercent || this.fixPercent;         //固收类占比
                params.vaPercent = vaPercent || this.vaPercent;        //货币类占比
                params.otherPercent = otherPercent || this.otherPercent;  //其它
                var fundgroupChangeDO = {
                    changeAdvise: this.reviseAdvise,       //组合调仓说明（属于历史调仓里）
                    fundgroupType: this.fundgroupType,    //组合类型
                    groupid: this.groupid,          //组合ID
                    groupname: this.groupname,        //组合名称
                    grouptype: this.grouptype,        //组合风险类型已用(属组合成分里)
                    isDisplay: this.isDisplay,    //新增字段-其他默认展示，用户可以选择不展示，前端页面控制展示“是”和“否”选择，后台传入“1“或“0“
                    strChangetime: moment(this.$refs.onlinedates.value).format("YYYYMMDDHHmmss"),//调仓时间
                    strCreattime: this.onlinedate,  //鼠标点击添加调仓按钮的操作时间(YYYYMMDDHHmmss)（隐藏式的）后面时间要大于前面时间  否者删除重新添加。
                }

                var fundgroupChangeDetailList = [];     //基金信息
                for (var i = 0; i < this.fundListAll.length; i++) {
                    fundgroupChangeDetailList.push({
                        groupid: this.groupid,
                        fundId: this.fundListAll[i].fundId,
                        fundApkind: this.fundListAll[i].fundApkind,  //产品类型
                        fundPercent: this.fundListAll[i].fundPercent,           //调整仓位
                        optionalFundIds: this.fundListAll[i].optionalFundIds // 备选基金池
                    })
                }
                var fundgroupChangeROList = []
                fundgroupChangeROList.push({
                    fundgroupChangeDO,
                    fundgroupChangeDetailList,
                })
                // params.fundgroupChangeROList = fundgroupChangeROList;
                // var disTime = $("#displayDates").val();
                // if(disTime==""){
                //     disTime = null;
                // }else if(disTime!=""&&isNaN(parseInt(disTime))){
                //     disTime = null;
                // }
                // else{
                //     disTime = moment(this.$refs.displayDates.value).format("YYYYMMDD")
                // }
                params.fundgroupNewFundgroupDO = {
                    ageRange: this.ageRange,      //组合年临段已用(属基本信息)
                    commro: this.commro,         //组合费率折扣已用(属组合成分里)
                    // displayDate: disTime,   //用于控制搜索展示，需要前端让营运人员输入
                    fundgroupAdvise: this.fundgroupAdvise,    // 组合智投建议已用(属基本信息)
                    fundgroupDesc: this.fundgroupDesc,     // 组合建议已用(属基本信息)
                    targetContract: this.targetContract,     // 目标赢协议(属基本信息)
                    strategyMode: this.strategyMode,     // 策略运作模式(属基本信息)
                    fundgroupType: this.fundgroupType,    // 组合类型已用(属基本信息)
                    groupid: this.groupid,          // 组合ID已用(属基本信息)
                    groupname: this.groupname,       //组合名称已用(属基本信息)
                    grouptype: this.grouptype,       //组合风险类型已用(属组合成分里)
                    initamount: this.initamount,             //组合起投金额已用(属组合成分里)
                    minChangeAmount: this.minChangeAmount,         // 组合最低调仓金额已用(属组合成分里)
                    minRedeemAmount: this.minRedeemAmount,         //组合最低赎回金额已用(属组合成分里)
                    minReserveAmount: this.minReserveAmount,        //组合最低持有金额已用(属组合成分里)
                    rightLimit: this.rightLimit ? this.rightLimit : '',        //权益类基金定义(属组合成分里)
                    // largeRedemptionPercent: this.largeRedemptionPercent ? this.largeRedemptionPercent : '',        //大额赎回在全平台的比例(属组合成分里)
                    // normalPageurl: this.normalPageurl,  //组合小白版宣传页已用(属基本信息)
                    onlinedate: moment(this.$refs.onlinedates.value).format("YYYYMMDD"),    //组合上线日期也就是成立日期----也属于成立日期(YYYYMMDD) 8位
                    onlinetime: moment(this.$refs.onlinedates.value).format("HHmmss"),   //成立日期的时间 (hhmmss)6位
                    proPageurl: this.proPageurl,   //组合专业版宣传页已用(属基本信息)
                    risklevel: this.risklevel,    //组合风险等级已用(属组合成分里)
                    // sofarYield: this.sofarYield,         //组合历史年化收益率已用(属基本信息)
                    serialno: this.serialno,
                    status: this.status,
                    isInvestment:this.isInvestment,
                    fundgroupFeature:this.fundgroupFeature,  //2020.09.28 组合投资特点
                    investmentServicePerc:this.investmentServicePerc,////2020.09.28 投顾服务费率
                    recommendReason:this.recommendReason,
                    recommendHoldTime:this.recommendHoldTime,
                    stringEstablishDate: moment(this.$refs.onlinedates.value).format("YYYYMMDD"),   //成立调仓日期和成立日期一样，都为YYYYMMDD补上6个000000  默认开始不能选择操作
                }

                if ($("#stopStartTimes").val() == "") {
                    var stopStartTimes = "";
                    var stopEndTimes = "";
                } else {
                    var stopStartTimes = $("#stopStartTimes").val().replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1$2$3$4$5$6')
                    var stopEndTimes = $("#stopEndTimes").val().replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1$2$3$4$5$6')
                }
                // var stopStartTimes = moment($("#stopStartTimes").val()).format('YYYYMMDDHHmmss')
                // var stopEndTimes = moment($("#stopEndTimes").val()).format('YYYYMMDDHHmmss')

                // if (!Array.isArray(this.acceptMode)) {
                //     this.showDialog('revise', 'info', true, "请先选择开放渠道");
                //     return false;
                // } else {
                //     params.fundgroupSubdatetimeRO = {
                //         acceptMode: this.acceptMode.join(),
                //         branchCode: branchCodes.split(','),
                //         cooPreationMode: this.cooPreationMode,
                //         fundgroupType: this.fundgroupType,
                //         groupid: this.groupid,
                //         stopEndTime: stopEndTimes,
                //         stopStartTime: stopStartTimes,
                //         stopStatus: this.stopStatus
                //     }
                // }

                params.fundgroupSubdatetimeRO = {
                    // acceptMode: this.acceptMode.join(),
                    acceptMode: this.acceptMode,
                    branchCode: branchCodes.split(','),
                    cooPreationMode: this.cooPreationMode,
                    fundgroupType: this.fundgroupType,
                    groupid: this.groupid,
                    stopEndTime: stopEndTimes,
                    stopStartTime: stopStartTimes,
                    stopStatus: this.stopStatus
                }

                params.operate = this.operate
                params.updateTime = moment(new Date().getTime()).format("YYYY-MM-DD HH:mm:ss");

                params.arrId = _this.arrId
                params.delete_flag = this.delete_flag

                $.post({
                    url: '/investmentMgmt/investmentStrategy/combinationProductHandle/localBasic.ajax',
                    data: params,
                    success: function (result) {
                        if (result.error === 0) {
                            _this.getTableData(0, params.type);
                        }
                        _this.showDialog('revise', 'info', false, result.msg);
                    }
                });
            }
        },
        //修改本地-业务数据传过来的调仓-按钮
        houseUpdate: function (item) {
            var _this = this;
            _this.updateList = false;
            _this.updataAdvise="";
            _this.isDisplayAdd=""
            // 每次点击重新设置disabled
            var changeAdvise=$(".changeAdvise")
            $.each(changeAdvise,function (index,elements) {
                this.disabled=false;
                $(this).css("background-color","#fff");
            })
            var isDisplay=$(".isDisplay")
            $.each(isDisplay,function (index,elements) {
                this.disabled=false;
                $(this).css("background-color","#fff");
            })

            this.operate = item.operate;
            this.mysqlId = item.mySQLId  //获取数据库表字段ID
            _this.fundListAll = []
            // 判断业务接口数据与数据库有没有相同数据
            // if (this.type == 0) {
            //     if (this.arrId.indexOf(item.id.toString()) != -1) {
            //         _this.oneId = item.id
            //     } else {
            //         _this.oneId = ''
            //     }
            // }

            // 点击业务修改查询所有基本信息和调仓信息
            var params = {}
            params.groupId = item.groupid;

            //这一步请求只是获取 _this.isInvestment是否是投顾
            $.post({
                url: '/investmentMgmt/investmentStrategy/combinationProductHandle/details.ajax',   //单个基金信息
                data: {
                    groupId:item.groupid
                },
                success: function (result) {
                    if (result.error === 0) {
                        result.data.forEach(function(itemBasic){
                            _this.isInvestment=itemBasic.baseInfo.isInvestment;
                        })
                    }
                }
            });
            //
            $.post({
                url: '/investmentMgmt/investmentStrategy/combinationProductHandle/basicParam.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.paramsList = result.data.body;
                        // var arrList=[];
                        // arrList.push({
                        //     fundgroupChangeDO:'',
                        //     fundgroupChangeROList:item.fundgroupChangeROList
                        // })
                        // _this.paramsList.push(arrList)

                        if (!_this.paramsList) {
                            _this.showDialog('houseUpdate', 'info', true, '没有调仓记录');
                            return false;
                        }
                        // _this.fundgroupType = _this.paramsList[0].fundgroupChangeDO.fundgroupType;
                        // _this.groupid = _this.paramsList[0].fundgroupChangeDO.groupid;
                        // _this.groupname = _this.paramsList[0].fundgroupChangeDO.groupname;
                        // _this.grouptype = _this.paramsList[0].fundgroupChangeDO.grouptype;
                        // _this.strChangetime = _this.paramsList[0].fundgroupChangeDO.strChangetime;
                        // _this.strCreattime = _this.paramsList[0].fundgroupChangeDO.strCreattime;
                        // _this.onlinedate = _this.paramsList[0].fundgroupChangeDO.onlinedate;
                        // _this.stringEstablishDate = _this.paramsList[0].fundgroupChangeDO.stringEstablishDate;
                        // // _this.isDisplay =_this.paramsList[0].fundgroupChangeDO.isDisplay;
                        // _this.reviseAdvise=_this.paramsList[0].fundgroupChangeDO.changeAdvise;
                        _this.serialno = item.serialno;

                        _this.fundgroupType = item.fundgroupType;
                        _this.groupid = item.groupid;
                        _this.groupname = item.groupname;
                        _this.grouptype = item.grouptype;
                        _this.strChangetime = item.strChangetime;
                        _this.strCreattime = item.strCreattime;
                        _this.onlinedate = item.onlinedate;
                        _this.stringEstablishDate = item.stringEstablishDate;
                        _this.isDisplay =item.isDisplay;
                        _this.reviseAdvise=item.changeAdvise;

                        _this.serialno = item.serialno;


                        // 展示调仓基金列表信息
                        var arrDetailList = []
                        _this.paramsList.forEach(function (item) {
                            for (var j = 0; j < item.fundgroupChangeDetailList.length; j++) {
                                if (item.fundgroupChangeDetailList[j].fundPercent != 0) {
                                    arrDetailList.push(item.fundgroupChangeDetailList[j])
                                }
                            }
                        })
                        for (var i = 0; i < arrDetailList.length; i++) {
                            _this.fundListAll.push({
                                fundId: arrDetailList[i].fundid,
                                fundApkind: arrDetailList[i].fundApkind,  //产品类型
                                fundPercent: arrDetailList[i].fundPercent,           //调整仓位
                                optionalFundList: arrDetailList[i].optionalFundList           //备选基金
                            })
                        }
                        // if(!item.fundgroupChangeROList){
                        //     _this.showDialog('', 'info', false, '没有添加调仓记录');
                        //     return false;
                        // }else {
                        //     item.fundgroupChangeROList.forEach(function (item) {
                        //         for (var i = 0; i < item.fundgroupChangeDetailList.length; i++) {
                        //             _this.fundListAll.push({
                        //                 fundId: item.fundgroupChangeDetailList[i].fundid,
                        //                 fundApkind: item.fundgroupChangeDetailList[i].fundApkind,  //产品类型
                        //                 fundPercent: item.fundgroupChangeDetailList[i].fundPercent           //调整仓位
                        //             })
                        //         }
                        //     })
                        // }

                    }
                }
            });
            this.isDisplay = "";
            // 各种占比
            this.rightPercent = item.rightPercent                //权益类占比
            this.fixPercent = item.fixPercent           //固收类占比
            this.vaPercent = item.vaPercent          //货币类占比
            this.otherPercent = item.otherPercent     //其它占比

            // 添加基金信息
            // for (var i = 0; i < item.detailList.length; i++) {
            //     _this.fundListAll.push({
            //         fundId: item.detailList[i].fundId,
            //         fundApkind: item.detailList[i].fundApkind,  //产品类型
            //         fundPercent: item.detailList[i].fundPercent           //调整仓位
            //     })
            // }

            this.operate = item.operate
            this.delete_flag = item.delete_flag

            //修改弹窗里面获取组合类型数据
            _this.groupFundType();
            // 年龄段
            _this.agerangeList();

            this.showDialog('', 'houseUpdate');
        },

        //点击修改业务数据(基本信息)按钮保存到本地
        serviceUpdate: function (item, index) {
            var _this = this;
            this.operate = item.operate;
            this.mysqlId = item.mySQLId  //获取数据库表字段ID
            _this.fundListAll = [];
            _this.itemDetail=[]
            _this.basicDetail=[]
            // 判断业务接口数据与数据库有没有相同数据
            // if (this.type == 0) {
            //     if (this.arrId.indexOf(item.id.toString()) != -1) {
            //         _this.oneId = item.id
            //     } else {
            //         _this.oneId = ''
            //     }
            // }

            this.fundgroupType = item.fundgroupType;
            this.groupid = item.groupId;
            this.groupname = item.groupName;
            // this.fundgroupDesc = item.fundgroupDesc;
            // this.fundgroupAdvise = item.fundgroupAdvise;
            // this.proPageurl = item.proPageurl;

            // this.normalPageurl = item.normalPageurl;
            this.grouptype = item.groupType;
            // this.risklevel = item.risklevel;
            // this.ageRange = item.ageRange;
            $.post({
                url: '/investmentMgmt/investmentStrategy/combinationProductHandle/details.ajax',   //单个基金信息
                data: {
                    groupId:item.groupId
                },
                success: function (result) {
                    if (result.error === 0) {
                        result.data.forEach(function(itemBasic){
                            _this.fundgroupDesc=itemBasic.baseInfo.fundgroupDesc;
                            _this.targetContract=itemBasic.baseInfo.targetContract;
                            _this.strategyMode=itemBasic.baseInfo.strategyMode;
                            _this.fundgroupAdvise = itemBasic.baseInfo.fundgroupAdvise;
                            _this.proPageurl = itemBasic.baseInfo.proPageurl;
                            _this.risklevel = itemBasic.baseInfo.risklevel;
                            _this.ageRange = itemBasic.baseInfo.ageRange;
                            _this.onlinedate = $("#onlinedates").val( itemBasic.baseInfo.onlinedate);
                            _this.onlinetime =  itemBasic.baseInfo.onlinetime;
                            _this.status=itemBasic.baseInfo.status;
                            _this.isInvestment=itemBasic.baseInfo.isInvestment;

                            _this.fundgroupFeature=itemBasic.baseInfo.fundgroupFeature;  //2020.09.28 组合投资特点
                            _this.investmentServicePerc=itemBasic.baseInfo.investmentServicePerc;////2020.09.28 投顾服务费率

                            _this.initamount = itemBasic.baseInfo.initamount;
                            _this.minRedeemAmount = itemBasic.baseInfo.minRedeemAmount;
                            _this.minReserveAmount =itemBasic.baseInfo.minReserveAmount;
                            _this.rightLimit = itemBasic.baseInfo.rightLimit;
                            _this.largeRedemptionPercent = itemBasic.baseInfo.largeRedemptionPercent;
                            _this.minChangeAmount = itemBasic.baseInfo.minChangeAmount;
                            _this.commro = itemBasic.baseInfo.commro;
                            _this.recommendReason = itemBasic.baseInfo.recommendReason;
                            _this.recommendHoldTime = itemBasic.baseInfo.recommendHoldTime;
                        })

                        result.data.forEach(function(item){
                            _this.basicDetail=item.subdatetimeList;    //基本信息
                            _this.itemDetail=item.detailList;          //基金信息
                        });
                        _this.basicDetail.forEach(function(itemAccept){
                            _this.acceptMode=itemAccept.accptmd;
                            _this.cooPreationMode = itemAccept.accptType;
                            _this.stopStatus =itemAccept.manualFundst;
                            _this.stopStartTime =$("#stopStartTimes").val(itemAccept.manualStartTime);
                            _this.stopEndTime =$("#stopEndTimes").val(itemAccept.manualEndTime);
                        })

                        // 网点号
                        _this.branchCode=[]; //清空
                        _this.basicDetail.forEach(function(itemCode){
                            _this.branchCode.push(itemCode.branchcode)
                        })
                        _this.dataSummary2(_this.branchCodeList, 'value', 'label', 'branchCodes',_this.branchCode);

                        if (_this.stopStatus != 0) {     //暂停截止时间的展示
                            _this.isTime = true;
                        } else {
                            _this.isTime = false;
                        }
                        if (_this.fundgroupType == "04") {
                            _this.isCode = true;
                            // if (_this.cooPreationMode != "2") {
                            //     _this.isCode = true;
                            // } else {
                            //     _this.isCode = false;
                            // }
                        } else {
                            _this.isCode = false;
                        }
                    }
                }
            });

            // var accept=[];
            // accept.push(item.subdatetimeList[0])

            // 渠道多选
            // var accept=[];
            // accept.push(item.subdatetimeList[0])
            // var acceptMode = accept.map(function(item){
            //     return item.accptmd;
            // });

            // this.acceptMode=acceptMode.join(",")
            // var acceptMode = [{'value': "0", "name": "柜台"}, {'value': "2", "name": "网上"}, {
            //     'value': "6",
            //     "name": "第三方"
            // }, {'value': "7", "name": "企业版"}]
            // _this.dataSummary(acceptMode, 'value', 'label', 'acceptModes', this.acceptMode);


            // this.initamount = item.initamount;
            // this.commro = item.commro;
            // this.minRedeemAmount = item.minRedeemAmount;
            // this.minChangeAmount = item.minChangeAmount;
            // this.minReserveAmount = item.minReserveAmount;
            this.reviseAdvise = item.strChangetime;
            this.strChangetime = item.strChangetime;
            this.strCreattime = item.strCreattime;

            this.stringEstablishDate = item.establishDate;
            // this.status=item.status;
            // if(item.displayDate==null||item.displayDate==""){
            //     var disPlayTime="";
            //     $("#displayDates").val(disPlayTime);
            // }else{
            //     var disPlayTime=moment(item.displayDate).format("YYYY-MM-DD 00:00:00");
            //     $("#displayDates").val(disPlayTime);
            // }
            this.isDisplay = 0;
            // this.onlinedate = item.onlinedate.replace(/(\d{4})(\d{2})(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1$2$3$4$5$6');
            // this.onlinedate = $("#onlinedates").val(item.onlinedate);
            // this.onlinetime = item.onlinetime;
            // this.cooPreationMode = "2";


            // 各种占比
            this.rightPercent = item.rightPercent                //权益类占比
            this.fixPercent = item.fixPercent           //固收类占比
            this.vaPercent = item.vaPercent          //货币类占比
            this.otherPercent = item.otherPercent     //其它占比

            // 添加基金信息
            for (var i = 0; i <_this.itemDetail.length; i++) {
                _this.fundListAll.push({
                    fundId: item.detailList[i].fundId,
                    fundApkind: item.detailList[i].fundApkind,  //产品类型
                    fundPercent: item.detailList[i].fundPercent,           //调整仓位
                    optionalFundList: item.detailList[i].optionalFundList           //备选基金
                })
            }
            this.serialno = item.serialno;

            this.operate = item.operate
            this.delete_flag = item.delete_flag

            //修改弹窗里面获取组合类型数据
            _this.groupFundType();
            // 年龄段
            _this.agerangeList();
            this.showDialog('', 'revise');

        },
        serviceSave: function () {
            var _this = this;
            if (this.reviseCheck()) {
                var params = {};
                params.type = this.type;
                params.oneId = _this.oneId; //根据id插入或者修改数据
                // params.product = this.mysqlProduct;
                params.groupid = this.groupid;      //组合Id  A+四位数字
                params.fundgroupType = this.fundgroupType;
                params.groupname = this.groupname;
                params.grouptype = this.grouptype;
                params.stringEstablishDate = moment(this.$refs.onlinedates.value).format("YYYYMMDDHHmmss");
                params.onlinedate = moment(this.$refs.onlinedates.value).format("YYYYMMDD");

                var cooPreationMode = ""; //合作模式变量
                var branchCodes = ""     //网点变量
                if (this.fundgroupType == "04") {
                    cooPreationMode = this.cooPreationMode;       //合作模式;
                } else {
                    cooPreationMode = "";
                }
                if (this.fundgroupType != "04") {
                    branchCodes = "247";
                }else{
                    if (cooPreationMode == "2" || cooPreationMode == "") {
                        // branchCodes = "247";
                        branchCodes += this.branchCode;        //2021-05-12新需求
                    } else {
                        branchCodes += this.branchCode;       //网点
                    }
                }
                // 各种占比
                var rightPercent =this.rightPercent              //权益类占比
                var fixPercent =this.fixPercent          //固收类占比
                var vaPercent =this.vaPercent          //货币类占比
                var otherPercent =this.otherPercent     //其它占比
                // 给基金占比赋值
                // for (var x in this.fundListAll) {
                //     if (this.fundListAll[x].fundApkind === 'R') {
                //         rightPercent += Number(this.fundListAll[x].fundPercent)
                //         if (this.fundListAll[x].fundListAll == "") {
                //             rightPercent = 0
                //         }
                //     }
                //     if (this.fundListAll[x].fundApkind === 'F') {
                //         fixPercent += Number(this.fundListAll[x].fundPercent)
                //         if (this.fundListAll[x].fundPercent == "") {
                //             fixPercent = 0
                //         }
                //     }
                //     if (this.fundListAll[x].fundApkind === 'V') {
                //         vaPercent += Number(this.fundListAll[x].fundPercent)
                //         if (this.fundListAll[x].fundPercent == "") {
                //             vaPercent = 0
                //         }
                //     }
                //     if (this.fundListAll[x].fundApkind === 'O') {
                //         otherPercent += Number(this.fundListAll[x].fundPercent)
                //         if (this.fundListAll[x].fundPercent == "") {
                //             otherPercent = 0
                //         }
                //     }
                // }


                // params.rightPercent = rightPercent || this.rightPercent;                //权益类占比
                // params.fixPercent = fixPercent || this.fixPercent;         //固收类占比
                // params.vaPercent = vaPercent || this.vaPercent;        //货币类占比
                // params.otherPercent = otherPercent || this.otherPercent;  //其它
                params.rightPercent = rightPercent      //权益类占比
                params.fixPercent = fixPercent         //固收类占比
                params.vaPercent = vaPercent        //货币类占比
                params.otherPercent = otherPercent  //其它
                var fundgroupChangeDO = {
                    changeAdvise: this.reviseAdvise,       //组合调仓说明（属于历史调仓里）
                    fundgroupType: this.fundgroupType,    //组合类型
                    groupid: this.groupid,          //组合ID
                    groupname: this.groupname,        //组合名称
                    grouptype: this.grouptype,        //组合风险类型已用(属组合成分里)
                    isDisplay: this.isDisplay,    //新增字段-其他默认展示，用户可以选择不展示，前端页面控制展示“是”和“否”选择，后台传入“1“或“0“
                    strChangetime: moment(this.$refs.onlinedates.value).format("YYYYMMDDHHmmss"),//调仓时间
                    strCreattime: this.onlinedate,  //鼠标点击添加调仓按钮的操作时间(YYYYMMDDHHmmss)（隐藏式的）后面时间要大于前面时间  否者删除重新添加。
                }

                var fundgroupChangeDetailList = [];     //基金信息
                for (var i = 0; i < this.fundListAll.length; i++) {
                    fundgroupChangeDetailList.push({
                        groupid: this.groupid,
                        fundId: this.fundListAll[i].fundId,
                        fundApkind: this.fundListAll[i].fundApkind,  //产品类型
                        fundPercent: this.fundListAll[i].fundPercent           //调整仓位
                    })
                }
                var fundgroupChangeROList = []
                fundgroupChangeROList.push({
                    fundgroupChangeDO,
                    fundgroupChangeDetailList,
                })
                // var disTime = $("#displayDates").val();

                // if(disTime==""){
                //     disTime = null;
                // }else if(disTime!=""&&isNaN(parseInt(disTime))){
                //     disTime = null;
                // }
                // else{
                //     disTime = moment(this.$refs.displayDates.value).format("YYYYMMDD")
                // }

                // params.fundgroupChangeROList = fundgroupChangeROList;
                params.fundgroupNewFundgroupDO = {
                    ageRange: this.ageRange,      //组合年临段已用(属基本信息)
                    commro: this.commro,         //组合费率折扣已用(属组合成分里)
                    // displayDate: disTime,   //用于控制搜索展示，需要前端让营运人员输入
                    fundgroupAdvise: this.fundgroupAdvise,    // 组合智投建议已用(属基本信息)
                    fundgroupDesc: this.fundgroupDesc,     // 组合建议已用(属基本信息)
					targetContract: this.targetContract,     // 目标赢协议(属基本信息)
                    strategyMode: this.strategyMode,     // 策略运作模式(属基本信息)
                    fundgroupType: this.fundgroupType,    // 组合类型已用(属基本信息)
                    groupid: this.groupid,          // 组合ID已用(属基本信息)
                    groupname: this.groupname,       //组合名称已用(属基本信息)
                    grouptype: this.grouptype,       //组合风险类型已用(属组合成分里)
                    initamount: this.initamount,             //组合起投金额已用(属组合成分里)
                    minChangeAmount: this.minChangeAmount,         // 组合最低调仓金额已用(属组合成分里)
                    minRedeemAmount: this.minRedeemAmount,         //组合最低赎回金额已用(属组合成分里)
                    minReserveAmount: this.minReserveAmount,        //组合最低持有金额已用(属组合成分里)
                    rightLimit: this.rightLimit ? this.rightLimit : '',        //权益类基金定义(属组合成分里)
                    largeRedemptionPercent: this.largeRedemptionPercent ? this.largeRedemptionPercent : '',        //大额赎回在全平台的比例(属组合成分里)
                    // normalPageurl: this.normalPageurl,  //组合小白版宣传页已用(属基本信息)
                    onlinedate: moment(this.$refs.onlinedates.value).format("YYYYMMDD"),    //组合上线日期也就是成立日期----也属于成立日期(YYYYMMDD) 8位
                    onlinetime: moment(this.$refs.onlinedates.value).format("HHmmss"),   //成立日期的时间 (hhmmss)6位
                    proPageurl: this.proPageurl,   //组合专业版宣传页已用(属基本信息)
                    risklevel: this.risklevel,    //组合风险等级已用(属组合成分里)
                    // sofarYield: this.sofarYield,         //组合历史年化收益率已用(属基本信息)
                    serialno: this.serialno,
                    status: this.status,
                    isInvestment: this.isInvestment,
                    fundgroupFeature:this.fundgroupFeature, //2020.09.28 组合投资特点
                    investmentServicePerc:this.investmentServicePerc,////2020.09.28 投顾服务费率

                    recommendReason:this.recommendReason,
                    recommendHoldTime:this.recommendHoldTime,

                    stringEstablishDate: moment(this.$refs.onlinedates.value).format("YYYYMMDD"),   //成立调仓日期和成立日期一样，都为YYYYMMDD补上6个000000  默认开始不能选择操作
                }
                if ($("#stopStartTimes").val() == "") {
                    var stopStartTimes = "";
                    var stopEndTimes = "";
                } else {
                    var stopStartTimes = moment($("#stopStartTimes").val()).format('YYYYMMDDHHmmss')
                    var stopEndTimes = moment($("#stopEndTimes").val()).format('YYYYMMDDHHmmss')
                }
                params.fundgroupSubdatetimeRO = {
                    // acceptMode: this.acceptMode.join(),
                    acceptMode: this.acceptMode,
                    branchCode: branchCodes.split(','),
                    cooPreationMode: this.cooPreationMode,
                    fundgroupType: this.fundgroupType,
                    groupid: this.groupid,
                    stopEndTime: stopEndTimes,
                    stopStartTime: stopStartTimes,
                    stopStatus: this.stopStatus
                }
                params.operate = this.operate
                params.updateTime = moment(new Date().getTime()).format("YYYY-MM-DD HH:mm:ss");

                params.arrId = _this.arrId
                params.delete_flag = this.delete_flag
                $.post({
                    url: '/investmentMgmt/investmentStrategy/combinationProductHandle/serviceSave.ajax',
                    data: params,
                    success: function (result) {
                        if (result.error === 0) {
                            _this.getTableData(0, params.type);
                        }
                        _this.showDialog('revise', 'info', false, result.msg);
                    }
                });

            }
        },

        // 修改调仓里面是否新增调仓
        updateAddHose: function () {
            var _this = this;
            _this.updateList = true;
            _this.updateFundList = [];
            this.updataAdvise="";
            _this.isDisplayAdd="1";
            this.paramsList.forEach(function(item){
                item.fundgroupChangeDO.changeAdvise=item.fundgroupChangeDO.changeAdvise
            })
            if(_this.updateList==true){
                $(".changeAdvise,.isDisplay").attr("disabled","disabled").css("background-color","#eee");
            }
        },
        // 修改里面新增调仓添加调仓基金列表
        updateAddList: function () {
            var _this = this;
            _this.fundList=[];
            var fundDetails = this.updateFundList.map(function (item) {
                return {
                    fundId: item.fundId,
                    fundPercent: item.fundPercent,
                    fundApkind: item.fundApkind,
                    isUnderlyingCurrency:item.isUnderlyingCurrency
                };
            });
            if (_this.fundList.length === 0) {
                $.post({
                    url: '/investmentMgmt/investmentStrategy/combinationProductHandle/fundList.ajax',
                    data:{groupId:this.groupid},
                    success: function (result) {
                        if (result.error === 0) {
                            // _this.fundList = result.data.body;
                            // _this.fundList = result.data.body;
                            // if(_this.isInvestment=="N"){
                            //     _this.fundList = result.data.body.filter(function(item){
                            //         return item.source !== '2'
                            //     });
                            // }else{
                            // }
                            _this.fundList = result.data.body
                            // _this.fundAllIdList(_this.fundList);
                            _this.updateCheckStatus(fundDetails, _this.fundList);
                            _this.showDialog('houseUpdate', 'addFund', false);
                        }
                        else {
                            _this.fundList = [];
                            _this.showDialog('houseUpdate', 'addFund', true, result.msg);

                        }
                    }
                });
            } else {
                _this.updateCheckStatus(fundDetails, _this.fundList);
                _this.showDialog('houseUpdate', 'addFund', false);
            }
            if (this.updateFundList == null) {
                return
            } else {
                this.updateFundList.forEach(function (item) {
                    for (var i = 0; i < _this.updateFundList.length; i++) {
                        if (item.fundId === _this.updateFundList[i].fundId) {
                            _this.updateFundList[i].check = true;
                            break;
                        }
                    }
                });
            }
        },
        updateCheckStatus: function (fundDetails, list) {
            list.forEach(function (item) {
                item.fundPercent = '',
                    item.check = false;
            });
            fundDetails.forEach(function (item) {
                for (var i = 0; i < list.length; i++) {
                    if (item.fundId === list[i].fundId) {
                        list[i].check = true;
                        list[i].fundPercent = item.fundPercent;
                        list[i].fundApkind = item.fundApkind;
                        break;
                    }
                }
            });
            if (this.updateFundList == null) {
                return
            } else {
                this.updateFundList.forEach(function (item) {
                    for (var i = 0; i < list.length; i++) {
                        if (item.fundId === list[i].fundId) {
                            list[i].check = true;
                            break;
                        }
                    }
                });
            }
        },
        // 提交
        checkList: function () {
            var _this = this;
            this.updateFundList = this.fundList.filter(function (item) {
                return item.check;
            }).map(function (item) {
                return {
                    fundId: item.fundId,
                    fundName: item.fundName,
                    fundApkind: item.fundApkind || item.fundTypeForFundgroup,
                    fundPercent: item.fundPercent,
                    isUnderlyingCurrency:item.isUnderlyingCurrency
                };
            });
            if (this.updateFundList.length === 0) {
                this.showDialog('addFund', 'info', true, '未选择任何数据');
                return;
            }
            this.size = this.updateFundList.length;
            this.showDialog('addFund', 'houseUpdate', false);
        },
        // 删除添加的基金数据
        delList: function (index) {
            this.updateFundList.splice(index, 1)
            this.size--;
        },
        deleUpdateList: function () {
            var _this = this;
            _this.updateFundList = []
            _this.size = 0;
            _this.updateList = false;
            $('.changeAdvise,.isDisplay').removeAttr("disabled").css("background-color","#fff");
        },

        //点击修改业务数据(修改调仓)按钮保存到本地
        wareHouseUpdate: function (item,index) {
            var _this = this;
            _this.updateList = false;
            $('.changeAdvise,.isDisplay').removeAttr("disabled").css("background-color","#fff");
            this.operate = item.operate;
            this.mysqlId = item.mySQLId  //获取数据库表字段ID
            _this.updateFundList=[]
            _this.fundListAll = [];
            _this.serialno="";   //先清空
            // 判断业务接口数据与数据库有没有相同数据
            // if (this.type == 0) {
            //     if (this.arrId.indexOf(item.id.toString()) != -1) {
            //         _this.oneId = item.id
            //     } else {
            //         _this.oneId = ''
            //     }
            // }

            // 点击业务修改查询所有基本信息和调仓信息
            var params = {}
            params.groupId = item.groupId;

            //这一步请求只是获取 _this.isInvestment是否是投顾
            $.post({
                url: '/investmentMgmt/investmentStrategy/combinationProductHandle/details.ajax',   //单个基金信息
                data: {
                    groupId:item.groupId
                },
                success: function (result) {
                    if (result.error === 0) {
                        result.data.forEach(function(itemBasic){
                            _this.isInvestment=itemBasic.baseInfo.isInvestment;
                        })
                    }
                }
            });
            //
            $.post({
                url: '/investmentMgmt/investmentStrategy/combinationProductHandle/basicParam.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.paramsList = result.data.body;
                        if (!_this.paramsList) {
                            _this.showDialog('houseUpdate', 'info', true, '没有调仓记录');
                            return false;
                        }
                        // _this.fundgroupType = _this.paramsList[0].fundgroupChangeDO.fundgroupType;
                        // _this.groupid = _this.paramsList[0].fundgroupChangeDO.groupid;
                        // _this.groupname = _this.paramsList[0].fundgroupChangeDO.groupname;
                        // _this.grouptype = _this.paramsList[0].fundgroupChangeDO.grouptype;
                        // _this.strChangetime = _this.paramsList[0].fundgroupChangeDO.strChangetime;
                        // _this.strCreattime = _this.paramsList[0].fundgroupChangeDO.strCreattime;
                        // _this.onlinedate = _this.paramsList[0].fundgroupChangeDO.onlinedate;
                        // _this.stringEstablishDate = _this.paramsList[0].fundgroupChangeDO.stringEstablishDate;
                        // // _this.isDisplay =_this.paramsList[0].fundgroupChangeDO.isDisplay;
                        // // _this.reviseAdvise=_this.paramsList[0].fundgroupChangeDO.changeAdvise;
                        // _this.serialno = _this.paramsList[0].fundgroupChangeDO.serialno;
                        _this.fundgroupType = item.fundgroupType;
                        _this.groupid = item.groupId;
                        _this.groupname = item.groupName;
                        _this.grouptype = item.groupType;
                        _this.strChangetime = item.strChangetime;
                        _this.strCreattime = item.strCreattime;
                        _this.onlinedate = item.establishDate;

                        _this.isDisplay =_this.paramsList[0].fundgroupChangeDO.isDisplay;
                        _this.reviseAdvise=_this.paramsList[0].fundgroupChangeDO.changeAdvise;

                        var ArrTime = _this.paramsList[0].fundgroupChangeDO.createtime;
                        var fixZero = function (num) {
                            return num < 10 ? '0' + num : num;
                        };
                        _this.stringEstablishDate = [ArrTime [0], ArrTime[1], ArrTime[2], ArrTime[3], ArrTime[4], ArrTime[5]].map(function (value) {
                            return fixZero(value)
                        }).join('');

                        // _this.serialno = item.serialno;

                        // var adviseList=$(".changeAdvise");
                        // for(var i=0;i<adviseList.length;i++){
                        //
                        // }
                        // 展示调仓基金列表信息
                        // var arrDetailList = []
                        // _this.paramsList.forEach(function (item) {
                        //     _this.fundListAll.push(item)
                        // for (var j = 0; j < item.fundgroupChangeDetailList.length; j++) {
                        //     if (item.fundgroupChangeDetailList[j].fundPercent != 0) {
                        //         arrDetailList.push(item.fundgroupChangeDetailList[j])
                        //     }
                        // }
                        // })

                        // for (var i = 0; i < arrDetailList.length; i++) {
                        //     _this.fundListAll.push({
                        //         fundId: arrDetailList[i].fundid,
                        //         fundApkind: arrDetailList[i].fundApkind,  //产品类型
                        //         fundPercent: arrDetailList[i].fundPercent           //调整仓位
                        //     })
                        // }


                        // for(var i=0;i<_this.paramsList.length;i++){
                        //     for(var j=0;j<_this.paramsList[i].fundgroupChangeDetailList.length;j++){
                        //         if (_this.paramsList[i].fundgroupChangeDetailList[j].fundPercent != 0) {
                        //             _this.fundListAll.push({
                        //                 fundId: _this.paramsList[i].fundgroupChangeDetailList[j].fundid,
                        //                 fundApkind: _this.paramsList[i].fundgroupChangeDetailList[j].fundApkind,  //产品类型
                        //                 fundPercent: _this.paramsList[i].fundgroupChangeDetailList[j].fundPercent           //调整仓位
                        //             })
                        //         }
                        //     }
                        // }

                    }
                }
            });

            this.isDisplay = "";
            // 各种占比
            this.rightPercent = item.rightPercent                //权益类占比
            this.fixPercent = item.fixPercent           //固收类占比
            this.vaPercent = item.vaPercent          //货币类占比
            this.otherPercent = item.otherPercent     //其它占比

            // 添加基金信息
            // for (var i = 0; i < item.detailList.length; i++) {
            //     _this.fundListAll.push({
            //         fundId: item.detailList[i].fundId,
            //         fundApkind: item.detailList[i].fundApkind,  //产品类型
            //         fundPercent: item.detailList[i].fundPercent           //调整仓位
            //     })
            // }

            this.operate = item.operate
            this.delete_flag = item.delete_flag

            //修改弹窗里面获取组合类型数据
            _this.groupFundType();
            // 年龄段
            _this.agerangeList();

            this.showDialog('', 'houseUpdate');
        },
        changeList:function(item,itemIndex){
            var _this=this;
            // if(this.type==1){
            //     console.log(_this.serialno)
            //     this.reviseAdvise=this.reviseAdvise;
            // }else{
            //     this.reviseAdvise=item.fundgroupChangeDO.changeAdvise;
            // }
            var changeList=$(".changeAdvise")
            var isDisplay=$(".isDisplay")
            $.each(changeList,function (index,elements) {
                if(index==itemIndex){
                    this.disabled=false;
                    $(this).css("background-color","#fff");
                }else{
                    this.disabled=true;
                    $(this).css("background-color","#eee");
                }
            })
            $.each(isDisplay,function (index,elements) {
                if(index==itemIndex){
                    this.disabled=false;
                    $(this).css("background-color","#fff");
                }else{
                    this.disabled=true;
                    $(this).css("background-color","#eee");
                }
            })
            if(this.type==1&&_this.serialno==item.fundgroupChangeDO.serialno){
                this.reviseAdvise=this.reviseAdvise;
                this.isDisplay =this.isDisplay;
                this.serialno =this.serialno;
            }else{
                this.reviseAdvise=item.fundgroupChangeDO.changeAdvise;
                this.isDisplay =item.fundgroupChangeDO.isDisplay;
                this.serialno =item.fundgroupChangeDO.serialno;
            }
            // this.isDisplay =item.fundgroupChangeDO.isDisplay;
            console.log(_this.reviseAdvise)
            console.log(_this.isDisplay)
            console.log(_this.serialno)
        },
        serviceHouse: function () {
            var _this = this;
            var params = {};
            params.type = this.type;
            params.oneId = _this.oneId; //根据id插入或者修改数据
            // params.product = this.mysqlProduct;

            params.groupid = this.groupid;      //组合Id  A+四位数字
            params.fundgroupType = this.fundgroupType;
            params.groupname = this.groupname;
            params.grouptype = this.grouptype;
            // params.stringEstablishDate = moment(this.$refs.onlinedates.value).format("YYYYMMDDHHmmss");
            params.stringEstablishDate = _this.stringEstablishDate;
            params.onlinedate = this.onlinedate;

            // 修改调仓-只修改说明和是否显示
            params.changeAdvise = this.reviseAdvise;
            params.isDisplay = this.isDisplay;
            params.serialno =this.serialno;

            if(this.updateList==false){
                if(params.isDisplay==null){
                    _this.showDialog('houseUpdate', 'info', true, '请选择是否展示!');
                    return false;
                }
            }

            var cooPreationMode = ""; //合作模式变量
            var branchCodes = ""     //网点变量
            if (this.fundgroupType == "04") {
                cooPreationMode = this.cooPreationMode;       //合作模式;
            } else {
                cooPreationMode = "";
            }
            if (this.fundgroupType != "04") {
                branchCodes = "247";
            }else{
                if (cooPreationMode == "2" || cooPreationMode == "") {
                    // branchCodes = "247";
                    branchCodes += this.branchCode;        //2021-05-12新需求
                } else {
                    branchCodes += this.branchCode;       //网点
                }
            }

            // 各种占比
            var rightPercent = 0                 //权益类占比
            var fixPercent = 0            //固收类占比
            var vaPercent = 0           //货币类占比
            var otherPercent = 0;      //其它占比
            // 给基金占比赋值
            for (var x in this.updateFundList) {
                if (this.updateFundList[x].fundApkind === 'R') {
                    rightPercent += Number(this.updateFundList[x].fundPercent)
                    if (this.updateFundList[x].fundPercent == "") {
                        rightPercent = 0
                    }
                }
                if (this.updateFundList[x].fundApkind === 'F') {
                    fixPercent += Number(this.updateFundList[x].fundPercent)
                    if (this.updateFundList[x].fundPercent == "") {
                        fixPercent = 0
                    }
                }
                if (this.updateFundList[x].fundApkind === 'V') {
                    vaPercent += Number(this.updateFundList[x].fundPercent)
                    if (this.updateFundList[x].fundPercent == "") {
                        vaPercent = 0
                    }
                }
                if (this.updateFundList[x].fundApkind === 'O') {
                    otherPercent += Number(this.updateFundList[x].fundPercent)
                    if (this.updateFundList[x].fundPercent == "") {
                        otherPercent = 0
                    }
                }
            }
            if(_this.updateFundList.length>0){
                params.rightPercent =rightPercent;               //权益类占比
                params.fixPercent =fixPercent        //固收类占比
                params.vaPercent =vaPercent;        //货币类占比
                params.otherPercent =otherPercent;  //其它
            }else{
                params.rightPercent = this.rightPercent;               //权益类占比
                params.fixPercent = this.fixPercent        //固收类占比
                params.vaPercent = this.vaPercent;        //货币类占比
                params.otherPercent = this.otherPercent;  //其它
            }
            if (this.updateList==true) {             //当添加调仓
                if (_this.updateFundList=="") {
                    this.showDialog('houseUpdate', 'info', true, '当前调仓：请为当前组合添加基金');
                    return false;
                }
                var Percentage = 0;
                for (var i = 0; i < _this.updateFundList.length; i++) {
                    if (_this.updateFundList[i].fundPercent=="") {
                        this.showDialog('houseUpdate', 'info', true, '调整仓位不能为空');
                        return false;
                    }
                    Percentage +=_this.updateFundList[i].fundPercent*10000;
                }
                if (Percentage != "") {
                    if (Percentage/10000 != 100) {
                        this.showDialog('houseUpdate', 'info', true, '调整仓位总和不等于100%');
                        return false;
                    }
                }
                var fundgroupChangeDO = {
                    changeAdvise: this.updataAdvise,       //组合调仓说明（属于历史调仓里）
                    fundgroupType: this.fundgroupType,    //组合类型
                    groupid: this.groupid,          //组合ID
                    groupname: this.groupname,        //组合名称
                    grouptype: this.grouptype,        //组合风险类型已用(属组合成分里)
                    isDisplay: this.isDisplayAdd,    //新增字段-其他默认展示，用户可以选择不展示，前端页面控制展示“是”和“否”选择，后台传入“1“或“0“
                    strChangetime: moment(new Date().getTime()).format("YYYYMMDDHHmmss"),//调仓时间
                    strCreattime: moment(new Date().getTime()).format("YYYYMMDDHHmmss"),  //鼠标点击添加调仓按钮的操作时间(YYYYMMDDHHmmss)（隐藏式的）后面时间要大于前面时间  否者删除重新添加。
                    serialno: this.serialno,
                }

                var fundgroupChangeROList = []
                var fundgroupChangeDetailList = [];     //基金信息

                for (var i = 0; i < this.updateFundList.length; i++) {
                    fundgroupChangeDetailList.push({
                        groupid: this.groupid,
                        fundid: this.updateFundList[i].fundId,
                        fundApkind: this.updateFundList[i].fundApkind,  //产品类型
                        fundPercent: this.updateFundList[i].fundPercent,           //调整仓位
                        isUnderlyingCurrency: this.updateFundList[i].isUnderlyingCurrency
                    })
                }

                fundgroupChangeROList.push({
                    fundgroupChangeDO,
                    fundgroupChangeDetailList,
                })
            }
            params.fundgroupChangeROList = fundgroupChangeROList;

            params.operate = this.operate
            params.updateTime = moment(new Date().getTime()).format("YYYY-MM-DD HH:mm:ss");

            params.arrId = _this.arrId
            params.delete_flag = this.delete_flag;
            console.log("serviceSave:",params)
            if(_this.updateFundList.length>0){
                $("#serverSuccess").unbind('click').click(function(){
                    $.post({
                        url: '/investmentMgmt/investmentStrategy/combinationProductHandle/serviceSave.ajax',
                        data: params,
                        success: function (result) {
                            if (result.error === 0) {
                                _this.updateFundList=[];
                                _this.getTableData(0, params.type);
                            }
                            _this.showDialog('', 'info', false, result.msg);
                        }
                    });
                })
                _this.showDialog('houseUpdate', 'wareHouse', false, "确认只保存提交新增调仓数据！");
            }else {
                if (params.serialno == "") {
                    this.showDialog('houseUpdate', 'info', true, '未进行任何操作或者修改任何字段数据！');
                }else {
                    $("#serverSuccess").unbind('click').click(function () {
                        $.post({
                            url: '/investmentMgmt/investmentStrategy/combinationProductHandle/serviceSave.ajax',
                            data: params,
                            success: function (result) {
                                if (result.error === 0) {
                                    _this.updateFundList=[]
                                    _this.getTableData(0, params.type);
                                }
                                _this.showDialog('', 'info', false, result.msg);
                            }
                        });
                    })
                    _this.showDialog('houseUpdate', 'wareHouse', false, "确认只提交修改调仓字段数据！");
                }
            }
        },
        serverCancel:function(){
            var _this=this;
            _this.showDialog('wareHouse', 'houseUpdate');
        },

        //点击本地修改-修改调仓(针对业务数据里传过来的）
        changeList2:function(item,itemIndex){
            var _this=this;
            // if(this.type==1){
            //     console.log(_this.serialno)
            //     this.reviseAdvise=this.reviseAdvise;
            // }else{
            //     this.reviseAdvise=item.fundgroupChangeDO.changeAdvise;
            // }
            var changeList=$(".changeAdvise")
            var isDisplay=$(".isDisplay")
            $.each(changeList,function (index,elements) {
                if(index==itemIndex){
                    this.disabled=false;
                    $(this).css("background-color","#fff");
                }else{
                    this.disabled=true;
                    $(this).css("background-color","#eee");
                }
            })
            $.each(isDisplay,function (index,elements) {
                if(index==itemIndex){
                    this.disabled=false;
                    $(this).css("background-color","#fff");
                }else{
                    this.disabled=true;
                    $(this).css("background-color","#eee");
                }
            })
            if(this.type==1){
                if(_this.serialno==item.fundgroupChangeDO.serialno){
                    this.reviseAdvise=this.reviseAdvise;
                    this.isDisplay =this.isDisplay;
                    this.serialno =this.serialno;
                }
                if(_this.serialno!=item.fundgroupChangeDO.serialno){
                    this.reviseAdvise=item.fundgroupChangeDO.changeAdvise;
                    this.isDisplay =item.fundgroupChangeDO.isDisplay;
                    this.serialno =item.fundgroupChangeDO.serialno;
                }
            }
            // else{
            //     this.reviseAdvise=item.fundgroupChangeDO.changeAdvise;
            //     this.isDisplay =item.fundgroupChangeDO.isDisplay;
            //     this.serialno =item.fundgroupChangeDO.serialno;
            // }

            // this.isDisplay =item.fundgroupChangeDO.isDisplay;
            console.log(_this.reviseAdvise)
            console.log(_this.isDisplay)
            console.log(_this.serialno)

        },
        localHouse: function () {
            var _this = this;
            var params = {};
            params.type = this.type;
            params.oneId = _this.oneId; //根据id插入或者修改数据
            // params.product = this.mysqlProduct;
            params.mysqlId = this.mysqlId;

            params.groupid = this.groupid;      //组合Id  A+四位数字
            params.fundgroupType = this.fundgroupType;
            params.groupname = this.groupname;
            params.grouptype = this.grouptype;
            // params.stringEstablishDate = moment(this.$refs.onlinedates.value).format("YYYYMMDDHHmmss");
            params.onlinedate = this.onlinedate;
            params.stringEstablishDate = _this.stringEstablishDate;
            // params.stringEstablishDate = moment(this.onlinedate).format("YYYYMMDDHHmmss");

            // 修改调仓-只修改说明和是否显示
            params.changeAdvise = this.reviseAdvise;
            params.isDisplay = this.isDisplay;
            params.serialno = this.serialno;
            if(this.updateList==false) {
                if (params.isDisplay == null) {
                    _this.showDialog('houseUpdate', 'info', true, '请选择是否展示!');
                    return false;
                }
            }

            var cooPreationMode = ""; //合作模式变量
            var branchCodes = ""     //网点变量
            if (this.fundgroupType == "04") {
                cooPreationMode = this.cooPreationMode;       //合作模式;
            } else {
                cooPreationMode = "";
            }
            if (this.fundgroupType != "04") {
                branchCodes = "247";
            }else{
                if (cooPreationMode == "2" || cooPreationMode == "") {
                    // branchCodes = "247";
                    branchCodes += this.branchCode;        //2021-05-12新需求
                } else {
                    branchCodes += this.branchCode;       //网点
                }
            }
            // 各种占比
            var rightPercent = 0                 //权益类占比
            var fixPercent = 0            //固收类占比
            var vaPercent = 0           //货币类占比
            var otherPercent = 0;      //其它占比
            // 给基金占比赋值
            for (var x in this.updateFundList) {
                if (this.updateFundList[x].fundApkind === 'R') {
                    rightPercent += Number(this.updateFundList[x].fundPercent)
                    if (this.updateFundList[x].fundPercent == "") {
                        rightPercent = 0
                    }
                }
                if (this.updateFundList[x].fundApkind === 'F') {
                    fixPercent += Number(this.updateFundList[x].fundPercent)
                    if (this.updateFundList[x].fundPercent == "") {
                        fixPercent = 0
                    }
                }
                if (this.updateFundList[x].fundApkind === 'V') {
                    vaPercent += Number(this.updateFundList[x].fundPercent)
                    if (this.updateFundList[x].fundPercent == "") {
                        vaPercent = 0
                    }
                }
                if (this.updateFundList[x].fundApkind === 'O') {
                    otherPercent += Number(this.updateFundList[x].fundPercent)
                    if (this.updateFundList[x].fundPercent == "") {
                        otherPercent =0
                    }
                }
            }

            // params.rightPercent = rightPercent ||rightPercent;                //权益类占比
            // params.fixPercent = fixPercent || fixPercent;         //固收类占比
            // params.vaPercent = vaPercent || vaPercent;        //货币类占比
            // params.otherPercent = otherPercent ||otherPercent;  //其它
            if(_this.updateFundList.length>0){
                params.rightPercent =rightPercent;               //权益类占比
                params.fixPercent =fixPercent        //固收类占比
                params.vaPercent =vaPercent;        //货币类占比
                params.otherPercent =otherPercent;  //其它
            }else{
                params.rightPercent = this.rightPercent;               //权益类占比
                params.fixPercent = this.fixPercent        //固收类占比
                params.vaPercent = this.vaPercent;        //货币类占比
                params.otherPercent = this.otherPercent;  //其它
            }
            if (this.updateList==true) {
                if (_this.updateFundList=="") {
                    this.showDialog('houseUpdate', 'info', true, '当前调仓：请为当前组合添加基金');
                    return false;
                }
                var Percentage = 0;
                for (var i = 0; i < _this.updateFundList.length; i++) {
                    if (_this.updateFundList[i].fundPercent=="") {
                        this.showDialog('houseUpdate', 'info', true, '调整仓位不能为空');
                        return false;
                    }
                    Percentage +=_this.updateFundList[i].fundPercent*10000;
                }
                if (Percentage != "") {
                    if (Percentage/10000!= 100) {
                        this.showDialog('houseUpdate', 'info', true, '调整仓位总和不等于100%');
                        return false;
                    }
                }
                var fundgroupChangeDO = {
                    changeAdvise: this.updataAdvise,       //组合调仓说明（属于历史调仓里）
                    fundgroupType: this.fundgroupType,    //组合类型
                    groupid: this.groupid,          //组合ID
                    groupname: this.groupname,        //组合名称
                    grouptype: this.grouptype,        //组合风险类型已用(属组合成分里)
                    isDisplay: this.isDisplayAdd,    //新增字段-其他默认展示，用户可以选择不展示，前端页面控制展示“是”和“否”选择，后台传入“1“或“0“
                    strChangetime: moment(new Date().getTime()).format("YYYYMMDDHHmmss"),//调仓时间
                    strCreattime: moment(new Date().getTime()).format("YYYYMMDDHHmmss"),  //鼠标点击添加调仓按钮的操作时间(YYYYMMDDHHmmss)（隐藏式的）后面时间要大于前面时间  否者删除重新添加。
                    serialno: this.serialno,
                }

                var fundgroupChangeROList = []
                var fundgroupChangeDetailList = [];     //基金信息
                for (var i = 0; i < this.updateFundList.length; i++) {
                    fundgroupChangeDetailList.push({
                        groupid: this.groupid,
                        fundid: this.updateFundList[i].fundId,
                        fundApkind: this.updateFundList[i].fundApkind,  //产品类型
                        fundPercent: this.updateFundList[i].fundPercent,           //调整仓位
                        isUnderlyingCurrency: this.updateFundList[i].isUnderlyingCurrency,
                    })
                }
                fundgroupChangeROList.push({
                    fundgroupChangeDO,
                    fundgroupChangeDetailList,
                })
            }
            params.fundgroupChangeROList = fundgroupChangeROList;

            params.operate = this.operate
            params.updateTime = moment(new Date().getTime()).format("YYYY-MM-DD HH:mm:ss");

            params.arrId = _this.arrId
            params.delete_flag = this.delete_flag

            // $.post({
            //     url: '/investmentMgmt/investmentStrategy/combinationProductHandle/localHouse.ajax',
            //     data: params,
            //     success: function (result) {
            //         if (result.error === 0) {
            //             _this.getTableData(0, params.type);
            //         }
            //         _this.showDialog('houseUpdate', 'info', false, result.msg);
            //     }
            // });

            if(_this.updateFundList.length>0){
                console.log(params)
                console.log(params.type)
                $("#serverSuccess").unbind('click').click(function(){
                    $.post({
                        url: '/investmentMgmt/investmentStrategy/combinationProductHandle/localHouse.ajax',
                        data: params,
                        success: function (result) {
                            if (result.error === 0) {
                                _this.getTableData(0, params.type);
                            }
                            _this.showDialog('', 'info', false, result.msg);
                        }
                    });
                })
                _this.showDialog('houseUpdate', 'wareHouse', false, "确认只保存提交新增调仓数据！");
            }else {
                console.log(params)
                if (params.serialno == "") {
                    this.showDialog('houseUpdate', 'info', true, '未进行任何操作或者修改任何字段数据！');
                } else {
                    $("#serverSuccess").unbind('click').click(function () {
                        $.post({
                            url: '/investmentMgmt/investmentStrategy/combinationProductHandle/localHouse.ajax',
                            data: params,
                            success: function (result) {
                                if (result.error === 0) {
                                    _this.getTableData(0, params.type);
                                }
                                _this.showDialog('', 'info', false, result.msg);
                            }
                        });
                    })
                    _this.showDialog('houseUpdate', 'wareHouse', false, "确认只提交修改调仓字段数据！");
                }
            }
        },

        //本地数据撤销操作
        showRevoke: function (item) {
            var _this = this
            // var hasCheck = false;
            // 判断业务接口数据与数据库有没有相同数据
            // if (this.type == 0) {
            //     if (this.arrId.indexOf(item.id.toString()) != -1 && item.status == '0') {
            //         _this.oneId = item.id
            //     } else {
            //         _this.oneId = ''
            //     }
            // }

            this.itemData = JSON.stringify(item);

            this.id = item.id; //后端接口id
            this.mysqlId = item.mySQLId  //获取数据库表字段ID

            // this.fundgroupType = item.fundgroupType;
            // this.groupid = item.groupid;
            // this.groupname = item.groupname;
            // this.fundgroupDesc = item.fundgroupNewFundgroupDO.fundgroupDesc;
            // this.fundgroupAdvise = item.fundgroupNewFundgroupDO.fundgroupAdvise;
            // this.proPageurl = item.fundgroupNewFundgroupDO.proPageurl;
            // this.normalPageurl = item.fundgroupNewFundgroupDO.normalPageurl;
            // this.stopStatus = item.fundgroupSubdatetimeRO.stopStatus;
            // this.grouptype = item.fundgroupNewFundgroupDO.grouptype;
            // this.risklevel = item.fundgroupNewFundgroupDO.risklevel;
            // this.ageRange = item.fundgroupNewFundgroupDO.ageRange;
            // this.acceptMode = item.fundgroupSubdatetimeRO.acceptMode;
            // this.cooPreationMode = item.fundgroupSubdatetimeRO.cooPreationMode;
            // this.initamount = item.fundgroupNewFundgroupDO.initamount;
            // this.sofarYield = item.fundgroupNewFundgroupDO.sofarYield;
            // this.branchCode = item.fundgroupSubdatetimeRO.branchCode[0];
            // this.commro = item.fundgroupNewFundgroupDO.commro;
            // this.minRedeemAmount = item.fundgroupNewFundgroupDO.minRedeemAmount;
            // this.minChangeAmount = item.fundgroupNewFundgroupDO.minChangeAmount;
            // this.minReserveAmount = item.fundgroupNewFundgroupDO.minReserveAmount;
            // this.reviseAdvise = item.fundgroupChangeROList[0].fundgroupChangeDO.changeAdvise;
            // this.strChangetime = item.fundgroupChangeROList[0].fundgroupChangeDO.strChangetime;
            // this.strCreattime = item.fundgroupChangeROList[0].fundgroupChangeDO.strCreattime;
            // this.stringEstablishDate = item.stringEstablishDate;
            // this.stopStartTime = item.fundgroupSubdatetimeRO.stopStartTime;
            // this.stopEndTime = item.fundgroupSubdatetimeRO.stopEndTime;
            // this.displayDate = item.fundgroupNewFundgroupDO.displayDate;
            // this.isDisplay = item.fundgroupChangeROList[0].fundgroupChangeDO.isDisplay;
            // this.onlinedate = item.onlinedate;
            //
            // if (this.stopStatus != 0) {     //暂停截止时间的展示
            //     _this.isTime = true;
            // } else {
            //     _this.isTime = false;
            // }
            // if (this.fundgroupType == "04") {
            //     if (this.cooPreationMode != "2") {
            //         _this.isCode = true;
            //     } else {
            //         _this.isCode = false;
            //     }
            // } else {
            //     _this.isCode = false;
            // }
            // item.fundgroupChangeROList.forEach(function (item) {
            //     for (var i = 0; i < item.fundgroupChangeDetailList.length; i++) {
            //         _this.fundListAll.push({
            //             fundId: item.fundgroupChangeDetailList[i].fundId,
            //             fundApkind: item.fundgroupChangeDetailList[i].fundApkind,  //产品类型
            //             fundPercent: item.fundgroupChangeDetailList[i].fundPercent           //调整仓位
            //         })
            //     }
            // })

            this.operate = item.operate

            this.showDialog('', 'del2');
        },
        deleteUser2: function () {
            var _this = this;
            // var params = {};
            var params = JSON.parse(this.itemData);
            params.type = this.type;//状态参数
            params.myqsql = this.mysqlId; //数据表字段id
            params.oneId = this.oneId; //根据id插入或者修改数据
            params.operator = this.operator

            // params.groupid = this.groupid;      //组合Id  A+四位数字
            // params.fundgroupType = this.fundgroupType;
            // params.groupname = this.groupname;
            // params.grouptype = this.grouptype;
            // params.stringEstablishDate = moment(this.$refs.onlinedates.value).format("YYYYMMDDHHmmss");
            // params.onlinedate = moment(this.$refs.onlinedates.value).format("YYYYMMDD");
            //
            // var cooPreationMode = ""; //合作模式变量
            // var branchCodes = ""     //网点变量
            // if (this.fundgroupType == "04") {
            //     cooPreationMode = this.cooPreationMode;       //合作模式;
            // } else {
            //     cooPreationMode = "";
            // }
            // if (cooPreationMode == "2" || cooPreationMode == "") {
            //     branchCodes = "247";
            // } else {
            //     branchCodes += this.branchCode;       //网点
            // }
            // // 各种占比
            // var rightPercent = 0                 //权益类占比
            // var fixPercent = 0            //固收类占比
            // var vaPercent = 0           //货币类占比
            // var otherPercent = 0;      //其它占比
            // // 给基金占比赋值
            // for (var x in this.fundListAll) {
            //     if (this.fundListAll[x].fundApkind === 'R') {
            //         rightPercent += Number(this.fundListAll[x].fundPercent)
            //         if (this.fundListAll[x].fundListAll == "") {
            //             rightPercent = 0
            //         }
            //     }
            //     if (this.fundListAll[x].fundApkind === 'F') {
            //         fixPercent += Number(this.fundListAll[x].fundPercent)
            //         if (this.fundListAll[x].fundPercent == "") {
            //             fixPercent = 0
            //         }
            //     }
            //     if (this.fundListAll[x].fundApkind === 'V') {
            //         vaPercent += Number(this.fundListAll[x].fundPercent)
            //         if (this.fundListAll[x].fundPercent == "") {
            //             vaPercent = 0
            //         }
            //     }
            //     if (this.fundListAll[x].fundApkind === 'O') {
            //         otherPercent += Number(this.fundListAll[x].fundPercent)
            //         if (this.fundListAll[x].fundPercent == "") {
            //             otherPercent = 0
            //         }
            //     }
            // }
            // params.rightPercent = rightPercent;                //权益类占比
            // params.fixPercent = fixPercent;         //固收类占比
            // params.vaPercent = vaPercent;        //货币类占比
            // params.otherPercent = otherPercent;  //其它
            //
            // var fundgroupChangeDO = {
            //     changeAdvise: this.reviseAdvise,       //组合调仓说明（属于历史调仓里）
            //     fundgroupType: this.fundgroupType,    //组合类型
            //     groupid: this.groupid,          //组合ID
            //     groupname: this.groupname,        //组合名称
            //     grouptype: this.grouptype,        //组合风险类型已用(属组合成分里)
            //     isDisplay: this.isDisplay,    //新增字段-其他默认展示，用户可以选择不展示，前端页面控制展示“是”和“否”选择，后台传入“1“或“0“
            //     strChangetime: this.strChangetime,//调仓时间
            //     strCreattime: this.strCreattime,  //鼠标点击添加调仓按钮的操作时间(YYYYMMDDHHmmss)（隐藏式的）后面时间要大于前面时间  否者删除重新添加。
            // }
            //
            // var fundgroupChangeDetailList = [];     //基金信息
            // for (var i = 0; i < this.fundListAll.length; i++) {
            //     fundgroupChangeDetailList.push({
            //         groupid: this.groupid,
            //         fundId: this.fundListAll[i].fundId,
            //         fundApkind: this.fundListAll[i].fundApkind,  //产品类型
            //         fundPercent: this.fundListAll[i].fundPercent           //调整仓位
            //     })
            // }
            // var fundgroupChangeROList = []
            // fundgroupChangeROList.push({
            //     fundgroupChangeDO,
            //     fundgroupChangeDetailList,
            // })
            //
            // params.fundgroupChangeROList = fundgroupChangeROList;
            // params.fundgroupNewFundgroupDO = {
            //     ageRange: this.ageRange,      //组合年临段已用(属基本信息)
            //     commro: this.commro,         //组合费率折扣已用(属组合成分里)
            //     displayDate: moment(this.$refs.displayDates.value).format("YYYYMMDD"),   //用于控制搜索展示，需要前端让营运人员输入
            //     fundgroupAdvise: this.fundgroupAdvise,    // 组合智投建议已用(属基本信息)
            //     fundgroupDesc: this.fundgroupDesc,     // 组合建议已用(属基本信息)
            //     fundgroupType: this.fundgroupType,    // 组合类型已用(属基本信息)
            //     groupid: this.groupid,          // 组合ID已用(属基本信息)
            //     groupname: this.groupname,       //组合名称已用(属基本信息)
            //     grouptype: this.grouptype,       //组合风险类型已用(属组合成分里)
            //     initamount: this.initamount,             //组合起投金额已用(属组合成分里)
            //     minChangeAmount: this.minChangeAmount,         // 组合最低调仓金额已用(属组合成分里)
            //     minRedeemAmount: this.minRedeemAmount,         //组合最低赎回金额已用(属组合成分里)
            //     minReserveAmount: this.minReserveAmount,        //组合最低持有金额已用(属组合成分里)
            //     normalPageurl: this.normalPageurl,  //组合小白版宣传页已用(属基本信息)
            //     onlinedate: moment(this.$refs.onlinedates.value).format("YYYYMMDD"),    //组合上线日期也就是成立日期----也属于成立日期(YYYYMMDD) 8位
            //     onlinetime: moment(this.$refs.onlinedates.value).format("HHmmss"),   //成立日期的时间 (hhmmss)6位
            //     proPageurl: this.proPageurl,   //组合专业版宣传页已用(属基本信息)
            //     risklevel: this.risklevel,    //组合风险等级已用(属组合成分里)
            //     sofarYield: this.sofarYield,         //组合历史年化收益率已用(属基本信息)
            //     stringEstablishDate: moment(this.$refs.onlinedates.value).format("YYYYMMDD"),   //成立调仓日期和成立日期一样，都为YYYYMMDD补上6个000000  默认开始不能选择操作
            // }
            // params.fundgroupSubdatetimeRO = {
            //     acceptMode: this.acceptMode,
            //     branchCode: branchCodes.split(','),
            //     cooPreationMode: this.cooPreationMode,
            //     fundgroupType: this.fundgroupType,
            //     groupid: this.groupid,
            //     stopEndTime: moment(this.$refs.stopEndTimes.value).format('YYYYMMDDHHmmss'),
            //     stopStartTime: moment(this.$refs.stopStartTimes.value).format('YYYYMMDDHHmmss'),
            //     stopStatus: this.stopStatus
            // }

            params.operate = this.operate

            $.post({
                url: '/investmentMgmt/investmentStrategy/combinationProductHandle/deleteLocal.ajax',
                data: params,
                traditional: true,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(0, params.type);
                    }
                    _this.showDialog('del2', 'info', false, result.msg);
                }
            });
        },

        //删除业务数据保存到本地
        showDelete: function (item) {
            var _this = this
            // var hasCheck = false;
            // 判断业务接口数据与数据库有没有相同数据
            // if (this.type == 0) {
            //     if (this.arrId.indexOf(item.id.toString()) != -1 && item.status == '0') {
            //         _this.oneId = item.id
            //     } else {
            //         _this.oneId = ''
            //     }
            // }

            // this.id = item.id; //后端接口id
            // this.mysqlId = item.mySQLId  //获取数据库表字段ID
            // this.mysqlProduct = item.product; //为mysql执行修改传值

            this.serialno = item.serialno;
            this.groupid = item.groupid;
            this.actionType = item.actionType;
            this.startDate = $("#startDates").val(item.startDate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3') + ' ' + item.startTime.replace(/(\d{2})(\d{2})(\d{2})/, '$1:$2:$3'));
            this.startTime = item.startTime;
            this.endDate = $("#endDates").val(item.endDate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3') + ' ' + item.endTime.replace(/(\d{2})(\d{2})(\d{2})/, '$1:$2:$3'));
            this.endTime = item.endTime;
            this.operate = item.operate
            this.delete_flag = item.delete_flag

            this.showDialog('', 'del');
        }
        ,
        deleteUser: function () {
            var _this = this;
            // var ids= [];
            // for (var i = 0; i < this.tableData.length; i++) {
            //     if (this.tableData[i].check) {
            //         ids.push(this.tableData[i].id);
            //     }
            // }
            var params = {};
            params.type = this.type;//状态参数
            // params.myqsql = this.mysqlId; //数据表字段id
            // params.oneId =_this.oneId; //根据id插入或者修改数据


            params.serialno = this.serialno;
            params.product = this.mysqlProduct;
            params.groupid = this.groupid;
            params.actionType = this.actionType;
            params.startDate = moment(this.$refs.startDates.value).format('YYYYMMDD');
            params.startTime = moment(this.$refs.startDates.value).format("HHmmss");
            params.endDate = moment(this.$refs.endDates.value).format('YYYYMMDD');
            params.endTime = moment(this.$refs.endDates.value).format("HHmmss");

            params.operate = this.operate

            $.post({
                url: '/investmentMgmt/investmentStrategy/combinationProductHandle/deleteParam.ajax',

                data: params,
                traditional: true,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(0, params.type);
                    }
                    _this.showDialog('del', 'info', false, result.msg);
                }
            });
        }
        ,

        // 重新提交
        showSubmitAgain: function (item) {
            var _this = this;
            // var hasCheck = false;
            _this.fundListAll = []
            this.operate = item.operate;

            this.operate = item.operate
            this.delete_flag = item.delete_flag
            // if (this.operate == 3) {
            //     this.showDialog('', 'delAgain');
            //
            // } else if ((this.operate != 3)) {
            //     this.showDialog('', 'revise');
            // }
            if (item.operate == 1) {
                //修改弹窗里面获取组合类型数据
                _this.groupFundType();
                // 年龄段
                _this.agerangeList();
                this.mysqlId = item.mySQLId  //获取数据库表字段ID
                this.fundgroupType = item.fundgroupType;
                this.groupid = item.groupid;
                this.groupname = item.groupname;
                this.fundgroupDesc = item.fundgroupNewFundgroupDO.fundgroupDesc;
                this.targetContract = item.fundgroupNewFundgroupDO.targetContract;
                this.strategyMode = item.fundgroupNewFundgroupDO.strategyMode;
                this.fundgroupAdvise = item.fundgroupNewFundgroupDO.fundgroupAdvise;
                this.proPageurl = item.fundgroupNewFundgroupDO.proPageurl;
                // this.normalPageurl = item.fundgroupNewFundgroupDO.normalPageurl;
                this.stopStatus = item.fundgroupSubdatetimeRO.stopStatus;
                this.grouptype = item.fundgroupNewFundgroupDO.grouptype;
                this.risklevel = item.fundgroupNewFundgroupDO.risklevel;
                this.ageRange = item.fundgroupNewFundgroupDO.ageRange;
                this.acceptMode = item.fundgroupSubdatetimeRO.acceptMode;
                this.cooPreationMode = item.fundgroupSubdatetimeRO.cooPreationMode;
                // 网点号
                this.branchCode = item.fundgroupSubdatetimeRO.branchCode;
                this.dataSummary2(this.branchCodeList, 'value', 'label', 'branchCode', this.branchCode);
                this.initamount = item.fundgroupNewFundgroupDO.initamount;
                // this.sofarYield = item.fundgroupNewFundgroupDO.sofarYield;
                // this.branchCode=item.fundgroupSubdatetimeRO.branchCode[0];
                this.commro = item.fundgroupNewFundgroupDO.commro;
                this.minRedeemAmount = item.fundgroupNewFundgroupDO.minRedeemAmount;
                this.minChangeAmount = item.fundgroupNewFundgroupDO.minChangeAmount;
                this.minReserveAmount = item.fundgroupNewFundgroupDO.minReserveAmount;
                this.rightLimit = item.fundgroupNewFundgroupDO.rightLimit;
                this.largeRedemptionPercent = item.fundgroupNewFundgroupDO.largeRedemptionPercent;
                this.changeAdvise = item.fundgroupChangeROList[0].fundgroupChangeDO.changeAdvise;
                this.reviseAdvise = item.fundgroupChangeROList[0].fundgroupChangeDO.changeAdvise;
                this.strChangetime = item.fundgroupChangeROList[0].fundgroupChangeDO.strChangetime;
                this.strCreattime = item.fundgroupChangeROList[0].fundgroupChangeDO.strCreattime;
                this.stringEstablishDate = item.stringEstablishDate;
                this.stopStartTime = $("#stopStartTime").val(item.fundgroupSubdatetimeRO.stopStartTime);
                this.stopEndTime = $("#stopEndTime").val(item.fundgroupSubdatetimeRO.stopEndTime);
                // this.displayDate = item.fundgroupNewFundgroupDO.displayDate;
                this.isDisplay = item.fundgroupChangeROList[0].fundgroupChangeDO.isDisplay;
                this.onlinedate = item.onlinedate;
                this.status = item.fundgroupNewFundgroupDO.status;
                // var displayDate = item.fundgroupNewFundgroupDO.displayDate;
                var stringEstablishDate = moment(item.stringEstablishDate).format("YYYY-MM-DD HH:mm:ss");
                $("#onlinedate").val(item.onlinedate)
                // $("#displayDate").val(displayDate)
                $("#stringEstablishDate").val(stringEstablishDate)
                this.isInvestment = item.fundgroupNewFundgroupDO.isInvestment;
                this.fundgroupFeature = item.fundgroupNewFundgroupDO.fundgroupFeature;              //2020.09.28 组合投资特点
                this.investmentServicePerc = item.fundgroupNewFundgroupDO.investmentServicePerc;    //2020.09.28 投顾服务费率
                this.recommendReason = item.fundgroupNewFundgroupDO.recommendReason;
                this.recommendHoldTime = item.fundgroupNewFundgroupDO.recommendHoldTime;

                this.rightMaxratePerc=item.fundgroupNewFundgroupDO.rightMaxratePerc ?  item.fundgroupNewFundgroupDO.rightMaxratePerc : '';        //权益类基金占比不超过
                this.turnoverRatePerc=item.fundgroupNewFundgroupDO.turnoverRatePerc ?  item.fundgroupNewFundgroupDO.turnoverRatePerc : '';        //账户换手率
                this.singlevalueCustmaxPerc=item.fundgroupNewFundgroupDO.singlevalueCustmaxPerc ?  item.fundgroupNewFundgroupDO.singlevalueCustmaxPerc : ''; // 单只基金市值不得超过客户账户资产净值
                this.categoryunitGroupmaxPerc=item.fundgroupNewFundgroupDO.categoryunitGroupmaxPerc ?  item.fundgroupNewFundgroupDO.categoryunitGroupmaxPerc : '';  // 同策略持有基金份额不得超过该基金总份额占比
                this.singleunitGroupmaxPerc=item.fundgroupNewFundgroupDO.singleunitGroupmaxPerc ?  item.fundgroupNewFundgroupDO.singleunitGroupmaxPerc : '';   // 持有单只指数基金的份额总和不得超过该基金总份额的
                this.rightMinratePerc=item.fundgroupNewFundgroupDO.rightMinratePerc?item.fundgroupNewFundgroupDO.rightMinratePerc:''; //权益类基金占净值比不低于
                this.valueMinratePerc=item.fundgroupNewFundgroupDO.valueMinratePerc?item.fundgroupNewFundgroupDO.valueMinratePerc:'' //债券基金占净值比不低于
                this.valueMaxratePerc=item.fundgroupNewFundgroupDO.valueMaxratePerc?item.fundgroupNewFundgroupDO.valueMaxratePerc:'';  //债券基金占净值比不超过
                this.isBlacklist=item.fundgroupNewFundgroupDO.isBlacklist?item.fundgroupNewFundgroupDO.isBlacklist:''; //是否禁投公司黑名单内基金
                this.isTradeLimit=item.fundgroupNewFundgroupDO.isTradeLimit?item.fundgroupNewFundgroupDO.isTradeLimit:''; //是否禁投流通受限基金
                this.investRiskLevel=item.fundgroupNewFundgroupDO.investRiskLevel ?  item.fundgroupNewFundgroupDO.investRiskLevel : '';     //投顾风险等级

                this.investType=item.fundgroupNewFundgroupDO.investType ?  item.fundgroupNewFundgroupDO.investType : '';       //投顾类型
                this.investCustomers=this.investType==='G' ?  item.fundgroupNewFundgroupDO.investCustomers : '';       //投顾组合客户
                this.investPrincipal=this.investType==='G' ?  item.fundgroupNewFundgroupDO.investPrincipal : '';       //名义本金
                this.investDuration=this.investType==='G' ?  item.fundgroupNewFundgroupDO.investDuration : '';       //投资时长

                this.categoryDescDoc=item.fundgroupNewFundgroupDO.categoryDescDoc ?  item.fundgroupNewFundgroupDO.categoryDescDoc : '';        //策略说明书
                this.riskDescDoc=item.fundgroupNewFundgroupDO.riskDescDoc ?  item.fundgroupNewFundgroupDO.riskDescDoc : '';        //风险揭示书
                this.investDescDoc=item.fundgroupNewFundgroupDO.investDescDoc ?  item.fundgroupNewFundgroupDO.investDescDoc : '';        //投顾协议

                this.categoryDescDisplay=item.fundgroupNewFundgroupDO.categoryDescDisplay ?  item.fundgroupNewFundgroupDO.categoryDescDisplay : ''; //策略说明书文案
                this.riskDescDisplay=item.fundgroupNewFundgroupDO.riskDescDisplay ?  item.fundgroupNewFundgroupDO.riskDescDisplay : '';        //风险揭示书文案
                this.investDescDisplay=item.fundgroupNewFundgroupDO.investDescDisplay ?  item.fundgroupNewFundgroupDO.investDescDisplay : '';        //投顾协议文案

                this.isTime = this.stopStatus != 0;
                if (this.fundgroupType == "04") {
                    this.isCode = this.cooPreationMode != "2";
                } else {
                    this.isCode = false;
                }
                var ArrRoList = []
                ArrRoList.push(item.fundgroupChangeROList[0])
                for (var i = 0; i < ArrRoList.length; i++) {
                    for (var j = 0; j < ArrRoList[i].fundgroupChangeDetailList.length; j++) {
                        this.fundListAll.push({
                            fundId: ArrRoList[i].fundgroupChangeDetailList[j].fundid,
                            fundName: ArrRoList[i].fundgroupChangeDetailList[j].fundName,
                            fundApkind: ArrRoList[i].fundgroupChangeDetailList[j].fundApkind,  //产品类型
                            fundPercent: ArrRoList[i].fundgroupChangeDetailList[j].fundPercent,           //调整仓位
                            optionalFundList: ArrRoList[i].fundgroupChangeDetailList[j].optionalFundList,           //备选基金
                            isUnderlyingCurrency: ArrRoList[i].fundgroupChangeDetailList[j].isUnderlyingCurrency,
                        })
                    }
                }
                this.fundHistory = this.fundListAll;
                this.htmlList = item.fundgroupChangeROList.slice(1).map(function(item, index){
                    $('.strChangetimes').eq(index).val(moment(item.fundgroupChangeDO.strChangetime).format("YYYY-MM-DD HH:mm:ss"));
                    return {
                        changeAdvises: item.fundgroupChangeDO.changeAdvise,
                        strChangetimes: item.fundgroupChangeDO.strChangetime,
                        isDisplays: item.fundgroupChangeDO.isDisplay,
                        list: item.fundgroupChangeDetailList.map(function(item){
                            item.fundId = item.fundid;
                            return item;
                        }),
                        strCreattime: moment(item.fundgroupChangeDO.strCreattime).format("YYYYMMDDHHmmss")
                    };
                });
                setTimeout(function(){
                    item.fundgroupChangeROList.slice(1).forEach(function(item, index){
                        $('.strChangetimes').eq(index).val(moment(item.fundgroupChangeDO.strChangetime).format("YYYY-MM-DD HH:mm:ss"));
                    });
                },0);
                this.showDialog('', 'add');
            } else if (item.operate == 2) {
                if (item.fundgroupNewFundgroupDO) {
                    this.operate = item.operate;
                    this.mysqlId = item.mySQLId  //获取数据库表字段ID

                    this.fundgroupType = item.fundgroupNewFundgroupDO.fundgroupType;
                    this.groupid = item.fundgroupNewFundgroupDO.groupid;
                    this.groupname = item.fundgroupNewFundgroupDO.groupname;
                    this.fundgroupDesc = item.fundgroupNewFundgroupDO.fundgroupDesc;
                    this.targetContract = item.fundgroupNewFundgroupDO.targetContract;
                    this.strategyMode = item.fundgroupNewFundgroupDO.strategyMode;
                    this.fundgroupAdvise = item.fundgroupNewFundgroupDO.fundgroupAdvise;
                    this.proPageurl = item.fundgroupNewFundgroupDO.proPageurl;
                    // this.normalPageurl = item.fundgroupNewFundgroupDO.normalPageurl;
                    this.grouptype = item.fundgroupNewFundgroupDO.grouptype;
                    this.risklevel = item.fundgroupNewFundgroupDO.risklevel;
                    this.ageRange = item.fundgroupNewFundgroupDO.ageRange;
                    this.initamount = item.fundgroupNewFundgroupDO.initamount;
                    // this.sofarYield = item.fundgroupNewFundgroupDO.sofarYield;
                    this.commro = item.fundgroupNewFundgroupDO.commro;
                    this.minRedeemAmount = item.fundgroupNewFundgroupDO.minRedeemAmount;
                    this.minChangeAmount = item.fundgroupNewFundgroupDO.minChangeAmount;
                    this.minReserveAmount = item.fundgroupNewFundgroupDO.minReserveAmount;
                    this.rightLimit = item.fundgroupNewFundgroupDO.rightLimit;
                    this.largeRedemptionPercent = item.fundgroupNewFundgroupDO.largeRedemptionPercent;
                    this.reviseAdvise = item.changeAdvise;
                    this.stringEstablishDate = item.fundgroupNewFundgroupDO.stringEstablishDate;
                    // this.displayDate = item.fundgroupNewFundgroupDO.displayDate;
                    // $("#displayDates").val(item.fundgroupNewFundgroupDO.displayDate)
                    this.status = item.fundgroupNewFundgroupDO.status;
                    this.isInvestment = item.fundgroupNewFundgroupDO.isInvestment;
                    this.fundgroupFeature=item.fundgroupNewFundgroupDO.fundgroupFeature;  //2020.09.28 组合投资特点
                    this.investmentServicePerc=item.fundgroupNewFundgroupDO.investmentServicePerc;////2020.09.28 投顾服务费率
                    this.branchCode = item.fundgroupSubdatetimeRO.branchCode;
                    this.acceptMode = item.fundgroupSubdatetimeRO.acceptMode;
                    this.cooPreationMode = item.fundgroupSubdatetimeRO.cooPreationMode;
                    // this.stopStartTime = item.fundgroupSubdatetimeRO.stopStartTime;
                    // this.stopEndTime = item.fundgroupSubdatetimeRO.stopEndTime;
                    this.stopStartTime =$("#stopStartTimes").val(item.fundgroupSubdatetimeRO.stopStartTime);
                    this.stopEndTime =$("#stopEndTimes").val(item.fundgroupSubdatetimeRO.stopEndTime);
                    this.stopStatus = item.fundgroupSubdatetimeRO.stopStatus;

                    this.serialno = item.fundgroupNewFundgroupDO.serialno;

                    this.isDisplay = 0;
                    // this.onlinedate = item.onlinedate.replace(/(\d{4})(\d{2})(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1$2$3$4$5$6');
                    // this.onlinedate = item.fundgroupNewFundgroupDO.onlinedate;
                    this.onlinedate = item.fundgroupNewFundgroupDO.onlinedate;
                    $("#onlinedates").val(item.fundgroupNewFundgroupDO.onlinedate)
                    this.onlinetime = item.fundgroupNewFundgroupDO.onlinetime;

                    this.onlinetime = item.fundgroupNewFundgroupDO.onlinetime;
                    this.recommendReason = item.fundgroupNewFundgroupDO.recommendReason;
                    this.recommendHoldTime = item.fundgroupNewFundgroupDO.recommendHoldTime;
                    // this.cooPreationMode = "2";
                    //渠道多选条件
                    // var acceptMode = [{'value': "0", "name": "柜台"}, {'value': "2", "name": "网上"}, {
                    //     'value': "6",
                    //     "name": "第三方"
                    // }, {'value': "7", "name": "企业版"}]
                    // _this.dataSummary(acceptMode, 'value', 'label', 'acceptModes', this.acceptMode);

                    // 网点号
                    this.branchCode = item.fundgroupSubdatetimeRO.branchCode;
                    _this.dataSummary2(_this.branchCodeList, 'value', 'label', 'branchCodes',this.branchCode);

                    this.cooPreationMode = item.fundgroupSubdatetimeRO.cooPreationMode;

                    // 各种占比
                    this.rightPercent = item.rightPercent                //权益类占比
                    this.fixPercent = item.fixPercent           //固收类占比
                    this.vaPercent = item.vaPercent          //货币类占比
                    this.otherPercent = item.otherPercent     //其它占比

                    if (this.stopStatus != 0) {     //暂停截止时间的展示
                        _this.isTime = true;
                    } else {
                        _this.isTime = false;
                    }
                    if (this.fundgroupType == "04") {
                        _this.isCode = true;
                        // if (this.cooPreationMode != "2") {
                        //     _this.isCode = true;
                        // } else {
                        //     _this.isCode = false;
                        // }
                    } else {
                        _this.isCode = false;
                    }
                    this.service_id = item.service_id
                    this.operate = item.operate
                    this.delete_flag = item.delete_flag

                    //修改弹窗里面获取组合类型数据
                    _this.groupFundType();
                    // 年龄段
                    _this.agerangeList();
                    this.showDialog('', 'revise');
                } else {
                    var _this = this;
                    _this.updateList = false;
                    _this.updataAdvise="";
                    _this.isDisplayAdd=""
                    // 每次点击重新设置disabled
                    var changeAdvise=$(".changeAdvise")
                    $.each(changeAdvise,function (index,elements) {
                        this.disabled=false;
                        $(this).css("background-color","#fff");
                    })
                    var isDisplay=$(".isDisplay")
                    $.each(isDisplay,function (index,elements) {
                        this.disabled=false;
                        $(this).css("background-color","#fff");
                    })

                    this.operate = item.operate;
                    this.mysqlId = item.mySQLId  //获取数据库表字段ID
                    _this.fundListAll = []
                    // 判断业务接口数据与数据库有没有相同数据
                    // if (this.type == 0) {
                    //     if (this.arrId.indexOf(item.id.toString()) != -1) {
                    //         _this.oneId = item.id
                    //     } else {
                    //         _this.oneId = ''
                    //     }
                    // }

                    // 点击业务修改查询所有基本信息和调仓信息
                    var params = {}
                    params.groupId = item.groupid;
                    $.post({
                        url: '/investmentMgmt/investmentStrategy/combinationProductHandle/basicParam.ajax',
                        data: params,
                        success: function (result) {
                            if (result.error === 0) {
                                _this.paramsList = result.data.body;

                                // var arrList=[];
                                // arrList.push({
                                //     fundgroupChangeDO:'',
                                //     fundgroupChangeROList:item.fundgroupChangeROList
                                // })
                                // _this.paramsList.push(arrList)

                                if (!_this.paramsList) {
                                    _this.showDialog('houseUpdate', 'info', true, '没有调仓记录');
                                    return false;
                                }
                                // _this.fundgroupType = _this.paramsList[0].fundgroupChangeDO.fundgroupType;
                                // _this.groupid = _this.paramsList[0].fundgroupChangeDO.groupid;
                                // _this.groupname = _this.paramsList[0].fundgroupChangeDO.groupname;
                                // _this.grouptype = _this.paramsList[0].fundgroupChangeDO.grouptype;
                                // _this.strChangetime = _this.paramsList[0].fundgroupChangeDO.strChangetime;
                                // _this.strCreattime = _this.paramsList[0].fundgroupChangeDO.strCreattime;
                                // _this.onlinedate = _this.paramsList[0].fundgroupChangeDO.onlinedate;
                                // _this.stringEstablishDate = _this.paramsList[0].fundgroupChangeDO.stringEstablishDate;
                                // // _this.isDisplay =_this.paramsList[0].fundgroupChangeDO.isDisplay;
                                // _this.reviseAdvise=_this.paramsList[0].fundgroupChangeDO.changeAdvise;
                                _this.serialno = item.serialno;

                                _this.fundgroupType = item.fundgroupType;
                                _this.groupid = item.groupid;
                                _this.groupname = item.groupname;
                                _this.grouptype = item.grouptype;
                                _this.strChangetime = item.strChangetime;
                                _this.strCreattime = item.strCreattime;
                                _this.onlinedate = item.onlinedate;
                                _this.stringEstablishDate = item.stringEstablishDate;
                                _this.isDisplay =item.isDisplay;
                                _this.reviseAdvise=item.changeAdvise;

                                _this.serialno = item.serialno;


                                // 展示调仓基金列表信息
                                var arrDetailList = []
                                _this.paramsList.forEach(function (item) {
                                    for (var j = 0; j < item.fundgroupChangeDetailList.length; j++) {
                                        if (item.fundgroupChangeDetailList[j].fundPercent != 0) {
                                            arrDetailList.push(item.fundgroupChangeDetailList[j])
                                        }
                                    }
                                })
                                for (var i = 0; i < arrDetailList.length; i++) {
                                    _this.fundListAll.push({
                                        fundId: arrDetailList[i].fundid,
                                        fundApkind: arrDetailList[i].fundApkind,  //产品类型
                                        fundPercent: arrDetailList[i].fundPercent,           //调整仓位
                                        isUnderlyingCurrency:arrDetailList[i].isUnderlyingCurrency,
                                    })
                                }
                                // if(!item.fundgroupChangeROList){
                                //     _this.showDialog('', 'info', false, '没有添加调仓记录');
                                //     return false;
                                // }else {
                                //     item.fundgroupChangeROList.forEach(function (item) {
                                //         for (var i = 0; i < item.fundgroupChangeDetailList.length; i++) {
                                //             _this.fundListAll.push({
                                //                 fundId: item.fundgroupChangeDetailList[i].fundid,
                                //                 fundApkind: item.fundgroupChangeDetailList[i].fundApkind,  //产品类型
                                //                 fundPercent: item.fundgroupChangeDetailList[i].fundPercent           //调整仓位
                                //             })
                                //         }
                                //     })
                                // }

                            }
                        }
                    });
                    this.isDisplay = "";
                    // 各种占比
                    // this.rightPercent = item.rightPercent                //权益类占比
                    // this.fixPercent = item.fixPercent           //固收类占比
                    // this.vaPercent = item.vaPercent          //货币类占比
                    // this.otherPercent = item.otherPercent     //其它占比

                    // 添加基金信息
                    // for (var i = 0; i < item.detailList.length; i++) {
                    //     _this.fundListAll.push({
                    //         fundId: item.detailList[i].fundId,
                    //         fundApkind: item.detailList[i].fundApkind,  //产品类型
                    //         fundPercent: item.detailList[i].fundPercent           //调整仓位
                    //     })
                    // }

                    this.operate = item.operate
                    this.delete_flag = item.delete_flag

                    //修改弹窗里面获取组合类型数据
                    _this.groupFundType();
                    // 年龄段
                    _this.agerangeList();
                    this.showDialog('', 'houseUpdate');
                }
            }
        },
        deleteAgain: function () {
            var _this = this;
            var params = {};
            params.type = this.type;//状态参数
            params.myqsql = this.mysqlId; //数据表字段id
            params.oneId = this.oneId; //根据id插入或者修改数据
            params.operator = this.operator

            params.id = this.id//后端产品id
            params.serialno = this.serialno;
            params.product = this.mysqlProduct;
            params.groupid = this.groupid;
            params.actionType = this.actionType;
            params.startDate = moment(this.$refs.startDates.value).format('YYYYMMDD');
            params.startTime = moment(this.$refs.startDates.value).format("HHmmss");
            params.endDate = moment(this.$refs.endDates.value).format('YYYYMMDD');
            params.endTime = moment(this.$refs.endDates.value).format("HHmmss");
            params.operate = this.operate
            $.post({
                url: '/investmentMgmt/investmentStrategy/combinationProductHandle/deleteAgain.ajax',
                data: params,
                traditional: true,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(0, params.type);
                    }
                    _this.showDialog('delAgain', 'info', false, result.msg);
                }
            });
        },

        // 时间选择
        setStartTime: function (value, type) {
            var str = $('#startTime_' + type).val();
            if (value === 'now') {
                str = str.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, this.getNowTime() + ' $4:$5:$6');
            }
            else if (value === 'future') {
                str = str.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '2099-12-31 $4:$5:$6' + '');
            }
            else if (value == 0) {
                str = str.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1-$2-$3 00:00:00');
            }
            else if (value == 9) {
                str = str.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1-$2-$3 09:00:00');
            }
            else if (value == 15) {
                str = str.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1-$2-$3 15:00:00');
            }
            $('#startTime_' + type).val(str);
        }
        ,
        setEndTime: function (value, type) {
            var str = $('#endTime_' + type).val();
            if (value === 'now') {
                str = str.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, this.getNowTime() + ' $4:$5:$6');
            }
            else if (value === 'future') {
                str = str.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '2099-12-31 $4:$5:$6' + '');
            }
            else if (value == 0) {
                str = str.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1-$2-$3 00:00:00');
            }
            else if (value == 9) {
                str = str.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1-$2-$3 09:00:00');
            }
            else if (value == 15) {
                str = str.replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g, '$1-$2-$3 15:00:00');
            }
            $('#endTime_' + type).val(str);
        }
        ,
        getNowTime: function () {
            var d = new Date();
            var fixZero = function (num) {
                return num < 10 ? '0' + num : num;
            };
            return [d.getFullYear(), d.getMonth() + 1, d.getDate()].map(function (value) {
                return fixZero(value)
            }).join('-');
        },

        //渠道多选
        dataSummary: function (asynData, value, label, dom,valueCode) {
            var _this = this;
            codeList = valueCode.split(",")
            if (asynData && asynData.length > 0) {
                //     var data = [];
                //     for (var i = 0; i < asynData.length; i++) {
                //         data.push({
                //             value: asynData[i].value,
                //             label: asynData[i].value + "-" + asynData[i].name
                //         });
                //     }
                //     $("#" + dom).multiselect('dataprovider', data);

                var data = [];
                var Arrcode = []
                for (var i = 0; i < asynData.length; i++) {
                    Arrcode.push(asynData[i].value)
                    for (var j = 0; j < codeList.length; j++) {
                        if (Arrcode[i]== codeList[j]) {
                            data.push({
                                value: asynData[i].value,
                                label: asynData[i].value + "-" +asynData[i].name,
                                selected: true,
                            })
                            break;
                        }
                    }
                    data.push({
                        value: asynData[i].value,
                        label: asynData[i].value + "-" + asynData[i].name
                    });
                }
                // 排除重复的数据
                var hash = {};
                data = data.reduce(function(item, next) {
                    hash[next.value] ? '' : hash[next.value] = true && item.push(next);
                    return item
                }, [])
                $("#" + dom).multiselect('dataprovider', data);

            }
        },

        //网点号多选
        dataSummary2: function (asynData, value, label, dom,branchCode) {
            var _this=this;
            if (asynData && asynData.length > 0) {
                // vueData = asynData.map(function (item) {
                //     return {
                //         value: item[value],
                //         label: item[label]
                //     }
                // });
                // var data = [];
                // for (var i = 0; i < asynData.length; i++) {
                //     data.push({
                //         value: asynData[i].pmco,
                //         label: asynData[i].pmco + "-" + asynData[i].pmnm
                //     });
                // }
                // $("#" + dom).multiselect('dataprovider', data);
                var data = [];
                var Arrcode = []
                for (var i = 0; i < asynData.length; i++) {
                    Arrcode.push(asynData[i].pmco)
                    for (var j = 0; j < branchCode.length; j++) {
                        if (Arrcode[i]== branchCode[j]) {
                            data.push({
                                value: asynData[i].pmco,
                                label: asynData[i].pmco + "-" + asynData[i].pmnm,
                                selected: true,
                            })
                            break;
                        }
                    }
                    data.push({
                        value: asynData[i].pmco,
                        label: asynData[i].pmco + "-" + asynData[i].pmnm
                    });
                }
                // 排除重复的数据
                var hash = {};
                data = data.reduce(function(item, next) {
                    hash[next.value] ? '' : hash[next.value] = true && item.push(next);
                    return item
                }, [])
                $("#" + dom).multiselect('dataprovider', data);
            }
        },
        //公共方法
        showDialog: function (dia1, dia2, callback, msg) {
			// 关掉dia1，打开dia2
			// callback==false:在dia2关掉的时候，直接关掉
			// callback==true:在dia2关掉的时候，重新打开dia1
			this.diaMsg = (msg ? msg : '输入条件错误');
			if (!dia1) {
					$('#' + dia2).modal('show');
			} else if (!dia2) {
					$('#' + dia1).modal('hide');
			} else if (!callback) {
					$('#' + dia1).modal('hide');
					$('#' + dia2).off("hidden.bs.modal").modal('show');
			} else {
					if ($('#' + dia1).data('parentDlg')) {
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
        // 查询基金状态是不是暂停交易,暂停赎回,暂停申购
        fundAllIdList:function(itemFundIdList,source,channelList,num,index){
            var _this=this;
            // var fundIdLists=[]
            // itemFundIdList.forEach(function(item){
            //     fundIdLists.push(item.fundId)
            // })
            let params = {}
            // if(source==2){
            //     params.fundIdList = itemFundIdList;
            //     params.sourceType = channelList[0];
            // }else{
            params.fundIdList = itemFundIdList;
            params.sourceType ="";
            // }
            console.log(params)
            $.post({
                url: '/investmentMgmt/investmentStrategy/combinationProductHandle/fundIdLists.ajax',
                data:params,
                success: function (result) {
                    if (result.error === 0) {
                        // _this.fundIdList=result.data;
                        result.data.forEach(function(item){
                            if(num=="0"&&(item.canBePurchased=="N"||item.canBeRedemed=="N"||item.canBePurchased==null||item.canBeRedemed==null)){
                                // _this.filterFundList2[index].check=false;
                                // return _this.showDialog('addFundHistory', 'info', true, "基金"+itemFundIdList+"(是暂停交易 或暂停申购 或暂停赎回),不能选择添加,请取消勾选!");
                            }
                            if(num=="1"&&(item.canBePurchased=="N"||item.canBeRedemed=="N"||item.canBePurchased==null||item.canBeRedemed==null)){
                                // _this.filterFundList[index].check=false;
                                // return _this.showDialog('addFund', 'info', true, "基金"+itemFundIdList+"(是暂停交易 或暂停申购 或暂停赎回),不能选择添加,请取消勾选!");
                            }
                            if(num=="2"&&(item.canBePurchased=="N"||item.canBeRedemed=="N"||item.canBePurchased==null||item.canBeRedemed==null)){
                                // _this.filterFundList3[index].check=false;
                                // return _this.showDialog('muchFundHistory', 'info', true, "基金"+itemFundIdList+"(是暂停交易 或暂停申购 或暂停赎回),不能选择添加,请取消勾选!");
                            }
                        })
                    }
                    else {
                        _this.tableData = [];
                        _this.showDialog('addFundHistory', 'info', false, result.msg);                    }
                }
            });
        },
        // 单选
        single: function (index) {
            var _this = this;
            var fundgroupType=this.fundgroupType;   //判断有关类型 用作外部基金是不是可以选择。
            console.log("fundgroupType",fundgroupType);

            // index.check = !index.check;
            // var hasCheck = true;
            // ids=this.filterFundList2[index].fundId
            if (_this.filterFundList2[index].fundId&&!_this.filterFundList2[index].check) {
                ids = this.filterFundList2[index].fundId;
                source=this.filterFundList2[index].source;//代表基金来源类型
                channelList=_this.filterFundList2[index].channelList;
                if(source==2){
                    _this.checkNav(ids,source,channelList,fundgroupType,index);
                }else{
                    _this.checkNav(ids,source,"","",index);
                }
            }
        }
        ,
        // 验证基金有没有净值
        checkNav: function (ids,source,channelList,fundgroupType,index) {
            var _this = this;
            console.log("ids",ids)
            console.log("source",source)  //代表基金类型
            console.log("channelList",channelList)  //代表基金来源
            console.log("fundgroupType",fundgroupType)  //代表基金来源
            $.post({
                url: '/investmentMgmt/investmentStrategy/combinationProductHandle/navList.ajax',
                data: {ids: ids},
                success: function (result) {
                    if (result.error === 0) {
                        if(result.data.body[0]){
                            // if(source==2){   //当为外部基金，调用查询验证是不是有渠道信息和交易状态
                            $.post({
                                url: '/investmentMgmt/investmentStrategy/combinationProductHandle/checkTradeStatus.ajax',
                                data: {ids:ids},
                                success: function (result) {
                                    if (result.error === 0) {

                                        // if (result.data.body.length===0) {// 无渠道信息，默认不可选
                                        //     _this.filterFundList2[index].check=false;
                                        //     return _this.showDialog('addFundHistory', 'info', true, "该基金"+ids+"不可选!");
                                        // }
                                        if(source==1){
                                            _this.fundAllIdList(ids,source,channelList,0,index);
                                            _this.checkTradeList=result.data.body;
                                            return;
                                        }
                                        let list=result.data.body;
                                            // if(list.some(item => item.purchase === 'Y' && item.redeem === 'Y')){
                                            //     // _this.fundAllIdList(ids,source,channelList,0,index);
                                            //     _this.checkTradeList=result.data.body;
                                            //     console.log("---",_this.checkTradeList)
                                            // }else{
                                            //     _this.filterFundList2[index].check=false;
                                            //     _this.checkTradeList=result.data.body;
                                            //     console.log("~~~",_this.checkTradeList)
                                            //     return _this.showDialog('addFundHistory', 'info', true, "该基金"+ids+"目前不可正常交易!");
                                            // }
																						_this.checkTradeList=result.data.body;
                                        // 20210730 S 暂时去掉选择check
                                        // if(source==2&&[13, 14, 15, 16, 17].includes(Number(fundgroupType))){   // 当组合类型为13,14,15,16,17时在同花顺和盈米渠道同时可售才可选择
                                        //     let list=result.data.body.filter(filterItem => filterItem.sourceType === '307' || filterItem.sourceType === '378');
                                        //     if(list.length>=2&&list.every(item => item.purchase === 'Y' && item.redeem === 'Y')){
                                        //         // _this.fundAllIdList(ids,source,channelList,0,index);
                                        //         _this.checkTradeList=result.data.body;
                                        //         console.log("---",_this.checkTradeList)
                                        //     }else{
                                        //         _this.filterFundList2[index].check=false;
                                        //         _this.checkTradeList=result.data.body;
                                        //         console.log("~~~",_this.checkTradeList)
                                        //         return _this.showDialog('addFundHistory', 'info', true, "该基金"+ids+"在该组合类型下不可选!");
                                        //     }
                                        // }else{
                                            _this.checkTradeList=result.data.body;
                                        //     // _this.fundAllIdList(ids,source,channelList,0,index);
                                        // }
                                        // 20210730 E 暂时去掉选择check

                                    } 
									// else {
                                    //     _this.showDialog('addFundHistory', 'info', true, "该基金"+ids+"不可选!");
                                    // }
                                }
                            });

                            // }
                            // else{
                            //     _this.fundAllIdList(ids,source,channelList,0,index);
                            // }


                            // if(source==2&&channelList==""){
                            //     _this.filterFundList2[index].check=false;
                            //     return _this.showDialog('addFundHistory', 'info', true, "该基金"+ids+"不在交易状态,请取消勾选!");
                            // }else if(source==1){
                            //     _this.fundAllIdList(ids,source,channelList,0,index);
                            // }else{
                            //     _this.fundAllIdList(ids,source,channelList,0,index);
                            // }
                        }else{
                            _this.filterFundList2[index].check=false;
                            return _this.showDialog('addFundHistory', 'info', true, "该基金"+ids+"无净值,不能选择添加,请取消勾选!");
                        }
                        if (!result.data.body || result.data.body.nav == "") {

                           
                        }
                    } else {
                        _this.showDialog('addFundHistory', 'info', true, "该基金"+ids+"无净值,不能选择添加,请取消勾选!");
                    }
                }
            });
        }
        ,

        single2: function (index) {
            var _this = this;
            var fundgroupType=this.fundgroupType;   //判断有关类型 用作外部基金是不是可以选择。
            console.log("fundgroupType",fundgroupType);
            if (this.filterFundList[index].fundId&&!this.filterFundList[index].check) {
                ids = this.filterFundList[index].fundId;
                // this.checkNav2(ids,index)
                source=this.filterFundList[index].source;//代表基金来源类型
                channelList=_this.filterFundList[index].channelList;
                if(source==2){
                    _this.checkNav2(ids,source,channelList,fundgroupType,index);
                }else{
                    _this.checkNav2(ids,source,"","",index);
                }
            }
        }
        ,
        // 验证基金有没有净值
        checkNav2: function (ids,source,channelList,fundgroupType,index) {
            var _this = this;
            $.post({
                url: '/investmentMgmt/investmentStrategy/combinationProductHandle/navList.ajax',
                data: {ids: ids},
                success: function (result) {
                    if (result.error === 0) {
                        if (result.data.body[0]) {
                            //     // return _this.showDialog('addFundHistory', 'info', true, result.msg);
                            //     _this.fundAllIdList(ids,1,index);
                            // }

                            // if(result.data.body && result.data.body.nav != ""){
                            //     if(source==2&&channelList==""){
                            //         _this.filterFundList[index].check=false;
                            //         return _this.showDialog('addFund', 'info', true, "该基金"+ids+"不在交易状态,请取消勾选!");
                            //     }else if(source==1){
                            //         _this.fundAllIdList(ids,source,channelList,1,index);
                            //     }else{
                            //         _this.fundAllIdList(ids,source,channelList,1,index);
                            //     }
                            // }

                            // if (source == 2) {   //当为外部基金，调用查询验证是不是有渠道信息和交易状态
                            $.post({
                                url: '/investmentMgmt/investmentStrategy/combinationProductHandle/checkTradeStatus.ajax',
                                data: {ids: ids},
                                success: function (result) {
                                    if (result.error === 0) {
                                        // if (result.data.body.length === 0) {// 无渠道信息，默认不可选
                                        //     _this.filterFundList[index].check = false;
                                        //     return _this.showDialog('addFund', 'info', true, "该基金" + ids + "不可选!");
                                        // }
                                        if(source==1){
                                            _this.fundAllIdList(ids, source, channelList, 1, index);
                                            _this.checkTradeList=result.data.body;
                                            return;
                                        }
                                        let list = result.data.body;
                                            // if (list.some(item => item.purchase === 'Y' && item.redeem === 'Y')) {
                                            //     _this.checkTradeList = result.data.body;
                                            // } else {
                                            //     _this.filterFundList[index].check = false;
                                            //     _this.checkTradeList = result.data.body;
                                            //     return _this.showDialog('addFund', 'info', true, "该基金" + ids + "目前不可正常交易!");
                                            // }
																						_this.checkTradeList = result.data.body;
                                        // 20210730 S 暂时去掉选择check
                                        // if (source==2&&[13, 14, 15, 16, 17].includes(Number(fundgroupType))) {   // 当组合类型为13,14,15,16,17时在同花顺和盈米渠道同时可售才可选择
                                        //     let list = result.data.body.filter(filterItem => filterItem.sourceType === '307' || filterItem.sourceType === '378');
                                        //     if (list.length >= 2 && list.every(item => item.purchase === 'Y' && item.redeem === 'Y')) {
                                        //         _this.checkTradeList = result.data.body;
                                        //     } else {
                                        //         _this.filterFundList[index].check = false;
                                        //         _this.checkTradeList = result.data.body;
                                        //         return _this.showDialog('addFund', 'info', true, "该基金" + ids + "在该组合类型下不可选!");
                                        //     }
                                        // } else {
                                            _this.checkTradeList = result.data.body;
                                        // }
                                        // 20210730 E 暂时去掉选择check

                                    }
									//  else {
                                    //     _this.showDialog('addFund', 'info', true, "该基金" + ids + "不可选!");
                                    // }
                                }
                            });
                            // }
                            // else {
                            //     _this.fundAllIdList(ids, source, channelList, 1, index);
                            // }
                        }else{
                            _this.filterFundList[index].check=false;
                            return _this.showDialog('addFund', 'info', true, "该基金"+ids+"无净值,不能选择添加,请取消勾选!");
                        }

                        // if (!result.data.body || result.data.body.nav == "") {

                        //     _this.filterFundList[index].check=false;
                        //     return _this.showDialog('addFund', 'info', true, "该基金"+ids+"无净值,不能选择添加,请取消勾选!");

                        // }
                    }else {
                        _this.showDialog('addFund', 'info', true, "该基金"+ids+"无净值,不能选择添加,请取消勾选!");
                    }
                }
            });
        },

        single3: function (index) {
            var _this = this;
            var fundgroupType=this.fundgroupType;   //判断有关类型 用作外部基金是不是可以选择。
            console.log("fundgroupType",fundgroupType);
            if (this.filterFundList3[index].fundId&&!this.filterFundList3[index].check) {
                ids = this.filterFundList3[index].fundId;
                // this.checkNav3(ids,index)
                source=this.filterFundList3[index].source;//代表基金来源类型
                channelList=_this.filterFundList3[index].channelList;
                if(source==2){
                    _this.checkNav3(ids,source,channelList,fundgroupType,index);
                }else{
                    _this.checkNav3(ids,source,"","",index);
                }
            }
        }
        ,
        // 验证基金有没有净值
        checkNav3: function (ids,source,channelList,fundgroupType,index) {
            var _this = this;
            $.post({
                url: '/investmentMgmt/investmentStrategy/combinationProductHandle/navList.ajax',
                data: {ids: ids},
                success: function (result) {
                    if (result.error === 0) {
                        if (result.data.body[0]) {
                            //     // return _this.showDialog('addFundHistory', 'info', true, result.msg);
                            //     _this.fundAllIdList(ids,2,index);
                            // }

                            // if(result.data.body && result.data.body.nav != ""){
                            //     if(source==2&&channelList==""){
                            //         _this.filterFundList3[index].check=false;
                            //         return _this.showDialog('muchFundHistory', 'info', true, "该基金"+ids+"不在交易状态,请取消勾选!");
                            //     }else if(source==1){
                            //         _this.fundAllIdList(ids,source,channelList,2,index);
                            //     }else{
                            //         _this.fundAllIdList(ids,source,channelList,2,index);
                            //     }
                            // }
                            // if (source == 2) {   //当为外部基金，调用查询验证是不是有渠道信息和交易状态
                            $.post({
                                url: '/investmentMgmt/investmentStrategy/combinationProductHandle/checkTradeStatus.ajax',
                                data: {ids: ids},
                                success: function (result) {
                                    if (result.error === 0) {

                                        // if (result.data.body.length === 0) {// 无渠道信息，默认不可选
                                        //     _this.filterFundList3[index].check = false;
                                        //     return _this.showDialog('muchFundHistory', 'info', true, "该基金" + ids + "不可选!");
                                        // }
                                        if (source == 1) {
                                            _this.fundAllIdList(ids, source, channelList, 2, index);
                                            _this.checkTradeList = result.data.body;
                                            return;
                                        }
                                        let list = result.data.body;
                                        // if (list.some(item => item.purchase === 'Y' && item.redeem === 'Y')) {
                                        //     _this.checkTradeList = result.data.body;
                                        // } else {
                                        //     _this.filterFundList3[index].check = false;
                                        //     _this.checkTradeList = result.data.body;
                                        //     return _this.showDialog('muchFundHistory', 'info', true, "该基金" + ids + "目前不可正常交易!");
                                        // }
                                        // 20210730 S 暂时去掉选择check
                                        // if (source == 2 && [13, 14, 15, 16, 17].includes(Number(fundgroupType))) {   // 当组合类型为13,14,15,16,17时在同花顺和盈米渠道同时可售才可选择
                                        //     let list = result.data.body.filter(filterItem => filterItem.sourceType === '307' || filterItem.sourceType === '378');
                                        //     if (list.length >= 2 && list.every(item => item.purchase === 'Y' && item.redeem === 'Y')) {
                                        //         _this.checkTradeList = result.data.body;
                                        //     } else {
                                        //         _this.filterFundList3[index].check = false;
                                        //         _this.checkTradeList = result.data.body;
                                        //         return _this.showDialog('muchFundHistory', 'info', true, "该基金" + ids + "在该组合类型下不可选!");
                                        //     }
                                        // } else {
                                            _this.checkTradeList = result.data.body;
                                        // }
                                        // 20210730 E 暂时去掉选择check

                                    } 
									// else {
                                    //     _this.showDialog('muchFundHistory', 'info', true, "该基金" + ids + "不可选!");
                                    // }
                                }
                            });
                            // } else {
                            //     _this.fundAllIdList(ids, source, channelList, 2, index);
                            // }
                        }else{
                            _this.filterFundList3[index].check=false;
                            return _this.showDialog('muchFundHistory', 'info', true, "该基金"+ids+"无净值,不能选择添加,请取消勾选!");
                        }
                        // if (!result.data.body || result.data.body.nav == "") {
                            

                        // }
                    } else {
                        _this.showDialog('muchFundHistory', 'info', true, "该基金"+ids+"无净值,不能选择添加,请取消勾选!");
                    }
                }
            });
        },
        showOptionalFundList: function(item,dialogName){
            var groupId = '';
            if(this.groupid&&this.groupid.length===5){
                this.groupid&&(groupId=this.groupid);
            }else{
                this.service&&this.service.groupId&&(groupId=this.service.groupId);
            }
            // var _this=this;
            $.post({
                url: '/investmentMgmt/investmentStrategy/combinationProductHandle/fundList.ajax',
                data:{groupId},
                success: function (result) {
                    if (result.error === 0) {
                        this.fundListForOptionalFundIds = JSON.parse(JSON.stringify(result.data.body.map(function(item){
                            return {
                                fundId: item.fundId,
                                fundName: item.fundName,
                                fundTypeForFundgroup: item.fundTypeForFundgroup,
                                source:item.source,
                                channelList:item.channelList,
                                priority: '1',
                                check: false,
                                canSelectForOptional: 0
                            };
                        })));
                        this.fundInfoForOptional = item;
                        this.savedDialogName = dialogName || 'add';
                        this.fundListForOptionalFundIds.forEach(function(item){ // 备选基金列表清空
                            item.priority = '1';
                            item.check = false;
                            item.canSelectForOptional = 0;
                        });
                        this.fundIdSearchForOptionalFundIds = ''; // 搜索条件清空
                        this.fundNameSearchForOptionalFundIds = ''; // 搜索条件清空
                        if(item.optionalFundList && item.optionalFundList instanceof Array && item.optionalFundList.length > 0){
                            var _this = this;
                            item.optionalFundList.forEach(function(selectedItem){
                                var obj = _this.fundListForOptionalFundIds.filter(function(filterItem){
                                    return filterItem.fundId === selectedItem.fundId;
                                })[0];
                                if(obj){
                                    obj.check = true;
                                    obj.canSelectForOptional = 1;
                                    obj.priority = selectedItem.priority;
                                }
                            });
                        }
                        this.showDialog(this.savedDialogName, 'optionalFundList', true);
                    }
                }.bind(this)
            });
            
        },
        selectOptionalFund: function(item){
            item.check = !item.check;
        },
        selectOptionalFundCanSelect: function(item){
            var fundGroupType = this.isAdd ? this.fundgroupType : this.service.fundGroupType;

            // 20210730 S 暂时去掉选择check
            // if(item.source == 2 && [13, 14, 15, 16, 17].indexOf(Number(fundGroupType)) > -1){ // 外部基金且当前组合类型为13, 14, 15, 16, 17时需要判断同花顺和盈米是否同时可售
                var data = {};
                data.fundGroupType = fundGroupType;
                data.fundId = item.fundId;
                data.source = item.source;
                $.post({
                    url: '/investmentMgmt/investmentStrategy/combinationProductHandle/checkFundCanSelect.ajax',
                    data: data,
                    success: function (result) {
                        if (result.error === 0) {
                            item.canSelectForOptional = result.data.canSelect;
                        }
                        else {
                            item.canSelectForOptional = 2;
                        }
                    }.bind(this)
                });
            // }
            // else {
                // item.canSelectForOptional = 1;
            // }
            // 20210730 E 暂时去掉选择check
        },
        removeSelectedOptionalFund: function(item){
            item.priority = '1';
            item.check = false;
        },
        submitOptionalFundList: function(){
            this.fundInfoForOptional.optionalFundList = this.fundListForOptionalFundIdsSelectedComputed.map(function(item){
                return {
                    fundId: item.fundId,
                    fundName: item.fundName,
                    priority: item.priority
                };
            });
						this.$forceUpdate()
            this.showDialog('optionalFundList', this.savedDialogName,false);
        },
        // check: function (index) {
        //     index.check = !index.check;
        // },
        // // 用户全选
        // selectAll: function (allCheck) {
        //     var _this = this;
        //     //如果父级被选中，那么子集循环，全被给checked=true
        //     if (!allCheck) {
        //         _this.tableData.forEach(function (item) {
        //             item.check = true;
        //         });
        //     } else {
        //         //相反，如果没有被选中，子集应该全部checked=false
        //         _this.tableData.forEach(function (item) {
        //             item.check = false;
        //         });
        //     }
        // },
        // //选择添加基金过滤
        // filterList: function () {
        //     var filterData = [];
        //     var _this = this;
        //     this.filterFundList.forEach(function (item) {
        //         if (item.fundId.indexOf(_this.fundCode) > -1) {
        //             filterData.push(item);
        //         }
        //     });
        //     return filterData;
        // },
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
        }
        ,

        prev1: function () {
            this.currentIndex <= 0 ? 0 : this.currentIndex--;
        }
        ,
        next1: function () {
            this.currentIndex >= this.middleData.length - 1 ? this.middleData.length - 1 : this.currentIndex++;
        }
        ,
        changeIndex1: function (index) {
            this.currentIndex = index - 1;
        }
        ,
        toFirst1: function () {
            this.currentIndex = 0;
        }
        ,
        toLast1: function () {
            this.currentIndex = this.middleData.length - 1;
        },
        // 已生效数据全量修改相关方法
        showServiceAllUpdate: function(item){
            this.isAdd = false;
            this.isAllUpdate = true;
            this.service.isLocalUpdate = false;
            this.service.mySQLId = '';
            this.clearServiceAllUpdate();
            $.post({
                url: '/investmentMgmt/investmentStrategy/combinationProductHandle/getServiceUpdateDialogData.ajax',
                data: {groupId: item.groupId},
                success: function (result) {
                    if (result.error === 0) {
                        for(var prop in result.data){
                            this.service[prop] = result.data[prop];
                        }
                        this.service.createTime = item.createTime;           // 创建时间
                        this.service.establishDate = item.establishDate;     // 成立时间
                        this.service.rightPercent = item.rightPercent;       // 权益类占比
                        this.service.fixPercent = item.fixPercent;           // 固收类占比
                        this.service.vaPercent = item.vaPercent;             // 货币类占比
                        this.service.otherPercent = item.otherPercent;       // 其它占比
                        var str = '<option value=""></option>';
                        this.service.branchCodeList.forEach(function (item) {
                            str += '<option value="' + item.pmco + '">' + item.pmco + '-' + item.pmnm + '</option>';
                        });
                        $('#serviceBranchCode').html(str);
                        $('#serviceBranchCode').val(this.service.branchCode);
                        $('#serviceBranchCode').trigger('chosen:updated');
                        this.showDialog('','serviceUpdate');
                    } else {
                        this.showDialog('', 'info', true, '获取该产品详情信息失败！');
                    }
                }.bind(this)
            });
        },
        clearServiceAllUpdate: function(){
            $('#serviceUpdate .tabbable li').removeClass('active');
            $('#serviceUpdate .tab-pane').removeClass('active');
            $('#serviceUpdate .tabbable li').eq(0).addClass('active');
            $('#serviceUpdate .tab-pane').eq(0).addClass('active');
            this.service.serialno = '';
            this.service.fundGroupType = '';
            this.service.fundGroupTypeList = [];
            this.service.groupId = '';
            this.service.groupName = '';
            this.service.fundGroupDesc = '';
            this.service.targetContract = '';
            this.service.strategyMode = '';
            this.service.fundGroupAdvise = '';
            this.service.recommendReason = '';
            this.service.recommendHoldTime = '';
            this.service.acceptMode = '2';
            this.service.ageRange = '';
            this.service.ageRangeList = [];
            this.service.accptType = '2';
            this.service.branchCode = [];
            this.service.branchCodeList = [];
            $('#serviceBranchCode').html('<option value=""></option>');
            $('#serviceBranchCode').val('');
            $('#serviceBranchCode').trigger('chosen:updated');
            this.service.stopStatus = '0';
            this.service.manualStartTime = '';
            this.service.manualEndTime = '';
            // this.service.displayDate = '';
            this.service.status = 'N';
            this.service.isInvestment = 'Y';
            this.service.investType = 'M';
            this.service.investCustomers = '';
            this.service.investPrincipal = '';
            this.service.investDuration = '';
            this.service.categoryDescDoc = '';
            this.service.categoryDescDisplay = '';
            this.service.riskDescDoc = '';
            this.service.riskDescDisplay = '';
            this.service.investDescDoc = '';
            this.service.investDescDisplay = '';
            this.service.fundGroupFeature = '';
            this.service.investmentServicePerc = '';
            this.service.onlineDate = '';
            this.service.normalPageUrl = '';
            this.service.riskControl = 'Y';
            this.service.riskType = '1';
            this.service.riskTypeList = [];
            this.service.initAmount = '';
            this.service.minRedeemAmount = '1000';
            this.service.minReserveAmount = '1000';
            this.service.largeRedemptionPercent = '';
            this.service.turnoverRatePerc = '';
            this.service.singlevalueCustmaxPerc = '';
            this.service.categoryunitGroupmaxPerc = '';
            this.service.singleunitGroupmaxPerc = '';
            this.service.rightMinratePerc = '';
            this.service.valueMinratePerc = '';
            this.service.valueMaxratePerc = '';
            this.service.isBlacklist = '';
            this.service.isTradeLimit = '';

            this.service.riskLevel = '01';
            this.service.riskLevelList = [];
            this.service.commro = '';
            this.service.minChangeAmount = '1000';
            this.service.rightLimit = '';
            this.service.rightMaxratePerc = '';
            this.service.investRiskLevel = '1';
            this.service.isAddFundGroup = false;
            this.service.fundGroupChangeDetailList = [];
            this.service.newFundGroupChange = {
                changeAdvise: '',
                isDisplay: 1,
                fundList: []
            };
        },
        newAddFundGroup: function(){
            this.service.newFundGroupChange = {
                changeAdvise: '',
                isDisplay: 1,
                fundList: []
            };
            this.service.isAddFundGroup = true;
        },
        newDeleteFundGroup: function(){
            this.service.isAddFundGroup = false;
            if(this.service.fundGroupFundListForSelect.length > 0){ // 删除调仓清空备选基金
                this.service.fundGroupFundListForSelect.forEach(function(item){
                    item.optionalFundList = [];
                });
            }
        },
        showAddNewFundGroupListItem: function(){
            this.service.fundIdForSearch = '';
            this.service.fundNameForSearch = '';
            this.service.acceptModeListForFundId = [];
            if(this.service.fundGroupFundListForSelect.length === 0){ // 产品列表为空，需要获取数据
                $.post({
                    url: '/investmentMgmt/investmentStrategy/combinationProductHandle/fundGroupFundListForSelect.ajax',
                    data:{groupId:this.service.groupId},
                    success: function (result) {
                        if (result.error === 0) {
                            this.service.fundGroupFundListForSelect = result.data;
                            this.service.fundGroupFundListForSelect.forEach(function(item){
                                item.canSelect = 0;
                                item.check = false;
                                item.reason = '';
                                item.fundPercent = 0;
                                item.isUnderlyingCurrency = 'N';
                                item.optionalFundList = [];
                            });
                            this.service.newFundGroupChange.fundList.forEach(function (selectedItem) {
                                var obj = this.service.fundGroupFundListForSelect.filter(function(listItem){
                                    return listItem.fundId === selectedItem.fundId;
                                })[0];
                                if(obj){
                                    obj.canSelect = 1;
                                    obj.check = true;
                                    selectedItem.fundPercent && (obj.fundPercent = selectedItem.fundPercent);
                                    selectedItem.isUnderlyingCurrency && (obj.isUnderlyingCurrency = selectedItem.isUnderlyingCurrency);
                                    selectedItem.optionalFundList && (obj.optionalFundList = selectedItem.optionalFundList);
                                    selectedItem.source && (obj.source = selectedItem.source);
                                    selectedItem.channelList && (obj.channelList = selectedItem.channelList);
                                }
                            }.bind(this));
                            this.showDialog('serviceUpdate','fundGroupFundListForSelect', true);
                        } else {
                            this.showDialog('serviceUpdate', 'info', true, '获取该产品详情信息失败！');
                        }
                    }.bind(this)
                });
            }
            else {
                this.service.fundGroupFundListForSelect.forEach(function(item){
                    item.canSelect = 0;
                    item.check = false;
                    item.reason = '';
                    item.fundPercent = 0;
                    item.isUnderlyingCurrency = 'N';
                    item.optionalFundList = [];
                });
                this.service.newFundGroupChange.fundList.forEach(function (selectedItem) {
                    var obj = this.service.fundGroupFundListForSelect.filter(function(listItem){
                        return listItem.fundId === selectedItem.fundId;
                    })[0];
                    if(obj){
                        obj.canSelect = 1;
                        obj.check = true;
                        selectedItem.fundPercent && (obj.fundPercent = selectedItem.fundPercent);
                        selectedItem.isUnderlyingCurrency && (obj.isUnderlyingCurrency = selectedItem.isUnderlyingCurrency);
                        selectedItem.optionalFundList && (obj.optionalFundList = selectedItem.optionalFundList);
                        selectedItem.source && (obj.source = selectedItem.source);
                        selectedItem.channelList && (obj.channelList = selectedItem.channelList);
                    }
                }.bind(this));
                this.showDialog('serviceUpdate','fundGroupFundListForSelect', true);
            }
        },
        checkFundCanSelect: function(item){
            var data = {};
            data.fundGroupType = this.service.fundGroupType;
            data.fundId = item.fundId;
            data.source = item.source;
            // 外部基金查询是否在交易状态走另外的接口
            $.post({
                url: '/investmentMgmt/investmentStrategy/combinationProductHandle/checkFundCanSelect.ajax',
                data: data,
                success: function (result) {
                    if (result.error === 0) {
                        item.canSelect = result.data.canSelect;
                        item.reason = result.msg;
                        this.service.acceptModeListForFundId = result.data.acceptModeListForFundId;
                    }
                }.bind(this)
            });
        },
        removeNewFundGroupListItem: function(item,index){
            var obj = this.service.fundGroupFundListForSelect.filter(function(listItem){
                return item.fundId === listItem.fundId;
            })[0];
            obj && (obj.optionalFundList = []);
            this.service.newFundGroupChange.fundList.splice(index,1);
        },
        saveFundListForSelect: function(){
            this.service.newFundGroupChange.fundList = JSON.parse(JSON.stringify(this.service.fundGroupFundListForSelect.filter(function(item){
                return item.canSelect === 1 && item.check;
            })));
            this.showDialog('fundGroupFundListForSelect','serviceUpdate', false);
        },
        serviceAllUpdateSubmit: function(){
            if(!this.checkServiceAllUpdateDialog()){
                return;
            }
            var params = this.getServiceAllUpdateDialogData();
            $.post({
                url: '/investmentMgmt/investmentStrategy/combinationProductHandle/saveServiceAllUpdateDialogData.ajax',
                data: {dialogData:JSON.stringify(params)},
                success: function (result) {
                    if(result.error === 0){
                        this.showDialog('serviceUpdate', 'info',false,result.msg);
                    }
                    else {
                        this.showDialog('serviceUpdate', 'info',true,result.msg)
                    }
                }.bind(this)
            });
        },
        checkServiceAllUpdateDialog: function(){
            if(!this.service.groupName){
                this.showDialog('serviceUpdate', 'info', true, '组合名称不能为空');
                return false;
            }
            if(!this.service.fundGroupDesc){
                this.showDialog('serviceUpdate', 'info', true, '配置理念不能为空');
                return false;
            }
			if(!this.service.strategyMode){
                this.showDialog('serviceUpdate', 'info', true, '策略运作模式必填');
                return false;
            }
            if(!this.service.investmentServicePerc&&this.service.investmentServicePerc!==0){
                this.showDialog('serviceUpdate', 'info', true, '投顾服务费率不能为空');
                return false;
            }
            if(this.service.fundGroupType === '02' && !this.service.ageRange){
                this.showDialog('serviceUpdate', 'info', true, '请选择适合年龄段');
                return false;
            }
            // if(this.service.fundGroupType === '04' && this.service.branchCode.length === 0){
            //     this.showDialog('serviceUpdate', 'info', true, '请选择网点号');
            //     return false;
            // }
            // if(this.service.stopStatus != 0){
            //     if(!this.service.manualStartTime||!this.service.manualEndTime){
            //         this.showDialog('serviceUpdate', 'info', true, '请填写暂停起止时间');
            //         return false;
            //     }
            //     if(new Date(this.service.manualStartTime).getTime() > new Date(this.service.manualEndTime).getTime()){
            //         this.showDialog('serviceUpdate', 'info', true, '时间区间不合法');
            //         return false;
            //     }
            // }
            if(!this.service.initAmount){
                this.showDialog('serviceUpdate', 'info', true, '起投金额不能为空');
                return false;
            }
            // if(!this.service.minRedeemAmount){
            //     this.showDialog('serviceUpdate', 'info', true, '最低赎回金额不能为空');
            //     return false;
            // }
            // if(!this.service.minReserveAmount){
            //     this.showDialog('serviceUpdate', 'info', true, '最低持有金额不能为空');
            //     return false;
            // }
            // if(this.service.investType === 'G' && !this.service.investCustomers){
            //     this.showDialog('serviceUpdate', 'info', true, '投顾组合客户不能为空');
            //     return false;
            // }
            if(this.service.investType === 'G' && !this.service.investPrincipal){
                this.showDialog('serviceUpdate', 'info', true, '名义本金不能为空');
                return false;
            }
            // if(this.service.investType === 'G' && !this.service.investDuration){
            //     this.showDialog('serviceUpdate', 'info', true, '投资时长不能为空');
            //     return false;
            // }
            if(this.service.status === 'N'){
                if(!this.service.categoryDescDoc){
                    this.showDialog('serviceUpdate', 'info', true, '请上传策略说明书');
                    return false;
                }
                if(!this.service.riskDescDoc){
                    this.showDialog('serviceUpdate', 'info', true, '请上传风险揭示书');
                    return false;
                }
                if(!this.service.investDescDoc){
                    this.showDialog('serviceUpdate', 'info', true, '请上传投顾协议');
                    return false;
                }
            }
            
            if(!this.service.categoryDescDisplay){
                this.showDialog('serviceUpdate', 'info', true, '请填写策略说明书展示文案');
                return false;
            }
            
            if(!this.service.riskDescDisplay){
                this.showDialog('serviceUpdate', 'info', true, '请填写风险揭示书展示文案');
                return false;
            }
           
            if(!this.service.investDescDisplay){
                this.showDialog('serviceUpdate', 'info', true, '请填写投顾协议展示文案');
                return false;
            }
            if(!this.service.investRiskLevel){
                this.showDialog('serviceUpdate', 'info', true, '请选择投顾风险等级');
                return false;
            }
            // if(this.service.isInvestment === 'Y' && !this.service.turnoverRatePerc){
            //     this.showDialog('serviceUpdate', 'info', true, '账户换手率不能为空');
            //     return false;
            // }
            // if(this.service.isInvestment === 'Y' && !this.service.singlevalueCustmaxPerc){
            //     this.showDialog('serviceUpdate', 'info', true, '请填写单只基金市值不得超过客户账户资产净值');
            //     return false;
            // }
            // if(this.service.isInvestment === 'Y' && !this.service.categoryunitGroupmaxPerc){
            //     this.showDialog('serviceUpdate', 'info', true, '请填写同策略持有基金份额不得超过该基金总份额占比');
            //     return false;
            // }
            // if(this.service.isInvestment === 'Y' && !this.service.singleunitGroupmaxPerc){
            //     this.showDialog('serviceUpdate', 'info', true, '请填写持有单只指数基金的份额总和不得超过该基金总份额的');
            //     return false;
            // }
            // if(!this.service.commro){
            //     this.showDialog('serviceUpdate', 'info', true, '费率折扣不能为空');
            //     return false;
            // }
            // if(!this.service.minChangeAmount){
            //     this.showDialog('serviceUpdate', 'info', true, '最低调仓金额不能为空');
            //     return false;
            // }
            // if(this.service.isInvestment === 'Y' && !this.service.rightLimit){
            //     this.showDialog('serviceUpdate', 'info', true, '权益类基金定义不能为空');
            //     return false;
            // }
            // if(this.service.isInvestment === 'Y' && !this.service.rightMaxratePerc){
            //     this.showDialog('serviceUpdate', 'info', true, '权益类基金占比不超过不能为空');
            //     return false;
            // }
            if(this.service.isAddFundGroup){ // 需要添加调仓
                if(this.service.newFundGroupChange.fundList.length === 0){
                    this.showDialog('serviceUpdate', 'info', true, '请添加调仓基金');
                    return false;
                }
                for(var i = 0; i < this.service.newFundGroupChange.fundList.length; i++){
                    if(!this.service.newFundGroupChange.fundList[i].fundPercent || isNaN(Number(this.service.newFundGroupChange.fundList[i].fundPercent))){
                        this.showDialog('serviceUpdate', 'info', true, '请正确填写调整仓位');
                        return false;
                    }
                    if(Number(this.service.newFundGroupChange.fundList[i].fundPercent) < 0 || Number(this.service.newFundGroupChange.fundList[i].fundPercent > 100)){
                        this.showDialog('serviceUpdate', 'info', true, '调整仓位不能为复数且不能大于100');
                        return false;
                    }
                }
                var sum = 0;
                this.service.newFundGroupChange.fundList.forEach(function(item){
                    sum += Number(item.fundPercent) * 100;
                });
                if(sum != 10000){
                    this.showDialog('serviceUpdate', 'info', true, '调整仓位之和应为100%');
                    return false;
                }
                if(this.service.isInvestment === 'Y'){
                    for(var j = 0; j < this.service.newFundGroupChange.fundList.length; j++){
                        if(this.service.newFundGroupChange.fundList[j].optionalFundList && this.service.newFundGroupChange.fundList[j].optionalFundList.length > 6){
                            this.showDialog('serviceUpdate', 'info', true, '备选基金不能超过6个');
                            return false;
                        }
                    }
                }
                // if(this.service.isInvestment === 'N'){ // 非投顾情况下判断调仓基金是否全是我司基金
                //     var filterSelectArr = this.service.newFundGroupChange.fundList.filter(function (item) {
                //         return item.source == 2;
                //     });
                //     if(filterSelectArr.length > 0){
                //         this.showDialog('serviceUpdate', 'info', true, '新增调仓基金池中的' + filterSelectArr.map(function(item){return item.fundId}).join(',') + '为外部基金，只有投顾组合类型才可选择');
                //         return false;
                //     }
                // }
            }
            return true;
        },
        getServiceAllUpdateDialogData: function(){
            var obj = {};
            if(!this.service.isLocalUpdate){
                obj.createTime = this.service.createTime; // 创建时间
                obj.establishDate = this.service.establishDate; // 成立时间
                obj.rightPercent = this.service.rightPercent; // 权益类占比
                obj.fixPercent = this.service.fixPercent; // 固收类占比
                obj.vaPercent = this.service.vaPercent; // 货币类占比
                obj.otherPercent = this.service.otherPercent; // 其它占比
            }
            obj.serialno = this.service.serialno;
            obj.fundGroupType = this.service.fundGroupType;
            obj.groupId = this.service.groupId;
            obj.groupName = this.service.groupName;
            obj.fundGroupDesc = this.service.fundGroupDesc;
            obj.targetContract = this.service.targetContract;
            obj.strategyMode = this.service.strategyMode;
            obj.fundGroupAdvise = this.service.fundGroupAdvise;
            obj.recommendReason = this.service.recommendReason;
            obj.recommendHoldTime = this.service.recommendHoldTime;
            obj.onlineDate = this.service.onlineDate;
            obj.acceptMode = this.service.acceptMode;
            obj.ageRange = this.service.ageRange;
            obj.accptType = this.service.accptType;
            obj.branchCode = this.service.branchCode.length === 0 ? ['247'] : this.service.branchCode;
            obj.stopStatus = this.service.stopStatus;
            obj.manualStartTime = this.service.manualStartTime;
            obj.manualEndTime = this.service.manualEndTime;
            // obj.displayDate = this.service.displayDate;
            obj.status = this.service.status;
            obj.isInvestment = this.service.isInvestment;
            obj.investType = this.service.investType;
            obj.investCustomers = this.service.investCustomers;
            obj.investPrincipal = this.service.investPrincipal;
            obj.investDuration = this.service.investDuration;
            obj.categoryDescDoc = this.service.categoryDescDoc;
            obj.categoryDescDisplay = this.service.categoryDescDisplay;
            obj.riskDescDoc = this.service.riskDescDoc;
            obj.riskDescDisplay = this.service.riskDescDisplay;
            obj.investDescDoc = this.service.investDescDoc;
            obj.investDescDisplay = this.service.investDescDisplay;
            obj.fundGroupFeature = this.service.fundGroupFeature;
            obj.investmentServicePerc = this.service.investmentServicePerc;
            obj.normalPageUrl = this.service.normalPageUrl;
            obj.riskControl = this.service.riskControl;
            obj.riskType = this.service.riskType;
            obj.initAmount = this.service.initAmount;
            obj.minRedeemAmount = this.service.minRedeemAmount;
            obj.minReserveAmount = this.service.minReserveAmount;
            obj.largeRedemptionPercent = this.service.largeRedemptionPercent;
            obj.turnoverRatePerc = this.service.turnoverRatePerc;
            obj.singlevalueCustmaxPerc = this.service.singlevalueCustmaxPerc;
            obj.categoryunitGroupmaxPerc = this.service.categoryunitGroupmaxPerc;
            obj.singleunitGroupmaxPerc = this.service.singleunitGroupmaxPerc;
            obj.rightMinratePerc = this.service.rightMinratePerc;
            obj.valueMinratePerc = this.service.valueMinratePerc;
            obj.valueMaxratePerc = this.service.valueMaxratePerc;
            obj.isBlacklist = this.service.isBlacklist;
            obj.isTradeLimit = this.service.isTradeLimit;
            obj.investRiskLevel = this.service.investRiskLevel;
            obj.riskLevel = this.service.riskLevel;
            obj.commro = this.service.commro;
            obj.minChangeAmount = this.service.minChangeAmount;
            obj.rightLimit = this.service.rightLimit;
            obj.rightMaxratePerc = this.service.rightMaxratePerc;
            obj.isAddFundGroup = this.service.isAddFundGroup;
            obj.fundGroupChangeDetailList = JSON.parse(JSON.stringify(this.service.fundGroupChangeDetailList));
            obj.newFundGroupChange = JSON.parse(JSON.stringify(this.service.newFundGroupChange));
            if(this.service.fundGroupType !== '02'){ // 非养老组合
                obj.ageRange = '';
            }
            if(this.service.stopStatus == '0'){ // 正常交易
                obj.manualStartTime = '';
                obj.manualEndTime = '';
            }
            // if(this.service.isInvestment == 'N'){ // 非顾投
            //     obj.investType = 'M';
            //     obj.investCustomers = '';
            //     obj.investPrincipal = '';
            //     obj.investDuration = '';
            //     obj.categoryDescDoc = '';
            //     obj.categoryDescDisplay = '';
            //     obj.riskDescDoc = '';
            //     obj.riskDescDisplay = '';
            //     obj.investDescDoc = '';
            //     obj.investDescDisplay = '';
            //     obj.riskControl = 'Y';
            //     obj.largeRedemptionPercent = '';
            //     obj.turnoverRatePerc = '';
            //     obj.singlevalueCustmaxPerc = '';
            //     obj.categoryunitGroupmaxPerc = '';
            //     obj.singleunitGroupmaxPerc = '';
            //     obj.rightLimit = '';
            //     obj.rightMaxratePerc = '';
            //     obj.investRiskLevel = '1';
            //     obj.newFundGroupChange.fundList.forEach(function(item){
            //         item.optionalFundList = [];
            //     });
            // }
            obj.newFundGroupChange.fundList.forEach(function(item){
                delete item.canSelect;
                delete item.check;
                delete item.reason;
            });
            return obj;
        },
        showLocalAllUpdate: function(item){
            this.service.isLocalUpdate = true;
            this.service.mySQLId = item.mySQLId;
            this.service.updateTimestamp = item.update_timestamp;
            this.clearServiceAllUpdate();
            $.post({
                url: '/investmentMgmt/investmentStrategy/combinationProductHandle/getLocalDialogListData.ajax',
                success: function (result) {
                    console.log(result);
                    if (result.error === 0) {
                        for(var prop in result.data){
                            this.service[prop] = result.data[prop];
                        }
                        for(var key in item.dialogData){
                            if(item.dialogData[key] instanceof Array){
                                this.service[key] = JSON.parse(JSON.stringify(item.dialogData[key]));
                            }
                            else {
                                this.service[key] = item.dialogData[key];
                            }
                        }
                        var str = '<option value=""></option>';
                        this.service.branchCodeList.forEach(function (item) {
                            str += '<option value="' + item.pmco + '">' + item.pmco + '-' + item.pmnm + '</option>';
                        });
                        $('#serviceBranchCode').html(str);
                        $('#serviceBranchCode').val(this.service.branchCode);
                        $('#serviceBranchCode').trigger('chosen:updated');
                        this.showDialog('','serviceUpdate');
                    } else {
                        this.showDialog('', 'info', true, '获取弹窗所需列表数据失败！');
                    }
                }.bind(this)
            });
        },
        localUpdateSubmit: function(){

            console.log('yahaha');
            if(!this.checkServiceAllUpdateDialog()){
                return;
            }
            var params = this.getServiceAllUpdateDialogData();
            // console.log(params);
            // return
            $.post({
                url: '/investmentMgmt/investmentStrategy/combinationProductHandle/saveLocalAllUpdateDialogData.ajax',
                data: {
                    mySQLId: this.service.mySQLId,
                    update_timestamp: this.service.updateTimestamp,
                    dialogData:JSON.stringify(params)
                },
                success: function (result) {
                    if(result.error === 0){
                        this.getTableData(0, 1);
                        this.showDialog('serviceUpdate', 'info', false, result.msg);
                    }
                    else {
                        this.showDialog('serviceUpdate', 'info', true, result.msg)
                    }
                }.bind(this)
            });
        },
        showOptionalList: function(dialogName,fundDetailItem){
            console.log('123');
            var params = {};
            params.groupId = this.service.groupId;
            params.fundId = fundDetailItem.fundId;
            console.log(params);
            $.post({
                url: '/investmentMgmt/investmentStrategy/combinationProductHandle/checkOptionalFundList.ajax',
                data: params,
                success: function (result) {
                    if(result.error === 0){
                        this.optionalFundListForShow = result.data;
                        this.showDialog(dialogName, 'optionalFundListDialog', true, result.msg);
                    }
                    else {
                        this.showDialog(dialogName, 'info', true, result.msg);
                    }
                }.bind(this)
            });
        },
        selectFile: function(){
            console.log(this.$refs.fileInput.files[0])
            this.$refs.fileInput.click();
        },
        uploadDoc: function(docType){ // 1-策略说明书,2-风险揭示书,3-投顾协议
			var updateGroupId = ''
			if(docType==4 || docType==5 || docType==6 || docType==7){
					if (!this.groupid) {
							this.showDialog('add', 'info', true, '组合ID不能为空');
							return false;
					}
					if (!/(^A[0-9]{4})$/.test(this.groupid)) {
							this.showDialog('add', 'info', true, '组合ID格式错误，应为以A开头的5位数字');
							return false;
					}
					updateGroupId = this.groupid;
			}else{
					updateGroupId = this.service.groupId;
			}
            if(!this.$refs.fileInput.files[0]){
                if(docType==4 || docType==5 || docType==6 || docType==7){
                    this.showDialog('add', 'info', true, '未选择文档');
                    return;
                }
                this.showDialog('serviceUpdate', 'info', true, '未选择文档');
                return;
            }
            var docFile = this.$refs.fileInput.files[0];
            var fileType = docFile.name.split('.')[docFile.name.split('.').length - 1];
            if (['docx', 'pdf', 'html'].indexOf(fileType.toLowerCase()) === -1) {
                if(docType==4 || docType==5 || docType==6 || docType==7){
                    this.showDialog('add', 'info', true, '文档格式错误，请上传docx、pdf、html格式文件');
                    return;
                }
                this.showDialog('serviceUpdate', 'info', true, '文档格式错误，请上传docx、pdf、html格式文件');
                return;
            }
            var formdata = new FormData();
            formdata.append('file', this.$refs.fileInput.files[0]);
            if(docType==4 || docType==5 || docType==6 || docType==7){
                this.showDialog('add');
            }else{
                this.showDialog('serviceUpdate');
            }
            this.loadingShow = true;
            $.post({
                url: '/investmentMgmt/investmentStrategy/combinationProductHandle/uploadDoc.ajax?updateGroupId='+updateGroupId,
                cache: false,
                data: formdata,
                processData: false,
                contentType: false,
                success: function (result) {
                    if(docType==4 || docType==5 || docType==6 || docType==7){
                        this.showDialog('', 'add');
                    }else{
                        this.showDialog('', 'serviceUpdate');
                    }
                    this.loadingShow = false;
                    if (result.error === 0) {
                        if(docType == 1){
                            this.service.categoryDescDoc = result.data.fileName;
                        }
                        else if(docType == 2){
                            this.service.riskDescDoc = result.data.fileName;
                        }
                        else if(docType == 3){
                            this.service.investDescDoc = result.data.fileName;
                        }
                        else if(docType == 4){
                            this.categoryDescDoc = result.data.fileName;
                        }
                        else if(docType == 5){
                            this.riskDescDoc = result.data.fileName;
                        }
                        else if(docType == 6){
                            this.investDescDoc = result.data.fileName;
                        }
						else if(docType == 7){
                            this.targetContract = result.data.fileName;
                        }
						else if(docType == 8){
                            this.service.targetContract = result.data.fileName;
                        }
                    }
                }.bind(this)
            });
        },
        copyServiceDateToLocalAdd: function(item){
            $.post({
                url: '/investmentMgmt/investmentStrategy/combinationProductHandle/getServiceUpdateDialogData.ajax',
                data: { groupId: item.groupId },
                success: function (result) {
                    if (result.error === 0) {
                        this.isTime = false;
                        this.isCode = false;
                        this.fundListAll = [];
                        this.fundHistory = [];
                        this.htmlList = [];
                        this.size = 0;
                        this.size2 = 0;
                        this.id = '';
                        this.endTime = '';
                        this.mysqlId = '';
                        $('.date-timepicker').val('');
                        // -------------  基本信息的参数  ------------------------
                        this.fundgroupType = result.data.fundGroupType;     // 组合类型
                        this.groupid = result.data.groupId;                 // 组合ID
                        this.groupname = result.data.groupName;             // 组合名称
                        this.fundgroupDesc = result.data.fundGroupDesc;     // 配置理念
                        this.targetContract = '';     // 目标赢协议
                        this.strategyMode = result.data.strategyMode;     // 策略模式
                        this.fundgroupAdvise = result.data.fundGroupAdvise; // 投资建议
                        this.recommendReason = result.data.recommendReason; // 推荐理由
                        this.recommendHoldTime = result.data.recommendHoldTime; // 推荐持有时间
                        this.onlinedate = result.data.onlineDate;           // 成立时间
                        $('#onlinedate').val(result.data.onlineDate);
                        this.proPageurl = result.data.normalPageUrl;        // 专业版宣传页
                        // $('#displayDate').val(result.data.displayDate);
                        // this.displayDate = result.data.displayDate;         // 组合上架日
                        this.ageRange = result.data.ageRange;               // 年龄段
                        this.branchCode = result.data.branchCode;           // 网点
                        this.acceptMode = result.data.acceptMode;           // 开放渠道
                        this.cooPreationMode = result.data.accptType;       // 合作模式
                        this.stopStartTime = result.data.manualStartTime;   // 暂停开始时间
                        this.stopEndTime = result.data.manualEndTime;       // 暂停结束时间
                        $('#stopStartTime').val(result.data.manualStartTime);
                        $('#stopEndTime').val(result.data.manualEndTime);
                        this.stopStatus = result.data.stopStatus;           // 交易状态
                        this.status = result.data.status;                   // 生效状态
                        // -------------  组合成分的参数  ------------------------
                        this.grouptype = result.data.riskType;              // 风险类型
                        this.risklevel = result.data.riskLevel;             // 风险等级
                        this.initamount = result.data.initAmount;           // 起投金额
                        this.commro = result.data.commro;                   // 费率折扣
                        this.minRedeemAmount = result.data.minRedeemAmount;     // 最低赎回金额
                        this.minChangeAmount = result.data.minChangeAmount;     // 最低调仓金额
                        this.minReserveAmount = result.data.minReserveAmount;   // 最低持有金额
                        this.rightLimit = result.data.rightLimit;               // 权益类基金定义
                        this.largeRedemptionPercent = result.data.largeRedemptionPercent;   // 大额赎回在全平台的比例
                        this.rightMaxratePerc = result.data.rightMaxratePerc;   // 权益类基金占比不超过
                        this.turnoverRatePerc = result.data.turnoverRatePerc;   // 账户换手率
                        this.singlevalueCustmaxPerc = result.data.singlevalueCustmaxPerc;   // 单只基金市值不得超过客户账户资产净值
                        this.categoryunitGroupmaxPerc = result.data.categoryunitGroupmaxPerc;   // 同策略持有基金份额不得超过该基金总份额占比
                        this.singleunitGroupmaxPerc = result.data.singleunitGroupmaxPerc;   // 持有单只指数基金的份额总和不得超过该基金总份额的
                        this.rightMinratePerc = result.data.rightMinratePerc;
                        this.valueMinratePerc = result.data.valueMinratePerc;
                        this.valueMaxratePerc = result.data.valueMaxratePerc;
                        this.isBlacklist = result.data.isBlacklist;
                        this.isTradeLimit = result.data.isTradeLimit;
                        this.investRiskLevel = result.data.investRiskLevel;   // 持有单只指数基金的份额总和不得超过该基金总份额的
                        this.isInvestment = result.data.isInvestment;           // 是否投顾组合
                        this.investType = result.data.investType || 'M';           // 投顾类型
                        this.investCustomers = result.data.investCustomers;           // 投顾组合客户
                        this.investPrincipal = result.data.investPrincipal;           // 名义本金
                        this.investDuration = result.data.investDuration;           // 投资时长
                        this.categoryDescDoc = '';           // 策略说明书地址
                        this.categoryDescDisplay = '';           // 策略说明书展示文案
                        this.riskDescDoc = '';           // 风险揭示书地址
                        this.riskDescDisplay = '';           // 风险揭示书展示文案
                        this.investDescDoc = '';           // 投顾协议书
                        this.investDescDisplay = '';           // 投顾协议书展示文案
                        this.fundgroupFeature = result.data.fundGroupFeature;   // 组合投资特点
                        this.investmentServicePerc = result.data.investmentServicePerc; // 投顾服务费率
                        this.riskControl = result.data.riskControl;             //是否过投顾风控
                        // -------------  调仓的参数  ------------------------
                        this.stringEstablishDate = result.data.onlineDate;  // 成立调仓日期，同成立日期
                        $('#stringEstablishDate').val(result.data.onlineDate);
                        if(result.data.fundGroupChangeDetailList && result.data.fundGroupChangeDetailList.length > 0){
                            this.fundHistory = result.data.fundGroupChangeDetailList[result.data.fundGroupChangeDetailList.length - 1].fundList.map(function(item){
                                var obj = this.fundListForOptionalFundIds.filter(function(fundListItem){return fundListItem.fundId == item.fundId})[0];
                                return {
                                    fundApkind: item.fundApkind,
                                    fundId: item.fundId,
                                    fundName: obj ? obj.fundName : '-',
                                    fundPercent: item.fundPercent,
                                    isUnderlyingCurrency: item.isUnderlyingCurrency
                                };
                            }.bind(this));
                            this.changeAdvise = result.data.fundGroupChangeDetailList[result.data.fundGroupChangeDetailList.length - 1].changeAdvise_origin;         // 成立调仓说明
                            this.isDisplay = 0;
                            this.htmlList = result.data.fundGroupChangeDetailList.slice(0, result.data.fundGroupChangeDetailList.length - 1).reverse().map(function(item){
                                return {
                                    changeAdvises: item.changeAdvise_origin,
                                    strChangetimes: item.changetime,
                                    isDisplays: item.isDisplay_origin,
                                    list: item.fundList.map(function(listItem){
                                        return {
                                            fundApkind: listItem.fundApkind,
                                            fundId: listItem.fundId,
                                            fundPercent: listItem.fundPercent,
                                            isUnderlyingCurrency: listItem.isUnderlyingCurrency
                                        };
                                    }),
                                    strCreattime: moment(new Date().getTime()).format("YYYYMMDDHHmmss") //调仓点击一下增加一个鼠标操作时间，隐藏式的
                                };
                            });
                            var _this = this;
                            setTimeout(() => {
                                $('.addHistoryList .strChangetimes').each(function(index,item){
                                    $(item).val(_this.htmlList[index].strChangetimes);
                                }.bind(this));
                            },0)
                        }
                        $('a[href="#handle"]').click();
                        $('#type1')[0].click();
                        this.showDialog('', 'add');
                    } else {
                        this.showDialog('', 'info', true, '获取该产品详情信息失败！');
                    }
                }.bind(this)
            });
        },
		// 批量上传弹窗
		batchUploadShow:function(type){
			this.batchFileUploadType = type;
			if(type=='local'){
				if (!/(^A[0-9]{4})$/.test(this.groupid)) {
					this.showDialog('add', 'info', true, '组合ID格式错误，应为以A开头的5位数字');
					return false;
				}
				this.showDialog('add','addfile',true);
			}else{
				this.showDialog('serviceUpdate','addfile',true);
			}
		},
		batchDownloadFile: function () {
            var elt = document.getElementById('data-table');
            var wb = XLSX.utils.table_to_book(elt, { sheet: 'Sheet JS' });
            XLSX.writeFile(wb, '模板示例.xlsx');
        },
        batchSelect: function () {
            document.getElementById("batchUploadFileInput").click();
        },
        batchShowFileName: function (event) {
            if (event.target.files[0]) {
                this.batchFilePath = event.target.files[0].name
            } else {
                this.batchFilePath = ''
            }
        },
        batchFileUpload: function () {
            var file = document.getElementById('batchUploadFileInput');
			console.log(file.files[0]);
			if(!file.files[0]){
				this.showDialog('addfile', 'info', true, '请选择文件上传');
				(this.batchFileUploadType=='local')&&$('#add').modal('hide');
				(this.batchFileUploadType!='local')&&$('#serviceUpdate').modal('hide');
				return;
			}
            var ext = file.files[0].name.lastIndexOf('.');
            ext = file.files[0].name.substr(ext - 0 + 1) //获取文件后缀名
            ext = ext.toLocaleLowerCase() //转为小写
            if (ext !== 'xls' && ext !== 'xlsx') {
				this.showDialog('addfile', 'info', true, '只能上传xls/xlsx文件表格');
				(this.batchFileUploadType=='local')&&$('#add').modal('hide');
				(this.batchFileUploadType!='local')&&$('#serviceUpdate').modal('hide');
                return;
            }
			var groupId='';
			if(this.batchFileUploadType=='local'){
                this.groupid&&(groupId=this.groupid);
            }else{
                this.service&&this.service.groupId&&(groupId=this.service.groupId);
            }
			if(!groupId){
				this.showDialog('addfile', 'info', true, '未填写产品ID,或获取失败');
				(this.batchFileUploadType=='local')&&$('#add').modal('hide');
				(this.batchFileUploadType!='local')&&$('#serviceUpdate').modal('hide');
				return
			}
            if (this.batchFilePath != '') {
                var formData = new FormData();
                // HTML 文件类型input，由用户选择
                formData.append("file", document.getElementById('batchUploadFileInput').files[0]);
                this.loadingShow = true;
                $.ajax({
                    url: "/investmentMgmt/investmentStrategy/combinationProductHandle/uploadXls.ajax?groupId="+groupId,
                    type: "POST",
                    data: formData,
                    processData: false, // 不处理数据
                    contentType: false, // 不设置内容类型
                    success: function (result) {
                        this.loadingShow = false;
                        $("#batchUploadFileInput").on("change", function (event) {
                            this.batchShowFileName(event)
                        }.bind(this));
                        if (result.error == 0) {
                            console.log(result);
							// 当前成分基金可选list
							var fundList = result.data.fundList;
							// excel中上传且校验通过的成分基金和备选基金
							var fundInfoExcelData = result.data.fundInfoExcelData;
							if(this.batchFileUploadType=='local'){
								// 本地新增组合
								// 成分基金list
								this.fundHistoryList = JSON.parse(JSON.stringify(fundList));
								// 备选基金list
								this.fundListForOptionalFundIds = JSON.parse(JSON.stringify(fundList));
								// 要选中的fundList和百分比赋值
								this.fundHistoryList.forEach(function(item){
									fundInfoExcelData.forEach(function(citem){	
										if(item.fundId==citem.fundId){
											item.check = true;
											item.fundPercent = citem.fundPercent
										}
									})
								})
								this.fundHistory = this.fundHistoryList.filter(function (item) {
									return item.check;
								}).map(function (item) {
									return {
										fundId: item.fundId,
										fundName: item.fundName,
										fundApkind: item.fundApkind || item.fundTypeForFundgroup,
										fundPercent: item.fundPercent,
										optionalFundList: item.optionalFundList,
										source:item.source,
										channelList:item.channelList,
										isUnderlyingCurrency:'N'
									};
								});
								// 备选基金赋值
								this.fundHistory.forEach(function(item){
									fundInfoExcelData.forEach(function(citem){
										if(item.fundId == citem.fundId){
											item.optionalFundList = citem.fundIdOptionalList.map(function(nitem){
												return {
													fundId: nitem,
													fundName: this.fundHistoryList.find(function(mitem){return mitem.fundId == nitem}).fundName,
													priority: 1
												}
											},this)
										}
									},this)
								},this)
							}else{
								// 服务端数据调仓
								// 成分基金赋值
								this.service.fundGroupFundListForSelect = JSON.parse(JSON.stringify(fundList));
								this.service.fundGroupFundListForSelect.forEach(function(item){
									item.canSelect = 0;
									item.check = false;
									item.reason = '';
									item.fundPercent = 0;
									item.isUnderlyingCurrency = 'N';
									item.optionalFundList = [];
									fundInfoExcelData.forEach(function(citem){
										if(item.fundId == citem.fundId){
											item.canSelect = 1;
											item.check = true;
											item.reason = '可选';
											item.fundPercent = citem.fundPercent;
										}
									})
								});
								this.service.newFundGroupChange.fundList = JSON.parse(JSON.stringify(this.service.fundGroupFundListForSelect.filter(function(item){
									return item.canSelect === 1 && item.check;
								})));
								// 备选基金赋值
								this.service.newFundGroupChange.fundList.forEach(function(item){
									fundInfoExcelData.forEach(function(citem){
										if(item.fundId == citem.fundId){
											item.optionalFundList = citem.fundIdOptionalList.map(function(nitem){
												return {
													fundId: nitem,
													fundName: this.service.fundGroupFundListForSelect .find(function(mitem){return mitem.fundId == nitem}).fundName,
													priority: 1
												}
											},this)
										}
									},this)
								},this)
							}
							$('#addfile').modal('hide');
                            (this.batchFileUploadType=='local')&&this.showDialog('add','info',true,'批量上传成功');
							(this.batchFileUploadType!='local')&&this.showDialog('serviceUpdate','info',true,'批量上传成功');
                        } else {
							$('#addfile').modal('hide');
							(this.batchFileUploadType=='local')&&this.showDialog('add','info',true,result.msg);
							(this.batchFileUploadType!='local')&&this.showDialog('serviceUpdate','info',true,result.msg);
                        }
                        document.getElementById('batchUploadFileInput').value = '';
                        this.batchFilePath = '';
                    }.bind(this)
                });
            }
        },
    },
    components: {
        'date-picker': VueBootstrapDatetimePicker
    },
    // 类型状态
    filters: {
        // actionType: function (item) {
        //     if (item) {
        //         return item.replace(/01/g, '申购').replace(/02/g, '赎回').replace(/03/g, '定投').replace(/04/g, '调仓').replace(/05/g, '解散');
        //     }
        // },
        // startTime: function (item) {
        //     if (item) {
        //         return item.replace(/(\d{2})(\d{2})(\d{2})/, '$1:$2:$3')
        //     }
        // },
        // endTime: function (item) {
        //     if (item) {
        //         return item.replace(/(\d{2})(\d{2})(\d{2})/, '$1:$2:$3')
        //     }
        // },

        // createTimes: function (item) {
        //     if (item) {
        //         return item.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/g, '$1$2$3')
        //     }
        // },
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
        grouptype: function (item) {
            if (item) {
                return item.replace(/1/g, '保守型').replace(/2/g, '稳健型').replace(/3/g, '平衡型').replace(/4/g, '进取型').replace(/5/g, '积极型')
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


