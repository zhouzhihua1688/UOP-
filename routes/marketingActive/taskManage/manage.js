const request = require('../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').taskManage.manage;
const util = require('util')
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

module.exports = function (app) {

    // 获取  初始数据和查询
    app.post('/marketingActive/taskManage/manage/getList.ajax', (req, res, next) => {
        let params = req.body,
            userName = req.session.loginInfo.username;
        let option = {
            pageUrl: '/marketingActive/taskManage/manage/getList.ajax',
            req,
            url: apiUrl.dataList,
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
    // 获取  任务分类
    app.post('/marketingActive/taskManage/manage/taskClassifyQuery.ajax', (req, res, next) => {
        let params = req.body,
            userName = req.session.loginInfo.username;
        let option = {
            pageUrl: '/marketingActive/taskManage/manage/taskClassifyQuery.ajax',
            req,
            url: apiUrl.taskClassifyQuery,
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
    // 获取  任务分类
    app.post('/marketingActive/taskManage/manage/categoryAll.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/marketingActive/taskManage/manage/categoryAll.ajax',
            req,
            url: apiUrl.categoryAll,
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
    // 获取  任务分规则
    app.post('/marketingActive/taskManage/manage/taskRuleQuery.ajax', (req, res, next) => {
        let params = req.body,
            userName = req.session.loginInfo.username;
        let option = {
            pageUrl: '/marketingActive/taskManage/manage/taskRuleQuery.ajax',
            req,
            url: apiUrl.taskRuleQuery,
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
    // 获取  任务分规则
    app.post('/marketingActive/taskManage/manage/placeholderKeyQuery.ajax', (req, res, next) => {
        let params = req.body,
            userName = req.session.loginInfo.username;
        let option = {
            pageUrl: '/marketingActive/taskManage/manage/placeholderKeyQuery.ajax',
            req,
            url: apiUrl.placeholderKeyQuery,
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
    // 新增
    app.post('/marketingActive/taskManage/manage/dataAdd.ajax', (req, res, next) => {
        let params = req.body;
        params.mcpTaskRuleConfigs = JSON.parse(params.mcpTaskRuleConfigs);
        params.mcpTaskConfig = JSON.parse(params.mcpTaskConfig);
        try {
            params.mcpTaskRuleConfigs.forEach(item => {
                item.conditionData = JSON.stringify(item.conditionData);
            });
        } catch (e) {
            console.log(e);
        }
        console.log(util.inspect(params, {
            depth: null
        }))
        let option = {
            pageUrl: '/marketingActive/taskManage/manage/dataAdd.ajax',
            req,
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
    // 发布
    app.post('/marketingActive/taskManage/manage/publish.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/marketingActive/taskManage/manage/publish.ajax',
            req,
            url: apiUrl.publish,
            qs: params,
            timeout: 25000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '发布失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: '发布成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '发布失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
    //展示
    app.post('/marketingActive/taskManage/manage/showData.ajax', (req, res, next) => {
        let params = req.body;

        let option = {
            pageUrl: '/marketingActive/taskManage/manage/showData.ajax',
            req,
            url: apiUrl.showData,
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
    // 修改
    app.post('/marketingActive/taskManage/manage/dataChange.ajax', (req, res, next) => {
        let params = req.body;
        params.mcpTaskRuleConfigs = JSON.parse(params.mcpTaskRuleConfigs);
        params.mcpTaskConfig = JSON.parse(params.mcpTaskConfig);
        try {
            params.mcpTaskRuleConfigs.forEach(item => {
                item.conditionData = JSON.stringify(item.conditionData);
            });
        } catch (e) {
            console.log(e);
        }
        let option = {
            pageUrl: '/marketingActive/taskManage/manage/dataChange.ajax',
            req,
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
    // 禁用启用
    app.post('/marketingActive/taskManage/manage/setEnable.ajax', (req, res, next) => {
        let params = req.body;
        // params.mcpTaskRuleConfigs = JSON.parse(params.mcpTaskRuleConfigs);
        // params.mcpTaskConfig = JSON.parse(params.mcpTaskConfig);
        // try {
        //     params.mcpTaskRuleConfigs.forEach(item => {
        //         item.conditionData = JSON.stringify(item.conditionData);
        //     });
        // } catch (e) {
        //     console.log(e);
        // }
        let option = {
            pageUrl: '/marketingActive/taskManage/manage/setEnable.ajax',
            req,
            url: apiUrl.showData,
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
    // // 删除
    // app.post('/marketingActive/taskManage/manage/dataDelete.ajax', (req, res, next) => {
    //     let params = req.body;
    //     let option = {
    //         session: req.session,
    //         url: apiUrl.dataDelete,
    //         body: params,
    //         timeout: 15000,
    //         json: true
    //     };
    //     console.log('/marketingActive/taskManage/manage/dataDelete.ajax option:', option);
    //     request.post(option, (error, response, body) => {
    //         console.log('/marketingActive/taskManage/manage/dataDelete.ajax error:', error);
    //         console.log('/marketingActive/taskManage/manage/dataDelete.ajax statusCode:', response && response.statusCode);
    //         console.log('/marketingActive/taskManage/manage/dataDelete.ajax body:', body);
    //         if (error) {
    //             return res.send({
    //                 error: 1,
    //                 msg: '调用失败'
    //             });
    //         }
    //         let result = typeof body === 'string' ? JSON.parse(body) : body;
    //         if (result && result.returnCode == 0) {
    //             res.send({
    //                 error: 0,
    //                 msg: '调用成功',
    //                 data: result.body
    //             });
    //         } else {
    //             res.send({
    //                 error: 1,
    //                 msg: '调用失败'
    //             });
    //         }
    //     });
    // });
    // 查询单个数据
    app.post('/marketingActive/taskManage/manage/dataQuery.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/marketingActive/taskManage/manage/dataQuery.ajax',
            req,
            url: apiUrl.dataQuery,
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
    // 刷新
    app.post('/marketingActive/taskManage/manage/refreshTask.ajax', (req, res, next) => {
        // let params = req.body;
        let option = {
            pageUrl: '/marketingActive/taskManage/manage/refreshTask.ajax',
            req,
            url: apiUrl.refreshTask,
            // qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '刷新失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: '刷新成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '刷新失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });

    // 获取  对应事件编号
    app.post('/marketingActive/taskManage/manage/messageAll.ajax', (req, res, next) => {
        let params = req.body,
            userName = req.session.loginInfo.username;
        let option = {
            pageUrl: '/marketingActive/taskManage/manage/messageAll.ajax',
            req,
            url: apiUrl.messageAll,
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
    // 获取  用户分组
    app.post('/marketingActive/taskManage/manage/groupList.ajax', (req, res, next) => {
        console.log('apiUrl.groupList', apiUrl.groupList)
        let option = {
            pageUrl: '/marketingActive/taskManage/manage/groupList.ajax',
            req,
            url: apiUrl.groupList,
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
                let data = result.body;
                let checkDefault = data.some(item => {
                    return item.groupId === '00000'
                })
                if (!checkDefault) {
                    data.unshift({
                        groupId: '00000',
                        groupName: '默认分组'
                    })
                }
                res.send({
                    error: 0,
                    msg: '获取成功',
                    data
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
    // 上传路径
    app.post('/marketingActive/taskManage/manage/pagePath.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/marketingActive/taskManage/manage/pagePath.ajax',
            req,
            url: apiUrl.pagePath,
            qs: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '文件路径上传失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: '文件路径上传成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '文件路径上传失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });


    //文件验证
    app.post('/marketingActive/taskManage/manage/verify.ajax', (req, res, next) => {
        let form = new formidable.IncomingForm();
        // let params = req.body;
        userName = req.session.loginInfo.username;
        form.keepExtensions = true;
        form.parse(req, (err, fields, files) => {
            let formData;
            console.log('参数表管理页面表单接收完毕:', fields);
            console.log('参数表管理页面表单文件接收完毕:', files);
            try {
                fs.renameSync(files.file.path, form.uploadDir + "/" + files.file.name) //文件改名
                files.file.path = form.uploadDir + "/" + files.file.name //文件改名
            } catch (error) {
                console.log(error)
                return res.send({
                    error: 1,
                    msg: '文件改名失败',
                    data: '文件改名失败'
                });
            }
            try {
                formData = {
                    file: fs.createReadStream(path.resolve(files.file.path))
                };
            } catch (error) {
                return res.send({
                    error: 1,
                    msg: '上传失败',
                    data: '上传失败'
                });

            }
            let option = {
                url: apiUrl.verify,
                timeout: 30000,
                pageUrl: '/marketingActive/taskManage/manage/verify.ajax',
                req,
                formData: formData,
            };
            request.post(option, (error, response, body) => {
                // res.setHeader("Content-Type", "text/plain;charset=utf-8");
                if (error) {
                    return res.send({
                        error: 1,
                        msg: '验证失败'
                    });
                }
                let result = typeof body === 'string' ? JSON.parse(body) : body;

                if (result && result.returnCode == 0) {
                    if (result.body == 0) {
                        res.send({
                            error: 0,
                            msg: '验证通过'
                        });
                    } else {
                        res.send({
                            error: 2,
                            msg: '文件已存在'
                        });
                    }
                } else {
                    res.send({
                        error: 1,
                        msg: '验证失败'
                    });
                }
            });
        });
    });
    //文件上传
    app.post('/marketingActive/taskManage/manage/upload.ajax', (req, res, next) => {
        let form = new formidable.IncomingForm();
        // let params = req.body;
        userName = req.session.loginInfo.username;
        form.keepExtensions = true;
        form.parse(req, (err, fields, files) => {
            let formData;
            console.log('参数表管理页面表单接收完毕:', fields);
            console.log('参数表管理页面表单文件接收完毕:', files);
            try {
                fs.renameSync(files.file.path, form.uploadDir + "/" + files.file.name) //文件改名
                files.file.path = form.uploadDir + "/" + files.file.name //文件改名
            } catch (error) {
                console.log(error)
                return res.send({
                    error: 1,
                    msg: '文件改名失败',
                    data: '文件改名失败'
                });
            }
            try {
                formData = {
                    file: fs.createReadStream(path.resolve(files.file.path))
                };
            } catch (error) {
                return res.send({
                    error: 1,
                    msg: '上传失败',
                    data: '上传失败'
                });

            }
            let option = {
                url: apiUrl.upload,
                timeout: 30000,
                pageUrl: '/marketingActive/taskManage/manage/upload.ajax',
                req,
                formData: formData,
            };
            request.post(option, (error, response, body) => {
                // res.setHeader("Content-Type", "text/plain;charset=utf-8");
                if (error) {
                    return res.send({
                        error: 1,
                        msg: '上传失败'
                    });
                }
                let result = typeof body === 'string' ? JSON.parse(body) : body;

                if (result && result.returnCode == 0) {
                    res.send({
                        error: 0,
                        msg: '上传成功',
                        data: result.body
                    });
                } else {
                    res.send({
                        error: 1,
                        msg: '上传失败'
                    });
                }
            });
        });
    });
    // 弹窗图片文件上传
    app.post('/marketingActive/taskManage/manage/upLoadDialogPictureUrl.ajax', (req, res, next) => {
        let form = new formidable.IncomingForm();
        let userName = req.session.loginInfo.username;
        form.keepExtensions = true;
        form.parse(req, (err, fields, files) => {
            let formData = {};
            console.log('弹窗表单数据接收完毕:', fields);
            console.log('弹窗图片文件接收完毕:', files);
            try {
                fs.renameSync(files.file.path, form.uploadDir + "/" + files.file.name); //文件改名
                files.file.path = form.uploadDir + "/" + files.file.name //文件改名
            } catch (error) {
                console.log(error);
                return res.send({
                    error: 1,
                    msg: '文件改名失败',
                    data: '文件改名失败'
                });
            }
            try {
                formData = {
                    file: fs.createReadStream(path.resolve(files.file.path))
                };
            } catch (error) {
                return res.send({
                    error: 1,
                    msg: '上传失败',
                    data: '上传失败'
                });

            }
            let option = {
                pageUrl: '/marketingActive/taskManage/manage/upLoadDialogPictureUrl.ajax',
                req,
                url: apiUrl.uploadImage,
                formData: formData,
                timeout: 30000
            };
            request.post(option, (error, response, body) => {
                if (error) {
                    return res.send({
                        error: 1,
                        msg: '上传失败',
                        data: null
                    });
                }
                let result = typeof body === 'string' ? JSON.parse(body) : body;
                if (result && result.returnCode == 0) {
                    res.send({
                        error: 0,
                        msg: '上传成功',
                        data: result.body
                    });
                } else {
                    res.send({
                        error: 1,
                        msg: '上传失败',
                        data: null
                    });
                }
            });
        });
    });
};