/**
 * Created by admin on 2019/5/7.
 */

const request = require('../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').tradeInfoQuery.tradeApplyForQuery;
module.exports = function (app) {
    // 获取  基金名称查询数据
    app.post('/businessMgmt/tradeInfoQuery/tradeApplyForQuery/selectList.ajax', (req, res, next) => {
        //基金名称列表
        function getFundId() {
            return new Promise((resolve, reject) => {
                let option = {
                    req: req,
                    url: apiUrl.fundIdList,
                    body: {pageNo: 1, pageSize: 5000},
                    timeout: 15000,
                    json: true
                };
                console.log('/businessMgmt/tradeInfoQuery/tradeApplyForQuery/selectList.ajax --getFundId option:', {...option,req:'#',body:'******'});
                request.post(option, (error, response, body) => {
                    console.log('/businessMgmt/tradeInfoQuery/tradeApplyForQuery/selectList.ajax --getFundId error:', error);
                    console.log('/businessMgmt/tradeInfoQuery/tradeApplyForQuery/selectList.ajax --getFundId statusCode:', response && response.statusCode);
                    console.log('/businessMgmt/tradeInfoQuery/tradeApplyForQuery/selectList.ajax --getFundId body:', '******');
                    if (error) {
                        return resolve()
                    }
                    if (body && body.returnCode == 0 && Array.isArray(body.body.fundInfos)) {
                        resolve(body.body.fundInfos);
                    }
                    else if (body && body.returnCode != 0 && body.returnCode != 9999) {
                        return resolve()
                    }
                    else {
                        return resolve()
                    }
                });
            });
        }

        //业务类型列表
        function getApKind() {
            return new Promise((resolve, reject) => {
                let option = {
                    req: req,
                    url: apiUrl.commonServicesQuery,
                    qs: {pmst: 'SYSTEM', pmkey: 'TAPKIND'},
                    timeout: 15000,
                    json: true
                };
                console.log('/businessMgmt/tradeInfoQuery/tradeApplyForQuery/selectList.ajax --getApKind option:', {...option,req:'#',body:'******'});
                request(option, (error, response, body) => {
                    console.log('/businessMgmt/tradeInfoQuery/tradeApplyForQuery/selectList.ajax --getApKind error:', error);
                    console.log('/businessMgmt/tradeInfoQuery/tradeApplyForQuery/selectList.ajax --getApKind statusCode:', response && response.statusCode);
                    console.log('/businessMgmt/tradeInfoQuery/tradeApplyForQuery/selectList.ajax --getApKind body:', '******');
                    if (error) {
                        return resolve()
                    }
                    if (body && body.returnCode == 0 && Array.isArray(body.body)) {
                        resolve(body.body);
                    }
                    else if (body && body.returnCode != 0 && body.returnCode != 9999) {
                        return resolve()
                    }
                    else {
                        return resolve()
                    }
                });
            });
        }

        //具体业务类型
        function getSubApKind() {
            return new Promise((resolve, reject) => {
                let option = {
                    req: req,
                    url: apiUrl.commonServicesQuery,
                    qs: {pmst: 'SYSTEM', pmkey: 'SUBAPKIND'},
                    timeout: 15000,
                    json: true
                };
                console.log('/businessMgmt/tradeInfoQuery/tradeApplyForQuery/selectList.ajax --getApKind option:', {...option,req:'#',qs:'******'});
                request(option, (error, response, body) => {
                    console.log('/businessMgmt/tradeInfoQuery/tradeApplyForQuery/selectList.ajax --getApKind error:', error);
                    console.log('/businessMgmt/tradeInfoQuery/tradeApplyForQuery/selectList.ajax --getApKind statusCode:', response && response.statusCode);
                    console.log('/businessMgmt/tradeInfoQuery/tradeApplyForQuery/selectList.ajax --getApKind body:', '******');
                    if (error) {
                        // reject({message: '数据获取失败'});
                        return resolve()
                    }
                    if (body && body.returnCode == 0 && Array.isArray(body.body)) {
                        resolve(body.body);
                    }
                    else if (body && body.returnCode != 0 && body.returnCode != 9999) {
                        return resolve()
                    }
                    else {
                        return resolve()
                    }
                });
            });
        }

        //所属Ta
        function getTaNo() {
            return new Promise((resolve, reject) => {
                let option = {
                    req: req,
                    url: apiUrl.commonServicesQuery,
                    qs: {pmst: 'SYSTEM', pmkey: 'TANO'},
                    timeout: 15000,
                    json: true
                };
                console.log('/businessMgmt/tradeInfoQuery/tradeApplyForQuery/selectList.ajax --getApKind option:', {...option,req:'#',qs:'******'});
                request(option, (error, response, body) => {
                    console.log('/businessMgmt/tradeInfoQuery/tradeApplyForQuery/selectList.ajax --getApKind error:', error);
                    console.log('/businessMgmt/tradeInfoQuery/tradeApplyForQuery/selectList.ajax --getApKind statusCode:', response && response.statusCode);
                    console.log('/businessMgmt/tradeInfoQuery/tradeApplyForQuery/selectList.ajax --getApKind body:', '******');
                    if (error) {
                        return resolve()
                    }
                    if (body && body.returnCode == 0 && Array.isArray(body.body)) {
                        resolve(body.body);
                    }
                    else if (body && body.returnCode != 0 && body.returnCode != 9999) {
                        return resolve()
                    }
                    else {
                        return resolve()
                    }
                });
            });
        }

        //资金模式
        function getCapitalMode() {
            return new Promise((resolve, reject) => {
                let option = {
                    req: req,
                    url: apiUrl.commonServicesQuery,
                    qs: {pmst: 'SYSTEM', pmkey: 'CAPITALMODE'},
                    timeout: 15000,
                    json: true
                };
                console.log('/businessMgmt/tradeInfoQuery/tradeApplyForQuery/selectList.ajax --getApKind option:', {...option,req:'#',qs:'******'});
                request(option, (error, response, body) => {
                    console.log('/businessMgmt/tradeInfoQuery/tradeApplyForQuery/selectList.ajax --getApKind error:', error);
                    console.log('/businessMgmt/tradeInfoQuery/tradeApplyForQuery/selectList.ajax --getApKind statusCode:', response && response.statusCode);
                    console.log('/businessMgmt/tradeInfoQuery/tradeApplyForQuery/selectList.ajax --getApKind body:', '******');
                    if (error) {
                        return resolve()
                    }
                    if (body && body.returnCode == 0 && Array.isArray(body.body)) {
                        resolve(body.body);
                    }
                    else if (body && body.returnCode != 0 && body.returnCode != 9999) {
                        return resolve()
                    }
                    else {
                        return resolve()
                    }
                });
            });
        }

        Promise.all([getFundId(), getApKind(), getSubApKind(), getTaNo(), getCapitalMode()]).then((result) => {
            var resultData = {
                getFundId: null,
                getApKind: null,
                getSubApKind: null,
                getTaNo: null,
                getCapitalMode: null
            };
            resultData.getFundId = result[0];
            resultData.getApKind = result[1];
            resultData.getSubApKind = result[2];
            resultData.getTaNo = result[3];
            resultData.getCapitalMode = result[4];
            res.send({error: 0, msg: '数据获取成功', data: resultData})
        }).catch((error) => {
            res.send({error: 1, msg: error.message, data: null});
        })


    });
    //查询
    app.post('/businessMgmt/tradeInfoQuery/tradeApplyForQuery/queryInfo.ajax', (req, res, next) => {
        //查询当前页的原数据
        function getPaginalData() {
            return new Promise((resolve, reject) => {
                let userId = req.session.loginInfo.userid;
                let params = {};
                let paramsString = JSON.parse(req.body.webParams);
                params.taNos = paramsString.taNos;
                params.fundIds = paramsString.fundIds;
                params.apkinds = paramsString.apkinds;
                params.subApkinds = paramsString.subApkinds;
                params.custTypes = paramsString.custTypes;
                params.statuses = paramsString.statuses;
                params.shareTypes = paramsString.shareTypes;
                params.startDate = paramsString.startDate.replace(/-/g, '');
                params.endDate = paramsString.endDate.replace(/-/g, '');
                params.idNo = paramsString.idNo;
                params.custName = paramsString.custName;
                params.fundAcco = paramsString.fundAcco;
                params.tradeAcco = paramsString.tradeAcco;
                params.pageNo = paramsString.pageNo;
                params.pageSize = paramsString.pageSize;
                let option = {
                    req: req,
                    url: apiUrl.queryList,
                    body: params,
                    timeout: 15000,
                    json: true
                };
                console.log('/businessMgmt/tradeInfoQuery/tradeApplyForQuery/queryInfo.ajax option:', {...option,req:'#',body:'******'});
                request.post(option, (error, response, body) => {
                    console.log('/businessMgmt/tradeInfoQuery/tradeApplyForQuery/queryInfo.ajax error:', error);
                    console.log('/businessMgmt/tradeInfoQuery/tradeApplyForQuery/queryInfo.ajax statusCode:', response && response.statusCode);
                    console.log('/businessMgmt/tradeInfoQuery/tradeApplyForQuery/queryInfo.ajax body:', '******');
                    if (error) {
                        reject({message: '数据获取失败'});
                    }
                    let result = typeof body === 'string' ? JSON.parse(body) : body;
                    if (result && result.returnCode == '0') {
                        result.body.userId = userId;
                        result.body.pages = Math.ceil(result.body.totalSize / params.pageSize);//最大页码
                        result.body.pageNum = params.pageNo;//当前页

                        resolve(result.body);
                    }
                    else if (body && body.returnCode != 0 && body.returnCode != 9999) {
                        reject({message: body.returnMsg});
                    }
                    else {
                        reject({message: '数据获取失败'});
                    }
                });
            })
        }

        //翻译
        //资金来源
        function getCashFrom() {
            return new Promise((resolve, reject) => {
                let option = {
                    req: req,
                    url: apiUrl.commonServicesQuery,
                    qs: {pmst: 'SYSTEM', pmkey: 'CASHFROM'},
                    timeout: 15000,
                    json: true
                };
                console.log('/businessMgmt/tradeInfoQuery/tradeApplyForQuery/selectList.ajax --getApKind option:', {...option,qs:'#',body:'******'});
                request(option, (error, response, body) => {
                    console.log('/businessMgmt/tradeInfoQuery/tradeApplyForQuery/selectList.ajax --getApKind error:', error);
                    console.log('/businessMgmt/tradeInfoQuery/tradeApplyForQuery/selectList.ajax --getApKind statusCode:', response && response.statusCode);
                    console.log('/businessMgmt/tradeInfoQuery/tradeApplyForQuery/selectList.ajax --getApKind body:', '******');
                    if (error) {
                        return resolve()
                    }
                    if (body && body.returnCode == 0 && Array.isArray(body.body)) {
                        resolve(body.body);
                    }
                    else if (body && body.returnCode != 0 && body.returnCode != 9999) {
                        return resolve()
                    }
                    else {
                        return resolve()
                    }
                });
            });
        }

        //资金模式
        function getCapitalMode() {
            return new Promise((resolve, reject) => {
                let option = {
                    req: req,
                    url: apiUrl.commonServicesQuery,
                    qs: {pmst: 'SYSTEM', pmkey: 'CAPITALMODE'},
                    timeout: 15000,
                    json: true
                };
                console.log('/businessMgmt/tradeInfoQuery/tradeApplyForQuery/selectList.ajax --getApKind option:', {...option,req:'#',qs:'******'});
                request(option, (error, response, body) => {
                    console.log('/businessMgmt/tradeInfoQuery/tradeApplyForQuery/selectList.ajax --getApKind error:', error);
                    console.log('/businessMgmt/tradeInfoQuery/tradeApplyForQuery/selectList.ajax --getApKind statusCode:', response && response.statusCode);
                    console.log('/businessMgmt/tradeInfoQuery/tradeApplyForQuery/selectList.ajax --getApKind body:', '******');
                    if (error) {
                        return resolve()
                    }
                    if (body && body.returnCode == 0 && Array.isArray(body.body)) {
                        resolve(body.body);
                    }
                    else if (body && body.returnCode != 0 && body.returnCode != 9999) {
                        return resolve()
                    }
                    else {
                        return resolve()
                    }
                });
            });
        }

        //委托方式
        function getAccptMd() {
            return new Promise((resolve, reject) => {
                let option = {
                    req: req,
                    url: apiUrl.commonServicesQuery,
                    qs: {pmst: 'SYSTEM', pmkey: 'ACCPTMD'},
                    timeout: 15000,
                    json: true
                };
                console.log('/businessMgmt/tradeInfoQuery/tradeApplyForQuery/selectList.ajax --getApKind option:', {...option,req:'#',qs:'******'});
                request(option, (error, response, body) => {
                    console.log('/businessMgmt/tradeInfoQuery/tradeApplyForQuery/selectList.ajax --getApKind error:', error);
                    console.log('/businessMgmt/tradeInfoQuery/tradeApplyForQuery/selectList.ajax --getApKind statusCode:', response && response.statusCode);
                    console.log('/businessMgmt/tradeInfoQuery/tradeApplyForQuery/selectList.ajax --getApKind body:', '******');
                    if (error) {
                        return resolve()
                    }
                    if (body && body.returnCode == 0 && Array.isArray(body.body)) {
                        resolve(body.body);
                    }
                    else if (body && body.returnCode != 0 && body.returnCode != 9999) {
                        return resolve()
                    }
                    else {
                        return resolve()
                    }
                });
            });
        }

        //业务类型列表
        function getApKind() {
            return new Promise((resolve, reject) => {
                let option = {
                    req: req,
                    url: apiUrl.commonServicesQuery,
                    qs: {pmst: 'SYSTEM', pmkey: 'TAPKIND'},
                    timeout: 15000,
                    json: true
                };
                console.log('/businessMgmt/tradeInfoQuery/tradeApplyForQuery/selectList.ajax --getApKind option:', {...option,req:'#',qs:'******'});
                request(option, (error, response, body) => {
                    console.log('/businessMgmt/tradeInfoQuery/tradeApplyForQuery/selectList.ajax --getApKind error:', error);
                    console.log('/businessMgmt/tradeInfoQuery/tradeApplyForQuery/selectList.ajax --getApKind statusCode:', response && response.statusCode);
                    console.log('/businessMgmt/tradeInfoQuery/tradeApplyForQuery/selectList.ajax --getApKind body:', '******');
                    if (error) {
                        return resolve()
                    }
                    if (body && body.returnCode == 0 && Array.isArray(body.body)) {
                        resolve(body.body);
                    }
                    else if (body && body.returnCode != 0 && body.returnCode != 9999) {
                        return resolve()
                    }
                    else {
                        return resolve()
                    }
                });
            });
        }

        //具体业务类型
        function getSubApKind() {
            return new Promise((resolve, reject) => {
                let option = {
                    req: req,
                    url: apiUrl.commonServicesQuery,
                    qs: {pmst: 'SYSTEM', pmkey: 'SUBAPKIND'},
                    timeout: 15000,
                    json: true
                };
                console.log('/businessMgmt/tradeInfoQuery/tradeApplyForQuery/selectList.ajax --getApKind option:', {...option,req:'#',qs:'******'});
                request(option, (error, response, body) => {
                    console.log('/businessMgmt/tradeInfoQuery/tradeApplyForQuery/selectList.ajax --getApKind error:', error);
                    console.log('/businessMgmt/tradeInfoQuery/tradeApplyForQuery/selectList.ajax --getApKind statusCode:', response && response.statusCode);
                    console.log('/businessMgmt/tradeInfoQuery/tradeApplyForQuery/selectList.ajax --getApKind body:', '******');
                    if (error) {
                        // reject({message: '数据获取失败'});
                        return resolve()
                    }
                    if (body && body.returnCode == 0 && Array.isArray(body.body)) {
                        resolve(body.body);
                    }
                    else if (body && body.returnCode != 0 && body.returnCode != 9999) {
                        return resolve()
                    }
                    else {
                        return resolve()
                    }
                });
            });
        }

        //
        Promise.all([getPaginalData(), getCashFrom(), getCapitalMode(), getAccptMd(), getApKind(), getSubApKind()]).then(([result, getCashFrom, getCapitalMode, getAccptMd, getApKind, getSubApKind]) => {
            result.tradeInfos.forEach(function (item) {
                if (getCashFrom && Array.isArray(getCashFrom)) {
                    for (let translateCashFrom of getCashFrom) {
                        if (item.cashFrom == translateCashFrom.pmco) {
                            item.cashFrom = translateCashFrom.pmnm;
                            break;
                        }
                    }
                }
                if (getCapitalMode && Array.isArray(getCapitalMode)) {
                    for (let translateCapitalMode of getCapitalMode) {
                        if (item.capitalMode == translateCapitalMode.pmco) {
                            item.capitalMode = translateCapitalMode.pmnm;
                            break;
                        }
                    }
                }
                if (getAccptMd && Array.isArray(getAccptMd)) {
                    for (let translateAccptMd of getAccptMd) {
                        if (item.acceptMode == translateAccptMd.pmco) {
                            item.acceptMode = translateAccptMd.pmnm;
                            break;
                        }
                    }
                }
                if (getApKind && Array.isArray(getApKind)) {
                    for (let translateApKind of getApKind) {
                        if (item.apkind == translateApKind.pmco) {
                            item.apkind = translateApKind.pmnm;
                            break;
                        }
                    }
                }
                if (getSubApKind && Array.isArray(getSubApKind)) {
                    for (let translateSubApKind of getSubApKind) {
                        if (item.subApkind == translateSubApKind.pmco) {
                            item.subApkind = translateSubApKind.pmnm;
                            break;
                        }
                    }
                }
            });
            res.send({error: 0, msg: '数据获取成功', data: result})
        }).catch((error) => {
            res.send({error: 1, msg: error.message, data: null});
        })

    });
};