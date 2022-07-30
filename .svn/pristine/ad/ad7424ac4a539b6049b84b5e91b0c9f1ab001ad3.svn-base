const request = require('./../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').fundTag.fundTagSetting;
const XLSX = require('xlsx');
const node_xlsx = require('node-xlsx');
const formidable = require('formidable');
const fs = require('fs');
module.exports = function (app) {
    // 获取初始数据和查询
    app.post('/businessMgmt/fundTag/fundTagSetting/getTableData.ajax', (req, res, next) => {
        let params = {};
        var fundId = req.body.fundId
        // req.body.fundId && (params.fundId = req.body.fundId);
        let option = {
            pageUrl: '/businessMgmt/fundTag/fundTagSetting/getTableData.ajax',
            req,
            url: apiUrlList.getTableData,
            // url: apiUrlList.getTableData+'/'+fundId+'/tags/query/collections',
            // body: params,
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
    //批量删除数据
    app.post('/businessMgmt/fundTag/fundTagSetting/deleteParam.ajax', (req, res, next) => {
        let params = {};
        req.body.fundIds && (params.fundIds = JSON.parse(req.body.fundIds));
        let option = {
            pageUrl: '/businessMgmt/fundTag/fundTagSetting/deleteParam.ajax',
            req,
            url: apiUrlList.deleteParam,
            body: params.fundIds,
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
    //新增基金标签数据
    app.post('/businessMgmt/fundTag/fundTagSetting/saveBatch.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/businessMgmt/fundTag/fundTagSetting/saveBatch.ajax',
            req,
            url: apiUrlList.saveBatch,
            body: JSON.parse(req.body.arr),
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
                    msg: "变量为空校验不通过或者已有相同记录"
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '保存失败'
                });
            }
        });
    });
    //导入
    app.post('/businessMgmt/fundTag/fundTagSetting/upload.ajax', (req, res, next) => {

        let form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            console.log('参数表管理页面表单接收完毕:', fields);
            console.log('参数表管理页面表单文件接收完毕:', files);
            try {
                let xlsx_data = node_xlsx.parse(files.file.path)[0].data.filter(item => {
                    return item.length;
                })
                fs.unlink(files.file.path, function (err) {
                    if (err) {
                        console.log('文件删除失败', err)
                    }
                }) //删除文件
                var sendData = xlsx_data.map((item, index) => {
                    return {
                        // fundId: item[0],
                        // tagCategoryName: item[2],
                        // tagDesc: item[3],
                        // showFlag: item[4],
                        // priority: item[5]
                        fundId: item[0],
                        tagCategoryName: item[1],
                        tagDesc: item[2],
                        showFlag: item[3],
                        priority: item[4]
                    };
                })
                console.log('sendData', sendData)
                let option = {
                    pageUrl: '/businessMgmt/fundTag/fundTagSetting/upload.ajax',
                    req,
                    url: apiUrlList.saveBatch,
                    body: sendData,
                    timeout: 60000,
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
                    if (result && result.returnCode == 0) {
                        return res.send({
                            error: 0,
                            msg: '导入成功'
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

            } catch (error) {
                return res.send({
                    error: 1,
                    msg: '导入失败'
                });
            }

        });

    });

    //修改数据
    app.post('/businessMgmt/fundTag/fundTagSetting/update.ajax', (req, res, next) => {
        let params = {};
        req.body.fundid && (params.fundid = req.body.fundid);
        req.body.tagid && (params.tagid = req.body.tagid);
        req.body.tagvalue && (params.tagvalue = req.body.tagvalue);
        req.body.priority && (params.priority = req.body.priority);
        req.body.showflag && (params.showflag = req.body.showflag);
        let option = {
            pageUrl: '/businessMgmt/fundTag/fundTagSetting/update.ajax',
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
    // 导出全量
    app.get('/businessMgmt/fundTag/fundTagSetting/exportAll.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/businessMgmt/fundTag/fundTagSetting/exportAll.ajax',
            req,
            url: apiUrlList.exportAll,
            // qs: params,
            // qs:req.body,
            timeout: 15000,
            json: true
        };
        // request(option).pipe(res);
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '操作失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                let data = result.body;

                if (data && Array.isArray(data) && data.length > 0) {
                    console.log("----------", data)
                    var arr = [
                        ['基金代码', '基金名称', '标签类别代码', '标签类别名称', '标签ID', '标签名称', '是否展示', '标签优先级']
                    ];
                    data.forEach(function (item) {
                        arr.push([item.fundId, item.fundName, item.tagCategoryId, item.tagCategoryName, item.tagValue, item.tagDesc, item.showflag, item.priority])
                    });
                    const stream = require('stream');
                    const book = XLSX.utils.book_new();
                    const sheet = XLSX.utils.aoa_to_sheet(arr);
                    XLSX.utils.book_append_sheet(book, sheet, "test");
                    const fileContents = XLSX.write(book, {
                        type: 'buffer',
                        bookType: 'xlsx',
                        bookSST: false
                    });
                    let readStream = new stream.PassThrough();
                    readStream.end(fileContents);
                    var myDate = new Date();
                    var mytime = myDate.toLocaleDateString();
                    let fileName = mytime + ".xlsx";
                    res.set('Content-disposition', 'attachment; filename=' + fileName);
                    res.set('Content-Type', 'text/plain');
                    readStream.pipe(res);
                } else {
                    res.send('没有数据');
                }
            } else if (result && result.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                res.send({
                    error: 1,
                    msg: '查询失败'
                });
            }
        });
    });

    // 获取新增弹窗里基金代码一级菜单名称
    app.post('/businessMgmt/fundTag/fundTagSetting/getTagName.ajax', (req, res, next) => {
        let params = {};
        req.body.pageNum && (params.pageNum = req.body.pageNum);
        req.body.pageSize && (params.pageSize = req.body.pageSize);
        let option = {
            pageUrl: '/businessMgmt/fundTag/fundTagSetting/getTagName.ajax',
            req,
            url: apiUrlList.getTagName,
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

    // 获取新增弹窗里基金代码e二级菜单名称
    app.post('/businessMgmt/fundTag/fundTagSetting/getDescName.ajax', (req, res, next) => {
        // let params = {};
        var tagId = req.body.tagId;
        let option = {
            pageUrl: '/businessMgmt/fundTag/fundTagSetting/getDescName.ajax',
            req,
            url: apiUrlList.getDescName + '/' + tagId + '/query/collections',
            // qs:params,
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
}