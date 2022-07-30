const request = require('./../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').highFinancialMgmt.productAreaMgmt;
const VIPFilePaths = require('../apiConfig').VIPFilePath;
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
module.exports = function (app) {
    // 获取初始数据和查询
    app.post('/businessMgmt/highFinancialMgmt/productAreaMgmt/getTableData.ajax', (req, res, next) => {
        let params = {};
        req.body.pageNo && (params.pageNo = req.body.pageNo);
        req.body.pageSize && (params.pageSize = req.body.pageSize);
        let option = {
            pageUrl: '/businessMgmt/highFinancialMgmt/productAreaMgmt/getTableData.ajax',
            req,
            url: apiUrlList.getTableData,
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
            if (result.returnCode == 0 && Array.isArray(result.body.results)) {
                let resultData = {};
                // resultData.pageNo = result.body.pageNo; //页数

                resultData.pageNo = result.body.pageNo; //页数
                resultData.totalSize = Math.ceil(result.body.totalRecord / req.body.pageSize); //总页数d;//总页数
                resultData.tableData = result.body.results;
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

    //新增数据
    app.post('/businessMgmt/highFinancialMgmt/productAreaMgmt/saveParam.ajax', (req, res, next) => {
        let params = {};
        req.body.zoneId && (params.zoneId = req.body.zoneId);
        req.body.zoneName && (params.zoneName = req.body.zoneName);
        req.body.zoneType && (params.zoneType = req.body.zoneType);
        req.body.displayOrder && (params.displayOrder = req.body.displayOrder);
        req.body.onsaleFlag && (params.onsaleFlag = req.body.onsaleFlag);
        req.body.attachBanner && (params.attachBanner = req.body.attachBanner);
        req.body.attachBannerMb && (params.attachBannerMb = req.body.attachBannerMb);
        req.body.displayStyle && (params.displayStyle = req.body.displayStyle);
        req.body.expectYieldDesc && (params.expectYieldDesc = req.body.expectYieldDesc);
        req.body.investPeriod && (params.investPeriod = req.body.investPeriod);
        req.body.onsaleDate && (params.onsaleDate = req.body.onsaleDate);
        req.body.remarkMb1 && (params.remarkMb1 = req.body.remarkMb1);
        req.body.remarkMb2 && (params.remarkMb2 = req.body.remarkMb2);
        var arr = JSON.parse(req.body.hlvlFundZoneMappingList)
        params.hlvlFundZoneMappingList = arr
        let option = {
            pageUrl: '/businessMgmt/highFinancialMgmt/productAreaMgmt/saveParam.ajax',
            req,
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.saveParam,
            body: params,
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

    //修改数据
    app.post('/businessMgmt/highFinancialMgmt/productAreaMgmt/update.ajax', (req, res, next) => {
        let params = {};
        params.zoneId = req.body.zoneId;
        params.zoneName = req.body.zoneName;
        params.zoneType = req.body.zoneType;
        params.displayOrder = req.body.displayOrder;
        params.onsaleFlag = req.body.onsaleFlag;
        params.attachBanner = req.body.attachBanner;
        params.attachBannerMb = req.body.attachBannerMb;
        params.displayStyle = req.body.displayStyle;
        params.expectYieldDesc = req.body.expectYieldDesc;
        params.investPeriod = req.body.investPeriod;
        params.onsaleDate = req.body.onsaleDate;
        params.remarkMb1 = req.body.remarkMb1;
        params.remarkMb2 = req.body.remarkMb2;

        var arr = JSON.parse(req.body.hlvlFundZoneMappingList)
        // req.body.hlvlFundZoneMappingList && (params.hlvlFundZoneMappingList =req.body.hlvlFundZoneMappingList);
        params.hlvlFundZoneMappingList = arr
        console.log("传过去的数组参数", params)
        let option = {
            pageUrl: '/businessMgmt/highFinancialMgmt/productAreaMgmt/update.ajax',
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
    //删除数据
    app.post('/businessMgmt/highFinancialMgmt/productAreaMgmt/deleteParam.ajax', (req, res, next) => {
        let params = {};
        req.body.zoneIds && (params.zoneIds = JSON.parse(req.body.zoneIds));
        let option = {
            pageUrl: '/businessMgmt/highFinancialMgmt/productAreaMgmt/deleteParam.ajax',
            req,
            operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.deleteParam,
            body: params.zoneIds,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '删除失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                return res.send({
                    error: 0,
                    msg: '删除成功'
                });
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '删除失败'
                });
            }
        });
    });

    // 查看详情
    app.post('/businessMgmt/highFinancialMgmt/productAreaMgmt/checklist.ajax', (req, res, next) => {
        let params = {};
        var zoneId = req.body.zoneId
        // req.body.zoneId&& (params.zoneId = req.body.zoneId);
        let option = {
            pageUrl: '/businessMgmt/highFinancialMgmt/productAreaMgmt/checklist.ajax',
            req,
            url: apiUrlList.checklist + '/' + zoneId,
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
            if (result.returnCode == 0) {
                return res.send({
                    error: 0,
                    msg: '查询成功',
                    data: body
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

    //下拉列表数据(产品名称)
    app.post('/businessMgmt/highFinancialMgmt/productAreaMgmt/fundList.ajax', (req, res, next) => {
        let params = {};
        req.body.pageNum && (params.pageNum = req.body.pageNum);
        req.body.pageSize && (params.pageSize = req.body.pageSize);
        let option = {
            pageUrl: '/businessMgmt/highFinancialMgmt/productAreaMgmt/fundList.ajax',
            req,
            url: apiUrlList.fundList,
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
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0 && Array.isArray(result.body.fundInfos)) {
                result.body.fundInfos.forEach(item => {
                    item.check = false;
                    item.displayOrder = '';
                });
                let fundData = {};
                fundData.pageNum = result.body.pageNum; //页数
                fundData.totalSize = Math.ceil(result.body.totalSize / req.body.pageSize); //总页数d;//总页数
                fundData.listData = result.body.fundInfos;
                return res.send({
                    error: 0,
                    msg: '查询成功',
                    data: fundData
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

    //上传图片
    //文件上传
    app.post('/businessMgmt/highFinancialMgmt/productAreaMgmt/upload.ajax', (req, res, next) => {
        //文件上传
        let form = new formidable.IncomingForm();
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
                console.log('/businessMgmt/highFinancialMgmt/productAreaMgmt/upload.ajax:', err);
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
        });
    });
    app.post('/businessMgmt/highFinancialMgmt/productAreaMgmt/uploads.ajax', (req, res, next) => {
        //文件上传
        let form = new formidable.IncomingForm();
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
                console.log('/businessMgmt/highFinancialMgmt/productAreaMgmt/uploads.ajax:', err);
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
        });
    });

    //  下载
    app.get('/businessMgmt/highFinancialMgmt/productAreaMgmt/upload.ajax', (req, res, next) => {
        var params = {
            fileName: req.query.filePath
        };
        var banner = ['.jpg', '.jpeg', '.gif', '.bmp', '.tiff', '.psd', '.png']
        var ext = path.parse(params.fileName).ext
        console.log('/businessMgmt/highFinancialMgmt/productAreaMgmt/upload.ajax params:', params);
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

    //  下载
    app.get('/businessMgmt/highFinancialMgmt/productAreaMgmt/uploads.ajax', (req, res, next) => {
        var params = {
            fileName: req.query.filePaths
        };
        var banner = ['.jpg', '.jpeg', '.gif', '.bmp', '.tiff', '.psd', '.png']
        var ext = path.parse(params.fileName).ext
        console.log('/businessMgmt/highFinancialMgmt/productAreaMgmt/uploads.ajax params:', params);
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