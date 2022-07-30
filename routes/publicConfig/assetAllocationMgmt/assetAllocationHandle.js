const request = require('./../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').assetAllocationMgmt.assetAllocationHandle;
const tableName = 'pc_aam_config';

module.exports = function (app) {
    // 获取产品列表
    app.post('/publicConfig/assetAllocationMgmt/assetAllocationHandle/getFundList.ajax', (req, res, next) => {
        let getGroupList = new Promise((resolve, reject) => {
            let option = {
                pageUrl: '/publicConfig/assetAllocationMgmt/assetAllocationHandle/getFundList.ajax --getGroupList',
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
                            check: false,
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
                pageUrl: '/publicConfig/assetAllocationMgmt/assetAllocationHandle/getFundList.ajax --getFundList',
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
                    body.body.forEach(item => item.check = false);
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
                data: {
                    fundList1: fundList.filter(item => item.fundType != 6 && item.fundType != 9 && item.fundType != 'A'), // 公募基金
                    fundList2: fundList.filter(item => item.fundType == 6 || item.fundType == 9),  // 资管产品
                    fundList3: getGroupList  // 组合产品
                }
            });
        }).catch(error => {
            res.send({error: 1, msg: error.message, data: null});
        });


    });
    // 获取查询服务端数据
    app.post('/publicConfig/assetAllocationMgmt/assetAllocationHandle/getServiceList.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/publicConfig/assetAllocationMgmt/assetAllocationHandle/getServiceList.ajax',
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
            } else if (body && body.returnCode != 9999) {
                return res.send({error: 1, msg: body.returnMsg, data: null});
            } else {
                return res.send({error: 1, msg: '调用失败', data: null});
            }
        });
    });
    // // 服务端删除操作落本地数据
    // app.post('/publicConfig/assetAllocationMgmt/assetAllocationHandle/serviceToLocalDelete.ajax', (req, res, next) => {
    //     pool.getConnection(function (error, connection) {
    //         if (error) {
    //             console.log('/publicConfig/assetAllocationMgmt/assetAllocationHandle/serviceToLocalDelete.ajax 链接本地数据库失败:', error.message);
    //             return res.send({error: 1, msg: '链接本地数据库失败', data: null});
    //         }
    //         let service_id = req.body.service_id;
    //         let content = req.body.content;
    //         let creator = req.session.loginInfo.userid;
    //         let operator = req.session.loginInfo.userid;
    //         let SQL = `INSERT INTO ${tableName} (service_id,content,creator,operator,operate,status) VALUES ('${service_id}','${content}','${creator}','${operator}',3,2)`;
    //         console.log('/publicConfig/assetAllocationMgmt/assetAllocationHandle/serviceToLocalDelete.ajax run business SQL: ', SQL);
    //         connection.query(SQL, function (error, results) {
    //             console.log('/publicConfig/assetAllocationMgmt/assetAllocationHandle/serviceToLocalDelete.ajax run business SQL error:', error);
    //             console.log('/publicConfig/assetAllocationMgmt/assetAllocationHandle/serviceToLocalDelete.ajax run business SQL results:', results);
    //             connection.release();
    //             if (error) {
    //                 return res.send({error: 1, msg: error.message, data: null});
    //             }
    //             res.send({error: 0, msg: '调用成功', data: null});
    //         });
    //     });
    // });
    // 服务端修改操作落本地数据
    app.post('/publicConfig/assetAllocationMgmt/assetAllocationHandle/serviceToLocalUpdate.ajax', (req, res, next) => {
        pool.getConnection((error, connection) => {
            if (error) {
                console.log('/publicConfig/assetAllocationMgmt/assetAllocationHandle/serviceToLocalUpdate.ajax 链接本地数据库失败:', error.message);
                return res.send({error: 1, msg: '链接本地数据库失败', data: null});
            }
            let service_id = req.body.service_id;
            let content = req.body.content;
            let creator = req.session.loginInfo.userid;
            let operator = req.session.loginInfo.userid;
            let SQL = `INSERT INTO ${tableName} (service_id,content,creator,operator,operate,status) VALUES ('${service_id}','${content}','${creator}','${operator}',2,2)`;
            console.log('/publicConfig/assetAllocationMgmt/assetAllocationHandle/serviceToLocalUpdate.ajax run business SQL: ', SQL);
            connection.query(SQL, (error, results) => {
                console.log('/publicConfig/assetAllocationMgmt/assetAllocationHandle/serviceToLocalUpdate.ajax run business SQL error:', error);
                console.log('/publicConfig/assetAllocationMgmt/assetAllocationHandle/serviceToLocalUpdate.ajax run business SQL results:', results);
                connection.release();
                if (error) {
                    return res.send({error: 1, msg: error.message, data: null});
                }
                res.send({error: 0, msg: '调用成功', data: null});
            });
        });
    });
    // 获取本地数据
    app.post('/publicConfig/assetAllocationMgmt/assetAllocationHandle/getLocalList.ajax', (req, res, next) => {
        // 获取本地数据库列表
        let getTableData = new Promise((resolve, reject) => {
            pool.getConnection(function (error, connection) {
                if (error) {
                    console.log('/publicConfig/assetAllocationMgmt/assetAllocationHandle/getLocalList.ajax 链接本地数据库失败', error.message);
                    return reject({error: '链接本地数据库失败'});
                }
                let SQL = `SELECT * FROM ${tableName} WHERE delete_flag='F' AND creator='${req.session.loginInfo.userid}'`;
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
                console.log('/publicConfig/assetAllocationMgmt/assetAllocationHandle/getLocalList.ajax run SQL: ', SQL);
                connection.query(SQL, function (error, results) {
                    console.log('/publicConfig/assetAllocationMgmt/assetAllocationHandle/getLocalList.ajax run SQL error', error);
                    console.log('/publicConfig/assetAllocationMgmt/assetAllocationHandle/getLocalList.ajax run SQL results:', results);
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
                obj.content = JSON.parse(item.content)
                return obj;
            });
            res.send({error: 0, msg: '请求成功', data: tableData});
        }).catch(error => {
            res.send({error: 1, msg: error.message, data: null});
        });
    });
    // 向本地数据库添加数据
    app.post('/publicConfig/assetAllocationMgmt/assetAllocationHandle/addLocalData.ajax', (req, res, next) => {
        pool.getConnection((error, connection) => {
            if (error) {
                console.log('/publicConfig/assetAllocationMgmt/assetAllocationHandle/addLocalData.ajax 链接本地数据库失败', error.message);
                return res.send({error: 1, msg: '链接本地数据库失败', data: null});
            }
            let content = req.body.content;
            let creator = req.session.loginInfo.userid;
            let operator = req.session.loginInfo.userid;
            let SQL = `INSERT INTO ${tableName} (content,creator,operator,operate,status) VALUES ('${content}','${creator}','${operator}',1,2)`;
            console.log('/publicConfig/assetAllocationMgmt/assetAllocationHandle/addLocalData.ajax run SQL: ', SQL);
            connection.query(SQL, function (error, results) {
                console.log('/publicConfig/assetAllocationMgmt/assetAllocationHandle/addLocalData.ajax run SQL error:', error);
                console.log('/publicConfig/assetAllocationMgmt/assetAllocationHandle/addLocalData.ajax run SQL results:', results);
                connection.release();
                if (error) {
                    return res.send({error: 1, msg: '运行SQL语句失败', data: null});
                }
                res.send({error: 0, msg: '添加成功', data: results.insertId});
            });
        });
    });
    // 本地数据库修改数据
    app.post('/publicConfig/assetAllocationMgmt/assetAllocationHandle/updateLocalData.ajax', (req, res, next) => {
        pool.getConnection(function (error, connection) {
            if (error) {
                console.log('/publicConfig/assetAllocationMgmt/assetAllocationHandle/updateLocalData.ajax 链接本地数据库失败', error.message);
                return res.send({error: 1, msg: '链接本地数据库失败', data: null});
            }
            let local_id = req.body.local_id;
            let content = req.body.content;
            let operator = req.session.loginInfo.userid;
            let updateTime = req.body.updateTime;
            let SQL = `UPDATE ${tableName} SET content='${content}',operator='${operator}' WHERE local_id=${local_id} AND update_timestamp='${updateTime}'`;
            console.log('/publicConfig/assetAllocationMgmt/assetAllocationHandle/updateLocalData.ajax run business SQL: ', SQL);
            connection.query(SQL, function (error, results) {
                console.log('/publicConfig/assetAllocationMgmt/assetAllocationHandle/updateLocalData.ajax run business SQL error:', error);
                console.log('/publicConfig/assetAllocationMgmt/assetAllocationHandle/updateLocalData.ajax run business SQL results:', results);
                connection.release();
                if (error) {
                    return res.send({error: 1, msg: error.message, data: null});
                }
                if (results.changedRows) {
                    res.send({error: 0, msg: '调用成功', data: null});
                } else {
                    res.send({error: 1, msg: '数据不存在或已更新,请刷新页面', data: null});
                }
            });
        });
    });
    // 本地数据库删除数据
    app.post('/publicConfig/assetAllocationMgmt/assetAllocationHandle/revertLocalData.ajax', (req, res, next) => {
        pool.getConnection(function (error, connection) {
            if (error) {
                console.log('/publicConfig/assetAllocationMgmt/assetAllocationHandle/revertLocalData.ajax  链接本地数据库失败', error.message);
                return res.send({error: 1, msg: '链接本地数据库失败', data: null});
            }
            let {local_id, updateTime} = req.body;
            let SQL = `UPDATE ${tableName} SET delete_flag='T',operator='${req.session.loginInfo.userid}' WHERE local_id=${local_id} AND update_timestamp='${updateTime}'`;
            console.log('/publicConfig/assetAllocationMgmt/assetAllocationHandle/revertLocalData.ajax run business SQL: ', SQL);
            connection.query(SQL, function (error, results) {
                console.log('/publicConfig/assetAllocationMgmt/assetAllocationHandle/revertLocalData.ajax run business SQL error:', error);
                console.log('/publicConfig/assetAllocationMgmt/assetAllocationHandle/revertLocalData.ajax run business SQL results:', results);
                connection.release();
                if (error) {
                    return res.send({error: 1, msg: error.message, data: null});
                }
                if (results.changedRows) {
                    res.send({error: 0, msg: '调用成功', data: null});
                } else {
                    res.send({error: 1, msg: '数据不存在或已更新,请刷新页面', data: null});
                }
            });
        });
    });
    // 本地数据库重新提交数据
    app.post('/publicConfig/assetAllocationMgmt/assetAllocationHandle/submitLocalDataAgain.ajax', (req, res, next) => {
        pool.getConnection(function (error, connection) {
            if (error) {
                console.log('/publicConfig/assetAllocationMgmt/assetAllocationHandle/submitLocalDataAgain.ajax  链接本地数据库失败', error.message);
                return res.send({error: 1, msg: '链接本地数据库失败', data: null});
            }
            // 删除原数据
            let deleteOriginData = new Promise((resolve, reject) => {
                let SQL = `UPDATE ${tableName} SET delete_flag='T' WHERE local_id=${req.body.local_id} AND update_timestamp='${req.body.updateTime}'`;
                console.log('/publicConfig/assetAllocationMgmt/assetAllocationHandle/submitLocalDataAgain.ajax run deleteOriginData SQL:', SQL);
                connection.query(SQL, function (error, results) {
                    console.log('/publicConfig/assetAllocationMgmt/assetAllocationHandle/submitLocalDataAgain.ajax run deleteOriginData SQL error:', error);
                    console.log('/publicConfig/assetAllocationMgmt/assetAllocationHandle/submitLocalDataAgain.ajax run deleteOriginData SQL results:', results);
                    if (error) {
                        return reject({message: '本地删除原数据失败'});
                    }
                    if (!results.changedRows) {
                        return reject({message: '数据不存在或已更新，请刷新列表'});
                    }
                    resolve();
                });
            });
            // 新增申请
            let addNewSubmit = new Promise((resolve, reject) => {
                let creator = req.session.loginInfo.userid;
                let service_id = req.body.service_id;
                let content = req.body.content;
                let operate = req.body.operate;
                let SQL = `INSERT INTO ${tableName} (service_id,content,creator,operator,operate,status) VALUES ('${service_id}','${content}','${creator}','${creator}',${operate},2)`;
                console.log('/publicConfig/assetAllocationMgmt/assetAllocationHandle/submitLocalDataAgain.ajax run addNewSubmit SQL:', SQL);
                connection.query(SQL, function (error, results) {
                    console.log('/publicConfig/assetAllocationMgmt/assetAllocationHandle/submitLocalDataAgain.ajax run addNewSubmit SQL error:', error);
                    console.log('/publicConfig/assetAllocationMgmt/assetAllocationHandle/submitLocalDataAgain.ajax run addNewSubmit SQL results:', results);
                    if (error) {
                        return reject({message: '新增申请失败'});
                    }
                    resolve();
                });
            });
            deleteOriginData.then(() => {
                addNewSubmit.then(() => {
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