const request = require('./../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').tradeMonitor.tradeAbnormalReview;
const tableName = 'im_monitor_abnormal';

module.exports = function (app) {
    // 获取组合列表数据
    app.post('/investmentMgmt/tradeMonitor/tradeAbnormalReview/getGroupList.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/investmentMgmt/tradeMonitor/tradeAbnormalReview/getGroupList.ajax',
            req,
            url: apiUrl.fundGroups,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '获取组合列表数据失败',
                    data: null
                });
            }
            if (body && body.returnCode == 0 && Array.isArray(body.body)) {
                res.send({
                    error: 0,
                    msg: '调用成功',
                    data: body
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
                    msg: '获取组合列表数据失败',
                    data: null
                });
            }
        });
    });
    // 获取查询服务端数据
    app.post('/investmentMgmt/tradeMonitor/tradeAbnormalReview/getServiceList.ajax', (req, res, next) => {
        let getTableData = new Promise((resolve, reject) => {
            let params = {};
            params.groupId = req.body.groupId;
            params.fundId = req.body.fundId;
            params.transactionDate = req.body.transactionDate;
            let option = {
                pageUrl: '/investmentMgmt/tradeMonitor/tradeAbnormalReview/getServiceList.ajax',
                req,
                url: apiUrl.getTableList,
                qs: params,
                timeout: 15000,
                json: true
            };
            request(option, (error, response, body) => {
                if (error) {
                    reject({
                        message: '获取服务端数据失败'
                    });
                }
                if (body.returnCode == 0 && (body.body)) {
                    resolve(body.body.orders);
                } else if (body.returnCode != 0 && body.returnCode != 9999) {
                    reject({message: body.returnMsg});
                } else {
                    reject({message: '获取服务端数据失败'});
                }
            });
        });
        // 获取本地数据库列表
        let getTableDataLocal = new Promise((resolve, reject) => {
            pool.getConnection(function (error, connection) {
                if (error) {
                    console.log('/investmentMgmt/tradeMonitor/tradeAbnormalReview/getGroupList.ajax 链接本地数据库失败', error.message);
                    resolve([])
                }
                let SQL = `SELECT * FROM ${tableName} WHERE delete_flag='F' AND creator='${req.session.loginInfo.userid}'`;
                SQL += ` AND status<>9`;   // 复核驳回数据
                SQL += ' ORDER BY update_timestamp DESC';
                console.log('/investmentMgmt/tradeMonitor/tradeAbnormalReview/getGroupList.ajax run SQL: ', SQL);
                connection.query(SQL, function (error, results) {
                    console.log('/investmentMgmt/tradeMonitor/tradeAbnormalReview/getGroupList.ajax run SQL error', error);
                    console.log('/investmentMgmt/tradeMonitor/tradeAbnormalReview/getGroupList.ajax run SQL results:', results);
                    connection.release();
                    if (error) {
                        resolve([])
                    }
                    resolve(Array.from(results));
                });
            });
        });
        Promise.all([getTableData, getTableDataLocal]).then((resultArr) => {
            tableData = resultArr[0];
            tableDataLocal = resultArr[1];
            // console.log('tableData===', tableData)
            // console.log('tableDataLocal===', tableDataLocal)
            tableData = tableData.filter((item)=>{
                findItem = tableDataLocal.find((item2)=>{
                    return item2.service_id === item.serialNo;
                })
                if(!findItem){
                    return item;
                }
            })
            res.send({
                error: 0,
                msg: '请求成功',
                data: tableData
            });
        }).catch(error => {
            res.send({
                error: 1,
                msg: error.message,
                data: null
            });
        });
        // getTableData.then(tableData => {
        //     res.send({
        //         error: 0,
        //         msg: '请求成功',
        //         data: tableData
        //     });
        // }).catch(error => {
        //     res.send({
        //         error: 1,
        //         msg: error.message,
        //         data: null
        //     });
        // });
    });
    
    // 获取本地数据
    app.post('/investmentMgmt/tradeMonitor/tradeAbnormalReview/getLocalList.ajax', (req, res, next) => {
        // 获取本地数据库列表
        let getTableData = new Promise((resolve, reject) => {
            pool.getConnection(function (error, connection) {
                if (error) {
                    console.log('/investmentMgmt/tradeMonitor/tradeAbnormalReview/getLocalList.ajax 链接本地数据库失败', error.message);
                    reject({
                        error: '链接本地数据库失败'
                    });
                }
                let SQL = `SELECT * FROM ${tableName} WHERE delete_flag='F' AND creator='${req.session.loginInfo.userid}'`;
                if (req.body.serialNo) {
                    SQL += ` AND JSON_EXTRACT(content, '$.serialNo')='${req.body.serialNo}'`;
                }
                if (req.body.fundId) {
                    SQL += ` AND JSON_EXTRACT(content, '$.fundId')='${req.body.fundId}'`;
                }
                if (req.body.transactionDate) {
                    SQL += ` AND JSON_EXTRACT(content, '$.transactionDate')='${req.body.transactionDate}'`;
                }
                if (req.body.status) {
                    SQL += ` AND status='${req.body.status}'`;
                }
                SQL += ' ORDER BY update_timestamp DESC';
                console.log('/investmentMgmt/tradeMonitor/tradeAbnormalReview/getLocalList.ajax run SQL: ', SQL);
                connection.query(SQL, function (error, results) {
                    console.log('/investmentMgmt/tradeMonitor/tradeAbnormalReview/getLocalList.ajax run SQL error', error);
                    console.log('/investmentMgmt/tradeMonitor/tradeAbnormalReview/getLocalList.ajax run SQL results:', results);
                    connection.release();
                    if (error) {
                        reject({
                            error: '运行SQL语句失败'
                        });
                    }
                    resolve(Array.from(results));
                });
            });
        });
        getTableData.then(body => {
            let tableData = body.map(item => {
                let obj = {
                    local_id: item.local_id,
                    service_id: item.service_id,
                    creator: item.creator,
                    operator: item.operator,
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
                } else if (obj.status == 1) {
                    obj.showStatus = '编辑中';
                } else if (obj.status == 2) {
                    obj.showStatus = '待复核';
                    if(JSON.parse(item.content).coverFund && JSON.parse(item.content).coverFund.length>0){
                        obj.showStatus = '待复核' + '（基金'+JSON.parse(item.content).coverFund[0].fundId+'）';
                    }
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
                obj.content = JSON.parse(item.content);
                return obj;
            });
            res.send({
                error: 0,
                msg: '请求成功',
                data: tableData
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
    app.post('/investmentMgmt/tradeMonitor/tradeAbnormalReview/reviewReject.ajax', (req, res, next) => {
        if (req.body.creator === req.session.loginInfo.userid && !req.session.loginInfo.isAdmin) {
            return res.send({
                error: 1,
                msg: '禁止复核自己提交的申请',
                data: null
            });
        }
        let itemData = JSON.parse(req.body.itemData);
        pool.getConnection(function (error, connection) {
            if (error) {
                console.log('/investmentMgmt/tradeMonitor/tradeAbnormalReview/reviewReject.ajax 链接本地数据库失败', error.message);
                return res.send({
                    error: 1,
                    msg: '链接本地数据库失败',
                    data: null
                });
            }
            let SQL = `UPDATE ${tableName} SET status=9,remark='${req.body.remark}',reviewer='${req.session.loginInfo.userid}',review_time='${formatTimeStamp(new Date().getTime())}' WHERE local_id=${itemData.local_id} AND update_timestamp='${itemData.updateTime}'`;
            console.log('/investmentMgmt/tradeMonitor/tradeAbnormalReview/reviewReject.ajax run business SQL:', SQL);
            connection.query(SQL, function (error, results) {
                console.log('/investmentMgmt/tradeMonitor/tradeAbnormalReview/reviewReject.ajax run business SQL error:', error);
                console.log('/investmentMgmt/tradeMonitor/tradeAbnormalReview/reviewReject.ajax run business SQL results:', results);
                connection.release();
                let option ={
                    pageUrl: '/investmentMgmt/tradeMonitor/tradeAbnormalReview/reviewReject.ajax',
                    req,
                    operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
                    investBody:{sqlReviewReject:'驳回',operator:req.session.loginInfo.userid},
                    mappingKeyWords:'tradeAbnormalHandle'
                }
                if (error) {
                    sysLogger(option.operateType, option.req, option, {result:'操作失败'},'uop_log_invest');
                    return res.send({
                        error: 1,
                        msg: error.message,
                        data: null
                    });
                }
                sysLogger(option.operateType, option.req, option, {result:'操作成功'},'uop_log_invest');
                if (results.affectedRows) {
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
    app.post('/investmentMgmt/tradeMonitor/tradeAbnormalReview/reviewAccept.ajax', (req, res, next) => {
        if (req.body.creator === req.session.loginInfo.userid && !req.session.loginInfo.isAdmin) {
            return res.send({
                error: 1,
                msg: '禁止复核自己提交的申请',
                data: null
            });
        }
        let itemData = JSON.parse(req.body.itemData);
        pool.getConnection(function (error, connection) {
            if (error) {
                console.log('/investmentMgmt/tradeMonitor/tradeAbnormalReview/reviewAccept.ajax 链接本地数据库失败', error.message);
                return res.send({
                    error: 1,
                    msg: '链接本地数据库失败',
                    data: null
                });
            }
            // 检查该条数据是否存在
            let checkHasSubmit = new Promise((resolve, reject) => {
                let SQL = `SELECT * FROM ${tableName} WHERE local_id=${itemData.local_id} AND update_timestamp='${itemData.updateTime}'`;
                console.log('/investmentMgmt/tradeMonitor/tradeAbnormalReview/reviewAccept.ajax run check SQL: ', SQL);
                connection.query(SQL, function (error, results) {
                    console.log('/investmentMgmt/tradeMonitor/tradeAbnormalReview/reviewAccept.ajax run check SQL error: ', error);
                    console.log('/investmentMgmt/tradeMonitor/tradeAbnormalReview/reviewAccept.ajax run check SQL results: ', results);
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
                    let option = {
                        pageUrl: '/investmentMgmt/tradeMonitor/tradeAbnormalReview/reviewAccept.ajax',
                        req,
                        operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
                        url: apiUrl.saveParam,
                        qs: {
                            serialNo: itemData.content.serialNo,
                            groupId: itemData.content.groupId,
                            fundId: itemData.content.fundId,
                            transactionDate: itemData.content.transactionDate,
                            ofundId: itemData.content.coverFund[0].fundId
                        },
                        
                        timeout: 15000,
                        json: true
                    };
                    request.post(option, (error, response, body) => {
                        if (error) {
                            reject({
                                message: '调用服务端数据失败'
                            });
                        }
                        if (body && body.returnCode == 0) {
                            let option1 ={
                                pageUrl: '/investmentMgmt/tradeMonitor/tradeAbnormalReview/reviewAccept.ajax',
                                req,
                                operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
                                investBody:option.qs,
                                mappingKeyWords:'tradeAbnormalHandle'
                            }
                            sysLogger(option.operateType, option.req, option1,{result:'调用成功'},'uop_log_invest');
                            resolve();
                        } else if (body && body.returnCode != 0 && body.returnCode != 9999) {
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
                    let SQL = `UPDATE ${tableName} SET status=0,reviewer='${req.session.loginInfo.userid}',review_time='${formatTimeStamp(new Date().getTime())}' WHERE local_id=${itemData.local_id}`;
                    console.log('/investmentMgmt/tradeMonitor/tradeAbnormalReview/reviewReject.ajax run business SQL:', SQL);
                    connection.query(SQL, function (error, results) {
                        console.log('/investmentMgmt/tradeMonitor/tradeAbnormalReview/reviewReject.ajax run business SQL error:', error);
                        console.log('/investmentMgmt/tradeMonitor/tradeAbnormalReview/reviewReject.ajax run business SQL results:', results);
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