const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').recommendSystem.recommendSystemGroupMgmt.ruleTemplateConfig;
module.exports = function (app) {
    //查询
    app.post('/recommendSystem/recommendSystemGroupMgmt/ruleTemplateConfig/search.ajax', (req, res, next) => {
        let params = {};
        req.body.templateId && (params.templateId = req.body.templateId);
        req.body.templateValue && (params.templateValue = req.body.templateValue);
        params.pageNo = req.body.pageNo;
        params.pageSize = req.body.pageSize;
        let option = {
            pageUrl: '/recommendSystem/recommendSystemGroupMgmt/ruleTemplateConfig/search.ajax',
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
            if (body && body.returnCode === 0 && Array.isArray(body.body.rows)) {
                body.body.rows.forEach(item => {
                    item.templateDescription_desc = item.templateDescription.length > 20 ? item.templateDescription + '...' : item.templateDescription;
                    item.updateTime = formatTime(item.updateTime);
                });
                res.send({error: 0, msg: '查询成功', data: body.body});
            }
            else if (body && body.returnCode != 9999) {
                res.send({error: 1, msg: body.returnMsg});
            }
            else {
                res.send({error: 1, msg: '查询失败'});
            }
        });
    });
    //删除
    app.post('/recommendSystem/recommendSystemGroupMgmt/ruleTemplateConfig/del.ajax', (req, res, next) => {
        let params = {};
        params.templateId = req.body.templateId;
        let option = {
            pageUrl: '/recommendSystem/recommendSystemGroupMgmt/ruleTemplateConfig/del.ajax',
            req: req,
            operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            qs: params,
            url: apiUrlList.del,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode === 0) {
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
    //新增
    app.post('/recommendSystem/recommendSystemGroupMgmt/ruleTemplateConfig/add.ajax', (req, res, next) => {
        let params = {};
        params.templateName = req.body.templateName;
        params.templateDescription = req.body.templateDescription;
        params.templateValue = req.body.templateValue;
        params.importClass = req.body.importClass;
        params.placeholders = req.body.placeholders;
        let option = {
            pageUrl: '/recommendSystem/recommendSystemGroupMgmt/ruleTemplateConfig/add.ajax',
            req: req,
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.add,
            timeout: 30000,
            body: params,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败', data: null});
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
    //修改
    app.post('/recommendSystem/recommendSystemGroupMgmt/ruleTemplateConfig/update.ajax', (req, res, next) => {
        let params = {};
        params.templateId = req.body.templateId;
        params.templateName = req.body.templateName;
        params.templateDescription = req.body.templateDescription;
        params.templateValue = req.body.templateValue;
        params.importClass = req.body.importClass;
        params.placeholders = req.body.placeholders;
        params.modifyBy = req.session.loginInfo.userid;
        let option = {
            pageUrl: '/recommendSystem/recommendSystemGroupMgmt/ruleTemplateConfig/update.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.update,
            timeout: 30000,
            body: params,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败', data: null});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode === 0) {
                res.send({error: 0, msg: '修改成功', data: null});
            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg, data: null});
            }
            else {
                res.send({error: 1, msg: '修改失败', data: null});
            }
        });
    });
    //占位符列表查询
    app.post('/recommendSystem/recommendSystemGroupMgmt/ruleTemplateConfig/placeholdersQuery.ajax', (req, res, next) => {

        let option = {
            pageUrl: '/recommendSystem/recommendSystemGroupMgmt/ruleTemplateConfig/placeholdersQuery.ajax',
            req: req,
            url: apiUrlList.placeholdersQuery,
            timeout: 30000,
            qs: req.body,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '获取失败', data: null});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode === 0) {
                res.send({error: 0, msg: '获取成功', data: body.body});
            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg, data: null});
            }
            else {
                res.send({error: 1, msg: '获取失败', data: null});
            }
        });
    });
};
function formatTime(date) {
    let d = new Date(date);
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let day = d.getDate();
    let hour = d.getHours();
    let minute = d.getMinutes();
    let second = d.getSeconds();

    function fixZero(n) {
        return n < 10 ? '0' + n : n;
    }

    return [year, month, day].map(fixZero).join('-') + ' ' + [hour, minute, second].map(fixZero).join(':');
}