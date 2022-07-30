const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').combinationProductConfig.productTradeHandle;
const tableName = 'bm_cpc_trade';

module.exports = function (app) {
    //查询列表数据
    app.post('/businessMgmt/combinationProductConfig/productTradeHandle/getTableData.ajax', (req, res, next) => {
        let paramsStatus = {};
        paramsStatus.type = req.body.type;
        let reviewStatus = req.body.reviewStatus; //复核状态值
        // 查询本地数据库
        if (paramsStatus.type == "1") {
            let sql = `SELECT content,local_id,status,delete_flag,operate,operator,creator,reviewer,review_time,update_timestamp,remark FROM ${tableName} WHERE delete_flag='F' AND creator='${req.session.loginInfo.userid}'`;
            if (req.body.reviewStatus) {
                sql += ` AND status='${req.body.reviewStatus}'`;
            }
            if (req.body.groupid) {
                sql += ` AND JSON_EXTRACT(content, '$.groupid')='${req.body.groupid}'`;
            }
            sql += ' ORDER BY update_timestamp DESC';
            console.log('/businessMgmt/combinationProductConfig/productTradeHandle/getTableData.ajax sql:', sql);
            pool.getConnection((err, connection) => {
                if (err) {
                    return res.send({
                        error: 1,
                        msg: '链接本地数据库失败',
                        data: null
                    });
                }
                connection.query(sql, function (error, results, fields) {
                    console.log('/businessMgmt/businessParamConfig/productTradeHandle/getTableData.ajax error:', error);
                    console.log('/businessMgmt/businessParamConfig/productTradeHandle/getTableData.ajax results:', results);
                    console.log('/businessMgmt/businessParamConfig/productTradeHandle/getTableData.ajax fields:', fields);
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
                    console.log("-----", middleArr)
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
                pageUrl: '/businessMgmt/combinationProductConfig/productTradeHandle/getTableData.ajax',
                req,
                url: apiUrlList.getTableData,
                // body: params,
                timeout: 15000,
                json: true
            };
            console.log('/businessMgmt/combinationProductConfig/productTradeHandle/getTableData.ajax option:', option);
            request.get(option, (error, response, body) => {
                console.log('/businessMgmt/combinationProductConfig/productTradeHandle/getTableData.ajax error:', error);
                console.log('/businessMgmt/combinationProductConfig/productTradeHandle/getTableData.ajax statusCode:', response && response.statusCode);
                console.log('/businessMgmt/combinationProductConfig/productTradeHandle/getTableData.ajax body:', body);
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

    //添加保存数据;
    app.post('/businessMgmt/combinationProductConfig/productTradeHandle/saveParam.ajax', (req, res, next) => {
        // 由我经办增加保存
        pool.getConnection(function (error, connection) {
            let paramsStatus = {};
            // paramsStatus.type = req.body.type;   //传过来的状态数值
            // let params = {};
            // params.id = req.body.id;

            // params.serialno = req.body.serialno;
            // params.groupid = req.body.groupid;
            // params.actionType = req.body.actionType;
            // params.startDate = req.body.startDate;
            // params.startTime = req.body.startTime;
            // params.endDate = req.body.endDate;
            // params.endTime = req.body.endTime;
            //
            // params.operator = req.body.operator;

            // let operatorName = req.session.loginInfo.userid //操作人
            // params = JSON.stringify(params)
            let content = req.body.content;
            let typeIds = JSON.parse(content).actionType;
            paramsStatus.type = JSON.parse(content).type;
            console.log("type:", paramsStatus.type)
            let contentArr = typeIds.split(',').map(typeId => {
                let obj = JSON.parse(content);
                obj.actionType = typeId;
                return JSON.stringify(obj);
            });
            let creator = req.session.loginInfo.userid;
            let operator = req.session.loginInfo.userid;
            let valueStr = contentArr.map(contentStr => {
                return `('${contentStr}','${creator}','${operator}','F',1,2)`;
            }).join(',');
            // 查询本地数据库
            if (paramsStatus.type == "1") {
                let sql = `INSERT INTO ${tableName} (content,creator,operator,delete_flag,operate,status) VALUES ${valueStr}`;
                // var sql = `insert into ${tableName} set ?,creator='${operatorName}',operator='${operatorName}',delete_flag="F",operate=1,comment=1,status="2"`;
                console.log('/businessMgmt/combinationProductConfig/productTradeHandle/saveParam.ajax sql:', sql);
                // console.log('/businessMgmt/combinationProductConfig/productTradeHandle/saveParam.ajax params:', params);
                connection.query(sql, function (error, results, fields) {
                    console.log('/businessMgmt/combinationProductConfig/productTradeHandle/saveParam.ajax error:', error);
                    console.log('/businessMgmt/combinationProductConfig/productTradeHandle/saveParam.ajax results:', results);
                    console.log('/businessMgmt/combinationProductConfig/productTradeHandle/saveParam.ajax fields:', fields);
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
            }
        })
    });

    //修改业务数据存到经办数据库中;
    app.post('/businessMgmt/combinationProductConfig/productTradeHandle/serviceSave.ajax', (req, res, next) => {
        //修改本地Mysql参数
        let paramsStatus = {};
        paramsStatus.type = req.body.type; //传过来的状态数值
        let operate = req.body.operate //操作类型
        //经办现有折扣修改业务产品参数
        if (paramsStatus.type == "0") {
            let oneId = req.body.oneId
            let params = {};
            // 产品参数
            params.serialno = req.body.serialno;
            params.groupid = req.body.groupid;
            params.actionType = req.body.actionType;
            params.startDate = req.body.startDate;
            params.startTime = req.body.startTime;
            params.endDate = req.body.endDate;
            params.endTime = req.body.endTime;
            req.body.operator = req.body.operator;

            var updateTime = req.body.updateTime //获取修改的时间

            let operatorName = req.session.loginInfo.userid //操作人

            // id不同则新增
            // if (oneId != params.id) {
            params = JSON.stringify(params)
            var sql = `insert into ${tableName} set ?,delete_flag="F",service_id='${req.body.serialno}',creator='${operatorName}',operator='${operatorName}',operate=2,status="2"`;
            console.log('/businessMgmt/combinationProductConfig/productTradeHandle/serviceSave.ajax sql:', sql);
            console.log('/businessMgmt/combinationProductConfig/productTradeHandle/serviceSave.ajax params:', params);
            pool.getConnection((err, connection) => {
                if (err) {
                    return res.send({
                        error: 1,
                        msg: '链接本地数据库失败',
                        data: null
                    });
                }
                connection.query(sql, {
                    content: params
                }, function (error, results, fields) {
                    console.log('/businessMgmt/combinationProductConfig/productTradeHandle/serviceSave.ajax error:', error);
                    console.log('/businessMgmt/combinationProductConfig/productTradeHandle/serviceSave.ajax results:', results);
                    console.log('/businessMgmt/combinationProductConfig/productTradeHandle/serviceSave.ajax fields:', fields);
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

    //修改本地数据;
    app.post('/businessMgmt/combinationProductConfig/productTradeHandle/localRevise.ajax', (req, res, next) => {
        //修改本地Mysql参数
        let paramsStatus = {};
        paramsStatus.type = req.body.type; //传过来的状态数值
        let operate = req.body.operate //操作类型
        if (paramsStatus.type == "1") {
            let mysqlId = req.body.myqsql //获取传过来数据库表字段的id
            // 业务产品参数
            let params = {};
            params.serialno = req.body.serialno;
            params.groupid = req.body.groupid;
            params.actionType = req.body.actionType;
            params.startDate = req.body.startDate;
            params.startTime = req.body.startTime;
            params.endDate = req.body.endDate;
            params.endTime = req.body.endTime;
            req.body.operator = req.body.operator;

            let operatorName = req.session.loginInfo.userid //操作人
            var updateTime = req.body.updateTime //获取修改的时间
            params = JSON.stringify(params)
            if (operate == '1') {
                var sql = `UPDATE ${tableName} SET content=?,status='2',operate='1',operator='${operatorName}',update_timestamp=? where local_id=?`;
            } else if (operate == '2') {
                var sql = `UPDATE ${tableName} SET content=?,status='2',operate='2',operator='${operatorName}',update_timestamp=? where local_id=?`;
            } else if (operate == '3') {
                var sql = `UPDATE ${tableName} SET content=?,status='2',operate='3',operator='${operatorName}',update_timestamp=? where local_id=?`;
            }
            console.log('/businessMgmt/combinationProductConfig/productTradeHandle/localRevise.ajax sql:', sql);
            console.log('/businessMgmt/combinationProductConfig/productTradeHandle/localRevise.ajax params:', params);
            pool.getConnection((err, connection) => {
                if (err) {
                    return res.send({
                        error: 1,
                        msg: '链接本地数据库失败',
                        data: null
                    });
                }
                connection.query(sql, [params, updateTime, mysqlId], function (error, results, fields) {
                    console.log('/businessMgmt/combinationProductConfig/productTradeHandle/localRevise.ajax error:', error);
                    console.log('/businessMgmt/combinationProductConfig/productTradeHandle/localRevise.ajax results:', results);
                    console.log('/businessMgmt/combinationProductConfig/productTradeHandle/localRevise.ajax fields:', fields);
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
    //删除业务数据存到本地数据库中;
    app.post('/businessMgmt/combinationProductConfig/productTradeHandle/deleteParam.ajax', (req, res, next) => {
        // 删除本地数据-软删除
        let paramsStatus = {};
        paramsStatus.type = req.body.type; //传过来的状态数值
        var operate = req.body.operate
        if (paramsStatus.type == "0") {
            let oneId = req.body.oneId
            let params = {};
            // 产品参数
            params.serialno = req.body.serialno;
            params.groupid = req.body.groupid;
            params.actionType = req.body.actionType;
            params.startDate = req.body.startDate;
            params.startTime = req.body.startTime;
            params.endDate = req.body.endDate;
            params.endTime = req.body.endTime;
            req.body.operator = req.body.operator;
            params.accoType = req.body.accoType;

            let operatorName = req.session.loginInfo.userid //操作人
            // id不同则新增
            // if (oneId != params.id) {
            params = JSON.stringify(params)
            var sql = `insert into ${tableName} set ?,delete_flag="F",service_id='${req.body.serialno}',creator='${operatorName}',operator='${operatorName}',operate=3,status="2"`;
            console.log('/businessMgmt/combinationProductConfig/productTradeHandle/deleteParam.ajax sql:', sql);
            console.log('/businessMgmt/combinationProductConfig/productTradeHandle/deleteParam.ajax params:', params);
            pool.getConnection((err, connection) => {
                if (err) {
                    return res.send({
                        error: 1,
                        msg: '链接本地数据库失败',
                        data: null
                    });
                }
                connection.query(sql, {
                    content: params
                }, function (error, results, fields) {
                    console.log('/businessMgmt/combinationProductConfig/productTradeHandle/deleteParam.ajax error:', error);
                    console.log('/businessMgmt/combinationProductConfig/productTradeHandle/deleteParam.ajax results:', results);
                    console.log('/businessMgmt/combinationProductConfig/productTradeHandle/deleteParam.ajax fields:', fields);
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
    app.post('/businessMgmt/combinationProductConfig/productTradeHandle/deleteLocal.ajax', (req, res, next) => {
        // 撤销本地数据-软删除
        let paramsStatus = {};
        paramsStatus.type = req.body.type; //传过来的状态数值
        var operate = req.body.operate
        if (paramsStatus.type == "1") {
            let mysqlId = req.body.myqsql //获取传过来数据库表字段的id

            let params = {};
            params.serialno = req.body.serialno;
            params.groupid = req.body.groupid;
            params.actionType = req.body.actionType;
            params.startDate = req.body.startDate;
            params.startTime = req.body.startTime;
            params.endDate = req.body.endDate;
            params.endTime = req.body.endTime;
            params.operator = req.body.operator;

            let operatorName = req.session.loginInfo.userid //操作人
            params = JSON.stringify(params)
            // if(operate=='1'){
            //     var sql = "UPDATE bm_bpc_quota SET delete_flag='T',operate=1,status='1' where id=?";
            // }else if (operate=='2'){
            //     var sql = "UPDATE bm_bpc_quota SET delete_flag='T',operate=2,status='1' where id=?";
            // }else if (operate=='3'){
            //     var sql = "UPDATE bm_bpc_quota SET delete_flag='T',operate=3,status='1' where id=?";
            // }
            var sql = `UPDATE ${tableName} SET delete_flag='T',operate=3,status='1',operator='${operatorName}' where local_id=?`;
            console.log('/businessMgmt/combinationProductConfig/productTradeHandle/deleteLocal.ajax sql:', sql);
            console.log('/businessMgmt/combinationProductConfig/productTradeHandle/deleteLocal.ajax params:', params);
            pool.getConnection((err, connection) => {
                if (err) {
                    return res.send({
                        error: 1,
                        msg: '链接本地数据库失败',
                        data: null
                    });
                }
                connection.query(sql, [mysqlId], function (error, results, fields) {
                    console.log('/businessMgmt/combinationProductConfig/productTradeHandle/deleteLocal.ajax error:', error);
                    console.log('/businessMgmt/combinationProductConfig/productTradeHandle/deleteLocal.ajax results:', results);
                    console.log('/businessMgmt/combinationProductConfig/productTradeHandle/deleteLocal.ajax fields:', fields);
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

    //重新提删除操作数据
    app.post('/businessMgmt/combinationProductConfig/productTradeHandle/deleteAgain.ajax', (req, res, next) => {
        let paramsStatus = {};
        paramsStatus.type = req.body.type; //传过来的状态数值
        var operate = req.body.operate
        if (paramsStatus.type == "1") {
            let mysqlId = req.body.myqsql //获取传过来数据库表字段的id

            let params = {};
            req.body.id && (params.id = req.body.id);

            params.serialno = req.body.serialno;
            params.groupid = req.body.groupid;
            params.actionType = req.body.actionType;
            params.startDate = req.body.startDate;
            params.startTime = req.body.startTime;
            params.endDate = req.body.endDate;
            params.endTime = req.body.endTime;

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
            console.log('/businessMgmt/combinationProductConfig/productTradeHandle/deleteAgain.ajax sql:', sql);
            console.log('/businessMgmt/combinationProductConfig/productTradeHandle/deleteAgain.ajax params:', params);
            pool.getConnection((err, connection) => {
                if (err) {
                    return res.send({
                        error: 1,
                        msg: '链接本地数据库失败',
                        data: null
                    });
                }
                connection.query(sql, [mysqlId], function (error, results, fields) {
                    console.log('/businessMgmt/combinationProductConfig/productTradeHandle/deleteAgain.ajax error:', error);
                    console.log('/businessMgmt/combinationProductConfig/productTradeHandle/deleteAgain.ajax results:', results);
                    console.log('/businessMgmt/combinationProductConfig/productTradeHandle/deleteAgain.ajax fields:', fields);
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

    //提交数据操作;
    app.post('/businessMgmt/combinationProductConfig/productTradeHandle/submitCheck.ajax', (req, res, next) => {
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

            var updateTime = req.body.updateTime //获取修改的时间
            params = JSON.stringify(params)
            var sql = `UPDATE ${tableName} SET content=?,status='2',operate='2',delete_flag='F',update_timestamp=? where id=?`;
            console.log('/businessMgmt/businessParamConfig/quotaHandle/submitCheck.ajax sql:', sql);
            console.log('/businessMgmt/businessParamConfig/quotaHandle/submitCheck.ajax params:', params);
            pool.getConnection((err, connection) => {
                if (err) {
                    return res.send({
                        error: 1,
                        msg: '链接本地数据库失败',
                        data: null
                    });
                }
                connection.query(sql, [params, updateTime, mysqlId], function (error, results, fields) {
                    console.log('/businessMgmt/combinationProductConfig/productTradeHandle/submitCheck.ajax error:', error);
                    console.log('/businessMgmt/combinationProductConfig/productTradeHandle/submitCheck.ajax results:', results);
                    console.log('/businessMgmt/combinationProductConfig/productTradeHandle/submitCheck.ajax fields:', fields);
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
            var sql = `UPDATE ${tableName} SET content=?,status='2',operate='1',delete_flag='F',update_timestamp=? where id=?`;
            console.log('/businessMgmt/combinationProductConfig/productTradeHandle/submitCheck.ajax sql:', sql);
            console.log('/businessMgmt/combinationProductConfig/productTradeHandle/submitCheck.ajax params:', params);
            pool.getConnection((err, connection) => {
                if (err) {
                    return res.send({
                        error: 1,
                        msg: '链接本地数据库失败',
                        data: null
                    });
                }
                connection.query(sql, [params, updateTime, mysqlId], function (error, results, fields) {
                    console.log('/businessMgmt/combinationProductConfig/productTradeHandle/submitCheck.ajax error:', error);
                    console.log('/businessMgmt/combinationProductConfig/productTradeHandle/submitCheck.ajax results:', results);
                    console.log('/businessMgmt/combinationProductConfig/productTradeHandle/submitCheck.ajax fields:', fields);
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
            pool.getConnection((err, connection) => {
                if (err) {
                    return res.send({
                        error: 1,
                        msg: '链接本地数据库失败',
                        data: null
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

    // 获取用户信息
    app.post('/businessMgmt/combinationProductConfig/productTradeHandle/userName.ajax', (req, res, next) => {
        let operator = req.session.loginInfo.userid
        return res.send({
            error: 0,
            msg: '成功',
            data: operator
        });
    });
};