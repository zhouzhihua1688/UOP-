const request = require('./../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').investmentStrategy.productPool;
const XLSX = require('xlsx');
const fs = require('fs');
module.exports = function (app) {
    // 获取初始数据和查询
    app.post('/investmentMgmt/investmentStrategy/productPool/getTableData.ajax', (req, res, next) => {
        // let params = {};
        // req.body.pageNum && (params.pageNum = req.body.pageNum);
        // req.body.pageSize && (params.pageSize = req.body.pageSize);
        let option = {
            pageUrl: '/investmentMgmt/investmentStrategy/productPool/getTableData.ajax',
            req,
            url: apiUrlList.getTableData,
            // body: params,
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
                return res.send({
                    error: 0,
                    msg: '查询成功',
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
                    msg: '查询失败'
                });
            }
        });
    });

    // 刷新
    app.post('/investmentMgmt/investmentStrategy/productPool/showRefresh.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/investmentMgmt/investmentStrategy/productPool/showRefresh.ajax',
            req,
            url: apiUrlList.showRefresh,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '刷新失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {
                return res.send({
                    error: 0,
                    msg: '刷新成功',
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
                    msg: '刷新失败'
                });
            }
        });
    });

    // 导出全量
    app.get('/investmentMgmt/investmentStrategy/productPool/exportAlls.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/investmentMgmt/investmentStrategy/productPool/exportAlls.ajax',
            req,
            url: apiUrlList.exportAlls,
            timeout: 15000,
            json: true
        };
        // request(option).pipe(res);
        request(option, (error, response, body) => {
            console.log("***", error)
            if (error) {
                return res.send({
                    error: 1,
                    msg: '操作失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                let data = result.body;
                if (data && Array.isArray(data) && data.length > 0) {
                    console.log("----------", data)
                    var arr = [
                        ['基金代码', '基金名称', '组合中基金类型', 'TA代码']
                    ];
                    data.forEach(function (item) {
                        arr.push([item.fundId, item.fundName, item.fundTypeForFundgroup, item.taNo])
                    });
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
                    var myDate = new Date();
                    var mytime = myDate.toLocaleDateString();
                    let fileName = mytime + ".xlsx";
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