const request = require('../../../local_data/requestWrapper');
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
const apiUrlList = require('../apiConfig').recommendSystem.recommendSystemTemplateConfig.sceneDataConfig;
module.exports = function (app) {
    //获取分页查询列表
    app.post('/recommendSystem/recommendSystemTemplateConfig/sceneDataConfig/queryInfo.ajax', (req, res, next) => {
            let params = req.body;
            params.pageNo=parseInt(params.pageNo);
            params.pageSize=parseInt(params.pageSize);
            let userId= req.session.loginInfo.userid;
            let option = {
                pageUrl: '/recommendSystem/recommendSystemTemplateConfig/sceneDataConfig/queryInfo.ajax',
                req: req,
                url: apiUrlList.queryInfo,
                qs: params,
                timeout: 15000,
                json: true
            };
            request(option, (error, response, body) => {
                if (error) {
                    return res.send({error: 1, msg: '操作失败'});
                }
                if (body && body.returnCode == 0) {
                    let data = body.body;
                    data.userId=userId;
                    data.pages = Math.ceil(data.total / params.pageSize);//最大页码
                    data.pageNum = params.pageNo;//当前页
                    res.send({error: 0, msg: '查询成功', data: data});
                }
                else if (body && body.returnCode != 9999) {
                    res.send({error: 1, msg: body.returnMsg});
                }
                else {
                    res.send({error: 1, msg: '查询失败'});
                }
            });
        }
    );
    //启用或禁用
    app.post('/recommendSystem/recommendSystemTemplateConfig/sceneDataConfig/enable.ajax', (req, res, next) => {
            let params = req.body;
            let option = {
                pageUrl: '/recommendSystem/recommendSystemTemplateConfig/sceneDataConfig/enable.ajax',
                req: req,
                operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
                url: apiUrlList.enable,
                qs: params,
                timeout: 15000,
                json: true
            };
            request(option, (error, response, body) => {
                if (error) {
                    return res.send({error: 1, msg: '操作失败'});
                }
                if (body && body.returnCode == 0) {
                    res.send({error: 0, msg: '操作成功', data: null});
                }
                else if (body && body.returnCode != 9999) {
                    res.send({error: 1, msg: body.returnMsg});
                }
                else {
                    res.send({error: 1, msg: '操作失败'});
                }
            });
        }
    );
    //删除
    app.post('/recommendSystem/recommendSystemTemplateConfig/sceneDataConfig/delete.ajax', (req, res, next) => {
            let params = req.body;
            let option = {
                pageUrl: '/recommendSystem/recommendSystemTemplateConfig/sceneDataConfig/delete.ajax',
                req: req,
                operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
                url: apiUrlList.deleteInfo,
                qs: params,
                timeout: 15000,
                json: true
            };
            request(option, (error, response, body) => {
                if (error) {
                    return res.send({error: 1, msg: '操作失败'});
                }
                if (body && body.returnCode == 0) {
                    res.send({error: 0, msg: '操作成功', data: null});
                }
                else if (body && body.returnCode != 9999) {
                    res.send({error: 1, msg: body.returnMsg});
                }
                else {
                    res.send({error: 1, msg: '操作失败'});
                }
            });
        }
    );
    //新增
    app.post('/recommendSystem/recommendSystemTemplateConfig/sceneDataConfig/add.ajax', (req, res, next) => {

        let option = {
            pageUrl: '/recommendSystem/recommendSystemTemplateConfig/sceneDataConfig/add.ajax',
            req: req,
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.add,
            body: req.body,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0) {
                res.send({error: 0, msg: '添加成功'});
            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: 1, msg: '添加失败'});
            }
        });
    });
    //修改
    app.post('/recommendSystem/recommendSystemTemplateConfig/sceneDataConfig/update.ajax', (req, res, next) => {

        let option = {
            pageUrl: '/recommendSystem/recommendSystemTemplateConfig/sceneDataConfig/update.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.update,
            body: req.body,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0) {
                res.send({error: 0, msg: '修改成功'});
            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: 1, msg: '修改失败'});
            }
        });
    });
    //上传文件
    app.post('/recommendSystem/recommendSystemTemplateConfig/sceneDataConfig/upload1.ajax', (req, res, next) => {
        let form = new formidable.IncomingForm();
        form.keepExtensions = true;
        form.parse(req, (err, fields, files) => {
            console.log('文件接收完毕:', files);
            let formData = {
                file: fs.createReadStream(path.resolve(files.file.path))
            };
            let option = {
                session: req.session,
                url: apiUrlList.upload,
                timeout: 30000,
                formData: formData
            };
            console.log('/recommendSystem/recommendSystemTemplateConfig/sceneDataConfig/upload1.ajax:', option);
            request.post(option, (error, response, body) => {
                console.log('/recommendSystem/recommendSystemTemplateConfig/sceneDataConfig/upload1.ajax error:', error);
                console.log('/recommendSystem/recommendSystemTemplateConfig/sceneDataConfig/upload1.ajax statusCode:', response && response.statusCode);
                console.log('/recommendSystem/recommendSystemTemplateConfig/sceneDataConfig/upload1.ajax body:', body);
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
    // 下载
    app.get('/recommendSystem/recommendSystemTemplateConfig/sceneDataConfig/downloadFile.ajax', (req, res, next) => {
        var params = {};
        params.filePath = req.query.filePath;
        let option = {
            pageUrl: '/recommendSystem/recommendSystemTemplateConfig/sceneDataConfig/downloadFile.ajax',
            req,
            url: apiUrlList.downloadFile,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option).pipe(res);
    });
  
};
