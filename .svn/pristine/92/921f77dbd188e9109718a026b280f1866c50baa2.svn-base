const request = require('../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').IPOMgmtEC.IPOMgmtModify;
const tableName = 'bm_ipo_fund';
module.exports = function (app) {

    // 获取  线上修改数据
    app.post('/businessMgmt/IPOMgmtFD/IPOMgmtFund/modifyLineData.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/businessMgmt/IPOMgmtFD/IPOMgmtFund/modifyLineData.ajax',
            req,
            url: apiUrl.getLineList,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                console.log(error)
                return res.send({
                    error: 1,
                    msg: '获取数据失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {

                return res.send({
                    error: 0,
                    msg: '调用成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                return res.send({
                    error: 1,
                    msg: '获取数据失败'
                });
            } else {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });


    // 获取本地修改数据
    app.post('/businessMgmt/IPOMgmtFD/IPOMgmtFund/modifyLocalData.ajax', (req, res, next) => {
        let params = req.body;
        pool.getConnection(function (err, connection) {
            if (err) {
                console.log('/businessMgmt/IPOMgmtFD/IPOMgmtFund/modifyLocalData.ajax  链接失败', err)
                return;
            }
            console.log('params', params)

            var $sql = `SELECT * FROM ${tableName} WHERE delete_flag='F'&&service_id='${params.service_id}'&&local_id=${params.local_id};`
            connection.query($sql, function (err, data) {
                if (err) {
                    console.log(err)
                    return res.send({
                        error: 1,
                        msg: '查询失败'
                    });
                } else {
                    if (data[0].content) {
                        data[0].content = JSON.parse(data[0].content)
                    }
                    data[0].update_timestamp = formatTimeStamp(data[0].update_timestamp)
                    console.log('data', data)
                    if (data.length) {
                        connection.release()
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
        })
    });

    // 修改
    app.post('/businessMgmt/IPOMgmtFD/IPOMgmtFund/modifyModify.ajax', (req, res, next) => {
        let params = req.body;
        // params.initialData = JSON.parse(params.initialData)
        if (params.modifyData) {
            params.modifyData = JSON.parse(params.modifyData)
        }
        let user_id = req.session.loginInfo.userid;
        let service_id = params.service_id;
        let local_id = params.local_id;
        let update_timestamp = params.update_timestamp;
        console.log(params)

        let $sql = `SELECT service_id FROM ${tableName} WHERE service_id='${service_id}'&&delete_flag="F";`
        sql_query(res, $sql, [], function (err, data) { //判断是否存在
            if (err) {
                console.log('/businessMgmt/IPOMgmtFD/IPOMgmtFund/modifyModify.ajax', err)
                return res.send({
                    error: 1,
                    msg: '修改失败'
                });
            }
            if (data.length == 0) {
                if (!params.modifyData) {
                    return res.send({
                        error: 1,
                        msg: '未任何修改值',
                    });
                }
                let $sql = `insert into ${tableName} set ?;`
                let $sql_data = {
                    status: 2,
                    operate: 2,
                    content: JSON.stringify(params.modifyData),
                    operator: user_id,
                    creator: user_id,
                    service_id
                }

                sql_query(res, $sql, $sql_data, function (err, insertdata) { //修改
                    if (err) {
                        console.log('/businessMgmt/IPOMgmtFD/IPOMgmtFund/modifyModify.ajax', err)
                        return res.send({
                            error: 1,
                            msg: '修改失败'
                        });
                    } else {
                        console.log('insertdata', insertdata)
                        res.send({
                            error: 0,
                            msg: '修改成功'
                        });
                    }
                })
            } else {
                if (!params.modifyData) {
                    if (!params.modifyData) {
                        return res.send({
                            error: 1,
                            msg: '未任何修改值',
                        });
                    }
                }
                let $sql = `UPDATE ${tableName} SET ? WHERE local_id=${local_id} && update_timestamp='${update_timestamp}';`
                let $sql_data = {
                    content: JSON.stringify(params.modifyData),
                    operator: user_id,
                    operate: 2,
                    status: 2
                }
                if (!params.modifyData) {
                    $sql_data.content = null
                } else {
                    $sql_data.content = JSON.stringify(params.modifyData)
                }
                sql_query(res, $sql, $sql_data, function (err, updatedata) { //修改
                    if (err) {
                        console.log('/businessMgmt/IPOMgmtFD/IPOMgmtFund/modifyModify.ajax', err)
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
                    res.send({
                        error: 0,
                        msg: '修改成功'
                    });
                })


            }
        })




    })
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