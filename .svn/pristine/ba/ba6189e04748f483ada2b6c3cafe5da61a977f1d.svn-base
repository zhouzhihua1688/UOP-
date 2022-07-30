const request = require('./../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').IPOMgmtEC.IPOMgmtReview;
const tableName = 'bm_ipo_mgmt';
module.exports = function (app) {
    // 获取  select选择项数据
    app.post('/businessMgmt/IPOMgmtEC/IPOMgmtReview/selectOption.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/businessMgmt/IPOMgmtEC/IPOMgmtReview/selectOption.ajax',
            req,
            url: apiUrl.selectOption,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '数据获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {
                res.send({
                    error: 0,
                    msg: '调用成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '数据获取失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });

    app.post('/businessMgmt/IPOMgmtEC/IPOMgmtReview/collection.ajax', (req, res, next) => {
        let params = req.body;
        let userid = req.session.loginInfo.userid;
        let option = {
            pageUrl: '/businessMgmt/IPOMgmtEC/IPOMgmtReview/collection.ajax',
            req,
            url: apiUrl.collection,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '数据获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {
                result.body.userid = userid;
                res.send({
                    error: 0,
                    msg: '调用成功',
                    data: result.body
                });
            } else {
                res.send({
                    error: 1,
                    msg: '获取数据失败'
                });
            }
        });
    });
    // 获取  线上初始数据和查询
    app.post('/businessMgmt/IPOMgmtEC/IPOMgmtReview/getLineList.ajax', (req, res, next) => {
        let params = req.body;
        let userid = req.session.loginInfo.userid;
        let option = {
            pageUrl: '/businessMgmt/IPOMgmtEC/IPOMgmtReview/getLineList.ajax',
            req,
            url: apiUrl.getLineList,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '数据获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {
                res.send({
                    error: 0,
                    msg: '调用成功',
                    data: result.body,
                    userid
                });
            } else {
                res.send({
                    error: 1,
                    msg: '获取数据失败'
                });
            }
        });
    });
    // 获取  本地初始数据和查询
    app.post('/businessMgmt/IPOMgmtEC/IPOMgmtReview/getLocalList.ajax', (req, res, next) => {
        let params = req.body;
        let userId = req.session.loginInfo.userid;

        pool.getConnection(function (err, connection) {
            if (err) {
                console.log('/businessMgmt/IPOMgmtEC/IPOMgmtReview/add.ajax  链接失败', err)
                return res.send({
                    error: 1,
                    msg: '查询失败'
                });
            }
            console.log('params', params)

            var $sql = `SELECT local_id,service_id,status,remark,operate,content,operator,update_timestamp FROM ${tableName} WHERE delete_flag='F';`;
            if (params.service_id != '' || params.status != '') {
                $sql = `SELECT local_id,service_id,status,remark,operate,content,operator,update_timestamp FROM ${tableName} WHERE delete_flag='F'${params.service_id == '' ? '' : `&&service_id='${params.service_id}'`}${params.status == '' ? '' : '&&status=' + params.status};`
            }
            connection.query($sql, function (err, data) { //新增
                if (err) {
                    console.log(err)
                    return res.send({
                        error: 1,
                        msg: '查询失败'
                    });
                } else {
                    var arr = data.map(element => {
                        return element.service_id
                    });
                    let option = {
                        session: req.session,
                        url: `${apiUrl.getLineList}?fundIdList=${arr.join(',')}`,
                        timeout: 15000,
                        json: true
                    };
                    console.log('/businessMgmt/IPOMgmtOC/IPOMgmtReview/getLineList.ajax option:', option);
                    request(option, (error, response, body) => {
                        console.log('/businessMgmt/IPOMgmtOC/IPOMgmtReview/getLineList.ajax error:', error);
                        console.log('/businessMgmt/IPOMgmtOC/IPOMgmtReview/getLineList.ajax statusCode:', response && response.statusCode);
                        console.log('/businessMgmt/IPOMgmtOC/IPOMgmtReview/getLineList.ajax body:', body);
                        if (error) {
                            return res.send({
                                error: 1,
                                msg: '数据获取失败'
                            });
                        }
                        let result = typeof body === 'string' ? JSON.parse(body) : body;
                        if (result && result.returnCode == '0') {

                            let dataConcat = []
                            data.forEach(item => {
                                if (item.content) {
                                    item.content = JSON.parse(item.content)
                                    item.update_timestamp = formatTimeStamp(item.update_timestamp)
                                }
                                result.body.some(element => {
                                    if (element.fundId === item.service_id) {
                                        if (element.fundInfo === null) {
                                            dataConcat.push({
                                                ...item,
                                                ...item.content
                                            })
                                        } else {
                                            dataConcat.push({
                                                ...item,
                                                ...element
                                            })
                                        }
                                        return true;
                                    }
                                })
                            })
                            res.send({
                                error: 0,
                                msg: '调用成功',
                                data: dataConcat
                            });
                        } else {
                            res.send({
                                error: 1,
                                msg: '获取数据失败'
                            });
                        }
                    });
                    connection.release()
                }
            })

        })
    });

    //   驳回数据
    app.post('/businessMgmt/IPOMgmtEC/IPOMgmtReview/rejectFund.ajax', (req, res, next) => {
        let params = req.body;
        let userId = req.session.loginInfo.userid;
        if (!checkUser(req, params.operator)) {
            return res.send({
                error: 1,
                msg: '经办复核不能是同一人',
                data: null
            });
        }
        let $sql = `UPDATE ${tableName} SET ? WHERE delete_flag='F'&&service_id='${params.service_id}'&&local_id=${params.local_id}&&update_timestamp='${params.update_timestamp}';`;
        let $sql_params = {
            status: 9,
            review_time: formatTimeStamp(new Date()),
            remark: params.remark,
            operator: userId,
            reviewer: userId,
        };
        sql_query(res, $sql, $sql_params, function (err, data) {
            if (err) {
                console.log('驳回失败' + err);
                return res.send({
                    error: 1,
                    msg: '驳回失败',
                    data: null
                });
            }
            console.log('data', data);
            if (data.changedRows == 1) {
                let $sql = `insert into ${tableName} (service_id,operate,status,content,creator,operator,reviewer,review_time,remark,comment,delete_flag,create_timestamp) select service_id,operate,status,content,creator,operator,reviewer,review_time,remark,'驳回','T',create_timestamp from ${tableName} WHERE delete_flag='F'&&service_id='${params.service_id}'&&local_id=${params.local_id}`

                sql_query(res, $sql, [], function (err, insertdata) { //修改
                    if (err) {
                        console.log('驳回成功，数据留痕失败' + err);
                        return res.send({
                            error: 0,
                            msg: '驳回成功，数据留痕失败' + err
                        })
                    }
                    if (insertdata.affectedRows == 1) {
                        return res.send({
                            error: 0,
                            msg: '驳回成功'
                        })

                    } else {
                        return res.send({
                            error: 0,
                            msg: '驳回成功，数据留痕失败'
                        })
                    }
                })

            } else {
                return res.send({
                    error: 1,
                    msg: '驳回失败,请刷新页面',
                    data: null
                });
            }

        })


    });


    // pass
    app.post('/businessMgmt/IPOMgmtEC/IPOMgmtReview/passFund.ajax', (req, res, next) => {
        let params = req.body;
        if (!checkUser(req, params.operator)) {
            return res.send({
                error: 1,
                msg: '经办复核不能是同一人',
                data: null
            });
        }
        let promiseArr = [] //promiseAll
        params.content = JSON.parse(params.content)
        let userId = req.session.loginInfo.userid;

        console.log('params', params)
        if (JSON.stringify(params.content.fundInfo) != '{}') {
            params.content.fundInfo.fundid = params.service_id;
            promiseArr.push(new Promise(function (resolve, reject) {
                let option = {
                    pageUrl: '/businessMgmt/IPOMgmtEC/IPOMgmtReview/add.ajax  base',
                    req,
                    body: params.content.fundInfo,
                    timeout: 15000,
                    json: true
                };
                option.url = `${apiUrl.updateBase}${params.service_id}/info/base/update-no-version`;
                request.patch(option, (error, response, body) => {
                    if (error) {
                        console.log(error)
                        return resolve({
                            returnMsg: '修改失败',
                            returnCode: 1
                        });
                    }
                    let result = typeof body === 'string' ? JSON.parse(body) : body;
                    if (result && result.returnCode == '0') {
                        return resolve({
                            returnMsg: '修改成功',
                            returnCode: 0
                        });
                    } else if (result && result.returnCode == 9999) {
                        return resolve({
                            returnMsg: '修改失败',
                            returnCode: 1
                        });
                    } else {
                        return resolve({
                            returnMsg: result.returnMsg,
                            returnCode: 1
                        });
                    }
                });
            }))
        }
        if (JSON.stringify(params.content.fundExtension) != '{}') {
            params.content.fundExtension.fundid = params.service_id;
            promiseArr.push(new Promise(function (resolve, reject) {
                let option = {
                    pageUrl: '/businessMgmt/IPOMgmtEC/IPOMgmtReview/add.ajax  extension',
                    req,
                    body: params.content.fundExtension,
                    timeout: 15000,
                    json: true
                };
                option.url = `${apiUrl.updateExtension}${params.service_id}/info/extension/update-no-version`;
                request.patch(option, (error, response, body) => {
                    if (error) {
                        console.log(error)
                        return resolve({
                            returnMsg: '修改失败',
                            returnCode: 1
                        });
                    }
                    let result = typeof body === 'string' ? JSON.parse(body) : body;
                    if (result && result.returnCode == '0') {
                        return resolve({
                            returnMsg: '修改成功',
                            returnCode: 0
                        });
                    } else if (result && result.returnCode == 9999) {
                        return resolve({
                            returnMsg: '修改失败',
                            returnCode: 1
                        });
                    } else {
                        return resolve({
                            returnMsg: result.returnMsg,
                            returnCode: 1
                        });
                    }
                });
            }))
        }
        if (params.operate == 2) {
            if (JSON.stringify(params.content.fundDetail) != '{}') {
                params.content.fundDetail.fundid = params.service_id;
                promiseArr.push(new Promise(function (resolve, reject) {
                    let option = {
                        pageUrl: '/businessMgmt/IPOMgmtEC/IPOMgmtReview/add.ajax  updateDetail',
                        req,
                        body: params.content.fundDetail,
                        timeout: 15000,
                        json: true
                    };
                    option.url = `${apiUrl.updateDetail}${params.service_id}/info/detail/update-no-version`;
                    request.patch(option, (error, response, body) => {
                        if (error) {
                            console.log(error)
                            return resolve({
                                returnMsg: '修改失败',
                                returnCode: 1
                            });
                        }
                        let result = typeof body === 'string' ? JSON.parse(body) : body;
                        if (result && result.returnCode == '0') {
                            return resolve({
                                returnMsg: '修改成功',
                                returnCode: 0
                            });
                        } else if (result && result.returnCode == 9999) {
                            return resolve({
                                returnMsg: '修改失败',
                                returnCode: 1
                            });
                        } else {
                            return resolve({
                                returnMsg: result.returnMsg,
                                returnCode: 1
                            });
                        }
                    });
                }))
            }
        } else if (params.operate == 1) {

            if (JSON.stringify(params.content.fundDetail) != '{}') {
                params.content.fundDetail.fundid = params.service_id;
                promiseArr.push(new Promise(function (resolve, reject) {
                    let option = {
                        pageUrl: '/businessMgmt/IPOMgmtEC/IPOMgmtReview/add.ajax  addDetail',
                        req,
                        body: params.content.fundDetail,
                        timeout: 15000,
                        json: true
                    };
                    option.url = apiUrl.addDetail;
                    request.post(option, (error, response, body) => {
                        if (error) {
                            console.log(error)
                            return resolve({
                                returnMsg: '新增失败',
                                returnCode: 1
                            });
                        }
                        let result = typeof body === 'string' ? JSON.parse(body) : body;
                        if (result && result.returnCode == '0') {
                            return resolve({
                                returnMsg: '新增成功',
                                returnCode: 0
                            });
                        } else if (result && result.returnCode == 9999) {
                            return resolve({
                                returnMsg: '新增失败',
                                returnCode: 1
                            });
                        } else {
                            return resolve({
                                returnMsg: result.returnMsg,
                                returnCode: 1
                            });
                        }
                    });
                }))
            }
        }
        console.log('promiseArr', promiseArr)
        Promise.all(promiseArr).then(result => {
            let flag = result.every(function (item) {
                return item.returnCode == 1
            })
            if (flag) {
                throw result
            } else {
                var review_time = formatTimeStamp(new Date())
                let $sql = `insert into ${tableName} (service_id,operate,status,content,creator,operator,reviewer,review_time,remark,comment,delete_flag,create_timestamp) select service_id,operate,0,content,creator,'${userId}','${userId}','${review_time}',remark,'${params.operate == 1 ? '新增' : '修改'}通过','T',create_timestamp from ${tableName} WHERE delete_flag='F'&&service_id='${params.service_id}'&&local_id=${params.local_id}`
                sql_query(res, $sql, [], function (err, insertdata) {
                    if (err) {
                        console.log('留痕失败' + err);
                        return res.send({
                            error: 1,
                            msg: `复核成功,留痕失败`,
                            data: null
                        });
                    }
                    if (insertdata.affectedRows == 1) {
                        let $sql = `UPDATE ${tableName} SET  ?  WHERE delete_flag='F'&&service_id='${params.service_id}'&&local_id=${params.local_id}&&update_timestamp='${params.update_timestamp}';`;
                        let undateSql_Params = {
                            content: null,
                            status: 0,
                            review_time,
                            reviewer: userId,
                            operator: userId,
                            remark: null
                        };
                        sql_query(res, $sql, undateSql_Params, function (err, data) {
                            if (err) {
                                console.log('本地数据修改失败' + err);
                                return res.send({
                                    error: 1,
                                    msg: `复核成功,本地数据修改失败,请联系管理员`,
                                    data: null
                                });
                            }
                            if (data.changedRows == 1) {
                                return res.send({
                                    error: 0,
                                    msg: `复核成功`,
                                    data: null
                                });
                            } else {
                                return res.send({
                                    error: 1,
                                    msg: `复核成功,本地数据修改失败，请联系管理员`,
                                    data: null
                                });
                            }
                        })
                    } else {
                        return res.send({
                            error: 1,
                            msg: `复核成功,留痕失败`,
                            data: null
                        });
                    }
                })



            }
        }).catch(err => {
            res.send({
                error: 1,
                msg: `全部错误,处理失败`,
                data: err
            });
        })


    })
};

function checkUser(request, handleId) {
    let reviewId = request.session.loginInfo.userid;
    if (reviewId === handleId) {
        return false;
    } else {
        return true;
    }
}

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