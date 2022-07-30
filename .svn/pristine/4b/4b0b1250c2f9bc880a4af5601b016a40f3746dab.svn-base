const request = require('./../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').highFinancialMgmt.openDay;

module.exports = function (app) {
    // 获取基金id数据
    app.post('/businessMgmt/highFinancialMgmt/openDay/fundIdList.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/businessMgmt/highFinancialMgmt/openDay/fundIdList.ajax',
            req,
            url: apiUrl.fundIdList,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '获取基金ID列表数据失败',
                    data: null
                });
            }
            if (body && body.returnCode == 0 && Array.isArray(body.body)) {
                res.send({
                    error: 0,
                    msg: '调用成功',
                    data: body.body
                });
            } else if (body.returnCode != 0 && body.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: body.returnMsg,
                    data: null
                });
            } else {
                res.send({
                    error: 1,
                    msg: '获取基金ID列表数据失败',
                    data: null
                });
            }
        });
    });
    // 查询基金列表数据
    app.post('/businessMgmt/highFinancialMgmt/openDay/tableData.ajax', (req, res, next) => {
        let params = req.body
        let option = {
            pageUrl: '/businessMgmt/highFinancialMgmt/openDay/tableData.ajax',
            req,
            url: apiUrl.tableData,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '获取基金列表数据失败',
                    data: null
                });
            }
            if (body && body.returnCode == 0 && Array.isArray(body.body)) {
                res.send({
                    error: 0,
                    msg: '调用成功',
                    data: body.body
                });
            } else if (body.returnCode != 0 && body.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: body.returnMsg,
                    data: null
                });
            } else {
                res.send({
                    error: 1,
                    msg: '获取基金列表数据失败',
                    data: null
                });
            }
        });
    });
    // 复核
    app.post('/businessMgmt/highFinancialMgmt/openDay/review.ajax', (req, res, next) => {
        let params = req.body
        params.approveUser = req.session.loginInfo.userid;
        let option = {
            pageUrl: '/businessMgmt/highFinancialMgmt/openDay/review.ajax',
            req,
            url: apiUrl.review,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '复核失败',
                    data: null
                });
            }
            if (body && body.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: '调用成功',
                    data: body.body
                });
            } else if (body.returnCode != 0 && body.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: body.returnMsg,
                    data: null
                });
            } else {
                res.send({
                    error: 1,
                    msg: '复核失败',
                    data: null
                });
            }
        });
    });

};