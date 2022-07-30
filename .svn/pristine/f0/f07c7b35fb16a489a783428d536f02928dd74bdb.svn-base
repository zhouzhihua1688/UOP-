const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').allChannels.roles;
const currentChannel = 2;
module.exports = function (app) {
    //获取角色数据
    app.post('/authorityMgmt/messageCenter/roles/roleData.ajax', (req, res, next) => {
        let option = {
            session: req.session,
            url: apiUrlList.roleUrl,
            json: true,
            timeout: 15000
        };
        console.log('/authorityMgmt/messageCenter/roles/roleData.ajax option1:', option);
        request(option, (error, response, body) => {
            console.log('/authorityMgmt/messageCenter/roles/roleData.ajax error:', error);
            console.log('/authorityMgmt/messageCenter/roles/roleData.ajax statusCode:', response && response.statusCode);
            console.log('/authorityMgmt/messageCenter/roles/roleData.ajax roleData:', body);
            if (error) {
                console.log('error:', error);
                return res.send({error: 1, msg: '操作失败'});
            }
            if (body && body.returnCode == 0 && Array.isArray(body.body)) {
                let arr = [];
                body.body.forEach((item) => {
                    if(item.channel == currentChannel){
                        item.menuList = JSON.parse(item.menuList);
                        arr.push(item);
                    }
                });
                res.send({error: 0, msg: '获取角色列表成功', data: arr});
            }
            else if(body && body.returnCode != 9999){
                res.send({error: 1, msg: body.returnMsg});
            }
            else {
                res.send({error: 1, msg: '获取角色列表失败'});
            }
        });
    });
    //查看角色url
    app.post('/authorityMgmt/messageCenter/roles/checkTree.ajax', (req, res, next) => {
        let option = {
            session: req.session,
            url: apiUrlList.getMenuData,
            json: true,
            timeout: 15000
        };
        console.log('/authorityMgmt/messageCenter/roles/getMenuData.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/authorityMgmt/messageCenter/roles/getMenuData.ajax error:', error);
            console.log('/authorityMgmt/messageCenter/roles/getMenuData.ajax statusCode:', response && response.statusCode);
            console.log('/authorityMgmt/messageCenter/roles/getMenuData.ajax body:', body);
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
    //删除角色
    app.post('/authorityMgmt/messageCenter/roles/deleteRole.ajax', (req, res, next) => {
        let option = {
            session: req.session,
            url: apiUrlList.roleUrl,
            timeout: 15000,
            body: req.body.id,
            json: true
        };
        console.log('/authorityMgmt/messageCenter/roles/deleteRole.ajax option:', option);
        request.del(option, (error, response, body) => {
            console.log('/authorityMgmt/messageCenter/roles/deleteRole.ajax error:', error);
            console.log('/authorityMgmt/messageCenter/roles/deleteRole.ajax statusCode:', response && response.statusCode);
            console.log('/authorityMgmt/messageCenter/roles/deleteRole.ajax body:', body);
            if (error) {
                console.log('error:', error);
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body == 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                res.send({error: 0, msg: '删除成功'});
            }
            else if(result && result.returnCode != 9999){
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: 1, msg: '删除失败'});
            }
        });
    });
    //保存新建
    app.post('/authorityMgmt/messageCenter/roles/saveRole.ajax', (req, res, next) => {
        let params = {};
        req.body.name && (params.name = req.body.name);
        params.channel = currentChannel;
        req.body.menuList && (params.menuList = Array.from(new Set(JSON.parse(req.body.menuList))));
        req.body.id && (params.id = req.body.id);
        params.id ? params.updator = req.session.loginInfo.username : params.creator = req.session.loginInfo.username;
        let option = {
            session: req.session,
            url: apiUrlList.roleUrl,
            method: params.id ? 'PUT' : 'POST',
            body: params,
            timeout: 15000,
            json: true
        };
        console.log('/authorityMgmt/messageCenter/roles/saveRole.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/authorityMgmt/messageCenter/roles/saveRole.ajax error:', error);
            console.log('/authorityMgmt/messageCenter/roles/saveRole.ajax statusCode:', response && response.statusCode);
            console.log('/authorityMgmt/messageCenter/roles/saveRole.ajax body:', body);
            if (error) {
                console.log('error:', error);
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body == 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                res.send({error: 0, msg: '保存成功'});
            }
            else if(result && result.returnCode != 9999){
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: 1, msg: '保存失败'});
            }
        });
    });
};
//将menujson中的数据整理成treeview的节点数据
function formatNodes(arr) {
    let resultArr = [];
    arr.forEach((item) => {
        if(item.menuId.split('-')[0] == currentChannel){
            let listItem = {
                menuId: item.menuId,
                parentMenuId: item.parentMenuId,
                text: item.name,
                href: item.url,
                nodes: item.hasSubmenu ? [] : undefined,
                selectable: true,
                state: {
                    checked: false,
                    disabled: false,
                    expanded: true,
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
            item.nodes.push(listdata);
            return;
        }
        if (Array.isArray(item.nodes)) {
            findParent(id, item.nodes, listdata);
        }
    }
}