const request = require('../../../local_data/requestWrapper');
const fs = require('fs');
const path = require('path');
const apiUrlList = require('../apiConfig').recommendSystem.recommendSystemConfigMgmt.positionTheThemeMgmtModify;
module.exports = function (app) {

    //根据contentTp查询主题信息
    app.post('/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/themeInfoForContentTp.ajax', (req, res, next) => {
        let params = req.body;
        let userId= req.session.loginInfo.userid;
        let option = {
            pageUrl: '/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/themeInfoForContentTp.ajax',
            req: req,
            // operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.themeInfoForContentTp,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '获取主题信息失败'
                });
            }
            if (body && body.returnCode == 0) {
                let data={};
                data.userId=userId;
                data.resultData=body.body;
                res.send({
                    error: 0,
                    msg: '获取主题信息成功',

                    data: data
                });
            } else if (body && body.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: body.returnMsg
                });
            } else {
                res.send({
                    error: 1,
                    msg: '获取主题信息失败'
                });
            }
        });
    });
    // 根据objconfigID查询主题信息
    app.post('/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/queryThemeInfoDisplay.ajax', (req, res, next) => {
        let params = req.body;
        let userId= req.session.loginInfo.userid;
        let option = {
            pageUrl: '/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/queryThemeInfoDisplay.ajax',
            req: req,
            // operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.queryThemeInfoDisplay,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '获取主题信息失败'
                });
            }
            if (body && body.returnCode == 0) {
                let data={};
                data.userId=userId;
                data.resultData=body.body;
                console.log('----',body.body,'------');
                res.send({
                    error: 0,
                    msg: '获取主题信息成功',
                    data: data
                });
            } else if (body && body.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: body.returnMsg
                });
            } else {
                res.send({
                    error: 1,
                    msg: '获取主题信息失败'
                });
            }
        });
    });
    //查看主题内容
    app.post('/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/checkThemeContent.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/checkThemeContent.ajax',
            req: req,
            url: apiUrlList.checkThemeContent,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '操作失败'
                });
            }
            if (body && body.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: '操作成功',
                    data: body.body
                });
            } else if (body && body.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: body.returnMsg
                });
            } else {
                res.send({
                    error: 1,
                    msg: '操作失败'
                });
            }
        });
    });
    //修改主题内容
    app.post('/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/themeContentSave.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/themeContentSave.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.saveParams,
            body: params.saveParams,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '操作失败'
                });
            }
            if (body && body.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: '操作成功',
                    data: body.body
                });
            } else if (body && body.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: body.returnMsg
                });
            } else {
                res.send({
                    error: 1,
                    msg: '操作失败'
                });
            }
        });
    });
    //删除主题内容
    app.post('/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/themeContentDelete.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/themeContentDelete.ajax',
            req: req,
            operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.deleteParams,
            body: params.deleteParams,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '操作失败'
                });
            }
            if (body && body.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: '操作成功',
                    data: body.body
                });
            } else if (body && body.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: body.returnMsg
                });
            } else {
                res.send({
                    error: 1,
                    msg: '操作失败'
                });
            }
        });
    });
};