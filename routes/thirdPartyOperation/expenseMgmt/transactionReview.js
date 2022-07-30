const request = require('../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').expenseMgmt.transactionReview;
const path = require('path');
module.exports = function (app) {

    // 获取交易费/月复核    初始数据和查询
    app.post('/thirdPartyOperation/expenseMgmt/transactionSum~feedbackSum/reviewList.ajax', (req, res, next) => {
        console.log(req.body);
        var params = req.body,
            userid = req.session.loginInfo.userid;
        let option = {
            session:req.session,
            url: apiUrl.reviewList,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/expenseMgmt/transactionSum~feedbackSum/reviewList.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/thirdPartyOperation/expenseMgmt/transactionSum~feedbackSum/reviewList.ajax error:', error);
            console.log('/thirdPartyOperation/expenseMgmt/transactionSum~feedbackSum/reviewList.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/expenseMgmt/transactionSum~feedbackSum/reviewList.ajax body:', body);
            if (error) {
                return res.send({
                    error: 1,
                    msg: '数据获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.responseCode == '0000') {
                res.send({
                    error: 0,
                    userid,
                    msg: '调用成功',
                    data: result.data
                });
            } else if (result && result.responseCode != '9999') {
                res.send({ error: 1, msg: result.responseMessage });
            }
            else {
                res.send({
                    error: 1,
                    msg: result.responseMessage
                });
            }
        });
    });
    // 获取交易费/月复核    查询历史
    app.post('/thirdPartyOperation/expenseMgmt/transactionSum~feedbackSum/queryHis.ajax', (req, res, next) => {
        console.log(req.body);
        var params = req.body;
        let option = {
            session:req.session,
            url: apiUrl.reviewQueryHis,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/expenseMgmt/transactionSum~feedbackSum/queryHis.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/thirdPartyOperation/expenseMgmt/transactionSum~feedbackSum/queryHis.ajax error:', error);
            console.log('/thirdPartyOperation/expenseMgmt/transactionSum~feedbackSum/queryHis.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/expenseMgmt/transactionSum~feedbackSum/queryHis.ajax body:', body);
            if (error) {
                return res.send({
                    error: 1,
                    msg: '数据获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result) {
                res.send({
                    error: 0,
                    msg: '调用成功',
                    data: result.data
                });
            } else if (result && result.responseCode != '9999') {
                res.send({ error: 1, msg: result.responseMessage });
            }
            else {
                res.send({
                    error: 1,
                    msg: result.responseMessage
                });
            }
        });
    });
    // 获取交易费/月复核  保存或者复核
    app.post('/thirdPartyOperation/expenseMgmt/transactionSum/reviewOrKeep.ajax', (req, res, next) => {
        console.log(req.body);
        var params = req.body;
        let option = {
            session:req.session,
            url: apiUrl.reviewOrKeep,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/expenseMgmt/transactionSum/reviewOrKeep.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/thirdPartyOperation/expenseMgmt/transactionSum/reviewOrKeep.ajax error:', error);
            console.log('/thirdPartyOperation/expenseMgmt/transactionSum/reviewOrKeep.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/expenseMgmt/transactionSum/reviewOrKeep.ajax body:', body);
            if (error) {
                return res.send({
                    error: 1,
                    msg: '数据获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.responseCode == '0000') {
                res.send({
                    error: 0,
                    msg: '调用成功',
                    data: result.data
                });
            } else if (result && result.responseCode != '9999') {
                res.send({ error: 1, msg: result.responseMessage });
            }
            else {
                res.send({
                    error: 1,
                    msg: result.responseMessage
                });
            }
        });
    });
    // 获取交易费/月复核  对比无误
    app.post('/thirdPartyOperation/expenseMgmt/transactionSum~feedbackSum/check.ajax', (req, res, next) => {
        console.log(req.body);
        var params = req.body;
        let option = {
            session:req.session,
            url: apiUrl.reviewCheck,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/expenseMgmt/transactionSum~feedbackSum/check.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/thirdPartyOperation/expenseMgmt/transactionSum~feedbackSum/check.ajax error:', error);
            console.log('/thirdPartyOperation/expenseMgmt/transactionSum~feedbackSum/check.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/expenseMgmt/transactionSum~feedbackSum/check.ajax body:', body);
            if (error) {
                return res.send({
                    error: 1,
                    msg: '数据获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.responseCode == '0000') {
                res.send({
                    error: 0,
                    msg: '对比成功',
                    data: result.data
                });
            } else if (result && result.responseCode != '9999') {
                res.send({ error: 1, msg: result.responseMessage });
            }
            else {
                res.send({
                    error: 1,
                    msg: result.responseMessage
                });
            }
        });
    });
    // 获取交易费/月复核  导出汇总
    app.get('/thirdPartyOperation/expenseMgmt/transactionSum~feedbackSum/exportMonth.ajax', (req, res, next) => {
        var params = {};
        params.ymonth = req.query.ymonth;
        let option = {
            session:req.session,
            url: apiUrl.reviewExportMonth,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/expenseMgmt/transactionSum~feedbackSum/exportMonth.ajax option:', option);
        request(option).pipe(res);
    });
    // 获取交易费/月复核  导出明细
    app.get('/thirdPartyOperation/expenseMgmt/transactionSum~feedbackSum/exportDays.ajax', (req, res, next) => {
        var params = {};
        params.ymonth = req.query.ymonth;
        let option = {
            session:req.session,
            url: apiUrl.reviewExportDays,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/expenseMgmt/transactionSum~feedbackSum/exportDays.ajax option:', option);
        request(option).pipe(res);
    });
};