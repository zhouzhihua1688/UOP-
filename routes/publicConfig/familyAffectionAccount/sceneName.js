const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').familyAffectionAccount.sceneName;
const apiConfig = require('../apiConfig');
const filePathExternal = apiConfig.filePathExternal + '/familyAffectionAccount';
const filePathExternal_url = apiConfig.filePafilePathExternalthUrl + '/familyAffectionAccount';

const path = require('path');
const fs = require('fs');
const formidable = require('formidable');
module.exports = function (app) {
    //查询
    app.post('/publicConfig/familyAffectionAccount/sceneName/tableData.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/publicConfig/familyAffectionAccount/sceneName/tableData.ajax',
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
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: '查询成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '查询失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
    //查询 场景
    app.post('/publicConfig/familyAffectionAccount/sceneName/queryScene.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/publicConfig/familyAffectionAccount/sceneName/queryScene.ajax',
            req: req,
            url: apiUrlList.queryScene,
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
            if (result && result.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: '查询成功',
                    data: result.body,
                    splitUrl:filePathExternal_url.split('/uopStatic/')[0]
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '查询失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
    // 添加
    app.post('/publicConfig/familyAffectionAccount/sceneName/add.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/publicConfig/familyAffectionAccount/sceneName/add.ajax',
            req: req,
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
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
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: '保存成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '保存失败'
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
    app.post('/publicConfig/familyAffectionAccount/sceneName/modifyData.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/publicConfig/familyAffectionAccount/sceneName/modifyData.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.modifyData,
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
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: '修改成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '修改失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
    //删除
    app.post('/publicConfig/familyAffectionAccount/sceneName/del.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/publicConfig/familyAffectionAccount/sceneName/del.ajax',
            req: req,
            operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.modifyData,
            body: params,
            timeout: 15000,
            json: true
        };
        request.put(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '删除失败',
                    data: null
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: '删除成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '删除失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
    // 新增大图标
    app.post('/publicConfig/familyAffectionAccount/sceneName/uploadPostPicFile1.ajax', (req, res, next) => {
        try {
            !fs.existsSync(apiConfig.filePathExternal) && fs.mkdirSync(apiConfig.filePathExternal);
            !fs.existsSync(filePathExternal) && fs.mkdirSync(filePathExternal);
            // const postPicFilePath = filePathExternal;
            // !fs.existsSync(postPicFilePath) && fs.mkdirSync(postPicFilePath);
            let form = new formidable.IncomingForm();
            let time= new Date().getTime();
            form.uploadDir = filePathExternal;
            // form.uploadDir = 'E:/picpath/opt';
            form.keepExtensions = true;
            form.parse(req, (err, fields, files) => {
                console.log('数据接收完毕:', fields);
                console.log('文件接收完毕:', files);
                let originFilePath = path.resolve(files.file.path);
                console.log('------files start----------',files,'----end---');
                var fileNameArr=files.file.name.split('.');
                fileNameArr[fileNameArr.length-1]=fileNameArr[fileNameArr.length-1].replace(fileNameArr[fileNameArr.length-1],'_'+time+'.'+fileNameArr[fileNameArr.length-1]);
                var fileName=fileNameArr.join('');
                fs.createReadStream(originFilePath).pipe(fs.createWriteStream(`${filePathExternal}/${fileName}`));
                // fs.createReadStream(originFilePath).pipe(fs.createWriteStream(`E:/picpath/opt/${fileName}`));
                fs.unlinkSync(originFilePath);
                res.send({
                    error: 0,
                    msg: '上传成功',
                    data: {
                        filePath: `${filePathExternal}/${fileName}`.replace(/.*?(\/uopStatic.*$)/g,'$1')
                        // checkPath:`${filePathExternal_url}/${fileName}`
                        // filePath: `E:/picpath/opt/${fileName}`,
                    }
                });
            });
        } catch (error) {
            console.log('/publicConfig/familyAffectionAccount/sceneName/uploadPostPicFile1.ajax -------- 文件上传失败error:', error);
            res.send({
                error: 0,
                msg: '上传失败',
                data: null
            });
        }
    });
};