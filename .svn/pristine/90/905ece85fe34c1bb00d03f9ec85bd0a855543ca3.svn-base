const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').monetary.changeConfig;
const baseUrl = '/publicConfig/monetary/changeConfig';

module.exports = function (app) {
    //查询列表
    app.post(`${baseUrl}/tableData.ajax`, (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: `${baseUrl}/tableData.ajax`,
            req: req,
            url: apiUrlList.tableData,
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
            if (body.returnCode === 0) {
                res.send({
                    error: 0,
                    msg: '查询成功',
                    data: body.body
                });
            } else if (body && body.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: body.returnMsg,
                    data: null
                });
            } else {
                res.send({
                    error: 1,
                    msg: body.returnMsg,
                    data: null
                });
            }
        });
    });
    // 新增
    app.post(`${baseUrl}/add.ajax`, (req, res, next) => {
        let params = req.body;
        let userId = req.session.loginInfo.userid;
        params.configOperator = userId;
        let option = {
            pageUrl: `${baseUrl}/add.ajax`,
            req: req,
            url: apiUrlList.add,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '保存失败',
                    data: null
                });
            }
            if (body.returnCode === 0) {
                res.send({
                    error: 0,
                    msg: '保存成功',
                    data: null
                });
            } else if (body && body.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: body.returnMsg,
                    data: null
                });
            } else {
                res.send({
                    error: 1,
                    msg: body.returnMsg,
                    data: null
                });
            }
        });
    });
    // 修改
    app.post(`${baseUrl}/modify.ajax`, (req, res, next) => {
        let params = req.body;
        let userId = req.session.loginInfo.userid;
        params.configOperator = userId;
        let option = {
            pageUrl: `${baseUrl}/modify.ajax`,
            req: req,
            url: apiUrlList.modify,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '修改失败',
                    data: null
                });
            }
            if (body.returnCode === 0) {
                res.send({
                    error: 0,
                    msg: '修改成功',
                    data: null
                });
            } else if (body && body.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: body.returnMsg,
                    data: null
                });
            } else {
                res.send({
                    error: 1,
                    msg: body.returnMsg,
                    data: null
                });
            }
        });
    });
    // 删除
    app.post(`${baseUrl}/del.ajax`, (req, res, next) => {
        let params = req.body;
        let userId = req.session.loginInfo.userid;
        params.configOperator = userId;
        let option = {
            pageUrl: `${baseUrl}/del.ajax`,
            req: req,
            url: apiUrlList.del,
            qs: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '删除失败',
                    data: null
                });
            }
            if (body.returnCode === 0) {
                res.send({
                    error: 0,
                    msg: '删除成功',
                    data: null
                });
            } else if (body && body.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: body.returnMsg,
                    data: null
                });
            } else {
                res.send({
                    error: 1,
                    msg: body.returnMsg,
                    data: null
                });
            }
        });
    });
    // 禁用
    app.post(`${baseUrl}/disable.ajax`, (req, res, next) => {
        let params = req.body;
        let userId = req.session.loginInfo.userid;
        params.configOperator = userId;
        let option = {
            pageUrl: `${baseUrl}/disable.ajax`,
            req: req,
            url: apiUrlList.disable,
            qs: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '禁用失败',
                    data: null
                });
            }
            if (body.returnCode === 0) {
                res.send({
                    error: 0,
                    msg: '禁用成功',
                    data: null
                });
            } else if (body && body.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: body.returnMsg,
                    data: null
                });
            } else {
                res.send({
                    error: 1,
                    msg: body.returnMsg,
                    data: null
                });
            }
        });
    });
    //启用
    app.post(`${baseUrl}/enable.ajax`, (req, res, next) => {
        let params = req.body;
        let userId = req.session.loginInfo.userid;
        params.configOperator = userId;
        let option = {
            pageUrl: `${baseUrl}/enable.ajax`,
            req: req,
            url: apiUrlList.enable,
            qs: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '启用失败',
                    data: null
                });
            }
            if (body.returnCode === 0) {
                res.send({
                    error: 0,
                    msg: '启用成功',
                    data: null
                });
            } else if (body && body.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: body.returnMsg,
                    data: null
                });
            } else {
                res.send({
                    error: 1,
                    msg: body.returnMsg,
                    data: null
                });
            }
        });
    });
};