const request = require('../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').taskManage.taskMessage;
module.exports = function (app) {

    // 获取  初始数据和查询
    app.post('/marketingActive/taskManage/taskMessage/getList.ajax', (req, res, next) => {
        let params = req.body,
            userName = req.session.loginInfo.username;
        let option = {
            pageUrl: '/marketingActive/taskManage/taskMessage/getList.ajax',
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
    // 获取  对应事件编号
    app.post('/marketingActive/taskManage/taskMessage/messageAll.ajax', (req, res, next) => {
        let params = req.body,
            userName = req.session.loginInfo.username;
        let option = {
            pageUrl: '/marketingActive/taskManage/taskMessage/messageAll.ajax',
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
    // 获取  任务ID
    app.post('/marketingActive/taskManage/taskMessage/taskIdAll.ajax', (req, res, next) => {
        let params = req.body,
            userName = req.session.loginInfo.username;
        let option = {
            pageUrl: '/marketingActive/taskManage/taskMessage/taskIdAll.ajax',
            req,
            url: apiUrl.taskIdAll,
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
    app.post('/marketingActive/taskManage/taskMessage/dataAdd.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/marketingActive/taskManage/taskMessage/dataAdd.ajax',
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
    // // 展示
    // app.post('/marketingActive/taskManage/taskMessage/showData.ajax', (req, res, next) => {
    //     let params = req.body;
    //     let option = {
    //         session: req.session,
    //         url: apiUrl.showData,
    //         body: params,
    //         timeout: 15000,
    //         json: true
    //     };
    //     console.log('/marketingActive/taskManage/taskMessage/showData.ajax option:', option);
    //     request.post(option, (error, response, body) => {
    //         console.log('/marketingActive/taskManage/taskMessage/showData.ajax error:', error);
    //         console.log('/marketingActive/taskManage/taskMessage/showData.ajax statusCode:', response && response.statusCode);
    //         console.log('/marketingActive/taskManage/taskMessage/showData.ajax body:', body);
    //         if (error) {
    //             return res.send({
    //                 error: 1,
    //                 msg: '请求失败'
    //             });
    //         }
    //         let result = typeof body === 'string' ? JSON.parse(body) : body;
    //         if (result && result.returnCode == 0) {
    //             res.send({
    //                 error: 0,
    //                 msg: '请求成功',
    //                 data: result.body
    //             });
    //         } else {
    //             res.send({
    //                 error: 1,
    //                 msg: '请求失败'
    //             });
    //         }
    //     });
    // });
    // 修改
    app.post('/marketingActive/taskManage/taskMessage/dataChange.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/marketingActive/taskManage/taskMessage/dataChange.ajax',
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
    // 删除
    app.post('/marketingActive/taskManage/taskMessage/dataDelete.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/marketingActive/taskManage/taskMessage/dataDelete.ajax',
            req,
            url: apiUrl.dataDelete,
            qs: params,
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
    // 刷新任务
    app.post('/marketingActive/taskManage/taskMessage/refreshTask.ajax', (req, res, next) => {
        // let params = req.body;
        let option = {
            pageUrl: '/marketingActive/taskManage/taskMessage/refreshTask.ajax',
            req,
            url: apiUrl.refreshTask,
            // qs: params,
            timeout: 25000,
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
    // // 查询单个数据
    // app.post('/marketingActive/taskManage/taskMessage/dataQuery.ajax', (req, res, next) => {
    //     let params = req.body;
    //     let option = {
    //         session: req.session,
    //         url: apiUrl.dataQuery,
    //         qs: params,
    //         timeout: 15000,
    //         json: true
    //     };
    //     console.log('/marketingActive/taskManage/taskMessage/dataQuery.ajax option:', option);
    //     request(option, (error, response, body) => {
    //         console.log('/marketingActive/taskManage/taskMessage/dataQuery.ajax error:', error);
    //         console.log('/marketingActive/taskManage/taskMessage/dataQuery.ajax statusCode:', response && response.statusCode);
    //         console.log('/marketingActive/taskManage/taskMessage/dataQuery.ajax body:', body);
    //         if (error) {
    //             return res.send({
    //                 error: 1,
    //                 msg: '查询失败'
    //             });
    //         }
    //         let result = typeof body === 'string' ? JSON.parse(body) : body;
    //         if (result && result.returnCode == 0) {
    //             res.send({
    //                 error: 0,
    //                 msg: '查询成功',
    //                 data: result.body
    //             });
    //         } else {
    //             res.send({
    //                 error: 1,
    //                 msg: '查询失败'
    //             });
    //         }
    //     });
    // });
};