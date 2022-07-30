const request = require('../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').IPOMgmtOC.IPOSetting;
const tableName = 'bm_ipo_setting';
module.exports = function (app) {

    // 获取  select选择项数据
    app.post('/businessMgmt/IPOMgmtOC/IPOSetting/selectOption.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/businessMgmt/IPOMgmtOC/IPOSetting/selectOption.ajax',
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
    app.post('/businessMgmt/IPOMgmtOC/IPOSetting/collection.ajax', (req, res, next) => {
        let userId = req.session.loginInfo.userid;
        let params = req.body;
        let option = {
            pageUrl: '/businessMgmt/IPOMgmtOC/IPOSetting/collection.ajax',
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
    app.post('/businessMgmt/IPOMgmtOC/IPOSetting/getLineList.ajax', (req, res, next) => {
        let params = req.body;
        let userId = req.session.loginInfo.userid;
        console.log(params)
        let option = {
            pageUrl: '/businessMgmt/IPOMgmtOC/IPOSetting/getLineList.ajax',
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
    app.post('/businessMgmt/IPOMgmtOC/IPOSetting/getLocalList.ajax', (req, res, next) => {
        let params = req.body;
        let userId = req.session.loginInfo.userid;
        var $sql = `SELECT local_id,service_id,status,remark,operate,content,update_timestamp FROM ${tableName} WHERE delete_flag='F';`;
        if (params.service_id != '' || params.status != '') {
            $sql = `SELECT local_id,service_id,status,remark,operate,content,update_timestamp FROM ${tableName} WHERE delete_flag='F'${params.service_id == '' ? '' : `&&service_id='${params.service_id}'`}${params.status == '' ? '' : '&&status=' + params.status};`
        }
        sql_query(res, $sql, [], function (err, data) {
            if (err) {
                console.log('/businessMgmt/IPOMgmtOC/IPOSetting/getLocalList.ajax', err)
                return res.send({
                    error: 1,
                    msg: '查询失败'
                });
            }
            var arr = data.map(element => {
                return element.service_id
            });

            let option = {
                pageUrl: '/businessMgmt/IPOMgmtOC/IPOSetting/getLineList.ajax',
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

        })
    });


    // 删除本地数据
    app.post('/businessMgmt/IPOMgmtOC/IPOSetting/deleteFund.ajax', (req, res, next) => {
        let params = req.body;
        var $sql = `DELETE FROM ${tableName} WHERE local_id=${params.local_id} && update_timestamp='${params.update_timestamp}';`

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

function formatTimeStamp(timestamp) {
    let d = new Date(timestamp);
    let fixZero = function (num) {
        return num < 10 ? '0' + num : num;
    };
    return [d.getFullYear(), d.getMonth() + 1, d.getDate()].map(value => fixZero(value)).join('-') +
        ' ' + [d.getHours(), d.getMinutes(), d.getSeconds()].map(value => fixZero(value)).join(':');
}