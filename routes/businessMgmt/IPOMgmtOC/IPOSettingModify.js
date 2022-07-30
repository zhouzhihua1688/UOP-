const request = require('../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').IPOMgmtOC.IPOSettingModify;
const tableName = 'bm_ipo_setting';
module.exports = function (app) {


    // 获取  select选择项数据
    app.post('/businessMgmt/IPOMgmtOC/IPOSetting/modifyselectOption.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/businessMgmt/IPOMgmtOC/IPOSetting/modifyselectOption.ajax',
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

    // 新增
    app.post('/businessMgmt/IPOMgmtOC/IPOSetting/modifyAdd.ajax', (req, res, next) => {
        let params = req.body;
        params.circleList = JSON.parse(params.circleList)
        params.fundExtension = JSON.parse(params.fundExtension)
        params.fundInfo = JSON.parse(params.fundInfo)
        let user_id = req.session.loginInfo.userid;
        var fundid = params.fundInfo.fundid;
        var operate = params.operate
        var local_id = params.local_id
        var update_timestamp = params.update_timestamp
        console.log(params)
        params = JSON.stringify({
            circleList: params.circleList,
            fundExtension: params.fundExtension,
            fundInfo: params.fundInfo
        })
        new Promise(function (resolve, reject) { //检查服务端fundid是否重复
            let option = {
                pageUrl: '/businessMgmt/IPOMgmtOC/IPOSetting/modifyAdd.ajax',
                req,
                url: `${apiUrl.base}${fundid}/info/base/query`,
                timeout: 15000,
                json: true
            };
            request(option, (error, response, body) => {
                if (error) {
                    console.log(error)
                    return reject('新增失败');
                }
                let result = typeof body === 'string' ? JSON.parse(body) : body;
                if (result && result.returnCode == '0') {
                    if (result.body) {
                        return reject('新增失败,基金id重复');
                    }
                    return resolve()
                } else if (result && result.returnCode == 9999) {
                    return reject('新增失败');
                } else {
                    return reject(result.returnMsg);
                }
            });
        }).then(function () { //检查本地fundid是否重复
            let $sql = `SELECT local_id FROM ${tableName} WHERE service_id='${fundid}'&&delete_flag="F";`
            sql_query(res, $sql, [], function (err, data) { //新增
                if (err) {
                    console.log('/businessMgmt/IPOMgmtOC/IPOSetting/modifyAdd.ajax', err)
                    return res.send({
                        error: 1,
                        msg: '新增失败'
                    });
                }
                if (data.length == 0) {
                    sql_query(res, `insert into ${tableName} set ?;`, {
                        content: params,
                        creator: user_id,
                        operator: user_id,
                        service_id: fundid,
                        status: 2,
                        operate
                    }, function (err, insertdata) { //新增
                        if (err) {
                            console.log('/businessMgmt/IPOMgmtOC/IPOSetting/modifyAdd.ajax', err)
                            return res.send({
                                error: 1,
                                msg: '新增失败'
                            });
                        } else {
                            console.log('insertdata', insertdata)
                            res.send({
                                error: 0,
                                msg: '新增成功'
                            });
                        }
                    })
                } else if (data.length > 0 && operate == 1) {
                    sql_query(res, `UPDATE ${tableName} SET ? WHERE local_id=${local_id}&&update_timestamp='${update_timestamp}';`, {
                        content: params,
                        operator: user_id,
                        status: 2,
                    }, function (err, insertdata) { //新增
                        if (err) {
                            console.log('/businessMgmt/IPOMgmtOC/IPOSetting/modifyAdd.ajax', err)
                            return res.send({
                                error: 1,
                                msg: '保存失败'
                            });
                        } else {
                            console.log('insertdata', insertdata)
                            if (insertdata.affectedRows == 1) {
                                res.send({
                                    error: 0,
                                    msg: '保存成功'
                                });
                            } else {
                                return res.send({
                                    error: 1,
                                    msg: '保存失败,请刷新'
                                });
                            }

                        }
                    })
                } else {
                    res.send({
                        error: 1,
                        msg: '新增失败，基金id重复',
                        data: null
                    });
                }

            })
        }).catch(function (err) {
            return res.send({
                error: 1,
                msg: err,
                data: null
            });
        })

    });




    // 修改
    app.post('/businessMgmt/IPOMgmtOC/IPOSetting/modifyModify.ajax', (req, res, next) => {
        let params = req.body;
        // params.productNewFundsubdatetimeDOList = JSON.parse(params.productNewFundsubdatetimeDOList)
        // params.productNewFundInfoEXDO = JSON.parse(params.productNewFundInfoEXDO)
        // params.productNewFundInfoDO = JSON.parse(params.productNewFundInfoDO)
        let modifyData = params.modifyData
        // if(modifyData.fundInfo&&circleList&&){
        //     fundExtension
        // }
        let user_id = req.session.loginInfo.userid;
        let service_id = params.service_id;
        let local_id = params.local_id
        let update_timestamp = params.update_timestamp
        console.log(params)

        sql_query(res, `SELECT * FROM ${tableName} WHERE service_id=? && delete_flag="F";`, [service_id], function (err, data) {
            if (err) {
                console.log('/businessMgmt/IPOMgmtOC/IPOSetting/modifyModify.ajax', err)
                return res.send({
                    error: 1,
                    msg: '修改失败'
                });
            }
            if (data.length == 0 && local_id == '') {
                let $sql = `insert into ${tableName} set ?;`
                sql_query(res, $sql, {
                    content: modifyData,
                    service_id,
                    status: 2,
                    operate: params.operate,
                    operator: user_id,
                    creator: user_id
                }, function (err, insertdata) {
                    if (err) {
                        console.log('/businessMgmt/IPOMgmtOC/IPOSetting/modifyModify.ajax', err)
                        return res.send({
                            error: 1,
                            msg: '修改失败'
                        });
                    }
                    console.log('insertdata', insertdata)
                    res.send({
                        error: 0,
                        msg: '修改成功'
                    });
                })

            } else {
                var $sqlup = `UPDATE ${tableName} SET ? WHERE local_id=${local_id}&&update_timestamp='${update_timestamp}';`
                sql_query(res, $sqlup, {
                    content: modifyData,
                    operator: user_id,
                    status: 2,
                    operate: params.operate
                }, function (err, updatedata) { //修改
                    if (err) {
                        console.log('/businessMgmt/IPOMgmtOC/IPOSetting/modifyModify.ajax', err)
                        return res.send({
                            error: 1,
                            msg: '修改失败'
                        });
                    }
                    console.log(updatedata)
                    if (updatedata.affectedRows == 0) {
                        return res.send({
                            error: 1,
                            msg: '修改失败,请刷新页面'
                        });
                    }
                    return res.send({
                        error: 0,
                        msg: '修改成功'
                    });
                })


            }
        })

    })



    // 获取本地修改数据
    app.post('/businessMgmt/IPOMgmtOC/IPOSetting/modifyLocalData.ajax', (req, res, next) => {
        let params = req.body;

        var $sql = `SELECT content,update_timestamp,operate FROM ${tableName} WHERE delete_flag='F'&&service_id='${params.service_id}'&&local_id=${params.local_id};`
        sql_query(res, $sql, [], function (err, data) {
            if (err) {
                console.log('/businessMgmt/IPOMgmtOC/IPOSetting/modifyLocalData.ajax  链接失败', err)
                return res.send({
                    error: 1,
                    msg: '查询失败'
                });
            } else {
                console.log('data', data)
                data[0].content = JSON.parse(data[0].content)
                data[0].update_timestamp = formatTimeStamp(data[0].update_timestamp)

                if (data.length) {
                    return res.send({
                        error: 0,
                        msg: '查询成功',
                        data: data[0]
                    });
                }
                return res.send({
                    error: 1,
                    msg: '查询失敗，请刷新页面',
                    data: null
                });
            }
        })
    });

    // 获取线上修改数据
    app.post('/businessMgmt/IPOMgmtOC/IPOSetting/modifylineData.ajax', (req, res, next) => {
        let params = req.body;
        Promise.all([new Promise(function (resolve, reject) {
            let option = {
                pageUrl: '/businessMgmt/IPOMgmtOC/IPOSetting/modifylineData.ajax',
                req,
                url: `${apiUrl.base}${params.service_id}/info/base/query`,
                timeout: 15000,
                json: true
            };
            request(option, (error, response, body) => {
                if (error) {
                    console.log(error)
                    return reject('查询失败');
                }
                let result = typeof body === 'string' ? JSON.parse(body) : body;
                if (result && result.returnCode == '0') {
                    return resolve(result.body)
                } else if (result && result.returnCode == 9999) {
                    return reject('查询失败');
                } else {
                    return reject(result.returnMsg);
                }
            });
        }), new Promise(function (resolve, reject) {
            let option = {
                pageUrl: '/businessMgmt/IPOMgmtOC/IPOSetting/modifylineData.ajax  extension',
                req,
                url: `${apiUrl.extension}${params.service_id}/info/extension/query`,
                timeout: 15000,
                json: true
            };
            request(option, (error, response, body) => {
                if (error) {
                    console.log(error)
                    return reject('查询失败');
                }
                let result = typeof body === 'string' ? JSON.parse(body) : body;
                if (result && result.returnCode == '0') {
                    return resolve(result.body)
                } else if (result && result.returnCode == 9999) {
                    return reject('查询失败');
                } else {
                    return reject(result.returnMsg);
                }
            });
        }), new Promise(function (resolve, reject) {
            let option = {
                pageUrl: '/businessMgmt/IPOMgmtOC/IPOSetting/modifylineData.ajax  lifecircle',
                req,
                url: `${apiUrl.lifecircle}${params.service_id}/lifecircle/query`,
                timeout: 15000,
                json: true
            };
            request(option, (error, response, body) => {
                if (error) {
                    console.log(error)
                    return reject('查询失败');
                }
                let result = typeof body === 'string' ? JSON.parse(body) : body;
                if (result && result.returnCode == '0') {
                    return resolve(result.body)
                } else if (result && result.returnCode == 9999) {
                    return reject('查询失败');
                } else {
                    return reject(result.returnMsg);
                }
            });
        })]).then(function (data) {
            return res.send({
                error: 0,
                msg: '查询成功',
                data: data
            });
        }).catch(function (err) {
            return res.send({
                error: 1,
                msg: err,
                data: null
            });
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

// function queryStudentBypwd(params, success) {
//     let sql = `select * from student where stu_num=? and pwd=?`
//     connection.query(sql, [params.user, params.password], function (err, result) {
//         success(err, result)
//     })
// }
function formatTimeStamp(timestamp) {
    let d = new Date(timestamp);
    let fixZero = function (num) {
        return num < 10 ? '0' + num : num;
    };
    return [d.getFullYear(), d.getMonth() + 1, d.getDate()].map(value => fixZero(value)).join('-') +
        ' ' + [d.getHours(), d.getMinutes(), d.getSeconds()].map(value => fixZero(value)).join(':');
}