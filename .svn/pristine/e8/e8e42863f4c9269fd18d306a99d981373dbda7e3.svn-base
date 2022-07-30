const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').businessParamConfig.quotaHandle;
const tableName = 'bm_bpc_quota';

module.exports = function (app) {
    //查询列表数据
    app.post('/businessMgmt/businessParamConfig/quotaHandle/getTableData.ajax', (req, res, next) => {
        let paramsStatus = {};
        paramsStatus.type = req.body.type;
        let product = req.body.product; //输入产品值
        let tradeType = req.body.tradeType;
        let apkind = req.body.apkind;
        let channel = req.body.channel;
        let reviewStatus = req.body.reviewStatus; //复核状态值
        // 查询本地数据库
        if (paramsStatus.type == "1") {
            let sql = `SELECT content,local_id,status,delete_flag,operate,operator,creator,reviewer,review_time,update_timestamp,remark FROM ${tableName} WHERE delete_flag='F' AND creator='${req.session.loginInfo.userid}'`;
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
                // var sql =`select content,local_id,status,delete_flag,operate,reviewer,review_time,update_timestamp,remark from ${tableName} where delete_flag="F" ORDER BY update_timestamp DESC`;
                console.log('/businessMgmt/businessParamConfig/quotaHandle/getTableData.ajax sql:', sql);
                pool.getConnection(function (error, connection) {
                    if (error) {
                        reject({
                            error: 1,
                            msg: '操作失败'
                        });
                    }
                    connection.query(sql, function (error, results, fields) {
                        console.log('/businessMgmt/businessParamConfig/quotaHandle/getTableData.ajax error:', error);
                        console.log('/businessMgmt/businessParamConfig/quotaHandle/getTableData.ajax results:', results);
                        console.log('/businessMgmt/businessParamConfig/quotaHandle/getTableData.ajax fields:', fields);
                        if (error) {
                            reject({
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
                        pageUrl: '/businessMgmt/businessParamConfig/quotaHandle/params.ajax',
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
                        pageUrl: '/businessMgmt/businessParamConfig/quotaHandle/params.ajax',
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
        // 查询业务数据
        if (paramsStatus.type == "0") {
            // 查询后端业务数据
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
                    pageUrl: '/businessMgmt/businessParamConfig/quotaHandle/getTableData.ajax',
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
                        pageUrl: '/businessMgmt/businessParamConfig/quotaHandle/params.ajax',
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
                        pageUrl: '/businessMgmt/businessParamConfig/quotaHandle/params.ajax',
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
    // 参数类型转换
    app.post('/businessMgmt/businessParamConfig/quotaHandle/params.ajax', (req, res, next) => {
        let params = {};
        req.body.pmst && (params.pmst = req.body.pmst);
        req.body.pmkey && (params.pmkey = req.body.pmkey);
        let option = {
            pageUrl: '/businessMgmt/businessParamConfig/quotaHandle/params.ajax',
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
    })

    // 获取业务参数
    app.post('/businessMgmt/businessParamConfig/quotaHandle/apkinds.ajax', (req, res, next) => {
        let params = {};
        req.body.pmst && (params.pmst = req.body.pmst);
        req.body.pmkey && (params.pmkey = req.body.pmkey);
        let option = {
            pageUrl: '/businessMgmt/businessParamConfig/quotaHandle/apkinds.ajax',
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
    // 获取子业务参数
    app.post('/businessMgmt/businessParamConfig/quotaHandle/subApkinds.ajax', (req, res, next) => {
        let params = {};
        req.body.pmst && (params.pmst = req.body.pmst);
        req.body.pmkey && (params.pmkey = req.body.pmkey);
        let option = {
            pageUrl: '/businessMgmt/businessParamConfig/quotaHandle/subApkinds.ajax',
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
    // 获取规则编号ID
    app.post('/businessMgmt/businessParamConfig/quotaHandle/ruleId.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/businessMgmt/businessParamConfig/quotaHandle/ruleId.ajax',
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

    //添加保存数据;
    app.post('/businessMgmt/businessParamConfig/quotaHandle/saveParam.ajax', (req, res, next) => {
        // 由我经办增加保存
        let paramsStatus = {};
        paramsStatus.type = req.body.type; //传过来的状态数值
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

        let operatorName = req.session.loginInfo.userid //操作人
        params = JSON.stringify(params)
        if (paramsStatus.type == "1") {
            var sql = `insert into bm_bpc_quota set ?,delete_flag="F",creator='${operatorName}',operator='${operatorName}',operate=1,comment=1,status="2"`;
            console.log('/businessMgmt/businessParamConfig/quotaHandle/saveParam.ajax sql:', sql);
            console.log('/businessMgmt/businessParamConfig/quotaHandle/saveParam.ajax params:', params);
            pool.getConnection(function (error, connection) {
                if (error) {
                    reject({
                        error: 1,
                        msg: '操作失败'
                    });
                }
                connection.query(sql, {
                    content: params
                }, function (error, results, fields) {
                    console.log('/businessMgmt/businessParamConfig/quotaHandle/saveParam.ajax error:', error);
                    console.log('/businessMgmt/businessParamConfig/quotaHandle/saveParam.ajax results:', results);
                    console.log('/businessMgmt/businessParamConfig/quotaHandle/saveParam.ajax fields:', fields);
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
        //     var sql = 'insert into bm_bpc_quota set ?,type=10,delete_flag="F",operate=1,comment=1,status="2"';
        //     console.log('/businessMgmt/businessParamConfig/quotaHandle/saveParam.ajax sql:', sql);
        //     console.log('/businessMgmt/businessParamConfig/discountHandle/saveParam.ajax params:', params);
        //     pool.query(sql, {content: params}, function (error, results, fields) {
        //         console.log('/businessMgmt/businessParamConfig/discountHandle/saveParam.ajax error:', error);
        //         console.log('/businessMgmt/businessParamConfig/discountHandle/saveParam.ajax results:', results);
        //         console.log('/businessMgmt/businessParamConfig/discountHandle/saveParam.ajax fields:', fields);
        //         if (error) {
        //             return res.send({error: 1, msg: '保存失败'});
        //         }
        //         return res.send({error: 0, msg: '保存成功,请在经办中查看', data: results});
        //     });
        // }
    });

    // 修改业务数据存到经办数据库中;
    app.post('/businessMgmt/businessParamConfig/quotaHandle/serviceSave.ajax', (req, res, next) => {
        //修改本地Mysql参数
        let paramsStatus = {};
        paramsStatus.type = req.body.type; //传过来的状态数值
        let operate = req.body.operate //操作类型
        //经办现有折扣修改业务产品参数
        if (paramsStatus.type == "0") {
            let oneId = req.body.oneId
            let params = {};
            // 产品参数
            req.body.id && (params.id = req.body.id);
            req.body.product && (params.product = req.body.product);
            req.body.apkind && (params.apkind = req.body.apkind);
            req.body.tradeType && (params.tradeType = req.body.tradeType);
            req.body.custType && (params.custType = req.body.custType);
            req.body.branchCode && (params.branchCode = req.body.branchCode);
            req.body.channel && (params.channel = req.body.channel);
            req.body.bankNo && (params.bankNo = req.body.bankNo);
            req.body.remark && (params.remark = req.body.remark);
            req.body.subApkind && (params.subApkind = req.body.subApkind);
            req.body.quotaType && (params.quotaType = req.body.quotaType);
            req.body.startTime && (params.startTime = req.body.startTime);
            req.body.endTime && (params.endTime = req.body.endTime);
            req.body.maxQuota && (params.maxQuota = req.body.maxQuota);
            req.body.minQuota && (params.minQuota = req.body.minQuota);
            params.accoType = req.body.accoType;

            req.body.operator && (params.operator = req.body.operator);
            var updateTime = req.body.updateTime //获取修改的时间
            let operatorName = req.session.loginInfo.userid //操作人

            // id不同则新增
            // if (oneId != params.id) {
            params = JSON.stringify(params)
            // var sql =`insert into bm_bpc_quota set ?,delete_flag="F",creator='${operatorName}',operator='${operatorName}',operate=2,status="2"`;
            var sql = `insert into bm_bpc_quota set ?,delete_flag="F",service_id='${req.body.id}',creator='${operatorName}',operator='${operatorName}',operate=2,status="2"`;
            console.log('/businessMgmt/businessParamConfig/discountHandle/serviceSave.ajax sql:', sql);
            console.log('/businessMgmt/businessParamConfig/discountHandle/serviceSave.ajax params:', params);
            pool.getConnection(function (error, connection) {
                if (error) {
                    reject({
                        error: 1,
                        msg: '操作失败'
                    });
                }
                connection.query(sql, {
                    content: params
                }, function (error, results, fields) {
                    console.log('/businessMgmt/businessParamConfig/discountHandle/serviceSave.ajax error:', error);
                    console.log('/businessMgmt/businessParamConfig/discountHandle/serviceSave.ajax results:', results);
                    console.log('/businessMgmt/businessParamConfig/discountHandle/serviceSave.ajax fields:', fields);
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
            // if (oneId==params.id) {
            //     params = JSON.stringify(params)
            //     // var sql =`UPDATE bm_bpc_quota SET content=${params},status=2,operate=2 where content -> '$.id'=?`;
            //     var sql="UPDATE bm_bpc_quota SET content=?,update_timestamp=? where content -> '$.id'=?"
            //     console.log('/businessMgmt/businessParamConfig/discountHandle/serviceSave.ajax sql:', sql);
            //     console.log('/businessMgmt/businessParamConfig/discountHandle/serviceSave.ajax params:', params);
            //     pool.query(sql,[params, updateTime, oneId],function (error, results, fields) {
            //         console.log('/businessMgmt/businessParamConfig/discountHandle/serviceSave.ajax error:', error);
            //         console.log('/businessMgmt/businessParamConfig/discountHandle/serviceSave.ajax results:', results);
            //         console.log('/businessMgmt/businessParamConfig/discountHandle/serviceSave.ajax fields:', fields);
            //
            //         if (error) {
            //             console.log('error=', error);
            //             return res.send({error: 1, msg: '修改失败'});
            //         }
            //         console.log('results=', results);
            //         console.log('fields=', fields);
            //         return res.send({error: 0, msg: '修改成功', data: results});
            //     });
            // }
        }
    });

    // 修改本地数据;
    app.post('/businessMgmt/businessParamConfig/quotaHandle/localRevise.ajax', (req, res, next) => {
        //修改本地Mysql参数
        let paramsStatus = {};
        paramsStatus.type = req.body.type; //传过来的状态数值
        let operate = req.body.operate //操作类型
        if (paramsStatus.type == "1") {
            let mysqlId = req.body.myqsql //获取传过来数据库表字段的id
            // 业务产品参数
            let params = {};
            req.body.id && (params.id = req.body.id);
            req.body.product && (params.product = req.body.product);
            req.body.apkind && (params.apkind = req.body.apkind);
            req.body.tradeType && (params.tradeType = req.body.tradeType);
            req.body.custType && (params.custType = req.body.custType);
            req.body.branchCode && (params.branchCode = req.body.branchCode);
            req.body.channel && (params.channel = req.body.channel);
            req.body.bankNo && (params.bankNo = req.body.bankNo);
            req.body.remark && (params.remark = req.body.remark);
            req.body.subApkind && (params.subApkind = req.body.subApkind);
            req.body.quotaType && (params.quotaType = req.body.quotaType);
            req.body.startTime && (params.startTime = req.body.startTime);
            req.body.endTime && (params.endTime = req.body.endTime);
            req.body.maxQuota && (params.maxQuota = req.body.maxQuota);
            req.body.minQuota && (params.minQuota = req.body.minQuota);
            req.body.operator && (params.operator = req.body.operator);
            params.accoType = req.body.accoType;

            let operatorName = req.session.loginInfo.userid //操作人
            var updateTime = req.body.updateTime //获取修改的时间
            params = JSON.stringify(params)
            if (operate == '1') {
                var sql = `UPDATE bm_bpc_quota SET content=?,status='2',operate='1',operator='${operatorName}',update_timestamp=? where local_id=?`;
            } else if (operate == '2') {
                var sql = `UPDATE bm_bpc_quota SET content=?,status='2',operate='2',operator='${operatorName}',update_timestamp=? where local_id=?`;
            } else if (operate == '3') {
                var sql = `UPDATE bm_bpc_quota SET content=?,status='2',operate='3',operator='${operatorName}',update_timestamp=? where local_id=?`;
            }
            // var sql = "UPDATE cs_ticket SET content=?,status='1',operate='2',update_timestamp=? where id=?";
            // var sql = "UPDATE cs_ticket SET content=?,status='2',operate='2',update_timestamp=? where id=?";
            console.log('/businessMgmt/businessParamConfig/quotaHandle/localRevise.ajax sql:', sql);
            console.log('/businessMgmt/businessParamConfig/quotaHandle/localRevise.ajax params:', params);
            pool.getConnection(function (error, connection) {
                if (error) {
                    reject({
                        error: 1,
                        msg: '操作失败'
                    });
                }
                connection.query(sql, [params, updateTime, mysqlId], function (error, results, fields) {
                    console.log('/businessMgmt/businessParamConfig/quotaHandle/localRevise.ajax error:', error);
                    console.log('/businessMgmt/businessParamConfig/quotaHandle/localRevise.ajax results:', results);
                    console.log('/businessMgmt/businessParamConfig/quotaHandle/localRevise.ajax fields:', fields);
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

    //提交数据操作;
    app.post('/businessMgmt/businessParamConfig/quotaHandle/submitCheck.ajax', (req, res, next) => {
        //由我经办修改本地Mysql参数
        let paramsStatus = {};
        paramsStatus.type = req.body.type; //传过来的状态数值
        var operate = req.body.operate
        if (paramsStatus.type == "1" && operate == '2') {
            let mysqlId = req.body.myqsql //获取传过来数据库表字段的id
            // 业务产品参数
            let params = {};
            req.body.id && (params.id = req.body.id);
            req.body.product && (params.product = req.body.product);
            req.body.accoType && (params.accoType = req.body.accoType);
            req.body.apkind && (params.apkind = req.body.apkind);
            req.body.tradeType && (params.tradeType = req.body.tradeType);
            req.body.custType && (params.custType = req.body.custType);
            req.body.branchCode && (params.branchCode = req.body.branchCode);
            req.body.channel && (params.channel = req.body.channel);
            req.body.bankNo && (params.bankNo = req.body.bankNo);
            req.body.remark && (params.remark = req.body.remark);
            req.body.subApkind && (params.subApkind = req.body.subApkind);
            req.body.quotaType && (params.quotaType = req.body.quotaType);
            req.body.startTime && (params.startTime = req.body.startTime);
            req.body.endTime && (params.endTime = req.body.endTime);
            req.body.maxQuota && (params.maxQuota = req.body.maxQuota);
            req.body.minQuota && (params.minQuota = req.body.minQuota);
            req.body.operator && (params.operator = req.body.operator);

            var updateTime = req.body.updateTime //获取修改的时间
            params = JSON.stringify(params)
            var sql = "UPDATE cs_ticket SET content=?,status='2',operate='2',delete_flag='F',update_timestamp=? where id=?";
            console.log('/businessMgmt/businessParamConfig/quotaHandle/submitCheck.ajax sql:', sql);
            console.log('/businessMgmt/businessParamConfig/quotaHandle/submitCheck.ajax params:', params);
            pool.getConnection(function (error, connection) {
                if (error) {
                    reject({
                        error: 1,
                        msg: '操作失败'
                    });
                }
                connection.query(sql, [params, updateTime, mysqlId], function (error, results, fields) {
                    console.log('/businessMgmt/businessParamConfig/quotaHandle/submitCheck.ajax error:', error);
                    console.log('/businessMgmt/businessParamConfig/quotaHandle/submitCheck.ajax results:', results);
                    console.log('/businessMgmt/businessParamConfig/quotaHandle/submitCheck.ajax fields:', fields);
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
            req.body.id && (params.id = req.body.id);
            req.body.product && (params.product = req.body.product);
            req.body.accoType && (params.accoType = req.body.accoType);
            req.body.apkind && (params.apkind = req.body.apkind);
            req.body.tradeType && (params.tradeType = req.body.tradeType);
            req.body.custType && (params.custType = req.body.custType);
            req.body.branchCode && (params.branchCode = req.body.branchCode);
            req.body.channel && (params.channel = req.body.channel);
            req.body.bankNo && (params.bankNo = req.body.bankNo);
            req.body.remark && (params.remark = req.body.remark);
            req.body.subApkind && (params.subApkind = req.body.subApkind);
            req.body.quotaType && (params.quotaType = req.body.quotaType);
            req.body.startTime && (params.startTime = req.body.startTime);
            req.body.endTime && (params.endTime = req.body.endTime);
            req.body.maxQuota && (params.maxQuota = req.body.maxQuota);
            req.body.minQuota && (params.minQuota = req.body.minQuota);
            req.body.operator && (params.operator = req.body.operator);

            var updateTime = req.body.updateTime //获取修改的时间
            params = JSON.stringify(params)
            var sql = "UPDATE cs_ticket SET content=?,status='2',operate='1',delete_flag='F',update_timestamp=? where id=?";
            console.log('/businessMgmt/businessParamConfig/quotaHandle/submitCheck.ajax sql:', sql);
            console.log('/businessMgmt/businessParamConfig/quotaHandle/submitCheck.ajax params:', params);
            pool.getConnection(function (error, connection) {
                if (error) {
                    reject({
                        error: 1,
                        msg: '操作失败'
                    });
                }
                connection.query(sql, [params, updateTime, mysqlId], function (error, results, fields) {
                    console.log('/businessMgmt/businessParamConfig/quotaHandle/submitCheck.ajax error:', error);
                    console.log('/businessMgmt/businessParamConfig/quotaHandle/submitCheck.ajax results:', results);
                    console.log('/businessMgmt/businessParamConfig/quotaHandle/submitCheck.ajax fields:', fields);
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
            req.body.id && (params.id = req.body.id);
            req.body.product && (params.product = req.body.product);
            req.body.accoType && (params.accoType = req.body.accoType);
            req.body.apkind && (params.apkind = req.body.apkind);
            req.body.tradeType && (params.tradeType = req.body.tradeType);
            req.body.custType && (params.custType = req.body.custType);
            req.body.branchCode && (params.branchCode = req.body.branchCode);
            req.body.channel && (params.channel = req.body.channel);
            req.body.bankNo && (params.bankNo = req.body.bankNo);
            req.body.remark && (params.remark = req.body.remark);
            req.body.subApkind && (params.subApkind = req.body.subApkind);
            req.body.quotaType && (params.quotaType = req.body.quotaType);
            req.body.startTime && (params.startTime = req.body.startTime);
            req.body.endTime && (params.endTime = req.body.endTime);
            req.body.maxQuota && (params.maxQuota = req.body.maxQuota);
            req.body.minQuota && (params.minQuota = req.body.minQuota);
            req.body.operator && (params.operator = req.body.operator);

            var updateTime = req.body.updateTime //获取修改的时间
            params = JSON.stringify(params)
            var sql = "UPDATE cs_ticket SET delete_flag='T',operate='3',status='2',update_timestamp=? where id=?";
            console.log('/businessMgmt/businessParamConfig/quotaHandle/submitCheck.ajax sql:', sql);
            console.log('/businessMgmt/businessParamConfig/quotaHandle/submitCheck.ajax params:', params);
            pool.getConnection(function (error, connection) {
                if (error) {
                    reject({
                        error: 1,
                        msg: '操作失败'
                    });
                }
                connection.query(sql, [updateTime, mysqlId], function (error, results, fields) {
                    console.log('/businessMgmt/businessParamConfig/quotaHandle/submitCheck.ajax error:', error);
                    console.log('/businessMgmt/businessParamConfig/quotaHandle/submitCheck.ajax results:', results);
                    console.log('/businessMgmt/businessParamConfig/quotaHandle/submitCheck.ajax fields:', fields);
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
    app.post('/businessMgmt/businessParamConfig/quotaHandle/deleteParam.ajax', (req, res, next) => {
        // 删除本地数据-软删除
        let paramsStatus = {};
        paramsStatus.type = req.body.type; //传过来的状态数值
        var operate = req.body.operate
        if (paramsStatus.type == "0") {
            let oneId = req.body.oneId
            let params = {};
            // 产品参数
            req.body.id && (params.id = req.body.id);
            req.body.product && (params.product = req.body.product);
            req.body.apkind && (params.apkind = req.body.apkind);
            req.body.tradeType && (params.tradeType = req.body.tradeType);
            req.body.custType && (params.custType = req.body.custType);
            req.body.branchCode && (params.branchCode = req.body.branchCode);
            req.body.channel && (params.channel = req.body.channel);
            req.body.bankNo && (params.bankNo = req.body.bankNo);
            req.body.remark && (params.remark = req.body.remark);
            req.body.subApkind && (params.subApkind = req.body.subApkind);
            req.body.quotaType && (params.quotaType = req.body.quotaType);
            req.body.startTime && (params.startTime = req.body.startTime);
            req.body.endTime && (params.endTime = req.body.endTime);
            req.body.maxQuota && (params.maxQuota = req.body.maxQuota);
            req.body.minQuota && (params.minQuota = req.body.minQuota);
            req.body.operator && (params.operator = req.body.operator);
            params.accoType = req.body.accoType;

            let operatorName = req.session.loginInfo.userid //操作人
            // id不同则新增
            // if (oneId != params.id) {
            params = JSON.stringify(params)
            var sql = `insert into bm_bpc_quota set ?,delete_flag="F",service_id='${req.body.id}',creator='${operatorName}',operator='${operatorName}',operate=3,status="2"`;
            console.log('/businessMgmt/businessParamConfig/discountHandle/deleteParam.ajax sql:', sql);
            console.log('/businessMgmt/businessParamConfig/discountHandle/deleteParam.ajax params:', params);
            pool.getConnection(function (error, connection) {
                if (error) {
                    reject({
                        error: 1,
                        msg: '操作失败'
                    });
                }
                connection.query(sql, {
                    content: params
                }, function (error, results, fields) {
                    console.log('/businessMgmt/businessParamConfig/discountHandle/deleteParam.ajax error:', error);
                    console.log('/businessMgmt/businessParamConfig/discountHandle/deleteParam.ajax results:', results);
                    console.log('/businessMgmt/businessParamConfig/discountHandle/deleteParam.ajax fields:', fields);
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
    });

    //撤销本地数据
    app.post('/businessMgmt/businessParamConfig/quotaHandle/deleteLocal.ajax', (req, res, next) => {
        // 撤销本地数据-软删除
        let paramsStatus = {};
        paramsStatus.type = req.body.type; //传过来的状态数值
        var operate = req.body.operate
        if (paramsStatus.type == "1") {
            let mysqlId = req.body.myqsql //获取传过来数据库表字段的id

            let params = {};
            req.body.id && (params.id = req.body.id);
            req.body.product && (params.product = req.body.product);
            req.body.apkind && (params.apkind = req.body.apkind);
            req.body.tradeType && (params.tradeType = req.body.tradeType);
            req.body.custType && (params.custType = req.body.custType);
            req.body.branchCode && (params.branchCode = req.body.branchCode);
            req.body.channel && (params.channel = req.body.channel);
            req.body.bankNo && (params.bankNo = req.body.bankNo);
            req.body.remark && (params.remark = req.body.remark);
            req.body.subApkind && (params.subApkind = req.body.subApkind);
            req.body.quotaType && (params.quotaType = req.body.quotaType);
            req.body.startTime && (params.startTime = req.body.startTime);
            req.body.endTime && (params.endTime = req.body.endTime);
            req.body.maxQuota && (params.maxQuota = req.body.maxQuota);
            req.body.minQuota && (params.minQuota = req.body.minQuota);
            req.body.operator && (params.operator = req.body.operator);
            params.accoType = req.body.accoType;

            let operatorName = req.session.loginInfo.userid //操作人
            params = JSON.stringify(params)
            // if(operate=='1'){
            //     var sql = "UPDATE bm_bpc_quota SET delete_flag='T',operate=1,status='1' where id=?";
            // }else if (operate=='2'){
            //     var sql = "UPDATE bm_bpc_quota SET delete_flag='T',operate=2,status='1' where id=?";
            // }else if (operate=='3'){
            //     var sql = "UPDATE bm_bpc_quota SET delete_flag='T',operate=3,status='1' where id=?";
            // }
            var sql = `UPDATE bm_bpc_quota SET delete_flag='T',operate=3,status='1',operator='${operatorName}' where local_id=?`;
            console.log('/businessMgmt/businessParamConfig/quotaHandle/deleteLocal.ajax sql:', sql);
            console.log('/businessMgmt/businessParamConfig/quotaHandle/deleteLocal.ajax params:', params);
            pool.getConnection(function (error, connection) {
                if (error) {
                    reject({
                        error: 1,
                        msg: '操作失败'
                    });
                }
                connection.query(sql, [mysqlId], function (error, results, fields) {
                    console.log('/businessMgmt/businessParamConfig/quotaHandle/deleteLocal.ajax error:', error);
                    console.log('/businessMgmt/businessParamConfig/quotaHandle/deleteLocal.ajax results:', results);
                    console.log('/businessMgmt/businessParamConfig/quotaHandle/deleteLocal.ajax fields:', fields);
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

        // 后端数据删除
        //经办现有折扣删除业务产品参数,实则先保存到本地
        if (paramsStatus.type == "0") {
            let oneId = req.body.oneId

            let params = {};
            // 产品参数
            req.body.id && (params.id = req.body.id);
            req.body.product && (params.product = req.body.product);
            req.body.apkind && (params.apkind = req.body.apkind);
            req.body.tradeType && (params.tradeType = req.body.tradeType);
            req.body.custType && (params.custType = req.body.custType);
            req.body.branchCode && (params.branchCode = req.body.branchCode);
            req.body.channel && (params.channel = req.body.channel);
            req.body.bankNo && (params.bankNo = req.body.bankNo);
            req.body.remark && (params.product = req.body.remark);
            req.body.subApkind && (params.subApkind = req.body.subApkind);
            req.body.quotaType && (params.quotaType = req.body.quotaType);
            req.body.startTime && (params.startTime = req.body.startTime);
            req.body.endTime && (params.endTime = req.body.endTime);
            req.body.maxQuota && (params.maxQuota = req.body.maxQuota);
            req.body.minQuota && (params.minQuota = req.body.minQuota);
            req.body.operator && (params.operator = req.body.operator);
            params.accoType = req.body.accoType;
            // id不同则新增
            if (oneId != params.id) {
                params = JSON.stringify(params)
                var sql = 'insert into cs_ticket set ?,delete_flag="F",operate=3,status="2"';
                console.log('/businessMgmt/businessParamConfig/discountHandle/deleteParam.ajax sql:', sql);
                console.log('/businessMgmt/businessParamConfig/discountHandle/deleteParam.ajax params:', params);
                pool.getConnection(function (error, connection) {
                    if (error) {
                        reject({
                            error: 1,
                            msg: '操作失败'
                        });
                    }
                    connection.query(sql, {
                        content: params
                    }, function (error, results, fields) {
                        console.log('/businessMgmt/businessParamConfig/discountHandle/deleteParam.ajax error:', error);
                        console.log('/businessMgmt/businessParamConfig/discountHandle/deleteParam.ajax results:', results);
                        console.log('/businessMgmt/businessParamConfig/discountHandle/deleteParam.ajax fields:', fields);
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

    //重新提删除交操作数据
    app.post('/businessMgmt/businessParamConfig/quotaHandle/deleteAgain.ajax', (req, res, next) => {
        let paramsStatus = {};
        paramsStatus.type = req.body.type; //传过来的状态数值
        var operate = req.body.operate
        if (paramsStatus.type == "1") {
            let mysqlId = req.body.myqsql //获取传过来数据库表字段的id

            let params = {};
            req.body.id && (params.id = req.body.id);
            req.body.product && (params.product = req.body.product);
            req.body.apkind && (params.apkind = req.body.apkind);
            req.body.tradeType && (params.tradeType = req.body.tradeType);
            req.body.custType && (params.custType = req.body.custType);
            req.body.branchCode && (params.branchCode = req.body.branchCode);
            req.body.channel && (params.channel = req.body.channel);
            req.body.bankNo && (params.bankNo = req.body.bankNo);
            req.body.remark && (params.remark = req.body.remark);
            req.body.subApkind && (params.subApkind = req.body.subApkind);
            req.body.quotaType && (params.quotaType = req.body.quotaType);
            req.body.startTime && (params.startTime = req.body.startTime);
            req.body.endTime && (params.endTime = req.body.endTime);
            req.body.maxQuota && (params.maxQuota = req.body.maxQuota);
            req.body.minQuota && (params.minQuota = req.body.minQuota);
            params.accoType = req.body.accoType;
            req.body.operator && (params.operator = req.body.operator);

            let operatorName = req.session.loginInfo.userid //操作人
            params = JSON.stringify(params)
            // if(operate=='1'){
            //     var sql = "UPDATE bm_bpc_quota SET delete_flag='T',operate=1,status='1' where id=?";
            // }else if (operate=='2'){
            //     var sql = "UPDATE bm_bpc_quota SET delete_flag='T',operate=2,status='1' where id=?";
            // }else if (operate=='3'){
            //     var sql = "UPDATE bm_bpc_quota SET delete_flag='T',operate=3,status='1' where id=?";
            // }
            var sql = `UPDATE bm_bpc_quota SET delete_flag='F',operate=3,status='2',operator='${operatorName}' where local_id=?`;
            console.log('/businessMgmt/businessParamConfig/quotaHandle/deleteAgain.ajax sql:', sql);
            console.log('/businessMgmt/businessParamConfig/quotaHandle/deleteAgain.ajax params:', params);
            pool.getConnection(function (error, connection) {
                if (error) {
                    reject({
                        error: 1,
                        msg: '操作失败'
                    });
                }
                connection.query(sql, [mysqlId], function (error, results, fields) {
                    console.log('/businessMgmt/businessParamConfig/quotaHandle/deleteAgain.ajax error:', error);
                    console.log('/businessMgmt/businessParamConfig/quotaHandle/deleteAgain.ajax results:', results);
                    console.log('/businessMgmt/businessParamConfig/quotaHandle/deleteAgain.ajax fields:', fields);
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
    app.post('/businessMgmt/businessParamConfig/quotaHandle/userName.ajax', (req, res, next) => {
        let operator = req.session.loginInfo.userid
        return res.send({
            error: 0,
            msg: '成功',
            data: operator
        });
    });

    // 获取交易类型下拉数据
    app.post('/businessMgmt/businessParamConfig/quotaHandle/tradeTypeList.ajax', (req, res, next) => {
        let params = {};
        req.body.pmst && (params.pmst = req.body.pmst);
        req.body.pmkey && (params.pmkey = req.body.pmkey);
        let option = {
            pageUrl: '/businessMgmt/businessParamConfig/quotaHandle/tradeTypeList.ajax',
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
    app.post('/businessMgmt/businessParamConfig/quotaHandle/channelTypeList.ajax', (req, res, next) => {
        let params = {};
        req.body.pmst && (params.pmst = req.body.pmst);
        req.body.pmkey && (params.pmkey = req.body.pmkey);
        let option = {
            pageUrl: '/businessMgmt/businessParamConfig/quotaHandle/channelTypeList.ajax',
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

    // 获取客户类型下拉数据
    app.post('/businessMgmt/businessParamConfig/quotaHandle/custTypeList.ajax', (req, res, next) => {
        let params = {};
        req.body.pmst && (params.pmst = req.body.pmst);
        req.body.pmkey && (params.pmkey = req.body.pmkey);
        let option = {
            pageUrl: '/businessMgmt/businessParamConfig/quotaHandle/custTypeList.ajax',
            req,
            url: apiUrlList.custTypeList,
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

    // 获取额度类型下拉数据
    app.post('/businessMgmt/businessParamConfig/quotaHandle/quotaTypeList.ajax', (req, res, next) => {
        let params = {};
        req.body.pmst && (params.pmst = req.body.pmst);
        req.body.pmkey && (params.pmkey = req.body.pmkey);
        let option = {
            pageUrl: '/businessMgmt/businessParamConfig/quotaHandle/quotaTypeList.ajax',
            req,
            url: apiUrlList.quotaTypeList,
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

    // 获取网点类型下拉数据
    app.post('/businessMgmt/businessParamConfig/quotaHandle/branchCodeList.ajax', (req, res, next) => {
        let params = {};
        req.body.pmst && (params.pmst = req.body.pmst);
        req.body.pmkey && (params.pmkey = req.body.pmkey);
        let option = {
            pageUrl: '/businessMgmt/businessParamConfig/quotaHandle/branchCodeList.ajax',
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
                    msg: '操作失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0) {
                // return res.send({error: 0, msg: '获取成功', data: result});

                result.body = result.body.filter(item => item.pmv1 !== 'A' && item.pmv1 !== 'C');
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
    app.post('/businessMgmt/businessParamConfig/quotaHandle/fundList.ajax', (req, res, next) => {

        // 获取产品列表
        let fundList = new Promise(resolve => {
            let option = {
                pageUrl: '/businessMgmt/businessParamConfig/quotaHandle/fundList.ajax --fundList',
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
                pageUrl: '/businessMgmt/businessParamConfig/quotaHandle/fundList.ajax --groupList',
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