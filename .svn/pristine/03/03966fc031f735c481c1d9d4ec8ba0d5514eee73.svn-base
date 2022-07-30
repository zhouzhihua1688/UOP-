const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').questionnaire.configuration;
module.exports = function (app) {
    //查询列表
    app.post('/publicConfig/questionnaire/configuration/tableData.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/publicConfig/questionnaire/configuration/tableData.ajax',
            req: req,
            // operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.tableData,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '数据获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: '数据获取成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '数据获取失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
    //查询回答列表
    app.post('/publicConfig/questionnaire/configuration/answerList.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/publicConfig/questionnaire/configuration/answerList.ajax',
            req: req,
            // operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.answerList,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '数据获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: '数据获取成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '数据获取失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
    //导出回答列表
    app.get('/publicConfig/questionnaire/configuration/exportAnswerList.ajax', (req, res, next) => {
        var params = req.query;
        let option = {
            url: apiUrlList.exportAnswerList,
            session: req.session,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/publicConfig/questionnaire/configuration/exportAnswerList.ajax option:', option);
        request(option).pipe(res);
    });
    //新增
    app.post('/publicConfig/questionnaire/configuration/add.ajax', (req, res, next) => {
        let params = req.body;
        let userId = req.session.loginInfo.userid;
        params.creator = userId;
        let option = {
            pageUrl: '/publicConfig/questionnaire/configuration/add.ajax',
            req: req,
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.add,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '数据新增失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: '数据新增成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '数据新增失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
    //修改
    app.post('/publicConfig/questionnaire/configuration/modify.ajax', (req, res, next) => {
        let params = req.body;
        let userId = req.session.loginInfo.userid;
        params.creator = userId;
        let option = {
            pageUrl: '/publicConfig/questionnaire/configuration/modify.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.modify,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '数据修改失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: '数据修改成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '数据修改失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
    //发布
    app.post('/publicConfig/questionnaire/configuration/issue.ajax', (req, res, next) => {
        let params = req.body;
        let userId = req.session.loginInfo.userid;
        params.creator = userId;
        let option = {
            pageUrl: '/publicConfig/questionnaire/configuration/issue.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.issue,
            qs: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '发布失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: '发布成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '发布失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
    //暂停
    app.post('/publicConfig/questionnaire/configuration/stop.ajax', (req, res, next) => {
        let params = req.body;
        let userId = req.session.loginInfo.userid;
        params.creator = userId;
        let option = {
            pageUrl: '/publicConfig/questionnaire/configuration/stop.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.stop,
            qs: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '暂停失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: '暂停成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '暂停失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
    //查询单个问卷
    app.post('/publicConfig/questionnaire/configuration/singleSurvey.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/publicConfig/questionnaire/configuration/singleSurvey.ajax',
            req: req,
            // operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.singleSurvey,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '数据查询失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: '数据查询成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '数据查询失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
};