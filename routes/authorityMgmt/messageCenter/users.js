const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').allChannels.users;
const currentChannel = 2;
module.exports = function (app) {
    //获取用户数据
    app.post('/authorityMgmt/messageCenter/users/getUserInfo.ajax', (req, res, next) => {
        let option = {
            session: req.session,
            url: apiUrlList.getUserInfo,
            timeout: 15000,
            json: true
        };
        console.log('/authorityMgmt/messageCenter/users/getUserInfo.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/authorityMgmt/messageCenter/users/getUserInfo.ajax error:', error);
            console.log('/authorityMgmt/messageCenter/users/getUserInfo.ajax statusCode:', response && response.statusCode);
            console.log('/authorityMgmt/messageCenter/users/getUserInfo.ajax body:', body);
            if (error) {
                console.log('error:', error);
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body == 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode === 0 && Array.isArray(result.body)) {
                let resultData = {};
                let distributedUser = [];
                let unDistributedUser = [];
                result.body.forEach((item) => {
                    item.check = false;
                    if (noChannelRole(item.roleList)) {
                        unDistributedUser.push(item);
                    }
                    else {
                        let roleArr = [];
                        item.roleList.forEach((item) => {
                            if (item.name.split('|')[0] == '消息中心') {
                                roleArr.push(item.name);
                            }
                        });
                        item.distributedRole = roleArr.join('，');
                        distributedUser.push(item);
                    }
                });
                let distributedUserArr = [];
                distributedUser.forEach((item) => {
                    if (hasChannel(item)) {
                        distributedUserArr.push(item);
                    }
                });
                resultData.distributedUser = distributedUserArr;
                resultData.unDistributedUser = unDistributedUser;
                res.send({error: 0, msg: '获取用户数据成功', data: resultData});
            }
            else if(result && result.returnCode != 9999){
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: 1, msg: '获取用户数据失败'});
            }
        });
    });
    //获取角色数据
    app.post('/authorityMgmt/messageCenter/users/getRoleInfo.ajax', (req, res, next) => {
        let option = {
            session: req.session,
            url: apiUrlList.getRoleInfo,
            timeout: 15000,
            json: true
        };
        console.log('/authorityMgmt/messageCenter/users/getRoleInfo.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/authorityMgmt/messageCenter/users/getRoleInfo.ajax error:', error);
            console.log('/authorityMgmt/messageCenter/users/getRoleInfo.ajax statusCode:', response && response.statusCode);
            console.log('/authorityMgmt/messageCenter/users/getRoleInfo.ajax body:', body);
            if (error) {
                console.log('error:', error);
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body == 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode === 0 && Array.isArray(result.body)) {
                let arr = [];
                result.body.forEach((item) => {
                    if (item.channel == currentChannel) {
                        item.check = false;
                        item.menuList = JSON.parse(item.menuList);
                        arr.push(item);
                    }
                });
                res.send({error: 0, msg: '获取角色数据成功', data: arr});
            }
            else if(result && result.returnCode != 9999){
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: 1, msg: '获取角色数据失败', data: []});
            }
        });
    });
    //删除用户的角色
    app.post('/authorityMgmt/messageCenter/users/deleteUserRole.ajax', (req, res, next) => {
        let params = {};
        req.body.userIds && (params.userIds = JSON.parse(req.body.userIds));
        req.body.appId && (params.appId = Number(req.body.appId));
        let option = {
            session: req.session,
            url: apiUrlList.deleteChannelUserRole,
            body: params.userIds,
            qs: {appId: params.appId},
            timeout: 15000,
            json: true
        };
        console.log('/authorityMgmt/messageCenter/users/deleteUserRole.ajax option:', option);
        request.del(option, (error, response, body) => {
            console.log('/authorityMgmt/messageCenter/users/deleteUserRole.ajax error:', error);
            console.log('/authorityMgmt/messageCenter/users/deleteUserRole.ajax statusCode:', response && response.statusCode);
            console.log('/authorityMgmt/messageCenter/users/deleteUserRole.ajax body:', body);
            if (error) {
                console.log('error:', error);
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body == 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode === 0) {
                res.send({error: 0, msg: '删除角色成功'});
            }
            else if(result && result.returnCode != 9999){
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: 1, msg: '删除角色失败'});
            }
        });
    });
    //查看角色url
    app.post('/authorityMgmt/messageCenter/users/checkTree.ajax', (req, res, next) => {
        let option = {
            session: req.session,
            url: apiUrlList.getMenuData,
            json: true,
            timeout: 15000
        };
        console.log('/authorityMgmt/messageCenter/users/getMenuData.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/authorityMgmt/messageCenter/users/getMenuData.ajax error:', error);
            console.log('/authorityMgmt/messageCenter/users/getMenuData.ajax statusCode:', response && response.statusCode);
            console.log('/authorityMgmt/messageCenter/users/getMenuData.ajax body:', body);
            if (error) {
                console.log('error:', error);
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body == 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0 && Array.isArray(result.body)) {
                let menuList = req.body.menuList ? JSON.parse(req.body.menuList) : [];
                let treeNodeUrls = formatNodes(result.body);
                if (menuList.length > 0) {
                    setCheckedNode(menuList, treeNodeUrls);
                }
                let treeData = makeTree(treeNodeUrls);
                res.send({error: 0, msg: '调用成功', data: treeData});
            }
            else if(result && result.returnCode != 9999){
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: 1, msg: '获取菜单数据失败'});
            }
        });
    });
    //分配角色权限
    app.post('/authorityMgmt/messageCenter/users/distributeRole.ajax', (req, res, next) => {
        let params = {
            userIds: req.body.userIds ? JSON.parse(req.body.userIds) : [],
            roleIds: req.body.roleIds ? Array.from(new Set(JSON.parse(req.body.roleIds))) : []
        };
        let option = {
            session: req.session,
            url: apiUrlList.distributeRoleByChannel,
            timeout: 15000,
            body: params,
            qs: {appCode: req.body.channel ? req.body.channel : ''},
            json: true
        };
        console.log('/authorityMgmt/messageCenter/users/distributeRole.ajax option:', option);
        request.post(option, (error, response, body) => {
            console.log('/authorityMgmt/messageCenter/users/distributeRole.ajax error:', error);
            console.log('/authorityMgmt/messageCenter/users/distributeRole.ajax statusCode:', response && response.statusCode);
            console.log('/authorityMgmt/messageCenter/users/distributeRole.ajax result:', body);
            if (error) {
                console.log('error:', error);
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body == 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode === 0) {
                res.send({error: 0, msg: '分配角色成功'});
            }
            else {
                res.send({error: 1, msg: '分配角色失败'});
            }
        });
    });
};
//将menujson中的数据整理成treeview的节点数据
function formatNodes(arr) {
    let resultArr = [];
    arr.forEach((item) => {
        if (item.menuId.split('-')[0] == currentChannel) {
            let listItem = {
                menuId: item.menuId,
                parentMenuId: item.parentMenuId,
                text: item.name,
                href: item.url,
                nodes: item.hasSubmenu ? [] : undefined,
                selectable: true,
                state: {
                    checked: false,
                    disabled: true,
                    expanded: false,
                    selected: false
                }
            };
            resultArr.push(listItem);
        }
    });
    return resultArr;
}
//根据menuList设置选中的结点的状态
function setCheckedNode(menuList, treeNodeUrls) {
    treeNodeUrls.forEach((item) => {
        if (menuList.indexOf(item.menuId.toString()) > -1) {
            item.state.checked = true;
            item.state.disabled = false;
            item.state.expanded = true;
            item.state.selected = true;
        }
    });
}
//将一维数组整理成树结构
function makeTree(arr) {
    let list = [];
    arr.forEach((item) => {
        if (!item.parentMenuId) {
            list.push(item);
        }
    });
    arr.forEach((item) => {
        if (/^\d*-\d*$/g.test(item.menuId)) {
            findParent(item.parentMenuId, list, item);
        }
    });
    arr.forEach((item) => {
        if (/^\d*-\d*-\d*$/g.test(item.menuId)) {
            findParent(item.parentMenuId, list, item);
        }
    });
    arr.forEach((item) => {
        if (/^\d*-\d*-\d*-\d*$/g.test(item.menuId)) {
            findParent(item.parentMenuId, list, item);
        }
    });
    return list;
}
//递归寻找父节点
function findParent(id, arr, listdata) {
    for (let item of arr) {
        if (item.menuId == id) {
            item['nodes'].push(listdata);
            return;
        }
        if (Array.isArray(item.nodes)) {
            findParent(id, item.nodes, listdata);
        }
    }
}
function noChannelRole(roleList) {
    for (let item of roleList) {
        let arr = JSON.parse(item.menuList);
        for (let url of arr) {
            if (url.split('-')[0] == currentChannel) {
                return false;
            }
        }
    }
    return true;
}
function hasChannel(obj) {
    for (let item of obj.roleList) {
        let arr = JSON.parse(item.menuList);
        for (let url of arr) {
            if (url.split('-')[0] == currentChannel) {
                return true;
            }
        }
    }
    return false;
}