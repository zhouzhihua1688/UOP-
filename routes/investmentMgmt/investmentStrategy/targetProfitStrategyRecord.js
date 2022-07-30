const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').investmentStrategy.targetProfitStrategyRecord;
const investTableName = 'uop_log_invest';
const baseUrl = '/investmentMgmt/investmentStrategy/targetProfitStrategyRecord'
module.exports = function (app) {
    // 获取初始数据和查询
    app.post(`${baseUrl}/getTableData.ajax`, (req, res, next) => {
        let params = {};
        params.pageNo = parseInt(req.body.pageNo);
        params.pageSize = parseInt(req.body.pageSize);
        req.body.groupId && (params.groupId = req.body.groupId)
        let option = {
            pageUrl: `${baseUrl}/getTableData.ajax`,
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
            if (result && result.returnCode == '0') {
                let data = result.body;
                // data.userId=userId;
                // data.pages = Math.ceil(data.total / params.pageSize);//最大页码
                // data.pageNum = params.pageNo;//当前页
                res.send({
                    error: 0,
                    msg: '查询成功',
                    data: data
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
    // 获取所有组合
    app.post(`${baseUrl}/fundGroups.ajax`, (req, res, next) => {
        let params = {}
        params.groupId = "ALL";
        let option = {
            pageUrl: `${baseUrl}/fundGroups.ajax`,
            req,
            url: apiUrlList.fundGroups,
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
				result.body = result.body.filter(item=>item.isInvestment=='Y')
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
	// 获取所有发车系列信息
	app.post(`${baseUrl}/getShiftTypeList.ajax`, (req, res, next) => {
        let option = {
            pageUrl: `${baseUrl}/getShiftTypeList.ajax`,
            req,
            url: apiUrlList.shiftTypeList,
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
                    msg: '获取失败'
                });
            }
        });
    });
    // 新增
    app.post(`${baseUrl}/add.ajax`, (req, res, next) => {
        let params = req.body;
		params.targetReturnPercent = Number(params.targetReturnPercent);
		params.isEndWin = Number(params.isEndWin);
        let option = {
            pageUrl: `${baseUrl}/add.ajax`,
            req,
            url: apiUrlList.add,
            body:params,
            timeout: 15000,
            json: true
        };
		request.post(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            if (body.returnCode == 0) {
                return res.send({error: 0, msg: '操作成功', data: body.body});
            } else if (body.returnCode != 0 && body.returnCode != 9999) {
                return res.send({error: 1, msg: body.returnMsg, data: null});
            } else {
                return res.send({error: 1, msg: '操作失败', data: null});
            }
        });
    });
	// 修改
    app.post(`${baseUrl}/modify.ajax`, (req, res, next) => {
        let params = req.body;
		params.targetReturnPercent = Number(params.targetReturnPercent);
		params.isEndWin = Number(params.isEndWin);
        let option = {
            pageUrl: `${baseUrl}/modify.ajax`,
            req,
            url: apiUrlList.update,
            body:params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            if (body.returnCode == 0) {
                return res.send({error: 0, msg: '操作成功', data: body.body});
            } else if (body.returnCode != 0 && body.returnCode != 9999) {
                return res.send({error: 1, msg: body.returnMsg, data: null});
            } else {
                return res.send({error: 1, msg: '操作失败', data: null});
            }
        });
    });
};