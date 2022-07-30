const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').information.assetDataQuery;

module.exports = function (app) {
    // 获取列表数据
    app.post('/clientMgmt/information/assetDataQuery/getTableData.ajax', (req, res, next) => {
        let params = {};
        params.custNo = req.body.custNo;     //客户号
        params.idNo = req.body.idNo;             //证件号码
        params.date= req.body.date;
        params.type=req.body.type;
        params.currencyType=req.body.currencyType;
        let option = {
            pageUrl: '/clientMgmt/information/assetDataQuery/getTableData.ajax',
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
                resultData.tableData = result.body;
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

    // 获取详情
    app.post('/clientMgmt/information/assetDataQuery/details.ajax', (req, res, next) => {
        let params = {};
        params.idNo = req.body.idNo ;
        params.custNo=req.body.custNo;
        params.productId = req.body.productId;
        params.currencyType=req.body.currencyType;
        params.type=req.body.type;
        params.date= req.body.date;
        let option = {
            pageUrl: '/clientMgmt/information/assetDataQuery/details.ajax',
            req: req,
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
                    msg: result.returnMsg
                });
            }
        });

    });
};