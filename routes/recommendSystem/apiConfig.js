// 接口总配置
let recommendSystem = '';
let userGroup = '';
let marketingActive = '';
let icif = '';
let ess = '';
let clientMgmt = '';
let caa = '';

if (global.envConfig.RES) {
    recommendSystem = global.envConfig.RES;
} else {
    recommendSystem = global.envConfig.inner_gateway;
}
if (global.envConfig.USERGROUP) {
    userGroup = global.envConfig.USERGROUP;
} else {
    userGroup = global.envConfig.inner_gateway;
}
if (global.envConfig.marketingActive) {
    marketingActive = global.envConfig.marketingActive;
} else {
    marketingActive = global.envConfig.inner_gateway;
}
if (global.envConfig.icif) {
    icif = global.envConfig.icif;
} else {
    icif = global.envConfig.inner_gateway;
}
if (global.envConfig.ESS) {
    ess = global.envConfig.ESS;
} else {
    ess = global.envConfig.inner_gateway;
}
if (global.envConfig.clientMgmt) {
    clientMgmt = global.envConfig.clientMgmt;
} else {
    clientMgmt = global.envConfig.inner_gateway;
}
if (global.envConfig.caa) {
    caa = global.envConfig.caa;
} else {
    caa = global.envConfig.inner_gateway;
}

marketingActive += `/activity-center/admin/v1`;
recommendSystem += '/res/v1';
userGroup += '/user-group/v1';
icif += '/icif/v1';
ess += '/ess/v1';
caa += '/caa/v1';

