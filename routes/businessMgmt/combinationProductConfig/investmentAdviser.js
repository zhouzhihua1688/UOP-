const request = require('../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').combinationProductConfig.investmentAdviser;
module.exports = function (app) {
    // 获取初始数据和查询
    app.post('/businessMgmt/combinationProductConfig/investmentAdviser/tableData.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/businessMgmt/combinationProductConfig/investmentAdviser/tableData.ajax',
            req,
            url: apiUrl.tableData,
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
                return res.send({
                    error: 0,
                    msg: '查询成功',
                    data: result.body.reverse()
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
    // 获取渠道 平台
    app.post('/businessMgmt/combinationProductConfig/investmentAdviser/params.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/businessMgmt/combinationProductConfig/investmentAdviser/params.ajax',
            req,
            url: apiUrl.getParams,
            qs: params,
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

    // 获取  组合
    app.post('/businessMgmt/combinationProductConfig/investmentAdviser/labels.ajax', (req, res, next) => {
				let params = {}
				params.groupId = "ALL";
        let option = {
            req,
            pageUrl: '/businessMgmt/combinationProductConfig/investmentAdviser/labels.ajax',
            session: req.session,
            qs: params,
            url: apiUrl.labels,
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
							let resultData= result.body.filter((item)=>{
									return item.isInvestment=='Y'&&(item.fundgroupType=='13'||item.fundgroupType=='14'||item.fundgroupType=='15'||item.fundgroupType=='16'||item.fundgroupType=='17')
							});
							return res.send({
									error: 0,
									msg: '获取成功',
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
									msg: '获取失败'
							});
					}
			});
    });
    // 新增接口
    app.post('/businessMgmt/combinationProductConfig/investmentAdviser/add.ajax', (req, res, next) => {
        // let params = {};
        let option = {
            pageUrl: '/businessMgmt/combinationProductConfig/investmentAdviser/add.ajax',
            req,
            url: apiUrl.add,
            body: req.body,
            timeout: 120000,
            json: true
        };
        request.put(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '新增失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {
                if (result.body === true) {
                    return res.send({
                        error: 0,
                        msg: '新增成功',
                        data: null
                    });
                } else {
                    return res.send({
                        error: 1,
                        msg: '新增失败',
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
                    msg: result.returnMsg
                });
            }
        });
    });
    // 修改接口
    app.post('/businessMgmt/combinationProductConfig/investmentAdviser/modify.ajax', (req, res, next) => {
        // let params = {};
        let option = {
            pageUrl: '/businessMgmt/combinationProductConfig/investmentAdviser/modify.ajax',
            req,
            url: apiUrl.modify,
            body: req.body,
            timeout: 120000,
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
            if (result && result.returnCode == '0') {
                if (result.body === true) {
                    return res.send({
                        error: 0,
                        msg: '修改成功',
                        data: null
                    });
                } else {
                    return res.send({
                        error: 1,
                        msg: '修改失败',
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
                    msg: result.returnMsg
                });
            }
        });
    });
    // 删除接口
    app.post('/businessMgmt/combinationProductConfig/investmentAdviser/delete.ajax', (req, res, next) => {
        // let params = {};
        let option = {
            pageUrl: '/businessMgmt/combinationProductConfig/investmentAdviser/delete.ajax',
            req,
            url: apiUrl.delete,
            qs: req.body,
            timeout: 120000,
            json: true
        };
        request.delete(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '删除失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {
                if (result.body === true) {
                    return res.send({
                        error: 0,
                        msg: '删除成功',
                        data: null
                    });
                } else {
                    return res.send({
                        error: 1,
                        msg: '删除失败',
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
                    msg: '删除失败'
                });
            }
        });
    });
};