//客服操作接口总配置
let customerService;
if (global.envConfig.customerService) {
    customerService = global.envConfig.customerService;
} else {
    customerService = global.envConfig.inner_gateway;
}
let icif;
if (global.envConfig.icif) {
    icif = global.envConfig.icif;
} else {
    icif = global.envConfig.inner_gateway;
}
//客服操作渠道信息的获取
let customerMgmt;
if (global.envConfig.customerMgmt) {
    customerMgmt = global.envConfig.customerMgmt;
} else {
    customerMgmt = global.envConfig.inner_gateway;
}
//
let paramsMaintain = '';
if (global.envConfig.CS) {
    paramsMaintain = global.envConfig.CS;
} else {
    paramsMaintain = global.envConfig.inner_gateway;
}
// 20210714-线下资产证明审批迁移至资产中心
let assetcenter = '';
if (global.envConfig.assetcenter) {
    assetcenter = global.envConfig.assetcenter;
} else {
    assetcenter = global.envConfig.inner_gateway;
}
module.exports = {
    accountQuery: { //账户查询
        custInfo: { //客户信息查询
            getInfo: `${customerService}/cos/v1/user/composite-info`,
            userTiedCard: `${customerService}/cos/v1/config/monitor/cards-with-avail`, //客户绑卡信息
            userHistory: `${customerService}/cos/v1/config/monitor/frozen-records`, //客户历史冻结记录
            userTradeRecords: `${customerService}/cos/v1/config/monitor/trade-records`, //客户直销交易记录
            unfreezeList: `${customerService}/cos/v1/user/unfreeze-branches`, //非冻结状态列表
            freezeList: `${customerService}/cos/v1/user/frozen-branches`, //冻结列表
            frozenReason: `${customerService}/cos/v1/config/dictionary/frozen-reason`, //冻结列表
            frozen: `${customerService}/cos/v1/config/monitor/freeze`, //冻结
            unfreeze: `${customerService}/cos/v1/config/monitor/unfreeze`,
            getCustNo: `${icif}/icif/v1/custs/base/qry`,
            custNoByBank: `${icif}/icif/v1/bank-cards/query-bank-cust-trade-acct`
        },
        IDInspect: {
            // inspect: `${customerService}/cos/v1/identity/id-card/validate`,
            inspect: `${customerService}/cos/v1/config/monitor/identity-verification`,  // 20210813 身份信息验证去掉曾用名注册账户检查逻辑
            geiInfo: `${icif}/icif/v1/custs/base/qry`
        },
        bankCardInspect: {
            inspectZT: `${customerService}/cos/v1/bankcards/debit-card/validate-by-zt`,
            inspectGEO: `${customerService}/cos/v1/bankcards/debit-card/validate-by-geo`,
        },
        mobileNumInspect: {
            inspect: `${customerService}/cos/v1/mobile/validate`,
            inspectLogs: `${customerService}/cos/v1/mobile/validation/logs`,
        },
        blackListInspect: {
            uploadXls: `${customerService}/cos/v1/config/monitor/suspicious-by-field`,
            freezeList: `${customerService}/cos/v1/config/monitor/batch-freeze`
        },
        mobileRecordInspect: {
            tableList: `${customerService}/cos/v1/mobile/validation/logs`
        },
        faceInspect: {
            validate: `${customerService}/cos/v1/identity/face-comparison/validate`
        },
        firstTradeInspect: {
            unprocessed: `${customerService}/cos/v1/config/case/first-block-trade/unprocessed-list`,
            processed: `${customerService}/cos/v1/config/case/first-block-trade/processed-list`,
            detail: `${customerService}/cos/v1/config/case/first-block-trade/detail`,
            modify: `${customerService}/cos/v1/config/case/first-block-trade`,
        },
    },
    bankCardAudit: { //变更银行卡审核
        changeCard: { //银行卡变更
            getList: `${customerService}/cos/v1/config/monitor/bankcard-change/composite-bankcard-info`,
            upload: `${customerService}/cos/v1/config/monitor/bankcard-change/upload`,
            submitModify: `${customerService}/cos/v1/config/monitor/bankcard-change`,

        },
        businessHandle: { //业务经办
            getList: `${customerService}/cos/v1/config/monitor/bankcard-change/query-by-page`,

        },
        businessReview: { //业务复核
            getList: `${customerService}/cos/v1/config/monitor/bankcard-change/query-by-page`,

        },
        applyRecord: { //申请记录
            getList: `${customerService}/cos/v1/config/monitor/bankcard-change/query-by-page`,
        },
        review: { //内嵌页
            getList: `${customerService}/cos/v1/config/monitor/bankcard-change/detail`,
            img: `${customerService}/cos/v1/config/monitor/bankcard-change/download`,
            auditHandle: `${customerService}/cos/v1/config/monitor/bankcard-change/audit`,
            auditReview: `${customerService}/cos/v1/config/monitor/bankcard-change/reaudit`,
            sendSms: `${customerService}/cos/v1/config/monitor/bankcard-change/send-sms`,

        }
    },
    assetTestify: { //资产证明
        applyQuery: { //申请查询
            // getList: `${customerService}/cos/v1/config/monitor/offline-asset-certifications`,
            // update: `${customerService}/cos/v1/config/monitor/offline-asset-certifications`,
            // 
            // 20210714-线下资产证明审批迁移至资产中心
            getList: `${assetcenter}/assetcenter/v2/certification/uop/apply-records`, // status为""
            update: `${assetcenter}/assetcenter/v2/certification/uop/offline-operate`,
        },
        doneQuery: { //已处理查询
            // getList: `${customerService}/cos/v1/config/monitor/offline-asset-certifications/handled`,
            // 
            // 20210714-线下资产证明审批迁移至资产中心
            getList: `${assetcenter}/assetcenter/v2/certification/uop/apply-records`,  // status为Y
        }
    },
    modifyPhoneNum: { //修改手机号审核
        businessHandle: { //业务经办
            getList: `${customerService}/cos/v1/config/monitor/mobile-change/query-by-page`,

        },
        businessReview: { //业务复核
            getList: `${customerService}/cos/v1/config/monitor/mobile-change/query-by-page`,
        },
        applyRecord: { //申请记录
            getList: `${customerService}/cos/v1/config/monitor/mobile-change/query-by-page`,
        },
        review: { //内嵌页
            getList: `${customerService}/cos/v1/config/monitor/mobile-change/detail`,
            img: `${customerService}/cos/v1/config/monitor/bankcard-change/download`,
            auditHandle: `${customerService}/cos/v1/config/monitor/mobile-change/audit`,
            auditReview: `${customerService}/cos/v1/config/monitor/mobile-change/reaudit`,
            sendSms: `${customerService}/cos/v1/config/monitor/mobile-change/send-sms`,

        }
    },
    selfFundManage: { //本金处理
        staticFund: {
            getList: `${customerService}/cos/v1/bankcards/principal-for-monitor`,
            submitData: `${customerService}/cos/v1/bankcards/principal`,
        },
        batchUpdateFund:{ //批量修改本金
            getList: `${customerService}/cos/v1/bankcards/principal-for-monitor`,
            submitData: `${customerService}/cos/v1/bankcards/principal`,
            queryData: `${customerService}/cos/v1/config/monitor/batch-principal-for-uop`,
        }
    },
    custAccountMgmt: {
        accountDelete: {
            getCustInfoByIdNo: `${customerService}/icif/v1/custs/qry-by-cust-three-item`,
            getCustNo: `${customerService}/icif/v1/custs/qry-cust-no-by-acct`,
            getIdNo: `${customerService}/icif/v1/custs/qry-by-cust-no`,
            getFundAcct: `${customerService}/icif/v1/fundaccts/qry-by-cust-no`,
            getTradeAcct: `${customerService}/icif/v1/tradeaccts`,
            getAssetInfo: `${customerService}/assetcenter/v1/asset/balance`,
            delPersonalAccountD: `${customerService}/icif/v1/pcusts/del-cust`,
            delPersonalAccountC: `${customerService}/icif/v1/pcusts/del-cust-ps`,
            delCompanyAccount: `${customerService}/icif/v1/icusts/del-cust`
        },
        accountTransform: {
            getCustInfoByIdNo: `${customerService}/icif/v1/custs/qry-by-cust-three-item`,
            getCustNo: `${customerService}/icif/v1/custs/qry-cust-no-by-acct`,
            getIdNo: `${customerService}/icif/v1/custs/qry-by-cust-no`,
            getFundAcct: `${customerService}/icif/v1/fundaccts/qry-by-cust-no`,
            getTradeAcct: `${customerService}/icif/v1/tradeaccts`,
            getAssetInfo: `${customerService}/assetcenter/v1/asset/balance`,
            delPersonalAccountD: `${customerService}/icif/v1/pcusts/del-cust`,
            delPersonalAccountC: `${customerService}/icif/v1/pcusts/del-cust-ps`,
            delCompanyAccount: `${customerService}/icif/v1/icusts/del-cust`
        },
        accountCancel: {
            getCustInfoByIdNo: `${customerService}/icif/v1/custs/qry-by-cust-three-item`,
            getCustNo: `${customerService}/icif/v1/custs/qry-cust-no-by-acct`,
            getIdNo: `${customerService}/icif/v1/custs/qry-by-cust-no`,
            getFundAcct: `${customerService}/icif/v1/fundaccts/qry-by-cust-no`,
            getTradeAcct: `${customerService}/icif/v1/tradeaccts`,
            getAssetInfo: `${customerService}/assetcenter/v1/asset/balance`,
            cancelPersonal: `${customerService}/icif/v1/pcusts/cust-st`,
            cancelCompany: `${customerService}/icif/v1/icusts/cust-st`
        }
    },
    topUpOrtake: { //当日充值当日快取
        dealQuota: { //交易限额配置
            getTableData: `${customerService}/cos/v1/config/trade/limit-list`,
            submitData: `${customerService}/cos/v1/config/trade/limit`,
            submitUpdate: `${customerService}/cos/v1/config/trade/limit`,
            getChannel: `${customerMgmt}/hop/v1/partner/general-partner-info`,
        },
        specialCust: { //特殊客户管理
            getTableData: `${icif}/icif/v1/custs/qry-by-cust-element`, //查询客户信息
            geiInfo: `${customerService}/cos/v1/account/quota/encash-limit-by-day`, //查询客户数据
            savaData: `${customerService}/cos/v1/config/trade/vip-limit` //提交
        },
        weBankWhite: { //微众白名单
            getTableData: `${customerService}/cos/v1/config/white-list/we-bank/white`,
            savaParams: `${customerService}/cos/v1/config/white-list/we-bank/open`,
        },
    },
    accountMgm: { // 账户管理
        closeAcco: {
            idtpOptins: `${paramsMaintain}/common-services/v1/param/params`,
            custInfo: `${icif}/icif/v1/custs/qry-by-cust-element`,
            sole: `${icif}/icif/v1/pcusts/cust-st`, //个人销户
            company: `${icif}/icif/v1/icusts/cust-st` //企业销户
        },
        custDevice: {
            getCustInfoByIdNo: `${icif}/icif/v1/custs/qry-by-cust-three-item`,
            custState: `${customerService}/cos/v1/switch/device-binding/status`,
            custClose: `${customerService}/cos/v1/config/monitor/device-binding/close`,
            custOpen: `${customerService}/cos/v1/config/monitor/device-binding/open`,
        }
    }
};