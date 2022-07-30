const request = require('./../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').activeRun.activeSetting;
const formidable = require('formidable');
const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');
module.exports = function (app) {

    // 获取  初始数据和查询
    app.post('/marketingActive/activeRun/activeSetting/getList.ajax', (req, res, next) => {
        let params = req.body,
            userName = req.session.loginInfo.username;
        let option = {
            pageUrl: '/marketingActive/activeRun/activeSetting/getList.ajax',
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
                    if (element.actStatus == 0) {
                        element.viewactStatus = '活动未开始'
                    } else if (element.actStatus == 1) {
                        element.viewactStatus = '活动进行中'
                    } else if (element.actStatus == 2) {
                        element.viewactStatus = '参与过期'
                    } else if (element.actStatus == 9) {
                        element.viewactStatus = '过期'
                    }
                    if (element.displayMode == 0) {
                        element.viewdisplayMode = '不展'
                    } else if (element.displayMode == 1) {
                        element.viewdisplayMode = '展示'
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
    // 新增
    app.post('/marketingActive/activeRun/activeSetting/dataAdd.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/marketingActive/activeRun/activeSetting/dataAdd.ajax',
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
    app.post('/marketingActive/activeRun/activeSetting/dataChange.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/marketingActive/activeRun/activeSetting/dataChange.ajax',
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
    app.post('/marketingActive/activeRun/activeSetting/dataDelete.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/marketingActive/activeRun/activeSetting/dataDelete.ajax',
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
    // 发布活动
    app.post('/marketingActive/activeRun/activeSetting/sendAct.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/marketingActive/activeRun/activeSetting/sendAct.ajax',
            req,
            url: apiUrl.sendAct,
            qs: params,
            timeout: 30000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '发布失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {
                res.send({
                    error: 0,
                    msg: '发布成功',
                    data: result.body
                });
            } else {
                res.send({
                    error: 1,
                    msg: '发布失败'
                });
            }
        });
    });
    // 查询单个数据
    app.post('/marketingActive/activeRun/activeSetting/dataQuery.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/marketingActive/activeRun/activeSetting/dataQuery.ajax',
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
    // 查询所有活动数据id
    app.post('/marketingActive/activeRun/activeSetting/activeAll.ajax', (req, res, next) => {
        // let params = req.body;
        let option = {
            pageUrl: '/marketingActive/activeRun/activeSetting/activeAll.ajax',
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
    // 刷新活动
    app.post('/marketingActive/activeRun/activeSetting/refreshAct.ajax', (req, res, next) => {
        // let params = req.body;
        let option = {
            pageUrl: '/marketingActive/activeRun/activeSetting/refreshAct.ajax',
            req,
            url: apiUrl.refreshAct,
            // qs: params,
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
            if (result && result.returnCode == '0') {
                res.send({
                    error: 0,
                    msg: '刷新成功',
                    data: result.body
                });
            } else {
                res.send({
                    error: 1,
                    msg: '刷新失败'
                });
            }
        });
    });
    // 刷新缓存
    app.post('/marketingActive/activeRun/activeSetting/refreshStorage.ajax', (req, res, next) => {
        // let params = req.body;
        let option = {
            pageUrl: '/marketingActive/activeRun/activeSetting/refreshStorage.ajax',
            req,
            url: apiUrl.refreshStorage,
            // qs: params,
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
            if (result && result.returnCode == '0') {
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
    //文件上传
    app.post('/marketingActive/activeRun/activeSetting/upLoad.ajax', (req, res, next) => {
        let form = new formidable.IncomingForm();
        form.keepExtensions = true; //保留文件后缀名
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
                url: apiUrl.upload,
                pageUrl: '/marketingActive/activeRun/activeSetting/upLoad.ajax',
                req,
                timeout: 30000,
                formData: formData
            };
            request.post(option, (error, response, body) => {
                // res.setHeader("Content-Type", "text/plain;charset=utf-8");
                if (error) {
                    return res.send({
                        error: 1,
                        msg: '上传失败',
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
    // 导出
    app.get('/marketingActive/activeRun/activeSetting/exportExcel.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/marketingActive/activeRun/activeSetting/exportExcel.ajax',
            req,
            url: apiUrl.dataList,
            qs: {
                pageNo: 1,
                pageSize: 99999999
            },
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
            if (result && result.returnCode == '0' && result.body && Array.isArray(result.body.rows)) {
                let ExcelData = [
                    ['活动ID', '活动名称', '活动中心展示名称', '状态', '投放渠道', '是否展示']
                ];
                result.body.rows.forEach(element => {
                    if (element.actStatus == 0) {
                        element.viewactStatus = '活动未开始'
                    } else if (element.actStatus == 1) {
                        element.viewactStatus = '活动进行中'
                    } else if (element.actStatus == 2) {
                        element.viewactStatus = '参与过期'
                    } else if (element.actStatus == 9) {
                        element.viewactStatus = '过期'
                    }
                    if (element.displayMode == 0) {
                        element.viewdisplayMode = '不展'
                    } else if (element.displayMode == 1) {
                        element.viewdisplayMode = '展示'
                    }
                    ExcelData.push([element.actId, element.actName, element.actDisplayName, element.viewactStatus, element.seatName, element.viewdisplayMode]);
                });
                const stream = require('stream');
                const book = XLSX.utils.book_new();
                const sheet = XLSX.utils.aoa_to_sheet(ExcelData);
                XLSX.utils.book_append_sheet(book, sheet, 'test');
                const fileContents = XLSX.write(book, {
                    type: 'buffer',
                    bookType: 'xlsx',
                    bookSST: false
                });
                let readStream = new stream.PassThrough();
                readStream.end(fileContents);
                let myDate = new Date();
                let mytime = myDate.toLocaleDateString();
                let fileName = mytime + '.xlsx';
                res.set('Content-disposition', 'attachment; filename=' + fileName);
                res.set('Content-Type', 'text/plain');
                readStream.pipe(res);
            } else {
                res.send({
                    error: 1,
                    msg: '获取数据失败'
                });
            }
        });
    });
};