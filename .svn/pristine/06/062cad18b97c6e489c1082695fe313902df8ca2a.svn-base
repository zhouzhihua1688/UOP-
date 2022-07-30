const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').investmentStrategy.combinationProductRiskCheck;
const request_obs = require('../../../local_data/request_obs');
const original_request = require('request');
const formidable = require('formidable');
const fs = require('fs');
const tableName = 'bm_cpc_combination';

module.exports = function (app) {
    //查询列表数据
    app.post('/investmentMgmt/investmentStrategy/combinationProductRiskCheck/getTableData.ajax', (req, res, next) => {
        let paramsStatus = {};
        paramsStatus.type = req.body.type;
        let reviewStatus = req.body.reviewStatus; //复核状态值
        // 查询本地数据库
        // if (paramsStatus.type == "1") {
            let sql = `SELECT content,local_id,status,delete_flag,operate,comment,operator,creator,reviewer,review_time,update_timestamp,remark FROM ${tableName} WHERE delete_flag='F' AND status='4'`;
            // if (req.body.reviewStatus) {
            //     sql += ` AND status='${req.body.reviewStatus}'`;
            // }
            if (req.body.groupid) {
                sql += ` AND JSON_EXTRACT(content, '$.groupid')='${req.body.groupid}'`;
            }
            if (req.body.fundgroupType) {
                sql += ` AND JSON_EXTRACT(content, '$.fundgroupType')='${req.body.fundgroupType}'`;
            }
            sql += ` AND (JSON_EXTRACT(content, '$.fundgroupNewFundgroupDO.isInvestment')='Y' OR JSON_EXTRACT(content, '$.dialogData.isInvestment')='Y' OR JSON_EXTRACT(content, '$.dialogData') LIKE '%isInvestment\\\\\\\\":\\\\\\\\"Y%')`;
            sql += ' ORDER BY update_timestamp DESC';
            console.log('/investmentMgmt/investmentStrategy/combinationProductRiskCheck/getTableData.ajax sql:', sql);
            pool.getConnection((err, connection) => {
                if (err) {
                    return res.send({
                        error: 1,
                        msg: '链接本地数据库失败',
                        data: null
                    });
                }
                connection.query(sql, function (error, results, fields) {
                    console.log('/investmentMgmt/investmentStrategy/combinationProductRiskCheck/getTableData.ajax error:', error);
                    console.log('/investmentMgmt/investmentStrategy/combinationProductRiskCheck/getTableData.ajax results:', results);
                    console.log('/investmentMgmt/investmentStrategy/combinationProductRiskCheck/getTableData.ajax fields:', fields);
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
                        content.comment = item.comment;
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
        // }
    });
    // 风控数据检查
    app.post('/investmentMgmt/investmentStrategy/combinationProductRiskCheck/checkRisk.ajax', (req, res, next) => {
        // --------------------------  风险评控入参 ------------------------------
        let checkParams = {};
        let otherParams ={};
        // console.log(typeof req.body.isAllUpdate);
        // 全量修改的风控取参
        if(req.body.dialogData){
            let reqBodyData = req.body.dialogData;
            checkParams.groupId = reqBodyData.groupId;
            checkParams.groupName = reqBodyData.groupName;
            checkParams.groupType = reqBodyData.fundGroupType;
            checkParams.stockPercentForRights = reqBodyData.rightLimit;
            checkParams.largeRedemptionPercent = reqBodyData.largeRedemptionPercent;
            checkParams.isInvestment = true;
          
            checkParams.createTimestamp = new Date(String(req.body.stringEstablishDateForRisk).slice(0, 8).replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')).getTime();
            checkParams.changeTimestamp = new Date(String(req.body.updateTime).slice(0, 8).replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')).getTime();;
            reqBodyData.fundGroupChangeDetailList = reqBodyData.fundGroupChangeDetailList.filter((item)=>{
                return item.fundList&&item.fundList.length>0
            })

            if(reqBodyData.isAddFundGroup=='true'){
                checkParams.opType = '1';
                checkParams.fundDetails = reqBodyData.newFundGroupChange.fundList.map(item => {
                    return {
                        fundId: item.fundId,
                        fundName: item.fundName,
                        fundPercent: item.fundPercent,
                        optionalFundIds: item.optionalFundList ? item.optionalFundList.map(item => item.fundId) : []
                    };
                });  
                
                checkParams.oldFundDetails = reqBodyData.fundGroupChangeDetailList[0].fundList.map(item => {
                    return {
                        fundId: item.fundId,
                        fundName: item.fundName,
                        fundPercent: item.fundPercent,
                        optionalFundIds: item.optionalFundList ? item.optionalFundList.map(item => item.fundId) : []
                    };
                });
            }else{
                // checkParams.opType = '0';
                // checkParams.fundDetails = reqBodyData.fundGroupChangeDetailList[0].fundList.map(item => {
                //     return {
                //         fundId: item.fundId,
                //         fundName: item.fundName,
                //         fundPercent: item.fundPercent,
                //         optionalFundIds: item.optionalFundList ? item.optionalFundList.map(item => item.fundId) : []
                //     };
                // });
                return res.send({
                    error: 0,
                    msg: '风控检查通过'
                });
            }
            otherParams.rightLimit = reqBodyData.rightLimit;
            otherParams.rightMaxratePerc = reqBodyData.rightMaxratePerc;
            otherParams.singlevalueCustmaxPerc = reqBodyData.singlevalueCustmaxPerc;
            otherParams.categoryunitGroupmaxPerc = reqBodyData.categoryunitGroupmaxPerc;
            otherParams.turnoverRatePerc = reqBodyData.turnoverRatePerc;
            otherParams.singleunitGroupmaxPerc = reqBodyData.singleunitGroupmaxPerc;
            otherParams.rightMinratePerc = reqBodyData.rightMinratePerc;
            otherParams.valueMinratePerc = reqBodyData.valueMinratePerc;
            otherParams.valueMaxratePerc = reqBodyData.valueMaxratePerc;
            otherParams.isBlacklist = reqBodyData.isBlacklist;
            otherParams.isTradeLimit = reqBodyData.isTradeLimit;
            otherParams.noPushServerWords = reqBodyData.noPushServerWords;
        }else{
            checkParams.groupId = req.body.groupid;
            checkParams.groupName = req.body.groupname;
            checkParams.groupType = req.body.grouptype;
            checkParams.stockPercentForRights = req.body.rightLimit;
            checkParams.largeRedemptionPercent = req.body.largeRedemptionPercent;
            checkParams.fundDetails = req.body.fundgroupChangeROListForRisk.map(ROListItem => {
                return ROListItem.fundgroupChangeDetailList.map(item => {
                    return {
                        fundId: item.fundid,
                        fundName: item.fundName,
                        fundPercent: item.fundPercent,
                        optionalFundIds: item.optionalFundList ? item.optionalFundList.map(item => item.fundId) : []
                    };
                });
            }).reduce((prev, after) => prev.concat(after));
            checkParams.isInvestment = true;
            checkParams.opType = '0';
            checkParams.createTimestamp = new Date(String(req.body.stringEstablishDateForRisk).slice(0, 8).replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')).getTime();
            otherParams.rightLimit = req.body.rightLimit;
            otherParams.rightMaxratePerc = req.body.rightMaxratePerc;
            otherParams.singlevalueCustmaxPerc = req.body.singlevalueCustmaxPerc;
            otherParams.categoryunitGroupmaxPerc = req.body.categoryunitGroupmaxPerc;
            otherParams.turnoverRatePerc = req.body.turnoverRatePerc;
            otherParams.singleunitGroupmaxPerc = req.body.singleunitGroupmaxPerc;
            otherParams.rightMinratePerc = req.body.rightMinratePerc;
            otherParams.valueMinratePerc = req.body.valueMinratePerc;
            otherParams.valueMaxratePerc = req.body.valueMaxratePerc;
            otherParams.isBlacklist = req.body.isBlacklist;
            otherParams.isTradeLimit = req.body.isTradeLimit;
            otherParams.noPushServerWords = req.body.noPushServerWords;
        }
        // checkParams
        // console.log(checkParams,'-----------');
        let checkParamsCopy = JSON.parse(JSON.stringify(checkParams));
        let investParams=Object.assign(checkParamsCopy,otherParams);
        investParams = JSON.parse(JSON.stringify(investParams));
        delete investParams['isInvestment'];
        delete investParams['createTimestamp'];
        let option = {
            pageUrl: '/investmentMgmt/investmentStrategy/combinationProductRiskCheck/checkRisk.ajax',
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
            let option ={
                pageUrl: '/investmentMgmt/investmentStrategy/combinationProductRiskCheck/checkRisk.ajax',
                req,
                operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
                investBody:investParams,
                mappingKeyWords:'combinationProductRiskCheck'
            }
            console.log(body);
            sysLogger(option.operateType, option.req, option, {result:body.data},'uop_log_invest');
            if (error) {
                return res.send({
                    error: 1,
                    msg: '风控检查未通过'
                });
            }
            if (body.code == 0) { // 风控审核通过
                // return resolve();
                return res.send({
                    error: 0,
                    msg: '风控检查通过'
                });
            } else if (body.code == 1 || body.code == 2 || body.code == 3) {  // 风控审核不通过/参数错误/服务器异常
                // return reject({error:body.data});
                return res.send({
                    error: 1,
                    msg: body.data
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '风控检查未通过'
                });
            }
        });
        
    });
    // 风控数据通过
    app.post('/investmentMgmt/investmentStrategy/combinationProductRiskCheck/reviewRisk.ajax', (req, res, next) => {
        // --------------------------  风险评控入参 ------------------------------
        let checkParams = {};
        let otherParams ={};
        // 是否调风控接口
        let isRisk =  true;
        // console.log(typeof req.body.isAllUpdate);
        // 全量修改的风控取参
        if(req.body.dialogData){
            let reqBodyData = req.body.dialogData;
            checkParams.groupId = reqBodyData.groupId;
            checkParams.groupName = reqBodyData.groupName;
            checkParams.groupType = reqBodyData.fundGroupType;
            checkParams.stockPercentForRights = reqBodyData.rightLimit;
            checkParams.largeRedemptionPercent = reqBodyData.largeRedemptionPercent;
            checkParams.isInvestment = true;
            
            // checkParams.createTimestamp = new Date(String(req.body.stringEstablishDateForRisk).slice(0, 8).replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')).getTime();
            console.log(req.body.stringEstablishDateForRisk,'-----------stringEstablishDateForRisk');
            checkParams.createTimestamp = new Date(String(req.body.stringEstablishDateForRisk).slice(0, 8).replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')).getTime();
            checkParams.changeTimestamp = new Date(String(req.body.updateTime).slice(0, 8).replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')).getTime();;
            reqBodyData.fundGroupChangeDetailList = reqBodyData.fundGroupChangeDetailList.filter((item)=>{
                return item.fundList&&item.fundList.length>0
            })
            if(reqBodyData.isAddFundGroup=='true'){
                checkParams.opType = '1';
                checkParams.fundDetails = reqBodyData.newFundGroupChange.fundList.map(item => {
                    return {
                        fundId: item.fundId,
                        fundName: item.fundName,
                        fundPercent: item.fundPercent,
                        optionalFundIds: item.optionalFundList ? item.optionalFundList.map(item => item.fundId) : []
                    };
                });  
                
                checkParams.oldFundDetails = reqBodyData.fundGroupChangeDetailList[0].fundList.map(item => {
                    return {
                        fundId: item.fundId,
                        fundName: item.fundName,
                        fundPercent: item.fundPercent,
                        optionalFundIds: item.optionalFundList ? item.optionalFundList.map(item => item.fundId) : []
                    };
                });
            }else{
                // checkParams.opType = '0';
                // checkParams.fundDetails = reqBodyData.fundGroupChangeDetailList[0].fundList.map(item => {
                //     return {
                //         fundId: item.fundId,
                //         fundName: item.fundName,
                //         fundPercent: item.fundPercent,
                //         optionalFundIds: item.optionalFundList ? item.optionalFundList.map(item => item.fundId) : []
                //     };
                // });
                // 调仓信息未更改
                isRisk = false;
            }
            otherParams.rightLimit = reqBodyData.rightLimit;
            otherParams.rightMaxratePerc = reqBodyData.rightMaxratePerc;
            otherParams.singlevalueCustmaxPerc = reqBodyData.singlevalueCustmaxPerc;
            otherParams.categoryunitGroupmaxPerc = reqBodyData.categoryunitGroupmaxPerc;
            otherParams.turnoverRatePerc = reqBodyData.turnoverRatePerc;
            otherParams.singleunitGroupmaxPerc = reqBodyData.singleunitGroupmaxPerc;
            otherParams.rightMinratePerc = reqBodyData.rightMinratePerc;
            otherParams.valueMinratePerc = reqBodyData.valueMinratePerc;
            otherParams.valueMaxratePerc = reqBodyData.valueMaxratePerc;
            otherParams.isBlacklist = reqBodyData.isBlacklist;
            otherParams.isTradeLimit = reqBodyData.isTradeLimit;
            otherParams.noPushServerWords = reqBodyData.noPushServerWords;
        }else{
            checkParams.groupId = req.body.groupid;
            checkParams.groupName = req.body.groupname;
            checkParams.groupType = req.body.grouptype;
            checkParams.stockPercentForRights = req.body.rightLimit;
            checkParams.largeRedemptionPercent = req.body.largeRedemptionPercent;
            checkParams.fundDetails = req.body.fundgroupChangeROListForRisk.map(ROListItem => {
                return ROListItem.fundgroupChangeDetailList.map(item => {
                    return {
                        fundId: item.fundid,
                        fundName: item.fundName,
                        fundPercent: item.fundPercent,
                        optionalFundIds: item.optionalFundList ? item.optionalFundList.map(item => item.fundId) : []
                    };
                });
            }).reduce((prev, after) => prev.concat(after));
            checkParams.isInvestment = true;
            checkParams.opType = '0';
            
            checkParams.createTimestamp = new Date(String(req.body.stringEstablishDateForRisk).slice(0, 8).replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')).getTime();
            otherParams.rightLimit = req.body.rightLimit;
            otherParams.rightMaxratePerc = req.body.rightMaxratePerc;
            otherParams.singlevalueCustmaxPerc = req.body.singlevalueCustmaxPerc;
            otherParams.categoryunitGroupmaxPerc = req.body.categoryunitGroupmaxPerc;
            otherParams.turnoverRatePerc = req.body.turnoverRatePerc;
            otherParams.singleunitGroupmaxPerc = req.body.singleunitGroupmaxPerc;
            otherParams.rightMinratePerc = req.body.rightMinratePerc;
            otherParams.valueMinratePerc = req.body.valueMinratePerc;
            otherParams.valueMaxratePerc = req.body.valueMaxratePerc;
            otherParams.isBlacklist = req.body.isBlacklist;
            otherParams.isTradeLimit = req.body.isTradeLimit;
            otherParams.noPushServerWords = req.body.noPushServerWords;
        }
        // checkParams
        let checkParamsCopy = JSON.parse(JSON.stringify(checkParams));
        let investParams=Object.assign(checkParamsCopy,otherParams);
        investParams = JSON.parse(JSON.stringify(investParams));
        delete investParams['isInvestment'];
        delete investParams['createTimestamp'];
        console.log(checkParams,'-----------');
        let promise = new Promise((resolve, reject) => {
            let isVerable= Object.keys(checkParams).length;
            if(isVerable===0||!isRisk){
                return resolve();
            }else{
                let option = {
                    pageUrl: '/investmentMgmt/investmentStrategy/combinationProductRiskCheck/reviewRisk.ajax',
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
                    let option ={
                        pageUrl: '/investmentMgmt/investmentStrategy/combinationProductRiskCheck/reviewRisk.ajax',
                        req,
                        operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
                        investBody:investParams,
                        mappingKeyWords:'combinationProductRiskCheck'
                    }
                    sysLogger(option.operateType, option.req, option, {result:body.data},'uop_log_invest');
                    
                    if (error) {
                        return reject('通过未成功');
                    }
                    if (body.code == 0) { // 风控审核通过
                        return resolve();
                    } else if (body.code == 1 || body.code == 2 || body.code == 3) {  // 风控审核不通过/参数错误/服务器异常
                        return reject('通过未成功');
                    } else {
                        return reject('通过未成功');
                    }
                });
            }
            
        });
        promise.then(() => {
            let operatorName = req.session.loginInfo.userid; //操作人
            let operate = req.body.operate; //表状态
            let updateTime = req.body.updateTime; //获取修改的时间
            let mysqlId = req.body.mySQLId; //表id
            var sql = `UPDATE ${tableName} SET status='2',operate='${operate}',update_timestamp=? where local_id=?`;
            console.log('/investmentMgmt/investmentStrategy/combinationProductRiskCheck/reviewRisk.ajax sql:', sql);
            // console.log('/investmentMgmt/investmentStrategy/combinationProductRiskCheck/riskUpdate.ajax params:', params);
            pool.getConnection((err, connection) => {
                if (err) {
                    return res.send({
                        error: 1,
                        msg: '链接本地数据库失败',
                        data: null
                    });
                }
                connection.query(sql, [updateTime, mysqlId], function (error, results, fields) {
                    console.log('/investmentMgmt/investmentStrategy/combinationProductRiskCheck/reviewRisk.ajax sql error:', error);
                    console.log('/investmentMgmt/investmentStrategy/combinationProductRiskCheck/reviewRisk.ajax sql results:', results);
                    console.log('/investmentMgmt/investmentStrategy/combinationProductRiskCheck/reviewRisk.ajax sql fields:', fields);
                    if (error) {
                        return res.send({
                            error: 1,
                            msg: '通过未成功'
                        });
                    }
                    return res.send({
                        error: 0,
                        msg: '通过成功',
                        data: results
                    });
                });
                connection.release();
            });
        }).catch(errorMsg => {
            return res.send({
                error: 1,
                msg: '通过未成功'
            });
        });
    });
    // 驳回
    app.post('/investmentMgmt/investmentStrategy/combinationProductRiskCheck/rejectRisk.ajax', (req, res, next) => {
        let operatorName = req.session.loginInfo.userid; //操作人
        let operate = req.body.operate; //表状态
        let updateTime = req.body.updateTime; //获取修改的时间
        let mysqlId = req.body.mySQLId; //表id
        var sql = `UPDATE ${tableName} SET status='8',operate='${operate}',update_timestamp=? where local_id=?`;
                console.log('/investmentMgmt/investmentStrategy/combinationProductRiskCheck/reviewRisk.ajax sql:', sql);
        // var sql = `UPDATE ${tableName} SET status='7',operate='${operate}',update_timestamp=? where local_id=?`;
        // console.log('/investmentMgmt/investmentStrategy/combinationProductRiskCheck/rejectRisk.ajax sql:', sql);
        // console.log('/investmentMgmt/investmentStrategy/combinationProductRiskCheck/riskUpdate.ajax params:', params);
        pool.getConnection((err, connection) => {
            if (err) {
                return res.send({
                    error: 1,
                    msg: '链接本地数据库失败',
                    data: null
                });
            }
            connection.query(sql, [updateTime, mysqlId], function (error, results, fields) {
                console.log('/investmentMgmt/investmentStrategy/combinationProductRiskCheck/rejectRisk.ajax sql error:', error);
                console.log('/investmentMgmt/investmentStrategy/combinationProductRiskCheck/rejectRisk.ajax sql results:', results);
                console.log('/investmentMgmt/investmentStrategy/combinationProductRiskCheck/rejectRisk.ajax sql fields:', fields);
                let option ={
                    pageUrl: '/investmentMgmt/investmentStrategy/combinationProductRiskCheck/rejectRisk.ajax',
                    req,
                    operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
                    investBody:{sqlOprate:'驳回',  sqlOprator:operatorName,},
                    mappingKeyWords:'combinationProductRiskCheck'
                }
                if (error) {
                    sysLogger(option.operateType, option.req, option, {result:'操作失败'},'uop_log_invest');
                    return res.send({
                        error: 1,
                        msg: '修改失败'
                    });
                }
                sysLogger(option.operateType, option.req, option, {result:'操作成功'},'uop_log_invest');
                return res.send({
                    error: 0,
                    msg: '已驳回',
                    data: results
                });
            });
            connection.release();
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