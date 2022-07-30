const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').highNetWorthEquityMgmt.rightsPackageConfig;
module.exports = function (app) {
    // 获取初始数据和查询
    app.post('/awardMgmt/highNetWorthEquityMgmt/rightsPackageConfig/getTableData.ajax', (req, res, next) => {
        let params = {};
        params.id = req.body.id;
        params.pageNo = req.body.pageNo;
        params.pageSize = req.body.pageSize;
        let option = {
            pageUrl: '/awardMgmt/highNetWorthEquityMgmt/rightsPackageConfig/getTableData.ajax',
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
                resultData.tableData = result.body.rows;
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
    app.post('/awardMgmt/highNetWorthEquityMgmt/rightsPackageConfig/saveParam.ajax', (req, res, next) => {
        let params = {};
        params.rightPackageName=req.body.rightPackageName;
        params.rightPackageTitle=req.body.rightPackageTitle;
        params.rightPackageDesc=req.body.rightPackageDesc;
        params.rightPackageDetail=req.body.rightPackageDetail;
        let option = {
            pageUrl: '/awardMgmt/highNetWorthEquityMgmt/rightsPackageConfig/saveParam.ajax',
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
    app.post('/awardMgmt/highNetWorthEquityMgmt/rightsPackageConfig/update.ajax', (req, res, next) => {
        let params = {};
        params.id=req.body.id;
        params.rightPackageName=req.body.rightPackageName;
        params.rightPackageTitle=req.body.rightPackageTitle;
        params.rightPackageDesc=req.body.rightPackageDesc;
        params.rightPackageDetail=req.body.rightPackageDetail;
        let option = {
            pageUrl: '/awardMgmt/highNetWorthEquityMgmt/rightsPackageConfig/update.ajax',
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
    app.post('/awardMgmt/highNetWorthEquityMgmt/rightsPackageConfig/deleteParam.ajax', (req, res, next) => {
        let params = {};
        params.id = req.body.id;
        let option = {
            pageUrl: '/awardMgmt/highNetWorthEquityMgmt/rightsPackageConfig/deleteParam.ajax',
            req,
            operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.deleteParam,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
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

    // 获取权益包编号
    app.post('/awardMgmt/highNetWorthEquityMgmt/rightsPackageConfig/rightListParam.ajax', (req, res, next) => {
        let params = {};
        params.rightNo = req.body.rightNo;
        params.pageNo = req.body.pageNo;
        params.pageSize = req.body.pageSize;
        let option = {
            pageUrl: '/awardMgmt/highNetWorthEquityMgmt/rightsPackageConfig/rightListParam.ajax',
            req: req,
            url: apiUrlList.rightListParam,
            qs: params,
            timeout: 15000,
            json: true
        };
        request.get(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败', data: null});
            }
            if (body.returnCode == 0) {

                res.send({
                    error: 0,
                    msg: '查询成功',
                    data: body.body
                });
            }
            else if (body.returnCode != 0 && body.returnCode != 9999) {
                res.send({error: 1, msg: body.returnMsg, data: null});
            }
            else {
                res.send({error: 1, msg: '查询失败', data: null});
            }
        });
    });
};