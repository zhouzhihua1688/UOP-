module.exports = {
    index: {
        name: '数据看版'
    },
    antDataPanel: {
        index: 'antDataPanel.html',
        name: '蚂蚁-数据看版',
        child: {
            coreData: '核心数据看板',
            customerMonitor: '客户监测看板',
            keyProductsMonitor: '重点产品监测看板',
            holdingDashboard: '保有量明细仪表板',
            volumeDashboard: '交易量明细仪表板',
            customerNumDashboard: '客户数明细仪表板',
        }
    },
    antOperation: {
        index: 'antOperation.html',
        name: '蚂蚁-运营后台',
        child: {
            // fici: 'FICI监控视图',
            rankingMonitoringofFinancialInstitutions: '蚂蚁财富号金融机构排名监控',
            selfOperationLiveBroadcast: '自运营直播',
            selfOperationDiscussionArea: '自运营讨论区',
            selfOperationFortuneAccountNumber: '自运营财富号',
            selfOperationScenarioPage: '自运营场景页',
            selfOperationMarketDetails: '自运营阵地整体大盘明细'
        }
    },
    // 腾讯-数据看板
    tencentDataPanel: {
        index: 'tencentDataPanel.html',
        name: '腾讯-数据看板',
        child: {
            coreData: '核心数据看板',
            customerMonitor: '客户监测看板',
            keyProductsMonitor: '重点产品监测看板',
            holdingDashboard: '保有量明细仪表板',
            volumeDashboard: '交易量明细仪表板',
            customerNumDashboard: '客户数明细仪表板',
        }
    },

    dailyDataPanel: {
        index: 'dailyDataPanel.html',
        name: '天天-数据看板',
        child: {
            coreData: '核心数据看板',
            customerMonitor: '客户监测看板',
            keyProductsMonitor: '重点产品监测看板',
            holdingDashboard: '保有量明细仪表板',
            volumeDashboard: '交易量明细仪表板',
            customerNumDashboard: '客户数明细仪表板',
        }
    },
    dailyOperation: {
        index: 'dailyOperation.html',
        name: '天天-运营后台',
        child: {
            basicInformation: '财富号基本情况',
            thematicSituation: '财富号专题情况',
        }
    }
};