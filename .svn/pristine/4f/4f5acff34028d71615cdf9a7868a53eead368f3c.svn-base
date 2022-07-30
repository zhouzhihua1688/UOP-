const request = require('../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').vipGrade.member;
const formidable = require('formidable');
const filePath = require('../apiConfig').filePath;
const delFilePath = require('../apiConfig').delFilePath;
const filePathUrl = require('../apiConfig').filePathUrl;
const path = require('path');
const fs = require('fs');
module.exports = function (app) {

    // 获取  初始数据和查询
    app.post('/clientMgmt/vipGrade/member/getList.ajax', (req, res, next) => {
        // let params = req.body,
        userName = req.session.loginInfo.username;
        let option = {
            pageUrl: '/clientMgmt/vipGrade/member/getList.ajax',
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
                result.body.userName = userName;
                res.send({
                    error: 0,
                    msg: '调用成功',
                    data: result.body
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
    // 获取  所有特权
    app.post('/clientMgmt/vipGrade/member/privilegeAll.ajax', (req, res, next) => {
        // let params = req.body,
        userName = req.session.loginInfo.username;
        let option = {
            pageUrl: '/clientMgmt/vipGrade/member/privilegeAll.ajax',
            req: req,
            url: apiUrl.privilegeAll,
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
                result.body.userName = userName;
                res.send({
                    error: 0,
                    msg: '调用成功',
                    data: result.body
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
    // 获取  已配置特权
    app.post('/clientMgmt/vipGrade/member/gradeList.ajax', (req, res, next) => {
        let params = req.body,
            userName = req.session.loginInfo.username;
        let option = {
            pageUrl: '/clientMgmt/vipGrade/member/gradeList.ajax',
            req: req,
            url: apiUrl.gradeList,
            qs: params,
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
                result.body.userName = userName;
                res.send({
                    error: 0,
                    msg: '调用成功',
                    data: result.body
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


    // 新增 对应特权
    app.post('/clientMgmt/vipGrade/member/addGradeIdList.ajax', (req, res, next) => {
        let params = JSON.parse(req.body.list);
        let option = {
            pageUrl: '/clientMgmt/vipGrade/member/addGradeIdList.ajax',
            req: req,
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrl.addGradeIdList,
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
    // 修改 对应特权
    app.post('/clientMgmt/vipGrade/member/updateGradeIdList.ajax', (req, res, next) => {
        let params = JSON.parse(req.body.list);
        let option = {
            pageUrl: '/clientMgmt/vipGrade/member/updateGradeIdList.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrl.updateGradeIdList,
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
    // 修改
    app.post('/clientMgmt/vipGrade/member/dataChange.ajax', (req, res, next) => {
        let form = new formidable.IncomingForm();
        try {
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath)
            }
        } catch (error) {
            console.log('文件夹不存在', error)
            return res.send({
                error: 1,
                msg: '上传失败，文件夹不存在',
                data: null
            });
        }
        form.uploadDir = filePath;
        form.keepExtensions = true; //保留文件后缀名
        form.parse(req, (err, fields, files) => {
            console.log('参数表管理页面表单接收完毕:', fields);
            console.log('参数表管理页面表单文件接收完毕:', files);
            let time = new Date().getTime()
            if (files.file != undefined) {
                var firstName = files.file.name.substring(0, files.file.name.lastIndexOf('.'))
                var lastName = files.file.name.substr(files.file.name.lastIndexOf('.'))
                var fileName = `${firstName}_${time}${lastName}`
                var joinPathUrl = filePathUrl + "/" + fileName
                try {
                    fs.renameSync(files.file.path, form.uploadDir + "/" + fileName) //文件改名
                    files.file.path = form.uploadDir + "/" + fileName //文件改名
                } catch (error) {
                    console.log('/clientMgmt/vipGrade/member/dataChange.ajax  文件改名失败', error)
                    return res.send({
                        error: 1,
                        msg: '上传失败',
                        data: '上传失败'
                    });
                }
                var ext = path.parse(files.file.path).ext
                ext = ext.toLocaleLowerCase();
                console.log('ext', ext)
                if (files.file) {
                    if (ext != '.png' && ext != '.jpg' && ext != '.gif') {
                        fs.unlink(files.file.path, function (e) {
                            if (e) {
                                console.log('/clientMgmt/vipGrade/member/dataChange.ajax  文件删除失败', e)
                            }
                        })
                        return res.send({
                            error: 1,
                            msg: '上传失败,只能上传png、jpg、gif格式图片',
                            data: '上传失败'
                        });
                    }
                }

            }
            if (err) {
                return res.send({
                    error: 1,
                    msg: '上传失败',
                    data: '上传失败'
                });
            } else {
                let params = fields;
                if (files.file != undefined) {
                    params.backgroundImage = joinPathUrl;
                }
                let option = {
                    pageUrl: '/clientMgmt/vipGrade/member/dataChange.ajax',
                    req: req,
                    operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
                    url: apiUrl.dataChange,
                    body: params,
                    timeout: 15000,
                    json: true
                };
                request.put(option, (error, response, body) => {
                    if (error) {
                        if (files.file != undefined) {
                            fs.unlink(files.file.path, function (e) {
                                if (e) {
                                    console.log('/clientMgmt/vipGrade/member/dataChange.ajax  文件删除失败', e)
                                }
                            })
                        }
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
                        if (files.file != undefined) {
                            fs.unlink(files.file.path, function (e) {
                                if (e) {
                                    console.log('/clientMgmt/vipGrade/member/dataChange.ajax  文件删除失败', e)
                                }
                            })
                        }
                        res.send({
                            error: 1,
                            msg: '修改失败'
                        });
                    } else {
                        if (files.file != undefined) {
                            fs.unlink(files.file.path, function (e) {
                                if (e) {
                                    console.log('/clientMgmt/vipGrade/member/dataChange.ajax  文件删除失败', e)
                                }
                            })
                        }
                        res.send({
                            error: 1,
                            msg: result.returnMsg
                        });
                    }
                });
            }

        });
    });
    // 删除
    app.post('/clientMgmt/vipGrade/member/dataDelete.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/clientMgmt/vipGrade/member/dataDelete.ajax',
            req: req,
            operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrl.dataDelete + params.gradeId,
            // body: params,
            timeout: 15000,
            json: true
        };
        request.delete(option, (error, response, body) => {
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
    // 查询单个数据
    app.post('/clientMgmt/vipGrade/member/dataQuery.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/clientMgmt/vipGrade/member/dataQuery.ajax',
            req: req,
            url: apiUrl.dataQuery + params.gradeId,
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

    //新增
    app.post('/clientMgmt/vipGrade/member/add.ajax', (req, res, next) => {
        try {
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath)
            }
        } catch (error) {
            console.log('文件夹不存在', error)
            return res.send({
                error: 1,
                msg: '上传失败，文件夹不存在',
                data: null
            });
        }
        let form = new formidable.IncomingForm();
        form.uploadDir = filePath;
        form.keepExtensions = true; //保留文件后缀名
        console.log('/clientMgmt/vipGrade/member/add.ajax')
        form.parse(req, (err, fields, files) => {

            console.log('参数表管理页面表单接收完毕:', fields);
            console.log('参数表管理页面表单文件接收完毕:', files);

            let time = new Date().getTime()
            if (files.file != undefined) {
                try {
                    var firstName = files.file.name.substring(0, files.file.name.lastIndexOf('.'))
                    var lastName = files.file.name.substr(files.file.name.lastIndexOf('.'))
                    var fileName = `${firstName}_${time}${lastName}`
                    var joinPathUrl = filePathUrl + "/" + fileName
                } catch (error) {
                    console.log('/clientMgmt/vipGrade/member/add.ajax  拼接文件路径', error)
                    return res.send({
                        error: 1,
                        msg: '上传失败',
                        data: '上传失败'
                    });
                }
                var ext = path.parse(files.file.path).ext
                ext = ext.toLocaleLowerCase();
                console.log('ext', ext)
                if (files.file) {
                    if (ext != '.png' && ext != '.jpg' && ext != '.gif') {
                        fs.unlink(files.file.path, function (e) {
                            if (e) {
                                console.log('/clientMgmt/vipGrade/member/add.ajax  文件删除失败', e)
                            }
                        })
                        return res.send({
                            error: 1,
                            msg: '上传失败,只能上传png、jpg、gif格式图片',
                            data: '上传失败'
                        });
                    }
                }

                try {
                    console.log('/clientMgmt/vipGrade/member/dataAdd.ajax   原文件名', files.file.path)
                    console.log('/clientMgmt/vipGrade/member/dataAdd.ajax   新文件名', form.uploadDir + "/" + fileName)

                    fs.renameSync(files.file.path, form.uploadDir + "/" + fileName) //文件改名
                    files.file.path = form.uploadDir + "/" + fileName //文件改名
                } catch (error) {
                    console.log('/clientMgmt/vipGrade/member/add.ajax  文件改名', error)
                    return res.send({
                        error: 1,
                        msg: '上传失败',
                        data: '上传失败'
                    });
                }
            }

            if (err) {
                return res.send({
                    error: 1,
                    msg: '上传失败',
                    data: '上传失败'
                });
            } else {
                let params = fields;
                if (files.file != undefined) {
                    params.backgroundImage = joinPathUrl
                } else {
                    params.backgroundImage = ''
                }
                let option = {
                    pageUrl: '/clientMgmt/vipGrade/member/dataAdd.ajax',
                    req: req,
                    operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
                    url: apiUrl.dataAdd,
                    body: params,
                    timeout: 15000,
                    json: true
                };
                request.post(option, (error, response, body) => {
                    if (error) {
                        fs.unlink(files.file.path, function (e) {
                            if (e) {
                                console.log('/clientMgmt/vipGrade/member/add.ajax  文件删除失败', e)
                            }
                        })//删除文件
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
                        fs.unlink(files.file.path, function (e) {
                            if (e) {
                                console.log('/clientMgmt/vipGrade/member/add.ajax  文件删除失败', e)
                            }
                        })//删除文件
                        res.send({
                            error: 1,
                            msg: '新增失败'
                        });
                    } else {
                        fs.unlink(files.file.path, function (e) { if (e) { console.log('/clientMgmt/vipGrade/member/add.ajax   文件删除失败', e) } })//删除文件
                        res.send({
                            error: 1,
                            msg: result.returnMsg
                        });
                    }
                });
            }

        });
    });

    //文件修改后移动到del文件夹
    app.post('/clientMgmt/vipGrade/member/del.ajax', (req, res, next) => {
        let params = req.body;
        console.log('/clientMgmt/vipGrade/member/del.ajax')
        console.log('filePath', filePath)
        console.log('delFilePath', delFilePath)
        console.log('req.body', req.body)
        try {
            if (!fs.existsSync(delFilePath)) {
                fs.mkdirSync(delFilePath)
            }
        } catch (error) {
            console.log('del文件夹不存在', error)
            return res.send({
                error: 1,
                msg: '上传失败，文件夹不存在',
                data: null
            });
        }
        var fileName = path.parse(params.oldPath).base;

        console.log('/clientMgmt/vipGrade/member/del.ajax fileName', path.join(filePath, fileName))
        console.log('/clientMgmt/vipGrade/member/del.ajax delFilePath', path.join(delFilePath, fileName))
        try {
            if (fileName) {
                fs.renameSync(path.join(filePath, fileName), path.join(delFilePath, fileName)) //文件移动
            }
            return res.send('');
        } catch (error) {
            console.log('/clientMgmt/vipGrade/member/del.ajax', error)
            return res.send('');
        }

    });
};