let ncms = '';
let ncmsV1 = '';
if (global.envConfig.ncms) {
	ncms = global.envConfig.ncms;
	ncmsV1 = global.envConfig.ncms;
} else {
	ncms = global.envConfig.inner_gateway;
	ncmsV1 = global.envConfig.inner_gateway;
}
ncms += '/ncms/admin/v1';  
ncmsV1 += '/ncms/v1';  
module.exports = {
    //推荐系统总配置
    recommendSystem: {
        //推荐系统模板配置
        recommendSystemTemplateConfig: {
            //组合内容配置
            combineContentConfig: {
                queryInfo: `${recommendSystem}/res-fund-group-config/query-list`,
                enable: `${recommendSystem}/res-fund-group-config/enable`,
                deleteInfo: `${recommendSystem}/res-fund-group-config/del`,
                add: `${recommendSystem}/res-fund-group-config/add`,
                update: `${recommendSystem}/res-fund-group-config/update`,
                upload: `${recommendSystem}/res/up-or-download/common-upload-image`,
                fresh: `${recommendSystem}/res-fund-group-config/fresh`,
                viewList: `${recommendSystem}/res-view-model-config/query-list`,
                channelMenu: `${recommendSystem}/res-channel-type-config/query-list`
            },
            //资讯内容配置
            informationContentConfig: {
                queryInfo: `${recommendSystem}/res-advice-info-config/query-list`,
                deleteInfo: `${recommendSystem}/res-advice-info-config/del`,
                add: `${recommendSystem}/res-advice-info-config/add`,
                update: `${recommendSystem}/res-advice-info-config/update`,
                adviceDisplayStyle: `${recommendSystem}/res-advice-info-config/query-advice-display-style`,
                adviceTp: `${recommendSystem}/res-advice-type/query-list`,
                upload: `${recommendSystem}/res/up-or-download/common-upload-image`,
                fresh: `${recommendSystem}/res-advice-info-config/fresh`,
                viewList: `${recommendSystem}/res-view-model-config/query-list`,
                channelMenu: `${recommendSystem}/res-channel-type-config/query-list`
            },
            // 通知模板配置
            informTemplateConfig: {
                queryInfo: `${recommendSystem}/res-notice-config/query-list`,
                deleteInfo: `${recommendSystem}/res-notice-config/del`,
                add: `${recommendSystem}/res-notice-config/add`,
                update: `${recommendSystem}/res-notice-config/update`,
                upload: `${recommendSystem}/res/up-or-download/common-upload-image`,
                fresh: `${recommendSystem}/res-notice-config/fresh`,
                viewList: `${recommendSystem}/res-view-model-config/query-list`,
                channelMenu: `${recommendSystem}/res-channel-type-config/query-list`
            },
            //开屏页配置管理
            loadPageConfigMgmt: {
                queryInfo: `${recommendSystem}/res-loadpage-config/query-list`,
                enable: `${recommendSystem}/res-loadpage-config/enable`,
                deleteInfo: `${recommendSystem}/res-loadpage-config/del`,
                add: `${recommendSystem}/res-loadpage-config/add`,
                update: `${recommendSystem}/res-loadpage-config/update`,
                upload: `${recommendSystem}/res/up-or-download/common-upload-image`,
                fresh: `${recommendSystem}/res-loadpage-config/fresh`,
                viewList: `${recommendSystem}/res-view-model-config/query-list`,
                channelMenu: `${recommendSystem}/res-channel-type-config/query-list`
            },
            //自定义功能按钮配置(原App基础功能配置)
            AppBaseConfig: {
                queryInfo: `${recommendSystem}/res-appfuncbtn-info/query-list`,
                enable: `${recommendSystem}/res-appfuncbtn-info/enable`,
                deleteInfo: `${recommendSystem}/res-appfuncbtn-info/del`,
                add: `${recommendSystem}/res-appfuncbtn-info/add`,
                update: `${recommendSystem}/res-appfuncbtn-info/update`,
                recommendTp: `${recommendSystem}/res-appfuncbtn-info/query-recommendTp`,
                upload: `${recommendSystem}/res/up-or-download/common-upload-image`,
                fresh: `${recommendSystem}/res-appfuncbtn-info/fresh`,
                viewList: `${recommendSystem}/res-view-model-config/query-list`,
                channelMenu: `${recommendSystem}/res-channel-type-config/query-list`
            },
            //首页功能按钮配置
            homePgButtonConfig: {
                queryInfo: `${recommendSystem}/res-pagefuncbtn-config/query-list`,
                deleteInfo: `${recommendSystem}/res-pagefuncbtn-config/del`,
                add: `${recommendSystem}/res-pagefuncbtn-config/add`,
                update: `${recommendSystem}/res-pagefuncbtn-config/update`,
                recommendTp: `${recommendSystem}/res-appfuncbtn-info/query-recommendTp`,
                upload: `${recommendSystem}/res/up-or-download/common-upload-image`,
                fresh: `${recommendSystem}/res-pagefuncbtn-config/fresh`,
                viewList: `${recommendSystem}/res-view-model-config/query-list`,
                channelMenu: `${recommendSystem}/res-channel-type-config/query-list`
            },
            //基金经理
            fundManagerContentConfig: {
                queryInfo: `${recommendSystem}/res-fund-manager-config/query-list`,
                enable: `${recommendSystem}/res-fund-manager-config/enable`,
                deleteInfo: `${recommendSystem}/res-fund-manager-config/del`,
                add: `${recommendSystem}/res-fund-manager-config/add`,
                update: `${recommendSystem}/res-fund-manager-config/update`,
                upload: `${recommendSystem}/res/up-or-download/common-upload-image`,
                fresh: `${recommendSystem}/res-fund-manager-config/fresh`,
                viewList: `${recommendSystem}/res-view-model-config/query-list`,
                channelMenu: `${recommendSystem}/res-channel-type-config/query-list`
            },
            //基金推荐内容配置
            fundRecommendContentConfig: {
                queryInfo: `${recommendSystem}/res-fund-recommend-config/query-list`,
                deleteInfo: `${recommendSystem}/res-fund-recommend-config/del`,
                add: `${recommendSystem}/res-fund-recommend-config/add`,
                update: `${recommendSystem}/res-fund-recommend-config/update`,
                upload: `${recommendSystem}/res/up-or-download/common-upload-image`,
                fresh: `${recommendSystem}/res-fund-recommend-config/fresh`,
                viewList: `${recommendSystem}/res-view-model-config/query-list`,
                channelMenu: `${recommendSystem}/res-channel-type-config/query-list`
            },
            //图片广告配置
            imgAdContentConfig: {
                queryInfo: `${recommendSystem}/res-adv-Image/query-list`,
                deleteInfo: `${recommendSystem}/res-adv-Image/del`,
                add: `${recommendSystem}/res-adv-Image/add`,
                update: `${recommendSystem}/res-adv-Image/update`,
                upload: `${recommendSystem}/res/up-or-download/common-upload-image`,
                fresh: `${recommendSystem}/res-adv-Image/fresh`,
                viewList: `${recommendSystem}/res-view-model-config/query-list`,
                channelMenu: `${recommendSystem}/res-channel-type-config/query-list`
            },
            //微信活动内容配置
            wxActivityConfig: {
                queryInfo: `${recommendSystem}/res-weixin-activity-config/query-list`,
                deleteInfo: `${recommendSystem}/res-weixin-activity-config/del`,
                add: `${recommendSystem}/res-weixin-activity-config/add`,
                update: `${recommendSystem}/res-weixin-activity-config/update`,
                upload: `${recommendSystem}/res/up-or-download/common-upload-image`,
                fresh: `${recommendSystem}/res-weixin-activity-config/fresh`,
                viewList: `${recommendSystem}/res-view-model-config/query-list`,
                channelMenu: `${recommendSystem}/res-channel-type-config/query-list`
            },
            //小程序图片配置接口
            appletImgRecommend: {
                queryInfo: `${recommendSystem}/res-webanner-config/query-list`,
                deleteInfo: `${recommendSystem}/res-webanner-config/del`,
                add: `${recommendSystem}/res-webanner-config/add`,
                update: `${recommendSystem}/res-webanner-config/update`,
                upload: `${recommendSystem}/res/up-or-download/common-upload-image`,
                fresh: `${recommendSystem}/res-webanner-config/fresh`,
                viewList: `${recommendSystem}/res-view-model-config/query-list`,
                channelMenu: `${recommendSystem}/res-channel-type-config/query-list`
            },
            //小程序产品推荐配置
            appletProductRecommend: {
                queryInfo: `${recommendSystem}/res-product-config/query-list`,
                deleteInfo: `${recommendSystem}/res-product-config/del`,
                add: `${recommendSystem}/res-product-config/add`,
                update: `${recommendSystem}/res-product-config/update`,
                upload: `${recommendSystem}/res/up-or-download/common-upload-image`,
                fresh: `${recommendSystem}/res-product-config/fresh`,
                viewList: `${recommendSystem}/res-view-model-config/query-list`,
                channelMenu: `${recommendSystem}/res-channel-type-config/query-list`
            },
            //微信基础功能
            wxBaseConfig: {
                queryInfo: `${recommendSystem}/res-wx-funcbtn-info/query-list`,
                enable: `${recommendSystem}/res-wx-funcbtn-info/enable`,
                deleteInfo: `${recommendSystem}/res-wx-funcbtn-info/del`,
                add: `${recommendSystem}/res-wx-funcbtn-info/add`,
                update: `${recommendSystem}/res-wx-funcbtn-info/update`,
                recommendTp: `${recommendSystem}/res-appfuncbtn-info/query-recommendTp`,
                upload: `${recommendSystem}/res/up-or-download/common-upload-image`,
                fresh: `${recommendSystem}/res-wx-funcbtn-info/fresh`,
                viewList: `${recommendSystem}/res-view-model-config/query-list`,
                channelMenu: `${recommendSystem}/res-channel-type-config/query-list`
            },
            //微信图片广告内容配置
            wxImgAdConfig: {
                queryInfo: `${recommendSystem}/res-wx-adv-image/query-list`,
                deleteInfo: `${recommendSystem}/res-wx-adv-image/del`,
                add: `${recommendSystem}/res-wx-adv-image/add`,
                update: `${recommendSystem}/res-wx-adv-image/update`,
                upload: `${recommendSystem}/res/up-or-download/common-upload-image`,
                fresh: `${recommendSystem}/res-wx-adv-image/fresh`,
                viewList: `${recommendSystem}/res-view-model-config/query-list`,
                channelMenu: `${recommendSystem}/res-channel-type-config/query-list`
            },
            //微信基金推荐内容配置
            wxFundRecommend: {
                queryInfo: `${recommendSystem}/res-wx-fund-config/query-list`,
                deleteInfo: `${recommendSystem}/res-wx-fund-config/del`,
                add: `${recommendSystem}/res-wx-fund-config/add`,
                update: `${recommendSystem}/res-wx-fund-config/update`,
                upload: `${recommendSystem}/res/up-or-download/common-upload-image`,
                fresh: `${recommendSystem}/res-wx-fund-config/fresh`,
                viewList: `${recommendSystem}/res-view-model-config/query-list`,
                channelMenu: `${recommendSystem}/res-channel-type-config/query-list`
            },
            //场景数据配置
            sceneDataConfig: {
                queryInfo: `${recommendSystem}/res-theme-data-scene-config/query-list`,
                enable: `${recommendSystem}/res-theme-data-scene-config/enable`,
                deleteInfo: `${recommendSystem}/res-theme-data-scene-config/del`,
                add: `${recommendSystem}/res-theme-data-scene-config/add`,
                update: `${recommendSystem}/res-theme-data-scene-config/update`,
                upload: `${recommendSystem}/res/up-or-download/common-upload-file`,
                downloadFile: `${recommendSystem}/res/up-or-download/download-file`
            },
            //产品配置管理
            productTemplateConfig: {
                queryInfo: `${recommendSystem}/res-template-products/query-list`,
                deleteInfo: `${recommendSystem}/res-template-products/del`,
                add: `${recommendSystem}/res-template-products/add`,
                update: `${recommendSystem}/res-template-products/update`,
                upload: `${recommendSystem}/res/up-or-download/common-upload-image`,
                fresh: `${recommendSystem}/res-template-products/fresh`,
                viewList: `${recommendSystem}/res-view-model-config/query-list`,
                channelMenu: `${recommendSystem}/res-channel-type-config/query-list`,
                imageUrlList: `${recommendSystem}/res-template-products/query-profit-graph-image-url`,
                queryFundIdList:`${ess}/fund/fund-list`
            },
            //热力指数配置
            thermalIndexConfig: {
                queryInfo: `${recommendSystem}/res-template-market-index/query-list`,
                deleteInfo: `${recommendSystem}/res-template-market-index/del`,
                add: `${recommendSystem}/res-template-market-index/add`,
                update: `${recommendSystem}/res-template-market-index/update`,
                upload: `${recommendSystem}/res/up-or-download/common-upload-image`,
                fresh: `${recommendSystem}/res-template-market-index/fresh`,
                viewList: `${recommendSystem}/res-view-model-config/query-list`,
                channelMenu: `${recommendSystem}/res-channel-type-config/query-list`
            },
            //标签配置
            labelTemplateConfig: {
                queryInfo: `${recommendSystem}/res-template-tags-config/query-list`,
                deleteInfo: `${recommendSystem}/res-template-tags-config/del`,
                enable: `${recommendSystem}/res-template-tags-config/enable`,
                add: `${recommendSystem}/res-template-tags-config/add`,
                update: `${recommendSystem}/res-template-tags-config/update`,
                childContentTp: `${recommendSystem}/res-content-type-config/query-list`,
                childContentIds: `${recommendSystem}/res-template-tags-config/query-childContentIds`,
                upload: `${recommendSystem}/res/up-or-download/common-upload-image`,
                fresh: `${recommendSystem}/res-template-tags-config/fresh`,
                viewList: `${recommendSystem}/res-view-model-config/query-list`,
                channelMenu: `${recommendSystem}/res-channel-type-config/query-list`,
                getInfoId: `${recommendSystem}/res-view-model-config/query-list`,
            },
            //微信产品模板配置
            wxProductTemplateConfig: {
                queryInfo: `${recommendSystem}/res-wx-product/query-list`,
                deleteInfo: `${recommendSystem}/res-wx-product/del`,
                add: `${recommendSystem}/res-wx-product/add`,
                update: `${recommendSystem}/res-wx-product/update`,
                upload: `${recommendSystem}/res/up-or-download/common-upload-image`,
                fresh: `${recommendSystem}/res-wx-product/fresh`,
                viewList: `${recommendSystem}/res-view-model-config/query-list`,
                channelMenu: `${recommendSystem}/res-channel-type-config/query-list`
            },
            //WAP资讯模板配置
            wapInformationTemplateConfig: {
                queryInfo: `${recommendSystem}/res-wap-adviceinfo/query-list`,
                deleteInfo: `${recommendSystem}/res-wap-adviceinfo/del`,
                add: `${recommendSystem}/res-wap-adviceinfo/add`,
                update: `${recommendSystem}/res-wap-adviceinfo/update`,
                adviceDisplayStyle: `${recommendSystem}/res-advice-info-config/query-advice-display-style`,
                adviceTp: `${recommendSystem}/res-advice-type/query-list`,
                upload: `${recommendSystem}/res/up-or-download/common-upload-image`,
                fresh: `${recommendSystem}/res-wap-adviceinfo/fresh`,
                viewList: `${recommendSystem}/res-view-model-config/query-list`,
                channelMenu: `${recommendSystem}/res-channel-type-config/query-list`
            },
            //礼券配置
            couponConfig: {
                queryInfo: `${recommendSystem}/res-coupon-config/query-list`,
                deleteInfo: `${recommendSystem}/res-coupon-config/del`,
                add: `${recommendSystem}/res-coupon-config/add`,
                update: `${recommendSystem}/res-coupon-config/update`
            },
            //留言模板配置
            messageTemplateConfig: {
                queryInfo: `${recommendSystem}/res-template-leavemsg/query-list`,
                deleteInfo: `${recommendSystem}/res-template-leavemsg/del`,
                add: `${recommendSystem}/res-template-leavemsg/add`,
                update: `${recommendSystem}/res-template-leavemsg/update`,
                fresh: `${recommendSystem}/res-template-leavemsg/fresh`,
                viewList: `${recommendSystem}/res-view-model-config/query-list`,
                channelMenu: `${recommendSystem}/res-channel-type-config/query-list`
            },
            // 弹窗模板配置
            popUpsConfig: {
                queryInfo: `${recommendSystem}/res-template-popup/query-list`,
                deleteInfo: `${recommendSystem}/res-template-popup/delete`,
                add: `${recommendSystem}/res-template-popup/add`,
                update: `${recommendSystem}/res-template-popup/update`,
                fresh: `${recommendSystem}/res-template-popup/fresh`,
                viewList: `${recommendSystem}/res-view-model-config/query-list`,
                channelMenu: `${recommendSystem}/res-channel-type-config/query-list`,
                upload: `${recommendSystem}/res/up-or-download/common-upload-image`
            },
            // 特权模板配置
            privilegeConfig: {
                queryInfo: `${recommendSystem}/res-template-privilege/query-list`,
                deleteInfo: `${recommendSystem}/res-template-privilege/delete-privilege`,
                add: `${recommendSystem}/res-template-privilege/add-privilege`,
                update: `${recommendSystem}/res-template-privilege/update-privilege`,
                fresh: `${recommendSystem}/res-template-privilege/fresh`,
                viewList: `${recommendSystem}/res-view-model-config/query-list`,
                channelMenu: `${recommendSystem}/res-channel-type-config/query-list`,
                privilegeList: `${clientMgmt}/reward/v1/privilege/getPrivilegeList`,
                sourceList: `${clientMgmt}/reward/v1/privilege/getPrivilegeSourceList`,
            },
             // 问卷调查配置
             questionnaireSurvey: {
                queryInfo: `${recommendSystem}/res-template-survey/query-list`,
                deleteInfo: `${recommendSystem}/res-template-survey/delete-template-survey`,
                add: `${recommendSystem}/res-template-survey/insert-template-survey`,
                update: `${recommendSystem}/res-template-survey/update-template-survey`,
                fresh: `${recommendSystem}/res-template-survey/fresh`,
                viewList: `${recommendSystem}/res-view-model-config/query-list`,
                channelMenu: `${recommendSystem}/res-channel-type-config/query-list`,
                queryIdList: `${caa}/survey/config/survey/list`
            },
            // 小黑板配置
            blackBoardConfig: {
                queryInfo: `${recommendSystem}/res-composite-config/query-list`,
                deleteInfo: `${recommendSystem}/res-composite-config/delete`,
                add: `${recommendSystem}/res-composite-config/add`,
                update: `${recommendSystem}/res-composite-config/update`,
                fresh: `${recommendSystem}/res-composite-config/fresh`,
                viewList: `${recommendSystem}/res-view-model-config/query-list`,
                channelMenu: `${recommendSystem}/res-channel-type-config/query-list`,
                upload: `${recommendSystem}/res/up-or-download/common-upload-image`
            },
        },
        //推荐系统配置管理s
        recommendSystemConfigMgmt: {
            //布局配置管理
            layoutConfigMgmt: {
                queryInfo: `${recommendSystem}/res-app-layout-config/query-list`,
                deleteInfo: `${recommendSystem}/res-app-layout-config/del`,
                enable: `${recommendSystem}/res-app-layout-config/enable`,
                add: `${recommendSystem}/res-app-layout-config/add`,
                update: `${recommendSystem}/res-app-layout-config/update`,
                templateQueryInfo: `${recommendSystem}/res-app-layout-template-config/query-list`,
                templateDeleteInfo: `${recommendSystem}/res-app-layout-template-config/del`,
                templateEnable: `${recommendSystem}/res-app-layout-template-config/enable`,
                templateAdd: `${recommendSystem}/res-app-layout-template-config/add`,
                templateUpdate: `${recommendSystem}/res-app-layout-template-config/update`,
                fresh: `${recommendSystem}/res-app-layout-config/fresh`,
                morenFresh: `${recommendSystem}/res-app-layout-config/fresh-disaster-default`,
                channelMenu: `${recommendSystem}/res-channel-type-config/query-list`,
                templateIdList: `${recommendSystem}/res-view-model-config/query-list`
            },
            //分类关系接口
            groupRelationTypeConfig: {
                queryInfo: `${recommendSystem}/res-object-tp-config/query-list`,
                deleteInfo: `${recommendSystem}/res-object-tp-config/del`,
                add: `${recommendSystem}/res-object-tp-config/add`,
                update: `${recommendSystem}/res-object-tp-config/update`
            },
            //资讯类型接口
            informationTypeConfig: {
                queryInfo: `${recommendSystem}/res-advice-type/query-list`,
                deleteInfo: `${recommendSystem}/res-advice-type/del`,
                add: `${recommendSystem}/res-advice-type/add`,
                update: `${recommendSystem}/res-advice-type/update`
            },
            //位置主题管理
            positionTheThemeMgmt:{
				channelMenu: `${recommendSystem}/res-channel-type-config/query-list`,
                queryMenuList:`${recommendSystem}/res-app-layout-config/query-menu-list`,
                querySubmenuId:`${recommendSystem}/res-app-layout-template-config/query-submenu-id`,
                contentTp:`${recommendSystem}/res-content-type-config/query-list`,
                themeInfos:`${recommendSystem}/app-func-layout/theme-infos/infos`,
                enable:`${recommendSystem}/res-theme-info-config/enable`,
                addThemeInfos:`${recommendSystem}/res-theme-info-config/addThemeInfos`,
                updateThemeInfos:`${recommendSystem}/res-theme-info-config/updateThemeInfos`,
                deleteInfo:`${recommendSystem}/res-theme-info-config/del`,
                copyInfo: `${recommendSystem}/res-theme-info-config/copy-theme-infos`,
                upload:`${recommendSystem}/res/up-or-download/common-upload-image`,
                checkThemeContent:`${recommendSystem}/app-func-layout/theme-infos/list`,
                linkDataInfo:`${recommendSystem}/`,
                scenekeyList:`${recommendSystem}/res-theme-data-scene-config/query-list`,
                fresh1:`${recommendSystem}/res-theme-object-config/fresh`,
                fresh2:`${recommendSystem}/res-theme-info-config/fresh`,
                fresh3:`${recommendSystem}/res-app-layout-template-config/fresh`,
            //  二级新增修改删除
                addSecond:`${recommendSystem}/res-theme-object-config/add`,
                updateSecond:`${recommendSystem}/res-theme-object-config/update`,
                deleteSecond:`${recommendSystem}/res-theme-object-config/del`,
            //  tab主题分组管理接口
                queryDetail:`${recommendSystem}/res-group-object-config/query-list`,
                userGroupList:`${userGroup}/etrade-user-group/get-list`,
                updateFrom:`${recommendSystem}/res-group-object-config/addinfo`,
                //excel文件导入
                importExcel:`${recommendSystem}/res-theme-object-config/saveThemeImport`,
                uploadExcel:`${recommendSystem}/res/up-or-download/common-upload-file`,
                delImage:`${recommendSystem}/res/up-or-download/common-del-file`,
				// 外部媒体选择
				getExistingMaterials:`${ncms}/ncms/pitching-stategy/query-pitcing-stategy`,
				classifyList:`${ncms}/ncms/category-config/query-first-second-category`, 
				threeClassifyList: `${ncms}/ncms/category-config/query-list-by-id`,
				// 外部素材接口调用更改素材状态
				modifyReleasedStatus:`${ncmsV1}/api/media-operate/modify-released-status`
            },
            //位置分配管理
            positionTheGroupConfig:{
								channelMenu: `${recommendSystem}/res-channel-type-config/query-list`,
                queryMenuList:`${recommendSystem}/res-app-layout-config/query-menu-list`,
                querySubmenuId:`${recommendSystem}/res-app-layout-template-config/query-submenu-id`,
                themeInfos:`${recommendSystem}/app-func-layout/theme-infos/infos`,
                queryDetail:`${recommendSystem}/res-group-object-config/query-list`,
                userGroupList:`${userGroup}/etrade-user-group/get-list`,
                updateFrom:`${recommendSystem}/res-group-object-config/addinfo`
            },
            // 从模板配置页面跳转至位置主题管理的接口合集
            positionTheThemeMgmtModify:{
                themeInfoForContentTp:`${recommendSystem}/res-theme-info-config/query-ThemeInfo-By-contentTp`,
                queryThemeInfoDisplay:`${recommendSystem}/res-theme-info-config/query-ThemeInfo-Display`,
                checkThemeContent:`${recommendSystem}/app-func-layout/theme-infos/list`,
                saveParams:`${recommendSystem}/res-theme-object-config/batch-modify-them-object-config`,
                deleteParams:`${recommendSystem}/res-theme-object-config/batch-delete-them-object-config`
            },
            // 自定义定时任务管理
            customTimingTaskMgmt:{
                queryInfo:`${recommendSystem}/res-custom-xxljob-manage/query-custom-xxljob-manage`,
                add:`${recommendSystem}/res-custom-xxljob-manage/add-custom-xxljob-manage`,
                update:`${recommendSystem}/res-custom-xxljob-manage/update-custom-xxljob-manage`,
                delete:`${recommendSystem}/res-custom-xxljob-manage/delete-custom-xxljob-manage`,
                queryHandler:`${recommendSystem}/res-custom-xxljob-manage/query-custom-xxljob-handler`
            }
        },
        //推荐系统分组管理
        recommendSystemGroupMgmt: {
            groupConfig: {
                search: `${userGroup}/etrade-user-group/get-list`,
                verifyCustNo: `${icif}/custs/cust-id`,
                add: `${userGroup}/etrade-user-group/add`,
                update: `${userGroup}/etrade-user-group/update`,
                del: `${userGroup}/etrade-user-group/del`,
                fresh: `${userGroup}/etrade-user-group/fresh`,
                addCustNo: `${userGroup}/user/add-users-in-group`,
                findCustNo: `${userGroup}/user/user-exist-in-group`,
                uploadExcel: `${userGroup}/user/batch-add-users-in-group`,
                delCustNo: `${userGroup}/user/del-users-in-group`,
            },
            groupAudit: {
                search: `${userGroup}/etrade-user-group/get-list`,
                update: `${userGroup}/etrade-user-group/update`,
                release: `${userGroup}/etrade-user-group/release`
            },
            realTimeSourceConfig: {
                search: `${userGroup}/realtime-group-data-source-config/query-list`,
                del: `${userGroup}/realtime-group-data-source-config/del`,
                add: `${userGroup}/realtime-group-data-source-config/add`,
                update: `${userGroup}/realtime-group-data-source-config/update`,
                fresh: `${userGroup}/realtime-group-data-source-config/fresh`,
                groupIdList: `${userGroup}/etrade-user-group/get-list`
            },
            realTimeGroupConfig: {
                search: `${userGroup}/realtime-group-rule-config/query-list`,
                groupIdList: `${userGroup}/etrade-user-group/get-list`,
                ruleTemplateIdList: `${userGroup}/rule-template-config/query-list`,
                del: `${userGroup}/realtime-group-rule-config/del`,
                add: `${userGroup}/realtime-group-rule-config/add`,
                update: `${userGroup}/realtime-group-rule-config/update`,
                placeholdersQuery: `${userGroup}/rule-template-param/query-list`,
                queryTemplateId: `${userGroup}/rule-template-config/query-by-id`,
            },
            ruleTemplateConfig: {
                search: `${userGroup}/rule-template-config/query-list`,
                del: `${userGroup}/rule-template-config/del`,
                add: `${userGroup}/rule-template-config/add`,
                update: `${userGroup}/rule-template-config/update`,
                placeholdersQuery: `${userGroup}/rule-template-param/query-list`
            },
            ruleParamsConfig: {
                search: `${userGroup}/rule-template-param/query-list`,
                del: `${userGroup}/rule-template-param/del`,
                add: `${userGroup}/rule-template-param/add`,
                update: `${userGroup}/rule-template-param/update`,
            }
        },
        //推荐系统视图管理
        recommendViewMgmt: {
            //渠道管理
            channelMgmt: {
                queryInfo: `${recommendSystem}/res-channel-type-config/query-list`,
                deleteInfo: `${recommendSystem}/res-channel-type-config/del`,
                add: `${recommendSystem}/res-channel-type-config/add`,
                update: `${recommendSystem}/res-channel-type-config/update`,
                channelMenu: `${recommendSystem}/res-channel-type-config/query-list`
            },
            // 内容类型管理
            contentTypeMgmt: {
                queryInfo: `${recommendSystem}/res-content-type-config/query-list`,
                deleteInfo: `${recommendSystem}/res-content-type-config/del`,
                add: `${recommendSystem}/res-content-type-config/add`,
                update: `${recommendSystem}/res-content-type-config/update`
            },
            // 内容元素配置
            contentElementMgmt: {
                queryInfo: `${recommendSystem}/res-content-element-config/query-list`,
                deleteInfo: `${recommendSystem}/res-content-element-config/del`,
                add: `${recommendSystem}/res-content-element-config/add`,
                update: `${recommendSystem}/res-content-element-config/update`,
                contentTp:`${recommendSystem}/res-content-type-config/query-list`
            },
            // 视图配置
            viewMgmt: {
                queryInfo: `${recommendSystem}/res-view-model-config/query-list`,
                deleteInfo: `${recommendSystem}/res-view-model-config/del`,
                add: `${recommendSystem}/res-view-model-config/add`,
                update: `${recommendSystem}/res-view-model-config/update`,
                contentTp:`${recommendSystem}/res-content-type-config/query-list`,
                channelMenu: `${recommendSystem}/res-channel-type-config/query-list`,
                elementList: `${recommendSystem}/res-content-element-config/query-list`,
                upload: `${recommendSystem}/res/up-or-download/common-upload-image`
            },
            //平台页面管理
            platformPageMgmt:{
                queryFullData: `${recommendSystem}/res-plaform-pages-management/query-by-type`,
                channelMenu: `${recommendSystem}/res-channel-type-config/query-list`,
                queryDetail:`${recommendSystem}/res-plaform-pages-management/query-list`,
                add:`${recommendSystem}/res-plaform-pages-management/add`,
                update:`${recommendSystem}/res-plaform-pages-management/update`,
                delSingle:`${recommendSystem}/res-plaform-pages-management/del`,
                delGroup:`${recommendSystem}/res-plaform-pages-management/del-group`
            }
        },
    }
};