const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').pauseTradeMgmt.pauseTradeReview;
const tableName = 'bm_ptm_pause';

module.exports = function (app) {
    // //查询服务列表数据
    app.post('/businessMgmt/pauseTradeMgmt/pauseTradeReview/getTableData.ajax', (req, res, next) => {
        let paramsStatus = {};
        let params= {};
        paramsStatus.type = req.body.type;
        params.fundId=req.body.fundId;
        let reviewStatus = req.body.reviewStatus; //复核状态值
        console.log("==",params)
        // 查询本地数据库
        if (paramsStatus.type == "1") {
            let sql = `SELECT content,local_id,status,delete_flag,operate,operator,creator,reviewer,review_time,update_timestamp,remark FROM ${tableName} WHERE delete_flag='F' AND status!=1`;
            if (req.body.reviewStatus) {
                sql += ` AND status='${req.body.reviewStatus}'`;
            }
            if (req.body.startdate) {
                sql += ` AND JSON_EXTRACT(content, '$.startdate')>='${req.body.startdate}'`;
            }
            if (req.body.fundid) {
                sql += ` AND JSON_EXTRACT(content, '$.fundid')='${req.body.fundid}'`;
            }
            sql += ' ORDER BY update_timestamp DESC';
            console.log('/businessMgmt/pauseTradeMgmt/pauseTradeReview/getTableData.ajax sql:', sql);
            pool.getConnection((err, connection) => {
                if (err) {
                    return res.send({
                        error: 1,
                        msg: '链接本地数据库失败',
                        data: null
                    });
                }
                connection.query(sql, function (error, results, fields) {
                    console.log('/businessMgmt/pauseTradeMgmt/pauseTradeReview/getTableData.ajax error:', error);
                    console.log('/businessMgmt/pauseTradeMgmt/pauseTradeReview/getTableData.ajax results:', results);
                    console.log('/businessMgmt/pauseTradeMgmt/pauseTradeReview/getTableData.ajax fields:', fields);
                    if (error) {
                        return res.send({
                            error: 1,
                            msg: '操作失败'
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
                    return res.send({
                        error: 0,
                        msg: '获取成功',
                        data: middleArr
                    });
                });
                connection.release();
            });
        }
        // 查询业务数据
        if (paramsStatus.type == "0") {
            console.log(paramsStatus.type)
            // 查询后端业务数据
            let option = {
                pageUrl: '/businessMgmt/pauseTradeMgmt/pauseTradeReview/getTableData.ajax',
                req,
                url: apiUrlList.getTableData,
                qs: params,
                timeout: 15000,
                json: true
            };
            request.get(option, (error, response, body) => {
                if (error) {
                    return res.send({
                        error: 1,
                        msg: '查询失败'
                    });
                }
                let result = typeof body === 'string' ? JSON.parse(body) : body;
                if (result && result.returnCode == '0') {
                    let resultData = {};
                    resultData.tableData = result.body
                    return res.send({
                        error: 0,
                        msg: '查询成功',
                        data: resultData
                    });
                } else if (result && result.returnCode != 9999) {
                    return res.send({
                        error: 1,
                        msg:result.returnMsg
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

    //Mysql和业务接口复核通过执行更新和删除数据;
    app.post('/businessMgmt/pauseTradeMgmt/pauseTradeReview/reviewPass.ajax', (req, res, next) => {
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
            console.log('/businessMgmt/pauseTradeMgmt/pauseTradeReview/reviewPass.ajax run check SQL: ', SQL);
            pool.getConnection((err, connection) => {
                if (err) {
                    return res.send({
                        error: 1,
                        msg: '链接本地数据库失败',
                        data: null
                    });
                }
                connection.query(SQL, function (error, results) {
                    console.log('/businessMgmt/pauseTradeMgmt/pauseTradeReview/reviewPass.ajax run check SQL error: ', error);
                    console.log('/businessMgmt/pauseTradeMgmt/pauseTradeReview/reviewPass.ajax run check SQL results: ', results);
                    if (error) {
                        reject({
                            message: '检查该条数据是否已被审核SQL语句失败'
                        });
                    }
                    resolve(Array.from(results).length);
                });
                connection.release();
            });
        });

        // 操作服务端数据
        let operateService = function (item) {
            let params = {};
            params.id = req.body.id;

            params.serialno = req.body.serialno;
            params.fundid = req.body.fundid;
            params.detailtype = req.body.detailtype;
            params.accptmd =req.body.accptmd;
            params.status=req.body.status;
            params.stoptype=req.body.stoptype;
            params.startdate =req.body.startdate;
            params.starttime =req.body.starttime;
            params.enddate =req.body.enddate;
            params.endtime = req.body.endtime;
            params.operator = req.body.operator;
            params.checker = req.session.loginInfo.userid

            let reviewers = req.session.loginInfo.userid //复核人
            let reviewerTime = req.body.reviewerTime //复核时间

            return new Promise((resolve, reject) => {
                if (operate == 2) {
                    let option = {
                        pageUrl: '/businessMgmt/pauseTradeMgmt/pauseTradeReview/reviewPass.ajax',
                        req,
                        operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
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
                    params.serialNo = req.body.serialno;
                    let option = {
                        pageUrl: '/businessMgmt/pauseTradeMgmt/pauseTradeReview/reviewPass.ajax',
                        req,
                        operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
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
                    console.log('/businessMgmt/pauseTradeMgmt/pauseTradeReview/reviewPass.ajax run business sql:', sql);
                    pool.getConnection((err, connection) => {
                        if (err) {
                            return res.send({
                                error: 1,
                                msg: '链接本地数据库失败',
                                data: null
                            });
                        }
                        connection.query(sql, function (error, results) {
                            console.log('/businessMgmt/pauseTradeMgmt/pauseTradeReview/reviewPass.ajax run business sql error:', error);
                            console.log('/businessMgmt/pauseTradeMgmt/pauseTradeReview/reviewPass.ajax run business sql results:', results);
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
    })
    //Mysql和业务接口复核通过执行保存数据;
    app.post('/businessMgmt/pauseTradeMgmt/pauseTradeReview/SavePass.ajax', (req, res, next) => {
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
            console.log('/businessMgmt/pauseTradeMgmt/pauseTradeReview/SavePass.ajax run check SQL: ', SQL);
            pool.getConnection((err, connection) => {
                if (err) {
                    return res.send({
                        error: 1,
                        msg: '链接本地数据库失败',
                        data: null
                    });
                }
                connection.query(SQL, function (error, results) {
                    console.log('/businessMgmt/pauseTradeMgmt/pauseTradeReview/SavePass.ajax run check SQL error: ', error);
                    console.log('/businessMgmt/pauseTradeMgmt/pauseTradeReview/SavePass.ajax run check SQL results: ', results);
                    if (error) {
                        reject({
                            message: '检查该条数据是否已被审核SQL语句失败'
                        });
                    }
                    resolve(Array.from(results).length);
                });
                connection.release();
            });
        });


        // 操作服务端数据
        let operateService = function (item) {
            let params = {};
            // var ArrList = []
            // params.id = req.body.id;
            params.fundid = req.body.fundid;
            params.detailtype = req.body.detailtype;
            params.accptmd =req.body.accptmd;
            params.status=req.body.status;
            params.stoptype=req.body.stoptype;
            params.startdate =req.body.startdate;
            params.starttime =req.body.starttime;
            params.enddate =req.body.enddate;
            params.endtime = req.body.endtime;

            // params.operator = req.body.operator;
            // params.checker = req.session.loginInfo.userid
            let reviewers = req.session.loginInfo.userid;
            let reviewerTime = req.body.reviewerTime //复核时间
            // ArrList.push(params)
            // 给空字符串添加 * 字符
            // for (let key in params) {
            //     if (params[key] === '') {
            //         params[key] = '*';
            //     }
            // }
            return new Promise((resolve, reject) => {
                if (operate == 1) {
                    let option = {
                        pageUrl: '/businessMgmt/pauseTradeMgmt/pauseTradeReview/SavePass.ajax',
                        req,
                        operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
                        url: apiUrlList.saveParam,
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
                    console.log('/businessMgmt/pauseTradeMgmt/pauseTradeReview/reviewPass.ajax run business sql:', sql);
                    pool.getConnection((err, connection) => {
                        if (err) {
                            return res.send({
                                error: 1,
                                msg: '链接本地数据库失败',
                                data: null
                            });
                        }
                        connection.query(sql, function (error, results) {
                            console.log('/businessMgmt/pauseTradeMgmt/pauseTradeReview/reviewPass.ajax run business sql error:', error);
                            console.log('/businessMgmt/pauseTradeMgmt/pauseTradeReview/reviewPass.ajax run business sql results:', results);
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
    });

    //Mysql审核驳回;
    app.post('/businessMgmt/pauseTradeMgmt/pauseTradeReview/reviewReject.ajax', (req, res, next) => {

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
            console.log('/businessMgmt/pauseTradeMgmt/pauseTradeReview/reviewReject.ajax run business SQL:', SQL);
            pool.getConnection((err, connection) => {
                if (err) {
                    return res.send({
                        error: 1,
                        msg: '链接本地数据库失败',
                        data: null
                    });
                }
                connection.query(SQL, function (error, results) {
                    console.log('/businessMgmt/pauseTradeMgmt/pauseTradeReview/reviewReject.ajax run business SQL error:', error);
                    console.log('/businessMgmt/pauseTradeMgmt/pauseTradeReview/reviewReject.ajax run business SQL results:', results);
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
    });

    // 获取  基金名称查询数据
    app.post('/businessMgmt/pauseTradeMgmt/pauseTradeReview/collection.ajax', (req, res, next) => {
        let userId = req.session.loginInfo.userid;
        let params = req.body;
        let option = {
            pageUrl: '/businessMgmt/pauseTradeMgmt/pauseTradeReview/collection.ajax',
            req,
            url: apiUrlList.collection,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '数据获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {
                result.body.userId = userId;
                res.send({
                    error: 0,
                    msg: '调用成功',
                    data: result.body
                });
            } else {
                res.send({
                    error: 1,
                    msg: '获取数据失败'
                });
            }
        });
    });

};