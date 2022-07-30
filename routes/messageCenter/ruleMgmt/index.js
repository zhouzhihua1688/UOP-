const path = require('path');
const request = require('../../../local_data/requestWrapper');
const formidable = require('formidable');
const apiUrlList = require('../apiConfig').ruleMgmt.ruleMgmt;
const fs = require('fs');
const filepath = global.envConfig.messageCenterFilePath ? global.envConfig.messageCenterFilePath : `${require('../apiConfig').filePath}`;
module.exports = function (app) {
    //查询
    app.post('/messageCenter/ruleMgmt/ruleMgmt/search.ajax', (req, res, next) => {

        function getMessageRuleList() {
            return new Promise((resolve, reject) => {
                let params = {};
                req.body.ruleId && (params.ruleId = req.body.ruleId);
                req.body.ruleName && (params.ruleName = req.body.ruleName);
                req.body.creator && (params.creator = req.body.creator);
                let url = '';
                if (params.ruleId) {
                    url = `${apiUrlList.query}?routeRuleId=${params.ruleId}`;
                }
                else {
                    url = `${apiUrlList.search}`;
                }
                let option = {
                    pageUrl: '/messageCenter/ruleMgmt/ruleMgmt/search.ajax --getMessageRuleList',
                    req: req,
                    url: url,
                    // timeout: 15000,
                    timeout: 60000,   // 此接口偶发9999错误，返回时间刚好超过15s，因此增加超时时间为60s
                    json: true
                };
                request(option, (error, response, body) => {
                    if (error) {
                        reject({message: '操作失败'});
                    }
                    if (body && body.returnCode === 0 && body.body) {
                        let tableData = Array.isArray(body.body) ? body.body : [body.body];
                        tableData.forEach(item => {
                            item.showRuleKey = item.ruleKey ? item.ruleKey : '-';
                            if (item.priority == 1) {
                                item.showPriority = '高';
                            }
                            if (item.priority == 2) {
                                item.showPriority = '中';
                            }
                            item.showPushType = item.pushType;
                            if (item.pushType == 0) {
                                item.showPushType = '实时';
                            }
                            if (item.pushType == 1) {
                                item.showPushType = '外部系统调用';
                            }
                            if (item.pushType == 2) {
                                item.showPushType = '场景化';
                            }
                            if (item.pushType == 3) {
                                item.showPushType = '定时(' + item.schedulePushTime + ')';
                            }
                            if (item.pushType == 5) {
                                item.showPushType = '二级分类规则';
                                if(item.schedulePushTime){
                                    item.showPushType += '<br/>定时(' + item.schedulePushTime + ')';
                                } else {
                                    item.showPushType += ' 实时';
                                }
                            }
                            if (item.pushType == 6) {
                                item.showPushType = '二级分类规则(同步)';
                            }
                            item.showRuleSource = item.ruleSource;
                            if (item.showRuleSource == 'mcp') {
                                item.showRuleSource = '电商直销';
                            }
                            if (item.showRuleSource == 'acc') {
                                item.showRuleSource = '活动中心';
                            }
                            if (item.showRuleSource == 'DSC') {
                                item.showRuleSource = '柜台系统';
                            }
                            if (item.showRuleSource == 'HOP') {
                                item.showRuleSource = '对外合作平台';
                            }
                            if (item.showRuleSource == 'smac') {
                                item.showRuleSource = '现金宝系统';
                            }
                            if (item.showRuleSource == 'fundgroup') {
                                item.showRuleSource = '组合系统';
                            }
                            if (item.showRuleSource == 'fundpay') {
                                item.showRuleSource = '汇闪付';
                            }
                            if (item.showRuleSource == 'BE') {
                                item.showRuleSource = '银行引擎';
                            }
                            if (item.showRuleSource == 'ags') {
                                item.showRuleSource = '养老金';
                            }
                            if (item.showRuleSource == 'uaa') {
                                item.showRuleSource = '统一认证授权';
                            }
                            if (item.showRuleSource == 'ats') {
                                item.showRuleSource = '预约交易系统';
                            }
                            if (item.showRuleSource == 'icif') {
                                item.showRuleSource = '账户系统';
                            }
                            if (item.showRuleSource == 'fts') {
                                item.showRuleSource = '基金系统';
                            }
                            if (item.showRuleSource == 'vip') {
                                item.showRuleSource = '高端系统';
                            }
                            if (item.showRuleSource == 'credit') {
                                item.showRuleSource = '信用卡系统';
                            }
                            if (item.showRuleSource == 'BigData') {
                                item.showRuleSource = '大数据';
                            }
                            if (item.showRuleSource == 'CTS') {
                                item.showRuleSource = '核心交易系统';
                            }
                            if (item.showRuleSource == 'sfs') {
                                item.showRuleSource = '社交系统';
                            }
                            if (item.showRuleSource == 'AOS') {
                                item.showRuleSource = '自动化运营';
                            }
                            if (item.showRuleSource == 'cos') {
                                item.showRuleSource = '安全中心';
                            }
                            if (item.showRuleSource == 'uop') {
                                item.showRuleSource = '统一运营平台';
                            }
                            if (item.showRuleSource == 'reward') {
                                item.showRuleSource = '奖励系统';
                            }
                            // if (item.showRuleSource == 'PC') {
                            //     item.showRuleSource = 'PC';
                            // }
                            if (item.showRuleSource == 'csp') {
                                item.showRuleSource = '资金清算系统';
                            }
                            if (item.showRuleSource == 'INST') {
                                item.showRuleSource = '企业版';
                            }
                            if (item.showRuleSource == 'PRD') {
                                item.showRuleSource = '产品中心';
                            }
                            if (item.showRuleSource == 'OMS') {
                                item.showRuleSource = '营运平台';
                            }
                            if (item.showRuleSource == 'CSC') {
                                item.showRuleSource = '定投公众号';
                            }
                            if (item.showRuleSource == 'ASSET') {
                                item.showRuleSource = '资产中心';
                            }
                            item.channelInfo = item.templateChannelList.map(item => {
                                if (item.channelType == 1) {
                                    return 'App站内信';
                                }
                                if (item.channelType == 2) {
                                    return 'App-push';
                                }
                                if (item.channelType == 3) {
                                    return '短信';
                                }
                                if (item.channelType == 4) {
                                    return '微信';
                                }
                                if (item.channelType == 5) {
                                    return '微信高端';
                                }
                                if (item.channelType == 6) {
                                    return '定投公众号';
                                }
                            }).join(',');
                            item.groupType = item.csvfileName ? '2' : '1';
                            let arr = item.schedulePushTime.split(' ');
                            arr.shift();
                            arr.shift();
                            item.schedulePushTimeForWeb = arr.join(' ');
                        });
                        resolve(tableData);
                    }
                    else if (body && body.returnCode != 9999) {
                        reject({message: body.returnMsg});
                    }
                    else {
                        reject({message: '查询失败'});
                    }
                });
            });
        }

        function getClassList() {
            return new Promise((resolve, reject) => {
                let option = {
                    pageUrl: '/messageCenter/ruleMgmt/ruleMgmt/search.ajax --getClassList',
                    req: req,
                    url: apiUrlList.searchCategory,
                    timeout: 15000,
                    json: true
                };
                request(option, (error, response, body) => {
                    if (error) {
                        reject({message: '操作失败'});
                    }
                    if (body && body.returnCode === 0 && body.body) {
                        let categoryList = body.body.map(item => {
                            return {
                                categoryId: item.categoryId,
                                categoryName: item.categoryName
                            };
                        });
                        resolve(categoryList);
                    }
                    else if (body && body.returnCode != 9999) {
                        reject({message: body.returnMsg});
                    }
                    else {
                        reject({message: '查询失败'});
                    }
                });
            });
        }

        function getGroupList() {
            return new Promise((resolve, reject) => {
                let option = {
                    pageUrl: '/messageCenter/ruleMgmt/ruleMgmt/search.ajax --getGroupList',
                    req: req,
                    url: apiUrlList.getGroupList,
                    timeout: 15000,
                    json: true
                };
                request(option, (error, response, body) => {
                    if (error) {
                        resolve(null);
                    }
                    if (body && body.returnCode == 0 && Array.isArray(body.body)) {
                        resolve(body.body);
                    }
                    else {
                        resolve(null);
                    }
                });
            });
        }

        Promise.all([getMessageRuleList(), getClassList(), getGroupList()]).then((body) => {
            let [messageRuleList, classList, groupList] = body;
            messageRuleList.forEach(item => {
                let nameIndex = classList.map(item => item.categoryId).indexOf(item.categoryId);
                if (item.categoryId == 30) {
                    item.showCategoryName = '系统消息';
                }
                else if (nameIndex > -1) {
                    item.showCategoryName = classList[nameIndex].categoryName;
                }
                else {
                    item.showCategoryName = '-';
                }
                if (item.groupId && Array.isArray(groupList)) {
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
                else if (item.groupId && !groupList) {
                    item.showGroup = '获取客群数据失败';
                }
                else if (!item.groupId) {
                    item.showGroup = '无客群';
                }
                else {
                    item.showGroup = '--';
                }
            });
            res.send({error: 0, msg: '请求成功', data: messageRuleList});
        }).catch(error => {
            res.send({error: 1, msg: error.message, data: null});
        });
    });
    //删除
    app.post('/messageCenter/ruleMgmt/ruleMgmt/del.ajax', (req, res, next) => {
        let params = {};
        req.body.routeRuleId && (params.routeRuleId = req.body.routeRuleId);
        let option = {
            pageUrl: '/messageCenter/ruleMgmt/ruleMgmt/del.ajax',
            req: req,
            operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.del,
            qs: params,
            timeout: 15000,
            json: true
        };
        request.del(option, (error, response, body) => {
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
    //根据模板ID查询模板详情
    app.post('/messageCenter/ruleMgmt/ruleMgmt/queryTemplate.ajax', (req, res, next) => {
        let params = {};
        params.templateId = req.body.templateId;
        let option = {
            pageUrl: '/messageCenter/ruleMgmt/ruleMgmt/queryTemplate.ajax',
            req: req,
            url: apiUrlList.queryTemplate,
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
                if (result.body[0].channelType == 1) {
                    result.body[0].showChannelType = 'App站内信';
                }
                if (result.body[0].channelType == 2) {
                    result.body[0].showChannelType = 'App-push';
                }
                if (result.body[0].channelType == 3) {
                    result.body[0].showChannelType = '短信';
                }
                if (result.body[0].channelType == 4) {
                    result.body[0].showChannelType = '微信';
                }
                if (result.body[0].channelType == 5) {
                    result.body[0].showChannelType = '微信高端';
                }
                if (result.body[0].channelType == 6) {
                    result.body[0].showChannelType = '定投公众号';
                }
                res.send({error: 0, msg: '获取模板详情成功', data: result.body[0]});
            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: 1, msg: '获取模板详情失败'});
            }
        });
    });
    //获取消息二级分类列表
    app.post('/messageCenter/ruleMgmt/ruleMgmt/getSubClassList.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/messageCenter/ruleMgmt/ruleMgmt/getSubClassList.ajax',
            req: req,
            url: apiUrlList.getSubList,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode === 0) {
                res.send({error: 0, msg: '调用成功', data: result.body.filter(item => item.categoryId == req.body.categoryId)});
            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg, data: null});
            }
            else {
                res.send({error: 1, msg: '调用失败', data: null});
            }
        });
    });
    //获取消息模板
    app.post('/messageCenter/ruleMgmt/ruleMgmt/getSelectList.ajax', (req, res, next) => {
        let params = {};
        req.body.channelType && (params.channelType = req.body.channelType);
        let option = {
            pageUrl: '/messageCenter/ruleMgmt/ruleMgmt/getSelectList.ajax',
            req: req,
            url: apiUrlList.getSelectList,
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
                let templateList = [];
                result.body.forEach((item) => {
                    templateList.push({
                        templateId: item.templateId,
                        templateName: item.templateName,
                        pushType: item.pushType
                    });
                });
                res.send({error: 0, msg: '获取模板列表成功', data: templateList});
            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: 1, msg: '获取模板列表失败'});
            }
        });
    });
    //获取静态客群
    app.post('/messageCenter/ruleMgmt/ruleMgmt/getGroupList.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/messageCenter/ruleMgmt/ruleMgmt/getGroupList.ajax',
            req: req,
            url: apiUrlList.getGroupList,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode === 0 && Array.isArray(result.body)) {
                let resultData = [];
                result.body.forEach((item) => {
                    resultData.push({
                        groupId: item.groupId,
                        groupName: item.groupName,
                        groupNum: '获取中...',
                        check: false
                    });
                });
                res.send({error: 0, msg: '获取用户客群成功', data: resultData});
            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: 1, msg: '获取用户客群失败'});
            }
        });
    });
    //获取默认分组客群
    app.post('/messageCenter/classMgmt/classMgmt/getInitGroup.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/messageCenter/classMgmt/classMgmt/getInitGroup.ajax',
            req: req,
            url: apiUrlList.getGroupList,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode === 0 && Array.isArray(result.body)) {
                let obj = {};
                for (let i = 0; i < result.body.length; i++) {
                    if (result.body[i].groupName == '默认分组') {
                        obj.check = true;
                        obj.groupId = result.body[i].groupId;
                        obj.groupName = result.body[i].groupName;
                        break;
                    }
                }
                if (obj.groupId) {
                    res.send({error: 0, msg: '获取默认分组成功', data: obj});
                }
                else {
                    res.send({error: 1, msg: '获取默认分组失败'});
                }
            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: 1, msg: '获取默认分组失败'});
            }
        });
    });
    //获取静态客群数量
    app.post('/messageCenter/ruleMgmt/ruleMgmt/getGroupNum.ajax', (req, res, next) => {
        let groupIds = JSON.parse(req.body.groupIds);
        let option = {
            pageUrl: '/messageCenter/ruleMgmt/ruleMgmt/getGroupNum.ajax',
            req: req,
            url: apiUrlList.getGroupNum,
            qs: {groupId: groupIds[0]},
            timeout: 15000,
            json: true
        };
        request.get(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode === 0) {
                res.send({error: 0, msg: '获取静态客群数量成功', data: result.body});
            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: 1, msg: '获取静态客群数量失败'});
            }
        });
    });
    //新增消息规则无文件
    app.post('/messageCenter/ruleMgmt/ruleMgmt/addGroupList.ajax', (req, res, next) => {
        let params = {};
        params.ruleName = req.body.ruleName;
        params.categoryId = req.body.categoryId;
        params.subCategoryId = req.body.subCategoryId ? req.body.subCategoryId : 0;
        params.templateChannelList = JSON.parse(req.body.templateChannelList);
        params.pushType = req.body.pushType;
        req.body.subPushType && (params.subPushType = Number(req.body.subPushType));
        params.slowStatus = req.body.is_slow === 'true';
        if(req.body.subCategoryId){
            if(req.body.isTongBuCMS === 'true'){
                params.pushType = 6;
            }
            else {
                params.pushType = 5;
            }
        }
        params.ruleKey = req.body.ruleKey;
        params.eventType = req.body.eventType;
        params.expiredTime = req.body.expiredTime;
        params.priority = req.body.priority;
        params.ruleSource = req.body.ruleSource;
        params.groupId = req.body.groupId;
        // 202220215 和国瑾确认，此处所有的schedulePushTime都传递（可以为空字符串""）S
        // params.schedulePushTime = req.body.subCategoryId ? '' : ('0 0 ' + req.body.schedulePushTime);
        params.schedulePushTime = req.body.schedulePushTime ? ('0 0 ' + req.body.schedulePushTime) : '';
        // 202220215 和国瑾确认，此处所有的schedulePushTime都传递（可以为空字符串""）E
        params.ruleSource = params.ruleSource == 'e7ad0120840f4ce94e25771f97d4721d' ? 'mcp' : params.ruleSource;
        params.pushTime = 0;
        params.creator = req.session['loginInfo'].username;
        params.csvfileName = '';
        let option = {
            pageUrl: '/messageCenter/ruleMgmt/ruleMgmt/addGroupList.ajax',
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
    //新增消息规则含文件
    app.post('/messageCenter/ruleMgmt/ruleMgmt/addExcel.ajax', (req, res, next) => {
        try {
            let form = new formidable.IncomingForm();
            form.uploadDir = filepath;
            form.keepExtensions = true;
            form.parse(req, (err, fields, files) => {
                if (err) {
                    console.log('/messageCenter/ruleMgmt/ruleMgmt/addExcel.ajax error:', err.message);
                    return res.send({error: 1, msg: '文件上传出错', data: null});
                }
                console.log('消息模板数据接收完毕:', fields);
                console.log('消息模板文件接收完毕:', files);
                let channelArr = fields.channelArr.split(',');
                let templateArr = fields.templateArr.split(',');
                let templateChannelList = [];
                for (let i = 0; i < channelArr.length; i++) {
                    templateChannelList.push({
                        channelType: channelArr[i],
                        templateId: templateArr[i]
                    });
                }
                fields.templateChannelList = templateChannelList;
                fields.creator = req.session['loginInfo'].username;
                // 202220215 和国瑾确认，此处所有的schedulePushTime都传递（可以为空字符串""）S
                // fields.schedulePushTime = fields.subCategoryId ? '' : ('0 0 ' + fields.schedulePushTime);
                fields.schedulePushTime = fields.schedulePushTime ? ('0 0 ' + fields.schedulePushTime) : '';
                // 202220215 和国瑾确认，此处所有的schedulePushTime都传递（可以为空字符串""）E
                fields.ruleSource = fields.ruleSource == 'e7ad0120840f4ce94e25771f97d4721d' ? 'mcp' : fields.ruleSource;
                fields.csvfileName = path.resolve(files.file.path);
                if(fields.subCategoryId){
                    if(fields.isTongBuCMS === 'true'){
                        fields.pushType = 6;
                    }
                    else {
                        fields.pushType = 5;
                    }
                }
                fields.slowStatus = fields.is_slow === 'true';
                fields.groupId = '';
                let option = {
                    pageUrl: '/messageCenter/ruleMgmt/ruleMgmt/addExcel.ajax',
                    req: req,
                    operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
                    url: apiUrlList.add,
                    body: fields,
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
        } catch (err) {
            console.log('/messageCenter/ruleMgmt/ruleMgmt/addExcel.ajax error:', err.message);
            return res.send({error: 1, msg: '文件上传出错', data: null});
        }
    });
    //修改消息规则无文件
    app.post('/messageCenter/ruleMgmt/ruleMgmt/updateGroupList.ajax', (req, res, next) => {
        let params = {};
        params.ruleId = req.body.ruleId;
        params.ruleName = req.body.ruleName;
        params.categoryId = req.body.categoryId;
        params.subCategoryId = req.body.subCategoryId ? req.body.subCategoryId : 0;
        params.templateChannelList = JSON.parse(req.body.templateChannelList);
        params.pushType = req.body.pushType;
        req.body.subPushType && (params.subPushType = Number(req.body.subPushType));
        params.slowStatus = req.body.is_slow === 'true';
        if(req.body.subCategoryId){
            if(req.body.isTongBuCMS === 'true'){
                params.pushType = 6;
            }
            else {
                params.pushType = 5;
            }
        }
        params.ruleKey = req.body.ruleKey;
        params.eventType = req.body.eventType;
        params.expiredTime = req.body.expiredTime;
        params.priority = req.body.priority;
        params.ruleSource = req.body.ruleSource;
        params.groupId = req.body.groupId;
        // 202220215 和国瑾确认，此处所有的schedulePushTime都传递（可以为空字符串""）S
        // params.schedulePushTime = req.body.subCategoryId ? '' : ('0 0 ' + req.body.schedulePushTime);
        params.schedulePushTime = req.body.schedulePushTime ? ('0 0 ' + req.body.schedulePushTime) : '';
        // 202220215 和国瑾确认，此处所有的schedulePushTime都传递（可以为空字符串""）E
        params.ruleSource = params.ruleSource == 'e7ad0120840f4ce94e25771f97d4721d' ? 'mcp' : params.ruleSource;
        params.pushTime = 0;
        params.creator = req.session['loginInfo'].username;
        params.csvfileName = '';
        let option = {
            pageUrl: '/messageCenter/ruleMgmt/ruleMgmt/updateGroupList.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.update,
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
                res.send({error: 0, msg: '修改成功'});
            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: 1, msg: '修改失败'});
            }
        });
    });
    //修改消息规则含文件
    app.post('/messageCenter/ruleMgmt/ruleMgmt/updateAddExcel.ajax', (req, res, next) => {
        let form = new formidable.IncomingForm();
        form.uploadDir = filepath;
        form.keepExtensions = true;
        form.parse(req, (err, fields, files) => {
            console.log('消息模板数据接收完毕:', fields);
            console.log('消息模板文件接收完毕:', files);
            let channelArr = fields.channelArr.split(',');
            let templateArr = fields.templateArr.split(',');
            let templateChannelList = [];
            for (let i = 0; i < channelArr.length; i++) {
                templateChannelList.push({
                    channelType: channelArr[i],
                    templateId: templateArr[i]
                });
            }
            fields.templateChannelList = templateChannelList;
            fields.creator = req.session['loginInfo'].username;
            // 202220215 和国瑾确认，此处所有的schedulePushTime都传递（可以为空字符串""）S
            // fields.schedulePushTime = fields.subCategoryId ? '' : ('0 0 ' + fields.schedulePushTime);
            fields.schedulePushTime = fields.schedulePushTime ? ('0 0 ' + fields.schedulePushTime) : '';
            // 202220215 和国瑾确认，此处所有的schedulePushTime都传递（可以为空字符串""）E
            fields.ruleSource = fields.ruleSource == 'e7ad0120840f4ce94e25771f97d4721d' ? 'mcp' : fields.ruleSource;
            if(fields.subCategoryId){
                if(fields.isTongBuCMS === 'true'){
                    fields.pushType = 6;
                }
                else {
                    fields.pushType = 5;
                }
            }
            fields.slowStatus = fields.is_slow === 'true';
            fields.csvfileName = path.resolve(files.file.path);
            fields.groupId = '';
            let option = {
                pageUrl: '/messageCenter/ruleMgmt/ruleMgmt/updateAddExcel.ajax',
                req: req,
                operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
                url: apiUrlList.update,
                body: fields,
                timeout: 15000,
                json: true
            };
            request.post(option, (error, response, body) => {
                if (error) {
                    return res.send({error: 1, msg: '操作失败'});
                }
                let result = typeof body === 'string' ? JSON.parse(body) : body;
                if (result && result.returnCode === 0) {
                    res.send({error: 0, msg: '修改成功'});
                }
                else if (result && result.returnCode != 9999) {
                    res.send({error: 1, msg: result.returnMsg});
                }
                else {
                    res.send({error: 1, msg: '修改失败'});
                }
            });
        });
    });
    //上传csv文件
    app.post('/messageCenter/ruleMgmt/ruleMgmt/uploadCSV.ajax', (req, res, next) => {
        let form = new formidable.IncomingForm();
        form.uploadDir = filepath;
        form.keepExtensions = true;
        form.parse(req, (err, fields, files) => {
            if (err) {
                return res.send({error: 1, msg: '本地上传csv文件失败', data: null});
            }
            console.log('本地上传csv文件成功:', files);
            let option = {
                pageUrl: '/messageCenter/ruleMgmt/ruleMgmt/uploadCSV.ajax',
                req: req,
                operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
                url: apiUrlList.uploadCSV,
                body: {
                    csvfileName: files.file ? path.resolve(files.file.path) : ''
                },
                timeout: 15000,
                json: true
            };
            request.post(option, (error, response, body) => {
                if (error) {
                    return res.send({error: 1, msg: '文件路径上传失败', data: null});
                }
                if (body && body.returnCode == 0) {
                    res.send({error: 0, msg: '上传成功', data: null});
                }
                else if (body.returnCode != 0 && body.returnCode != 9999) {
                    res.send({error: 1, msg: body.returnMsg, data: null});
                }
                else {
                    res.send({error: 1, msg: '文件路径上传失败', data: null});
                }
            });
        });
    });
    //上传excel文件
    app.post('/messageCenter/ruleMgmt/ruleMgmt/uploadExcel.ajax', (req, res, next) => {
        try {
            let ExcelData = JSON.parse(req.body.ExcelData);
            for (let item of ExcelData) {
                item.templateChannelList = JSON.parse(item.templateChannelList);
                !item.ruleKey && (item.ruleKey = '');
                !item.eventType && (item.eventType = '');
                item.pushTime = 0;
                !item.schedulePushTime && (item.schedulePushTime = '');
                !item.groupId && (item.groupId = '');
                !item.csvfileName && (item.csvfileName = '');
                item.creator = req.session['loginInfo'].username;
            }
            console.log('ExcelData:', ExcelData);
            if (ExcelData.length === 0) {
                return {error: 1, msg: 'Excel表格无数据', data: null};
            }
            let errorDataIndex = [];
            // 检查每条数据格式是否正确,若不正确,指出具体哪条数据
            function checkTemplate(item) {
                if (!item.ruleName ||
                    !item.categoryId ||
                    item.templateChannelList.length === 0 ||
                    !item.priority ||
                    !item.ruleSource) {
                    return {error: 1, msg: '必填字段为空或格式错误'};
                }
                let dayReg = /^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-)) (20|21|22|23|[0-1]?\d):[0-5]?\d:[0-5]?\d$/;
                if (!dayReg.test(item.expiredTime)) {
                    return {error: 1, msg: '失效时间格式有误'};
                }
                // 实时发送方式
                if (item.pushType == 0 || item.pushType == 5 || item.pushType == 6) {
                    if (!item.groupId && !item.csvfileName) {
                        return {error: 1, msg: '未填写客群'};
                    }
                }
                // 外部系统调用方式
                if (item.pushType == 1) {
                    if (!item.ruleKey) {
                        return {error: 1, msg: '未填写规则编码'};
                    }
                    if (!item.eventType) {
                        return {error: 1, msg: '未填写事件类型'};
                    }
                }
                // 场景化调用方式
                if (item.pushType == 2) {
                    if (!item.ruleKey) {
                        return {error: 1, msg: '未填写规则编码'};
                    }
                    if (item.schedulePushTime == '') {
                        return {error: 1, msg: '未填写推送时间'};
                    }
                }
                // 定时调用方式
                if (item.pushType == 3) {
                    if (item.schedulePushTime == '') {
                        return {error: 1, msg: '未填写发送时间'};
                    }
                    if (!item.groupId && !item.csvfileName) {
                        return {error: 1, msg: '未填写客群'};
                    }
                }
                return {error: 0, msg: 'success'};
            }

            for (let i = 0; i < ExcelData.length; i++) {
                let resultObj = checkTemplate(ExcelData[i]);
                if (resultObj.error === 1) {
                    errorDataIndex.push({
                        index: i + 1,
                        msg: resultObj.msg
                    });
                }
            }
            if (errorDataIndex.length > 0) {
                return res.send({
                    error: 1,
                    msg: `解析Excel表格第${errorDataIndex.map(item => item.index).join('，')}行数据出错,错误信息分别为:${errorDataIndex.map(item => item.msg).join('，')},请检查格式是否正确`,
                    data: null
                });
            }
            let ExcelDataToPromise = function (item) {
                return new Promise((resolve, reject) => {
                    let option = {
                        pageUrl: '/messageCenter/ruleMgmt/ruleMgmt/uploadExcel.ajax',
                        req: req,
                        operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
                        url: apiUrlList.add,
                        body: item,
                        timeout: 15000,
                        json: true
                    };
                    request.post(option, (error, response, body) => {
                        if (error) {
                            return reject(error.message);
                        }
                        let result = typeof body === 'string' ? JSON.parse(body) : body;
                        if (result && result.returnCode === 0) {
                            return resolve();
                        }
                        else if (result && result.returnCode != 9999) {
                            return reject(result.returnMsg);
                        }
                        else {
                            return reject('上传失败');
                        }
                    });
                });
            };
            Promise.all(ExcelData.map(item => ExcelDataToPromise(item))).then(() => {
                return res.send({error: 0, msg: `上传成功`, data: null});
            }).catch(error => {
                return res.send({error: 1, msg: `上传失败:${error.message}`, data: null});
            });
        }

        catch (err) {
            console.log(err);
        }
    });
    //获得所有模板
    app.post('/messageCenter/ruleMgmt/ruleMgmt/getTemplate.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/messageCenter/ruleMgmt/ruleMgmt/getTemplate.ajax',
            req: req,
            url: apiUrlList.getTemplate,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode === 0 && Array.isArray(result.body)) {
                res.send({error: 0, msg: '查询成功', data: result.body});
            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: 1, msg: '查询失败'});
            }
        });
    });
};