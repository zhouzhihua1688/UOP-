const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').combinationProductConfig.combinationProductHandle;
const request_obs = require('../../../local_data/request_obs');
const original_request = require('request');
const formidable = require('formidable');
const fs = require('fs');
const tableName = 'bm_cpc_combination';

module.exports = function (app) {
    //查询列表数据
    app.post('/businessMgmt/combinationProductConfig/combinationProductHandle/getTableData.ajax', (req, res, next) => {
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
            if (req.body.fundgroupType) {
                sql += ` AND JSON_EXTRACT(content, '$.fundgroupType')='${req.body.fundgroupType}'`;
            }
            // sql += ` AND (JSON_EXTRACT(content, '$.fundgroupNewFundgroupDO.isInvestment')='N' OR JSON_EXTRACT(content, '$.dialogData.isInvestment')='N' OR JSON_EXTRACT(content, '$.dialogData') LIKE '%isInvestment\\\\\\\\":\\\\\\\\"N%')`;
            sql += ' ORDER BY update_timestamp DESC';
            console.log('/businessMgmt/combinationProductConfig/combinationProductHandle/getTableData.ajax sql:', sql);
            pool.getConnection((err, connection) => {
                if (err) {
                    return res.send({
                        error: 1,
                        msg: '链接本地数据库失败',
                        data: null
                    });
                }
                connection.query(sql, function (error, results, fields) {
                    console.log('/businessMgmt/combinationProductConfig/combinationProductHandle/getTableData.ajax error:', error);
                    console.log('/businessMgmt/combinationProductConfig/combinationProductHandle/getTableData.ajax results:', results);
                    console.log('/businessMgmt/combinationProductConfig/combinationProductHandle/getTableData.ajax fields:', fields);
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
            params.groupId = req.body.groupId;
            // 查询后端业务数据
            let option = {
                pageUrl: '/businessMgmt/combinationProductConfig/combinationProductHandle/getTableData.aja',
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
                if (result.returnCode == 0 && Array.isArray(result.body)) {
                    let resultData = {};
                    // var ArrInfo=[]
                    // ArrInfo=result.body.map((item,index)=>{
                    //     let content =item.baseInfo;
                    //     content.detailList = item.detailList;
                    //     content.subdatetimeList = item.subdatetimeList;
                    //     return content
                    // })
                    // resultData.tableData = ArrInfo;
                    // resultData.tableData = result.body.filter((item)=>{
                    //     return item.isInvestment=='N'
                    // });
                    // var ArrInfo=[]
                    // ArrInfo=result.body.map((item,index)=>{
                    //     let content =item.baseInfo;
                    //     content.detailList = item.detailList;
                    //     content.subdatetimeList = item.subdatetimeList;
                    //     return content
                    // })
                    // resultData.tableData = ArrInfo;
                    resultData.tableData = result.body;
                    // resultData.detailList = result.body.detailList;
                    res.send({
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
    app.post('/businessMgmt/combinationProductConfig/combinationProductHandle/saveParam.ajax', (req, res, next) => {
        // 由我经办增加保存
        let paramsStatus = {};
        paramsStatus.type = req.body.type; //传过来的状态数值
        let mysqlId = req.body.mysqlId //获取传过来数据库表字段的id
        let params = {};
        // params.id = req.body.id;

        params.fundgroupType = req.body.fundgroupType;
        params.groupid = req.body.groupid;
        params.groupname = req.body.groupname;
        params.stringEstablishDate = req.body.stringEstablishDate;
        // params.fundgroupDesc = req.body.fundgroupDesc;
        // params.fundgroupAdvise = req.body.fundgroupAdvise;
        // params.proPageurl = req.body.proPageurl;
        // params.normalPageurl = req.body.normalPageurl;
        // params.stopStatus = req.body.stopStatus;
        // params.ageRange=req.body.ageRange;      //年龄段
        // params.sofarYield=req.body.sofarYield;    //收益率
        // params.branchCode=req.body.branchCode;       //网点
        // params.acceptMode=req.body.acceptMode;       //渠道
        // params.cooPreationMode=req.body.cooPreationMode;       //合作模式;
        // params.stopStartTime=req.body.stopStartTime;         //暂停开始时间
        // params.stopEndTime=req.body.stopEndTime;
        //
        params.grouptype = req.body.grouptype;
        // params.risklevel = req.body.risklevel;
        // params.initamount = req.body.initamount;
        // params.commro = req.body.commro;
        // params.minRedeemAmount = req.body.minRedeemAmount;
        // params.minChangeAmount = req.body.minChangeAmount;
        // params.minReserveAmount = req.body.minReserveAmount;
        params.onlinedate = req.body.onlinedate;
        params.rightPercent = req.body.rightPercent; //权益类占比
        params.fixPercent = req.body.fixPercent; //固收类占比
        params.vaPercent = req.body.vaPercent; //货币类占比
        params.otherPercent = req.body.otherPercent;


        params.fundgroupChangeROList = req.body.fundgroupChangeROList;
        params.fundgroupNewFundgroupDO = req.body.fundgroupNewFundgroupDO;
        params.fundgroupSubdatetimeRO = req.body.fundgroupSubdatetimeRO;

        params.calc_status = req.body.calc_status; //用作区分复核通过还是初始化中

        params.operator = req.body.operator;
        let operatorName = req.session.loginInfo.userid //操作人

        params = JSON.stringify(params).replace(/\\n/g, '')
        // --------------------------  风险评控入参 ------------------------------
        let checkParams = {};
        checkParams.groupId = req.body.groupid;
        checkParams.groupName = req.body.groupname;
        checkParams.groupType = req.body.grouptype;
        checkParams.isInvestment = true;
        checkParams.stockPercentForRights = Number(req.body.fundgroupNewFundgroupDO.rightLimit);
        checkParams.largeRedemptionPercent = Number(req.body.fundgroupNewFundgroupDO.largeRedemptionPercent);
        checkParams.fundDetails = req.body.fundgroupChangeROList.map(ROListItem => {
            return ROListItem.fundgroupChangeDetailList.map(item => {
                return {
                    fundId: item.fundid,
                    fundName: item.fundName,
                    fundPercent: item.fundPercent,
                    optionalFundIds: item.optionalFundList ? item.optionalFundList.map(item => item.fundId) : []
                };
            });
        }).reduce((prev, after) => prev.concat(after));
        checkParams.opType = '0';
        checkParams.createTimestamp = new Date(String(req.body.stringEstablishDate).slice(0, 8).replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')).getTime();
        if (paramsStatus.type == "1" && !mysqlId) { // 新增
            if (req.body.fundgroupNewFundgroupDO.isInvestment === 'Y' && req.body.fundgroupNewFundgroupDO.riskControl === 'Y') { // 需要过风险评控
                let promise = new Promise((resolve, reject) => {
                    let option = {
                        pageUrl: '/businessMgmt/combinationProductConfig/combinationProductHandle/riskControl.ajax',
                        headers: {
                            userId: req.session.loginInfo.userid,
                            token: 'f4082bbbffdb8c1c11eb5',
                            appName: 'uop'
                        },
                        req,
                        url: apiUrlList.riskControl,
                        body: checkParams,
                        timeout: 15000,
                        json: true
                    };
                    request.post(option, (error, response, body) => {
                        if (error) {
                            return reject('风控审核失败，无法保存');
                        }
                        if (body.code == 0) { // 风控审核通过
                            return resolve();
                        } else if (body.code == 1 || body.code == 2 || body.code == 3) {  // 风控审核不通过/参数错误/服务器异常
                            return reject(body.data);
                        } else {
                            return reject('风控审核失败，无法保存');
                        }
                    });
                });
                promise.then(() => {
                    var sql = `insert into ${tableName} set ?,delete_flag="F",service_id="",creator='${operatorName}',operator='${operatorName}',operate=1,comment=1,status="2"`;
                    console.log('/businessMgmt/combinationProductConfig/combinationProductHandle/saveParam.ajax sql:', sql);
                    console.log('/businessMgmt/combinationProductConfig/combinationProductHandle/saveParam.ajax params:', params);
                    pool.getConnection((err, connection) => {
                        if (err) {
                            return res.send({
                                error: 1,
                                msg: '链接本地数据库失败',
                                data: null
                            });
                        }
                        connection.query(sql, {content: params}, function (error, results, fields) {
                            console.log('/businessMgmt/combinationProductConfig/combinationProductHandle/saveParam.ajax error:', error);
                            console.log('/businessMgmt/combinationProductConfig/combinationProductHandle/saveParam.ajax results:', results);
                            console.log('/businessMgmt/combinationProductConfig/combinationProductHandle/saveParam.ajax fields:', fields);
                            if (error) {
                                return res.send({error: 1, msg: '保存失败'});
                            }
                            return res.send({error: 0, msg: '已通过风控审核并保存成功', data: results});
                        });
                        connection.release();
                    });
                }).catch(errorMsg => {
                    return res.send({error: 1, msg: errorMsg});
                });
            } else {
                var sql = `insert into ${tableName} set ?,delete_flag="F",service_id="",creator='${operatorName}',operator='${operatorName}',operate=1,comment=1,status="2"`;
                console.log('/businessMgmt/combinationProductConfig/combinationProductHandle/saveParam.ajax sql:', sql);
                console.log('/businessMgmt/combinationProductConfig/combinationProductHandle/saveParam.ajax params:', params);
                pool.getConnection((err, connection) => {
                    if (err) {
                        return res.send({
                            error: 1,
                            msg: '链接本地数据库失败',
                            data: null
                        });
                    }
                    connection.query(sql, {content: params}, function (error, results, fields) {
                        console.log('/businessMgmt/combinationProductConfig/combinationProductHandle/saveParam.ajax error:', error);
                        console.log('/businessMgmt/combinationProductConfig/combinationProductHandle/saveParam.ajax results:', results);
                        console.log('/businessMgmt/combinationProductConfig/combinationProductHandle/saveParam.ajax fields:', fields);
                        if (error) {
                            return res.send({error: 1, msg: '保存失败'});
                        }
                        return res.send({error: 0, msg: '保存成功', data: results});
                    });
                    connection.release();
                });
            }
        } else {
            if (req.body.fundgroupNewFundgroupDO.isInvestment === 'Y' && req.body.fundgroupNewFundgroupDO.riskControl === 'Y') { // 需要过风险评控
                let promise = new Promise((resolve, reject) => {
                    let option = {
                        pageUrl: '/businessMgmt/combinationProductConfig/combinationProductHandle/riskControl.ajax',
                        headers: {
                            userId: req.session.loginInfo.userid,
                            token: 'f4082bbbffdb8c1c11eb5',
                            appName: 'uop'
                        },
                        req,
                        url: apiUrlList.riskControl,
                        body: checkParams,
                        timeout: 15000,
                        json: true
                    };
                    request.post(option, (error, response, body) => {
                        if (error) {
                            return reject('风控审核失败，无法保存');
                        }
                        if (body.code == 0) { // 风控审核通过
                            return resolve();
                        } else if (body.code == 1 || body.code == 2 || body.code == 3) {  // 风控审核不通过/参数错误/服务器异常
                            return reject(body.data);
                        } else {
                            return reject('风控审核失败，无法保存');
                        }
                    });
                });
                promise.then(() => {
                    let operatorName = req.session.loginInfo.userid //操作人
                    let updateTime = req.body.updateTime //获取修改的时间
                    var sql = `UPDATE ${tableName} SET content=?,status='2',operate='1',operator='${operatorName}',update_timestamp=? where local_id=?`;
                    console.log('/businessMgmt/combinationProductConfig/combinationProductHandle/localRevise.ajax sql:', sql);
                    console.log('/businessMgmt/combinationProductConfig/combinationProductHandle/localRevise.ajax params:', params);
                    pool.getConnection((err, connection) => {
                        if (err) {
                            return res.send({
                                error: 1,
                                msg: '链接本地数据库失败',
                                data: null
                            });
                        }
                        connection.query(sql, [params, updateTime, mysqlId], function (error, results, fields) {
                            console.log('/businessMgmt/combinationProductConfig/combinationProductHandle/localRevise.ajax error:', error);
                            console.log('/businessMgmt/combinationProductConfig/combinationProductHandle/localRevise.ajax results:', results);
                            console.log('/businessMgmt/combinationProductConfig/combinationProductHandle/localRevise.ajax fields:', fields);
                            if (error) {
                                return res.send({
                                    error: 1,
                                    msg: '修改失败'
                                });
                            }
                            return res.send({
                                error: 0,
                                msg: '已通过风控审核并修改成功',
                                data: results
                            });
                        });
                        connection.release();
                    });
                }).catch(errorMsg => {
                    return res.send({error: 1, msg: errorMsg});
                });
            } else {
                let operatorName = req.session.loginInfo.userid //操作人
                let updateTime = req.body.updateTime //获取修改的时间
                var sql = `UPDATE ${tableName} SET content=?,status='2',operate='1',operator='${operatorName}',update_timestamp=? where local_id=?`;
                console.log('/businessMgmt/combinationProductConfig/combinationProductHandle/localRevise.ajax sql:', sql);
                console.log('/businessMgmt/combinationProductConfig/combinationProductHandle/localRevise.ajax params:', params);
                pool.getConnection((err, connection) => {
                    if (err) {
                        return res.send({
                            error: 1,
                            msg: '链接本地数据库失败',
                            data: null
                        });
                    }
                    connection.query(sql, [params, updateTime, mysqlId], function (error, results, fields) {
                        console.log('/businessMgmt/combinationProductConfig/combinationProductHandle/localRevise.ajax error:', error);
                        console.log('/businessMgmt/combinationProductConfig/combinationProductHandle/localRevise.ajax results:', results);
                        console.log('/businessMgmt/combinationProductConfig/combinationProductHandle/localRevise.ajax fields:', fields);
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
        }
    });

    //修改本地数据;
    app.post('/businessMgmt/combinationProductConfig/combinationProductHandle/localRevise.ajax', (req, res, next) => {
        //修改本地Mysql参数
        let paramsStatus = {};
        paramsStatus.type = req.body.type; //传过来的状态数值
        let operate = req.body.operate //操作类型
        if (paramsStatus.type == "1") {
            let mysqlId = req.body.myqsql //获取传过来数据库表字段的id
            // 业务产品参数
            let params = {};

            params.fundgroupType = req.body.fundgroupType;
            params.groupid = req.body.groupid;
            params.groupname = req.body.groupname;
            params.stringEstablishDate = req.body.stringEstablishDate;
            params.grouptype = req.body.grouptype;
            params.onlinedate = req.body.onlinedate;
            params.rightPercent = req.body.rightPercent; //权益类占比
            params.fixPercent = req.body.fixPercent; //固收类占比
            params.vaPercent = req.body.vaPercent; //货币类占比
            params.otherPercent = req.body.otherPercent;
            params.fundgroupChangeROList = req.body.fundgroupChangeROList;
            params.fundgroupNewFundgroupDO = req.body.fundgroupNewFundgroupDO;
            params.fundgroupSubdatetimeRO = req.body.fundgroupSubdatetimeRO;


            req.body.operator = req.body.operator;

            let operatorName = req.session.loginInfo.userid //操作人
            var updateTime = req.body.updateTime //获取修改的时间
            params = JSON.stringify(params).replace(/\\n/g, '')
            if (operate == '1') {
                var sql = `UPDATE ${tableName} SET content=?,status='2',operate='1',operator='${operatorName}',update_timestamp=? where local_id=?`;
            } else if (operate == '2') {
                var sql = `UPDATE ${tableName} SET content=?,status='2',operate='2',operator='${operatorName}',update_timestamp=? where local_id=?`;
            } else if (operate == '3') {
                var sql = `UPDATE ${tableName} SET content=?,status='2',operate='3',operator='${operatorName}',update_timestamp=? where local_id=?`;
            }
            console.log('/businessMgmt/combinationProductConfig/combinationProductHandle/localRevise.ajax sql:', sql);
            console.log('/businessMgmt/combinationProductConfig/combinationProductHandle/localRevise.ajax params:', params);
            pool.getConnection((err, connection) => {
                if (err) {
                    return res.send({
                        error: 1,
                        msg: '链接本地数据库失败',
                        data: null
                    });
                }
                connection.query(sql, [params, updateTime, mysqlId], function (error, results, fields) {
                    console.log('/businessMgmt/combinationProductConfig/combinationProductHandle/localRevise.ajax error:', error);
                    console.log('/businessMgmt/combinationProductConfig/combinationProductHandle/localRevise.ajax results:', results);
                    console.log('/businessMgmt/combinationProductConfig/combinationProductHandle/localRevise.ajax fields:', fields);
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

    //修改本地数据的只是针对业务数据修改基本信息;
    app.post('/businessMgmt/combinationProductConfig/combinationProductHandle/localBasic.ajax', (req, res, next) => {
        //修改本地Mysql参数
        let paramsStatus = {};
        paramsStatus.type = req.body.type; //传过来的状态数值
        let operate = req.body.operate //操作类型
        if (paramsStatus.type == "1") {
            let mysqlId = req.body.mysqlId //获取传过来数据库表字段的id
            // 业务产品参数
            let params = {};

            params.fundgroupType = req.body.fundgroupType;
            params.groupid = req.body.groupid;
            params.groupname = req.body.groupname;
            params.stringEstablishDate = req.body.stringEstablishDate;
            params.grouptype = req.body.grouptype;
            params.onlinedate = req.body.onlinedate;
            params.rightPercent = req.body.rightPercent; //权益类占比
            params.fixPercent = req.body.fixPercent; //固收类占比
            params.vaPercent = req.body.vaPercent; //货币类占比
            params.otherPercent = req.body.otherPercent;
            params.fundgroupChangeROList = req.body.fundgroupChangeROList;
            params.fundgroupNewFundgroupDO = req.body.fundgroupNewFundgroupDO;
            params.fundgroupSubdatetimeRO = req.body.fundgroupSubdatetimeRO;


            req.body.operator = req.body.operator;

            let operatorName = req.session.loginInfo.userid //操作人
            var updateTime = req.body.updateTime //获取修改的时间
            params = JSON.stringify(params).replace(/\\n/g, '')
            console.log("===", params)
            if (operate == '1') {
                var sql = `UPDATE ${tableName} SET content=?,status='2',operate='1',operator='${operatorName}',update_timestamp=? where local_id=?`;
            } else if (operate == '2') {
                var sql = `UPDATE ${tableName} SET content=?,status='2',operate='2',operator='${operatorName}',update_timestamp=? where local_id=?`;
            } else if (operate == '3') {
                var sql = `UPDATE ${tableName} SET content=?,status='2',operate='3',operator='${operatorName}',update_timestamp=? where local_id=?`;
            }
            console.log('/businessMgmt/combinationProductConfig/combinationProductHandle/localBasic.ajax sql:', sql);
            console.log('/businessMgmt/combinationProductConfig/combinationProductHandle/localBasic.ajax params:', params);
            pool.getConnection((err, connection) => {
                if (err) {
                    return res.send({
                        error: 1,
                        msg: '链接本地数据库失败',
                        data: null
                    });
                }
                connection.query(sql, [params, updateTime, mysqlId], function (error, results, fields) {
                    console.log('/businessMgmt/combinationProductConfig/combinationProductHandle/localBasic.ajax error:', error);
                    console.log('/businessMgmt/combinationProductConfig/combinationProductHandle/localBasic.ajax results:', results);
                    console.log('/businessMgmt/combinationProductConfig/combinationProductHandle/localBasic.ajax fields:', fields);
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


    //修改业务数据存到经办数据库中;
    app.post('/businessMgmt/combinationProductConfig/combinationProductHandle/serviceSave.ajax', (req, res, next) => {
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


            params.fundgroupType = req.body.fundgroupType;
            params.groupid = req.body.groupid;
            params.groupname = req.body.groupname;
            params.stringEstablishDate = req.body.stringEstablishDate;
            params.grouptype = req.body.grouptype;
            params.onlinedate = req.body.onlinedate;
            params.rightPercent = req.body.rightPercent; //权益类占比
            params.fixPercent = req.body.fixPercent; //固收类占比
            params.vaPercent = req.body.vaPercent; //货币类占比
            params.otherPercent = req.body.otherPercent;
            params.isDisplay = req.body.isDisplay;
            params.changeAdvise = req.body.changeAdvise;
            params.fundgroupChangeROList = req.body.fundgroupChangeROList;
            params.fundgroupNewFundgroupDO = req.body.fundgroupNewFundgroupDO;
            params.fundgroupSubdatetimeRO = req.body.fundgroupSubdatetimeRO;


            req.body.operator = req.body.operator;
            var updateTime = req.body.updateTime //获取修改的时间

            let operatorName = req.session.loginInfo.userid //操作人

            // id不同则新增
            // if (oneId != params.id) {
            params = JSON.stringify(params).replace(/\\n/g, '')
            var sql = `insert into ${tableName} set ?,delete_flag="F",service_id='${req.body.groupid}',creator='${operatorName}',operator='${operatorName}',operate=2,status="2"`;
            console.log('/businessMgmt/combinationProductConfig/combinationProductHandle/serviceSave.ajax sql:', sql);
            console.log('/businessMgmt/combinationProductConfig/combinationProductHandle/serviceSave.ajax params:', params);
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
                    console.log('/businessMgmt/combinationProductConfig/combinationProductHandle/serviceSave.ajax error:', error);
                    console.log('/businessMgmt/combinationProductConfig/combinationProductHandle/serviceSave.ajax results:', results);
                    console.log('/businessMgmt/combinationProductConfig/combinationProductHandle/serviceSave.ajax fields:', fields);
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

    //修改本地数据-修改调仓数据(只是针对调仓);
    app.post('/businessMgmt/combinationProductConfig/combinationProductHandle/localHouse.ajax', (req, res, next) => {
        //修改本地Mysql参数
        let paramsStatus = {};
        paramsStatus.type = req.body.type; //传过来的状态数值
        let operate = req.body.operate //操作类型
        //经办现有折扣修改业务产品参数
        if (paramsStatus.type == "1") {
            let mysqlId = req.body.mysqlId //获取传过来数据库表字段的id

            let params = {};
            // 产品参数
            params.serialno = req.body.serialno;

            params.fundgroupType = req.body.fundgroupType;
            params.groupid = req.body.groupid;
            params.groupname = req.body.groupname;
            params.stringEstablishDate = req.body.stringEstablishDate;
            params.grouptype = req.body.grouptype;
            params.onlinedate = req.body.onlinedate;
            params.rightPercent = req.body.rightPercent; //权益类占比
            params.fixPercent = req.body.fixPercent; //固收类占比
            params.vaPercent = req.body.vaPercent; //货币类占比
            params.otherPercent = req.body.otherPercent;
            params.isDisplay = req.body.isDisplay;
            params.changeAdvise = req.body.changeAdvise;


            params.fundgroupChangeROList = req.body.fundgroupChangeROList;
            params.fundgroupNewFundgroupDO = req.body.fundgroupNewFundgroupDO;
            params.fundgroupSubdatetimeRO = req.body.fundgroupSubdatetimeRO;


            req.body.operator = req.body.operator;

            let operatorName = req.session.loginInfo.userid //操作人
            var updateTime = req.body.updateTime //获取修改的时间

            // id不同则新增
            // if (oneId != params.id) {
            params = JSON.stringify(params).replace(/\\n/g, '')
            var sql = `UPDATE ${tableName} SET content=?,status='2',operate='2',operator='${operatorName}',update_timestamp=? where local_id=?`;
            console.log('/businessMgmt/combinationProductConfig/combinationProductHandle/localHouse.ajax sql:', sql);
            console.log('/businessMgmt/combinationProductConfig/combinationProductHandle/localHouse.ajax params:', params);
            pool.getConnection((err, connection) => {
                if (err) {
                    return res.send({
                        error: 1,
                        msg: '链接本地数据库失败',
                        data: null
                    });
                }
                connection.query(sql, [params, updateTime, mysqlId], function (error, results, fields) {
                    console.log('/businessMgmt/combinationProductConfig/combinationProductHandle/localHouse.ajax error:', error);
                    console.log('/businessMgmt/combinationProductConfig/combinationProductHandle/localHouse.ajax results:', results);
                    console.log('/businessMgmt/combinationProductConfig/combinationProductHandle/localHouse.ajax fields:', fields);
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
    app.post('/businessMgmt/combinationProductConfig/combinationProductHandle/deleteParam.ajax', (req, res, next) => {
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
            params = JSON.stringify(params).replace(/\\n/g, '')
            var sql = `insert into ${tableName} set ?,delete_flag="F",service_id='${req.body.serialno}',creator='${operatorName}',operator='${operatorName}',operate=3,status="2"`;
            console.log('/businessMgmt/combinationProductConfig/combinationProductHandle/deleteParam.ajax sql:', sql);
            console.log('/businessMgmt/combinationProductConfig/combinationProductHandle/deleteParam.ajax params:', params);
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
                    console.log('/businessMgmt/combinationProductConfig/combinationProductHandle/deleteParam.ajax error:', error);
                    console.log('/businessMgmt/combinationProductConfig/combinationProductHandle/deleteParam.ajax results:', results);
                    console.log('/businessMgmt/combinationProductConfig/combinationProductHandle/deleteParam.ajax fields:', fields);
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
    app.post('/businessMgmt/combinationProductConfig/combinationProductHandle/deleteLocal.ajax', (req, res, next) => {
        // 撤销本地数据-软删除
        let paramsStatus = {};
        paramsStatus.type = req.body.type; //传过来的状态数值
        var operate = req.body.operate
        if (paramsStatus.type == "1") {
            let mysqlId = req.body.myqsql //获取传过来数据库表字段的id

            let params = {};
            // params.fundgroupType = req.body.fundgroupType;
            // params.groupid = req.body.groupid;
            // params.groupname = req.body.groupname;
            // params.stringEstablishDate = req.body.stringEstablishDate;
            // params.grouptype = req.body.grouptype;
            // params.onlinedate = req.body.onlinedate;
            // params.rightPercent=req.body.rightPercent;                //权益类占比
            // params.fixPercent=req.body.fixPercent;         //固收类占比
            // params.vaPercent=req.body.vaPercent ;        //货币类占比
            // params.otherPercent=req.body.otherPercent;
            // params.fundgroupChangeROList=req.body.fundgroupChangeROList;
            // params.fundgroupNewFundgroupDO=req.body.fundgroupNewFundgroupDO;
            // params.fundgroupSubdatetimeRO=req.body.fundgroupSubdatetimeRO;

            params.operator = req.body.operator;

            let operatorName = req.session.loginInfo.userid //操作人
            params = JSON.stringify(params).replace(/\\n/g, '')

            // if(operate=='1'){
            //     var sql = "UPDATE bm_bpc_quota SET delete_flag='T',operate=1,status='1' where id=?";
            // }else if (operate=='2'){
            //     var sql = "UPDATE bm_bpc_quota SET delete_flag='T',operate=2,status='1' where id=?";
            // }else if (operate=='3'){
            //     var sql = "UPDATE bm_bpc_quota SET delete_flag='T',operate=3,status='1' where id=?";
            // }
            var sql = `UPDATE ${tableName} SET delete_flag='T',operate=3,status='1',operator='${operatorName}' where local_id=?`;
            console.log('/businessMgmt/combinationProductConfig/combinationProductHandle/deleteLocal.ajax sql:', sql);
            console.log('/businessMgmt/combinationProductConfig/combinationProductHandle/deleteLocal.ajax params:', params);
            pool.getConnection((err, connection) => {
                if (err) {
                    return res.send({
                        error: 1,
                        msg: '链接本地数据库失败',
                        data: null
                    });
                }
                connection.query(sql, [mysqlId], function (error, results, fields) {
                    console.log('/businessMgmt/combinationProductConfig/combinationProductHandle/deleteLocal.ajax error:', error);
                    console.log('/businessMgmt/combinationProductConfig/combinationProductHandle/deleteLocal.ajax results:', results);
                    console.log('/businessMgmt/combinationProductConfig/combinationProductHandle/deleteLocal.ajax fields:', fields);
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
    app.post('/businessMgmt/combinationProductConfig/combinationProductHandle/deleteAgain.ajax', (req, res, next) => {
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
            params = JSON.stringify(params).replace(/\\n/g, '')
            // if(operate=='1'){
            //     var sql = "UPDATE bm_bpc_quota SET delete_flag='T',operate=1,status='1' where id=?";
            // }else if (operate=='2'){
            //     var sql = "UPDATE bm_bpc_quota SET delete_flag='T',operate=2,status='1' where id=?";
            // }else if (operate=='3'){
            //     var sql = "UPDATE bm_bpc_quota SET delete_flag='T',operate=3,status='1' where id=?";
            // }
            var sql = `UPDATE ${tableName} SET delete_flag='F',operate=3,status='2',operator='${operatorName}' where local_id=?`;
            console.log('/businessMgmt/combinationProductConfig/combinationProductHandle/deleteAgain.ajax sql:', sql);
            console.log('/businessMgmt/combinationProductConfig/combinationProductHandle/deleteAgain.ajax params:', params);
            pool.getConnection((err, connection) => {
                if (err) {
                    return res.send({
                        error: 1,
                        msg: '链接本地数据库失败',
                        data: null
                    });
                }
                connection.query(sql, [mysqlId], function (error, results, fields) {
                    console.log('/businessMgmt/combinationProductConfig/combinationProductHandle/deleteAgain.ajax error:', error);
                    console.log('/businessMgmt/combinationProductConfig/combinationProductHandle/deleteAgain.ajax results:', results);
                    console.log('/businessMgmt/combinationProductConfig/combinationProductHandle/deleteAgain.ajax fields:', fields);
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
    app.post('/businessMgmt/combinationProductConfig/combinationProductHandle/submitCheck.ajax', (req, res, next) => {
        //由我经办修改本地Mysql参数
        let paramsStatus = {};
        paramsStatus.type = req.body.type; //传过来的状态数值
        var operate = req.body.operate
        if (paramsStatus.type == "1" && operate == '2') {
            let mysqlId = req.body.myqsql //获取传过来数据库表字段的id
            // 业务产品参数
            let params = {};

            params.serialno = req.body.serialno;

            params.fundgroupType = req.body.fundgroupType;
            params.groupid = req.body.groupid;
            params.groupname = req.body.groupname;
            params.stringEstablishDate = req.body.stringEstablishDate;
            params.grouptype = req.body.grouptype;
            params.onlinedate = req.body.onlinedate;
            params.rightPercent = req.body.rightPercent; //权益类占比
            params.fixPercent = req.body.fixPercent; //固收类占比
            params.vaPercent = req.body.vaPercent; //货币类占比
            params.otherPercent = req.body.otherPercent;
            params.isDisplay = req.body.isDisplay;
            params.changeAdvise = req.body.changeAdvise;


            params.fundgroupChangeROList = req.body.fundgroupChangeROList;
            params.fundgroupNewFundgroupDO = req.body.fundgroupNewFundgroupDO;
            params.fundgroupSubdatetimeRO = req.body.fundgroupSubdatetimeRO;


            req.body.operator = req.body.operator;

            var updateTime = req.body.updateTime //获取修改的时间
            params = JSON.stringify(params).replace(/\\n/g, '')
            var sql = `UPDATE ${tableName} SET content=?,status='2',operate='2',delete_flag='F',update_timestamp=? where id=?`;
            console.log('/businessMgmt/combinationProductConfig/combinationProductHandle/submitCheck.ajax sql:', sql);
            console.log('/businessMgmt/businessParamConfig/combinationProductHandle/submitCheck.ajax params:', params);
            pool.getConnection((err, connection) => {
                if (err) {
                    return res.send({
                        error: 1,
                        msg: '链接本地数据库失败',
                        data: null
                    });
                }
                connection.query(sql, [params, updateTime, mysqlId], function (error, results, fields) {
                    console.log('/businessMgmt/combinationProductConfig/combinationProductHandle/submitCheck.ajax error:', error);
                    console.log('/businessMgmt/combinationProductConfig/combinationProductHandle/submitCheck.ajax results:', results);
                    console.log('/businessMgmt/combinationProductConfig/combinationProductHandle/submitCheck.ajax fields:', fields);
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
            params = JSON.stringify(params).replace(/\\n/g, '')
            var sql = `UPDATE ${tableName} SET content=?,status='2',operate='1',delete_flag='F',update_timestamp=? where id=?`;
            console.log('/businessMgmt/combinationProductConfig/combinationProductHandle/submitCheck.ajax sql:', sql);
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
                    console.log('/businessMgmt/combinationProductConfig/combinationProductHandle/submitCheck.ajax error:', error);
                    console.log('/businessMgmt/combinationProductConfig/combinationProductHandle/submitCheck.ajax results:', results);
                    console.log('/businessMgmt/combinationProductConfig/combinationProductHandle/submitCheck.ajax fields:', fields);
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
            params = JSON.stringify(params).replace(/\\n/g, '')
            var sql = "UPDATE cs_ticket SET delete_flag='T',operate='3',status='2',update_timestamp=? where id=?";
            console.log('/businessMgmt/businessParamConfig/combinationProductHandle/submitCheck.ajax sql:', sql);
            console.log('/businessMgmt/businessParamConfig/combinationProductHandle/submitCheck.ajax params:', params);
            pool.getConnection((err, connection) => {
                if (err) {
                    return res.send({
                        error: 1,
                        msg: '链接本地数据库失败',
                        data: null
                    });
                }
                connection.query(sql, [updateTime, mysqlId], function (error, results, fields) {
                    console.log('/businessMgmt/businessParamConfig/combinationProductHandle/submitCheck.ajax error:', error);
                    console.log('/businessMgmt/businessParamConfig/combinationProductHandle/submitCheck.ajax results:', results);
                    console.log('/businessMgmt/businessParamConfig/combinationProductHandle/submitCheck.ajax fields:', fields);
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
    app.post('/businessMgmt/combinationProductConfig/combinationProductHandle/userName.ajax', (req, res, next) => {
        let operator = req.session.loginInfo.userid
        return res.send({
            error: 0,
            msg: '成功',
            data: operator
        });
    });
    // 获取所有组合
    app.post('/businessMgmt/combinationProductConfig/combinationProductHandle/fundGroups.ajax', (req, res, next) => {
        let params = {}
        params.groupId = "ALL";
        let option = {
            pageUrl: '/businessMgmt/combinationProductConfig/combinationProductHandle/fundGroups.aja',
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

    //添加按钮获取所有基金
    app.post('/businessMgmt/combinationProductConfig/combinationProductHandle/fundList.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/businessMgmt/combinationProductConfig/combinationProductHandle/fundList.aja',
            req,
            url: apiUrlList.fundList,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '查询失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {
                result.body.forEach(item => {
                    item.check = false;
                    item.fundPercent = '';
                });
                return res.send({
                    error: 0,
                    msg: '查询成功',
                    data: body
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

    // 获取网点类型下拉数据
    app.post('/businessMgmt/combinationProductConfig/combinationProductHandle/branchCodeList.ajax', (req, res, next) => {
        let params = {};
        params.pmst = req.body.pmst;
        params.pmkey = req.body.pmkey;
        let option = {
            pageUrl: '/businessMgmt/combinationProductConfig/combinationProductHandle/branchCodeList.aja',
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
                // return res.send({
                //     error: 0,
                //     msg: '获取成功',
                //     data: result
                // });

                result.body = result.body.filter(item => item.pmv1 !== 'A' && item.pmv1 !== 'C');
                return res.send({error: 0, msg: '获取网点号成功', data: result});

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
    // 获取组合类型下拉数据
    app.post('/businessMgmt/combinationProductConfig/combinationProductHandle/fundGroupType.ajax', (req, res, next) => {
        let params = {};
        params.pmst = req.body.pmst;
        params.pmkey = req.body.pmkey;
        let option = {
            pageUrl: '/businessMgmt/combinationProductConfig/combinationProductHandle/fundGroupType.aja',
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
    app.post('/businessMgmt/combinationProductConfig/combinationProductHandle/ageRangeList.ajax', (req, res, next) => {
        let params = {};
        params.pmst = req.body.pmst;
        params.pmkey = req.body.pmkey;
        let option = {
            pageUrl: '/businessMgmt/combinationProductConfig/combinationProductHandle/ageRangeList.aja',
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
    app.post('/businessMgmt/combinationProductConfig/combinationProductHandle/grouptypeList.ajax', (req, res, next) => {
        let params = {};
        params.pmst = req.body.pmst;
        params.pmkey = req.body.pmkey;
        let option = {
            pageUrl: '/businessMgmt/combinationProductConfig/combinationProductHandle/grouptypeList.aja',
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
    app.post('/businessMgmt/combinationProductConfig/combinationProductHandle/risklevelList.ajax', (req, res, next) => {
        let params = {};
        params.pmst = req.body.pmst;
        params.pmkey = req.body.pmkey;
        let option = {
            pageUrl: '/businessMgmt/combinationProductConfig/combinationProductHandle/risklevelList.aja',
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

    // 验证基金有没有净值
    app.post('/businessMgmt/combinationProductConfig/combinationProductHandle/navList.ajax', (req, res, next) => {
        let params = {};
        let fundId = req.body.ids;
        let data = {"fundIdList": [fundId].join(',')};
        let option = {
            pageUrl: '/businessMgmt/combinationProductConfig/combinationProductHandle/navList.ajax',
            req,
            // url: apiUrlList.navList[0] + fundId + apiUrlList.navList[1],
            url: apiUrlList.navListNew,
            qs: data,
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

    // 查询组合所有调仓信息
    app.post('/businessMgmt/combinationProductConfig/combinationProductHandle/basicParam.ajax', (req, res, next) => {
        let params = {};
        params.groupId = req.body.groupId;
        let option = {
            pageUrl: '/businessMgmt/combinationProductConfig/combinationProductHandle/basicParam.aja',
            req,
            url: apiUrlList.basicParam,
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
                // let resultData = {};
                // var ArrInfo=[]
                // ArrInfo=result.body.map((item,index)=>{
                //     let content =item.baseInfo;
                //     content.detailList = item.detailList;
                //     return content
                // })
                // resultData.tableData = ArrInfo;
                // res.send({error: 0, msg: '查询成功', data: resultData});
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

    // 获取业务详情
    app.post('/businessMgmt/combinationProductConfig/combinationProductHandle/details.ajax', (req, res, next) => {
        let params = {};
        params.groupId = req.body.groupId;
        let option = {
            pageUrl: '/businessMgmt/combinationProductConfig/combinationProductHandle/details.aja',
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
                // resultData.tableData =result.body;
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

    // 获取所有组合
    app.post('/businessMgmt/combinationProductConfig/combinationProductHandle/allGroupId.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/businessMgmt/combinationProductConfig/combinationProductHandle/allGroupId.aja',
            req,
            url: apiUrlList.allGroupId,
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
                    msg: '获取失败'
                });
            }
        });

    });

    // 查询基金状态是不是暂停交易,暂停赎回,暂停申购
    app.post('/businessMgmt/combinationProductConfig/combinationProductHandle/fundIdLists.ajax', (req, res, next) => {
        let params = {}
        params.fundIdList = req.body.fundIdList;
        params.sourceType = req.body.sourceType;
        let option = {
            pageUrl: '/businessMgmt/combinationProductConfig/combinationProductHandle/fundIdLists.aja',
            req,
            url: apiUrlList.fundIdList,
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

    // 获取全量修改弹窗相关数据
    app.post('/businessMgmt/combinationProductConfig/combinationProductHandle/getServiceUpdateDialogData.ajax', (req, res, next) => {
        // 获取组合类型列表
        function queryFundGroupTypeList() {
            return new Promise((resolve, reject) => {
                let option = {
                    pageUrl: '/businessMgmt/combinationProductConfig/combinationProductHandle/getServiceUpdateDialogData.ajax ----queryFundGroupTypeList',
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
        function queryRiskTypeList() {
            return new Promise((resolve, reject) => {
                let option = {
                    pageUrl: '/businessMgmt/combinationProductConfig/combinationProductHandle/getServiceUpdateDialogData.ajax ----queryRiskTypeList',
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
        function queryRiskLevelList() {
            return new Promise((resolve, reject) => {
                let option = {
                    pageUrl: '/businessMgmt/combinationProductConfig/combinationProductHandle/getServiceUpdateDialogData.ajax ----queryRiskLevelList',
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
        function queryAgeRangeList() {
            return new Promise((resolve, reject) => {
                let option = {
                    pageUrl: '/businessMgmt/combinationProductConfig/combinationProductHandle/getServiceUpdateDialogData.ajax ----queryAgeRangeList',
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
        function queryBranchCodeList() {
            return new Promise((resolve, reject) => {
                let option = {
                    pageUrl: '/businessMgmt/combinationProductConfig/combinationProductHandle/getServiceUpdateDialogData.ajax ----queryBranchCodeList',
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

        // 获取组合详情
        function queryGroupDetail(groupId) {
            return new Promise((resolve, reject) => {
                let option = {
                    pageUrl: '/businessMgmt/combinationProductConfig/combinationProductHandle/getServiceUpdateDialogData.ajax ----queryGroupDetail',
                    req,
                    url: apiUrlList.details,
                    qs: {groupId: groupId},
                    timeout: 15000,
                    json: true
                };
                request(option, (error, response, body) => {
                    if (error) {
                        console.log('errorTop',error);
                        return reject({message: '获取组合详情失败'});
                    }
                    if (body && body.returnCode === 0 && Array.isArray(body.body)) {
                        let resolveObj = {};
                        let result = body.body[0];
                        resolveObj.serialno = result.baseInfo.serialno;
                        resolveObj.fundGroupType = result.baseInfo.fundgroupType;
                        resolveObj.groupId = result.baseInfo.groupid;
                        resolveObj.groupName = result.baseInfo.groupname;
                        resolveObj.fundGroupDesc = result.baseInfo.fundgroupDesc;
                        resolveObj.fundGroupAdvise = result.baseInfo.fundgroupAdvise;
                        resolveObj.recommendReason = result.baseInfo.recommendReason;
                        resolveObj.recommendHoldTime = result.baseInfo.recommendHoldTime;
                        // resolveObj.acceptMode赋值需要把subdatetimeList中的acceptMode聚合
                        let acceptModeList = [];
                        if(result.subdatetimeList){
                            result.subdatetimeList.forEach((item)=>{
                                if(item.accptmd){
                                    acceptModeList.push(item.accptmd)
                                }
                            })
                        }
                        
                        if(acceptModeList.length>0){
                            resolveObj.acceptMode = acceptModeList.join(',');
                        }else{
                            resolveObj.acceptMode = result.subdatetimeList&&result.subdatetimeList[0] ? result.subdatetimeList[0].accptmd : '0';
                        }
                        resolveObj.ageRange = result.baseInfo.ageRange || '';
                        resolveObj.accptType = result.subdatetimeList&&result.subdatetimeList[0] ? result.subdatetimeList[0].accptType : '2';
                        resolveObj.branchCode = result.subdatetimeList&&result.subdatetimeList.length > 0 ? result.subdatetimeList.map(item => item.branchcode) : [];
                        resolveObj.stopStatus = result.subdatetimeList&&result.subdatetimeList[0] ? result.subdatetimeList[0].manualFundst : '0';
                        resolveObj.manualStartTime = result.subdatetimeList&&result.subdatetimeList[0]&&result.subdatetimeList[0]['manualStartTime'] ? result.subdatetimeList[0].manualStartTime.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1-$2-$3 $4:$5:$6') : '';
                        resolveObj.manualEndTime = result.subdatetimeList&&result.subdatetimeList[0]&&result.subdatetimeList[0]['manualEndTime'] ? result.subdatetimeList[0].manualEndTime.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1-$2-$3 $4:$5:$6') : '';
                        resolveObj.displayDate = result.baseInfo.displayDate ? result.baseInfo.displayDate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3') : '';
                        resolveObj.status = result.baseInfo.status || 'N';
                        resolveObj.isInvestment = result.baseInfo.isInvestment || 'N';
                        resolveObj.investType = result.baseInfo.investType || 'M';
                        resolveObj.investCustomers = result.baseInfo.investCustomers;
                        resolveObj.investPrincipal = result.baseInfo.investPrincipal;
                        resolveObj.investDuration = result.baseInfo.investDuration;
                        resolveObj.categoryDescDoc = result.baseInfo.categoryDescDoc;
                        resolveObj.categoryDescDisplay = result.baseInfo.categoryDescDisplay;
                        resolveObj.riskDescDoc = result.baseInfo.riskDescDoc;
                        resolveObj.riskDescDisplay = result.baseInfo.riskDescDisplay;
                        resolveObj.investDescDoc = result.baseInfo.investDescDoc;
                        resolveObj.investDescDisplay = result.baseInfo.investDescDisplay;
                        resolveObj.fundGroupFeature = result.baseInfo.fundGroupFeature;
                        resolveObj.investmentServicePerc = result.baseInfo.investmentServicePerc;
                        resolveObj.onlineDate = result.baseInfo.onlinedate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3') + ' ' + result.baseInfo.onlinetime.replace(/(\d{2})(\d{2})(\d{2})/, '$1:$2:$3');
                        resolveObj.normalPageUrl = result.baseInfo.normalPageurl;
                        resolveObj.riskControl = result.baseInfo.riskControl || 'N';
                        resolveObj.riskType = result.baseInfo.grouptype;
                        resolveObj.initAmount = result.baseInfo.initamount;
                        resolveObj.minRedeemAmount = result.baseInfo.minRedeemAmount;
                        resolveObj.minReserveAmount = result.baseInfo.minReserveAmount;
                        resolveObj.riskLevel = result.baseInfo.risklevel;
                        resolveObj.commro = result.baseInfo.commro;
                        resolveObj.minChangeAmount = result.baseInfo.minChangeAmount;
                        resolveObj.rightMaxratePerc = result.baseInfo.rightMaxratePerc;
                        resolveObj.turnoverRatePerc = result.baseInfo.turnoverRatePerc;
                        resolveObj.investRiskLevel = result.baseInfo.investRiskLevel;
                        resolveObj.singlevalueCustmaxPerc = result.baseInfo.singlevalueCustmaxPerc;
                        resolveObj.categoryunitGroupmaxPerc = result.baseInfo.categoryunitGroupmaxPerc;
                        resolveObj.singleunitGroupmaxPerc = result.baseInfo.singleunitGroupmaxPerc
                        return resolve(resolveObj);
                    } else if (body && body.returnCode != 9999) {
                        return reject({message: body.returnMsg});
                    } else {
                        return reject({message: '获取组合详情失败'});
                    }
                });
            });
        }

        // 获取大额赎回在全平台比例等组合成份相关的字段
        function queryBigRedeemRate(groupId) {
            return new Promise((resolve, reject) => {
                let option = {
                    pageUrl: '/businessMgmt/combinationProductConfig/combinationProductHandle/getServiceUpdateDialogData.ajax ----queryBigRedeemRate',
                    req,
                    url: apiUrlList.queryBigRedeemRate,
                    qs: {
                        groupid: groupId,
                        realTime: true
                    },
                    timeout: 15000,
                    json: true
                };
                request(option, (error, response, body) => {
                    if (error) {
                        return resolve({});
                    }
                    if (body.returnCode === 0) {
                        return resolve({
                            rightLimit: body.body.rightLimit,
                            largeRedemptionPercent: body.body.bigRedeemRate
                        });
                    } else if (body && body.returnCode !== 9999) {
                        return reject({message: body.returnMsg});
                    } else {
                        return resolve({});
                    }
                });
            });
        }

        // 获取调仓详情
        function queryFundGroupChangeDetailList(groupId) {
            return new Promise((resolve, reject) => {
                let option = {
                    pageUrl: '/businessMgmt/combinationProductConfig/combinationProductHandle/getServiceUpdateDialogData.ajax ----queryFundGroupChangeDetailList',
                    req,
                    url: apiUrlList.basicParam,
                    qs: {groupId: groupId},
                    timeout: 15000,
                    json: true
                };
                request(option, (error, response, body) => {
                    if (error) {
                        return reject({message: '获取调仓详情失败'});
                    }
                    if (body && body.returnCode === 0 && Array.isArray(body.body)) {
                        let fixZero = num => num < 10 ? '0' + num : num;
                        let resultArr = body.body.map(item => {
                            let obj = {};
                            obj.serialNo = item.fundgroupChangeDO.serialno;
                            obj.changetime = `${item.fundgroupChangeDO.changetime.slice(0, 3).map(fixZero).join('-')} ${item.fundgroupChangeDO.changetime.slice(-3).map(fixZero).join(':')}`;
                            obj.changeAdvise = item.fundgroupChangeDO.changeAdvise;
                            obj.isDisplay = item.fundgroupChangeDO.isDisplay;
                            obj.changeAdvise_origin = item.fundgroupChangeDO.changeAdvise;
                            obj.isDisplay_origin = item.fundgroupChangeDO.isDisplay;
                            obj.fundList = item.fundgroupChangeDetailList.filter(item => item.fundPercent > 0).map(item => {
                                return {
                                    refSerialNo: item.refserialno,
                                    fundApkind: item.fundApkind,
                                    fundId: item.fundid,
                                    isUnderlyingCurrency: item.isUnderlyingCurrency,
                                    fundPercent: item.fundPercent
                                };
                            });
                            return obj;
                        });
                        return resolve({fundGroupChangeDetailList: resultArr});
                        
                    } else if (body && body.returnCode != 9999) {
                        return reject({message: body.returnMsg});
                    } else {
                        return reject({message: '获取调仓详情失败'});
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
        finalRequestArr.push(queryGroupDetail(req.body.groupId));
        finalRequestArr.push(queryBigRedeemRate(req.body.groupId));
        finalRequestArr.push(queryFundGroupChangeDetailList(req.body.groupId));
        Promise.all(finalRequestArr).then(resultArr => {
            let resultObject = {};
            resultObject.fundGroupTypeList = resultArr[0];
            resultObject.riskTypeList = resultArr[1];
            resultObject.riskLevelList = resultArr[2];
            resultObject.ageRangeList = resultArr[3];
            resultObject.branchCodeList = resultArr[4];
            Object.assign(resultObject, resultArr[5]);
            Object.assign(resultObject, resultArr[6]);
            Object.assign(resultObject, resultArr[7]);
            
            res.send({error: 0, msg: 'success', data: resultObject});
        }).catch(error => {
            res.send({error: 1, msg: error.message, data: null});
        });
        
    });
    //添加按钮获取所有基金
    app.post('/businessMgmt/combinationProductConfig/combinationProductHandle/fundGroupFundListForSelect.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/businessMgmt/combinationProductConfig/combinationProductHandle/fundGroupFundListForSelect.ajax',
            req,
            url: apiUrlList.fundList,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '查询失败'});
            }
            if (body && body.returnCode == 0 && Array.isArray(body.body)) {
                return res.send({
                    error: 0,
                    msg: '查询成功',
                    data: body.body.map(item => {
                        return {
                            fundId: item.fundId,
                            fundName: item.fundName,
                            fundTypeForFundgroup: item.fundTypeForFundgroup,
                            source: item.source,
                            channelList: item.channelList,
                            canSelect: 0, // 0-未知,1-可选,2-不可选
                            reason: '',
                            check: false
                        }
                    })
                });
            } else if (body && body.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: body.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '查询失败'
                });
            }
        });
    });
    // 验证基金是否可选
    app.post('/businessMgmt/combinationProductConfig/combinationProductHandle/checkFundCanSelect.ajax', (req, res, next) => {
        function checkFundNav(fundItem) { // 查询基金净值
            return new Promise((resolve, reject) => {
                let option = {
                    pageUrl: '/businessMgmt/combinationProductConfig/combinationProductHandle/checkFundCanSelect.ajax ----checkFundNav',
                    req,
                    // url: apiUrlList.navList[0] + fundItem.fundId + apiUrlList.navList[1],
                    url: apiUrlList.navListNew,
                    qs:{fundIdList:fundItem.fundId},
                    timeout: 15000,
                    json: true
                };
                request(option, (error, response, body) => {
                    if (error) {
                        return reject({message: '查询是否有净值失败'});
                    }
                    if (body.returnCode == 0) {
                        return resolve(body.body && Array.isArray(body.body)&&body.body[0]);
                    } else if (body && body.returnCode != 9999) {
                        return reject({message: body.returnMsg});
                    } else {
                        return reject({message: '查询是否有净值失败'});
                    }
                });
            });
        }

        function checkFundCanPurchased(fundItem) { // 查询基金基金是不是暂停交易,暂停赎回,暂停申购
            return new Promise((resolve, reject) => {
                let option = {
                    pageUrl: '/businessMgmt/combinationProductConfig/combinationProductHandle/checkFundCanSelect.ajax ----checkFundCanPurchased',
                    req,
                    url: apiUrlList.queryTradeStatusByFundId,
                    qs: {fundId: fundItem.fundId},
                    timeout: 15000,
                    json: true
                };
                request(option, (error, response, body) => {
                    if (error) {
                        return reject({message: '查询是否在交易状态失败'});
                    }
                    if (body && body.returnCode == 0) {
                        return resolve(body.body);
                    } else if (body && body.returnCode != 9999) {
                        return reject({message: body.returnMsg});
                    } else {
                        return reject({message: '查询是否在交易状态失败'});
                    }
                });
            });
        }

        let promiseParams = [];
        promiseParams.push(checkFundNav(req.body));

        promiseParams.push(checkFundCanPurchased(req.body));

        Promise.all(promiseParams).then((resultArr) => {
            if(!resultArr[0] || resultArr[1].length === 0){ // 无净值或无渠道信息，默认不可选
                return res.send({error: 0, msg: '不可选', data: {canSelect: 2, acceptModeListForFundId: []}});
            }
            // let list = resultArr[1];
            //     if(list.every(item => item.purchase === 'Y' && item.redeem === 'Y')){
            //         return res.send({error: 0, msg: '可选', data: {canSelect: 1, acceptModeListForFundId: resultArr[1]}});
            //     }
            //     else {
            //         return res.send({error: 0, msg: '不可选', data: {canSelect: 2, acceptModeListForFundId: resultArr[1]}});
            //     }
            // 20210730 S 暂时去掉选择check
            // if (req.body.source == 2 && [13, 14, 15, 16, 17].includes(Number(req.body.fundGroupType))) { // 该基金为外部基金且当前组合类型为13,14,15,16,17时在同花顺和盈米渠道同时可售才可选择
            //     let list = resultArr[1].filter(filterItem => filterItem.sourceType === '307' || filterItem.sourceType === '378');
            //     if(list.length >= 2 && list.every(item => item.purchase === 'Y' && item.redeem === 'Y')){
            //         return res.send({error: 0, msg: '可选', data: {canSelect: 1, acceptModeListForFundId: resultArr[1]}});
            //     }
            //     else {
            //         return res.send({error: 0, msg: '不可选', data: {canSelect: 2, acceptModeListForFundId: resultArr[1]}});
            //     }
            // }
            // 20210730 E 暂时去掉选择check
            return res.send({error: 0, msg: '可选', data: {canSelect: 1, acceptModeListForFundId: resultArr[1]}});
        }).catch(error => {
            return res.send({error: 1, msg: error.message, data: {canSelect: 2, acceptModeListForFundId: []}});
        });
    });
    // 修改业务数据存到经办数据库中;
    app.post('/businessMgmt/combinationProductConfig/combinationProductHandle/saveServiceAllUpdateDialogData.ajax', (req, res, next) => {
        let reqBodyData = JSON.parse(req.body.dialogData);
        let insertSQLPromise = new Promise((resolve, reject) => {
            let params = {};
            params.serialno = reqBodyData.serialno;
            params.groupid = reqBodyData.groupId;
            params.groupname = reqBodyData.groupName;
            params.grouptype = reqBodyData.riskType;
            params.fundgroupType = reqBodyData.fundGroupType;
            params.rightPercent = reqBodyData.rightPercent;
            params.fixPercent = reqBodyData.fixPercent;
            params.vaPercent = reqBodyData.vaPercent;
            params.otherPercent = reqBodyData.otherPercent;
            params.stringEstablishDate = (reqBodyData.createTime?reqBodyData.createTime.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3'):'');
            params.onlinedate = (reqBodyData.establishDate?reqBodyData.establishDate.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3'):'');
            delete reqBodyData.rightPercent;
            delete reqBodyData.fixPercent;
            delete reqBodyData.vaPercent;
            delete reqBodyData.otherPercent;
            params.dialogData = reqBodyData
            let userName = req.session.loginInfo.userid
            let SQL = `insert into ${tableName} set content='${JSON.stringify(params).replace(/\\n/g, '')}',delete_flag='F',service_id='${reqBodyData.groupId}',creator='${userName}',operator='${userName}',operate=2,status=2`;
            console.log('/businessMgmt/combinationProductConfig/combinationProductHandle/saveServiceAllUpdateDialogData.ajax SQL:', SQL);
            pool.getConnection((err, connection) => {
                if (err) {
                    return res.send({
                        error: 1,
                        msg: '链接本地数据库失败',
                        data: null
                    });
                }
                connection.query(SQL, function (error, results, fields) {
                    console.log('/businessMgmt/combinationProductConfig/combinationProductHandle/saveServiceAllUpdateDialogData.ajax error:', error);
                    console.log('/businessMgmt/combinationProductConfig/combinationProductHandle/saveServiceAllUpdateDialogData.ajax results:', results);
                    console.log('/businessMgmt/combinationProductConfig/combinationProductHandle/saveServiceAllUpdateDialogData.ajax fields:', fields);
                    if (error) {
                        return reject();
                    }
                    return resolve();
                });
                connection.release();
            });
        });

        if (reqBodyData.isInvestment === 'Y' && reqBodyData.riskControl === 'Y' && reqBodyData.isAddFundGroup) { // 需要过风控
            let checkParams = {};
            checkParams.groupId = reqBodyData.groupId;
            checkParams.groupName = reqBodyData.groupName;
            checkParams.groupType = reqBodyData.fundGroupType;
            checkParams.isInvestment = true;
            checkParams.stockPercentForRights = Number(reqBodyData.rightLimit);
            checkParams.largeRedemptionPercent = Number(reqBodyData.largeRedemptionPercent);
            checkParams.fundDetails = reqBodyData.newFundGroupChange.fundList.map(item => {
                return {
                    fundId: item.fundId,
                    fundName: item.fundName,
                    fundPercent: item.fundPercent,
                    optionalFundIds: item.optionalFundList ? item.optionalFundList.map(item => item.fundId) : []
                };
            });
            checkParams.opType = '0';
            checkParams.createTimestamp = new Date(String(reqBodyData.createTime).replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')).getTime();
            let checkRiskPromise = new Promise((resolve, reject) => {
                let option = {
                    pageUrl: '/businessMgmt/combinationProductConfig/combinationProductHandle/riskControl.ajax',
                    headers: {
                        userId: req.session.loginInfo.userid,
                        token: 'f4082bbbffdb8c1c11eb5',
                        appName: 'uop'
                    },
                    req,
                    url: apiUrlList.riskControl,
                    body: checkParams,
                    timeout: 15000,
                    json: true
                };
                request.post(option, (error, response, body) => {
                    if (error) {
                        return reject('风控审核失败，无法保存');
                    }
                    if (body.code == 0) { // 风控审核通过
                        return resolve();
                    } else if (body.code == 1 || body.code == 2 || body.code == 3) {  // 风控审核不通过/参数错误/服务器异常
                        return reject(body.data);
                    } else {
                        return reject('风控审核失败，无法保存');
                    }
                });
            });

            checkRiskPromise.then(() => {
                insertSQLPromise.then(() => {
                    return res.send({error: 0, msg: '已通过风控审核并提交至经办数据', data: null});
                }).catch(() => {
                    return res.send({error: 1, msg: '风控审核通过,提交至经办数据失败', data: null});
                });
            }).catch(error => {
                return res.send({error: 1, msg: error, data: null});
            });
        } else {
            insertSQLPromise.then(() => {
                return res.send({error: 0, msg: '已提交至经办数据', data: null});
            }).catch(() => {
                return res.send({error: 1, msg: '数据保存失败', data: null});
            });
        }
    });
    // 获取本地全量修改弹窗所需列表数据
    app.post('/businessMgmt/combinationProductConfig/combinationProductHandle/getLocalDialogListData.ajax', (req, res, next) => {
        // 获取组合类型列表
        function queryFundGroupTypeList() {
            return new Promise((resolve, reject) => {
                let option = {
                    pageUrl: '/businessMgmt/combinationProductConfig/combinationProductHandle/getLocalDialogListData.ajax ----queryFundGroupTypeList',
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
        function queryRiskTypeList() {
            return new Promise((resolve, reject) => {
                let option = {
                    pageUrl: '/businessMgmt/combinationProductConfig/combinationProductHandle/getLocalDialogListData.ajax ----queryRiskTypeList',
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
        function queryRiskLevelList() {
            return new Promise((resolve, reject) => {
                let option = {
                    pageUrl: '/businessMgmt/combinationProductConfig/combinationProductHandle/getLocalDialogListData.ajax ----queryRiskLevelList',
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
        function queryAgeRangeList() {
            return new Promise((resolve, reject) => {
                let option = {
                    pageUrl: '/businessMgmt/combinationProductConfig/combinationProductHandle/getLocalDialogListData.ajax ----queryAgeRangeList',
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
        function queryBranchCodeList() {
            return new Promise((resolve, reject) => {
                let option = {
                    pageUrl: '/businessMgmt/combinationProductConfig/combinationProductHandle/getLocalDialogListData.ajax ----queryBranchCodeList',
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
    // 修改本地经办数据;
    app.post('/businessMgmt/combinationProductConfig/combinationProductHandle/saveLocalAllUpdateDialogData.ajax', (req, res, next) => {
        let mySQLId = req.body.mySQLId;
        let updateTime = formatTime(req.body.update_timestamp);
        let reqBodyData = JSON.parse(req.body.dialogData);
        let updateSQLPromise = new Promise((resolve, reject) => {
            let userName = req.session.loginInfo.userid
            let SQL = `UPDATE ${tableName} SET content=JSON_SET(content,'$.groupname','${reqBodyData.groupName}'),content=JSON_SET(content,'$.fundgroupType','${reqBodyData.fundGroupType}'),content=JSON_SET(content,'$.grouptype','${reqBodyData.riskType}'),content=JSON_SET(content,'$.dialogData','${JSON.stringify(reqBodyData)}'),operator='${userName}' WHERE local_id=${mySQLId} AND update_timestamp='${updateTime}'`;
            console.log('/businessMgmt/combinationProductConfig/combinationProductHandle/saveServiceAllUpdateDialogData.ajax SQL:', SQL);
            pool.getConnection((err, connection) => {
                if (err) {
                    return res.send({
                        error: 1,
                        msg: '链接本地数据库失败',
                        data: null
                    });
                }
                connection.query(SQL, function (error, results, fields) {
                    console.log('/businessMgmt/combinationProductConfig/combinationProductHandle/saveServiceAllUpdateDialogData.ajax error:', error);
                    console.log('/businessMgmt/combinationProductConfig/combinationProductHandle/saveServiceAllUpdateDialogData.ajax results:', results);
                    console.log('/businessMgmt/combinationProductConfig/combinationProductHandle/saveServiceAllUpdateDialogData.ajax fields:', fields);
                    if (error) {
                        return reject();
                    }
                    if (results.affectedRows) {
                        return resolve();
                    } else {
                        return reject('数据不存在或已更新,请刷新页面');
                    }
                });
                connection.release();
            });
        });

        if (reqBodyData.isInvestment === 'Y' && reqBodyData.riskControl === 'Y' && reqBodyData.isAddFundGroup) { // 需要过风控
            let checkParams = {};
            checkParams.groupId = reqBodyData.groupId;
            checkParams.groupName = reqBodyData.groupName;
            checkParams.groupType = reqBodyData.fundGroupType;
            checkParams.isInvestment = true;
            checkParams.stockPercentForRights = Number(reqBodyData.rightLimit);
            checkParams.largeRedemptionPercent = Number(reqBodyData.largeRedemptionPercent);
            checkParams.fundDetails = reqBodyData.newFundGroupChange.fundList.map(item => {
                return {
                    fundId: item.fundId,
                    fundName: item.fundName,
                    fundPercent: item.fundPercent,
                    optionalFundIds: item.optionalFundList ? item.optionalFundList.map(item => item.fundId) : []
                };
            });
            checkParams.opType = '0';
            checkParams.createTimestamp = new Date(String(reqBodyData.createTime).replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')).getTime();
            let checkRiskPromise = new Promise((resolve, reject) => {
                let option = {
                    pageUrl: '/businessMgmt/combinationProductConfig/combinationProductHandle/riskControl.ajax',
                    headers: {
                        userId: req.session.loginInfo.userid,
                        token: 'f4082bbbffdb8c1c11eb5',
                        appName: 'uop'
                    },
                    req,
                    url: apiUrlList.riskControl,
                    body: checkParams,
                    timeout: 15000,
                    json: true
                };
                request.post(option, (error, response, body) => {
                    if (error) {
                        return reject('风控审核失败，无法保存');
                    }
                    if (body.code == 0) { // 风控审核通过
                        return resolve();
                    } else if (body.code == 1 || body.code == 2 || body.code == 3) {  // 风控审核不通过/参数错误/服务器异常
                        return reject(body.data);
                    } else {
                        return reject('风控审核失败，无法保存');
                    }
                });
            });

            checkRiskPromise.then(() => {
                updateSQLPromise.then(() => {
                    return res.send({error: 0, msg: '通过风控审核并修改成功', data: null});
                }).catch(() => {
                    return res.send({error: 1, msg: '风控审核通过,修改失败', data: null});
                });
            }).catch(error => {
                return res.send({error: 1, msg: error, data: null});
            });
        } else {
            updateSQLPromise.then(() => {
                return res.send({error: 0, msg: '修改成功', data: null});
            }).catch(() => {
                return res.send({error: 1, msg: '修改失败', data: null});
            });
        }
    });
    // 获取备选基金数据
    app.post('/businessMgmt/combinationProductConfig/combinationProductHandle/checkOptionalFundList.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/businessMgmt/combinationProductConfig/combinationProductHandle/checkOptionalFundList.ajax',
            req,
            url: apiUrlList.queryOptionalFundList,
            qs: {
                groupId: req.body.groupId,
                fundId: req.body.fundId
            },
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, mag: '获取备选基金列表失败', data: null});
            }
            if (body.returnCode === 0 && Array.isArray(body.body)) {
                return res.send({error: 0, mag: 'success', data: body.body});
            } else if (body && body.returnCode !== 9999) {
                return res.send({error: 1, mag: body.returnMsg, data: null});
            } else {
                return res.send({error: 1, mag: '获取备选基金列表失败', data: null});
            }
        });
    });

    // 验证外部基金渠道的一个交易状态信息
    app.post('/businessMgmt/combinationProductConfig/combinationProductHandle/checkTradeStatus.ajax', (req, res, next) => {
        let params = {};
        let fundId = req.body.ids;
        let option = {
            pageUrl: '/businessMgmt/combinationProductConfig/combinationProductHandle/checkTradeStatus.ajax',
            req,
            url:apiUrlList.queryTradeStatusByFundId,
            qs:{fundId:fundId},
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
    // 投顾文档上传
    app.post('/businessMgmt/combinationProductConfig/combinationProductHandle/uploadDoc.ajax', (req, res, next) => {
        let form = new formidable.IncomingForm();
        form.keepExtensions = true;
        form.parse(req, (err, fields, files) => {
            if (err) {
                console.log('/businessMgmt/combinationProductConfig/combinationProductHandle/uploadDoc.ajax:', err);
                return res.send({
                    error: 1,
                    msg: '上传文件失败',
                    data: null
                });
            }
            console.log('文件接收完毕:', files);
            let option = {
                body: {
                    container: 'groupReport',
                    keyStoneName: 'newecc',
                    keyStonePassword: 'newecc',
                    objectName: encodeURIComponent(files.file.name)
                }
            };

            request_obs(option).then(tokenInfo => {
                let tokenParams = {
                    url: tokenInfo.uri.href,
                    headers: tokenInfo.headers,
                };
                console.log('/businessMgmt/combinationProductConfig/combinationProductHandle/uploadDoc.ajax --tokenParams:', tokenParams);
                fs.createReadStream(files.file.path).pipe(original_request.put(tokenParams));
                return res.send({
                    error: 0,
                    msg: '上传文件成功',
                    data: {
                        fileName: files.file.name,
                        filePath: tokenInfo.uri.href
                    }
                });
            }).catch(error => {
                return res.send({
                    error: 1,
                    msg: '上传文件失败',
                    data: null
                });
            });
        });
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