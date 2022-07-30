const request = require('./../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').IPOMgmtOC.datumRateReview;
const tableName = 'bm_ipo_fundrate';

module.exports = function (app) {
    // 获取基金列表数据
    app.post('/businessMgmt/IPOMgmtOC/datumRateReview/collection.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/businessMgmt/IPOMgmtOC/datumRateReview/collection.ajax',
            req,
            url: apiUrl.collection,
            qs: {
                fundTypeCustomized: 'all'
            },
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '获取基金列表数据失败',
                    data: null
                });
            }
            if (body && body.returnCode == 0 && Array.isArray(body.body)) {
                res.send({
                    error: 0,
                    msg: '调用成功',
                    data: body.body.map(item => {
                        return {
                            fundId: item.fundId,
                            fundName: item.fundName,
                        };
                    })
                });
            } else if (body.returnCode != 0 && body.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: body.returnMsg,
                    data: null
                });
            } else {
                res.send({
                    error: 1,
                    msg: '获取基金列表数据失败',
                    data: null
                });
            }
        });
    });
    // 获取本地数据
    app.post('/businessMgmt/IPOMgmtOC/datumRateReview/getLocalList.ajax', (req, res, next) => {
        pool.getConnection(function (error, connection) {
            if (error) {
                console.log('/businessMgmt/IPOMgmtOC/datumRateReview/getLocalList.ajax 链接本地数据库失败', error.message);
                return res.send({
                    error: 1,
                    msg: '链接本地数据库失败',
                    data: null
                });
            }
            let SQL = `SELECT * FROM ${tableName} WHERE delete_flag='F' AND status!=1`;
            if (req.body.fundId) {
                SQL += ` AND JSON_EXTRACT(content, '$.fundId')='${req.body.fundId}'`;
            }
            if (req.body.tradeType) {
                SQL += ` AND JSON_EXTRACT(content, '$.tradeType')='${req.body.tradeType}'`;
            }
            if (req.body.operate) {
                SQL += ` AND operate='${req.body.operate}'`;
            }
            if (req.body.status) {
                SQL += ` AND status='${req.body.status}'`;
            }
            SQL += ' ORDER BY update_timestamp DESC';
            console.log('/businessMgmt/IPOMgmtOC/datumRateReview/getLocalList.ajax run SQL: ', SQL);
            connection.query(SQL, function (error, results) {
                console.log('/businessMgmt/IPOMgmtOC/datumRateReview/getLocalList.ajax run SQL error', error);
                console.log('/businessMgmt/IPOMgmtOC/datumRateReview/getLocalList.ajax run SQL results:', results);
                if (error) {
                    connection.release();
                    return res.send({
                        error: 1,
                        msg: '运行SQL语句失败',
                        data: null
                    });
                }
                let resultArr = Array.from(results).map(item => {
                    let content = JSON.parse(item.content);
                    let obj = {
                        local_id: item.local_id,
                        service_id: item.service_id,
                        fundId: content.fundId,
                        fundName: content.fundName,
                        tradeType: content.tradeType,
                        strAmt: content.strAmt,
                        endAmt: content.endAmt,
                        fee: content.fee,
                        maxFee: content.maxFee,
                        creator: item.creator,
                        createTime: formatTimeStamp(item.create_timestamp),
                        updateTime: formatTimeStamp(item.update_timestamp),
                        operate: item.operate,
                        status: item.status,
                        reviewer: item.reviewer,
                        reviewTime: item.review_time,
                        remark: item.remark
                    };
                    if (obj.status == 0) {
                        obj.showStatus = '复核通过';
                    } else if (obj.status == 2) {
                        obj.showStatus = '待复核';
                    } else if (obj.status == 9) {
                        obj.showStatus = '复核驳回';
                    } else {
                        obj.showStatus = obj.status;
                    }
                    if (obj.operate == 1) {
                        obj.showOperate = '新增';
                    } else if (obj.operate == 2) {
                        obj.showOperate = '修改';
                    } else if (obj.operate == 3) {
                        obj.showOperate = '删除';
                    } else {
                        obj.showOperate = obj.operate;
                    }
                    if (obj.tradeType === '00') {
                        obj.showTradeType = '申购';
                    } else if (obj.tradeType === '01') {
                        obj.showTradeType = '认购';
                    } else if (obj.tradeType === '02') {
                        obj.showTradeType = '赎回';
                    } else if (obj.tradeType === '03') {
                        obj.showTradeType = '定投';
                    } else if (obj.tradeType === '04') {
                        obj.showTradeType = '分红';
                    } else if (obj.tradeType === '09') {
                        obj.showTradeType = '其他';
                    } else {
                        obj.showTradeType = obj.tradeType;
                    }
                    for (let key in obj) {
                        if (obj[key] !== 0 && !obj[key]) {
                            obj[key] = '-';
                        }
                    }
                    return obj;
                });
                connection.release();
                res.send({
                    error: 0,
                    msg: '调用成功',
                    data: resultArr
                });
            });
        });
    });
    // 获取查询服务端数据
    app.post('/businessMgmt/IPOMgmtOC/datumRateReview/queryFeeList.ajax', (req, res, next) => {
        let p1 = new Promise((resolve, reject) => {
            let fundId = req.body.fundId;
            let tradeType = req.body.tradeType;
            if (!fundId || !tradeType) {
                return reject({
                    message: '缺少必传参数'
                });
            }
            let option = {
                pageUrl: '/businessMgmt/IPOMgmtOC/datumRateReview/queryFeeList.ajax --getServiceList',
                req,
                url: apiUrl.queryFeeList[0] + req.body.fundId + apiUrl.queryFeeList[1] + '?tradeType=' + req.body.tradeType,
                timeout: 15000,
                json: true
            };
            console.log('/businessMgmt/IPOMgmtOC/IPOSetting/collection.ajax --getServiceList option:', option);
            request(option, (error, response, body) => {
                if (error) {
                    reject({
                        message: '获取服务端数据失败'
                    });
                }
                if (body && body.returnCode == 0 && Array.isArray(body.body)) {
                    resolve(body.body);
                } else if (body.returnCode != 0 && body.returnCode != 9999) {
                    reject({
                        message: body.returnMsg
                    });
                } else {
                    reject({
                        message: '获取服务端数据失败'
                    });
                }
            });
        });
        let p2 = new Promise((resolve, reject) => {
            let option = {
                pageUrl: '/businessMgmt/IPOMgmtOC/datumRateReview/queryFeeList.ajax --getFundList',
                req,
                url: apiUrl.collection,
                qs: {
                    fundTypeCustomized: 'all'
                },
                timeout: 15000,
                json: true
            };
            request(option, (error, response, body) => {
                if (error) {
                    reject({
                        message: '获取基金列表失败'
                    });
                }
                if (body && body.returnCode == 0 && Array.isArray(body.body)) {
                    resolve(body.body);
                } else if (body.returnCode != 0 && body.returnCode != 9999) {
                    reject({
                        message: body.returnMsg
                    });
                } else {
                    reject({
                        message: '获取基金列表失败'
                    });
                }
            });
        });
        Promise.all([p1, p2]).then(([list, fundList]) => {
            let resultArr = list.map(item => {
                let obj = {};
                let fundInfo = fundList.filter(fundInfo => item.fundid === fundInfo.fundId)[0];
                if (fundInfo) {
                    obj.fundName = fundInfo.fundName;
                } else {
                    obj.fundName = '暂无基金名称';
                }
                obj.tradeType = item.tradeType;
                if (item.tradeType === '00') {
                    obj.showTradeType = '申购';
                } else if (item.tradeType === '01') {
                    obj.showTradeType = '认购';
                } else if (item.tradeType === '02') {
                    obj.showTradeType = '赎回';
                } else if (item.tradeType === '03') {
                    obj.showTradeType = '定投';
                } else if (item.tradeType === '04') {
                    obj.showTradeType = '分红';
                } else if (item.tradeType === '09') {
                    obj.showTradeType = '其他';
                } else {
                    obj.showTradeType = item.tradeType;
                }
                obj.serialNo = item.serialno;
                obj.fundId = item.fundid;
                obj.strAmt = item.stramt;
                obj.endAmt = item.endamt;
                obj.fee = item.fee;
                obj.maxFee = item.maxfee;
                return obj;
            });
            res.send({
                error: 0,
                msg: '请求成功',
                data: resultArr
            });
        }).catch(error => {
            res.send({
                error: 1,
                msg: error.message,
                data: null
            });
        });
    });
    // 驳回
    app.post('/businessMgmt/IPOMgmtOC/datumRateReview/reviewReject.ajax', (req, res, next) => {
        if (req.body.creator === req.session.loginInfo.userid && !req.session.loginInfo.isAdmin) {
            return res.send({
                error: 1,
                msg: '禁止复核自己提交的申请',
                data: null
            });
        }
        pool.getConnection(function (error, connection) {
            if (error) {
                console.log('/businessMgmt/IPOMgmtOC/datumRateReview/reviewReject.ajax 链接本地数据库失败', error.message);
                return res.send({
                    error: 1,
                    msg: '链接本地数据库失败',
                    data: null
                });
            }
            let SQL = `UPDATE ${tableName} SET status=9,remark='${req.body.remark}',reviewer='${req.session.loginInfo.userid}',review_time='${formatTimeStamp(new Date().getTime())}' WHERE local_id=${req.body.local_id} AND update_timestamp='${req.body.updateTime}'`;
            console.log('/businessMgmt/IPOMgmtOC/datumRateReview/reviewReject.ajax run business SQL:', SQL);
            connection.query(SQL, function (error, results) {
                console.log('/businessMgmt/IPOMgmtOC/datumRateReview/reviewReject.ajax run business SQL error:', error);
                console.log('/businessMgmt/IPOMgmtOC/datumRateReview/reviewReject.ajax run business SQL results:', results);
                connection.release();
                if (error) {
                    return res.send({
                        error: 1,
                        msg: error.message,
                        data: null
                    });
                }
                if (results.changedRows) {
                    res.send({
                        error: 0,
                        msg: '调用成功',
                        data: null
                    });
                } else {
                    res.send({
                        error: 1,
                        msg: '数据不存在或已更新,请刷新页面',
                        data: null
                    });
                }
            });
        });
    });
    // 通过
    app.post('/businessMgmt/IPOMgmtOC/datumRateReview/reviewAccept.ajax', (req, res, next) => {
        if (req.body.creator === req.session.loginInfo.userid && !req.session.loginInfo.isAdmin) {
            return res.send({
                error: 1,
                msg: '禁止复核自己提交的申请',
                data: null
            });
        }
        pool.getConnection(function (error, connection) {
            if (error) {
                console.log('/businessMgmt/IPOMgmtOC/datumRateReview/reviewAccept.ajax 链接本地数据库失败', error.message);
                return res.send({
                    error: 1,
                    msg: '链接本地数据库失败',
                    data: null
                });
            }
            // 检查该条数据是否存在
            let checkHasSubmit = new Promise((resolve, reject) => {
                let SQL = `SELECT * FROM ${tableName} WHERE local_id=${req.body.local_id} AND update_timestamp='${req.body.updateTime}'`;
                console.log('/businessMgmt/IPOMgmtOC/datumRateReview/reviewAccept.ajax run check SQL: ', SQL);
                connection.query(SQL, function (error, results) {
                    console.log('/businessMgmt/IPOMgmtOC/datumRateReview/reviewAccept.ajax run check SQL error: ', error);
                    console.log('/businessMgmt/IPOMgmtOC/datumRateReview/reviewAccept.ajax run check SQL results: ', results);
                    if (error) {
                        reject({
                            message: '检查该条数据是否已被审核SQL语句失败'
                        });
                    }
                    resolve(Array.from(results).length);
                });
            });
            // 操作服务端数据
            let operateService = function (item) {
                return new Promise((resolve, reject) => {
                    let url = '';
                    let params = {};
                    let method = '';
                    let paramsType = '';
                    if (item.operate == 1) { // 新增操作
                        url = apiUrl.add;
                        params.fundid = item.fundId;
                        params.tradeType = item.tradeType;
                        params.stramt = item.strAmt;
                        params.endamt = item.endAmt;
                        params.fee = item.fee;
                        params.maxfee = item.maxFee;
                        method = 'POST';
                        paramsType = 'body';
                    } else if (item.operate == 2) { // 修改操作
                        return reject({
                            message: '暂不支持基金费率的修改'
                        });
                    } else if (item.operate == 3) { // 删除操作
                        url = apiUrl.del[0] + item.fundId + apiUrl.del[1];
                        params.tradeType = item.tradeType;
                        params.startAmount = item.strAmt;
                        params.endAmount = item.endAmt;
                        method = 'DELETE';
                        paramsType = 'qs';
                    } else {
                        return reject({
                            message: '操作类型有误，请检查数据是否合法'
                        });
                    }
                    let option = {
                        pageUrl: '/businessMgmt/IPOMgmtOC/datumRateReview/reviewAccept.ajax',
                        req,
                        url: url,
                        method: method,
                        timeout: 15000,
                        json: true
                    };
                    option[paramsType] = params;
                    request(option, (error, response, body) => {
                        if (error) {
                            reject({
                                message: '调用服务端数据失败'
                            });
                        }
                        if (body && body.returnCode == 0) {
                            resolve();
                        } else if (body.returnCode != 0 && body.returnCode != 9999) {
                            reject({
                                message: body.returnMsg
                            });
                        } else {
                            reject({
                                message: '调用服务端数据失败'
                            });
                        }
                    });
                });
            };
            // 操作本地数据
            let operateLocal = function () {
                return new Promise((resolve, reject) => {
                    let SQL = `UPDATE ${tableName} SET status=0,reviewer='${req.session.loginInfo.userid}',review_time='${formatTimeStamp(new Date().getTime())}' WHERE local_id=${req.body.local_id}`;
                    console.log('/businessMgmt/IPOMgmtOC/datumRateReview/reviewReject.ajax run business SQL:', SQL);
                    connection.query(SQL, function (error, results) {
                        console.log('/businessMgmt/IPOMgmtOC/datumRateReview/reviewReject.ajax run business SQL error:', error);
                        console.log('/businessMgmt/IPOMgmtOC/datumRateReview/reviewReject.ajax run business SQL results:', results);
                        if (error) {
                            reject({
                                message: '操作本地数据库出错，请核对校验本地数据'
                            });
                        }
                        resolve();
                    });
                });
            };
            checkHasSubmit.then(hasSubmit => {
                if (hasSubmit === 0) {
                    connection.release();
                    return res.send({
                        error: 1,
                        msg: '数据不存在',
                        data: null
                    });
                }
                operateService(req.body).then(() => {
                    operateLocal().then(() => {
                        connection.release();
                        res.send({
                            error: 0,
                            msg: '调用成功',
                            data: null
                        });
                    }).catch(error => {
                        connection.release();
                        res.send({
                            error: 1,
                            msg: error.message,
                            data: null
                        });
                    });
                }).catch(error => {
                    connection.release();
                    res.send({
                        error: 1,
                        msg: error.message,
                        data: null
                    });
                });
            }).catch(error => {
                connection.release();
                res.send({
                    error: 1,
                    msg: error.message,
                    data: null
                });
            });
        });
    });
};

function formatTimeStamp(timestamp) {
    let d = new Date(timestamp);
    let fixZero = function (num) {
        return num < 10 ? '0' + num : num;
    };
    return [d.getFullYear(), d.getMonth() + 1, d.getDate()].map(value => fixZero(value)).join('-') +
        ' ' + [d.getHours(), d.getMinutes(), d.getSeconds()].map(value => fixZero(value)).join(':');
}