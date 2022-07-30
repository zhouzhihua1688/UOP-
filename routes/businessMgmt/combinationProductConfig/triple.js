const request = require('./../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').combinationProductConfig.triple;
const XLSX = require('xlsx');
const node_xlsx = require('node-xlsx');
const formidable = require('formidable');
const fs = require('fs');
module.exports = function (app) {

    // 直销导出
    app.get('/businessMgmt/combinationProductConfig/triple/exportDirect.ajax', (req, res, next) => {
        let params = req.query
        Promise.all([new Promise((resolve, reject) => {
            let option = {
                pageUrl: '/businessMgmt/combinationProductConfig/triple/exportDirect.ajax',
                req,
                url: apiUrl.exportDirect,
                qs: params,
                timeout: 120000,
                json: true
            };
            request(option, (error, response, body) => {
                if (error) {
                    return reject({
                        error: 1,
                        msg: '操作失败'
                    });
                }
                let result = typeof body === 'string' ? JSON.parse(body) : body;
                if (result && result.returnCode == 0) {
                    let data = result.body;
                    if (data && Array.isArray(data) && data.length > 0) {
                        resolve(data)
                    } else {
                        reject({
                            error: 1,
                            msg: '没有数据'
                        });
                    }
                } else if (result && result.returnCode != 9999) {
                    reject({
                        error: 1,
                        msg: result.returnMsg
                    });
                } else {
                    reject({
                        error: 1,
                        msg: '导出失败'
                    });
                }
            });
        }), new Promise((resolve, reject) => {
            let option = {
                pageUrl: '/businessMgmt/combinationProductConfig/triple/branchCode.ajax',
                req,
                url: apiUrl.branchCode,
                qs: {
                    pmst: 'SYSTEM',
                    pmkey: 'BRANCHCODE'
                },
                timeout: 120000,
                json: true
            };
            request(option, (error, response, body) => {
                if (error) {
                    return reject({
                        error: 1,
                        msg: '渠道号查询失败'
                    });
                }
                let result = typeof body === 'string' ? JSON.parse(body) : body;
                if (result && result.returnCode == 0) {
                    let data = result.body;
                    if (data && Array.isArray(data) && data.length > 0) {
                        resolve(data)
                    } else {
                        reject({
                            error: 1,
                            msg: '没有数据'
                        });
                    }
                } else if (result && result.returnCode != 9999) {
                    reject({
                        error: 1,
                        msg: result.returnMsg
                    });
                } else {
                    reject({
                        error: 1,
                        msg: '渠道号查询失败'
                    });
                }
            });
        })]).then((result) => {
            var dataList = result[0]
            var branchCodeList = result[1]
            dataList.forEach((item) => {
                delete item.version;
                delete item.deletedPk;
                delete item.isDeleted;
                delete item.updatetimestamp;
                delete item.inserttimestamp;
                delete item.serialno;
                if (item.importOpenChannel) {
                    let str = item.importOpenChannel.split(',')
                    if (str.length > 2) {
                        for (let i = 2; i < str.length; i++) {
                            branchCodeList.some((branch) => {
                                if (branch.pmco == str[i]) {
                                    str[i] = branch.pmnm;
                                    return true;
                                }
                            })
                        }
                    }
                    item.importOpenChannel = str.join(',')
                }
            })
            var text = {
                importOpenChannel: '渠道',
                importChannelCode: '渠道码',
                groupid: '组合代码',
                groupname: '组合名称',
                importProStrategy: '组合策略',
                importProSeries: '产品系列',
                fundid: '基金代码',
                fundname: '基金名称',
                fundPercent: '占比',
                importOnlineDate: '生效日期',
                importInvalidDate: '失效日期',
                importIsOurPro: '是否我司产品',
                importIsStandardPro: '是否基准产品'
            }
            var arr = [Object.keys(dataList[0])];
            dataList.forEach(function (item) {
                arr.push(Object.values(item))
            });
            arr[0].forEach((title, index, keyList) => {
                if (text[title]) {
                    keyList[index] = text[title]
                }
            })
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
            let fileName = new Date().toLocaleDateString() + ".xlsx";
            res.set('Content-disposition', 'attachment; filename=' + fileName);
            res.set('Content-Type', 'text/plain');
            readStream.pipe(res);
        }).catch((err) => {
            res.send(err)
        })
    });

    // 获取初始数据和查询
    app.post('/businessMgmt/combinationProductConfig/triple/getList.ajax', (req, res, next) => {
        // let params = {};
        let option = {
            pageUrl: '/businessMgmt/combinationProductConfig/triple/getList.ajax',
            req,
            url: apiUrl.getList,
            // body: params,
            timeout: 120000,
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
                result.body.forEach((item) => {
                    if (item.importIsOurPro == '1') {
                        item.importIsOurPro = '是'
                    } else if (item.importIsOurPro == '0') {
                        item.importIsOurPro = '否'
                    }
                    if (item.importIsStandardPro == '1') {
                        item.importIsStandardPro = '是'
                    } else if (item.importIsStandardPro == '0') {
                        item.importIsStandardPro = '否'
                    }
                })
                return res.send({
                    error: 0,
                    msg: '查询成功',
                    data: result.body
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

    //文件上传
    app.post('/businessMgmt/combinationProductConfig/triple/uploadXls.ajax', (req, res, next) => {
        let form = new formidable.IncomingForm();
        form.keepExtensions = true; //保留文件后缀名

        form.parse(req, (err, fields, files) => {
            console.log('参数表管理页面表单接收完毕:', fields);
            console.log('参数表管理页面表单文件接收完毕:', files);
            if (files.file.path) {
                let xlsx_data = node_xlsx.parse(files.file.path)[0].data.filter(item => {
                    return item.length;
                })
                var text = {
                    importOpenChannel: '渠道',
                    importChannelCode: '渠道码',
                    groupid: '组合代码',
                    groupname: '组合名称',
                    importProStrategy: '组合策略',
                    importProSeries: '产品系列',
                    fundid: '基金代码',
                    fundname: '基金名称',
                    fundPercent: '占比',
                    importOnlineDate: '生效日期',
                    importInvalidDate: '失效日期',
                    importIsOurPro: '是否我司产品',
                    importIsStandardPro: '是否基准产品'
                }
                xlsx_data[0].forEach((title, index, arr) => {
                    for (const key in text) {
                        if (text[key] === title) {
                            arr[index] = key
                        }
                    }
                })
                let sendData = xlsx_data.map((item, index, arr) => {
                    if (index !== 0) {
                        let obj = {};
                        arr[0].forEach((key, ind) => {
                            if (key === 'importIsOurPro' || key === 'importIsStandardPro') {
                                if (item[ind] && item[ind].indexOf('是') !== -1) {
                                    obj[key] = '1'
                                } else if (item[ind] && item[ind].indexOf('否') !== -1) {
                                    obj[key] = '0'
                                } else {
                                    obj[key] = null
                                }
                            } else {
                                obj[key] = item[ind]
                            }
                        })
                        return obj;
                    }
                }).filter((item) => item); //过滤undefined
                console.log(sendData)
                fs.unlink(files.file.path, function (err) {
                    if (err) {
                        console.log('文件删除失败', err)
                    }
                }) //删除文件
                // if (sendData.length > 5001) {
                //     return res.send({
                //         error: 1,
                //         msg: `上传失败,每次最多上传5000条数据,请重新上传`
                //     });
                // }
                let option = {
                    pageUrl: '/businessMgmt/combinationProductConfig/triple/uploadXls.ajax',
                    req,
                    operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
                    url: apiUrl.uploadXls,
                    body: sendData,
                    timeout: 120000,
                    json: true
                };
                request.post(option, (error, response, body) => {
                    if (error) {
                        console.log(error)
                        return res.send({
                            error: 1,
                            msg: `上传失败`
                        });

                    }
                    let result = typeof body === 'string' ? JSON.parse(body) : body;
                    if (result && result.returnCode == 0) {
                        res.send({
                            error: 0,
                            msg: '上传成功',
                            data: result.body
                        });
                    } else if (result && result.returnCode == 9999) {
                        return res.send({
                            error: 1,
                            msg: `上传失败`
                        });
                    } else {
                        return res.send({
                            error: 1,
                            msg: result.returnMsg
                        });
                    }
                });

            } else {
                return res.send({
                    error: 1,
                    msg: `上传失败,读取文件失败`
                });
            }


        });
    });
    // 列表下载
    app.get('/businessMgmt/combinationProductConfig/triple/exportList.ajax', (req, res, next) => {
        // let params = req.body
        let option = {
            pageUrl: '/businessMgmt/combinationProductConfig/triple/exportList.ajax',
            req,
            url: apiUrl.getList,
            // qs: params,
            timeout: 120000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '下载失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                let data = result.body;
                if (data && Array.isArray(data) && data.length > 0) {
                    var text = {
                        importOpenChannel: '渠道',
                        importChannelCode: '渠道码',
                        groupid: '组合代码',
                        groupname: '组合名称',
                        importProStrategy: '组合策略',
                        importProSeries: '产品系列',
                        fundid: '基金代码',
                        fundname: '基金名称',
                        fundPercent: '占比',
                        importOnlineDate: '生效日期',
                        importInvalidDate: '失效日期',
                        importIsOurPro: '是否我司产品',
                        importIsStandardPro: '是否基准产品'
                    }
                    data.forEach((item) => {
                        delete item.version;
                        delete item.deletedPk;
                        delete item.isDeleted;
                        delete item.updatetimestamp;
                        delete item.inserttimestamp;
                        delete item.serialno;
                        if (item.importIsOurPro == '1') {
                            item.importIsOurPro = '是'
                        } else if (item.importIsOurPro == '0') {
                            item.importIsOurPro = '否'
                        }
                        if (item.importIsStandardPro == '1') {
                            item.importIsStandardPro = '是'
                        } else if (item.importIsStandardPro == '0') {
                            item.importIsStandardPro = '否'
                        }
                    })
                    let arr = [Object.keys(data[0])];
                    data.forEach(function (item) {
                        arr.push(Object.values(item))
                    });
                    arr[0].forEach((title, index, keyList) => {
                        if (text[title]) {
                            keyList[index] = text[title]
                        }
                    })
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
                    let fileName = new Date().toLocaleDateString() + ".xlsx";
                    res.set('Content-disposition', 'attachment; filename=' + fileName);
                    res.set('Content-Type', 'text/plain');
                    readStream.pipe(res);
                } else {
                    res.send({
                        error: 1,
                        msg: '没有数据'
                    });
                }
            } else if (result && result.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                res.send({
                    error: 1,
                    msg: '下载失败'
                });
            }
        });

    });

};