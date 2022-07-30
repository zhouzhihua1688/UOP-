const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').integralSettingMgmt.integralExchangeDH;
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

module.exports = function (app) {
    // 查询
    app.post('/awardMgmt/integralSettingMgmt/integralExchangeDH/getList.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/awardMgmt/integralSettingMgmt/integralExchangeDH/getList.ajax',
            req: req,
            url: apiUrlList.query,
            timeout: 15000,
            json: true
        };
        request.get(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '查询失败', data: null});
            }
            if (body.returnCode == 0 && Array.isArray(body.body)) {
                res.send({
                    error: 0,
                    msg: '查询成功',
                    data: body.body
                });
            }
            else if (body.returnCode != 0 && body.returnCode != 9999) {
                res.send({error: 1, msg: body.returnMsg, data: null});
            }
            else {
                res.send({error: 1, msg: '查询失败', data: null});
            }
        });
    });
    // 下载
    app.get('/awardMgmt/integralSettingMgmt/integralExchangeDH/download.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/awardMgmt/integralSettingMgmt/integralExchangeDH/download.ajax',
            req: req,
            url: apiUrlList.download,
            timeout: 15000,
            json: true
        };
        request(option).pipe(res);
    });
    // 上传
    app.post('/awardMgmt/integralSettingMgmt/integralExchangeDH/upload.ajax', (req, res, next) => {
        let form = new formidable.IncomingForm();
        form.keepExtensions = true;
        form.parse(req, (err, fields, files) => {
            if (err) {
                return res.send({error: 1, msg: '文件上传失败', data: null});
            }
            fs.renameSync(files.file.path, form.uploadDir + "/" + files.file.name) //文件改名
            files.file.path = form.uploadDir + "/" + files.file.name //文件改名
            console.log('前端上传文件:', files);
            let option = {
                pageUrl: '/awardMgmt/integralSettingMgmt/integralExchangeDH/upload.ajax',
                req: req,
                url: apiUrlList.upload,
                formData: {
                    file: fs.createReadStream(path.resolve(files.file.path))
                },
                timeout: 15000,
                json: true
            };
            request.post(option, (error, response, body) => {
                if (error) {
                    return res.send({error: 1, msg: '文件上传失败', data: null});
                }
                if (body && body.returnCode == 0) {
                    res.send({error: 0, msg: '上传成功', data: body.body});
                } else if (body.returnCode != 0 && body.returnCode != 9999) {
                    res.send({error: 1, msg: body.returnMsg, data: null});
                } else {
                    res.send({error: 1, msg: '文件上传失败', data: null});
                }
            });
        });
    });
};