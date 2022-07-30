const request = require('./../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').highFinancialMgmt.recommendOtherFund;
module.exports = function (app) {
    // 获取初始数据和查询
    app.post('/businessMgmt/highFinancialMgmt/recommendOtherFund/getTableData.ajax', (req, res, next) => {
        let params = {};
        req.body.fundId && (params.fundId = req.body.fundId);
        req.body.pageNum && (params.pageNum = req.body.pageNum);
        req.body.pageSize && (params.pageSize = req.body.pageSize);
        let option = {
            pageUrl: '/businessMgmt/highFinancialMgmt/recommendOtherFund/getTableData.ajax',
            req,
            url: apiUrlList.getTableData,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '查询失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0 && Array.isArray(result.body.results)) {
                let resultData = {};
                // resultData.pageNo = result.body.pageNo; //页数

                resultData.pageNo = result.body.pageNo; //页数
                resultData.totalSize = Math.ceil(result.body.totalRecord / req.body.pageSize); //总页数
                resultData.tableData = result.body.results;
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
    //下拉列表数据(产品名称)
    app.post('/businessMgmt/highFinancialMgmt/recommendOtherFund/fundList.ajax', (req, res, next) => {
        let params = {};
        req.body.pageNum && (params.pageNum = req.body.pageNum);
        req.body.pageSize && (params.pageSize = req.body.pageSize);
        let option = {
            pageUrl: '/businessMgmt/highFinancialMgmt/recommendOtherFund/fundList.ajax',
            req,
            url: apiUrlList.fundList,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '查询失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0 && Array.isArray(result.body.fundInfos)) {
                let fundData = {};
                fundData.pageNum = result.body.pageNum; //页数
                fundData.totalSize = Math.ceil(result.body.totalSize / req.body.pageSize); //总页数d;//总页数
                fundData.listData = result.body.fundInfos;
                return res.send({
                    error: 0,
                    msg: '查询成功',
                    data: fundData
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
    app.post('/businessMgmt/highFinancialMgmt/recommendOtherFund/saveParam.ajax', (req, res, next) => {
        let params = {};
        req.body.list && (params.fundDisplayControlList = JSON.parse(req.body.list));
        let option = {
            pageUrl: '/businessMgmt/highFinancialMgmt/recommendOtherFund/saveParam.ajax',
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
    //推荐基金
    app.post('/businessMgmt/highFinancialMgmt/recommendOtherFund/changeCode.ajax', (req, res, next) => {
        let params = {};
        req.body.fundId && (params.fundId = req.body.fundId);
        let option = {
            pageUrl: '/businessMgmt/highFinancialMgmt/recommendOtherFund/changeCode.ajax',
            req,
            url: apiUrlList.changeCode,
            qs: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
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
    //删除数据
    app.post('/businessMgmt/highFinancialMgmt/recommendOtherFund/deleteParam.ajax', (req, res, next) => {
        let params = {};
        req.body.fundIds && (params.fundIds = JSON.parse(req.body.fundIds));
        let option = {
            pageUrl: '/businessMgmt/highFinancialMgmt/recommendOtherFund/deleteParam.ajax',
            req,
            operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.deleteParam,
            body: params.fundIds,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
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
    //修改数据
    app.post('/businessMgmt/highFinancialMgmt/recommendOtherFund/update.ajax', (req, res, next) => {
        let params = {};
        req.body.fundId && (params.fundId = req.body.fundId);
        req.body.recommendDate && (params.recommendDate = req.body.recommendDate);
        let option = {
            pageUrl: '/businessMgmt/highFinancialMgmt/recommendOtherFund/update.ajax',
            req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.update,
            body: params,
            timeout: 15000,
            json: true
        };
        request.put(option, (error, response, body) => {
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

}