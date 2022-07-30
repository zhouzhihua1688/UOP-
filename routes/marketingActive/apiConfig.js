//营销活动接口总配置
// marketingActive = global.envConfig.marketingActive;
let marketingActive = '';
if (global.envConfig.marketingActive) {
    marketingActive = global.envConfig.marketingActive;
} else {
    marketingActive = global.envConfig.inner_gateway;
}
marketingActive += `/activity-center/admin/v1`;
let awardMgmt = '';
if (global.envConfig.awardMgmt) {
    awardMgmt = global.envConfig.awardMgmt;
} else {
    awardMgmt = global.envConfig.inner_gateway;
}
awardMgmt += `/activity-center`;

module.exports = {
    activeBasics: {
        dataList: `${marketingActive}/mcp-base-rule-template/query-base-rule-template`,
        dataAdd: `${marketingActive}/mcp-base-rule-template/add-base-rule-template`,
        dataChange: `${marketingActive}/mcp-base-rule-template/update-base-rule-template`,
        dataQuery: `${marketingActive}/mcp-base-rule-template/query-by-id`,
        dataDelete: `${marketingActive}/mcp-base-rule-template/delete-base-rule-template`,
        wordFieldNotes: {
            dataList: `${marketingActive}/mcp-act-table-data-explain/query-by-table-data-explain`,
            dataAdd: `${marketingActive}/mcp-act-table-data-explain/add-table-data-explain`,
            dataChange: `${marketingActive}/mcp-act-table-data-explain/update-table-data-explain`,
            dataQuery: `${marketingActive}/mcp-act-table-data-explain/query-by-id`,
            dataDelete: `${marketingActive}/mcp-act-table-data-explain/delete-table-data-explain`,
            actAll: `${marketingActive}/mcp-activity-config/query-all-activity`,
            componentAll: `${marketingActive}/mcp-act-component-config/get-activity-component`,
            largeDataAll: `${marketingActive}/mcp-bd-data-file-config/query-by-act-id`,
        }
    },
    largeData: {
        largeDataFile: {
            dataList: `${marketingActive}/mcp-bd-data-file-config/query-bd-data-file-config`,
            dataChange: `${marketingActive}/mcp-bd-data-file-config/update-bd-data-file-config`,
            dataQueryId: `${marketingActive}/mcp-bd-data-file-config/query-by-read-config-id`,
            dataDelete: `${marketingActive}/mcp-bd-data-file-config/update-delete-flag-or-is-enable`,
            upload: `${marketingActive}/up-or-download/common-upload-file`,
            dataAdd: `${marketingActive}/mcp-bd-data-file-config/add-bd-data-file-config`,
            dataStart: `${marketingActive}/mcp-bd-data-file-config/update-delete-flag-or-is-enable`,
            activeAll: `${marketingActive}/mcp-activity-config/query-all-activity`,
            componentAll: `${marketingActive}/mcp-act-component-config/get-activity-component`,
        }
    },
    activeTemplateMgmt: {
        activeTemplate: {
            dataList: `${marketingActive}/mcp-act-module-config/query-by-page`,
            dataChange: `${marketingActive}/mcp-act-module-config/update-act-module-config`,
            upload: `${marketingActive}/up-or-download/common-upload-file`,
            dataAdd: `${marketingActive}/mcp-act-module-config/add-act-module-config`,
            dataDelete: `${marketingActive}/mcp-act-module-config/delete-act-module-config`
        },
        activeTemplateDeploy: {
            dataQueryId: `${marketingActive}/mcp-act-component-config/query-by-module-id`,
            dataAdd: `${marketingActive}/mcp-act-component-config/add-module-cutinpoint-component-rl`,
            dataChange: `${marketingActive}/mcp-act-component-config/update-module-cutinpoint-component-rl`
        },
        activeCut: {
            dataList: `${marketingActive}/mcp-act-cutin-point-config/query-by-cutin-point-config`,
            dataAdd: `${marketingActive}/mcp-act-cutin-point-config/add-cutin-point-config`,
            dataChange: `${marketingActive}/mcp-act-cutin-point-config/update-cutin-point-config`,
            dataQuery: `${marketingActive}/mcp-act-cutin-point-config/query-by-cutin-point-id`,
            dataDelete: `${marketingActive}/mcp-act-cutin-point-config/delete-cutin-point-config`,
        },
        activeComponent: {
            dataList: `${marketingActive}/mcp-act-component-config/query-by-component-config`,
            dataAdd: `${marketingActive}/mcp-act-component-config/add-component-config`,
            dataChange: `${marketingActive}/mcp-act-component-config/update-component-config`,
            dataQuery: `${marketingActive}/mcp-act-component-config/query-by-component-id`,
            dataDelete: `${marketingActive}/mcp-act-component-config/delete-component-config`,
        },
        activeComponentRule: {
            dataQueryId: `${marketingActive}/mcp-act-component-rules-rl/query-by-component-id`,
            dataAdd: `${marketingActive}/mcp-act-component-rules-rl/add-component-rules-rl`,
            dataChange: `${marketingActive}/mcp-act-component-rules-rl/update-component-rules-rl`,

        },
        templatePort: {
            dataList: `${marketingActive}/mcp-act-template-api-config/query-template-api-config`,
            dataAdd: `${marketingActive}/mcp-act-template-api-config/add-act-template-api-config`,
            dataChange: `${marketingActive}/mcp-act-template-api-config/update-template-api-config`,
            dataQuery: `${marketingActive}/mcp-act-template-api-config/query-by-id`,
            dataDelete: `${marketingActive}/mcp-act-template-api-config/delete-template-api-config`,
        },

    },
    activeDataQuery: {
        activeJoinQuery: {
            dataList: `${marketingActive}/mcp-act-user-takepart/query-mcp-share-config`,
            applyUpdate: `${marketingActive}/mcp-act-user-takepart/convert-base-fund`
        },
        activeAwardQuery: {
            dataList: `${marketingActive}/mcp-act-cust-award-records/query-cust-award-records`
        },
        inviteCode: {
            dataList: `${marketingActive}/mcp-act-mgm-invite-code/query-mgm-invite-code`
        },
        inviteLog: {
            dataList: `${marketingActive}/mcp-act-mgm-relation/query-mgm-relation`
        },
        userJoin: {
            dataList: `${marketingActive}/mcp-act-user-takepart/query-takepart-chance`
        },
        prizeDetailLog: {
            dataList: `${marketingActive}/mcp-act-cust-awards/query-cust-awards`
        },
        joinDetail: {
            dataList: `${marketingActive}/mcp-act-take-part-config/query-takepart-detail`,
        },
        userInfoSearch: {
            dataList: `${marketingActive}/mcp-act-collection-data/get-collection-data`,
        },
        followRecord: {
            dataList: `${marketingActive}/mcp-act-item-like-records/query-act-item-like-records`
        },
        followCount: {
            dataList: `${marketingActive}/mcp-act-item-like-count/query-act-item-like-count`
        },
        activeHelp: {
            dataList: `${marketingActive}/mcp-act-takepart-chance-record/query-act-takepart-chance-record`
            // dataList: `http://10.50.114.217:8027/activity-center/admin/v1/mcp-act-takepart-chance-record/query-act-takepart-chance-record`
        }
    },
    activeRun: {
        activeRoad: {
            dataList: `${marketingActive}/mcp-act-seat-config/query-act-seat-config`,
            dataAdd: `${marketingActive}/mcp-act-seat-config/add-act-seat-config`,
            dataQuery: `${marketingActive}/mcp-act-seat-config/query-by-id`,
            dataChange: `${marketingActive}/mcp-act-seat-config/update-act-seat-config`,
            dataDelete: `${marketingActive}/mcp-act-seat-config/delete-act-seat-config`,
        },
        awardBase: {
            dataList: `${marketingActive}/mcp-base-award-config/query-by-page`,
            dataAdd: `${marketingActive}/mcp-base-award-config/add-base-award-config`,
            dataQuery: `${marketingActive}/mcp-base-award-config/query-by-id`,
            dataChange: `${marketingActive}/mcp-base-award-config/update-base-award-config`,
            dataDelete: `${marketingActive}/mcp-base-award-config/delete-base-award-config`,
            ExcelUpload: `${marketingActive}/mcp-base-award-config/import-base-award`,
            awardType: `${marketingActive}/mcp-base-award-config/query-by-id`,
            queryStockByAwardno: `${marketingActive}/mcp-base-award-config/query-stock-by-awardno`, // + '?awardNo=award20210712095418iig'
        },
        activeAward: {
            dataList: `${marketingActive}/mcp-act-awards-config/query-awards-config`,
            dataAdd: `${marketingActive}/mcp-act-awards-config/add-awards-config`,
            dataQuery: `${marketingActive}/mcp-act-awards-config/query-by-id`,
            dataChange: `${marketingActive}/mcp-act-awards-config/update-awards-config`,
            dataDelete: `${marketingActive}/mcp-act-awards-config/delete-awards-config`,
            activeAll: `${marketingActive}/mcp-activity-config/query-all-activity`,
            ExcelUpload: `${marketingActive}/mcp-act-awards-config/add-act-awards-config-by-import`,
        },
        activeSettingTemplatePage: {
            dataList: `${marketingActive}/mcp-act-template-file-upload/query-act-template-file`,
            dataAdd: `${marketingActive}/mcp-act-template-file-upload/save-act-template-file`,
            dataQuery: `${marketingActive}/mcp-act-template-file-upload/query-by-id`,
            dataChange: `${marketingActive}/mcp-act-template-file-upload/save-act-template-file`,
            dataDelete: `${marketingActive}/mcp-act-template-file-upload/delete-by-id`,
            upload: `${marketingActive}/up-or-download/common-upload-file`,
            activeAll: `${marketingActive}/mcp-activity-config/query-all-activity`,
            activeQuery: `${marketingActive}/mcp-act-template-file-upload/query-by-act-id`,
            checkFile: `${marketingActive}/up-or-download/common-verify-upload-file`,
            downloadFile: `${marketingActive}/up-or-download/download-file`,
            shareNo: `${marketingActive}/mcp-share-config/query-all-share-config`,
        },
        activeSetting: {
            activeAll: `${marketingActive}/mcp-activity-config/query-all-activity`,
            dataList: `${marketingActive}/mcp-activity-config/query-activity-config`,
            dataAdd: `${marketingActive}/mcp-activity-config/add-mcp-activity-config`,
            dataChange: `${marketingActive}/mcp-activity-config/update-activity-config`,
            dataQuery: `${marketingActive}/mcp-activity-config/query-by-id`,
            dataDelete: `${marketingActive}/mcp-activity-config/delete-activity-config`,
            upload: `${marketingActive}/up-or-download/common-upload-image`,
            sendAct: `${marketingActive}/mcp-activity-rule-config/activity-rule-release`,
            refreshAct: `${marketingActive}/mcp-activity-config/refresh-activity`,
            refreshStorage: `${marketingActive}/mcp-activity-config/refresh-mcp-activity-list`,
        },
        activeRuleSetting: {
            dataList: `${marketingActive}/mcp-activity-rule-config/query-activity-rule-config`,
            // dataQuery: `${marketingActive}/mcp-activity-config/query-by-id`,
            dataDelete: `${marketingActive}/mcp-activity-rule-config/delete-activity-rule-config`,
        },
        activeSettingAdd: { //内置页面
            activeAll: `${marketingActive}/mcp-activity-config/query-all-activity`,
            moduleAll: `${marketingActive}/mcp-act-module-config/query-by-all`,
            cutAll: `${marketingActive}/mcp-act-component-config/get-module-cutinpoint-rl`,
            componentAll: `${marketingActive}/mcp-act-component-config/get-cutinpoint-component-rl`,
            componentLargeData: `${marketingActive}/mcp-bd-data-file-config/query-by-all`,
            shareData: `${marketingActive}/mcp-share-config/query-all-share-config`,
            eventData: `${marketingActive}/mcp-activity-rule-config/get-event-type-enums`,
            infoData: `${marketingActive}/mcp-activity-rule-config/get-all-msg`,
            awardData: `${marketingActive}/mcp-act-awards-config/query-by-act-id`,
            keepData: `${marketingActive}/mcp-activity-rule-config/add-mcp-activity-rule-config`,
            secureData: `${marketingActive}/mcp-activity-rule-config/get-safe-levels`,
            changeData: `${marketingActive}/mcp-activity-rule-config/update-activity-rule-config`,
            actGetData: `${marketingActive}/mcp-activity-rule-config/query-by-act-id`,
            userGroup: `${marketingActive}/user-group/query-user-group-list`,
            road: `${marketingActive}/mcp-act-seat-config/query-act-seat-config`,
        },
        newSetting: {
            getTable: `${marketingActive}/mcp-act-message-config/query-by-page`,
            del: `${marketingActive}/mcp-act-message-config/delete-act-message-config`,
            add: `${marketingActive}/mcp-act-message-config/add-act-message-config`,
            update: `${marketingActive}/mcp-act-message-config/update-act-message-config`
        },
        shareSetting: {
            getTable: `${marketingActive}/mcp-share-config/query-mcp-share-config`,
            del: `${marketingActive}/mcp-share-config/delete-mcp-share-config`,
            add: `${marketingActive}/mcp-share-config/add-mcp-share-config`,
            upload: `${marketingActive}/up-or-download/common-upload-image`,
            update: `${marketingActive}/mcp-share-config/update-mcp-share-config`,
            getShareChannelList: `${marketingActive}/mcp-share-template-config/query-all-share-channels`
        },
        asyncWorkSetting: {
            getTable: `${marketingActive}/mcp-act-async-jobs-config/query-by-page`,
            getChildJobIdList: `${marketingActive}/mcp-act-async-jobs-config/query-by-id`,
            getActIdList: `${marketingActive}/mcp-activity-config/query-all-activity`,
            getActModuleCutinIdList: `${marketingActive}/mcp-act-cutin-point-config/query-by-act-id`,
            getJobHandler: `${marketingActive}/mcp-act-cutin-job-handler-rl/query-by-module-cutin-id`,
            del: `${marketingActive}/mcp-act-async-jobs-config/delete-async-jobs-config`,
            add: `${marketingActive}/mcp-act-async-jobs-config/add-async-jobs-config`,
            update: `${marketingActive}/mcp-act-async-jobs-config/update-async-jobs-config`
        },
        asyncNodeSetting: {
            getTable: `${marketingActive}/mcp-act-cutin-job-handler-rl/query-by-page`,
            del: `${marketingActive}/mcp-act-cutin-job-handler-rl/delete-by-job-handler`,
            add: `${marketingActive}/mcp-act-cutin-job-handler-rl/add-job-handler`,
            update: `${marketingActive}/mcp-act-cutin-job-handler-rl/update-job-handler`
        },
        qrCodeGenerate: {
            qrCodeUpload: `${marketingActive}/qrcode/creat-and-down-qrcode-file`.replace('admin/','')
        },
        activeTag:{
            getTable: `${marketingActive}/mcp-act-tag-config/query-tag-Config`,
            del: `${marketingActive}/mcp-act-tag-config/delete-tag-config`,
            add: `${marketingActive}/mcp-act-tag-config/insert-tag-config`,
            modify: `${marketingActive}/mcp-act-tag-config/update-tag-config`,
        },
        activeTagRelation:{
            getTable: `${marketingActive}/mcp-act-tag-relation/query-tag-relation`,
            del: `${marketingActive}/mcp-act-tag-relation/delete-by-id`,
            add: `${marketingActive}/mcp-act-tag-relation/insert-tag-relation`,
            modify: `${marketingActive}/mcp-act-tag-relation/update-tag-relation`,
        }
    },
    taskManage: {
        taskClassify: {
            dataList: `${marketingActive}/mcp-task-category-config/query-by-page`,
            dataAdd: `${marketingActive}/mcp-task-category-config/add-category-config`,
            showData: `${marketingActive}/mcp-task-category-config/update-display-mode`,

            dataChange: `${marketingActive}/mcp-task-category-config/modify-category-config`,
            refreshTask: `${marketingActive}/mcp-task-category-config/refresh-category-config`,
            // dataQuery: `${marketingActive}/mcp-act-template-api-config/query-by-id`,
            // dataDelete: `${marketingActive}/mcp-act-template-api-config/delete-template-api-config`,
        },
        manage: {
            dataList: `${marketingActive}/mcp-task-config/query-by-page`,
            taskClassifyQuery: `${marketingActive}/mcp-task-category-config/query-by-page`,//任务分类查询
            taskRuleQuery: `${marketingActive}/mcp-task-template-rule-config/query-by-page`,//任务规则
            placeholderKeyQuery: `${marketingActive}/mcp-task-rule-parameter/query-by-page`,//占位符对应查询
            refreshTask: `${marketingActive}/mcp-task-config/refresh-task-config`,
            groupList: `${marketingActive}/user-group/query-user-group-list`,

            dataAdd: `${marketingActive}/mcp-task-config/add-task-config`,
            publish: `${marketingActive}/mcp-task-config/release-task-config`,
            showData: `${marketingActive}/mcp-task-config/update-task-display-mode`,
            dataChange: `${marketingActive}/mcp-task-config/update-task-config`,
            dataQuery: `${marketingActive}/mcp-task-config/get-task-config-info`,
            verify: `${marketingActive}/upload/common-verify-file`,
            upload: `${marketingActive}/upload/common-upload-file`,
            uploadImage: `${marketingActive}/up-or-download/common-upload-image`,
            pagePath: `${marketingActive}/mcp-task-config/save-task-config-pages`,
            messageAll: `${marketingActive}/mcp-task-message-config/query-by-id`,
            categoryAll: `${marketingActive}/mcp-task-config/query-category-info`,

        },
        taskRule: {
            dataList: `${marketingActive}/mcp-task-rule-config/query-task-rule-configs`,
            // dataAdd: `${marketingActive}/mcp-act-template-api-config/add-act-template-api-config`,
            // dataChange: `${marketingActive}/mcp-act-template-api-config/update-template-api-config`,
            // dataQuery: `${marketingActive}/mcp-act-template-api-config/query-by-id`,
            // dataDelete: `${marketingActive}/mcp-act-template-api-config/delete-template-api-config`,
        },
        userTaskLog: {
            dataList: `${marketingActive}/mcp-task-user-record/query-task-user-records`,
            // dataAdd: `${marketingActive}/mcp-act-template-api-config/add-act-template-api-config`,
            // dataChange: `${marketingActive}/mcp-act-template-api-config/update-template-api-config`,
            // dataQuery: `${marketingActive}/mcp-act-template-api-config/query-by-id`,
            // dataDelete: `${marketingActive}/mcp-act-template-api-config/delete-template-api-config`,
        },
        userTaskProgress: {
            dataList: `${marketingActive}/mcp-task-user-process/query-task-user-process`,
            // dataAdd: `${marketingActive}/mcp-act-template-api-config/add-act-template-api-config`,
            // dataChange: `${marketingActive}/mcp-act-template-api-config/update-template-api-config`,
            // dataQuery: `${marketingActive}/mcp-act-template-api-config/query-by-id`,
            // dataDelete: `${marketingActive}/mcp-act-template-api-config/delete-template-api-config`,
        },
        taskRuleTemplate: {
            dataList: `${marketingActive}/mcp-task-template-rule-config/query-by-page`,
            placeholdersQuery: `${marketingActive}/mcp-task-rule-parameter/query-by-page`,
            dataAdd: `${marketingActive}/mcp-task-template-rule-config/add-template-rule-config`,
            dataChange: `${marketingActive}/mcp-task-template-rule-config/modify-template-rule-config`,
            // dataQuery: `${marketingActive}/mcp-act-template-api-config/query-by-id`,
            // dataDelete: `${marketingActive}/mcp-act-template-api-config/delete-template-api-config`,
        },
        rulePlaceholders: {
            dataList: `${marketingActive}/mcp-task-rule-parameter/query-by-page`,
            // placeholdersQuery: `${marketingActive}/mcp-task-rule-parameter/query-by-page`,
            dataAdd: `${marketingActive}/mcp-task-rule-parameter/add-template-rule-parameter`,
            dataChange: `${marketingActive}/mcp-task-rule-parameter/modify-template-rule-parameter`,
            // dataQuery: `${marketingActive}/mcp-act-template-api-config/query-by-id`,
            dataDelete: `${marketingActive}/mcp-task-rule-parameter/delete-template-rule-parameter`,
        },
        taskMessage: {
            dataList: `${marketingActive}/mcp-task-message-config/query-by-page`,
            messageAll: `${marketingActive}/mcp-task-message-config/query-by-id`,
            dataAdd: `${marketingActive}/mcp-task-message-config/add-message-config`,
            dataChange: `${marketingActive}/mcp-task-message-config/modify-message-config`,
            taskIdAll: `${marketingActive}/mcp-task-config/query-by-page`,
            dataDelete: `${marketingActive}/mcp-task-message-config/delete-message-config`,
            refreshTask: `${marketingActive}/mcp-task-message-config/refresh-message-config`,
        },
        sceneTaskRelation: {
            dataList: `${marketingActive}/mcp-task-scene-relation/select-mcp-task-scene-relation`,
            queryId: `${marketingActive}/mcp-task-scene-relation/select-mcp-task-scene-relation-by-id`,
            // messageAll: `${marketingActive}/mcp-task-message-config/query-by-id`,
            dataAdd: `${marketingActive}/mcp-task-scene-relation/add-mcp-task-scene-relation`,
            dataChange: `${marketingActive}/mcp-task-scene-relation/update-mcp-task-scene-relation`,
            taskIdAll: `${marketingActive}/mcp-task-config/query-by-page`,
            dataDelete: `${marketingActive}/mcp-task-scene-relation/delete-mcp-task-scene-relation`,
            // refreshTask: `${marketingActive}/mcp-task-message-config/refresh-message-config`,
        }
    },
    shareMgmt: {
        scene: {
            getList: `${marketingActive}/mcp-share-scene-config/query-mcp-share-scene-config`,
            add: `${marketingActive}/mcp-share-scene-config/add-mcp-share-scene-config`,
            getShareRventTypeList: `${marketingActive}/mcp-share-scene-config/query-all-share-scenes`,
            update: `${marketingActive}/mcp-share-scene-config/update-mcp-share-scene-config`
        },
        sceneTemplate: {
            getScenceDetail: `${marketingActive}/mcp-share-scene-config/query-by-id`,
            getList: `${marketingActive}/mcp-share-template-config/query-mcp-share-template-config`,
            del: `${marketingActive}/mcp-share-template-config/delete-mcp-share-template-config`,
            getShareChannel: `${marketingActive}/mcp-share-template-config/query-all-share-channels`,
            addTemplateContent: `${marketingActive}/mcp-share-config/add-mcp-share-config`,
            updateTemplateContent: `${marketingActive}/mcp-share-config/update-mcp-share-config`,
            addTemplate: `${marketingActive}/mcp-share-template-config/add-mcp-share-template-config`,
            updateTemplate: `${marketingActive}/mcp-share-template-config/update-mcp-share-template-config`,
            getTemplateContentList: `${marketingActive}/mcp-share-config/query-mcp-share-config`,
            upload: `${marketingActive}/up-or-download/common-upload-image`
        }
    },
    keywordQuery: {
        template: {
            query: `${awardMgmt}/v1/url/check/key-usage-check`,
        }
    }
};