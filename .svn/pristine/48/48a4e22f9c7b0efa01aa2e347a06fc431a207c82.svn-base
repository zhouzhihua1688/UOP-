const request = require('../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').combinationProductConfig.productTargetProfitPlanSetting;
const XLSX = require('xlsx');
const node_xlsx = require('node-xlsx');
const formidable = require('formidable');
const fs = require('fs');
module.exports = function (app) {
    // 获取初始数据和查询
    app.post('/businessMgmt/combinationProductConfig/productTargetProfitPlanSetting/queryAll.ajax', (req, res, next) => {
        // let params = {};
        let option = {
            pageUrl: '/businessMgmt/combinationProductConfig/productTargetProfitPlanSetting/queryAll.ajax',
            req,
            url: apiUrl.queryAll,
            timeout: 120000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '查询失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {
                if(result.body&&Array.isArray(result.body)&&result.body.length>0){
                    result.body.forEach((items)=>{
                        let stringfy='';
                        items.endActionDOList.forEach((item)=>{
                            if(item.endAction==='01'){
                                stringfy+=`达标赎回、`;
                            }else if(item.endAction==='02'){
                                stringfy+=`达标转换为${item.groupidTransed}、`
                            }
                        })
                        stringfy=stringfy.substring(0,stringfy.length-1);
                        items.stringfy=stringfy
                    })
                }
                return res.send({
                    error: 0,
                    msg: '查询成功',
                    data: result.body
                });
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '查询失败'
                });
            }
        });
    });
    // 根据groupId查询
    app.post('/businessMgmt/combinationProductConfig/productTargetProfitPlanSetting/queryGroupId.ajax', (req, res, next) => {
        // let params = {};
        let option = {
            pageUrl: '/businessMgmt/combinationProductConfig/productTargetProfitPlanSetting/queryGroupId.ajax',
            req,
            url: apiUrl.queryGroupId,
            qs:req.body,
            timeout: 120000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '查询失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {
                    let obj=result.body;
                    let stringfy='';
                    let resultData=[];
                    obj.endActionDOList.forEach((item)=>{
                        if(item.endAction==='01'){
                            stringfy+=`达标赎回、`;
                        }else if(item.endAction==='02'){
                            stringfy+=`达标转换为${item.groupidTransed}、`
                        }
                    })
                    stringfy=stringfy.substring(0,stringfy.length-1);
                    obj.stringfy=stringfy
                    resultData.push(obj)
                return res.send({
                    error: 0,
                    msg: '查询成功',
                    data: resultData
                });
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '查询失败'
                });
            }
        });
    });
    // 查询基金和组合的数据
    app.post('/businessMgmt/combinationProductConfig/productTargetProfitPlanSetting/queryFundAll.ajax', (req, res, next) => {
        // 获取产品列表
        let fundList = new Promise(resolve => {
            let option = {
                pageUrl: '/businessMgmt/combinationProductConfig/productTargetProfitPlanSetting/queryFundAll.ajax --fundList',
                req,
                url: apiUrl.collection,
                qs: {
                    fundTypeCustomized: 'all'
                },
                timeout: 15000,
                json: true
            };
            request(option, (error, response, body) => {
                if (error) {
                    return resolve([]);
                }
                if (body && body.returnCode == 0 && Array.isArray(body.body)) {
                    resolve(body.body.map(item => {
                        return {
                            fundId: item.fundId || item.fundid,
                            fundName: item.fundName || item.fundnm,
                        };
                    }));
                } else {
                    resolve([]);
                }
            });
        });
        // 获取组合列表
        let groupList = new Promise(resolve => {
            let option = {
                pageUrl: '/businessMgmt/combinationProductConfig/productTargetProfitPlanSetting/queryFundAll.ajax --groupList',
                req,
                url: apiUrl.fundGroups,
                qs: {
                    groupId: 'ALL',
                },
                timeout: 15000,
                json: true
            };
            request(option, (error, response, body) => {
                if (error) {
                    return resolve([]);
                }
                if (body && body.returnCode == 0 && Array.isArray(body.body)) {
                    resolve(body.body.map(item => {
                        return {
                            fundId: item.groupId,
                            fundName: item.groupName,
                        };
                    }));
                } else {
                    resolve([]);
                }
            });
        });

        let promiseAllParams = [];
        promiseAllParams.push(groupList);
        promiseAllParams.push(fundList);

        Promise.all(promiseAllParams).then(resultArr => {
            let groupList = resultArr[0];
            let allList = resultArr[1].concat(groupList);
            let fundDeatail={
                groupList,
                allList
            }
            res.send({
                error: 0,
                msg: '请求成功',
                data: fundDeatail
            });
        }).catch(error => {
            res.send({
                error: 1,
                msg: error.message,
                data: null
            });
        });
    });
    // 新增修改接口
    app.post('/businessMgmt/combinationProductConfig/productTargetProfitPlanSetting/add.ajax', (req, res, next) => {
        // let params = {};
        let option = {
            pageUrl: '/businessMgmt/combinationProductConfig/productTargetProfitPlanSetting/add.ajax',
            req,
            url: apiUrl.add,
            body:req.body,
            timeout: 120000,
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
            if (result && result.returnCode == '0') {
               if(result.body===true){
                    return res.send({
                        error: 0,
                        msg: '调用成功',
                        data: null
                    });
               }else{
                    return res.send({
                        error: 1,
                        msg: '调用失败',
                        data: null
                    });
               }
               
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '调用失败'
                });
            }
        });
    });
    // 删除接口
    app.post('/businessMgmt/combinationProductConfig/productTargetProfitPlanSetting/delete.ajax', (req, res, next) => {
        // let params = {};
        let option = {
            pageUrl: '/businessMgmt/combinationProductConfig/productTargetProfitPlanSetting/delete.ajax',
            req,
            url: apiUrl.delete,
            qs:req.body,
            timeout: 120000,
            json: true
        };
        request.delete(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '调用失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {
                if(result.body===true){
                    return res.send({
                        error: 0,
                        msg: '调用成功',
                        data: null
                    });
               }else{
                    return res.send({
                        error: 1,
                        msg: '调用失败',
                        data: null
                    });
               }
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '调用失败'
                });
            }
        });
    });
};