const request = require('./../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').investmentAccount.accountRule;
const investTableName = 'uop_log_invest';

module.exports = function (app) {
    // 查询规则列表
    app.post('/investmentMgmt/investmentAccount/accountRule/query.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/investmentMgmt/investmentAccount/accountRule/query.ajax',
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
            if (body.returnCode == 0 && Array.isArray(body.body.rules)) {
                return res.send({error: 0, msg: '查询成功', data: body.body.rules});
            } else if (body.returnCode != 9999) {
                return res.send({error: 1, msg: body.returnMsg, data: null});
            } else {
                return res.send({error: 1, msg: '查询失败', data: null});
            }
        });
    });
    // 根据规则ID查询规则详情
    app.post('/investmentMgmt/investmentAccount/accountRule/detail.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/investmentMgmt/investmentAccount/accountRule/detail.ajax',
            req,
            url: apiUrl.detail,
            qs: req.body,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '查询失败'});
            }
            if (body.returnCode == 0) {
                return res.send({error: 0, msg: '查询成功', data: body.body});
            } else if (body.returnCode != 9999) {
                return res.send({error: 1, msg: body.returnMsg, data: null});
            } else {
                return res.send({error: 1, msg: '查询失败', data: null});
            }
        });
    });
    // 获取弹窗数据
    app.post('/investmentMgmt/investmentAccount/accountRule/getDialogInfo.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/investmentMgmt/investmentAccount/accountRule/getDialogInfo.ajax',
            req,
            url: apiUrl.getDialogInfo,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '查询规则指标失败'});
            }
            if (body.returnCode == 0 && Array.isArray(body.body.indexes)) {
                return res.send({error: 0, msg: '查询规则指标成功', data: body.body.indexes});
            } else if (body.returnCode != 9999) {
                return res.send({error: 1, msg: body.returnMsg, data: null});
            } else {
                return res.send({error: 1, msg: '查询规则指标失败', data: null});
            }
        });
    });
    // 规则新增
    app.post('/investmentMgmt/investmentAccount/accountRule/add.ajax', (req, res, next) => {
        let params = Object.assign(req.body, {createUser: req.session.loginInfo.userid});
        let investBody = JSON.parse(JSON.stringify(params));
        let ruleCondition;
        if(investBody.ruleConditionDisplay){
            delete investBody.ruleConditionDisplay;
        }
        // 
        ruleCondition = transferFn(investBody.ruleCondition);
        if(ruleCondition.includes('AND')){
            ruleCondition=ruleCondition.replace(/AND/g,'且')
        }
        if(ruleCondition.includes('OR')){
            ruleCondition=ruleCondition.replace(/OR/g,'或')
        }
        investBody.ruleCondition = ruleCondition;
        let option = {
            pageUrl: '/investmentMgmt/investmentAccount/accountRule/add.ajax',
            req,
            body:params,
            url: apiUrl.create,
            timeout: 15000,
            json: true,
        };
        request.post(option, (error, response, body) => {
            let option1 ={
                pageUrl: '/investmentMgmt/investmentAccount/accountRule/add.ajax',
                operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
                req,
                url: apiUrl.create,
                timeout: 15000,
                json: true,
                investBody,
                mappingKeyWords:'accountRule'
            }
            if (error) {
                return res.send({error: 1, msg: '新增规则指标失败'});
            }
            if (body.returnCode == 0 && body.body && body.body.ruleStatus == 1) {
                let investResponse = JSON.parse(JSON.stringify(body));
                if(investResponse.body.ruleConditionDisplay){
                    investResponse.body.ruleConditionDisplay = JSON.parse(investResponse.body.ruleConditionDisplay);
                }
                sysLogger(option1.operateType, req, option1, investResponse, investTableName);
                return res.send({error: 0, msg: '新增规则指标成功', data: body.body});
            } else {
                let investResponse = JSON.parse(JSON.stringify(body));
                sysLogger(option1.operateType, req, option1, investResponse, investTableName);
                return res.send({error: 1, msg: body.returnMsg, data: null});
            }
        });
    });
    // 规则修改
    app.post('/investmentMgmt/investmentAccount/accountRule/update.ajax', (req, res, next) => {
        let investBody = JSON.parse(JSON.stringify(req.body));
        let ruleCondition;
        if(investBody.ruleConditionDisplay){
            delete investBody.ruleConditionDisplay;
        }
        // 
        ruleCondition = transferFn(investBody.ruleCondition);
        if(ruleCondition.includes('AND')){
            ruleCondition=ruleCondition.replace(/AND/g,'且')
        }
        if(ruleCondition.includes('OR')){
            ruleCondition=ruleCondition.replace(/OR/g,'或')
        }
        investBody.ruleCondition = ruleCondition;
        let option = {
            pageUrl: '/investmentMgmt/investmentAccount/accountRule/update.ajax',
            req,
            body: req.body,
            url: apiUrl.update,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            let option1 ={
                pageUrl: '/investmentMgmt/investmentAccount/accountRule/update.ajax',
                operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
                req,
                url: apiUrl.update,
                timeout: 15000,
                json: true,
                investBody,
                mappingKeyWords:'accountRule'
            }
            let investResponse = JSON.parse(JSON.stringify(body));
            if(investResponse.body.ruleConditionDisplay){
                investResponse.body.ruleConditionDisplay = JSON.parse(investResponse.body.ruleConditionDisplay);
            }
            sysLogger(option1.operateType, req, option1, investResponse, investTableName);
            if (error) {
                return res.send({error: 1, msg: '修改规则指标失败'});
            }
            if (body.returnCode == 0 && body.body && body.body.modifySuccess) {
                return res.send({error: 0, msg: '修改规则指标成功', data: body.body});
            } else {
                return res.send({error: 1, msg: body.returnMsg, data: null});
            }
        });
    });
    // 删除规则
    app.post('/investmentMgmt/investmentAccount/accountRule/del.ajax', (req, res, next) => {
        let params ={ruleId:req.body.ruleId};
        let recordParams = {ruleName:req.body.ruleName}
        let option = {
            pageUrl: '/investmentMgmt/investmentAccount/accountRule/del.ajax',
            operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            req,
            url: apiUrl.del,
            qs: params,
            timeout: 15000,
            json: true,
            investBody:recordParams,
            mappingKeyWords:'accountRule'
        };
        request.post(option, (error, response, body) => {
            sysLogger(option.operateType, req, option, body, investTableName);
            if (error) {
                return res.send({error: 1, msg: '删除失败'});
            }
            if (body.returnCode == 0) {
                return res.send({error: 0, msg: '删除成功', data: body.body});
            } else if (body.returnCode != 0 && body.returnCode != 9999) {
                return res.send({error: 1, msg: body.returnMsg, data: null});
            } else {
                return res.send({error: 1, msg: '删除失败', data: null});
            }
        });
    });
};
function transferFn(value){
    let obj={
        'irrelevance':'偏离度',
        'appropriateness':'适当性',
        'one_yield':'1个月收益率',
        'three_yield':'3个月收益率',
        'six_yield':'6个月收益率',
        'year_yield':'1年收益率',
        'since_yield':'持仓以来收益率',
        'one_dawndown':'1个月最大回撤',
        'three_dawndown':'3个月最大回撤',
        'six_dawndown':'6个月最大回撤',
        'year_dawndown':'1年最大回撤',
        'since_dawndown':'持仓以来最大回撤'
    }
    for(let key in obj){
        if(value.includes(key)){
            console.log(value);
            var reg =new RegExp(key,'g');
            value = value.replace(reg,obj[key])
        }
    }
    return value
}