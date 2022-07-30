const request = require('../../../local_data/requestWrapper');
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
const apiUrlList = require('../apiConfig').activeRun.qrCodeGenerate;
module.exports = function (app) {
    //上传图片和下载二维码
    // 有文件
    app.post('/marketingActive/activeRun/qrCodeGenerate/qrCodeUpload.ajax', (req, res, next) => {
        let query=req.query;
        let form = new formidable.IncomingForm();
        form.keepExtensions = true;
        form.parse(req, (err, fields, files) => {
            console.log('图片接收完毕:', files);
            let formData = {
                file: fs.createReadStream(path.resolve(files.file.path))
            };
            let option = {
                session: req.session,
                url: apiUrlList.qrCodeUpload,
                formData: formData,
                qs: query,
                timeout: 30000,
            };
            console.log('/marketingActive/activeRun/qrCodeGenerate/qrCodeUpload.ajax:', option);
            request.post(option, (error, response, body) => {
                console.log('/marketingActive/activeRun/qrCodeGenerate/qrCodeUpload.ajax error:', error);
                console.log('/marketingActive/activeRun/qrCodeGenerate/qrCodeUpload.ajax statusCode:', response && response.statusCode);
                console.log('/marketingActive/activeRun/qrCodeGenerate/qrCodeUpload.ajax body:', body);
                if (error) {
                    return res.send({
                        error: 1,
                        msg: '生成失败'
                    });
                }
                let result = typeof body === 'string' ? JSON.parse(body) : body;
                if (result && result.returnCode == 0) {
                    res.send({
                        error: 0,
                        msg: '生成成功',
                        data: result.body
                    });
                } else if (result && result.responseCode != 9999) {
                    res.send({
                        error: 1,
                        msg: result.returnMsg
                    });
                } else {
                    res.send({
                        error: 1,
                        msg: '生成失败'
                    });
                }
            });
        });
    });
    // 无文件
    app.post('/marketingActive/activeRun/qrCodeGenerate/qrCodeUploadUrl.ajax', (req, res, next) => {
        let option = {
            session: req.session,
            url: apiUrlList.qrCodeUpload,
            qs: req.query,
            timeout: 30000,
        };
        console.log('/marketingActive/activeRun/qrCodeGenerate/qrCodeUploadUrl.ajax:', option);
        request.post(option, (error, response, body) => {
            console.log('/marketingActive/activeRun/qrCodeGenerate/qrCodeUploadUrl.ajax error:', error);
            console.log('/marketingActive/activeRun/qrCodeGenerate/qrCodeUploadUrl.ajax statusCode:', response && response.statusCode);
            console.log('/marketingActive/activeRun/qrCodeGenerate/qrCodeUploadUrl.ajax body:', body);
            if (error) {
                return res.send({
                    error: 1,
                    msg: '生成失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: '生成成功',
                    data: result.body
                });
            } else if (result && result.responseCode != 9999) {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                res.send({
                    error: 1,
                    msg: '生成失败'
                });
            }
        });
    });
};