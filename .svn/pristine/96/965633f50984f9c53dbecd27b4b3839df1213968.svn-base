const request = require('./../../../local_data/requestWrapper');
const original_request = require('request');
const apiUrlList = require('../apiConfig').investmentInformationDisclosure.reportMgmt;
const request_obs = require('../../../local_data/request_obs');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const investTableName = 'uop_log_invest';
module.exports = function (app) {
    // 获取所有组合
    app.post('/investmentMgmt/investmentInformationDisclosure/reportMgmt/fundGroups.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/investmentMgmt/investmentInformationDisclosure/reportMgmt/fundGroups.ajax',
            req,
            url: apiUrlList.fundGroups,
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
                let resultData = result.body.filter((item)=>{
                    return item.isInvestment=='Y'
                });
                return res.send({
                    error: 0,
                    msg: '获取成功',
                    data: resultData
                });
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg,
                    data: null
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '获取失败',
                    data: null
                });
            }
        });
    });
    // 获取列表数据
    app.post('/investmentMgmt/investmentInformationDisclosure/reportMgmt/getTableData.ajax', (req, res, next) => {
        let params = {};
        params.reportId = req.body.reportId;
        params.groupId = req.body.groupId;
        let option = {
            pageUrl: '/investmentMgmt/investmentInformationDisclosure/reportMgmt/getTableData.ajax',
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
            if (result && result.returnCode == 0) {
                return res.send({
                    error: 0,
                    msg: '查询成功',
                    data: result.body
                });
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg,
                    data: null
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '查询失败',
                    data: null
                });
            }
        });
    });
    // 录入
    app.post('/investmentMgmt/investmentInformationDisclosure/reportMgmt/saveParam.ajax', (req, res, next) => {
        let params = {};
        params.reportName = req.body.reportName;
        params.reportUrl = req.body.reportUrl;
        let option = {
            pageUrl: '/investmentMgmt/investmentInformationDisclosure/reportMgmt/getsaveParamTableData.ajax',
            req,
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.saveParam,
            body: params,
            timeout: 15000,
            json: true,
            investBody:params,
            mappingKeyWords:'reportMgmt'

        };
        request.post(option, (error, response, body) => {
            sysLogger(option.operateType, req, option, body, investTableName);
            if (error) {
                return res.send({
                    error: 1,
                    msg: '录入失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                return res.send({
                    error: 0,
                    msg: '录入成功',
                    data: null
                });
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg,
                    data: null
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '录入失败',
                    data: null
                });
            }
        });
    });
    // 删除
    app.post('/investmentMgmt/investmentInformationDisclosure/reportMgmt/deleteParam.ajax', (req, res, next) => {
        let params = {};
        params.reportId = req.body.reportId;
        let recordParams = {reportName:req.body.reportName};
        let option = {
            pageUrl: '/investmentMgmt/investmentInformationDisclosure/reportMgmt/deleteParam.ajax',
            req,
            operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.deleteParam,
            qs: params,
            timeout: 15000,
            json: true,
            investBody:recordParams,
            mappingKeyWords:'reportMgmt'
        };
        request.delete(option, (error, response, body) => {
            sysLogger(option.operateType, req, option, body, investTableName);
            if (error) {
                return res.send({
                    error: 1,
                    msg: '删除失败',
                    data: null
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                return res.send({
                    error: 0,
                    msg: '删除成功',
                    data: null
                });
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '删除失败',
                    data: null
                });
            }
        });
    });
    // 关联
    app.post('/investmentMgmt/investmentInformationDisclosure/reportMgmt/relationParam.ajax', (req, res, next) => {
        let params = {};
        params.groupIdList = JSON.parse(req.body.groupIdList);
        params.reportId = req.body.reportId;
        let recordParams = {
            reportName:req.body.reportName,
            groupIdList:JSON.parse(req.body.groupIdList)
        }
        let option = {
            pageUrl: '/investmentMgmt/investmentInformationDisclosure/reportMgmt/relationParam.ajax',
            req,
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.relationParam,
            body: params,
            timeout: 15000,
            json: true,
            investBody:recordParams,
            mappingKeyWords:'reportMgmt'
        };
        request.post(option, (error, response, body) => {
            sysLogger(option.operateType, req, option, body, investTableName);
            if (error) {
                return res.send({
                    error: 1,
                    msg: '操作失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                return res.send({
                    error: 0,
                    msg: '操作成功'
                });
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '操作失败'
                });
            }
        });
    });
    //文件上传
    app.post('/investmentMgmt/investmentInformationDisclosure/reportMgmt/upload.ajax', (req, res, next) => {
        let form = new formidable.IncomingForm();
        form.keepExtensions = true;
        form.parse(req, (err, fields, files) => {
            if (err) {
                console.log('/investmentMgmt/investmentInformationDisclosure/reportMgmt/upload.ajax:', err);
                return res.send({
                    error: 1,
                    msg: '上传文件失败',
                    data: null
                });
            }
            console.log('文件接收完毕:', files);
            let option = {
                body: {
                    container: 'groupReport',
                    keyStoneName:"newecc",
                    keyStonePassword:"newecc",
                    objectName: encodeURIComponent(files.file.name),
                },
                
            };

            request_obs(option).then(tokenInfo => {
                // let tokenParams = {
                // 	url: tokenInfo.url,
                // 	headers: {
                // 		'X-Auth-Token': tokenInfo.token
                // 	}
                // };
                let tokenParams = {
                    url: tokenInfo.uri.href,
                    headers: tokenInfo.headers,
                };
                console.log('/investmentMgmt/investmentInformationDisclosure/reportMgmt/upload.ajax --tokenParams:', tokenParams);
                fs.createReadStream(files.file.path).pipe(original_request.put(tokenParams));
                let params = {};
                params.reportName = files.file.name;
                let option = {
                    pageUrl: '/investmentMgmt/investmentInformationDisclosure/reportMgmt/upload.ajax',
                    req,
                    operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
                    url: apiUrlList.saveParam,
                    body: params,
                    timeout: 15000,
                    json: true,
                    investBody:params,
                    mappingKeyWords:'reportMgmt'
                };
                request.post(option, (error, response, body) => {
                    sysLogger(option.operateType, req, option, body, investTableName);
                    if (error) {
                        return res.send({
                            error: 1,
                            msg: '上传文件成功,录入失败'
                        });
                    }
                    let result = typeof body === 'string' ? JSON.parse(body) : body;
                    if (result && result.returnCode == 0) {
                        return res.send({
                            error: 0,
                            msg: '上传文件成功并录入成功',
                            data: null
                        });
                    } else if (result && result.returnCode != 9999) {
                        return res.send({
                            error: 1,
                            msg: result.returnMsg,
                            data: null
                        });
                    } else {
                        return res.send({
                            error: 1,
                            msg: '上传文件成功但录入失败',
                            data: null
                        });
                    }
                });
            }).catch(error => {
                return res.send({
                    error: 1,
                    msg: '上传文件失败',
                    data: null
                });
            });
        });
    });
    // 下载
    app.get('/investmentMgmt/investmentInformationDisclosure/reportMgmt/exportFile.ajax', (req, res, next) => {
        let option = {
            body: {
                container: 'groupReport',
                keyStoneName:"newecc",
                keyStonePassword:"newecc",
                objectName: encodeURIComponent(req.query.reportName),
            }
        };
        request_obs(option).then(tokenInfo => {
            // console.log("---",tokenInfo)
            let tokenParams = {
                url: tokenInfo.uri.href,
                headers: tokenInfo.headers,
            };
            // let tokenParams = {
            //     url: tokenInfo.url,
            //     headers: {
            //         'X-Auth-Token': tokenInfo.token
            //     }
            // };
            console.log('/investmentMgmt/investmentInformationDisclosure/reportMgmt/exportFile.ajax --tokenParams:', tokenParams);
            let body = original_request(tokenParams);
            body.on('response', function (response) {
                if (response.statusCode !== 200) {
                    return res.send({
                        error: 1,
                        msg: '该报告文件是执行录入操作,不是PDF文件,因此下载失败,请执行上传操作才可以下载',
                        data: null
                    });
                } else {
                    return body.pipe(res);
                }
            });
        }).catch(error => {
            res.send({
                error: 1,
                msg: '下载失败',
                data: null
            })
        });
    });
    // 获取编辑信息
    app.post('/investmentMgmt/investmentInformationDisclosure/reportMgmt/getReportInfo.ajax', (req, res, next) => {
        let params = {};
        params.reportId = req.body.reportId;
        let option = {
            pageUrl: '/investmentMgmt/investmentInformationDisclosure/reportMgmt/getReportInfo.ajax',
            req,
            url: apiUrlList.getReportInfo,
            qs: params,
            timeout: 15000,
            json: true,
           
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '查询失败'});
            }
            if (body.returnCode == 0) {
                return res.send({error: 0, msg: '查询成功', data: body.body});
            } else if (body.returnCode != 9999) {
                return res.send({error: 1, msg: body.returnMsg, data: null});
            } else {
                return res.send({error: 1, msg: '查询失败', data: null});
            }
        });
    });
    // 保存编辑信息
    app.post('/investmentMgmt/investmentInformationDisclosure/reportMgmt/saveReportInfo.ajax', (req, res, next) => {
        let investBody = JSON.parse(JSON.stringify(req.body));
        investBody.periodType == '1'?investBody.periodType='月报':investBody.periodType='季报';
        delete investBody['reportId'];
        let option = {
            pageUrl: '/investmentMgmt/investmentInformationDisclosure/reportMgmt/saveReportInfo.ajax',
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码,
            req,
            url: apiUrlList.saveReportInfo,
            body: req.body,
            timeout: 15000,
            json: true,
            investBody,
            mappingKeyWords:'reportMgmt'
        };
        request.post(option, (error, response, body) => {
            try {
                sysLogger(option.operateType, req, option, body, investTableName);
            } catch (error) {
                return res.send({error: 1, msg: error});
            }
            if (error) {
                return res.send({error: 1, msg: '修改失败'});
            }
            if (body.returnCode == 0) {
                return res.send({error: 0, msg: '修改成功', data: null});
            } else if (body.returnCode != 9999) {
                return res.send({error: 1, msg: body.returnMsg, data: null});
            } else {
                return res.send({error: 1, msg: '修改失败', data: null});
            }
        });
    });
};