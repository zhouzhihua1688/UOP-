const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').sendCount.WXSearch;


module.exports = function (app) {
    app.post('/messageCenter/sendCount/WXSearch/search.ajax', (req, res, next) => {
        let getWXList = new Promise((resolve, reject) => {
            let params = {};
            params.batchNo = req.body.batchNo;
            params.ruleId = req.body.ruleId;
            params.ruleSource = req.body.ruleSource;
            params.status = req.body.status;
            params.beginTime = req.body.beginTime;
            params.endTime = req.body.endTime;
            params.custNo = req.body.custNo;
            let option = {
                pageUrl: '/messageCenter/sendCount/WXSearch/search.ajax --getWXList',
                req: req,
                url: apiUrlList.search,
                qs: params, //传参
                timeout: 15000,
                json: true
            };
            request(option, (error, response, body) => {
                if (error) {
                    return reject({message: '获取微信列表失败'});
                }
                if (body && body.returnCode == 0 && Array.isArray(body.body)) {
                    resolve(body.body);
                }
                else if (body && body.returnCode != 0 && body.returnCode != 9999) {
                    reject({message: body.returnMsg});
                }
                else {
                    reject({message: '获取微信列表失败'});
                }
            });
        });
        function formatContent(jsonStr) {
            let obj = JSON.parse(jsonStr);
            let str = '';
            let count = 1;
            for(let key in obj){
                str += `字段${count++}：${obj[key]}<br>`;
            }
            return str;
        }
        getWXList.then(WXList => {
            WXList.forEach(item => {
                item.showWeixinId = item.weixinId ? item.weixinId : '未绑定微信';
                switch (item.sendStatus) {
                    case 0:
                        item.showStatus = '开始';
                        break;
                    case 1:
                        item.showStatus = '免打扰';
                        break;
                    case 2:
                        item.showStatus = '失败';
                        break;
                    case 3:
                        item.showStatus = '成功';
                        break;
                    case 4:
                        item.showStatus = '无pushtoken';
                        break;
                    case 5:
                        item.showStatus = '遇到挡板未发送状态';
                        break;
                    case 6:
                        item.showStatus = '超过频次限额';
                        break;
                    case 7:
                        item.showStatus = '客户关闭设置';
                        break;
                    case 9:
                        item.showStatus = '已通过短信发送';
                        break;
                    default:
                        item.showStatus = item.sendStatus;
                }
                item.showType = '-';
                item.content = item.data;
                for (let prop in item) {
                    if (item[prop] == null || item[prop] == '') {
                        item[prop] = '-';
                    }
                }
            });
            res.send({error: 0, msg: '请求成功', data: WXList});
        }).catch(error => {
            res.send({error: 1, msg: error.message, data: null});
        });
    });
    //获取查询信息列表
    app.post('/messageCenter/sendCount/WXSearch/getSearchList.ajax', (req, res, next) => {
        let params = {};
        params.routeRuleId = req.body.ruleId;
        let option = {
            pageUrl: '/messageCenter/sendCount/WXSearch/getSearchList.ajax',
            req: req,
            url: apiUrlList.query,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0 && Array.isArray(result.body)) {
                let batchList = [];
                let batchInfo = {};
                let templateName = '';
                result.body.forEach((item) => {
                    if (item.channelType == 4) {
                        batchList.push(item.batchId);
                        batchInfo[item.batchId] = {
                            templateId: item.templateId,
                            templateName: item.templateName
                        };
                    }
                });
                let resultData = {
                    batchList: batchList,
                    batchInfo: batchInfo,
                    ruleName: result.body[0] ? result.body[0].ruleName : '',
                    templateName: batchList[0] ? batchInfo[batchList[0]].templateName : ''
                };
                res.send({error: 0, msg: '查询成功', data: resultData});
            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: 1, msg: '查询失败'});
            }
        });
    });
    //获取规则信息
    app.post('/messageCenter/sendCount/WXSearch/getRuleInfoList.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/messageCenter/sendCount/WXSearch/getRuleInfoList.ajax',
            req: req,
            url: apiUrlList.query,
            body: {},
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0 && Array.isArray(result.body)) {
                let ruleIdArr = [];
                result.body.forEach((item) => {
                    ruleIdArr.push(item.routeRuleId);
                });
                ruleIdArr = Array.from(new Set(ruleIdArr));
                let ruleInfoList = [];
                ruleIdArr.forEach((ruleId) => {
                    for (let item of result.body) {
                        if (ruleId == item.routeRuleId) {
                            ruleInfoList.push({ruleId: ruleId, ruleName: item.ruleName});
                            break;
                        }
                    }
                });
                res.send({error: 0, msg: '获取人工发送数据成功', data: ruleInfoList});
            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: 1, msg: '获取人工发送数据失败'});
            }
        });
    });
};