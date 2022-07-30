const request = require('./../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').highFinancialMgmt.custGroupMapping;
// const VIPFilePaths = require('../apiConfig').VIPFilePath;
// // const IPOFilePath = require('../apiConfig').IPOFilePath;
// 20210813 高端理财-补充协议配置
const filePath = require('../apiConfig').filePath;
const delFilePath = require('../apiConfig').delFilePath;
const filePathUrl = require('../apiConfig').filePathUrl;
// 20210813 高端理财-补充协议配置
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
module.exports = function (app) {
    // 获取初始数据和查询
    app.post('/businessMgmt/highFinancialMgmt/custGroupMapping/getTableData.ajax', (req, res, next) => {
        let params = {};
        req.body.custGroupNo && (params.custGroupNo = req.body.custGroupNo);
        req.body.pageNum && (params.pageNum = req.body.pageNum);
        req.body.pageSize && (params.pageSize = req.body.pageSize);
        let option = {
            pageUrl: '/businessMgmt/highFinancialMgmt/custGroupMapping/getTableData.ajax',
            req,
            url: apiUrlList.getTableData,
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
            if (result.returnCode == 0 && Array.isArray(result.body.results)) {
                let list = result.body.results;
                list.forEach((item, index) => {
                    if(item.protocolAdd){
                        item['protocolAddUrl'] = filePathUrl + '/highFinancialMgmt/' +  item.protocolAdd;
                    }
                });

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
    // 下拉列表数据
    app.post('/businessMgmt/highFinancialMgmt/custGroupMapping/custList.ajax', (req, res, next) => {
        // let params = {};
        let option = {
            pageUrl: '/businessMgmt/highFinancialMgmt/custGroupMapping/custList.ajax',
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
    app.post('/businessMgmt/highFinancialMgmt/custGroupMapping/fundList.ajax', (req, res, next) => {
        let params = {};
        req.body.pageNum && (params.pageNum = req.body.pageNum);
        req.body.pageSize && (params.pageSize = req.body.pageSize);
        let option = {
            pageUrl: '/businessMgmt/highFinancialMgmt/custGroupMapping/fundList.ajax',
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

    //新增数据
    app.post('/businessMgmt/highFinancialMgmt/custGroupMapping/saveParam.ajax', (req, res, next) => {
        let params = {};
        req.body.custGroupNo && (params.custGroupNo = req.body.custGroupNo);
        req.body.fundId && (params.fundId = req.body.fundId);
        req.body.founder && (params.founder = req.body.founder);
        req.body.protocolAdd && (params.protocolAdd = req.body.protocolAdd);
        req.body.protocolNo && (params.protocolNo = req.body.protocolNo);
        let option = {
            pageUrl: '/businessMgmt/highFinancialMgmt/custGroupMapping/saveParam.ajax',
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

    //删除数据
    app.post('/businessMgmt/highFinancialMgmt/custGroupMapping/deleteParam.ajax', (req, res, next) => {
        let params = req.body || {};
        var protocolNo = req.body.protocolNo;
        let option = {
            pageUrl: '/businessMgmt/highFinancialMgmt/custGroupMapping/deleteParam.ajax',
            req,
            operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.deleteParam + '/' + protocolNo,
            // body: params,
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

                // 20210813 高端理财-补充协议配置
                // 文件删除处理
                try {
                    if (!fs.existsSync(delFilePath)) {
                        fs.mkdirSync(delFilePath)
                    }
                } catch (error) {
                    console.log('/businessMgmt/highFinancialMgmt/custGroupMapping/deleteParam.ajax  del文件夹不存在', error)
                    return res.send({
                        error: 1,
                        msg: '删除失败，文件夹不存在',
                        data: '删除失败，文件夹不存在'
                    });
                }
                var fileName = path.parse(params.protocolAdd);
                console.log('/businessMgmt/highFinancialMgmt/custGroupMapping/deleteParam.ajax  fileName', path.join(filePath, fileName))
                console.log('/businessMgmt/highFinancialMgmt/custGroupMapping/deleteParam.ajax  delFilePath', path.join(delFilePath, fileName))
                try {
                    if (fileName) {
                        fs.renameSync(path.join(filePath, fileName), path.join(delFilePath, fileName)) //文件移动
                    }
                } catch (error) {
                    console.log('/businessMgmt/highFinancialMgmt/custGroupMapping/deleteParam.ajax  文件移动失败', error)
                }
                // 20210813 高端理财-补充协议配置
                
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

    //设置失效状态
    app.post('/businessMgmt/highFinancialMgmt/custGroupMapping/failureSave.ajax', (req, res, next) => {
        let params = {};
        req.body.protocolNo && (params.protocolNo = req.body.protocolNo);
        let option = {
            pageUrl: '/businessMgmt/highFinancialMgmt/custGroupMapping/failureSave.ajax',
            req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.failureSave,
            qs: params,
            timeout: 15000,
            json: true
        };
        request.put(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '设置失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                return res.send({
                    error: 0,
                    msg: '设置成功'
                });
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '设置失败'
                });
            }
        });
    });

    //文件上传
    app.post('/businessMgmt/highFinancialMgmt/custGroupMapping/upload.ajax', (req, res, next) => {
        let form = new formidable.IncomingForm();
        // let VIPFilePath = path.join(VIPFilePaths, 'attach')
        let VIPFilePath = path.join(filePath, 'highFinancialMgmt');
        console.log('VIPFilePath=', VIPFilePath)
        try {
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath)
            }
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
                console.log('/businessMgmt/highFinancialMgmt/custGroupMapping/upload.ajax:', err);
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

            // try {
            //     formData = {
            //         file: fs.createReadStream(path.resolve(files.file.path))
            //     };
            // } catch (error) {
            //     return res.send({
            //         error: 1,
            //         msg:'上传失败',
            //         data:null
            //     });
            // }
            // try {
            //     formData = {
            //         file: fs.createReadStream(path.resolve(files.file.path))
            //     };
            // } catch (error) {
            //     return res.send({
            //         error: 1,
            //         msg:'上传失败',
            //         data:'上传失败'
            //     });
            // }
            // let option = {
            //     session: req.session,
            //     url: apiUrlList.upload,
            //     timeout: 30000,
            //     formData: formData,
            // };
            // console.log('/businessMgmt/highFinancialMgmt/custGroupMapping/upload.ajax option:', option);
            // request.post(option, (error, response, body) => {
            //     console.log('/businessMgmt/highFinancialMgmt/custGroupMapping/upload.ajax error:', error);
            //     console.log('/businessMgmt/highFinancialMgmt/custGroupMapping/upload.ajax statusCode:', response && response.statusCode);
            //     console.log('/businessMgmt/highFinancialMgmt/custGroupMapping/upload.ajax body:', body);
            //     if (error) {
            //         return res.send({
            //             error: 1,
            //             msg: '上传失败'
            //         });
            //     }
            //     let result = typeof body === 'string' ? JSON.parse(body) : body;
            //
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
    app.get('/businessMgmt/highFinancialMgmt/custGroupMapping/download.ajax', (req, res, next) => {
        var params = {
            protocolAdd: req.query.protocolAdd
        };
        var fileType = ['.doc', '.docx', '.pdf']
        var ext = path.parse(params.protocolAdd).ext
        console.log('/businessMgmt/IPOMgmtEC/IPOUpload/download.ajax params:', params);
        var directory = ''
        if (fileType.includes(ext)) {
            // directory = 'attach'
            directory = 'highFinancialMgmt'
        } else {
            res.send({
                error: 1,
                msg: '下载失败',
                data: null
            })
        }
        try {
            // console.log(path.join(VIPFilePath, params.protocolAdd))
            // res.download(path.join(VIPFilePath, params.protocolAdd))
            // console.log(filePath + '/' + directory + '/' +  params.protocolAdd);
            // res.download(filePath + '/' + directory + '/' +  params.protocolAdd);
            console.log(filePathUrl + '/' + directory + '/' +  params.protocolAdd);
            res.redirect(filePathUrl + '/' + directory + '/' +  params.protocolAdd);
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