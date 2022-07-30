const request = require('./../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').highFinancialMgmt.vipCancelHandle;
const tableName = 'bm_hfm_cancel';

module.exports = function (app) {
    // 获取基金列表数据
    app.post('/businessMgmt/highFinancialMgmt/vipCancelHandle/getFundList.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/businessMgmt/highFinancialMgmt/vipCancelHandle/getFundList.ajax',
            req,
            url: apiUrl.fundIdList,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '获取基金列表数据失败',
                    data: null
                });
            }
            if (body && body.returnCode == 0 && Array.isArray(body.body)) {
                res.send({
                    error: 0,
                    msg: '调用成功',
                    data: body.body
                });
            } else if (body.returnCode != 0 && body.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: body.returnMsg,
                    data: null
                });
            } else {
                res.send({
                    error: 1,
                    msg: '获取基金列表数据失败',
                    data: null
                });
            }
        });
    });
    // 获取查询服务端数据
    app.post('/businessMgmt/highFinancialMgmt/vipCancelHandle/getServiceList.ajax', (req, res, next) => {
        let getTableData = new Promise((resolve, reject) => {
            let params = {};
            params.invNm = req.body.invNm;
            params.idNo = req.body.idNo;
            params.fundId = req.body.fundId;
            params.apDt = req.body.apDt;
            let option = {
                pageUrl: '/businessMgmt/highFinancialMgmt/vipCancelHandle/getServiceList.ajax',
                req,
                url: apiUrl.getTableList,
                qs: params,
                timeout: 15000,
                json: true
            };
            request(option, (error, response, body) => {
                if (error) {
                    reject({
                        message: '获取服务端数据失败'
                    });
                }
                if (body.returnCode == 0 && Array.isArray(body.body)) {
                    resolve(body.body);
                } else if (body.returnCode != 0 && body.returnCode != 9999) {
                    reject({message: body.returnMsg});
                } else {
                    reject({message: '获取服务端数据失败'});
                }
            });
        });
        getTableData.then(tableData => {
            res.send({
                error: 0,
                msg: '请求成功',
                data: tableData
            });
        }).catch(error => {
            res.send({
                error: 1,
                msg: error.message,
                data: null
            });
        });
    });
    // 服务端撤单操作落本地数据
    app.post('/businessMgmt/highFinancialMgmt/vipCancelHandle/serviceToLocalCancel.ajax', (req, res, next) => {
        pool.getConnection(function (error, connection) {
            if (error) {
                console.log('/businessMgmt/highFinancialMgmt/vipCancelHandle/serviceToLocalCancel.ajax 链接本地数据库失败:', error.message);
                return res.send({
                    error: 1,
                    msg: '链接本地数据库失败',
                    data: null
                });
            }
            let service_id = req.body.service_id;
            let content = req.body.content;
            let creator = req.session.loginInfo.userid;
            let operator = req.session.loginInfo.userid;
            let SQL = `INSERT INTO ${tableName} (service_id,content,creator,operator,operate,status) VALUES ('${service_id}','${content}','${creator}','${operator}',3,2)`;
            console.log('/businessMgmt/highFinancialMgmt/vipCancelHandle/serviceToLocalCancel.ajax run business SQL: ', SQL);
            connection.query(SQL, function (error, results) {
                console.log('/businessMgmt/highFinancialMgmt/vipCancelHandle/serviceToLocalCancel.ajax run business SQL error:', error);
                console.log('/businessMgmt/highFinancialMgmt/vipCancelHandle/serviceToLocalCancel.ajax run business SQL results:', results);
                connection.release();
                if (error) {
                    return res.send({
                        error: 1,
                        msg: error.message,
                        data: null
                    });
                }
                res.send({
                    error: 0,
                    msg: '调用成功',
                    data: null
                });
            });
        });
    });
    // 获取本地数据
    app.post('/businessMgmt/highFinancialMgmt/vipCancelHandle/getLocalList.ajax', (req, res, next) => {
        // 获取本地数据库列表
        let getTableData = new Promise((resolve, reject) => {
            pool.getConnection(function (error, connection) {
                if (error) {
                    console.log('/businessMgmt/highFinancialMgmt/vipCancelHandle/getLocalList.ajax 链接本地数据库失败', error.message);
                    reject({
                        error: '链接本地数据库失败'
                    });
                }
                let SQL = `SELECT * FROM ${tableName} WHERE delete_flag='F' AND creator='${req.session.loginInfo.userid}'`;
                if (req.body.serialNo) {
                    SQL += ` AND JSON_EXTRACT(content, '$.serialNo')='${req.body.serialNo}'`;
                }
                if (req.body.fundId) {
                    SQL += ` AND JSON_EXTRACT(content, '$.fundId')='${req.body.fundId}'`;
                }
                if (req.body.apDt) {
                    SQL += ` AND JSON_EXTRACT(content, '$.transactionDate')='${req.body.apDt}'`;
                }
                if (req.body.status) {
                    SQL += ` AND status='${req.body.status}'`;
                }
                SQL += ' ORDER BY update_timestamp DESC';
                console.log('/businessMgmt/highFinancialMgmt/vipCancelHandle/getLocalList.ajax run SQL: ', SQL);
                connection.query(SQL, function (error, results) {
                    console.log('/businessMgmt/highFinancialMgmt/vipCancelHandle/getLocalList.ajax run SQL error', error);
                    console.log('/businessMgmt/highFinancialMgmt/vipCancelHandle/getLocalList.ajax run SQL results:', results);
                    connection.release();
                    if (error) {
                        reject({
                            error: '运行SQL语句失败'
                        });
                    }
                    resolve(Array.from(results));
                });
            });
        });
        getTableData.then(body => {
            let tableData = body.map(item => {
                let obj = {
                    local_id: item.local_id,
                    service_id: item.service_id,
                    creator: item.creator,
                    operator: item.operator,
                    createTime: formatTimeStamp(item.create_timestamp),
                    updateTime: formatTimeStamp(item.update_timestamp),
                    operate: item.operate,
                    status: item.status,
                    reviewer: item.reviewer,
                    reviewTime: item.review_time,
                    remark: item.remark
                };
                if (obj.status == 0) {
                    obj.showStatus = '复核通过';
                } else if (obj.status == 1) {
                    obj.showStatus = '编辑中';
                } else if (obj.status == 2) {
                    obj.showStatus = '待复核';
                } else if (obj.status == 9) {
                    obj.showStatus = '复核驳回';
                } else {
                    obj.showStatus = obj.status;
                }
                if (obj.operate == 1) {
                    obj.showOperate = '新增';
                } else if (obj.operate == 2) {
                    obj.showOperate = '修改';
                } else if (obj.operate == 3) {
                    obj.showOperate = '删除';
                } else {
                    obj.showOperate = obj.operate;
                }
                obj.content = JSON.parse(item.content);
                return obj;
            });
            res.send({
                error: 0,
                msg: '请求成功',
                data: tableData
            });
        }).catch(error => {
            res.send({
                error: 1,
                msg: error.message,
                data: null
            });
        });
    });
    // 本地数据库删除数据
    app.post('/businessMgmt/highFinancialMgmt/vipCancelHandle/revertLocalData.ajax', (req, res, next) => {
        pool.getConnection(function (error, connection) {
            if (error) {
                console.log('/businessMgmt/highFinancialMgmt/vipCancelHandle/revertLocalData.ajax  链接本地数据库失败', error.message);
                return res.send({
                    error: 1,
                    msg: '链接本地数据库失败',
                    data: null
                });
            }
            let {
                local_id,
                updateTime
            } = req.body;
            let SQL = `UPDATE ${tableName} SET delete_flag='T',operator='${req.session.loginInfo.userid}' WHERE local_id=${local_id} AND update_timestamp='${updateTime}'`;
            console.log('/businessMgmt/highFinancialMgmt/vipCancelHandle/revertLocalData.ajax run business SQL: ', SQL);
            connection.query(SQL, function (error, results) {
                console.log('/businessMgmt/highFinancialMgmt/vipCancelHandle/revertLocalData.ajax run business SQL error:', error);
                console.log('/businessMgmt/highFinancialMgmt/vipCancelHandle/revertLocalData.ajax run business SQL results:', results);
                connection.release();
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
                        msg: '调用成功',
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
        });
    });
};

function formatTimeStamp(timestamp) {
    let d = new Date(timestamp);
    let fixZero = function (num) {
        return num < 10 ? '0' + num : num;
    };
    return [d.getFullYear(), d.getMonth() + 1, d.getDate()].map(value => fixZero(value)).join('-') +
        ' ' + [d.getHours(), d.getMinutes(), d.getSeconds()].map(value => fixZero(value)).join(':');
}