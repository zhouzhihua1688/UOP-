const request = require('../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').custAccountMgmt.accountDelete;

module.exports = function (app) {
    // 通过idNo获取用户信息列表
    app.post('/customerService/custAccountMgmt/accountDelete/getCustInfoList.ajax', (req, res, next) => {
        let params = {};
        params.idNo = req.body.idNo;
        let option = {
            pageUrl: '/customerService/custAccountMgmt/accountDelete/getCustInfoList.ajax',
            req: req,
            url: apiUrl.getCustInfoByIdNo,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '通过idNo获取用户信息列表调用失败',
                    data: null
                });
            }
            if (body && body.returnCode == 0 && Array.isArray(body.body)) {
                return res.send({
                    error: 0,
                    msg: '通过idNo获取用户信息列表调用成功',
                    data: body.body
                });
            } else if (body && body.returnCode == 9999) {
                return res.send({
                    error: 1,
                    msg: body.returnMsg,
                    data: null
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '通过idNo获取用户信息列表调用失败',
                    data: null
                });
            }
        });
    });
    // 获取列表数据
    app.post('/customerService/custAccountMgmt/accountDelete/getTableList.ajax', (req, res, next) => {
        let promise = null;
        if (!req.body.custNo) { // 前端未传custNo,需要通过tradeAcct和fundAcct获取custNo
            promise = new Promise((resolve, reject) => {
                let params = {};
                params.tradeAcct = req.body.tradeAcct;
                params.fundAcct = req.body.fundAcct;
                let option = {
                    pageUrl: '/customerService/custAccountMgmt/accountDelete/getTableList.ajax --getCustNoByAcct',
                    req: req,
                    url: apiUrl.getCustNo,
                    qs: params,
                    timeout: 15000,
                    json: true
                };
                request(option, (error, response, body) => {
                    if (error) {
                        reject({
                            message: '通过tradeAcct和fundAcct获取custNo数据获取失败'
                        });
                    }
                    if (body && body.returnCode == 0) {
                        resolve(body.body);
                    } else if (body && body.returnCode == 9999) {
                        reject({
                            message: body.returnMsg
                        });
                    } else {
                        reject({
                            message: '通过tradeAcct和fundAcct获取custNo数据获取失败'
                        });
                    }
                });
            });
        } else {
            promise = new Promise(resolve => {
                return resolve(req.body.custNo);
            });
        }

        // 通过custNo获取证件号
        let getIdNoByCustNo = (custNo) => {
            return new Promise((resolve, reject) => {
                let params = {};
                params.custNo = custNo;
                let option = {
                    pageUrl: '/customerService/custAccountMgmt/accountDelete/getTableList.ajax --getIdNoByCustNo',
                    req: req,
                    url: apiUrl.getIdNo,
                    qs: params,
                    timeout: 15000,
                    json: true
                };
                request(option, (error, response, body) => {
                    if (error) {
                        reject({
                            message: '通过custNo获取证件号数据获取失败'
                        });
                    }
                    if (body && body.returnCode == 0) {
                        resolve(body.body);
                    } else if (body && body.returnCode == 9999) {
                        reject({
                            message: body.returnMsg
                        });
                    } else {
                        reject({
                            message: '通过custNo获取证件号数据获取失败'
                        });
                    }
                });
            });
        };
        // 通过custNo获取基金账户
        let getFundAcctByCustNo = (custNo) => {
            return new Promise((resolve, reject) => {
                let params = {};
                params.custNo = custNo;
                let option = {
                    pageUrl: '/customerService/custAccountMgmt/accountDelete/getTableList.ajax --getFundAcctByCustNo',
                    req: req,
                    url: apiUrl.getFundAcct,
                    qs: params,
                    timeout: 15000,
                    json: true
                };
                request(option, (error, response, body) => {
                    if (error) {
                        reject({
                            message: '通过custNo获取基金账户数据获取失败'
                        });
                    }
                    if (body && body.returnCode == 0) {
                        resolve(body.body || []);
                    } else if (body && body.returnCode == 9999) {
                        reject({
                            message: body.returnMsg
                        });
                    } else {
                        reject({
                            message: '通过custNo获取基金账户数据获取失败'
                        });
                    }
                });
            });
        };
        // 通过custNo获取交易账户
        let getTradeAcctByCustNo = (custNo) => {
            return new Promise((resolve, reject) => {
                let params = {};
                params.custNo = custNo;
                params.bizType = '000';
                let option = {
                    pageUrl: '/customerService/custAccountMgmt/accountDelete/getTableList.ajax --getTradeAcctByCustNo',
                    req: req,
                    url: apiUrl.getTradeAcct,
                    qs: params,
                    timeout: 15000,
                    json: true
                };
                request(option, (error, response, body) => {
                    if (error) {
                        reject({
                            message: '通过custNo获取交易账户数据获取失败'
                        });
                    }
                    if (body && body.returnCode == 0) {
                        resolve(body.body);
                    } else if (body && body.returnCode == 9999) {
                        reject({
                            message: body.returnMsg
                        });
                    } else {
                        resolve({
                            tradeAcct: ''
                        });
                    }
                });
            });
        };
        // 通过custNo获取直销总资产
        let getDirectAssetByCustNo = (custNo) => {
            return new Promise((resolve, reject) => {
                let params = {};
                params.custNo = custNo;
                params.assetMode = 'Direct';
                let option = {
                    pageUrl: '/customerService/custAccountMgmt/accountDelete/getTableList.ajax --getDirectAssetByCustNo',
                    req: req,
                    url: apiUrl.getAssetInfo,
                    qs: params,
                    timeout: 15000,
                    json: true
                };
                request(option, (error, response, body) => {
                    if (error) {
                        reject({
                            message: '通过custNo获取直销总资产数据获取失败'
                        });
                    }
                    if (body && body.returnCode == 0) {
                        resolve(body.body);
                    } else if (body && body.returnCode == 9999) {
                        reject({
                            message: body.returnMsg
                        });
                    } else {
                        reject({
                            message: '通过custNo获取直销总资产数据获取失败'
                        });
                    }
                });
            });
        };
        // 通过custNo获取代销总资产
        let getProxyAssetByCustNo = (custNo) => {
            return new Promise((resolve, reject) => {
                let params = {};
                params.custNo = custNo;
                params.assetMode = 'Proxy';
                let option = {
                    pageUrl: '/customerService/custAccountMgmt/accountDelete/getTableList.ajax --getProxyAssetByCustNo',
                    req: req,
                    url: apiUrl.getAssetInfo,
                    qs: params,
                    timeout: 15000,
                    json: true
                };
                request(option, (error, response, body) => {
                    if (error) {
                        reject({
                            message: '通过custNo获取代销总资产数据获取失败'
                        });
                    }
                    if (body && body.returnCode == 0) {
                        resolve(body.body);
                    } else if (body && body.returnCode == 9999) {
                        reject({
                            message: body.returnMsg
                        });
                    } else {
                        reject({
                            message: '通过custNo获取代销总资产数据获取失败'
                        });
                    }
                });
            });
        };

        promise.then(custNo => {
            let paramsArr = [];
            paramsArr.push(getIdNoByCustNo(custNo));
            paramsArr.push(getFundAcctByCustNo(custNo));
            paramsArr.push(getTradeAcctByCustNo(custNo));
            paramsArr.push(getDirectAssetByCustNo(custNo));
            paramsArr.push(getProxyAssetByCustNo(custNo));
            Promise.all(paramsArr).then(([custInfo, fundAcct, tradeAcct, directAsset, proxyAsset]) => {
                let count = 0;
                if (directAsset && directAsset.totalRmbBalance) {
                    directAsset.totalRmbBalance.totalAmt && (count += directAsset.totalRmbBalance.totalAmt);
                }
                if (directAsset && directAsset.totalDollarBalance) {
                    directAsset.totalDollarBalance.totalAmt && (count += directAsset.totalDollarBalance.totalAmt);
                }
                // if(proxyAsset && proxyAsset.totalRmbBalance){
                //     proxyAsset.totalRmbBalance.totalAmt && (count += proxyAsset.totalRmbBalance.totalAmt);
                // }
                // if(proxyAsset && proxyAsset.totalDollarBalance){
                //     proxyAsset.totalDollarBalance.totalAmt && (count += proxyAsset.totalDollarBalance.totalAmt);
                // }
                res.send({
                    error: 0,
                    msg: '调用成功',
                    data: {
                        custInfo,
                        fundAcct,
                        tradeAcct,
                        directAsset,
                        proxyAsset,
                        canDelete: count === 0
                    }
                });
            }).catch(error => {
                res.send({
                    error: 1,
                    msg: error.message,
                    data: null
                });
            });
        }).catch(error => {
            res.send({
                error: 1,
                msg: error.message,
                data: null
            });
        });
    });
    // 删户
    app.post('/customerService/custAccountMgmt/accountDelete/del.ajax', (req, res, next) => {
        let params = {};
        let body = {
            accptMd: 'COUNTER',
            custNo: req.body.custNo,
            isForced: req.body.isForced == 'true',
            opId: req.session.loginInfo.userid,
            targetCustNo: null // 20/12/28 修改，删户时该字段传null
        };
        // if (!body.isForced) { // 非强制删户时，需要传targetCustNo，值与custNo一致,强制删户不需要传
        //     body.targetCustNo = req.body.custNo;
        // }
        let url = '';
        params.custNo = req.body.custNo;
        if (req.body.invTp == 1) { // 个人账户
            if (req.body.accoFlg == 2) { // 0,1: 直销 2:代销
                url = apiUrl.delPersonalAccountC;
            } else {
                url = apiUrl.delPersonalAccountD;
            }
        } else if (req.body.invTp == 0 || req.body.invTp == 2) { // 企业账户
            url = apiUrl.delCompanyAccount;
        } else {
            return res.send({
                error: 1,
                msg: '删户失败：未能识别该帐户的账户类型',
                data: null
            });
        }
        let option = {
            pageUrl: '/customerService/custAccountMgmt/accountDelete/del.ajax',
            req: req,
            operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: url,
            qs: params,
            body: body,
            timeout: 15000,
            json: true
        };
        request.put(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '删户失败'
                });
            }
            if (body.returnCode == 0) {
                return res.send({
                    error: 0,
                    msg: '删户成功',
                    data: null
                });
            } else if (body && body.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: body.returnMsg,
                    data: null
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '删户失败',
                    data: null
                });
            }
        });
    });
};