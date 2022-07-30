const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').combinationProductConfig.productParamsAdd;
module.exports = function (app) {
    // 获取初始数据和查询
    app.post('/businessMgmt/combinationProductConfig/productParamsAdd/getTableData.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/businessMgmt/combinationProductConfig/productParamsAdd/getTableData.ajax',
            req,
            url: apiUrlList.getTableData,
            // body: params,
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
    app.post('/businessMgmt/combinationProductConfig/productParamsAdd/saveParam.ajax', (req, res, next) => {
        let params = {};
        params.groupid = req.body.groupid;
        params.shiftType = req.body.shiftType;
        params.totalPeriod = req.body.totalPeriod;
        params.defaultEndOperation = req.body.defaultEndOperation;
        params.optionalEndOperations = req.body.optionalEndOperations;
        params.bidStartDate = req.body.bidStartDate;
        params.bidStartTime = req.body.bidStartTime;
        params.bidStartTime = req.body.bidStartTime;
        params.bidEndDate = req.body.bidEndDate;
        params.bidEndTime = req.body.bidEndTime;
        params.operationEndDate = req.body.operationEndDate;
        params.operationEndTime = req.body.operationEndTime;
        params.endTransformerGroup = req.body.endTransformerGroup; //新增字段
        let option = {
            pageUrl: '/businessMgmt/combinationProductConfig/productParamsAdd/saveParam.ajax',
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
    app.post('/businessMgmt/combinationProductConfig/productParamsAdd/update.ajax', (req, res, next) => {
        let params = {};
        params.serialno = req.body.serialno;
        params.groupid = req.body.groupid;
        params.shiftType = req.body.shiftType;
        params.totalPeriod = req.body.totalPeriod;
        params.defaultEndOperation = req.body.defaultEndOperation;
        params.optionalEndOperations = req.body.optionalEndOperations;
        params.bidStartDate = req.body.bidStartDate;
        params.bidStartTime = req.body.bidStartTime;
        params.bidStartTime = req.body.bidStartTime;
        params.bidEndDate = req.body.bidEndDate;
        params.bidEndTime = req.body.bidEndTime;
        params.operationEndDate = req.body.operationEndDate;
        params.operationEndTime = req.body.operationEndTime;
        params.endTransformerGroup = req.body.endTransformerGroup; //新增字段
        let option = {
            pageUrl: '/businessMgmt/combinationProductConfig/productParamsAdd/update.ajax',
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

    //查询所有系列
    app.post('/businessMgmt/combinationProductConfig/productParamsAdd/SeriesList.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/businessMgmt/combinationProductConfig/productParamsAdd/SeriesList.ajax',
            req,
            url: apiUrlList.SeriesList,
            // body: params,
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
                resultData.SeriesData = result.body
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

    // 验证是不是发车组合
    app.post('/businessMgmt/combinationProductConfig/productParamsAdd/getFundGroup.ajax', (req, res, next) => {
        var params = {}
        params.groupid = req.body.groupid;
        let option = {
            pageUrl: '/businessMgmt/combinationProductConfig/productParamsAdd/getFundGroup.ajax',
            req,
            url: apiUrlList.getFundGroup,
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
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            console.log(result, '---result----');
            if (result && result.returnCode == '0') {
                // var resultData=result.body;
                // resultData.forEach((item) => {
                //     item.check = false;
                // });
                let resultData = {};
                resultData.tableData = result.body;
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
};