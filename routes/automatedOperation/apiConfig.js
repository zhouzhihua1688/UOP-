// 接口总配置
let automatedOperation = '';
let recommendSystem = '';
let userGroup = '';
let icif = '';

if (global.envConfig.AOS) {
    automatedOperation = global.envConfig.AOS;
} else {
    automatedOperation = global.envConfig.inner_gateway;
}
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
if (global.envConfig.ICIF) {
    icif = global.envConfig.ICIF;
} else {
    icif = global.envConfig.inner_gateway;
}

automatedOperation += '/aos/v1';
recommendSystem += '/res/v1';
userGroup += '/user-group/v1';
icif += '/icif/v1'
//营销活动接口总配置
let awardMgmt = global.envConfig.awardMgmt ? global.envConfig.awardMgmt : global.envConfig.inner_gateway;
awardMgmt += '/activity-center/admin/v1';
//消息中心
let messageCenter = global.envConfig.messageCenter ? global.envConfig.messageCenter : global.envConfig.inner_gateway;
messageCenter += '/message-center/v1';

module.exports = {
    //自动化运营总配置
    automatedOperation: {
        //模型管理
        modelMgmt: {
            //模型配置管理
            modelConfigMgmt: {
                queryInfo: `${automatedOperation}/model/query-by-page`,
                releaseStatus: `${automatedOperation}/model/update-modle-releaseStatus`,
                add: `${automatedOperation}/model/add-model-config`,
                update: `${automatedOperation}/model/update-model-config`,
                //模型子块
                queryModelBlock: `${automatedOperation}/model-block/query-by-page`,
                addModelBlock: `${automatedOperation}/model-block/add-model-block-config`,
                updateModelBlock: `${automatedOperation}/model-block/update-model-block-config`,
                isEnable: `${automatedOperation}/model-block/update-model-block-enable`,
                // 触发节点类型
                queryNodeType: `${automatedOperation}/trigger-node-type/query-by-page`,
                // 触发节点配置
                queryNodeConfig: `${automatedOperation}/trigger-node/query-by-page`,
                //推荐系统接口
                queryRecommend: `${automatedOperation}/res/query-by-page`,
                //消息中心接口
                queryMessageCenter:`${messageCenter}/messageRule/rule/ruleSource/get`,
                //奖励系统接口
                queryAwardMgmt:`${awardMgmt}/mcp-rewards-config/query-rewards-config`,
                //模型发布功能
                releaseModel: `${automatedOperation}/model/release-model`,
                //模型下线
                offlineModel: `${automatedOperation}/model/offline-model`,
                //刷新模型子块
                refreshBlockModel:`${automatedOperation}/model-block/rel-block-info`,
                //刷新当前
                refreshCurrent:`${automatedOperation}/model/refresh-model`,
                //目标用户组列表
                userGroup:`${userGroup}/etrade-user-group/qry-user-group`
            }
        },
        //触发节点管理
        triggerNodeMgmt: {
            //触发节点类型配置
            triggerNodeTypeConfig: {
                queryInfo: `${automatedOperation}/trigger-node-type/query-by-page`,
                add: `${automatedOperation}/trigger-node-type/add-node-type-config`,
                update: `${automatedOperation}/trigger-node-type/update-node-type-config`
            },
            //触发节点配置
            triggerNodeConfig:{
                queryInfo: `${automatedOperation}/trigger-node/query-by-page`,
                add: `${automatedOperation}/trigger-node/add-trigger-node`,
                update: `${automatedOperation}/trigger-node/update-trigger-node`,
                queryNodeTypeList: `${automatedOperation}/trigger-node-type/query-by-page`,
                //刷新
                refresh:`${automatedOperation}/trigger-node/rel-trigger-node-info`
            },
        },
        //触达内容管理
        reachContentMgmt:{
            //触达方式配置
            reachMannerConfig:{
                queryInfo: `${automatedOperation}/trigger-target-type/query-by-page`,
                add: `${automatedOperation}/trigger-target-type/add-trigger-target-type-config`,
                update: `${automatedOperation}/trigger-target-type/update-trigger-target-type-config`
            },
            //推荐系统配置
            recommendSystemConfig:{
                queryInfo: `${automatedOperation}/res/query-by-page`,
                add: `${automatedOperation}/res/add-res-config`,
                update: `${automatedOperation}/res/update-res-config`,
                // 推荐系统接口
                queryMenuList:`${recommendSystem}/res-app-layout-config/query-menu-list`,
                querySubmenuId:`${recommendSystem}/res-app-layout-template-config/query-submenu-id`,
                themeInfos:`${recommendSystem}/app-func-layout/theme-infos/infos`,
                //主体关联客群
                queryDetail:`${recommendSystem}/res-group-object-config/query-list`,
                linkDataInfo:`${recommendSystem}/`,
                //刷新
                refresh:`${automatedOperation}/res/rel-res-config-info`
            }
        },
        //任务执行查询
        taskTrackerQuery:{
            //节点触发记录查询
            taskTrackerStatusQuery:{
                queryInfo: `${automatedOperation}/model-block-node-exe-record/query-by-model-id`,
                queryInfoBlock: `${automatedOperation}/model-block-node-exe-record/query-by-page`
            },
           //任务执行记录查询
            taskTrackerRecordQuery:{
                queryInfo: `${automatedOperation}/model-block-job-manage/query-by-model-id`,
                queryInfoBlock: `${automatedOperation}/model-block-job-manage/query-by-page`
            }
        },
        // 系统配置
        systemConfig:{
            //事件配置
            eventRelevantConfig:{
                // 事件tab
                queryInfo1: `${automatedOperation}/event/query-by-page`,
                add1: `${automatedOperation}/event/add-event-config`,
                update1: `${automatedOperation}/event/update-event-config`,
                delete1: `${automatedOperation}/event/delete-event-config`,
                queryTemplate: `${automatedOperation}/event/query-exp-config-template`,
                // 业务节点tab
                queryInfo2: `${automatedOperation}/trigger-node/query-by-page`,
                add2: `${automatedOperation}/trigger-node/add-trigger-node`,
                update2: `${automatedOperation}/trigger-node/update-trigger-node`,
                delete2: `${automatedOperation}/trigger-node/delete-trigger-node`,
                // 节点类型tab
                queryInfo3: `${automatedOperation}/trigger-node-type/query-by-page`,
                add3: `${automatedOperation}/trigger-node-type/add-node-type-config`,
                update3: `${automatedOperation}/trigger-node-type/update-node-type-config`,
                dalete3: `${automatedOperation}/trigger-node-type/delete-node-type-config`,
                // 参数类型tab
                queryInfo4: `${automatedOperation}/param/query-by-page`,
                add4: `${automatedOperation}/param/add-param-config`,
                update4: `${automatedOperation}/param/update-param-config`,
                dalete4: `${automatedOperation}/param/delete-param-config`,
                //查询数据类型 
                queryDataTp: `${automatedOperation}/event/query-trigger-data-tp`,
                //查询数据来源 
                queryDataFrom: `${automatedOperation}/event/query-trigger-from`,
            },
            triggerModeConfig:{
                queryInfo: `${automatedOperation}/trigger-target-type/query-by-page`,
                add: `${automatedOperation}/trigger-target-type/add-trigger-target-type-config`,
                update: `${automatedOperation}/trigger-target-type/update-trigger-target-type-config`,
                delete: `${automatedOperation}/trigger-target-type/delete-trigger-target-type-config`
            },
            timingTaskMgmt:{
                queryInfo: `${automatedOperation}/model-block-job-manage/query-by-page`,
                queryNm: `${automatedOperation}/model-block-job-manage/query-by-name`,
                delete:`${automatedOperation}/model-block-job-manage/delete-model-block-job-manage`
            }
        },
        // 运营计划管理
        operatePlanMgmt:{
            operatePlanMgmt:{
                //模型子块
                queryModelBlock: `${automatedOperation}/model-block/query-by-page`,
                queryInfo: `${automatedOperation}/model/query-by-page`,
                queryStatus:`${automatedOperation}/model-block/statistics`,
                add:`${automatedOperation}/model/add-model-config`,
                update:`${automatedOperation}/model/update-model-config`,
                offline:`${automatedOperation}/model/offline-model`,
                release:`${automatedOperation}/model/release-model`,
                eventList:`${automatedOperation}/event/query-by-page`,
                nodeList:`${automatedOperation}/param/query-by-page`,
                userGroupList:`${userGroup}/etrade-user-group/get-list`,
                rewardsList: `${awardMgmt}/mcp-rewards-config/query-rewards-config`,
                msgRuleList: `${messageCenter}/messageRule/rule/ruleSource/get`,
                badgeList: `${icif}/badges`,
                layoutIdList: `${recommendSystem}/res-app-layout-config/query-menu-list`,
                querySubmenuId:`${recommendSystem}/res-app-layout-template-config/query-submenu-id`,
                linkDataInfo:`${recommendSystem}/`,
                add1:`${automatedOperation}/model-block/add-model-block-config`,
                update1:`${automatedOperation}/model-block/update-model-block-config`,
                warnList:`${automatedOperation}/block-warn-config/query-by-page`,
                resList:`${automatedOperation}/res/query-by-id-list`,
                popList:`${automatedOperation}/popup-notices-config/query-list`,
                getEventConfig:`${automatedOperation}/model-block/query-block-event-relation`,
                blockIsEnable:`${automatedOperation}/model-block/update-model-block-enable`,
                queryTargetUserFrom:`${automatedOperation}/model-block/query-target-user-data-from`,
                channelMenu: `${recommendSystem}/res-channel-type-config/query-list`,
                pageByChannel:`${recommendSystem}/res-plaform-pages-management/get-page-by-channeltype`,
                queryContentTp:`${automatedOperation}/popup-notices-config/query-by-object-type`,
                execustCount:`${automatedOperation}/model-block-node-exe-record/query-model-block-node-execust-count`,
                deleteSub:`${automatedOperation}/model-block/delete-model-block`,
                deleteModel:`${automatedOperation}/model/delete-model-list`
            },
            operatePlanMgmtCheck: {
                getTopDataForCheck: `${automatedOperation}/model-block/query-by-page`,
                getListDataForCheck: `${automatedOperation}/model-block-node-exe-record/query-by-page`,
                getChartsDataForCheck: `${automatedOperation}/model-block-node-exe-record/query-count-by-time`,
                userGroup:`${userGroup}/etrade-user-group/qry-user-group`
            }
        }
    }
};