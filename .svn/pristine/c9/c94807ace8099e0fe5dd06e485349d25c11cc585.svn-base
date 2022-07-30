//营销活动接口总配置
// clientMgmt = global.envConfig.clientMgmt;
let clientMgmt = '';
if (global.envConfig.clientMgmt) {
    clientMgmt = global.envConfig.clientMgmt;
} else {
    clientMgmt = global.envConfig.inner_gateway;
}
let member = '';
if (global.envConfig.member) {
    member = global.envConfig.member;
} else {
    member = global.envConfig.inner_gateway;
}
let filePath = '';
if (global.envConfig.clientMgmtFilePathDev) {
    filePath = global.envConfig.clientMgmtFilePathDev;
} else {
    filePath = global.envConfig.uopStaticFilePath+'/clientMgmt/vipGrade';
}
let delFilePath = '';
if (global.envConfig.clientMgmtFilePathDev) {
    delFilePath = global.envConfig.clientMgmtFilePathDev;
} else {
    delFilePath = global.envConfig.uopStaticFilePath+'/clientMgmt/del';
}
let filePathUrl = '';
if (global.envConfig.clientMgmtFilePathDev) {
    filePathUrl = global.envConfig.clientMgmtFilePathDev;
} else {
    filePathUrl = global.envConfig.uopStaticFilePath_url+'/clientMgmt/vipGrade';
}
// clientMgmt += `/activity-center/admin/v1`;

// 白名单设置
let whiteList = '';
if (global.envConfig.whiteList) {
    whiteList = global.envConfig.whiteList;
} else {
    whiteList = global.envConfig.inner_gateway;
}
// 客户信息查询
let customerInformation = '';
if (global.envConfig.customerInformation) {
    customerInformation = global.envConfig.customerInformation;
} else {
    customerInformation = global.envConfig.inner_gateway;
}
//资产数据查询
let assetDataQuery = '';
if (global.envConfig.assetDataQuery) {
    assetDataQuery = global.envConfig.assetDataQuery;
} else {
    assetDataQuery = global.envConfig.inner_gateway;
}
//交易记录查询
let ess = '';
if (global.envConfig.ESS) {
    ess = global.envConfig.ESS;
} else {
    ess = global.envConfig.inner_gateway;
}
////标签应用管理-标签模型配置
let labelApplication = '';
if (global.envConfig.labelApplication) {
    labelApplication = global.envConfig.labelApplication;
} else {
    labelApplication = global.envConfig.inner_gateway;
}
let combinationParam = '';
if (global.envConfig.combinationParam) {
    combinationParam = global.envConfig.combinationParam;
} else {
    combinationParam = global.envConfig.inner_gateway;
}
combinationParam += '/common-services/v1';

////标签应用管理-客群查询输出
let productOpenDayMgmt = '';
if (global.envConfig.productOpenDayMgmt) {
    productOpenDayMgmt = global.envConfig.productOpenDayMgmt;
} else {
    productOpenDayMgmt = global.envConfig.inner_gateway;
}
let customerParam = '';
if (global.envConfig.customerParam) {
    customerParam = global.envConfig.customerParam;
} else {
    customerParam = global.envConfig.inner_gateway;
}
// 获取客群ID信息
let custGroupId = '';
if (global.envConfig.custGroupId) {
    custGroupId = global.envConfig.custGroupId;
} else {
    custGroupId = global.envConfig.inner_gateway;
}
const devFilePath = global.envConfig.devFilePath;
const uopStaticFilePath = global.envConfig.uopStaticFilePath;
const uopStaticFilePath_url = global.envConfig.uopStaticFilePath_url;
// let clientMgmtFilePath = ''; //ipo客户画像
// if (global.envConfig.clientMgmtFilePath) {
//     clientMgmtFilePath = global.envConfig.clientMgmtFilePath;
// } else {
//     clientMgmtFilePath = global.envConfig.clientMgmtFilePath;
// }

