new Vue({
    el: '#content',
    data: {
        operator: '',
        operateType: '',
        //主页面相关数据
        tableData: [],
        diaMsg: '',
        // 查看详情
        jsonDetail: '',
        //主表格分页数据
        currentIndex: 0,
        maxSpace: 5,
        totalPage: 0,
        pageMaxNum: 10,
        mappingTab:{
            combinationProductRisk:{
                rightLimit : '权益类基金定义',
                largeRedemptionPercent :'大额赎回在全平台的比例',
                rightMaxratePerc :'权益类基金占比不超过',
                singlevalueCustmaxPerc :'单只基金市值不得超过客户账户资产净值',
                categoryunitGroupmaxPerc :'同策略持有基金份额不得超过该基金总份额占比',
                turnoverRatePerc :'账户换手率',
                singleunitGroupmaxPerc :'持有单只指数基金的份额总和不得超过该基金总份额的',
                rightMinratePerc :'权益类基金占净值比不低于',
                valueMinratePerc :'债券基金占净值比不低于',
                valueMaxratePerc :'债券基金占净值比不超过',
                isBlacklist :'是否禁投公司黑名单内基金',
                isTradeLimit :'是否禁投流通受限基金',
                noPushServerWords :'单个策略组合持有单只基金的市值不高于组合资产净值',
            },
            combinationProductRiskReview:{
                sqlOprate:'风控复核操作',
                sqlOprator:'操作人'
            },
            combinationProductRiskCheck:{
                groupId:'组合代码',
                groupName:'组合名称',
                groupType:'组合类型',
                stockPercentForRights:'权益类基金定义中对持股比例的要求（百分比）',
                rightLimit : '权益类基金定义',
                largeRedemptionPercent :'大额赎回在全平台的比例',
                rightMaxratePerc :'权益类基金占比不超过',
                singlevalueCustmaxPerc :'单只基金市值不得超过客户账户资产净值',
                categoryunitGroupmaxPerc :'同策略持有基金份额不得超过该基金总份额占比',
                turnoverRatePerc :'账户换手率',
                singleunitGroupmaxPerc :'持有单只指数基金的份额总和不得超过该基金总份额的',
                rightMinratePerc :'权益类基金占净值比不低于',
                valueMinratePerc :'债券基金占净值比不低于',
                valueMaxratePerc :'债券基金占净值比不超过',
                isBlacklist :'是否禁投公司黑名单内基金',
                isTradeLimit :'是否禁投流通受限基金',
                noPushServerWords :'单个策略组合持有单只基金的市值不高于组合资产净值',
                // largeRedemptionPercent:'大额赎回阈值（百分比）',
                isInvestment:'是否投顾组合',
                opType:'操作类型',
                fundDetails:'成分基金信息',
                oldFundDetails:'调仓前成分基金信息',
                fundId:'基金代码',
                fundName:'基金名称',
                fundPercent:'基金占比',
                optionalFundIds:'备选基金池',
                optionalFundList:'备选基金池',
                createTimestamp:'组合创建时间',
                sqlOprate:'风控检查操作',
                sqlOprator:'操作人'
            },
            combinationProductHandle:{
                fundgroupType:'组合类型',
                fundGroupType:'组合类型',
                groupid:'组合ID',
                groupId:'组合ID',
                groupname:'组合名称',
                groupName:'组合名称',
                stringEstablishDate:'成立调仓日期',
                grouptype:'风险类型',
                onlinedate:'上线日期',
                onlineDate:'上线日期',
                rightPercent:'权益类占比',
                fixPercent:'固收类占比',
                vaPercent:'货币类占比',
                otherPercent:'其它占比',
                fundgroupChangeROList:'组合调仓信息',
                fundgroupChangeDO:'组合调仓基本信息',
                isDisplay:'是否展示',
                changeAdvise:'组合调仓说明',
                strChangetime:'调仓时间',
                strCreattime:'调仓创建时间',
                fundgroupChangeDetailList:'组合调仓列表',
                fundGroupChangeDetailList:'组合调仓列表',
                fundid:'基金ID',
                fundId:'基金ID',
                fundName:'基金名称',
                fundApkind:'基金类型',
                fundTypeForFundgroup:'基金类型',
                fundPercent:'基金占比',
                isUnderlyingCurrency:'是否是底层货币',
                fundgroupNewFundgroupDO:'组合基本信息',
                commro:'费率折扣',
                status:'生效状态',
                ageRange:'年龄段',
                risklevel:'风险等级',
                riskLevel:'风险等级',
                initamount:'起投金额',
                investType:'投顾类型',
                onlinetime:'成立时间',
                establishDate:'成立时间',
                proPageurl:'组合攻略页',
                normalPageUrl:'组合攻略页',
                rightLimit : '权益类基金定义',
                largeRedemptionPercent :'大额赎回在全平台的比例',
                rightMaxratePerc :'权益类基金占比不超过',
                singlevalueCustmaxPerc :'单只基金市值不得超过客户账户资产净值',
                categoryunitGroupmaxPerc :'同策略持有基金份额不得超过该基金总份额占比',
                turnoverRatePerc :'账户换手率',
                singleunitGroupmaxPerc :'持有单只指数基金的份额总和不得超过该基金总份额的',
                rightMinratePerc :'权益类基金占净值比不低于',
                valueMinratePerc :'债券基金占净值比不低于',
                valueMaxratePerc :'债券基金占净值比不超过',
                isBlacklist :'是否禁投公司黑名单内基金',
                isTradeLimit :'是否禁投流通受限基金',
                riskControl :'是否过投顾风控',
                riskDescDoc :'风险揭示书地址',
                isInvestment :'是否投顾',
                fundgroupDesc :'配置理念',
                fundGroupDesc :'配置理念',
                investDescDoc :'投顾协议书地址',
                investDuration :'投资时长',
                categoryDescDoc :'策略说明书地址',
                fundgroupAdvise :'投资建议',
                fundGroupAdvise :'投资建议',
                investCustomers :'投顾组合客户',
                investPrincipal :'名义本金',
                investRiskLevel :'投顾风险等级',
                minChangeAmount :'最低调仓金额',
                minRedeemAmount :'最低赎回金额',
                recommendReason :'推荐理由',
                riskDescDisplay :'风险揭示书文案',
                fundgroupFeature :'组合投资特点',
                fundGroupFeature :'组合投资特点',
                minReserveAmount :'最低持有金额',
                investDescDisplay :'投顾协议书文案',
                recommendHoldTime :'推荐持有时间',
                categoryDescDisplay :'策略说明书文案',
                investmentServicePerc :'投顾服务费率',
                fundgroupSubdatetimeRO:'组合基本信息补充',
                acceptMode:'开放渠道',
                branchCode:'网点号',
                stopStatus:'交易状态',
                stopEndTime:'暂停结束时间',
                manualEndTime:'暂停结束时间',
                stopStartTime:'暂停开始时间',
                manualStartTime:'暂停开始时间',
                cooPreationMode:'合作模式',
                operator:'创建人',
                sqlOprate:'经办操作',
                sqlOprator:'操作人',
                serialno:'组合序列号',
                serialNo:'组合序列号',
                refSerialNo:'组合序列号',
                dialogData:'组合信息合集',
                riskType:'风险类型',
                accptType:'合作模式',
                createTime:'创建时间',
                initAmount:'起投金额',
                manualEndTime:'暂停终止时间',
                isAddFundGroup:'是否添加调仓',
                newFundGroupChange:'新的基金调仓',
                fundList:'基金列表',
                changetime:'调仓时间',
                priority:'优先级',
                optionalFundIds:'备选基金池',
                optionalFundList:'备选基金池',
                source:'基金来源类型',
                channelList:'渠道列表',
            },
            combinationProductReview:{
                fundgroupType:'组合类型',
                fundGroupType:'组合类型',
                groupid:'组合ID',
                groupId:'组合ID',
                groupname:'组合名称',
                groupName:'组合名称',
                stringEstablishDate:'成立时间',
                grouptype:'风险类型',
                onlinedate:'上线日期',
                onlineDate:'上线日期',
                rightPercent:'权益类占比',
                fixPercent:'固收类占比',
                vaPercent:'货币类占比',
                otherPercent:'其它占比',
                fundgroupChangeROList:'组合调仓信息',
                fundgroupChangeDO:'组合调仓基本信息',
                isDisplay:'是否展示',
                changeAdvise:'组合调仓说明',
                strChangetime:'调仓时间',
                strCreattime:'调仓创建时间',
                fundgroupChangeDetailList:'组合调仓列表',
                fundGroupChangeDetailList:'组合调仓列表',
                fundid:'基金ID',
                fundId:'基金ID',
                fundName:'基金名称',
                fundApkind:'基金类型',
                fundPercent:'基金占比',
                isUnderlyingCurrency:'是否是底层货币',
                fundgroupNewFundgroupDO:'组合基本信息',
                commro:'费率折扣',
                status:'生效状态',
                ageRange:'年龄段',
                risklevel:'风险等级',
                riskLevel:'风险等级',
                initamount:'起投金额',
                investType:'投顾类型',
                onlinetime:'成立时间',
                establishDate:'成立时间',
                proPageurl:'组合攻略页',
                normalPageUrl:'组合攻略页',
                rightLimit : '权益类基金定义',
                largeRedemptionPercent :'大额赎回在全平台的比例',
                bigRedeemRate :'大额赎回在全平台的比例',
                rightMaxratePerc :'权益类基金占比不超过',
                singlevalueCustmaxPerc :'单只基金市值不得超过客户账户资产净值',
                categoryunitGroupmaxPerc :'同策略持有基金份额不得超过该基金总份额占比',
                turnoverRatePerc :'账户换手率',
                singleunitGroupmaxPerc :'持有单只指数基金的份额总和不得超过该基金总份额的',
                rightMinratePerc :'权益类基金占净值比不低于',
                valueMinratePerc :'债券基金占净值比不低于',
                valueMaxratePerc :'债券基金占净值比不超过',
                isBlacklist :'是否禁投公司黑名单内基金',
                isTradeLimit :'是否禁投流通受限基金',
                riskControl :'是否过投顾风控',
                riskDescDoc :'风险揭示书地址',
                isInvestment :'是否投顾',
                fundgroupDesc :'配置理念',
                fundGroupDesc :'配置理念',
                investDescDoc :'投顾协议书地址',
                investDuration :'投资时长',
                categoryDescDoc :'策略说明书地址',
                fundgroupAdvise :'投资建议',
                fundGroupAdvise :'投资建议',
                investCustomers :'投顾组合客户',
                investPrincipal :'名义本金',
                investRiskLevel :'投顾风险等级',
                minChangeAmount :'最低调仓金额',
                minRedeemAmount :'最低赎回金额',
                recommendReason :'推荐理由',
                riskDescDisplay :'风险揭示书文案',
                fundgroupFeature :'组合投资特点',
                fundGroupFeature :'组合投资特点',
                minReserveAmount :'最低持有金额',
                investDescDisplay :'投顾协议书文案',
                recommendHoldTime :'推荐持有时间',
                categoryDescDisplay :'策略说明书文案',
                investmentServicePerc :'投顾服务费率',
                fundgroupSubdatetimeRO:'组合基本信息补充',
                acceptMode:'开放渠道',
                branchCode:'网点号',
                stopStatus:'交易状态',
                stopEndTime:'暂停结束时间',
                manualEndTime:'暂停结束时间',
                stopStartTime:'暂停开始时间',
                manualStartTime:'暂停开始时间',
                cooPreationMode:'合作模式',
                operator:'创建人',
                sqlOprate:'组合复核操作',
                sqlOprator:'操作人',
                serialno:'组合序列号',
                serialNo:'组合序列号',
                refSerialNo:'组合序列号',
                dialogData:'组合信息合集',
                riskType:'风险类型',
                accptType:'合作模式',
                createTime:'创建时间',
                initAmount:'起投金额',
                manualEndTime:'暂停终止时间',
                isAddFundGroup:'是否添加调仓',
                newFundGroupChange:'新的基金调仓',
                fundList:'基金列表',
                changetime:'调仓时间',
                fundGroupGroupInfo:'组合信息详情',
                displayDate:'组合上架日',
                priority:'优先级',
                optionalFundIds:'备选基金池',
                optionalFundList:'备选基金池',
                source:'基金来源类型',
                channelList:'渠道列表',
            },
            matterAnnounce:{
                serialno:'流水号',
                groupid:'关联组合',
                title:'公告标题',
                content:'公告内容'

            },
            reportMgmt:{
                reportName:'报告名称',
                reportUrl:'链接地址',   
                reportId:'报告ID' ,  
                groupIdList:'组合ID列表',
                excelData:'文件上传'    ,
                reportEnd:'披露截止日期',
                reportStart:'披露开始日期',
                majorEvents:"当期重大事项",
                operationDesc:"当期运作情况",
                marketAnalysis:"当期市场分析",
                marketProspect:"市场展望",
                executionReport:"交易执行报告",
                reportPeriod: '报告周期',		// 报告周期
                periodType:'报告周期类型',

             },
             accountRule:{
                ruleId:'规则ID',
                ruleName:'规则名称',
                ruleDesc:'规则解释',
                groupIds:'组合ID',
                operateType:'触发指标',
                createUser:'创建人',
                ruleCondition:'规则条件',
                ruleConditionDisplay:'规则条件展示',
                indexId:'条件类型',
                operator:'条件操作',
                indexValue:'条件值'
            },
            indicatorMonitoring:{
                arAcct: "账户ID",
                custNo: "客户CUSTNO",
                ruleId: "规则ID",
                accptMd: "受理方式",
                groupId: "对标策略",
                branchCode: "网点号",
                recordDate: "触发日期",
                balanceSerialNo: "流水号"
            },
            alternativePoolMgmt:{
                deleteIdList:'删除记录列表',
                fundid:'基金ID',
                groupid: "组合ID",
                fundType: "基金类型"
            },
            tradeAbnormalHandle:{
                sqlOperate:'交易异常经办操作',
                sqlReviewReject:'交易异常复核操作',
                content:'详情',
                operator:'操作人',
                ofundId:'增补基金ID',
                fundId:'基金ID',
                groupId:'组合ID',
                errorMsg:'失败原因',
                fundName:'基金名称',
                coverFund:'增补操作内容',
                fundApkind:'产品类型',
                channelList:'渠道列表',
                fundPercent:'产品占比',
                isUnderlyingCurrency:'是否外部基金',
                failCount:'失败笔数',
                groupName:'组合名称',
                // tradeType:'操作代码',
                customCount:'涉及客户数',
                tradeTypeName:'操作名称',
                transactionDate:'交易日期',
                source:'来源'
            }
        }
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
            this.currentIndex = 0;
            this.getTableData(0);
        },
        rankField: function () {
            this.currentIndex = 0;
            this.getTableData(0);
        }
    },
    mounted: function () {
        var _this = this;
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
            format: 'YYYY-MM-DD',
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
        this.getTableData(0);
    },
    methods: {
        getTableData: function (currentIndex) {
            var params = {};
            params.operator = this.operator;
            params.operateType = this.operateType;
            params.operateTime = $('#operateTime').val();
            params.pageNo = currentIndex + 1;
            params.pageSize = this.pageMaxNum;
            var _this = this;
            $.post({
                url: '/investmentMgmt/recordMgmt/operateMgmt/getTableData.ajax',
                data: params,
                success: function (result) {
                    if (result.error === 0) {
                        _this.tableData = result.data.rows;
                        _this.currentIndex = result.data.pageNum - 1;
                        _this.totalPage = result.data.pages;
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
        // 翻译key
        transferObjKeys:function(transferObj,mappingObj){
            for(var key in transferObj){
                if(key!='investBody'){
                    delete transferObj[key]
                }
            }
            var transferObjStr=JSON.stringify(transferObj);
            for (var keys in mappingObj){
                var  reg =new RegExp(keys,'g');
                transferObjStr=transferObjStr.replace(reg,mappingObj[keys])
            }
            transferObjStr = transferObjStr.replace('investBody','提交内容')
            return JSON.parse(transferObjStr)
        },
        // 对于经办复核中隐藏字段的删除format
        formatData:function(data){
            let finalData = JSON.parse(JSON.stringify(data));
            for(let keys in finalData){
                if(Object.prototype.toString.call(finalData[keys])=='[object Array]'){
                    if(keys =='channelList'){
                        if(finalData['channelList'].length===0){
                            delete finalData['channelList'];
                        }
                    }else{
                        finalData[keys] = finalData[keys].map(item=>{
                            return this.formatData(item);
                        })
                    }
                    if(keys =='fundgroupNewFundgroupFundBackupDOList'){
                        delete finalData['fundgroupNewFundgroupFundBackupDOList'];
                    }
                }
                else if(Object.prototype.toString.call(finalData[keys])=='[object Object]'){
                    finalData[keys] = this.formatData(finalData[keys])
                }
                else{
                    switch(keys){
                        case 'fundgroupAdvise':
                            delete finalData['fundgroupAdvise'];
                            break;
                        case 'fundGroupAdvise':
                            delete finalData['fundGroupAdvise'];
                            break;
                        case 'recommendReason':
                            delete finalData['recommendReason'];
                            break; 
                        case 'recommendHoldTime':
                            delete finalData['recommendHoldTime'];
                            break; 
                        case 'proPageurl':
                            delete finalData['proPageurl'];
                            break;
                        case 'normalPageUrl':
                            delete finalData['normalPageUrl'];
                            break;     
                        case 'displayDate':
                            delete finalData['displayDate'];
                            break; 
                        case 'isInvestment':
                            delete finalData['isInvestment'];
                            break;  
                        case 'riskControl':
                            delete finalData['riskControl'];
                            break;  
                        case 'grouptype':
                            delete finalData['grouptype'];
                            break;
                        case 'riskType':
                            delete finalData['riskType'];
                            break;
                        case 'risklevel':
                            delete finalData['risklevel'];
                            break;   
                        case 'riskLevel':
                            delete finalData['riskLevel'];
                            break;
                        case 'commro':
                            delete finalData['commro'];
                            break;
                        case 'cooPreationMode':
                            delete finalData['cooPreationMode'];
                            break;
                        case 'accptType':
                            delete finalData['accptType'];
                            break;
                        case 'ageRange':
                            delete finalData['ageRange'];
                            break;
                        case 'stopStatus':
                            delete finalData['stopStatus'];
                            break;
                        case 'stopEndTime':
                            delete finalData['stopEndTime'];
                            break;
                        case 'manualEndTime':
                            delete finalData['manualEndTime'];
                            break;
                        case 'stopStartTime':
                            delete finalData['stopStartTime'];
                            break; 
                        case 'manualStartTime':
                            delete finalData['manualStartTime'];
                            break; 
                        case 'fundgroupType':
                            delete finalData['fundgroupType'];
                            break; 
                        case 'fundGroupType':
                            delete finalData['fundGroupType'];
                            break; 
                        case 'investRiskLevel':
                            finalData['investRiskLevel'] = this.transferRiskLevel(finalData['investRiskLevel']);
                            break; 
                        case 'vaPercent':
                            delete finalData['vaPercent'];
                            break; 
                        case 'fixPercent':
                            delete finalData['fixPercent'];
                            break; 
                        case 'onlinedate':
                            delete finalData['onlinedate'];
                            break; 
                        case 'onlineDate':
                            delete finalData['onlineDate'];
                            break; 
                        case 'calc_status':
                            delete finalData['calc_status'];
                            break; 
                        case 'otherPercent':
                            delete finalData['otherPercent'];
                            break; 
                        case 'rightPercent':
                            delete finalData['rightPercent'];
                            break; 
                        case 'onlinetime':
                            delete finalData['onlinetime'];
                            break; 
                        case 'branchCode':
                            delete finalData['branchCode'];
                            break; 
                        case 'rightLimit':
                            delete finalData['rightLimit'];
                            break; 
                        case 'largeRedemptionPercent':
                            delete finalData['largeRedemptionPercent'];
                            break;
                        case 'rightMaxratePerc':
                            delete finalData['rightMaxratePerc'];
                            break;
                        case 'singlevalueCustmaxPerc':
                            delete finalData['singlevalueCustmaxPerc'];
                            break;
                        case 'categoryunitGroupmaxPerc':
                            delete finalData['categoryunitGroupmaxPerc'];
                            break; 
                        case 'turnoverRatePerc':
                            delete finalData['turnoverRatePerc'];
                            break; 
                        case 'singleunitGroupmaxPerc':
                            delete finalData['singleunitGroupmaxPerc'];
                            break; 
                        case 'rightMinratePerc':
                            delete finalData['rightMinratePerc'];
                            break; 
                        case 'valueMinratePerc':
                            delete finalData['valueMinratePerc'];
                            break; 
                        case 'valueMaxratePerc':
                            delete finalData['valueMaxratePerc'];
                            break; 
                        case 'isBlacklist':
                            delete finalData['isBlacklist'];
                            break;
                        case 'isTradeLimit':
                            delete finalData['isTradeLimit'];
                            break;
                        case 'investDuration':
                            delete finalData['investDuration'];
                            break;
                        case 'investCustomers':
                            delete finalData['investCustomers'];
                            break;
                        case 'investPrincipal':
                            delete finalData['investPrincipal'];
                            break;
                        case 'serialno':
                            delete finalData['serialno'];
                            break;
                        case 'serialNo':
                            delete finalData['serialNo'];
                            break;
                        case 'refSerialNo':
                            delete finalData['refSerialNo'];
                            break;
                        case 'minChangeAmount':
                            delete finalData['minChangeAmount'];
                            break;
                        case 'minRedeemAmount':
                            delete finalData['minRedeemAmount'];
                            break;
                        case 'minReserveAmount':
                            delete finalData['minReserveAmount'];
                            break;
                        case 'isAddFundGroup':
                            delete finalData['isAddFundGroup'];
                            break;
                        case 'createTime':
                            delete finalData['createTime'];
                            break;
                        case 'fundgroupFeature':
                            delete finalData['fundgroupFeature'];
                            break;
                        case 'fundGroupFeature':
                            delete finalData['fundGroupFeature'];
                            break;
                        case 'isDisplay_origin':
                            delete finalData['isDisplay_origin'];
                            break;
                        case 'changeAdvise_origin':
                            delete finalData['changeAdvise_origin'];
                            break;
                        case 'changeAdvise':
                            if(finalData['changeAdvise']===null) finalData['changeAdvise']='';
                            break;
                        case 'tradeType':
                            delete finalData['tradeType'];
                            break;
                    }
                }
            }
            return finalData;
        },
        // 翻译投顾风险等级
        transferRiskLevel:function(val){
            var transStr = ''
            switch(val){
                case '1':
                transStr = 'R0-极低风险';
                break;
                case '2':
                transStr = 'R1-低风险';
                break;
                case '3':
                transStr = 'R2-较低风险';
                break;
                case '4':
                transStr = 'R3-中等风险';
                break;
                case '5':
                transStr = 'R4-较高风险';
                break;
                case '6':
                transStr = 'R5-高风险';
                break;
                default:
                    transStr = val;
            }
            return transStr
        },
        //查看实盘详情
        checkParams: function (item,type) {
            var key = type == 0 ? 'request_body' : 'response_body';
            var keywords = JSON.parse(item[key]);
            for (var i in keywords){
                if(i=='body'){
                    delete keywords['body'] 
                }
                if(i=='returnCode'){
                    delete keywords['returnCode']
                }
            }
            if(keywords.mappingKeyWords){
                // 如果是经办或者是复核的话需要format隐藏字段
                if(keywords.mappingKeyWords=='combinationProductHandle'||keywords.mappingKeyWords=='combinationProductReview'||keywords.mappingKeyWords=='tradeAbnormalHandle'){
                    keywords = this.formatData(keywords)
                }
                var transfer = this.transferObjKeys(keywords,this.mappingTab[keywords.mappingKeyWords]);
                var jdata = JSON.stringify(transfer, null, 4);
            }else{
                var jdata = JSON.stringify(keywords, null, 4).replace(/result|returnMsg/g,'返回结果');
            }
            this.jsonDetail = jdata;
            this.showDialog('', 'details');
        },
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
