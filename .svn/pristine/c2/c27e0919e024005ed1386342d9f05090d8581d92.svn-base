const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').productInfoConfig.freeRideProductConfig;
module.exports = function (app) {
    // 获取初始数据和查询
    app.post('/businessMgmt/productInfoConfig/freeRideProductConfig/getTableData.ajax', (req, res, next) => {
        let params = {};
        params.bundleno = req.body.bundleno;
        params.startDate = req.body.startDate;
        let option = {
            pageUrl: '/businessMgmt/productInfoConfig/freeRideProductConfig/getTableData.ajax',
            req,
            url: apiUrlList.getTableData,
            // qs: params,
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
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            console.log(result, '---result----');
            if (result && result.returnCode == '0') {
                // var resultData=result.body;
                // resultData.forEach((item) => {
                //     item.check = false;
                // });
                let resultData = {};
                resultData.tableData = result.body
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
    //新增数据
    app.post('/businessMgmt/productInfoConfig/freeRideProductConfig/saveParam.ajax', (req, res, next) => {
        let params = {};
        params.bundleno = req.body.bundleno;
        params.bundleTopic = req.body.bundleTopic;
        params.startDate = req.body.startDate;
        params.isEnable = req.body.isEnable;
        params.linkUrl=req.body.linkUrl;
        let option = {
            pageUrl: '/businessMgmt/productInfoConfig/freeRideProductConfig/saveParam.ajax',
            req,
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.saveParam,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '保存失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                return res.send({
                    error: 0,
                    msg: '保存成功'
                });
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '保存失败'
                });
            }
        });
    });
    //修改数据
    app.post('/businessMgmt/productInfoConfig/freeRideProductConfig/update.ajax', (req, res, next) => {
        let params = {};
        params.bundleno = req.body.bundleno;
        params.bundleTopic = req.body.bundleTopic;
        params.startDate = req.body.startDate;
        params.isEnable = req.body.isEnable;
        params.linkUrl=req.body.linkUrl;
        let option = {
            pageUrl: '/businessMgmt/productInfoConfig/freeRideProductConfig/update.ajax',
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
                    msg: '修改失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                return res.send({
                    error: 0,
                    msg: '修改成功'
                });
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '修改失败'
                });
            }
        });
    });
    // 删除
    app.post('/businessMgmt/productInfoConfig/freeRideProductConfig/deleteParam.ajax', (req, res, next) => {
        let params = {};
        params.bundleno = req.body.bundleno;
        let option = {
            pageUrl: '/businessMgmt/productInfoConfig/freeRideProductConfig/deleteParam.ajax',
            req,
            operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.deleteParam,
            qs: params,
            timeout: 15000,
            json: true
        };
        request.delete(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '删除失败',
                    data: null
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                return res.send({
                    error: 0,
                    msg: '删除成功',
                    data: null
                });
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '删除失败',
                    data: null
                });
            }
        });
    });


    // 管理基金
    app.post('/businessMgmt/productInfoConfig/freeRideProductConfig/showFund.ajax', (req, res, next) => {
        let params = {};
        params.bundleno = req.body.bundleno;
        let option = {
            pageUrl: '/businessMgmt/productInfoConfig/freeRideProductConfig/showFund.ajax',
            req,
            url: apiUrlList.showFund,
            qs:params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                return res.send({
                    error: 0,
                    msg: '获取成功',
                    data: body
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
    //管理基金-新增
    app.post('/businessMgmt/productInfoConfig/freeRideProductConfig/AddList.ajax', (req, res, next) => {
        let params = {};
        params.bundleno = req.body.bundleno;
        params.fundid = req.body.fundid;
        params.isDisplay = req.body.isDisplay;
        let option = {
            pageUrl: '/businessMgmt/productInfoConfig/freeRideProductConfig/AddList.ajax',
            req,
            url: apiUrlList.AddList,
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
                return res.send({
                    error: 0,
                    msg: '新增成功'
                });
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '新增失败'
                });
            }
        });
    });
    //管理基金-修改
    app.post('/businessMgmt/productInfoConfig/freeRideProductConfig/updateList.ajax', (req, res, next) => {
        let params = {};
        params.bundleno = req.body.bundleno;
        params.fundid = req.body.fundid;
        params.isDisplay = req.body.isDisplay;
        let option = {
            pageUrl: '/businessMgmt/productInfoConfig/freeRideProductConfig/updateList.ajax',
            req,
            url: apiUrlList.updateList,
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
                return res.send({
                    error: 0,
                    msg: '修改成功'
                });
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '修改失败'
                });
            }
        });
    });
    //管理基金-删除
    app.post('/businessMgmt/productInfoConfig/freeRideProductConfig/deleteList.ajax', (req, res, next) => {
        let params = {};
        params.bundleno = req.body.bundleno;
        params.fundId = req.body.fundId;
        let option = {
            pageUrl: '/businessMgmt/productInfoConfig/freeRideProductConfig/deleteList.ajax',
            req,
            url: apiUrlList.deleteList,
            qs: params,
            timeout: 15000,
            json: true
        };
        request.del(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '删除失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                return res.send({
                    error: 0,
                    msg: '删除成功'
                });
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '删除失败'
                });
            }
        });
    });
    // 获取所有基金
    app.post('/businessMgmt/productInfoConfig/freeRideProductConfig/fundList.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/businessMgmt/productInfoConfig/freeRideProductConfig/fundList.aja',
            req,
            url: apiUrlList.fundList,
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
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {
                result.body.forEach(item => {
                    item.check = false;
                    item.fundPercent = '';
                });
                return res.send({
                    error: 0,
                    msg: '查询成功',
                    data: body
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
};