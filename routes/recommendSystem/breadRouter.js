module.exports = {
    index: {
        name: '推荐系统'
    },
    recommendSystemConfigMgmt: {
        name: '推荐系统配置管理',
        child: {
            layoutConfigMgmt: '布局配置管理',
            groupRelationTypeConfig: '分组关系类型配置',
            informationTypeConfig: '资讯类型配置',
            positionTheGroupConfig: '位置分组配置',
            positionTheThemeMgmt: '位置主题管理',
            customTimingTaskMgmt: '自定义定时任务管理'
        }
    },
    recommendSystemTemplateConfig: {
        name: '推荐系统模板配置',
        child: {
            fundRecommendContentConfig: '基金模板配置',
            combineContentConfig: '组合模板配置',
            productTemplateConfig: '产品模板配置',
            fundManagerContentConfig: '基金经理模板配置',
            AppBaseConfig: '自定义功能按钮配置',    // (原App基础功能配置)
            loadPageConfigMgmt: '开屏广告模板配置',
            imgAdContentConfig: '图片模板配置',
            popUpsConfig: '弹窗模板配置',
            informTemplateConfig: '通知模板配置',
            messageTemplateConfig: '留言模板配置',
            informationContentConfig: '资讯模板配置',
            labelTemplateConfig: '标签模板配置',
            thermalIndexConfig: '热力指数模板配置',
            sceneDataConfig: '场景数据模板配置',
            privilegeConfig: '特权模板配置',
            wxActivityConfig: '活动内容配置',
            wxBaseConfig: '微信基础功能配置',
            wxImgAdConfig: '微信图片广告内容配置',
            wxFundRecommend: '微信基金推荐内容配置',
            wxProductTemplateConfig: '微信产品模板配置',
            wapInformationTemplateConfig: 'WAP资讯模板配置',
            appletImgRecommend: '小程序图片推荐配置',
            appletProductRecommend: '小程序产品推荐配置',
            questionnaireSurvey: '问卷调查模板配置',
            // homePgButtonConfig: '首页功能按钮配置', /（已废弃，但不删除页面和功能）
            // couponConfig: '礼券配置',
            blackBoardConfig: '小黑板配置'
        }
    },
    recommendViewMgmt: {
        name: '推荐系统视图管理',
        child: {
            channelMgmt: '渠道配置管理',
            contentElementMgmt: '内容元素配置',
            contentTypeMgmt: '内容类型配置',
            viewMgmt: '视图配置',
            platformPageMgmt:'平台页面管理'
        }
    },
    recommendSystemGroupMgmt: {
        name: '推荐系统客群管理',
        child: {
            groupConfig: '客群配置',
            groupAudit: '客群审核',
            realTimeSourceConfig: '实时客群数据源配置',
            realTimeGroupConfig: '实时客群配置',
            ruleTemplateConfig: '规则模板配置',
            ruleParamsConfig: '规则参数配置'
        }
    }
};
