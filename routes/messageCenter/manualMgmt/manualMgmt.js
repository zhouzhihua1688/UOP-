const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').manualMgmt.manualMgmt;
module.exports = function (app) {
    //查询
    app.post('/messageCenter/manualMgmt/manualMgmt/search.ajax', (req, res, next) => {
        let params = {};
        req.body.routeRuleId && (params.routeRuleId = req.body.routeRuleId);
        req.body.batchId && (params.batchId = req.body.batchId);
        let option = {
            pageUrl: '/messageCenter/manualMgmt/manualMgmt/search.ajax',
            req: req,
            url: apiUrlList.search,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode === 0 && Array.isArray(result.body)) {
                let groupOption = {
                    pageUrl: '/messageCenter/ruleMgmt/ruleMgmt/getGroupList.ajax',
                    req: req,
                    url: apiUrlList.getGroupList,
                    timeout: 15000,
                    json: true
                };
                request(groupOption, (groupError, groupResponse, groupBody) => {
                    if (groupBody && groupBody.returnCode == 0 && Array.isArray(groupBody.body)) {
                        let groupList = groupBody.body;
                        result.body.forEach((item) => {
                            if (item.groupId) {
                                let groupIdArr = item.groupId.split(',');
                                let showGroup = [];
                                groupIdArr.forEach(groupId => {
                                    let groupArr = groupId.split('');
                                    while (groupArr.length < 5) {
                                        groupArr.unshift('0');
                                    }
                                    for (let i = 0; i < groupList.length; i++) {
                                        if (groupList[i].groupId == groupArr.join('')) {
                                            showGroup.push(groupList[i].groupName);
                                            break;
                                        }
                                    }
                                });
                                item.showGroup = showGroup.join(',');
                            }
                            else {
                                item.showGroup = '无客群';
                            }
                            let channelInfo = [];
                            if (item.channelType == 1) {
                                channelInfo.push('App站内信');
                            }
                            if (item.channelType == 2) {
                                channelInfo.push('App-push');
                            }
                            if (item.channelType == 3) {
                                channelInfo.push('短信');
                            }
                            if (item.channelType == 4) {
                                channelInfo.push('微信');
                            }
                            if (item.channelType == 5) {
                                channelInfo.push('微信高端');
                            }
                            item.channelInfo = channelInfo.join(',');
                        });
                    }
                    else {
                        result.body.forEach((item) => {
                            item.showGroup = '获取客群数据失败';
                            let channelInfo = [];
                            if (item.channelType == 1) {
                                channelInfo.push('App站内信');
                            }
                            if (item.channelType == 2) {
                                channelInfo.push('App-push');
                            }
                            if (item.channelType == 3) {
                                channelInfo.push('短信');
                            }
                            if (item.channelType == 4) {
                                channelInfo.push('微信');
                            }
                            if (item.channelType == 5) {
                                channelInfo.push('微信高端');
                            }
                            item.channelInfo = channelInfo.join(',');
                        });
                    }
                    res.send({error: 0, msg: '查询成功', data: result.body});
                });
            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: 1, msg: '查询失败'});
            }
        });
    });
    //站内信数量查询
    app.post('/messageCenter/manualMgmt/manualMgmt/searchCount.ajax', (req, res, next) => {
        let params = {};
        req.body.ruleId && (params.ruleId = req.body.ruleId);
        req.body.batchNo && (params.batchNo = req.body.batchNo);
        let option = {
            pageUrl: '/messageCenter/manualMgmt/manualMgmt/searchCount.ajax',
            req: req,
            url: apiUrlList.searchCount,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode === 0) {
                res.send({error: 0, msg: `查询成功,该站内信已读数为:${result.body.readCount}`});
            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: 1, msg: '查询失败'});
            }
        });
    });
    //发送消息
    app.post('/messageCenter/manualMgmt/manualMgmt/sendMsg.ajax', (req, res, next) => {
        let params = {};
        req.body.routeRuleId && (params.routeRuleId = req.body.routeRuleId);
        req.body.ruleSource && (params.ruleSource = req.body.ruleSource);
        params.ruleUser = req.session['loginInfo'].username;
        let option = {
            pageUrl: '/messageCenter/manualMgmt/manualMgmt/sendMsg.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.sendMsg,
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
                res.send({error: 0, msg: '消息发送成功'});
            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: 1, msg: '消息发送失败'});
            }
        });
    });
    //获取规则列表
    app.post('/messageCenter/manualMgmt/manualMgmt/getRuleList.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/messageCenter/manualMgmt/manualMgmt/getRuleList.ajax',
            req: req,
            url: apiUrlList.getRuleList,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode === 0 && result.body) {
                res.send({
                    error: 0,
                    msg: '获取成功',
                    data: result.body
                });
            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: 1, msg: '查询失败'});
            }
        });
    });
    //删除
    app.post('/messageCenter/manualMgmt/manualMgmt/del.ajax', (req, res, next) => {
        let params = {};
        req.body.routeRuleId && (params.routeRuleId = req.body.routeRuleId);
        req.body.batchId && (params.batchId = req.body.batchId);
        let option = {
            pageUrl: '/messageCenter/manualMgmt/manualMgmt/del.ajax',
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
                let resultNum = Number(result.returnMsg.replace(/[^0-9]/ig, ''));
                res.send({error: 0, msg: resultNum == 100 ? '全部删除成功' : '部分删除成功'});
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