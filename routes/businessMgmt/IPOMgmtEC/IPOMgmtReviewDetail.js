const request = require('../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').IPOMgmtEC.IPOMgmtReviewDetail;

module.exports = function (app) {

    // 获取  select选择项数据
    app.post('/businessMgmt/IPOMgmtEC/IPOMgmtReview/detailSelectOption.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/businessMgmt/IPOMgmtEC/IPOMgmtReview/detailSelectOption.ajax',
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


    // 获取  本地初始数据和查询
    app.post('/businessMgmt/IPOMgmtEC/IPOMgmtReview/detailGetData.ajax', (req, res, next) => {
        let params = req.body;
        console.log('params', params)

        Promise.all([new Promise(function (resolve, reject) {
            pool.getConnection(function (err, connection) {
                if (err) {
                    console.log('/businessMgmt/IPOMgmtEC/IPOMgmtReview/detailGetData.ajax  链接失败', err)
                    reject({
                        error: 1,
                        msg: '查询失败'
                    })
                }
                var $sql = `SELECT content FROM bm_ipo_mgmt WHERE delete_flag='F'&&service_id='${params.service_id}';`
                if (params.local_id != 'undefined') {
                    $sql = `SELECT content FROM bm_ipo_mgmt WHERE delete_flag='F'&&service_id='${params.service_id}'&&local_id=${params.local_id};`
                }
                console.log('$sql', $sql)

                connection.query($sql, function (err, data) { //新增
                    if (err) {
                        console.log(err)
                        reject({
                            error: 1,
                            msg: '查询失败'
                        })

                    } else {

                        if (data.length > 0) {
                            if (data[0].content) {
                                data[0].content = JSON.parse(data[0].content)
                            }
                            resolve(data[0])
                        } else {
                            resolve({
                                content: null
                            })

                        }
                        connection.release()
                    }
                })

            })
        }), new Promise(function (resolve, reject) {
            let option = {
                pageUrl: '/businessMgmt/IPOMgmtEC/IPOMgmtReview/detailGetData.ajax',
                req,
                url: apiUrl.getLineList,
                qs: {
                    fundIdList: params.service_id
                },
                timeout: 15000,
                json: true
            };
            request(option, (error, response, body) => {
                if (error) {
                    console.log(error)
                    reject({
                        error: 1,
                        msg: '查询失败'
                    })
                }
                let result = typeof body === 'string' ? JSON.parse(body) : body;
                if (result && result.returnCode == '0') {
                    resolve(result.body[0])
                } else if (result && result.returnCode == 9999) {
                    reject({
                        error: 1,
                        msg: '查询失败'
                    })
                } else {
                    reject({
                        error: 1,
                        msg: result.returnMsg
                    })
                }
            });

        })]).then(function (result) {
            res.send({
                error: 0,
                msg: '查询成功',
                data: result
            })
        }).catch(function (err) {
            res.send({
                error: 1,
                msg: '查询失败'
            })

        })

    });





};