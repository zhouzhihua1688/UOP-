const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').pauseTradeMgmt.pauseTradeStatus;
module.exports = function (app) {
    // 获取初始数据和查询
    app.post('/businessMgmt/pauseTradeMgmt/pauseTradeStatus/getTableData.ajax', (req, res, next) => {
        let params = {};
        var fundId = req.body.fundId;
        params.datetime = req.body.datetime;
        params.acceptMode = req.body.acceptMode;
        if(req.body.acceptMode.includes(',')){
            let acceptModeList = JSON.parse(req.body.acceptMode);
            let getData = function (acceptMode) {
                return new Promise((resolve, reject) => {
                    let option = {
                        pageUrl: '/businessMgmt/pauseTradeMgmt/pauseTradeStatus/getTableData.ajax',
                        req,
                        url: apiUrlList.getTableData+'/'+fundId+'/info/state/specific',
                        qs: {
                            datetime: req.body.datetime,
                            acceptMode: acceptMode
                        },
                        timeout: 15000,
                        json: true
                    };
                    request(option, (error, response, body) => {
                        if (error) {
                            return reject();
                        }
                        let result = typeof body === 'string' ? JSON.parse(body) : body;
                        console.log(result, '---result----');
                        if (result && result.returnCode == '0') {
                            result.body.acceptMode = acceptMode;
                            return resolve(result.body);
                        } else if (result && result.returnCode != 9999) {
                            return reject();
                        } else {
                            return reject();
                        }
                    });
                });
            }
            Promise.all(acceptModeList.map(acceptMode => getData(acceptMode))).then(result => {
                return res.send({
                    error: 0,
                    msg: '查询成功',
                    data: result
                });
            }).catch(error => {
                return res.send({
                    error: 1,
                    msg: '查询失败'
                });
            });
        }
        else {
            let option = {
                pageUrl: '/businessMgmt/pauseTradeMgmt/pauseTradeStatus/getTableData.ajax',
                req,
                url: apiUrlList.getTableData+'/'+fundId+'/info/state/specific',
                qs: params,
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
                console.log(result, '---result----');
                if (result && result.returnCode == '0') {
                    result.body.acceptMode = params.acceptMode;
                    return res.send({
                        error: 0,
                        msg: '查询成功',
                        data: [result.body]
                    });
                } else if (result && result.returnCode != 9999) {
                    return res.send({
                        error: 1,
                        msg: result.returnMsg
                    });
                } else {
                    return res.send({
                        error: 1,
                        msg: '查询失败'
                    });
                }
            });
        }
    });
    // 获取  基金名称查询数据
    app.post('/businessMgmt/pauseTradeMgmt/pauseTradeStatus/collection.ajax', (req, res, next) => {
        let userId = req.session.loginInfo.userid;
        let params = req.body;
        let option = {
            pageUrl: '/businessMgmt/pauseTradeMgmt/pauseTradeStatus/collection.ajax',
            req,
            url: apiUrlList.collection,
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
};