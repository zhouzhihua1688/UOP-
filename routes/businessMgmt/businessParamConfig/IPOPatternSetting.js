const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').businessParamConfig.IPOPatternSetting;
const XLSX = require('xlsx');
const fs = require('fs');
module.exports = function (app) {
    //查询
    app.post('/businessMgmt/businessParamConfig/IPOPatternSetting/getList.ajax', (req, res, next) => {
        let params = {};
        req.body.productId && (params.productId = req.body.productId);
        params.pageNo = req.body.pageNo;
        params.pageSize = req.body.pageSize;
        let option = {
            pageUrl: '/businessMgmt/businessParamConfig/IPOPatternSetting/getList.ajax',
            req,
            url: apiUrlList.getList,
            body: params,
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
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: '查询成功',
                    data: result.body
                });
            } else if (result && result.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                res.send({
                    error: 1,
                    msg: '操作失败'
                });
            }
        });
    });
    
    // 查询当前产品基本信息，获取募集结束日
    app.post('/businessMgmt/businessParamConfig/IPOPatternSetting/getRecruitEndDate.ajax', (req, res, next) => {
        let fundId = req.body.productId;
        let option = {
            pageUrl: '/businessMgmt/businessParamConfig/IPOPatternSetting/getRecruitEndDate.ajax',
            req,
            url: apiUrlList.getFundInfoBase + '/' + fundId + '/info/base',
            // qs: params,
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
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: '操作成功',
                    data: result.body
                });
            } else if (result && result.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                res.send({
                    error: 1,
                    msg: '操作失败'
                });
            }
        });
    });
    //新增更新
    app.post('/businessMgmt/businessParamConfig/IPOPatternSetting/add.ajax', (req, res, next) => {
        let params = {};
        params.productId = req.body.productId;
        params.recruitEndDate = req.body.recruitEndDate;
        params.isdailyDeliver = req.body.isdailyDeliver;
        params.deliverDate = req.body.deliverDate;
        let option = {
            pageUrl: '/businessMgmt/businessParamConfig/IPOPatternSetting/add.ajax',
            req,
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.add,
            body: params,
            timeout: 15000,
            json: true
        };
        request.put(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '操作失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: '操作成功'
                });
            } else if (result && result.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                res.send({
                    error: 1,
                    msg: '操作失败'
                });
            }
        });
    });
    //修改更新
    app.post('/businessMgmt/businessParamConfig/IPOPatternSetting/update.ajax', (req, res, next) => {
        let params = {};
        params.productId = req.body.productId;
        params.recruitEndDate = req.body.recruitEndDate;
        params.isdailyDeliver = req.body.isdailyDeliver;
        params.deliverDate = req.body.deliverDate;
        let option = {
            pageUrl: '/businessMgmt/businessParamConfig/IPOPatternSetting/update.ajax',
            req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.update,
            body: params,
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
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: '操作成功'
                });
            } else if (result && result.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                res.send({
                    error: 1,
                    msg: '操作失败'
                });
            }
        });
    });
    //删除
    app.post('/businessMgmt/businessParamConfig/IPOPatternSetting/delete.ajax', (req, res, next) => {
        let id = req.body.productId;
        let option = {
            pageUrl: '/businessMgmt/businessParamConfig/IPOPatternSetting/delete.ajax',
            req,
            operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.delete + '?productId=' + id,
            // body: params,
            timeout: 15000,
            json: true
        };
        request.del(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '操作失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: '操作成功'
                });
            } else if (result && result.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: result.returnMsg
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