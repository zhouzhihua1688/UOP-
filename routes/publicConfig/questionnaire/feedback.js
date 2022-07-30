const request = require('../../../local_data/requestWrapper');
const obs = require('./../../../local_data/request_obs');
const apiUrlList = require('../apiConfig').questionnaire.feedback;
module.exports = function (app) {
    //查询列表
    app.post('/publicConfig/questionnaire/feedback/tableData.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/publicConfig/questionnaire/feedback/tableData.ajax',
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

                if(result.body && result.body instanceof Array){
                    result.body = result.body.filter((item)=>{
                        return item.surveySceneCode==='SV000004';
                    })
                }

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
    app.post('/publicConfig/questionnaire/feedback/answerList.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/publicConfig/questionnaire/feedback/answerList.ajax',
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
    app.get('/publicConfig/questionnaire/feedback/exportAnswerList.ajax', (req, res, next) => {
        var params = req.query;
        let option = {
            url: apiUrlList.exportAnswerList,
            session: req.session,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/publicConfig/questionnaire/feedback/exportAnswerList.ajax option:', option);
        request(option).pipe(res);
    });
    //新增
    app.post('/publicConfig/questionnaire/feedback/add.ajax', (req, res, next) => {
        let params = req.body;
        let userId = req.session.loginInfo.userid;
        params.creator = userId;
        let option = {
            pageUrl: '/publicConfig/questionnaire/feedback/add.ajax',
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
    app.post('/publicConfig/questionnaire/feedback/modify.ajax', (req, res, next) => {
        let params = req.body;
        let userId = req.session.loginInfo.userid;
        params.creator = userId;
        let option = {
            pageUrl: '/publicConfig/questionnaire/feedback/modify.ajax',
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
    app.post('/publicConfig/questionnaire/feedback/issue.ajax', (req, res, next) => {
        let params = req.body;
        let userId = req.session.loginInfo.userid;
        params.creator = userId;
        let option = {
            pageUrl: '/publicConfig/questionnaire/feedback/issue.ajax',
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
    app.post('/publicConfig/questionnaire/feedback/stop.ajax', (req, res, next) => {
        let params = req.body;
        let userId = req.session.loginInfo.userid;
        params.creator = userId;
        let option = {
            pageUrl: '/publicConfig/questionnaire/feedback/stop.ajax',
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
    app.post('/publicConfig/questionnaire/feedback/singleSurvey.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/publicConfig/questionnaire/feedback/singleSurvey.ajax',
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
  
    app.get('/publicConfig/questionnaire/feedback/image.ajax', (req, res, next) => {
        let params = req.query;
        let option = {
            // session: req.session,
            // url: apiUrl.img,
            req,
            body: params
            // timeout: 15000,
            // json: true
        };
        console.log('/publicConfig/questionnaire/feedback/image.ajax option:', {
            ...option,
            req: '#'
        });
        obs(option).then(body => {
            body.pipe(res);
        }).catch((error) => {
            console.log(error)
            res.send({
                error: 1,
                msg: '图片获取失败',
                data: null
            });
        })
    });
};