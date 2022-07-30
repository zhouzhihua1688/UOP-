const request = require('./../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').IPOMgmtEC.whiteList;
const formidable = require('formidable');
const fs = require('fs');
module.exports = function (app) {

    // 获取  初始数据和查询
    app.post('/businessMgmt/IPOMgmtEC/whiteList/getList.ajax', (req, res, next) => {
        let params = req.body,
            userId = req.session.loginInfo.userid
        let option = {
            pageUrl: '/businessMgmt/IPOMgmtEC/whiteList/getList.ajax',
            req,
            url: apiUrl.getList,
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
            if (result && result.returnCode == 0) {
                result.body.userId = userId;
                result.body.pages = Math.ceil(result.body.total / params.pageSize); //最大页码
                result.body.pageNum = params.pageNo //当前页
                res.send({
                    error: 0,
                    msg: '查询成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '查询失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
    // 新增
    app.post('/businessMgmt/IPOMgmtEC/whiteList/add.ajax', (req, res, next) => {
        let params = req.body;
        let custNo = params.custNo;
        delete params.custNo
        let option = {
            pageUrl: '/businessMgmt/IPOMgmtEC/whiteList/add.ajax',
            req,
            url: apiUrl.add + `?custNo=${custNo}`,
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
                res.send({
                    error: 0,
                    msg: '新增成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '新增失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
    // 删除
    app.post('/businessMgmt/IPOMgmtEC/whiteList/delete.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/businessMgmt/IPOMgmtEC/whiteList/delete.ajax',
            req,
            url: apiUrl.delete + `?serialNo=${params.serialNo}&oprId=${params.oprId}`,
            timeout: 15000,
            json: true
        };
        request.put(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '删除失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: '删除成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '删除失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
    // 修改
    app.post('/businessMgmt/IPOMgmtEC/whiteList/modify.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/businessMgmt/IPOMgmtEC/whiteList/modify.ajax',
            req,
            url: apiUrl.modify,
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
                res.send({
                    error: 0,
                    msg: '修改成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '修改失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });





    //文件上传
    app.post('/businessMgmt/IPOMgmtEC/whiteList/ExcelUpload.ajax', (req, res, next) => {
        let userId = req.session.loginInfo.userid;

        let form = new formidable.IncomingForm();
        // form.uploadDir = "./uploadFiles/privilege";
        form.keepExtensions = true; //保留文件后缀名

        form.parse(req, (err, fields, files) => {
            let formData;
            console.log('参数表管理页面表单接收完毕:', fields);
            console.log('参数表管理页面表单文件接收完毕:', files);
            fs.renameSync(files.file.path, form.uploadDir + "/" + files.file.name) //文件改名
            files.file.path = form.uploadDir + "/" + files.file.name //文件改名


            fs.readFile(files.file.path, {
                encoding: 'utf-8'
            }, function (err, data) {
                if (err) {
                    return '读取文件失败'
                }
                var arr = data.split('\r\n')
                arr = arr.filter(item => item)
                console.log('arr', arr)
                var [title, ...parms] = arr;
                var sendData = []

                title = title.split(',')
                parms.forEach(function (item, ind) {
                    parms[ind] = item.split(',')
                })
                parms.forEach(function (item, ind) {
                    let objData = {}
                    for (let i = 0; i < title.length; i++) {
                        objData[title[i]] = item[i]
                    }
                    sendData.push(objData)
                })
                fs.unlink(files.file.path, function (err) {
                    if (err) {
                        console.log('文件删除失败', err)
                    }
                }) //删除文件
                sendData = sendData.map(function (item) {
                    item.status = 'N';
                    item.oprId = userId;
                    return item;
                })

                var reg = /^[\d]{4}[-/]{1}[\d]{1,2}[-/]{1}[\d]{1,2}/;
                var regTime = /[\d]{1,2}[:]{1}[\d]{1,2}[:]{1}[\d]{1,2}$/;
                let timeStatus = false; //校验时间
                let /* 基金代码 */ fundIdArr = ['000330', '000397', '000600'],
                    /* 业务类型 */
                    apkindArr = ['022', '024'];

                try {
                    sendData.forEach(function (item, ind) {
                        if (apkindArr.indexOf(item.apkind + '') == '-1') {
                            timeStatus = true;
                            return res.send({
                                error: 1,
                                msg: `上传失败,第${ind + 2}行，业务类型${item.apkind}不存在`
                            });
                        }

                        if (fundIdArr.indexOf(item.fundId + '') == '-1') {
                            timeStatus = true;
                            return res.send({
                                error: 1,
                                msg: `上传失败,第${ind + 2}行，基金代码${item.fundId}不存在`
                            });
                        }

                        if (!reg.test(item.strDt)) {
                            timeStatus = true;
                            return res.send({
                                error: 1,
                                msg: `上传失败,第${ind + 2}行，开始时间${item.strDt}格式读取错误，请使用正确日期格式`
                            });
                        }
                        if (!reg.test(item.endDt)) {

                            timeStatus = true;
                            return res.send({
                                error: 1,
                                msg: `上传失败,第${ind + 2}行，结束时间${item.endDt}格式读取错误，请使用正确日期格式`
                            });
                        }

                        item.strDt = setDate(item.strDt, reg, regTime)
                        item.endDt = setDate(item.endDt, reg, regTime)

                        if (item.strDt > item.endDt) {
                            timeStatus = true;
                            return res.send({
                                error: 1,
                                msg: `上传失败，开始时间${item.strDt}不能晚与结束时间${item.endDt}`
                            });

                        }
                        item.strDt = new Date(item.strDt).toISOString()
                        item.endDt = new Date(item.endDt).toISOString()

                        if (item.interval == undefined && item.intervalLimit != undefined) {
                            item.interval = item.intervalLimit;
                            delete item.intervalLimit;
                        }

                    })
                } catch (error) {
                    console.log('多行格式错误', error)
                }
                console.log('sendData', sendData)
                if (timeStatus) {
                    return;
                }

                let option = {
                    pageUrl: '/businessMgmt/IPOMgmtEC/whiteList/ExcelUpload.ajax',
                    req,
                    url: apiUrl.uploadFile,
                    body: sendData,
                    timeout: 15000,
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
                        if (result.body.length == 0) {
                            return res.send({
                                error: 0,
                                msg: '全部上传成功',
                                data: result.body
                            });
                        } else if (result.body.length == sendData.length) {

                            return res.send({
                                error: 1,
                                msg: `全部上传失败`,
                                data: result.body
                            });
                        } else {
                            var errObj = JSON.parse(JSON.stringify(result.body))
                            var sameArr = []
                            sendData.forEach(function (item, ind) {
                                delete item.strDt
                                delete item.endDt
                                var oldObj = Object.values(item).sort(function (a, b) {
                                    return a - b
                                }).join('')

                                for (let i = 0; i < errObj.length; i++) {
                                    delete errObj[i].errCode;
                                    delete errObj[i].errMsg;
                                    delete errObj[i].serialNo;
                                    delete errObj[i].success;
                                    delete errObj[i].strDt
                                    delete errObj[i].endDt
                                    delete errObj[i].minSingle
                                    var newObj = Object.values(errObj[i]).sort(function (a, b) {
                                        return a - b
                                    }).join('')
                                    // console.log('newObj', Object.keys(item))
                                    // console.log('oldObj',  Object.keys(errObj[i]))
                                    if (oldObj == newObj) {
                                        sameArr.push(ind + 2)
                                        break;
                                    }
                                }
                            })
                            console.log('/businessMgmt/IPOMgmtEC/whiteList/ExcelUpload.ajax  sameArr', sameArr)
                            return res.send({
                                error: 0,
                                msg: `部分上传成功,第${sameArr.join(',')}行上传失败`,
                                data: result.body
                            });
                        }
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

            })



        });
    });
};

function setDate(date, reg, regTime) {
    if (!date) {
        return '';
    }
    date = date.replace(/[-/]/g, '-');
    var time = regTime.exec(date)
    if (time) {
        time = time[0]
        time = time.split(':')
        time.forEach(function (item, ind) {
            if (parseInt(item) < 10) {
                time[ind] = '0' + parseInt(item)
            }
        })
        time = time.join(':')
    }
    date = reg.exec(date)
    if (date) {
        date = date[0]
        date = date.split('-')
        date.forEach(function (item, ind) {
            if (parseInt(item) < 10) {
                date[ind] = '0' + parseInt(item)
            }
        })
        date = date.join('-')
    }
    console.log('date', date)
    console.log('time', time)
    if (time) {
        return date + ' ' + time;
    }
    return date + ' 00:00:00';
}