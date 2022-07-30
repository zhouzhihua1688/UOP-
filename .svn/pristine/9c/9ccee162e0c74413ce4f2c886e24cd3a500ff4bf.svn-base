const request = require('../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').activeRun.activeSettingTemplatePage;
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
module.exports = function (app) {

    // 获取  初始数据和查询
    app.post('/marketingActive/activeRun/activeSettingTemplatePage/getList.ajax', (req, res, next) => {
        let params = req.body,
            userName = req.session.loginInfo.username;
        let option = {
            pageUrl: '/marketingActive/activeRun/activeSettingTemplatePage/getList.ajax',
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
    // 跳转时  根据活动ID获取 详细信息
    app.post('/marketingActive/activeRun/activeSettingTemplatePage/activeQuery.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/marketingActive/activeRun/activeSettingTemplatePage/activeQuery.ajax',
            req,
            url: apiUrl.activeQuery,
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
    app.post('/marketingActive/activeRun/activeSettingTemplatePage/dataAdd.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/marketingActive/activeRun/activeSettingTemplatePage/dataAdd.ajax',
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
                    msg: params.id ? '修改失败' : '新增失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {
                res.send({
                    error: 0,
                    msg: params.id ? '修改成功' : '新增成功',
                    data: result.body
                });
            } else {
                res.send({
                    error: 1,
                    msg: params.id ? '修改失败' : '新增失败'
                });
            }
        });
    });
    // 修改
    app.post('/marketingActive/activeRun/activeSettingTemplatePage/dataChange.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/marketingActive/activeRun/activeSettingTemplatePage/dataChange.ajax',
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
    app.post('/marketingActive/activeRun/activeSettingTemplatePage/dataDelete.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/marketingActive/activeRun/activeSettingTemplatePage/dataDelete.ajax',
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

    //文件上传
    app.post('/marketingActive/activeRun/activeSettingTemplatePage/upLoad.ajax', (req, res, next) => {
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
                console.log('/marketingActive/activeRun/activeSettingTemplatePage/upLoad.ajax option:', '文件改名失败')
                return res.send({
                    error: 1,
                    msg: '上传失败',
                    data: '上传失败'
                });
            }
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
                url: apiUrl.upload,
                pageUrl: '/marketingActive/activeRun/activeSettingTemplatePage/upLoad.ajax',
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
    //检测文件是否存在
    app.post('/marketingActive/activeRun/activeSettingTemplatePage/checkFile.ajax', (req, res, next) => {
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
                return res.send({
                    error: 1,
                    msg: '上传失败',
                    data: '上传失败'
                });
            }
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
                pageUrl: '/marketingActive/activeRun/activeSettingTemplatePage/checkFile.ajax',
                req,
                url: apiUrl.checkFile,
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
                if (result && result.body == '0') {
                    res.send({
                        error: 0,
                        msg: '上传成功',
                        data: result.body
                    });
                } else {
                    res.send({
                        error: 1,
                        msg: '文件已存在，是否覆盖'
                    });
                }
            });
        });
    });
    // 查询单条数据
    app.post('/marketingActive/activeRun/activeSettingTemplatePage/dataQuery.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/marketingActive/activeRun/activeSettingTemplatePage/dataQuery.ajax',
            req,
            url: apiUrl.dataQuery,
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
    // 查询活动ID
    app.post('/marketingActive/activeRun/activeSettingTemplatePage/activeAll.ajax', (req, res, next) => {
        // let params = req.body;
        let option = {
            pageUrl: '/marketingActive/activeRun/activeSettingTemplatePage/activeAll.ajax',
            req,
            url: apiUrl.activeAll,
            // qs: params,
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
    // 查询分享ID
    app.post('/marketingActive/activeRun/activeSettingTemplatePage/shareNo.ajax', (req, res, next) => {
        // let params = req.body;
        let option = {
            pageUrl: '/marketingActive/activeRun/activeSettingTemplatePage/shareNo.ajax',
            req,
            url: apiUrl.shareNo,
            // qs: params,
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
    // 下载
    app.get('/marketingActive/activeRun/activeSettingTemplatePage/downloadFile.ajax', (req, res, next) => {
        var params = {};
        params.fileName = req.query.fileName;
        let option = {
            pageUrl: '/marketingActive/activeRun/activeSettingTemplatePage/downloadFile.ajax',
            req,
            url: apiUrl.downloadFile,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option).pipe(res);
    });

};