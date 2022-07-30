const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').tokenSearch.tokenSearch;
module.exports = function (app) {
    //供应商系统查询
    app.post('/messageCenter/tokenSearch/tokenSearch/query.ajax', (req, res, next) => {
        let params = {};
        req.body.customNo && (params.custNo = req.body.customNo);
        let option = {
            pageUrl: '/messageCenter/tokenSearch/tokenSearch/query.ajax',
            req: req,
            url: apiUrlList.query,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0 && Array.isArray(result.body) && result.body[0]) {
                res.send({error: 0, msg: '查询成功', data: {pushToken: result.body[0].pushtoken}});
            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: 1, msg: '未找到该客户号信息'});
            }
        });
    });
    //消息系统查询
    app.post('/messageCenter/tokenSearch/tokenSearch/search.ajax', (req, res, next) => {
        let params = {};
        req.body.customNo && (params.custNo = req.body.customNo);
        let option = {
            pageUrl: '/messageCenter/tokenSearch/tokenSearch/search.ajax',
            req: req,
            url: apiUrlList.search,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0 && Array.isArray(result.body) && result.body[0]) {
                res.send({
                    error: 0,
                    msg: '查询成功',
                    data: {
                        pushToken: result.body[0].pushToken,
                        os: result.body[0].clientType == 1 ? 'IOS' : 'Android'
                    }
                });
            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: 1, msg: '未找到该客户号信息'});
            }
        });
    });
    //清除无效token
    app.post('/messageCenter/tokenSearch/tokenSearch/clearToken.ajax', (req, res, next) => {
        let params = {};
        params.batchNo = req.body.batchNo;
        params.ruleId = req.body.ruleId;
        let option = {
            pageUrl: '/messageCenter/tokenSearch/tokenSearch/clearToken.ajax',
            req: req,
            operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.clearToken,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                res.send({error: 0, msg: '清除无效token成功,已清除' + result.body + '个'});
            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: 1, msg: '清除无效token失败'});
            }
        });
    });
};