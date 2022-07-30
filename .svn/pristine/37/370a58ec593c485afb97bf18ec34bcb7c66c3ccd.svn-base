//运维管理接口总配置
let operatiomMgmt = global.envConfig.operationMgmt ? global.envConfig.operationMgmt : global.envConfig.inner_gateway;
let channelMgmt = global.envConfig.channelMgmt ? global.envConfig.channelMgmt : global.envConfig.inner_gateway;
module.exports = {
    userMgmt: {
        getUserInfo: operatiomMgmt + '/inner-uaa/v1/user/uaaUserList',
        userAdd: operatiomMgmt + '/inner-uaa/v1/user',
        userDelete: operatiomMgmt + '/inner-uaa/v1/user',
        getRoleList: operatiomMgmt + '/inner-uaa/v1/admin/role/client-roles',
        addRole: operatiomMgmt + '/inner-uaa/v1/admin/user_app_role',
        userEdit: operatiomMgmt + '/inner-uaa/v1/user'
    },
    appMgmt: {
        client: operatiomMgmt + '/inner-uaa/v1/admin/client',
        app: operatiomMgmt + '/inner-uaa/v1/admin/app',
        checkApp: operatiomMgmt + '/inner-uaa/v1/admin/client-app'
    },
    resourceMgmt: {
        app: operatiomMgmt + '/inner-uaa/v1/admin/app',
        uploadText: operatiomMgmt + '/inner-uaa/v1/admin/manager/swagger-text-import',
        uploadFile: operatiomMgmt + '/inner-uaa/v1/admin/manager/swagger-file-import',
        resource: operatiomMgmt + '/inner-uaa/v1/admin/app-resource'
    },
    roleMgmt: {
        role: operatiomMgmt + '/inner-uaa/v1/admin/role',
        getRoleList: operatiomMgmt + '/inner-uaa/v1/admin/role/client-roles',
        getRoleResource: operatiomMgmt + '/inner-uaa/v1/admin/app-resource/roleResources',
        client: operatiomMgmt + '/inner-uaa/v1/admin/client',
        getResourceList: operatiomMgmt + '/inner-uaa/v1/admin/app-resource/clientResources'
    },
    channelMgmt: {
        getTableData:channelMgmt+'/common-services/v1/channel/list',
        getSingleData:channelMgmt+'/common-services/v1/channel',
        update:channelMgmt+'/common-services/v1/channel',
        saveParam:channelMgmt+'/common-services/v1/channel',
        deleteParam:channelMgmt+'/common-services/v1/channel',
    },
    usedLink: {
        linkQuery: {

        }
    }
};