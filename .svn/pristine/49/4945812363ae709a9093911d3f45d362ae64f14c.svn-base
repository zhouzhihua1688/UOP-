const request = require('../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').IPOMgmtOCReview.publishReview;
const tableName = 'bm_ipo_publish';
module.exports = function (app) {
    // 获取基金id数据
    app.post('/businessMgmt/IPOMgmtOCReview/publishReview/fundIdList.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/businessMgmt/IPOMgmtOCReview/publishReview/fundIdList.ajax',
            req,
            url: apiUrl.fundIdList,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '获取基金ID列表数据失败',
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
                    msg: '获取基金ID列表数据失败',
                    data: null
                });
            }
        });
    });
    // 获取线上列表
    app.post('/businessMgmt/IPOMgmtOCReview/publishReview/tableData.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/businessMgmt/IPOMgmtOCReview/publishReview/tableData.ajax',
            req,
            url: `${apiUrl.tableData}/${params.fundId}/lifecircle/query`,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '获取基金ID列表数据失败',
                    data: null
                });
            }
            if (body && body.returnCode == 0) {
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
                    msg: '获取基金ID列表数据失败',
                    data: null
                });
            }
        });
    });

    // 获取  驳回经办数据
    app.post('/businessMgmt/IPOMgmtOCReview/publishReview/failLocalData.ajax', (req, res, next) => {
        let params = req.body;
        let userId = req.session.loginInfo.userid;
        if (params.creator === userId) {
            return res.send({
                error: 1,
                msg: '经办与复核不能为同一人',
                data: null
            });
        }
        var $sql = `UPDATE ${tableName} SET ? WHERE update_timestamp = '${params.update_timestamp}' AND local_id = '${params.local_id}';`;
        delete params.update_timestamp;
        delete params.local_id;
        delete params.creator;
        sql_query(res, $sql, {
            ...params,
            operator: userId,
            reviewer: userId,
            review_time: formatTimeStamp(new Date()),
        }, function (err, results) {
            if (err) {
                console.log('/businessMgmt/IPOMgmtOCReview/publishReview/failLocalData.ajax', err)
                return res.send({
                    error: 1,
                    msg: '驳回失败'
                });
            }
            if (results.affectedRows) {
                res.send({
                    error: 0,
                    msg: '已驳回',
                    data: results.insertId
                });
            } else {
                res.send({
                    error: 1,
                    msg: '驳回失败,请刷新页面',
                    data: null
                });
            }


        })
    });

    // 获取  本地初始数据和查询
    app.post('/businessMgmt/IPOMgmtOCReview/publishReview/getLocalList.ajax', (req, res, next) => {
        let params = req.body;
        var arr = [`delete_flag = 'F'`]
        for (const key in params) {
            if (params[key] !== '') {
                arr.push(`${key} = '${params[key]}'`);
            }
        }

        // let userId = req.session.loginInfo.userid;
        var $sql = `SELECT * FROM ${tableName} WHERE ${arr.join(' AND ')} order by local_id desc;`;
        sql_query(res, $sql, [], function (err, results) {
            if (err) {
                console.log('/businessMgmt/IPOMgmtOCReview/publishReview/getLocalList.ajax', err)
                return res.send({
                    error: 1,
                    msg: '查询失败'
                });
            }
            results.forEach(item => {
                item.content = JSON.parse(item.content)
                item.comment = item.comment ? JSON.parse(item.comment) : item.comment;
            })
            res.send({
                error: 0,
                msg: '本地数据查询成功',
                data: results
            });
        })
    });
    // 获取  本地初始数据和查询
    app.post('/businessMgmt/IPOMgmtOCReview/publishReview/getLocalFundList.ajax', (req, res, next) => {
        // let userId = req.session.loginInfo.userid;
        var $sql = `SELECT content FROM ${tableName} WHERE delete_flag = 'F';`;
        sql_query(res, $sql, [], function (err, results) {
            if (err) {
                console.log('/businessMgmt/IPOMgmtOCReview/publishReview/getLocalFundList.ajax', err)
                return res.send({
                    error: 1,
                    msg: '查询失败'
                });
            }
            let fundObj = {};
            results.forEach(item => {
                item.content = JSON.parse(item.content);
                if (!fundObj.hasOwnProperty(item.content.after.fundid)) {
                    fundObj[item.content.after.fundid] = item.content.after.fundName;
                }
            })
            res.send({
                error: 0,
                msg: '本地数据查询成功',
                data: Object.keys(fundObj).map(fundId => {
                    return {
                        fundId,
                        fundName: fundObj[fundId]
                    }
                })
            });
        })
    });


    // 通过   删除
    app.post('/businessMgmt/IPOMgmtOCReview/publishReview/dataPassOfDel.ajax', (req, res, next) => {
        let params = req.body;
        let userId = req.session.loginInfo.userid;
        if (params.creator === userId) {
            return res.send({
                error: 1,
                msg: '经办与复核不能为同一人',
                data: null
            });
        }
        new Promise((resolve, reject) => {
            let option = {
                pageUrl: '/businessMgmt/IPOMgmtOCReview/publishReview/dataPassOfDel.ajax',
                req,
                qs: {
                    acceptMode: params.passData.acceptMode
                },
                url: `${apiUrl.delLineData}/${params.passData.fundId}/lifecircle/delete`,
                timeout: 15000,
                json: true
            };
            request.delete(option, (error, response, body) => {
                if (error) {
                    reject({
                        error: 1,
                        msg: '数据删除失败',
                        data: null
                    });
                }
                if (body && body.returnCode == 0) {
                    if (body.body) {
                        resolve({
                            error: 0,
                            msg: '数据删除成功',
                            data: body.body
                        });
                    } else {
                        reject({
                            error: 1,
                            msg: '数据删除失败',
                            data: body.body
                        });
                    }

                } else if (body.returnCode != 0 && body.returnCode != 9999) {
                    reject({
                        error: 1,
                        msg: body.returnMsg,
                        data: null
                    });
                } else {
                    reject({
                        error: 1,
                        msg: '数据删除失败',
                        data: null
                    });
                }
            });
        }).then(() => {
            var $sql = `UPDATE ${tableName} SET ? WHERE update_timestamp = '${params.update_timestamp}' AND local_id = '${params.local_id}';`;
            sql_query(res, $sql, {
                status: params.status,
                operator: userId,
                reviewer: userId,
                review_time: formatTimeStamp(new Date()),

            }, function (err, results) {
                if (err) {
                    console.log('/businessMgmt/IPOMgmtOCReview/publishReview/dataPassOfDel.ajax', err)
                    return res.send({
                        error: 1,
                        msg: '线上数据复核成功,经办数据复核失败'
                    });
                }

                if (results.affectedRows) {
                    res.send({
                        error: 0,
                        msg: '复核成功',
                        data: results.insertId
                    });
                } else {
                    res.send({
                        error: 1,
                        msg: '线上数据复核成功,经办数据复核失败,请刷新页面',
                        data: null
                    });
                }
            })
        }).catch(err => {
            res.send(err)
        })
    });


    // 通过   修改
    app.post('/businessMgmt/IPOMgmtOCReview/publishReview/dataPassOfModify.ajax', (req, res, next) => {
        let params = req.body;
        let userId = req.session.loginInfo.userid;
        if (params.creator === userId) {
            return res.send({
                error: 1,
                msg: '经办与复核不能为同一人',
                data: null
            });
        }
        new Promise((resolve, reject) => {
            let option = {
                pageUrl: '/businessMgmt/IPOMgmtOCReview/publishReview/dataPassOfModify.ajax',
                req,
                body: params.passData,
                url: `${apiUrl.delLineData}/${params.passData.fundId}/lifecircle/update-no-version`,
                timeout: 15000,
                json: true
            };
            request.patch(option, (error, response, body) => {
                if (error) {
                    reject({
                        error: 1,
                        msg: '数据修改失败',
                        data: null
                    });
                }
                if (body && body.returnCode == 0) {
                    if (body.body) {
                        resolve({
                            error: 0,
                            msg: '数据修改成功',
                            data: body.body
                        });
                    } else {
                        reject({
                            error: 1,
                            msg: '数据修改失败',
                            data: body.body
                        });
                    }

                } else if (body.returnCode != 0 && body.returnCode != 9999) {
                    reject({
                        error: 1,
                        msg: body.returnMsg,
                        data: null
                    });
                } else {
                    reject({
                        error: 1,
                        msg: '数据修改失败',
                        data: null
                    });
                }
            });
        }).then(() => {
            var $sql = `UPDATE ${tableName} SET ? WHERE update_timestamp = '${params.update_timestamp}' AND local_id = '${params.local_id}';`;
            sql_query(res, $sql, {
                status: params.status,
                operator: userId,
                reviewer: userId,
                review_time: formatTimeStamp(new Date()),

            }, function (err, results) {
                if (err) {
                    console.log('/businessMgmt/IPOMgmtOCReview/publishReview/dataPassOfModify.ajax', err)
                    return res.send({
                        error: 1,
                        msg: '线上数据复核成功,经办数据复核失败'
                    });
                }

                if (results.affectedRows) {
                    res.send({
                        error: 0,
                        msg: '复核成功',
                        data: results.insertId
                    });
                } else {
                    res.send({
                        error: 1,
                        msg: '线上数据复核成功,经办数据复核失败,请刷新页面',
                        data: null
                    });
                }
            })
        }).catch(err => {
            res.send(err)
        })


    });

    // 通过   新增
    app.post('/businessMgmt/IPOMgmtOCReview/publishReview/dataPassOfAdd.ajax', (req, res, next) => {
        let params = req.body;
        let userId = req.session.loginInfo.userid;
        if (params.creator === userId) {
            return res.send({
                error: 1,
                msg: '经办与复核不能为同一人',
                data: null
            });
        }
        delete params.passData.serialno;
        new Promise((resolve, reject) => {
            let option = {
                pageUrl: '/businessMgmt/IPOMgmtOCReview/publishReview/dataPassOfAdd.ajax',
                req,
                body: [params.passData],
                url: apiUrl.addLineData,
                timeout: 15000,
                json: true
            };
            request.post(option, (error, response, body) => {
                if (error) {
                    reject({
                        error: 1,
                        msg: '数据新增失败',
                        data: null
                    });
                }
                if (body && body.returnCode == 0) {
                    if (body.body) {
                        resolve({
                            error: 0,
                            msg: '数据新增成功',
                            data: body.body
                        });
                    } else {
                        reject({
                            error: 1,
                            msg: '数据新增失败',
                            data: body.body
                        });
                    }

                } else if (body.returnCode != 0 && body.returnCode != 9999) {
                    reject({
                        error: 1,
                        msg: body.returnMsg,
                        data: null
                    });
                } else {
                    reject({
                        error: 1,
                        msg: '数据新增失败',
                        data: null
                    });
                }
            });
        }).then(() => {
            var $sql = `UPDATE ${tableName} SET ? WHERE update_timestamp = '${params.update_timestamp}' AND local_id = '${params.local_id}';`;
            sql_query(res, $sql, {
                status: params.status,
                operator: userId,
                reviewer: userId,
                review_time: formatTimeStamp(new Date()),

            }, function (err, results) {
                if (err) {
                    console.log('/businessMgmt/IPOMgmtOCReview/publishReview/dataPassOfAdd.ajax', err)
                    return res.send({
                        error: 1,
                        msg: '线上数据复核成功,经办数据复核失败'
                    });
                }

                if (results.affectedRows) {
                    res.send({
                        error: 0,
                        msg: '复核成功',
                        data: results.insertId
                    });
                } else {
                    res.send({
                        error: 1,
                        msg: '线上数据复核成功,经办数据复核失败,请刷新页面',
                        data: null
                    });
                }
            })
        }).catch(err => {
            res.send(err)
        })


    });


};

function sql_query(res, $sql, params, callback) {

    pool.getConnection(function (err, connection) {
        if (err) {
            console.log('链接失败', err)
            return res.send({
                error: 1,
                msg: '数据库链接失败'
            });
        }
        connection.query($sql, params, callback)
        connection.release()
    })
}

function formatTimeStamp(timestamp) {
    let d = new Date(timestamp);
    let fixZero = function (num) {
        return num < 10 ? '0' + num : num;
    };
    return [d.getFullYear(), d.getMonth() + 1, d.getDate()].map(value => fixZero(value)).join('-') +
        ' ' + [d.getHours(), d.getMinutes(), d.getSeconds()].map(value => fixZero(value)).join(':');
}