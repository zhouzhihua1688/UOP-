const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').allChannels.menus;
module.exports = function (app) {
    //读取本地json数据
    app.post('/authorityMgmt/allChannels/menus/menuData.ajax', (req, res, next) => {
        let result = [];
        try {
            result = require('../../../local_data/authorityMgmt/menu.js');
        } catch (error) {
            console.log('/authorityMgmt/allChannels/menus/menuData.ajax error=', error);
        }
        console.log('读取本地json数据:', result);
        if (result.length > 0) {
            result = formatData(result);
            res.send({error: 0, msg: '获取菜单数据成功', data: result});
        }
        else {
            res.send({error: 1, msg: '获取菜单数据失败'});
        }
    });
    //更新
    app.post('/authorityMgmt/allChannels/menus/update.ajax', (req, res, next) => {
        let result = [];
        try {
            result = require('../../../local_data/authorityMgmt/menu.js');
        } catch (error) {
            console.log('/authorityMgmt/allChannels/menus/update.ajax error:', error.message);
            return res.send({error: 1, msg: '读取本地menu文件失败', data: null});
        }
        result.forEach((item) => {
            item.creator = req.session['loginInfo'].username;
        });
        let option = {
            pageUrl: '/authorityMgmt/allChannels/menus/update.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.upload,
            body: result,
            json: true,
            timeout: 15000
        };
        request.post(option, (error, response, body) => {
            if (error) {
                console.log('error:', error);
                return res.send({error: 1, msg: '操作失败'});
            }
            if (body && body.returnCode == 0) {
                res.send({error: 0, msg: '上传成功'});
            }
            else if (body && body.returnCode != 9999) {
                res.send({error: 0, msg: body.returnMsg});
            }
            else {
                res.send({error: 1, msg: '上传失败'});
            }
        });
    });
};
function formatData(arr) {
    let list = [];
    if (Array.isArray(arr)) {
        arr.forEach((item) => {
            let listItem = {
                menuId: item.menuId,
                parentMenuId: item.parentMenuId,
                text: item.name,
                href: item.url,
                nodes: item.hasSubmenu ? [] : undefined,
                state: {
                    checked: false,
                    disabled: false,
                    expanded: false,
                    selected: false
                }
            };
            if (item.parentMenuId) {
                findParent(item.parentMenuId, list, listItem);
            }
            else {
                list.push(listItem);
            }
        });
    }
    return list;
}
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