const fs = require('fs');
const path = require('path');
const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').activeRun.shareSetting;
const formidable = require('formidable');
module.exports = function (app) {
    // 获取分享渠道列表
    app.post('/marketingActive/activeRun/shareSetting/getShareChannelList.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/marketingActive/activeRun/asyncWorkSetting/getShareChannelList.ajax',
            req,
            url: apiUrlList.getShareChannelList,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '操作失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: '查询成功',
                    data: result.body
                });
            } else if (result && result.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: result.returnMsg,
                    data: null
                });
            } else {
                res.send({
                    error: 1,
                    msg: '查询失败',
                    data: null
                });
            }
        });
    });
    //查询列表
    app.post('/marketingActive/activeRun/shareSetting/getTableData.ajax', (req, res, next) => {
        let params = {};
        req.body.shareNo && (params.shareNo = req.body.shareNo);
        params.shareTitle=req.body.shareTitle;
        params.pageNo = req.body.pageNo;
        params.pageSize = req.body.pageSize;
        let option = {
            pageUrl: '/marketingActive/activeRun/asyncWorkSetting/getTableData.ajax',
            req,
            url: apiUrlList.getTable,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '操作失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0 && Array.isArray(result.body.rows)) {
                let resultData = {};
                resultData.page = result.body.pageNum;
                resultData.total = result.body.pages;
                resultData.tableData = result.body.rows;
                res.send({
                    error: 0,
                    msg: '查询成功',
                    data: resultData
                });
            } else if (result && result.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                res.send({
                    error: 1,
                    msg: '查询失败'
                });
            }
        });
    });
    //新增
    app.post('/marketingActive/activeRun/shareSetting/add.ajax', (req, res, next) => {
        let params = {};
        params.shareChannel = req.body.shareChannel;
        params.shareDesc = req.body.shareDesc;
        params.shareTitle = req.body.shareTitle;
        params.shareContent = req.body.shareContent;
        params.shareUrl = req.body.shareUrl;
        params.sharePicUrl = req.body.sharePicUrl;
        params.modifyBy = req.session.loginInfo.username;
        let option = {
            pageUrl: '/marketingActive/activeRun/asyncWorkSetting/add.ajax',
            req,
            url: apiUrlList.add,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '操作失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: '添加成功'
                });
            } else if (result && result.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                res.send({
                    error: 1,
                    msg: '添加失败'
                });
            }
        });
    });
    //修改
    app.post('/marketingActive/activeRun/shareSetting/update.ajax', (req, res, next) => {
        let params = {};
        params.id = req.body.id;
        params.shareChannel = req.body.shareChannel;
        params.shareDesc = req.body.shareDesc;
        params.shareTitle = req.body.shareTitle;
        params.shareContent = req.body.shareContent;
        params.shareUrl = req.body.shareUrl;
        params.sharePicUrl = req.body.sharePicUrl;
        params.modifyBy = req.session.loginInfo.username;
        let option = {
            pageUrl: '/marketingActive/activeRun/asyncWorkSetting/update.ajax',
            req,
            url: apiUrlList.update,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '操作失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: '修改成功'
                });
            } else if (result && result.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                res.send({
                    error: 1,
                    msg: '修改失败'
                });
            }
        });
    });
    //删除
    app.post('/marketingActive/activeRun/shareSetting/delete.ajax', (req, res, next) => {
        let params = {};
        params.id = req.body.id;
        params.modifyBy = req.session.loginInfo.username;
        let option = {
            pageUrl: '/marketingActive/activeRun/asyncWorkSetting/delete.ajax',
            req,
            url: apiUrlList.del,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '操作失败'
                });
            }
            let result = typeof body == 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode === 0) {
                res.send({
                    error: 0,
                    msg: '删除成功'
                });
            } else if (result && result.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                res.send({
                    error: 1,
                    msg: '删除失败'
                });
            }
        });
    });
    //上传图片
    app.post('/marketingActive/activeRun/shareSetting/upload.ajax', (req, res, next) => {
        let form = new formidable.IncomingForm();
        form.keepExtensions = true;
        form.parse(req, (err, fields, files) => {
            console.log('图片接收完毕:', files);
            let formData = {
                file: fs.createReadStream(path.resolve(files.file.path))
            };
            let option = {
                pageUrl: '/marketingActive/activeRun/asyncWorkSetting/upload.ajax',
                req,
                url: apiUrlList.upload,
                timeout: 30000,
                formData: formData
            };
            request.post(option, (error, response, body) => {
                if (error) {
                    return res.send({
                        error: 1,
                        msg: '上传失败'
                    });
                }
                let result = typeof body === 'string' ? JSON.parse(body) : body;
                if (result && result.returnCode == 0) {
                    res.send({
                        error: 0,
                        msg: '上传成功',
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
                        msg: '上传失败'
                    });
                }
            });
        });
    });
};