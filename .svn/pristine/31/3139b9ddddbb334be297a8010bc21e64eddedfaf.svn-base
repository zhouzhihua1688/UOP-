const request = require('./../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').monitoring.indicatorPush;
const fs = require('fs');
const path = require('path');
module.exports = function (app) {

    // 获取  平台专区产品
    app.post('/productIndexes/monitoring/indicatorPush/labels.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            req,
            pageUrl: '/productIndexes/monitoring/indicatorPush/labels.ajax',
            session: req.session,
            qs: params,
            url: apiUrl.labels,
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
            if (result && result.returnCode == '0') {

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

    // 获取 查询列表
    app.post('/productIndexes/monitoring/indicatorPush/collections.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            req,
            pageUrl: '/productIndexes/monitoring/indicatorPush/collections.ajax',
            qs: params,
            url: apiUrl.collections,
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
            if (result && result.returnCode == '0') {
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
    // 查询产品状态
    app.post('/productIndexes/monitoring/indicatorPush/productStatus.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            req,
            pageUrl: '/productIndexes/monitoring/indicatorPush/productStatus.ajax',
            url: apiUrl.productStatus,
            qs: params,
            timeout: 15000,
            json: true
        };

        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '产品状态查询失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {
                res.send({
                    error: 0,
                    msg: '产品状态查询成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '产品状态查询失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
    app.post('/productIndexes/monitoring/indicatorPush/monitorIndex.ajax', (req, res, next) => {
        let option = {
            req,
            pageUrl: '/productIndexes/monitoring/indicatorPush/monitorIndex.ajax',
            url: apiUrl.monitorIndex,
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
            if (result && result.returnCode == '0') {
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
    //添加监控指标配置
    app.post('/productIndexes/monitoring/indicatorPush/addMonitor.ajax', (req, res, next) => {
        let params = req.body;
        params.author = req.session.loginInfo.userid;
        let option = {
            req,
            pageUrl: '/productIndexes/monitoring/indicatorPush/addMonitor.ajax',
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            body: params,
            url: apiUrl.addMonitor,
            timeout: 15000,
            json: true
        };

        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '数据配置失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0' && result.body) {
                res.send({
                    error: 0,
                    msg: '配置成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '配置失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
    //修改监控指标配置
    app.post('/productIndexes/monitoring/indicatorPush/updateMonitor.ajax', (req, res, next) => {
        let params = req.body;
        // !params.author && (params.author = req.session.loginInfo.userid);
        let option = {
            req,
            pageUrl: '/productIndexes/monitoring/indicatorPush/updateMonitor.ajax',
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            body: params,
            url: apiUrl.updateMonitor,
            timeout: 15000,
            json: true
        };

        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '数据配置失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0' && result.body) {
                res.send({
                    error: 0,
                    msg: '配置成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '配置失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
    //删除监控指标配置
    app.post('/productIndexes/monitoring/indicatorPush/deleteMonitor.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            req,
            pageUrl: '/productIndexes/monitoring/indicatorPush/deleteMonitor.ajax',
            operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            qs: params,
            url: apiUrl.deleteMonitor,
            timeout: 15000,
            json: true
        };
        request.delete(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '数据删除失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0' && result.body) {
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
    // 获取  指标详情
    app.post('/productIndexes/monitoring/indicatorPush/detailData.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            req,
            pageUrl: '/productIndexes/monitoring/indicatorPush/detailData.ajax',
            url: apiUrl.detailData,
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
            if (result && result.returnCode == '0') {
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
    // 获取  指标详情
    app.post('/productIndexes/monitoring/indicatorPush/queryEmailList.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            req,
            pageUrl: '/productIndexes/monitoring/indicatorPush/queryEmailList.ajax',
            url: apiUrl.emailQuery,
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
            if (result && result.returnCode == '0') {
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
    //自定义指标
    app.post('/productIndexes/monitoring/indicatorPush/createIndex.ajax', (req, res, next) => {
        let params = req.body;
        params.indexName = `${params.indexName}(自定义${req.session.loginInfo.userid})`;
        let option = {
            req,
            pageUrl: '/productIndexes/monitoring/indicatorPush/createIndex.ajax',
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            body: params,
            url: apiUrl.createIndex,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '数据自定义失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0' && result.body) {
                res.send({
                    error: 0,
                    msg: '自定义成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '自定义失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
    // 获取  试算
    app.post('/productIndexes/monitoring/indicatorPush/calc.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            req,
            pageUrl: '/productIndexes/monitoring/indicatorPush/calc.ajax',
            url: apiUrl.calc,
            body: params,
            timeout: 15000,
            json: true
        };

        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '数据获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {
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
    // 获取  联系人列表
    app.post('/productIndexes/monitoring/indicatorPush/contactsList.ajax', (req, res, next) => {
        fs.readFile(path.resolve(__dirname, '../../../local_data/contactsList.json'), 'utf-8', function (err, data) {
            if (err) {
                res.send({
                    error: 1,
                    msg: 'fail',
                    data: err.message
                });
            } else {
                res.send({
                    error: 0,
                    msg: 'success',
                    data: typeof data === 'string' ? data : JSON.stringify(data)
                });
            }
        });
    });

};