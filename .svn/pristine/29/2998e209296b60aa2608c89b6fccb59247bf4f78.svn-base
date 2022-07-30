const request = require('./../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').accountQuery.custInfo;
module.exports = function (app) {
    // 获取  初始数据和查询
    app.post('/customerService/accountQuery/custInfo/getInfo.ajax', (req, res, next) => {
        let params = req.body;

        Promise.all([new Promise((resolve, reject) => {
            let option = {
                session: req.session,
                // pageUrl: '/messageCenter/scenceMgmt/upReplyRule/search.ajax',
                req,
                url: apiUrl.getInfo,
                qs: {
                    custNo: params.custNo
                },
                timeout: 15000,
                json: true
            };
            console.log('/customerService/accountQuery/custInfo/getInfo.ajax option:', {
                ...option,
                req: '#'
            });
            request(option, (error, response, body) => {
                console.log('/customerService/accountQuery/custInfo/getInfo.ajax error:', error);
                console.log('/customerService/accountQuery/custInfo/getInfo.ajax statusCode:', response && response.statusCode);
                console.log('/customerService/accountQuery/custInfo/getInfo.ajax body:', {
                    ...body,
                    ['body']: '*****'
                });
                if (error) {
                    return resolve({
                        error: 1,
                        msg: '基本信息获取失败'
                    });
                }
                let result = typeof body === 'string' ? JSON.parse(body) : body;
                if (result && result.returnCode === 0) {
                    resolve({
                        error: 0,
                        msg: '调用成功',
                        data: result.body
                    })
                } else if (result && result.returnCode == 9999) {
                    resolve({
                        error: 1,
                        msg: '基本信息获取失败'
                    });
                } else {
                    resolve({
                        error: 1,
                        msg: `基本信息${result.returnMsg}`
                    });
                }
            });
        }), new Promise((resolve, reject) => {
            let option = {
                session: req.session,
                req,
                url: apiUrl.userTiedCard,
                qs: {
                    custNo: params.custNo
                },
                timeout: 15000,
                json: true
            };
            console.log('/customerService/accountQuery/custInfo/userTiedCard.ajax option:', {
                ...option,
                req: '#'
            });
            request(option, (error, response, body) => {
                console.log('/customerService/accountQuery/custInfo/userTiedCard.ajax error:', error);
                console.log('/customerService/accountQuery/custInfo/userTiedCard.ajax statusCode:', response && response.statusCode);
                console.log('/customerService/accountQuery/custInfo/userTiedCard.ajax body:', {
                    ...body,
                    ['body']: '*****'
                });
                if (error) {
                    return resolve({
                        error: 1,
                        msg: '客户绑卡信息获取失败'
                    });
                }
                let result = typeof body === 'string' ? JSON.parse(body) : body;
                if (result && result.returnCode === 0) {
                    resolve({
                        error: 0,
                        msg: '调用成功',
                        data: {
                            tiedCard: result.body
                        }
                    })
                } else if (result && result.returnCode == 9999) {
                    resolve({
                        error: 1,
                        msg: '客户绑卡信息获取失败'
                    });
                } else {
                    resolve({
                        error: 1,
                        msg: `客户绑卡信息${result.returnMsg}`
                    });
                }
            });
        })]).then(function (data) {
            let obj = {}
            let errInfo = []
            data.forEach(item => {
                if (item.error === 0) {
                    Object.assign(obj, item.data)
                } else {
                    errInfo.push(item.msg)
                }
            })
            let status = data.every(item => {
                return item.error === 1
            })
            if (!status) {
                res.send({
                    error: 0,
                    msg: errInfo.length > 0 ? errInfo.join(',') : '查询成功',
                    data: obj
                })
            } else {
                res.send({
                    error: 1,
                    msg: errInfo.join(',')
                })
            }
        }).catch(function (err) {
            console.log('/customerService/accountQuery/custInfo/getInfo.ajax :', err)
            res.send({
                error: 1,
                msg: '调用失败'
            })
        })
    });
    //客户直销交易记录
    app.post('/customerService/accountQuery/custInfo/tradeRecords.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            session: req.session,
            req,
            url: apiUrl.userTradeRecords,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/customerService/accountQuery/custInfo/tradeRecords.ajax option:', {
            ...option,
            req: '#'
        });
        request(option, (error, response, body) => {
            console.log('/customerService/accountQuery/custInfo/tradeRecords.ajax error:', error);
            console.log('/customerService/accountQuery/custInfo/tradeRecords.ajax statusCode:', response && response.statusCode);
            console.log('/customerService/accountQuery/custInfo/tradeRecords.ajax body:',{
                ...body,
                ['body']: '*****'
            });
            if (error) {
                return res.send({
                    error: 1,
                    msg: '客户直销交易记录获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode === 0) {
                res.send({
                    error: 0,
                    msg: '调用成功',
                    data: result.body
                })
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '客户直销交易记录获取失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: `客户直销交易记录${result.returnMsg}`
                });
            }
        });
    });
    //账户限制记录
    app.post('/customerService/accountQuery/custInfo/userHistory.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            session: req.session,
            req,
            url: apiUrl.userHistory,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/customerService/accountQuery/custInfo/userHistory.ajax option:', {
            ...option,
            req: '#'
        });
        request(option, (error, response, body) => {
            console.log('/customerService/accountQuery/custInfo/userHistory.ajax error:', error);
            console.log('/customerService/accountQuery/custInfo/userHistory.ajax statusCode:', response && response.statusCode);
            console.log('/customerService/accountQuery/custInfo/userHistory.ajax body:', {
                ...body,
                ['body']: '*****'
            });
            if (error) {
                return res.send({
                    error: 1,
                    msg: '账户限制记录获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode === 0) {
                res.send({
                    error: 0,
                    msg: '调用成功',
                    data: result.body
                })
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '账户限制记录获取失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: `账户限制记录${result.returnMsg}`
                });
            }
        });
    });

    app.post('/customerService/accountQuery/custInfo/getCustNo.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            session: req.session,
            req,
            url: apiUrl.getCustNo,
            body: params,
            timeout: 15000,
            json: true
        };
        console.log('/customerService/accountQuery/custInfo/getCustNo.ajax option:', {
            ...option,
            req: '#'
        });
        request.post(option, (error, response, body) => {
            console.log('/customerService/accountQuery/custInfo/getCustNo.ajax error:', error);
            console.log('/customerService/accountQuery/custInfo/getCustNo.ajax statusCode:', response && response.statusCode);
            console.log('/customerService/accountQuery/custInfo/getCustNo.ajax body:', {
                ...body,
                ['body']: '*****'
            });
            if (error) {
                return res.send({
                    error: 1,
                    msg: '客户号查询失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode === 0) {
                res.send({
                    error: 0,
                    msg: '调用成功',
                    data: result.body
                })
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '客户号查询失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
    app.post('/customerService/accountQuery/custInfo/custNoByBank.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            session: req.session,
            req,
            url: apiUrl.custNoByBank,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/customerService/accountQuery/custInfo/custNoByBank.ajax option:', {
            ...option,
            req: '#'
        });
        request(option, (error, response, body) => {
            console.log('/customerService/accountQuery/custInfo/custNoByBank.ajax error:', error);
            console.log('/customerService/accountQuery/custInfo/custNoByBank.ajax statusCode:', response && response.statusCode);
            console.log('/customerService/accountQuery/custInfo/custNoByBank.ajax body:',{
                ...body,
                ['body']: '*****'
            });
            if (error) {
                return res.send({
                    error: 1,
                    msg: '客户号查询失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode === 0) {
                res.send({
                    error: 0,
                    msg: '调用成功',
                    data: result.body
                })
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '客户号查询失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
    app.post('/customerService/accountQuery/custInfo/unfreezeList.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            session: req.session,
            req,
            url: apiUrl.unfreezeList,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/customerService/accountQuery/custInfo/unfreezeList.ajax option:', {
            ...option,
            req: '#'
        });
        request(option, (error, response, body) => {
            console.log('/customerService/accountQuery/custInfo/unfreezeList.ajax error:', error);
            console.log('/customerService/accountQuery/custInfo/unfreezeList.ajax statusCode:', response && response.statusCode);
            console.log('/customerService/accountQuery/custInfo/unfreezeList.ajax body:', {
                ...body,
                ['body']: '*****'
            });
            if (error) {
                return res.send({
                    error: 1,
                    msg: '列表获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode === 0) {
                res.send({
                    error: 0,
                    msg: '调用成功',
                    data: result.body
                })
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '列表获取失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
    app.post('/customerService/accountQuery/custInfo/freezeList.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            session: req.session,
            req,
            url: apiUrl.freezeList,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/customerService/accountQuery/custInfo/freezeList.ajax option:', {
            ...option,
            req: '#'
        });
        request(option, (error, response, body) => {
            console.log('/customerService/accountQuery/custInfo/freezeList.ajax error:', error);
            console.log('/customerService/accountQuery/custInfo/freezeList.ajax statusCode:', response && response.statusCode);
            console.log('/customerService/accountQuery/custInfo/freezeList.ajax body:',{
                ...body,
                ['body']: '*****'
            });
            if (error) {
                return res.send({
                    error: 1,
                    msg: '列表获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode === 0) {
                res.send({
                    error: 0,
                    msg: '调用成功',
                    data: result.body
                })
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '列表获取失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
    app.post('/customerService/accountQuery/custInfo/frozenReason.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            session: req.session,
            req,
            url: apiUrl.frozenReason,
            timeout: 15000,
            json: true
        };
        console.log('/customerService/accountQuery/custInfo/frozenReason.ajax option:', {
            ...option,
            req: '#'
        });
        request(option, (error, response, body) => {
            console.log('/customerService/accountQuery/custInfo/frozenReason.ajax error:', error);
            console.log('/customerService/accountQuery/custInfo/frozenReason.ajax statusCode:', response && response.statusCode);
            console.log('/customerService/accountQuery/custInfo/frozenReason.ajax body:',{
                ...body,
                ['body']: '*****'
            });
            if (error) {
                return res.send({
                    error: 1,
                    msg: '冻结原因获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode === 0) {
                res.send({
                    error: 0,
                    msg: '调用成功',
                    data: result.body
                })
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '冻结原因获取失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
    app.post('/customerService/accountQuery/custInfo/frozen.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            session: req.session,
            req,
            url: apiUrl.frozen,
            headers: {
                operator: req.session.loginInfo.userid
            },
            body: params,
            timeout: 15000,
            json: true
        };
        console.log('/customerService/accountQuery/custInfo/frozen.ajax option:', {
            ...option,
            req: '#'
        });
        request.put(option, (error, response, body) => {
            console.log('/customerService/accountQuery/custInfo/frozen.ajax error:', error);
            console.log('/customerService/accountQuery/custInfo/frozen.ajax statusCode:', response && response.statusCode);
            console.log('/customerService/accountQuery/custInfo/frozen.ajax body:', body);
            if (error) {
                return res.send({
                    error: 1,
                    msg: '冻结失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode === 0) {
                res.send({
                    error: 0,
                    msg: '调用成功',
                    data: result.body
                })
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '冻结失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
    app.post('/customerService/accountQuery/custInfo/unfreeze.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            session: req.session,
            req,
            headers: {
                operator: req.session.loginInfo.userid
            },
            url: apiUrl.unfreeze,
            body: params,
            timeout: 15000,
            json: true
        };
        console.log('/customerService/accountQuery/custInfo/unfreeze.ajax option:', {
            ...option,
            req: '#'
        });
        request.put(option, (error, response, body) => {
            console.log('/customerService/accountQuery/custInfo/unfreeze.ajax error:', error);
            console.log('/customerService/accountQuery/custInfo/unfreeze.ajax statusCode:', response && response.statusCode);
            console.log('/customerService/accountQuery/custInfo/unfreeze.ajax body:', body);
            if (error) {
                return res.send({
                    error: 1,
                    msg: '调用失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode === 0) {
                res.send({
                    error: 0,
                    msg: '调用成功',
                    data: result.body
                })
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '调用失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });

};