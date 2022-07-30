const request = require('../../../local_data/requestWrapper');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const apiUrl = require('../apiConfig').experienceGold.experienceGoldMgmt;
module.exports = function (app) {

    // 获取  初始数据和查询
    app.post('/awardMgmt/experienceGold/experienceGoldMgmt/query.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/awardMgmt/experienceGold/experienceGoldMgmt/query.ajax',
            req: req,
            url: apiUrl.query,
            qs: params,
            body: params,
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
            if (result && result.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: '调用成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '获取数据失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
    // 新增
    app.post('/awardMgmt/experienceGold/experienceGoldMgmt/saveParam.ajax', (req, res, next) => {
        let params = req.body;
        params.modifyBy = req.session.loginInfo.userid;
        let option = {
            pageUrl: '/awardMgmt/experienceGold/experienceGoldMgmt/saveParam.ajax',
            req: req,
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrl.saveParam,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '新增失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: '新增成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '新增失败'
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
    app.post('/awardMgmt/experienceGold/experienceGoldMgmt/update.ajax', (req, res, next) => {
        let params = req.body;
        params.modifyBy = req.session.loginInfo.userid;
        let option = {
            pageUrl: '/awardMgmt/experienceGold/experienceGoldMgmt/update.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrl.update,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '调用失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
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

    //图片上传
    app.post('/awardMgmt/experienceGold/experienceGoldMgmt/upload.ajax', (req, res, next) => {
        let form = new formidable.IncomingForm();
        form.keepExtensions = true;
        form.parse(req, (err, fields, files) => {
            console.log('图片接收完毕:', files);
            let formData = {
                file: fs.createReadStream(path.resolve(files.file.path))
            };
            let option = {
                session: req.session,
                url: apiUrl.upload,
                timeout: 30000,
                formData: formData
            };
            console.log('/awardMgmt/experienceGold/experienceGoldMgmt/upload.ajax:', option);
            request.post(option, (error, response, body) => {
                console.log('/awardMgmt/experienceGold/experienceGoldMgmt/upload.ajax error:', error);
                console.log('/awardMgmt/experienceGold/experienceGoldMgmt/upload.ajax statusCode:', response && response.statusCode);
                console.log('/awardMgmt/experienceGold/experienceGoldMgmt/upload.ajax body:', body);
                if (error) {
                    return res.send({error: 1, msg: '上传失败'});
                }
                let result = typeof body === 'string' ? JSON.parse(body) : body;
                if (result && result.returnCode == 0) {
                    res.send({error: 0, msg: '上传成功',data:result.body});
                }
                else if (result && result.responseCode != 9999) {
                    res.send({error: 1, msg: result.returnMsg});
                }
                else {
                    res.send({error: 1, msg: '上传失败'});
                }
            });
        });
    });

    // 刷新
    app.post('/awardMgmt/experienceGold/experienceGoldMgmt/refresh.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/awardMgmt/experienceGold/experienceGoldMgmt/refresh.ajax',
            req: req,
            url: apiUrl.refresh,
            qs: params,
            body: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '刷新失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: '刷新成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '刷新失败'
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