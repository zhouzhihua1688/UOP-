const request = require('./../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').bankCardAudit.businessHandle;
const XLSX = require('xlsx');
module.exports = function (app) {

    // 获取  初始数据和查询
    app.post('/customerService/bankCardAudit/businessHandle/getList.ajax', (req, res, next) => {
        let params = req.body,
            userName = req.session.loginInfo.username;
        let option = {
            session: req.session,
            req,
            url: apiUrl.getList,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/customerService/bankCardAudit/businessHandle/getList.ajax option:', {
            ...option,
            req: '#'
        });
        request(option, (error, response, body) => {
            console.log('/customerService/bankCardAudit/businessHandle/getList.ajax error:', error);
            console.log('/customerService/bankCardAudit/businessHandle/getList.ajax statusCode:', response && response.statusCode);
            console.log('/customerService/bankCardAudit/businessHandle/getList.ajax body:', {
                ...body,
                ['body']: '*****'
            });
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


    // 导出
    app.get('/customerService/bankCardAudit/businessHandle/exportExcel.ajax', (req, res, next) => {
        var params = req.query;
        params.pageNo = '1';
        params.pageSize = '9999';
        params.appStatus = '1';
        let option = {
            session: req.session,
            req,
            url: apiUrl.getList,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/customerService/bankCardAudit/businessHandle/exportExcel.ajax option:', {
            ...option,
            req: '#'
        });
        // request(option).pipe(res);
        request(option, (error, response, body) => {
            console.log('/customerService/bankCardAudit/businessHandle/exportExcel.ajax error:', error);
            console.log('/customerService/bankCardAudit/businessHandle/exportExcel.ajax statusCode:', response && response.statusCode);
            console.log('/customerService/bankCardAudit/businessHandle/exportExcel.ajax body:', body);
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
                if (data && data.results && Array.isArray(data.results) && data.results.length > 0) {
                    console.log("----------", data)
                    var arr = [
                        ['业务流水号', '渠道号', '客户号', '客户姓名', '手机号码', '手机号码归属地', '原卡号', '新卡号', '申请时间']
                    ];
                    data.results.forEach(function (item) {
                        arr.push([item.appSerialId, item.rsv1, item.custNo, item.custName, item.mobileNo, item.mobileAddr, item.oldBankacco, item.newBankacco, item.appTimestamp])
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
};