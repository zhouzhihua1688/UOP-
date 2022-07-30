const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').allChannels.userAuthorityReview;
const tableName = 'am_all_userauthority';

module.exports = function (app) {
//查询列表数据
    app.post('/authorityMgmt/allChannels/userAuthorityReview/DataUserInfo.ajax', (req, res, next) => {
            let paramsStatus = {};
            paramsStatus.type = req.body.type;
            let reviewStatus = req.body.reviewStatus; //复核状态值
            // 查询本地数据库
            if (paramsStatus.type == "1") {
                // let sql = `SELECT content,local_id,status,delete_flag,operate,operator,creator,reviewer,review_time,update_timestamp,remark FROM ${tableName} WHERE delete_flag='F' AND creator='${req.session.loginInfo.userid}'`;
                let sql = `SELECT content,local_id,status,delete_flag,operate,operator,creator,reviewer,review_time,update_timestamp,remark FROM ${tableName} WHERE delete_flag='F' AND status!=1`;

                if (req.body.reviewStatus) {
                    sql += ` AND status='${req.body.reviewStatus}'`;
                }
                if (parseInt(req.body.userId)) {
                    sql += ` AND JSON_EXTRACT(content, '$.userId')=${req.body.userId}`;
                }
                sql += ' ORDER BY update_timestamp DESC';
                new Promise(function (resolve, reject) {
                    console.log('/authorityMgmt/allChannels/userAuthorityReview/DataUserInfo.ajax sql:', sql);
                    pool.query(sql, function (error, results, fields) {
                        console.log('/authorityMgmt/allChannels/userAuthorityReview/DataUserInfo.ajax error:', error);
                        console.log('/authorityMgmt/allChannels/userAuthorityReview/DataUserInfo.ajax results:', results);
                        console.log('/authorityMgmt/allChannels/userAuthorityReview/DataUserInfo.ajax fields:', fields);
                        if (error) {
                            return res.send({error: 1, msg: '操作失败'});
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
                            content.review_time = item.review_time;//复核时间
                            content.update_timestamp = item.update_timestamp;//更新时间
                            content.revise_remark = item.remark;   //驳回备注
                            return content;
                        });
                        resolve(middleArr);
                        // return res.send({error: 0, msg: '获取成功', data: middleArr});
                    });
                }).then(function (middleArr) {
                    return new Promise((resolve, reject) => {
                        let option = {
                            session: req.session,
                            url: apiUrlList.getUserInfo,
                            timeout: 15000,
                            json: true
                        };
                        console.log('/authorityMgmt/allChannels/userAuthorityReview/DataUserInfo.ajax option:', option);
                        request(option, (error, response, body) => {
                            console.log('/authorityMgmt/allChannels/userAuthorityReview/DataUserInfo.ajax error:', error);
                            console.log('/authorityMgmt/allChannels/userAuthorityReview/DataUserInfo.ajax statusCode:', response && response.statusCode);
                            console.log('/authorityMgmt/allChannels/userAuthorityReview/DataUserInfo.ajax body:', body);
                            if (error) {
                                return res.send({error: 1, msg: '操作失败'});
                            }
                            let result = typeof body === 'string' ? JSON.parse(body) : body;
                            if (result.returnCode == 0) {
                                // let apkinds = result.body;
                                let userList = result.body;
                                middleArr.forEach(item => {
                                    for (let userItem of userList) {
                                        if (parseInt(item.userId) === userItem.id) {
                                            item.userIdList = userItem.userId; //获取用户ID
                                            item.userNameList = userItem.name; //获取用户名
                                            break;
                                        } else {
                                            item.userIdList = "";
                                            item.userNameList = "";
                                        }
                                    }
                                });
                                resolve(middleArr)
                                // return res.send({error: 0, msg: '获取成功', data: middleArr});
                            }
                            else if (result && result.returnCode != 9999) {
                                return res.send({error: 1, msg: result.returnMsg});
                            }
                            else {
                                return res.send({error: 1, msg: '获取失败'});
                            }
                        });
                    })
                }).then(function (middleArr) {
                    return new Promise((resolve, reject) => {
                        let option = {
                            session: req.session,
                            url: apiUrlList.getRoleInfo,
                            timeout: 15000,
                            json: true
                        };
                        console.log('/authorityMgmt/allChannels/userAuthorityReview/getRoleInfo.ajax option:', option);
                        request(option, (error, response, body) => {
                            console.log('/authorityMgmt/allChannels/userAuthorityReview/getRoleInfo.ajax error:', error);
                            console.log('/authorityMgmt/allChannels/userAuthorityReview/getRoleInfo.ajax statusCode:', response && response.statusCode);
                            console.log('/authorityMgmt/allChannels/userAuthorityReview/getRoleInfo.ajax body:', body);
                            if (error) {
                                return res.send({error: 1, msg: '操作失败'});
                            }
                            let result = typeof body === 'string' ? JSON.parse(body) : body;
                            if (result.returnCode == 0) {
                                // let roleList = result.body;
                                console.log("middleArr---", middleArr)
                                middleArr.forEach(item => {
                                    let roleArr = [];
                                    console.log("roleList----", item.roleList)
                                    // for (let roleItem of item.roleList) {
                                    // if (item.roleIds.indexOf(roleItem.id)> -1) {
                                    //     item.roleItemName=roleItem.name; //获取用户ID
                                    //     break;
                                    // }
                                    //    roleArr.push(roleItem.name);
                                    // }
                                    item.roleList.forEach(roteItem => {
                                        roleArr.push(roteItem.name);
                                    })
                                    item.roleItemName = roleArr.join(',');
                                });
                                return res.send({error: 0, msg: '获取成功', data: middleArr});
                            }
                            else if (result && result.returnCode != 9999) {
                                return res.send({error: 1, msg: result.returnMsg});
                            }
                            else {
                                return res.send({error: 1, msg: '获取失败'});
                            }
                        });
                    })
                }).catch(function (error) {
                    return res.send({error: 1, msg: '查询失败'});
                })
            }
            // 查询业务数据
            if (paramsStatus.type == "0") {
                console.log(paramsStatus.type)
                // 查询后端业务数据
                let option = {
                    session: req.session,
                    url: apiUrlList.getUserInfo,
                    // body: params,
                    timeout: 15000,
                    json: true
                };
                console.log('/authorityMgmt/allChannels/userAuthorityReview/DataUserInfo.ajax option:', option);
                request.get(option, (error, response, body) => {
                    console.log('/authorityMgmt/allChannels/userAuthorityReview/DataUserInfo.ajax error:', error);
                    console.log('/authorityMgmt/allChannels/userAuthorityReview/DataUserInfo.ajax statusCode:', response && response.statusCode);
                    console.log('/authorityMgmt/allChannels/userAuthorityReview/DataUserInfo.ajax body:', body);
                    if (error) {
                        return res.send({
                            error: 1,
                            msg: '查询失败'
                        });
                    }
                    let result = typeof body === 'string' ? JSON.parse(body) : body;
                    if (result && result.returnCode == '0') {
                        let resultData = {};
                        let distributedUser = [];
                        let unDistributedUser = [];
                        result.body.forEach((item) => {
                            item.check = false;
                            if (item.roleList.length === 0) {
                                unDistributedUser.push(item);
                            }
                            else {
                                let roleArr = [];
                                item.roleList.forEach((item) => {
                                    roleArr.push(item.name);
                                });
                                item.distributedRole = roleArr.join(',');
                                distributedUser.push(item);
                            }
                        });
                        resultData.distributedUser = distributedUser;
                        console.log("distributedUser", distributedUser)
                        resultData.unDistributedUser = unDistributedUser;
                        resultData.bodyData = result.body
                        return res.send({error: 0, msg: '查询成功', data: resultData});
                    }
                    else if (result && result.returnCode != 9999) {
                        return res.send({error: 1, msg: result.returnMsg});
                    }
                    else {
                        return res.send({error: 1, msg: '查询失败'});
                    }
                });

            }
        }
    );

