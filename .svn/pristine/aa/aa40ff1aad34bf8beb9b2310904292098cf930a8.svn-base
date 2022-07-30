const request = require('./../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').tradeMonitor.tradeInstructMonitor;
module.exports = function (app) {
    // 查询规则列表
    app.post('/investmentMgmt/tradeMonitor/tradeInstructMonitor/query.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/investmentMgmt/tradeMonitor/tradeInstructMonitor/query.ajax',
            req,
            url: apiUrl.query,
            qs: req.body,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '查询失败'});
            }
            if (body.returnCode == 0 && Array.isArray(body.body.orders)) {
                return res.send({error: 0, msg: '查询成功', data: body.body.orders});
            } else if (body.returnCode != 9999) {
                return res.send({error: 1, msg: body.returnMsg, data: null});
            } else {
                return res.send({error: 1, msg: '查询失败', data: null});
            }
        });
    });
};