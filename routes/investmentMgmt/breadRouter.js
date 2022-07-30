module.exports = {
    index: {
        name: '投顾管理'
    },
    investmentStrategy: {
        index: 'combinationProductHandle.html',
        name: '投顾策略配置',
        child: {
            combinationProductHandle: '组合产品维护',
            combinationProductRisk: '组合产品风控设置',
            combinationProductRiskReview: '组合产品风控复核',
            combinationProductRiskCheck: '组合产品风控检查',
            combinationProductReview: '组合产品复核',
            // productPool: '产品池管理',
            // investFee: '投顾费率折扣',
            alternativePoolMgmt: '备选产品池管理',
            publishSetting: '发行设置',
			targetProfitStrategyConfig: '目标盈策略参数配置',
			targetProfitStrategyRecord: '目标盈策略运作记录'
        }
    },
    investmentInformationDisclosure:{
        index: 'matterAnnounce.html',
        name: '信息披露',
        child:{
            matterAnnounce: '重大事项披露',
            reportMgmt: '定期报告管理',
            monthlyReport: '投顾月报配置',
            quarterlyReport: '投顾季报配置',
        }
    },
    investmentStrategyMonitoring:{
        index: 'productIndexesForms.html',
        name: '投顾策略监控',
        child:{
            productIndexesForms:'投顾策略实时监控'
        }
    },
    investmentAccount: {
        index: 'accountRule.html',
        name: '投顾账户运营管理',
        child: {
            accountRule: '账户指标规则',
            indicatorMonitoring: '指标监控',
            // tradeAnomaly: '交易异常',
            tradeExecuteSurvey: '交易执行监测',
            investmentRisk: '投顾风控监测',
            tradeInstructMonitor: '交易指令监测'
        }
    },
    investmentRiskMonitor:{
        index: 'investmentRisk.html',
        name: '投顾风控监控',
        child: {
            investmentRisk: '投顾风控监测'
        }
    },
    tradeMonitor: {
        index: 'tradeInstructMonitor.html',
        name: '交易监测',
        child: {
            tradeInstructMonitor: '交易指令监测',
            tradeExecuteSurvey: '交易执行监测',
            tradeAbnormalHandle: '交易异常处理经办',
            tradeAbnormalReview: '交易异常处理复核',
        }
    },
    recordMgmt: {
        index: 'operateMgmt.html',
        name: '留痕管理',
        child: {
            operateMgmt: '业务人员操作管理',
            custOperateMgmt: '客户操作管理'
        }
    }
};