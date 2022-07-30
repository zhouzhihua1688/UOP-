const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').highNetWorthEquityMgmt.basicInterestConfig;
module.exports = function (app) {
    // 查询
    app.post('/awardMgmt/highNetWorthEquityMgmt/basicInterestConfig/getTableData.ajax', (req, res, next) => {
        let params = {};
        params.rightNo = req.body.rightNo;
        params.pageNo=req.body.pageNo;
        params.pageSize=req.body.pageSize;
        let option = {
            pageUrl: '/awardMgmt/highNetWorthEquityMgmt/basicInterestConfig/getTableData.ajax',
            req: req,
            url: apiUrlList.query,
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
    // 新增
    app.post('/awardMgmt/highNetWorthEquityMgmt/basicInterestConfig/saveParam.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/awardMgmt/highNetWorthEquityMgmt/basicInterestConfig/saveParam.ajax',
            req: req,
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.saveParam,
            body: req.body,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败', data: null});
            }
            if (body.returnCode == 0) {
                res.send({error: 0, msg: '添加成功', data: null});
            }
            else if (body.returnCode != 0 && body.returnCode != 9999) {
                res.send({error: 1, msg: body.returnMsg, data: null});
            }
            else {
                res.send({error: 1, msg: '添加失败', data: null});
            }
        });
    });
    // 修改
    app.post('/awardMgmt/highNetWorthEquityMgmt/basicInterestConfig/update.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/awardMgmt/highNetWorthEquityMgmt/basicInterestConfig/update.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.update,
            body: req.body,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败', data: null});
            }
            if (body.returnCode == 0) {
                res.send({error: 0, msg: '修改成功', data: null});
            }
            else if (body.returnCode != 0 && body.returnCode != 9999) {
                res.send({error: 1, msg: body.returnMsg, data: null});
            }
            else {
                res.send({error: 1, msg: '修改失败', data: null});
            }
        });
    });
    // 删除
    app.post('/awardMgmt/highNetWorthEquityMgmt/basicInterestConfig/del.ajax', (req, res, next) => {
        let params = {};
        params.id = req.body.id;
        let option = {
            pageUrl: '/awardMgmt/highNetWorthEquityMgmt/basicInterestConfig/del.ajax',
            req: req,
            operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.del,
            qs: params,
            timeout: 15000,
            json: true
        };
        request.get(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败', data: null});
            }
            if (body.returnCode == 0) {
                res.send({error: 0, msg: '删除成功', data: null});
            }
            else if (body.returnCode != 0 && body.returnCode != 9999) {
                res.send({error: 1, msg: body.returnMsg, data: null});
            }
            else {
                res.send({error: 1, msg: '删除失败', data: null});
            }
        });
    });
    // 获取合作方
    app.post('/awardMgmt/highNetWorthEquityMgmt/basicInterestConfig/partnersParams.ajax', (req, res, next) => {
        let params = {};
        params.pageNo =req.body.pageNo;
        params.pageSize =req.body.pageSize;
        let option = {
            pageUrl: '/awardMgmt/highNetWorthEquityMgmt/basicInterestConfig/partnersParams.ajax',
            req,
            url: apiUrlList.partnersParams,
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
};