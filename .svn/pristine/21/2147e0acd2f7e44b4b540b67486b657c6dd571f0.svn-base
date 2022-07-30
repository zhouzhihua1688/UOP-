const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').wechatPublicMgmt.wechatUserLabelMgmt;
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');
const node_xlsx = require('node-xlsx');
module.exports = function (app) {
    //查询
    // 获取初始数据和查询
    app.post('/publicConfig/wechatPublicMgmt/wechatUserLabelMgmt/getTableData.ajax', (req, res, next) => {
        let params = {};
        params.systemType = req.body.system;
        let option = {
            pageUrl: '/publicConfig/wechatPublicMgmt/wechatUserLabelMgmt/getTableData.ajax',
            req: req,
            url: apiUrlList.getTableData,
            qs: params,
            timeout: 15000,
            json: true
        };
        request.get(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '查询失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            console.log(result, '---result----');
            if (result && result.returnCode == '0') {
                // var resultData=result.body;
                // resultData.forEach((item) => {
                //     item.check = false;
                // });
                let resultData = {};
                resultData.tableData = result.body
                return res.send({
                    error: 0,
                    msg: '查询成功',
                    data: resultData
                });
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '查询失败'
                });
            }
        });
    });

    // 添加
    app.post('/publicConfig/wechatPublicMgmt/wechatUserLabelMgmt/saveParam.ajax', (req, res, next) => {
        let params = {};
        params.tagid = req.body.tagid;
        params.openid = req.body.openid;
        params.systemType = req.body.system;
        let option = {
            pageUrl: '/publicConfig/wechatPublicMgmt/wechatUserLabelMgmt/saveParam.ajax',
            req,
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.saveParam,
            qs: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '保存失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                return res.send({
                    error: 0,
                    msg: '保存成功'
                });
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '保存失败'
                });
            }
        });
    });

    // 批量打标签
    app.post('/publicConfig/wechatPublicMgmt/wechatUserLabelMgmt/ExcelUpload.ajax', (req, res, next) => {
        let form = new formidable.IncomingForm();
        // let params = req.body;
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
                pageUrl: '/publicConfig/wechatPublicMgmt/wechatUserLabelMgmt/ExcelUpload.ajax',
                req: req,
                url: apiUrlList.ExcelUpload,
                timeout: 30000,
                formData: formData,
                qs: {
                    systemType: fields.system
                }
            };
            console.log("option",option)
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
                        msg:result.returnMsg
                    });
                }
            });
        });
    });


    // app.post('/publicConfig/wechatPublicMgmt/wechatUserLabelMgmt/ExcelUpload.ajax', (req, res, next) => {
    //     let form = new formidable.IncomingForm();
    //     // let VIPFilePath = path.join(VIPFilePaths, 'attach')
    //     // try {
    //     //     if (!fs.existsSync(VIPFilePath)) {
    //     //         fs.mkdirSync(VIPFilePath)
    //     //     }
    //     // } catch (error) {
    //     //     console.log('文件夹不存在', error)
    //     //     return res.send({
    //     //         error: 1,
    //     //         msg: '上传失败，文件夹不存在',
    //     //         data: null
    //     //     });
    //     // }
    //     // form.uploadDir = VIPFilePath;
    //     form.keepExtensions = true;
    //     form.parse(req, (err, fields, files) => {
    //         console.log('参数表管理页面表单接收完毕:', fields);
    //         console.log('参数表管理页面表单文件接收完毕:', files);
    //         // req.setHeader("Content-Type", "multipart/form-data");
    //         try {
    //             fs.renameSync(files.file.path, form.uploadDir + "/" + files.file.name) //文件改名
    //             files.file.path = form.uploadDir + "/" + files.file.name //文件改名
    //             var formData = {
    //                 file: fs.createReadStream(path.resolve(files.file.path))
    //             };
    //             let option = {
    //                 req,
    //                 url: apiUrlList.ExcelUpload,
    //                 formData,
    //                 timeout: 15000,
    //                 json: true
    //             };
    //             console.log('/publicConfig/wechatPublicMgmt/wechatUserLabelMgmt/ExcelUpload.ajax option:', {
    //                 ...option,
    //                 req: '#'
    //             });
    //             request.post(option, (error, response, body) => {
    //                 console.log('/publicConfig/wechatPublicMgmt/wechatUserLabelMgmt/ExcelUpload.ajax error:', error);
    //                 console.log('/publicConfig/wechatPublicMgmt/wechatUserLabelMgmt/ExcelUpload.ajax statusCode:', response && response.statusCode);
    //                 console.log('/publicConfig/wechatPublicMgmt/wechatUserLabelMgmt/ExcelUpload.ajax body:', body);
    //                 if (error) {
    //                     return res.send({
    //                         error: 1,
    //                         msg: '导入失败',
    //                         data: null
    //                     });
    //                 }
    //                 if (body && body.returnCode == 0) {
    //                     res.send({
    //                         error: 0,
    //                         msg: '导入成功',
    //                         data: null
    //                     });
    //                 } else if (body && body.returnCode == 9999) {
    //                     res.send({
    //                         error: 1,
    //                         msg: body.returnMsg,
    //                         data: null
    //                     });
    //                 } else {
    //                     res.send({
    //                         error: 1,
    //                         msg: '导入失败',
    //                         data: null
    //                     });
    //                 }
    //             });
    //         } catch (error) {
    //             return res.send({
    //                 error: 1,
    //                 msg: '导入失败'
    //             });
    //         }
    //     })
    // });

};