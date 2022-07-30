/**
 * Created by admin on 2019/5/7.
 */

const request = require('../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').switchMgmt.switchCategoryMgmt;
module.exports = function (app) {
    //查询
    app.post('/businessMgmt/switchMgmt/switchCategoryMgmt/querySwitchInfo.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/businessMgmt/switchMgmt/switchCategoryMgmt/querySwitchInfo.ajax',
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
    //查询列表
    app.post('/businessMgmt/switchMgmt/switchCategoryMgmt/querySwitchList.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/businessMgmt/switchMgmt/switchCategoryMgmt/querySwitchList.ajax',
            req: req,
            url: apiUrl.querySwitchList,
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
    app.post('/businessMgmt/switchMgmt/switchCategoryMgmt/addSwitchInfo.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/businessMgmt/switchMgmt/switchCategoryMgmt/addSwitchInfo.ajax',
            req: req,
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrl.addSwitchInfo,
            body: req.body,
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
                return res.send({
                    error: 0,
                    msg: '新增成功',
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
                    msg: '新增失败'
                });
            }
        });
    });
    //删除
    app.post('/businessMgmt/switchMgmt/switchCategoryMgmt/deleteSwitchInfo.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/businessMgmt/switchMgmt/switchCategoryMgmt/deleteSwitchInfo.ajax',
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
    app.post('/businessMgmt/switchMgmt/switchCategoryMgmt/updateSwitchInfo.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/businessMgmt/switchMgmt/switchCategoryMgmt/updateSwitchInfo.ajax',
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