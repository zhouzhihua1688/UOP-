const request = require('../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').IPOMgmtOCReview.IPOLimitDetail;

module.exports = function (app) {

    // 查询基金列表数据
    app.post('/businessMgmt/IPOMgmtOCReview/IPOLimit/detailTableData.ajax', (req, res, next) => {
        let params = req.body
        let option = {
            pageUrl: '/businessMgmt/IPOMgmtOCReview/IPOLimit/detailTableData.ajax',
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
                let arr = body.body
                arr.forEach(element => {
                    element.approve = {}
                    element.onLine = {}
                    if (element.approveLimit) {
                        element.approve = {
                            ...element.approveLimit
                        }
                    }
                    if (element.fundInfoOnline) {
                        for (const key in element.fundInfoOnline) {
                            element.onLine[key] = element.fundInfoOnline[key];
                        }
                    }
                    if (element.fundInfoExOnline) {
                        for (const key in element.fundInfoExOnline) {
                            element.onLine[key] = element.fundInfoExOnline[key];
                        }
                    }
                    delete element.approveLimit;
                    delete element.fundInfoOnline;
                    delete element.fundInfoExOnline;
                });
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
    app.post('/businessMgmt/IPOMgmtOCReview/IPOLimit/detailReview.ajax', (req, res, next) => {
        let params = req.body
        params.approveUser = req.session.loginInfo.userid;
        let option = {
            pageUrl: '/businessMgmt/IPOMgmtOCReview/IPOLimit/detailReview.ajax',
            req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
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