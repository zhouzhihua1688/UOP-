const request = require('./../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').IPOMgmtOCReview.fundTransform;

module.exports = function (app) {
    // 获取基金id数据
    app.post('/businessMgmt/IPOMgmtOCReview/fundTransform/fundIdList.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/businessMgmt/IPOMgmtOCReview/fundTransform/fundIdList.ajax',
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
    app.post('/businessMgmt/IPOMgmtOCReview/fundTransform/tableData.ajax', (req, res, next) => {
        let params = req.body
        let option = {
            pageUrl: '/businessMgmt/IPOMgmtOCReview/fundTransform/tableData.ajax',
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


};