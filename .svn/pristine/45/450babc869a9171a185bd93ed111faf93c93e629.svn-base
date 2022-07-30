const request = require('../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').IPOMgmtOCReview.publishHandle;
const tableName = 'bm_ipo_publish';
module.exports = function (app) {
    // 获取基金id数据
    app.post('/businessMgmt/IPOMgmtOCReview/publishHandle/fundIdList.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/businessMgmt/IPOMgmtOCReview/publishHandle/fundIdList.ajax',
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
    app.post('/businessMgmt/IPOMgmtOCReview/publishHandle/tableData.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/businessMgmt/IPOMgmtOCReview/publishHandle/tableData.ajax',
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
    // 获取  新增待复核数据到本地
    app.post('/businessMgmt/IPOMgmtOCReview/publishHandle/addDataForLocal.ajax', (req, res, next) => {
        let params = req.body;
        let userId = req.session.loginInfo.userid;
        var $sql = `INSERT INTO ${tableName} SET ?;`;
        sql_query(res, $sql, {
            ...params,
            creator: userId,
            operator: userId,
            delete_flag: 'F'
        }, function (err, results) {
            if (err) {
                console.log('/businessMgmt/IPOMgmtOCReview/publishHandle/addDataForLocal.ajax', err)
                return res.send({
                    error: 1,
                    msg: '添加失败'
                });
            }
            res.send({
                error: 0,
                msg: '已添加到待复核数据中',
                data: results.insertId
            });

        })
    });
    // 获取  修改经办数据
    app.post('/businessMgmt/IPOMgmtOCReview/publishHandle/modifyLocalData.ajax', (req, res, next) => {
        let params = req.body;
        let userId = req.session.loginInfo.userid;
        var $sql = `UPDATE ${tableName} SET ? WHERE update_timestamp = '${params.update_timestamp}' AND local_id = '${params.local_id}';`;
        delete params.update_timestamp;
        delete params.local_id;
        sql_query(res, $sql, {
            ...params,
            operator: userId
        }, function (err, results) {
            if (err) {
                console.log('/businessMgmt/IPOMgmtOCReview/publishHandle/modifyLocalData.ajax', err)
                return res.send({
                    error: 1,
                    msg: '提交失败'
                });
            }
            if (results.affectedRows) {
                res.send({
                    error: 0,
                    msg: '已提交',
                    data: results.insertId
                });
            } else {
                res.send({
                    error: 1,
                    msg: '提交失败,请刷新页面',
                    data: null
                });
            }


        })
    });

    // 获取  本地初始数据和查询
    app.post('/businessMgmt/IPOMgmtOCReview/publishHandle/getLocalList.ajax', (req, res, next) => {
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
                console.log('/businessMgmt/IPOMgmtOCReview/publishHandle/getLocalList.ajax', err)
                return res.send({
                    error: 1,
                    msg: '查询失败'
                });
            }
            results.forEach(item => {
                item.content = JSON.parse(item.content);
            })
            res.send({
                error: 0,
                msg: '本地数据查询成功',
                data: results
            });
        })
    });
    // 获取  本地初始数据和查询
    app.post('/businessMgmt/IPOMgmtOCReview/publishHandle/getLocalFundList.ajax', (req, res, next) => {
        // let userId = req.session.loginInfo.userid;
        var $sql = `SELECT content FROM ${tableName} WHERE delete_flag = 'F';`;
        sql_query(res, $sql, [], function (err, results) {
            if (err) {
                console.log('/businessMgmt/IPOMgmtOCReview/publishHandle/getLocalFundList.ajax', err)
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


    // 删除本地数据
    app.post('/businessMgmt/IPOMgmtOCReview/publishHandle/delLocal.ajax', (req, res, next) => {
        let params = req.body;
        let userId = req.session.loginInfo.userid;
        let $sql = `UPDATE ${tableName} SET delete_flag='T',operator='${userId}' WHERE local_id=${params.local_id} AND update_timestamp='${params.update_timestamp}'`;

        sql_query(res, $sql, [], function (err, data) {
            if (err) {
                console.log(err)
                return res.send({
                    error: 1,
                    msg: '删除失败'
                });
            } else {
                if (data.affectedRows != 0) {
                    return res.send({
                        error: 0,
                        msg: '删除成功',
                        data: '删除成功'
                    });
                }
                return res.send({
                    error: 1,
                    msg: '删除失败',
                    data: null
                });
            }
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