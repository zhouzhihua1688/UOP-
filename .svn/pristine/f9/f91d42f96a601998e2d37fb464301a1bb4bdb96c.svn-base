const request = require('../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').combinationProductConfig.investmentRisk;
module.exports = function (app) {
    // 查询列表
    app.post('/businessMgmt/combinationProductConfig/investmentRisk/query.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/businessMgmt/combinationProductConfig/investmentRisk/query.ajax',
            req,
            url: apiUrl.getTableData,
            qs: req.body,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '查询失败'});
            }
            if (body.returnCode == 0 && Array.isArray(body.body.records)) {
                return res.send({error: 0, msg: '查询成功', data: body.body.records});
            } else if (body.returnCode != 9999) {
                return res.send({error: 1, msg: body.returnMsg, data: null});
            } else {
                return res.send({error: 1, msg: '查询失败', data: null});
            }
        });
    });
};