module.exports = {
    filePath,
    filePathUrl,
    delFilePath,
    // clientMgmtFilePath,
    filePathExternal: uopStaticFilePath ? (uopStaticFilePath + '/clientMgmt') : (devFilePath + '/clientMgmt'),
    filePafilePathExternalthUrl: uopStaticFilePath ? (uopStaticFilePath_url + '/clientMgmt') : (devFilePath + '/clientMgmt'),
    vipGrade: {
        privilege: {
            dataList: `${clientMgmt}/reward/v1/privilege/getPrivilegeList`,
            dataChange: `${clientMgmt}/reward/v1/privilege/updatePrivilege`,
            // dataQueryId: `${clientMgmt}/reward/v1/privilege/getPrivilegeGradeLis`,

            dataDelete: `${clientMgmt}/reward/v1/privilege/deletePrivilege`,
            // upload: `${clientMgmt}/up-or-download/common-upload-file`,
            dataAdd: `${clientMgmt}/reward/v1/privilege/addPrivilege`,
            // dataStart: `${clientMgmt}/mcp-bd-data-file-config/update-delete-flag-or-is-enable`,
            // activeAll: `${clientMgmt}/mcp-activity-config/query-all-activity`,
            // componentAll: `${clientMgmt}/mcp-act-component-config/get-activity-component`,
        },
        privilegeHand: {
            dataList: `${clientMgmt}/reward/v1/privilege/getAllPrivilegeDetail`,
            privilegeList: `${clientMgmt}/reward/v1/privilege/getPrivilegeList`,
            sourceList: `${clientMgmt}/reward/v1/privilege/getPrivilegeSourceList`,
            dataChange: `${clientMgmt}/reward/v1/privilege/updatePrivilege`,
            // dataQueryId: `${clientMgmt}/reward/v1/privilege/getPrivilegeGradeLis`,
            dataDelete: `${clientMgmt}/reward/v1/privilege/deletePrivilegeDetailById`,
            // upload: `${clientMgmt}/up-or-download/common-upload-file`,
            dataAdd: `${clientMgmt}/reward/v1/privilege/addPrivilegeDetail`,
            custNoList: `${clientMgmt}/icif/v1/batch-query-mobileno-by-custnos`,
            queryCustNo: `${clientMgmt}/reward/v1/privilege/getPrivilegeDetailWhiteList`,
            // componentAll: `${clientMgmt}/mcp-act-component-config/get-activity-component`,
        },
        member:{
            dataList: `${member}/icif/v1/grades/`,
            dataChange: `${member}/icif/v1/grades`,
            dataQuery: `${member}/icif/v1/grades/`,
            dataDelete: `${member}/icif/v1/grades/`,
            // upload: `${clientMgmt}/up-or-download/common-upload-file`,
            dataAdd: `${member}/icif/v1/grades`,
            privilegeAll: `${clientMgmt}/reward/v1/privilege/getPrivilegeList`,
            gradeList: `${clientMgmt}/reward/v1/privilege/getPrivilegeGradeList`,
            addGradeIdList: `${clientMgmt}/reward/v1/privilege/addPrivilegeGrade`,
            updateGradeIdList: `${clientMgmt}/reward/v1/privilege/updatePrivilegeGrade`,
            // componentAll: `${clientMgmt}/mcp-act-component-config/get-activity-component`,
        },
        source:{
            dataList: `${clientMgmt}/reward/v1/privilege/getPrivilegeSourceList`,
            // dataChange: `${member}/icif/v1/grades`,
            // dataQuery: `${member}/icif/v1/grades/`,
            // dataDelete: `${member}/reward/v1/privilege/deletePrivilege`,
            dataAdd: `${clientMgmt}/reward/v1/privilege/addPrivilegeSource`,
        }
    },
    
    // 白名单设置
    whiteList: {
        setting: {
            dataList: `${whiteList}/common-services/v1/canary/white-list/customers`,
            dataUpd: `${whiteList}/common-services/v1/canary/white-list/update`,
            dataDel: `${whiteList}/common-services/v1/canary/white-list/deletion`,
            dataAdd: `${whiteList}/common-services/v1/canary/white-list/creation`,
            batchDel: `${whiteList}/common-services/v1/canary/white-list/batch/deletion`,
            batchAdd: `${whiteList}/common-services/v1/canary/white-list/batch/creation`,
        }
    },
    information: {
        informationQuery: {
            getTableData:`${customerInformation}/icif/v1/risks/risk-assesses/qry`,
            details:`${customerInformation}/icif/v1/risks/risk-assesses/`
        },
        assetDataQuery:{
            getTableData:`${assetDataQuery}/assetcenter/v1/slice/summary`,
            details:`${assetDataQuery}/assetcenter/v1/slice/group-detail`
        },
        transactionQuery:{
            getTableData:`${ess}/ess/v1/trade/tradeInfos-uop-New`,
            details:`${assetDataQuery}/` 
        }
    },
    labelApplication: {
        modelConfigurationMgmt: {
            getTableData:`${labelApplication}/icif/v1/cust-grp-mdls/mdlId/mdl-vers`,
            saveParam:`${labelApplication}/icif/v1/cust-grp-mdls`,
            update:`${labelApplication}/icif/v1/cust-grp-mdls`,
            invalidParam:`${labelApplication}/icif/v1/cust-grp-mdls`,
            versionRecord:`${labelApplication}/icif/v1/cust-grp-mdls`,
            lookVersion:`${labelApplication}/icif/v1/cust-grp-mdls`,
            lableNameParam2:`${labelApplication}/icif/v1/cust-tag-infos`,
            queryLableData:`${labelApplication}/icif/v1/cust-grp-mdls`,
            scenarioParam:`${combinationParam}/param/params`,
        },
        customerQueryOut: {
            getModelName:`${labelApplication}/icif/v1/cust-grp-mdls/leasts`,
            queryCustDaily:`${labelApplication}/icif/v1/cust-grp-mdls/exp-cust-logs`,
            lookUpParam:`${labelApplication}/icif/v1/cust-grp-mdls/exp-grp-logs`,
            scenarioParam:`${combinationParam}/param/params`,
            managerParam:`${productOpenDayMgmt}/productcenter/v1/info/funds`,
            detailsParam:`${productOpenDayMgmt}/productcenter/v1/new/query/funds`,
            customerParam:`${customerParam}/icib/v1/cust-grp-mdls`,
            takeDateParam:`${customerParam}/icib/v1/cust-grp-mdls`,
            againImport:`${customerParam}/icib/v1/cust-grp-mdls/exp-cust-logs`,
            pushParam:`${customerParam}/icib/v1/cust-grp-mdls`,
            getGroupParam:`${custGroupId}/user-group/v1/etrade-user-group/get-list`,
            getCallParam:global.envConfig.ncrm,
            clientMgmtFilePath:global.envConfig.clientMgmtFilePath || './uploadFiles',
        },
    },
    badgeManagement: {
        badgeManagement:{
            addBadge:`${labelApplication}/icif/v1/badges`,
            getTableData:`${labelApplication}/icif/v1/badges`,
            updateBadge:`${labelApplication}/icif/v1/badges/`,
            relevance:[`${labelApplication}/icif/v1/badge-grps/`,'/detail'],
            getBadgeGrpNm:`${labelApplication}/icif/v1/badges/belong-badge-grps`,
            // GET 
            getCustTagInfos:`${labelApplication}/icif/v1/cust-tag-infos`
        },
        badgeGroupManagement:{
            addBadgeGroup:`${labelApplication}/icif/v1/badge-grps`,
            getTableData:`${labelApplication}/icif/v1/badge-grps`,
            updateBadgeGrp:`${labelApplication}/icif/v1/badge-grps/`,
            delBadge:[`${labelApplication}/icif/v1/badge-grps/`,'/details/'],
            putBadgeSeqNo:[`${labelApplication}/icif/v1/badge-grps/`,'/details/'],

        }
    }
};





