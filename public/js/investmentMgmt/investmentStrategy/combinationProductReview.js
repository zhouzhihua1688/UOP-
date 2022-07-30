new Vue({
    el: '#content',
    data: {
        // 主页面相关数据
        // 规则编号
        // loading
        loadingShow:false,
        // 本地新增修改备选基金list
        localOptionalFundList:[],
        id: '',
        // 产品
        product: "",
        // 保存弹窗产品
        saveproduct: "",
        // 业务类型
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
        fundGroupType:[],
        groupids: '',//本地数据库
        groupides: "",//业务数据
        groupidList: "",

        detailItem: [],  //业务数据基金信息
        // 修改弹窗唯一一个
        reviseAdvise: "",//修改弹窗调仓唯一一个

        fundgroupTypes: '',   //做查询用
        isUpdate: false,
        //隐藏假分页节点元素
        showMysql: false,
        updateId: '',
        tableData: [],
        serviceDate: [],
        diaMsg: '',
        //主表格分页数据
        totalPage: 0,
        currentIndex: 0,
        maxSpace: 5,
        pageMaxNum: '10',
        condition: '',
        currentIndex2: 0,
        // 全选
        allCheck: false,
        // 以下操作Mysql数据库参数
        // 复核状态
        reviewStatus: 2,
        // 数据库id
        mysqlId: "",
        // 数据类型(0:业务,1:Mysql数据库)
        type: "1",
        mysqlStatus: '',
        mysqlProduct: "",
        delete_flag: "",
        // 获取数据库产品所有ID
        arrId: [],
        oneId: '',
        operator: "",
        operate: '',
        // 对比数据
        tableData2: [],
        // 驳回备注
        revise_remark: '',
        update_timestamp: "",
        // type:1
        // 新增弹窗下拉列表数据
        fundGroupType: [],// 组合类型
        branchCodeList: [], // 网点号
        ageRangeList: [],   //年龄段
        grouptypeList: [],  //组合风险类型
        risklevelList: [],  //组合风险等级
        // 所有组合
        fundgroupType: "",  //组合类型
        groupId: '',
        fundGroups: [],//查询
        fundGroupList: [],//组合多选
        subGroupArr: [],

        checkDatils: [],  //业务数据详情
        loadingStatus: '数据获取中...',
        reviewText:'复核通过',
         // 后续添加详细信息 参数(6.5号）
        groupname:'',
        fundgroupDesc: "", //组合建议
		targetContract:"",//目标赢协议
		strategyMode:"",//策略运作模式
        fundgroupAdvise: "", // 智投建议
        acceptMode:'',
        cooPreationMode:'',
        stopStatus:'',
        proPageurl:"",
        grouptype:'',
        initamount:'',
        minRedeemAmount:'',
        minReserveAmount:'',
        risklevel:'',
        commro:"",
        minChangeAmount:'',
        fundHistory: [],
        changeAdvise:'',
        isDisplay:'',
        // 暂停交易显示时间按钮
        isTime: false,
        isCode: false,  //网点号显示

        fundDetialList:[],//修改里面 ：新增一个调仓信息
        updataAdvise:'',
        isDisplayAdd:"",
        strChangetime:'',
        paramsList:[],
        ArrRoList:[],
        isInvestment:'',   //是否投顾组合
        riskControl: 'N',   // 是否过投顾风控
        rightLimit: '',   // 权益类基金定义
        largeRedemptionPercent: '',   // 大额赎回在全平台的比例
        service: {
            updateTimestamp: '',            // 本地数据库时间戳
            serialno: '',                   // 序列号
            fundGroupType: '',              // 组合类型
            fundGroupTypeList: [],          // 组合类型列表
            groupId: '',                    // 组合ID
            groupName: '',                  // 组合名称
            fundGroupDesc: '',              // 配置理念
			targetContract:"",              //目标赢协议
			strategyMode:"", 				//策略运作模式
            fundGroupAdvise: '',            // 投资建议
            recommendReason: '',            // 推荐理由
            recommendHoldTime: '',          // 推荐持有时间
            onlineDate: '',                 // 成立时间
            acceptMode: '0',                // 开放渠道
            ageRange: '',                   // 适合年龄段
            ageRangeList: [],               // 适合年龄段列表
            accptType: '2',                 // 合作模式
            branchCode: [],                 // 网点号
            branchCodeList: [],             // 网点号列表
            stopStatus: '0',                // 交易状态
            manualStartTime: '',            // 暂停发起时间
            manualEndTime: '',              // 暂停终止时间
            displayDate: '',                // 组合上架日
            status: 'N',                    // 生效状态
            fundGroupFeature: '',           // 组合投资特点
            investmentServicePerc: '',      // 投顾服务费率
            normalPageUrl: '',              // 组合攻略页
            isInvestment: 'N',              // 是否投顾组合
            investType: 'M',                // 投顾类型
            investCustomers: '',            // 投顾组合客户
            investPrincipal: '',            // 名义本金
            investDuration: '',             // 投顾时长
            categoryDescDoc: '',            // 策略说明书文件名
            categoryDescDisplay: '',        // 策略说明书展示文案
            riskDescDoc: '',                // 风险揭示书文件名
            riskDescDisplay: '',            // 风险揭示书展示文案
            investDescDoc: '',              // 投顾协议文件名
            investDescDisplay: '',          // 投顾协议展示文案
            riskControl: 'N',               // 是否过投顾风控
            riskType: '0',                  // 风险类型
            riskTypeList: [],               // 风险类型列表
            initAmount: '',                 // 起投金额
            minRedeemAmount: '',            // 最低赎回金额
            minReserveAmount: '',           // 最低持有金额
            largeRedemptionPercent: '',     // 大额赎回在全平台的比例
            turnoverRatePerc: '',           // 账户换手率
            singlevalueCustmaxPerc: '',     // 单只基金市值不得超过客户账户资产净值
            categoryunitGroupmaxPerc: '',   // 同策略持有基金份额不得超过该基金总份额占比
            singleunitGroupmaxPerc: '',     // 持有单只指数基金的份额总和不得超过该基金总份额的
            rightMinratePerc: '',     // 权益类基金占净值比不低于
            valueMinratePerc: '',           // 债券基金占净值比不低于
            valueMaxratePerc: '',     // 债券基金占净值比不超过
            isBlacklist: '',   // 是否禁投公司黑名单内基金
            isTradeLimit: '',     // 是否禁投流通受限基金
            riskLevel: '0',                 // 风险等级
            riskLevelList: [],              // 风险等级列表
            commro: '',                     // 费率折扣
            minChangeAmount: '',            // 最低调仓金额
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
            fundListForOptional: []         // 备选基金列表
        },
        recommendReason:'',
        recommendHoldTime:'',
        fundgroupFeature:'',
        investmentServicePerc:'',
        // 20210601新功能添加
        checkTradeList:[],   //验证外部基金渠道和交易状态信息

        rightMaxratePerc:"",         //权益类基金占比不超过
        turnoverRatePerc:"",        //账户换手率
        singlevalueCustmaxPerc:"", // 单只基金市值不得超过客户账户资产净值
        categoryunitGroupmaxPerc:"",  // 同策略持有基金份额不得超过该基金总份额占比
        singleunitGroupmaxPerc:"",   // 持有单只指数基金的份额总和不得超过该基金总份额的
        rightMinratePerc: '',     // 权益类基金占净值比不低于
        valueMinratePerc: '',           // 债券基金占净值比不低于
        valueMaxratePerc: '',     // 债券基金占净值比不超过
        isBlacklist: '',   // 是否禁投公司黑名单内基金
        isTradeLimit: '',     // 是否禁投流通受限基金
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
    },

    created: function () {
        // this.select2()
        this.fundGroup();

        this.groupTypeList();
        this.riskLevelList();

    },
    mounted: function () {
        var dialogs = ['info', 'del', "update", "revise", 'reviewReject', "checkDatils",'checkFund'];
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
        }).next().on(ace.click_event, function () {
            $(this).prev().focus();
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
            _this.groupid = params ? params.selected : '';
        });
        this.branchCodeLists();
        this.fundGroup();
        this.getTableData(0, this.type);
        this.groupFundType();
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
        // 真分页
        // pageMaxNum: function () {
        //     this.getTableData(0, this.type);
        // },
        // 假分页
        pageMaxNum: function () {
            this.currentIndex = 0;
            this.getTableData(0, this.type)
        },
        condition: function () {
            this.currentIndex = 0;
        }
    },
    methods: {

        // 网点号
        branchCodeLists: function () {
            var _this = this
            $.post({
                url: '/investmentMgmt/investmentStrategy/combinationProductReview/branchCodeList.ajax',
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
        fundGroup: function () {
            var _this = this;
            $.post({
                url: '/investmentMgmt/investmentStrategy/combinationProductHandle/fundGroups.ajax',
                success: function (result) {
                    if (result.error === 0) {
                        _this.fundGroupList = result.data.body;
                        var str = '';
                        var filterList=[];
                        filterList=result.data.body.filter((item)=>{
                            // console.log(item);
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
        GroupList: function (item) {
            var _this = this
            $.post({
                url: '/investmentMgmt/investmentStrategy/combinationProductReview/fundGroups.ajax',
                success: function (result) {
                    if (result.error === 0) {
                        _this.subGroupList = result.data.body
                        let subGroupArrList = []
                        for (let subGroupItem of _this.subGroupList) {

                            if (item === subGroupItem.fundgroupType) {
                                subGroupArrList.push(subGroupItem)
                            }
                        }
                        _this.subGroupArr = subGroupArrList
                    }
                    else {
                        _this.showDialog('', 'info', false, result.msg);
                    }
                }
            });
        },
        // 添加弹窗里面获取组合类型数据
        groupFundType: function () {
            var _this = this;
            $.post({
                url: '/investmentMgmt/investmentStrategy/combinationProductReview/fundGroupType.ajax',
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
        // 获取风险类型
        groupTypeList: function () {
            var _this = this
            $.post({
                url: '/investmentMgmt/investmentStrategy/combinationProductReview/grouptypeList.ajax',
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
                url: '/investmentMgmt/investmentStrategy/combinationProductReview/risklevelList.ajax',
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
        // 适合年龄段
        agerangeList: function () {
            var _this = this;
            $.post({
                url: '/investmentMgmt/investmentStrategy/combinationProductReview/ageRangeList.ajax',
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
        // 获取表格数据
        getTableData: function (currentIndex, type) {
            var _this = this;
            var params = {};
            //传过去的状态参数
            params.type = type;
            // 获取业务数据
            if (type == 0) {
                this.isUpdate = true;  //显示业务端分页
                this.showMysql = false//显示假分页
                // params.pageNo = currentIndex + 1;
                // params.pageSize = this.pageMaxNum;
                _this.loadingStatus='数据获取中...',
                this.currentIndex = 0;
                _this.tableData = [];
                // if (this.groupid== "") {
                //     params.groupId = "ALL";
                // } else {
                //     params.groupId = this.groupid;
                // }
                var groupId = this.groupid;
                if(groupId==""){
                    params.groupId = "ALL";
                }else{
                    params.groupId =groupId;
                }
                var fundgroupType = this.fundgroupTypes;
                $.post({
                    url: '/investmentMgmt/investmentStrategy/combinationProductReview/getTableData.ajax',
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
                            // _this.tableData = result.data.tableData.filter(function (item) {
                            //     return item.groupid.indexOf(params.fundgroupType) > -1
                            // })
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
                _this.loadingStatus = '数据获取中...';
                params.reviewStatus = this.reviewStatus; //复核状态
                params.groupid = this.groupid;
                params.fundgroupType = this.fundgroupTypes;
                $.post({
                    url: '/investmentMgmt/investmentStrategy/combinationProductReview/getTableData.ajax',
                    data: params,
                    success: function (result) {
                        if (result.error === 0) {
                            _this.tableData = result.data;
                            console.log(_this.tableData)
                            if(_this.tableData==""){
                                _this.loadingStatus = '暂无数据';
                            }
                            _this.groupid="";
                        }
                        else {
                            _this.tableData=[]
                            _this.loadingStatus = '暂无数据';
                            _this.showDialog('', 'info', false, result.msg);

                        }
                    }
                });
            }
        },
        // 数据排序
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
        //新增和修改基本信息-提交的详细信息
        localDetail: function (item) {
            var _this = this;
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
                this.recommendReason = item.fundgroupNewFundgroupDO.recommendReason;
                this.recommendHoldTime = item.fundgroupNewFundgroupDO.recommendHoldTime;
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
                this.changeAdvise = item.fundgroupChangeROList[0].fundgroupChangeDO.changeAdvise;
                this.reviseAdvise = item.fundgroupChangeROList[0].fundgroupChangeDO.changeAdvise;
                this.strChangetime = item.fundgroupChangeROList[0].fundgroupChangeDO.strChangetime;
                this.strCreattime = item.fundgroupChangeROList[0].fundgroupChangeDO.strCreattime;
                this.stringEstablishDate = item.stringEstablishDate;
                this.stopStartTime =$("#stopStartTime").val(item.fundgroupSubdatetimeRO.stopStartTime) ;
                this.stopEndTime =$("#stopEndTime").val(item.fundgroupSubdatetimeRO.stopEndTime) ;
                this.displayDate = item.fundgroupNewFundgroupDO.displayDate;
                this.isDisplay = item.fundgroupChangeROList[0].fundgroupChangeDO.isDisplay;
                this.onlinedate = item.onlinedate;
                var onlinedate = item.onlinedate;
                this.status = item.fundgroupNewFundgroupDO.status;
                this.isInvestment = item.fundgroupNewFundgroupDO.isInvestment;
                this.riskControl = item.fundgroupNewFundgroupDO.riskControl;
                this.rightLimit = item.fundgroupNewFundgroupDO.rightLimit;
                this.largeRedemptionPercent = item.fundgroupNewFundgroupDO.largeRedemptionPercent;
                this.fundgroupFeature=item.fundgroupNewFundgroupDO.fundgroupFeature,  //2020.09.28 组合投资特点
                this.investmentServicePerc=item.fundgroupNewFundgroupDO.investmentServicePerc,////2020.09.28 投顾服务费率

                this.rightMaxratePerc=item.fundgroupNewFundgroupDO.rightMaxratePerc;        //权益类基金占比不超过
                this.turnoverRatePerc=item.fundgroupNewFundgroupDO.turnoverRatePerc;        //账户换手率
                this.singlevalueCustmaxPerc=item.fundgroupNewFundgroupDO.singlevalueCustmaxPerc; // 单只基金市值不得超过客户账户资产净值
                this.categoryunitGroupmaxPerc=item.fundgroupNewFundgroupDO.categoryunitGroupmaxPerc;  // 同策略持有基金份额不得超过该基金总份额占比
                this.singleunitGroupmaxPerc=item.fundgroupNewFundgroupDO.singleunitGroupmaxPerc;   // 持有单只指数基金的份额总和不得超过该基金总份额的
                this.rightMinratePerc=item.fundgroupNewFundgroupDO.rightMinratePerc;     // 权益类基金占净值比不低于
                this.valueMinratePerc=item.fundgroupNewFundgroupDO.valueMinratePerc;           // 债券基金占净值比不低于
                this.valueMaxratePerc=item.fundgroupNewFundgroupDO.valueMaxratePerc;     // 债券基金占净值比不超过
                this.isBlacklist=item.fundgroupNewFundgroupDO.isBlacklist;   // 是否禁投公司黑名单内基金
                this.isTradeLimit=item.fundgroupNewFundgroupDO.isTradeLimit;     // 是否禁投流通受限基金
                this.investRiskLevel=item.fundgroupNewFundgroupDO.investRiskLevel;     //投顾风险等级

                this.investType=item.fundgroupNewFundgroupDO.investType;       //投顾类型
                this.investCustomers=item.fundgroupNewFundgroupDO.investCustomers;       //投顾组合客户
                this.investPrincipal=item.fundgroupNewFundgroupDO.investPrincipal;       //名义本金
                this.investDuration=item.fundgroupNewFundgroupDO.investDuration;       //投资时长

                this.categoryDescDoc=item.fundgroupNewFundgroupDO.categoryDescDoc;        //策略说明书
                this.riskDescDoc=item.fundgroupNewFundgroupDO.riskDescDoc;        //风险揭示书
                this.investDescDoc=item.fundgroupNewFundgroupDO.investDescDoc;        //投顾协议
                this.categoryDescDisplay=item.fundgroupNewFundgroupDO.categoryDescDisplay;        //策略说明书文案
                this.riskDescDisplay=item.fundgroupNewFundgroupDO.riskDescDisplay;        //风险揭示书文案
                this.investDescDisplay=item.fundgroupNewFundgroupDO.investDescDisplay;        //投顾协议文案

                var displayDate = item.fundgroupNewFundgroupDO.displayDate;
                var stringEstablishDate = moment(item.stringEstablishDate).format("YYYY-MM-DD HH:mm:ss");
                $("#onlinedate").val(onlinedate)
                $("#displayDate").val(displayDate)
                $("#stringEstablishDate").val(stringEstablishDate)

                if (this.stopStatus != 0) {     //暂停截止时间的展示
                    _this.isTime = true;
                } else {
                    _this.isTime = false;
                }
                if (this.fundgroupType == "04") {
                    if (this.cooPreationMode != "2") {
                        _this.isCode = true;
                    } else {
                        _this.isCode = false;
                    }
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

                // 调整前
                // var ArrRoList = []
                // ArrRoList .push(item.fundgroupChangeROList[0])
                _this.ArrRoList =item.fundgroupChangeROList
                for (var i = 0; i < _this.ArrRoList.length; i++) {
                    // var ArrDetailList=[]
                    for (var j = 0; j < _this.ArrRoList[i].fundgroupChangeDetailList.length; j++) {
                        _this.fundListAll.push({
                            fundId: _this.ArrRoList[i].fundgroupChangeDetailList[j].fundid,
                            fundApkind: _this.ArrRoList[i].fundgroupChangeDetailList[j].fundApkind,  //产品类型
                            fundPercent: _this.ArrRoList[i].fundgroupChangeDetailList[j].fundPercent,          //调整仓位
                            isUnderlyingCurrency: _this.ArrRoList[i].fundgroupChangeDetailList[j].isUnderlyingCurrency
                        })
                    }
                }
                _this.fundHistory = _this.fundListAll;
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
                this.reviseAdvise = item.changeAdvise;
                this.stringEstablishDate = item.fundgroupNewFundgroupDO.stringEstablishDate;
                this.displayDate = item.fundgroupNewFundgroupDO.displayDate;
                this.status = item.fundgroupNewFundgroupDO.status;
                this.isInvestment = item.fundgroupNewFundgroupDO.isInvestment;
                this.riskControl = item.fundgroupNewFundgroupDO.riskControl;
                this.rightLimit = item.fundgroupNewFundgroupDO.rightLimit;
                this.largeRedemptionPercent = item.fundgroupNewFundgroupDO.largeRedemptionPercent;
                $("#displayDates").val(item.fundgroupNewFundgroupDO.displayDate)
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
                this.recommendReason = item.fundgroupNewFundgroupDO.recommendReason;
                this.recommendHoldTime = item.fundgroupNewFundgroupDO.recommendHoldTime;

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
                    if (this.cooPreationMode != "2") {
                        _this.isCode = true;
                    } else {
                        _this.isCode = false;
                    }
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
        //修改调仓详细信息
        localHouse:function(item){
            var _this=this;

            if(item.fundgroupChangeROList) {
                item.fundgroupChangeROList.forEach(function(itemList){
                    _this.updataAdvise=itemList.fundgroupChangeDO.changeAdvise;
                    _this.isDisplayAdd=itemList.fundgroupChangeDO.isDisplay;
                    _this.strChangetime=itemList.fundgroupChangeDO.strChangetime;
                    _this.fundDetialList=itemList.fundgroupChangeDetailList
                })
                this.showDialog('', 'houseUpdate');
            }else{                                  //展示之是修改了调仓说明和展示字段
                var _this = this;
                _this.updateList = false;
                _this.updataAdvise="";
                _this.isDisplayAdd=""

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
                                    isUnderlyingCurrency: arrDetailList[i].isUnderlyingCurrency
                                })
                            }
                        }
                    }
                });
                this.isDisplay = "";

                this.operate = item.operate
                this.delete_flag = item.delete_flag

                //修改弹窗里面获取组合类型数据
                _this.groupFundType();
                // 年龄段
                _this.agerangeList();

                this.showDialog('', 'houseUpdate2');
            }
        },

        // Mysql审核通过---执行数据库和业务接口新增,修改,删除数据操作
        reviewPass: function (item) {
            var _this = this;
            // debugger;
            this.loadingShow = true;
            if(item.dialogData){ // dialogData存在，为全量修改
                $.post({
                    url: '/investmentMgmt/investmentStrategy/combinationProductReview/allUpdateReviewPass.ajax',   //修改基本信息
                    data: {params: JSON.stringify(item)},
                    success: function (result) {
                        if (result.error === 0) {
                            _this.getTableData(0, 1);
                        }
                        _this.loadingShow = false;
                        _this.showDialog('', 'info', false, result.msg);
                    }
                });
                return;
            }
            var params = {};
            params.type = this.type;
            params.myqsql = item.mySQLId; //数据表字段id
            params.delete_flag = item.delete_flag //当前状态
            params.operator = item.operator
            // 产品参数
            params.id = item.id
            // params.product = item.mysqlProduct;

            // params.fundgroupType = item.fundgroupType;
            // params.groupname = item.groupname;
            // params.groupid = item.groupid;
            // params.fundgroupDesc = item.fundgroupDesc;
            // params.fundgroupAdvise = item.fundgroupAdvise;
            // params.proPageurl = item.proPageurl;
            // params.normalPageurl = item.normalPageurl;
            // params.stopStatus = item.stopStatus;
            // params.ageRange = item.ageRange;      //年龄段
            // params.sofarYield = item.sofarYield;    //收益率
            // params.branchCode = item.branchCode;       //网点
            // params.acceptMode = item.acceptMode;       //渠道
            // params.cooPreationMode = item.cooPreationMode; //合作模式;
            // params.onlinedate = item.onlinedate;
            // params.stopStartTime = item.stopStartTime;
            // params.stopEndTime = item.stopEndTime;

            var fundgroupChangeROList = item.fundgroupChangeROList;  //值修改基本信息
            var fundgroupNewFundgroupDO = item.fundgroupNewFundgroupDO;
            var fundgroupSubdatetimeRO = item.fundgroupSubdatetimeRO;

            if (!fundgroupChangeROList && fundgroupNewFundgroupDO && fundgroupSubdatetimeRO) {     //修改基本信息
                params.fundgroupNewFundgroupDO = item.fundgroupNewFundgroupDO;
                params.fundgroupSubdatetimeRO = item.fundgroupSubdatetimeRO;
            } else if (!fundgroupChangeROList && !fundgroupNewFundgroupDO && !fundgroupSubdatetimeRO) {   //只是修改调仓说明和是否显示
                params.groupid = item.groupid;      //组合Id  A+四位数字
                params.serialno = item.serialno;
                params.changeAdvise = item.changeAdvise;
                params.isDisplay = item.isDisplay;
            }else if(fundgroupChangeROList&&!fundgroupNewFundgroupDO && !fundgroupSubdatetimeRO){
                item.fundgroupChangeROList.forEach(function(item){
                    params.fundgroupChangeDO = item.fundgroupChangeDO;
                    params.fundgroupChangeDetailList = item.fundgroupChangeDetailList;
                })
            }else {
                params.fundgroupChangeROList = item.fundgroupChangeROList;
                params.fundgroupNewFundgroupDO = item.fundgroupNewFundgroupDO;
                params.fundgroupSubdatetimeRO = item.fundgroupSubdatetimeRO;
            }
            if(params.fundgroupNewFundgroupDO){
                params.fundgroupNewFundgroupDO.bigRedeemRate = params.fundgroupNewFundgroupDO.largeRedemptionPercent;
            }

            params.operate = item.operate;
            params.reviewerTime = moment(new Date().getTime()).format("YYYY-MM-DD HH:mm:ss");//复核时间
            params.updateTime = moment(item.update_timestamp).format("YYYY-MM-DD HH:mm:ss");
            console.log("===",params)
            if (this.type == 1) {
                if (params.operate != 1 && params.operate != 3) {
                    if (!fundgroupChangeROList && fundgroupNewFundgroupDO && fundgroupSubdatetimeRO) {
                        console.log("修改基本信息")
                        $.post({
                            url: '/investmentMgmt/investmentStrategy/combinationProductReview/reviewPass.ajax',   //修改基本信息
                            data: params,
                            success: function (result) {
                                if (result.error === 0) {
                                    _this.getTableData(0, params.type);
                                }
                                _this.loadingShow = false;
                                _this.showDialog('', 'info', false, result.msg);
                            }
                        })
                    } else if (!fundgroupChangeROList && !fundgroupNewFundgroupDO && !fundgroupSubdatetimeRO) {
                        console.log("修改调仓说明和是否显示")
                        $.post({
                            url: '/investmentMgmt/investmentStrategy/combinationProductReview/reviewPass1.ajax',   //只是修改调仓说明和是否显示
                            data: params,
                            success: function (result) {
                                if (result.error === 0) {
                                    _this.getTableData(0, params.type);
                                }
                                _this.loadingShow = false;
                                _this.showDialog('', 'info', false, result.msg);
                            }
                        })
                    } else if(fundgroupChangeROList&&!fundgroupNewFundgroupDO && !fundgroupSubdatetimeRO){
                        console.log("修改里新增调仓")
                        let ArrList=[]
                        fundgroupChangeROList.forEach(function(item){
                            ArrList.push(item)
                        })
                        $.post({
                            url: '/investmentMgmt/investmentStrategy/combinationProductReview/checkFund.ajax',  //验证是否处于分红中
                            data:{
                                fundgroupChangeROList:JSON.stringify(ArrList)
                            },
                            success: function (result) {
                                if (result.error === 0) {
                                    if(result.data.body==true){
                                        $.post({
                                            url: '/investmentMgmt/investmentStrategy/combinationProductReview/reviewPass2.ajax',   //修改里新增调仓
                                            data: params,
                                            success: function (result) {
                                                if (result.error === 0) {
                                                    _this.getTableData(0, params.type);
                                                }
                                                _this.loadingShow = false;
                                                _this.showDialog('', 'info', false, result.msg);
                                            }
                                        })
                                    }
                                }else {
                                    _this.showDialog('', 'checkFund', false, result.msg);
                                    $("#checkBtn").click(function () {
                                        $.post({
                                            url: '/investmentMgmt/investmentStrategy/combinationProductReview/reviewPass2.ajax',
                                            data: params,
                                            success: function (result) {
                                                if (result.error === 0) {
                                                    _this.getTableData(0, params.type);
                                                }
                                                _this.loadingShow = false;
                                                _this.showDialog('', 'info', false, result.msg);
                                            }
                                        });
                                    })
                                }
                            }
                        });
                    }
                } else if (params.operate == 3) {
                    $.post({
                        url: '/investmentMgmt/investmentStrategy/combinationProductReview/reviewPass.ajax',
                        data: params,
                        success: function (result) {
                            if (result.error === 0) {
                                _this.getTableData(0, params.type);
                            }
                            _this.loadingShow = false;
                            _this.showDialog('', 'info', false, result.msg);
                        }
                    })
                }
                else {
                    console.log("新增:",params)
                    $.post({
                        url: '/investmentMgmt/investmentStrategy/combinationProductReview/checkFund.ajax',  //验证是否处于分红中
                        data:{
                            fundgroupChangeROList:JSON.stringify(item.fundgroupChangeROList)
                        },
                        success: function (result) {
                            if (result.error === 0) {
                                if(result.data.body==true){
                                    $.post({
                                        url: '/investmentMgmt/investmentStrategy/combinationProductReview/SavePass.ajax',
                                        data: params,
                                        success: function (result) {
                                            if (result.error === 0) {
                                                _this.getTableData(0, params.type);
                                            }
                                            _this.loadingShow = false;
                                            _this.showDialog('', 'info', false, result.msg);
                                        }
                                    });
                                }
                            }else{
                                _this.loadingShow = false;
                                _this.showDialog('', 'checkFund', false, result.msg);
                                $("#checkBtn").click(function(){
                                    $.post({
                                        url: '/investmentMgmt/investmentStrategy/combinationProductReview/SavePass.ajax',
                                        data: params,
                                        success: function (result) {
                                            if (result.error === 0) {
                                                _this.getTableData(0, params.type);
                                            }
                                            _this.loadingShow = false;
                                            _this.showDialog('', 'info', false, result.msg);
                                        }
                                    });
                                })
                            }
                        }
                    });

                }
            }
        },
        // 计算净值
        calc:function(item){
            var _this=this;
            var params={}
            params.type = this.type;
            params.myqsql = item.mySQLId; //数据表字段id
            params.groupid = item.groupid;
            params.updateTime = moment(item.update_timestamp).format("YYYY-MM-DD HH:mm:ss");
            params.operate = item.operate;
            console.log(params)
            $.post({
                url: '/investmentMgmt/investmentStrategy/combinationProductReview/calcParams.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(0, params.type);
                    }
                    _this.showDialog('', 'info', false, result.msg);
                }
            });
        },

        // Mysql审核驳回
        rejects: function (item) {
            var _this = this;

            this.itemData = JSON.stringify(item);
            this.revise_remark = '';
            this.showDialog('', 'reviewReject', false);
            this.myqsql = item.mySQLId; //数据表字段id
            this.operator = item.operator; //数据表字段id
            this.update_timestamp = item.update_timestamp;
        },
        reviewReject: function (item) {
            var _this = this;
            // var params = {};
            var params = JSON.parse(this.itemData);
            params.type = this.type;
            params.myqsql = this.myqsql; //数据表字段id
            params.operator = this.operator

            params.reviewerTime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");//复核时间
            params.update_timestamp = moment(this.update_timestamp).format("YYYY-MM-DD HH:mm:ss");
            params.revise_remark = this.revise_remark;
            if(params.revise_remark==""){
                _this.showDialog('reviewReject', 'info', true, '请填写驳回原因!');
                return false
            }
            $.post({
                url: '/investmentMgmt/investmentStrategy/combinationProductReview/reviewReject.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.getTableData(0, params.type);
                    }
                    _this.showDialog('reviewReject', 'info', false, result.msg);
                }
            });
        },

        // 业务详情信息
        serviceDetail: function (groupId) {
            var _this = this;
            let params = {}
            params.groupId = groupId;
            params.type = 0;
            console.log(params)
            $.post({
                url: '/investmentMgmt/investmentStrategy/combinationProductReview/details.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
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
        showLocalAllUpdate: function(localItem){
            $.post({
                url: '/investmentMgmt/investmentStrategy/combinationProductReview/getLocalDialogListData.ajax',
                success: function (result) {
                    if (result.error === 0) {
                        this.setServiceParams(localItem, result.data);
                        this.showDialog('','serviceUpdate');
                    } else {
                        this.showDialog('', 'info', true, '获取弹窗所需列表数据失败！');
                    }
                }.bind(this)
            });
        },
        setServiceParams: function(localItem, listObj){
            $('#serviceUpdate .tabbable li').removeClass('active');
            $('#serviceUpdate .tab-pane').removeClass('active');
            $('#serviceUpdate .tabbable li').eq(0).addClass('active');
            $('#serviceUpdate .tab-pane').eq(0).addClass('active');
            var findName = function(key,list){
                if(key instanceof Array){
                    return key.map(function(keyItem){
                        var obj = list.filter(function(item){
                            return item.pmco === keyItem
                        })[0];
                        if(obj){
                            return obj.pmnm
                        }
                        return keyItem;
                    }).join('，');
                }
                else {
                    var obj = list.filter(function(item){
                        return item.pmco === key
                    })[0];
                    if(obj){
                        return obj.pmnm
                    }
                    return key;
                }
            };
            var findRecommendHoldTime = function (time) {
                if(time == '01'){return '1月';}
                if(time == '02'){return '3月';}
                if(time == '03'){return '6月';}
                if(time == '04'){return '9月';}
                if(time == '05'){return '1年';}
                if(time == '06'){return '18月';}
                if(time == '07'){return '2年';}
                if(time == '08'){return '3年';}
                if(time == '09'){return '5年';}
                if(time == '10'){return '8年';}
                if(time == '11'){return '10年';}
                return time;
            }
            var dialogData = localItem.dialogData;
            this.service.serialno = localItem.serialno;
            this.service.fundGroupType = dialogData.fundGroupType;
            this.service.fundGroupType_show = findName(dialogData.fundGroupType,listObj.fundGroupTypeList);
            this.service.groupId = dialogData.groupId;
            this.service.groupName = dialogData.groupName;
            this.service.fundGroupDesc = dialogData.fundGroupDesc;
            this.service.targetContract = dialogData.targetContract;
            this.service.strategyMode = dialogData.strategyMode;
            this.service.fundGroupAdvise = dialogData.fundGroupAdvise;
            this.service.recommendReason = dialogData.recommendReason;
            this.service.recommendHoldTime = dialogData.recommendHoldTime;
            this.service.recommendHoldTime_show = findRecommendHoldTime(dialogData.recommendHoldTime);
            this.service.onlineDate = dialogData.onlineDate;
            this.service.acceptMode = dialogData.acceptMode;
            this.service.ageRange = dialogData.ageRange;
            this.service.ageRange_show = findName(dialogData.ageRange,listObj.ageRangeList);
            this.service.accptType = dialogData.accptType;
            this.service.branchCode = dialogData.branchCode;
            this.service.branchCode_show = findName(dialogData.branchCode,listObj.branchCodeList);
            this.service.stopStatus = dialogData.stopStatus;
            this.service.manualStartTime = dialogData.manualStartTime;
            this.service.manualEndTime = dialogData.manualEndTime;
            this.service.displayDate = dialogData.displayDate;
            this.service.status = dialogData.status;
            this.service.isInvestment = dialogData.isInvestment;
            this.service.investType = dialogData.investType;
            this.service.investCustomers = dialogData.investCustomers;
            this.service.investPrincipal = dialogData.investPrincipal;
            this.service.investDuration = dialogData.investDuration;
            this.service.categoryDescDoc = dialogData.categoryDescDoc;
            this.service.categoryDescDisplay = dialogData.categoryDescDisplay;
            this.service.riskDescDoc = dialogData.riskDescDoc;
            this.service.riskDescDisplay = dialogData.riskDescDisplay;
            this.service.investDescDoc = dialogData.investDescDoc;
            this.service.investDescDisplay = dialogData.investDescDisplay;
            this.service.fundGroupFeature = dialogData.fundGroupFeature;
            this.service.investmentServicePerc = dialogData.investmentServicePerc;
            this.service.normalPageUrl = dialogData.normalPageUrl;
            this.service.riskControl = dialogData.riskControl;
            this.service.riskType = dialogData.riskType;
            this.service.riskType_show = findName(dialogData.riskType,listObj.riskTypeList);
            this.service.initAmount = dialogData.initAmount;
            this.service.minRedeemAmount = dialogData.minRedeemAmount;
            this.service.minReserveAmount = dialogData.minReserveAmount;
            this.service.largeRedemptionPercent = dialogData.largeRedemptionPercent;
            this.service.riskLevel = dialogData.riskLevel;
            this.service.riskLevel_show = findName(dialogData.riskLevel,listObj.riskLevelList);
            this.service.commro = dialogData.commro;
            this.service.minChangeAmount = dialogData.minChangeAmount;
            this.service.rightLimit = dialogData.rightLimit;
            this.service.rightMaxratePerc = dialogData.rightMaxratePerc;
            this.service.investRiskLevel = dialogData.investRiskLevel;
            this.service.largeRedemptionPercent = dialogData.largeRedemptionPercent;
            this.service.turnoverRatePerc = dialogData.turnoverRatePerc;
            this.service.singlevalueCustmaxPerc = dialogData.singlevalueCustmaxPerc;
            this.service.categoryunitGroupmaxPerc = dialogData.categoryunitGroupmaxPerc;
            this.service.singleunitGroupmaxPerc = dialogData.singleunitGroupmaxPerc;
            this.service.rightMinratePerc = dialogData.rightMinratePerc;
            this.service.valueMinratePerc = dialogData.valueMinratePerc;
            this.service.valueMaxratePerc = dialogData.valueMaxratePerc;
            this.service.isBlacklist = dialogData.isBlacklist;
            this.service.isTradeLimit = dialogData.isTradeLimit;
            this.service.isAddFundGroup = dialogData.isAddFundGroup;
            this.service.fundGroupChangeDetailList = dialogData.fundGroupChangeDetailList;
            this.service.newFundGroupChange = dialogData.newFundGroupChange;
        },
        showOptionalFundList: function(fundGroupItem){
            console.log(fundGroupItem);
            this.service.fundListForOptional = fundGroupItem.optionalFundList.map(function(item){
                return {
                    fundId: item.fundId,
                    fundName: item.fundName,
                    priority: item.priority
                };
            });
            this.showDialog('serviceUpdate','optionalFundList',true);
        },
        checkLocalOptionalFundList: function(itemList){
            console.log(itemList);
            this.localOptionalFundList = [];
            if(itemList.optionalFundList&&itemList.optionalFundList.length>0){
                this.localOptionalFundList = itemList.optionalFundList;
            }
            this.showDialog('add','localOptionalFundList',true);
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
        formatZeroData(val){
            if(val=='0'){
                return  '0%'
            }else if(val!==null&&val!==undefined){
                return val+'%'
            }else{
                return '空'
            }
        },
        // // 单选
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
        //主表格真分页方法


        //主表格假分页方法
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
        actionType: function (item) {
            if (item) {
                return item.replace(/01/g, '申购').replace(/02/g, '赎回').replace(/03/g, '定投').replace(/04/g, '调仓').replace(/05/g, '解散');
            }
        },
        startTime: function (item) {
            if (item) {
                return item.replace(/(\d{2})(\d{2})(\d{2})/, '$1:$2:$3')
            }
        },
        endTime: function (item) {
            if (item) {
                return item.replace(/(\d{2})(\d{2})(\d{2})/, '$1:$2:$3')
            }
        },
        createtime: function (item) {
            if (item) {
                var Arrary = [];
                for(var i = 0; i < item.length - 1; i++){
                    Arrary.push(item[i]);
                }
                var fixZero = function (num) {
                    return num < 10 ? '0' + num : num;
                };
                return [Arrary[0],Arrary[1],Arrary[2],Arrary[3],Arrary[4],Arrary[5]].map(function (value) {
                    return fixZero(value)
                }).join('');
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
        investRiskLevelFilter: function(value){
            var obj = {
                '1': "R0-极低风险",
                '2': "R1-低风险",
                '3': "R2-较低风险",
                '4': "R3-中等风险",
                '5': "R4-较高风险",
                '6': "R5-高风险"

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
        // 开放渠道
        filterAcceptMode: function (value) {
            var obj = {
                "0": "柜台",
                "2": "网上",
                "6": "第三方",
                "7": "企业版"
            }
            return obj[value] || value;
        },
        // 合作模式
        filterAccptType: function (value) {
            var obj = {
                "0": "直销三方",
                "1": "直销前置",
                "2": "代销"
            }
            return obj[value] || value;
        },
        // 交易状态
        filterStopStatus: function (value) {
            var obj = {
                "0": "正常交易",
                "1": "暂停申购",
                "2": "暂停赎回",
                "3": "暂停交易"
            }
            return obj[value] || value;
        },
        // 生效状态
        filterStatus: function (value) {
            var obj = {
                "N": "正常",
                "C": "删除"
            }
            return obj[value] || value;
        },
        // 是否投顾
        filterIsInvestment: function (value) {
            var obj = {
                "N": "否",
                "Y": "是"
            }
            return obj[value] || value;
        },
        filterInvestFundtype: function(value){
            var obj = {
                "M": "管理型",
                "G": "一般型"
            }
            return obj[value] || value;
        },
        // 是否过风控
        filterRiskControl: function (value) {
            var obj = {
                "N": "否",
                "Y": "是"
            }
            return obj[value] || value;
        },
        createTimes: function (item) {
            if (item) {
                return item.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/g, '$1$2$3 $4:$5:$6')
            }
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
    }
});