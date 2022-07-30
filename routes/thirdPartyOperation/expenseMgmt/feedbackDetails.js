const request = require('../../../local_data/requestWrapper');
let apiUrlList=require('../apiConfig').expenseMgmt;
module.exports = function (app) {
    //主页面表格数据请求
    app.post('/thirdPartyOperation/expenseMgmt/feedbackSum/getList.ajax', (req, res, next) => {
        console.log(req.body);
        let option = {
            session: req.session,
            url: apiUrlList.feedbackDetails.list,
            qs: req.body,
            timeout: 15000,
            json: true
        };
        console.log(option.url);
        console.log('/thirdPartyOperation/expenseMgmt/feedbackSum/getList.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/thirdPartyOperation/expenseMgmt/feedbackSum/getList.ajax error:', error);
            console.log('/thirdPartyOperation/expenseMgmt/feedbackSum/getList.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/expenseMgmt/feedbackSum/getList.ajax body:', body);
            if (error) {
                return res.send({ error: 1, msg: '数据获取失败' });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.responseCode == "0000"&&Array.isArray(result.data)) {
                if(result.data&&Array.isArray(result.data)){
                    result.data.forEach(function (value,index) {
                        value.inserttime=formatTime(value.inserttime);
                    });
                    result.data.inserttime= formatTime(result.data.inserttime);
                }
                res.send({ error: 0, msg: '数据获取成功', data: result.data});
            }
            else if (result && result.responseCode != '9999') {
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
    //状态查询
    app.post('/thirdPartyOperation/expenseMgmt/feedbackSum/queryStatus.ajax', (req, res, next) => {
        console.log(req.body);
        let option = {
            session: req.session,
            url: apiUrlList.feedbackDetails.list,
            qs: req.body,
            timeout: 15000,
            json: true
        };
        console.log(option.url);
        console.log('/thirdPartyOperation/expenseMgmt/feedbackSum/queryStatus.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/thirdPartyOperation/expenseMgmt/feedbackSum/queryStatus.ajax error:', error);
            console.log('/thirdPartyOperation/expenseMgmt/feedbackSum/queryStatus.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/expenseMgmt/feedbackSum/queryStatus.ajax body:', body);
            if (error) {
                return res.send({ error: 1, msg: '数据获取失败' });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.responseCode == "0000"&&Array.isArray(result.data)) {
                res.send({ error: 0, msg: '数据获取成功', data: result.data});
            }
            else if (result && result.responseCode != '9999') {
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
    //发送邮件确定按钮
    app.post('/thirdPartyOperation/expenseMgmt/feedbackSum/sendMailConfirm.ajax', (req, res, next) => {
        let params={};
        params=req.body;
        params.replier=req.session.loginInfo.userid;
        let option = {
            session: req.session,
            url: apiUrlList.feedbackDetails.sendMailConfirm,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log(option.url);
        console.log('/thirdPartyOperation/expenseMgmt/feedbackSum/sendMailConfirm.ajax option:', option);
        request.post(option, (error, response, body) => {
            console.log('/thirdPartyOperation/expenseMgmt/feedbackSum/sendMailConfirm.ajax error:', error);
            console.log('/thirdPartyOperation/expenseMgmt/feedbackSum/sendMailConfirm.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/expenseMgmt/feedbackSum/sendMailConfirm.ajax body:', body);

            if (error) {
                return res.send({ error: 1, msg: '数据获取失败' });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.responseCode == "0000") {
                // res.send({ error: 0, msg: '发送成功', data: result.data});
                res.send({ msg: '发送成功'});
            }
            else if (result && result.responseCode != '9999') {
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
    //发送邮件提醒
    app.post('/thirdPartyOperation/expenseMgmt/feedbackSum/sendMailRemind.ajax', (req, res, next) => {
        let option = {
            session: req.session,
            url: apiUrlList.feedbackDetails.sendMailRemind,
            qs: req.body,
            timeout: 15000,
            json: true
            };
        console.log(option.url);
        console.log('/thirdPartyOperation/expenseMgmt/feedbackSum/sendMailRemind.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/thirdPartyOperation/expenseMgmt/feedbackSum/sendMailRemind.ajax error:', error);
        console.log('/thirdPartyOperation/expenseMgmt/feedbackSum/sendMailRemind.ajax statusCode:', response && response.statusCode);
        console.log('/thirdPartyOperation/expenseMgmt/feedbackSum/sendMailRemind.ajax body:', body);

        if (error) {
            return res.send({ error: 1, msg: '数据获取失败' });
        }
        let result = typeof body === 'string' ? JSON.parse(body) : body;
        if (result && result.responseCode == "0000") {
            // res.send({ error: 0, msg: '发送成功', data: result.data});
            res.send({ msg: '发送成功'});
        }
        else if (result && result.responseCode != '9999') {
            res.send({ error: 1, msg: result.responseMessage});
        }
        else {
            res.send({
                error: 1,
                msg: result.responseMessage
            });
        }
    });
});
    //Dialog日明细表格数据请求
    app.post('/thirdPartyOperation/expenseMgmt/feedbackSum/feedBackDayDialog.ajax', (req, res, next) => {
        let option = {
            session: req.session,
            url: apiUrlList.feedbackDetails.feedbackDayDialog,
            qs: req.body,
            timeout: 15000,
            json: true
        };
        console.log(option.url);
        console.log('/thirdPartyOperation/expenseMgmt/feedbackSum/feedBackDayDialog.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/thirdPartyOperation/expenseMgmt/feedbackSum/feedBackDayDialog.ajax error:', error);
            console.log('/thirdPartyOperation/expenseMgmt/feedbackSum/feedBackDayDialog.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/expenseMgmt/feedbackSum/feedBackDayDialog.ajax body:', body);
            if (error) {
                return res.send({ error: 1, msg: '数据获取失败' });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;

            if (result && result.responseCode == "0000") {
                if(result.data&&Array.isArray(result.data)){
                    result.data.forEach(function (value,index) {
                        value.inserttime=formatTime(value.inserttime);
                    });
                    result.data.inserttime= formatTime(result.data.inserttime);
                }
                res.send({ error: 0, msg: '数据获取成功', data: result.data});
            }
            else if (result && result.responseCode != '9999') {
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

function formatTime(timestamp) {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    return Y + M + D + h + m + s;
}