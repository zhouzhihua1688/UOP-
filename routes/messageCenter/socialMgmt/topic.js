const request = require('../../../local_data/requestWrapper');
const config = require('../apiConfig');
const apiUrlList = config.socialMgmt.topic;
const baseUrl = '/messageCenter/socialMgmt/topic';
const fs = require('fs');
const path = require('path');
let communityFilesPath = config.communityFilesPath;
let communityFilesPathJoin = path.join(communityFilesPath, '/topic');
let communityFilesPath_url = `${config.communityFilesPath_url}/topic`;
const formidable = require('formidable');

module.exports = function (app) {

    // 文章置顶
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
    // 文章状态修改
    app.post(`${baseUrl}/topicModify.ajax`, (req, res, next) => {
        let params = req.body;
        params.checkUser = req.session.loginInfo.userid;
        let option = {
            pageUrl: `${baseUrl}/topicModify.ajax`,
            req: req,
            // operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.topicModify,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
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
    //查询文章列表
    app.post(`${baseUrl}/topicTableData.ajax`, (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: `${baseUrl}/topicTableData.ajax`,
            req: req,
            url: apiUrlList.topicTableData,
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
    //查询卡片列表
    app.post(`${baseUrl}/cardList.ajax`, (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: `${baseUrl}/cardList.ajax`,
            req: req,
            url: apiUrlList.cardList,
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
    //查询分类
    app.post(`${baseUrl}/classify.ajax`, (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: `${baseUrl}/classify.ajax`,
            req: req,
            url: apiUrlList.classify,
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
    // 新增
    app.post(`${baseUrl}/add.ajax`, (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: `${baseUrl}/add.ajax`,
            req: req,
            // operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.add,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '保存失败',
                    data: null
                });
            }
            if (body.returnCode === 0) {
                res.send({
                    error: 0,
                    msg: '保存成功',
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
                    msg: '保存失败',
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
            url: `${apiUrlList.querySingle}${params.topicId}`,
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

    // 删除
    app.post(`${baseUrl}/del.ajax`, (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: `${baseUrl}/del.ajax`,
            req: req,
            // operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.del,
            qs: params,
            timeout: 15000,
            json: true
        };
        request.delete(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '删除失败',
                    data: null
                });
            }
            if (body.returnCode === 0) {
                res.send({
                    error: 0,
                    msg: '删除成功',
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
                    msg: '删除失败',
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


    //文件删除
    app.post(`${baseUrl}/delFile.ajax`, (req, res, next) => {
        try {
            fs.unlinkSync(path.join(communityFilesPathJoin, req.body.file))
        } catch (error) {
            console.log('文件不存在', error)
            return res.send({
                error: 1,
                msg: '删除失败，文件不存在',
                data: false
            });
        }
        return res.send({
            error: 0,
            msg: '删除成功',
            data: true
        })
    });

    // 获取  img
    app.get(`${baseUrl}/img.ajax`, (req, res, next) => {
        let params = req.query;
        fs.readFile(path.join(communityFilesPathJoin, params.fileName), 'binary', (err, data) => {
            if (err) {
                return res.send({
                    error: 1,
                    msg: '图片获取失败',
                    data: null
                });

            }
            res.writeHead(200, {
                'Content-Type': 'image/jpeg'
            });
            res.write(data, 'binary');
            res.end();
        })
    });

    //获取投票列表
    app.post(`${baseUrl}/voteList.ajax`, (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: `${baseUrl}/voteList.ajax`,
            req: req,
            url: apiUrlList.voteList,
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
};