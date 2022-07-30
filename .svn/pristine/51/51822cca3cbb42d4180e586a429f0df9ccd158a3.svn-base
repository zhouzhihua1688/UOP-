// 业务参数管理接口总配置
let businessMgmt = '';
if (global.envConfig.businessMgmt) {
    businessMgmt = global.envConfig.businessMgmt;
} else {
    businessMgmt = global.envConfig.inner_gateway;
}
businessMgmt += '/common-services/v1';

let IPO = '';
if (global.envConfig.IPO) {
    IPO = global.envConfig.IPO;
} else {
    IPO = global.envConfig.inner_gateway;
}

let IPO_Switch = '';
if (global.envConfig.IPO_Switch) {
    IPO_Switch = global.envConfig.IPO_Switch;
} else {
    IPO_Switch = global.envConfig.inner_gateway;
}
// IPO_Switch +='/productcenter/v1/new/uop/switch/relation';

let fundTag = '';
if (global.envConfig.fundTag) {
    fundTag = global.envConfig.fundTag;
} else {
    fundTag = global.envConfig.inner_gateway;
}
// 交易信息查询接口配置
let ESS = '';
if (global.envConfig.ESS) {
    ESS = global.envConfig.ESS;
} else {
    ESS = global.envConfig.inner_gateway;
}
ESS += '/ess/v1';
// 坐席查询接口配置
let ANTI_NEWBE = '';
if (global.envConfig.ANTI_NEWBE) {
    ANTI_NEWBE = global.envConfig.ANTI_NEWBE;
} else {
    ANTI_NEWBE = global.envConfig.inner_gateway;
}
ANTI_NEWBE += '/anti-newbe/v1';

// 业务参数管理接口总配置
let icif = '';
if (global.envConfig.icif) {
    icif = global.envConfig.icif;
} else {
    icif = global.envConfig.inner_gateway;
}
let CTS = '';
if (global.envConfig.CTS) {
    CTS = global.envConfig.CTS;
} else {
    CTS = global.envConfig.inner_gateway;
}
CTS += '/cts/v1';
// 高端理财
let highFinancialMgmt = '';
if (global.envConfig.highFinancialMgmt) {
    highFinancialMgmt = global.envConfig.highFinancialMgmt;
} else {
    highFinancialMgmt = global.envConfig.inner_gateway;
}
highFinancialMgmt += '/vip/v1';
// 高端理财企业版
let highFinancialCompany = '';
if (global.envConfig.highFinancialCompany) {
    highFinancialCompany = global.envConfig.highFinancialCompany;
} else {
    highFinancialCompany = global.envConfig.inner_gateway;
}
highFinancialCompany += '/vip/v1';

let IPOFilePath = '';
if (global.envConfig.devIPOFilePath) {
    IPOFilePath = global.envConfig.devIPOFilePath;
} else {
    IPOFilePath = global.envConfig.IPOFilePath;
}
let VIPFilePath = ''; //高端理财
if (global.envConfig.devIPOFilePath) {
    VIPFilePath = global.envConfig.devIPOFilePath;
} else {
    VIPFilePath = global.envConfig.IPOFilePath;
}
// 20210813 高端理财-补充协议配置
let filePath = '';
let delFilePath = '';
let filePathUrl = '';
if (global.envConfig.devFilePath) {
    filePath = global.envConfig.devFilePath+'/businessMgmt';
    delFilePath = global.envConfig.devFilePath+'/businessMgmt/del';
    filePathUrl = global.envConfig.devFilePath+'/businessMgmt';
} else {
    filePath = global.envConfig.uopStaticFilePath+'/businessMgmt';
    delFilePath = global.envConfig.uopStaticFilePath+'/businessMgmt/del';
    filePathUrl = global.envConfig.uopStaticFilePath_url+'/businessMgmt';
}
// 20210813 高端理财-补充协议配置

let innerUaaForSchedule = ''; //inneruaa不走网关的配置
if (global.envConfig.inner_uaa_schedule) {
    innerUaaForSchedule = global.envConfig.inner_uaa_schedule;
}
let fof = '';
if (global.envConfig.fof) {
    fof = global.envConfig.fof;
} else {
    fof = global.envConfig.inner_gateway;
}

// S removed by MZ 20210507
// try {
//     const mysql = require('mysql');
//     var mysqlPool = mysql.createPool(global.envConfig.mysqlConfig);
//     // var mysqlPool = mysql.createPool({
//     //     host: '10.50.115.115',
//     //     database: 'uop',
//     //     user: 'uop',
//     //     password: 'Uop@201903_',
//     // });
// } catch (error) {
//     console.log('mysqlPool error=', error)
// }
// E removed by MZ 20210507

// 业务管理-基金比对
let fundComparison = '';
if (global.envConfig.fundComparison) {
    fundComparison = global.envConfig.fundComparison;
} else {
    fundComparison = global.envConfig.inner_gateway;
}
// 业务管理-组合产品配置
let combinationMgmt = '';
if (global.envConfig.combinationMgmt) {
    combinationMgmt = global.envConfig.combinationMgmt;
} else {
    combinationMgmt = global.envConfig.inner_gateway;
}
let combinationPro = '';
if (global.envConfig.combinationPro) {
    combinationPro = global.envConfig.combinationPro;
} else {
    combinationPro = global.envConfig.inner_gateway;
}
// 业务管理-组合产品配置新增窗口弹窗参数配置
let combinationParam = '';
if (global.envConfig.combinationParam) {
    combinationParam = global.envConfig.combinationParam;
} else {
    combinationParam = global.envConfig.inner_gateway;
}
combinationParam += '/common-services/v1';
combinationParam2 = combinationParam;
// 业务管理-产品开放日配置
let productOpenDayMgmt = '';
if (global.envConfig.productOpenDayMgmt) {
    productOpenDayMgmt = global.envConfig.productOpenDayMgmt;
} else {
    productOpenDayMgmt = global.envConfig.inner_gateway;
}
// 业务管理- IPO管理_营运(复核)
let IPOReview = '';
if (global.envConfig.IPOReview) {
    IPOReview = global.envConfig.IPOReview;
} else {
    IPOReview = global.envConfig.inner_gateway;
}
// 业务管理- IPO管理_营运(复核)-大额限购复核
let CS = '';
if (global.envConfig.CS) {
    CS = global.envConfig.CS;
} else {
    CS = global.envConfig.inner_gateway;
}
// 业务管理-组合产品配置-三方组合明细配置
let tripleDirectSell = '';
if (global.envConfig.tripleDirectSell) {
    tripleDirectSell = global.envConfig.tripleDirectSell;
    // tripleDirectSell = 'http://10.50.113.9:8089';
} else {
    tripleDirectSell = global.envConfig.inner_gateway;
}
// 业务管理- 业务参数配置-不支持特权折扣基金
let nonsupportApi = '';
if (global.envConfig.nonsupport) {
    nonsupportApi = global.envConfig.nonsupport;
    // nonsupport = 'http://10.50.113.9:8089';
} else {
    nonsupportApi = global.envConfig.inner_gateway;
}
// 业务管理- 业务参数配置-IPO模式配置，20210824
let IPOPatternSetting = '';
if (global.envConfig.IPOPatternSetting) {
    IPOPatternSetting = global.envConfig.IPOPatternSetting;
} else {
    IPOPatternSetting = global.envConfig.inner_gateway;
}

