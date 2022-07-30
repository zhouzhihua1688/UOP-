const request = require('../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').IPOMgmtOC.IPOSetReview;
const tableName = 'bm_ipo_setting';
module.exports = function (app) {
    // 获取  select选择项数据
    app.post('/businessMgmt/IPOMgmtOC/IPOSetReview/selectOption.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/businessMgmt/IPOMgmtOC/IPOSetReview/selectOption.ajax',
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
    // 获取  基金名称查询数据
    app.post('/businessMgmt/IPOMgmtOC/IPOSetReview/collection.ajax', (req, res, next) => {
        let userId = req.session.loginInfo.userid;
        let params = req.body;
        let option = {
            pageUrl: '/businessMgmt/IPOMgmtOC/IPOSetReview/collection.ajax',
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
                result.body.userId = userId;
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
    app.post('/businessMgmt/IPOMgmtOC/IPOSetReview/getLineList.ajax', (req, res, next) => {
        let params = req.body;
        let userId = req.session.loginInfo.userid;
        console.log(params)
        let option = {
            pageUrl: '/businessMgmt/IPOMgmtOC/IPOSetReview/getLineList.ajax',
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
                    userId
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
    app.post('/businessMgmt/IPOMgmtOC/IPOSetReview/getLocalList.ajax', (req, res, next) => {
        let params = req.body;
        let userId = req.session.loginInfo.userid;


        console.log('params', params)

        var $sql = `SELECT local_id,service_id,status,remark,operate,content,operator,update_timestamp FROM ${tableName} WHERE delete_flag='F';`;
        if (params.service_id != '' || params.status != '') {
            $sql = `SELECT local_id,service_id,status,remark,operate,content,operator,update_timestamp FROM ${tableName} WHERE delete_flag='F'${params.service_id == '' ? '' : `&&service_id='${params.service_id}'`}${params.status == '' ? '' : '&&status=' + params.status};`
        }
        sql_query(res, $sql, [], function (err, data) {
            if (err) {
                console.log('/businessMgmt/IPOMgmtOC/IPOSetReview/getLocalList.ajax', err)
                return res.send({
                    error: 1,
                    msg: '查询失败'
                });
            } else {
                var arr = data.map(element => {
                    return element.service_id
                });

                let option = {
                    pageUrl: '/businessMgmt/IPOMgmtOC/IPOSetReview/getLineList.ajax',
                    req,
                    url: `${apiUrl.getLineList}?fundIdList=${arr.join(',')}`,
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
                        let dataConcat = []
                        data.forEach(item => {
                            item.content = JSON.parse(item.content)
                            item.update_timestamp = formatTimeStamp(item.update_timestamp)
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
                            data: dataConcat,
                            userId
                        });
                    } else {
                        res.send({
                            error: 1,
                            msg: '获取数据失败'
                        });
                    }
                });
            }
        })

    });

    //   驳回数据
    app.post('/businessMgmt/IPOMgmtOC/IPOSetReview/rejectFund.ajax', (req, res, next) => {
        let params = req.body;
        let userId = req.session.loginInfo.userid;
        if (!checkUser(req, params.operator)) {
            return res.send({
                error: 1,
                msg: '经办复核不能是同一人',
                data: null
            });
        }

        let $sql = `UPDATE ${tableName} SET ?,review_time= '${formatTimeStamp(new Date())}' WHERE delete_flag='F'&&service_id='${params.service_id}'&&local_id=${params.local_id}&&update_timestamp='${params.update_timestamp}';`;
        var undateSql_Params = {
            status: 9,
            remark: params.remark,
            operator: userId,
            reviewer: userId,
        };
        sql_query(res, $sql, undateSql_Params, function (err, data) {
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
                    console.log('insertdata', insertdata);
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


    //   通过数据
    app.post('/businessMgmt/IPOMgmtOC/IPOSetReview/passFund.ajax', (req, res, next) => {
        let params = req.body;
        let userId = req.session.loginInfo.userid;
        params.content = JSON.parse(params.content)
        console.log('params', params)
        if (!checkUser(req, params.operator)) {
            return res.send({
                error: 1,
                msg: '经办复核不能是同一人',
                data: null
            });
        }
        // return;
        if (params.operate == 1) {
            new Promise(function (resolve, reject) {
                let sendData = {
                    productNewFundInfoDO: params.content.fundInfo,
                    productNewFundsubdatetimeDOList: params.content.circleList,
                    productNewFundInfoEXDO: params.content.fundExtension,
                };

                let option = {
                    pageUrl: '/businessMgmt/IPOMgmtOC/IPOSetReview/add.ajax',
                    req,
                    body: sendData,
                    timeout: 15000,
                    json: true
                };
                option.url = apiUrl.add;
                request.post(option, (error, response, body) => {
                    if (error) {
                        console.log(error)
                        return reject({
                            error: 1,
                            msg: '新增失败'
                        });
                    }
                    let result = typeof body === 'string' ? JSON.parse(body) : body;
                    if (result && result.returnCode == '0') {
                        return resolve({
                            error: 0,
                            msg: '新增成功'
                        });
                    } else if (result && result.returnCode == 9999) {
                        return reject({
                            error: 1,
                            msg: '新增失败'
                        });
                    } else {
                        return reject({
                            error: 1,
                            msg: result.returnMsg
                        });
                    }
                });
            }).then(function () {
                var review_time = formatTimeStamp(new Date());
                new Promise(function (resolve, reject) {

                    let $sql = `insert into ${tableName} (service_id,operate,status,content,creator,operator,reviewer,review_time,remark,comment,delete_flag,create_timestamp) select service_id,operate,0,content,creator,'${userId}','${userId}','${review_time}',remark,'新增通过','T',create_timestamp from ${tableName} WHERE delete_flag='F'&&service_id='${params.service_id}'&&local_id=${params.local_id}`

                    sql_query(res, $sql, [], function (err, data) {
                        if (err) {
                            console.log('线上数据复核成功，本地数据留痕失败，请联系管理员' + err);
                            return reject({
                                error: 1,
                                msg: '线上数据复核成功，本地数据留痕失败，请联系管理员'
                            })
                        }
                        console.log('data', data);
                        if (data.affectedRows == 1) {
                            return resolve()
                        } else {
                            return reject({
                                error: 1,
                                msg: '线上数据复核成功，本地数据留痕失败，请联系管理员'
                            })
                        }
                    })

                }).then(function (result) {

                    let $sql = `UPDATE ${tableName} SET ? ,review_time = '${review_time}' WHERE delete_flag='F'&&service_id='${params.service_id}'&&local_id=${params.local_id}&&update_timestamp='${params.update_timestamp}';`;
                    let undateSql_Params = {
                        content: null,
                        status: 0,
                        operator: userId,
                        reviewer: userId
                    };

                    sql_query(res, $sql, undateSql_Params, function (err, insertdata) { //修改
                        if (err) {
                            console.log('复核成功，本地数据更新失败' + err);
                            return res.send({
                                error: 0,
                                msg: '复核成功，本地数据更新失败' + err
                            })
                        }
                        console.log('insertdata', insertdata);
                        if (insertdata.changedRows == 1) {
                            return res.send({
                                error: 0,
                                msg: '复核成功'
                            })

                        } else {
                            return res.send({
                                error: 0,
                                msg: '复核成功，本地数据更新失败'
                            })
                        }
                    })

                }).catch(function (err) {
                    res.send(err);
                })

            }).catch(function (err) {
                res.send(err);
            })

        } else if (params.operate == 2) { // modify Online Data

            var modifyData = params.content;
            let proArr = []; //promise all

            modifyData.circleList.forEach(function (item, ind) {
                if (JSON.stringify(item) != '{}') {
                    if (item.del) {
                        proArr.push(new Promise(function (resolve, reject) {
                            let option = {
                                pageUrl: '/businessMgmt/IPOMgmtOC/IPOSetReview/passFund.ajax  delLifeCycle',
                                req,
                                timeout: 15000,
                                json: true
                            };
                            option.url = `${apiUrl.delLifeCycle}${params.service_id}/lifecircle/delete?acceptMode=${item.accptmd}`;
                            request.delete(option, (error, response, body) => {
                                if (error) {
                                    console.log(error)
                                    return resolve({
                                        msg: '删除失败',
                                        returnCode: 1
                                    });
                                }
                                let result = typeof body === 'string' ? JSON.parse(body) : body;
                                if (result && result.returnCode == '0') {
                                    resolve(result);
                                } else if (result && result.returnCode == 9999) {
                                    return resolve({
                                        msg: '删除失败',
                                        returnCode: 1
                                    });
                                } else {
                                    return resolve({
                                        msg: result.returnMsg,
                                        returnCode: 1
                                    });
                                }
                            });

                        }))
                    } else if (item.add) {
                        proArr.push(new Promise(function (resolve, reject) {
                            let option = {
                                pageUrl: '/businessMgmt/IPOMgmtOC/IPOSetReview/passFund.ajax  addLifeCycle',
                                req,
                                timeout: 15000,
                                json: true
                            };
                            option.url = apiUrl.addLifeCycle;
                            option.body = item
                            option.body.fundid = params.service_id
                            request.post(option, (error, response, body) => {
                                if (error) {
                                    console.log(error)
                                    return resolve({
                                        msg: '新增生命周期失败',
                                        returnCode: 1
                                    });
                                }
                                let result = typeof body === 'string' ? JSON.parse(body) : body;
                                if (result && result.returnCode == '0') {
                                    resolve(result);
                                } else if (result && result.returnCode == 9999) {
                                    return resolve({
                                        msg: '新增生命周期失败',
                                        returnCode: 1
                                    });
                                } else {
                                    return resolve({
                                        msg: result.returnMsg,
                                        returnCode: 1
                                    });
                                }
                            });
                        }))
                    } else {
                        proArr.push(new Promise(function (resolve, reject) {
                            let option = {
                                pageUrl: '/businessMgmt/IPOMgmtOC/IPOSetReview/passFund.ajax  modifyLifeCycle',
                                req,
                                timeout: 15000,
                                json: true
                            };
                            option.url = `${apiUrl.modifyLifeCycle}${params.service_id}/lifecircle/update-no-version`;
                            option.body = item
                            option.body.fundid = params.service_id
                            request.patch(option, (error, response, body) => {
                                if (error) {
                                    console.log(error)
                                    return resolve({
                                        msg: '修改失败',
                                        returnCode: 1
                                    });
                                }
                                let result = typeof body === 'string' ? JSON.parse(body) : body;
                                if (result && result.returnCode == '0') {
                                    resolve(result);
                                } else if (result && result.returnCode == 9999) {
                                    return resolve({
                                        msg: '修改失败',
                                        returnCode: 1
                                    });
                                } else {
                                    return resolve({
                                        msg: result.returnMsg,
                                        returnCode: 1
                                    });
                                }
                            });
                        }))
                    }


                }
            })


            if (JSON.stringify(modifyData.fundExtension) != '{}') {
                proArr.push(new Promise(function (resolve, reject) {
                    let option = {
                        pageUrl: '/businessMgmt/IPOMgmtOC/IPOSetReview/passFund.ajax  modifyExtension',
                        req,
                        timeout: 15000,
                        json: true
                    };
                    option.url = `${apiUrl.modifyExtension}${params.service_id}/info/extension/update-no-version`;
                    option.body = modifyData.fundExtension
                    option.body.fundid = params.service_id
                    request.patch(option, (error, response, body) => {
                        if (error) {
                            console.log(error)
                            return resolve({
                                msg: '修改失败',
                                returnCode: 1
                            });
                        }
                        let result = typeof body === 'string' ? JSON.parse(body) : body;
                        if (result && result.returnCode == '0') {
                            resolve(result);
                        } else if (result && result.returnCode == 9999) {
                            return resolve({
                                msg: '修改失败',
                                returnCode: 1
                            });
                        } else {
                            return resolve({
                                msg: result.returnMsg,
                                returnCode: 1
                            });
                        }
                    });
                }))
            }
            if (JSON.stringify(modifyData.fundInfo) != '{}') {
                proArr.push(new Promise(function (resolve, reject) {
                    let option = {
                        pageUrl: '/businessMgmt/IPOMgmtOC/IPOSetReview/passFund.ajax  modifyBase',
                        req,
                        timeout: 15000,
                        json: true
                    };
                    option.url = `${apiUrl.modifyBase}${params.service_id}/info/base/update-no-version`;
                    option.body = modifyData.fundInfo
                    option.body.fundid = params.service_id
                    request.patch(option, (error, response, body) => {
                        if (error) {
                            console.log(error)
                            return resolve({
                                msg: '修改失败',
                                returnCode: 1
                            });
                        }
                        let result = typeof body === 'string' ? JSON.parse(body) : body;
                        if (result && result.returnCode == '0') {
                            resolve(result);
                        } else if (result && result.returnCode == 9999) {
                            return resolve({
                                msg: '修改失败',
                                returnCode: 1
                            });
                        } else {
                            return resolve({
                                msg: result.returnMsg,
                                returnCode: 1
                            });
                        }
                    });
                }))
            }
            console.log('proArr', proArr)

            Promise.all(proArr).then(function (result) {
                console.log(result)
                var checkCode = result.every(function (item) {
                    return item.returnCode == 0;
                })
                var review_time = formatTimeStamp(new Date())
                console.log('review_time', review_time)
                if (checkCode) {


                    let $sql = `insert into ${tableName} (service_id,operate,status,content,creator,operator,reviewer,review_time,remark,comment,delete_flag,create_timestamp) select service_id,operate,0,content,creator,'${userId}','${userId}','${review_time}',remark,'修改通过','T',create_timestamp from ${tableName} WHERE delete_flag='F'&&service_id='${params.service_id}'&&local_id=${params.local_id}`
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
                            let $sql = `UPDATE ${tableName} SET  ? ,review_time= '${review_time}'  WHERE delete_flag='F'&&service_id='${params.service_id}'&&local_id=${params.local_id}&&update_timestamp='${params.update_timestamp}';`;
                            let undateSql_Params = {
                                content: null,
                                status: 0,
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




                } else {
                    let msg;
                    result.some(function (item) {
                        if (item.returnCode != 0) {
                            msg = item.returnMsg ? item.returnMsg : item.msg;
                            return true;
                        }

                    })
                    throw msg;
                }

            }).catch(function (modifyErr) {
                return res.send({
                    error: 1,
                    msg: modifyErr,
                    data: null
                });
            })



        }

    });


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