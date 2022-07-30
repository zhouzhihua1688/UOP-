/**
 * Created by admin on 2019/5/7.
 */

const request = require('../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').switchMgmt.fundSwitchMgmt;
module.exports = function (app) {
    //双查询条件同时存在查询接口
    app.post('/businessMgmt/switchMgmt/fundSwitchMgmt/queryInfo.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/businessMgmt/switchMgmt/fundSwitchMgmt/queryInfo.ajax',
            req: req,
            url: apiUrl.querySwitchInfo,
            qs: req.body,
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
            if (body.returnCode == 0) {
                return res.send({
                    error: 0,
                    msg: '查询成功',
                    data: body.body
                });
            } else if (body && body.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: body.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '查询失败'
                });
            }
        });
    });
    //fundid查询条件接口
    app.post('/businessMgmt/switchMgmt/fundSwitchMgmt/queryForFundId.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/businessMgmt/switchMgmt/fundSwitchMgmt/queryForFundId.ajax',
            req: req,
            url: apiUrl.querySwitchforFundId,
            qs: req.body,
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
            if (body.returnCode == 0) {
                return res.send({
                    error: 0,
                    msg: '查询成功',
                    data: body.body
                });
            } else if (body && body.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: body.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '查询失败'
                });
            }
        });
    });
    //name查询条件接口
    app.post('/businessMgmt/switchMgmt/fundSwitchMgmt/queryForName.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/businessMgmt/switchMgmt/fundSwitchMgmt/queryForName.ajax',
            req: req,
            url: apiUrl.querySwitchforName,
            qs: req.body,
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
            if (body.returnCode == 0) {
                return res.send({
                    error: 0,
                    msg: '查询成功',
                    data: body.body
                });
            } else if (body && body.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: body.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '查询失败'
                });
            }
        });
    });
    //查询list
    app.post('/businessMgmt/switchMgmt/fundSwitchMgmt/queryList.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/businessMgmt/switchMgmt/fundSwitchMgmt/queryList.ajax',
            req: req,
            url: apiUrl.querySwitchList,
            qs: {
                pageNum: params.pageNo,
                pageSize: params.pageSize
            },
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
            if (body.returnCode == 0) {
                let data = body.body;
                return res.send({
                    error: 0,
                    msg: '查询成功',
                    data: data
                });
            } else if (body && body.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: body.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '查询失败'
                });
            }
        });
    });
    //查询select
    app.post('/businessMgmt/switchMgmt/fundSwitchMgmt/querySelect.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/businessMgmt/switchMgmt/fundSwitchMgmt/querySelect.ajax',
            req: req,
            url: apiUrl.querySwitchSelect,
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
            if (body.returnCode == 0) {
                return res.send({
                    error: 0,
                    msg: '查询成功',
                    data: body.body
                });
            } else if (body && body.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: body.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '查询失败'
                });
            }
        });
    });
    //查询页数
    app.post('/businessMgmt/switchMgmt/fundSwitchMgmt/queryCount.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/businessMgmt/switchMgmt/fundSwitchMgmt/queryCount.ajax',
            req: req,
            url: apiUrl.queryCount,
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
            if (body.returnCode == 0) {
                return res.send({
                    error: 0,
                    msg: '查询成功',
                    data: body.body
                });
            } else if (body && body.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: body.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '查询失败'
                });
            }
        });
    });
    //新增
    app.post('/businessMgmt/switchMgmt/fundSwitchMgmt/addInfo.ajax', (req, res, next) => {
        let params = JSON.parse(req.body.webParams);
        params.switchName = params.switchName.join('');
        let option = {
            pageUrl: '/businessMgmt/switchMgmt/fundSwitchMgmt/addInfo.ajax',
            req: req,
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrl.addSwitchInfo,
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
            if (body.returnCode == 0) {
                let result = body.body.toString();
                return res.send({
                    error: 0,
                    msg: '新增成功',
                    data: result
                });
            } else if (body && body.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: body.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '新增失败'
                });
            }
        });
    });
    //删除
    app.post('/businessMgmt/switchMgmt/fundSwitchMgmt/deleteInfo.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/businessMgmt/switchMgmt/fundSwitchMgmt/deleteInfo.aja',
            req: req,
            operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrl.deleteSwitchInfo,
            qs: req.body,
            timeout: 15000,
            json: true
        };
        request.delete(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '删除失败'
                });
            }
            if (body.returnCode == 0) {
                return res.send({
                    error: 0,
                    msg: '删除成功',
                    data: null
                });
            } else if (body && body.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: body.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '删除失败'
                });
            }
        });
    });
    //更新
    app.post('/businessMgmt/switchMgmt/fundSwitchMgmt/updateInfo.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/businessMgmt/switchMgmt/fundSwitchMgmt/updateInfo.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrl.updateSwitchInfo,
            body: req.body,
            timeout: 15000,
            json: true
        };
        request.patch(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '更新失败'
                });
            }
            if (body.returnCode == 0) {
                return res.send({
                    error: 0,
                    msg: '更新成功',
                    data: null
                });
            } else if (body && body.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: body.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '更新失败'
                });
            }
        });
    });
};