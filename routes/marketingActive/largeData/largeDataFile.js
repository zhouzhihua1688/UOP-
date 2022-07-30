const request = require('./../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').largeData.largeDataFile;
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
module.exports = function (app) {

    // 获取  初始数据和查询
    app.post('/marketingActive/largeData/largeDataFile/getList.ajax', (req, res, next) => {
        let params = req.body,
            userName = req.session.loginInfo.username;
        let option = {
            pageUrl: '/marketingActive/largeData/largeDataFile/getList.ajax',
            req,
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

                result.body.rows.forEach(element => {
                    if (element.isEnable == 0) {
                        element.viewisEnable = '禁用'
                    } else if (element.isEnable == 1) {
                        element.viewisEnable = '启用'
                    }
                    if (element.readDataTo == 1) {
                        element.viewreadDataTo = '数据库'
                    } else if (element.readDataTo == 2) {
                        element.viewreadDataTo = 'redis'
                    }
                });
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
    // 获取  所有活动
    app.post('/marketingActive/largeData/largeDataFile/activeAll.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/marketingActive/largeData/largeDataFile/activeAll.ajax',
            req,
            url: apiUrl.activeAll,
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
    app.post('/marketingActive/largeData/largeDataFile/dataAdd.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/marketingActive/largeData/largeDataFile/dataAdd.ajax',
            req,
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
    app.post('/marketingActive/largeData/largeDataFile/dataChange.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/marketingActive/largeData/largeDataFile/dataChange.ajax',
            req,
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
    app.post('/marketingActive/largeData/largeDataFile/dataDelete.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/marketingActive/largeData/largeDataFile/dataDelete.ajax',
            req,
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
    // 是否启用
    app.post('/marketingActive/largeData/largeDataFile/dataStart.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/marketingActive/largeData/largeDataFile/dataStart.ajax',
            req,
            url: apiUrl.dataStart,
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
    // 查询单条数据
    app.post('/marketingActive/largeData/largeDataFile/dataQueryId.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/marketingActive/largeData/largeDataFile/dataQueryId.ajax',
            req,
            url: apiUrl.dataQueryId,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
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

    //文件上传
    app.post('/marketingActive/largeData/largeDataFile/upLoad.ajax', (req, res, next) => {
        let form = new formidable.IncomingForm();
        form.keepExtensions = true; //保留后缀名

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
            console.log(form.uploadDir)
            let option = {
                url: apiUrl.upload,
                pageUrl: '/marketingActive/largeData/largeDataFile/upLoad.ajax',
                req,
                timeout: 30000,
                formData: formData
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


    // 获取  所有活动模型数据
    app.post('/marketingActive/largeData/largeDataFile/componentAll.ajax', (req, res, next) => {
        let params = req.body;
        // userName = req.session.loginInfo.username;
        let option = {
            pageUrl: '/marketingActive/largeData/largeDataFile/componentAll.ajax',
            req,
            url: apiUrl.componentAll,
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
                // result.body.userName = userName;
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