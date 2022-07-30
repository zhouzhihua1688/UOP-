const request = require('./../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').bankCardAudit.review;
const obs = require('./../../../local_data/request_obs');
module.exports = function (app) {

    // 获取  初始数据和查询
    app.post('/customerService/bankCardAudit/businessHandle~businessReview~applyRecord/getList.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            session: req.session,
            req,
            url: apiUrl.getList,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/customerService/bankCardAudit/businessHandle~businessReview~applyRecord/getList.ajax option:', {
            ...option,
            req: '#'
        });
        request(option, (error, response, body) => {
            console.log('/customerService/bankCardAudit/businessHandle~businessReview~applyRecord/getList.ajax error:', error);
            console.log('/customerService/bankCardAudit/businessHandle~businessReview~applyRecord/getList.ajax statusCode:', response && response.statusCode);
            console.log('/customerService/bankCardAudit/businessHandle~businessReview~applyRecord/getList.ajax body:', {
                ...body,
                ['body']: '*****'
            });
            if (error) {
                return res.send({
                    error: 1,
                    msg: '数据获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {

                res.send({
                    error: 0,
                    msg: '调用成功',
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
    // 获取  经办审核
    app.post('/customerService/bankCardAudit/businessHandle~businessReview~applyRecord/auditHandle.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            session: req.session,
            url: apiUrl.auditHandle,
            req,
            headers: {
                operator: req.session.loginInfo.userid
            },
            body: params,
            timeout: 15000,
            json: true
        };
        console.log('/customerService/bankCardAudit/businessHandle~businessReview~applyRecord/auditHandle.ajax option:', {
            ...option,
            req: '#'
        });
        request.post(option, (error, response, body) => {
            console.log('/customerService/bankCardAudit/businessHandle~businessReview~applyRecord/auditHandle.ajax error:', error);
            console.log('/customerService/bankCardAudit/businessHandle~businessReview~applyRecord/auditHandle.ajax statusCode:', response && response.statusCode);
            console.log('/customerService/bankCardAudit/businessHandle~businessReview~applyRecord/auditHandle.ajax body:', body);
            if (error) {
                return res.send({
                    error: 1,
                    msg: '审核操作失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {

                res.send({
                    error: 0,
                    msg: '审核操作成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '审核操作失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
    // 获取  复核审核
    app.post('/customerService/bankCardAudit/businessHandle~businessReview~applyRecord/auditReview.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            session: req.session,
            url: apiUrl.auditReview,
            req,
            headers: {
                operator: req.session.loginInfo.userid
            },
            body: params,
            timeout: 15000,
            json: true
        };
        console.log('/customerService/bankCardAudit/businessHandle~businessReview~applyRecord/auditReview.ajax option:', {
            ...option,
            req: '#'
        });
        request.post(option, (error, response, body) => {
            console.log('/customerService/bankCardAudit/businessHandle~businessReview~applyRecord/auditReview.ajax error:', error);
            console.log('/customerService/bankCardAudit/businessHandle~businessReview~applyRecord/auditReview.ajax statusCode:', response && response.statusCode);
            console.log('/customerService/bankCardAudit/businessHandle~businessReview~applyRecord/auditReview.ajax body:', body);
            if (error) {
                return res.send({
                    error: 1,
                    msg: '审核操作失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {

                res.send({
                    error: 0,
                    msg: '审核操作成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '审核操作失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
    // 获取  发送短信
    app.post('/customerService/bankCardAudit/businessHandle~businessReview~applyRecord/sendSms.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            session: req.session,
            url: apiUrl.sendSms,
            req,
            headers: {
                operator: req.session.loginInfo.userid
            },
            body: params,
            timeout: 15000,
            json: true
        };
        console.log('/customerService/bankCardAudit/businessHandle~businessReview~applyRecord/sendSms.ajax option:', {
            ...option,
            req: '#'
        });
        request.post(option, (error, response, body) => {
            console.log('/customerService/bankCardAudit/businessHandle~businessReview~applyRecord/sendSms.ajax error:', error);
            console.log('/customerService/bankCardAudit/businessHandle~businessReview~applyRecord/sendSms.ajax statusCode:', response && response.statusCode);
            console.log('/customerService/bankCardAudit/businessHandle~businessReview~applyRecord/sendSms.ajax body:', body);
            if (error) {
                return res.send({
                    error: 1,
                    msg: '短信发送失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {

                res.send({
                    error: 0,
                    msg: '发送成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '短信发送失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
    // 获取  img
    app.get('/customerService/bankCardAudit/businessHandle~businessReview~applyRecord/img.ajax', (req, res, next) => {
        let params = req.query;
        let option = {
            session: req.session,
            url: apiUrl.img,
            req,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/customerService/bankCardAudit/businessHandle~businessReview~applyRecord/img.ajax option:', {
            ...option,
            req: '#'
        });
        request(option).pipe(res);
    });
    app.get('/customerService/bankCardAudit/businessHandle~businessReview~applyRecord/imgObs.ajax', (req, res, next) => {
        let params = req.query;
        let option = {
            // session: req.session,
            // url: apiUrl.img,
            req,
            body: params
            // timeout: 15000,
            // json: true
        };
        console.log('/customerService/bankCardAudit/businessHandle~businessReview~applyRecord/imgObs.ajax option:', {
            ...option,
            req: '#'
        });
        // request(option).pipe(res);
        obs(option).then(body => {
            body.pipe(res);
        }).catch((error) => {
            res.send({
                error: 1,
                msg: '图片获取失败',
                data: null
            });
        })
    });
};