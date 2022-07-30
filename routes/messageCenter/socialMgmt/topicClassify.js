const request = require('../../../local_data/requestWrapper');
const config = require('../apiConfig');
const apiUrlList = config.socialMgmt.topicClassify;
const baseUrl = '/messageCenter/socialMgmt/topicClassify';
const fs = require('fs');
const path = require('path');
let communityFilesPath = config.communityFilesPath;
let communityFilesPathJoin = path.join(communityFilesPath, '/topicClassify');
let communityFilesPath_url = `${config.communityFilesPath_url}/topicClassify`;
const formidable = require('formidable');

module.exports = function (app) {
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
    //查看关联话题二级页面获取表数据
    app.post(`${baseUrl}/categoryTable.ajax`, (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: `${baseUrl}/categoryTable.ajax`,
            req: req,
            url: apiUrlList.categoryTable,
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
    //查询单个页面
    app.post(`${baseUrl}/querySingle.ajax`, (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: `${baseUrl}/querySingle.ajax`,
            req: req,
            url: `${apiUrlList.querySingle}${params.categoryId}`,
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
    // 新增排序字段
    app.post(`${baseUrl}/topicModify.ajax`, (req, res, next) => {
        let params = req.body;
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
    // 修改排序字段
    app.post(`${baseUrl}/topicModifyOld.ajax`, (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: `${baseUrl}/topicModifyOld.ajax`,
            req: req,
            // operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.topicModifyOld,
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
    // 删除关联关系
    app.post(`${baseUrl}/delCategory.ajax`, (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: `${baseUrl}/delCategory.ajax`,
            req: req,
            // operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.delCategory,
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

};