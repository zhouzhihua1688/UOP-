let messageCenter = global.envConfig.messageCenter ? global.envConfig.messageCenter : global.envConfig.inner_gateway;
let messageCenterMss = global.envConfig.messageCenter_group ? global.envConfig.messageCenter_group : global.envConfig.inner_gateway;
let messageCenterToken = global.envConfig.messageCenter_token ? global.envConfig.messageCenter_token : global.envConfig.inner_gateway;
let sfs = global.envConfig.sfs ? global.envConfig.sfs : global.envConfig.inner_gateway;
let icif = global.envConfig.icif ? global.envConfig.icif : global.envConfig.inner_gateway;
let userGroup = global.envConfig.userGroup ? global.envConfig.userGroup : global.envConfig.inner_gateway;
let scp = global.envConfig.scp ? global.envConfig.scp : global.envConfig.inner_gateway;
let CS = global.envConfig.CS ? global.envConfig.CS : global.envConfig.inner_gateway;
let messageCenterBlackList = global.envConfig.messageCenter_blackList ? global.envConfig.messageCenter_blackList : global.envConfig.inner_gateway;
let caa = global.envConfig.caa ? global.envConfig.caa : global.envConfig.inner_gateway;
messageCenter += '/message-center/v1';
messageCenterToken += '/message-center-api/v1';
sfs += '/sfs/admin/v1';
icif += '/icif/v1';
userGroup += '/user-group/v1';
scp += '/sfs/admin/v1';
CS += '/common-services/v1';
messageCenterBlackList += '/message-center-api/v1';
caa += '/caa/v1';
const devFilePath = global.envConfig.devFilePath;
const uopStaticFilePath = global.envConfig.uopStaticFilePath;
const uopStaticFilePath_url = global.envConfig.uopStaticFilePath_url;

const messageCenterDevFilePath = global.envConfig.messageCenterFilePath ? global.envConfig.messageCenterFilePath : devFilePath + '/messageCenter';
const messageCenterExternalFilePath = uopStaticFilePath ? uopStaticFilePath + '/messageCenter' : devFilePath + '/uopStatic';
const messageCenterExternalFilePath_url = uopStaticFilePath_url ? uopStaticFilePath_url + '/messageCenter' : devFilePath + '/uopStatic';

let communityApi = global.envConfig.community || global.envConfig.inner_gateway;
let communityFilesPath = uopStaticFilePath ? `${global.envConfig.uopStaticFilePath}/messageCenter/socialMgmt` : `${devFilePath}/messageCenter/socialMgmt`;
let communityFilesPath_url = uopStaticFilePath_url ? `${uopStaticFilePath_url}/messageCenter/socialMgmt` : `${devFilePath}/messageCenter/socialMgmt`;


