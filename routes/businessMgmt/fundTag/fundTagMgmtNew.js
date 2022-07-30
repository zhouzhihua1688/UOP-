const request = require('./../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').fundTag.fundTagMgmtNew;
const XLSX = require('xlsx');
const fs = require('fs');
module.exports = function (app) {
    // 获取初始数据和查询
    app.post('/businessMgmt/fundTag/fundTagMgmtNew/getTableData.ajax', (req, res, next) => {
        let params = {};
        req.body.pageNum && (params.pageNum = req.body.pageNum);
        req.body.pageSize && (params.pageSize = req.body.pageSize);
        let option = {
            pageUrl: '/businessMgmt/fundTag/fundTagMgmtNew/getTableData.ajax',
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
            if (result && result.returnCode == '0') {
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
    //新增基金标签配置
    app.post('/businessMgmt/fundTag/fundTagMgmtNew/saveParam.ajax', (req, res, next) => {
        let params = {};
        // req.body.tagid && (params.tagid = req.body.tagid);
        req.body.tagnm && (params.tagnm = req.body.tagnm);
        let option = {
            pageUrl: '/businessMgmt/fundTag/fundTagMgmtNew/saveParam.ajax',
            req,
            url: apiUrlList.saveParam,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '新增失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                return res.send({
                    error: 0,
                    msg: '新增成功'
                });
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '新增失败'
                });
            }
        });
    });
    //修改基金标签配置
    app.post('/businessMgmt/fundTag/fundTagMgmtNew/update.ajax', (req, res, next) => {
        let params = {};
        req.body.tagid && (params.tagid = req.body.tagid);
        req.body.tagnm && (params.tagnm = req.body.tagnm);
        req.body.serialno && (params.serialno = req.body.serialno);
        let option = {
            pageUrl: '/businessMgmt/fundTag/fundTagMgmtNew/update.ajax',
            req,
            url: apiUrlList.update,
            body: params,
            timeout: 15000,
            json: true
        };
        request.patch(option, (error, response, body) => {
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
    // 详细属性
    app.post('/businessMgmt/fundTag/fundTagMgmtNew/attribute.ajax', (req, res, next) => {
        // let params = {};
        var tagId = req.body.tagId;
        let option = {
            pageUrl: '/businessMgmt/fundTag/fundTagMgmtNew/attribute.ajax',
            req,
            url: apiUrlList.attribute + '/' + tagId + '/query/collections',
            qs:req.body,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
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
    //删除标签数据
    app.post('/businessMgmt/fundTag/fundTagMgmtNew/deleteParam.ajax', (req, res, next) => {
        let params = {};
        req.body.tagId && (params.tagId = req.body.tagId);
        let option = {
            pageUrl: '/businessMgmt/fundTag/fundTagMgmtNew/deleteParam.ajax',
            req,
            url: apiUrlList.deleteParam,
            qs: params,
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
                    msg: '标签下面还有标签!'
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '删除失败'
                });
            }
        });
    });

    app.post('/businessMgmt/fundTag/fundTagMgmtNew/queryChannel.ajax', (req, res, next) => {
        let params = {};
        let option = {
            pageUrl: '/businessMgmt/fundTag/fundTagMgmtNew/queryChannel.ajax',
            req,
            url: apiUrlList.queryChannel,
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
            if (result && result.returnCode == '0') {
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

    //详细属性-新增
    app.post('/businessMgmt/fundTag/fundTagMgmtNew/AddList.ajax', (req, res, next) => {
        let params = {};
        req.body.tagid && (params.tagid = req.body.tagid);
        req.body.tagvalue && (params.tagvalue = req.body.tagvalue);
        req.body.tagdesc && (params.tagdesc = req.body.tagdesc);
        req.body.channel && (params.channel = req.body.channel);
        let option = {
            pageUrl: '/businessMgmt/fundTag/fundTagMgmtNew/AddList.ajax',
            req,
            url: apiUrlList.AddList,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '新增失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                return res.send({
                    error: 0,
                    msg: '新增成功'
                });
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '新增失败'
                });
            }
        });
    });
    //详细属性-修改标签描述
    app.post('/businessMgmt/fundTag/fundTagMgmtNew/modifyUpdate.ajax', (req, res, next) => {
        let params = {};
        req.body.tagid && (params.tagid = req.body.tagid);
        req.body.tagvalue && (params.tagvalue = req.body.tagvalue);
        req.body.tagdesc && (params.tagdesc = req.body.tagdesc);
        req.body.serialno && (params.serialno = req.body.serialno);
        req.body.version && (params.version = req.body.version);
        let option = {
            pageUrl: '/businessMgmt/fundTag/fundTagMgmtNew/modifyUpdate.ajax',
            req,
            url: apiUrlList.modifyUpdate,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
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
    //详细属性-删除标签描述
    app.post('/businessMgmt/fundTag/fundTagMgmtNew/deleteList.ajax', (req, res, next) => {
        let params = {};
        req.body.tagId && (params.tagId = req.body.tagId);
        req.body.tagValue && (params.tagValue = req.body.tagValue);
        let option = {
            pageUrl: '/businessMgmt/fundTag/fundTagMgmtNew/deleteList.ajax',
            req,
            url: apiUrlList.deleteList,
            qs: params,
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
    //详细属性-批量删除标签
    app.post('/businessMgmt/fundTag/fundTagMgmtNew/deleteAll.ajax', (req, res, next) => {
        let params = {};
        req.body.tagId && (params.tagId = req.body.tagId);
        req.body.tagValueList && (params.tagValueList = JSON.parse(req.body.tagValueList).join(','));
        let option = {
            pageUrl: '/businessMgmt/fundTag/fundTagMgmtNew/deleteAll.ajax',
            req,
            url: apiUrlList.deleteAll,
            qs: params,
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
    // 导出全量
    app.get('/businessMgmt/fundTag/fundTagMgmtNew/exportAll.ajax', (req, res, next) => {
        // let result = [
        //     {
        //         tagId: '0020',
        //         tagName: 'aaa',
        //         childTag: [{
        //             tagId:'0021',
        //             tagName: 'bbb'
        //         }]
        //     }
        // ];

        let getParentTagInfo = new Promise((resolve, reject) => {
            let option = {
                pageUrl: '/businessMgmt/fundTag/fundTagMgmtNew/exportAll.ajax',
                req,
                url: apiUrlList.getTableData,
                timeout: 15000,
                json: true
            };
            request(option, (error, response, body) => {
                if (error) {
                    reject({
                        message: '获取主标签ID失败'
                    });
                }
                console.log("body---:", body)
                if (body && body.returnCode == 0 && Array.isArray(body.body)) {
                    resolve(body.body.map(item => {
                        let obj = {};
                        obj.tagId = item.tagid;
                        obj.tagName = item.tagnm;
                        obj.childTag = [];
                        return obj;
                    }));
                } else if (body.returnCode != 0 && body.returnCode != 9999) {
                    reject({
                        message: body.returnMsg
                    });
                } else {
                    reject({
                        message: '获取主标签ID失败'
                    });
                }
            });
        });

        function getChildTagInfoByTagId(item) {
            return new Promise((resolve, reject) => {
                let option = {
                    pageUrl: '/businessMgmt/fundTag/fundTagMgmtNew/exportAll.ajax',
                    req,
                    url: apiUrlList.getTagDetail[0] + item.tagId + apiUrlList.getTagDetail[1],
                    qs: {
                        tagId: item.tagId
                    },
                    timeout: 15000,
                    json: true
                };
                console.log("***", option)
                request(option, (error, response, body) => {
                    if (error) {
                        reject({
                            message: '获取子标签ID失败'
                        });
                    }
                    console.log("***body***:", body)
                    if (body && body.returnCode == 0 && Array.isArray(body.body)) {
                        item.childTag = body.body.map(item => {
                            let obj = {};
                            obj.tagId = item.tagvalue;
                            obj.tagName = item.tagdesc;
                            return obj;
                        });
                        resolve();
                    } else if (body.returnCode != 0 && body.returnCode != 9999) {
                        reject({
                            message: body.returnMsg
                        });
                    } else {
                        reject({
                            message: '获取子标签ID失败'
                        });
                    }
                });
            });
        }

        getParentTagInfo.then(parentTagList => {
            Promise.all(parentTagList.map(item => getChildTagInfoByTagId(item))).then(() => {
                let ExcelData = [
                    ['标签代码', '标签名称', '次级标签ID', '次级标签名称']
                ];
                parentTagList.forEach(parentTagInfo => {
                    parentTagInfo.childTag.forEach(childTagInfo => {
                        ExcelData.push([
                            parentTagInfo.tagId,
                            parentTagInfo.tagName,
                            childTagInfo.tagId,
                            childTagInfo.tagName
                        ]);
                    });
                });
                const stream = require('stream');
                const book = XLSX.utils.book_new();
                const sheet = XLSX.utils.aoa_to_sheet(ExcelData);
                XLSX.utils.book_append_sheet(book, sheet, "test");
                const fileContents = XLSX.write(book, {
                    type: 'buffer',
                    bookType: 'xlsx',
                    bookSST: false
                });
                let readStream = new stream.PassThrough();
                readStream.end(fileContents);
                let myDate = new Date();
                let mytime = myDate.toLocaleDateString();
                let fileName = mytime + ".xlsx";
                res.set('Content-disposition', 'attachment; filename=' + fileName);
                res.set('Content-Type', 'text/plain');
                readStream.pipe(res);
            }).catch(error => {
                res.send({
                    error: 1,
                    msg: error.message,
                    data: null
                });
            });
        }).catch(error => {
            res.send({
                error: 1,
                msg: error.message,
                data: null
            });
        });
    });
};