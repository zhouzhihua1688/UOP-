const request = require('./../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').monitoring.thirdPartyGroup;
const XLSX = require('xlsx');
module.exports = function (app) {

    // 获取  查询选项
    app.post('/productIndexes/monitoring/thirdPartyGroup/labels.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            req,
            pageUrl: '/productIndexes/monitoring/thirdPartyGroup/labels.ajax',
            url: apiUrl.labels,
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
                res.send({
                    error: 0,
                    msg: '查询成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '查询失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
    // 获取  查询业绩基准选项
    app.post('/productIndexes/monitoring/thirdPartyGroup/indexStandard.ajax', (req, res, next) => {
        let option = {
            req,
            pageUrl: '/productIndexes/monitoring/thirdPartyGroup/indexStandard.ajax',
            url: apiUrl.indexStandard,
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
                res.send({
                    error: 0,
                    msg: '查询成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '查询失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
    // 获取  组合列表
    app.post('/productIndexes/monitoring/thirdPartyGroup/collections.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            req,
            pageUrl: '/productIndexes/monitoring/thirdPartyGroup/collections.ajax',
            url: apiUrl.collections,
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
                res.send({
                    error: 0,
                    msg: '查询成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '查询失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
    // 获取  市场基金
    app.post('/productIndexes/monitoring/thirdPartyGroup/bazaarFund.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            req,
            pageUrl: '/productIndexes/monitoring/thirdPartyGroup/bazaarFund.ajax',
            url: apiUrl.bazaarFund,
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
                res.send({
                    error: 0,
                    msg: '查询成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '查询失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
    // 获取  查询调仓
    app.post('/productIndexes/monitoring/thirdPartyGroup/queryStorage.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            req,
            pageUrl: '/productIndexes/monitoring/thirdPartyGroup/queryStorage.ajax',
            url: apiUrl.queryStorage,
            qs: params,
            timeout: 15000,
            json: true
        };

        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '调仓信息查询失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {
                res.send({
                    error: 0,
                    msg: '调仓信息查询成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '调仓信息查询失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
    // 查询产品状态
    app.post('/productIndexes/monitoring/thirdPartyGroup/productStatus.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            req,
            pageUrl: '/productIndexes/monitoring/thirdPartyGroup/productStatus.ajax',
            url: apiUrl.productStatus,
            qs: params,
            timeout: 15000,
            json: true
        };

        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '产品状态查询失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {
                res.send({
                    error: 0,
                    msg: '产品状态查询成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '产品状态查询失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
    // 获取  新增
    app.post('/productIndexes/monitoring/thirdPartyGroup/add.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            req,
            pageUrl: '/productIndexes/monitoring/thirdPartyGroup/add.ajax',
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrl.add,
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
            if (result && result.returnCode == '0' && result.body) {
                res.send({
                    error: 0,
                    msg: '新增成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '新增失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
    // 获取  修改基本信息
    app.post('/productIndexes/monitoring/thirdPartyGroup/modifyBaseInfo.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            req,
            pageUrl: '/productIndexes/monitoring/thirdPartyGroup/modifyBaseInfo.ajax',
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrl.modifyBaseInfo,
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
            if (result && result.returnCode == '0' && result.body) {
                res.send({
                    error: 0,
                    msg: '修改成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '修改失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
    //   修改-新增调仓信息
    app.post('/productIndexes/monitoring/thirdPartyGroup/addySourceInfo.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            req,
            pageUrl: '/productIndexes/monitoring/thirdPartyGroup/addySourceInfo.ajax',
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: `${apiUrl.addySourceInfo}?type=${params.type}`,
            body: params.params,
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
            if (result && result.returnCode == '0') {
                if (result.body) {
                    res.send({
                        error: 0,
                        msg: '修改成功',
                        data: result.body
                    });
                } else {
                    res.send({
                        error: 1,
                        msg: '修改失败',
                        data: result.body
                    });
                }

            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '修改失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
    //   修改原始调仓信息
    app.post('/productIndexes/monitoring/thirdPartyGroup/modifySourceInfo.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            req,
            pageUrl: '/productIndexes/monitoring/thirdPartyGroup/modifySourceInfo.ajax',
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrl.modifySourceInfo,
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
            if (result && result.returnCode == '0') {
                if (result.body) {
                    res.send({
                        error: 0,
                        msg: '修改成功',
                        data: result.body
                    });
                } else {
                    res.send({
                        error: 1,
                        msg: '修改失败',
                        data: result.body
                    });
                }
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '修改失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
    //   同步组合
    app.post('/productIndexes/monitoring/thirdPartyGroup/syncGroup.ajax', (req, res, next) => {
        // let params = req.body;
        let option = {
            req,
            pageUrl: '/productIndexes/monitoring/thirdPartyGroup/syncGroup.ajax',
            // operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrl.syncGroup,
            // body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '同步失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0' && result.body) {
                res.send({
                    error: 0,
                    msg: '同步成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '同步失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });


    //   删除调仓
    app.post('/productIndexes/monitoring/thirdPartyGroup/delStorage.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            req,
            pageUrl: '/productIndexes/monitoring/thirdPartyGroup/delStorage.ajax',
            operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrl.delStorage,
            body: params.fundgroupChangeSerialNoList,
            timeout: 15000,
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
            if (result && result.returnCode == '0' && result.body) {
                res.send({
                    error: 0,
                    msg: '删除成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '删除失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
    //   删除
    app.post('/productIndexes/monitoring/thirdPartyGroup/del.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            req,
            pageUrl: '/productIndexes/monitoring/thirdPartyGroup/del.ajax',
            operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrl.del,
            qs: params,
            timeout: 15000,
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
            if (result && result.returnCode == '0' && result.body) {
                res.send({
                    error: 0,
                    msg: '删除成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '删除失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
    //   查询上架平台和渠道码
    app.post('/productIndexes/monitoring/thirdPartyGroup/channelAll.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            req,
            pageUrl: '/productIndexes/monitoring/thirdPartyGroup/channelAll.ajax',
            url: apiUrl.channelAll,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '上架平台和渠道码查询失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0' && result.body) {
                res.send({
                    error: 0,
                    msg: '上架平台和渠道码查询成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '上架平台和渠道码查询失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });

    // 自定义导出
    app.get('/productIndexes/monitoring/thirdPartyGroup/export.ajax', (req, res, next) => {
        var params = req.query.params;
        let option = {
            session: req.session,
            url: apiUrl.exports,
            body: JSON.parse(params).customProductROList,
            timeout: 100000,
            json: true
        };
        console.log('/productIndexes/monitoring/thirdPartyGroup/export.ajax option:', {
            ...option,
            req: '#'
        });
        // request(option).pipe(res);
        request.post(option, (error, response, body) => {
            console.log('/productIndexes/monitoring/thirdPartyGroup/export.ajax error:', error);
            console.log('/productIndexes/monitoring/thirdPartyGroup/export.ajax statusCode:', response && response.statusCode);
            // console.log('/productIndexes/monitoring/thirdPartyGroup/export.ajax body:', body);
            if (error) {
                return res.send({
                    error: 1,
                    msg: '操作失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            // console.log(result);
            if (result && result.returnCode == 0) {
                let data = result.body;
                console.log('data----------',data);
                if (data && Array.isArray(data) && data.length > 0) {
                    var title = ["一级平台","二级平台", '渠道码', "组合代码", "组合名称", '组合大类', '组合策略','创建组合日期', '最新调仓日期',"冷静期（目标盈）", "持有期（目标盈/发车制）", '目标收益率（目标盈）', ' 产品类型', '基金代码', '基金名称', '占比', '生效日期', '失效日期','是否是我司产品'];
                    var arr = [title];

                    data.forEach((item) => {
                        arr.push([item.parentPlatform,item.salePlatform, item.channelCode, item.groupid, item.groupName, item.fundgroupCategory,item.strategyStyle,item.createFgDate,item.latestChFgDate,  item.calmPeriod, item.holdPeriod, item.targetYield, item.fundType, item.fundId, item.fundName, item.fundPercent, item.effectDate, item.invalidDate,item.isHTF ])
                    })
                    const stream = require('stream');
                    const book = XLSX.utils.book_new();
                    const sheet = XLSX.utils.aoa_to_sheet(arr);
                    XLSX.utils.book_append_sheet(book, sheet, "test");
                    const fileContents = XLSX.write(book, {
                        type: 'buffer',
                        bookType: 'xlsx',
                        bookSST: false
                    });
                    let readStream = new stream.PassThrough();
                    readStream.end(fileContents);
                    let fileName = new Date().toLocaleDateString() + ".xlsx";
                    res.set('Content-disposition', 'attachment; filename=' + fileName);
                    res.set('Content-Type', 'text/plain');
                    readStream.pipe(res);
                } else {
                    res.send('没有数据');
                }
            } else if (result && result.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                res.send({
                    error: 1,
                    msg: '查询失败'
                });
            }
        });
    });

};