let monitoringIP = '';

if (global.envConfig.IPOReview) {
    monitoringIP = global.envConfig.IPOReview;
} else {
    monitoringIP = global.envConfig.inner_gateway;
}

module.exports = {
    // mysqlConfig: global.envConfig.mysqlConfig, // removed by MZ 20210507
    // mysqlConfig: {
    //     host: '10.50.115.115',
    //     database: 'uop',
    //     user: 'uop',
    //     password: 'Uop@201903_',
    // },
    // mysqlPool, // removed by MZ 20210507

    // 20210813 高端理财-补充协议配置
    filePath,
    delFilePath,
    filePathUrl,
    // 20210813 高端理财-补充协议配置

    IPOFilePath,
    VIPFilePath,
    businessParamConfig: {
        discountHandle: {
            getTableData: `${businessMgmt}/rule/discounts`,
            ruleId: `${businessMgmt}/sequence/ruleid`,
            translate: `${businessMgmt}/param/params`,
            // translates: `${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/query/base/all-valid/collections`,
            fundGroups: `${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/query/base/all-valid/collections`,
            collection: `${IPO}/productcenter/v1/new/uop/funds/all/info/base/query/collections`
        },
        discountReview: {
            operate: `${businessMgmt}/rule/discount`,
            translate: `${businessMgmt}/param/params`,
            // translates: `${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/query/base/all-valid/collections`,
            fundGroups: `${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/query/base/all-valid/collections`,
            getTableData: `${businessMgmt}/rule/discounts`,
            collection: `${IPO}/productcenter/v1/new/uop/funds/all/info/base/query/collections`
        },

        quotaHandle: {
            // 查询
            getTableData: `${businessMgmt}/rule/quotas`,
            // 获取Id
            ruleId: `${businessMgmt}/sequence/ruleid`,
            // 参数转换
            params: `${businessMgmt}/param/params`,
            // 业务类型
            // apkinds: `${businessMgmt}/param/apkinds`,
            apkinds: `${businessMgmt}/param/params`,
            // 获取交易类型
            tradeTypeList: `${businessMgmt}/param/params`,
            // 获取渠道
            channelTypeList: `${businessMgmt}/param/params`,
            // 获取客户类型
            custTypeList: `${businessMgmt}/param/params`,
            // 获取额度类型
            quotaTypeList: `${businessMgmt}/param/params`,
            // 获取网点类型
            branchCodeList: `${businessMgmt}/param/params`,
            collection: `${IPO}/productcenter/v1/new/uop/funds/all/info/base/query/collections`

        },
        quotaReview: {
            // 查询
            getServiceData: `${businessMgmt}/rule/quotas`,
            // 新增保存
            saveParam: `${businessMgmt}/rule/quota`,
            //修改更新
            update: `${businessMgmt}/rule/quota`,
            // 删除
            deleteParam: `${businessMgmt}/rule/quota`,
            // 参数转换
            params: `${businessMgmt}/param/params`,
            // 业务类型
            apkinds: `${businessMgmt}/param/apkinds`,

            // 获取交易类型
            tradeTypeList: `${businessMgmt}/param/params`,
            // 获取渠道
            channelTypeList: `${businessMgmt}/param/params`,
            collection: `${IPO}/productcenter/v1/new/uop/funds/all/info/base/query/collections`

            // deleteParam: `${businessMgmt}/rule/quota`

        },
        paymentHandle: {
            // 查询
            getTableData: `${businessMgmt}/rule/paytypes`,
            // 获取Id
            ruleId: `${businessMgmt}/sequence/ruleid`,
            // 获取交易类型
            tradeTypeList: `${businessMgmt}/param/params`,
            // 获取渠道
            channelTypeList: `${businessMgmt}/param/params`,
            params: `${businessMgmt}/param/params`,
            collection: `${IPO}/productcenter/v1/new/uop/funds/all/info/base/query/collections`,
            payList: `${businessMgmt}/param/params`,
        },
        paymentReview: {
            // 查询
            getServiceData: `${businessMgmt}/rule/paytypes`,
            // 新增保存
            saveParam: `${businessMgmt}/rule/paytype`,
            //修改更新
            update: `${businessMgmt}/rule/paytype`,
            // 删除
            deleteParam: `${businessMgmt}/rule/paytype`,
            // 获取渠道
            channelTypeList: `${businessMgmt}/param/params`,
            params: `${businessMgmt}/param/params`,
            collection: `${IPO}/productcenter/v1/new/uop/funds/all/info/base/query/collections`
        },
        discountTrial: {
            selectOption: `${businessMgmt}/param/params`,
            gatData: `${businessMgmt}/rule/cust-discount-trial`
        },
        quotaTrial: {
            selectOption: `${businessMgmt}/param/params`,
            gatData: `${businessMgmt}/rule/cust-quota-trial`
        },
        productOpenDayMgmt: {
            getTableData: `${productOpenDayMgmt}/productcenter/v1/new/uop/funds`,
            syncParams: `${productOpenDayMgmt}/productcenter/v1/new/uop/funds/single/detail/refreshAllDetail`,
            checkId: `${productOpenDayMgmt}/productcenter/v1/new/uop/funds`,
            saveParam: `${productOpenDayMgmt}/productcenter/v1/new/uop/funds/single/expectation/update-no-version`,
            update: `${productOpenDayMgmt}/productcenter/v1/new/uop/funds/single/expectation/update-no-version`,
            exportAll: `${productOpenDayMgmt}/productcenter/v1/new/uop/funds/all/info/base/query/collections`,
            fundDetail: [`${productOpenDayMgmt}/productcenter/v1/new/uop/funds`, '/info/detail/query'],

        },
        productInfoType: {

        },
        productAdditionInfo: {

        },
        nonsupport: {
            tableData: `${nonsupportApi}/reward/v1/privilege/getPrivilegeFundList`,
            modifyData: `${nonsupportApi}/reward/v1/privilege/updatePrivilegeFund`,
            add: `${nonsupportApi}/reward/v1/privilege/addPrivilegeFund`,
            fundIdList: `${IPOReview}/productcenter/v1/new/uop/funds/online-apprbase/info/id-name/query/collections`,
        },
        IPOPatternSetting: {
            getList: `${IPOPatternSetting}/common-services/v1/deliver/uop/get`,
            add: `${IPOPatternSetting}/common-services/v1/deliver/uop/add`,
            update: `${IPOPatternSetting}/common-services/v1/deliver/uop/update`,
            delete: `${IPOPatternSetting}/common-services/v1/deliver/uop/del`,
            getFundInfoBase: `${IPOPatternSetting}/productcenter/v1/new/query/funds`, // + /{fundId}/info/base
        },
        IPOPreheatSetting: {
            getTableData: `${combinationPro}/productcenter/v1/new/uop/funds/single/info/temp/abbr/query`,
            add: `${combinationPro}/productcenter/v1/new/uop/funds/specification/info/temp/abbr/insert-or-update`,
            update: `${combinationPro}/productcenter/v1/new/uop/funds/specification/info/temp/abbr/insert-or-update`,
            RiskParam:`${combinationParam}/param/params`,
        },
    },
    businessParamConfigOC: {
        discountHandle: {
            getTableData: `${businessMgmt}/rule/discounts`,
            ruleId: `${businessMgmt}/sequence/ruleid`,
            translate: `${businessMgmt}/param/params`,
            // translates: `${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/query/base/all-valid/collections`,
            fundGroups: `${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/query/base/all-valid/collections`,
            collection: `${IPO}/productcenter/v1/new/uop/funds/all/info/base/query/collections`
        },
        discountReview: {
            operate: `${businessMgmt}/rule/discount`,
            translate: `${businessMgmt}/param/params`,
            // translates: `${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/query/base/all-valid/collections`,
            fundGroups: `${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/query/base/all-valid/collections`,
            getTableData: `${businessMgmt}/rule/discounts`,
            collection: `${IPO}/productcenter/v1/new/uop/funds/all/info/base/query/collections`,
            //inner_uaa不走网关获取userinfo
            userList: `${innerUaaForSchedule}/inner-uaa/v1/user/list`,
            userDetail: `${innerUaaForSchedule}/inner-uaa/v1/user`,
            emailUrl: `${innerUaaForSchedule}/message-center-api/v1/api/services/mail`,
            smsUrl: `${innerUaaForSchedule}/message-center/v1/rules/sms/key/process`,
            isWorkDay: `${innerUaaForSchedule}/cts/v1/workdate-query/is-workday`,
            naturalDayForWorkDay: `${innerUaaForSchedule}/cts/v1/workdate-query/work-day-by-natural-day`,
            closeCheck: `${innerUaaForSchedule}/cts/v1/close-check-ack/ack-close-check`
        },
        quotaHandle: {
            // 查询
            getTableData: `${businessMgmt}/rule/quotas`,
            // 获取Id
            ruleId: `${businessMgmt}/sequence/ruleid`,
            // 参数转换
            params: `${businessMgmt}/param/params`,
            // 业务类型
            // apkinds: `${businessMgmt}/param/apkinds`,
            apkinds: `${businessMgmt}/param/params`,
            // 获取交易类型
            tradeTypeList: `${businessMgmt}/param/params`,
            // 获取渠道
            channelTypeList: `${businessMgmt}/param/params`,
            // 获取客户类型
            custTypeList: `${businessMgmt}/param/params`,
            // 获取额度类型
            quotaTypeList: `${businessMgmt}/param/params`,
            // 获取网点类型
            branchCodeList: `${businessMgmt}/param/params`,
            collection: `${IPO}/productcenter/v1/new/uop/funds/all/info/base/query/collections`

        },
        quotaReview: {
            // 查询
            getServiceData: `${businessMgmt}/rule/quotas`,
            // 新增保存
            saveParam: `${businessMgmt}/rule/quota`,
            //修改更新
            update: `${businessMgmt}/rule/quota`,
            // 删除
            deleteParam: `${businessMgmt}/rule/quota`,
            // 参数转换
            params: `${businessMgmt}/param/params`,
            // 业务类型
            apkinds: `${businessMgmt}/param/apkinds`,

            // 获取交易类型
            tradeTypeList: `${businessMgmt}/param/params`,
            // 获取渠道
            channelTypeList: `${businessMgmt}/param/params`,
            collection: `${IPO}/productcenter/v1/new/uop/funds/all/info/base/query/collections`

            // deleteParam: `${businessMgmt}/rule/quota`

        }
    },
    IPOMgmtEC: {
        IPOMgmt: { //IPO管理
            collection: `${IPO}/productcenter/v1/new/uop/funds/all/info/base/query/collections`,
            getLineList: `${IPO}/productcenter/v1/new/uop/funds/batch/composed/query`,
            selectOption: `${businessMgmt}/param/params`,

        },
        IPOMgmtModify: { //IPO管理修改内嵌页
            selectOption: `${businessMgmt}/param/params`,
            getLineList: `${IPO}/productcenter/v1/new/uop/funds/batch/composed/query`,
        },
        IPOMgmtReview: { //IPO管理复核
            collection: `${IPO}/productcenter/v1/new/uop/funds/all/info/base/query/collections`,
            updateBase: `${IPO}/productcenter/v1/new/uop/funds/`,
            updateExtension: `${IPO}/productcenter/v1/new/uop/funds/`,
            updateDetail: `${IPO}/productcenter/v1/new/uop/funds/`,
            selectOption: `${businessMgmt}/param/params`,
            addDetail: `${IPO}/productcenter/v1/new/uop/funds/specification/info/detail/create`,
            getLineList: `${IPO}/productcenter/v1/new/uop/funds/batch/composed/query`,
        },
        IPOMgmtReviewDetail: { //IPO管理复核详情 内嵌页
            getLineList: `${IPO}/productcenter/v1/new/uop/funds/batch/composed/query`,
            selectOption: `${businessMgmt}/param/params`,

        },
        whiteList: { //三宝限额白名单配置管理
            getList: `${icif}/icif/v1/whites/limits/query`,
            add: `${icif}/icif/v1/whites/limits/add`,
            delete: `${icif}/icif/v1/whites/limits/delete`,
            modify: `${icif}/icif/v1/whites/limits/modify`,
            uploadFile: `${icif}/icif/v1/whites/limits/add-batch`,
        },
        IPOUpload: {
            collection: `${IPO}/productcenter/v1/new/uop/funds/all/info/base/query/collections`,
            getLineList: `${IPO}/productcenter/v1/new/uop/funds/batch/composed/query`,
            getDetail: `${IPO}/productcenter/v1/new/uop/funds/`,
            updateDetail: `${IPO}/productcenter/v1/new/uop/funds/`,
        },
        fundChangeHandle: {
            getLineList: `${IPO}/productcenter/v1/new/uop/funds/`,
            collection: `${IPO}/productcenter/v1/new/uop/funds/all/info/base/query/collections`,
        },
        fundChangeReview: {
            getLineList: `${IPO}/productcenter/v1/new/uop/funds/`,
            addConvert: `${IPO}/productcenter/v1/new/uop/funds/specification/info/convert/create`,
            collection: `${IPO}/productcenter/v1/new/uop/funds/all/info/base/query/collections`,
            delConvert: `${IPO}/productcenter/v1/new/uop/funds/`,
        },
    },
    IPOMgmtFD: {
        IPOMgmtFund: { //IPO资金
            collection: `${IPO}/productcenter/v1/new/uop/funds/all/info/base/query/collections`,
            selectOption: `${businessMgmt}/param/params`,
            getLineList: `${IPO}/productcenter/v1/new/uop/funds/batch/composed/query`,
        },
        IPOMgmtFundModify: { //IPO资金修改
            getLineList: `${IPO}/productcenter/v1/new/uop/funds/batch/composed/query`,
        },
        IPOMgmtFundDetail: { //IPO资金详情
            getLineList: `${IPO}/productcenter/v1/new/uop/funds/batch/composed/query`,
            selectOption: `${businessMgmt}/param/params`,
        },
        IPOMgmtFundReview: { //IPO资金详情
            collection: `${IPO}/productcenter/v1/new/uop/funds/all/info/base/query/collections`,
            selectOption: `${businessMgmt}/param/params`,
            modifyExtension: `${IPO}/productcenter/v1/new/uop/funds/`,
            getLineList: `${IPO}/productcenter/v1/new/uop/funds/batch/composed/query`,
        }
    },
    IPOMgmtOC: {
        IPOSetting: { //IPO设置经办
            selectOption: `${businessMgmt}/param/params`,
            getLineList: `${IPO}/productcenter/v1/new/uop/funds/batch/composed/query`,
            collection: `${IPO}/productcenter/v1/new/uop/funds/all/info/base/query/collections`,
        },
        IPOSettingModify: { //IPO设置经办  新增及修改
            selectOption: `${businessMgmt}/param/params`,
            base: `${IPO}/productcenter/v1/new/uop/funds/`,
            extension: `${IPO}/productcenter/v1/new/uop/funds/`,
            lifecircle: `${IPO}/productcenter/v1/new/uop/funds/`,
        },
        IPOSettingDetail: { //IPO设置经办 详情
            getLineList: `${IPO}/productcenter/v1/new/uop/funds/batch/composed/query`,
            selectOption: `${businessMgmt}/param/params`,
        },
        IPOSetReview: { //IPO设置复核
            selectOption: `${businessMgmt}/param/params`,
            getLineList: `${IPO}/productcenter/v1/new/uop/funds/batch/composed/query`,
            add: `${IPO}/productcenter/v1/new/uop/funds/specification/transaction/base-ext-lifecircle/create`,
            addLifeCycle: `${IPO}/productcenter/v1/new/uop/funds/specification/lifecircle/create`,
            delLifeCycle: `${IPO}/productcenter/v1/new/uop/funds/`,
            modifyLifeCycle: `${IPO}/productcenter/v1/new/uop/funds/`,
            modifyExtension: `${IPO}/productcenter/v1/new/uop/funds/`,
            modifyBase: `${IPO}/productcenter/v1/new/uop/funds/`,
            collection: `${IPO}/productcenter/v1/new/uop/funds/all/info/base/query/collections`,

        },
        datumRateHandle: {
            queryFeeList: [`${IPO}/productcenter/v1/new/uop/funds/`, `/fee/query`],
            collection: `${IPO}/productcenter/v1/new/uop/funds/all/info/base/query/collections`,
        },
        datumRateReview: {
            queryFeeList: [`${IPO}/productcenter/v1/new/uop/funds/`, `/fee/query`],
            collection: `${IPO}/productcenter/v1/new/uop/funds/all/info/base/query/collections`,
            add: `${IPO}/productcenter/v1/new/uop/funds/specification/info/fee/create`,
            del: [`${IPO}/productcenter/v1/new/uop/funds/`, `/fee/delete`]
        }
    },
    attendQuery: {
        customerDataQuery: `${icif}/icif/v1/custs/base/qry`,
        custNoQuery: `${icif}/icif/v1/custs/qry-by-cust-no`,
        bankCardQuery: `${icif}/icif/v1/bank-cards/query-card-ignore-status`,
        fundAcct: `${icif}/icif/v1/fundaccts/qry-by-cust-no`,
        capitalModeQuery: `${businessMgmt}/param/params`,
        queryBankName: `${ANTI_NEWBE}/bankBnkBaseConf`,
        queryBankIdTp: `${ANTI_NEWBE}/bankIdTpConf`,
    },
    // 高端理财
    highFinancialMgmt: {
        investAudit: {
            getList: `${icif}/icif/v1/pcusts/query-pqi-app`,
            getSerialNo: `${icif}/icif/v1/custs/get-pqi-app`,
            submitAudit: `${icif}/icif/v1/pcusts/check-pqi-app`
        },
        // 额度管理
        quotaMgmt: {
            getTableData: `${highFinancialMgmt}/uop/amount`,
            query: `${highFinancialMgmt}/uop/amount`,
            update: `${highFinancialMgmt}/uop/amount`,
            saveParam: `${highFinancialMgmt}/uop/amount`,
            fundList: `${highFinancialMgmt}/uop/cust-group-mapping/fundinfo-list`, //产品名称
        },
        // 客群创建
        custGroupInfo: {
            getTableData: `${highFinancialMgmt}/uop/cust-group/all`,
            custList: `${highFinancialMgmt}/uop/cust-group/name-list`, //下拉列表数据
            saveParam: `${highFinancialMgmt}/uop/cust-group/add`,
            update: `${highFinancialMgmt}/uop/cust-group/update`,
        },
        // 名单管理
        custInfo: {
            getTableData: `${highFinancialMgmt}/uop/cust-info/all`,
            custList: `${highFinancialMgmt}/uop/cust-group/name-list`, //下拉列表数据
            custIdClass: `${highFinancialMgmt}/uop/cust-info/idtp-list`,
            saveParam: `${highFinancialMgmt}/uop/cust-info/add`,
            deleteParam: `${highFinancialMgmt}/uop/cust-info/delete`,
            ExcelUpload: `${highFinancialMgmt}/uop/cust-info/upload-execl`,
        },
        //补充协议配置
        custGroupMapping: {
            getTableData: `${highFinancialMgmt}/uop/cust-group-mapping/all`,
            custList: `${highFinancialMgmt}/uop/cust-group/name-list`, //下拉列表数据
            fundList: `${highFinancialMgmt}/uop/cust-group-mapping/fundinfo-list`,
            saveParam: `${highFinancialMgmt}/uop/cust-group-mapping/add`,
            deleteParam: `${highFinancialMgmt}/uop/cust-group-mapping/delete`,
            failureSave: `${highFinancialMgmt}/uop/cust-group-mapping/update-effective`,
        },
        //补充协议签署
        custGroupSign: {
            getTableData: `${highFinancialMgmt}/uop/cust-group-mapping/sign-list`,
            custList: `${highFinancialMgmt}/uop/cust-group/name-list`, //下拉列表数据
            custIdClass: `${highFinancialMgmt}/uop/cust-info/idtp-list`,
            fundList: `${highFinancialMgmt}/uop/cust-group-mapping/fundinfo-list`,
        },
        // 净值查询权限
        netQueryPrivilegeMgmt: {
            getTableData: `${highFinancialMgmt}/uop/hlvl-whitelist/all`,
            search: `${highFinancialMgmt}/customers/owned-funds/custinfo-by-idno`, //查询证件号码
            saveParam: `${highFinancialMgmt}/uop/hlvl-whitelist/add`,
            update: `${highFinancialMgmt}/uop/hlvl-whitelist/update`,
        },
        // 产品面向的特殊客户管理
        fundSpecificPopulationList: {
            getTableData: `${highFinancialMgmt}/uop/specific-population/lists`,
            saveParam: `${highFinancialMgmt}/uop/specific-population/add-population`,
            deleteParam: `${highFinancialMgmt}/uop/specific-population/delete-population`,
            update: `${highFinancialMgmt}/uop/specific-population/update-population`,
            fundList: `${highFinancialMgmt}/uop/cust-group-mapping/fundinfo-list`,
        },
        // 基础参数维护
        basicsParamMaintain: {
            getTableData: `${highFinancialMgmt}/uop/parameter/`,
            update: `${highFinancialMgmt}/uop/parameter/parameter`,
        },
        // 观察日管理
        observationDaysMgmt: {
            getTableData: `${highFinancialMgmt}/uop/hlvl-product-term-day/all`,
            saveParam: `${highFinancialMgmt}/uop/hlvl-product-term-day/add`,
            update: `${highFinancialMgmt}/uop/hlvl-product-term-day/update`,
            fundList: `${highFinancialMgmt}/uop/cust-group-mapping/fundinfo-list`,
        },
        // 产品关注查询
        custCareQry: {
            getTableData: `${highFinancialMgmt}/uop/cust-care-mapping/all`,
            fundList: `${highFinancialMgmt}/uop/cust-group-mapping/fundinfo-list`,
        },
        // 到期推荐管理
        recommendOtherFund: {
            getTableData: `${highFinancialMgmt}/uop/recommend/lists`,
            deleteParam: `${highFinancialMgmt}/uop/recommend/delete-recommend`,
            update: `${highFinancialMgmt}/uop/recommend/update-recommend`,
            saveParam: `${highFinancialMgmt}/uop/recommend/add-recommend`,
            fundList: `${highFinancialMgmt}/uop/cust-group-mapping/fundinfo-list`, //基金代码列表
            changeCode: `${highFinancialMgmt}/uop/recommend/maturity-fundinfo-list`,
        },
        // 产品专区管理
        productAreaMgmt: {
            getTableData: `${highFinancialMgmt}/uop/fundzone/lists`,
            saveParam: `${highFinancialMgmt}/uop/fundzone/add-zone`,
            deleteParam: `${highFinancialMgmt}/uop/fundzone/delete-zone`,
            update: `${highFinancialMgmt}/uop/fundzone/update-zone`,
            checklist: `${highFinancialMgmt}/uop/fundzone/get`,
            fundList: `${highFinancialMgmt}/uop/cust-group-mapping/fundinfo-list`,
        },
        // 流水号管理
        bookingCodeMgmt: {
            getTableData: `${highFinancialMgmt}/reserve-code/all`,
            saveSingle: `${highFinancialMgmt}/reserve-code/add`,
            saveBatch: `${highFinancialMgmt}/reserve-code/add`,
            update: `${highFinancialMgmt}/reserve-code/update`,
            sendOut: `${highFinancialMgmt}/reserve-code/send-message`,
            refuse: `${highFinancialMgmt}/reserve-code/update`,
            invalid: `${highFinancialMgmt}/reserve-code/update`,
            fundList: `${highFinancialMgmt}/uop/cust-group-mapping/fundinfo-list`,
            lookOpenTime: `${highFinancialMgmt}/reserve-code/open-date`,
        },
        openDay: { //开放日管理复核

        },
        vipCancelHandle: {
            fundIdList: `${IPOReview}/productcenter/v1/new/uop/funds/online-apprbase/info/id-name/query/collections`,
            getTableList: `${highFinancialMgmt}/trades/cancelable/bid-trade`
        },
        vipCancelReview: {
            getTableList: `${highFinancialMgmt}/trades/cancelable/bid-trade`,
            fundIdList: `${IPOReview}/productcenter/v1/new/uop/funds/online-apprbase/info/id-name/query/collections`,
            cancel: `${highFinancialMgmt}/trades/cancel/uop`
        }
    },
    // 高端理财企业版
    highFinancialCompany: {
        enterpriseQuotaMgmt: {
            getTableData: `${highFinancialCompany}/uop/amount/amountent`,
            query: `${highFinancialCompany}/uop/amount`,
            saveParam: `${highFinancialCompany}/uop/amount`,
            update: `${highFinancialCompany}/uop/amount`,
            fundList: `${highFinancialMgmt}/uop/cust-group-mapping/fundinfo-list`, //产品名称
        }
    },
    closingMgmt: {
        closingMgmt: {
            getCheckDate: `${CTS}/close-check-ack/query-check-date`,
            getList: `${CTS}/close-check-ack/display-result`,
            getStatus: `${CTS}/close-check-ack/query-close-check-status`,
            pause: `${CTS}/close-check-ack/stop-close-check`,
            recover: `${CTS}/close-check-ack/recover-close-check`,
            close: `${CTS}/close-check-ack/close-check`,
            listClose: `${CTS}/close-check-ack/dayend-4-single-sys`
        }
    },
    tradeInfoQuery: {
        tradeApplyForQuery: {
            fundIdList: `${ESS}/fund/fund-list`,
            commonServicesQuery: `${businessMgmt}/param/params`,
            queryList: `${ESS}/trade/tradeinfos-uop`
        }
    },
    switchMgmt: {
        switchCategoryMgmt: {
            querySwitchInfo: `${IPO_Switch}/productcenter/v1/new/uop/switch/info/query`,
            querySwitchList: `${IPO_Switch}/productcenter/v1/new/uop/switch/info/query/all/collections`,
            addSwitchInfo: `${IPO_Switch}/productcenter/v1/new/uop/switch/info/create`,
            deleteSwitchInfo: `${IPO_Switch}/productcenter/v1/new/uop/switch/info/delete`,
            updateSwitchInfo: `${IPO_Switch}/productcenter/v1/new/uop/switch/info/update`
        },
        fundSwitchMgmt: {
            //双条件查询接口
            querySwitchInfo: `${IPO_Switch}/productcenter/v1/new/uop/switch/relation/query/collections`,
            //fundId条件查询接口
            querySwitchforFundId: `${IPO_Switch}/productcenter/v1/new/uop/switch/relation/query/fundid/collections`,
            //switchName条件查询接口
            querySwitchforName: `${IPO_Switch}/productcenter/v1/new/uop/switch/relation/query/name/collections`,
            querySwitchSelect: `${IPO_Switch}/productcenter/v1/new/uop/switch/info/query/all/collections`,
            querySwitchList: `${IPO_Switch}/productcenter/v1/new/uop/switch/relation/query/page/collections`,
            addSwitchInfo: `${IPO_Switch}/productcenter/v1/new/uop/switch/relation/create`,
            deleteSwitchInfo: `${IPO_Switch}/productcenter/v1/new/uop/switch/relation/delete`,
            updateSwitchInfo: `${IPO_Switch}/productcenter/v1/new/uop/switch/relation/update`,
            queryCount: `${IPO_Switch}/productcenter/v1/new/uop/switch/relation/query/page/count`
        }
    },
    fundTag: {
        fundTagMgmt: { //基金标签管理
            getTableData: `${fundTag}/productcenter/v1/new/uop/tags/category/all/query/collections`,
            getTagDetail: [`${fundTag}/productcenter/v1/new/uop/tags/category/`, '/query/collections'],
            saveParam: `${fundTag}/productcenter/v1/new/uop/tags/category/create`,
            update: `${fundTag}/productcenter/v1/new/uop/tags/category/update-no-version`,
            attribute: `${fundTag}/productcenter/v1/new/uop/tags/category`,
            deleteParam: `${fundTag}/productcenter/v1/new/uop/tags/category/delete`,
            // 详细属性-新增配置
            AddList: `${fundTag}/productcenter/v1/new/uop/tags/tagdic/create`,
            // 详细属性-修改标签配置
            modifyUpdate: `${fundTag}/productcenter/v1/new/uop/tags/tagDic/update-no-version`,
            // 详细属性-删除标签配置
            deleteList: `${fundTag}/productcenter/v1/new/uop/tags/tagdic/delete`,
            // 详细属性-批量删除标签配置
            deleteAll: `${fundTag}/productcenter/v1/new/uop/tags/tagdic/batch/delete`,
        },
        fundTagMgmtNew: { //基金标签管理
            getTableData: `${fundTag}/productcenter/v1/new/uop/tags/category/all/query/collections`,
            getTagDetail: [`${fundTag}/productcenter/v1/new/uop/tags/category/`, '/query/collections'],
            saveParam: `${fundTag}/productcenter/v1/new/uop/tags/category/create/v1`,
            update: `${fundTag}/productcenter/v1/new/uop/tags/category/update-no-version`,
            attribute: `${fundTag}/productcenter/v1/new/uop/tags/category`,
            deleteParam: `${fundTag}/productcenter/v1/new/uop/tags/category/delete`,
            // 详细属性-新增配置
            AddList: `${fundTag}/productcenter/v1/new/uop/tags/tagdic/create/v1`,
            // 详细属性-修改标签配置
            modifyUpdate: `${fundTag}/productcenter/v1/new/uop/tags/tagdic/update`,  
            // 详细属性-删除标签配置
            deleteList: `${fundTag}/productcenter/v1/new/uop/tags/tagdic/delete`,
            // 详细属性-批量删除标签配置
            deleteAll: `${fundTag}/productcenter/v1/new/uop/tags/tagdic/batch/delete`,
            //新标签系统可选标签渠道
            queryChannel: `${fundTag}/productcenter/v1/new/uop/tags/tagdic/channel/query`,
        },
        fundTagSetting: {
            getTableData: `${fundTag}/productcenter/v1/new/uop/tags/query/all/collections`,
            update: `${fundTag}/productcenter/v1/new/uop/tags/tag-relevant/update-no-version`,
            deleteParam: `${fundTag}/productcenter/v1/new/uop/funds/batch/tag-rela/delete`,
            saveBatch: `${fundTag}/productcenter/v1/new/uop/tags/tagrela/batch/create`,
            exportAll: `${fundTag}/productcenter/v1/new/uop/tags/query/all/collections`,

            // 获取新增弹窗里基金代码一级菜单名称
            getTagName: `${fundTag}/productcenter/v1/new/uop/tags/category/all/query/collections`,
            // 获取新增弹窗里基金代码二级菜单名称
            getDescName: `${fundTag}/productcenter/v1/new/uop/tags/category`,
        },
        fundTagSettingNew: {
            getTableData: `${fundTag}/productcenter/v1/new/uop/tags/query/all/collections`,
            update: `${fundTag}/productcenter/v1/new/uop/tags/tag-relevant/update-no-version`,
            deleteParam: `${fundTag}/productcenter/v1/new/uop/funds/batch/tag-rela/delete`,
            saveBatch: `${fundTag}/productcenter/v1/new/uop/tags/tagrela/batch/create/v1`,
            exportAll: `${fundTag}/productcenter/v1/new/uop/tags/query/all/collections`,

            // 获取新增弹窗里基金代码一级菜单名称
            getTagName: `${fundTag}/productcenter/v1/new/uop/tags/category/all/query/collections`,
            // 获取新增弹窗里基金代码二级菜单名称
            getDescName: `${fundTag}/productcenter/v1/new/uop/tags/category`,
        },
        filterMgmt:{
            // get获取筛选列表
            getTableData: `${fundTag}/ess/v1/manger/uop/condition`,
            // POST /v1/manger/uop/condition更新筛选条件
            upCondition: `${fundTag}/ess/v1/manger/uop/condition`,
        },
        filterMgmtDetails:{
              // 获取标签或滑轴默认值 ?optionCode=12'
              getDefaults: `${fundTag}/ess/v1/manger/uop/option/defaults`,
              // PUT 修改条件选项
              upOption: `${fundTag}/ess/v1/manger/uop/option`,
              // POST /v1/manger/uop/option  新增条件选项
              addOption: `${fundTag}/ess/v1/manger/uop/option`,
              // /ess/v1/manger/uop/option?labelCode=11 GET 获取条件选项列表
              getOption: `${fundTag}/ess/v1/manger/uop/option`,
              // 删除条件选项/ess/v1/manger/uop/option?optionCode=11
              deleteOption: `${fundTag}/ess/v1/manger/uop/option`
        }
    },
    pauseTradeMgmt: { //暂停交易
        pauseTradeHandle: {
            collection: `${combinationPro}/productcenter/v1/new/uop/funds/all/info/base/query/collections`,
            getTableData: `${combinationPro}/productcenter/v1/new/uop/funds/single/info/suspend/query/collections`,

        },
        pauseTradeReview: {
            collection: `${combinationPro}/productcenter/v1/new/uop/funds/all/info/base/query/collections`,
            getTableData: `${combinationPro}/productcenter/v1/new/uop/funds/single/info/suspend/query/collections`,
            saveParam: `${combinationPro}/productcenter/v1/new/uop/funds/single/info/suspend/create`,
            deleteParam: `${combinationPro}/productcenter/v1/new/uop/funds/single/info/suspend/delete`,
            update: `${combinationPro}/productcenter/v1/new/uop/funds/single/info/suspend/update`,

        },
        pauseTradeStatus: {
            collection: `${combinationPro}/productcenter/v1/new/uop/funds/all/info/base/query/collections`,
            getTableData: `${combinationPro}/productcenter/v1/new/query/funds`,
        },
    },
    fundComparison: {
        basicInformation: {
            getTableData: `${fundComparison}/diff-productcenter/productcenter/v1/new/test/diff/detail/base`,
        },
        rateHandle: {
            getTableData: `${fundComparison}/diff-productcenter/productcenter/v1/new/test/diff/detail/fund-fee-detail`,
        },
        highFinancialOpen: {
            getTableData: `${fundComparison}/diff-productcenter/productcenter/v1/new/test/diff/detail/hlvl-workdays`,
        },
    },
    combinationProductConfig: {
        combinationProductHandle: {
            getTableData: `${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/query/base/all-valid/collections`,
            details: `${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/query/info/detail/collections`, //详情
            fundGroups: `${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/query/base/all-valid/collections`,
            allGroupId: `${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/query/base/all-groupid/no-condition/collections`, //验证查询所有ID
            fundList: `${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/query/fundgroup-fundinfo/all-valid/collections`,
            // 获取网点类型
            branchCodeList: `${combinationParam}/param/params`,
            // 获取组合类型
            fundGroupType: `${combinationParam}/param/params`,
            // 获取年临段
            ageRangeList: `${combinationParam}/param/params`,
            //获取风险类型
            grouptypeList: `${combinationParam}/param/params`,
            // 获取风险等级
            risklevelList: `${combinationParam}/param/params`,
            // 验证有没有净值   // 20210726替换为navListNew
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
            fundGroupType: `${combinationParam}/param/params`,
            // 获取年临段
            ageRangeList: `${combinationParam}/param/params`,
            //获取风险类型
            grouptypeList: `${combinationParam}/param/params`,
            // 获取风险等级
            risklevelList: `${combinationParam}/param/params`,
            // 获取网点类型
            branchCodeList: `${combinationParam}/param/params`,
            // 计算净值
            calcParams: `${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/batch/query/check-integrity/collections`, //验证是否处于分红中

        },
        reportMgmt: {
            // getTableData: `${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/batch/query/report/collections`,
            getTableData: `${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/batch/query/report-detail/by-reportid/collections`,
            saveParam: `${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/single/report/base/create`,
            deleteParam: `${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/single/report/base/delete`,
            relationParam: `${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/single/report/relation/create`,
            fundGroups: `${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/query/base/all-valid/collections`,
            getReportInfo: `${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/single/report/extend/query`,
            saveReportInfo: `${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/single/report/extend/delete-then-insert`
        },
        investmentRisk: {
            getTableData: `${combinationPro}/fundgroup/v1/risks/records`
        },
        productPoolMgmt: {
            getTableData: `${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/query/fundgroup-fundinfo/all-valid/collections`,
            showRefresh: `${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/batch/fundgroup-fundinfo/create/collections`,
            exportAlls: `${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/query/fundgroup-fundinfo/all-valid/collections`,
        },
        productParamsAdd: {
            getTableData: `${combinationMgmt}/productcenter/v1/new/uop/fundgroup/shift/info/detail/all/collections`,
            saveParam: `${combinationMgmt}/productcenter/v1/new/uop/fundgroup/shift/info/detail/create`,
            update: `${combinationMgmt}/productcenter/v1/new/uop/fundgroup/shift/info/detail/update`,
            SeriesList: `${combinationMgmt}/productcenter/v1/new/uop/fundgroup/shift/type/query/all/collections`,
            getFundGroup: `${combinationMgmt}/productcenter/v1/fundgroup/getFundGroup`,
        },
        productOperationRecord: {
            getTableData: `${combinationMgmt}/productcenter/v1/new/uop/fundgroup/query/latest/shift/history/collections`,
            saveParam: `${combinationMgmt}/productcenter/v1/new/uop/fundgroup/shift/history/insert-or-update`,
            search: `${combinationMgmt}/productcenter/v1/new/uop/fundgroup/query/single/shift/history/collections`,
            update: `${combinationMgmt}/productcenter/v1/new/uop/fundgroup/shift/history/insert-or-update`,
            fundGroups: `${combinationMgmt}/productcenter/v1/new/uop/fundgroup/shift/info/detail/all/collections`,
        },
        serialInformation: {
            getTableData: `${combinationMgmt}/productcenter/v1/new/uop/fundgroup/shift/type/query/all/collections`,
            saveParam: `${combinationMgmt}/productcenter/v1/new/uop/fundgroup/shift/type/create`,
            update: `${combinationMgmt}/productcenter/v1/new/uop/fundgroup/shift/type/update`,
        },
        productTradeHandle: {
            getTableData: `${combinationMgmt}/productcenter/v1/new/uop/fundgroup/single/actions/query/collections`,
        },
        productTradeReview: {
            getTableData: `${combinationMgmt}/productcenter/v1/new/uop/fundgroup/single/actions/query/collections`,
            update: `${combinationMgmt}/productcenter/v1/new/uop/fundgroup/single/action/update`,
            saveParam: `${combinationMgmt}/productcenter/v1/new/uop/fundgroup/single/action/create/collections`,
            deleteParam: `${combinationMgmt}/productcenter/v1/new/uop/fundgroup/single/action/delete`,
            testDate: `${combinationMgmt}/productcenter/v1/new/uop/fundgroup/single/action/query/valid`,
        },
        triple: {
            exportDirect: `${tripleDirectSell}/productcenter/v1/new/uop/fundgroup/old/bigdata/info/query/collections`,
            branchCode: `${CS}/common-services/v1/param/params`,
            getList: `${tripleDirectSell}/productcenter/v1/new/uop/fundgroup/new/bigdata/info/query/collections`,
            uploadXls: `${tripleDirectSell}/productcenter/v1/new/uop/fundgroup/batch/fundgroup-fundinfo/delete-then-insert/collections`,
        },
        productTargetProfitPlanSetting: {
            queryAll: `${combinationMgmt}/productcenter/v1/new/uop/fundgroup/single/end-action/query/all`,
            queryGroupId: `${combinationMgmt}/productcenter/v1/new/uop/fundgroup/single/end-action/query`,
            // 获取产品列表
            collection: `${IPO}/productcenter/v1/new/uop/funds/all/info/base/query/collections`,
            fundGroups: `${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/query/base/all-valid/collections`,
            // 新增修改
            add: `${combinationMgmt}/productcenter/v1/new/uop/fundgroup/single/end-action/delete-then-insert`,
            delete: `${combinationMgmt}/productcenter/v1/new/uop/fundgroup/single/end-action/delete`
        },
        groupDetails: {
            fundGroups: `${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/query/base/all-valid/collections`,
            fundGroupType: `${combinationParam}/param/params`,
            getTableData: `${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/query/base/all-valid/collections`,
            details: `${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/query/info/detail/collections`, //详情
            saveOrder: `${combinationPro}/productcenter/v1/new/uop/standard/fundgroup/single/info/detail/order/update`,
        },
        investmentAdviser: {
            labels: `${monitoringIP}/productcenter/v1/new/uop/standard/fundgroup/query/base/all-valid/collections`,
            getParams: `${combinationParam}/param/params`,
            add: `${combinationParam}/ia/iaf-discount`,
            delete: `${combinationParam}/ia/iaf-discount`,
            modify: `${combinationParam}/ia/iaf-discount`,
            tableData:`${combinationParam}/ia/iaf-discounts`
        }
    },
    IPOMgmtOCReview: {
        IPOBaseInfo: {
            fundIdList: `${IPOReview}/productcenter/v1/new/uop/funds/online-apprbase/info/id-name/query/collections`,
            tableData: `${IPOReview}/productcenter/v1/new/uop/funds/opm/approve/base-info/query/collections`,
            showChinese: `${businessMgmt}/param/params`,
            review: `${IPOReview}/productcenter/v1/new/uop/funds/single/opm/approve/base-info/confirm`
        },
        IPOLimit: {
            fundIdList: `${IPOReview}/productcenter/v1/new/uop/funds/online-apprbase/info/id-name/query/collections`,
            tableData: `${IPOReview}/productcenter/v1/new/uop/funds/opm/approve/fee-limit/query/collections`,
            showChinese: `${businessMgmt}/param/params`,
            review: `${IPOReview}/productcenter/v1/new/uop/funds/single/opm/approve/fee-limit/confirm`
        },
        IPOBaseInfoDetail: {
            showChinese: `${businessMgmt}/param/params`,
            tableData: `${IPOReview}/productcenter/v1/new/uop/funds/opm/approve/base-info/query/collections`,
            review: `${IPOReview}/productcenter/v1/new/uop/funds/single/opm/approve/base-info/confirm`
        },
        IPOLimitDetail: {
            tableData: `${IPOReview}/productcenter/v1/new/uop/funds/opm/approve/fee-limit/query/collections`,
            review: `${IPOReview}/productcenter/v1/new/uop/funds/single/opm/approve/fee-limit/confirm`

        },
        datumRate: {
            fundIdList: `${IPOReview}/productcenter/v1/new/uop/funds/online-apprfee/info/id-name/query/collections`,
            tableData: `${IPOReview}/productcenter/v1/new/uop/funds/opm/approve/fee-detail/query/collections`,
            review: `${IPOReview}/productcenter/v1/new/uop/funds/single/opm/approve/fee-detail/confirm`

        },
        largePurchaseLimit: {
            tableData: `${CS}/common-services/v1/rule/quotas`,
            review: `${CS}/common-services/v1/rule/check/big-quota`,
        },
        fundTransform: {
            fundIdList: `${IPOReview}/productcenter/v1/new/uop/funds/online/info/id-name/query/collections`,
            tableData: `${IPOReview}/productcenter/v1/new/uop/funds/online/info/transformation/query/collections`,
        },
        paramsCheck: {
            fundIdList: `${IPOReview}/productcenter/v1/new/uop/funds/online/info/id-name/query/collections`,
            tableData: `${IPOReview}/productcenter/v1/new/uop/funds/opm/approve/discount/query/collections`,
            approve: `${IPOReview}/productcenter/v1/new/uop/funds/single/opm/approve/discount/confirm`,
        },
        transferBlacklist: {
            fundIdNameList: `${IPOReview}/productcenter/v1/new/uop/funds/online/info/id-name/query/collections`,
            tableData:  `${IPOReview}/productcenter/v1/new/uop/fund/convert/batch/black/list/query`,
            add:        `${IPOReview}/productcenter/v1/new/uop/fund/convert/batch/black/list/insert`,
            delete:     `${IPOReview}/productcenter/v1/new/uop/fund/convert/batch/black/list/delete`,
        },
        transferWhitelist: {
            fundIdNameList: `${IPOReview}/productcenter/v1/new/uop/funds/online/info/id-name/query/collections`,
            tableData:  `${IPOReview}/productcenter/v1/new/uop/fund/convert/batch/white/list/query`,
            add:        `${IPOReview}/productcenter/v1/new/uop/fund/convert/batch/white/list/insert`,
            delete:     `${IPOReview}/productcenter/v1/new/uop/fund/convert/batch/white/list/delete`,
        },
        financialOpenDayReview: {
            fundIdList: `${IPOReview}/productcenter/v1/new/uop/funds/online/info/id-name/query/collections`,
            tableData: `${IPOReview}/productcenter/v1/new/uop/funds/opm/approve/vip-action/query/collections`,
            approve: `${IPOReview}/productcenter/v1/new/uop/funds/single/opm/approve/vip-action/confirm`,
        },
        // 暂停交易数据复核
        pauseTradeDataReview: {
            fundIdList: `${combinationMgmt}/productcenter/v1/new/uop/funds/online-apprfee/info/id-name/query/collections`,
            tableData: `${combinationMgmt}/productcenter/v1/new/uop/funds/opm/approve/suspend/query/collections`,
            review: `${combinationMgmt}/productcenter/v1/new/uop/funds/single/opm/approve/suspend/confirm`,
            update: `${combinationMgmt}/productcenter/v1/new/uop/funds/single/opm/approve/suspend/update`,
        },
        publishHandle: {
            fundIdList: `${IPOReview}/productcenter/v1/new/uop/funds/online-apprbase/info/id-name/query/collections`,
            tableData: `${IPOReview}/productcenter/v1/new/uop/funds`,

        },
        publishReview: {
            fundIdList: `${IPOReview}/productcenter/v1/new/uop/funds/online-apprbase/info/id-name/query/collections`,
            tableData: `${IPOReview}/productcenter/v1/new/uop/funds`,
            delLineData: `${IPOReview}/productcenter/v1/new/uop/funds`,
            modifyLineData: `${IPOReview}/productcenter/v1/new/uop/funds`,
            addLineData: `${IPOReview}/productcenter/v1/new/uop/funds/specification/lifecircle/create/collections`,

        }
    },
    productInfoConfig: {
        productExpandType: {
            query: `${combinationMgmt}/productcenter/v1/new/uop/product/extend/category/query/collections`,
            add: `${combinationMgmt}/productcenter/v1/new/uop/product/extend/category/create/collections`,
            update: `${combinationMgmt}/productcenter/v1/new/uop/product/extend/category/column/update`
        },
        productExpandContent: {
            getFundList: `${combinationMgmt}/productcenter/v1/new/uop/product/extend/info/query/funds-groups/collections`,
            getTypeList: `${combinationMgmt}/productcenter/v1/new/uop/product/extend/category/query/collections`,
            query: `${combinationMgmt}/productcenter/v1/new/uop/product/extend/info/query/collections`,
            add: `${combinationMgmt}/productcenter/v1/new/uop/product/extend/value/delete-then-insert`
        },
        freeRideProductConfig: {
            getTableData: `${combinationMgmt}/productcenter/v1/new/uop/fund-bundle/single/query`,
            saveParam: `${combinationMgmt}/productcenter/v1/new/uop/fund-bundle/single/create`,
            update: `${combinationMgmt}/productcenter/v1/new/uop/fund-bundle/single/update`,
            deleteParam: `${combinationMgmt}/productcenter/v1/new/uop/fund-bundle/single/delete`,
            // 管理基金
            showFund: `${combinationMgmt}/productcenter/v1/new/uop/fund-bundle-detail/query/fund/collections`,
            // 管理基金-新增配置
            AddList: `${combinationMgmt}/productcenter/v1/new/uop/fund-bundle-detail/fund/single/create`,
            updateList: `${combinationMgmt}/productcenter/v1/new/uop/fund-bundle-detail/fund/update`,
            deleteList: `${combinationMgmt}/productcenter/v1/new/uop/fund-bundle-detail/fund/delete`,
            //获取所有基金
            fundList: `${combinationMgmt}/productcenter/v1/new/uop/standard/fundgroup/query/fundgroup-fundinfo/all-valid/collections`,
        }
    }
};