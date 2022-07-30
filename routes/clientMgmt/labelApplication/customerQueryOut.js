const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').labelApplication.customerQueryOut;
// const clientMgmtFilePath = require('../apiConfig').clientMgmtFilePath;
// const XLSX = require('xlsx');
// const node_xlsx = require('node-xlsx');
// const formidable = require('formidable');
// const fs = require('fs');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
module.exports = function (app) {
    // 获取列表数据
    // app.post('/clientMgmt/information/informationQuery/getTableData.ajax', (req, res, next) => {
    //     let params = {};
    //     req.body.pageNo && (params.pageNo = req.body.pageNo);
    //     req.body.pageSize && (params.pageSize = req.body.pageSize);
    //     params.fundAcct = req.body.fundAcct;
    //     params.idNo = req.body.idNo;
    //     params.tradeAcct = req.body.tradeAcct;
    //     let option = {
    //         // pageUrl: '/clientMgmt/information/informationQuery/getTableData.ajax',
    //         req: req,
    //         url: apiUrlList.getTableData,
    //         body: params,
    //         timeout: 15000,
    //         json: true
    //     };
    //     console.log('/clientMgmt/information/informationQuery/getTableData.ajax option:', option.req ? {
    //         ...option,
    //         req: '#',
    //         body: '******'
    //     } : option);
    //     request.post(option, (error, response, body) => {
    //         console.log('/clientMgmt/information/informationQuery/getTableData.ajax error:', error);
    //         console.log('/clientMgmt/information/informationQuery/getTableData.ajax statusCode:', response && response.statusCode);
    //         console.log('/clientMgmt/information/informationQuery/getTableData.ajax body: ******');
    //         if (error) {
    //             return res.send({
    //                 error: 1,
    //                 msg: '查询失败'
    //             });
    //         }
    //         let result = typeof body === 'string' ? JSON.parse(body) : body;
    //         if (result.returnCode == 0 && Array.isArray(result.body.riskAssesses)) {
    //             let resultData = {};
    //             resultData.pageNo = params.pageNo; //页数
    //             // resultData.pageNum = result.body.pageNum; //页数
    //             resultData.totalSize = Math.ceil(result.body.total / params.pageSize); //总页数d;//总页数
    //             // resultData.totalSize =result.body.total;
    //             resultData.tableData = result.body.riskAssesses;
    //             return res.send({
    //                 error: 0,
    //                 msg: '查询成功',
    //                 data: resultData
    //             });
    //         } else if (result && result.returnCode != 9999) {
    //             return res.send({
    //                 error: 1,
    //                 msg: result.returnMsg
    //             });
    //         } else {
    //             return res.send({
    //                 error: 1,
    //                 msg: '查询失败'
    //             });
    //         }
    //     });
    //
    // });

    //fundid查询基金经理信息
    app.post('/clientMgmt/labelApplication/customerQueryOut/managerParam.ajax', (req, res, next) => {
        let params = {};
        params.pmst = req.body.fundId;
        let option = {
            pageUrl: '/clientMgmt/labelApplication/customerQueryOut/managerParam.ajax',
            req,
            url: apiUrlList.managerParam+'/'+req.body.fundId+'/managers/collections',
            // qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '操作失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0) {
                return res.send({
                    error: 0,
                    msg: '获取成功',
                    data: result
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
    //fundid查询基金信息
    app.post('/clientMgmt/labelApplication/customerQueryOut/detailsParam.ajax', (req, res, next) => {
        let params = {};
        params.pmst = req.body.fundId;
        let option = {
            pageUrl: '/clientMgmt/labelApplication/customerQueryOut/detailsParam.ajax',
            req,
            url: apiUrlList.detailsParam+'/'+req.body.fundId+'/info/base',
            // qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '操作失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0) {
                return res.send({
                    error: 0,
                    msg: '获取成功',
                    data: result
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

    //获取模型名称
    app.post('/clientMgmt/labelApplication/customerQueryOut/getModelName.ajax', (req, res, next) => {
        let params = {};
        // params.scenario=req.body.scenario;
        // params.prdAtts=req.body.prdAtts;
        let option = {
            pageUrl: '/clientMgmt/labelApplication/customerQueryOut/getModelName.ajax',
            req,
            url: apiUrlList.getModelName+'?scenario='+req.body.scenario,
            // qs:req.body.scenario,
            body:JSON.parse(req.body.prdAtts),
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '操作失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0) {
                return res.send({
                    error: 0,
                    msg: '获取成功',
                    data: result
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

    //客群查询输出数据
    app.post('/clientMgmt/labelApplication/customerQueryOut/customerParam.ajax', (req, res, next) => {
        let params = {};
        params.fundMgrs=JSON.parse(req.body.fundMgrs);
        params.mdlId=req.body.mdlId;
        params.mdlVer=req.body.mdlVer;
        params.prdId=req.body.prdId;
        params.scenario=req.body.scenario;
        params.prdRiskLvl= req.body.prdRiskLvl;   //风险等级
        params.marketLvl = req.body.marketLvl;   //营销优先级
        let option = {
            pageUrl: '/clientMgmt/labelApplication/customerQueryOut/customerParam.ajax',
            req,
            url: apiUrlList.customerParam+`/${params.mdlId}/${params.mdlVer}/custs`,
            body:params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '操作失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0) {
                return res.send({
                    error: 0,
                    msg: '获取成功',
                    data: result
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

    // 查询客群模型输出客户日志
    app.post('/clientMgmt/labelApplication/customerQueryOut/queryCustDaily.ajax', (req, res, next) => {
        let params = {};
        params.mdlId=req.body.mdlId;
        params.mdlVer=req.body.mdlVer;
        params.pageNo='1';
        params.pageSize='1000';
        let option = {
            pageUrl: '/clientMgmt/labelApplication/customerQueryOut/queryCustDaily.ajax',
            req,
            url: apiUrlList.queryCustDaily,
            body:params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '操作失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0) {
                return res.send({
                    error: 0,
                    msg: '获取成功',
                    data: result
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

    // 按风险等级和推荐级别下载按钮
    app.post('/clientMgmt/labelApplication/customerQueryOut/takeDateParam.ajax', (req, res, next) => {
        let params = {};
        params.expCustSerialNo=req.body.expCustSerialNo;
        params.recmLvl=req.body.recmLvl;
        params.riskLvl=req.body.riskLvl;
        params.mdlId=req.body.mdlId;
        params.mdlVer=req.body.mdlVer;
        let option = {
            pageUrl: '/clientMgmt/labelApplication/customerQueryOut/takeDateParam.ajax',
            req,
            url: apiUrlList.takeDateParam+`/${params.mdlId}/${params.mdlVer}/cust-grps`,
            body:params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '操作失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0) {
                return res.send({
                    error: 0,
                    msg: '获取成功',
                    data: result
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

    //推送按钮-推送至系统
    app.post('/clientMgmt/labelApplication/customerQueryOut/pushParams.ajax', (req, res, next) => {
        let params = {};
        params.expCustSerialNo=req.body.expCustSerialNo;
        params.recmLvl=req.body.recmLvl;
        params.riskLvl=req.body.riskLvl;
        params.pushToSys=req.body.pushToSys;
        params.remark=req.body.remark;
        params.custGrpId=req.body.custGrpId;
        params.prjId=req.body.prjId;
        params.mdlId=req.body.mdlId;
        params.mdlVer=req.body.mdlVer;
        let option = {
            pageUrl: '/clientMgmt/labelApplication/customerQueryOut/pushParams.ajax',
            req,
            url: apiUrlList.pushParam+`/${params.mdlId}/${params.mdlVer}/cust-grps`,
            body:params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '操作失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0) {
                return res.send({
                    error: 0,
                    msg: '获取成功',
                    data: result
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

    // 点击查看按钮-查询客群模型输出客群日志
    app.post('/clientMgmt/labelApplication/customerQueryOut/lookUpParam.ajax', (req, res, next) => {
        let params = {};

        params.expCustSerialNo=req.body.expCustSerialNo;
        params.expTp=req.body.expTp;
        let option = {
            pageUrl: '/clientMgmt/labelApplication/customerQueryOut/lookUpParam.ajax',
            req,
            url: apiUrlList.lookUpParam,
            qs:params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '操作失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0) {
                return res.send({
                    error: 0,
                    msg: '获取成功',
                    data: result
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

    //获取信息
    app.post('/clientMgmt/labelApplication/customerQueryOut/scenarioParam.ajax', (req, res, next) => {
        let params = {};
        params.pmst = req.body.pmst;
        params.pmkey = req.body.pmkey;
        params.pmco = req.body.pmco;
        let option = {
            pageUrl: '/clientMgmt/labelApplication/customerQueryOut/scenarioParam.ajax',
            req,
            url: apiUrlList.scenarioParam,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '操作失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0) {
                return res.send({
                    error: 0,
                    msg: '获取成功',
                    data: result
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

    //获取客群ID信息
    app.post('/clientMgmt/labelApplication/customerQueryOut/getGroupParam.ajax', (req, res, next) => {
        let params = {};
        params.status = req.body.status;
        let option = {
            pageUrl: '/clientMgmt/labelApplication/customerQueryOut/getGroupParam.ajax',
            req,
            url: apiUrlList.getGroupParam,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '操作失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0) {
                return res.send({
                    error: 0,
                    msg: '获取成功',
                    data: result
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

    //获取外呼项目
    app.post('/clientMgmt/labelApplication/customerQueryOut/getCallParam.ajax', (req, res, next) => {
        let params = {};
        params.interfacecode=req.body.interfacecode;
        params.apikey=req.body.apikey;
        let option = {
            pageUrl: '/clientMgmt/labelApplication/customerQueryOut/getCallParam.ajax',
            req,
            url: apiUrlList.getCallParam,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '操作失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.code==1) {
                return res.send({
                    error: 0,
                    msg: '获取成功',
                    data: result
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
    // 下载数据
    // app.get('/clientMgmt/labelApplication/customerQueryOut/exportAll.ajax', (req, res, next) => {
    //     var params = {
    //         dataFile: req.body.dataFile
    //     };
    //
    //     // var filename = req.query.dataFile;
    //     // console.log("filename",filename);
    //     //
    //     // var path=path.join(clientMgmtFilePath, filename);
    //     // var fileStream = fs.createReadStream(path);
    //     // res.setHeader('Content-type', 'application/octet-stream');
    //     // // res.setHeader('Content-Disposition', 'attachment;filename=1.pdf');
    //     // res.setHeader('Content-Disposition', 'attachment; filename=' + encodeURIComponent(filename));
    //     // fileStream.on('data', function (data) {
    //     //     res.write(data, 'binary');
    //     // });
    //     // fileStream.on('end', function () {
    //     //     res.end();
    //     // });
    //
    //     //
    //     // try {
    //     //     var filePath=path.join(clientMgmtFilePath, filename);
    //     //     var size = fs.statSync(filePath).size;
    //     //     var f = fs.createReadStream(filePath);
    //     //     res.writeHead(200, {
    //     //         'Content-Type': 'application/force-download',
    //     //         'Content-Disposition': 'attachment; filename=' + encodeURIComponent(filename),
    //     //         'Content-Length': size
    //     //     });
    //     //     f.pipe(res);
    //     // } catch (err) {
    //     //     console.log(err)
    //     // }
    //
    //     // let { filename,mimeType } = req.body;
    //     //
    //     // let type = getType(mimeType);  //获取文件后缀名
    //
    //     // var ext = path.parse(params.dataFile).ext;  //获取文件后缀名
    //     // path='./public/showPdf/'+filename+'.'+type;
    //
    //     // path='./public/showPdf/'+filename+'.'+type;
    //     // console.log(path);
    //
    //
    //     // fs.readFile(path, (err, data) => {
    //     //     if (err) {
    //     //         throw err
    //     //     }
    //     //     res.setHeader('Content-Type',mimeType)
    //     //     // 设置文件名
    //     //     // Content-disposition 是 MIME 协议的扩展，MIME 协议指示 MIME 用户代理如何显示附加的文件
    //     //     // attachment 以附件形式下载
    //     //     res.setHeader('Content-Disposition', `attachment; filename=${filename}.${type}`)
    //     //     // 返回数据
    //     //     res.end(data)
    //     // })
    //
    //     var fileType = ['.doc', '.docx', '.pdf']
    //     var ext = path.parse(params.dataFile).ext
    //     console.log('/clientMgmt/labelApplication/customerQueryOut/exportAll.ajax params:', params);
    //     var directory = ''
    //     if (fileType.includes(ext)) {
    //         directory = 'attach'
    //     } else {
    //         res.send({
    //             error: 1,
    //             msg: '下载失败',
    //             data: null
    //         })
    //     }
    //     try {
    //         console.log(path.join(VIPFilePaths, directory, params.dataFile))
    //         res.download(path.join(VIPFilePaths, directory, params.dataFile))
    //     } catch (error) {
    //         console.log('error', error)
    //         res.send({
    //             error: 1,
    //             msg: '下载失败',
    //             data: null
    //         })
    //     }
    // });

    //  下载
    app.get('/clientMgmt/labelApplication/customerQueryOut/exportAll.ajax', (req, res, next) => {
        var params = {
            dataFile:req.query.dataFile,
            expDt:req.query.expDt,
            serialNo:req.query.serialNo,
        };
        console.log("dataFile",params.dataFile);
        console.log("expDt",params.expDt);
        console.log("serialNo",params.serialNo);
        var fileType = ['.doc', '.docx', '.pdf','.dat','.list','.csv'];
        var ext = path.parse(params.dataFile).ext;
        console.log("ext",ext);
        console.log('/clientMgmt/labelApplication/customerQueryOut/exportAll.ajax params:', params);
        // var directory = ''
        // if (!fileType.includes(ext)) {
        //     // directory = 'attach'
        //     res.send({
        //         error: 1,
        //         msg: '下载失败',
        //         data: null
        //     })
        // }
        // else {
        //     res.send({
        //         error: 1,
        //         msg: '下载失败',
        //         data: null
        //     })
        // }

        var directory = '';
        if (fileType.includes(ext)) {
            directory = 'custgrp'+`/${params.expDt}`+`/${params.serialNo}`;
        } else {
            res.send({
                error: 1,
                msg: '下载失败',
                data: null
            })
        }
        try {
            console.log(path.join(apiUrlList.clientMgmtFilePath,directory,params.dataFile));
            res.download(path.join(apiUrlList.clientMgmtFilePath,directory,params.dataFile));
        } catch (error) {
            console.log('error', error)
            res.send({
                error: 1,
                msg: '下载失败',
                data: null
            })
        }
    });
    // 重新导入查询
    app.post('/clientMgmt/labelApplication/customerQueryOut/againImport.ajax', (req, res, next) => {
        let params = {};
        params.serialNo=req.body.serialNo;
        let option = {
            pageUrl: '/clientMgmt/labelApplication/customerQueryOut/againImport.ajax',
            req,
            url: apiUrlList.againImport+`/${params.serialNo}/custs`,
            // qs:params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '导入失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0) {
                return res.send({
                    error: 0,
                    msg: '导入成功',
                    data: result
                });
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '导入失败'
                });
            }
        });

    });
};