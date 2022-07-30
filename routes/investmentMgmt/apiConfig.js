//投顾管理接口总配置
let investmentMgmt = '';
if (global.envConfig.investmentMgmt) {
    investmentMgmt = global.envConfig.investmentMgmt;
} else {
    investmentMgmt = global.envConfig.inner_gateway;
}
investmentMgmt += `/ias/v1`;

let combinationPro = '';
if (global.envConfig.combinationPro) {
    combinationPro = global.envConfig.combinationPro;
} else {
    combinationPro = global.envConfig.inner_gateway;
}

let fof = '';
if (global.envConfig.fof) {
    fof = global.envConfig.fof;
} else {
    fof = global.envConfig.inner_gateway;
}
let monitoringIP = '';

if (global.envConfig.IPOReview) {
    monitoringIP = global.envConfig.IPOReview;
    // monitoringIP = 'http://10.50.113.118:8089';
} else {
    monitoringIP = global.envConfig.inner_gateway;
}
const devFilePath = global.envConfig.devFilePath;
const uopStaticFilePath = global.envConfig.uopStaticFilePath;
const uopStaticFilePath_url = global.envConfig.uopStaticFilePath_url;


module.exports = {
    filePathExternal: uopStaticFilePath ? (uopStaticFilePath + '/investmentMgmt') : (devFilePath + '/investmentMgmt'),
    filePafilePathExternalthUrl: uopStaticFilePath ? (uopStaticFilePath_url + '/investmentMgmt') : (devFilePath + '/investmentMgmt'),
    investmentAccount: {
        accountRule: {
            query: `${investmentMgmt}/acct-opr/rules`,
            del: `${investmentMgmt}/acct-opr/rule/delete`,
            create: `${investmentMgmt}/acct-opr/rule`,
            update: `${investmentMgmt}/acct-opr/rule/modify`,
            detail: `${investmentMgmt}/acct-opr/rule/detail`,
            getDialogInfo: `${investmentMgmt}/acct-opr/rules/indexes`
        },
        indicatorMonitoring: {
            query: `${investmentMgmt}/acct-opr/rules/records`,
            queryRuleList: `${investmentMgmt}/acct-opr/rules`,
            transfer: `${investmentMgmt}/sys-transfer-position`,
            batchTransfer: `${investmentMgmt}/batch/sys-transfer-position`,
            getDetailList1: `${investmentMgmt}/assets/asset/detail`,
            getDetailList2: `${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/query/info/detail/collections`,
            // 获取组合ID
            // getInvestList:`${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/query/base/all-valid/collections`,
            labels: `${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/query/base/all-valid/collections`
        },
        tradeAnomaly: {
            query: `${investmentMgmt}/acct-opr/abn-trades`
        },
        
    },
    investmentRiskMonitor:{
        investmentRisk: {
            getTableData: `${combinationPro}/fundgroup/v1/risks/records`
        }
    },
    tradeMonitor:{
        // 交易指令监测
        tradeInstructMonitor: {
            query: `${investmentMgmt}/acct-opr/abn-sub-orders`
        },
        // 交易执行监测
        tradeExecuteSurvey: {
            query: `${investmentMgmt}/acct-opr/normal-trades`,
            querySum:`${investmentMgmt}/acct-opr/abn-trades-sum`
        },
        // 交易异常处理经办
        tradeAbnormalHandle: {
            fundGroups: `${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/query/base/all-valid/collections`,
            getTableList: `${investmentMgmt}/acct-opr/abn-trades-to-reroder`   //异常交易待补仓交易列表
        },
        // 交易异常处理复核
        tradeAbnormalReview: {
            fundGroups: `${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/query/base/all-valid/collections`,
            getTableList: `${investmentMgmt}/acct-opr/abn-trades-to-reroder`,  //异常交易待补仓交易列表
            saveParam: `${investmentMgmt}/acct-opr/abn-trades-reroder`,  //异常交易补仓，复核通过
        },
    },
    investmentStrategy: {
        combinationProductHandle: {
            getTableData: `${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/query/base/all-valid/collections`,
            details: `${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/query/info/detail/collections`, //详情
            fundGroups: `${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/query/base/all-valid/collections`,
            allGroupId: `${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/query/base/all-groupid/no-condition/collections`, //验证查询所有ID
            // fundList: `${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/query/fundgroup-fundinfo/all-valid/collections`,
            fundList: `${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/query/invest-fundinfo/all-valid/collections`,
            // 获取网点类型
            branchCodeList: `${combinationPro}/common-services/v1/param/params`,
            // 获取组合类型
            fundGroupType: `${combinationPro}/common-services/v1/param/params`,
            // 获取年临段
            ageRangeList: `${combinationPro}/common-services/v1/param/params`,
            //获取风险类型
            grouptypeList: `${combinationPro}/common-services/v1/param/params`,
            // 获取风险等级
            risklevelList: `${combinationPro}/common-services/v1/param/params`,
            // 验证有没有净值
            navList: [`${combinationPro}/productcenter/v1/new/query/funds/`, `/nav/latest`],
            navListNew: `${combinationPro}/productcenter/v1/new/uop/funds/single/nav/check_and_import_external`,
            //查询组合所有调仓信息
            basicParam: `${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/query/fundgroup-changinfo/all/collections`,
            // 查询基金状态是不是暂停交易,暂停赎回,暂停申购
            fundIdList: `${combinationPro}/productcenter/v1/new/query/funds/batch/info/base/collections`,
            // 风控检查接口
            riskControl: `${fof}/strategy/v1/verifyFundGroup`,
            // 查询备选基金池
            queryOptionalFundList: `${combinationPro}/productcenter/v1/new/info/fundgroup/single/backup/fundid/collections`,
            // 查询大额赎回在全平台比例
            queryBigRedeemRate: `${combinationPro}/productcenter/v1/fundgroup/getFundGroup`,
            // 查询外部基金在各个渠道的交易状态
            queryTradeStatusByFundId: `${combinationPro}/productcenter/v1/new/query/funds/single/info/channel/status`
        },
        combinationProductRisk:{
            getTableData: `${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/query/base/all-valid/collections`,
            // 风控检查接口
            riskControl: `${fof}/strategy/v1/verifyFundGroup`,
        },
        combinationProductRiskReview:{
            getTableData: `${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/query/base/all-valid/collections`,
            // 风控检查接口
            riskControl: `${fof}/strategy/v1/verifyFundGroup`,
        },
        combinationProductRiskCheck:{
            getTableData: `${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/query/base/all-valid/collections`,
            // 风控检查接口
            riskControl: `${fof}/strategy/v1/verifyFundGroup`,
        },
        combinationProductReview: {
            getTableData: `${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/query/base/all-valid/collections`,
            details: `${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/query/info/detail/collections`, //详情
            fundGroups: `${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/query/base/all-valid/collections`,
            saveParam: `${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/single/info/base/create`,
            update: `${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/single/info/base/update`, //修改基本信息
            advise: `${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/single/info/fundgroup-change/update`, //修改调仓说明
            addHouse: `${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/single/info/fundgroup-change/create`, //修改里面新增调仓
            checkFund: `${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/check/fundgroup-changinfo/in-melond`, //验证是否处于分红中
            // 获取组合类型
            fundGroupType: `${combinationPro}/common-services/v1/param/params`,
            // 获取年临段
            ageRangeList: `${combinationPro}/common-services/v1/param/params`,
            //获取风险类型
            grouptypeList: `${combinationPro}/common-services/v1/param/params`,
            // 获取风险等级
            risklevelList: `${combinationPro}/common-services/v1/param/params`,
            // 获取网点类型
            branchCodeList: `${combinationPro}/common-services/v1/param/params`,
            // 计算净值
            calcParams: `${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/batch/query/check-integrity/collections`, //验证是否处于分红中
        },
        productPool: {
            getTableData: `${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/query/fundgroup-fundinfo/all-valid/collections`,
            showRefresh: `${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/batch/fundgroup-fundinfo/create/collections`,
            exportAlls: `${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/query/fundgroup-fundinfo/all-valid/collections`,
        },
        investFee: {
            labels: `${combinationPro}/productcenter/v1/monitor_report/monitor/product/relation/label/collection/query`,
            getParams: `${combinationPro}/common-services/v1/param/params`,
            add: `${combinationPro}/common-services/v1/ia/iaf-discount`,
            delete: `${combinationPro}/common-services/v1/ia/iaf-discount`,
            modify: `${combinationPro}/common-services/v1/ia/iaf-discount`,
            tableData:`${combinationPro}/common-services/v1/ia/iaf-discounts`
        },
        alternativePoolMgmt:{
            getTableData: `${combinationPro}/productcenter/v1/new/uop/standard/query/invest/fundgroup/backup/collection`,
            importAlls: `${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/import/batch/invest/fundgroup/backup/collection`,
            deleteList: `${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/delete/batch/invest/fundgroup/backup/collection`,
            fundGroups: `${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/query/base/all-valid/collections`
        },
        publishSetting:{
            getTableData:`${combinationPro}/productcenter/v1/new/uop/standard/query/fundgroup/page/fundgroupsubdatetime/collections`,
            create:`${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/fundgroupsubdatetime/create`,
            del:`${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/fundgroupsubdatetime/delete`,
            fundGroups: `${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/query/base/all-valid/collections`,
            branchCodeList: `${combinationPro}/common-services/v1/param/params`,
        },
		targetProfitStrategyConfig:{
			getTableData:`${combinationPro}/productcenter/v1/new/uop/fundgroup/query/target/info/detail/collections`,
			fundGroups: `${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/query/base/all-valid/collections`,
			add:`${combinationPro}/productcenter/v1/new/uop/fundgroup/target/info/detail/create`,
			update:`${combinationPro}/productcenter/v1/new/uop/fundgroup/target/info/detail/update`,
			shiftTypeList:`${combinationPro}/productcenter/v1/new/uop/fundgroup/shift/type/query/all/collections`,
		},
		targetProfitStrategyRecord:{
			getTableData:`${combinationPro}/productcenter/v1/new/uop/fundgroup/query/target/info/detail/collections`,
			fundGroups: `${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/query/base/all-valid/collections`,
			shiftTypeList:`${combinationPro}/productcenter/v1/new/uop/fundgroup/shift/type/query/all/collections`
		}
    },
    investmentInformationDisclosure:{
        matterAnnounce: {
            getGroupList: `${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/announcement/label/collections`,
            getTableList: `${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/announcement/detail/collections`,
            del: `${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/announcement/delete`,
            operate: `${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/announcement/insert-or-update`
        },
        reportMgmt: {
            getTableData: `${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/batch/query/report-detail/by-reportid/collections`,
            saveParam: `${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/single/report/base/create`,
            deleteParam: `${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/single/report/base/delete`,
            relationParam: `${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/single/report/relation/create`,
            fundGroups: `${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/query/base/all-valid/collections`,
            getReportInfo: `${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/single/report/extend/query`,
            saveReportInfo: `${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/single/report/extend/delete-then-insert`
        },
        monthlyReport:{
            getDetail:`${combinationPro}/ias/v1/reports/report/monthly/detail`,
            getTableData: `${combinationPro}/ias/v1/reports/monthly/info/base`,
            deleteParam: `${combinationPro}/ias/v1/report/delete`,
            upData: `${combinationPro}/ias/v1/report/monthly/update`,
            addParam: `${combinationPro}/ias/v1/report/monthly/new`,
            fundGroups: `${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/query/base/all-valid/collections`,


        },
        quarterlyReport: {
            getTableData: `${combinationPro}/ias/v1/reports/quarterly/info/base`,
            add:`${combinationPro}/ias/v1/report/quarterly/new`,
            details: `${combinationPro}/ias/v1/reports/report/quarterly/detail`,
            del: `${combinationPro}/ias/v1/report/delete`,
            operate: `${combinationPro}/ias/v1/report/quarterly/update`,
            fundGroups: `${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/query/base/all-valid/collections`,

        },

    },
    investmentStrategyMonitoring:{
        productIndexesForms:{
            // getInvestList:`${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/query/base/all-valid/collections`,
            labels: `${monitoringIP}/productcenter/v1/new/uop/standard/fundgroup/query/base/all-valid/collections`,
            tableData: `${monitoringIP}/par/v1/new/monitor_report/query/fundgroup/realtime/report/info`,
            pieData: `${monitoringIP}/par/v1/new/monitor_report/query/fundgroup/change/detail/info`,
            brokenLineData: `${monitoringIP}/par/v1/new/monitor_report/query/fundgroup/daily/nav/info`,
            navExport: `${monitoringIP}/par/v1/monitor_report/product/nav/query/collections`,
            // 查询基金状态是不是暂停交易,暂停赎回,暂停申购
            fundStatus: `${combinationPro}/productcenter/v1/new/query/funds/batch/info/base/collections`
        }
    },
    recordMgmt: {
        operateMgmt: {

        },
        custOperateMgmt: {
            tableData:`${combinationPro}/caa/v1/common/cust-mark/list`,
            detail:`${combinationPro}/caa/v1/common/cust-mark/detail`
        }
    }
};