const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').appMgmt;
module.exports = function (app) {
    //查询应用
    app.post('/operationMgmt/appMgmt/app/getTableData.ajax', (req, res, next) => {
        let params = {};
        req.body.searchField && (params.searchField = req.body.searchField);
        params.page = req.body.page;
        params.rows = req.body.rows;
        let option = {
            pageUrl: '/operationMgmt/appMgmt/app/getTableData.ajax',
            req: req,
            url: apiUrlList.app,
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
                let resultData = {};
                resultData.page = result.body.page;
                resultData.records = result.body.records;
                resultData.total = Math.ceil(result.body.total / req.body.rows);
                resultData.tableData = result.body.formList;
                res.send({error: 0, msg: '查询成功', data: resultData});
            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: 1, msg: '查询失败'});
            }
        });
    });
    //新增应用
    app.post('/operationMgmt/appMgmt/app/add.ajax', (req, res, next) => {
        let params = {};
        params.appAddress = req.body.appAddress;
        params.appCode = req.body.appCode;
        params.appName = req.body.appName;
        params.remark = req.body.remark;
        params.status = req.body.status;
        params.systemCode = req.body.systemCode;
        let option = {
            pageUrl: '/operationMgmt/appMgmt/app/add.ajax',
            req: req,
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.app,
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
    //修改应用
    app.post('/operationMgmt/appMgmt/app/update.ajax', (req, res, next) => {
        let params = {};
        params.id = req.body.id;
        params.appAddress = req.body.appAddress;
        params.appCode = req.body.appCode;
        params.appName = req.body.appName;
        params.remark = req.body.remark;
        params.status = req.body.status;
        params.systemCode = req.body.systemCode;
        let option = {
            pageUrl: '/operationMgmt/appMgmt/app/update.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.app,
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
    //删除应用
    app.post('/operationMgmt/appMgmt/app/delete.ajax', (req, res, next) => {
        let params = {};
        params.id = req.body.id;
        let option = {
            pageUrl: '/operationMgmt/appMgmt/app/delete.ajax',
            req: req,
            operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.app,
            qs: params,
            timeout: 15000,
            json: true
        };
        request.del(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body == 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode === 0) {
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
