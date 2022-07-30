const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').daoLeWechatRedPackeMgmt.redPacketStatus;
module.exports = function (app) {
    // 查询
    app.post('/awardMgmt/daoLeWechatRedPackeMgmt/redPacketStatus/query.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/awardMgmt/daoLeWechatRedPackeMgmt/redPacketStatus/query.ajax',
            req: req,
            url: apiUrlList.query,
            qs: params,
            timeout: 15000,
            json: true
        };
        request.get(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '操作失败',
                    data: null
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {
                res.send({
                    error: 0,
                    msg: '调用成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '调用失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
};