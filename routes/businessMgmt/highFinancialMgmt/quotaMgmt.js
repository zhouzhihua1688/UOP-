const request = require('./../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').highFinancialMgmt.quotaMgmt;
module.exports = function (app) {
    //获取初始数据和查询
    app.post('/businessMgmt/highFinancialMgmt/quotaMgmt/getTableData.ajax', (req, res, next) => {
        let params = {};
        let fundId = req.body.fundId;
        let opendate = req.body.opendate;
        let currentAmount = req.body.currentAmount;
        let pageNum = req.body.pageNum;
        let pageSize = req.body.pageSize;
        let option = {
            pageUrl: '/businessMgmt/highFinancialMgmt/quotaMgmt/getTableData.ajax',
            req,
            url: apiUrlList.getTableData + '/' + fundId + "?opendate=" + opendate + "&currentAmount=" + currentAmount + "&pageNum=" + pageNum + "&pageSize=" + pageSize,
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
            if (result.returnCode == 0 && Array.isArray(result.body.results)) {
                let resultData = {};
                // resultData.pageNo = result.body.pageNo; //页数

                resultData.pageNo = result.body.pageNo; //页数
                resultData.totalSize = Math.ceil(result.body.totalRecord / req.body.pageSize); //总页数d;//总页数
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
    app.post('/businessMgmt/highFinancialMgmt/quotaMgmt/fundList.ajax', (req, res, next) => {
        let params = {};
        req.body.pageNum && (params.pageNum = req.body.pageNum);
        req.body.pageSize && (params.pageSize = req.body.pageSize);
        let option = {
            pageUrl: '/businessMgmt/highFinancialMgmt/quotaMgmt/fundList.ajax',
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
    // 预约明细查询
    app.post('/businessMgmt/highFinancialMgmt/quotaMgmt/query.ajax', (req, res, next) => {
        let params = {};
        let fundId = req.body.fundId;
        req.body.pageNo && (params.pageNo = req.body.pageNo);
        req.body.pageSize && (params.pageSize = req.body.pageSize);
        let option = {
            pageUrl: '/businessMgmt/highFinancialMgmt/quotaMgmt/query.ajax',
            req,
            url: apiUrlList.query + '/' + fundId + '/quy-reservedetail',
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
            if (result.returnCode == 0 && Array.isArray(result.body.results)) {
                let resultData = {};
                resultData.totalRecord = result.body.totalRecord; //记录数

                resultData.pageNo = result.body.pageNo; //页数
                resultData.totalSize = Math.ceil(result.body.totalRecord / req.body.pageSize); //总页数;//总页数
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
    //修改额度
    app.post('/businessMgmt/highFinancialMgmt/quotaMgmt/update.ajax', (req, res, next) => {
        let params = {};
        req.body.fundId && (params.fundId = req.body.fundId);
        req.body.fundName && (params.fundName = req.body.fundName);
        req.body.maxBookingAmt && (params.maxBookingAmt = req.body.maxBookingAmt);
        req.body.maxSalesAmount && (params.maxSalesAmount = req.body.maxSalesAmount);
        req.body.currentLimit && (params.currentLimit = req.body.currentLimit);
        let option = {
            pageUrl: '/businessMgmt/highFinancialMgmt/quotaMgmt/update.ajax',
            req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.update + '/' + '{fundId}' + '/put-fundinfoex',
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
            if (result.returnCode == 0) {
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
    //新增额度
    app.post('/businessMgmt/highFinancialMgmt/quotaMgmt/saveParam.ajax', (req, res, next) => {
        let params = {};
        req.body.fundId && (params.fundId = req.body.fundId);
        req.body.fundName && (params.fundName = req.body.fundName);
        req.body.maxBookingAmt && (params.maxBookingAmt = req.body.maxBookingAmt);
        req.body.maxSalesAmount && (params.maxSalesAmount = req.body.maxSalesAmount);
        req.body.currentLimit && (params.currentLimit = req.body.currentLimit);
        let option = {
            pageUrl: '/businessMgmt/highFinancialMgmt/quotaMgmt/saveParam.ajax',
            req,
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.saveParam + '/' + '{fundId}' + '/put-fundinfoex',
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
            if (result.returnCode == 0) {
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
};