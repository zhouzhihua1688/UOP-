const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').blackListMgmt.unsubscribeQuery;
module.exports = function (app) {
    // 获取初始数据和查询
    app.post('/messageCenter/blackListMgmt/unsubscribeQuery/getTableData.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/messageCenter/blackListMgmt/unsubscribeQuery/getTableData.ajax',
            req: req,
            url: apiUrlList.getTableData,
            timeout: 15000,
            json: true
        };
        request.get(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '查询失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.code == 0 && Array.isArray(result.body)) {
                return res.send({
                    error: 0,
                    msg: '查询成功',
                    data: result.body
                });
            } else if (result && result.code != 9999) {
                return res.send({
                    error: 1,
                    msg: result.msg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '查询失败'
                });
            }
        });

    });
    // 获取新增列表数据
    app.post('/messageCenter/blackListMgmt/unsubscribeQuery/getAddList.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/messageCenter/blackListMgmt/unsubscribeQuery/getAddList.ajax',
            req: req,
            url: apiUrlList.queryAddList,
            timeout: 15000,
            json: true
        };
        request.get(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '查询失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0 && Array.isArray(result.body)) {
                return res.send({
                    error: 0,
                    msg: '查询成功',
                    data: result.body.map(item => {
                        return {
                            categoryId: item.categoryId,
                            categoryName: item.categoryName
                        };
                    })
                });
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.msg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '查询失败'
                });
            }
        });

    });
    // 新增
    app.post('/messageCenter/blackListMgmt/unsubscribeQuery/saveParam.ajax', (req, res, next) => {
        let params = {};
        params.categoryId = req.body.categoryId;
        params.phoneNum = req.body.phoneNum;
        let option = {
            pageUrl: '/messageCenter/blackListMgmt/unsubscribeQuery/saveParam.ajax',
            req: req,
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.saveParam,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.code == 0) {
                return res.send({
                    error: 0,
                    msg: '保存成功'
                });
            } else if (result && result.code != 9999) {
                return res.send({
                    error: 1,
                    msg: result.msg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '保存失败'
                });
            }
        });
    });
    //删除数据
    app.post('/messageCenter/blackListMgmt/unsubscribeQuery/deleteParam.ajax', (req, res, next) => {
        let params = {};
        params.id = req.body.id;
        let option = {
            pageUrl: '/messageCenter/blackListMgmt/unsubscribeQuery/deleteParam.ajax',
            req: req,
            operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.deleteParam,
            qs: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '删除失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                return res.send({
                    error: 0,
                    msg: '删除成功'
                });
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.msg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '删除失败'
                });
            }
        });
    });
};