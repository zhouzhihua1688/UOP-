const request = require('./../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').monitoring.forms;
const XLSX = require('xlsx');
const path = require('path')
const fs = require('fs')
const monitorIndex = {}
module.exports = function (app) {
    // 获取  交集指标值
    app.post('/productIndexes/monitoring/forms/inIndexs.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            req,
            pageUrl: '/productIndexes/monitoring/forms/inIndexs.ajax',
            session: req.session,
            qs: params,
            url: apiUrl.inIndexs,
            timeout: 15000,
            json: true
        };

        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '指标获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {

                res.send({
                    error: 0,
                    msg: '调用成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '指标获取失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
    // 获取  平台
    app.post('/productIndexes/monitoring/forms/labels.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            req,
            pageUrl: '/productIndexes/monitoring/forms/labels.ajax',
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
                    msg: '数据获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {

                res.send({
                    error: 0,
                    msg: '调用成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '调用失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
    // 获取  查询列表
    app.post('/productIndexes/monitoring/forms/tableData.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            req,
            pageUrl: '/productIndexes/monitoring/forms/tableData.ajax',
            url: apiUrl.tableData,
            qs: params,
            timeout: 15000,
            json: true
        };

        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '数据获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {
                res.send({
                    error: 0,
                    msg: '调用成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '调用失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
    // 获取  指标详情
    app.post('/productIndexes/monitoring/forms/detailData.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            req,
            pageUrl: '/productIndexes/monitoring/forms/detailData.ajax',
            url: apiUrl.detailData,
            qs: params,
            timeout: 15000,
            json: true
        };

        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '数据获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {
                res.send({
                    error: 0,
                    msg: '调用成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '调用失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
    app.post('/productIndexes/monitoring/forms/monitorIndex.ajax', (req, res, next) => {
        let option = {
            req,
            pageUrl: '/productIndexes/monitoring/forms/monitorIndex.ajax',
            url: apiUrl.monitorIndex,
            timeout: 15000,
            json: true
        };

        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '数据获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {
                for (var k in result.body) {
                    result.body[k].forEach(function (item) {
                        monitorIndex[item.indexid] = item.indexName
                    })
                }
                res.send({
                    error: 0,
                    msg: '调用成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '调用失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
    // 报表导出
    app.get('/productIndexes/monitoring/forms/exportExcel.ajax', (req, res, next) => {
        var pageSize = req.query.totalPage * req.query.pageSize;
        var params = {
            ...req.query,
            pageSize
        };
        params.pageNo = '1';
        delete params.totalPage;
        params.pageSize = params.pageSize > 9999 ? 9999 : params.pageSize;
        let option = {
            session: req.session,
            url: apiUrl.tableData,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/productIndexes/monitoring/forms/exportExcel.ajax option:', {
            ...option,
            req: '#'
        });
        // request(option).pipe(res);
        request(option, (error, response, body) => {
            console.log('/productIndexes/monitoring/forms/exportExcel.ajax error:', error);
            console.log('/productIndexes/monitoring/forms/exportExcel.ajax statusCode:', response && response.statusCode);
            console.log('/productIndexes/monitoring/forms/exportExcel.ajax body:', {
                ...body,
                ['body']: '*****'
            });
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
                if (data && data.pageResult && Array.isArray(data.pageResult) && data.pageResult.length > 0) {
                    console.log("----------", data)
                    var arr = [
                        ['平台', '专区', '产品代码', '产品名称', '监控指标类型', '监控指标名称', '监控值', '预警值', '指标值', '净值日期']
                    ];
                    var obj = {
                        "1": "收益",
                        "2": "波动",
                        "3": "风险",
                        "4": "胜率",
                    }
                    data.pageResult.forEach(function (item) {
                        arr.push([item.salePlatform, item.salePosition, item.productid, item.productName, (obj[item.showCategory] || item.showCategory), item.indexName, item.targetValue, item.alarmValue, item.indexValue, item.calcDate])
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

    // 净值导出
    app.get('/productIndexes/monitoring/forms/navExport.ajax', (req, res, next) => {
        var params = {};
        if(req.query.str){
            req.query.str.split('&').forEach((item)=>{
                params[item.split('=')[0]] = item.split('=')[1];
            })
        }
        console.log('params---------',params);
        let option = {
            session: req.session,
            url: apiUrl.navExport,
            qs: params,
            timeout: 15000,
            json: true
        };
        // console.log('/productIndexes/monitoring/forms/navExport.ajax option:', {
        //     ...option,
        //     req: '#'
        // });
        // request(option).pipe(res);
        request(option, (error, response, body) => {
            // console.log('/productIndexes/monitoring/forms/navExport.ajax error:', error);
            // console.log('/productIndexes/monitoring/forms/navExport.ajax statusCode:', response && response.statusCode);
            // console.log('/productIndexes/monitoring/forms/navExport.ajax body:', {
            //     ...body,
            //     ['body']: '*****'
            // });
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
                data = data && data.productNav;
                if (data && Array.isArray(data) && data.length > 0) {
                    // console.log("----------", data)
                    var arr = [
                        ['产品代码', '产品名称', '净值日期', '单位净值', '复权净值', '累计净值', '累计收益率', '基准收益率']
                    ];
                    // var obj = {
                    //     "1": "收益",
                    //     "2": "波动",
                    //     "3": "风险",
                    //     "4": "胜率",
                    // }
                    data.forEach(function (item) {
                        arr.push([item.productId, item.productName, item.navDate, item.unitNv, item.restoredNv, item.accumulatedNv, item.groupYield, item.comparisonYield])
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
    // 业绩导出任务
    app.post('/productIndexes/monitoring/forms/performanceTask.ajax', (req, res, next) => {
        var params = req.body;
        let option = {
            session: req.session,
            url: apiUrl.performanceTask,
            body: params,
            timeout: 120000,
            json: true
        };
        console.log('/productIndexes/monitoring/forms/performanceTask.ajax option:', {
            ...option,
            req: '#'
        });
        request.post(option, (error, response, body) => {
            console.log('/productIndexes/monitoring/forms/performanceTask.ajax error:', error);
            console.log('/productIndexes/monitoring/forms/performanceTask.ajax statusCode:', response && response.statusCode);
            console.log('/productIndexes/monitoring/forms/performanceTask.ajax body:', body);
            if (error) {
                return res.send({
                    error: 1,
                    msg: '数据获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {
                res.send({
                    error: 0,
                    msg: '调用成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '调用失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
    // 业绩导出任务
    app.post('/productIndexes/monitoring/forms/performanceStatus.ajax', (req, res, next) => {
        var params = req.body;
        let option = {
            session: req.session,
            url: apiUrl.performanceStatus,
            qs: params,
            timeout: 120000,
            json: true
        };
        console.log('/productIndexes/monitoring/forms/performanceStatus.ajax option:', {
            ...option,
            req: '#'
        });
        request(option, (error, response, body) => {
            console.log('/productIndexes/monitoring/forms/performanceStatus.ajax error:', error);
            console.log('/productIndexes/monitoring/forms/performanceStatus.ajax statusCode:', response && response.statusCode);
            console.log('/productIndexes/monitoring/forms/performanceStatus.ajax body:', body);
            if (error) {
                return res.send({
                    error: 1,
                    msg: '数据获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {
                res.send({
                    error: 0,
                    msg: '调用成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '调用失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
    // 业绩导出
    app.get('/productIndexes/monitoring/forms/performanceExport.ajax', (req, res, next) => {
        var filename = req.query.filename;
        try {
            var filePath=path.join(apiUrl.productIndexesFilePath, filename)
            var size = fs.statSync(filePath).size;
            var f = fs.createReadStream(filePath);
            res.writeHead(200, {
                'Content-Type': 'application/force-download',
                'Content-Disposition': 'attachment; filename=' + encodeURIComponent(filename),
                'Content-Length': size
            });
            f.pipe(res);
        } catch (err) {
            console.log(err)
        }
    });
    // 监控指标导出
    app.get('/productIndexes/monitoring/forms/monitorExport.ajax', (req, res, next) => {
        console.log('=======req.query.params', req.query.params)
        var params = JSON.parse(req.query.params);
        // console.log('=======params', params)
        let option = {
            session: req.session,
            url: apiUrl.monitorExport,
            body: params,
            timeout: 120000,
            json: true
        };
        console.log('/productIndexes/monitoring/forms/monitorExport.ajax option:', {
            ...option,
            req: '#'
        });
        // request(option).pipe(res);
        request.post(option, (error, response, body) => {
            console.log('/productIndexes/monitoring/forms/monitorExport.ajax error:', error);
            console.log('/productIndexes/monitoring/forms/monitorExport.ajax statusCode:', response && response.statusCode);
            // console.log('/productIndexes/monitoring/forms/monitorExport.ajax body:', body);
            if (error) {
                return res.send({
                    error: 1,
                    msg: '操作失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            // console.log('-----------result', result);
            if (result && result.returnCode == 0) {
                let data = result.body;
                var showProductCategory = {
                    "0": "基金",
                    "1": "开放式",
                    "2": "发车制",
                    "3": "目标盈",
                }
                if (data && Array.isArray(data) && data.length > 0) {

                    // 合并平台，专区，产品相同的数据，并根据日期从小到大排序
                    var arrays = [];
                    data.forEach((list, index) => {
                        list.productCategory = showProductCategory[list.productCategory]
                        var targetData = arrays.find((item) => {
                            return (item.salePlatform === list.salePlatform && item.salePosition === list.salePosition && item.productid === list.productid)
                        })
                        if (targetData) {
                            targetData.exportIndexVOList = targetData.exportIndexVOList.concat(list.exportIndexVOList)
                            targetData.exportIndexVOList.sort((a, b) => a.calcDate > b.calcDate ? 1 : -1)
                        } else {
                            arrays.push(list)
                        }
                    })

                    // 根据日期合并数据
                    arrays.forEach(list => {
                        list.waitExport = {}
                        list.exportIndexVOList.forEach(item => {
                            if (list.waitExport[item.calcDate]) {
                                list.waitExport[item.calcDate][item.indexName] = item.indexValue;
                            } else {
                                list.waitExport[item.calcDate] = {
                                    [item.indexName]: item.indexValue
                                };
                            }
                        })
                        delete list.exportIndexVOList;
                    })

                    var title = ['净值日期', "类型", "平台", "专区", "产品代码", "产品名称"];
                    var arr = [title];
                    arrays.forEach(list => {
                        Object.keys(list.waitExport).forEach((keys) => {

                            arr.push([keys, list.productCategory, list.salePlatform, list.salePosition, list.productid, list.productName])
                            var bottomIndex = arr.length - 1;
                            for (let name in list.waitExport[keys]) {
                                var index = arr[0].indexOf(name);
                                if (index === -1) { //添加标题
                                    arr[0].push(name)
                                    index = arr[0].length - 1;
                                    arr[bottomIndex][index] = list.waitExport[keys][name]
                                } else {
                                    arr[bottomIndex][index] = list.waitExport[keys][name]
                                }
                            }
                        })
                    })
                    arr[0].forEach((item, ind, me) => {
                        if (monitorIndex[item]) {
                            me[ind] = monitorIndex[item]
                        }
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
    // 获取 选项列表
    app.post('/productIndexes/monitoring/forms/labelCollection.ajax', (req, res, next) => {
        let option = {
            req,
            pageUrl: '/productIndexes/monitoring/forms/labelCollection.ajax',
            url: apiUrl.labelCollection,
            timeout: 15000,
            json: true
        };

        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '数据获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {
                res.send({
                    error: 0,
                    msg: '调用成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '调用失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
};