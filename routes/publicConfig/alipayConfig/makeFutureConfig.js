const request = require('../../../local_data/requestWrapper');
const apiConfig = require('../apiConfig');
const filePathExternal = apiConfig.filePathExternal + '/alipayConfig';
const filePathExternal_url = apiConfig.filePafilePathExternalthUrl + '/alipayConfig';
const path = require('path');
const fs = require('fs');
const formidable = require('formidable');
const fileName = 'miniMakeFuture_config.json';

module.exports = function (app) {
    // 文件上传
    app.post('/publicConfig/alipayConfig/makeFutureConfig/uploadFile.ajax', (req, res, next) => {
        try {
            !fs.existsSync(apiConfig.filePathExternal) && fs.mkdirSync(apiConfig.filePathExternal);
            !fs.existsSync(filePathExternal) && fs.mkdirSync(filePathExternal);
            let form = new formidable.IncomingForm();
            form.uploadDir = filePathExternal;
            form.keepExtensions = true;
            form.parse(req, (err, fields, files) => {
                console.log('数据接收完毕:', fields);
                console.log('文件接收完毕:', files);
                let originFilePath = path.resolve(files.file.path);
                fs.createReadStream(originFilePath).pipe(fs.createWriteStream(`${filePathExternal}/${fileName}`));
                fs.unlinkSync(originFilePath);
                res.send({
                    error: 0,
                    msg: '上传成功',
                    data: {
                        filePath: `${filePathExternal_url}/${fileName}`
                    }
                });
            });
        } catch (error) {
            console.log('/publicConfig/alipayConfig/makeFutureConfig/uploadFile.ajax -------- 文件上传失败error:', error);
            res.send({
                error: 0,
                msg: '上传失败',
                data: null
            });
        }
    });
    // 封面图片文件上传
    app.post('/publicConfig/alipayConfig/makeFutureConfig/uploadPostPicFile.ajax', (req, res, next) => {
        try {
            !fs.existsSync(apiConfig.filePathExternal) && fs.mkdirSync(apiConfig.filePathExternal);
            !fs.existsSync(filePathExternal) && fs.mkdirSync(filePathExternal);
            const postPicFilePath = filePathExternal + '/poster';
            !fs.existsSync(postPicFilePath) && fs.mkdirSync(postPicFilePath);
            let form = new formidable.IncomingForm();
            form.uploadDir = postPicFilePath;
            form.keepExtensions = true;
            form.parse(req, (err, fields, files) => {
                console.log('数据接收完毕:', fields);
                console.log('文件接收完毕:', files);
                let originFilePath = path.resolve(files.file.path);
                fs.createReadStream(originFilePath).pipe(fs.createWriteStream(`${postPicFilePath}/${files.file.name}`));
                fs.unlinkSync(originFilePath);
                res.send({
                    error: 0,
                    msg: '上传成功',
                    data: {
                        filePath: `${filePathExternal_url}/poster/${files.file.name}`
                    }
                });
            });
        } catch (error) {
            console.log('/publicConfig/alipayConfig/makeFutureConfig/uploadPostPicFile.ajax -------- 文件上传失败error:', error);
            res.send({
                error: 0,
                msg: '上传失败',
                data: null
            });
        }
    });
    // 获取封面图片文件地址
    app.post('/publicConfig/alipayConfig/makeFutureConfig/getPostPicFilePath.ajax', (req, res, next) => {
        const postPicFilePath = filePathExternal + '/poster';
        fs.readdir(postPicFilePath, 'utf-8', (error, data) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: 'fail',
                    data: error.message
                });
            }
            return res.send({
                error: 0,
                msg: 'success',
                data: data.map(filename => `${filePathExternal_url}/poster/${filename}`)
            });
        })
    });
    // 获取文件地址
    app.post('/publicConfig/alipayConfig/makeFutureConfig/getFilePath.ajax', (req, res, next) => {
        res.send({
            error: 0,
            msg: 'success',
            data: {
                filePath: `${filePathExternal_url}/${fileName}`
            }
        });
    });
    // 获取文件内容
    app.post('/publicConfig/alipayConfig/makeFutureConfig/getFile.ajax', (req, res, next) => {
        fs.readFile(`${filePathExternal}/${fileName}`, 'utf-8', function (err, data) {
            if (err) {
                res.send({
                    error: 1,
                    msg: 'fail',
                    data: err.message
                });
            } else {
                res.send({
                    error: 0,
                    msg: 'success',
                    data: typeof data === 'string' ? data : JSON.stringify(data)
                });
            }
        });
    });
};