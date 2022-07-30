const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').activeRun.asyncWorkSetting;
module.exports = function (app) {
    //查询列表
    app.post('/marketingActive/activeRun/asyncWorkSetting/getTableData.ajax', (req, res, next) => {
        let params = {};
        req.body.actId && (params.actId = req.body.actId);
        params.pageNo = req.body.pageNo;
        params.pageSize = req.body.pageSize;
        let option = {
            pageUrl: '/marketingActive/activeRun/asyncWorkSetting/getTableData.ajax',
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
    //获取所有子任务列表
    app.post('/marketingActive/activeRun/asyncWorkSetting/getChildJobIdList.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/marketingActive/activeRun/asyncWorkSetting/getChildJobIdList.ajax',
            req,
            url: apiUrlList.getChildJobIdList,
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
            if (result.returnCode == 0 && Array.isArray(result.body.childJobList)) {
                res.send({
                    error: 0,
                    msg: '查询成功',
                    data: result.body.childJobList.map(item => {
                        return {
                            jobId: item.jobId,
                            jobDesc: item.jobDesc
                        }
                    })
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
    //获取所有活动列表
    app.post('/marketingActive/activeRun/asyncWorkSetting/getActIdList.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/marketingActive/activeRun/asyncWorkSetting/getActIdList.ajax',
            req,
            url: apiUrlList.getActIdList,
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
            if (result.returnCode == 0 && Array.isArray(result.body)) {
                res.send({
                    error: 0,
                    msg: '查询成功',
                    data: result.body.map(item => {
                        return {
                            actId: item.actId,
                            actName: item.actName
                        }
                    })
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
    //获取所有切点列表
    app.post('/marketingActive/activeRun/asyncWorkSetting/getActModuleCutinIdList.ajax', (req, res, next) => {
        let params = {};
        req.body.actId && (params.actId = req.body.actId);
        let option = {
            pageUrl: '/marketingActive/activeRun/asyncWorkSetting/getActModuleCutinIdList.ajax',
            req,
            url: apiUrlList.getActModuleCutinIdList,
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
            if (result.returnCode == 0 && Array.isArray(result.body)) {
                res.send({
                    error: 0,
                    msg: '查询成功',
                    data: result.body.map(item => {
                        return {
                            cutinPointId: item.cutinPointId,
                            cutinPointName: item.cutinPointName
                        }
                    })
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
    //根据切点ID获取处理器信息
    app.post('/marketingActive/activeRun/asyncWorkSetting/getJobHandler.ajax', (req, res, next) => {
        let params = {};
        req.body.actModuleCutinId && (params.actModuleCutinId = req.body.actModuleCutinId);
        let option = {
            pageUrl: '/marketingActive/activeRun/asyncWorkSetting/getJobHandler.ajax',
            req,
            url: apiUrlList.getJobHandler,
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
            if (result.returnCode == 0 && Array.isArray(result.body)) {
                // let jobHandler = result.body.map(item => item.jobHandler).join(',');
                res.send({
                    error: 0,
                    msg: '查询成功',
                    data: result.body
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
    //启用/禁用
    app.post('/marketingActive/activeRun/asyncWorkSetting/enable.ajax', (req, res, next) => {
        let params = {};
        params.jobId = req.body.jobId;
        params.isEnable = req.body.isEnable == 1 ? 0 : 1;
        params.modifyBy = req.session.loginInfo.username;
        let option = {
            pageUrl: '/marketingActive/activeRun/asyncWorkSetting/enable.ajax',
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
                    msg: params.isEnable == 1 ? '启用成功' : '禁用成功'
                });
            } else if (result && result.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                res.send({
                    error: 1,
                    msg: params.isEnable == 1 ? '启用成功' : '禁用成功'
                });
            }
        });
    });
    //新增
    app.post('/marketingActive/activeRun/asyncWorkSetting/add.ajax', (req, res, next) => {
        let params = {};
        params.jobDesc = req.body.jobDesc;
        params.childJobId = req.body.childJobId;
        params.actId = req.body.actId;
        params.actModuleCutinId = req.body.actModuleCutinId;
        params.isEnable = req.body.isEnable;
        params.jobCron = req.body.jobCron;
        params.jobHandler = req.body.jobHandler;
        params.modifyBy = req.session.loginInfo.username;
        let option = {
            pageUrl: '/marketingActive/activeRun/asyncWorkSetting/add.ajax',
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
    app.post('/marketingActive/activeRun/asyncWorkSetting/update.ajax', (req, res, next) => {
        let params = {};
        params.jobId = req.body.jobId;
        params.jobDesc = req.body.jobDesc;
        params.childJobId = req.body.childJobId;
        params.actId = req.body.actId;
        params.actModuleCutinId = req.body.actModuleCutinId;
        params.isEnable = req.body.isEnable;
        params.jobCron = req.body.jobCron;
        params.jobHandler = req.body.jobHandler;
        params.modifyBy = req.session.loginInfo.username;
        let option = {
            pageUrl: '/marketingActive/activeRun/asyncWorkSetting/update.ajax',
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
    app.post('/marketingActive/activeRun/asyncWorkSetting/delete.ajax', (req, res, next) => {
        let params = {};
        params.id = req.body.jobId;
        params.modifyBy = req.session.loginInfo.username;
        let option = {
            pageUrl: '/marketingActive/activeRun/asyncWorkSetting/delete.ajax',
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