const request = require('./../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').accountMgm.custDevice;
module.exports = function (app) {

    // 通过idNo,invnm,idtp三要素获取用户信息列表
    app.post('/customerService/accountMgm/custDevice/getCustInfoByIdNo.ajax', (req, res, next) => {
        try {
            new Promise(function (resolve, reject){
                let params = req.body;
                let option = {
                    url: '/customerService/accountMgm/custDevice/getCustInfoByIdNo.ajax',
                    req: req,
                    url: apiUrl.getCustInfoByIdNo,
                    qs: params,
                    timeout: 15000,
                    json: true
                };
                console.log('/customerService/accountMgm/custDevice/getCustInfoByIdNo.ajax option:', {
                    ...option,
                    req: '#'
                });
            
                request(option, (error, response, body) => {
                    console.log('/customerService/accountMgm/custDevice/getCustInfoByIdNo.ajax error:', error);
                    console.log('/customerService/accountMgm/custDevice/getCustInfoByIdNo.ajax statusCode:', response && response.statusCode);
                    console.log('/customerService/accountMgm/custDevice/getCustInfoByIdNo.ajax body:', body);
                    if (error) {
                        return res.send({
                            error: 1,
                            msg: '通过idNo,invnm,idtp获取用户信息列表调用失败',
                            data: null
                        });
                    }
                    if (body && body.returnCode == 0 && Array.isArray(body.body)) {
                        let middleArr=body.body[0]; 
                        console.log("middleArr",middleArr)
                        resolve(middleArr);
                    } else if (body && body.returnCode == 9999) {
                        return res.send({
                            error: 1,
                            msg: body.returnMsg,
                            data: null
                        });
                    } else {
                        return res.send({
                            error: 1,
                            msg: '通过idNo,invnm,idtp获取用户信息列表调用失败',
                            data: null
                        });
                    }
                });
            }).then(function(middleArr){
                return new Promise((resolve, reject) => {
                    let params = {};
                    params.custNo = middleArr.custNo;
                    let option = {
                        session: req.session,
                        url: apiUrl.custState,
                        req,
                        qs: params,
                        timeout: 15000,
                        json: true
                    };
                    console.log('/customerService/accountMgm/custDevice/custState.ajax option:', {
                        ...option,
                        req: '#'
                    });
                    request(option, (error, response, body) => {
                        console.log('/customerService/accountMgm/custDevice/custState.ajax error:', error);
                        console.log('/customerService/accountMgm/custDevice/custState.ajax statusCode:', response && response.statusCode);
                        console.log('/customerService/accountMgm/custDevice/custState.ajax body:', body);
                        if (error) {
                            return res.send({
                                error: 1,
                                msg: '接口调用失败'
                            });
                        }
                        let result = typeof body === 'string' ? JSON.parse(body) : body;
                        if (result && result.returnCode == '0') {
                            console.log("result.body", result.body)
                            middleArr.status = result.body;                            
                            res.send({
                                error: 0,
                                msg: '调用成功',
                                data: middleArr
                            });
                        } else if (result && result.returnCode == 9999) {
                            res.send({
                                error: 1,
                                msg: '接口调用失败'
                            });
                        } else {
                            res.send({
                                error: 1,
                                msg: result.returnMsg
                            });
                        }
                    });
            })
        }).catch(function (error) {
            return res.send({
                error: 1,
                msg: '查询失败'
            });
        })
        } catch (error) {
            console.log('========================', error);
        }
    });
    //常用设备关闭
    app.post('/customerService/accountMgm/custDevice/custClose.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            session: req.session,
            url: apiUrl.custClose,
            req,
            body: params,
            timeout: 15000,
            json: true
        };
        console.log('/customerService/accountMgm/custDevice/custClose.ajax option:', {
            ...option,
            req: '#',
            body: option.body
        });
        request.put(option, (error, response, body) => {
            console.log('/customerService/accountMgm/custDevice/custClose.ajax error:', error);
            console.log('/customerService/accountMgm/custDevice/custClose.ajax statusCode:', response && response.statusCode);
            console.log('/customerService/accountMgm/custDevice/custClose.ajax body:', body);
            if (error) {
                return res.send({
                    error: 1,
                    msg: '接口调用失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {
                res.send({
                    error: 0,
                    msg: '成功关闭',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '接口调用失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
    //常用设备打开
    app.post('/customerService/accountMgm/custDevice/custOpen.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            session: req.session,
            url: apiUrl.custOpen,
            req,
            body: params,
            timeout: 15000,
            json: true
        };
        console.log('/customerService/accountMgm/custDevice/custOpen.ajax option:', {
            ...option,
            req: '#',
            body: option.body
        });
        request.post(option, (error, response, body) => {
            console.log('/customerService/accountMgm/custDevice/custOpen.ajax error:', error);
            console.log('/customerService/accountMgm/custDevice/custOpen.ajax statusCode:', response && response.statusCode);
            console.log('/customerService/accountMgm/custDevice/custOpen.ajax body:', body);
            if (error) {
                return res.send({
                    error: 1,
                    msg: '接口调用失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {
                res.send({
                    error: 0,
                    msg: '成功开通',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '接口调用失败'
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