const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').salary.productConfig;
module.exports = function (app) {
    //查询
    app.post('/publicConfig/salary/productConfig/tableData.ajax', (req, res, next) => {
        let params = req.body;
        Promise.all([
            new Promise((resolve, reject) => {
                let option = {
                    pageUrl: '/publicConfig/salary/productConfig/tableData.ajax   tableData1',
                    req: req,
                    url: apiUrlList.tableData1,
                    timeout: 15000,
                    json: true
                };
                request(option, (error, response, body) => {
                    if (error) {
                        return reject({
                            error: 1,
                            msg: '数据查询失败'
                        });
                    }
                    let result = typeof body === 'string' ? JSON.parse(body) : body;
                    if (result && result.returnCode == 0) {
                        resolve(result.body);
                    } else if (result && result.returnCode == 9999) {
                        reject({
                            error: 1,
                            msg: '查询失败'
                        });
                    } else {
                        reject({
                            error: 1,
                            msg: result.returnMsg
                        });
                    }
                });
            }),
            new Promise((resolve, reject) => {
                let option = {
                    pageUrl: '/publicConfig/salary/productConfig/tableData.ajax   tableData2',
                    req: req,
                    qs: params,
                    url: apiUrlList.tableData2,
                    timeout: 15000,
                    json: true
                };
                request(option, (error, response, body) => {
                    if (error) {
                        return reject({
                            error: 1,
                            msg: '数据查询失败'
                        });
                    }
                    let result = typeof body === 'string' ? JSON.parse(body) : body;
                    if (result && result.returnCode == 0) {
                        resolve(result.body);
                    } else if (result && result.returnCode == 9999) {
                        reject({
                            error: 1,
                            msg: '查询失败'
                        });
                    } else {
                        reject({
                            error: 1,
                            msg: result.returnMsg
                        });
                    }
                });
            })
        ]).then(succeed => {
            // console.log('/publicConfig/salary/productConfig/tableData.ajax', succeed)
            let data = succeed[1].map(item => {
                var obj = item;
                var text = succeed[0][`${item.productId}-revenue`];
                if (text) {
                    obj.yield = text.substring(0, text.indexOf(':'));
                    obj.name = text.substring(text.indexOf(':') + 1);
                }
                return obj;
            })
            // succeed
            res.send({
                error: 0,
                msg: '查询成功',
                data
            });
        }).catch(e => {
            console.log('/publicConfig/salary/productConfig/tableData.ajax', e)
            res.send(e);
        })

    });

    //通过Id查询
    app.post('/publicConfig/salary/productConfig/queryTableData.ajax', (req, res, next) => {
        let params = req.body;
        Promise.all([
            new Promise((resolve, reject) => {
                let option = {
                    pageUrl: '/publicConfig/salary/productConfig/queryTableData.ajax   queryTableData1',
                    req: req,
                    url: apiUrlList.tableData1,
                    timeout: 15000,
                    json: true
                };
                request(option, (error, response, body) => {
                    if (error) {
                        return reject({
                            error: 1,
                            msg: '数据查询失败'
                        });
                    }
                    let result = typeof body === 'string' ? JSON.parse(body) : body;
                    if (result && result.returnCode == 0) {
                        resolve(result.body);
                    } else if (result && result.returnCode == 9999) {
                        reject({
                            error: 1,
                            msg: '查询失败'
                        });
                    } else {
                        reject({
                            error: 1,
                            msg: result.returnMsg
                        });
                    }
                });
            }),
            new Promise((resolve, reject) => {
                let option = {
                    pageUrl: '/publicConfig/salary/productConfig/queryTableData.ajax   queryTableData2',
                    req: req,
                    qs: params,
                    url: apiUrlList.queryTableData,
                    timeout: 15000,
                    json: true
                };
                request(option, (error, response, body) => {
                    if (error) {
                        return reject({
                            error: 1,
                            msg: '数据查询失败'
                        });
                    }
                    let result = typeof body === 'string' ? JSON.parse(body) : body;
                    if (result && result.returnCode == 0) {
                        resolve(result.body);
                    } else if (result && result.returnCode == 9999) {
                        reject({
                            error: 1,
                            msg: '查询失败'
                        });
                    } else {
                        reject({
                            error: 1,
                            msg: result.returnMsg
                        });
                    }
                });
            })
        ]).then(succeed => {
            // console.log('/publicConfig/salary/productConfig/tableData.ajax', succeed)
            let data = succeed[1].map(item => {
                var obj = item;
                var text = succeed[0][`${item.productId}-revenue`];
                if (text) {
                    obj.yield = text.substring(0, text.indexOf(':'));
                    obj.name = text.substring(text.indexOf(':') + 1);
                }
                return obj;
            })
            // succeed
            res.send({
                error: 0,
                msg: '查询成功',
                data
            });
        }).catch(e => {
            console.log('/publicConfig/salary/productConfig/tableData.ajax', e)
            res.send(e);
        })

    });

    // 添加
    app.post('/publicConfig/salary/productConfig/add.ajax', (req, res, next) => {
        let params = req.body;
        Promise.all([
            new Promise((resolve, reject) => {
                let option = {
                    pageUrl: '/publicConfig/salary/productConfig/add.ajax   add1',
                    req: req,
                    operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
                    url: apiUrlList.add1,
                    body: {
                        key: params.key,
                        value: params.value
                    },
                    timeout: 15000,
                    json: true
                };
                request.post(option, (error, response, body) => {
                    if (error) {
                        return reject({
                            error: 1,
                            msg: '数据新增失败'
                        });
                    }
                    let result = typeof body === 'string' ? JSON.parse(body) : body;
                    if (result && result.returnCode == 0) {
                        resolve(result.body);
                    } else if (result && result.returnCode == 9999) {
                        if (result.returnMsg.includes('已有此key')) {
                            let updateOption = {
                                ...option,
                                pageUrl: '/publicConfig/salary/productConfig/update.ajax',
                                operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
                                url: apiUrlList.update1
                            };
                            request.put(updateOption, (error, response, body) => {
                                if (error) {
                                    return reject({
                                        error: 1,
                                        msg: '数据新增失败'
                                    });
                                }
                                let result = typeof body === 'string' ? JSON.parse(body) : body;
                                if (result && result.returnCode == 0) {
                                    resolve(result.body);
                                } else if (result && result.returnCode == 9999) {
                                    reject({
                                        error: 1,
                                        msg: '新增失败'
                                    });
                                } else {
                                    reject({
                                        error: 1,
                                        msg: result.returnMsg
                                    });
                                }
                            });
                        } else {
                            reject({
                                error: 1,
                                msg: '新增失败'
                            });
                        }
                    } else {
                        reject({
                            error: 1,
                            msg: result.returnMsg
                        });
                    }
                });
            }),
            new Promise((resolve, reject) => {
                let option = {
                    pageUrl: '/publicConfig/salary/productConfig/add.ajax   add2',
                    req: req,
                    operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
                    body: {
                        agreementType: params.agreementType,
                        seqNo: params.seqNo,
                        productId: params.productId
                    },
                    url: apiUrlList.add2,
                    timeout: 15000,
                    json: true
                };
                request.post(option, (error, response, body) => {
                    if (error) {
                        return reject({
                            error: 1,
                            msg: '数据新增失败'
                        });
                    }
                    let result = typeof body === 'string' ? JSON.parse(body) : body;
                    if (result && result.returnCode == 0) {
                        resolve(result.body);
                    } else if (result && result.returnCode == 9999) {
                        reject({
                            error: 1,
                            msg: '新增失败'
                        });
                    } else {
                        reject({
                            error: 1,
                            msg: result.returnMsg
                        });
                    }
                });
            })
        ]).then(succeed => {
            // console.log('/publicConfig/salary/productConfig/add.ajax', succeed)
            res.send({
                error: 0,
                msg: '新增成功'
            });
        }).catch(e => {
            console.log('/publicConfig/salary/productConfig/add.ajax', e)
            res.send(e);
        })
    });
    // 修改
    app.post('/publicConfig/salary/productConfig/update.ajax', (req, res, next) => {
        let params = req.body;
        Promise.all([
            new Promise((resolve, reject) => {
                let option = {
                    pageUrl: '/publicConfig/salary/productConfig/update.ajax   update1',
                    req: req,
                    operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
                    url: apiUrlList.update1,
                    body: {
                        key: params.key,
                        value: params.value
                    },
                    timeout: 15000,
                    json: true
                };
                request.put(option, (error, response, body) => {
                    if (error) {
                        return reject({
                            error: 1,
                            msg: '数据修改失败'
                        });
                    }
                    let result = typeof body === 'string' ? JSON.parse(body) : body;
                    if (result && result.returnCode == 0) {
                        resolve(result.body);
                    } else if (result && result.returnCode == 9999) {
                        reject({
                            error: 1,
                            msg: '修改失败'
                        });
                    } else {
                        reject({
                            error: 1,
                            msg: result.returnMsg
                        });
                    }
                });
            }),
            new Promise((resolve, reject) => {
                let option = {
                    pageUrl: '/publicConfig/salary/productConfig/update.ajax   update2',
                    req: req,
                    operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
                    qs: {
                        id: params.id,
                        seqNo: params.seqNo
                    },
                    url: apiUrlList.update2,
                    timeout: 15000,
                    json: true
                };
                request.post(option, (error, response, body) => {
                    if (error) {
                        return reject({
                            error: 1,
                            msg: '数据修改失败'
                        });
                    }
                    let result = typeof body === 'string' ? JSON.parse(body) : body;
                    if (result && result.returnCode == 0) {
                        resolve(result.body);
                    } else if (result && result.returnCode == 9999) {
                        reject({
                            error: 1,
                            msg: '修改失败'
                        });
                    } else {
                        reject({
                            error: 1,
                            msg: result.returnMsg
                        });
                    }
                });
            })
        ]).then(succeed => {
            // console.log('/publicConfig/salary/productConfig/update.ajax', succeed)
            res.send({
                error: 0,
                msg: '修改成功'
            });
        }).catch(e => {
            console.log('/publicConfig/salary/productConfig/update.ajax', e)
            res.send(e);
        })
    });

    //删除
    app.post('/publicConfig/salary/productConfig/del.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/publicConfig/salary/productConfig/del.ajax',
            req: req,
            operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.del,
            qs: params,
            timeout: 15000,
            json: true
        };
        request.put(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '数据删除失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: '删除成功'
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '删除失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
    //查询所有组合、基金
    app.post('/publicConfig/salary/productConfig/productList.ajax', (req, res, next) => {


        Promise.all([new Promise((resolve, reject) => {
                let option = {
                    pageUrl: '/publicConfig/salary/productConfig/productList.ajax',
                    req: req,
                    // operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
                    url: apiUrlList.productList,
                    qs: {
                        fundTypeCustomized: 'all'
                    },
                    timeout: 15000,
                    json: true
                };
                request(option, (error, response, body) => {
                    if (error) {
                        return reject({
                            error: 1,
                            msg: '基金信息查询失败'
                        });
                    }
                    let result = typeof body === 'string' ? JSON.parse(body) : body;
                    if (result && result.returnCode == 0) {

                        resolve(result.body);
                    } else if (result && result.returnCode == 9999) {
                        reject({
                            error: 1,
                            msg: '查询失败'
                        });
                    } else {
                        reject({
                            error: 1,
                            msg: result.returnMsg
                        });
                    }
                });
            }),
            new Promise((resolve, reject) => {
                let option = {
                    pageUrl: '/publicConfig/salary/productConfig/productList.ajax',
                    req: req,
                    // operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
                    url: apiUrlList.groupList,
                    qs: {
                        groupId: 'ALL',
                    },
                    timeout: 15000,
                    json: true
                };
                request(option, (error, response, body) => {
                    if (error) {
                        return reject({
                            error: 1,
                            msg: '组合信息查询失败'
                        });
                    }
                    let result = typeof body === 'string' ? JSON.parse(body) : body;
                    if (result && result.returnCode == 0) {
                        resolve(result.body.map(item => {
                            return {
                                fundId: item.groupId,
                                fundName: item.groupName,
                            };
                        }));
                    } else if (result && result.returnCode == 9999) {
                        reject({
                            error: 1,
                            msg: '查询失败'
                        });
                    } else {
                        reject({
                            error: 1,
                            msg: result.returnMsg
                        });
                    }
                });
            })
        ]).then(succeed => {
            res.send({
                error: 0,
                msg: '组合、基金信息查询成功',
                data: succeed[0].concat(succeed[1])
            });
        }).catch(e => {
            res.send(e);
        })

    });
};