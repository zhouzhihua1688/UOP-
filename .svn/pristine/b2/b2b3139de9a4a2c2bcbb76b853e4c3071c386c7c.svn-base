const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').combinationProductConfig.groupDetails;
module.exports = function (app) {
    // 获取列表
    app.post('/businessMgmt/combinationProductConfig/groupDetails/getTableData.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/businessMgmt/combinationProductConfig/groupDetails/getTableData.ajax',
            req,
            url: apiUrlList.getTableData,
            qs: {
                groupId: params.groupId
            },
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
            if (result && result.returnCode == '0' && Array.isArray(result.body)) {
                var tableData = result.body.sort(function (obj1, obj2) {
                    var val1 = obj1['groupId'];
                    var val2 = obj2['groupId'];
                    if (val1 < val2) {
                        return 1;
                    } else if (val1 > val2) {
                        return -1;
                    } else {
                        return 0;
                    }
                }).filter((item) => {
                    if (params.groupType === '') {
                        return true;
                    } else {
                        return params.groupType === item.fundgroupType;
                    }
                })

                return res.send({
                    error: 0,
                    msg: '查询成功',
                    data: tableData
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
    // 获取组合类型下拉数据
    app.post('/businessMgmt/combinationProductConfig/groupDetails/fundGroupType.ajax', (req, res, next) => {
        let params = {};
        params.pmst = req.body.pmst;
        params.pmkey = req.body.pmkey;
        let option = {
            pageUrl: '/businessMgmt/combinationProductConfig/groupDetails/fundGroupType.ajax',
            req,
            url: apiUrlList.fundGroupType,
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
                return res.send({
                    error: 0,
                    msg: '获取成功',
                    data: result
                });

                // result.body = result.body.filter(item => item.pmv1 !== 'A' && item.pmv1 !== 'C');
                // return res.send({error: 0, msg: '获取网点号成功', data: result});

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

    // 获取所有组合
    app.post('/businessMgmt/combinationProductConfig/groupDetails/fundGroups.ajax', (req, res, next) => {
        let params = {}
        params.groupId = "ALL";
        let option = {
            pageUrl: '/businessMgmt/combinationProductConfig/groupDetails/fundGroups.ajax',
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


    // 获取业务详情
    app.post('/businessMgmt/combinationProductConfig/combinationProductReview/details.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/businessMgmt/combinationProductConfig/combinationProductReview/details.ajax',
            req,
            url: apiUrlList.details,
            qs: params,
            timeout: 15000,
            json: true
        };
        request.get(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '查询失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0' && Array.isArray(result.body)) {
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

    // 保存顺序
    app.post('/businessMgmt/combinationProductConfig/combinationProductReview/saveOrder.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/businessMgmt/combinationProductConfig/combinationProductReview/saveOrder.ajax',
            req,
            url: apiUrlList.saveOrder,
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
            if (result && result.returnCode == '0') {
                return res.send({
                    error: 0,
                    msg: '保存成功',
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
                    msg: '保存失败'
                });
            }
        });

    });
};