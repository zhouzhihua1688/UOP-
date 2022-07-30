const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').fundComparison.basicInformation;
module.exports = function (app) {
    // 获取初始数据和查询
    app.post('/businessMgmt/fundComparison/basicInformation/getTableData.ajax', (req, res, next) => {
        let params = {};
        req.body.fundIdList && (params.fundIdList = req.body.fundIdList);
        let option = {
            pageUrl: '/businessMgmt/fundComparison/basicInformation/getTableData.ajax',
            req,
            url: apiUrlList.getTableData,
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
            if (result.returnCode == 0 && Array.isArray(result.body)) {
                // let resultData = {};
                // resultData.tableData = result.body;
                let tableData = result.body.map(fundItem => {
                    let obj = {};
                    obj.fundId = fundItem.fundId;
                    obj.diffResult = fundItem.diffResult;
                    obj.originList = fundItem.originList;
                    obj.parallelList = fundItem.parallelList;
                    return obj;
                });
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
};