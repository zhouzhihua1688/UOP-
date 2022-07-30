const request = require('./../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').highFinancialMgmt.bookingCodeMgmt;
module.exports = function (app) {
    // 获取初始数据和查询
    app.post('/businessMgmt/highFinancialMgmt/bookingCodeMgmt/getTableData.ajax', (req, res, next) => {
        let params = {};
        req.body.accptMd && (params.accptMd = req.body.accptMd);
        req.body.auditStatus && (params.auditStatus = req.body.auditStatus);
        req.body.custNm && (params.custNm = req.body.custNm);
        req.body.deadLineDate && (params.deadLineDate = req.body.deadLineDate);
        req.body.fundId && (params.fundId = req.body.fundId);
        req.body.reserveNo && (params.reserveNo = req.body.reserveNo);
        req.body.status && (params.status = req.body.status);
        req.body.transType && (params.transType = req.body.transType);
        req.body.type && (params.type = req.body.type);
        req.body.pageNum && (params.pageNum = req.body.pageNum);
        req.body.pageSize && (params.pageSize = req.body.pageSize);
        let option = {
            pageUrl: '/businessMgmt/highFinancialMgmt/bookingCodeMgmt/getTableData.ajax',
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
    app.post('/businessMgmt/highFinancialMgmt/bookingCodeMgmt/fundList.ajax', (req, res, next) => {
        let params = {};
        req.body.pageNum && (params.pageNum = req.body.pageNum);
        req.body.pageSize && (params.pageSize = req.body.pageSize);
        let option = {
            pageUrl: '/businessMgmt/highFinancialMgmt/bookingCodeMgmt/fundList.ajax',
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
    // 单笔管理
    app.post('/businessMgmt/highFinancialMgmt/bookingCodeMgmt/saveSingle.ajax', (req, res, next) => {
        let params = {};
        let arr = [];
        req.body.accptMd && (params.accptMd = req.body.accptMd);
        req.body.custNm && (params.custNm = req.body.custNm);
        req.body.deadlineDate && (params.deadlineDate = req.body.deadlineDate);
        req.body.fundId && (params.fundId = req.body.fundId);
        req.body.mobileNo && (params.mobileNo = req.body.mobileNo);
        req.body.nextOpenDate && (params.nextOpenDate = req.body.nextOpenDate);
        req.body.realAmt && (params.realAmt = req.body.realAmt);
        arr.push(params)
        let option = {
            pageUrl: '/businessMgmt/highFinancialMgmt/bookingCodeMgmt/saveSingle.ajax',
            req,
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.saveSingle,
            body: arr,
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
    // 批量发送
    app.post('/businessMgmt/highFinancialMgmt/bookingCodeMgmt/saveBatch.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/businessMgmt/highFinancialMgmt/bookingCodeMgmt/saveBatch.ajax',
            req,
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.saveBatch,
            body: JSON.parse(req.body.arr),
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
    //修改实配额度
    app.post('/businessMgmt/highFinancialMgmt/bookingCodeMgmt/update.ajax', (req, res, next) => {
        let params = {};
        let arr = [];
        req.body.fundId && (params.fundId = req.body.fundId);
        req.body.reserveNo && (params.reserveNo = req.body.reserveNo);
        req.body.realAmt && (params.realAmt = req.body.realAmt);
        params.deadlineDate = req.body.deadlineDate;
        params.auditStatus = req.body.auditStatus;
        arr.push(params)
        let option = {
            pageUrl: '/businessMgmt/highFinancialMgmt/bookingCodeMgmt/update.ajax',
            req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.update,
            body: arr,
            timeout: 15000,
            json: true
        };
        request.put(option, (error, response, body) => {
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
    //设置失效时间-确认发送
    app.post('/businessMgmt/highFinancialMgmt/bookingCodeMgmt/sendOut.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/businessMgmt/highFinancialMgmt/bookingCodeMgmt/sendOut.ajax',
            req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.sendOut,
            body: JSON.parse(req.body.arrList),
            timeout: 15000,
            json: true
        };
        request.put(option, (error, response, body) => {
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
    //设置失效时间-拒绝申请
    app.post('/businessMgmt/highFinancialMgmt/bookingCodeMgmt/refuse.ajax', (req, res, next) => {
        console.log("******", JSON.parse(req.body.refuseList))
        let option = {
            pageUrl: '/businessMgmt/highFinancialMgmt/bookingCodeMgmt/refuse.ajax',
            req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.refuse,
            body: JSON.parse(req.body.refuseList),
            timeout: 15000,
            json: true
        };
        request.put(option, (error, response, body) => {
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
    //设置失效时间-立即失效
    app.post('/businessMgmt/highFinancialMgmt/bookingCodeMgmt/invalid.ajax', (req, res, next) => {
        console.log("******", JSON.parse(req.body.invalidList))
        let option = {
            pageUrl: '/businessMgmt/highFinancialMgmt/bookingCodeMgmt/invalid.ajax',
            req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.invalid,
            body: JSON.parse(req.body.invalidList),
            timeout: 15000,
            json: true
        };
        request.put(option, (error, response, body) => {
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

    // 单笔管理选择产品-获取开放日期
    app.post('/businessMgmt/highFinancialMgmt/bookingCodeMgmt/lookOpenTime.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/businessMgmt/highFinancialMgmt/bookingCodeMgmt/lookOpenTime.ajax',
            req,
            url: apiUrlList.lookOpenTime,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
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
                    msg: '保存成功',
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
                    msg: '保存失败'
                });
            }
        });
    });
};