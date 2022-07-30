const request = require('./../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').accountMgm.closeAcco;
module.exports = function (app) {

    //查询
    app.post('/customerService/accountMgm/closeAcco/custInfo.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/customerService/accountMgm/closeAcco/custInfo.ajax',
            req,
            // operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrl.custInfo,
            qs: {
                ...params
            },
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '客户信息查询失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                return res.send({
                    error: 0,
                    msg: '客户信息查询成功',
                    data: result.body
                });
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg,
                    data: result.body
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '客户信息查询失败',
                    data: null
                });
            }
        });
    });
    //查询
    app.post('/customerService/accountMgm/closeAcco/idtpOptins.ajax', (req, res, next) => {
        let option = {
                pageUrl: '/customerService/accountMgm/closeAcco/idtpOptins.ajax',
                req,
                url: apiUrl.idtpOptins,
                timeout: 15000,
                json: true
            },
            keys = [{
                pmst: 'ICIF',
                pmkey: 'SEATIDTP'
            }, {
                pmst: 'ICIF',
                pmkey: 'PRODIDTP'
            }, {
                pmst: 'ICIF',
                pmkey: 'IDTP'
            }];
        Promise.all(keys.map(item => {
            // console.log(item)
            return new Promise(function (resolve, reject) {
                request({
                    ...option,
                    qs: item
                }, (error, response, body) => {
                    if (error) {
                        reject();
                    }
                    let result = typeof body === 'string' ? JSON.parse(body) : body;
                    if (result && result.returnCode == 0) {
                        resolve({
                            [item.pmkey]: result.body
                        });
                    } else if (result && result.returnCode != 9999) {
                        reject();
                    } else {
                        reject();
                    }
                })
            })
        })).then(v => {
            return res.send({
                error: 0,
                msg: '参数获取成功',
                data: v.reduce((a, b) => {
                    let key = Object.keys(b)[0];
                    a[key] = b[key];
                    return a;
                }, {})
            });
        }).catch(err => {
            console.log(err)
            return res.send({
                error: 1,
                msg: '参数获取失败'
            });
        })

    });
    //个人销户
    app.post('/customerService/accountMgm/closeAcco/sole.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/customerService/accountMgm/closeAcco/sole.ajax',
            req,
            // operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrl.sole,
            qs: {
                ...params
            },
            timeout: 15000,
            json: true
        };
        request.put(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '销户失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                return res.send({
                    error: 0,
                    msg: '销户成功',
                    data: result.body
                });
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg,
                    data: result.body
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '销户失败',
                    data: null
                });
            }
        });
    });
    //企业销户
    app.post('/customerService/accountMgm/closeAcco/company.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/customerService/accountMgm/closeAcco/company.ajax',
            req,
            // operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrl.company,
            qs: {
                ...params
            },
            timeout: 15000,
            json: true
        };
        request.put(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '销户失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                return res.send({
                    error: 0,
                    msg: '销户成功',
                    data: result.body
                });
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg,
                    data: result.body
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '销户失败',
                    data: null
                });
            }
        });
    });
};