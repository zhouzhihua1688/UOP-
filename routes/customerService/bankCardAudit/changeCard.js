const request = require('./../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').bankCardAudit.changeCard;
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
module.exports = function (app) {

    // 获取  初始数据和查询
    app.post('/customerService/bankCardAudit/changeCard/getList.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            session: req.session,
            req,
            url: apiUrl.getList,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/customerService/bankCardAudit/changeCard/getList.ajax option:', {
            ...option,
            req: '#'
        });
        request(option, (error, response, body) => {
            console.log('/customerService/bankCardAudit/changeCard/getList.ajax error:', error);
            console.log('/customerService/bankCardAudit/changeCard/getList.ajax statusCode:', response && response.statusCode);
            console.log('/customerService/bankCardAudit/changeCard/getList.ajax body:', {
                ...body,
                ['body']: '*****'
            });
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
    // 获取  提交
    app.post('/customerService/bankCardAudit/changeCard/submitModify.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            session: req.session,
            url: apiUrl.submitModify,
            req,
            headers: {
                operator: req.session.loginInfo.userid
            },
            body: params,
            timeout: 15000,
            json: true
        };
        console.log('/customerService/bankCardAudit/changeCard/submitModify.ajax option:', {
            ...option,
            req: '#'
        });
        request.post(option, (error, response, body) => {
            console.log('/customerService/bankCardAudit/changeCard/submitModify.ajax error:', error);
            console.log('/customerService/bankCardAudit/changeCard/submitModify.ajax statusCode:', response && response.statusCode);
            console.log('/customerService/bankCardAudit/changeCard/submitModify.ajax body:', body);
            if (error) {
                return res.send({
                    error: 1,
                    msg: '提交失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {
                res.send({
                    error: 0,
                    msg: '提交成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '提交失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });



    //文件上传
    app.post('/customerService/bankCardAudit/changeCard/upLoad.ajax', (req, res, next) => {
        let form = new formidable.IncomingForm();
        //保留原始文件的扩展名
        form.keepExtensions = true;
        form.parse(req, (err, fields, files) => {
            let formData;
            console.log('参数表管理页面表单接收完毕:', fields);
            console.log('参数表管理页面表单文件接收完毕:', files);
            //为上传的文件重命名：其中files.file.path可以获取文件的上传路径
            try {
                fs.renameSync(files.file.path, form.uploadDir + "/" + files.file.name) //文件改名
                files.file.path = form.uploadDir + "/" + files.file.name //文件改名
            } catch (error) {
                console.log('/customerService/bankCardAudit/changeCard/upLoad.ajax option:', '文件改名失败')
                return res.send({
                    error: 1,
                    msg: '上传失败',
                    data: '上传失败'
                });
            }
            try {
                formData = {
                    filedata: fs.createReadStream(path.resolve(files.file.path))
                };
            } catch (error) {
                return res.send({
                    error: 1,
                    msg: '上传失败',
                    data: '上传失败'
                });
            }
            let option = {
                url: apiUrl.upload,
                req,
                session: req.session,
                timeout: 30000,
                formData: formData
            };
            console.log('/customerService/bankCardAudit/changeCard/upLoad.ajax option:', {
                ...option,
                req: '#'
            });
            request.post(option, (error, response, body) => {
                console.log('/customerService/bankCardAudit/changeCard/upLoad.ajax error:', error);
                console.log('/customerService/bankCardAudit/changeCard/upLoad.ajax statusCode:', response && response.statusCode);
                console.log('/customerService/bankCardAudit/changeCard/upLoad.ajax body:', body);
                // res.setHeader("Content-Type", "text/plain;charset=utf-8");
                if (error) {
                    return res.send({
                        error: 1,
                        msg: '上传失败'
                    });
                }
                let result = typeof body === 'string' ? JSON.parse(body) : body;

                if (result && result.returnCode == '0') {
                    res.send({
                        error: 0,
                        msg: '上传成功',
                        data: result.body
                    });
                } else if (result && result.returnCode == 9999) {
                    res.send({
                        error: 1,
                        msg: '上传失败'
                    });
                } else {
                    res.send({
                        error: 1,
                        msg: result.returnMsg
                    });
                }
            });
        });
    });
};