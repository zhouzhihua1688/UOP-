const request = require('../../../local_data/requestWrapper');
let apiUrlList = require('../apiConfig').expenseMgmt.manager;
const qs = require("qs");
module.exports = function (app) {

    //获取上次执行流水记录
    app.get('/thirdPartyOperation/expenseMgmt/manager/getLastRecord.ajax', (req, res, next) => {
        let params =req.query;
        console.log(params);
        let option = {
            session: req.session,
            url: apiUrlList.getLastRecord,
            qs:params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/expenseMgmt/manager/getLastRecord.ajax option:', option);
        request(option).pipe(res);
    });

    //重新初算
    app.get('/thirdPartyOperation/expenseMgmt/manager/calCost.ajax', (req, res, next) => {
        let params =req.query;
        console.log(params);
        let option = {
            session: req.session,
            url: apiUrlList.calCost,
            qs:params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/expenseMgmt/manager/calCost.ajax option:', option);
        request(option).pipe(res);
    });

    //查询文件描述
    app.get('/thirdPartyOperation/expenseMgmt/manager/queryFileDesc.ajax', (req, res, next) => {
        let option = {
            session: req.session,
            url: apiUrlList.queryFileDesc,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/expenseMgmt/manager/queryFileDesc.ajax option:', option);
        request(option).pipe(res);
    });

    //批量导入数据文件
    app.post('/thirdPartyOperation/expenseMgmt/manager/importData.ajax', (req, res, next) => {
        console.log("req.body", req.body);
        let params = qs.parse(req.body);
        params.operater = req.session.loginInfo.userid;
        console.log(params);
        let option = {
            session: req.session,
            url: apiUrlList.importData,
            body: params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/expenseMgmt/manager/importData.ajax option:', option);
        request.post(option, (error, response, body) => {
            console.log('/thirdPartyOperation/expenseMgmt/manager/importData.ajax error:', error);
            console.log('/thirdPartyOperation/expenseMgmt/manager/importData.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/expenseMgmt/manager/importData.ajax body:', body);
            // return res.send(body);
            if (error) {
                return res.send({
                    error: 1,
                    msg: '数据获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;

            if (result && result.responseCode === '0000') {
                res.send({
                    error: 0,
                    msg: '数据获取成功',
                    data: result.data

                });
            }
            else if (result && result.responseCode != '9999') {
                res.send({error: 1, msg: result.responseMessage});
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