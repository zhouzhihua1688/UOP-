const request = require('./../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').closingMgmt.closingMgmt;
module.exports = function (app) {
    // 获取收市日期和各系统收市状态
    app.post('/businessMgmt/closingMgmt/closingMgmt/getList.ajax', (req, res, next) => {
        let p1 = new Promise((resolve, reject) => {
            let option = {
                pageUrl: '/businessMgmt/closingMgmt/closingMgmt/getList.ajax',
                req,
                url: apiUrl.getCheckDate,
                timeout: 15000,
                json: true
            };
            request(option, (error, response, body) => {
                if (error) {
                    return reject({
                        message: '获取收市日期失败'
                    });
                }
                if (body.returnCode == 0) {
                    resolve(body.body);
                } else if (body.returnCode != 9999) {
                    reject({
                        message: body.returnMsg
                    });
                } else {
                    reject({
                        message: '获取收市日期失败'
                    });
                }
            });
        });
        let p2 = function (checkDate) {
            return new Promise((resolve, reject) => {
                let option = {
                    pageUrl: '/businessMgmt/closingMgmt/closingMgmt/getList.ajax',
                    req,
                    url: apiUrl.getList,
                    qs: {
                        checkDate: checkDate
                    },
                    timeout: 15000,
                    json: true
                };
                request(option, (error, response, body) => {
                    if (error) {
                        return reject({
                            message: '获取各系统收市状态失败'
                        });
                    }
                    if (body.returnCode == 0 && Array.isArray(body.body.displayResult)) {
                        resolve(body.body.displayResult);
                    } else if (body.returnCode != 9999) {
                        reject({
                            message: body.returnMsg
                        });
                    } else {
                        reject({
                            message: '获取各系统收市状态失败'
                        });
                    }
                });
            });
        };
        let p3 = function (checkDate) {
            return new Promise((resolve, reject) => {
                let option = {
                    pageUrl: '/businessMgmt/closingMgmt/closingMgmt/getList.ajax',
                    req,
                    url: apiUrl.getStatus,
                    qs: {
                        checkDate: checkDate,
                        // sysName: 'UOP'  20200225修改code
                        sysName: 'DAYENDCONTROL'
                    },
                    timeout: 15000,
                    json: true
                };
                request(option, (error, response, body) => {
                    if (error) {
                        return reject({
                            message: '获取暂停状态失败'
                        });
                    }
                    if (body.returnCode == 0) {
                        resolve(body.body.result);
                    } else if (body.returnCode != 9999) {
                        reject({
                            message: body.returnMsg
                        });
                    } else {
                        reject({
                            message: '获取暂停状态失败'
                        });
                    }
                });
            });
        };
        let p4 = function (checkDate) {
            return new Promise((resolve, reject) => {
                let option = {
                    pageUrl: '/businessMgmt/closingMgmt/closingMgmt/getList.ajax',
                    req,
                    url: apiUrl.getStatus,
                    qs: {
                        checkDate: checkDate,
                        sysName: 'ALLSYS'
                    },
                    timeout: 15000,
                    json: true
                };
                request(option, (error, response, body) => {
                    if (error) {
                        return reject({
                            message: '获取总系统收市状态失败'
                        });
                    }
                    if (body.returnCode == 0) {
                        resolve(body.body.result);
                    } else if (body.returnCode != 9999) {
                        reject({
                            message: body.returnMsg
                        });
                    } else {
                        reject({
                            message: '获取总系统收市状态失败'
                        });
                    }
                });
            });
        };

        p1.then(checkDate => {
            Promise.all([p2(checkDate), p3(checkDate), p4(checkDate)]).then(([list, flag, canClose]) => {
                list.forEach(item => {
                    item.checkDate = item.checkDate ? item.checkDate.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3') : '-';
                    item.showResult = item.result;
                    if (item.result === 'Y') {
                        item.showResult = '已收市';
                    } else if (item.result === 'F') {
                        item.showResult = '未收市';
                    }
                    item.updateTime = item.updateTime ? item.updateTime : '-';
                    item.remark = item.remark ? item.remark : '-';
                });
                let resultObj = {
                    checkDate: checkDate.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3'),
                    canClose: canClose === 'Y',
                    isPause: flag === 'F',
                    allClosed: list.every(item => item.result === 'Y'),
                    list: list
                };
                res.send({
                    error: 0,
                    msg: '调用成功',
                    data: resultObj
                });
            }).catch(error => {
                res.send({
                    error: 1,
                    msg: error.message,
                    data: null
                });
            })
        }).catch(error => {
            res.send({
                error: 1,
                msg: error.message,
                data: null
            });
        });
    });
    // 暂停收市状态
    app.post('/businessMgmt/closingMgmt/closingMgmt/pause.ajax', (req, res, next) => {
        let p1 = new Promise((resolve, reject) => {
            let option = {
                pageUrl: '/businessMgmt/closingMgmt/closingMgmt/pause.ajax',
                req,
                operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
                url: apiUrl.getCheckDate,
                timeout: 15000,
                json: true
            };
            request(option, (error, response, body) => {
                if (error) {
                    return reject({
                        message: '获取收市日期失败'
                    });
                }
                if (body.returnCode == 0) {
                    resolve(body.body);
                } else if (body.returnCode != 9999) {
                    reject({
                        message: body.returnMsg
                    });
                } else {
                    reject({
                        message: '获取收市日期失败'
                    });
                }
            });
        });
        let p2 = function (checkDate) {
            return new Promise((resolve, reject) => {
                let option = {
                    pageUrl: '/businessMgmt/closingMgmt/closingMgmt/pause.ajax',
                    req,
                    url: apiUrl.pause,
                    qs: {
                        stopDate: checkDate
                    },
                    timeout: 15000,
                    json: true
                };
                request.post(option, (error, response, body) => {
                    if (error) {
                        return reject({
                            message: '暂停失败'
                        });
                    }
                    if (body.returnCode == 0 && body.body.result === 'Y') {
                        resolve();
                    } else if (body.returnCode != 0 && body.returnCode != 9999) {
                        reject({
                            message: body.returnMsg
                        });
                    } else {
                        reject({
                            message: '暂停失败'
                        });
                    }
                });
            });
        };

        p1.then(checkDate => {
            p2(checkDate).then(() => {
                res.send({
                    error: 0,
                    msg: '暂停成功',
                    data: null
                });
            }).catch(error => {
                res.send({
                    error: 1,
                    msg: error.message,
                    data: null
                });
            })
        }).catch(error => {
            res.send({
                error: 1,
                msg: error.message,
                data: null
            });
        });
    });
    // 恢复收市状态
    app.post('/businessMgmt/closingMgmt/closingMgmt/recover.ajax', (req, res, next) => {
        let p1 = new Promise((resolve, reject) => {
            let option = {
                pageUrl: '/businessMgmt/closingMgmt/closingMgmt/recover.ajax',
                req,
                operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
                url: apiUrl.getCheckDate,
                timeout: 15000,
                json: true
            };
            request(option, (error, response, body) => {
                if (error) {
                    return reject({
                        message: '获取收市日期失败'
                    });
                }
                if (body.returnCode == 0) {
                    resolve(body.body);
                } else if (body.returnCode != 9999) {
                    reject({
                        message: body.returnMsg
                    });
                } else {
                    reject({
                        message: '获取收市日期失败'
                    });
                }
            });
        });
        let p2 = function (checkDate) {
            return new Promise((resolve, reject) => {
                let option = {
                    pageUrl: '/businessMgmt/closingMgmt/closingMgmt/recover.ajax',
                    req,
                    url: apiUrl.recover,
                    qs: {
                        recoverDate: checkDate
                    },
                    timeout: 15000,
                    json: true
                };
                request.post(option, (error, response, body) => {
                    if (error) {
                        return reject({
                            message: '恢复失败'
                        });
                    }
                    if (body.returnCode == 0 && body.body.result === 'Y') {
                        resolve();
                    } else if (body.returnCode == 0 && body.returnCode != 9999) {
                        reject({
                            message: body.returnMsg
                        });
                    } else {
                        reject({
                            message: '恢复失败'
                        });
                    }
                });
            });
        };

        p1.then(checkDate => {
            p2(checkDate).then(() => {
                res.send({
                    error: 0,
                    msg: '恢复成功',
                    data: null
                });
            }).catch(error => {
                res.send({
                    error: 1,
                    msg: error.message,
                    data: null
                });
            })
        }).catch(error => {
            res.send({
                error: 1,
                msg: error.message,
                data: null
            });
        });
    });
    // 立即收市
    app.post('/businessMgmt/closingMgmt/closingMgmt/close.ajax', (req, res, next) => {
        let p1 = new Promise((resolve, reject) => {
            let option = {
                pageUrl: '/businessMgmt/closingMgmt/closingMgmt/close.ajax',
                req,
                operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
                url: apiUrl.getCheckDate,
                timeout: 15000,
                json: true
            };
            request(option, (error, response, body) => {
                if (error) {
                    return reject({
                        message: '获取收市日期失败'
                    });
                }
                if (body.returnCode == 0) {
                    resolve(body.body);
                } else if (body.returnCode != 9999) {
                    reject({
                        message: body.returnMsg
                    });
                } else {
                    reject({
                        message: '获取收市日期失败'
                    });
                }
            });
        });
        let p2 = function (checkDate) {
            return new Promise((resolve, reject) => {
                let option = {
                    pageUrl: '/businessMgmt/closingMgmt/closingMgmt/close.ajax',
                    req,
                    url: apiUrl.close,
                    qs: {
                        checkDate: checkDate
                    },
                    timeout: 15000,
                    json: true
                };
                request.post(option, (error, response, body) => {
                    if (error) {
                        return reject({
                            message: '收市失败'
                        });
                    }
                    if (body.returnCode == 0 && body.body && body.body.result === 'Y') {
                        resolve();
                    } else if (body.returnCode != 0 && body.returnCode != 9999) {
                        reject({
                            message: body.returnMsg
                        });
                    } else {
                        reject({
                            message: '收市失败'
                        });
                    }
                });
            });
        };

        p1.then(checkDate => {
            p2(checkDate).then(() => {
                res.send({
                    error: 0,
                    msg: '收市成功',
                    data: null
                });
            }).catch(error => {
                res.send({
                    error: 1,
                    msg: error.message,
                    data: null
                });
            })
        }).catch(error => {
            res.send({
                error: 1,
                msg: error.message,
                data: null
            });
        });
    });
    // 强制收市
    app.post('/businessMgmt/closingMgmt/closingMgmt/listClose.ajax', (req, res, next) => {
        let p1 = new Promise((resolve, reject) => {
            let option = {
                pageUrl: '/businessMgmt/closingMgmt/closingMgmt/listClose.ajax',
                req,
                operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
                url: apiUrl.getCheckDate,
                timeout: 15000,
                json: true
            };
            request(option, (error, response, body) => {
                if (error) {
                    return reject({
                        message: '获取收市日期失败'
                    });
                }
                if (body.returnCode == 0) {
                    resolve(body.body);
                } else if (body.returnCode != 9999) {
                    reject({
                        message: body.returnMsg
                    });
                } else {
                    reject({
                        message: '获取收市日期失败'
                    });
                }
            });
        });
        let p2 = function (checkDate) {
            return new Promise((resolve, reject) => {
                let body = {
                    dayEndFlag: 'Y',
                    operatorId: req.session.loginInfo.userid,
                    remark: req.body.remark,
                    sysName: req.body.sysName,
                    workDate: checkDate
                };
                let option = {
                    pageUrl: '/businessMgmt/closingMgmt/closingMgmt/listClose.ajax',
                    req,
                    url: apiUrl.listClose,
                    body: body,
                    timeout: 15000,
                    json: true
                };
                request.post(option, (error, response, body) => {
                    if (error) {
                        return reject({
                            message: '强制收市失败'
                        });
                    }
                    if (body.returnCode == 0) {
                        resolve();
                    } else if (body.returnCode != 0 && body.returnCode != 9999) {
                        reject({
                            message: body.returnMsg
                        });
                    } else {
                        reject({
                            message: '强制收市失败'
                        });
                    }
                });
            });
        };

        p1.then(checkDate => {
            p2(checkDate).then(() => {
                res.send({
                    error: 0,
                    msg: '调用成功',
                    data: null
                });
            }).catch(error => {
                res.send({
                    error: 1,
                    msg: error.message,
                    data: null
                });
            })
        }).catch(error => {
            res.send({
                error: 1,
                msg: error.message,
                data: null
            });
        });
    });
};