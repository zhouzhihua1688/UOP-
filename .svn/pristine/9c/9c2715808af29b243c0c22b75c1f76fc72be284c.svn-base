const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').information.informationQuery;

module.exports = function (app) {
    // 获取列表数据
    app.post('/clientMgmt/information/informationQuery/getTableData.ajax', (req, res, next) => {
        let params = {};
        req.body.pageNo && (params.pageNo = req.body.pageNo);
        req.body.pageSize && (params.pageSize = req.body.pageSize);
        params.fundAcct = req.body.fundAcct;
        params.idNo = req.body.idNo;
        params.tradeAcct = req.body.tradeAcct;
        let option = {
            // pageUrl: '/clientMgmt/information/informationQuery/getTableData.ajax',
            req: req,
            url: apiUrlList.getTableData,
            body: params,
            timeout: 15000,
            json: true
        };
        console.log('/clientMgmt/information/informationQuery/getTableData.ajax option:', option.req ? {
            ...option,
            req: '#',
            body: '******'
        } : option);
        request.post(option, (error, response, body) => {
            console.log('/clientMgmt/information/informationQuery/getTableData.ajax error:', error);
            console.log('/clientMgmt/information/informationQuery/getTableData.ajax statusCode:', response && response.statusCode);
            console.log('/clientMgmt/information/informationQuery/getTableData.ajax body: ******');
            if (error) {
                return res.send({
                    error: 1,
                    msg: '查询失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0 && Array.isArray(result.body.riskAssesses)) {
                let resultData = {};
                resultData.pageNo = params.pageNo; //页数
                // resultData.pageNum = result.body.pageNum; //页数
                resultData.totalSize = Math.ceil(result.body.total / params.pageSize); //总页数d;//总页数
                // resultData.totalSize =result.body.total;
                resultData.tableData = result.body.riskAssesses;
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
    app.post('/clientMgmt/information/informationQuery/details.ajax', (req, res, next) => {
        let params = {};
        params.serialNo = req.body.serialNo;
        let option = {
            pageUrl: '/clientMgmt/information/informationQuery/details.ajax',
            req: req,
            url: apiUrlList.details + params.serialNo,
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
                result.body.answerArr = [];
                let index = 1;
                while (result.body['answer' + index]) {
                    if (result.body['answer' + index] !== 'null') {
                        result.body.answerArr.push(result.body['answer' + index]);
                    }
                    index++;
                }
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
};