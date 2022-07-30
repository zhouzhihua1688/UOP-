const request = require('./../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').assetAllocationMgmt.assetAllocationReview;
const tableName = 'pc_aam_config';

module.exports = function (app) {
    // 获取产品列表
    app.post('/publicConfig/assetAllocationMgmt/assetAllocationReview/getFundList.ajax', (req, res, next) => {
        let getGroupList = new Promise((resolve, reject) => {
            let option = {
                pageUrl: '/publicConfig/assetAllocationMgmt/assetAllocationReview/getFundList.ajax --getGroupList',
                req: req,
                qs: {
                    groupId: 'ALL'
                },
                url: apiUrl.getGroupList,
                timeout: 15000,
                json: true
            };
            request(option, (error, response, body) => {
                if (error) {
                    return reject({error: '获取组合产品列表失败'});
                }
                if (body && body.returnCode == 0 && Array.isArray(body.body)) {
                    return resolve(body.body.map(item => {
                        return {
                            fundId: item.groupId,
                            fundName: item.groupName,
                            fundType: '-'
                        };
                    }));
                } else if (body && body.returnCode != 9999) {
                    return reject({error: body.returnMsg});
                } else {
                    return reject({error: '获取组合产品列表失败'});
                }
            });
        });

        let getFundList = new Promise((resolve, reject) => {
            let option = {
                pageUrl: '/publicConfig/assetAllocationMgmt/assetAllocationReview/getFundList.ajax --getFundList',
                req: req,
                qs: {
                    fundTypeCustomized: 'ALL'
                },
                url: apiUrl.getFundList,
                timeout: 15000,
                json: true
            };
            request(option, (error, response, body) => {
                if (error) {
                    return reject({error: '获取基金列表失败'});
                }
                if (body && body.returnCode == 0 && Array.isArray(body.body)) {
                    return resolve(body.body);
                } else if (body && body.returnCode != 9999) {
                    return reject({error: body.returnMsg});
                } else {
                    return reject({error: '获取基金列表失败'});
                }
            });
        });

        Promise.all([getFundList, getGroupList]).then((result) => {
            let fundList = result[0];
            let getGroupList = result[1];
            res.send({
                error: 0,
                msg: 'success',
                data: fundList.filter(item => item.fundType != 'A').concat(getGroupList)
            });
        }).catch(error => {
            res.send({error: 1, msg: error.message, data: null});
        });


    });
    // 获取本地数据
    app.post('/publicConfig/assetAllocationMgmt/assetAllocationReview/getLocalList.ajax', (req, res, next) => {
        // 获取本地数据库列表
        let getTableData = new Promise((resolve, reject) => {
            pool.getConnection(function (error, connection) {
                if (error) {
                    console.log('/publicConfig/assetAllocationMgmt/assetAllocationReview/getLocalList.ajax 链接本地数据库失败', error.message);
                    return reject({error: '链接本地数据库失败'});
                }
                let SQL = `SELECT * FROM ${tableName} WHERE delete_flag='F'`;
                if (req.body.folioName) {
                    SQL += ` AND JSON_EXTRACT(content, '$.portfolioInfo.folioName') LIKE '%%${req.body.folioName}%%'`;
                }
                if (req.body.operate) {
                    SQL += ` AND operate='${req.body.operate}'`;
                }
                if (req.body.status) {
                    SQL += ` AND status='${req.body.status}'`;
                }
                SQL += ' ORDER BY update_timestamp DESC';
                console.log('/publicConfig/assetAllocationMgmt/assetAllocationReview/getLocalList.ajax run SQL: ', SQL);
                connection.query(SQL, function (error, results) {
                    console.log('/publicConfig/assetAllocationMgmt/assetAllocationReview/getLocalList.ajax run SQL error', error);
                    console.log('/publicConfig/assetAllocationMgmt/assetAllocationReview/getLocalList.ajax run SQL results:', results);
                    connection.release();
                    if (error) {
                        return reject({error: '运行SQL语句失败'});
                    }
                    resolve(Array.from(results));
                });
            });
        });

        getTableData.then(resultArr => {
            let tableData = resultArr.map(item => {
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
                }
                else if (obj.status == 1) {
                    obj.showStatus = '编辑中';
                }
                else if (obj.status == 2) {
                    obj.showStatus = '待复核';
                }
                else if (obj.status == 9) {
                    obj.showStatus = '复核驳回';
                }
                else {
                    obj.showStatus = obj.status;
                }
                if (obj.operate == 1) {
                    obj.showOperate = '新增';
                }
                else if (obj.operate == 2) {
                    obj.showOperate = '修改';
                }
                else if (obj.operate == 3) {
                    obj.showOperate = '删除';
                }
                else {
                    obj.showOperate = obj.operate;
                }
                obj.content = JSON.parse(item.content)
                return obj;
            });
            res.send({error: 0, msg: '请求成功', data: tableData});
        }).catch(error => {
            res.send({error: 1, msg: error.message, data: null});
        });
    });
    // 获取查询服务端数据
    app.post('/publicConfig/assetAllocationMgmt/assetAllocationReview/getServiceList.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/publicConfig/assetAllocationMgmt/assetAllocationReview/getServiceList.ajax',
            req: req,
            url: apiUrl.getServiceList,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '调用失败', data: null});
            }
            if (body && body.returnCode == 0 && Array.isArray(body.body)) {
                let formatTime = (arr) => {
                    let fixZero = (value) => value < 10 ? '0' + value : value;
                    return arr.slice(0, 3).map(value => fixZero(value)).join('-') + ' ' + arr.slice(3, arr.length - 1).map(value => fixZero(value)).join(':');
                };
                body.body.forEach(item => {
                    item.portfolioInfo.inserttimestamp = formatTime(item.portfolioInfo.inserttimestamp);
                    item.portfolioInfo.updatetimestamp = formatTime(item.portfolioInfo.updatetimestamp);
                });
                return res.send({error: 0, msg: '调用成功', data: body.body});
            }
            else if (body && body.returnCode != 9999) {
                return res.send({error: 1, msg: body.returnMsg, data: null});
            }
            else {
                return res.send({error: 1, msg: '调用失败', data: null});
            }
        });
    });
    // 驳回
    app.post('/publicConfig/assetAllocationMgmt/assetAllocationReview/reviewReject.ajax', (req, res, next) => {
        if (req.body.creator === req.session.loginInfo.userid && !req.session.loginInfo.isAdmin) {
            return res.send({error: 1, msg: '禁止复核自己提交的申请', data: null});
        }
        pool.getConnection(function (error, connection) {
            if (error) {
                console.log('/publicConfig/assetAllocationMgmt/assetAllocationReview/reviewReject.ajax 链接本地数据库失败', error.message);
                return res.send({error: 1, msg: '链接本地数据库失败', data: null});
            }
            let SQL = `UPDATE ${tableName} SET status=9,remark='${req.body.remark}',reviewer='${req.session.loginInfo.userid}',review_time='${formatTimeStamp(new Date().getTime())}' WHERE local_id=${req.body.local_id} AND update_timestamp='${req.body.updateTime}'`;
            console.log('/publicConfig/assetAllocationMgmt/assetAllocationReview/reviewReject.ajax run business SQL:', SQL);
            connection.query(SQL, function (error, results) {
                console.log('/publicConfig/assetAllocationMgmt/assetAllocationReview/reviewReject.ajax run business SQL error:', error);
                console.log('/publicConfig/assetAllocationMgmt/assetAllocationReview/reviewReject.ajax run business SQL results:', results);
                connection.release();
                if (error) {
                    return res.send({error: 1, msg: error.message, data: null});
                }
                if (results.changedRows) {
                    res.send({error: 0, msg: '调用成功', data: null});
                }
                else {
                    res.send({error: 1, msg: '数据不存在或已更新,请刷新页面', data: null});
                }
            });
        });
    });
    // 通过
    app.post('/publicConfig/assetAllocationMgmt/assetAllocationReview/reviewAccept.ajax', (req, res, next) => {
        if (req.body.creator === req.session.loginInfo.userid && !req.session.loginInfo.isAdmin) {
            return res.send({error: 1, msg: '禁止复核自己提交的申请', data: null});
        }
        pool.getConnection(function (error, connection) {
            if (error) {
                console.log('/publicConfig/assetAllocationMgmt/assetAllocationReview/reviewAccept.ajax 链接本地数据库失败', error.message);
                return res.send({error: 1, msg: '链接本地数据库失败', data: null});
            }
            // 检查该条数据是否存在
            let checkHasSubmit = new Promise((resolve, reject) => {
                let SQL = `SELECT * FROM ${tableName} WHERE local_id=${req.body.local_id} AND update_timestamp='${req.body.updateTime}'`;
                console.log('/publicConfig/assetAllocationMgmt/assetAllocationReview/reviewAccept.ajax run check SQL: ', SQL);
                connection.query(SQL, function (error, results) {
                    console.log('/publicConfig/assetAllocationMgmt/assetAllocationReview/reviewAccept.ajax run check SQL error: ', error);
                    console.log('/publicConfig/assetAllocationMgmt/assetAllocationReview/reviewAccept.ajax run check SQL results: ', results);
                    if (error) {
                        reject({message: '检查该条数据是否已被审核SQL语句失败'});
                    }
                    resolve(Array.from(results).length);
                });
            });
            // 操作服务端数据
            let operateService = function (item) {
                return new Promise((resolve, reject) => {
                    let url = '';
                    let params = {};
                    let method = '';
                    let paramsType = '';
                    if (item.operate == 1) { // 新增操作
                        params.portfolioId = req.body.content.portfolioInfo.folioId;
                        params.portfolioInfo = req.body.content.portfolioInfo;
                        params.prdPortfolioDetailList = req.body.content.prdPortfolioDetailList;
                        method = 'POST';
                        paramsType = 'body';
                        url = apiUrl.addService;
                    }
                    else if (item.operate == 2) { // 修改操作
                        params.portfolioId = req.body.service_id;
                        params.portfolioInfo = req.body.content.portfolioInfo;
                        params.prdPortfolioDetailList = req.body.content.prdPortfolioDetailList;
                        method = 'POST';
                        paramsType = 'body';
                        url = apiUrl.updateService;
                    }
                    // else if (item.operate == 3) { // 删除操作
                    //     params.id = req.body.service_id;
                    //     method = 'DELETE';
                    //     paramsType = 'qs';
                    // }
                    else {
                        return reject({message: '操作类型有误，请检查数据是否合法'});
                    }
                    let option = {
                        pageUrl: '/publicConfig/assetAllocationMgmt/assetAllocationReview/reviewAccept.ajax',
                        req: req,
                        operateType: item.operate, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
                        url: url,
                        method: method,
                        timeout: 15000,
                        json: true
                    };
                    option[paramsType] = params;
                    request(option, (error, response, body) => {
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
                    });
                });
            };
            // 操作本地数据
            let operateLocal = function () {
                return new Promise((resolve, reject) => {
                    let SQL = `UPDATE ${tableName} SET status=0,reviewer='${req.session.loginInfo.userid}',review_time='${formatTimeStamp(new Date().getTime())}' WHERE local_id=${req.body.local_id}`;
                    console.log('/publicConfig/assetAllocationMgmt/assetAllocationReview/reviewReject.ajax run business SQL:', SQL);
                    connection.query(SQL, function (error, results) {
                        console.log('/publicConfig/assetAllocationMgmt/assetAllocationReview/reviewReject.ajax run business SQL error:', error);
                        console.log('/publicConfig/assetAllocationMgmt/assetAllocationReview/reviewReject.ajax run business SQL results:', results);
                        if (error) {
                            reject({message: '操作本地数据库出错，请核对校验本地数据'});
                        }
                        resolve();
                    });
                });
            };
            checkHasSubmit.then(hasSubmit => {
                if (hasSubmit === 0) {
                    connection.release();
                    return res.send({error: 1, msg: '数据不存在', data: null});
                }
                operateService(req.body).then(() => {
                    operateLocal().then(() => {
                        connection.release();
                        res.send({error: 0, msg: '调用成功', data: null});
                    }).catch(error => {
                        connection.release();
                        res.send({error: 1, msg: error.message, data: null});
                    });
                }).catch(error => {
                    connection.release();
                    res.send({error: 1, msg: error.message, data: null});
                });
            }).catch(error => {
                connection.release();
                res.send({error: 1, msg: error.message, data: null});
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