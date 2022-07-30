const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').allChannels.userAuthorityHandle;
const tableName = 'am_all_userauthority';

module.exports = function (app) {
//查询列表数据
    app.post('/authorityMgmt/allChannels/userAuthorityHandle/DataUserInfo.ajax', (req, res, next) => {
            let paramsStatus = {};
            paramsStatus.type = req.body.type;
            let reviewStatus = req.body.reviewStatus; //复核状态值
            // 查询本地数据库
            if (paramsStatus.type == "1") {
                let sql = `SELECT content,local_id,status,delete_flag,operate,operator,creator,reviewer,review_time,update_timestamp,remark FROM ${tableName} WHERE delete_flag='F' AND creator='${req.session.loginInfo.userid}'`;
                if (req.body.reviewStatus) {
                    sql += ` AND status='${req.body.reviewStatus}'`;
                }
                if (parseInt(req.body.userId)) {
                    sql += ` AND JSON_EXTRACT(content, '$.userId')=${req.body.userId}`;
                }
                sql += ' ORDER BY update_timestamp DESC';
                new Promise(function (resolve, reject) {
                    console.log('/authorityMgmt/allChannels/userAuthorityHandle/DataUserInfo.ajax sql:', sql);
                    pool.query(sql, function (error, results, fields) {
                        console.log('/authorityMgmt/allChannels/userAuthorityHandle/DataUserInfo.ajax error:', error);
                        console.log('/authorityMgmt/allChannels/userAuthorityHandle/DataUserInfo.ajax results:', results);
                        console.log('/authorityMgmt/allChannels/userAuthorityHandle/DataUserInfo.ajax fields:', fields);
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
                        console.log('/authorityMgmt/allChannels/userAuthorityHandle/DataUserInfo.ajax option:', option);
                        request(option, (error, response, body) => {
                            console.log('/authorityMgmt/allChannels/userAuthorityHandle/DataUserInfo.ajax error:', error);
                            console.log('/authorityMgmt/allChannels/userAuthorityHandle/DataUserInfo.ajax statusCode:', response && response.statusCode);
                            console.log('/authorityMgmt/allChannels/userAuthorityHandle/DataUserInfo.ajax body:', body);
                            if (error) {
                                return res.send({error: 1, msg: '操作失败'});
                            }
                            let result = typeof body === 'string' ? JSON.parse(body) : body;
                            if (result.returnCode == 0) {
                                // let apkinds = result.body;
                                let userList = result.body;
                                middleArr.forEach(item => {
                                    for (let userItem of userList) {
                                        if (parseInt(item.userId) ===userItem.id) {
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
                        console.log('/authorityMgmt/allChannels/userAuthorityHandle/getRoleInfo.ajax option:', option);
                        request(option, (error, response, body) => {
                            console.log('/authorityMgmt/allChannels/userAuthorityHandle/getRoleInfo.ajax error:', error);
                            console.log('/authorityMgmt/allChannels/userAuthorityHandle/getRoleInfo.ajax statusCode:', response && response.statusCode);
                            console.log('/authorityMgmt/allChannels/userAuthorityHandle/getRoleInfo.ajax body:', body);
                            if (error) {
                                return res.send({error: 1, msg: '操作失败'});
                            }
                            let result = typeof body === 'string' ? JSON.parse(body) : body;
                            if (result.returnCode == 0) {
                                // let roleList = result.body;
                                console.log("middleArr---",middleArr)
                                middleArr.forEach(item => {
                                    let roleArr = [];
                                    console.log("roleList----",item.roleList)
                                    // for (let roleItem of item.roleList) {
                                        // if (item.roleIds.indexOf(roleItem.id)> -1) {
                                        //     item.roleItemName=roleItem.name; //获取用户ID
                                        //     break;
                                        // }
                                        //    roleArr.push(roleItem.name);
                                    // }
                                    item.roleList.forEach(roteItem=>{
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
                console.log('/authorityMgmt/allChannels/userAuthorityHandle/DataUserInfo.ajax option:', option);
                request.get(option, (error, response, body) => {
                    console.log('/authorityMgmt/allChannels/userAuthorityHandle/DataUserInfo.ajax error:', error);
                    console.log('/authorityMgmt/allChannels/userAuthorityHandle/DataUserInfo.ajax statusCode:', response && response.statusCode);
                    console.log('/authorityMgmt/allChannels/userAuthorityHandle/DataUserInfo.ajax body:', body);
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
                        resultData.bodyData=result.body
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

//添加按钮分配权限数据;
    app.post('/authorityMgmt/allChannels/userAuthorityHandle/saveParam.ajax', (req, res, next) => {
        // 由我经办增加保存
        let paramsStatus = {};
        paramsStatus.type = req.body.type;   //传过来的状态数值
        // let params = {};

        // params.id = req.body.id;

        let params = {
            // userIds: req.body.userIds ? JSON.parse(req.body.userIds) : [],
            // roleIds: req.body.roleIds ? JSON.parse(req.body.roleIds) : []
            // userIds: req.body.userIds ?req.body.userIds : [],
            // roleIds: req.body.roleIds ?req.body.roleIds : []
        };
        let content = JSON.parse(req.body.userIds);
        let operator = req.body.operator;
        let roleIds = req.body.roleIds;
        let roleList =JSON.parse(req.body.roleList);
        roleList.forEach(item=>{
            item.menuList=JSON.parse(item.menuList)
        })
        console.log("roleList--",roleList)
        let contentArr = content.map((userId) => {
            let obj = {};
            obj.userId =userId;
            obj.operator =operator;
            obj.roleIds =roleIds;
            obj.roleList =roleList;
            return JSON.stringify(obj);
        });
        console.log("contentArr:", contentArr)
        let operatorName = req.session.loginInfo.userid //操作人

        let valueStr =contentArr.map(contentStr => {
            return `('${contentStr}','${operatorName}','${operatorName}','F',1,2)`;
        }).join(",");

        // params.operator = req.body.operator;
        // params = JSON.stringify(params)
        // console.log("获得数据--",params)
        if (paramsStatus.type == "1") {
            // var sql = `insert into ${tableName} set ?,delete_flag="F",creator='${operatorName}',operator='${operatorName}',operate=1,comment=1,status="2"`;
            let sql = `INSERT INTO ${tableName} (content,creator,operator,delete_flag,operate,status) VALUES ${valueStr}`;
            console.log('/authorityMgmt/allChannels/userAuthorityHandle/saveParam.ajax sql:', sql);
            pool.query(sql,function (error, results, fields) {
                console.log('/authorityMgmt/allChannels/userAuthorityHandle/saveParam.ajax error:', error);
                console.log('/authorityMgmt/allChannels/userAuthorityHandle/saveParam.ajax results:', results);
                console.log('/authorityMgmt/allChannels/userAuthorityHandle/saveParam.ajax fields:', fields);
                if (error) {
                    return res.send({error: 1, msg: '保存失败'});
                }
                return res.send({error: 0, msg: '保存成功', data: results});
            });
        }
    });

//修改业务数据存到经办数据库中;
    app.post('/authorityMgmt/allChannels/userAuthorityHandle/serviceSave.ajax', (req, res, next) => {
        //修改本地Mysql参数
        let paramsStatus = {};
        paramsStatus.type = req.body.type; //传过来的状态数值
        let operate = req.body.operate     //操作类型
        //经办现有折扣修改业务产品参数
        if (paramsStatus.type == "0") {
            let oneId = req.body.oneId
            let params = {};
            // 参数
            params.userId = JSON.parse(req.body.userIds);
            params.roleIds = req.body.roleIds;
            params.roleList = req.body.roleList;
            params.operator = req.body.operator;
            var updateTime = req.body.updateTime  //获取修改的时间
            let operatorName = req.session.loginInfo.userid //操作人

            // id不同则新增
            // if (oneId != params.id) {
            params = JSON.stringify(params)
            console.log("业务数据",params)
            var sql = `insert into ${tableName} set ?,delete_flag="F",service_id='${req.body.userIds}',creator='${operatorName}',operator='${operatorName}',operate=2,status="2"`;
            console.log('/authorityMgmt/allChannels/userAuthorityHandle/serviceSave.ajax sql:', sql);
            console.log('/authorityMgmt/allChannels/userAuthorityHandle/serviceSave.ajax params:', params);
            pool.query(sql, {content: params}, function (error, results, fields) {
                console.log('/authorityMgmt/allChannels/userAuthorityHandle/serviceSave.ajax error:', error);
                console.log('/authorityMgmt/allChannels/userAuthorityHandle/serviceSave.ajax results:', results);
                console.log('/authorityMgmt/allChannels/userAuthorityHandle/serviceSave.ajax fields:', fields);
                if (error) {
                    return res.send({error: 1, msg: '保存失败'});
                }
                return res.send({error: 0, msg: '已提交至经办数据', data: results});
            });


        }
    });
//删除业务数据存到本地数据库中;
    app.post('/authorityMgmt/allChannels/userAuthorityHandle/deleteParam.ajax', (req, res, next) => {
        // 删除本地数据-软删除
        let paramsStatus = {};
        paramsStatus.type = req.body.type; //传过来的状态数值
        var operate = req.body.operate
        if (paramsStatus.type == "0") {
            let oneId = req.body.oneId
            let params = {};
            // 参数
            params.userId = JSON.parse(req.body.userIds);
            params.roleIds = req.body.roleIds;
            params.roleList = req.body.roleList;
            params.operator = req.body.operator;
            let operatorName = req.session.loginInfo.userid //操作人
            // id不同则新增
            // if (oneId != params.id) {
            params = JSON.stringify(params)
            var sql = `insert into ${tableName} set ?,delete_flag="F",service_id='${req.body.userIds}',creator='${operatorName}',operator='${operatorName}',operate=3,status="2"`;
            console.log('/authorityMgmt/allChannels/userAuthorityHandle/deleteParam.ajax sql:', sql);
            console.log('/authorityMgmt/allChannels/userAuthorityHandle/deleteParam.ajax params:', params);
            pool.query(sql, {content: params}, function (error, results, fields) {
                console.log('/authorityMgmt/allChannels/userAuthorityHandle/deleteParam.ajax error:', error);
                console.log('/authorityMgmt/allChannels/userAuthorityHandle/deleteParam.ajax results:', results);
                console.log('/authorityMgmt/allChannels/userAuthorityHandle/deleteParam.ajax fields:', fields);
                if (error) {
                    return res.send({error: 1, msg: '保存失败'});
                }
                return res.send({error: 0, msg: '已提交至经办数据', data: results});
            });
        }

        // }
    });

//修改本地数据;
    app.post('/authorityMgmt/allChannels/userAuthorityHandle/localRevise.ajax', (req, res, next) => {
        //修改本地Mysql参数
        let paramsStatus = {};
        paramsStatus.type = req.body.type; //传过来的状态数值
        let operate = req.body.operate     //操作类型
        if (paramsStatus.type == "1") {
            let mysqlId = req.body.mysqlId //获取传过来数据库表字段的id
            // 业务产品参数
            let params = {};
            params.userId = JSON.parse(req.body.userIds);
            params.roleIds =req.body.roleIds;
            params.roleList = req.body.roleList;
            params.operator = req.body.operator;

            let operatorName = req.session.loginInfo.userid //操作人
            var updateTime = req.body.updateTime  //获取修改的时间
            params = JSON.stringify(params)
            if (operate == '1') {
                var sql = `UPDATE ${tableName} SET content=?,service_id='${req.body.userIds}',status='2',operate='1',operator='${operatorName}',update_timestamp='${updateTime}' where local_id='${mysqlId}'`;
            } else if (operate == '2') {
                var sql = `UPDATE ${tableName} SET content=?,service_id='${req.body.userIds}',status='2',operate='2',operator='${operatorName}',update_timestamp='${updateTime}' where local_id='${mysqlId}'`;
            } else if (operate == '3') {
                var sql = `UPDATE ${tableName} SET content=?,service_id='${req.body.userIds}',status='2',operate='3',operator='${operatorName}',update_timestamp='${updateTime}' where local_id='${mysqlId}'`;
            }
            console.log('/authorityMgmt/allChannels/userAuthorityHandle/localRevise.ajax sql:', sql);
            console.log('/authorityMgmt/allChannels/userAuthorityHandle/localRevise.ajax params:', params);
            pool.query(sql, [params], function (error, results, fields) {
                console.log('/authorityMgmt/allChannels/userAuthorityHandle/localRevise.ajax error:', error);
                console.log('/authorityMgmt/allChannels/userAuthorityHandle/localRevise.ajax results:', results);
                console.log('/authorityMgmt/allChannels/userAuthorityHandle/localRevise.ajax fields:', fields);
                if (error) {
                    return res.send({error: 1, msg: '修改失败'});
                }
                return res.send({error: 0, msg: '修改成功', data: results});
            });
        }
    });

//撤销本地数据
    app.post('/authorityMgmt/allChannels/userAuthorityHandle/deleteLocal.ajax', (req, res, next) => {
        // 撤销本地数据-软删除
        let paramsStatus = {};
        paramsStatus.type = req.body.type; //传过来的状态数值
        var operate = req.body.operate
        if (paramsStatus.type == "1") {
            let mysqlId = req.body.mysqlId //获取传过来数据库表字段的id

            let params = {};
            params.userId = JSON.parse(req.body.userIds);
            params.roleIds =req.body.roleIds;
            params.roleList = req.body.roleList;
            params.operator = req.body.operator;

            let operatorName = req.session.loginInfo.userid //操作人
            params = JSON.stringify(params)
            console.log("撤销数据",mysqlId)
            console.log("撤销数据",params)
            // if(operate=='1'){
            //     var sql = "UPDATE bm_bpc_quota SET delete_flag='T',operate=1,status='1' where id=?";
            // }else if (operate=='2'){
            //     var sql = "UPDATE bm_bpc_quota SET delete_flag='T',operate=2,status='1' where id=?";
            // }else if (operate=='3'){
            //     var sql = "UPDATE bm_bpc_quota SET delete_flag='T',operate=3,status='1' where id=?";
            // }
            var sql = `UPDATE ${tableName} SET delete_flag='T',operate=3,status='1',operator='${operatorName}' where local_id=?`;
            console.log('/authorityMgmt/allChannels/userAuthorityHandle/deleteLocal.ajax sql:', sql);
            console.log('/authorityMgmt/allChannels/userAuthorityHandle/deleteLocal.ajax params:', params);
            pool.query(sql, [mysqlId], function (error, results, fields) {
                console.log('/authorityMgmt/allChannels/userAuthorityHandle/deleteLocal.ajax error:', error);
                console.log('/authorityMgmt/allChannels/userAuthorityHandle/deleteLocal.ajax results:', results);
                console.log('/authorityMgmt/allChannels/userAuthorityHandle/deleteLocal.ajax fields:', fields);
                if (error) {
                    return res.send({error: 1, msg: '撤销失败'});
                }
                return res.send({error: 0, msg: '撤销成功', data: results});
            });
        }
    });

//重新提删除操作数据
    app.post('/authorityMgmt/allChannels/userAuthorityHandle/deleteAgain.ajax', (req, res, next) => {
        let paramsStatus = {};
        paramsStatus.type = req.body.type; //传过来的状态数值
        var operate = req.body.operate
        if (paramsStatus.type == "1") {
            let mysqlId = req.body.mysqlId //获取传过来数据库表字段的id

            let params = {};

            params.userId = JSON.parse(req.body.userIds);
            params.roleIds =req.body.roleIds;
            params.roleList = req.body.roleList;
            params.operator = req.body.operator;

            req.body.operator = req.body.operator;
            let operatorName = req.session.loginInfo.userid //操作人
            params = JSON.stringify(params)
            // if(operate=='1'){
            //     var sql = "UPDATE bm_bpc_quota SET delete_flag='T',operate=1,status='1' where id=?";
            // }else if (operate=='2'){
            //     var sql = "UPDATE bm_bpc_quota SET delete_flag='T',operate=2,status='1' where id=?";
            // }else if (operate=='3'){
            //     var sql = "UPDATE bm_bpc_quota SET delete_flag='T',operate=3,status='1' where id=?";
            // }
            var sql = `UPDATE ${tableName} SET delete_flag='F',operate=3,status='2',operator='${operatorName}' where local_id=?`;
            console.log('/authorityMgmt/allChannels/userAuthorityHandle/deleteAgain.ajax sql:', sql);
            console.log('/authorityMgmt/allChannels/userAuthorityHandle/deleteAgain.ajax params:', params);
            pool.query(sql, [mysqlId], function (error, results, fields) {
                console.log('/authorityMgmt/allChannels/userAuthorityHandle/deleteAgain.ajax error:', error);
                console.log('/authorityMgmt/allChannels/userAuthorityHandle/deleteAgain.ajax results:', results);
                console.log('/authorityMgmt/allChannels/userAuthorityHandle/deleteAgain.ajax fields:', fields);
                if (error) {
                    return res.send({error: 1, msg: '提交失败'});
                }
                return res.send({error: 0, msg: '提交成功', data: results});
            });
        }
    });


//提交数据操作;
    app.post('/authorityMgmt/allChannels/userAuthorityHandle/deleteAgain.ajax', (req, res, next) => {
        //由我经办修改本地Mysql参数
        let paramsStatus = {};
        paramsStatus.type = req.body.type; //传过来的状态数值
        var operate = req.body.operate
        if (paramsStatus.type == "1" && operate == '2') {
            let mysqlId = req.body.myqsql //获取传过来数据库表字段的id
            // 业务产品参数
            let params = {};
            req.body.id && (params.id = req.body.id);
            params.serialno = req.body.serialno;
            params.groupid = req.body.groupid;
            params.actionType = req.body.actionType;
            params.startDate = req.body.startDate;
            params.startTime = req.body.startTime;
            params.endDate = req.body.endDate;
            params.endTime = req.body.endTime;
            req.body.operator && (params.operator = req.body.operator);

            var updateTime = req.body.updateTime  //获取修改的时间
            params = JSON.stringify(params)
            var sql = `UPDATE ${tableName} SET content=?,status='2',operate='2',delete_flag='F',update_timestamp=? where id=?`;
            console.log('/businessMgmt/businessParamConfig/quotaHandle/submitCheck.ajax sql:', sql);
            console.log('/businessMgmt/businessParamConfig/quotaHandle/submitCheck.ajax params:', params);
            pool.query(sql, [params, updateTime, mysqlId], function (error, results, fields) {
                console.log('/businessMgmt/combinationProductConfig/productTradeHandle/submitCheck.ajax error:', error);
                console.log('/businessMgmt/combinationProductConfig/productTradeHandle/submitCheck.ajax results:', results);
                console.log('/businessMgmt/combinationProductConfig/productTradeHandle/submitCheck.ajax fields:', fields);
                if (error) {
                    return res.send({error: 1, msg: '提交失败'});
                }
                return res.send({error: 0, msg: '提交成功', data: results});
            });
        }
        if (paramsStatus.type == "1" && operate == '1') {
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

            var updateTime = req.body.updateTime  //获取修改的时间
            params = JSON.stringify(params)
            var sql = `UPDATE ${tableName} SET content=?,status='2',operate='1',delete_flag='F',update_timestamp=? where id=?`;
            console.log('/businessMgmt/combinationProductConfig/productTradeHandle/submitCheck.ajax sql:', sql);
            console.log('/businessMgmt/combinationProductConfig/productTradeHandle/submitCheck.ajax params:', params);
            pool.query(sql, [params, updateTime, mysqlId], function (error, results, fields) {
                console.log('/businessMgmt/combinationProductConfig/productTradeHandle/submitCheck.ajax error:', error);
                console.log('/businessMgmt/combinationProductConfig/productTradeHandle/submitCheck.ajax results:', results);
                console.log('/businessMgmt/combinationProductConfig/productTradeHandle/submitCheck.ajax fields:', fields);
                if (error) {
                    return res.send({error: 1, msg: '提交失败'});
                }
                return res.send({error: 0, msg: '提交成功', data: results});
            });
        }
        if (paramsStatus.type == "1" && operate == '3') {
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

            var updateTime = req.body.updateTime  //获取修改的时间
            params = JSON.stringify(params)
            var sql = "UPDATE cs_ticket SET delete_flag='T',operate='3',status='2',update_timestamp=? where id=?";
            console.log('/businessMgmt/businessParamConfig/quotaHandle/submitCheck.ajax sql:', sql);
            console.log('/businessMgmt/businessParamConfig/quotaHandle/submitCheck.ajax params:', params);
            pool.query(sql, [updateTime, mysqlId], function (error, results, fields) {
                console.log('/businessMgmt/businessParamConfig/quotaHandle/submitCheck.ajax error:', error);
                console.log('/businessMgmt/businessParamConfig/quotaHandle/submitCheck.ajax results:', results);
                console.log('/businessMgmt/businessParamConfig/quotaHandle/submitCheck.ajax fields:', fields);
                if (error) {
                    return res.send({error: 1, msg: '提交失败'});
                }
                return res.send({error: 0, msg: '提交成功', data: results});
            });
        }
    });


// 获取用户信息
    app.post('/authorityMgmt/allChannels/userAuthorityHandle/userName.ajax', (req, res, next) => {
        let operator = req.session.loginInfo.userid
        return res.send({error: 0, msg: '成功', data: operator});
    });
//获取角色数据
    app.post('/authorityMgmt/allChannels/userAuthorityHandle/getRoleInfo.ajax', (req, res, next) => {
        let option = {
            session: req.session,
            url: apiUrlList.getRoleInfo,
            timeout: 15000,
            json: true
        };
        console.log('/authorityMgmt/allChannels/userAuthorityHandle/getRoleInfo.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/authorityMgmt/allChannels/userAuthorityHandle/getRoleInfo.ajax error:', error);
            console.log('/authorityMgmt/allChannels/userAuthorityHandle/getRoleInfo.ajax statusCode:', response && response.statusCode);
            console.log('/authorityMgmt/allChannels/userAuthorityHandle/getRoleInfo.ajax body:', body);
            if (error) {
                console.log('error:', error);
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body == 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode === 0 && Array.isArray(result.body)) {
                let resultData = result.body;
                console.log("--resultData--",resultData)
                resultData.forEach((item) => {
                    item.check = false;
                });
                res.send({error: 0, msg: '获取角色数据成功', data: resultData});
            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: 1, msg: '获取角色数据失败', data: []});
            }
        });
    });
//获取用户角色数据
    app.post('/authorityMgmt/allChannels/userAuthorityHandle/getUserInfo.ajax', (req, res, next) => {
        let option = {
            session: req.session,
            url: apiUrlList.getUserInfo,
            timeout: 15000,
            json: true
        };
        console.log('/authorityMgmt/allChannels/userAuthorityHandle/getUserInfo.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/authorityMgmt/allChannels/userAuthorityHandle/getUserInfo.ajax error:', error);
            console.log('/authorityMgmt/allChannels/userAuthorityHandle/getUserInfo.ajax statusCode:', response && response.statusCode);
            console.log('/authorityMgmt/allChannels/userAuthorityHandle/getUserInfo.ajax body:', body);
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
                resultData.bodyDate=result.body
                res.send({error: 0, msg: '获取用户数据成功', data: resultData});
            }
            else if(result && result.returnCode != 9999){
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: 1, msg: '获取用户数据失败'});
            }
        });
    });
//查看角色url
    app.post('/authorityMgmt/allChannels/userAuthorityHandle/checkTree.ajax', (req, res, next) => {
        let option = {
            session: req.session,
            url: apiUrlList.getMenuData,
            json: true,
            timeout: 15000
        };
        console.log('/authorityMgmt/allChannels/userAuthorityHandle/checkTree.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/authorityMgmt/allChannels/userAuthorityHandle/checkTree.ajax error:', error);
            console.log('/authorityMgmt/allChannels/userAuthorityHandle/checkTree.ajax statusCode:', response && response.statusCode);
            console.log('/authorityMgmt/allChannels/userAuthorityHandle/checkTree.ajax body:', body);
            if (error) {
                console.log('error:', error);
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body == 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0 && Array.isArray(result.body)) {
                let menuList = req.body.menuList ? Array.from(new Set(JSON.parse(req.body.menuList))) : [];
                let treeNodeUrls = formatNodes(result.body);
                setCheckedNode(menuList, treeNodeUrls);
                let treeData = makeTree(treeNodeUrls);
                res.send({error: 0, msg: '调用成功', data: treeData});
            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: 1, msg: '获取菜单数据失败'});
            }
        });
    });
//分配角色权限
//     app.post('/authorityMgmt/allChannels/userAuthorityHandle/distributeRole.ajax', (req, res, next) => {
//         let params = {
//             userIds: req.body.userIds ? JSON.parse(req.body.userIds) : [],
//             roleIds: req.body.roleIds ? JSON.parse(req.body.roleIds) : []
//         };
//         let option = {
//             session: req.session,
//             url: apiUrlList.distributeRole,
//             timeout: 15000,
//             body: params,
//             json: true
//         };
//         console.log('/authorityMgmt/allChannels/userAuthorityHandle/distributeRole.ajax option:', option);
//         request.post(option, (error, response, body) => {
//             console.log('/authorityMgmt/allChannels/userAuthorityHandle/distributeRole.ajax error:', error);
//             console.log('/authorityMgmt/allChannels/userAuthorityHandle/distributeRole.ajax statusCode:', response && response.statusCode);
//             console.log('/authorityMgmt/allChannels/userAuthorityHandle/distributeRole.ajax result:', body);
//             if (error) {
//                 console.log('error:', error);
//                 return res.send({error: 1, msg: '操作失败'});
//             }
//             let result = typeof body == 'string' ? JSON.parse(body) : body;
//             if (result && result.returnCode === 0) {
//                 res.send({error: 0, msg: '分配角色成功'});
//             }
//             else if(result && result.returnCode != 9999){
//                 res.send({error: 1, msg: result.returnMsg});
//             }
//             else {
//                 res.send({error: 1, msg: '分配角色失败'});
//             }
//         });
//     });
};

//将menujson中的数据整理成treeview的节点数据
function formatNodes(arr) {
    let resultArr = [];
    arr.forEach((item) => {
        let listItem = {
            menuId: item.menuId,
            parentMenuId: item.parentMenuId,
            text: item.name,
            href: item.url,
            nodes: item.hasSubmenu ? [] : undefined,
            selectable: true,
            state: {
                checked: false,
                disabled: true,
                expanded: false,
                selected: false
            }
        };
        resultArr.push(listItem);
    });
    return resultArr;
}

//根据menuList设置选中的结点的状态
function setCheckedNode(menuList, treeNodeUrls) {
    treeNodeUrls.forEach((item) => {
        if (menuList.indexOf(item.menuId.toString()) > -1) {
            item.state.checked = true;
            item.state.disabled = false;
            item.state.expanded = true;
            item.state.selected = true;
        }
    });
}

//将一维数组整理成树结构
function makeTree(arr) {
    let list = [];
    arr.forEach((item) => {
        if (!item.parentMenuId) {
            list.push(item);
        }
    });
    arr.forEach((item) => {
        if (/^\d*-\d*$/g.test(item.menuId)) {
            findParent(item.parentMenuId, list, item);
        }
    });
    arr.forEach((item) => {
        if (/^\d*-\d*-\d*$/g.test(item.menuId)) {
            findParent(item.parentMenuId, list, item);
        }
    });
    arr.forEach((item) => {
        if (/^\d*-\d*-\d*-\d*$/g.test(item.menuId)) {
            findParent(item.parentMenuId, list, item);
        }
    });
    return list;
}

//递归寻找父节点
function findParent(id, arr, listdata) {
    for (let item of arr) {
        if (item.menuId == id) {
            item['nodes'].push(listdata);
            return;
        }
        if (Array.isArray(item.nodes)) {
            findParent(id, item.nodes, listdata);
        }
    }
}