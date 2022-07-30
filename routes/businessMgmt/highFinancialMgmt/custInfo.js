const request = require('./../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').highFinancialMgmt.custInfo;
const formidable = require('formidable');
const VIPFilePaths = require('../apiConfig').VIPFilePath;
const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');
const node_xlsx = require('node-xlsx');
module.exports = function (app) {
    // 获取初始数据和查询
    app.post('/businessMgmt/highFinancialMgmt/custInfo/getTableData.ajax', (req, res, next) => {
        new Promise(function (resolve, reject) {
            let params = {};
            req.body.custGroupNo && (params.custGroupNo = req.body.custGroupNo);
            req.body.custIdno && (params.custIdno = req.body.custIdno);
            req.body.custIdtp && (params.custIdtp = req.body.custIdtp);
            req.body.custName && (params.custName = req.body.custName);
            req.body.pageNum && (params.pageNum = req.body.pageNum);
            req.body.pageSize && (params.pageSize = req.body.pageSize);
            let option = {
                req,
                url: apiUrlList.getTableData,
                body: params,
                timeout: 15000,
                json: true
            };
            console.log('/businessMgmt/highFinancialMgmt/custInfo/getTableData.ajax option:', {
                ...option,
                req: '#'
            });
            request.post(option, (error, response, body) => {
                console.log('/businessMgmt/highFinancialMgmt/custInfo/getTableData.ajax error:', error);
                console.log('/businessMgmt/highFinancialMgmt/custInfo/getTableData.ajax statusCode:', response && response.statusCode);
                console.log('/businessMgmt/highFinancialMgmt/custInfo/getTableData.ajax body:', {
                    ...body,
                    ['body']: '*****'
                });
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
                    // return res.send({error: 0, msg: '查询成功', data: resultData});
                    resolve(resultData)
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
        }).then(function (resultData) {
            return new Promise((resolve, reject) => {
                let option = {
                    pageUrl: '/businessMgmt/highFinancialMgmt/custInfo/custIdClass.ajax',
                    req,
                    url: apiUrlList.custIdClass,
                    timeout: 15000,
                    json: true
                };
                request.del(option, (error, response, body) => {
                    if (error) {
                        return res.send({
                            error: 1,
                            msg: '操作失败'
                        });
                    }
                    let result = typeof body === 'string' ? JSON.parse(body) : body;
                    if (result.returnCode == 0) {
                        let custIds = result.body;
                        var tableData = resultData.tableData
                        console.log("---", tableData)
                        console.log("****", custIds)

                        tableData.forEach(item => {
                            for (let custId of custIds) {

                                if (item.custIdtp == custId.pmco) {

                                    item.custIdtp = custId.pmnm;
                                    break;
                                }
                            }
                        });
                        return res.send({
                            error: 0,
                            msg: '获取成功',
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
                            msg: '获取失败'
                        });
                    }
                });
            })
        })
    });
    // 下拉列表数据-客群名称
    app.post('/businessMgmt/highFinancialMgmt/custInfo/custList.ajax', (req, res, next) => {
        // let params = {};
        let option = {
            pageUrl: '/businessMgmt/highFinancialMgmt/custInfo/custList.ajax',
            req,
            url: apiUrlList.custList,
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
            if (result && result.returnCode == 0) {
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

    // 下拉数据-证件类型
    app.post('/businessMgmt/highFinancialMgmt/custInfo/custIdClass.ajax', (req, res, next) => {
        // let params = {};
        let option = {
            pageUrl: '/businessMgmt/highFinancialMgmt/custInfo/custIdClass.ajax',
            req,
            url: apiUrlList.custIdClass,
            // body: params,
            timeout: 15000,
            json: true
        };
        request.del(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                return res.send({
                    error: 0,
                    msg: '获取成功',
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
                    msg: '获取失败'
                });
            }
        });
    });

    //新增数据
    app.post('/businessMgmt/highFinancialMgmt/custInfo/saveParam.ajax', (req, res, next) => {
        let params = {};
        req.body.custGroupNo && (params.custGroupNo = req.body.custGroupNo);
        req.body.custName && (params.custName = req.body.custName);
        req.body.custIdtp && (params.custIdtp = req.body.custIdtp);
        req.body.custIdno && (params.custIdno = req.body.custIdno);
        let option = {
            req,
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.saveParam,
            body: params,
            timeout: 15000,
            json: true
        };
        console.log('/businessMgmt/highFinancialMgmt/custInfo/saveParam.ajax option:', {
            ...option,
            req: '#'
        });
        request.post(option, (error, response, body) => {
            console.log('/businessMgmt/highFinancialMgmt/custInfo/saveParam.ajax error:', error);
            console.log('/businessMgmt/highFinancialMgmt/custInfo/saveParam.ajax statusCode:', response && response.statusCode);
            console.log('/businessMgmt/highFinancialMgmt/custInfo/saveParam.ajax body:', body);
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

    //删除数据
    app.post('/businessMgmt/highFinancialMgmt/custInfo/deleteParam.ajax', (req, res, next) => {
        // let params = {};
        var custNo = req.body.custNo
        // req.body.custNo && (params.custNo = req.body.custNo);
        let option = {
            pageUrl: '/businessMgmt/highFinancialMgmt/custInfo/deleteParam.ajax',
            req,
            operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            session: req.session,
            url: apiUrlList.deleteParam + '/' + custNo,
            // qs: params,
            timeout: 15000,
            json: true
        };
        request.del(option, (error, response, body) => {
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


    //文件上传
    app.post('/businessMgmt/highFinancialMgmt/custInfo/ExcelUpload.ajax', (req, res, next) => {
        let form = new formidable.IncomingForm();
        let VIPFilePath = path.join(VIPFilePaths, 'attach')
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

            console.log('参数表管理页面表单接收完毕:', fields);
            console.log('参数表管理页面表单文件接收完毕:', files);
            // req.setHeader("Content-Type", "multipart/form-data");
            try {
                fs.renameSync(files.file.path, form.uploadDir + "/" + files.file.name) //文件改名
                files.file.path = form.uploadDir + "/" + files.file.name //文件改名
                var formData = {
                    file: fs.createReadStream(path.resolve(files.file.path))
                };
                let option = {
                    req,
                    url: apiUrlList.ExcelUpload,
                    formData,
                    timeout: 15000,
                    json: true
                };
                console.log('/businessMgmt/highFinancialMgmt/custInfo/ExcelUpload.ajax option:', {
                    ...option,
                    req: '#'
                });
                request.post(option, (error, response, body) => {
                    console.log('/businessMgmt/highFinancialMgmt/custInfo/ExcelUpload.ajax error:', error);
                    console.log('/businessMgmt/highFinancialMgmt/custInfo/ExcelUpload.ajax statusCode:', response && response.statusCode);
                    console.log('/businessMgmt/highFinancialMgmt/custInfo/ExcelUpload.ajax body:', body);
                    if (error) {
                        return res.send({
                            error: 1,
                            msg: '导入失败',
                            data: null
                        });
                    }
                    if (body && body.returnCode == 0) {
                        res.send({
                            error: 0,
                            msg: '导入成功',
                            data: null
                        });
                    } else if (body && body.returnCode == 9999) {
                        res.send({
                            error: 1,
                            msg: body.returnMsg,
                            data: null
                        });
                    } else {
                        res.send({
                            error: 1,
                            msg: '导入失败',
                            data: null
                        });
                    }
                });
            } catch (error) {
                return res.send({
                    error: 1,
                    msg: '导入失败'
                });
            }
        })
    });

    //文件上传
    // app.post('/businessMgmt/highFinancialMgmt/custInfo/ExcelUpload.ajax', (req, res, next) => {
    //     let ExcelData = JSON.parse(req.body.ExcelData);
    //     let errorIds = [];
    //     ExcelData.forEach((item, index) => {
    //         for (let prop in item) {
    //             if (item[prop] != 0 && !item[prop]) {
    //                 errorIds.push(index + 1);
    //                 return;
    //             }
    //             item[prop] = String(item[prop]);
    //         }
    //         if (item.index == 0 || isNaN(Number(item.index))) {
    //             errorIds.push(index + 1);
    //             return;
    //         }
    //         if (item.custGroupNo == 0 || isNaN(Number(item.custGroupNo))) {
    //             errorIds.push(index + 1);
    //             return;
    //         }
    //         if (item.custIdno==0&& item.custIdno.length!= 18) {
    //             errorIds.push(index + 1);
    //             return;
    //         }
    //     });
    //     if (errorIds.length > 0) {
    //         return res.send({error: 1, msg: `检测第${errorIds.join(',')}行数据格式有误,请重新确认`, data: null});
    //     }
    //     let option = {
    //         session: req.session,
    //         url: apiUrlList.ExcelUpload,
    //         body: ExcelData,
    //         timeout: 15000,
    //         json: true
    //     };
    //     console.log('/businessMgmt/highFinancialMgmt/custInfo/ExcelUpload.ajax option:', option);
    //     request.post(option, (error, response, body) => {
    //         console.log('/businessMgmt/highFinancialMgmt/custInfo/ExcelUpload.ajax error:', error);
    //         console.log('/businessMgmt/highFinancialMgmt/custInfo/ExcelUpload.ajax statusCode:', response && response.statusCode);
    //         console.log('/businessMgmt/highFinancialMgmt/custInfo/ExcelUpload.ajax body:', body);
    //         if (error) {
    //             return res.send({error: 1, msg: '导入失败', data: null});
    //         }
    //         if (body && body.returnCode == 0) {
    //             res.send({error: 0, msg: '导入成功', data: null});
    //         }
    //         else if (body && body.returnCode == 9999) {
    //             res.send({error: 1, msg: body.returnMsg, data: null});
    //         }
    //         else {
    //             res.send({error: 1, msg: '导入失败', data: null});
    //         }
    //     });
    // });

    // app.post('/businessMgmt/highFinancialMgmt/custInfo/ExcelUpload.ajax', (req, res, next) => {
    //     let form = new formidable.IncomingForm();
    //     // let params = req.body;
    //     // userName = req.session.loginInfo.username;
    //     form.keepExtensions = true;
    //     form.parse(req, (err, fields, files) => {
    //         let formData;
    //         console.log('参数表管理页面表单接收完毕:', fields);
    //         console.log('参数表管理页面表单文件接收完毕:', files);
    //         fs.renameSync(files.file.path, form.uploadDir + "/" + files.file.name) //文件改名
    //         files.file.path = form.uploadDir + "/" + files.file.name //文件改名
    //         console.log("---", files.file.path)
    //         try {
    //             formData = {
    //                 file: fs.createReadStream(path.resolve(files.file.path))
    //             };
    //         } catch (error) {
    //             return res.send({
    //                 error: 1,
    //                 msg: '上传失败',
    //                 data: '上传失败'
    //             });
    //         }
    //         let option = {
    //             session: req.session,
    //             url: apiUrlList.ExcelUpload,
    //             timeout: 30000,
    //             formData: formData,
    //             // qs: {
    //             //     modifyBy: userName,
    //             //     awardsPkgName: fields.awardsPkgName
    //             // }
    //         };
    //         console.log('/businessMgmt/highFinancialMgmt/custInfo/ExcelUpload.ajax option:', option);
    //         request.post(option, (error, response, body) => {
    //             console.log('/businessMgmt/highFinancialMgmt/custInfo/ExcelUpload.ajax error:', error);
    //             console.log('/businessMgmt/highFinancialMgmt/custInfo/ExcelUpload.ajax statusCode:', response && response.statusCode);
    //             console.log('/businessMgmt/highFinancialMgmt/custInfo/ExcelUpload.ajax body:', body);
    //             if (error) {
    //                 return res.send({
    //                     error: 1,
    //                     msg: '上传失败'
    //                 });
    //             }
    //             let result = typeof body === 'string' ? JSON.parse(body) : body;
    //
    //             if (result && result.returnCode == '0') {
    //                 res.send({
    //                     error: 0,
    //                     msg: '上传成功',
    //                     // data: result.body
    //                 });
    //             } else if (result && result.returnCode != 9999) {
    //                 return res.send({error: 1, msg: result.returnMsg});
    //             } else {
    //                 res.send({
    //                     error: 1,
    //                     msg: '上传失败'
    //                 });
    //             }
    //         });
    //     });
    // });
}