module.exports = {
    filePath: messageCenterDevFilePath,
    filePathExternal: messageCenterExternalFilePath,
    filePathExternal_url: messageCenterExternalFilePath_url,
    communityFilesPath,
    communityFilesPath_url,
    templateMgmt: {
        templateMgmt: {
            search: `${messageCenter}/messageTemplate/get`,
            query: `${messageCenter}/messageTemplate/query`,
            del: `${messageCenter}/messageTemplate/delete`,
            add: `${messageCenter}/messageTemplate/add`,
            update: `${messageCenter}/messageTemplate/update`,
            exportAll: `${messageCenter}/messageTemplate/get`,
        }
    },
    classMgmt: {
        classMgmt: {
            search: `${messageCenter}/messageCategory/get`,
            query: `${messageCenter}/messageCategory/getCategroy`,
            del: `${messageCenter}/messageCategory/delete`,
            add: `${messageCenter}/messageCategory/add`,
            update: `${messageCenter}/messageCategory/update`
        },
        secondClassMgmt: {
            getTableData: `${messageCenter}/messageCategory/subCategory/all`,
            getClassList: `${messageCenter}/messageCategory/get`,
            save: `${messageCenter}/messageCategory/subCategory/add`,
            update: `${messageCenter}/messageCategory/subCategory/update`,
            del: `${messageCenter}/messageCategory/subCategory/delete`,
            exportData: `${messageCenterToken}/app/services/detail/subcategory`
        }
    },
    ruleMgmt: {
        ruleMgmt: {
            // search: `${messageCenter}/messageRule/get`,
            search: `${messageCenter}/messageRule/all`,  // 20211227 UOP配合改造消息规则页面相关接口
            query: `${messageCenter}/messageRule/getRule`,
            searchCategory: `${messageCenter}/messageCategory/get`,
            getSelectList: `${messageCenter}/messageTemplate/query`,
            add: `${messageCenter}/messageRule/add`,
            del: `${messageCenter}/messageRule/delete`,
            getGroupList: `${userGroup}/etrade-user-group/qry-user-group`,
            queryTemplate: `${messageCenter}/messageTemplate/query`,
            getGroupNum: `${userGroup}/group/size`,
            uploadCSV: `${messageCenter}`,
            update: `${messageCenter}/messageRule/update`,
            getSubList: `${messageCenter}/messageCategory/subCategory/get`,
            getTemplate: `${messageCenter}/messageTemplate/get`
        }
    },
    sendCount: {
        sendCount: {
            query: `${messageCenter}/messageRule/queryRuleBatch`,
            download: `${messageCenterToken}/api/services/mssWeb/selectAppPushStatusByBatch`,
            search: `${messageCenterToken}/api/services/mssWeb/statsPushTotalEx`
        },
        WXSearch: {
            query: `${messageCenter}/messageRule/queryRuleBatch`,
            search: `${messageCenterToken}/api/services/mssWeb/queryWeixinSendRecord`
        },
        msgSearch: {
            search: `${messageCenterToken}/api/services/mssWeb/getSmsSendStatus`
        },
        singlePush: {
            search: `${messageCenterToken}/api/services/mssWeb/getAppPushSingleRecord`
        },
        upReplyQuery: {
            queryRule: `${messageCenter}/messageRule/rule/message/reply/config/list`,
            queryData: `${messageCenterToken}/api/services/sms/replay/list`
        }
    },
    manualMgmt: {
        manualMgmt: {
            search: `${messageCenter}/messageRule/queryRuleBatch`,
            sendMsg: `${messageCenter}/messageRule/process`,
            getGroupList: `${userGroup}/etrade-user-group/qry-user-group`,
            getRuleList: `${messageCenter}/messageRule/get`,
            searchCount: `${messageCenterToken}/api/services/mssWeb/queryNotificationStatusCount`,
            del: `${messageCenterToken}/api/services/mssWeb/deleteAllMessage`
        },
        deleteMsg: {
            del: `${messageCenterToken}/api/services/mssWeb/deleteAllMessage`
        }
    },
    scenceMgmt: {
        scenceList: {
            search: `${messageCenter}/messageRule/getSceneRule`
        },
        scenceAdd: {
            search: `${messageCenter}/messageRule/get`,
            add: `${messageCenter}/messageRule/addSceneRule`
        },
        upReplyRule: {
            query: `${messageCenter}/messageRule/rule/message/reply/config/list`,
            add: `${messageCenter}/messageRule/rule/message/reply/config/add`
        }
    },
    tokenSearch: {
        tokenSearch: {
            search: `${messageCenterToken}/api/services/mssWeb/getUserPushSetting`,
            clearToken: `${messageCenterToken}/api/services/mssWeb/clearInvalidIosToken`,
            query: `${messageCenterToken}/api/services/mssWeb/getTokenInfo`
        }
    },
    auditMgmt: {
        leaveWordMgmt: {
            queryList: `${sfs}/sfs-message-board-comments/query-by-page`,
            getTitleList: `${sfs}/sfs-message-board-comments/get-article-titles`,
            getItemType: `${sfs}/sfs-message-board-comments/get-comment-to-item-tps`,
            managerList: `${sfs}/sfs-message-board-comments/get-fund-manage`,
            refreshFundManage: `${sfs}/sfs-message-board-comments/refresh-fund-manage`,
            updateStatus: `${sfs}/sfs-message-board-comments/update-comment-status`,
            addMessage: `${sfs}/sfs-message-board-replies/add-message-boards-replies`,
            getMessage: `${sfs}/sfs-message-board-replies/get-message-boards-replies`,
            deleteMessage: `${sfs}/sfs-message-board-replies/delete-message-boards-replies`,
            modifyMessage: `${sfs}/sfs-message-board-replies/update-replies-context`,
        },
        nicknameToReview: {
            nicknameGetList: `${icif}/custs/query-app`,
            nicknameCheck: `${icif}/pcusts/check-nickname-app`,
            headImageCheck: `${icif}/pcusts/check-avatar-image-app`
        },
        idCardHandle: {
            getServerList: `${icif}/custs/query-app`,
            getTranslate: `${CS}/param/params`
        },
        idCardReview: {
            getServerList: `${icif}/custs/query-app`,
            IdImageCheck: `${icif}/pcusts/check-avatar-image-app`,
            getTranslate: `${CS}/param/params`,
            checkPass: `${icif}/pcusts/check-cust-image-app`,
        },
        communityDynamic: {
            topicLIst: `${communityApi}/sfs/admin/v1/topic/list`,
            accountList: `${communityApi}/sfs/admin/v1/author/list`,
            tableData: `${communityApi}/sfs/admin/v1/post`,
            modify: `${communityApi}/sfs/admin/v1/post`,
            querySingle: `${communityApi}/sfs/admin/v1/post/`,
            approve: `${communityApi}/sfs/admin/v1/post/approve`,
            levelModify: `${communityApi}/sfs/admin/v1/post/top`,

        },
        comment: {
            handleCheck: `${communityApi}/sfs/admin/v1/comment/approve`,
            // 批量处理
            handleCheckBatch: `${communityApi}/sfs/admin/v1/comment/approve-batch`,
            topicLIst: `${communityApi}/sfs/admin/v1/topic/list`,
            accountList: `${communityApi}/sfs/admin/v1/author/list`,
            tableData: `${communityApi}/sfs/admin/v1/comment/page-list`,
            modify: `${communityApi}/sfs/admin/v1/post`,
            querySingle: `${communityApi}/sfs/admin/v1/post/`,
            querySingleComment: `${communityApi}/sfs/api/v1/comment/`,
            remarksAnswer: `${communityApi}/sfs/admin/v1/comment`, //评论回复
            communityApi
        }
    },
    socialMgmt: {
        parameterMgmt: {
            getTableData: `${scp}/parameter/list`,
            saveParam: `${scp}/parameter/`,
            deleteParam: `${scp}/parameter/`,
            update: `${scp}/parameter/`
        },
        publicOfferReview: {
            getTableData: `${scp}/firm-offers/list`,
            checkParams: `${scp}/firm-offers/detail`,
            publicStatus: `${scp}/firm-offers/public-confirm`,
        },
        firmOfferRank: {
            getTableData: `${scp}/firm-offers/rank-yieldscore`,
            checkParams: `${scp}/firm-offers/detail`,
            statistical: `${scp}/firm-offers/statistical`,
        },
        topicClassify: {
            tableData: `${communityApi}/sfs/admin/v1/category/list`,
            add: `${communityApi}/sfs/admin/v1/category`,
            modify: `${communityApi}/sfs/admin/v1/category`,
            querySingle: `${communityApi}/sfs/admin/v1/category/`,
            del: `${communityApi}/sfs/admin/v1/category`,
            categoryTable: `${communityApi}/sfs/admin/v1/topic/category`,
            topicModify: `${communityApi}/sfs/admin/v1/category-topic`,
            delCategory: `${communityApi}/sfs/admin/v1/category-topic`,
            topicModifyOld: `${communityApi}/sfs/admin/v1/category-topic`,
        },
        topic: {
            cardList: `${communityApi}/sfs/admin/v1/card/list`,
            classify: `${communityApi}/sfs/admin/v1/category/list`,
            tableData: `${communityApi}/sfs/admin/v1/topic/list`,
            add: `${communityApi}/sfs/admin/v1/topic`,
            modify: `${communityApi}/sfs/admin/v1/topic`,
            topicModify: `${communityApi}/sfs/admin/v1/post/approve`,
            levelModify: `${communityApi}/sfs/admin/v1/post/top`,
            querySingle: `${communityApi}/sfs/admin/v1/topic/`,
            del: `${communityApi}/sfs/admin/v1/topic`,
            topicTableData: `${communityApi}/sfs/admin/v1/post`,
            voteList: `${caa}/survey/config/survey/list` //获取投票列表
        },
        card: {
            tableData: `${communityApi}/sfs/admin/v1/card/list`,
            add: `${communityApi}/sfs/admin/v1/card`,
            modify: `${communityApi}/sfs/admin/v1/card`,
            querySingle: `${communityApi}/sfs/admin/v1/card/`,
            del: `${communityApi}/sfs/admin/v1/card`,
        },
        account: {
            tableData: `${communityApi}/sfs/admin/v1/author/list`,
            add: `${communityApi}/sfs/admin/v1/author`,
            modify: `${communityApi}/sfs/admin/v1/author`,
            querySingle: `${communityApi}/sfs/admin/v1/author/`,
            del: `${communityApi}/sfs/admin/v1/author`,
            mailData: `${communityApi}/sfs/admin/v1/author/mail/list`,
            addMail: `${communityApi}/sfs/admin/v1/author/mail`,
            delMail: `${communityApi}/sfs/admin/v1/author/mail`,
            modifyMail: `${communityApi}/sfs/admin/v1/author/mail`,
            querySingle2: `${communityApi}/sfs/admin/v1/author/mail/`,
        },
        article: {
            topicLIst: `${communityApi}/sfs/admin/v1/topic/list`,
            accountList: `${communityApi}/sfs/admin/v1/author/list`,
            tableData: `${communityApi}/sfs/admin/v1/post`,
            tableData2: `${communityApi}/sfs/admin/v1/mail/list`,
            add: `${communityApi}/sfs/admin/v1/post`,
            modify: `${communityApi}/sfs/admin/v1/post`,
            querySingle: `${communityApi}/sfs/admin/v1/post/`,
            del: `${communityApi}/sfs/admin/v1/mail`,
            mailDetail: `${communityApi}/sfs/admin/v1/mail/post`,
            relatedMail: `${communityApi}/sfs/admin/v1/author/mail`,
            modifyRelatedMail: `${communityApi}/sfs/admin/v1/author/mail`,
            publishArticle: `${communityApi}/sfs/admin/v1/mail/publish`,
            levelModify: `${communityApi}/sfs/admin/v1/post/top`,
            voteList: `${caa}/survey/config/survey/list`, //获取投票列表
            // 评论管理
            handleCheck: `${communityApi}/sfs/admin/v1/comment/approve`, //隐藏/展开评论
             // 批量处理
            handleCheckBatch: `${communityApi}/sfs/admin/v1/comment/approve-batch`,
            exportRemarksExcel: `${communityApi}/sfs/admin/v1/comment/page-list`, // 导出评论列表
            remarksList: `${communityApi}/sfs/admin/v1/comment/page-list`, // 获取评论列表
            remarksReward: `${communityApi}/sfs/admin/v1/comment/reward`, //发放奖励
            remarksTop: `${communityApi}/sfs/admin/v1/comment/top`, //评论置顶
            remarksAnswer: `${communityApi}/sfs/admin/v1/comment`, //评论回复
            remarksDelete: `${communityApi}/sfs/admin/v1/comment`, //评论删除
            upload: `${communityApi}/sfs/admin/v1/file/upload`, //上传附件（文件和图片）
            modifyStatus: `${communityApi}/sfs/admin/v1/post/approve`, //单独修改状态
        },
        hotChat: {
            getTableData: `${scp}/bbs/recommend/product/list`,
            getYield: `${scp}/yield-type`,
            add: `${scp}/bbs/recommend/product`,
            deleteParam: `${scp}/bbs/recommend/product`,
            update: `${scp}/bbs/recommend/product`,
            updateStatus: `${scp}/bbs/recommend/product`
        },
    },
    blackListMgmt: {
        shortMessageMgmt: {
            getTableData: `${messageCenterBlackList}/api/services/mssWeb/queryBlacklist`,
            saveParam: `${messageCenterBlackList}/api/services/mssWeb/insertBlacklist`,
            deleteParam: `${messageCenterBlackList}/api/services/mssWeb/deleteBlacklist`
        },
        amlMgmt: {
            getTableData: `${icif}/blacks/aml-errors/qry`,
            deleteParam: `${icif}/blacks/aml-errors/del`,
            queryFundAccts: `${icif}/fundaccts/qry-by-cust-no`
        },
        unsubscribeQuery: {
            getTableData: `${messageCenterToken}/api/services/mssWeb/queryUnsubcribeList`,
            queryAddList: `${messageCenter}/messageCategory/get`,
            saveParam: `${messageCenterToken}/api/services/mssWeb/insertUnsubscribeInfo`,
            deleteParam: `${messageCenterToken}/api/services/mssWeb/deleteUnsubscribeInfo`
        }
    }
};