const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').investmentStrategy.combinationProductHandle;
// const request_obs = require('../../../local_data/request_obs');
// const original_request = require('request');
const node_xlsx = require('node-xlsx');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const apiConfig = require('../apiConfig');
const filePathExternal = apiConfig.filePathExternal + '/investmentStrategy';
const filePathExternal_url = apiConfig.filePafilePathExternalthUrl + '/investmentStrategy';
const tableName = 'bm_cpc_combination';
const investTableName = 'uop_log_invest';
module.exports = function (app) {
    //查询列表数据
    app.post('/investmentMgmt/investmentStrategy/combinationProductHandle/getTableData.ajax', (req, res, next) => {
        let paramsStatus = {};
        paramsStatus.type = req.body.type;
        let reviewStatus = req.body.reviewStatus; //复核状态值
        // 查询本地数据库
        if (paramsStatus.type == "1") {
            // if(req.session.loginInfo.userid=='admin'){
            //     var sql = `SELECT content,local_id,status,delete_flag,operate,operator,creator,reviewer,review_time,update_timestamp,remark FROM ${tableName} WHERE delete_flag='F'`;
            // }else{
            //     var sql = `SELECT content,local_id,status,delete_flag,operate,operator,creator,reviewer,review_time,update_timestamp,remark FROM ${tableName} WHERE delete_flag='F' AND creator='${req.session.loginInfo.userid}'`;
            // }
            // 经办现有经办权限的人拥有公共经办数据
            var sql = `SELECT content,local_id,status,delete_flag,operate,operator,creator,reviewer,review_time,update_timestamp,remark FROM ${tableName} WHERE delete_flag='F'`;
            
            if (req.body.reviewStatus) {
                sql += ` AND status='${req.body.reviewStatus}'`;
            }
            if (req.body.groupid) {
                sql += ` AND JSON_EXTRACT(content, '$.groupid')='${req.body.groupid}'`;
            }
            if (req.body.fundgroupType) {
                sql += ` AND JSON_EXTRACT(content, '$.fundgroupType')='${req.body.fundgroupType}'`;
            }
            sql += ` AND (JSON_EXTRACT(content, '$.fundgroupNewFundgroupDO.isInvestment')='Y' OR JSON_EXTRACT(content, '$.dialogData.isInvestment')='Y' OR JSON_EXTRACT(content, '$.dialogData') LIKE '%isInvestment\\\\\\\\":\\\\\\\\"Y%')`;
            // sql += ` AND (JSON_EXTRACT(content, '$.dialogData') LIKE '%isInvestment\\\\":\\\\"Y%')`;
			// 暂时屏蔽掉 投顾组合维护和业务人员操作管理优化操作人员为：qinlei zhangjunling   zhulinyuan dingjun
			if(String(process.env.NODE_ENV).toLowerCase() == 'production'){
				sql += ' AND operator!="qinlei" AND operator!="zhangjunling" AND operator!="zhulinyuan" AND operator!="dingjun"';
				sql += ' AND creator!="qinlei" AND creator!="zhangjunling" AND creator!="zhulinyuan" AND creator!="dingjun"';
				sql += ' AND reviewer!="qinlei" AND reviewer!="zhangjunling" AND reviewer!="zhulinyuan" AND reviewer!="dingjun"';
			}
            sql += ' ORDER BY update_timestamp DESC';
            console.log('/investmentMgmt/investmentStrategy/combinationProductHandle/getTableData.ajax sql:', sql);
            pool.getConnection((err, connection) => {
                if (err) {
                    return res.send({
                        error: 1,
                        msg: '链接本地数据库失败',
                        data: null
                    });
                }
                connection.query(sql, function (error, results, fields) {
                    console.log('/investmentMgmt/investmentStrategy/combinationProductHandle/getTableData.ajax error:', error);
                    console.log('/investmentMgmt/investmentStrategy/combinationProductHandle/getTableData.ajax results:', results);
                    console.log('/investmentMgmt/investmentStrategy/combinationProductHandle/getTableData.ajax fields:', fields);
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
                pageUrl: '/investmentMgmt/investmentStrategy/combinationProductHandle/getTableData.ajax',
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
                    resultData.tableData = result.body.filter((item)=>{
                        return item.isInvestment=='Y'&&(item.fundgroupType=='13'||item.fundgroupType=='14'||item.fundgroupType=='15'||item.fundgroupType=='16'||item.fundgroupType=='17')
                    });
                    // resultData.tableData = result.body;
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
    app.post('/investmentMgmt/investmentStrategy/combinationProductHandle/saveParam.ajax', (req, res, next) => {
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
       
        if (paramsStatus.type == "1" && !mysqlId) { // 新增
            var sql = `insert into ${tableName} set ?,delete_flag="F",service_id="",creator='${operatorName}',operator='${operatorName}',operate=1,status="1"`;
            console.log('/investmentMgmt/investmentStrategy/combinationProductHandle/saveParam.ajax sql:', sql);
            console.log('/investmentMgmt/investmentStrategy/combinationProductHandle/saveParam.ajax params:', params);
            pool.getConnection((err, connection) => {
                if (err) {
                    return res.send({
                        error: 1,
                        msg: '链接本地数据库失败',
                        data: null
                    });
                }
                connection.query(sql, {content: params}, function (error, results, fields) {
                    console.log('/investmentMgmt/investmentStrategy/combinationProductHandle/saveParam.ajax error:', error);
                    console.log('/investmentMgmt/investmentStrategy/combinationProductHandle/saveParam.ajax results:', results);
                    console.log('/investmentMgmt/investmentStrategy/combinationProductHandle/saveParam.ajax fields:', fields);
                    let option ={
                        pageUrl: '/investmentMgmt/investmentStrategy/combinationProductHandle/saveParam.ajax',
                        req,
                        operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
                        investBody:JSON.parse(params),
                        mappingKeyWords:'combinationProductHandle'
                    }
                    if (error) {
                        sysLogger(option.operateType, option.req, option, {result:'操作失败'},investTableName);
                        return res.send({error: 1, msg: '保存失败'});
                    }
                    sysLogger(option.operateType, option.req, option, {result:'操作成功'},investTableName);
                    return res.send({error: 0, msg: '保存成功', data: results});
                });
                connection.release();
            });
            
        } else {
            let operatorName = req.session.loginInfo.userid //操作人
            let updateTime = req.body.updateTime //获取修改的时间
            
            var sql = `UPDATE ${tableName} SET content=?,operate='1',status='1',operator='${operatorName}',update_timestamp=? where local_id=?`;
            console.log('/investmentMgmt/investmentStrategy/combinationProductHandle/localRevise.ajax sql:', sql);
            console.log('/investmentMgmt/investmentStrategy/combinationProductHandle/localRevise.ajax params:', params);
            pool.getConnection((err, connection) => {
                if (err) {
                    return res.send({
                        error: 1,
                        msg: '链接本地数据库失败',
                        data: null
                    });
                }
                connection.query(sql, [params, updateTime, mysqlId], function (error, results, fields) {
                    console.log('/investmentMgmt/investmentStrategy/combinationProductHandle/localRevise.ajax error:', error);
                    console.log('/investmentMgmt/investmentStrategy/combinationProductHandle/localRevise.ajax results:', results);
                    console.log('/investmentMgmt/investmentStrategy/combinationProductHandle/localRevise.ajax fields:', fields);
                    let option ={
                        pageUrl: '/investmentMgmt/investmentStrategy/combinationProductHandle/localRevise.ajax',
                        req,
                        operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
                        investBody:JSON.parse(params),
                        mappingKeyWords:'combinationProductHandle'
                    }
                    if (error) {
                        sysLogger(option.operateType, option.req, option, {result:'操作失败'},investTableName);
                        return res.send({
                            error: 1,
                            msg: '修改失败'
                        });
                    }
                    sysLogger(option.operateType, option.req, option, {result:'操作成功'},investTableName);
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

    //修改本地数据;
    app.post('/investmentMgmt/investmentStrategy/combinationProductHandle/localRevise.ajax', (req, res, next) => {
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
                var sql = `UPDATE ${tableName} SET content=?,status='1',operate='1',operator='${operatorName}',update_timestamp=? where local_id=?`;
            } else if (operate == '2') {
                var sql = `UPDATE ${tableName} SET content=?,status='1',operate='2',operator='${operatorName}',update_timestamp=? where local_id=?`;
            } else if (operate == '3') {
                var sql = `UPDATE ${tableName} SET content=?,status='1',operate='3',operator='${operatorName}',update_timestamp=? where local_id=?`;
            }
            console.log('/investmentMgmt/investmentStrategy/combinationProductHandle/localRevise.ajax sql:', sql);
            console.log('/investmentMgmt/investmentStrategy/combinationProductHandle/localRevise.ajax params:', params);
            pool.getConnection((err, connection) => {
                if (err) {
                    return res.send({
                        error: 1,
                        msg: '链接本地数据库失败',
                        data: null
                    });
                }
                connection.query(sql, [params, updateTime, mysqlId], function (error, results, fields) {
                    console.log('/investmentMgmt/investmentStrategy/combinationProductHandle/localRevise.ajax error:', error);
                    console.log('/investmentMgmt/investmentStrategy/combinationProductHandle/localRevise.ajax results:', results);
                    console.log('/investmentMgmt/investmentStrategy/combinationProductHandle/localRevise.ajax fields:', fields);
                    let option ={
                        pageUrl: '/investmentMgmt/investmentStrategy/combinationProductHandle/localRevise.ajax',
                        req,
                        operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
                        investBody:JSON.parse(params),
                        mappingKeyWords:'combinationProductHandle'
                    }
                    if (error) {
                        sysLogger(option.operateType, option.req, option, {result:'操作失败'},investTableName);
                        return res.send({
                            error: 1,
                            msg: '修改失败'
                        });
                    }
                    sysLogger(option.operateType, option.req, option, {result:'操作成功'},investTableName);
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
    app.post('/investmentMgmt/investmentStrategy/combinationProductHandle.ajax', (req, res, next) => {
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
                var sql = `UPDATE ${tableName} SET content=?,status='1',operate='1',operator='${operatorName}',update_timestamp=? where local_id=?`;
            } else if (operate == '2') {
                var sql = `UPDATE ${tableName} SET content=?,status='1',operate='2',operator='${operatorName}',update_timestamp=? where local_id=?`;
            } else if (operate == '3') {
                var sql = `UPDATE ${tableName} SET content=?,status='1',operate='3',operator='${operatorName}',update_timestamp=? where local_id=?`;
            }
            console.log('/investmentMgmt/investmentStrategy/combinationProductHandle/localBasic.ajax sql:', sql);
            console.log('/investmentMgmt/investmentStrategy/combinationProductHandle/localBasic.ajax params:', params);
            pool.getConnection((err, connection) => {
                if (err) {
                    return res.send({
                        error: 1,
                        msg: '链接本地数据库失败',
                        data: null
                    });
                }
                connection.query(sql, [params, updateTime, mysqlId], function (error, results, fields) {
                    console.log('/investmentMgmt/investmentStrategy/combinationProductHandle/localBasic.ajax error:', error);
                    console.log('/investmentMgmt/investmentStrategy/combinationProductHandle/localBasic.ajax results:', results);
                    console.log('/investmentMgmt/investmentStrategy/combinationProductHandle/localBasic.ajax fields:', fields);
                    let option ={
                        pageUrl: '/investmentMgmt/investmentStrategy/combinationProductHandle/localBasic.ajax',
                        req,
                        operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
                        investBody:JSON.parse(params),
                        mappingKeyWords:'combinationProductHandle'
                    }
                    if (error) {
                        sysLogger(option.operateType, option.req, option, {result:'操作失败'},investTableName);
                        return res.send({
                            error: 1,
                            msg: '修改失败'
                        });
                    }
                    sysLogger(option.operateType, option.req, option, {result:'操作成功'},investTableName);
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
    app.post('/investmentMgmt/investmentStrategy/combinationProductHandle/serviceSave.ajax', (req, res, next) => {
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
            var sql = `insert into ${tableName} set ?,delete_flag="F",service_id='${req.body.groupid}',creator='${operatorName}',operator='${operatorName}',operate=2,status="1"`;
            console.log('/investmentMgmt/investmentStrategy/combinationProductHandle/serviceSave.ajax sql:', sql);
            console.log('/investmentMgmt/investmentStrategy/combinationProductHandle/serviceSave.ajax params:', params);
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
                    console.log('/investmentMgmt/investmentStrategy/combinationProductHandle/serviceSave.ajax error:', error);
                    console.log('/investmentMgmt/investmentStrategy/combinationProductHandle/serviceSave.ajax results:', results);
                    console.log('/investmentMgmt/investmentStrategy/combinationProductHandle/serviceSave.ajax fields:', fields);
                    let option ={
                        pageUrl: '/investmentMgmt/investmentStrategy/combinationProductHandle/serviceSave.ajax',
                        req,
                        operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
                        investBody:JSON.parse(params),
                        mappingKeyWords:'combinationProductHandle'
                    }
                    if (error) {
                        sysLogger(option.operateType, option.req, option, {result:'操作失败'},investTableName);
                        return res.send({
                            error: 1,
                            msg: '修改失败'
                        });
                    }
                    sysLogger(option.operateType, option.req, option, {result:'操作成功'},investTableName);
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
    app.post('/investmentMgmt/investmentStrategy/combinationProductHandle/localHouse.ajax', (req, res, next) => {
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
            var sql = `UPDATE ${tableName} SET content=?,operate='2',status='1',operator='${operatorName}',update_timestamp=? where local_id=?`;
            console.log('/investmentMgmt/investmentStrategy/combinationProductHandle/localHouse.ajax sql:', sql);
            console.log('/investmentMgmt/investmentStrategy/combinationProductHandle/localHouse.ajax params:', params);
            pool.getConnection((err, connection) => {
                if (err) {
                    return res.send({
                        error: 1,
                        msg: '链接本地数据库失败',
                        data: null
                    });
                }
                connection.query(sql, [params, updateTime, mysqlId], function (error, results, fields) {
                    
                    console.log('/investmentMgmt/investmentStrategy/combinationProductHandle/localHouse.ajax error:', error);
                    console.log('/investmentMgmt/investmentStrategy/combinationProductHandle/localHouse.ajax results:', results);
                    console.log('/investmentMgmt/investmentStrategy/combinationProductHandle/localHouse.ajax fields:', fields);
                    let option ={
                        pageUrl: '/investmentMgmt/investmentStrategy/combinationProductHandle/localHouse.ajax',
                        req,
                        operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
                        investBody:JSON.parse(params),
                        mappingKeyWords:'combinationProductHandle'
                    }
                    if (error) {
                        sysLogger(option.operateType, option.req, option, {result:'操作失败'},investTableName);
                        return res.send({
                            error: 1,
                            msg: '修改失败'
                        });
                    }
                    sysLogger(option.operateType, option.req, option, {result:'操作成功'},investTableName);
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
    app.post('/investmentMgmt/investmentStrategy/combinationProductHandle/deleteParam.ajax', (req, res, next) => {
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
            var sql = `insert into ${tableName} set ?,delete_flag="F",service_id='${req.body.serialno}',creator='${operatorName}',operator='${operatorName}',operate=3,status="1"`;
            console.log('/investmentMgmt/investmentStrategy/combinationProductHandle/deleteParam.ajax sql:', sql);
            console.log('/investmentMgmt/investmentStrategy/combinationProductHandle/deleteParam.ajax params:', params);
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
                    console.log('/investmentMgmt/investmentStrategy/combinationProductHandle/deleteParam.ajax error:', error);
                    console.log('/investmentMgmt/investmentStrategy/combinationProductHandle/deleteParam.ajax results:', results);
                    console.log('/investmentMgmt/investmentStrategy/combinationProductHandle/deleteParam.ajax fields:', fields);
                    let option ={
                        pageUrl: '/investmentMgmt/investmentStrategy/combinationProductHandle/deleteParam.ajax',
                        req,
                        operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
                        investBody:JSON.parse(params),
                        mappingKeyWords:'combinationProductHandle'
                    }
                    if (error) {
                        sysLogger(option.operateType, option.req, option, {result:'操作失败'},investTableName);
                        return res.send({
                            error: 1,
                            msg: '修改失败'
                        });
                    }
                    sysLogger(option.operateType, option.req, option, {result:'操作成功'},investTableName);
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
    app.post('/investmentMgmt/investmentStrategy/combinationProductHandle/deleteLocal.ajax', (req, res, next) => {
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
            var sql = `UPDATE ${tableName} SET delete_flag='T',operate=3,operator='${operatorName}' where local_id=?`;
            console.log('/investmentMgmt/investmentStrategy/combinationProductHandle/deleteLocal.ajax sql:', sql);
            console.log('/investmentMgmt/investmentStrategy/combinationProductHandle/deleteLocal.ajax params:', params);
            pool.getConnection((err, connection) => {
                if (err) {
                    return res.send({
                        error: 1,
                        msg: '链接本地数据库失败',
                        data: null
                    });
                }
                connection.query(sql, [mysqlId], function (error, results, fields) {
                    console.log('/investmentMgmt/investmentStrategy/combinationProductHandle/deleteLocal.ajax error:', error);
                    console.log('/investmentMgmt/investmentStrategy/combinationProductHandle/deleteLocal.ajax results:', results);
                    console.log('/investmentMgmt/investmentStrategy/combinationProductHandle/deleteLocal.ajax fields:', fields);
                    let option ={
                        pageUrl: '/investmentMgmt/investmentStrategy/combinationProductHandle/deleteLocal.ajax',
                        req,
                        operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
                        investBody:{sqlOprate:'撤销',sqlOprator:operatorName},
                        mappingKeyWords:'combinationProductHandle'
                    }
                    if (error) {
                        sysLogger(option.operateType, option.req, option, {result:'操作失败'},investTableName);
                        return res.send({
                            error: 1,
                            msg: '撤销失败'
                        });
                    }
                    sysLogger(option.operateType, option.req, option, {result:'操作成功'},investTableName);
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
    app.post('/investmentMgmt/investmentStrategy/combinationProductHandle/deleteAgain.ajax', (req, res, next) => {
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
            var sql = `UPDATE ${tableName} SET delete_flag='F',operate=3,status='1',operator='${operatorName}' where local_id=?`;
            console.log('/investmentMgmt/investmentStrategy/combinationProductHandle/deleteAgain.ajax sql:', sql);
            console.log('/investmentMgmt/investmentStrategy/combinationProductHandle/deleteAgain.ajax params:', params);
            pool.getConnection((err, connection) => {
                if (err) {
                    return res.send({
                        error: 1,
                        msg: '链接本地数据库失败',
                        data: null
                    });
                }
                connection.query(sql, [mysqlId], function (error, results, fields) {
                    console.log('/investmentMgmt/investmentStrategy/combinationProductHandle/deleteAgain.ajax error:', error);
                    console.log('/investmentMgmt/investmentStrategy/combinationProductHandle/deleteAgain.ajax results:', results);
                    console.log('/investmentMgmt/investmentStrategy/combinationProductHandle/deleteAgain.ajax fields:', fields);
                    let option ={
                        pageUrl: '/investmentMgmt/investmentStrategy/combinationProductHandle/deleteAgain.ajax',
                        req,
                        operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
                        investBody:JSON.parse(params),
                        mappingKeyWords:'combinationProductHandle'
                    }
                    if (error) {
                        sysLogger(option.operateType, option.req, option, {result:'操作失败'},investTableName);
                        return res.send({
                            error: 1,
                            msg: '提交失败'
                        });
                    }
                    sysLogger(option.operateType, option.req, option, {result:'操作成功'},investTableName);
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
    app.post('/investmentMgmt/investmentStrategy/combinationProductHandle/submitCheck.ajax', (req, res, next) => {
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
            var sql = `UPDATE ${tableName} SET content=?,operate='2',status='1',delete_flag='F',update_timestamp=? where id=?`;
            console.log('/investmentMgmt/investmentStrategy/combinationProductHandle/submitCheck.ajax sql:', sql);
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
                    console.log('/investmentMgmt/investmentStrategy/combinationProductHandle/submitCheck.ajax error:', error);
                    console.log('/investmentMgmt/investmentStrategy/combinationProductHandle/submitCheck.ajax results:', results);
                    console.log('/investmentMgmt/investmentStrategy/combinationProductHandle/submitCheck.ajax fields:', fields);
                   
                    let option ={
                        pageUrl: '/investmentMgmt/investmentStrategy/combinationProductHandle/submitCheck.ajax',
                        req,
                        operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
                        investBody:JSON.parse(params),
                        mappingKeyWords:'combinationProductHandle'
                    }
                    if (error) {
                        sysLogger(option.operateType, option.req, option, {result:'操作失败'},investTableName);
                        return res.send({
                            error: 1,
                            msg: '提交失败'
                        });
                    }
                    sysLogger(option.operateType, option.req, option, {result:'操作成功'},investTableName);
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
            var sql = `UPDATE ${tableName} SET content=?,operate='1',status='1',delete_flag='F',update_timestamp=? where id=?`;
            console.log('/investmentMgmt/investmentStrategy/combinationProductHandle/submitCheck.ajax sql:', sql);
            console.log('/investmentMgmt/investmentStrategy/productTradeHandle/submitCheck.ajax params:', params);
            pool.getConnection((err, connection) => {
                if (err) {
                    return res.send({
                        error: 1,
                        msg: '链接本地数据库失败',
                        data: null
                    });
                }
                connection.query(sql, [params, updateTime, mysqlId], function (error, results, fields) {
                    console.log('/investmentMgmt/investmentStrategy/combinationProductHandle/submitCheck.ajax error:', error);
                    console.log('/investmentMgmt/investmentStrategy/combinationProductHandle/submitCheck.ajax results:', results);
                    console.log('/investmentMgmt/investmentStrategy/combinationProductHandle/submitCheck.ajax fields:', fields);
                    let option ={
                        pageUrl: '/investmentMgmt/investmentStrategy/combinationProductHandle/submitCheck.ajax',
                        req,
                        operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
                        investBody:JSON.parse(params),
                        mappingKeyWords:'combinationProductHandle'
                    }
                    if (error) {
                        sysLogger(option.operateType, option.req, option, {result:'操作失败'},investTableName);
                        return res.send({
                            error: 1,
                            msg: '提交失败'
                        });
                    }
                    sysLogger(option.operateType, option.req, option, {result:'操作成功'},investTableName);
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
            var sql = "UPDATE cs_ticket SET delete_flag='T',operate='3',status='1',update_timestamp=? where id=?";
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
                    let option ={
                        pageUrl: '/businessMgmt/businessParamConfig/combinationProductHandle/submitCheck.ajax',
                        req,
                        operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
                        investBody:JSON.parse(params),
                        mappingKeyWords:'combinationProductHandle'
                    }
                    if (error) {
                        sysLogger(option.operateType, option.req, option, {result:'操作失败'},investTableName);
                        return res.send({
                            error: 1,
                            msg: '提交失败'
                        });
                    }
                    sysLogger(option.operateType, option.req, option, {result:'操作成功'},investTableName);
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
    app.post('/investmentMgmt/investmentStrategy/combinationProductHandle/userName.ajax', (req, res, next) => {
        let operator = req.session.loginInfo.userid
        return res.send({
            error: 0,
            msg: '成功',
            data: operator
        });
    });
    // 获取所有组合
    app.post('/investmentMgmt/investmentStrategy/combinationProductHandle/fundGroups.ajax', (req, res, next) => {
        let params = {}
        params.groupId = "ALL";
        let option = {
            pageUrl: '/investmentMgmt/investmentStrategy/combinationProductHandle/fundGroups.ajax',
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
    app.post('/investmentMgmt/investmentStrategy/combinationProductHandle/fundList.ajax', (req, res, next) => {
        console.log('-----',req.body.groupId);
        let option = {
            pageUrl: '/investmentMgmt/investmentStrategy/combinationProductHandle/fundList.aja',
            req,
            url: apiUrlList.fundList,
            qs:{groupId:req.body.groupId},
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
    app.post('/investmentMgmt/investmentStrategy/combinationProductHandle/branchCodeList.ajax', (req, res, next) => {
        let params = {};
        params.pmst = req.body.pmst;
        params.pmkey = req.body.pmkey;
        let option = {
            pageUrl: '/investmentMgmt/investmentStrategy/combinationProductHandle/branchCodeList.aja',
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
    app.post('/investmentMgmt/investmentStrategy/combinationProductHandle/fundGroupType.ajax', (req, res, next) => {
        let params = {};
        params.pmst = req.body.pmst;
        params.pmkey = req.body.pmkey;
        let option = {
            pageUrl: '/investmentMgmt/investmentStrategy/combinationProductHandle/fundGroupType.aja',
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
    app.post('/investmentMgmt/investmentStrategy/combinationProductHandle/ageRangeList.ajax', (req, res, next) => {
        let params = {};
        params.pmst = req.body.pmst;
        params.pmkey = req.body.pmkey;
        let option = {
            pageUrl: '/investmentMgmt/investmentStrategy/combinationProductHandle/ageRangeList.aja',
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
    app.post('/investmentMgmt/investmentStrategy/combinationProductHandle/grouptypeList.ajax', (req, res, next) => {
        let params = {};
        params.pmst = req.body.pmst;
        params.pmkey = req.body.pmkey;
        let option = {
            pageUrl: '/investmentMgmt/investmentStrategy/combinationProductHandle/grouptypeList.aja',
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
    app.post('/investmentMgmt/investmentStrategy/combinationProductHandle/risklevelList.ajax', (req, res, next) => {
        let params = {};
        params.pmst = req.body.pmst;
        params.pmkey = req.body.pmkey;
        let option = {
            pageUrl: '/investmentMgmt/investmentStrategy/combinationProductHandle/risklevelList.aja',
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
    app.post('/investmentMgmt/investmentStrategy/combinationProductHandle/navList.ajax', (req, res, next) => {
        let params = {};
        let fundId = req.body.ids;
        let option = {
            pageUrl: '/investmentMgmt/investmentStrategy/combinationProductHandle/navList.ajax',
            req,
            // url: apiUrlList.navList[0] + fundId + apiUrlList.navList[1],
            url: apiUrlList.navListNew,
            qs:{fundIdList:fundId},
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
    app.post('/investmentMgmt/investmentStrategy/combinationProductHandle/basicParam.ajax', (req, res, next) => {
        let params = {};
        params.groupId = req.body.groupId;
        let option = {
            pageUrl: '/investmentMgmt/investmentStrategy/combinationProductHandle/basicParam.ajax',
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
    app.post('/investmentMgmt/investmentStrategy/combinationProductHandle/details.ajax', (req, res, next) => {
        let params = {};
        params.groupId = req.body.groupId;
        let option = {
            pageUrl: '/investmentMgmt/investmentStrategy/combinationProductHandle/details.aja',
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
    app.post('/investmentMgmt/investmentStrategy/combinationProductHandle/allGroupId.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/investmentMgmt/investmentStrategy/combinationProductHandle/allGroupId.ajax',
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
    app.post('/investmentMgmt/investmentStrategy/combinationProductHandle/fundIdLists.ajax', (req, res, next) => {
        let params = {}
        params.fundIdList = req.body.fundIdList;
        params.sourceType = req.body.sourceType;
        let option = {
            pageUrl: '/investmentMgmt/investmentStrategy/combinationProductHandle/fundIdLists.aja',
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
    app.post('/investmentMgmt/investmentStrategy/combinationProductHandle/getServiceUpdateDialogData.ajax', (req, res, next) => {
        // 获取组合类型列表
        function queryFundGroupTypeList() {
            return new Promise((resolve, reject) => {
                let option = {
                    pageUrl: '/investmentMgmt/investmentStrategy/combinationProductHandle/getServiceUpdateDialogData.ajax ----queryFundGroupTypeList',
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
                    pageUrl: '/investmentMgmt/investmentStrategy/combinationProductHandle/getServiceUpdateDialogData.ajax ----queryRiskTypeList',
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
                    pageUrl: '/investmentMgmt/investmentStrategy/combinationProductHandle/getServiceUpdateDialogData.ajax ----queryRiskLevelList',
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
                    pageUrl: '/investmentMgmt/investmentStrategy/combinationProductHandle/getServiceUpdateDialogData.ajax ----queryAgeRangeList',
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
                    pageUrl: '/investmentMgmt/investmentStrategy/combinationProductHandle/getServiceUpdateDialogData.ajax ----queryBranchCodeList',
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
                    pageUrl: '/investmentMgmt/investmentStrategy/combinationProductHandle/getServiceUpdateDialogData.ajax ----queryGroupDetail',
                    req,
                    url: apiUrlList.details,
                    qs: {groupId: groupId},
                    timeout: 15000,
                    json: true
                };
                request(option, (error, response, body) => {
                    if (error) {
                        return reject({message: '获取组合详情失败'});
                    }
                    if (body && body.returnCode === 0 && Array.isArray(body.body)) {
                            let resolveObj = {};
                            let result = body.body[0];
							console.log('result=====',JSON.stringify(result));
                            resolveObj.serialno = result.baseInfo.serialno;
                            resolveObj.fundGroupType = result.baseInfo.fundgroupType;
                            resolveObj.groupId = result.baseInfo.groupid;
                            resolveObj.groupName = result.baseInfo.groupname;
                            resolveObj.fundGroupDesc = result.baseInfo.fundgroupDesc;
                            resolveObj.targetContract =  result.baseInfo.targetContract?result.baseInfo.targetContract:'';
                            resolveObj.strategyMode = result.baseInfo.strategyMode?result.baseInfo.strategyMode:'';
                            resolveObj.fundGroupAdvise = result.baseInfo.fundgroupAdvise;
                            resolveObj.recommendReason = result.baseInfo.recommendReason;
                            resolveObj.recommendHoldTime = result.baseInfo.recommendHoldTime;
                            resolveObj.acceptMode = result.subdatetimeList&&result.subdatetimeList[0] ? result.subdatetimeList[0].accptmd : '0';
                            resolveObj.ageRange = result.baseInfo.ageRange || '';
                            resolveObj.accptType = result.subdatetimeList&&result.subdatetimeList[0] ? result.subdatetimeList[0].accptType : '2';
                            resolveObj.branchCode = result.subdatetimeList&&result.subdatetimeList.length > 0 ? result.subdatetimeList.map(item => item.branchcode) : [];
                            resolveObj.stopStatus = result.subdatetimeList&&result.subdatetimeList[0] ? result.subdatetimeList[0].manualFundst : '0';
                            resolveObj.manualStartTime = result.subdatetimeList&&result.subdatetimeList[0] ? (result.subdatetimeList[0]['manualStartTime'] ? result.subdatetimeList[0].manualStartTime.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1-$2-$3 $4:$5:$6') : '') : "";
                            resolveObj.manualEndTime = result.subdatetimeList&&result.subdatetimeList[0] ? (result.subdatetimeList[0]['manualEndTime'] ? result.subdatetimeList[0].manualEndTime.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1-$2-$3 $4:$5:$6') : '') : "";
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
                            resolveObj.rightMinratePerc = result.baseInfo.rightMinratePerc;
                            resolveObj.turnoverRatePerc = result.baseInfo.turnoverRatePerc;
                            resolveObj.valueMinratePerc = result.baseInfo.valueMinratePerc;
                            resolveObj.valueMaxratePerc = result.baseInfo.valueMaxratePerc;
                            resolveObj.isBlacklist = result.baseInfo.isBlacklist;
                            resolveObj.isTradeLimit = result.baseInfo.isTradeLimit;
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
                    pageUrl: '/investmentMgmt/investmentStrategy/combinationProductHandle/getServiceUpdateDialogData.ajax ----queryBigRedeemRate',
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
                    pageUrl: '/investmentMgmt/investmentStrategy/combinationProductHandle/getServiceUpdateDialogData.ajax ----queryFundGroupChangeDetailList',
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
            console.log(error.message);
            res.send({error: 1, msg: error.message, data: null});
        });
    });
    //添加按钮获取所有基金
    app.post('/investmentMgmt/investmentStrategy/combinationProductHandle/fundGroupFundListForSelect.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/investmentMgmt/investmentStrategy/combinationProductHandle/fundGroupFundListForSelect.ajax',
            req,
            url: apiUrlList.fundList,
            qs:{groupId:req.body.groupId},
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
    app.post('/investmentMgmt/investmentStrategy/combinationProductHandle/checkFundCanSelect.ajax', (req, res, next) => {
        function checkFundNav(fundItem) { // 查询基金净值
            return new Promise((resolve, reject) => {
                let option = {
                    pageUrl: '/investmentMgmt/investmentStrategy/combinationProductHandle/checkFundCanSelect.ajax ----checkFundNav',
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
                    pageUrl: '/investmentMgmt/investmentStrategy/combinationProductHandle/checkFundCanSelect.ajax ----checkFundCanPurchased',
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
			// 此处只校验有无净值只要有净值都可选
            console.log('--------result【0】-----',resultArr[0]);
            if(!resultArr[0]){ // 无净值，默认不可选
                return res.send({error: 0, msg: '不可选', data: {canSelect: 2, acceptModeListForFundId: []}});
            }else{
				return res.send({error: 0, msg: '可选', data: {canSelect: 1, acceptModeListForFundId: resultArr[1]}});
			}
            // let list = resultArr[1];
            // if(list.some(item => item.purchase === 'Y' && item.redeem === 'Y')){
            //     return res.send({error: 0, msg: '可选', data: {canSelect: 1, acceptModeListForFundId: resultArr[1]}});
            // }
            // else {
            //     return res.send({error: 0, msg: '不可选', data: {canSelect: 2, acceptModeListForFundId: resultArr[1]}});
            // }
          
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
            // return res.send({error: 0, msg: '可选', data: {canSelect: 1, acceptModeListForFundId: resultArr[1]}});
        }).catch(error => {
            return res.send({error: 1, msg: error.message, data: {canSelect: 2, acceptModeListForFundId: []}});
        });
    });
	// 批量上传成分基金
	app.post('/investmentMgmt/investmentStrategy/combinationProductHandle/uploadXls.ajax', (req, res, next) => {
		const groupId = req.query.groupId;
        let form = new formidable.IncomingForm();
        form.keepExtensions = true; //保留文件后缀名
        form.parse(req, (err, fields, files) => {
            console.log('参数表管理页面表单接收完毕:', fields);
            console.log('参数表管理页面表单文件接收完毕:', files);
            if (files.file.path) {
				console.log(node_xlsx.parse(files.file.path)[0].data);
				// return
				try {
					let fundInfoExcelData = node_xlsx.parse(files.file.path)[0].data.slice(1).map((item,index) => {
						let fundIdOptionalList = [];
						item[2]&&fundIdOptionalList.push(String(item[2]))
						item[3]&&fundIdOptionalList.push(String(item[3]))
						item[4]&&fundIdOptionalList.push(String(item[4]))
						item[5]&&fundIdOptionalList.push(String(item[5]))
						return {
							fundId: item[0]?String(item[0]):item[0],
							fundPercent:item[1],
							fundIdOptionalList
						};
					})
					fs.unlink(files.file.path, function (err) {
						if (err) {
							console.log('文件删除失败', err)
						}
					}) //删除文件
					console.log(fundInfoExcelData);
					// 校验成分基金是否正确
					let checkCFFund = new Promise((resolve,reject)=>{
						let option = {
							pageUrl: '/investmentMgmt/investmentStrategy/combinationProductHandle/uploadXls.ajax ---checkCFFund',
							req,
							url: apiUrlList.fundList,
							qs:{groupId},
							timeout: 15000,
							json: true
						};
						request(option, (error, response, body) => {
							if (error) {
								return reject({
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
								return resolve(body);
							} else if (result && result.returnCode != 9999) {
								return reject({
									error: 1,
									msg: result.returnMsg
								});
							} else {
								return reject({
									error: 1,
									msg: '查询失败'
								});
							}
						});
					});	
					checkCFFund.then((result=>{
						// 所有可选成分基金列表全id
						const fundList = result.body;
						const fundIdList = result.body.map((item)=>item.fundId);
						let fundCheckList = {fundId:[],fundIdOptionalList:[]}
						fundInfoExcelData.forEach((item)=>{
							if(!fundIdList.includes(item.fundId)){
								if(!fundCheckList.fundId.includes(item.fundId)){
									fundCheckList.fundId.push(item.fundId)
								}
							}
							item.fundIdOptionalList.forEach(function(citem){
								if(!fundIdList.includes(citem)){
									if(!fundCheckList.fundIdOptionalList.includes(citem)){
										fundCheckList.fundIdOptionalList.push(citem)
									}
								}
							})
						})
						// 如果有成分基金,备选基金不在产品池需要提醒
						if(fundCheckList.fundId.length!==0||fundCheckList.fundIdOptionalList.length!==0){
							let errorTips = '';
							if(fundCheckList.fundId.length>0){
								errorTips+='主基金代码';
								fundCheckList.fundId.forEach((item)=>{
									errorTips+=item+'、'
								})
								errorTips = errorTips.substring(0,errorTips.length-1);
								errorTips += '不在产品池中。'
							}
							if(fundCheckList.fundIdOptionalList.length>0){
								errorTips+=`备选基金代码`;
								fundCheckList.fundIdOptionalList.forEach((item)=>{
									errorTips+=item+'、'
								})
								errorTips = errorTips.substring(0,errorTips.length-1);
								errorTips += '不在产品池中'
							}
							errorTips+='，请更新产品池后再进行处理。'
							return res.send({
								error: 1,
								msg: errorTips
							})
						}
						// 都在产品池的情况下校验所有产品的净值
						let excelDatafundIdList = [];
						fundInfoExcelData.forEach((item)=>{
							if(!excelDatafundIdList.includes(item.fundId)){
								excelDatafundIdList.push(item.fundId);
							}
							item.fundIdOptionalList.forEach(citem=>{
								if(!excelDatafundIdList.includes(citem)){
									excelDatafundIdList.push(citem);
								}
							})
						});
						console.log('excelDatafundIdList-----------',excelDatafundIdList);
						Promise.all(excelDatafundIdList.map(item=>checkFundNav(item))).then(resultArr=>{
							// 获取没有净值的fundidList
							let failFundList = [];
							failFundList = resultArr.filter(item=>item);
							console.log(failFundList);
							if(failFundList.length===0){
								let resultObject = {
									fundInfoExcelData,
									fundList
								}
								return res.send({
									error:0,
									data:resultObject,
									msg:'上传成功'
								})
							}else{
								let errorTips = '';
								failFundList.forEach((item)=>{
									errorTips += '以下基金没有净值，';
									errorTips += item+'、';
									errorTips = errorTips.substring(0,errorTips.length-1)
									errorTips += '请重新上传。';
								})
								return res.send({
									error:1,
									data:null,
									msg:errorTips
								})
							}
						}).catch(error=>{
							return res.send(error)
						})
					})).catch(error=>{
						return res.send(error)
					})
				} catch (error) {
					return res.send({error: 1,msg: 'excel格式填写不正确'})
				}
				// 校验净值
				function checkFundNav(fundId) { // 查询基金净值
					return new Promise((resolve, reject) => {
						let option = {
							pageUrl: '/investmentMgmt/investmentStrategy/combinationProductHandle/checkFundCanSelect.ajax ----checkFundNav',
							req,
							url: apiUrlList.navListNew,
							qs:{fundIdList:fundId},
							timeout: 15000,
							json: true
						};
						request(option, (error, response, body) => {
							if (error) {
								return reject({
									error: 1,
									msg: `查询是否有净值失败`
								});
							}
							if (body.returnCode == 0) {
								// 校验通过返回false；检验不通过返回不通过的fundId
								if(body.body && Array.isArray(body.body)&&body.body[0]){
									return resolve(false);
								}else{
									return resolve(fundId);
								}
							} else if (body && body.returnCode != 9999) {
								return reject({
									error: 1,
									msg: body.returnMsg
								});
							} else { 
								return reject({
									error: 1,
									msg: `查询是否有净值失败`
								});
							}
						});
					});
				}
            } else {
                return res.send({
                    error: 1,
                    msg: `上传失败,读取文件失败`
                });
            }


        });
    });
    // 修改业务数据存到经办数据库中;
    app.post('/investmentMgmt/investmentStrategy/combinationProductHandle/saveServiceAllUpdateDialogData.ajax', (req, res, next) => {
        let reqBodyData = JSON.parse(req.body.dialogData);
        console.log('req------------------------------',reqBodyData.groupId);
        // return;
        let localData = new Promise((resolve,reject)=>{
            var sql = `SELECT content,local_id,status,delete_flag,operate,operator,creator,reviewer,review_time,update_timestamp,remark FROM ${tableName} WHERE delete_flag='F'`;
            // 判断operate==2为修改操作时说明该数据已经有已生效数据，正是从已生效数据中到经办时的操作
            sql += ` AND operate='2'`;
            // 查询已生效的service_id中是否有已经提交了经办的组合id
            if(reqBodyData.groupId){
                sql += ` AND service_id='${reqBodyData.groupId}'`;
            }
            // 除了复核状态为通过状态的数据，其他状态都属于流程中的状态
            sql += ` AND status!=0`;
            sql += ` AND (JSON_EXTRACT(content, '$.fundgroupNewFundgroupDO.isInvestment')='Y' OR JSON_EXTRACT(content, '$.dialogData.isInvestment')='Y' OR JSON_EXTRACT(content, '$.dialogData') LIKE '%isInvestment\\\\\\\\":\\\\\\\\"Y%')`;
            // sql += ` AND (JSON_EXTRACT(content, '$.dialogData') LIKE '%isInvestment\\\\":\\\\"Y%')`;
            sql += ' ORDER BY update_timestamp DESC';
            console.log('/investmentMgmt/investmentStrategy/combinationProductHandle/getTableData.ajax sql:', sql);
            pool.getConnection((err, connection) => {
                if (err) {
                    reject({
                        error: 1,
                        msg: '链接本地数据库失败',
                        data: null
                    })
                }
                connection.query(sql, function (error, results, fields) {
                    console.log('/investmentMgmt/investmentStrategy/combinationProductHandle/getTableData.ajax error:', error);
                    console.log('/investmentMgmt/investmentStrategy/combinationProductHandle/getTableData.ajax results:', results);
                    console.log('/investmentMgmt/investmentStrategy/combinationProductHandle/getTableData.ajax fields:', fields);
                    if (error) {
                        reject({
                            error: 1,
                            msg: '操作失败',
                            data: null
                        })
                    }
                    // 获取mysql数据字段ID
                    resolve(results)
                    connection.release();
                });
            })
        })
        localData.then((result)=>{
            console.log('localData---',result.length);
            if(result.length>0){
                // 说明经办风控复核流程中已经有数据，此时不再提交至经办数据
                return res.send({error: 1, msg: '当前数据已存在经办流程中', data: null});
            }else{
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
                    let userName = req.session.loginInfo.userid;
                    // console.log('reqBodyData.isAddFundGroup----',reqBodyData.isAddFundGroup);
                    let SQL;
                    if(reqBodyData.isAddFundGroup){
                        SQL = `insert into ${tableName} set content='${JSON.stringify(params).replace(/\\n/g, '')}',delete_flag='F',service_id='${reqBodyData.groupId}',creator='${userName}',operator='${userName}',operate=2,status='1'`;
                    }else{
                        SQL = `insert into ${tableName} set content='${JSON.stringify(params).replace(/\\n/g, '')}',delete_flag='F',service_id='${reqBodyData.groupId}',creator='${userName}',operator='${userName}',operate=2,status='2'`;
                    }
                    console.log('/investmentMgmt/investmentStrategy/combinationProductHandle/saveServiceAllUpdateDialogData.ajax SQL:', SQL);
                    pool.getConnection((err, connection) => {
                        if (err) {
                            return res.send({
                                error: 1,
                                msg: '链接本地数据库失败',
                                data: null
                            });
                        }
                        connection.query(SQL, function (error, results, fields) {
                            console.log('/investmentMgmt/investmentStrategy/combinationProductHandle/saveServiceAllUpdateDialogData.ajax error:', error);
                            console.log('/investmentMgmt/investmentStrategy/combinationProductHandle/saveServiceAllUpdateDialogData.ajax results:', results);
                            console.log('/investmentMgmt/investmentStrategy/combinationProductHandle/saveServiceAllUpdateDialogData.ajax fields:', fields);
                            if (error) {
                                return reject();
                            }
                            let option ={
                                pageUrl: '/investmentMgmt/investmentStrategy/combinationProductHandle/saveServiceAllUpdateDialogData.ajax',
                                req,
                                operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
                                investBody:params,
                                mappingKeyWords:'combinationProductHandle'
                            }
                            if (error) {
                                sysLogger(option.operateType, option.req, option, {result:'操作失败'},investTableName);
                                return reject();
                            }
                            sysLogger(option.operateType, option.req, option, {result:'操作成功'},investTableName);
                            return resolve();
                        });
                        connection.release();
                    });
                });
                insertSQLPromise.then(() => {
                    return res.send({error: 0, msg: '已提交至经办数据', data: null});
                }).catch(() => {
                    return res.send({error: 1, msg: '提交至经办数据失败', data: null});
                });
            }
        }).catch(errors=>{
            return res.send({error: 0, msg: errors.msg, data: null});
        })

        
        
    });
    // 获取本地全量修改弹窗所需列表数据
    app.post('/investmentMgmt/investmentStrategy/combinationProductHandle/getLocalDialogListData.ajax', (req, res, next) => {
        // 获取组合类型列表
        function queryFundGroupTypeList() {
            return new Promise((resolve, reject) => {
                let option = {
                    pageUrl: '/investmentMgmt/investmentStrategy/combinationProductHandle/getLocalDialogListData.ajax ----queryFundGroupTypeList',
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
                    pageUrl: '/investmentMgmt/investmentStrategy/combinationProductHandle/getLocalDialogListData.ajax ----queryRiskTypeList',
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
                    pageUrl: '/investmentMgmt/investmentStrategy/combinationProductHandle/getLocalDialogListData.ajax ----queryRiskLevelList',
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
                    pageUrl: '/investmentMgmt/investmentStrategy/combinationProductHandle/getLocalDialogListData.ajax ----queryAgeRangeList',
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
                    pageUrl: '/investmentMgmt/investmentStrategy/combinationProductHandle/getLocalDialogListData.ajax ----queryBranchCodeList',
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
    app.post('/investmentMgmt/investmentStrategy/combinationProductHandle/saveLocalAllUpdateDialogData.ajax', (req, res, next) => {
        let mySQLId = req.body.mySQLId;
        let updateTime = formatTime(req.body.update_timestamp);
        let reqBodyData = JSON.parse(req.body.dialogData);
        console.log('reqBodyData',reqBodyData);
        // 没有调仓将直接进行复核不再执行风控
        let status = '2';
        if(reqBodyData.isAddFundGroup){
            status = '1'
        }
        let updateSQLPromise = new Promise((resolve, reject) => {
            let userName = req.session.loginInfo.userid
            let SQL = `UPDATE ${tableName} SET content=JSON_SET(content,'$.groupname','${reqBodyData.groupName}'),content=JSON_SET(content,'$.fundgroupType','${reqBodyData.fundGroupType}'),content=JSON_SET(content,'$.grouptype','${reqBodyData.riskType}'),content=JSON_SET(content,'$.dialogData','${JSON.stringify(reqBodyData)}'),operator='${userName}',status='${status}' WHERE local_id=${mySQLId} AND update_timestamp='${updateTime}'`;
            console.log('/investmentMgmt/investmentStrategy/combinationProductHandle/saveLocalAllUpdateDialogData.ajax SQL:', SQL);
            pool.getConnection((err, connection) => {
                if (err) {
                    return res.send({
                        error: 1,
                        msg: '链接本地数据库失败',
                        data: null
                    });
                }
                connection.query(SQL, function (error, results, fields) {
                    console.log('/investmentMgmt/investmentStrategy/combinationProductHandle/saveLocalAllUpdateDialogData.ajax error:', error);
                    console.log('/investmentMgmt/investmentStrategy/combinationProductHandle/saveLocalAllUpdateDialogData.ajax results:', results);
                    console.log('/investmentMgmt/investmentStrategy/combinationProductHandle/saveLocalAllUpdateDialogData.ajax fields:', fields);
                    let option ={
                        pageUrl: '/investmentMgmt/investmentStrategy/combinationProductHandle/saveLocalAllUpdateDialogData.ajax',
                        req,
                        operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
                        investBody:reqBodyData,
                        mappingKeyWords:'combinationProductHandle'
                    }
                    if (error) {
                        sysLogger(option.operateType, option.req, option, {result:'操作失败'},investTableName);
                        return reject();
                    }
                    sysLogger(option.operateType, option.req, option, {result:'操作成功'},investTableName);
                    if (results.affectedRows) {
                        return resolve();
                    } else {
                        return reject('数据不存在或已更新,请刷新页面');
                    }
                });
                connection.release();
            });
        });
        updateSQLPromise.then(() => {
            return res.send({error: 0, msg: '修改成功', data: null});
        }).catch(() => {
            return res.send({error: 1, msg: '修改失败', data: null});
        });
        
    });
    // 获取备选基金数据
    app.post('/investmentMgmt/investmentStrategy/combinationProductHandle/checkOptionalFundList.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/investmentMgmt/investmentStrategy/combinationProductHandle/checkOptionalFundList.ajax',
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
    app.post('/investmentMgmt/investmentStrategy/combinationProductHandle/checkTradeStatus.ajax', (req, res, next) => {
        let params = {};
        let fundId = req.body.ids;
        let option = {
            pageUrl: '/investmentMgmt/investmentStrategy/combinationProductHandle/checkTradeStatus.ajax',
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
    app.post('/investmentMgmt/investmentStrategy/combinationProductHandle/uploadDoc.ajax', (req, res, next) => {
			let updateGroupId = req.query.updateGroupId;//以投顾id作为path
			try {
					!fs.existsSync(apiConfig.filePathExternal) && fs.mkdirSync(apiConfig.filePathExternal);
					!fs.existsSync(filePathExternal) && fs.mkdirSync(filePathExternal);
					let allPath = filePathExternal+'/'+updateGroupId;
					let allPathUrl = filePathExternal_url+'/'+updateGroupId;
					!fs.existsSync(allPath) && fs.mkdirSync(allPath);
					let form = new formidable.IncomingForm();
					form.uploadDir = allPath;
					form.keepExtensions = true;
					form.parse(req, (err, fields, files) => {
							console.log('数据接收完毕:', fields);
							console.log('文件接收完毕:', files);
							let originFilePath = path.resolve(files.file.path);
							let fileName = files.file.name;
							fs.createReadStream(originFilePath).pipe(fs.createWriteStream(`${allPath}/${fileName}`));
							fs.unlinkSync(originFilePath);
							res.send({
									error: 0,
									msg: '上传成功',
									data: {
											fileName: `${allPathUrl}/${fileName}`
									}
							});
					});
			} catch (error) {
					console.log('/investmentMgmt/investmentStrategy/combinationProductHandle/uploadDoc.ajax -------- 文件上传失败error:', error);
					res.send({
							error: 1,
							msg: '上传失败',
							data: null
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
// function investSysLogger(pageUrl,req,operateType,SQL,body){
//     let option ={
//         pageUrl,
//         req,
//         operateType, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
//         SQL:SQL.replace(/[\'|\"]/g,''),
//         body
//       }
//       sysLogger(option.operateType, option.req, option, body,'uop_log_invest');
// }