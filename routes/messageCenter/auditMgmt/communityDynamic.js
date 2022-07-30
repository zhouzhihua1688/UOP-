const request = require('../../../local_data/requestWrapper');
const config = require('../apiConfig');
const apiUrlList = config.auditMgmt.communityDynamic;
const baseUrl = '/messageCenter/auditMgmt/communityDynamic';
const fs = require('fs');
const path = require('path');
let communityFilesPath = config.communityFilesPath;
let communityFilesPathJoin = path.join(communityFilesPath, '/communityDynamic');
let communityFilesPath_url = `${config.communityFilesPath_url}/communityDynamic`;
const formidable = require('formidable');
module.exports = function (app) {
      //查询话题列表
      app.post(`${baseUrl}/topicLIst.ajax`, (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: `${baseUrl}/topicLIst.ajax`,
            req: req,
            url: apiUrlList.topicLIst,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '查询失败'
                });
            }
            if (body.returnCode === 0) {
                res.send({
                    error: 0,
                    msg: '查询成功',
                    data: body.body
                });
            } else if (body && body.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: body.returnMsg,
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
    //置顶
    app.post(`${baseUrl}/remarksTop.ajax`, (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: `${baseUrl}/remarksTop.ajax`,
            req: req,
            // operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.remarksTop,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '操作失败',
                    data: null
                });
            }
            if (body.returnCode === 0) {
                res.send({
                    error: 0,
                    msg: '操作成功',
                    data: null
                });
            } else if (body && body.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: body.returnMsg,
                    data: null
                });
            } else {
                res.send({
                    error: 1,
                    msg: '操作失败',
                    data: null
                });
            }
        });
    });
    app.post(`${baseUrl}/levelModify.ajax`, (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: `${baseUrl}/levelModify.ajax`,
            req: req,
            // operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.levelModify,
            qs: params,
            timeout: 15000,
            json: true
        };
        request.put(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '修改失败',
                    data: null
                });
            }
            if (body.returnCode === 0) {
                res.send({
                    error: 0,
                    msg: '修改成功',
                    data: null
                });
            } else if (body && body.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: body.returnMsg,
                    data: null
                });
            } else {
                res.send({
                    error: 1,
                    msg: '修改失败',
                    data: null
                });
            }
        });
    });
      //查询作者列表
      app.post(`${baseUrl}/accountList.ajax`, (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: `${baseUrl}/accountList.ajax`,
            req: req,
            url: apiUrlList.accountList,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '查询失败'
                });
            }
            if (body.returnCode === 0) {
                res.send({
                    error: 0,
                    msg: '查询成功',
                    data: body.body
                });
            } else if (body && body.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: body.returnMsg,
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
    app.post(`${baseUrl}/tableData.ajax`, (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: `${baseUrl}/tableData.ajax`,
            req: req,
            url: apiUrlList.tableData,
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
            if (body.returnCode === 0) {
                res.send({
                    error: 0,
                    msg: '查询成功',
                    data: body.body
                });
            } else if (body && body.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: body.returnMsg,
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

    //查询单个页面
    app.post(`${baseUrl}/querySingle.ajax`, (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: `${baseUrl}/querySingle.ajax`,
            req: req,
            url: `${apiUrlList.querySingle}${params.postId}`,
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
            if (body.returnCode === 0) {
                res.send({
                    error: 0,
                    msg: '查询成功',
                    data: body.body
                });
            } else if (body && body.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: body.returnMsg,
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


    // 修改
    app.post(`${baseUrl}/modify.ajax`, (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: `${baseUrl}/modify.ajax`,
            req: req,
            // operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.modify,
            body: params,
            timeout: 15000,
            json: true
        };
        request.put(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '修改失败',
                    data: null
                });
            }
            if (body.returnCode === 0) {
                res.send({
                    error: 0,
                    msg: '修改成功',
                    data: null
                });
            } else if (body && body.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: body.returnMsg,
                    data: null
                });
            } else {
                res.send({
                    error: 1,
                    msg: '修改失败',
                    data: null
                });
            }
        });
    });
    // 审核
    app.post(`${baseUrl}/approve.ajax`, (req, res, next) => {
        let params = req.body;
        params.checkUser = req.session.loginInfo.userid;
        let option = {
            pageUrl: `${baseUrl}/approve.ajax`,
            req: req,
            // operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.approve,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '操作失败',
                    data: null
                });
            }
            if (body.returnCode === 0) {
                res.send({
                    error: 0,
                    msg: '操作成功',
                    data: null
                });
            } else if (body && body.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: body.returnMsg,
                    data: null
                });
            } else {
                res.send({
                    error: 1,
                    msg: '操作失败',
                    data: null
                });
            }
        });
    });

 

    //文件上传
    app.post(`${baseUrl}/uploadImage.ajax`, (req, res, next) => {
        let form = new formidable.IncomingForm();
        let filePath = communityFilesPathJoin;
        try {
            if (!fs.existsSync(communityFilesPath)) {
                fs.mkdirSync(communityFilesPath)
            }
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath)
            }
        } catch (error) {
            console.log('文件夹不存在', error)
            return res.send({
                error: 1,
                msg: '上传失败，文件夹不存在',
                data: null
            });
        }
        form.uploadDir = filePath;
        form.keepExtensions = true;
        form.parse(req, (err, fields, files) => {
            // let formData;
            if (err) {
                console.log(`${baseUrl}/uploadImage.ajax:`, err);
                return res.send({
                    error: 1,
                    msg: '上传失败',
                    data: null
                });
            }
            console.log('参数表管理页面表单接收完毕:', fields);
            console.log('参数表管理页面表单文件接收完毕:', files);

            try {
                fs.renameSync(files.file.path, form.uploadDir + "/" + files.file.name) //文件改名
            } catch (err) {
                res.send({
                    error: 0,
                    msg: '上传失败',
                    data: files.file.name
                })
            }
            res.send({
                error: 0,
                msg: '上传成功',
                data: `${communityFilesPath_url}/${files.file.name}`
            })

        });
    });



};