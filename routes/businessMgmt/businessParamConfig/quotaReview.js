const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').businessParamConfig.quotaReview;
const tableName = 'bm_bpc_quota';

module.exports = function (app) {
    //查询服务列表数据
    app.post('/businessMgmt/businessParamConfig/quotaReview/getServiceData.ajax', (req, res, next) => {
        let paramsStatus = {};
        paramsStatus.type = req.body.type;
        // 查询业务数据
        if (paramsStatus.type == "0") {
            new Promise(function (resolve, reject) {
                let params = {};
                // req.body.id && (params.id = req.body.id);
                req.body.product && (params.product = req.body.product);
                req.body.accoType && (params.accoType = req.body.accoType);
                req.body.tradeType && (params.tradeType = req.body.tradeType);
                req.body.apkind && (params.apkind = req.body.apkind);
                req.body.channel && (params.channel = req.body.channel);
                params.pageNo = req.body.pageNo;
                params.pageSize = req.body.pageSize;
                let option = {
                    pageUrl: '/businessMgmt/businessParamConfig/quotaReview/getServiceData.ajax',
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
                            msg: '服务端查询失败'
                        });
                    }
                    let result = typeof body === 'string' ? JSON.parse(body) : body;
                    if (result.returnCode == 0 && Array.isArray(result.body.ruleQuotaList)) {
                        result.body.ruleQuotaList.forEach((item) => {
                            item.check = false;
                        });
                        let resultData = {};
                        resultData.pageNo = result.body.pageNo;
                        resultData.totalSize = Math.ceil(result.body.totalSize / req.body.pageSize);
                        resultData.tableData = result.body.ruleQuotaList;
                        // res.send({error: 0, msg: '查询成功', data: resultData});
                        resolve(resultData)
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
            }).then(function (resultData) {
                return new Promise((resolve, reject) => {
                    let params = {};
                    params.pmst = "SYSTEM";
                    params.pmkey = "TAPKIND"
                    let option = {
                        pageUrl: '/businessMgmt/businessParamConfig/quotaReview/getServiceData.ajax',
                        req,
                        url: apiUrlList.params,
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
                            let apkinds = result.body;
                            var tableData = resultData.tableData
                            tableData.forEach(item => {
                                for (let apkItem of apkinds) {
                                    if (item.apkind === apkItem.pmco) {
                                        item.showApkind = apkItem.pmnm;
                                        break;
                                    } else {
                                        item.showApkind = "*"
                                    }
                                }
                            });
                            // return res.send({error: 0, msg: '获取成功', data:tableData});
                            resolve(resultData)
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
                })
            }).then(function (resultData) {
                return new Promise((resolve, reject) => {
                    let params = {};
                    params.pmst = "SYSTEM";
                    params.pmkey = "SUBAPKIND"
                    let option = {
                        pageUrl: '/businessMgmt/businessParamConfig/quotaReview/getServiceData.ajax',
                        req,
                        url: apiUrlList.params,
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
                            let subApkinds = result.body;
                            let tableData = resultData.tableData;
                            tableData.forEach(item => {
                                for (let subApkItem of subApkinds) {
                                    if (item.subApkind === subApkItem.pmco) {
                                        item.subApks = subApkItem.pmnm;
                                        break;
                                    } else {
                                        item.subApks = "*"
                                    }
                                }
                            });
                            return res.send({
                                error: 0,
                                msg: '获取成功',
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
                                msg: '获取失败'
                            });
                        }
                    });
                })
            }).catch(function (error) {
                return res.send({
                    error: 1,
                    msg: '查询失败'
                });
            })
        }
    });

    //查询经办列表
    app.post('/businessMgmt/businessParamConfig/quotaReview/getTableData.ajax', (req, res, next) => {
        let paramsStatus = {};
        paramsStatus.type = req.body.type;
        var product = req.body.product; //输入产品值
        var tradeType = req.body.tradeType;
        var apkind = req.body.apkind;
        var channel = req.body.channel;
        var reviewStatus = req.body.reviewStatus; //选择审核状态值
        // 查询本地数据库
        if (paramsStatus.type == "1") {
            let sql = `SELECT content,local_id,status,delete_flag,operate,operator,creator,reviewer,review_time,update_timestamp,remark FROM ${tableName} WHERE delete_flag='F' AND status!=1`;
            if (req.body.product) {
                sql += ` AND JSON_EXTRACT(content, '$.product')='${req.body.product}'`;
            }
            if (req.body.tradeType) {
                sql += ` AND JSON_EXTRACT(content, '$.tradeType')='${req.body.tradeType}'`;
            }
            if (req.body.channel) {
                sql += ` AND JSON_EXTRACT(content, '$.channel')='${req.body.channel}'`;
            }
            if (req.body.apkind) {
                sql += ` AND JSON_EXTRACT(content, '$.apkind')='${req.body.apkind}'`;
            }
            if (req.body.accoType) {
                sql += ` AND JSON_EXTRACT(content, '$.accoType')='${req.body.accoType}'`;
            }
            if (req.body.reviewStatus) {
                sql += ` AND status='${req.body.reviewStatus}'`;
            }
            sql += ' ORDER BY update_timestamp DESC';
            new Promise(function (resolve, reject) {
                // var sql =`select content,local_id,status,delete_flag,operate,operator,creator,reviewer,review_time,update_timestamp,remark from ${tableName} where delete_flag="F" ORDER BY update_timestamp DESC`;
                console.log('/businessMgmt/businessParamConfig/quotaReview/getTableData.ajax sql:', sql);
                pool.getConnection(function (error, connection) {
                    if (error) {
                        reject({
                            error: 1,
                            msg: '操作失败'
                        });
                    }
                    connection.query(sql, function (error, results, fields) {
                        console.log('/businessMgmt/businessParamConfig/quotaReview/getTableData.ajax error:', error);
                        console.log('/businessMgmt/businessParamConfig/quotaReview/getTableData.ajax results:', results);
                        console.log('/businessMgmt/businessParamConfig/quotaReview/getTableData.ajax fields:', fields);
                        if (error) {
                            reject({
                                error: 1,
                                msg: '经办数据查询失败'
                            });
                        }
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
                        console.log("-----", middleArr)
                        // return res.send({error: 0, msg: '获取成功', data: middleArr});
                    });
                    connection.release();
                });
            }).then(function (middleArr) {
                return new Promise((resolve, reject) => {
                    let params = {};
                    params.pmst = "SYSTEM";
                    params.pmkey = "TAPKIND"
                    let option = {
                        pageUrl: '/businessMgmt/businessParamConfig/quotaReview/getTableData.ajax',
                        req,
                        url: apiUrlList.params,
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
                            let apkinds = result.body;
                            middleArr.forEach(item => {
                                for (let apkItem of apkinds) {
                                    if (item.apkind === apkItem.pmco) {
                                        item.showApkind = apkItem.pmnm;
                                        break;
                                    } else {
                                        item.showApkind = "*"
                                    }
                                }
                            });
                            // return res.send({error: 0, msg: '获取成功', data: middleArr});
                            resolve(middleArr)
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
                })
            }).then(function (middleArr) {
                return new Promise((resolve, reject) => {
                    let params = {};
                    params.pmst = "SYSTEM";
                    params.pmkey = "SUBAPKIND"
                    let option = {
                        pageUrl: '/businessMgmt/businessParamConfig/quotaReview/getTableData.ajax',
                        req,
                        url: apiUrlList.params,
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
                            let subApkinds = result.body;
                            middleArr.forEach(item => {
                                for (let subApkItem of subApkinds) {
                                    if (item.subApkind === subApkItem.pmco) {
                                        item.subApks = subApkItem.pmnm;
                                        break;
                                    } else {
                                        item.subApks = "*"
                                    }
                                }
                            });
                            return res.send({
                                error: 0,
                                msg: '获取成功',
                                data: middleArr
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
                })
            }).catch(function (error) {
                return res.send({
                    error: 1,
                    msg: '查询失败'
                });
            })
        }
    });


    // 获取业务参数
    app.post('/businessMgmt/businessParamConfig/quotaReview/apkinds.ajax', (req, res, next) => {
        let params = {};
        req.body.pmst && (params.pmst = req.body.pmst);
        req.body.pmkey && (params.pmkey = req.body.pmkey);
        let option = {
            pageUrl: '/businessMgmt/businessParamConfig/quotaReview/apkinds.ajax',
            req,
            url: apiUrlList.apkinds,
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


    //Mysql和业务接口复核通过执行更新和删除数据;
    app.post('/businessMgmt/businessParamConfig/quotaReview/reviewPass.ajax', (req, res, next) => {
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
            console.log("-----", SQL)
            console.log('/businessMgmt/IPOMgmtOC/quotaReview/reviewPass.ajax run check SQL: ', SQL);
            pool.getConnection(function (error, connection) {
                if (error) {
                    reject({
                        error: 1,
                        msg: '操作失败'
                    });
                }
                connection.query(SQL, function (error, results) {
                    console.log('/businessMgmt/IPOMgmtOC/quotaReview/reviewPass.ajax run check SQL error: ', error);
                    console.log('/businessMgmt/IPOMgmtOC/quotaReview/reviewPass.ajax run check SQL results: ', results);
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
            params.apkind = req.body.apkind;
            params.tradeType = req.body.tradeType;
            params.custType = req.body.custType;
            params.branchCode = req.body.branchCode;
            params.channel = req.body.channel;
            params.bankNo = req.body.bankNo;
            params.remark = req.body.remark;
            params.subApkind = req.body.subApkind;
            params.quotaType = req.body.quotaType;
            params.startTime = req.body.startTime;
            params.endTime = req.body.endTime;
            params.maxQuota = req.body.maxQuota;
            params.minQuota = req.body.minQuota;
            params.accoType = req.body.accoType;
            params.operator = req.body.operator;
            params.checker = req.session.loginInfo.userid

            let reviewers = req.session.loginInfo.userid //复核人
            let reviewerTime = req.body.reviewerTime //复核时间
            return new Promise((resolve, reject) => {
                if (operate == 2) {
                    let option = {
                        pageUrl: '/businessMgmt/businessParamConfig/quotaReview/reviewPass.ajax',
                        req,
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
                } else if (operate == 3) {
                    let params = {};
                    req.body.id && (params.id = req.body.id);
                    let option = {
                        pageUrl: '/businessMgmt/businessParamConfig/quotaReview/reviewPass.ajax',
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

            }).then(function () { //本地数据库
                return new Promise((resolve, reject) => {

                    let sql = `UPDATE ${tableName} SET status=0,reviewer='${reviewers}',review_time='${reviewerTime}' WHERE local_id=${mysqlId}`;
                    console.log('/businessMgmt/businessParamConfig/quotaReview/reviewPass.ajax run business sql:', sql);
                    pool.getConnection(function (error, connection) {
                        if (error) {
                            reject({
                                error: 1,
                                msg: '操作失败'
                            });
                        }
                        connection.query(sql, function (error, results) {
                            console.log('/businessMgmt/businessParamConfig/quotaReview/reviewPass.ajax run business sql error:', error);
                            console.log('/businessMgmt/businessParamConfig/quotaReview/reviewPass.ajax run business sql results:', results);
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


        // //复核通过修改数据
        // 操作本地数据
        //     let params = {};
        //     req.body.id && (params.id = req.body.id);
        //     if (paramsStatus.type == "1" && operate == "2") {
        //         var promise = new Promise(function (resolve, reject) {
        //             req.body.product && (params.product = req.body.product);
        //             req.body.apkind && (params.apkind = req.body.apkind);
        //             req.body.tradeType && (params.tradeType = req.body.tradeType);
        //             req.body.custType && (params.custType = req.body.custType);
        //             req.body.branchCode && (params.branchCode = req.body.branchCode);
        //             req.body.channel && (params.channel = req.body.channel);
        //             req.body.bankNo && (params.bankNo = req.body.bankNo);
        //             req.body.remark && (params.remark = req.body.remark);
        //             req.body.subApkind && (params.subApkind = req.body.subApkind);
        //             req.body.quotaType && (params.quotaType = req.body.quotaType);
        //             req.body.startTime && (params.startTime = req.body.startTime);
        //             req.body.endTime && (params.endTime = req.body.endTime);
        //             req.body.maxQuota && (params.maxQuota = req.body.maxQuota);
        //             req.body.minQuota && (params.minQuota = req.body.minQuota);
        //             req.body.accoType && (params.accoType = req.body.accoType);
        //             req.body.operator && (params.operator = req.body.operator);
        //             let reviewers = req.session.loginInfo.userid//复核人
        //             let reviewerTime = req.body.reviewerTime//复核时间
        //             params = JSON.stringify(params)
        //             var sql = "UPDATE bm_bpc_quota SET content=?,reviewer=?,review_time=?,status='0' where local_id=?";
        //             console.log('/businessMgmt/businessParamConfig/quotaReview/reviewPass.ajax sql:', sql);
        //             console.log('/businessMgmt/businessParamConfig/quotaReview/reviewPass.ajax params:', params);
        //             pool.query(sql, [params, reviewers, reviewerTime, mysqlId], function (error, results, fields) {
        //                 console.log('/businessMgmt/businessParamConfig/quotaReview/reviewPass.ajax error:', error);
        //                 console.log('/businessMgmt/businessParamConfig/quotaReview/reviewPass.ajax results:', results);
        //                 console.log('/businessMgmt/businessParamConfig/quotaReview/reviewPass.ajax fields:', fields);
        //                 if (error) {
        //                     // console.log('error=', error);
        //                     reject({error: 1, msg: '复核失败'})
        //                 }
        //                 resolve(results)
        //             });
        //         })
        //
        //         promise.then(function (results) {
        //             let params = {};
        //             req.body.id && (params.id = req.body.id);
        //             req.body.maxQuota && (params.maxQuota = req.body.maxQuota);
        //             req.body.minQuota && (params.minQuota = req.body.minQuota);
        //             req.body.startTime && (params.startTime = req.body.startTime);
        //             req.body.endTime && (params.endTime = req.body.endTime);
        //             let option = {
        //                 session: req.session,
        //                 url: apiUrlList.update,
        //                 body: params,
        //                 timeout: 15000,
        //                 json: true
        //             };
        //             console.log('/businessMgmt/businessParamConfig/quotaReview/reviewPass.ajax option:', option);
        //             request.post(option, (error, response, body) => {
        //                 console.log('/businessMgmt/businessParamConfig/quotaReview/reviewPass.ajax error:', error);
        //                 console.log('/businessMgmt/businessParamConfig/quotaReview/reviewPass.ajax statusCode:', response && response.statusCode);
        //                 console.log('/businessMgmt/businessParamConfig/quotaReview/reviewPass.ajax body:', body);
        //                 if (error) {
        //                     return res.send({error: 1, msg: '操作失败'});
        //                 }
        //
        //                 let result = typeof body === 'string' ? JSON.parse(body) : body;
        //                 if (result && result.returnCode === 0) {
        //                     res.send({error: 0, msg: '复核成功'});
        //                 }
        //                 else if (result && result.returnCode != 9999) {
        //                     res.send({error: 1, msg: result.returnMsg});
        //                 }
        //                 else {
        //                     res.send({error: 1, msg: '复核失败'});
        //                 }
        //
        //             })
        //         }).catch(error => {
        //             return res.send({error: 1, msg: "复核失败"});
        //         });
        //     //复核通过删除数据
        //     if (paramsStatus.type == "1" && operate == "3") {
        //         var promise = new Promise(function (resolve, reject) {
        //             let params = {};
        //             req.body.id && (params.id = req.body.id);
        //             req.body.product && (params.product = req.body.product);
        //             req.body.apkind && (params.apkind = req.body.apkind);
        //             req.body.tradeType && (params.tradeType = req.body.tradeType);
        //             req.body.custType && (params.custType = req.body.custType);
        //             req.body.branchCode && (params.branchCode = req.body.branchCode);
        //             req.body.channel && (params.channel = req.body.channel);
        //             req.body.bankNo && (params.bankNo = req.body.bankNo);
        //             req.body.remark && (params.remark = req.body.remark);
        //             req.body.subApkind && (params.subApkind = req.body.subApkind);
        //             req.body.quotaType && (params.quotaType = req.body.quotaType);
        //             req.body.startTime && (params.startTime = req.body.startTime);
        //             req.body.endTime && (params.endTime = req.body.endTime);
        //             req.body.maxQuota && (params.maxQuota = req.body.maxQuota);
        //             req.body.minQuota && (params.minQuota = req.body.minQuota);
        //             req.body.accoType && (params.accoType = req.body.accoType);
        //             req.body.operator && (params.operator = req.body.operator);
        //
        //             params = JSON.stringify(params)
        //             let reviewers = req.session.loginInfo.userid;
        //             let reviewerTime = req.body.reviewerTime//复核时间
        //             var sql = "UPDATE bm_bpc_quota SET content=?,reviewer=?,review_time=?,status='0' where local_id=?";
        //             console.log('/businessMgmt/businessParamConfig/quotaReview/reviewPass.ajax sql:', sql);
        //             console.log('/businessMgmt/businessParamConfig/quotaReview/reviewPass.ajax params:', params);
        //             pool.query(sql, [params, reviewers, reviewerTime, mysqlId], function (error, results, fields) {
        //                 console.log('/businessMgmt/businessParamConfig/discountReview/reviewPass.ajax error:', error);
        //                 console.log('/businessMgmt/businessParamConfig/discountReview/reviewPass.ajax results:', results);
        //                 console.log('/businessMgmt/businessParamConfig/discountReview/reviewPass.ajax fields:', fields);
        //                 if (error) {
        //                     console.log('error=', error);
        //                     reject({error: 1, msg: '删除失败'})
        //                 }
        //                 resolve(results)
        //             });
        //         })
        //
        //         promise.then(function (results) {
        //             let params = {};
        //             req.body.id && (params.id = req.body.id);
        //             let option = {
        //                 session: req.session,
        //                 url: apiUrlList.deleteParam,
        //                 qs: params,
        //                 timeout: 15000,
        //                 json: true
        //             };
        //             console.log('/businessMgmt/businessParamConfig/discountReview/reviewPass.ajax option:', option);
        //             request.del(option, (error, response, body) => {
        //                 console.log('/businessMgmt/businessParamConfig/discountReview/reviewPass.ajax error:', error);
        //                 console.log('/businessMgmt/businessParamConfig/discountReview/reviewPass.ajax statusCode:', response && response.statusCode);
        //                 console.log('/businessMgmt/businessParamConfig/discountReview/reviewPass.ajax body:', body);
        //                 if (error) {
        //                     return res.send({error: 1, msg: '操作失败'});
        //                 }
        //                 let result = typeof body == 'string' ? JSON.parse(body) : body;
        //                 if (result && result.returnCode === 0) {
        //                     res.send({error: 0, msg: '删除成功'});
        //                 }
        //                 else if (result && result.returnCode != 9999) {
        //                     res.send({error: 1, msg: result.returnMsg});
        //                 }
        //                 else {
        //                     res.send({error: 1, msg: '删除失败'});
        //                 }
        //             });
        //         }).catch(error => {
        //             return res.send({error: 1, msg: "删除失败"});
        //         });
        //     }
        // };

    })


    //Mysql和业务接口复核通过执行保存数据;
    app.post('/businessMgmt/businessParamConfig/quotaReview/SavePass.ajax', (req, res, next) => {
        //Mysql复核通过
        let paramsStatus = {};
        paramsStatus.type = req.body.type; //传过来的状态数值
        let mysqlId = req.body.myqsql //获取传过来数据库表字段的id
        let deleteFlag = req.body.delete_flag
        let updateTime = req.body.updateTime //修改时间
        console.log("登录信息:", req.session.loginInfo.userid)
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
            console.log('/businessMgmt/IPOMgmtOC/quotaReview/SavePass.ajax run check SQL: ', SQL);
            pool.getConnection(function (error, connection) {
                if (error) {
                    reject({
                        error: 1,
                        msg: '操作失败'
                    });
                }
                connection.query(SQL, function (error, results) {
                    console.log('/businessMgmt/IPOMgmtOC/quotaReview/SavePass.ajax run check SQL error: ', error);
                    console.log('/businessMgmt/IPOMgmtOC/quotaReview/SavePass.ajax run check SQL results: ', results);
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
            params.apkind = req.body.apkind;
            params.tradeType = req.body.tradeType;
            params.custType = req.body.custType;
            params.branchCode = req.body.branchCode;
            params.channel = req.body.channel;
            params.bankNo = req.body.bankNo;
            params.remark = req.body.remark;
            params.subApkind = req.body.subApkind;
            params.quotaType = req.body.quotaType;
            params.startTime = req.body.startTime;
            params.endTime = req.body.endTime;
            params.maxQuota = req.body.maxQuota;
            params.minQuota = req.body.minQuota;
            params.accoType = req.body.accoType;
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
                        pageUrl: '/businessMgmt/businessParamConfig/quotaReview/SavePass.ajax',
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
                    console.log('/businessMgmt/businessParamConfig/quotaReview/reviewPass.ajax run business sql:', sql);
                    pool.getConnection(function (error, connection) {
                        if (error) {
                            reject({
                                error: 1,
                                msg: '操作失败'
                            });
                        }
                        connection.query(sql, function (error, results) {
                            console.log('/businessMgmt/businessParamConfig/quotaReview/reviewPass.ajax run business sql error:', error);
                            console.log('/businessMgmt/businessParamConfig/quotaReview/reviewPass.ajax run business sql results:', results);
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


        // let params = {};
        // if (paramsStatus.type == "1" && operate == "1") {
        //     var promise = new Promise(function (resolve, reject) {
        //         req.body.id && (params.id = req.body.id);
        //         req.body.product && (params.product = req.body.product);
        //         req.body.apkind && (params.apkind = req.body.apkind);
        //         req.body.tradeType && (params.tradeType = req.body.tradeType);
        //         req.body.custType && (params.custType = req.body.custType);
        //         req.body.branchCode && (params.branchCode = req.body.branchCode);
        //         req.body.channel && (params.channel = req.body.channel);
        //         req.body.bankNo && (params.bankNo = req.body.bankNo);
        //         req.body.remark && (params.remark = req.body.remark);
        //         req.body.subApkind && (params.subApkind = req.body.subApkind);
        //         req.body.quotaType && (params.quotaType = req.body.quotaType);
        //         req.body.startTime && (params.startTime = req.body.startTime);
        //         req.body.endTime && (params.endTime = req.body.endTime);
        //         req.body.maxQuota && (params.maxQuota = req.body.maxQuota);
        //         req.body.minQuota && (params.minQuota = req.body.minQuota);
        //         req.body.accoType && (params.accoType = req.body.accoType);
        //         req.body.operator && (params.operator = req.body.operator);
        //         params = JSON.stringify(params)
        //         let reviewers = req.session.loginInfo.userid;
        //         let reviewerTime = req.body.reviewerTime//复核时间
        //         var sql = "UPDATE bm_bpc_quota SET content=?,reviewer=?,review_time=?,status='0' where local_id=?";
        //         console.log('/businessMgmt/businessParamConfig/quotaReview/SavePass.ajax sql:', sql);
        //         console.log('/businessMgmt/businessParamConfig/quotaReview/SavePass.ajax params:', params);
        //         pool.query(sql, [params, reviewers, reviewerTime, mysqlId], function (error, results, fields) {
        //             console.log('/businessMgmt/businessParamConfig/quotaReview/SavePass.ajax error:', error);
        //             console.log('/businessMgmt/businessParamConfig/quotaReview/SavePass.ajax results:', results);
        //             console.log('/businessMgmt/businessParamConfig/quotaReview/SavePass.ajax fields:', fields);
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
        //         req.body.apkind && (params.apkind = req.body.apkind);
        //         req.body.tradeType && (params.tradeType = req.body.tradeType);
        //         req.body.custType && (params.custType = req.body.custType);
        //         req.body.branchCode && (params.branchCode = req.body.branchCode);
        //         req.body.channel && (params.channel = req.body.channel);
        //         req.body.bankNo && (params.bankNo = req.body.bankNo);
        //         req.body.remark && (params.remark = req.body.remark);
        //         req.body.subApkind && (params.subApkind = req.body.subApkind);
        //         req.body.quotaType && (params.quotaType = req.body.quotaType);
        //         req.body.startTime && (params.startTime = req.body.startTime);
        //         req.body.endTime && (params.endTime = req.body.endTime);
        //         req.body.maxQuota && (params.maxQuota = req.body.maxQuota);
        //         req.body.minQuota && (params.minQuota = req.body.minQuota);
        //         req.body.accoType && (params.accoType = req.body.accoType);
        //
        //         params.createTime = req.body.startTime
        //         params.updateTime = req.body.endTime
        //         params.checker = reviewer;
        //         req.body.operator && (params.operator = req.body.operator);
        //         let option = {
        //             session: req.session,
        //             url: apiUrlList.saveParam,
        //             body: params,
        //             timeout: 15000,
        //             json: true
        //         };
        //         console.log('/businessMgmt/businessParamConfig/quotaReview/SavePass.ajax option:', option);
        //         request.put(option, (error, response, body) => {
        //             console.log('/businessMgmt/businessParamConfig/quotaReview/SavePass.ajax error:', error);
        //             console.log('/businessMgmt/businessParamConfig/quotaReview/SavePass.ajax statusCode:', response && response.statusCode);
        //             console.log('/businessMgmt/businessParamConfig/quotaReview/SavePass.ajax body:', body);
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


    //Mysql审核驳回;
    app.post('/businessMgmt/businessParamConfig/quotaReview/reviewReject.ajax', (req, res, next) => {

        let paramsStatus = {};
        paramsStatus.type = req.body.type; //传过来的状态数值
        let mysqlId = req.body.myqsql //获取传过来数据库表字段的id
        let reviewer = req.session.loginInfo.userid
        let operator = req.body.operator
        console.log("****", operator)
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
            console.log('/businessMgmt/businessParamConfig/quotaReview/reviewReject.ajax run business SQL:', SQL);
            pool.getConnection(function (error, connection) {
                if (error) {
                    reject({
                        error: 1,
                        msg: '操作失败'
                    });
                }
                connection.query(SQL, function (error, results) {
                    console.log('/businessMgmt/businessParamConfig/quotaReview/reviewReject.ajax run business SQL error:', error);
                    console.log('/businessMgmt/businessParamConfig/quotaReview/reviewReject.ajax run business SQL results:', results);
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
        //     let updateTime =req.body.updateTime
        //     let operator = req.body.operator
        //     // if (reviewer === operator) {
        //     //     return res.send({error: 0, msg: '经办人和复核人不能是同一个人'});
        //     // }
        //     let mysqlId = req.body.myqsql //获取传过来数据库表字段的id
        //     let params = {};
        //     req.body.id && (params.id = req.body.id);
        //     req.body.product && (params.product = req.body.product);
        //     req.body.apkind && (params.apkind = req.body.apkind);
        //     req.body.tradeType && (params.tradeType = req.body.tradeType);
        //     req.body.custType && (params.custType = req.body.custType);
        //     req.body.branchCode && (params.branchCode = req.body.branchCode);
        //     req.body.channel && (params.channel = req.body.channel);
        //     req.body.bankNo && (params.bankNo = req.body.bankNo);
        //     req.body.remark && (params.remark = req.body.remark);
        //     req.body.subApkind && (params.subApkind = req.body.subApkind);
        //     req.body.quotaType && (params.quotaType = req.body.quotaType);
        //     req.body.startTime && (params.startTime = req.body.startTime);
        //     req.body.endTime && (params.endTime = req.body.endTime);
        //     req.body.maxQuota && (params.maxQuota = req.body.maxQuota);
        //     req.body.minQuota && (params.minQuota = req.body.minQuota);
        //     req.body.accoType && (params.accoType = req.body.accoType);
        //     req.body.operator && (params.operator = req.body.operator);
        //
        //     params = JSON.stringify(params)
        //     let reviewerTime = req.body.reviewerTime//复核时间
        //     console.log("*****",updateTime)
        //     var sql = `UPDATE bm_bpc_quota SET reviewer=?,review_time=?,remark='${req.body.revise_remark}',status='9',delete_flag='F' where local_id=${req.body.mySQLId} AND update_timestamp='${updateTime}'`;
        //     console.log('/businessMgmt/businessParamConfig/quotaReview/reviewReject.ajax sql:', sql);
        //     console.log('/businessMgmt/businessParamConfig/quotaReview/reviewReject.ajax params:', params);
        //     pool.query(sql, [params, reviewer, reviewerTime], function (error, results, fields) {
        //         console.log('/businessMgmt/businessParamConfig/quotaReview/reviewReject.ajax error:', error);
        //         console.log('/businessMgmt/businessParamConfig/quotaReview/reviewReject.ajax results:', results);
        //         console.log('/businessMgmt/businessParamConfig/quotaReview/reviewReject.ajax fields:', fields);
        //         if (error) {
        //             return res.send({error: 1, msg: '复核驳回失败'});
        //         }
        //         return res.send({error: 0, msg: '复核驳回成功', data: results});
        //     });
        // }
    });

    // 获取交易类型下拉数据
    app.post('/businessMgmt/businessParamConfig/quotaReview/tradeTypeList.ajax', (req, res, next) => {
        let params = {};
        req.body.pmst && (params.pmst = req.body.pmst);
        req.body.pmkey && (params.pmkey = req.body.pmkey);
        let option = {
            pageUrl: '/businessMgmt/businessParamConfig/quotaReview/tradeTypeList.ajax',
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
    app.post('/businessMgmt/businessParamConfig/quotaReview/channelTypeList.ajax', (req, res, next) => {
        let params = {};
        req.body.pmst && (params.pmst = req.body.pmst);
        req.body.pmkey && (params.pmkey = req.body.pmkey);
        let option = {
            pageUrl: '/businessMgmt/businessParamConfig/quotaReview/channelTypeList.ajax',
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
    app.post('/businessMgmt/businessParamConfig/quotaReview/fundList.ajax', (req, res, next) => {

        // 获取产品列表
        let fundList = new Promise(resolve => {
            let option = {
                pageUrl: '/businessMgmt/businessParamConfig/quotaReview/fundList.ajax --fundList',
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
                pageUrl: '/businessMgmt/businessParamConfig/quotaReview/fundList.ajax --groupList',
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