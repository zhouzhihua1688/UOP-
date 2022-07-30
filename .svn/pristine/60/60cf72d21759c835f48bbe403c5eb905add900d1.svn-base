const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').manualMgmt.deleteMsg;
module.exports = function (app) {
    //删除
    app.post('/messageCenter/manualMgmt/deleteMsg/del.ajax', (req, res, next) => {
        let params = {};
        req.body.routeRuleId && (params.routeRuleId = req.body.routeRuleId);
        req.body.batchId && (params.batchId = req.body.batchId);
        let option = {
            pageUrl: '/messageCenter/manualMgmt/deleteMsg/del.ajax',
            req: req,
            operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.del,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                res.send({error: 0, msg: '删除成功'});
            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: 1, msg: '删除失败'});
            }
        });
    });
};