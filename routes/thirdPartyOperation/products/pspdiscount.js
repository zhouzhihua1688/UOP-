const fs = require('fs');
const path = require('path');
const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').products;
const formidable = require('formidable');
const qs = require("qs");
module.exports = function (app) {

    //查询渠道基本信息
    app.get('/thirdPartyOperation/products/pspdiscount/qryBranchBaseInfo.ajax', (req, res, next) => {
        let params = req.query;
        let option = {
            session: req.session,
            url: apiUrlList.pspdiscount.qryBranchBaseInfo,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/products/pspdiscount/qryBranchBaseInfo.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/thirdPartyOperation/products/pspdiscount/qryBranchBaseInfo.ajax error:', error);
            console.log('/thirdPartyOperation/products/pspdiscount/qryBranchBaseInfo.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/products/pspdiscount/qryBranchBaseInfo.ajax body:', body);
            if (error) {
                return res.send({
                    error: 1,
                    msg: '数据获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.responseCode === '0000') {
                res.send({
                    error: 0,
                    msg: '数据获取成功',
                    data: result.data
                });
            } else if (result && result.responseCode != '9999') {
                res.send({error: 1, msg: result.responseMessage});
            } else {
                res.send({
                    error: 1,
                    msg: result.responseMessage
                });
            }
        });
    });
    //查询产品基本信息
    app.get('/thirdPartyOperation/products/pspdiscount/qryFunds.ajax', (req, res, next) => {
        let params = req.query;
        let option = {
            session: req.session,
            url: apiUrlList.pspdiscount.qryFunds,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/products/pspdiscount/qryFunds.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/thirdPartyOperation/products/pspdiscount/qryFunds.ajax error:', error);
            console.log('/thirdPartyOperation/products/pspdiscount/qryFunds.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/products/pspdiscount/qryFunds.ajax body:', body);
            // return res.send(body);
            if (error) {
                return res.send({
                    error: 1,
                    msg: '数据获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.responseCode === '0000') {
                res.send({
                    error: 0,
                    msg: '数据获取成功',
                    data: result.data
                });
            } else if (result && result.responseCode != '9999') {
                res.send({error: 1, msg: result.responseMessage});
            } else {
                res.send({
                    error: 1,
                    msg: result.responseMessage
                });
            }
        });
    });
    //查询渠道信息
    app.get('/thirdPartyOperation/products/pspdiscount/qryBranchs.ajax', (req, res, next) => {
        let params = req.query;
        let option = {
            session: req.session,
            url: apiUrlList.pspdiscount.qryBranchs,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/products/pspdiscount/qryBranchs.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/thirdPartyOperation/products/pspdiscount/qryBranchs.ajax error:', error);
            console.log('/thirdPartyOperation/products/pspdiscount/qryBranchs.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/products/pspdiscount/qryBranchs.ajax body:', body);
            // return res.send(body);
            if (error) {
                return res.send({
                    error: 1,
                    msg: '数据获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.responseCode === '0000') {
                res.send({
                    error: 0,
                    msg: '数据获取成功',
                    data: result.data
                });
            } else if (result && result.responseCode != '9999') {
                res.send({error: 1, msg: result.responseMessage});
            } else {
                res.send({
                    error: 1,
                    msg: result.responseMessage
                });
            }
        });
    });
//查询
    app.get('/thirdPartyOperation/products/pspdiscount/search.ajax', (req, res, next) => {
        let params = req.query;
        let option = {
            session: req.session,
            url: apiUrlList.pspdiscount.search,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/products/pspdiscount/search.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/thirdPartyOperation/products/pspdiscount/search.ajax error:', error);
            console.log('/thirdPartyOperation/products/pspdiscount/search.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/products/pspdiscount/search.ajax body:', body);
            // return res.send(body);
            if (error) {
                return res.send({
                    error: 1,
                    msg: '数据获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.responseCode === '0000') {
                res.send({
                    error: 0,
                    msg: '数据获取成功',
                    data: result.data
                });
            } else if (result && result.responseCode != '9999') {
                res.send({error: 1, msg: result.responseMessage});
            } else {
                res.send({
                    error: 1,
                    msg: result.responseMessage
                });
            }
        });
    });
    //查询临时表数据
    app.get('/thirdPartyOperation/products/pspdiscount/searchDft.ajax', (req, res, next) => {
        let params = req.query;
        let option = {
            session: req.session,
            url: apiUrlList.pspdiscount.searchDft,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/products/pspdiscount/searchDft.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/thirdPartyOperation/products/pspdiscount/searchDft.ajax error:', error);
            console.log('/thirdPartyOperation/products/pspdiscount/searchDft.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/products/pspdiscount/searchDft.ajax body:', body);
            // return res.send(body);
            if (error) {
                return res.send({
                    error: 1,
                    msg: '数据获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.responseCode === '0000') {
                res.send({
                    error: 0,
                    msg: '数据获取成功',
                    data: result.data
                });
            } else if (result && result.responseCode != '9999') {
                res.send({error: 1, msg: result.responseMessage});
            } else {
                res.send({
                    error: 1,
                    msg: result.responseMessage
                });
            }
        });
    });
    //校验
    app.post('/thirdPartyOperation/products/pspdiscount/validateDis.ajax', (req, res, next) => {
        let params = qs.parse(req.body);
        params.cMan = req.session.loginInfo.username;
        console.log((params));
        let option = {
            session: req.session,
            url: apiUrlList.pspdiscount.validateDis,
            body: params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/products/pspdiscount/validateDis.ajax option:', option);
        request.post(option, (error, response, body) => {
            console.log('/thirdPartyOperation/products/pspdiscount/validateDis.ajax error:', error);
            console.log('/thirdPartyOperation/products/pspdiscount/validateDis.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/products/pspdiscount/validateDis.ajax body:', body);
            if (error) {
                return res.send({
                    error: 1,
                    msg: '数据获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.responseCode === '0000') {
                res.send({
                    error: 0,
                    msg: '数据获取成功',
                    data: result.data
                });
            } else if (result && result.responseCode != '9999') {
                res.send({error: 1, msg: result.responseMessage});
            } else {
                res.send({
                    error: 1,
                    msg: result.responseMessage
                });
            }
        });
    });
    //添加
    app.post('/thirdPartyOperation/products/pspdiscount/save.ajax', (req, res, next) => {
        let params = qs.parse(req.body);
        params.cMan = req.session.loginInfo.username;
        console.log((params));
        let option = {
            session: req.session,
            url: apiUrlList.pspdiscount.save,
            body: params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/products/pspdiscount/save.ajax option:', option);
        request.post(option, (error, response, body) => {
            console.log('/thirdPartyOperation/products/pspdiscount/save.ajax error:', error);
            console.log('/thirdPartyOperation/products/pspdiscount/save.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/products/pspdiscount/save.ajax body:', body);
            if (error) {
                return res.send({
                    error: 1,
                    msg: '数据获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.responseCode === '0000') {
                res.send({
                    error: 0,
                    msg: '数据获取成功',
                    data: result.data
                });
            } else if (result && result.responseCode != '9999') {
                res.send({error: 1, msg: result.responseMessage});
            } else {
                res.send({
                    error: 1,
                    msg: result.responseMessage
                });
            }
        });
    });
    //试算
    app.post('/thirdPartyOperation/products/pspdiscount/calc.ajax', (req, res, next) => {
        let params = qs.parse(req.body);
        params.cMan = req.session.loginInfo.username;
        console.log((params));
        let option = {
            session: req.session,
            url: apiUrlList.pspdiscount.calc,
            body: params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/products/pspdiscount/calc.ajax option:', option);
        request.post(option, (error, response, body) => {
            console.log('/thirdPartyOperation/products/pspdiscount/calc.ajax error:', error);
            console.log('/thirdPartyOperation/products/pspdiscount/calc.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/products/pspdiscount/calc.ajax body:', body);
            if (error) {
                return res.send({
                    error: 1,
                    msg: '数据获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.responseCode === '0000') {
                res.send({
                    error: 0,
                    msg: '数据获取成功',
                    data: result.data
                });
            } else if (result && result.responseCode != '9999') {
                res.send({error: 1, msg: result.responseMessage});
            } else {
                res.send({
                    error: 1,
                    msg: result.responseMessage
                });
            }
        });
    });
    //删除
    app.get('/thirdPartyOperation/products/pspdiscount/delete.ajax', (req, res, next) => {
        let params = req.query;
        params.operator = req.session.loginInfo.userid;
        let option = {
            session: req.session,
            url: apiUrlList.pspdiscount.delete,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/products/pspdiscount/delete.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/thirdPartyOperation/products/pspdiscount/delete.ajax error:', error);
            console.log('/thirdPartyOperation/products/pspdiscount/delete.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/products/pspdiscount/delete.ajax body:', body);
            if (error) {
                return res.send({
                    error: 1,
                    msg: '数据获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.responseCode === '0000') {
                res.send({
                    error: 0,
                    msg: '数据获取成功',
                    data: result.data
                });
            } else if (result && result.responseCode != '9999') {
                res.send({error: 1, msg: result.responseMessage});
            } else {
                res.send({
                    error: 1,
                    msg: result.responseMessage
                });
            }
        });
    });



    // 下载模板
    app.get('/thirdPartyOperation/products/pspdiscount/download.ajax', (req, res, next) => {
        var params = {};
        params.ymonth = req.query.ymonth;
        params.type = req.query.type;
        let option = {
            session:req.session,
            url:apiUrlList.pspdiscount.download,
            qs: params,
            // qs:req.body,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/products/pspdiscount/download.ajax option:', option);
        request(option).pipe(res);
    });
    //上传
    app.post('/thirdPartyOperation/products/pspdiscount/importFile.ajax', (req, res, next) => {
        let form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            console.log('折扣率页面表单接收完毕:', fields);
            console.log('折扣率页面表单文件接收完毕:', files);
            let formData = {
                operater: req.session['loginInfo'].username,
                filename: files.file.name,
                inputstream: fs.createReadStream(path.resolve(files.file.path))
            };
            let option = {
                session: req.session,
                url: apiUrlList.pspdiscount.importFile,
                timeout: 30000,
                formData: formData
            };
            console.log('/thirdPartyOperation/products/pspdiscount/importFile.ajax option:', option);
            request.post(option, (error, response, body) => {
                console.log('/thirdPartyOperation/products/pspdiscount/importFile.ajax error:', error);
                console.log('/thirdPartyOperation/products/pspdiscount/importFile.ajax statusCode:', response && response.statusCode);
                console.log('/thirdPartyOperation/products/pspdiscount/importFile.ajax body:', body);
                if (error) {
                    return res.send({
                        error: 1,
                        msg: '上传失败'
                    });
                }
                let result = typeof body === 'string' ? JSON.parse(body) : body;
                if (result && result.responseCode === '0000') {
                    res.send({
                        error: 0,
                        msg: '上传成功',
                        data: result.data
                    });
                } else if (result && result.responseCode != '9999') {
                    res.send({error: 1, msg: result.responseMessage});
                } else {
                    res.send({
                        error: 1,
                        msg: result.responseMessage
                    });
                }
            });
        });
    });
//确认导入数据 前校验
    app.get('/thirdPartyOperation/products/pspdiscount/batchValidate.ajax', (req, res, next) => {
        let params = req.query;
        let option = {
            session: req.session,
            url: apiUrlList.pspdiscount.batchValidate,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/products/pspdiscount/batchValidate.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/thirdPartyOperation/products/pspdiscount/batchValidate.ajax error:', error);
            console.log('/thirdPartyOperation/products/pspdiscount/batchValidate.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/products/pspdiscount/batchValidate.ajax body:', body);
            // return res.send(body);
            if (error) {
                return res.send({
                    error: 1,
                    msg: '数据获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.responseCode === '0000') {
                res.send({
                    error: 0,
                    msg: '数据获取成功',
                    data: result.data
                });
            } else if (result && result.responseCode === '9999') {
                res.send({
                    error: 1,
                    msg: result.responseMessage,
                    data: result.data
                });
            } else {
                res.send({
                    error: 2,
                    msg: result.responseMessage
                });
            }
        });
    });
//确认导入数据
    app.get('/thirdPartyOperation/products/pspdiscount/importDis.ajax', (req, res, next) => {
        let params = req.query;
        let option = {
            session: req.session,
            url: apiUrlList.pspdiscount.importDis,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/products/pspdiscount/importDis.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/thirdPartyOperation/products/pspdiscount/importDis.ajax error:', error);
            console.log('/thirdPartyOperation/products/pspdiscount/importDis.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/products/pspdiscount/importDis.ajax body:', body);
            // return res.send(body);
            if (error) {
                return res.send({
                    error: 1,
                    msg: '数据获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.responseCode === '0000') {
                res.send({
                    error: 0,
                    msg: '数据获取成功',
                    data: result.data
                });
            } else if (result && result.responseCode === '9999') {
                res.send({
                    error: 1,
                    msg: result.responseMessage,
                    data: result.data
                });
            } else {
                res.send({
                    error: 2,
                    msg: result.responseMessage
                });
            }
        });
    });
};