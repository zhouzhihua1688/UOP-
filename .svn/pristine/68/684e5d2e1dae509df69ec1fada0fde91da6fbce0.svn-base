const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').scenceMgmt.scenceAdd;

module.exports = function (app) {
    //获取所有场景化的规则列表
    app.post('/messageCenter/scenceMgmt/scenceAdd/getRuleList.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/messageCenter/scenceMgmt/scenceAdd/getRuleList.ajax',
            req: req,
            url: apiUrlList.search,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode === 0 && Array.isArray(result.body)) {
                let tableData = [];
                result.body.forEach(item => {
                    if (item.pushType == 2) {
                        tableData.push({
                            ruleId: item.ruleId,
                            ruleName: item.ruleName
                        });
                    }
                });
                res.send({error: 0, msg: '查询成功', data: tableData});
            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: 1, msg: '获取规则列表失败'});
            }
        });
    });
    //添加场景化规则
    app.post('/messageCenter/scenceMgmt/scenceAdd/add.ajax', (req, res, next) => {
        let params = {};
        params.ruleId = req.body.ruleId;
        params.requestUrl = req.body.requestUrl;
        params.sceneName = req.body.sceneName;
        params.requestType = req.body.requestType;
        params.requestParam = req.body.requestParam;
        let option = {
            pageUrl: '/messageCenter/scenceMgmt/scenceAdd/add.ajax',
            req: req,
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.add,
            qs: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode === 0) {
                res.send({error: 0, msg: '添加成功'});
            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: 1, msg: '添加失败'});
            }
        });
    });
};