const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').combinationProductConfig.combinationProductReview;
const tableName = 'bm_cpc_combination';
const investTableName = 'uop_log_invest';

module.exports = function (app) {
    // //查询服务列表数据
    app.post('/businessMgmt/combinationProductConfig/combinationProductReview/getTableData.ajax', (req, res, next) => {
        let paramsStatus = {};
        paramsStatus.type = req.body.type;
        let reviewStatus = req.body.reviewStatus; //复核状态值
        // 查询本地数据库
        if (paramsStatus.type == "1") {
            let sql = `SELECT content,local_id,status,delete_flag,operate,operator,creator,reviewer,review_time,update_timestamp,remark FROM ${tableName} WHERE delete_flag='F' AND status!=1`;
            if (req.body.reviewStatus) {
                sql += ` AND status='${req.body.reviewStatus}'`;
            }
            if (req.body.groupid) {
                sql += ` AND JSON_EXTRACT(content, '$.groupid')='${req.body.groupid}'`;
            }
            if (req.body.fundgroupType) {
                sql += ` AND JSON_EXTRACT(content, '$.fundgroupType')='${req.body.fundgroupType}'`;
            }
            // sql += ` AND (JSON_EXTRACT(content, '$.fundgroupNewFundgroupDO.isInvestment')='N' OR JSON_EXTRACT(content, '$.dialogData.isInvestment')='N' OR JSON_EXTRACT(content, '$.dialogData') LIKE '%isInvestment\\\\\\\\":\\\\\\\\"N%')`;
            sql += ' ORDER BY update_timestamp DESC';
            console.log('/businessMgmt/combinationProductConfig/combinationProductReview/getTableData.ajax sql:', sql);
            pool.getConnection((err, connection) => {
                if (err) {
                    return res.send({
                        error: 1,
                        msg: '链接本地数据库失败',
                        data: null
                    });
                }
                connection.query(sql, function (error, results, fields) {
                    console.log('/businessMgmt/businessParamConfig/combinationProductReview/getTableData.ajax error:', error);
                    console.log('/businessMgmt/businessParamConfig/combinationProductReview/getTableData.ajax results:', results);
                    console.log('/businessMgmt/businessParamConfig/combinationProductReview/getTableData.ajax fields:', fields);
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
                        content.dialogData = typeof content.dialogData === 'string' ? JSON.parse(content.dialogData) : content.dialogData;
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
            let params = {}
            // params.groupId=req.body.groupId;
            params.groupId = req.body.groupId;
            // 查询后端业务数据
            let option = {
                pageUrl: '/businessMgmt/combinationProductConfig/combinationProductReview/getTableData.ajax',
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
                if (result && result.returnCode == '0' && Array.isArray(result.body)) {
                    let resultData = {};
                    // var ArrInfo=[]
                    // result.body.forEach((item) => {
                    //     ArrInfo.push(item.baseInfo)
                    // });
                    // resultData.tableData = ArrInfo;
                    // resultData.tableData = result.body.filter((item)=>{
                    //     return item.isInvestment=='N'
                    // });
                    resultData.tableData = result.body;
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

    //Mysql和业务接口复核通过执行更新和删除数据;---修改基本信息
    app.post('/businessMgmt/combinationProductConfig/combinationProductReview/reviewPass.ajax', (req, res, next) => {
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
            console.log('/businessMgmt/combinationProductConfig/combinationProductReview/reviewPass.ajax run check SQL: ', SQL);
            pool.getConnection((err, connection) => {
                if (err) {
                    return res.send({
                        error: 1,
                        msg: '链接本地数据库失败',
                        data: null
                    });
                }
                connection.query(SQL, function (error, results) {
                    console.log('/businessMgmt/combinationProductConfig/combinationProductReview/reviewPass.ajax run check SQL error: ', error);
                    console.log('/businessMgmt/combinationProductConfig/combinationProductReview/reviewPass.ajax run check SQL results: ', results);
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

            // params.serialno = req.body.serialno;

            // params.fundgroupChangeROList=JSON.parse(JSON.stringify(req.body.fundgroupChangeROList));
            // params.fundGroupGroupInfo = req.body.fundgroupNewFundgroupDO;
            // // 这一步把渠道多选的数据拆分出来
            // let fundgroupSubdatetimeRO = req.body.fundgroupSubdatetimeRO;
            // let acceptModeList = fundgroupSubdatetimeRO.acceptMode?fundgroupSubdatetimeRO.acceptMode.split(','):[];
            // let fundgroupSubdatetimeROList = [];
            // if(acceptModeList.length>0){
            //     acceptModeList.forEach((item)=>{
            //         let cloneFundgroupSubdatetimeRO = JSON.parse(JSON.stringify(fundgroupSubdatetimeRO));
            //         cloneFundgroupSubdatetimeRO.acceptMode = item;
            //         fundgroupSubdatetimeROList.push(cloneFundgroupSubdatetimeRO);
            //     });
            //     params.fundgroupSubdatetimeROList = fundgroupSubdatetimeROList;
            // }else{
            //     params.fundgroupSubdatetimeROList = [fundgroupSubdatetimeRO];
            // }

            params.operator = req.body.operator;
            params.checker = req.session.loginInfo.userid
            let reviewers = req.session.loginInfo.userid //复核人
            let reviewerTime = req.body.reviewerTime //复核时间

            return new Promise((resolve, reject) => {
                if (operate == 2) {
                    let option = {
                        pageUrl: '/businessMgmt/combinationProductConfig/combinationProductReview/reviewPass.ajax',
                        req,
                        operateType:2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
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
                    req.body.serialno && (params.serialno = req.body.serialno);
                    let option = {
                        pageUrl: '/businessMgmt/combinationProductConfig/combinationProductReview/reviewPass.ajax',
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
                    console.log('/businessMgmt/combinationProductConfig/combinationProductReview/reviewPass.ajax run business sql:', sql);
                    pool.getConnection((err, connection) => {
                        if (err) {
                            return res.send({
                                error: 1,
                                msg: '链接本地数据库失败',
                                data: null
                            });
                        }
                        connection.query(sql, function (error, results) {
                            console.log('/businessMgmt/combinationProductConfig/combinationProductReview/reviewPass.ajax run business sql error:', error);
                            console.log('/businessMgmt/combinationProductConfig/combinationProductReview/reviewPass.ajax run business sql results:', results);
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

    //Mysql和业务接口复核通过执行更新---修改调仓说明和是否显示
    app.post('/businessMgmt/combinationProductConfig/combinationProductReview/reviewPass1.ajax', (req, res, next) => {
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
            console.log('/businessMgmt/combinationProductConfig/combinationProductReview/reviewPass1.ajax run check SQL: ', SQL);
            pool.getConnection((err, connection) => {
                if (err) {
                    return res.send({
                        error: 1,
                        msg: '链接本地数据库失败',
                        data: null
                    });
                }
                connection.query(SQL, function (error, results) {
                    console.log('/businessMgmt/combinationProductConfig/combinationProductReview/reviewPass1.ajax run check SQL error: ', error);
                    console.log('/businessMgmt/combinationProductConfig/combinationProductReview/reviewPass1.ajax run check SQL results: ', results);
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

            params.groupid = req.body.groupid; //组合Id  A+四位数字
            params.serialno = req.body.serialno;
            params.changeAdvise = req.body.changeAdvise;
            params.isDisplay = req.body.isDisplay;

            params.operator = req.body.operator;
            params.checker = req.session.loginInfo.userid
            let reviewers = req.session.loginInfo.userid //复核人
            let reviewerTime = req.body.reviewerTime //复核时间

            return new Promise((resolve, reject) => {
                if (operate == 2) {
                    let option = {
                        pageUrl: '/businessMgmt/combinationProductConfig/combinationProductReview/reviewPass1.ajax',
                        req,
                        operateType:2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
                        url: apiUrlList.advise,
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
                    req.body.serialno && (params.serialno = req.body.serialno);
                    let option = {
                        pageUrl: '/businessMgmt/combinationProductConfig/combinationProductReview/reviewPass1.ajax',
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
                    console.log('/businessMgmt/combinationProductConfig/combinationProductReview/reviewPass1.ajax run business sql:', sql);
                    pool.getConnection((err, connection) => {
                        if (err) {
                            return res.send({
                                error: 1,
                                msg: '链接本地数据库失败',
                                data: null
                            });
                        }
                        connection.query(sql, function (error, results) {
                            console.log('/businessMgmt/combinationProductConfig/combinationProductReview/reviewPass1.ajax run business sql error:', error);
                            console.log('/businessMgmt/combinationProductConfig/combinationProductReview/reviewPass1.ajax run business sql results:', results);
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

    //Mysql和业务接口复核通过执行更新---在修改里面新加入调仓
    app.post('/businessMgmt/combinationProductConfig/combinationProductReview/reviewPass2.ajax', (req, res, next) => {
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
            console.log('/businessMgmt/combinationProductConfig/combinationProductReview/reviewPass.ajax run check SQL: ', SQL);
            pool.getConnection((err, connection) => {
                if (err) {
                    return res.send({
                        error: 1,
                        msg: '链接本地数据库失败',
                        data: null
                    });
                }
                connection.query(SQL, function (error, results) {
                    console.log('/businessMgmt/combinationProductConfig/combinationProductReview/reviewPass.ajax run check SQL error: ', error);
                    console.log('/businessMgmt/combinationProductConfig/combinationProductReview/reviewPass.ajax run check SQL results: ', results);
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

            // params.serialno = req.body.serialno;
            // params.fundgroupChangeROList=JSON.parse(JSON.stringify(req.body.fundgroupChangeROList));
            // params.fundgroupNewFundgroupDO=req.body.fundgroupNewFundgroupDO;
            // params.fundgroupSubdatetimeRO=req.body.fundgroupSubdatetimeRO;
            params.fundgroupChangeDO = item.fundgroupChangeDO;
            params.fundgroupChangeDetailList = item.fundgroupChangeDetailList;

            params.operator = req.body.operator;
            params.checker = req.session.loginInfo.userid
            let reviewers = req.session.loginInfo.userid //复核人
            let reviewerTime = req.body.reviewerTime //复核时间

            return new Promise((resolve, reject) => {
                if (operate == 2) {
                    let option = {
                        pageUrl: '/businessMgmt/combinationProductConfig/combinationProductReview/reviewPass2.ajax',
                        req,
                        operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
                        url: apiUrlList.addHouse,
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
                    req.body.serialno && (params.serialno = req.body.serialno);
                    let option = {
                        pageUrl: '/businessMgmt/combinationProductConfig/combinationProductReview/reviewPass2.ajax',
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
                    console.log('/businessMgmt/combinationProductConfig/combinationProductReview/reviewPass2.ajax run business sql:', sql);
                    pool.getConnection((err, connection) => {
                        if (err) {
                            return res.send({
                                error: 1,
                                msg: '链接本地数据库失败',
                                data: null
                            });
                        }
                        connection.query(sql, function (error, results) {
                            console.log('/businessMgmt/combinationProductConfig/combinationProductReview/reviewPass2.ajax run business sql error:', error);
                            console.log('/businessMgmt/combinationProductConfig/combinationProductReview/reviewPass2.ajax run business sql results:', results);
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
    app.post('/businessMgmt/combinationProductConfig/combinationProductReview/SavePass.ajax', (req, res, next) => {
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
            console.log('/businessMgmt/combinationProductConfig/combinationProductReview/SavePass.ajax run check SQL: ', SQL);
            pool.getConnection((err, connection) => {
                if (err) {
                    return res.send({
                        error: 1,
                        msg: '链接本地数据库失败',
                        data: null
                    });
                }
                connection.query(SQL, function (error, results) {
                    console.log('/businessMgmt/combinationProductConfig/combinationProductReview/SavePass.ajax run check SQL error: ', error);
                    console.log('/businessMgmt/combinationProductConfig/combinationProductReview/SavePass.ajax run check SQL results: ', results);
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
            var ArrList = []
            // params.id = req.body.id;

            // params.fundgroupType = req.body.fundgroupType;
            // params.groupname = req.body.groupname;
            // params.groupid = req.body.groupid;
            // params.fundgroupDesc = req.body.fundgroupDesc;
            // params.fundgroupAdvise = req.body.fundgroupAdvise;
            // params.proPageurl = req.body.proPageurl;
            // params.normalPageurl = req.body.normalPageurl;
            // params.stopStatus = req.body.stopStatus;
            // params.ageRange = req.body.ageRange;      //年龄段
            // params.sofarYield = req.body.sofarYield;    //收益率
            // params.branchCode = req.body.branchCode;       //网点
            // params.acceptMode = req.body.acceptMode;       //渠道
            // params.cooPreationMode = req.body.cooPreationMode; //合作模式;
            // params.onlinedate = req.body.onlinedate;
            // params.stopStartTime = req.body.stopStartTime;
            // params.stopEndTime = req.body.stopEndTime;

            params.fundgroupChangeROList = JSON.parse(JSON.stringify(req.body.fundgroupChangeROList));
            params.fundGroupGroupInfo = req.body.fundgroupNewFundgroupDO;
            // 20210906 传递fundgroupNewFundgroupDO改为fundGroupGroupInfo，stringEstablishDate改为establishDate S
            params.fundGroupGroupInfo.establishDate = req.body.fundgroupNewFundgroupDO.stringEstablishDate;
            // 20210906 传递fundgroupNewFundgroupDO改为fundGroupGroupInfo，stringEstablishDate改为establishDate E
            // params.fundgroupSubdatetimeRO = req.body.fundgroupSubdatetimeRO;
            // 这一步把渠道多选的数据拆分出来
            // let fundgroupSubdatetimeRO = req.body.fundgroupSubdatetimeRO;
            // let acceptModeList = fundgroupSubdatetimeRO.acceptMode?fundgroupSubdatetimeRO.acceptMode.split(','):[];
            // let fundgroupSubdatetimeROList = [];
            // if(acceptModeList.length>0){
            //     acceptModeList.forEach((item)=>{
            //         let cloneFundgroupSubdatetimeRO = JSON.parse(JSON.stringify(fundgroupSubdatetimeRO));
            //         cloneFundgroupSubdatetimeRO.acceptMode = item;
            //         fundgroupSubdatetimeROList.push(cloneFundgroupSubdatetimeRO);
            //     });
            //     params.fundgroupSubdatetimeROList = fundgroupSubdatetimeROList;
            // }else{
            //     params.fundgroupSubdatetimeROList = [fundgroupSubdatetimeRO];
            // }

            params.fundgroupChangeROList.forEach(roListItem => {
                let fundgroupNewChFundgroupFundBackupDOList = [];
                roListItem.fundgroupChangeDetailList.forEach(fundItem => {
                    fundgroupNewChFundgroupFundBackupDOList = fundgroupNewChFundgroupFundBackupDOList.concat(fundItem.optionalFundList ? fundItem.optionalFundList.map(item => {
                        return {
                            fundid: fundItem.fundid,
                            groupid: fundItem.groupid,
                            backupFundid: item.fundId,
                            priority: item.priority
                        };
                    }) : []);
                });
                roListItem.fundgroupNewChFundgroupFundBackupDOList = fundgroupNewChFundgroupFundBackupDOList;
            });
            params.fundgroupNewFundgroupFundBackupDOList = [];
            params.fundgroupChangeROList.forEach(roListItem => {
                params.fundgroupNewFundgroupFundBackupDOList = params.fundgroupNewFundgroupFundBackupDOList.concat(roListItem.fundgroupNewChFundgroupFundBackupDOList);
            });
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
                        pageUrl: '/businessMgmt/combinationProductConfig/combinationProductReview/SavePass.ajax',
                        req,
                        operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
                        url: apiUrlList.saveParam,
                        body: params,
                        timeout: 15000,
                        json: true
                    };
                    request.post(option, (error, response, body) => {
                        if(params.fundGroupGroupInfo.isInvestment === 'Y'){
                            sysLogger(option.operateType, req, option, body, investTableName);
                        }
                        if (error) {
                            reject({
                                message: '调用服务端数据失败'
                            });
                        }
                        if (body && body.returnCode == 0 && body.body == true) {
                            resolve();
                        } else if (body.returnCode != 0 && body.returnCode != 9999) {
                            reject({
                                message: body.returnMsg
                            });
                        } else {
                            console.log(body.returnCode,'-------------');
                            reject({
                                message: '组合创建失败,请核查组合信息！'
                            });
                        }
                    })
                }
            }).then(function () {
                return new Promise((resolve, reject) => {
                    let calc_status = false
                    // let sql = `UPDATE ${tableName} SET status=0,reviewer='${reviewers}',review_time='${reviewerTime}' WHERE local_id=${mysqlId}`;
                    let sql = `UPDATE ${tableName} SET content= json_set(content,"$.calc_status","false"),reviewer='${reviewers}',review_time='${reviewerTime}' WHERE local_id=${mysqlId}`;
                    console.log('/businessMgmt/combinationProductConfig/combinationProductReview/reviewPass.ajax run business sql:', sql);
                    pool.getConnection((err, connection) => {
                        if (err) {
                            return res.send({
                                error: 1,
                                msg: '链接本地数据库失败',
                                data: null
                            });
                        }
                        connection.query(sql, function (error, results) {
                            console.log('/businessMgmt/combinationProductConfig/combinationProductReview/reviewPass.ajax run business sql error:', error);
                            console.log('/businessMgmt/combinationProductConfig/combinationProductReview/reviewPass.ajax run business sql results:', results);
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
                    msg: '计算净值初始化中...',
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

    //Mysql和业务接口复核通过执行保存数据要计算净值;
    app.post('/businessMgmt/combinationProductConfig/combinationProductReview/calcParams.ajax', (req, res, next) => {
        //Mysql复核通过
        var mysqlId = req.body.myqsql //获取传过来数据库表字段的id
        var updateTime = req.body.updateTime //修改时间
        var operate = req.body.operate //操作状态

        let params = {}
        params.groupIdList = req.body.groupid;
        // let params = {};
        let option = {
            pageUrl: '/businessMgmt/combinationProductConfig/combinationProductReview/calcParams.ajax',
            req,
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.calcParams,
            qs: params,
            timeout: 15000,
            json: true
        };
        request.get(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '操作失败'
                });
            }

            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0' && Array.isArray(result.body)) {
                if (result.body[0].status == true) {
                    // let sql = `UPDATE ${tableName} SET status=0,reviewer='${reviewers}',review_time='${reviewerTime}' WHERE local_id=${mysqlId}`;
                    let sql = `UPDATE ${tableName} SET status=0 WHERE local_id=${mysqlId}`;
                    console.log('/businessMgmt/combinationProductConfig/combinationProductReview/calcParams.ajax run business sql:', sql);
                    pool.getConnection((err, connection) => {
                        if (err) {
                            return res.send({
                                error: 1,
                                msg: '链接本地数据库失败',
                                data: null
                            });
                        }
                        connection.query(sql, function (error, results) {
                            console.log('/businessMgmt/combinationProductConfig/combinationProductReview/calcParams.ajax run business sql error:', error);
                            console.log('/businessMgmt/combinationProductConfig/combinationProductReview/calcParams.ajax run business sql results:', results);
                            if (error) {
                                return res.send({
                                    error: 1,
                                    msg: '操作本地数据库出错，请核对校验本地数据'
                                });
                            } else {
                                res.send({
                                    error: 0,
                                    msg: '复核成功',
                                    data: null
                                });
                            }
                        });
                        connection.release();
                    });
                } else {
                    return res.send({
                        error: 1,
                        msg: '净值计算中,请等待...'
                    });
                }
            } else if (body.returnCode != 0 && body.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: '操作失败'
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '调用失败'
                });
            }
        })
    })

    //Mysql审核驳回;
    app.post('/businessMgmt/combinationProductConfig/combinationProductReview/reviewReject.ajax', (req, res, next) => {
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
            console.log('/businessMgmt/combinationProductConfig/combinationProductReview/reviewReject.ajax run business SQL:', SQL);
            pool.getConnection((err, connection) => {
                if (err) {
                    return res.send({
                        error: 1,
                        msg: '链接本地数据库失败',
                        data: null
                    });
                }
                connection.query(SQL, function (error, results) {
                    console.log('/businessMgmt/combinationProductConfig/combinationProductReview/reviewReject.ajax run business SQL error:', error);
                    console.log('/businessMgmt/combinationProductConfig/combinationProductReview/reviewReject.ajax run business SQL results:', results);
                    if (error) {
                        return res.send({
                            error: 1,
                            msg: error.message,
                            data: null
                        });
                    }
                    if (results.affectedRows) {
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

    // 验证查询所有组合设定规则
    app.post('/businessMgmt/combinationProductConfig/combinationProductReview/testDate.ajax', (req, res, next) => {
        let params = {}
        params.groupid = req.body.groupid;
        params.actionType = req.body.actionType;
        params.date = req.body.date;
        params.time = req.body.time;
        let option = {
            pageUrl: '/businessMgmt/combinationProductConfig/combinationProductReview/testDate.ajax',
            req,
            url: apiUrlList.testDate,
            qs: params,
            timeout: 15000,
            json: true
        };
        request.get(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '调用失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {
                let resultData = {};
                resultData.tableData = result.body
                return res.send({
                    error: 0,
                    msg: '调用成功',
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
                    msg: '调用失败'
                });
            }
        });
    });

    // 获取所有组合
    app.post('/businessMgmt/combinationProductConfig/combinationProductReview/fundGroups.ajax', (req, res, next) => {
        let params = {}
        params.groupId = "ALL";
        let option = {
            pageUrl: '/businessMgmt/combinationProductConfig/combinationProductReview/fundGroups.ajax',
            req,
            url: apiUrlList.fundGroups,
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
    // 验证调仓的基金是否处于分红周期（前后7天）
    app.post('/businessMgmt/combinationProductConfig/combinationProductReview/checkFund.ajax', (req, res, next) => {
        // let params = {}
        let fundgroupChangeROList = JSON.parse(req.body.fundgroupChangeROList);
        let option = {
            pageUrl: '/businessMgmt/combinationProductConfig/combinationProductReview/checkFund.ajax',
            req,
            url: apiUrlList.checkFund,
            body: fundgroupChangeROList,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '调用失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {
                return res.send({
                    error: 0,
                    msg: '调用成功',
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
                    msg: '调用失败'
                });
            }
        });
    });

    // 获取组合类型下拉数据
    app.post('/businessMgmt/combinationProductConfig/combinationProductReview/fundGroupType.ajax', (req, res, next) => {
        let params = {};
        params.pmst = req.body.pmst;
        params.pmkey = req.body.pmkey;
        let option = {
            pageUrl: '/businessMgmt/combinationProductConfig/combinationProductReview/fundGroupType.ajax',
            req,
            url: apiUrlList.fundGroupType,
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
						result.body = result.body.filter((item)=>{
							return (item.pmco!=='13'&&item.pmco!=='14'&&item.pmco!=='15'&&item.pmco!=='16'&&item.pmco!=='17')
						})
            if (result.returnCode == 0) {
                return res.send({
                    error: 0,
                    msg: '获取成功',
                    data: result
                });

                // result.body = result.body.filter(item => item.pmv1 !== 'A' && item.pmv1 !== 'C');
                // return res.send({error: 0, msg: '获取网点号成功', data: result});

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

    //获取年临段
    app.post('/businessMgmt/combinationProductConfig/combinationProductReview/ageRangeList.ajax', (req, res, next) => {
        let params = {};
        params.pmst = req.body.pmst;
        params.pmkey = req.body.pmkey;
        let option = {
            pageUrl: '/businessMgmt/combinationProductConfig/combinationProductReview/ageRangeList.ajax',
            req,
            url: apiUrlList.ageRangeList,
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

                // result.body = result.body.filter(item => item.pmv1 !== 'A' && item.pmv1 !== 'C');
                // return res.send({error: 0, msg: '获取网点号成功', data: result});

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
    // 获取风险类型
    app.post('/businessMgmt/combinationProductConfig/combinationProductReview/grouptypeList.ajax', (req, res, next) => {
        let params = {};
        params.pmst = req.body.pmst;
        params.pmkey = req.body.pmkey;
        let option = {
            pageUrl: '/businessMgmt/combinationProductConfig/combinationProductReview/grouptypeList.ajax',
            req,
            url: apiUrlList.grouptypeList,
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

                // result.body = result.body.filter(item => item.pmv1 !== 'A' && item.pmv1 !== 'C');
                // return res.send({error: 0, msg: '获取网点号成功', data: result});

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
    // 获取风险等级
    app.post('/businessMgmt/combinationProductConfig/combinationProductReview/risklevelList.ajax', (req, res, next) => {
        let params = {};
        params.pmst = req.body.pmst;
        params.pmkey = req.body.pmkey;
        let option = {
            pageUrl: '/businessMgmt/combinationProductConfig/combinationProductReview/risklevelList.ajax',
            req,
            url: apiUrlList.risklevelList,
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

                // result.body = result.body.filter(item => item.pmv1 !== 'A' && item.pmv1 !== 'C');
                // return res.send({error: 0, msg: '获取网点号成功', data: result});

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
    // 获取网点类型下拉数据
    app.post('/businessMgmt/combinationProductConfig/combinationProductReview/branchCodeList.ajax', (req, res, next) => {
        let params = {};
        params.pmst = req.body.pmst;
        params.pmkey = req.body.pmkey;
        let option = {
            pageUrl: '/businessMgmt/combinationProductConfig/combinationProductReview/branchCodeList.ajax',
            req,
            url: apiUrlList.branchCodeList,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '操作网点号失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0) {
                return res.send({
                    error: 0,
                    msg: '获取成功',
                    data: result
                });

                // result.body = result.body.filter(item => item.pmv1 !== 'A' && item.pmv1 !== 'C');
                // return res.send({error: 0, msg: '获取网点号成功', data: result});

            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '获取网点号失败'
                });
            }
        });

    });

    // 获取业务详情
    app.post('/businessMgmt/combinationProductConfig/combinationProductReview/details.ajax', (req, res, next) => {
        let params = {};
        params.groupId = req.body.groupId;
        let option = {
            pageUrl: '/businessMgmt/combinationProductConfig/combinationProductReview/details.ajax',
            req,
            url: apiUrlList.details,
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
            if (result && result.returnCode == '0' && Array.isArray(result.body)) {
                // let resultData = {};
                // var tableData=[]
                // result.body.forEach((item) => {
                //     tableData=item.detailList
                // });
                // resultData.tableData =result.body.detailList;
                // var tableData=result.body.detailList;
                return res.send({
                    error: 0,
                    msg: '查询成功',
                    data: result.body
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

    });
    // 获取本地全量修改弹窗所需列表数据
    app.post('/businessMgmt/combinationProductConfig/combinationProductReview/getLocalDialogListData.ajax', (req, res, next) => {
        // 获取组合类型列表
        function queryFundGroupTypeList(){
            return new Promise((resolve, reject) => {
                let option = {
                    pageUrl: '/businessMgmt/combinationProductConfig/combinationProductReview/getLocalDialogListData.ajax ----queryFundGroupTypeList',
                    req,
                    url: apiUrlList.fundGroupType,
                    qs: {
                        pmst: 'SYSTEM',
                        pmkey: 'FUNDGROUP_TYPE'
                    },
                    timeout: 15000,
                    json: true
                };
                request(option, (error, response, body) => {
                    if (error) {
                        return reject({message: '获取组合类型列表失败'});
                    }
                    if (body.returnCode === 0) {
                        return resolve(body.body.map(item => {
                            return {
                                pmco: item.pmco,
                                pmnm: item.pmnm,
                            };
                        }));
                    } else if (body && body.returnCode !== 9999) {
                        return reject({message: body.returnMsg});
                    } else {
                        return reject({message: '获取组合类型列表失败'});
                    }
                });
            });
        }
        // 获取风险类型列表
        function queryRiskTypeList(){
            return new Promise((resolve, reject) => {
                let option = {
                    pageUrl: '/businessMgmt/combinationProductConfig/combinationProductReview/getLocalDialogListData.ajax ----queryRiskTypeList',
                    req,
                    url: apiUrlList.fundGroupType,
                    qs: {
                        pmst: 'SYSTEM',
                        pmkey: 'GROUPRISKTYPE'
                    },
                    timeout: 15000,
                    json: true
                };
                request(option, (error, response, body) => {
                    if (error) {
                        return reject({message: '获取组合类型列表失败'});
                    }
                    if (body.returnCode === 0) {
                        return resolve(body.body.map(item => {
                            return {
                                pmco: item.pmco,
                                pmnm: item.pmnm,
                            };
                        }));
                    } else if (body && body.returnCode !== 9999) {
                        return reject({message: body.returnMsg});
                    } else {
                        return reject({message: '获取组合类型列表失败'});
                    }
                });
            });
        }
        // 获取风险等级列表
        function queryRiskLevelList(){
            return new Promise((resolve, reject) => {
                let option = {
                    pageUrl: '/businessMgmt/combinationProductConfig/combinationProductReview/getLocalDialogListData.ajax ----queryRiskLevelList',
                    req,
                    url: apiUrlList.fundGroupType,
                    qs: {
                        pmst: 'SYSTEM',
                        pmkey: 'GROUPRISKLEVEL'
                    },
                    timeout: 15000,
                    json: true
                };
                request(option, (error, response, body) => {
                    if (error) {
                        return reject({message: '获取组合类型列表失败'});
                    }
                    if (body.returnCode === 0) {
                        return resolve(body.body.map(item => {
                            return {
                                pmco: item.pmco,
                                pmnm: item.pmnm,
                            };
                        }));
                    } else if (body && body.returnCode !== 9999) {
                        return reject({message: body.returnMsg});
                    } else {
                        return reject({message: '获取组合类型列表失败'});
                    }
                });
            });
        }
        // 获取养老组合年龄段列表
        function queryAgeRangeList(){
            return new Promise((resolve, reject) => {
                let option = {
                    pageUrl: '/businessMgmt/combinationProductConfig/combinationProductReview/getLocalDialogListData.ajax ----queryAgeRangeList',
                    req,
                    url: apiUrlList.fundGroupType,
                    qs: {
                        pmst: 'SYSTEM',
                        pmkey: 'GROUP_AGERANGE'
                    },
                    timeout: 15000,
                    json: true
                };
                request(option, (error, response, body) => {
                    if (error) {
                        return reject({message: '获取养老组合年龄段列表失败'});
                    }
                    if (body.returnCode === 0) {
                        return resolve(body.body.map(item => {
                            return {
                                pmco: item.pmco,
                                pmnm: item.pmnm,
                            };
                        }));
                    } else if (body && body.returnCode !== 9999) {
                        return reject({message: body.returnMsg});
                    } else {
                        return reject({message: '获取养老组合年龄段失败'});
                    }
                });
            });
        }
        // 获取网点号列表
        function queryBranchCodeList(){
            return new Promise((resolve, reject) => {
                let option = {
                    pageUrl: '/businessMgmt/combinationProductConfig/combinationProductReview/getLocalDialogListData.ajax ----queryBranchCodeList',
                    req,
                    url: apiUrlList.fundGroupType,
                    qs: {
                        pmst: 'SYSTEM',
                        pmkey: 'BRANCHCODE'
                    },
                    timeout: 15000,
                    json: true
                };
                request(option, (error, response, body) => {
                    if (error) {
                        return reject({message: '获取网点号列表失败'});
                    }
                    if (body.returnCode === 0) {
                        return resolve(body.body.filter(item => item.pmv1 !== 'A' && item.pmv1 !== 'C').map(item => {
                            return {
                                pmco: item.pmco,
                                pmnm: item.pmnm,
                            };
                        }));
                    } else if (body && body.returnCode !== 9999) {
                        return reject({message: body.returnMsg});
                    } else {
                        return reject({message: '获取网点号列表失败'});
                    }
                });
            });
        }

        let finalRequestArr = [];
        finalRequestArr.push(queryFundGroupTypeList());
        finalRequestArr.push(queryRiskTypeList());
        finalRequestArr.push(queryRiskLevelList());
        finalRequestArr.push(queryAgeRangeList());
        finalRequestArr.push(queryBranchCodeList());

        Promise.all(finalRequestArr).then(resultArr => {
            let resultObject = {};
            resultObject.fundGroupTypeList = resultArr[0];
            resultObject.riskTypeList = resultArr[1];
            resultObject.riskLevelList = resultArr[2];
            resultObject.ageRangeList = resultArr[3];
            resultObject.branchCodeList = resultArr[4];
            res.send({error: 0, msg: 'success', data: resultObject});
        }).catch(error => {
            res.send({error: 1, msg: error.message, data: null});
        });
    });
    // 本地数据复核通过
    app.post('/businessMgmt/combinationProductConfig/combinationProductReview/allUpdateReviewPass.ajax', (req, res, next) => {
        let reqBody = JSON.parse(req.body.params);
        if ((reqBody.operator === req.session.loginInfo.userid) && !req.session.loginInfo.isAdmin) {
            return res.send({
                error: 1,
                msg: '禁止复核自己提交的申请',
                data: null
            });
        }
        let baseInfoUpdate = new Promise((resolve,reject) => {
            let params = {};
            params.fundgroupChangeROList = [
                {
                    fundgroupChangeDO: {
                        ageRange: reqBody.dialogData.fundGroupType === '02' ? reqBody.dialogData.ageRange : '',
                        commro: reqBody.dialogData.commro,
                        fundgroupAdvise: reqBody.dialogData.fundGroupAdvise,
                        recommendReason: reqBody.dialogData.recommendReason,
                        recommendHoldTime: reqBody.dialogData.recommendHoldTime,
                        fundgroupDesc: reqBody.dialogData.fundGroupDesc,
                        fundgroupType: reqBody.dialogData.fundGroupType,
                        groupid: reqBody.dialogData.groupId,
                        groupname: reqBody.dialogData.groupName,
                        grouptype: reqBody.dialogData.riskType,
                        initamount: reqBody.dialogData.initAmount,
                        minChangeAmount: reqBody.dialogData.minChangeAmount,
                        minRedeemAmount: reqBody.dialogData.minRedeemAmount,
                        minReserveAmount: reqBody.dialogData.minReserveAmount,
                        proPageurl: reqBody.dialogData.normalPageUrl,
                        risklevel: reqBody.dialogData.riskLevel,
                        strChangetime: formatTime(reqBody.update_timestamp).replace(/-/g,'').replace(/ /g,'').replace(/:/g,''),
                        strCreattime: formatTime(reqBody.update_timestamp).slice(0,10).replace(/-/g,'')
                    }
                }
            ];
            params.fundGroupGroupInfo = {
                ageRange: reqBody.dialogData.fundGroupType === '02' ? reqBody.dialogData.ageRange : '',
                commro: reqBody.dialogData.commro,
                displayDate: reqBody.dialogData.displayDate.replace(/-/g,''),
                fundgroupAdvise: reqBody.dialogData.fundGroupAdvise,
                recommendReason: reqBody.dialogData.recommendReason,
                recommendHoldTime: reqBody.dialogData.recommendHoldTime,
                fundgroupDesc: reqBody.dialogData.fundGroupDesc,
                fundgroupFeature: reqBody.dialogData.fundGroupFeature,
                fundgroupType: reqBody.dialogData.fundGroupType,
                groupid: reqBody.dialogData.groupId,
                groupname: reqBody.dialogData.groupName,
                grouptype: reqBody.dialogData.riskType,
                initamount: reqBody.dialogData.initAmount,
                investmentServicePerc: reqBody.dialogData.investmentServicePerc,
                isInvestment: reqBody.dialogData.isInvestment,
                investType: reqBody.dialogData.isInvestment === 'Y' ? reqBody.dialogData.investType : 'M',
                investCustomers: reqBody.dialogData.isInvestment === 'Y' ? reqBody.dialogData.investCustomers : '',
                investPrincipal: reqBody.dialogData.isInvestment === 'Y' ? Number(reqBody.dialogData.investPrincipal) : 0,
                investDuration: reqBody.dialogData.isInvestment === 'Y' ? reqBody.dialogData.investDuration : '',
                categoryDescDoc: reqBody.dialogData.isInvestment === 'Y' ? reqBody.dialogData.categoryDescDoc : '',
                categoryDescDisplay: reqBody.dialogData.isInvestment === 'Y' ? reqBody.dialogData.categoryDescDisplay : '',
                riskDescDoc: reqBody.dialogData.isInvestment === 'Y' ? reqBody.dialogData.riskDescDoc : '',
                riskDescDisplay: reqBody.dialogData.isInvestment === 'Y' ? reqBody.dialogData.riskDescDisplay : '',
                investDescDoc: reqBody.dialogData.isInvestment === 'Y' ? reqBody.dialogData.investDescDoc : '',
                investDescDisplay: reqBody.dialogData.isInvestment === 'Y' ? reqBody.dialogData.investDescDisplay : '',
                minChangeAmount: reqBody.dialogData.minChangeAmount,
                minRedeemAmount: reqBody.dialogData.minRedeemAmount,
                minReserveAmount: reqBody.dialogData.minReserveAmount,
                proPageurl: reqBody.dialogData.normalPageUrl,
                onlinedate: reqBody.dialogData.onlineDate.slice(0,10).replace(/-/g, ''),
                onlinetime: reqBody.dialogData.onlineDate.slice(-8).replace(/:/g, ''),
                rightLimit: reqBody.dialogData.isInvestment === 'Y' ? reqBody.dialogData.rightLimit : '',
                rightMaxratePerc: reqBody.dialogData.isInvestment === 'Y' ? reqBody.dialogData.rightMaxratePerc : '',
                investRiskLevel: reqBody.dialogData.isInvestment === 'Y' ? reqBody.dialogData.investRiskLevel : '1',
                bigRedeemRate: reqBody.dialogData.isInvestment === 'Y' ? reqBody.dialogData.largeRedemptionPercent : '',
                turnoverRatePerc: reqBody.dialogData.isInvestment === 'Y' ? reqBody.dialogData.turnoverRatePerc : '',
                singlevalueCustmaxPerc: reqBody.dialogData.isInvestment === 'Y' ? reqBody.dialogData.singlevalueCustmaxPerc : '',
                categoryunitGroupmaxPerc: reqBody.dialogData.isInvestment === 'Y' ? reqBody.dialogData.categoryunitGroupmaxPerc : '',
                singleunitGroupmaxPerc: reqBody.dialogData.isInvestment === 'Y' ? reqBody.dialogData.singleunitGroupmaxPerc : '',
                riskControl: reqBody.dialogData.riskControl,
                risklevel: reqBody.dialogData.riskLevel,
                status: reqBody.dialogData.status,
                establishDate: reqBody.dialogData.onlineDate.slice(0,10).replace(/-/g, '')
            };
            // // 这一步把渠道多选的数据拆分出来
            // let fundgroupSubdatetimeRO = {
            //     acceptMode: reqBody.dialogData.acceptMode,
            //     branchCode: reqBody.dialogData.fundGroupType === '04' ? (reqBody.dialogData.branchCode.length === 0 ? ['247'] : reqBody.dialogData.branchCode) : [],
            //     cooPreationMode: reqBody.dialogData.accptType,
            //     fundgroupType: reqBody.dialogData.fundGroupType,
            //     groupid: reqBody.dialogData.groupId,
            //     stopStartTime: reqBody.dialogData.stopStatus == 0 ? '' : reqBody.dialogData.manualStartTime.replace(/-/g,'').replace(/ /g,'').replace(/:/g,''),
            //     stopEndTime: reqBody.dialogData.stopStatus == 0 ? '' : reqBody.dialogData.manualEndTime.replace(/-/g,'').replace(/ /g,'').replace(/:/g,''),
            //     stopStatus: reqBody.dialogData.stopStatus
            // };
            // let acceptModeList = fundgroupSubdatetimeRO.acceptMode?fundgroupSubdatetimeRO.acceptMode.split(','):[];
            // let fundgroupSubdatetimeROList = [];
            // if(acceptModeList.length>0){
            //     acceptModeList.forEach((item)=>{
            //         let cloneFundgroupSubdatetimeRO = JSON.parse(JSON.stringify(fundgroupSubdatetimeRO));
            //         cloneFundgroupSubdatetimeRO.acceptMode = item;
            //         fundgroupSubdatetimeROList.push(cloneFundgroupSubdatetimeRO);
            //     });
            //     params.fundgroupSubdatetimeROList = fundgroupSubdatetimeROList;
            // }else{
            //     params.fundgroupSubdatetimeROList = [fundgroupSubdatetimeRO];
            // }
            // params.fundgroupSubdatetimeRO = {
            //     acceptMode: reqBody.dialogData.acceptMode,
            //     branchCode: reqBody.dialogData.fundGroupType === '04' ? (reqBody.dialogData.branchCode.length === 0 ? ['247'] : reqBody.dialogData.branchCode) : [],
            //     cooPreationMode: reqBody.dialogData.accptType,
            //     fundgroupType: reqBody.dialogData.fundGroupType,
            //     groupid: reqBody.dialogData.groupId,
            //     stopStartTime: reqBody.dialogData.stopStatus == 0 ? '' : reqBody.dialogData.manualStartTime.replace(/-/g,'').replace(/ /g,'').replace(/:/g,''),
            //     stopEndTime: reqBody.dialogData.stopStatus == 0 ? '' : reqBody.dialogData.manualEndTime.replace(/-/g,'').replace(/ /g,'').replace(/:/g,''),
            //     stopStatus: reqBody.dialogData.stopStatus
            // };
            let option = {
                pageUrl: '/businessMgmt/combinationProductConfig/combinationProductReview/allUpdateReviewPass.ajax ----baseInfoUpdate',
                req,
                url: apiUrlList.update,
                body: params,
                timeout: 15000,
                json: true
            };

            request.post(option, (error, response, body) => {
                if(params.fundGroupGroupInfo.isInvestment === 'Y'){
                    sysLogger(2, req, option, body, investTableName);
                }
                if (error) {
                    return reject({message: '组合基本信息修改失败'});
                }
                if (body.returnCode === 0) {
                    return resolve();
                } else if (body && body.returnCode !== 9999) {
                    return reject({message: body.returnMsg});
                } else {
                    return reject({message: '组合基本信息修改失败'});
                }
            });
        });
        if(reqBody.dialogData.isAddFundGroup){ // 新建调仓
            let checkFund = new Promise((resolve,reject) => { // 当新增调仓时作分红检测
                let params = [
                    {
                        fundgroupChangeDO: {
                            changeAdvise: reqBody.dialogData.newFundGroupChange.changeAdvise,
                            isDisplay: reqBody.dialogData.newFundGroupChange.isDisplay,
                            fundgroupType: reqBody.dialogData.fundGroupType,
                            groupid: reqBody.dialogData.groupId,
                            groupname: reqBody.dialogData.groupName,
                            grouptype: reqBody.dialogData.riskType,
                            strChangetime: formatTime(reqBody.update_timestamp).replace(/-/g,'').replace(/ /g,'').replace(/:/g,''),
                            strCreattime: formatTime(reqBody.update_timestamp).replace(/-/g,'').replace(/ /g,'').replace(/:/g,'')
                        },
                        fundgroupChangeDetailList: reqBody.dialogData.newFundGroupChange.fundList.map(item => {
                            return {
                                fundApkind: item.fundTypeForFundgroup,
                                fundPercent: item.fundPercent,
                                isUnderlyingCurrency: item.isUnderlyingCurrency,
                                fundid: item.fundId,
                                groupid: reqBody.dialogData.groupId
                            }
                        }),
                        fundgroupNewChFundgroupFundBackupDOList: reqBody.dialogData.newFundGroupChange.fundList.map(item => {
                            return item.optionalFundList ? item.optionalFundList.map(optionalItem => {
                                return {
                                    backupFundid: optionalItem.fundId,
                                    priority: optionalItem.priority,
                                    fundid: item.fundId,
                                    groupid: reqBody.dialogData.groupId
                                };
                            }) : [];
                        }).reduce((prev, after) => prev.concat(after))
                    }
                ];
                let option = {
                    pageUrl: '/businessMgmt/combinationProductConfig/combinationProductReview/allUpdateReviewPass.ajax ----checkFund',
                    req,
                    url: apiUrlList.checkFund,
                    body: params,
                    timeout: 15000,
                    json: true
                };
                request.post(option, (error, response, body) => {
                    if (error) {
                        return reject({message: '检测是否处在分红状态失败'});
                    }
                    if (body.returnCode === 0) {
                        return resolve();
                    } else if (body && body.returnCode !== 9999) {
                        return reject({message: body.returnMsg});
                    } else {
                        return reject({message: '检测是否处在分红状态失败'});
                    }
                });
            });
            checkFund.then(() => {
                let addNewChange = new Promise((resolve,reject) => {
                    let params = {
                        fundgroupChangeDO: {
                            strChangetime: formatTime(reqBody.update_timestamp).replace(/-/g,'').replace(/ /g,'').replace(/:/g,''),
                            strCreattime: formatTime(reqBody.update_timestamp).replace(/-/g,'').replace(/ /g,'').replace(/:/g,''),
                            changeAdvise: reqBody.dialogData.newFundGroupChange.changeAdvise,
                            isDisplay: reqBody.dialogData.newFundGroupChange.isDisplay,
                            groupid: reqBody.dialogData.groupId
                        },
                        fundgroupChangeDetailList: reqBody.dialogData.newFundGroupChange.fundList.map(item => {
                            return {
                                fundApkind: item.fundTypeForFundgroup,
                                fundPercent: item.fundPercent,
                                isUnderlyingCurrency: item.isUnderlyingCurrency,
                                fundid: item.fundId,
                                groupid: reqBody.dialogData.groupId
                            }
                        }),
                        fundgroupNewChFundgroupFundBackupDOList: reqBody.dialogData.newFundGroupChange.fundList.map(item => {
                            return item.optionalFundList ? item.optionalFundList.map(optionalItem => {
                                return {
                                    backupFundid: optionalItem.fundId,
                                    priority: optionalItem.priority,
                                    fundid: item.fundId,
                                    groupid: reqBody.dialogData.groupId,
                                    refserialno: reqBody.serialno
                                };
                            }) : [];
                        }).reduce((prev, after) => prev.concat(after))
                    };
                    let option = {
                        pageUrl: '/businessMgmt/combinationProductConfig/combinationProductReview/allUpdateReviewPass.ajax ----addNewChange',
                        req,
                        url: apiUrlList.addHouse,
                        body: params,
                        timeout: 15000,
                        json: true
                    };
                    request.post(option, (error, response, body) => {
                        if (error) {
                            return reject({message: '组合新增调仓信息失败'});
                        }
                        if (body.returnCode === 0) {
                            return resolve();
                        } else if (body && body.returnCode !== 9999) {
                            return reject({message: body.returnMsg});
                        } else {
                            return reject({message: '组合新增调仓信息失败'});
                        }
                    });
                });
                Promise.all([baseInfoUpdate, addNewChange]).then(() => {
                    let SQL = `UPDATE ${tableName} SET content=JSON_SET(content,'$.calc_status','false'),reviewer='${req.session.loginInfo.userid}',review_time='${formatTime(new Date().getTime())}' WHERE local_id=${reqBody.mySQLId}`;
                    console.log('/businessMgmt/combinationProductConfig/combinationProductReview/allUpdateReviewPass.ajax run SQL:', SQL);
                    pool.getConnection((err, connection) => {
                        if (err) {
                            return res.send({
                                error: 1,
                                msg: '链接本地数据库失败',
                                data: null
                            });
                        }
                        connection.query(SQL, function (error, results) {
                            console.log('/businessMgmt/combinationProductConfig/combinationProductReview/allUpdateReviewPass.ajax run SQL error:', error);
                            console.log('/businessMgmt/combinationProductConfig/combinationProductReview/allUpdateReviewPass.ajax run SQL results:', results);
                            if (error || !results.affectedRows) {
                                return res.send({error:1, msg: '操作本地数据库出错，请核对校验本地数据',data: null});
                            }
                            return res.send({error:0, msg: '计算净值初始化中...',data: null});
                        });
                        connection.release();
                    });
                }).catch(error => {
                    console.log(error);
                    return res.send({error: 1, msg:error.message, data:null});
                });
            }).catch(error => {
                return res.send({error: 1, msg:error.message, data:null});
            });
        }
        else {
            function historyChangeUpdate(historyChangeItem){
                return new Promise((resolve,reject) => {
                    let params = {
                        changeAdvise: historyChangeItem.changeAdvise,
                        isDisplay: historyChangeItem.isDisplay,
                        serialno: historyChangeItem.serialNo,
                        groupid: reqBody.dialogData.groupId
                    };
                    let option = {
                        pageUrl: '/businessMgmt/combinationProductConfig/combinationProductReview/allUpdateReviewPass.ajax ----historyChangeUpdate',
                        req,
                        url: apiUrlList.advise,
                        body: params,
                        timeout: 15000,
                        json: true
                    };
                    request.post(option, (error, response, body) => {
                        if (error) {
                            return reject({message: '组合历史调仓信息修改失败'});
                        }
                        if (body.returnCode === 0) {
                            return resolve();
                        } else if (body && body.returnCode !== 9999) {
                            return reject({message: body.returnMsg});
                        } else {
                            return reject({message: '组合历史调仓信息修改失败'});
                        }
                    });
                });
            }
            baseInfoUpdate.then(() => {
                Promise.all(reqBody.dialogData.fundGroupChangeDetailList.map(item => historyChangeUpdate(item))).then(() => {
                    let SQL = `UPDATE ${tableName} SET status=0,content=JSON_SET(content,'$.calc_status','true'),reviewer='${req.session.loginInfo.userid}',review_time='${formatTime(new Date().getTime())}' WHERE local_id=${reqBody.mySQLId}`;
                    console.log('/businessMgmt/combinationProductConfig/combinationProductReview/allUpdateReviewPass.ajax run SQL:', SQL);
                    pool.getConnection((err, connection) => {
                        if (err) {
                            return res.send({
                                error: 1,
                                msg: '链接本地数据库失败',
                                data: null
                            });
                        }
                        connection.query(SQL, function (error, results) {
                            console.log('/businessMgmt/combinationProductConfig/combinationProductReview/allUpdateReviewPass.ajax run SQL error:', error);
                            console.log('/businessMgmt/combinationProductConfig/combinationProductReview/allUpdateReviewPass.ajax run SQL results:', results);
                            if (error || !results.affectedRows) {
                                return res.send({error:1, msg: '操作本地数据库出错，请核对校验本地数据',data: null});
                            }
                            return res.send({error:0, msg: '复核通过',data: null});
                        });
                        connection.release();
                    });
                }).catch(error => {
                    return res.send({error: 1, msg:error.message, data:null});
                });
            }).catch(error => {
                return res.send({error: 1, msg:error.message, data:null});
            });
        }
    });
};

function formatTime(timestamp) {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    return Y + M + D + h + m + s;
}