//用户登录接口总配置
let authorityMgmt = '';

if (global.envConfig.authorityMgmt) {
    authorityMgmt = global.envConfig.authorityMgmt;
} else{
    authorityMgmt = global.envConfig.inner_gateway;
}

let resetMgmt='';
if(global.envConfig.resetPwd){
    resetMgmt = global.envConfig.resetPwd;
} else {
    resetMgmt = global.envConfig.inner_gateway;
}
module.exports = {
    redisCluster: global.envConfig.redisCluster, 
    user:{
        captcha: authorityMgmt + '/inner-uaa/v1/manager/patchca',
        // login: authorityMgmt + '/uaa/user/login'
        login: authorityMgmt + '/inner-uaa/v1/oauth/token',
        resetPwd:resetMgmt+'/inner-uaa/v1/user/password'
    },
    clientId: global.envConfig.inner_uaa.clientId,
    clientSecret: global.envConfig.inner_uaa.clientSecret,
    grant_type: global.envConfig.inner_uaa.grant_type,
    grant_type_cas: global.envConfig.inner_uaa.grant_type_cas,
    scope: global.envConfig.inner_uaa.scope,
    scope_cas: global.envConfig.inner_uaa.scope_cas,
    casAddress: global.envConfig.inner_uaa.casAddress,
    Authorization: global.envConfig.inner_uaa.Authorization,
};
