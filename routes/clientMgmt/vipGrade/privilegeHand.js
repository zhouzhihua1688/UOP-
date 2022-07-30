const request = require('../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').vipGrade.privilegeHand;
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');

module.exports = function (app) {

    // 获取  初始数据和查询
    app.post('/clientMgmt/vipGrade/privilegeHand/getList.ajax', (req, res, next) => {
        // let params = req.body,
        let userName = req.session.loginInfo.username;
        let option = {
            pageUrl: '/clientMgmt/vipGrade/privilegeHand/getList.ajax',
            req: req,
            url: apiUrl.dataList,
            // qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '数据获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: '调用成功',
                    data: result.body,
                    userName
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '数据获取失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
    // 获取  新增特权数据
    app.post('/clientMgmt/vipGrade/privilegeHand/privilegeList.ajax', (req, res, next) => {
        // let params = req.body,
        let userName = req.session.loginInfo.username;
        let option = {
            pageUrl: '/clientMgmt/vipGrade/privilegeHand/privilegeList.ajax',
            req: req,
            url: apiUrl.privilegeList,
            // qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '数据获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: '调用成功',
                    data: result.body,
                    userName
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '数据获取失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });

    // 获取  来源备注
    app.post('/clientMgmt/vipGrade/privilegeHand/sourceList.ajax', (req, res, next) => {
        // let params = req.body,
        let userName = req.session.loginInfo.username;
        let option = {
            pageUrl: '/clientMgmt/vipGrade/privilegeHand/sourceList.ajax',
            req: req,
            url: apiUrl.sourceList,
            // qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '数据获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: '调用成功',
                    data: result.body,
                    userName
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '数据获取失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
    // 获取  客户号对应字段
    app.post('/clientMgmt/vipGrade/privilegeHand/custNoList.ajax', (req, res, next) => {
        let params = req.body
        // let userName = req.session.loginInfo.username;
        if (!Array.isArray(params.custNo)) {
            params.custNo = [params.custNo]
        }
        let option = {
            // pageUrl: '/clientMgmt/vipGrade/privilegeHand/custNoList.ajax',
            req: req,
            url: apiUrl.custNoList,
            body: params.custNo,
            timeout: 15000,
            json: true
        };
        console.log(`/clientMgmt/vipGrade/privilegeHand/custNoList.ajax option:`, option.req ? {...option, req: '#'} : option);
        request.post(option, (error, response, body) => {
            console.log(`/clientMgmt/vipGrade/privilegeHand/custNoList.ajax error:`, error);
            console.log(`/clientMgmt/vipGrade/privilegeHand/custNoList.ajax statusCode:`, response && response.statusCode);
            console.log(`/clientMgmt/vipGrade/privilegeHand/custNoList.ajax body: ******`);
            if (error) {
                return res.send({
                    error: 1,
                    msg: '客户列表获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: '调用成功',
                    data: result.body,
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '客户列表获取失败'
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
    app.post('/clientMgmt/vipGrade/privilegeHand/dataAdd.ajax', (req, res, next) => {
        let params = [];
        req.body.privilegeTotalCount = Number(req.body.privilegeTotalCount);
        params.push(req.body)
        let option = {
            pageUrl: '/clientMgmt/vipGrade/privilegeHand/dataAdd.ajax',
            req: req,
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrl.dataAdd,
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
    // 修改
    app.post('/clientMgmt/vipGrade/privilegeHand/dataChange.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/clientMgmt/vipGrade/privilegeHand/dataChange.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrl.dataChange,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '调用失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: '调用成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '调用失败'
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
    app.post('/clientMgmt/vipGrade/privilegeHand/dataDelete.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/clientMgmt/vipGrade/privilegeHand/dataDelete.ajax',
            req: req,
            operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrl.dataDelete,
            qs: params,
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

    //文件上传
    app.post('/clientMgmt/vipGrade/privilegeHand/ExcelUpload.ajax', (req, res, next) => {
        let userName = req.session.loginInfo.username;

        let form = new formidable.IncomingForm();
        // form.uploadDir = "./uploadFiles/privilege";
        form.keepExtensions = true; //保留文件后缀名

        form.parse(req, (err, fields, files) => {
            console.log('参数表管理页面表单接收完毕:', fields);
            console.log('参数表管理页面表单文件接收完毕:', files);
            try {
                fs.renameSync(files.file.path, form.uploadDir + "/" + files.file.name) //文件改名
                files.file.path = form.uploadDir + "/" + files.file.name //文件改名
            } catch (error) {
                return res.send({
                    error: 1,
                    msg: `上传失败`
                });
            }


            fs.readFile(files.file.path, { encoding: 'utf-8' }, function (err, data) {
                if (err) {
                    return res.send({
                        error: 1,
                        msg: `上传失败,读取文件失败`
                    });
                }
                var arr = data.split('\r\n')
                arr = arr.filter(item => item)
                fs.unlink(files.file.path, function (err) { if (err) { console.log('文件删除失败', err) } }) //删除文件
                if (arr.length > 5001) {
                    return res.send({
                        error: 1,
                        msg: `上传失败,每次最多上传5000条数据,请重新上传`
                    });
                }
                var [title, ...parms] = arr;
                var sendData = []

                title = title.split(',')
                parms.forEach(function (item, ind) {
                    parms[ind] = item.split(',')
                })
                parms.forEach(function (item, ind) {
                    sendData.push({
                        [title[0]]: item[0],
                        [title[1]]: item[1],
                        [title[2]]: item[2],
                        [title[3]]: item[3],
                        [title[4]]: item[4],
                        [title[5]]: item[5]
                    })
                })
                sendData = sendData.map(function (item) {
                    item.whiteList = true;
                    item.operator = userName;
                    item.privilegeType = '';
                    return item;
                })


                var reg = /^[\d]{4}[-/]{1}[\d]{1,2}[-/]{1}[\d]{1,2}/;
                var regTime = /[\d]{1,2}[:]{1}[\d]{1,2}[:]{1}[\d]{1,2}$/;
                let timeStatus = false;//校验时间
                try {
                    sendData.forEach(function (item, ind) {
                        if (!item.privilegeId) {
                            timeStatus = true;
                            return res.send({
                                error: 1,
                                msg: `上传失败,第${ind + 2}行，未填写特权ID`
                            });
                        }
                        if (!item.custNo) {
                            timeStatus = true;
                            return res.send({
                                error: 1,
                                msg: `上传失败,第${ind + 2}行，未填写客户号`
                            });
                        }
                        if (!reg.test(item.receiveTime)) {
                            timeStatus = true;
                            return res.send({
                                error: 1,
                                msg: `上传失败,第${ind + 2}行，生效时间${item.receiveTime}格式读取错误，请使用正确日期格式`
                            });
                        }
                        if (!reg.test(item.expireTime)) {

                            timeStatus = true;
                            return res.send({
                                error: 1,
                                msg: `上传失败,第${ind + 2}行，失效时间${item.expireTime}格式读取错误，请使用正确日期格式`
                            });
                        }

                        item.receiveTime = setDate(item.receiveTime, reg, regTime)
                        item.expireTime = setDate(item.expireTime, reg, regTime)

                        if (item.receiveTime > item.expireTime) {
                            timeStatus = true;
                            return res.send({
                                error: 1,
                                msg: `上传失败，生效时间${item.receiveTime}不能晚与失效时间${item.expireTime}`
                            });

                        }
                    })
                } catch (error) {
                    console.log('多行格式错误', error)
                }
                // console.log('sendData', sendData)
                if (timeStatus) {
                    return;
                }
                new Promise(function (resolve, reject) {
                    request({
                        session: req.session,
                        url: apiUrl.sourceList,
                        timeout: 120000,
                        json: true
                    }, (error, response, body) => {
                        if (error) {
                            reject(`上传失败，特权来源接口获取数据失败`)
                        }
                        let result = typeof body === 'string' ? JSON.parse(body) : body;
                        result = result.body.map(function (item) {
                            return (item.id - 0)
                        })
                        resolve(result)
                    });
                }).then(function (val) {
                    sendData.forEach(function (item, ind) {
                        if (val.indexOf(item.privilegeSourceId - 0) == '-1') {
                            throw `上传失败，特权来源${item.privilegeSourceId}不存在`
                        }

                    })
                }).then(function () {
                    let option = {
                        pageUrl: '/clientMgmt/vipGrade/privilegeHand/ExcelUpload.ajax',
                        req: req,
                        url: apiUrl.dataAdd,
                        body: sendData,
                        timeout: 120000,
                        json: true
                    };
                    if (option.body && option.body.length > 0) {
                        console.log('/clientMgmt/vipGrade/privilegeHand/ExcelUpload.ajax option:', {
                            length: option.body.length,
                            session: option.session,
                            url: option.url,
                            body: [option.body[0], option.body[option.body.length - 1]],
                            timeout: option.timeout,
                            json: option.json
                        });

                    } else {
                        console.log('/clientMgmt/vipGrade/privilegeHand/ExcelUpload.ajax error:', option)
                        return res.send({
                            error: 1,
                            msg: `上传失败,数据为空`
                        });
                    }
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
                }).catch(function (err) {
                    return res.send({
                        error: 1,
                        msg: err
                    });
                })
            })



        });
    });
    // 查询客户号
    app.post('/clientMgmt/vipGrade/privilegeHand/queryCustNo.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/clientMgmt/vipGrade/privilegeHand/queryCustNo.ajax',
            req: req,
            url: apiUrl.queryCustNo,
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
};

function setDate(date, reg, regTime) {
    if (!date) { return ''; }
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
    if (time) {
        return date + ' ' + time;
    }
    return date + ' 00:00:00';
}