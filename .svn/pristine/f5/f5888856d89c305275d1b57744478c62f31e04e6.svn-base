const request = require('./../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').IPOMgmtOCReview.largePurchaseLimit;

module.exports = function (app) {
    // 获取基金id数据
    // app.post('/businessMgmt/IPOMgmtOCReview/datumRate/fundIdList.ajax', (req, res, next) => {
    //     let option = {
    //         session: req.session,
    //         url: apiUrl.fundIdList,
    //         timeout: 15000,
    //         json: true
    //     };
    //     console.log('/businessMgmt/IPOMgmtOCReview/datumRate/fundIdList.ajax option:', option);
    //     request(option, (error, response, body) => {
    //         console.log('/businessMgmt/IPOMgmtOCReview/datumRate/fundIdList.ajax error:', error);
    //         console.log('/businessMgmt/IPOMgmtOCReview/datumRate/fundIdList.ajax statusCode:', response && response.statusCode);
    //         console.log('/businessMgmt/IPOMgmtOCReview/datumRate/fundIdList.ajax body:', body);
    //         if (error) {
    //             return res.send({ error: 1, msg: '获取基金ID列表数据失败', data: null });
    //         }
    //         if (body && body.returnCode == 0 && Array.isArray(body.body)) {
    //             res.send({
    //                 error: 0,
    //                 msg: '调用成功',
    //                 data: body.body
    //             });
    //         }
    //         else if (body.returnCode != 0 && body.returnCode != 9999) {
    //             res.send({ error: 1, msg: body.returnMsg, data: null });
    //         }
    //         else {
    //             res.send({ error: 1, msg: '获取基金ID列表数据失败', data: null });
    //         }
    //     });
    // });
    // 查询基金列表数据
    app.post('/businessMgmt/IPOMgmtOCReview/largePurchaseLimit/tableData.ajax', (req, res, next) => {
        let params = {};
        params.pageNo = req.body.pageNo;
        params.pageSize = req.body.pageSize;
        params.status = req.body.status;
        let option = {
            pageUrl: '/businessMgmt/IPOMgmtOCReview/largePurchaseLimit/tableData.ajax',
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
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0 && Array.isArray(result.body.ruleQuotaList)) {
                // result.body.ruleQuotaList.forEach((item) => {
                //     item.check = false;
                // });
                let resultData = {};
                // resultData.pageNo = result.body.pageNo;
                // resultData.totalSize = Math.ceil(result.body.totalSize / req.body.pageSize);
                resultData.tableData = result.body.ruleQuotaList;
                res.send({
                    error: 0,
                    msg: '获取数据成功',
                    data: resultData
                });
            } else if (result && result.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                res.send({
                    error: 1,
                    msg: '获取数据失败'
                });
            }
        });
    });
    // 复核
    app.post('/businessMgmt/IPOMgmtOCReview/largePurchaseLimit/review.ajax', (req, res, next) => {
        let params = {};
        // params.approveUser = req.session.loginInfo.userid;
        params.fundId = req.body.fundId;
        params.result = req.body.result;
        let option = {
            pageUrl: '/businessMgmt/IPOMgmtOCReview/largePurchaseLimit/review.ajax',
            req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrl.review,
            qs: params,
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