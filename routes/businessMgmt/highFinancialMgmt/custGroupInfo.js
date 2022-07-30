const request = require('./../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').highFinancialMgmt.custGroupInfo;
module.exports = function (app) {
    // 获取初始数据和查询
    app.post('/businessMgmt/highFinancialMgmt/custGroupInfo/getTableData.ajax', (req, res, next) => {
        let params = {};
        req.body.custGroupNo && (params.custGroupNo = req.body.custGroupNo);
        req.body.pageNum && (params.pageNum = req.body.pageNum);
        req.body.pageSize && (params.pageSize = req.body.pageSize);
        let option = {
            pageUrl: '/businessMgmt/highFinancialMgmt/custGroupInfo/getTableData.ajax',
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
    // 下拉列表数据
    app.post('/businessMgmt/highFinancialMgmt/custGroupInfo/custList.ajax', (req, res, next) => {
        // let params = {};
        let option = {
            pageUrl: '/businessMgmt/highFinancialMgmt/custGroupInfo/custList.ajax',
            req,
            url: apiUrlList.custList,
            // body: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '获取数据失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {

                return res.send({
                    error: 0,
                    msg: '获取数据成功',
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
                    msg: '获取数据失败'
                });
            }
        });
    });

    //新增数据
    app.post('/businessMgmt/highFinancialMgmt/custGroupInfo/saveParam.ajax', (req, res, next) => {
        let params = {};
        req.body.custGroupNo && (params.custGroupNo = req.body.custGroupNo);
        req.body.custGroupName && (params.custGroupName = req.body.custGroupName);
        req.body.founder && (params.founder = req.body.founder);
        req.body.purpose && (params.purpose = req.body.purpose);
        let option = {
            pageUrl: '/businessMgmt/highFinancialMgmt/custGroupInfo/saveParam.ajax',
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
    app.post('/businessMgmt/highFinancialMgmt/custGroupInfo/update.ajax', (req, res, next) => {
        let params = {};
        req.body.custGroupNo && (params.custGroupNo = req.body.custGroupNo);
        req.body.custGroupName && (params.custGroupName = req.body.custGroupName);
        req.body.founder && (params.founder = req.body.founder);
        req.body.purpose && (params.purpose = req.body.purpose);
        let option = {
            pageUrl: '/businessMgmt/highFinancialMgmt/custGroupInfo/update.ajax',
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