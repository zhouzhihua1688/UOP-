const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').businessParamConfig.productOpenDayMgmt;
const XLSX = require('xlsx');
const fs = require('fs');
module.exports = function (app) {
    //查询用户
    app.post('/businessMgmt/businessParamConfig/productOpenDayMgmt/getTableData.ajax', (req, res, next) => {
        let fundId = req.body.fundId;
        // params.page = req.body.page;
        // params.rows = req.body.rows;
        let option = {
            pageUrl: '/businessMgmt/businessParamConfig/productOpenDayMgmt/getTableData.ajax',
            req,
            url: apiUrlList.getTableData + '/' + fundId + '/info/detail/query',
            // qs: params,
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
                let resultData = {};
                resultData.tableData = result.body;
                res.send({
                    error: 0,
                    msg: '查询成功',
                    data: resultData
                });
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
    // 同步跟新
    app.post('/businessMgmt/businessParamConfig/productOpenDayMgmt/syncParams.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/businessMgmt/businessParamConfig/productOpenDayMgmt/syncParams.ajax',
            req,
            url: apiUrlList.syncParams,
            timeout: 15000,
            json: true
        };
        request.patch(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '操作失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0) {
                let resultData = {};
                resultData.tableData = result.body;
                res.send({
                    error: 0,
                    msg: '操作成功',
                    data: resultData
                });
            } else if (result && result.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                res.send({
                    error: 1,
                    msg: '操作失败'
                });
            }
        });
    });
    // 更新验证基金ID是否存在
    app.post('/businessMgmt/businessParamConfig/productOpenDayMgmt/checkId.ajax', (req, res, next) => {
        let fundId = req.body.fundid;
        // params.page = req.body.page;
        // params.rows = req.body.rows;
        let option = {
            pageUrl: '/businessMgmt/businessParamConfig/productOpenDayMgmt/checkId.ajax',
            req,
            url: apiUrlList.checkId + '/' + fundId + '/info/detail/query',
            // qs: params,
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
                let resultData = {};
                resultData.tableData = result.body;
                res.send({
                    error: 0,
                    msg: '操作成功',
                    data: resultData
                });
            } else if (result && result.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: '基金代码不存在'
                });
            } else {
                res.send({
                    error: 1,
                    msg: '操作失败'
                });
            }
        });
    });
    //新增更新
    app.post('/businessMgmt/businessParamConfig/productOpenDayMgmt/saveParam.ajax', (req, res, next) => {
        let params = {};
        params.fundId = req.body.fundId;
        params.expectedOpenDate = req.body.expectedOpenDate;
        params.expectedOpenAmend = req.body.expectedOpenAmend;
        params.expectedOpenDesc = req.body.expectedOpenDesc;
        let option = {
            pageUrl: '/businessMgmt/businessParamConfig/productOpenDayMgmt/saveParam.ajax',
            req,
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.saveParam,
            body: params,
            timeout: 15000,
            json: true
        };
        request.patch(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '操作失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: '操作成功'
                });
            } else if (result && result.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: "参数状态校验不通过"
                });
            } else {
                res.send({
                    error: 1,
                    msg: '操作失败'
                });
            }
        });
    });
    //修改更新
    app.post('/businessMgmt/businessParamConfig/productOpenDayMgmt/update.ajax', (req, res, next) => {
        let params = {};
        params.fundId = req.body.fundId;
        params.expectedOpenDate = req.body.expectedOpenDate;
        params.expectedOpenAmend = req.body.expectedOpenAmend;
        params.expectedOpenDesc = req.body.expectedOpenDesc;
        let option = {
            pageUrl: '/businessMgmt/businessParamConfig/productOpenDayMgmt/update.ajax',
            req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.update,
            body: params,
            timeout: 15000,
            json: true
        };
        request.patch(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '操作失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: '操作成功'
                });
            } else if (result && result.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: "参数状态校验不通过"
                });
            } else {
                res.send({
                    error: 1,
                    msg: '操作失败'
                });
            }
        });
    });

    // 导出
    app.get('/businessMgmt/businessParamConfig/productOpenDayMgmt/exportAll.ajax', (req, res, next) => {

        let getFundIdInfo = new Promise((resolve, reject) => {
            let option = {
                pageUrl: '/businessMgmt/businessParamConfig/productOpenDayMgmt/exportAll.ajax',
                req,
                url: apiUrlList.exportAll,
                qs: {
                    fundTypeCustomized: "OTHER"
                },
                timeout: 60000,
                json: true
            };
            request(option, (error, response, body) => {
                if (error) {
                    reject({
                        message: '获取基金失败'
                    });
                }
                if (body && body.returnCode == 0 && Array.isArray(body.body)) {
                    resolve(body.body.map(item => {
                        let obj = {};
                        obj.fundId = item.fundId;
                        obj.fundName = item.fundName;
                        obj.fundIdDetail = [];
                        return obj;
                    }));
                } else if (body.returnCode != 0 && body.returnCode != 9999) {
                    reject({
                        message: body.returnMsg
                    });
                } else {
                    reject({
                        message: '获取基金失败'
                    });
                }
            });
        });

        function getFundIdDetail(item) {
            return new Promise((resolve, reject) => {
                let option = {
                    pageUrl: '/businessMgmt/businessParamConfig/productOpenDayMgmt/exportAll.ajax',
                    req,
                    // url: apiUrlList.fundDetail[0] + '/' + item.fundId + '/info/detail/query',
                    url: apiUrlList.fundDetail[0] + "/" + item.fundId + apiUrlList.fundDetail[1],
                    qs: {
                        fundId: item.fundId
                    },
                    timeout: 15000,
                    json: true
                };
                request(option, (error, response, body) => {
                    console.log("error===", error)
                    if (error) {
                        // reject({message: '获取基金相关信息失败'});
                        resolve(false);
                    }
                    if (body && body.returnCode == 0) {
                        let bodyArr = []
                        bodyArr.push(body.body)
                        item.fundIdDetail = bodyArr.map(item => {
                            let obj = {};
                            obj.expectedOpenDate = item.expectedOpenDate;
                            obj.expectedOpenAmend = item.expectedOpenAmend;
                            obj.expectedOpenDesc = item.expectedOpenDesc;
                            return obj;
                        });
                        resolve();
                    } else {
                        // reject({message: '获取信息失败'});
                        resolve(false);
                    }
                });
            });
        }
        getFundIdInfo.then(fundIdList => {
            // fundIdList.map(
            //     function (item) {
            //         // console.log("item:==", item)
            //         getFundIdDetail(item)
            //     })
            Promise.all(fundIdList.map((item => getFundIdDetail(item)))).then((error) => {
                if (!error) {
                    return false
                }
                let ExcelData = [
                    ['基金代码', '基金简称', '预计开放时间', '开放类型说明', '内容补充说明']
                ];
                fundIdList.forEach(parentIdInfo => {

                    parentIdInfo.fundIdDetail.forEach(detailInfo => {
                        ExcelData.push([
                            parentIdInfo.fundId,
                            parentIdInfo.fundName,
                            detailInfo.expectedOpenDate,
                            detailInfo.expectedOpenAmend,
                            detailInfo.expectedOpenDesc,
                        ]);
                    });
                });
                const stream = require('stream');
                const book = XLSX.utils.book_new();
                const sheet = XLSX.utils.aoa_to_sheet(ExcelData);
                XLSX.utils.book_append_sheet(book, sheet, "test");
                const fileContents = XLSX.write(book, {
                    type: 'buffer',
                    bookType: 'xlsx',
                    bookSST: false
                });
                let readStream = new stream.PassThrough();
                readStream.end(fileContents);
                let myDate = new Date();
                let mytime = myDate.toLocaleDateString();
                let fileName = mytime + ".xlsx";
                res.set('Content-disposition', 'attachment; filename=' + fileName);
                res.set('Content-Type', 'text/plain');
                readStream.pipe(res);
            }).catch(error => {
                res.send({
                    error: 1,
                    msg: error.message,
                    data: null
                });
            });

        }).catch(error => {
            res.send({
                error: 1,
                msg: error.message,
                data: null
            });
        });
    });
};