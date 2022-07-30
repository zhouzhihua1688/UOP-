//权限管理接口总配置
let authorityMgmt = '';

if (global.envConfig.authorityMgmt) {
    authorityMgmt = global.envConfig.authorityMgmt;
} else {
    authorityMgmt = global.envConfig.inner_gateway;
}

module.exports = {
    allChannels:{
        menus:{
            upload: authorityMgmt + '/inner-uaa/v1/menu',
        },
        roles:{
            getMenuData: authorityMgmt + '/inner-uaa/v1/menu',
            roleUrl: authorityMgmt + '/inner-uaa/v1/role'
        },
        users:{
            getMenuData: authorityMgmt + '/inner-uaa/v1/menu',
            getUserInfo: authorityMgmt + '/inner-uaa/v1/user/list',
            getRoleInfo: authorityMgmt + '/inner-uaa/v1/role',
            deleteUserRole: authorityMgmt + '/inner-uaa/v1/user_app_role',
            deleteChannelUserRole: authorityMgmt + '/inner-uaa/v1/user_app_role/delByUserIdAppId',
            distributeRole: authorityMgmt + '/inner-uaa/v1/user_app_role',
            distributeRoleByChannel: authorityMgmt + '/inner-uaa/v1/user_app_role/addByAppId'
        }
    }
};
