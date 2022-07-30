const request = require('../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').taskManage.sceneTaskRelation;
module.exports = function (app) {

    // 获取  初始数据和查询
    app.post('/marketingActive/taskManage/sceneTaskRelation/getList.ajax', (req, res, next) => {
        let params = req.body,
            userName = req.session.loginInfo.username;
        let option = {
            pageUrl: '/marketingActive/taskManage/sceneTaskRelation/getList.ajax',
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
       // 获取 id
       app.post('/marketingActive/taskManage/sceneTaskRelation/getId.ajax', (req, res, next) => {
        let params = req.body,
            userName = req.session.loginInfo.username;
        let option = {
            pageUrl: '/marketingActive/taskManage/sceneTaskRelation/getId.ajax',
            req,
            url: apiUrl.queryId,
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
    // app.post('/marketingActive/taskManage/sceneTaskRelation/messageAll.ajax', (req, res, next) => {
    //     let params = req.body,
    //         userName = req.session.loginInfo.username;
    //     let option = {
    //         pageUrl: '/marketingActive/taskManage/sceneTaskRelation/messageAll.ajax',
    //         req,
    //         url: apiUrl.messageAll,
    //         qs: params,
    //         timeout: 15000,
    //         json: true
    //     };
    //     request(option, (error, response, body) => {
    //         if (error) {
    //             return res.send({
    //                 error: 1,
    //                 msg: '数据获取失败'
    //             });
    //         }
    //         let result = typeof body === 'string' ? JSON.parse(body) : body;
    //         if (result && result.returnCode == 0) {
    //             result.body.userName = userName;
    //             res.send({
    //                 error: 0,
    //                 msg: '调用成功',
    //                 data: result.body
    //             });
    //         } else if (result && result.returnCode == 9999) {
    //             res.send({
    //                 error: 1,
    //                 msg: '数据获取失败'
    //             });
    //         } else {
    //             res.send({
    //                 error: 1,
    //                 msg: result.returnMsg
    //             });
    //         }
    //     });
    // });
    // 获取  任务ID
    app.post('/marketingActive/taskManage/sceneTaskRelation/taskIdAll.ajax', (req, res, next) => {
        let params = req.body,
            userName = req.session.loginInfo.username;
        let option = {
            pageUrl: '/marketingActive/taskManage/sceneTaskRelation/taskIdAll.ajax',
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
    app.post('/marketingActive/taskManage/sceneTaskRelation/dataAdd.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/marketingActive/taskManage/sceneTaskRelation/dataAdd.ajax',
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

    // 修改
    app.post('/marketingActive/taskManage/sceneTaskRelation/dataChange.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/marketingActive/taskManage/sceneTaskRelation/dataChange.ajax',
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
    app.post('/marketingActive/taskManage/sceneTaskRelation/dataDelete.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/marketingActive/taskManage/sceneTaskRelation/dataDelete.ajax',
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
    app.post('/marketingActive/taskManage/sceneTaskRelation/refreshTask.ajax', (req, res, next) => {
        // let params = req.body;
        let option = {
            pageUrl: '/marketingActive/taskManage/sceneTaskRelation/refreshTask.ajax',
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
  
};