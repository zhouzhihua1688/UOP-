const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').businessParamConfig.IPOPreheatSetting;
const XLSX = require('xlsx');
const fs = require('fs');
module.exports = function (app) {
    //查询
    app.post('/businessMgmt/businessParamConfig/IPOPreheatSetting/getTableData.ajax', (req, res, next) => {
        let params = {};
        params.fundId = req.body.fundId;
        let option = {
            pageUrl: '/businessMgmt/businessParamConfig/IPOPreheatSetting/getTableData.ajax',
            req,
            url: apiUrlList.getTableData,
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

    //新增更新
    app.post('/businessMgmt/businessParamConfig/IPOPreheatSetting/add.ajax', (req, res, next) => {
        let params = {};
        params.fundId = req.body.fundId;
        params.fundChineseName = req.body.fundChineseName;
        params.fundName = req.body.fundName;
        params.fundType = req.body.fundType;
        params.fundRiskLevel = req.body.fundRiskLevel;
        let option = {
            pageUrl: '/businessMgmt/businessParamConfig/IPOPreheatSetting/add.ajax',
            req,
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.add,
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
    //修改更新
    app.post('/businessMgmt/businessParamConfig/IPOPreheatSetting/update.ajax', (req, res, next) => {
        let params = {};
        params.fundId = req.body.fundId;
        params.fundChineseName = req.body.fundChineseName;
        params.fundName = req.body.fundName;
        params.fundType = req.body.fundType;
        params.fundRiskLevel = req.body.fundRiskLevel;
        let option = {
            pageUrl: '/businessMgmt/businessParamConfig/IPOPreheatSetting/update.ajax',
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
    // app.post('/businessMgmt/businessParamConfig/IPOPreheatSetting/delete.ajax', (req, res, next) => {
    //     let id = req.body.productId;
    //     let option = {
    //         pageUrl: '/businessMgmt/businessParamConfig/IPOPreheatSetting/delete.ajax',
    //         req,
    //         operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
    //         url: apiUrlList.delete + '?productId=' + id,
    //         // body: params,
    //         timeout: 15000,
    //         json: true
    //     };
    //     request.del(option, (error, response, body) => {
    //         if (error) {
    //             return res.send({
    //                 error: 1,
    //                 msg: '操作失败'
    //             });
    //         }
    //         let result = typeof body === 'string' ? JSON.parse(body) : body;
    //         if (result.returnCode == 0) {
    //             res.send({
    //                 error: 0,
    //                 msg: '操作成功'
    //             });
    //         } else if (result && result.returnCode != 9999) {
    //             res.send({
    //                 error: 1,
    //                 msg: result.returnMsg
    //             });
    //         } else {
    //             res.send({
    //                 error: 1,
    //                 msg: '操作失败'
    //             });
    //         }
    //     });
    // });

    //获取适用场景信息
    app.post('/businessMgmt/businessParamConfig/IPOPreheatSetting/RiskParam.ajax', (req, res, next) => {
        let params = {};
        params.pmst = req.body.pmst;
        params.pmkey = req.body.pmkey;
        params.pmco = req.body.pmco;
        let option = {
            pageUrl: '/businessMgmt/businessParamConfig/IPOPreheatSetting/RiskParam.ajax',
            req,
            url: apiUrlList.RiskParam,
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
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0) {
                return res.send({
                    error: 0,
                    msg: '获取成功',
                    data: result
                });
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '获取失败'
                });
            }
        });

    });

};