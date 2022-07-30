const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').activeRun.asyncNodeSetting;
module.exports = function (app) {
    //查询列表
    app.post('/marketingActive/activeRun/asyncNodeSetting/getTableData.ajax', (req, res, next) => {
        let params = {};
        req.body.actModuleCutinId && (params.actModuleCutinId = req.body.actModuleCutinId);
        params.pageNo = req.body.pageNo;
        params.pageSize = req.body.pageSize;
        let option = {
            pageUrl: '/marketingActive/activeRun/asyncNodeSetting/getTableData.ajax',
            req,
            url: apiUrlList.getTable,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '操作失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0 && Array.isArray(result.body.rows)) {
                let resultData = {};
                resultData.page = result.body.pageNum;
                resultData.total = result.body.pages;
                resultData.tableData = result.body.rows;
                res.send({
                    error: 0,
                    msg: '查询成功',
                    data: resultData
                });
            } else if (result && result.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                res.send({
                    error: 1,
                    msg: '查询失败'
                });
            }
        });
    });
    //新增
    app.post('/marketingActive/activeRun/asyncNodeSetting/add.ajax', (req, res, next) => {
        let params = {};
        params.jobHandlerDesc = req.body.jobHandlerDesc;
        params.jobHandler = req.body.jobHandler;
        params.actModuleCutinId = req.body.actModuleCutinId;
        params.modifyBy = req.session.loginInfo.username;
        let option = {
            pageUrl: '/marketingActive/activeRun/asyncNodeSetting/add.ajax',
            req,
            url: apiUrlList.add,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '操作失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: '添加成功'
                });
            } else if (result && result.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                res.send({
                    error: 1,
                    msg: '添加失败'
                });
            }
        });
    });
    //修改
    app.post('/marketingActive/activeRun/asyncNodeSetting/update.ajax', (req, res, next) => {
        let params = {};
        params.jobHandler = req.body.jobHandler;
        params.jobHandlerDesc = req.body.jobHandlerDesc;
        params.actModuleCutinId = req.body.actModuleCutinId;
        params.modifyBy = req.session.loginInfo.username;
        let option = {
            pageUrl: '/marketingActive/activeRun/asyncNodeSetting/update.ajax',
            req,
            url: apiUrlList.update,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '操作失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: '修改成功'
                });
            } else if (result && result.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                res.send({
                    error: 1,
                    msg: '修改失败'
                });
            }
        });
    });
    //删除
    app.post('/marketingActive/activeRun/asyncNodeSetting/delete.ajax', (req, res, next) => {
        let params = {};
        params.jobHandler = req.body.jobHandler;
        let option = {
            pageUrl: '/marketingActive/activeRun/asyncNodeSetting/delete.ajax',
            req,
            url: apiUrlList.del,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '操作失败'
                });
            }
            let result = typeof body == 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode === 0) {
                res.send({
                    error: 0,
                    msg: '删除成功'
                });
            } else if (result && result.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                res.send({
                    error: 1,
                    msg: '删除失败'
                });
            }
        });
    });
};