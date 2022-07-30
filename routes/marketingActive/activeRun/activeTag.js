const request = require('./../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').activeRun.activeTag;
module.exports = function (app) {

    // 获取  初始数据和查询
    app.post('/marketingActive/activeRun/activeTag/getList.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/marketingActive/activeRun/activeTag/getList.ajax',
            req,
            url: apiUrl.getTable,
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
            } else {
                res.send({
                    error: 1,
                    msg: '获取数据失败'
                });
            }
        });
    });
    // 新增
    app.post('/marketingActive/activeRun/activeTag/dataAdd.ajax', (req, res, next) => {
        let params = req.body;
        params.updateBy =req.session.loginInfo.userid;
        let option = {
            pageUrl: '/marketingActive/activeRun/activeTag/dataAdd.ajax',
            req,
            url: apiUrl.add,
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
            if (result && result.returnCode == '0') {
                res.send({
                    error: 0,
                    msg: '新增成功',
                    data: result.body
                });
            } else {
                res.send({
                    error: 1,
                    msg: '新增失败'
                });
            }
        });
    });
    // 修改
    app.post('/marketingActive/activeRun/activeTag/dataChange.ajax', (req, res, next) => {
        let params = req.body;
        params.updateBy =req.session.loginInfo.userid;
        let option = {
            pageUrl: '/marketingActive/activeRun/activeTag/dataChange.ajax',
            req,
            url: apiUrl.modify,
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
            if (result && result.returnCode == '0') {
                res.send({
                    error: 0,
                    msg: '修改成功',
                    data: result.body
                });
            } else {
                res.send({
                    error: 1,
                    msg: '修改失败'
                });
            }
        });
    });
    // 删除
    app.post('/marketingActive/activeRun/activeTag/dataDelete.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/marketingActive/activeRun/activeTag/dataDelete.ajax',
            req,
            url: apiUrl.del,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '删除失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {
                res.send({
                    error: 0,
                    msg: '删除成功',
                    data: result.body
                });
            } else {
                res.send({
                    error: 1,
                    msg: '删除失败'
                });
            }
        });
    });
};