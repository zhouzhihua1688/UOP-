const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').appointment.applyMgmt;
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

const actType = '01'; // 活动类型： 00-预约活动， 01-报名活动
const pageUrl = '/activity-center/act-resources/pages/highEndBooking/activityBooking.html'; // actUrl默认链接地址
const pageUrlDomain = 'http://appuat.99fund.com.cn:7081'; // actUrl默认链接域名

module.exports = function (app) {
    // 主页面列表查询
    app.post('/publicConfig/appointment/applyMgmt/query.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/publicConfig/appointment/applyMgmt/query.ajax',
            req: req,
            qs: Object.assign(req.body, {actType: actType}),
            url: apiUrlList.query,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '查询失败'});
            }
            if (body.returnCode === 0 && body.body && Array.isArray(body.body.rows)) {
                res.send({error: 0, msg: '查询成功', data: body.body.rows});
            } else if (body && body.returnCode != 9999) {
                res.send({error: 1, msg: body.returnMsg, data: null});
            } else {
                res.send({error: 1, msg: '查询失败', data: null});
            }
        });
    });
    // 主页面上架下架状态更改
    app.post('/publicConfig/appointment/applyMgmt/changeStatus.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/publicConfig/appointment/applyMgmt/changeStatus.ajax',
            req: req,
            qs: {
                id: req.body.id,
                displayStatus: req.body.displayStatus
            },
            url: apiUrlList.changeStatus,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '更改失败'});
            }
            if (body.returnCode === 0) {
                res.send({error: 0, msg: '更改成功', data: body.body});
            } else if (body && body.returnCode != 9999) {
                res.send({error: 1, msg: body.returnMsg, data: null});
            } else {
                res.send({error: 1, msg: '更改失败', data: null});
            }
        });
    });
    // 主页面数据删除
    app.post('/publicConfig/appointment/applyMgmt/del.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/publicConfig/appointment/applyMgmt/del.ajax',
            req: req,
            qs: {id: req.body.deleteId},
            url: apiUrlList.del,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '删除失败'});
            }
            if (body.returnCode === 0) {
                res.send({error: 0, msg: '删除成功', data: body.body});
            } else if (body && body.returnCode != 9999) {
                res.send({error: 1, msg: body.returnMsg, data: null});
            } else {
                res.send({error: 1, msg: '删除失败', data: null});
            }
        });
    });
    // 获取新增页面所需的数据
    app.post('/publicConfig/appointment/applyMgmt/getDialogDataForOperate.ajax', (req, res, next) => {
        let getGroupList = function () { // 获取客群列表
            return new Promise((resolve, reject) => {
                let option = {
                    pageUrl: '/publicConfig/appointment/applyMgmt/getGroupListForOperate.ajax -- getDialogDataForOperate',
                    req: req,
                    url: apiUrlList.getGroupList,
                    timeout: 15000,
                    json: true
                };
                request(option, (error, response, body) => {
                    if (error) {
                        return resolve([]);
                    }
                    if (body.returnCode === 0 && Array.isArray(body.body)) {
                        return resolve(body.body.map(item => {
                            return {
                                groupId: item.groupId,
                                groupName: item.groupName,
                                check: false
                            };
                        }));
                    } else {
                        return resolve([]);
                    }
                });
            });
        }

        let getRuleList = function () {         // 获取消息规则列表
            return new Promise((resolve, reject) => {
                let option = {
                    pageUrl: '/publicConfig/appointment/applyMgmt/getRuleListForOperate.ajax -- getDialogDataForOperate',
                    req: req,
                    url: apiUrlList.getRuleList,
                    timeout: 15000,
                    json: true
                };
                request(option, (error, response, body) => {
                    if (error) {
                        return resolve([]);
                    }
                    if (body.returnCode === 0 && Array.isArray(body.body)) {
                        return resolve(body.body.map(item => {
                            return {
                                ruleKey: item.ruleKey,
                                ruleName: item.ruleName
                            }
                        }));
                    } else {
                        return resolve([]);
                    }
                });
            });
        }

        let paramsArr = [];
        paramsArr.push(getGroupList());
        paramsArr.push(getRuleList());
        Promise.all(paramsArr).then(([groupList, msgRuleList]) => {
            res.send({
                error: 0,
                msg: '查询成功',
                data: {groupList, msgRuleList}
            });
        }).catch(error => {
            res.send({error: 1, msg: '查询失败', data: null});
        });
    });
    // 新增页面图片文件上传
    app.post('/publicConfig/appointment/applyMgmt/upload.ajax', (req, res, next) => {
        let form = new formidable.IncomingForm();
        form.keepExtensions = true;
        form.parse(req, (err, fields, files) => {
            if (err) {
                return res.send({error: 1, msg: '上传图片文件失败', data: null});
            }
            console.log('前端上传文件:', files);
            let option = {
                pageUrl: '/publicConfig/appointment/applyMgmt/upload.ajax',
                req: req,
                url: apiUrlList.uploadImage,
                formData: {
                    file: fs.createReadStream(path.resolve(files.file.path))
                },
                timeout: 15000,
                json: true
            };
            request.post(option, (error, response, body) => {
                if (error) {
                    return res.send({error: 1, msg: '文件上传失败', data: null});
                }
                if (body && body.returnCode == 0) {
                    res.send({error: 0, msg: '上传成功', data: body.body});
                } else if (body.returnCode != 0 && body.returnCode != 9999) {
                    res.send({error: 1, msg: body.returnMsg, data: null});
                } else {
                    res.send({error: 1, msg: '文件上传失败', data: null});
                }
            });
        });
    });
    // 主页面数据新增
    app.post('/publicConfig/appointment/applyMgmt/add.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/publicConfig/appointment/applyMgmt/add.ajax',
            req: req,
            body: Object.assign(req.body, {
                actType: actType,
                updateBy: req.session.loginInfo.userid,
                actUrl: (envConfig.pagePreviewUrl || pageUrlDomain) + pageUrl
            }),
            url: apiUrlList.add,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '新增失败'});
            }
            if (body.returnCode === 0) {
                res.send({error: 0, msg: '新增成功', data: null});
            } else if (body && body.returnCode != 9999) {
                res.send({error: 1, msg: body.returnMsg, data: null});
            } else {
                res.send({error: 1, msg: '新增失败', data: null});
            }
        });
    });
    // 主页面数据修改
    app.post('/publicConfig/appointment/applyMgmt/update.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/publicConfig/appointment/applyMgmt/update.ajax',
            req: req,
            body: Object.assign(req.body, {actType: actType, updateBy: req.session.loginInfo.userid}),
            url: apiUrlList.update,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '修改失败'});
            }
            if (body.returnCode === 0) {
                res.send({error: 0, msg: '修改成功', data: null});
            } else if (body && body.returnCode != 9999) {
                res.send({error: 1, msg: body.returnMsg, data: null});
            } else {
                res.send({error: 1, msg: '修改失败', data: null});
            }
        });
    });
    // 详情列表查询
    app.post('/publicConfig/appointment/applyMgmt/queryListForDetail.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/publicConfig/appointment/applyMgmt/queryListForDetail.ajax',
            req: req,
            qs: {
                preorderActId: req.body.preorderActId,
                custNo: req.body.custNo,
                phoneNum: req.body.phoneNum
            },
            url: apiUrlList.queryListForDetail,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '查询失败'});
            }
            if (body.returnCode === 0 && body.body && Array.isArray(body.body)) {
                res.send({
                    error: 0, msg: '查询成功', data: body.body.map(item => {
                        item.check = false;
                        return item;
                    })
                });
            } else if (body && body.returnCode != 9999) {
                res.send({error: 1, msg: body.returnMsg, data: null});
            } else {
                res.send({error: 1, msg: '查询失败', data: null});
            }
        });
    });


    // 判断是否实名
    app.post('/publicConfig/appointment/applyMgmt/isRN.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/publicConfig/appointment/applyMgmt/isRN.ajax',
            req: req,
            qs: {
                custNo: req.body.custNo,
            },
            url: apiUrlList.isRN,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '查询失败'});
            }
            if (body.returnCode === 0 && body.body) {
                res.send({error: 0, msg: '查询成功', data: body.body});
            } else if (body && body.returnCode != 9999) {
                res.send({error: 1, msg: body.returnMsg, data: null});
            } else {
                res.send({error: 1, msg: '查询失败', data: null});
            }
        });
    });


    // 查询非实名时存的用户输入姓名
    app.post('/publicConfig/appointment/applyMgmt/getUserName.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/publicConfig/appointment/applyMgmt/getUserName.ajax',
            req: req,
            qs: {
                custNo: req.body.custNo,
            },
            url: apiUrlList.getUserName,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '查询失败'});
            }
            if (body.returnCode === 0 && body.body) {
                res.send({error: 0, msg: '查询成功', data: body.body});
            } else if (body && body.returnCode != 9999) {
                res.send({error: 1, msg: body.returnMsg, data: null});
            } else {
                res.send({error: 1, msg: '查询失败', data: null});
            }
        });
    });



    // 详情列表获取消息规则列表
    app.post('/publicConfig/appointment/applyMgmt/getDialogDataForDetail.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/publicConfig/appointment/applyMgmt/getDialogDataForDetail.ajax',
            req: req,
            url: apiUrlList.getRuleList,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '查询失败', data: null});
            }
            if (body.returnCode === 0 && Array.isArray(body.body)) {
                return res.send({
                    error: 0,
                    msg: '成功',
                    data: body.body.map(item => {
                        return {
                            ruleId: item.ruleId,
                            ruleName: item.ruleName
                        }
                    })
                });
            } else if (body && body.returnCode != 9999) {
                res.send({error: 1, msg: body.returnMsg, data: null});
            } else {
                res.send({error: 1, msg: '更改确认时间失败', data: null});
            }
        });
    });
    // 消息批量发送
    app.post('/publicConfig/appointment/applyMgmt/batchSendMessageForDetail.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/publicConfig/appointment/applyMgmt/batchSendMessageForDetail.ajax',
            req: req,
            body: {
                custNoList: JSON.parse(req.body.custNoList),
                privilegeActId: req.body.privilegeActId,
                messageConfigId: req.body.messageConfigId
            },
            url: apiUrlList.batchSendMessage,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '发送失败'});
            }
            if (body.returnCode === 0) {
                res.send({error: 0, msg: '发送成功', data: null});
            } else if (body && body.returnCode != 9999) {
                res.send({error: 1, msg: body.returnMsg, data: null});
            } else {
                res.send({error: 1, msg: '发送失败', data: null});
            }
        });
    });
};
