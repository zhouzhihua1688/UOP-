const request = require('./../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').highFinancialMgmt.custGroupSign;
module.exports = function (app) {
    // 获取初始数据和查询
    app.post('/businessMgmt/highFinancialMgmt/custGroupSign/getTableData.ajax', (req, res, next) => {
        new Promise(function (resolve, reject) {
            let params = {};
            req.body.custGroupNo && (params.custGroupNo = req.body.custGroupNo);
            req.body.custIdno && (params.custIdno = req.body.custIdno);
            req.body.custIdtp && (params.custIdtp = req.body.custIdtp);
            req.body.fundId && (params.fundId = req.body.fundId);
            req.body.pageNum && (params.pageNum = req.body.pageNum);
            req.body.pageSize && (params.pageSize = req.body.pageSize);
            let option = {
                req,
                url: apiUrlList.getTableData,
                body: params,
                timeout: 15000,
                json: true
            };
            console.log('/businessMgmt/highFinancialMgmt/custGroupSign/getTableData.ajax option:', {
                ...option,
                req: '#'
            });
            request.post(option, (error, response, body) => {
                console.log('/businessMgmt/highFinancialMgmt/custGroupSign/getTableData.ajax error:', error);
                console.log('/businessMgmt/highFinancialMgmt/custGroupSign/getTableData.ajax statusCode:', response && response.statusCode);
                console.log('/businessMgmt/highFinancialMgmt/custGroupSign/getTableData.ajax body:', {
                    ...body,
                    ['body']: '*****'
                });
                if (error) {
                    return res.send({
                        error: 1,
                        msg: '查询失败'
                    });
                }
                let result = typeof body === 'string' ? JSON.parse(body) : body;
                if (result.returnCode == 0 && Array.isArray(result.body.results)) {
                    let resultData = {};
                    // resultData.pageNo = result.body.pageNo; //页数

                    resultData.pageNo = result.body.pageNo; //页数
                    resultData.totalSize = Math.ceil(result.body.totalRecord / req.body.pageSize); //总页数d;//总页数
                    resultData.tableData = result.body.results;
                    // return res.send({error: 0, msg: '查询成功', data: resultData});
                    resolve(resultData)
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
        }).then(function (resultData) {
            return new Promise((resolve, reject) => {
                let option = {
                    pageUrl: '/businessMgmt/highFinancialMgmt/custGroupSign/custIdClass.ajax',
                    req,
                    url: apiUrlList.custIdClass,
                    timeout: 15000,
                    json: true
                };
                request.del(option, (error, response, body) => {
                    if (error) {
                        return res.send({
                            error: 1,
                            msg: '操作失败'
                        });
                    }
                    let result = typeof body === 'string' ? JSON.parse(body) : body;
                    if (result.returnCode == 0) {
                        let custIds = result.body;
                        var tableData = resultData.tableData
                        tableData.forEach(item => {
                            for (let custId of custIds) {
                                if (item.custIdtp == custId.pmco) {
                                    item.custIdtp = custId.pmnm;
                                    break;
                                }
                            }
                        });
                        return res.send({
                            error: 0,
                            msg: '获取成功',
                            data: resultData
                        });
                    } else if (result && result.returnCode != 9999) {
                        return res.send({
                            error: 1,
                            msg: result.returnMsg
                        });
                    } else {
                        return res.send({
                            error: 1,
                            msg: '获取失败'
                        });
                    }
                });
            })
        })
    });
    //下拉列表数据(客群名称)
    app.post('/businessMgmt/highFinancialMgmt/custGroupSign/custList.ajax', (req, res, next) => {
        // let params = {};
        let option = {
            pageUrl: '/businessMgmt/highFinancialMgmt/custGroupSign/custList.ajax',
            req,
            url: apiUrlList.custList,
            // body: params,
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
                return res.send({
                    error: 0,
                    msg: '查询成功',
                    data: body
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
    });
    //下拉列表数据(产品名称)
    app.post('/businessMgmt/highFinancialMgmt/custGroupSign/fundList.ajax', (req, res, next) => {
        let params = {};
        req.body.pageNum && (params.pageNum = req.body.pageNum);
        req.body.pageSize && (params.pageSize = req.body.pageSize);
        let option = {
            pageUrl: '/businessMgmt/highFinancialMgmt/custGroupSign/fundList.ajax',
            req,
            url: apiUrlList.fundList,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '查询失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0 && Array.isArray(result.body.fundInfos)) {
                let fundData = {};
                fundData.pageNum = result.body.pageNum; //页数
                fundData.totalSize = Math.ceil(result.body.totalSize / req.body.pageSize); //总页数d;//总页数
                fundData.listData = result.body.fundInfos;
                return res.send({
                    error: 0,
                    msg: '查询成功',
                    data: fundData
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
    });
    //下拉列表数据(证件类型)
    app.post('/businessMgmt/highFinancialMgmt/custGroupSign/custIdClass.ajax', (req, res, next) => {
        // let params = {};
        let option = {
            pageUrl: '/businessMgmt/highFinancialMgmt/custGroupSign/custIdClass.ajax',
            req,
            url: apiUrlList.custIdClass,
            // body: params,
            timeout: 15000,
            json: true
        };
        request.del(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '查询失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                return res.send({
                    error: 0,
                    msg: '查询成功',
                    data: body
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
    });
}