module.exports = [
    {
        "menuId": "3",
        "parentMenuId": "",
        "hasSubmenu": true,
        "type": "2",
        "name": "权限管理",
        "url": "/authorityMgmt"
    },
    {
        "menuId": "3-1",
        "parentMenuId": "3",
        "hasSubmenu": true,
        "type": "2",
        "page": false,
        "name": "所有频道",
        "url": "/authorityMgmt/allChannels"
    },
    {
        "menuId": "3-1-1",
        "parentMenuId": "3-1",
        "hasSubmenu": false,
        "type": "2",
        "page": true,
        "name": "用户管理",
        "url": "/authorityMgmt/allChannels/users.html"
    },
    {
        "menuId": "3-1-2",
        "parentMenuId": "3-1",
        "hasSubmenu": false,
        "type": "2",
        "page": true,
        "name": "角色管理",
        "url": "/authorityMgmt/allChannels/roles.html"
    },
    {
        "menuId": "3-1-3",
        "parentMenuId": "3-1",
        "hasSubmenu": false,
        "type": "2",
        "page": true,
        "name": "菜单管理",
        "url": "/authorityMgmt/allChannels/menus.html"
    },
    {
        "menuId": "3-2",
        "parentMenuId": "3",
        "hasSubmenu": true,
        "type": "2",
        "page": false,
        "name": "三方运营",
        "url": "/authorityMgmt/thirdPartyOperation"
    },
    {
        "menuId": "3-2-1",
        "parentMenuId": "3-2",
        "hasSubmenu": false,
        "type": "2",
        "page": true,
        "name": "用户管理",
        "url": "/authorityMgmt/thirdPartyOperation/users.html"
    },
    {
        "menuId": "3-2-2",
        "parentMenuId": "3-2",
        "hasSubmenu": false,
        "type": "2",
        "page": true,
        "name": "角色管理",
        "url": "/authorityMgmt/thirdPartyOperation/roles.html"
    },
    {
        "menuId": "3-3",
        "parentMenuId": "3",
        "hasSubmenu": true,
        "type": "2",
        "page": false,
        "name": "消息中心",
        "url": "/authorityMgmt/messageCenter"
    },
    {
        "menuId": "3-3-1",
        "parentMenuId": "3-3",
        "hasSubmenu": false,
        "type": "2",
        "page": true,
        "name": "用户管理",
        "url": "/authorityMgmt/messageCenter/users.html"
    },
    {
        "menuId": "3-3-2",
        "parentMenuId": "3-3",
        "hasSubmenu": false,
        "type": "2",
        "page": true,
        "name": "角色管理",
        "url": "/authorityMgmt/messageCenter/roles.html"
    },
    {
        "menuId": "3-4",
        "parentMenuId": "3",
        "hasSubmenu": true,
        "type": "2",
        "page": false,
        "name": "公共配置",
        "url": "/authorityMgmt/publicConfig"
    },
    {
        "menuId": "3-4-1",
        "parentMenuId": "3-4",
        "hasSubmenu": false,
        "type": "2",
        "page": true,
        "name": "用户管理",
        "url": "/authorityMgmt/publicConfig/users.html"
    },
    {
        "menuId": "3-4-2",
        "parentMenuId": "3-4",
        "hasSubmenu": false,
        "type": "2",
        "page": true,
        "name": "角色管理",
        "url": "/authorityMgmt/publicConfig/roles.html"
    }
];
