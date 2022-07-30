const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').familyAffectionAccount.recommendProduct;
module.exports = function (app) {
    //查询
    app.post('/publicConfig/familyAffectionAccount/recommendProduct/tableData.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/publicConfig/familyAffectionAccount/recommendProduct/tableData.ajax',
            req: req,
            qs: params,
            url: apiUrlList.tableData,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '查询失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                result.body.forEach(element => {
                    element.recommentDesc = element.recommendDesc;
                    element.productParamMap.forEach((item, index) => {
                        if (item.paramCode == 'investPeriodStart') {
                            element.investPeriodStart = item.paramValue;
                        }
                        if (item.paramCode == 'investPeriodEnd') {
                            element.investPeriodEnd = item.paramValue;
                        }
                        if (item.paramCode == 'ageStart') {
                            element.ageStart = item.paramValue;
                        }
                        if (item.paramCode == 'ageEnd') {
                            element.ageEnd = item.paramValue;
                        }
                        if (item.paramCode == 'riskLevel') {
                            element.riskLevel = item.paramValue;
                        }
                    })

                });
                res.send({
                    error: 0,
                    msg: '查询成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '查询失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });

    //查询 场景
    app.post('/publicConfig/familyAffectionAccount/recommendProduct/queryScene.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/publicConfig/familyAffectionAccount/recommendProduct/queryScene.ajax',
            req: req,
            url: apiUrlList.queryScene,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '查询失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: '查询成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '查询失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });

    //查询 风险等级
    app.post('/publicConfig/familyAffectionAccount/recommendProduct/risk.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/publicConfig/familyAffectionAccount/recommendProduct/risk.ajax',
            qs: params,
            req: req,
            url: apiUrlList.risk,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '风险等级查询失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: '风险等级查询成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '风险等级查询失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
    // 添加
    app.post('/publicConfig/familyAffectionAccount/recommendProduct/add.ajax', (req, res, next) => {
        let params = req.body;
        for (let keys in params.paramMap) {
            if (keys !== 'riskLevel') {
                params.paramMap[keys] = Number(params.paramMap[keys])
            }
        }

        let option = {
            pageUrl: '/publicConfig/familyAffectionAccount/recommendProduct/add.ajax',
            req: req,
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.add,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '保存失败',
                    data: null
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: '保存成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '保存失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
    // 修改
    app.post('/publicConfig/familyAffectionAccount/recommendProduct/modifyData.ajax', (req, res, next) => {
        let params = req.body;
        for (let keys in params.paramMap) {
            if (keys !== 'riskLevel') {
                params.paramMap[keys] = Number(params.paramMap[keys])
            }
        }
        let option = {
            pageUrl: '/publicConfig/familyAffectionAccount/recommendProduct/modifyData.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.modifyAndDel,
            body: params,
            timeout: 15000,
            json: true
        };
        request.put(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '修改失败',
                    data: null
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: '修改成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '修改失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
    //删除
    app.post('/publicConfig/familyAffectionAccount/recommendProduct/del.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/publicConfig/familyAffectionAccount/recommendProduct/del.ajax',
            req: req,
            operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.modifyAndDel,
            body: params,
            timeout: 15000,
            json: true
        };
        request.put(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '删除失败',
                    data: null
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: '删除成功',
                    data: result.body
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
    app.post('/publicConfig/familyAffectionAccount/recommendProduct/productList.ajax', (req, res, next) => {


        Promise.all([new Promise((resolve, reject) => {
                let option = {
                    pageUrl: '/publicConfig/familyAffectionAccount/recommendProduct/productList.ajax',
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
                    pageUrl: '/publicConfig/familyAffectionAccount/recommendProduct/productList.ajax',
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