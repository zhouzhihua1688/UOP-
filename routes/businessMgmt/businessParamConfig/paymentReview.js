const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').businessParamConfig.paymentReview;
const tableName = 'bm_bpc_payment';

module.exports = function (app) {
    //查询服务端列表数据
    app.post('/businessMgmt/businessParamConfig/paymentReview/getServiceData.ajax', (req, res, next) => {
        let paramsStatus = {};
        paramsStatus.type = req.body.type; //接收选择数据库模式
        if (paramsStatus.type == "0") {
            // 查询后端业务数据
            let params = {};
            // req.body.id && (params.id = req.body.id);
            req.body.product && (params.product = req.body.product);
            req.body.channel && (params.channel = req.body.channel);
            params.pageNo = req.body.pageNo;
            params.pageSize = req.body.pageSize;
            let option = {
                pageUrl: '/businessMgmt/businessParamConfig/paymentReview/getServiceData.ajax',
                req,
                url: apiUrlList.getServiceData,
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
                    res.send({
                        error: 0,
                        msg: '查询成功',
                        data: resultData
                    });
                } else if (result && result.returnCode != 9999) {
                    res.send({
                        error: 1,
                        msg: result.returnMsg
                    });
                } else {
                    res.send({
                        error: 1,
                        msg: '查询失败'
                    });
                }
            });
        }
    });

    //查询经办列表数据
    app.post('/businessMgmt/businessParamConfig/paymentReview/getTableData.ajax', (req, res, next) => {
        let paramsStatus = {};
        paramsStatus.type = req.body.type; //接收选择数据库模式
        var product = req.body.product; //输入产品值
        var reviewStatus = req.body.reviewStatus; //选择审核状态值
        var channel = req.body.channel;
        if (paramsStatus.type == "1") {
            let sql = `select content,local_id,status,delete_flag,operate,operator,creator,reviewer,review_time,update_timestamp,remark from ${tableName} where delete_flag="F" AND status!=1`;
            if (req.body.product) {
                sql += ` AND JSON_EXTRACT(content, '$.product')='${req.body.product}'`;
            }
            if (req.body.channel) {
                sql += ` AND JSON_EXTRACT(content, '$.channel')='${req.body.channel}'`;
            }
            if (req.body.reviewStatus) {
                sql += ` AND status='${req.body.reviewStatus}'`;
            }
            sql += ' ORDER BY update_timestamp DESC';

            let promise1 = new Promise(function (resolve, reject) {
                console.log('/businessMgmt/businessParamConfig/paymentReview/getTableData.ajax sql:', sql);
                pool.getConnection((error, connection) => {
                    if (error) {
                        return res.send({
                            error: 1,
                            msg: '链接本地数据库失败',
                            data: null
                        });
                    }
                    connection.query(sql, function (error, results, fields) {
                        console.log('/businessMgmt/businessParamConfig/paymentReview/getTableData.ajax error:', error);
                        console.log('/businessMgmt/businessParamConfig/paymentReview/getTableData.ajax results:', results);
                        console.log('/businessMgmt/businessParamConfig/paymentReview/getTableData.ajax fields:', fields);
                        if (error) {
                            reject({
                                error: 1,
                                msg: '操作失败'
                            });
                        }
                        // let result=JSON.parse(JSON.stringify(results));
                        // 获取mysql数据字段ID,和status状态
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
    });


    //Mysql和业务接口复核通过执行更新和删除数据;
    app.post('/businessMgmt/businessParamConfig/paymentReview/reviewPass.ajax', (req, res, next) => {
        //Mysql复核通过
        let paramsStatus = {};
        paramsStatus.type = req.body.type; //传过来的状态数值
        let mysqlId = req.body.myqsql //获取传过来数据库表字段的id
        let deleteFlag = req.body.delete_flag
        let reviewer = req.session.loginInfo.userid
        let updateTime = req.body.updateTime //修改时间
        let operator = req.body.operator
        let operate = req.body.operate //操作状态

        // if (reviewer === operator) {
        //     return res.send({error: 1, msg: '禁止复核自己提交的申请', data: null});
        // }
        if (req.body.operator === req.session.loginInfo.userid && !req.session.loginInfo.isAdmin) {
            return res.send({
                error: 1,
                msg: '禁止复核自己提交的申请',
                data: null
            });
        }
        // 检查该条数据是否存在
        let checkHasSubmit = new Promise((resolve, reject) => {
            let SQL = `SELECT * FROM ${tableName} WHERE local_id=${mysqlId} AND update_timestamp='${updateTime}'`;
            console.log("666-----", SQL)
            console.log('/businessMgmt/IPOMgmtOC/paymentReview/reviewPass.ajax run check SQL: ', SQL);
            pool.getConnection((error, connection) => {
                if (error) {
                    return res.send({
                        error: 1,
                        msg: '链接本地数据库失败',
                        data: null
                    });
                }
                connection.query(SQL, function (error, results) {
                    console.log('/businessMgmt/IPOMgmtOC/paymentReview/reviewPass.ajax run check SQL error: ', error);
                    console.log('/businessMgmt/IPOMgmtOC/paymentReview/reviewPass.ajax run check SQL results: ', results);
                    if (error) {
                        reject({
                            message: '检查该条数据是否已被审核SQL语句失败'
                        });
                    }
                    resolve(Array.from(results).length);
                    console.log("*********", results)
                });
                connection.release();
            });
        });
        // 操作服务端数据
        let operateService = function (item) {
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
            params.checker = req.session.loginInfo.userid

            let reviewers = req.session.loginInfo.userid //复核人
            let reviewerTime = req.body.reviewerTime //复核时间
            return new Promise((resolve, reject) => {
                if (operate == 2) { //修改操作
                    let option = {
                        pageUrl: '/businessMgmt/businessParamConfig/paymentReview/reviewPass.ajax',
                        operateType: operate, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
                        url: apiUrlList.update,
                        body: params,
                        timeout: 15000,
                        json: true
                    };
                    request.post(option, (error, response, body) => {
                        if (error) {
                            reject({
                                message: '调用服务端数据失败'
                            });
                        }
                        // let result = typeof body === 'string' ? JSON.parse(body) : body;
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
                    })
                } else if (operate == 3) { //删除操作
                    let params = {};
                    req.body.id && (params.id = req.body.id);
                    let option = {
                        pageUrl: '/businessMgmt/businessParamConfig/paymentReview/reviewPass.ajax',
                        req,
                        operateType: operate, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
                        url: apiUrlList.deleteParam,
                        qs: params,
                        timeout: 15000,
                        json: true
                    };
                    request.del(option, (error, response, body) => {
                        if (error) {
                            reject({
                                message: '调用服务端数据失败'
                            });
                        }
                        // let result = typeof body == 'string' ? JSON.parse(body) : body;
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
                }
            }).then(function () {
                return new Promise((resolve, reject) => {
                    let sql = `UPDATE ${tableName} SET status=0,reviewer='${reviewers}',review_time='${reviewerTime}' WHERE local_id=${mysqlId}`;
                    console.log('/businessMgmt/businessParamConfig/paymentReview/reviewPass.ajax run business sql:', sql);
                    pool.getConnection((error, connection) => {
                        if (error) {
                            return res.send({
                                error: 1,
                                msg: '链接本地数据库失败',
                                data: null
                            });
                        }
                        connection.query(sql, function (error, results) {
                            console.log('/businessMgmt/businessParamConfig/paymentReview/reviewPass.ajax run business sql error:', error);
                            console.log('/businessMgmt/businessParamConfig/paymentReview/reviewPass.ajax run business sql results:', results);
                            if (error) {
                                reject({
                                    message: '操作本地数据库出错，请核对校验本地数据'
                                });
                            }
                            resolve();

                        });
                        connection.release();
                    });
                });
            })
        };
        checkHasSubmit.then(hasSubmit => {
            if (hasSubmit === 0) {
                return res.send({
                    error: 1,
                    msg: '数据不存在',
                    data: null
                });
            }
            operateService(req.body).then(() => {
                res.send({
                    error: 0,
                    msg: '复核成功',
                    data: null
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


        //
        // //复核通过修改数据
        // let params = {};
        // req.body.id && (params.id = req.body.id);
        // if (paramsStatus.type == "1" &&operate== "2") {
        //     var promise = new Promise(function (resolve, reject) {
        //         req.body.product && (params.product = req.body.product);
        //         req.body.payType && (params.payType = req.body.payType);
        //         req.body.tradeType && (params.tradeType = req.body.tradeType);
        //         req.body.startTime && (params.startTime = req.body.startTime);
        //         req.body.endTime && (params.endTime = req.body.endTime);
        //         req.body.createTime && (params.createTime = req.body.createTime);
        //         req.body.updateTime && (params.updateTime = req.body.updateTime);
        //         req.body.channel && (params.channel = req.body.channel);
        //         req.body.remark && (params.remark = req.body.remark);
        //         req.body.operator && (params.operator = req.body.operator);
        //
        //         params = JSON.stringify(params)
        //         let reviewers= req.session.loginInfo.userid//复核人
        //         let reviewerTime=req.body.reviewerTime//复核时间
        //         var sql = "UPDATE bm_bpc_payment SET content=?,reviewer=?,review_time=?,status='0' where local_id=?";
        //         console.log('/businessMgmt/businessParamConfig/paymentReview/reviewPass.ajax sql:', sql);
        //         console.log('/businessMgmt/businessParamConfig/paymentReview/reviewPass.ajax params:', params);
        //         pool.query(sql, [params,reviewers,reviewerTime,mysqlId], function (error, results, fields) {
        //             console.log('/businessMgmt/businessParamConfig/paymentReview/reviewPass.ajax error:', error);
        //             console.log('/businessMgmt/businessParamConfig/paymentReview/reviewPass.ajax results:', results);
        //             console.log('/businessMgmt/businessParamConfig/paymentReview/reviewPass.ajax fields:', fields);
        //             if (error) {
        //                 // console.log('error=', error);
        //                 reject({error: 1, msg: '复核失败'})
        //             }
        //             resolve(results)
        //         });
        //     })
        //
        //     promise.then(function (results) {
        //         let params = {};
        //         req.body.id && (params.id = req.body.id);
        //         req.body.product && (params.product = req.body.product);
        //         req.body.payType && (params.payType = req.body.payType);
        //         req.body.tradeType && (params.tradeType = req.body.tradeType);
        //         req.body.startTime && (params.startTime = req.body.startTime);
        //         req.body.endTime && (params.endTime = req.body.endTime);
        //         req.body.channel && (params.channel = req.body.channel);
        //         req.body.remark && (params.remark = req.body.remark);
        //         let option = {
        //             session: req.session,
        //             url: apiUrlList.update,
        //             body: params,
        //             timeout: 15000,
        //             json: true
        //         };
        //         console.log('/businessMgmt/businessParamConfig/paymentReview/reviewPass.ajax option:', option);
        //         request.post(option, (error, response, body) => {
        //             console.log('/businessMgmt/businessParamConfig/paymentReview/reviewPass.ajax error:', error);
        //             console.log('/businessMgmt/businessParamConfig/paymentReview/reviewPass.ajax statusCode:', response && response.statusCode);
        //             console.log('/businessMgmt/businessParamConfig/paymentReview/reviewPass.ajax body:', body);
        //             if (error) {
        //                 return res.send({error: 1, msg: '操作失败'});
        //             }
        //             let result = typeof body === 'string' ? JSON.parse(body) : body;
        //             if (result && result.returnCode === 0) {
        //                 res.send({error: 0, msg: '复核成功'});
        //             }
        //             else if (result && result.returnCode != 9999) {
        //                 res.send({error: 1, msg: result.returnMsg});
        //             }
        //             else {
        //                 res.send({error: 1, msg: '复核失败'});
        //             }
        //         })
        //     }).catch(error => {
        //         return res.send({error: 1, msg: "复核失败"});
        //     });
        // }
        // // 当前状态为"deleteFlag=T"-删除状态,则分别删除数据库和后台数据
        // if (paramsStatus.type == "1" && operate== "3") {
        //     var promise = new Promise(function (resolve, reject) {
        //         let params = {};
        //         req.body.id && (params.id = req.body.id);
        //         req.body.product && (params.product = req.body.product);
        //         req.body.payType && (params.payType = req.body.payType);
        //         req.body.tradeType && (params.tradeType = req.body.tradeType);
        //         req.body.startTime && (params.startTime = req.body.startTime);
        //         req.body.endTime && (params.endTime = req.body.endTime);
        //         req.body.createTime && (params.createTime = req.body.createTime);
        //         req.body.updateTime && (params.updateTime = req.body.updateTime);
        //         req.body.channel && (params.channel = req.body.channel);
        //         req.body.remark && (params.remark = req.body.remark);
        //         req.body.operator && (params.operator = req.body.operator);
        //         params = JSON.stringify(params)
        //         let reviewers= req.session.loginInfo.userid;
        //         let reviewerTime=req.body.reviewerTime//复核时间
        //         var sql = "UPDATE bm_bpc_payment SET content=?,reviewer=?,review_time=?,status='0' where local_id=?";
        //         console.log('/businessMgmt/businessParamConfig/paymentReview/reviewPass.ajax sql:', sql);
        //         console.log('/businessMgmt/businessParamConfig/paymentReview/reviewPass.ajax params:', params);
        //         pool.query(sql, [params,reviewers,reviewerTime, mysqlId], function (error, results, fields) {
        //             console.log('/businessMgmt/businessParamConfig/paymentReview/reviewPass.ajax error:', error);
        //             console.log('/businessMgmt/businessParamConfig/paymentReview/reviewPass.ajax results:', results);
        //             console.log('/businessMgmt/businessParamConfig/paymentReview/reviewPass.ajax fields:', fields);
        //             if (error) {
        //                 reject({error: 1, msg: '删除失败'})
        //             }
        //             resolve(results)
        //         });
        //     })
        //     promise.then(function (results) {
        //         let params = {};
        //         req.body.id && (params.id = req.body.id);
        //         let option = {
        //             session: req.session,
        //             url: apiUrlList.deleteParam,
        //             qs: params,
        //             timeout: 15000,
        //             json: true
        //         };
        //         console.log('/businessMgmt/businessParamConfig/paymentReview/reviewPass.ajax option:', option);
        //         request.del(option, (error, response, body) => {
        //             console.log('/businessMgmt/businessParamConfig/paymentReview/reviewPass.ajax error:', error);
        //             console.log('/businessMgmt/businessParamConfig/paymentReview/reviewPass.ajax statusCode:', response && response.statusCode);
        //             console.log('/businessMgmt/businessParamConfig/paymentReview/reviewPass.ajax body:', body);
        //             if (error) {
        //                 return res.send({error: 1, msg: '操作失败'});
        //             }
        //             let result = typeof body == 'string' ? JSON.parse(body) : body;
        //             if (result && result.returnCode === 0) {
        //                 res.send({error: 0, msg: '删除成功'});
        //             }
        //             else if (result && result.returnCode != 9999) {
        //                 res.send({error: 1, msg: result.returnMsg});
        //             }
        //             else {
        //                 res.send({error: 1, msg: '删除失败'});
        //             }
        //         });
        //     }).catch(error => {
        //         return res.send({error: 1, msg: "删除失败"});
        //     });
        // }

    });


    //Mysql和业务接口复核通过执行保存数据;
    app.post('/businessMgmt/businessParamConfig/paymentReview/SavePass.ajax', (req, res, next) => {
        //Mysql复核通过
        let paramsStatus = {};
        paramsStatus.type = req.body.type; //传过来的状态数值
        let mysqlId = req.body.myqsql //获取传过来数据库表字段的id
        let deleteFlag = req.body.delete_flag
        let updateTime = req.body.updateTime //修改时间
        let reviewer = req.session.loginInfo.userid
        let operate = req.body.operate //操作状态
        let operator = req.body.operator
        // if (reviewer === operator) {
        //     return res.send({error: 1, msg: '禁止复核自己提交的申请', data: null});
        // }
        if (req.body.operator === req.session.loginInfo.userid && !req.session.loginInfo.isAdmin) {
            return res.send({
                error: 1,
                msg: '禁止复核自己提交的申请',
                data: null
            });
        }
        // 检查该条数据是否存在
        let checkHasSubmit = new Promise((resolve, reject) => {
            let SQL = `SELECT * FROM ${tableName} WHERE local_id=${mysqlId} AND update_timestamp='${updateTime}'`;
            console.log("666-----", SQL)
            console.log('/businessMgmt/IPOMgmtOC/paymentReview/SavePass.ajax run check SQL: ', SQL);
            pool.getConnection((error, connection) => {
                if (error) {
                    return res.send({
                        error: 1,
                        msg: '链接本地数据库失败',
                        data: null
                    });
                }
                connection.query(SQL, function (error, results) {
                    console.log('/businessMgmt/IPOMgmtOC/paymentReview/SavePass.ajax run check SQL error: ', error);
                    console.log('/businessMgmt/IPOMgmtOC/paymentReview/SavePass.ajax run check SQL results: ', results);
                    if (error) {
                        reject({
                            message: '检查该条数据是否已被审核SQL语句失败'
                        });
                    }
                    resolve(Array.from(results).length);
                    console.log("*********", results)
                });
                connection.release();
            });
        });

        // 操作服务端数据
        let operateService = function (item) {
            let params = {};
            // params.id = req.body.id;
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
            params.checker = req.session.loginInfo.userid

            let reviewers = req.session.loginInfo.userid;
            let reviewerTime = req.body.reviewerTime //复核时间
            // 给空字符串添加 * 字符
            for (let key in params) {
                if (params[key] === '') {
                    params[key] = '*';
                }
            }
            return new Promise((resolve, reject) => {
                if (operate == 1) {
                    let option = {
                        pageUrl: '/businessMgmt/businessParamConfig/paymentReview/SavePass.ajax',
                        req,
                        operateType: operate, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
                        url: apiUrlList.saveParam,
                        body: params,
                        timeout: 15000,
                        json: true
                    };
                    request.put(option, (error, response, body) => {
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
                    })
                }
            }).then(function () {
                return new Promise((resolve, reject) => {
                    let sql = `UPDATE ${tableName} SET status=0,reviewer='${reviewers}',review_time='${reviewerTime}' WHERE local_id=${mysqlId}`;
                    console.log('/businessMgmt/businessParamConfig/paymentReview/SavePass.ajax run business sql:', sql);
                    pool.getConnection((error, connection) => {
                        if (error) {
                            return res.send({
                                error: 1,
                                msg: '链接本地数据库失败',
                                data: null
                            });
                        }
                        connection.query(sql, function (error, results) {
                            console.log('/businessMgmt/businessParamConfig/paymentReview/SavePass.ajax run business sql error:', error);
                            console.log('/businessMgmt/businessParamConfig/paymentReview/SavePass.ajax run business sql results:', results);
                            if (error) {
                                reject({
                                    message: '操作本地数据库出错，请核对校验本地数据'
                                });
                            }
                            console.log("------", results)
                            resolve();

                        });
                        connection.release();
                    });
                });
            })
        }

        checkHasSubmit.then(hasSubmit => {
            if (hasSubmit === 0) {
                return res.send({
                    error: 1,
                    msg: '数据不存在',
                    data: null
                });
            }
            operateService(req.body).then(() => {
                res.send({
                    error: 0,
                    msg: '复核成功',
                    data: null
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

        // 当前状态为"1"正常状态,则分别向数据库和后台保存数据
        // if (paramsStatus.type == "1" && operate == "1") {
        //     let params = {};
        //     req.body.id && (params.id = req.body.id);
        //     req.body.product && (params.product = req.body.product);
        //     req.body.payType && (params.payType = req.body.payType);
        //     req.body.tradeType && (params.tradeType = req.body.tradeType);
        //     req.body.startTime && (params.startTime = req.body.startTime);
        //     req.body.endTime && (params.endTime = req.body.endTime);
        //     req.body.createTime && (params.createTime = req.body.createTime);
        //     req.body.updateTime && (params.updateTime = req.body.updateTime);
        //     req.body.channel && (params.channel = req.body.channel);
        //     req.body.remark && (params.remark = req.body.remark);
        //     params.checker = reviewer;
        //     req.body.operator && (params.operator = req.body.operator);
        //     var promise = new Promise(function (resolve, reject) {
        //         params = JSON.stringify(params)
        //         let reviewers = req.session.loginInfo.userid;
        //         let reviewerTime = req.body.reviewerTime//复核时间
        //         var sql = "UPDATE bm_bpc_payment SET content=?,reviewer=?,review_time=?,status='0' where local_id=?";
        //         console.log('/businessMgmt/businessParamConfig/paymentReview/SavePass.ajax sql:', sql);
        //         console.log('/businessMgmt/businessParamConfig/paymentReview/SavePass.ajax params:', params);
        //         pool.query(sql, [params, reviewers, reviewerTime, mysqlId], function (error, results, fields) {
        //             console.log('/businessMgmt/businessParamConfig/paymentReview/SavePass.ajax error:', error);
        //             console.log('/businessMgmt/businessParamConfig/paymentReview/SavePass.ajax results:', results);
        //             console.log('/businessMgmt/businessParamConfig/paymentReview/SavePass.ajax fields:', fields);
        //             if (error) {
        //                 // console.log('error=', error);
        //                 reject({error: 1, msg: '复核失败'})
        //             }
        //             resolve(results)
        //
        //         });
        //     })
        //
        //     promise.then(function (results) {
        //         let params = {};
        //         req.body.id && (params.id = req.body.id);
        //         req.body.product && (params.product = req.body.product);
        //         req.body.payType && (params.payType = req.body.payType);
        //         req.body.tradeType && (params.tradeType = req.body.tradeType);
        //         req.body.startTime && (params.startTime = req.body.startTime);
        //         req.body.endTime && (params.endTime = req.body.endTime);
        //         req.body.createTime && (params.createTime = req.body.createTime);
        //         req.body.updateTime && (params.updateTime = req.body.updateTime);
        //         req.body.channel && (params.channel = req.body.channel);
        //         req.body.remark && (params.remark = req.body.remark);
        //
        //         params.checker = reviewer;
        //         req.body.operator && (params.operator = req.body.operator);
        //         let option = {
        //             session: req.session,
        //             url: apiUrlList.saveParam,
        //             body: params,
        //             timeout: 15000,
        //             json: true
        //         };
        //         console.log('/businessMgmt/businessParamConfig/paymentReview/SavePass.ajax option:', option);
        //         request.put(option, (error, response, body) => {
        //             console.log('/businessMgmt/businessParamConfig/paymentReview/SavePass.ajax error:', error);
        //             console.log('/businessMgmt/businessParamConfig/paymentReview/SavePass.ajax statusCode:', response && response.statusCode);
        //             console.log('/businessMgmt/businessParamConfig/paymentReview/SavePass.ajax body:', body);
        //             if (error) {
        //                 return res.send({error: 1, msg: '操作失败'});
        //             }
        //
        //             let result = typeof body === 'string' ? JSON.parse(body) : body;
        //             if (result && result.returnCode === 0) {
        //                 res.send({error: 0, msg: '复核成功'});
        //             }
        //             else if (result && result.returnCode != 9999) {
        //                 res.send({error: 1, msg: result.returnMsg});
        //             }
        //             else {
        //                 res.send({error: 1, msg: '复核失败'});
        //             }
        //         })
        //     }).catch(error => {
        //         return res.send({error: 1, msg: "复核失败"});
        //     });
        // }

    });


    //Mysql复核驳回;
    app.post('/businessMgmt/businessParamConfig/paymentReview/reviewReject.ajax', (req, res, next) => {
        //Mysql复核通过
        let paramsStatus = {};
        paramsStatus.type = req.body.type; //传过来的状态数值
        let mysqlId = req.body.myqsql //获取传过来数据库表字段的id
        let reviewer = req.session.loginInfo.userid
        let operator = req.body.operator
        // if (reviewer === operator) {
        //     return res.send({error: 1, msg: '禁止复核自己提交的申请', data: null});
        // }
        if (req.body.operator === req.session.loginInfo.userid && !req.session.loginInfo.isAdmin) {
            return res.send({
                error: 1,
                msg: '禁止复核自己提交的申请',
                data: null
            });
        }
        if (paramsStatus.type == "1") {
            let SQL = `UPDATE ${tableName} SET status=9,remark='${req.body.revise_remark}' WHERE local_id=${mysqlId} AND update_timestamp='${req.body.update_timestamp}'`;
            console.log('/businessMgmt/businessParamConfig/paymentReview/reviewReject.ajax run business SQL:', SQL);
            pool.getConnection((error, connection) => {
                if (error) {
                    return res.send({
                        error: 1,
                        msg: '链接本地数据库失败',
                        data: null
                    });
                }
                connection.query(SQL, function (error, results) {
                    console.log('/businessMgmt/businessParamConfig/paymentReview/reviewReject.ajax run business SQL error:', error);
                    console.log('/businessMgmt/businessParamConfig/paymentReview/reviewReject.ajax run business SQL results:', results);
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
                            msg: '驳回成功',
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
                connection.release();
            });
        }


        // if (paramsStatus.type == "1") {
        //     let reviewer = req.session.loginInfo.userid
        //     let operator = req.body.operator
        //     if (reviewer === operator) {
        //         return res.send({error: 0, msg: '经办人和复核人不能是同一个人', data: null});
        //     }
        //     let mysqlId = req.body.myqsql //获取传过来数据库表字段的id
        //     let params = {};
        //     req.body.id && (params.id = req.body.id);
        //     req.body.product && (params.product = req.body.product);
        //     req.body.payType && (params.payType = req.body.payType);
        //     req.body.tradeType && (params.tradeType = req.body.tradeType);
        //     req.body.startTime && (params.startTime = req.body.startTime);
        //     req.body.endTime && (params.endTime = req.body.endTime);
        //     req.body.createTime && (params.createTime = req.body.createTime);
        //     req.body.updateTime && (params.updateTime = req.body.updateTime);
        //     req.body.channel && (params.channel = req.body.channel);
        //     req.body.remark && (params.remark = req.body.remark);
        //     req.body.operator && (params.operator = req.body.operator);
        //
        //     params = JSON.stringify(params)
        //     let reviewerTime = req.body.reviewerTime//复核时间
        //     var sql = `UPDATE bm_bpc_payment SET content=?,reviewer=?,review_time=?,remark='${req.body.revise_remark}',status='9',delete_flag='F' where local_id=${req.body.mySQLId}`;
        //     console.log('/businessMgmt/businessParamConfig/paymentReview/reviewReject.ajax sql:', sql);
        //     console.log('/businessMgmt/businessParamConfig/paymentReview/reviewReject.ajax params:', params);
        //     pool.query(sql, [params, reviewer, reviewerTime], function (error, results, fields) {
        //         console.log('/businessMgmt/businessParamConfig/paymentReview/reviewReject.ajax error:', error);
        //         console.log('/businessMgmt/businessParamConfig/paymentReview/reviewReject.ajax results:', results);
        //         console.log('/businessMgmt/businessParamConfig/paymentReview/reviewReject.ajax fields:', fields);
        //         if (error) {
        //             return res.send({error: 1, msg: '复核驳回失败'});
        //         }
        //         console.log('results=', results);
        //         console.log('fields=', fields);
        //         return res.send({error: 0, msg: '复核驳回成功', data: results});
        //
        //     });
        // }

    });

    // 获取渠道下拉数据
    app.post('/businessMgmt/businessParamConfig/paymentReview/channelTypeList.ajax', (req, res, next) => {
        let params = {};
        req.body.pmst && (params.pmst = req.body.pmst);
        req.body.pmkey && (params.pmkey = req.body.pmkey);
        let option = {
            pageUrl: '/businessMgmt/businessParamConfig/paymentReview/channelTypeList.ajax',
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
    app.post('/businessMgmt/businessParamConfig/paymentReview/fundList.ajax', (req, res, next) => {

        // 获取产品列表
        let fundList = new Promise(resolve => {
            let option = {
                pageUrl: '/businessMgmt/businessParamConfig/paymentReview/fundList.ajax --fundList',
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
                pageUrl: '/businessMgmt/businessParamConfig/paymentReview/fundList.ajax --groupList',
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

};