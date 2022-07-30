const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').scenceMgmt.upReplyRule;

module.exports = function (app) {
    // 获取上行回复规则列表
    app.post('/messageCenter/scenceMgmt/upReplyRule/search.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/messageCenter/scenceMgmt/upReplyRule/search.ajax',
            req: req,
            url: apiUrlList.query,
            timeout: 15000,
            json: true
        };
        request.get(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode === 0) {
                res.send({
                    error: 0, msg: '调用成功', data: result.body.map(item => {
                        item.paramType_show = item.paramType;
                        if (item.paramType === 'S') {
                            item.paramType_show = '申购';
                        }
                        else if (item.paramType === 'R') {
                            item.paramType_show = '赎回';
                        }else{
                            item.paramType_show = '--'
                        }
                        return item;
                    })
                });
            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg, data: null});
            }
            else {
                res.send({error: 1, msg: '添加失败', data: null});
            }
        });
    });
    // 新增上行规则
    app.post('/messageCenter/scenceMgmt/upReplyRule/add.ajax', (req, res, next) => {
        let params = {};
        params.content = req.body.content;
        params.param = req.body.param;
        params.paramType = req.body.paramType;
        params.paramDesc = req.body.paramDesc;
        params.isAgree = req.body.isAgree === 'true';
        let option = {
            pageUrl: '/messageCenter/scenceMgmt/upReplyRule/add.ajax',
            req: req,
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.add,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode === 0) {
                res.send({error: 0, msg: '添加成功', data: null});
            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg, data: null});
            }
            else {
                res.send({error: 1, msg: '添加失败', data: null});
            }
        });
    });
};