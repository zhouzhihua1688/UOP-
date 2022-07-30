const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').businessParamConfig.paymentHandle;
const tableName = 'bm_bpc_payment';

module.exports = function (app) {
    //查询列表
    app.post('/businessMgmt/businessParamConfig/paymentHandle/getTableData.ajax', (req, res, next) => {
        // 本地查询数据库
        // select t.content from ticket t, operation op where op.ticket_id = t.id and t.type="10"
        let paramsStatus = {};
        paramsStatus.type = req.body.type; //接收选择数据库模式
        var product = req.body.product; //输入产品值
        var reviewStatus = req.body.reviewStatus; //选择审核状态值
        var channel = req.body.channel;
        if (paramsStatus.type == "1") {
            //当传过来的产品,复核状态参数“为空”-则查询所有
            if (product === "" && reviewStatus === "" && channel === "") {
                let promise1 = new Promise(function (resolve, reject) {
                    // select t.content,t.id,t.status from ticket t,operation op where op.ticket_id = t.id and t.type=11
                    var sql = `select content,local_id,status,delete_flag,operate,operator,creator,reviewer,review_time,update_timestamp,remark from ${tableName} where delete_flag="F" AND creator='${req.session.loginInfo.userid}' ORDER BY update_timestamp DESC`;
                    console.log('/businessMgmt/businessParamConfig/paymentHandle/getTableData.ajax sql:', sql);
                    pool.getConnection((error, connection) => {
                        if (error) {
                            return res.send({
                                error: 1,
                                msg: '链接本地数据库失败',
                                data: null
                            });
                        }
                        connection.query(sql, function (error, results, fields) {
                            console.log('/businessMgmt/businessParamConfig/paymentHandle/getTableData.ajax error:', error);
                            console.log('/businessMgmt/businessParamConfig/paymentHandle/getTableData.ajax results:', results);
                            console.log('/businessMgmt/businessParamConfig/paymentHandle/getTableData.ajax fields:', fields);
                            if (error) {
                                reject({
                                    error: 1,
                                    msg: '操作失败'
                                });
                            }
                            console.log('results=', JSON.parse(JSON.stringify(results)));
                            console.log('fields=', fields);
                            // 获取mysql数据字段ID,和status状态
                            let middleArr = JSON.parse(JSON.stringify(results));
                            middleArr = middleArr.map(item => {
                                let content = JSON.parse(item.content);
                                content.mySQLId = item.local_id; //获取数据库表id，用于修改删除操作
                                content.mysqlStatus = item.status; //获取数据库表status,用于做保存操作
                                content.delete_flag = item.delete_flag;
                                content.operate = item.operate;
                                content.operator = item.operator;
                                content.creator = item.creator;
                                content.reviewer = item.reviewer; //复核人
                                content.review_time = item.review_time; //复核时间
                                content.update_timestamp = item.update_timestamp; //更新时间
                                content.revise_remark = item.remark; //驳回备注
                                return content;
                            });
                            resolve(middleArr);
                        });
                        connection.release();
                    });
                })
                promise1.then(function (middleArr) {
                    return res.send({
                        error: 0,
                        msg: '查询成功',
                        data: middleArr
                    });
                }).catch(function (error) {
                    return res.send({
                        error: 1,
                        msg: '查询失败'
                    });
                })
            }
            //当传过来的复核状态参数“为空”-则查询该产品
            if (product != "" && reviewStatus == "" && channel === "") {
                let promise1 = new Promise(function (resolve, reject) {
                    // select t.content from ticket t, operation op where op.ticket_id = t.id and t.type="10"
                    var sql = `select * from ${tableName} where content -> '$.product'=? AND creator='${req.session.loginInfo.userid}' ORDER BY update_timestamp DESC`;
                    console.log('/businessMgmt/businessParamConfig/paymentHandle/getTableData.ajax sql:', sql);
                    pool.getConnection((error, connection) => {
                        if (error) {
                            return res.send({
                                error: 1,
                                msg: '链接本地数据库失败',
                                data: null
                            });
                        }
                        connection.query(sql, [product], function (error, results, fields) {
                            console.log('/businessMgmt/businessParamConfig/paymentHandle/getTableData.ajax error:', error);
                            console.log('/businessMgmt/businessParamConfig/paymentHandle/getTableData.ajax results:', results);
                            console.log('/businessMgmt/businessParamConfig/paymentHandle/getTableData.ajax fields:', fields);
                            if (error) {
                                reject({
                                    error: 1,
                                    msg: '操作失败'
                                });
                            }
                            console.log('results=', JSON.parse(JSON.stringify(results)));
                            console.log('fields=', fields);
                            // 获取mysql数据字段ID
                            let middleArr = JSON.parse(JSON.stringify(results));
                            middleArr = middleArr.map(item => {
                                let content = JSON.parse(item.content);
                                content.mySQLId = item.local_id;
                                content.mysqlStatus = item.status;
                                content.delete_flag = item.delete_flag;
                                content.operate = item.operate;
                                content.operator = item.operator;
                                content.creator = item.creator;
                                content.reviewer = item.reviewer; //复核人
                                content.review_time = item.review_time; //复核时间
                                content.update_timestamp = item.update_timestamp; //更新时间
                                content.revise_remark = item.remark; //驳回备注
                                return content;
                            });
                            resolve(middleArr);
                        });
                        connection.release();
                    });
                })
                promise1.then(function (middleArr) {
                    return res.send({
                        error: 0,
                        msg: '查询成功',
                        data: middleArr
                    });
                }).catch(function (error) {
                    return res.send({
                        error: 1,
                        msg: '查询失败'
                    });
                })
            }
            //当传过来的产品,状态参数“不为空”-则查询该产品
            if (product != "" && reviewStatus != "" && channel === "") {
                let promise1 = new Promise(function (resolve, reject) {
                    // select t.content from ticket t, operation op where op.ticket_id = t.id and t.type="10"
                    var sql = `select * from ${tableName} where content -> '$.product'=? and status=? AND creator='${req.session.loginInfo.userid}' ORDER BY update_timestamp DESC`;
                    console.log('/businessMgmt/businessParamConfig/paymentHandle/getTableData.ajax sql:', sql);
                    pool.getConnection((error, connection) => {
                        if (error) {
                            return res.send({
                                error: 1,
                                msg: '链接本地数据库失败',
                                data: null
                            });
                        }
                        connection.query(sql, [product, reviewStatus], function (error, results, fields) {
                            console.log('/businessMgmt/businessParamConfig/paymentHandle/getTableData.ajax error:', error);
                            console.log('/businessMgmt/businessParamConfig/paymentHandle/getTableData.ajax results:', results);
                            console.log('/businessMgmt/businessParamConfig/paymentHandle/getTableData.ajax fields:', fields);
                            if (error) {
                                reject({
                                    error: 1,
                                    msg: '操作失败'
                                });
                            }
                            console.log('results=', JSON.parse(JSON.stringify(results)));
                            console.log('fields=', fields);
                            // let result=JSON.parse(JSON.stringify(results));

                            // 获取mysql数据字段ID
                            let middleArr = JSON.parse(JSON.stringify(results));
                            middleArr = middleArr.map(item => {
                                let content = JSON.parse(item.content);
                                content.mySQLId = item.local_id;
                                content.mysqlStatus = item.status;
                                content.delete_flag = item.delete_flag;
                                content.operate = item.operate;
                                content.operator = item.operator;
                                content.creator = item.creator;
                                content.reviewer = item.reviewer; //复核人
                                content.review_time = item.review_time; //复核时间
                                content.update_timestamp = item.update_timestamp; //更新时间
                                content.revise_remark = item.remark; //驳回备注
                                return content;
                            });
                            resolve(middleArr);
                        });
                        connection.release();
                    });
                })
                promise1.then(function (middleArr) {
                    return res.send({
                        error: 0,
                        msg: '查询成功',
                        data: middleArr
                    });
                }).catch(function (error) {
                    return res.send({
                        error: 1,
                        msg: '查询失败'
                    });
                })
            }
            //当传过来的产品为空,状态参数“不为空”-则查询该状态产品
            if (product == "" && reviewStatus != "" && channel === "") {
                let promise1 = new Promise(function (resolve, reject) {
                    // select t.content from ticket t, operation op where op.ticket_id = t.id and t.type="10"
                    var sql = `select * from ${tableName} where status=? AND creator='${req.session.loginInfo.userid}' ORDER BY update_timestamp DESC`;
                    console.log('/businessMgmt/businessParamConfig/paymentHandle/getTableData.ajax sql:', sql);
                    pool.getConnection((error, connection) => {
                        if (error) {
                            return res.send({
                                error: 1,
                                msg: '链接本地数据库失败',
                                data: null
                            });
                        }
                        connection.query(sql, [reviewStatus], function (error, results, fields) {
                            console.log('/businessMgmt/businessParamConfig/paymentHandle/getTableData.ajax error:', error);
                            console.log('/businessMgmt/businessParamConfig/paymentHandle/getTableData.ajax results:', results);
                            console.log('/businessMgmt/businessParamConfig/paymentHandle/getTableData.ajax fields:', fields);
                            if (error) {
                                reject({
                                    error: 1,
                                    msg: '操作失败'
                                });
                            }
                            console.log('results=', JSON.parse(JSON.stringify(results)));
                            console.log('fields=', fields);
                            // let result=JSON.parse(JSON.stringify(results));

                            // 获取mysql数据字段ID
                            let middleArr = JSON.parse(JSON.stringify(results));
                            middleArr = middleArr.map(item => {
                                let content = JSON.parse(item.content);
                                content.mySQLId = item.local_id;
                                content.mysqlStatus = item.status;
                                content.delete_flag = item.delete_flag;
                                content.comment = item.comment; //存储字段，作为判断是增加的数据
                                content.operate = item.operate;
                                content.operator = item.operator;
                                content.creator = item.creator;
                                content.reviewer = item.reviewer;
                                content.review_time = item.review_time;
                                content.update_timestamp = item.update_timestamp; //更新时间
                                content.revise_remark = item.remark; //驳回备注
                                return content;
                            });
                            resolve(middleArr);
                        });
                        connection.release();
                    });
                })
                promise1.then(function (middleArr) {
                    return res.send({
                        error: 0,
                        msg: '查询成功',
                        data: middleArr
                    });
                }).catch(function (error) {
                    return res.send({
                        error: 1,
                        msg: '查询失败'
                    });
                })
            }

            //当传过来的产品,状态,渠道,参数“不为空”-则查询该产品
            if (product != "" && reviewStatus != "" && channel != "") {
                let promise1 = new Promise(function (resolve, reject) {
                    // select t.content from ticket t, operation op where op.ticket_id = t.id and t.type="10"
                    var sql = `select * from ${tableName} where content -> '$.product'=? and content -> '$.channel'=? and status=? AND creator='${req.session.loginInfo.userid}' ORDER BY update_timestamp DESC`;
                    console.log('/businessMgmt/businessParamConfig/paymentHandle/getTableData.ajax sql:', sql);
                    pool.getConnection((error, connection) => {
                        if (error) {
                            return res.send({
                                error: 1,
                                msg: '链接本地数据库失败',
                                data: null
                            });
                        }
                        connection.query(sql, [product, channel, reviewStatus], function (error, results, fields) {
                            console.log('/businessMgmt/businessParamConfig/paymentHandle/getTableData.ajax error:', error);
                            console.log('/businessMgmt/businessParamConfig/paymentHandle/getTableData.ajax results:', results);
                            console.log('/businessMgmt/businessParamConfig/paymentHandle/getTableData.ajax fields:', fields);
                            if (error) {
                                reject({
                                    error: 1,
                                    msg: '操作失败'
                                });
                            }
                            console.log('results=', JSON.parse(JSON.stringify(results)));
                            console.log('fields=', fields);
                            // let result=JSON.parse(JSON.stringify(results));

                            // 获取mysql数据字段ID
                            let middleArr = JSON.parse(JSON.stringify(results));
                            middleArr = middleArr.map(item => {
                                let content = JSON.parse(item.content);
                                content.mySQLId = item.local_id;
                                content.mysqlStatus = item.status;
                                content.delete_flag = item.delete_flag;
                                content.operate = item.operate;
                                content.operator = item.operator;
                                content.creator = item.creator;
                                content.reviewer = item.reviewer; //复核人
                                content.review_time = item.review_time; //复核时间
                                content.update_timestamp = item.update_timestamp; //更新时间
                                content.revise_remark = item.remark; //驳回备注
                                return content;
                            });
                            resolve(middleArr);
                        });
                        connection.release();
                    });
                })
                promise1.then(function (middleArr) {
                    return res.send({
                        error: 0,
                        msg: '查询成功',
                        data: middleArr
                    });
                }).catch(function (error) {
                    return res.send({
                        error: 1,
                        msg: '查询失败'
                    });
                })
            }
            //当传过来的产品,渠道参数“不为空”-则查询该产品
            if (product != "" && reviewStatus === "" && channel != "") {
                let promise1 = new Promise(function (resolve, reject) {
                    // select t.content from ticket t, operation op where op.ticket_id = t.id and t.type="10"
                    var sql = `select * from ${tableName} where content -> '$.product'=? and content -> '$.channel'=? AND creator='${req.session.loginInfo.userid}' ORDER BY update_timestamp DESC`;
                    console.log('/businessMgmt/businessParamConfig/paymentHandle/getTableData.ajax sql:', sql);
                    pool.getConnection((error, connection) => {
                        if (error) {
                            return res.send({
                                error: 1,
                                msg: '链接本地数据库失败',
                                data: null
                            });
                        }
                        connection.query(sql, [product, channel], function (error, results, fields) {
                            console.log('/businessMgmt/businessParamConfig/paymentHandle/getTableData.ajax error:', error);
                            console.log('/businessMgmt/businessParamConfig/paymentHandle/getTableData.ajax results:', results);
                            console.log('/businessMgmt/businessParamConfig/paymentHandle/getTableData.ajax fields:', fields);
                            if (error) {
                                reject({
                                    error: 1,
                                    msg: '操作失败'
                                });
                            }
                            console.log('results=', JSON.parse(JSON.stringify(results)));
                            console.log('fields=', fields);
                            // let result=JSON.parse(JSON.stringify(results));

                            // 获取mysql数据字段ID
                            let middleArr = JSON.parse(JSON.stringify(results));
                            middleArr = middleArr.map(item => {
                                let content = JSON.parse(item.content);
                                content.mySQLId = item.local_id;
                                content.mysqlStatus = item.status;
                                content.delete_flag = item.delete_flag;
                                content.operate = item.operate;
                                content.operator = item.operator;
                                content.creator = item.creator;
                                content.reviewer = item.reviewer; //复核人
                                content.review_time = item.review_time; //复核时间
                                content.update_timestamp = item.update_timestamp; //更新时间
                                content.revise_remark = item.remark; //驳回备注
                                return content;
                            });
                            resolve(middleArr);
                        });
                        connection.release();
                    });
                })
                promise1.then(function (middleArr) {
                    return res.send({
                        error: 0,
                        msg: '查询成功',
                        data: middleArr
                    });
                }).catch(function (error) {
                    return res.send({
                        error: 1,
                        msg: '查询失败'
                    });
                })
            }
            //当传过来的产品,渠道参数“不为空”-则查询该产品
            if (product === "" && reviewStatus === "" && channel != "") {
                let promise1 = new Promise(function (resolve, reject) {
                    // select t.content from ticket t, operation op where op.ticket_id = t.id and t.type="10"
                    var sql = `select * from ${tableName} where content -> '$.channel'=? AND creator='${req.session.loginInfo.userid}' ORDER BY update_timestamp DESC`;
                    console.log('/businessMgmt/businessParamConfig/paymentHandle/getTableData.ajax sql:', sql);
                    pool.getConnection((error, connection) => {
                        if (error) {
                            return res.send({
                                error: 1,
                                msg: '链接本地数据库失败',
                                data: null
                            });
                        }
                        connection.query(sql, [channel], function (error, results, fields) {
                            console.log('/businessMgmt/businessParamConfig/paymentHandle/getTableData.ajax error:', error);
                            console.log('/businessMgmt/businessParamConfig/paymentHandle/getTableData.ajax results:', results);
                            console.log('/businessMgmt/businessParamConfig/paymentHandle/getTableData.ajax fields:', fields);
                            if (error) {
                                reject({
                                    error: 1,
                                    msg: '操作失败'
                                });
                            }
                            console.log('results=', JSON.parse(JSON.stringify(results)));
                            console.log('fields=', fields);
                            // let result=JSON.parse(JSON.stringify(results));

                            // 获取mysql数据字段ID
                            let middleArr = JSON.parse(JSON.stringify(results));
                            middleArr = middleArr.map(item => {
                                let content = JSON.parse(item.content);
                                content.mySQLId = item.local_id;
                                content.mysqlStatus = item.status;
                                content.delete_flag = item.delete_flag;
                                content.operate = item.operate;
                                content.operator = item.operator;
                                content.creator = item.creator;
                                content.reviewer = item.reviewer; //复核人
                                content.review_time = item.review_time; //复核时间
                                content.update_timestamp = item.update_timestamp; //更新时间
                                content.revise_remark = item.remark; //驳回备注
                                return content;
                            });
                            resolve(middleArr);
                        });
                        connection.release();
                    });
                })
                promise1.then(function (middleArr) {
                    return res.send({
                        error: 0,
                        msg: '查询成功',
                        data: middleArr
                    });
                }).catch(function (error) {
                    return res.send({
                        error: 1,
                        msg: '查询失败'
                    });
                })
            }
            //当传过来的状态,渠道,参数“不为空”-则查询该产品
            if (product === "" && reviewStatus != "" && channel != "") {
                let promise1 = new Promise(function (resolve, reject) {
                    // select t.content from ticket t, operation op where op.ticket_id = t.id and t.type="10"
                    var sql = `select * from ${tableName} where content -> '$.channel'=? and status=? AND creator='${req.session.loginInfo.userid}' ORDER BY update_timestamp DESC`;
                    console.log('/businessMgmt/businessParamConfig/paymentHandle/getTableData.ajax sql:', sql);
                    pool.getConnection((error, connection) => {
                        if (error) {
                            return res.send({
                                error: 1,
                                msg: '链接本地数据库失败',
                                data: null
                            });
                        }
                        connection.query(sql, [channel, reviewStatus], function (error, results, fields) {
                            console.log('/businessMgmt/businessParamConfig/paymentHandle/getTableData.ajax error:', error);
                            console.log('/businessMgmt/businessParamConfig/paymentHandle/getTableData.ajax results:', results);
                            console.log('/businessMgmt/businessParamConfig/paymentHandle/getTableData.ajax fields:', fields);
                            if (error) {
                                reject({
                                    error: 1,
                                    msg: '操作失败'
                                });
                            }
                            console.log('results=', JSON.parse(JSON.stringify(results)));
                            console.log('fields=', fields);
                            // let result=JSON.parse(JSON.stringify(results));

                            // 获取mysql数据字段ID
                            let middleArr = JSON.parse(JSON.stringify(results));
                            middleArr = middleArr.map(item => {
                                let content = JSON.parse(item.content);
                                content.mySQLId = item.local_id;
                                content.mysqlStatus = item.status;
                                content.delete_flag = item.delete_flag;
                                content.operate = item.operate;
                                content.operator = item.operator;
                                content.creator = item.creator;
                                content.reviewer = item.reviewer; //复核人
                                content.review_time = item.review_time; //复核时间
                                content.update_timestamp = item.update_timestamp; //更新时间
                                content.revise_remark = item.remark; //驳回备注
                                return content;
                            });
                            resolve(middleArr);
                        });
                        connection.release();
                    });
                })
                promise1.then(function (middleArr) {
                    return res.send({
                        error: 0,
                        msg: '查询成功',
                        data: middleArr
                    });
                }).catch(function (error) {
                    return res.send({
                        error: 1,
                        msg: '查询失败'
                    });
                })
            }

        }
        // 业务数据查询
        if (paramsStatus.type == "0") {
            // 查询后端业务数据
            let params = {};
            // req.body.id && (params.id = req.body.id);
            req.body.product && (params.product = req.body.product);
            req.body.channel && (params.channel = req.body.channel);
            params.pageNo = req.body.pageNo;
            params.pageSize = req.body.pageSize;
            let option = {
                pageUrl: '/businessMgmt/businessParamConfig/paymentHandle/getTableData.ajax',
                req,
                url: apiUrlList.getTableData,
                qs: params,
                timeout: 15000,
                json: true
            };
            request(option, (error, response, body) => {
                if (error) {
                    return res.send({
                        error: 1,
                        msg: '操作失败'
                    });
                }
                let result = typeof body === 'string' ? JSON.parse(body) : body;
                if (result.returnCode == 0 && Array.isArray(result.body.rulePayTypeList)) {
                    result.body.rulePayTypeList.forEach((item) => {
                        item.check = false;
                    });
                    let resultData = {};
                    resultData.pageNo = result.body.pageNo; //页数
                    // resultData.records = result.body.records;
                    resultData.totalSize = Math.ceil(result.body.totalSize / req.body.pageSize); //总页数
                    resultData.tableData = result.body.rulePayTypeList;
                    return res.send({
                        error: 0,
                        msg: '查询成功',
                        data: resultData
                    });
                } else if (result && result.returnCode != 9999) {
                    return res.send({
                        error: 1,
                        msg: result.returnMsg
                    });
                } else {
                    return res.send({
                        error: 1,
                        msg: '查询失败'
                    });
                }
            });
        }
    });
    // 获取规则编号ID
    app.post('/businessMgmt/businessParamConfig/paymentHandle/ruleId.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/businessMgmt/businessParamConfig/paymentHandle/ruleId.ajax',
            req,
            url: apiUrlList.ruleId,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '操作失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0) {
                return res.send({
                    error: 0,
                    msg: '获取成功',
                    data: result
                });
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '获取失败'
                });
            }
        });
    });
    //新增保存数据;
    app.post('/businessMgmt/businessParamConfig/paymentHandle/saveParam.ajax', (req, res, next) => {
        // 由我经办增加保存
        let paramsStatus = {};
        paramsStatus.type = req.body.type; //传过来的状态数值

        let params = {};
        params.id = req.body.id;
        params.product = req.body.product;
        params.payType = req.body.payType;
        params.tradeType = req.body.tradeType;
        params.startTime = req.body.startTime;
        params.endTime = req.body.endTime;
        params.createTime = req.body.createTime;
        params.updateTime = req.body.updateTime;
        params.channel = req.body.channel;
        params.remark = req.body.remark;
        params.operator = req.body.operator;
        let operatorName = req.session.loginInfo.userid //操作人
        params = JSON.stringify(params)
        if (paramsStatus.type == "1") {
            var sql = `insert into bm_bpc_payment set ?,delete_flag="F",creator='${operatorName}',operator='${operatorName}',operate=1,comment=1,status="2"`;
            console.log('/businessMgmt/businessParamConfig/paymentHandle/saveParam.ajax sql:', sql);
            console.log('/businessMgmt/businessParamConfig/paymentHandle/saveParam.ajax params:', params);
            pool.getConnection((error, connection) => {
                if (error) {
                    return res.send({
                        error: 1,
                        msg: '链接本地数据库失败',
                        data: null
                    });
                }
                connection.query(sql, {
                    content: params
                }, function (error, results, fields) {
                    console.log('/businessMgmt/businessParamConfig/paymentHandle/saveParam.ajax error:', error);
                    console.log('/businessMgmt/businessParamConfig/paymentHandle/saveParam.ajax results:', results);
                    console.log('/businessMgmt/businessParamConfig/paymentHandle/saveParam.ajax fields:', fields);
                    if (error) {
                        return res.send({
                            error: 1,
                            msg: '保存失败'
                        });
                    }
                    return res.send({
                        error: 0,
                        msg: '保存成功',
                        data: results
                    });
                });
                connection.release();
            });
        }
        // 现有折扣增加保存
        // if (paramsStatus.type == "0") {
        //     var sql = 'insert into cs_ticket set ?,type=12,delete_flag="F",operate=1,comment=1,status="1"';
        //     console.log('/businessMgmt/businessParamConfig/paymentHandle/saveParam.ajax sql:', sql);
        //     console.log('/businessMgmt/businessParamConfig/paymentHandle/saveParam.ajax params:', params);
        //     pool.query(sql, {content: params}, function (error, results, fields) {
        //         console.log('/businessMgmt/businessParamConfig/paymentHandle/saveParam.ajax error:', error);
        //         console.log('/businessMgmt/businessParamConfig/paymentHandle/saveParam.ajax results:', results);
        //         console.log('/businessMgmt/businessParamConfig/paymentHandle/saveParam.ajax fields:', fields);
        //         if (error) {
        //             return res.send({error: 1, msg: '保存失败'});
        //         }
        //         return res.send({error: 0, msg: '保存成功', data: results});
        //     });
        // }

    });


    //修改业务数据存到本地数据库中;
    app.post('/businessMgmt/businessParamConfig/paymentHandle/serviceSave.ajax', (req, res, next) => {
        let paramsStatus = {};
        paramsStatus.type = req.body.type; //传过来的状态数值
        let operate = req.body.operate

        //经办现有折扣修改业务产品参数
        if (paramsStatus.type == "0") {
            let oneId = req.body.oneId
            let params = {};
            // 产品参数
            params.id = req.body.id;
            params.product = req.body.product;
            params.payType = req.body.payType;
            params.tradeType = req.body.tradeType;
            params.startTime = req.body.startTime;
            req.body.endTime && (params.endTime = req.body.endTime);
            params.createTime = req.body.createTime;
            params.updateTime = req.body.updateTime;
            params.channel = req.body.channel;
            params.remark = req.body.remark;
            params.operator = req.body.operator;

            let updateTime = req.body.updateTime //获取修改的时间
            let operatorName = req.session.loginInfo.userid //操作人


            // id不同则新增
            // if (oneId != params.id) {
            params = JSON.stringify(params)
            var sql = `insert into bm_bpc_payment set ?,delete_flag="F",service_id='${req.body.id}',creator='${operatorName}',operator='${operatorName}',operate=2,status="2"`;
            console.log('/businessMgmt/businessParamConfig/paymentHandle/serviceSave.ajax sql:', sql);
            console.log('/businessMgmt/businessParamConfig/paymentHandle/serviceSave.ajax params:', params);
            pool.getConnection((error, connection) => {
                if (error) {
                    return res.send({
                        error: 1,
                        msg: '链接本地数据库失败',
                        data: null
                    });
                }
                connection.query(sql, {
                    content: params
                }, function (error, results, fields) {
                    console.log('/businessMgmt/businessParamConfig/paymentHandle/serviceSave.ajax error:', error);
                    console.log('/businessMgmt/businessParamConfig/paymentHandle/serviceSave.ajax results:', results);
                    console.log('/businessMgmt/businessParamConfig/paymentHandle/serviceSave.ajax fields:', fields);
                    if (error) {
                        return res.send({
                            error: 1,
                            msg: '保存失败'
                        });
                    }
                    return res.send({
                        error: 0,
                        msg: '已提交至经办数据',
                        data: results
                    });
                });
                connection.release();
            });
            // }
            // id相同则修改

            // if (oneId == params.id) {
            //     console.log("111111",oneId)
            //     console.log("222222",params.id)
            //     params = JSON.stringify(params)
            //     // var sql="UPDATE bm_bpc_payment SET content=?,update_timestamp=? where content -> '$.id'=?"
            //     var sql = "UPDATE bm_bpc_payment SET content=?,update_timestamp=? where content -> '$.id'=?";
            //     console.log('/businessMgmt/businessParamConfig/paymentHandle/serviceSave.ajax sql:', sql);
            //     console.log('/businessMgmt/businessParamConfig/paymentHandle/serviceSave.ajax params:', params);
            //     pool.query(sql, [params,updateTime,oneId], function (error, results, fields) {
            //         console.log('/businessMgmt/businessParamConfig/paymentHandle/serviceSave.ajax error:', error);
            //         console.log('/businessMgmt/businessParamConfig/paymentHandle/serviceSave.ajax results:', results);
            //         console.log('/businessMgmt/businessParamConfig/paymentHandle/serviceSave.ajax fields:', fields);
            //         if (error) {
            //             return res.send({error: 1, msg: '执行数据保存成功'});
            //         }
            //         return res.send({error: 0, msg: '修改成功', data: results});
            //
            //     });
            // }
        }
    });

    // 修改本地数据;
    app.post('/businessMgmt/businessParamConfig/paymentHandle/localRevise.ajax', (req, res, next) => {
        //由我经办修改本地Mysql参数
        let paramsStatus = {};
        paramsStatus.type = req.body.type; //传过来的状态数值
        let operate = req.body.operate
        if (paramsStatus.type == "1") {
            let mysqlId = req.body.myqsql //获取传过来数据库表字段的id
            // 业务产品参数
            let params = {};
            req.body.id && (params.id = req.body.id);
            req.body.product && (params.product = req.body.product);
            req.body.payType && (params.payType = req.body.payType);
            req.body.tradeType && (params.tradeType = req.body.tradeType);
            req.body.startTime && (params.startTime = req.body.startTime);
            req.body.endTime && (params.endTime = req.body.endTime);
            req.body.createTime && (params.createTime = req.body.createTime);
            req.body.updateTime && (params.updateTime = req.body.updateTime);
            req.body.channel && (params.channel = req.body.channel);
            req.body.remark && (params.remark = req.body.remark);
            req.body.operator && (params.operator = req.body.operator);

            params = JSON.stringify(params)
            var updateTime = req.body.updateTime //获取修改的时间
            let operatorName = req.session.loginInfo.userid //操作人
            // 'UPDATE ticket SET content=json_set(content,"$.displayDiscount","6","$.tradeDiscount","6","$.startTimeStr","2019-03-03","$.endTimeStr","2099-01-01"'
            // select t.content from ticket t, operation op where op.ticket_id = t.id and t.type="10"
            if (operate == '1') {
                var sql = `UPDATE bm_bpc_payment SET content=?,status='2',operate='1',operator='${operatorName}',update_timestamp=? where local_id=?`;
            } else if (operate == '2') {
                var sql = `UPDATE bm_bpc_payment SET content=?,status='2',operate='2',operator='${operatorName}',update_timestamp=? where local_id=?`;
            } else if (operate == '3') {
                var sql = `UPDATE bm_bpc_payment SET content=?,status='2',operate='3',operator='${operatorName}',update_timestamp=? where local_id=?`;
            }
            // var sql = "UPDATE cs_ticket SET content=?,status='1',operate='2',update_timestamp=? where id=?";
            console.log('/businessMgmt/businessParamConfig/paymentHandle/localRevise.ajax sql:', sql);
            console.log('/businessMgmt/businessParamConfig/paymentHandle/localRevise.ajax params:', params);
            pool.getConnection((error, connection) => {
                if (error) {
                    return res.send({
                        error: 1,
                        msg: '链接本地数据库失败',
                        data: null
                    });
                }
                connection.query(sql, [params, updateTime, mysqlId], function (error, results, fields) {
                    console.log('/businessMgmt/businessParamConfig/paymentHandle/localRevise.ajax error:', error);
                    console.log('/businessMgmt/businessParamConfig/paymentHandle/localRevise.ajax results:', results);
                    console.log('/businessMgmt/businessParamConfig/paymentHandle/localRevise.ajax fields:', fields);
                    if (error) {
                        return res.send({
                            error: 1,
                            msg: '修改失败'
                        });
                    }
                    return res.send({
                        error: 0,
                        msg: '修改成功',
                        data: results
                    });
                });
                connection.release();
            });
        }
    });

    //提交数据;
    app.post('/businessMgmt/businessParamConfig/paymentHandle/submitCheck.ajax', (req, res, next) => {
        //由我经办修改本地Mysql参数
        let paramsStatus = {};
        paramsStatus.type = req.body.type; //传过来的状态数值
        var operate = req.body.operate //操作类型
        if (paramsStatus.type == "1" && operate == '2') {
            let mysqlId = req.body.myqsql //获取传过来数据库表字段的id
            // 业务产品参数
            let params = {};
            params.id = req.body.id;
            params.product = req.body.product;
            params.payType = req.body.payType;
            params.tradeType = req.body.tradeType;
            params.startTime = req.body.startTime;
            params.endTime = req.body.endTime;
            params.createTime = req.body.createTime;
            params.updateTime = req.body.updateTime;
            params.channel = req.body.channel;
            params.remark = req.body.remark;
            params.operator = req.body.operator;

            params = JSON.stringify(params)
            var updateTime = req.body.updateTime //获取修改的时间
            // 'UPDATE ticket SET content=json_set(content,"$.displayDiscount","6","$.tradeDiscount","6","$.startTimeStr","2019-03-03","$.endTimeStr","2099-01-01"'
            // select t.content from ticket t, operation op where op.ticket_id = t.id and t.type="10"
            var sql = "UPDATE cs_ticket SET content=?,status='2',operate='2',delete_flag='F',update_timestamp=? where local_id=?";
            console.log('/businessMgmt/businessParamConfig/paymentHandle/update.ajax sql:', sql);
            console.log('/businessMgmt/businessParamConfig/paymentHandle/update.ajax params:', params);
            pool.getConnection((error, connection) => {
                if (error) {
                    return res.send({
                        error: 1,
                        msg: '链接本地数据库失败',
                        data: null
                    });
                }
                connection.query(sql, [params, updateTime, mysqlId], function (error, results, fields) {
                    console.log('/businessMgmt/businessParamConfig/paymentHandle/update.ajax error:', error);
                    console.log('/businessMgmt/businessParamConfig/paymentHandle/update.ajax results:', results);
                    console.log('/businessMgmt/businessParamConfig/paymentHandle/update.ajax fields:', fields);
                    if (error) {
                        return res.send({
                            error: 1,
                            msg: '提交失败'
                        });
                    }
                    return res.send({
                        error: 0,
                        msg: '提交成功',
                        data: results
                    });
                });
                connection.release();
            });
        }
        if (paramsStatus.type == "1" && operate == '1') {
            let mysqlId = req.body.myqsql //获取传过来数据库表字段的id
            // 业务产品参数
            let params = {};
            params.id = req.body.id;
            params.product = req.body.product;
            params.payType = req.body.payType;
            params.tradeType = req.body.tradeType;
            params.startTime = req.body.startTime;
            params.endTime = req.body.endTime;
            params.createTime = req.body.createTime;
            params.updateTime = req.body.updateTime;
            params.channel = req.body.channel;
            params.remark = req.body.remark;
            params.operator = req.body.operator;

            params = JSON.stringify(params)
            var updateTime = req.body.updateTime //获取修改的时间
            // 'UPDATE ticket SET content=json_set(content,"$.displayDiscount","6","$.tradeDiscount","6","$.startTimeStr","2019-03-03","$.endTimeStr","2099-01-01"'
            // select t.content from ticket t, operation op where op.ticket_id = t.id and t.type="10"
            var sql = "UPDATE cs_ticket SET content=?,status='2',operate='1',delete_flag='F',update_timestamp=? where local_id=?";
            console.log('/businessMgmt/businessParamConfig/paymentHandle/update.ajax sql:', sql);
            console.log('/businessMgmt/businessParamConfig/paymentHandle/update.ajax params:', params);
            pool.getConnection((error, connection) => {
                if (error) {
                    return res.send({
                        error: 1,
                        msg: '链接本地数据库失败',
                        data: null
                    });
                }
                connection.query(sql, [params, updateTime, mysqlId], function (error, results, fields) {
                    console.log('/businessMgmt/businessParamConfig/paymentHandle/update.ajax error:', error);
                    console.log('/businessMgmt/businessParamConfig/paymentHandle/update.ajax results:', results);
                    console.log('/businessMgmt/businessParamConfig/paymentHandle/update.ajax fields:', fields);
                    if (error) {
                        return res.send({
                            error: 1,
                            msg: '提交失败'
                        });
                    }
                    return res.send({
                        error: 0,
                        msg: '提交成功',
                        data: results
                    });
                });
                connection.release();
            });
        }
        if (paramsStatus.type == "1" && operate == '3') {
            let mysqlId = req.body.myqsql //获取传过来数据库表字段的id
            // 业务产品参数
            let params = {};
            params.id = req.body.id;
            params.product = req.body.product;
            params.payType = req.body.payType;
            params.tradeType = req.body.tradeType;
            params.startTime = req.body.startTime;
            params.endTime = req.body.endTime;
            params.createTime = req.body.createTime;
            params.updateTime = req.body.updateTime;
            params.channel = req.body.channel;
            params.remark = req.body.remark;
            params.operator = req.body.operator;

            params = JSON.stringify(params)
            var updateTime = req.body.updateTime //获取修改的时间
            // 'UPDATE ticket SET content=json_set(content,"$.displayDiscount","6","$.tradeDiscount","6","$.startTimeStr","2019-03-03","$.endTimeStr","2099-01-01"'
            // select t.content from ticket t, operation op where op.ticket_id = t.id and t.type="10"
            var sql = "UPDATE cs_ticket SET delete_flag='T',operate='3',status='2',update_timestamp=? where local_id=?";
            console.log('/businessMgmt/businessParamConfig/paymentHandle/update.ajax sql:', sql);
            console.log('/businessMgmt/businessParamConfig/paymentHandle/update.ajax params:', params);
            pool.getConnection((error, connection) => {
                if (error) {
                    return res.send({
                        error: 1,
                        msg: '链接本地数据库失败',
                        data: null
                    });
                }
                connection.query(sql, [updateTime, mysqlId], function (error, results, fields) {
                    console.log('/businessMgmt/businessParamConfig/paymentHandle/update.ajax error:', error);
                    console.log('/businessMgmt/businessParamConfig/paymentHandle/update.ajax results:', results);
                    console.log('/businessMgmt/businessParamConfig/paymentHandle/update.ajax fields:', fields);
                    if (error) {
                        return res.send({
                            error: 1,
                            msg: '提交失败'
                        });
                    }
                    return res.send({
                        error: 0,
                        msg: '提交成功',
                        data: results
                    });
                });
                connection.release();
            });
        }
    });

    //删除业务数据存到本地数据库中;
    app.post('/businessMgmt/businessParamConfig/paymentHandle/deleteParam.ajax', (req, res, next) => {
        let paramsStatus = {};
        paramsStatus.type = req.body.type; //传过来的状态数值
        var operate = req.body.operate
        if (paramsStatus.type == "0") {
            let oneId = req.body.oneId
            let params = {};
            // 产品参数
            req.body.id && (params.id = req.body.id);
            req.body.product && (params.product = req.body.product);
            req.body.payType && (params.payType = req.body.payType);
            req.body.tradeType && (params.tradeType = req.body.tradeType);
            req.body.startTime && (params.startTime = req.body.startTime);
            req.body.endTime && (params.endTime = req.body.endTime);
            req.body.createTime && (params.createTime = req.body.createTime);
            req.body.updateTime && (params.updateTime = req.body.updateTime);
            req.body.channel && (params.channel = req.body.channel);
            req.body.remark && (params.remark = req.body.remark);
            req.body.operator && (params.operator = req.body.operator);

            let operatorName = req.session.loginInfo.userid //操作人
            if (oneId != params.id) {
                params = JSON.stringify(params)
                var sql = `insert into bm_bpc_payment set ?,delete_flag="F",service_id='${req.body.id}',creator='${operatorName}',operator='${operatorName}',operate=3,status="2"`;
                console.log('/businessMgmt/businessParamConfig/paymentHandle/deleteParam.ajax sql:', sql);
                console.log('/businessMgmt/businessParamConfig/paymentHandle/deleteParam.ajax params:', params);
                pool.getConnection((error, connection) => {
                    if (error) {
                        return res.send({
                            error: 1,
                            msg: '链接本地数据库失败',
                            data: null
                        });
                    }
                    connection.query(sql, {
                        content: params
                    }, function (error, results, fields) {
                        console.log('/businessMgmt/businessParamConfig/paymentHandle/deleteParam.ajax error:', error);
                        console.log('/businessMgmt/businessParamConfig/paymentHandle/deleteParam.ajax results:', results);
                        console.log('/businessMgmt/businessParamConfig/paymentHandle/deleteParam.ajax fields:', fields);
                        if (error) {
                            return res.send({
                                error: 1,
                                msg: '保存失败'
                            });
                        }
                        return res.send({
                            error: 0,
                            msg: '已提交至经办数据',
                            data: results
                        });

                    });
                    connection.release();
                });
            }
        }

    });

    //撤销本地数据
    app.post('/businessMgmt/businessParamConfig/paymentHandle/deleteLocal.ajax', (req, res, next) => {
        let paramsStatus = {};
        paramsStatus.type = req.body.type; //传过来的状态数值
        var operate = req.body.operate
        if (paramsStatus.type == "1") {
            let mysqlId = req.body.myqsql //获取传过来数据库表字段的id
            let params = {};
            req.body.id && (params.id = req.body.id);
            req.body.product && (params.product = req.body.product);
            req.body.payType && (params.payType = req.body.payType);
            req.body.tradeType && (params.tradeType = req.body.tradeType);
            req.body.startTime && (params.startTime = req.body.startTime);
            req.body.endTime && (params.endTime = req.body.endTime);
            req.body.createTime && (params.createTime = req.body.createTime);
            req.body.updateTime && (params.updateTime = req.body.updateTime);
            req.body.channel && (params.channel = req.body.channel);
            req.body.remark && (params.remark = req.body.remark);
            req.body.operator && (params.operator = req.body.operator);

            let operatorName = req.session.loginInfo.userid //操作人
            params = JSON.stringify(params)
            // if(operate=='1'){
            //     var sql = "UPDATE cs_ticket SET delete_flag='T',operate=1,status='1' where id=?";
            // }else if (operate=='2'){
            //     var sql = "UPDATE cs_ticket SET delete_flag='T',operate=2,status='1' where id=?";
            // }else if (operate=='3'){
            //     var sql = "UPDATE cs_ticket SET delete_flag='T',operate=3,status='1' where id=?";
            // }
            var sql = `UPDATE bm_bpc_payment SET delete_flag='T',operate=3,status='1',operator=? where local_id=?`;
            console.log('/businessMgmt/businessParamConfig/paymentHandle/deleteLocal.ajax sql:', sql);
            console.log('/businessMgmt/businessParamConfig/paymentHandle/deleteLocal.ajax params:', params);
            pool.getConnection((error, connection) => {
                if (error) {
                    return res.send({
                        error: 1,
                        msg: '链接本地数据库失败',
                        data: null
                    });
                }
                connection.query(sql, [operatorName,mysqlId], function (error, results, fields) {
                    console.log('/businessMgmt/businessParamConfig/paymentHandle/deleteLocal.ajax error:', error);
                    console.log('/businessMgmt/businessParamConfig/paymentHandle/deleteLocal.ajax results:', results);
                    console.log('/businessMgmt/businessParamConfig/paymentHandle/deleteLocal.ajax fields:', fields);
                    if (error) {
                        return res.send({
                            error: 1,
                            msg: '撤销失败'
                        });
                    }
                    return res.send({
                        error: 0,
                        msg: '撤销成功',
                        data: results
                    });
                });
                connection.release();
            });
        }
    });

    //重新提交删除操作
    app.post('/businessMgmt/businessParamConfig/paymentHandle/deleteAgain.ajax', (req, res, next) => {
        let paramsStatus = {};
        paramsStatus.type = req.body.type; //传过来的状态数值
        var operate = req.body.operate
        if (paramsStatus.type == "1") {
            let mysqlId = req.body.myqsql //获取传过来数据库表字段的id
            let params = {};
            req.body.id && (params.id = req.body.id);
            req.body.product && (params.product = req.body.product);
            req.body.payType && (params.payType = req.body.payType);
            req.body.tradeType && (params.tradeType = req.body.tradeType);
            req.body.startTime && (params.startTime = req.body.startTime);
            req.body.endTime && (params.endTime = req.body.endTime);
            req.body.createTime && (params.createTime = req.body.createTime);
            req.body.updateTime && (params.updateTime = req.body.updateTime);
            req.body.channel && (params.channel = req.body.channel);
            req.body.remark && (params.remark = req.body.remark);
            req.body.operator && (params.operator = req.body.operator);

            let operatorName = req.session.loginInfo.userid //操作人
            params = JSON.stringify(params)
            var sql = "UPDATE bm_bpc_payment SET delete_flag='F',operate=3,status='2',operator=? where local_id=?";
            console.log('/businessMgmt/businessParamConfig/paymentHandle/deleteAgain.ajax sql:', sql);
            console.log('/businessMgmt/businessParamConfig/paymentHandle/deleteAgain.ajax params:', params);
            pool.getConnection((error, connection) => {
                if (error) {
                    return res.send({
                        error: 1,
                        msg: '链接本地数据库失败',
                        data: null
                    });
                }
                connection.query(sql, [operatorName,mysqlId], function (error, results, fields) {
                    console.log('/businessMgmt/businessParamConfig/paymentHandle/deleteAgain.ajax error:', error);
                    console.log('/businessMgmt/businessParamConfig/paymentHandle/deleteAgain.ajax results:', results);
                    console.log('/businessMgmt/businessParamConfig/paymentHandle/deleteAgain.ajax fields:', fields);
                    if (error) {
                        return res.send({
                            error: 1,
                            msg: '提交失败'
                        });
                    }
                    return res.send({
                        error: 0,
                        msg: '提交成功',
                        data: results
                    });
                });
                connection.release();
            });
        }
    });

    // 获取用户信息
    app.post('/businessMgmt/businessParamConfig/paymentHandle/userName.ajax', (req, res, next) => {
        let operator = req.session.loginInfo.userid
        return res.send({
            error: 0,
            msg: '成功',
            data: operator
        });
    });

    // 获取交易类型下拉数据
    app.post('/businessMgmt/businessParamConfig/paymentHandle/tradeTypeList.ajax', (req, res, next) => {
        let params = {};
        req.body.pmst && (params.pmst = req.body.pmst);
        req.body.pmkey && (params.pmkey = req.body.pmkey);
        let option = {
            pageUrl: '/businessMgmt/businessParamConfig/paymentHandle/tradeTypeList.ajax',
            req,
            url: apiUrlList.tradeTypeList,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '操作失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0) {
                return res.send({
                    error: 0,
                    msg: '获取成功',
                    data: result
                });
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '获取失败'
                });
            }
        });

    });
    // 获取渠道下拉数据
    app.post('/businessMgmt/businessParamConfig/paymentHandle/channelTypeList.ajax', (req, res, next) => {
        let params = {};
        req.body.pmst && (params.pmst = req.body.pmst);
        req.body.pmkey && (params.pmkey = req.body.pmkey);
        let option = {
            pageUrl: '/businessMgmt/businessParamConfig/paymentHandle/channelTypeList.ajax',
            req,
            url: apiUrlList.channelTypeList,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '操作失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0) {
                return res.send({
                    error: 0,
                    msg: '获取成功',
                    data: result
                });
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '获取失败'
                });
            }
        });

    });

    // 获取基金列表
    app.post('/businessMgmt/businessParamConfig/paymentHandle/fundList.ajax', (req, res, next) => {

        // 获取产品列表
        let fundList = new Promise(resolve => {
            let option = {
                pageUrl: '/businessMgmt/businessParamConfig/paymentHandle/fundList.ajax',
                req,
                url: apiUrlList.collection,
                qs: {
                    fundTypeCustomized: 'all'
                },
                timeout: 15000,
                json: true
            };
            request(option, (error, response, body) => {
                if (error) {
                    return resolve([]);
                }
                if (body && body.returnCode == 0 && Array.isArray(body.body)) {
                    resolve(body.body.map(item => {
                        return {
                            fundId: item.fundId || item.fundid,
                            fundName: item.fundName || item.fundnm,
                        };
                    }));
                } else {
                    resolve([]);
                }
            });
        });


        // 获取组合列表
        let groupList = new Promise(resolve => {
            let option = {
                pageUrl: '/businessMgmt/businessParamConfig/paymentHandle/fundList.ajax --groupList',
                req,
                url: apiUrlList.params,
                qs: {
                    pmst: 'SYSTEM',
                    pmkey: 'BRANCHCODE'
                },
                timeout: 15000,
                json: true
            };
            request(option, (error, response, body) => {
                if (error) {
                    return resolve([]);
                }
                if (body && body.returnCode == 0 && Array.isArray(body.body)) {
                    resolve(body.body.filter(item => item.pmv1 === 'A').map(item => {
                        return {
                            fundId: item.pmco,
                            fundName: item.pmnm,
                        };
                    }));
                } else {
                    resolve([]);
                }
            });
        });

        let promiseAllParams = [];
        promiseAllParams.push(groupList);
        promiseAllParams.push(fundList);

        Promise.all(promiseAllParams).then(resultArr => {
            let groupList = resultArr[0];
            let fundList = resultArr[1].concat(groupList);
            let resultObj = {
                fundList
            };
            res.send({
                error: 0,
                msg: '请求成功',
                data: resultObj
            });
        }).catch(error => {
            res.send({
                error: 1,
                msg: error.message,
                data: null
            });
        });

    })

    // 获取支付类型下拉数据
    app.post('/businessMgmt/businessParamConfig/paymentHandle/payList.ajax', (req, res, next) => {
        let params = {};
        req.body.pmst && (params.pmst = req.body.pmst);
        req.body.pmkey && (params.pmkey = req.body.pmkey);
        let option = {
            pageUrl: '/businessMgmt/businessParamConfig/paymentHandle/payList.ajax',
            req,
            url: apiUrlList.payList,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '操作失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0) {
                return res.send({
                    error: 0,
                    msg: '获取成功',
                    data: result
                });
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '获取失败'
                });
            }
        });

    });

};