//Mysql和业务接口复核通过执行更新和删除数据;
    app.post('/authorityMgmt/allChannels/userAuthorityReview/reviewPass.ajax', (req, res, next) => {
        //Mysql复核通过
        let paramsStatus = {};
        paramsStatus.type = req.body.type; //传过来的状态数值
        let mysqlId = req.body.myqsql //获取传过来数据库表字段的id
        let deleteFlag = req.body.delete_flag
        let updateTime = req.body.updateTime //修改时间
        let reviewer = req.session.loginInfo.userid
        let operate = req.body.operate  //操作状态
        let operator = req.body.operator
        // if (reviewer === operator) {
        //     return res.send({error: 1, msg: '禁止复核自己提交的申请', data: null});
        // }
        if (req.body.operator === req.session.loginInfo.userid && !req.session.loginInfo.isAdmin) {
            return res.send({error: 1, msg: '禁止复核自己提交的申请', data: null});
        }
        // 检查该条数据是否存在
        let checkHasSubmit = new Promise((resolve, reject) => {
            let SQL = `SELECT * FROM ${tableName} WHERE local_id=${mysqlId} AND update_timestamp='${updateTime}'`;
            console.log("-----", SQL)
            console.log('/authorityMgmt/allChannels/userAuthorityReview/reviewPass.ajax run check SQL: ', SQL);
            pool.query(SQL, function (error, results) {
                console.log('/authorityMgmt/allChannels/userAuthorityReview/reviewPass.ajax run check SQL error: ', error);
                console.log('/authorityMgmt/allChannels/userAuthorityReview/reviewPass.ajax run check SQL results: ', results);
                if (error) {
                    reject({message: '检查该条数据是否已被审核SQL语句失败'});
                }
                resolve(Array.from(results).length);
                console.log("*********", results)
            });
        });

        // 操作服务端数据
        let operateService = function (item) {
            let params = {};
            params.id = req.body.id;

            params.userIds =JSON.parse(req.body.userIds) ;
            params.roleIds =JSON.parse(req.body.roleIds);
            params.operator = req.body.operator;
            params.checker = req.session.loginInfo.userid

            let reviewers = req.session.loginInfo.userid//复核人
            let reviewerTime = req.body.reviewerTime//复核时间
            console.log("修改数据:",params)
            return new Promise((resolve, reject) => {
                if (operate == 2) {
                    let option = {
                        session: req.session,
                        url: apiUrlList.distributeRole,
                        body: params,
                        timeout: 15000,
                        json: true
                    };
                    console.log('/authorityMgmt/allChannels/userAuthorityReview/reviewPass.ajax option:', option);
                    request.post(option, (error, response, body) => {
                        console.log('/authorityMgmt/allChannels/userAuthorityReview/reviewPass.ajax error:', error);
                        console.log('/authorityMgmt/allChannels/userAuthorityReview/reviewPass.ajax statusCode:', response && response.statusCode);
                        console.log('/authorityMgmt/allChannels/userAuthorityReview/reviewPass.ajax body:', body);
                        if (error) {
                            reject({message: '调用服务端数据失败'});
                        }

                        // let result = typeof body === 'string' ? JSON.parse(body) : body;
                        if (body && body.returnCode == 0) {
                            resolve();
                        }
                        else if (body.returnCode != 0 && body.returnCode != 9999) {
                            reject({message: body.returnMsg});
                        }
                        else {
                            reject({message: '调用服务端数据失败'});
                        }

                    })
                }
                else if (operate == 3) {
                    let params = {};
                    req.body.serialno && (params.serialno = req.body.serialno);
                    let option = {
                        session: req.session,
                        url: apiUrlList.deleteUserRole,
                        body:JSON.parse(req.body.userIds),
                        timeout: 15000,
                        json: true
                    };
                    console.log('/authorityMgmt/allChannels/userAuthorityReview/reviewPass.ajax option:', option);
                    request.del(option, (error, response, body) => {
                        console.log('/authorityMgmt/allChannels/userAuthorityReview/reviewPass.ajax error:', error);
                        console.log('/authorityMgmt/allChannels/userAuthorityReview/reviewPass.ajax statusCode:', response && response.statusCode);
                        console.log('/authorityMgmt/allChannels/userAuthorityReview/reviewPass.ajax body:', body);
                        if (error) {
                            reject({message: '调用服务端数据失败'});
                        }
                        // let result = typeof body == 'string' ? JSON.parse(body) : body;
                        if (body && body.returnCode == 0) {
                            resolve();
                        }
                        else if (body.returnCode != 0 && body.returnCode != 9999) {
                            reject({message: body.returnMsg});
                        }
                        else {
                            reject({message: '调用服务端数据失败'});
                        }
                    });
                }

            }).then(function () {    //本地数据库
                return new Promise((resolve, reject) => {

                    let sql = `UPDATE ${tableName} SET status=0,reviewer='${reviewers}',review_time='${reviewerTime}' WHERE local_id=${mysqlId}`;
                    console.log('/authorityMgmt/allChannels/userAuthorityReview/reviewPass.ajax run business sql:', sql);
                    pool.query(sql, function (error, results) {
                        console.log('/authorityMgmt/allChannels/userAuthorityReview/reviewPass.ajax run business sql error:', error);
                        console.log('/authorityMgmt/allChannels/userAuthorityReview/reviewPass.ajax run business sql results:', results);
                        if (error) {
                            reject({message: '操作本地数据库出错，请核对校验本地数据'});
                        }
                        console.log("------", results)
                        resolve();

                    });
                });
            })
        };

        checkHasSubmit.then(hasSubmit => {
            if (hasSubmit === 0) {
                return res.send({error: 1, msg: '数据不存在', data: null});
            }
            operateService(req.body).then(() => {
                res.send({error: 0, msg: '复核成功', data: null});
            }).catch(error => {
                res.send({error: 1, msg: error.message, data: null});
            });
        }).catch(error => {
            res.send({error: 1, msg: error.message, data: null});
        });
    })
