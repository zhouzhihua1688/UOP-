const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').information.transactionQuery;
const baseUrl = '/clientMgmt/information/transactionQuery';

module.exports = function (app) {
    //查询列表
    app.post(`${baseUrl}/getTableData.ajax`, (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: `${baseUrl}/getTableData.ajax`,
            req: req,
            url: apiUrlList.getTableData,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '查询失败'
                });
            }
            if (body.returnCode === 0) {
                res.send({
                    error: 0,
                    msg: '查询成功',
                    data: body.body
                });
            } else if (body && body.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: body.returnMsg,
                    data: null
                });
            } else {
                res.send({
                    error: 1,
                    msg: '查询失败',
                    data: null
                });
            }
        });
    });

    //交易详情
    app.post(`${baseUrl}/details.ajax`, (req, res, next) => {
        let params = req.body;
        let tradeDetailApi = req.body.tradeDetailApi;
        let option = {
            pageUrl: `${baseUrl}/details.ajax`,
            req: req,
            url: apiUrlList.details + tradeDetailApi,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '查询失败'
                });
            }
            if (body.returnCode === 0) {
                res.send({
                    error: 0,
                    msg: '查询成功',
                    data: body.body
                });
            } else if (body && body.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: body.returnMsg,
                    data: null
                });
            } else {
                res.send({
                    error: 1,
                    msg: '查询失败',
                    data: null
                });
            }
        });
    });    
};