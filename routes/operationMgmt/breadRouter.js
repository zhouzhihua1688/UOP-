module.exports = {
    index:{
        name:'运营管理'
    },
    userMgmt:{
        name:'用户管理',
        child:{
            user: '用户',
            role:'用户角色'
        }
    },
    appMgmt:{
        name:'应用管理',
        child:{
            client: '客户端',
            app:'应用'
        }
    },
    resourceMgmt:{
        name:'资源管理',
        child:{
            resource: '资源'
        }
    },
    roleMgmt:{
        name:'角色管理',
        child:{
            role: '角色'
        }
    },
    channelMgmt:{
        name:'渠道管理',
        child:{
            externalChannel: '外部渠道管理'
        }
    },
    usedLink:{
        name:'已使用链接',
        child:{
            linkQuery: '已使用链接查询'
        }
    }
};
