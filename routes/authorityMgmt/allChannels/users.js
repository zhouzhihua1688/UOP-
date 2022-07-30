const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').allChannels.users;
module.exports = function (app) {
    //获取用户数据
    app.post('/authorityMgmt/allChannels/users/getUserInfo.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/authorityMgmt/allChannels/users/getUserInfo.ajax',
            req: req,
            url: apiUrlList.getUserInfo,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
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
                    if (item.roleList.length === 0) {
                        unDistributedUser.push(item);
                    }
                    else {
                        let roleArr = [];
                        item.roleList.forEach((item) => {
                            roleArr.push(item.name);
                        });
                        item.distributedRole = roleArr.join('，');
                        distributedUser.push(item);
                    }
                });
                resultData.distributedUser = distributedUser;
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
    app.post('/authorityMgmt/allChannels/users/getRoleInfo.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/authorityMgmt/allChannels/users/getRoleInfo.ajax',
            req: req,
            url: apiUrlList.getRoleInfo,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                console.log('error:', error);
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body == 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode === 0 && Array.isArray(result.body)) {
                let resultData = result.body;
                resultData.forEach((item) => {
                    item.check = false;
                });
                res.send({error: 0, msg: '获取角色数据成功', data: resultData});
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
    app.post('/authorityMgmt/allChannels/users/deleteUserRole.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/authorityMgmt/allChannels/users/deleteUserRole.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.deleteUserRole,
            body: JSON.parse(req.body.userIds),
            timeout: 15000,
            json: true
        };
        request.del(option, (error, response, body) => {
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
    app.post('/authorityMgmt/allChannels/users/checkTree.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/authorityMgmt/allChannels/users/checkTree.ajax',
            req: req,
            url: apiUrlList.getMenuData,
            json: true,
            timeout: 15000
        };
        request(option, (error, response, body) => {
            if (error) {
                console.log('error:', error);
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body == 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0 && Array.isArray(result.body)) {
                let menuList = req.body.menuList ? Array.from(new Set(JSON.parse(req.body.menuList))) : [];
                let treeNodeUrls = formatNodes(result.body);
                setCheckedNode(menuList, treeNodeUrls);
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
    app.post('/authorityMgmt/allChannels/users/distributeRole.ajax', (req, res, next) => {
        let params = {
            userIds: req.body.userIds ? JSON.parse(req.body.userIds) : [],
            roleIds: req.body.roleIds ? JSON.parse(req.body.roleIds) : []
        };
        let option = {
            pageUrl: '/authorityMgmt/allChannels/users/distributeRole.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.distributeRole,
            timeout: 15000,
            body: params,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                console.log('error:', error);
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body == 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode === 0) {
                res.send({error: 0, msg: '分配角色成功'});
            }
            else if(result && result.returnCode != 9999){
                res.send({error: 1, msg: result.returnMsg});
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
    });
    return resultArr;
}
//根据menuList设置选中的结点的状态
function setCheckedNode(menuList, treeNodeUrls) {
    treeNodeUrls.forEach((item) => {
        if (menuList.map(menuId => menuId.replace(/@.*/g, '')).includes(item.menuId)) {
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