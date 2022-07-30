module.exports = {
    index: {
        name: '营销活动'
    },
    activeBasics: {
        index: 'marketingRule.html',
        name: '活动基础管理',
        child: {
            marketingRule: '活动基础规则配置',
            wordFieldNotes: '活动表字段释义配置'
        }
    },
    largeData: {
        index: 'largeDataFile.html',
        name: '大数据对接管理',
        child: {
            largeDataFile: '大数据对接文件配置',
        }
    },
    activeTemplateMgmt: {
        index: 'activeTemplateMgmt.html',
        name: '活动模型管理',
        child: {
            activeTemplate: '活动模型配置',
            activeTemplateupload: '模型文件上传',
            activeTemplateDeploy: '模型配置',
            activeCut: '活动切点配置',
            activeComponent: '活动组件配置',
            activeComponentRule: '组件规则配置',
            templatePort: '模型接口配置',
        }
    },
    activeRun: {
        index: 'activePlace.html',
        name: '活动运营配置管理',
        child: {
            activeRoad: '活动投放渠道配置',
            activeSetting: '活动配置',
            activeRuleSetting: '活动规则配置',
            activeSettingAdd: '新增活动规则配置',
            activeSettingTemplatePage: '模板页面上传',
            awardBase: '基础奖励配置表',
            activeAward: '活动奖励包配置表',
            shareSetting: '分享配置',
            asyncWorkSetting: '活动异步任务管理配置',
            asyncNodeSetting: '异步节点-任务管理配置',
            qrCodeGenerate: '生成二维码小工具',
            activeTag: '活动标签配置',
            activeTagRelation: '活动标签关系管理',
        }
    },
    activeDataQuery: {
        index: 'activeDataQuery.html',
        name: '营销活动数据查询',
        child: {
            activeJoinQuery: '活动参与数据查询',
            activeAwardQuery: '活动奖励数据查询',
            inviteLog: '活动邀请记录数据查询',
            inviteCode: '活动邀请码数据查询',
            userJoin: '活动用户参与机会数据查询',
            prizeDetailLog: '用户发奖明细记录查询',
            joinDetail: '用户活动参与明细查询',
            userInfoSearch: '用户信息采集查询',
            followRecord: '活动关注记录查询',
            followCount: '活动关注统计查询',
            activeHelp: '活动助力查询',

        }
    },
    taskManage: {
        index: 'taskManage.html',
        name: '任务管理',
        child: {
            taskClassify: '任务分类管理',
            manage: '任务管理',
            taskRule: '任务规则管理',
            userTaskLog: '用户任务记录',
            userTaskProgress: '用户任务进度记录',
            taskRuleTemplate: '任务-规则模型配置',
            rulePlaceholders: '规则占位符的释义配置',
            taskMessage: '任务与异步消息匹配表',
            sceneTaskRelation: '场景任务关联配置'
        }
    },
    shareMgmt: {
        index: 'shareMgmt.html',
        name: '分享管理',
        child: {
            scene: '分享场景管理',
            sceneTemplate: '场景模板管理',

        }
    },
    keywordQuery: {
        index: 'keywordQuery.html',
        name: '关键词查询',
        child: {
            template: '模板关键词查询'
        }
    },
};