//Mysql和业务接口复核通过执行保存数据;
    app.post('/authorityMgmt/allChannels/userAuthorityReview/SavePass.ajax', (req, res, next) => {
        //Mysql复核通过
        let paramsStatus = {};
        paramsStatus.type = req.body.type; //传过来的状态数值
        let mysqlId = req.body.myqsql //获取传过来数据库表字段的id
        let deleteFlag = req.body.delete_flag
        let updateTime = req.body.updateTime //修改时间
        console.log("登录信息:", req.session.loginInfo.userid)
        let reviewer = req.session.loginInfo.userid
        let operate = req.body.operate  //操作状态
        let operator = req.body.operator
        // if (reviewer === operator) {
        //     return res.send({error: 1, msg: '禁止复核自己提交的申请', data: null});
        // }
        if (req.body.operator === req.session.loginInfo.userid && !req.session.loginInfo.isAdmin) {
            return res.send({error: 1, msg: '禁止复核自己提交的申请', data: null});
        }
        // 检查该条数据是否存在
        let checkHasSubmit = new Promise((resolve, reject) => {
            let SQL = `SELECT * FROM ${tableName} WHERE local_id=${mysqlId} AND update_timestamp='${updateTime}'`;
            console.log("666-----", SQL)
            console.log('/authorityMgmt/allChannels/userAuthorityReview/SavePass.ajax run check SQL: ', SQL);
            pool.query(SQL, function (error, results) {
                console.log('/authorityMgmt/allChannels/userAuthorityReview/SavePass.ajax run check SQL error: ', error);
                console.log('/authorityMgmt/allChannels/userAuthorityReview/SavePass.ajax run check SQL results: ', results);
                if (error) {
                    reject({message: '检查该条数据是否已被审核SQL语句失败'});
                }
                resolve(Array.from(results).length);
                console.log("*********", results)
            });
        });


        // 操作服务端数据
        let operateService = function (item) {
            let params = {};
            // params.id = req.body.id;
            params.userIds =JSON.parse(req.body.userIds) ;
            params.roleIds =JSON.parse(req.body.roleIds);

            params.operator = req.body.operator;
            params.checker = req.session.loginInfo.userid
            let reviewers = req.session.loginInfo.userid;
            let reviewerTime = req.body.reviewerTime//复核时间
            console.log("新增数据---",params)
            return new Promise((resolve, reject) => {
                if (operate == 1) {
                    let option = {
                        session: req.session,
                        url: apiUrlList.distributeRole,
                        body: params,
                        timeout: 15000,
                        json: true
                    };
                    console.log('/authorityMgmt/allChannels/userAuthorityReview/SavePass.ajax option:', option);
                    request.post(option, (error, response, body) => {
                        console.log('/authorityMgmt/allChannels/userAuthorityReview/SavePass.ajax error:', error);
                        console.log('/authorityMgmt/allChannels/userAuthorityReview/SavePass.ajax statusCode:', response && response.statusCode);
                        console.log('/authorityMgmt/allChannels/userAuthorityReview/SavePass.ajax body:', body);
                        if (error) {
                            reject({message: '调用服务端数据失败'});
                        }
                        if (body && body.returnCode == 0) {
                            resolve();
                        }
                        else if (body.returnCode != 0 && body.returnCode != 9999) {
                            reject({message: body.returnMsg});
                        }
                        else {
                            reject({message: '调用服务端数据失败'});
                        }


                    })
                }
            }).then(function () {
                return new Promise((resolve, reject) => {
                    let sql = `UPDATE ${tableName} SET status=0,reviewer='${reviewers}',review_time='${reviewerTime}' WHERE local_id=${mysqlId}`;
                    console.log('/authorityMgmt/allChannels/userAuthorityReview/SavePass.ajax run business sql:', sql);
                    pool.query(sql, function (error, results) {
                        console.log('/authorityMgmt/allChannels/userAuthorityReview/SavePass.ajax run business sql error:', error);
                        console.log('/authorityMgmt/allChannels/userAuthorityReview/SavePass.ajax run business sql results:', results);
                        if (error) {
                            reject({message: '操作本地数据库出错，请核对校验本地数据'});
                        }
                        console.log("------", results)
                        resolve();

                    });
                });
            })

        }

        checkHasSubmit.then(hasSubmit => {
            if (hasSubmit === 0) {
                return res.send({error: 1, msg: '数据不存在', data: null});
            }
            operateService(req.body).then(() => {
                res.send({error: 0, msg: '复核成功', data: null});
            }).catch(error => {
                res.send({error: 1, msg: error.message, data: null});
            });
        }).catch(error => {
            res.send({error: 1, msg: error.message, data: null});
        });
    });

