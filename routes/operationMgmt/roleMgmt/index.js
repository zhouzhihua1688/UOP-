const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').roleMgmt;
module.exports = function (app) {
    //获取所有资源列表
    app.post('/operationMgmt/roleMgmt/role/getResourceList.ajax', (req, res, next) => {
        let params = {};
        params.clientId = req.body.clientId;
        let option = {
            pageUrl: '/operationMgmt/roleMgmt/role/getResourceList.ajax',
            req: req,
            url: apiUrlList.getResourceList,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0 && Array.isArray(result.body)) {
                let appList = [];
                result.body.forEach((item) => {
                    appList.push(item.appId);
                });
                let resourceList = formatTree(result.body);
                if (JSON.parse(req.body.resourceIds).length > 0) {
                    resourceList = selectedTree(JSON.parse(req.body.resourceIds), resourceList);
                }
                res.send({error: 0, msg: '查询成功', data: {appList, resourceList}});
            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: 1, msg: '查询失败'});
            }
        });
    });
    //获取所有客户端列表
    app.post('/operationMgmt/roleMgmt/role/getAllClient.ajax', (req, res, next) => {
        let params = {};
        params.page = 1;
        params.rows = 999999;
        let option = {
            pageUrl: '/operationMgmt/roleMgmt/role/getAllClient.ajax',
            req: req,
            url: apiUrlList.client,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0 && Array.isArray(result.body.formList)) {
                let resultArr = [];
                result.body.formList.forEach((item) => {
                    resultArr.push(item.clientId);
                });
                res.send({error: 0, msg: '查询成功', data: resultArr});
            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: 1, msg: '查询失败'});
            }
        });
    });
    //获取所有客户端角色
    app.post('/operationMgmt/roleMgmt/role/getRoleList.ajax', (req, res, next) => {
        let params = {};
        params.clientId = req.body.clientId;
        let option = {
            pageUrl: '/operationMgmt/roleMgmt/role/getRoleList.ajax',
            req: req,
            url: apiUrlList.getRoleList,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0 && Array.isArray(result.body)) {
                res.send({error: 0, msg: '查询成功', data: result.body});
            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: 1, msg: '查询失败'});
            }
        });
    });
    //获取所有角色对应资源
    app.post('/operationMgmt/roleMgmt/role/getRoleResource.ajax', (req, res, next) => {
        let params = {};
        params.roleId = req.body.roleId;
        let option = {
            pageUrl: '/operationMgmt/roleMgmt/role/getRoleResource.ajax',
            req: req,
            url: apiUrlList.getRoleResource,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0 && Array.isArray(result.body)) {
                let resultArr = [];
                result.body.forEach((item) => {
                    resultArr.push(item.id);
                });
                res.send({error: 0, msg: '查询成功', data: resultArr});
            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: 1, msg: '查询失败'});
            }
        });
    });
    //添加角色
    app.post('/operationMgmt/roleMgmt/role/add.ajax', (req, res, next) => {
        let params = {};
        params.roleName = req.body.roleName;
        params.roleCode = req.body.roleName;
        params.clientId = req.body.clientId;
        params.permissionCode = '';
        params.remark = '';
        params.status = '';
        params.resourceIds = Array.from(new Set(JSON.parse(req.body.resourceIds)));
        let option = {
            pageUrl: '/operationMgmt/roleMgmt/role/add.ajax',
            req: req,
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.role,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0) {
                res.send({error: 0, msg: '添加成功'});
            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: 1, msg: '添加失败'});
            }
        });
    });
    //修改角色
    app.post('/operationMgmt/roleMgmt/role/update.ajax', (req, res, next) => {
        let params = {};
        params.id = req.body.id;
        params.roleName = req.body.roleName;
        params.roleCode = req.body.roleName;
        params.clientId = req.body.clientId;
        params.permissionCode = '';
        params.remark = '';
        params.status = '';
        params.resourceIds = Array.from(new Set(JSON.parse(req.body.resourceIds)));
        let option = {
            pageUrl: '/operationMgmt/roleMgmt/role/update.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.role,
            body: params,
            timeout: 15000,
            json: true
        };
        request.put(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0) {
                res.send({error: 0, msg: '修改成功'});
            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: 1, msg: '修改失败'});
            }
        });
    });
    //删除角色
    app.post('/operationMgmt/roleMgmt/role/del.ajax', (req, res, next) => {
        let params = {};
        params.ids = req.body.ids;
        let option = {
            pageUrl: '/operationMgmt/roleMgmt/role/del.ajax',
            req: req,
            operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.role,
            qs: params,
            timeout: 15000,
            json: true
        };
        request.del(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0) {
                res.send({error: 0, msg: '删除成功'});
            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: 1, msg: '删除失败'});
            }
        });
    });
};
function formatTree(arr) {
    let resultArr = [];
    arr.forEach((item) => {
        let parentNode = {
            menuId: item.appId + '-app',
            parentMenuId: '',
            text: item.appName,
            href: '',
            nodes: [],
            selectable: true,
            state: {
                checked: false,
                disabled: false,
                expanded: false,
                selected: false
            }
        };
        if (item.uaaAppResourceDtoList.length > 0) {
            item.uaaAppResourceDtoList.forEach((childItem) => {
                let childNode = {
                    menuId: childItem.id,
                    parentMenuId: childItem.appId,
                    parentMenuName: parentNode.text,
                    text: `${childItem.defaultUrl}  (${childItem.method.toUpperCase()})`,
                    href: childItem.defaultUrl,
                    selectable: true,
                    state: {
                        checked: false,
                        disabled: false,
                        expanded: false,
                        selected: false
                    }
                };
                parentNode.nodes.push(childNode);
            });
        }
        parentNode.tags = ['资源总数量: ' + parentNode.nodes.length];
        resultArr.push(parentNode);
    });
    return resultArr;
}
function selectedTree(ids, list) {
    list.forEach((item) => {
        item.nodes.forEach((childItem) => {
            if (ids.includes(childItem.menuId)) {
                item.state.expanded = true;
                childItem.state.selected = true;
            }
        });
        if (item.nodes.length > 0 && item.nodes.every(childItem => childItem.state.selected)) {
            item.state.expanded = false;
            item.state.selected = true;
        }
    });
    return list;
}