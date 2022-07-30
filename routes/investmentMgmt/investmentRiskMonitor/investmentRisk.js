const request = require('../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').investmentRiskMonitor.investmentRisk;
const XLSX = require('xlsx');
module.exports = function (app) {
    // 查询列表
    app.post('/investmentMgmt/investmentRiskMonitor/investmentRisk/query.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/investmentMgmt/investmentRiskMonitor/investmentRisk/query.ajax',
            req,
            url: apiUrl.getTableData,
            qs: req.body,
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
            if (body.returnCode == 0 && Array.isArray(body.body.records)) {
                return res.send({
                    error: 0,
                    msg: '查询成功',
                    data: body.body.records
                });
            } else if (body.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: body.returnMsg,
                    data: null
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '查询失败',
                    data: null
                });
            }
        });
    });
    app.get('/investmentMgmt/investmentRiskMonitor/investmentRisk/exportExcel.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/investmentMgmt/investmentRiskMonitor/investmentRisk/exportExcel.ajax',
            req,
            url: apiUrl.getTableData,
            qs: req.query,
            timeout: 60000,
            json: true
        };
        // request(option).pipe(res);
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '操作失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;

            if (result && result.returnCode == 0) {
                let data = result.body.records;
                if (data && Array.isArray(data) && data.length > 0) {
                    // console.log("----------", data)
                    var arr = [
                        ['客户号', '合约账户', '组合ID', '触发基金ID', '基金名称', '指标值', '触发日期', '触发时间', '规则指标名称', '规则指标阈值', '交易日期', '触发操作']
                    ];
                    data.forEach(function (item) {
                        if (item.operatorFlag == '1') {
                            item.operatorFlag = '禁止';
                        } else if (item.operatorFlag == '2') {
                            item.operatorFlag = '选择备选基金';
                        } else if (item.operatorFlag == '3') {
                            item.operatorFlag = '延迟发起';
                        }
                        item.realKeyValue = item.realKeyValue + '%';
                        item.thresholdKeyValue = item.thresholdKeyValue + '%';
                        arr.push([item.custNo, item.arAcctName, item.groupId, item.fundId, item.fundName, item.realKeyValue, item.recordDate, item.recordTime, item.thresholdKeyName, item.thresholdKeyValue, item.tradeDate, item.operatorFlag])
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