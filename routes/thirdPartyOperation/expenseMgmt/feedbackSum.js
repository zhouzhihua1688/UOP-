const request = require('../../../local_data/requestWrapper');
let apiUrlList=require('../apiConfig').expenseMgmt;
module.exports = function (app) {
    //主表格数据
    app.post('/thirdPartyOperation/expenseMgmt/feedbackSum/list.ajax', (req, res, next) => {
        let option = {
            session: req.session,
            url: apiUrlList.feedbackSum.list,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/expenseMgmt/feedbackSum/list.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/thirdPartyOperation/expenseMgmt/feedbackSum/list.ajax error:', error);
            console.log('/thirdPartyOperation/expenseMgmt/feedbackSum/list.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/expenseMgmt/feedbackSum/list.ajax body:', body);
            if (error) {
                return res.send({ error: 1, msg: '数据获取失败' });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            console.log(result);
            if (result && result.responseCode == '0000'&&Array.isArray(result.data)) {
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
    //年月查询
    app.post('/thirdPartyOperation/expenseMgmt/feedbackSum/queryYmonth.ajax', (req, res, next) => {
        var params=req.query.data;
        let option = {
            session: req.session,
            url: apiUrlList.feedbackSum.list+'?data='+params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/expenseMgmt/feedbackSum/queryYmonth.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/thirdPartyOperation/expenseMgmt/feedbackSum/queryYmonth.ajax error:', error);
            console.log('/thirdPartyOperation/expenseMgmt/feedbackSum/queryYmonth.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/expenseMgmt/feedbackSum/queryYmonth.ajax body:', body);
            if (error) {
                return res.send({ error: 1, msg: '数据获取失败' });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            console.log(result);
            if (result && result.responseCode == '0000'&&Array.isArray(result.data)) {
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