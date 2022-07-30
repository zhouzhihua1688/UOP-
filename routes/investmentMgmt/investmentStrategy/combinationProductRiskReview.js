const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').investmentStrategy.combinationProductRiskReview;
const request_obs = require('../../../local_data/request_obs');
const original_request = require('request');
const formidable = require('formidable');
const fs = require('fs');
const tableName = 'bm_cpc_combination';

module.exports = function (app) {
    //查询列表数据
    app.post('/investmentMgmt/investmentStrategy/combinationProductRiskReview/getTableData.ajax', (req, res, next) => {
        let paramsStatus = {};
        paramsStatus.type = req.body.type;
        let reviewStatus = req.body.reviewStatus; //复核状态值
        // 查询本地数据库
        // if (paramsStatus.type == "1") {
            let sql = `SELECT content,local_id,status,delete_flag,operate,comment,operator,creator,reviewer,review_time,update_timestamp,remark FROM ${tableName} WHERE delete_flag='F' AND status='3'`;
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
            console.log('/investmentMgmt/investmentStrategy/combinationProductRiskReview/getTableData.ajax sql:', sql);
            pool.getConnection((err, connection) => {
                if (err) {
                    return res.send({
                        error: 1,
                        msg: '链接本地数据库失败',
                        data: null
                    });
                }
                connection.query(sql, function (error, results, fields) {
                    console.log('/investmentMgmt/investmentStrategy/combinationProductRiskReview/getTableData.ajax error:', error);
                    console.log('/investmentMgmt/investmentStrategy/combinationProductRiskReview/getTableData.ajax results:', results);
                    console.log('/investmentMgmt/investmentStrategy/combinationProductRiskReview/getTableData.ajax fields:', fields);
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
    // 风控数据复核
    app.post('/investmentMgmt/investmentStrategy/combinationProductRiskReview/reviewRisk.ajax', (req, res, next) => {
        let promise1 = Promise.resolve();
        promise1.then(() => {
            let operatorName = req.session.loginInfo.userid; //操作人
            let operate = req.body.operate; //表状态
            let updateTime = req.body.updateTime; //获取修改的时间
            let mysqlId = req.body.mySQLId; //表id
            var sql = `UPDATE ${tableName} SET status='4',operate='${operate}',update_timestamp=? where local_id=?`;
            console.log('/investmentMgmt/investmentStrategy/combinationProductRiskReview/reviewRisk.ajax sql:', sql);
            // console.log('/investmentMgmt/investmentStrategy/combinationProductRiskReview/riskUpdate.ajax params:', params);
            pool.getConnection((err, connection) => {
                if (err) {
                    return res.send({
                        error: 1,
                        msg: '链接本地数据库失败',
                        data: null
                    });
                }
                connection.query(sql, [updateTime, mysqlId], function (error, results, fields) {
                    console.log('/investmentMgmt/investmentStrategy/combinationProductRiskReview/reviewRisk.ajax sql error:', error);
                    console.log('/investmentMgmt/investmentStrategy/combinationProductRiskReview/reviewRisk.ajax sql results:', results);
                    console.log('/investmentMgmt/investmentStrategy/combinationProductRiskReview/reviewRisk.ajax sql fields:', fields);
                    let option ={
                        pageUrl: '/investmentMgmt/investmentStrategy/combinationProductRiskReview/reviewRisk.ajax',
                        req,
                        operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
                        investBody:{sqlOprate:'复核通过',  sqlOprator:operatorName,},
                        mappingKeyWords:'combinationProductRiskReview'
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
                        msg: '已通过风控复核,请到组合产品风控检查',
                        data: results
                    });
                });
                connection.release();
            });
        }).catch(errorMsg => {
            // console.log('错误',errorMsg);
            return res.send({error: 1, msg: errorMsg});
        });
    });
    // 驳回
    app.post('/investmentMgmt/investmentStrategy/combinationProductRiskReview/rejectRisk.ajax', (req, res, next) => {
        let operatorName = req.session.loginInfo.userid; //操作人
        let operate = req.body.operate; //表状态
        let updateTime = req.body.updateTime; //获取修改的时间
        let mysqlId = req.body.mySQLId; //表id
        var sql = `UPDATE ${tableName} SET status='7',operate='${operate}',update_timestamp=? where local_id=?`;
        console.log('/investmentMgmt/investmentStrategy/combinationProductRiskReview/rejectRisk.ajax sql:', sql);
        // console.log('/investmentMgmt/investmentStrategy/combinationProductRiskReview/riskUpdate.ajax params:', params);
        pool.getConnection((err, connection) => {
            if (err) {
                return res.send({
                    error: 1,
                    msg: '链接本地数据库失败',
                    data: null
                });
            }
            connection.query(sql, [updateTime, mysqlId], function (error, results, fields) {
                console.log('/investmentMgmt/investmentStrategy/combinationProductRiskReview/rejectRisk.ajax sql error:', error);
                console.log('/investmentMgmt/investmentStrategy/combinationProductRiskReview/rejectRisk.ajax sql results:', results);
                console.log('/investmentMgmt/investmentStrategy/combinationProductRiskReview/rejectRisk.ajax sql fields:', fields);
                let option ={
                    pageUrl: '/investmentMgmt/investmentStrategy/combinationProductRiskReview/rejectRisk.ajax',
                    req,
                    operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
                    investBody:{sqlOprate:'驳回',  sqlOprator:operatorName,},
                    mappingKeyWords:'combinationProductRiskReview'
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