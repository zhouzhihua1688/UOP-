const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').socialMgmt.parameterMgmt;
module.exports = function (app) {
    // 获取初始数据和查询
    app.post('/messageCenter/socialMgmt/parameterMgmt/getTableData.ajax', (req, res, next) => {
        let params = {};
        req.body.pageNo && (params.pageNo = req.body.pageNo);
        req.body.pageSize && (params.pageSize = req.body.pageSize);
        let option = {
            pageUrl: '/messageCenter/socialMgmt/parameterMgmt/getTableData.ajax',
            req: req,
            url: apiUrlList.getTableData,
            qs: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '查询失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0 && Array.isArray(result.body.rows)) {
                let resultData = {};
                // resultData.pageNo = result.body.pageNo; //页数
                resultData.pageNum = result.body.pageNum; //页数
                resultData.totalSize = Math.ceil(result.body.total / req.body.pageSize);//总页数d;//总页数
                resultData.tableData = result.body.rows;
                return res.send({error: 0, msg: '查询成功', data: resultData});
            }
            else if (result && result.returnCode != 9999) {
                return res.send({error: 1, msg: result.returnMsg});
            }
            else {
                return res.send({error: 1, msg: '查询失败'});
            }
        });

    });
    //新增数据
    app.post('/messageCenter/socialMgmt/parameterMgmt/saveParam.ajax', (req, res, next) => {
        let params = {};
        params.configName = req.body.configName;
        params.configValue = req.body.configValue;
        let option = {
            pageUrl: '/messageCenter/socialMgmt/parameterMgmt/saveParam.ajax',
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
                    msg: '保存失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                return res.send({error: 0, msg: '保存成功'});
            }
            else if (result && result.returnCode != 9999) {
                return res.send({error: 1, msg: result.returnMsg});
            }
            else {
                return res.send({error: 1, msg: '保存失败'});
            }
        });
    });
    //修改数据
    app.post('/messageCenter/socialMgmt/parameterMgmt/update.ajax', (req, res, next) => {
        let params = {};
        params.configId = req.body.configId;
        params.configName = req.body.configName;
        params.configValue = req.body.configValue;
        let option = {
            pageUrl: '/messageCenter/socialMgmt/parameterMgmt/update.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.update,
            body: params,
            timeout: 15000,
            json: true
        };
        request.put(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '修改失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                return res.send({error: 0, msg: '修改成功'});
            }
            else if (result && result.returnCode != 9999) {
                return res.send({error: 1, msg: result.returnMsg});
            }
            else {
                return res.send({error: 1, msg: '修改失败'});
            }
        });
    });
    //删除数据
    app.post('/messageCenter/socialMgmt/parameterMgmt/deleteParam.ajax', (req, res, next) => {
        let params = {};
        params.configId = req.body.configId;
        let option = {
            pageUrl: '/messageCenter/socialMgmt/parameterMgmt/deleteParam.ajax',
            req: req,
            operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.deleteParam,
            qs: params,
            timeout: 15000,
            json: true
        };
        request.del(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '删除失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                return res.send({error: 0, msg: '删除成功'});
            }
            else if (result && result.returnCode != 9999) {
                return res.send({error: 1, msg: result.returnMsg});
            }
            else {
                return res.send({error: 1, msg: '删除失败'});
            }
        });
    });
};

