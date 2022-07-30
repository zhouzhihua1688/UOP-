const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').highNetWorthEquityMgmt.interestReceiveQuery;
module.exports = function (app) {
    // 获取初始数据和查询
    app.post('/awardMgmt/highNetWorthEquityMgmt/interestReceiveQuery/getTableData.ajax', (req, res, next) => {
        let params = {};
        params.custNo = req.body.custNo;
        let option = {
            pageUrl: '/awardMgmt/highNetWorthEquityMgmt/interestReceiveQuery/getTableData.ajax',
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

    // 获取初始数据和查询
    app.post('/awardMgmt/highNetWorthEquityMgmt/interestReceiveQuery/getTableData2.ajax', (req, res, next) => {
        let params = {};
        // params.custNo = req.body.custNo;
        let option = {
            pageUrl: '/awardMgmt/highNetWorthEquityMgmt/interestReceiveQuery/getTableData2.ajax',
            req,
            url: apiUrlList.getTableData2,
            // qs: params,
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
    //详情数据
    app.post('/awardMgmt/highNetWorthEquityMgmt/interestReceiveQuery/checkDetails.ajax', (req, res, next) => {
        let params = {};
        params.custNo = req.body.custNo;
        params.rightNo = req.body.rightNo;
        let option = {
            pageUrl: '/awardMgmt/highNetWorthEquityMgmt/interestReceiveQuery/checkDetails.ajax',
            req,
            url: apiUrlList.checkDetails,
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
            if (result && result.returnCode == 0) {
                return res.send({
                    error: 0,
                    msg: '操作成功',
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
                    msg: '保存失败'
                });
            }
        });
    });


};