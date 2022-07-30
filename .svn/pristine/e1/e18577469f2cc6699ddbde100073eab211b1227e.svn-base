const request = require('./../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').awardSetting.awardTable;
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
module.exports = function (app) {

    // 获取  初始数据和查询
    app.post('/awardMgmt/awardSetting/awardTable/getList.ajax', (req, res, next) => {
        let params = req.body,
            userName = req.session.loginInfo.username;
        let option = {
            pageUrl: '/awardMgmt/awardSetting/awardTable/getList.ajax',
            req: req,
            url: apiUrl.dataList,
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
                result.body.userName = userName;
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
    // 新增
    app.post('/awardMgmt/awardSetting/awardTable/dataAdd.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/awardMgmt/awardSetting/awardTable/dataAdd.ajax',
            req: req,
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrl.dataAdd,
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
            if (result && result.returnCode == '0') {
                res.send({
                    error: 0,
                    msg: '新增成功',
                    data: result.body
                });
            } else {
                res.send({
                    error: 1,
                    msg: '新增失败'
                });
            }
        });
    });
    // 修改
    app.post('/awardMgmt/awardSetting/awardTable/dataChange.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/awardMgmt/awardSetting/awardTable/dataChange.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrl.dataChange,
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
            if (result && result.returnCode == '0') {
                res.send({
                    error: 0,
                    msg: '调用成功',
                    data: result.body
                });
            } else {
                res.send({
                    error: 1,
                    msg: '调用失败'
                });
            }
        });
    });
    // 删除
    app.post('/awardMgmt/awardSetting/awardTable/dataDelete.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/awardMgmt/awardSetting/awardTable/dataDelete.ajax',
            req: req,
            operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrl.dataDelete,
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
            if (result && result.returnCode == '0') {
                res.send({
                    error: 0,
                    msg: '调用成功',
                    data: result.body
                });
            } else {
                res.send({
                    error: 1,
                    msg: '调用失败'
                });
            }
        });
    });
    // 查询单个数据
    app.post('/awardMgmt/awardSetting/awardTable/dataQuery.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/awardMgmt/awardSetting/awardTable/dataQuery.ajax',
            req: req,
            url: apiUrl.dataQuery,
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
            if (result && result.returnCode == '0') {
                res.send({
                    error: 0,
                    msg: '查询成功',
                    data: result.body
                });
            } else {
                res.send({
                    error: 1,
                    msg: '查询失败'
                });
            }
        });
    });


    //文件上传
    app.post('/awardMgmt/awardSetting/awardTable/ExcelUpload.ajax', (req, res, next) => {
        let form = new formidable.IncomingForm();
        // let params = req.body;
        userName = req.session.loginInfo.username;
        form.keepExtensions = true;
        form.parse(req, (err, fields, files) => {
            let formData;
            console.log('参数表管理页面表单接收完毕:', fields);
            console.log('参数表管理页面表单文件接收完毕:', files);
            fs.renameSync(files.file.path, form.uploadDir + "/" + files.file.name) //文件改名
            files.file.path = form.uploadDir + "/" + files.file.name //文件改名
            try {
                formData = {
                    file: fs.createReadStream(path.resolve(files.file.path))
                };
            } catch (error) {
                return res.send({
                    error: 1,
                    msg: '上传失败',
                    data: '上传失败'
                });
            }
            let option = {
                pageUrl: '/awardMgmt/awardSetting/awardTable/ExcelUpload.ajax',
                req: req,
                url: apiUrl.ExcelUpload,
                timeout: 30000,
                formData: formData,
                qs: {
                    modifyBy: userName,
                    awardsPkgName: fields.awardsPkgName
                }
            };
            request.post(option, (error, response, body) => {
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
                } else {
                    res.send({
                        error: 1,
                        msg: '上传失败'
                    });
                }
            });
        });
    });
};