//Mysql审核驳回;
    app.post('/authorityMgmt/allChannels/userAuthorityReview/reviewReject.ajax', (req, res, next) => {

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
            return res.send({error: 1, msg: '禁止复核自己提交的申请', data: null});
        }
        if (paramsStatus.type == "1") {
            let SQL = `UPDATE ${tableName} SET status=9,remark='${req.body.revise_remark}' WHERE local_id=${mysqlId} AND update_timestamp='${req.body.update_timestamp}'`;
            console.log('/authorityMgmt/allChannels/userAuthorityReview/reviewReject.ajax run business SQL:', SQL);
            pool.query(SQL, function (error, results) {
                console.log('/authorityMgmt/allChannels/userAuthorityReview/reviewReject.ajax run business SQL error:', error);
                console.log('/authorityMgmt/allChannels/userAuthorityReview/reviewReject.ajax run business SQL results:', results);
                if (error) {
                    return res.send({error: 1, msg: error.message, data: null});
                }
                if (results.changedRows) {
                    res.send({error: 0, msg: '驳回成功', data: null});
                }
                else {
                    res.send({error: 1, msg: '数据不存在或已更新,请刷新页面', data: null});
                }
            });

        }
    });

//获取角色数据
    app.post('/authorityMgmt/allChannels/userAuthorityReview/getUserInfo.ajax', (req, res, next) => {
        let option = {
            session: req.session,
            url: apiUrlList.getUserInfo,
            timeout: 15000,
            json: true
        };
        console.log('/authorityMgmt/allChannels/userAuthorityReview/getUserInfo.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/authorityMgmt/allChannels/userAuthorityReview/getUserInfo.ajax error:', error);
            console.log('/authorityMgmt/allChannels/userAuthorityReview/getUserInfo.ajax statusCode:', response && response.statusCode);
            console.log('/authorityMgmt/allChannels/userAuthorityReview/getUserInfo.ajax body:', body);
            if (error) {
                console.log('error:', error);
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body == 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode === 0 && Array.isArray(result.body)) {
                let resultData = {};
                let distributedUser = [];
                let unDistributedUser = [];
                result.body.forEach((item) => {
                    item.check = false;
                    if (item.roleList.length === 0) {
                        unDistributedUser.push(item);
                    }
                    else {
                        let roleArr = [];
                        item.roleList.forEach((item) => {
                            roleArr.push(item.name);
                        });
                        item.distributedRole = roleArr.join('，');
                        distributedUser.push(item);
                    }
                });
                resultData.distributedUser = distributedUser;
                resultData.unDistributedUser = unDistributedUser;
                resultData.bodyDate = result.body
                res.send({error: 0, msg: '获取用户数据成功', data: resultData});
            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: 1, msg: '获取用户数据失败'});
            }
        });
    });

};