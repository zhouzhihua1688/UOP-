const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').sendCount.sendCount;


module.exports = function (app) {
    app.post('/messageCenter/sendCount/sendCount/search.ajax', (req, res, next) => {
        let params = {};
        req.body.batchId && (params.batchId = req.body.batchId);
        req.body.ruleId && (params.ruleId = req.body.ruleId);
        let option = {
            pageUrl: '/messageCenter/sendCount/sendCount/search.ajax',
            req: req,
            url: apiUrlList.search,
            body: params, //传参
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                res.send({error: 0, msg: '查询成功', data: [result.body]});
            }
            else if(result && result.returnCode != 9999){
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: 1, msg: '查询失败'});
            }
        });
    });
    //导出
    app.post('/messageCenter/sendCount/sendCount/download.ajax', (req, res, next) => {
        let params = {};
        req.body.batchId && (params.batchId = req.body.batchId);
        req.body.ruleId && (params.ruleId = req.body.ruleId);
        req.body.pageNo && (params.pageNo = req.body.pageNo);
        req.body.pageSize && (params.pageSize = req.body.pageSize);
        let option = {
            pageUrl: '/messageCenter/sendCount/sendCount/download.ajax',
            req: req,
            url: apiUrlList.download,
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
                formatDownloadData(result.body);
                res.send({error: 0, msg: '查询表格数据成功', data: result.body});
            }
            else if(result && result.returnCode != 9999){
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: 1, msg: '查询表格数据失败'});
            }
        });
    });
    //获取查询信息列表
    app.post('/messageCenter/sendCount/sendCount/getSearchList.ajax', (req, res, next) => {
        let params = {};
        req.body.ruleId && (params.routeRuleId = req.body.ruleId);
        let option = {
            pageUrl: '/messageCenter/sendCount/sendCount/getSearchList.ajax',
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
                    if (item.channelType == 2) {
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
            else if(result && result.returnCode != 9999){
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: 1, msg: '查询失败'});
            }
        });
    });
    //获取规则信息
    app.post('/messageCenter/sendCount/sendCount/getRuleInfoList.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/messageCenter/sendCount/sendCount/getRuleInfoList.ajax',
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
function formatDownloadData(arr) {
    arr.forEach((item) => {
        item.templateType = item.templateType == 0 ? '纯文字' : '图文';
        if (item.status == 0) {
            item.status = '开始';
        }
        if (item.status == 1) {
            item.status = '免打扰';
        }
        if (item.status == 2) {
            item.status = '失败';
        }
        if (item.status == 3) {
            item.status = '成功';
        }
        if (item.status == 4) {
            item.status = '无pushToken';
        }
        item.read = item.read ? '是' : '否';
    });
}