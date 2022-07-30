const request = require('./../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').highFinancialMgmt.basicsParamMaintain;
const VIPFilePaths = require('../apiConfig').VIPFilePath;
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
module.exports = function (app) {
    // 获取初始数据和查询
    app.post('/businessMgmt/highFinancialMgmt/basicsParamMaintain/getTableData.ajax', (req, res, next) => {
        let params = {};
        req.body.pageNum && (params.pageNum = req.body.pageNum);
        req.body.pageSize && (params.pageSize = req.body.pageSize);
        let option = {
            pageUrl: '/businessMgmt/highFinancialMgmt/basicsParamMaintain/getTableData.ajax',
            req,
            url: apiUrlList.getTableData,
            // body: params,
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
            if (result.returnCode == 0 && Array.isArray(result.body)) {
                let resultData = {};
                resultData.tableData = result.body;
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

    //修改数据
    app.post('/businessMgmt/highFinancialMgmt/basicsParamMaintain/update.ajax', (req, res, next) => {
        let params = {};
        params.pmco = req.body.pmco;
        params.pmnm = req.body.pmnm;
        params.pmv1 = req.body.pmv1;
        params.pmv2 = req.body.pmv2;
        params.pmv3 = req.body.pmv3;
        let option = {
            pageUrl: '/businessMgmt/highFinancialMgmt/basicsParamMaintain/update.ajax',
            req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.update,
            body: params,
            timeout: 15000,
            json: true
        };
        request.put(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '修改失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                return res.send({
                    error: 0,
                    msg: '修改成功'
                });
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '修改失败'
                });
            }
        });
    });

    //文件上传
    app.post('/businessMgmt/highFinancialMgmt/basicsParamMaintain/upload.ajax', (req, res, next) => {
        let form = new formidable.IncomingForm();
        // let params = req.body;
        // userName = req.session.loginInfo.username;
        let VIPFilePath = path.join(VIPFilePaths, 'banner')
        try {
            if (!fs.existsSync(VIPFilePath)) {
                fs.mkdirSync(VIPFilePath)
            }
        } catch (error) {
            console.log('文件夹不存在', error)
            return res.send({
                error: 1,
                msg: '上传失败，文件夹不存在',
                data: null
            });
        }
        form.uploadDir = VIPFilePath;
        form.keepExtensions = true;
        form.parse(req, (err, fields, files) => {
            // let formData;
            if (err) {
                console.log('/businessMgmt/highFinancialMgmt/basicsParamMaintain/upload.ajax:', err);
                return res.send({
                    error: 1,
                    msg: '上传失败',
                    data: null
                });
            }
            console.log('参数表管理页面表单接收完毕:', fields);
            console.log('参数表管理页面表单文件接收完毕:', files);
            // var afterFile = files.file.name.indexOf('.');
            // afterFile = files.file.name.substr(afterFile - 0 + 1) //获取文件后缀名
            // afterFiles = files.file.name.replace(/\.[a-z]{0,}$/,"") //获取文件名字部分
            // files.file.path = form.uploadDir + "/" +afterFiles+Math.floor(Math.random()*100) + 1+'.'+afterFile;
            try {
                fs.renameSync(files.file.path, form.uploadDir + "/" + files.file.name) //文件改名
                files.file.path = form.uploadDir + "/" + files.file.name //文件改名
                console.log("---", files.file.path)
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
                data: files.file.name
            })

            // try {
            //     formData = {
            //         file: fs.createReadStream(path.resolve(files.file.path))
            //     };
            // } catch (error) {
            //     return res.send({
            //         error: 1,
            //         msg: '上传失败',
            //         data: '上传失败'
            //     });
            // }
            // let option = {
            //     session: req.session,
            //     url: apiUrlList.upload,
            //     timeout: 30000,
            //     formData: formData,
            // };
            // console.log('/businessMgmt/highFinancialMgmt/basicsParamMaintain/upload.ajax option:', option);
            // request.post(option, (error, response, body) => {
            //     console.log('/businessMgmt/highFinancialMgmt/basicsParamMaintain/upload.ajax error:', error);
            //     console.log('/businessMgmt/highFinancialMgmt/basicsParamMaintain/upload.ajax statusCode:', response && response.statusCode);
            //     console.log('/businessMgmt/highFinancialMgmt/basicsParamMaintain/upload.ajax body:', body);
            //     if (error) {
            //         return res.send({
            //             error: 1,
            //             msg: '上传失败'
            //         });
            //     }
            //     let result = typeof body === 'string' ? JSON.parse(body) : body;

            //     if (result && result.returnCode == '0') {
            //         res.send({
            //             error: 0,
            //             msg: '上传成功',
            //             // data: result.body
            //         });
            //     } else if (result && result.returnCode != 9999) {
            //         return res.send({error: 1, msg: result.returnMsg});
            //     } else {
            //         res.send({
            //             error: 1,
            //             msg: '上传失败'
            //         });
            //     }
            // });
        });
    });

    //  下载
    app.get('/businessMgmt/highFinancialMgmt/basicsParamMaintain/download.ajax', (req, res, next) => {
        var params = {
            fileName: req.query.pmv1
        };
        var banner = ['.jpg', '.jpeg', '.gif', '.bmp', '.tiff', '.psd', '.png']
        var ext = path.parse(params.fileName).ext
        console.log('/businessMgmt/highFinancialMgmt/basicsParamMaintain/download.ajax params:', params);
        var directory = ''
        if (banner.includes(ext)) {
            directory = 'banner'
        } else {
            res.send({
                error: 1,
                msg: '下载失败',
                data: null
            })
        }
        try {
            // console.log(path.join(VIPFilePath, params.fileName))
            // res.download(path.join(VIPFilePath, params.fileName))
            console.log(path.join(VIPFilePaths, directory, params.fileName))
            res.download(path.join(VIPFilePaths, directory, params.fileName))
        } catch (error) {
            console.log('error', error)
            res.send({
                error: 1,
                msg: '下载失败',
                data: null
            })
        }
    });
}