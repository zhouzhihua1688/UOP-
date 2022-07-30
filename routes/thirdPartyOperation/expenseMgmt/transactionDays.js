const request = require('../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').expenseMgmt.transactionDetails;
module.exports = function (app) {

    // 获取交易费/日明细  初始数据和查询
    app.post('/thirdPartyOperation/expenseMgmt/transactionSum~feedbackSum/daysList.ajax', (req, res, next) => {
        var params = req.body,
            userid = req.session.loginInfo.userid;
        let option = {
            session:req.session,
            url: apiUrl.daysList,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log(req.session.loginInfo.userid)
        console.log('/thirdPartyOperation/expenseMgmt/transactionSum~feedbackSum/daysList.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/thirdPartyOperation/expenseMgmt/transactionSum~feedbackSum/daysList.ajax error:', error);
            console.log('/thirdPartyOperation/expenseMgmt/transactionSum~feedbackSum/daysList.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/expenseMgmt/transactionSum~feedbackSum/daysList.ajax body:', body);
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
                    userid,
                    data: result.data
                });
            }else if (result && result.responseCode != '9999') {
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
    // 历史版本查询
    app.post('/thirdPartyOperation/expenseMgmt/transactionSum~feedbackSum/daysHis.ajax', (req, res, next) => {
        var params = req.body,
            userid = req.session.loginInfo.userid;
        let option = {
            session:req.session,
            url: apiUrl.daysHis,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log(req.session.loginInfo.userid)
        console.log('/thirdPartyOperation/expenseMgmt/transactionSum~feedbackSum/daysList.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/thirdPartyOperation/expenseMgmt/transactionSum~feedbackSum/daysList.ajax error:', error);
            console.log('/thirdPartyOperation/expenseMgmt/transactionSum~feedbackSum/daysList.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/expenseMgmt/transactionSum~feedbackSum/daysList.ajax body:', body);
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
                    userid,
                    data: result.data
                });
            }else if (result && result.responseCode != '9999') {
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
    // 获取交易费/日明细  保存和复核
    app.post('/thirdPartyOperation/expenseMgmt/transactionSum~feedbackSum/keepOrReview.ajax', (req, res, next) => {
        let params = req.body;
        let adjust = JSON.parse(params.adjust);
        delete params.adjust;
        let option = {
            session:req.session,
            url: apiUrl.daysKeepOrReview,
            qs: params,
            body: adjust,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/expenseMgmt/transactionSum~feedbackSum/keepOrReview.ajax option:', option);
        request.post(option, (error, response, body) => {
            console.log('/thirdPartyOperation/expenseMgmt/transactionSum~feedbackSum/keepOrReview.ajax error:', error);
            console.log('/thirdPartyOperation/expenseMgmt/transactionSum~feedbackSum/keepOrReview.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/expenseMgmt/transactionSum~feedbackSum/keepOrReview.ajax body:', body);
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
                    msg: '操作成功',
                    data: result.data
                });
            }else if (result && result.responseCode != '9999') {
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
    // 获取交易费/日明细  刷新参数
    app.post('/thirdPartyOperation/expenseMgmt/transactionSum~feedbackSum/update.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            session:req.session,
            url: apiUrl.daysUpdate,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/expenseMgmt/transactionSum~feedbackSum/update.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/thirdPartyOperation/expenseMgmt/transactionSum~feedbackSum/update.ajax error:', error);
            console.log('/thirdPartyOperation/expenseMgmt/transactionSum~feedbackSum/update.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/expenseMgmt/transactionSum~feedbackSum/update.ajax body:', body);
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
                    msg: '刷新成功',
                    data: result.data
                });
            }else if (result && result.responseCode != '9999') {
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
};