const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').awardSearch.awardRecord;
module.exports = function (app) {
    //查询列表
    app.post('/awardMgmt/awardSearch/awardRecord/getTableData.ajax', (req, res, next) => {
        let params = {};
        req.body.id && (params.id = req.body.id);
        req.body.custNo && (params.custNo = req.body.custNo);
        req.body.mobileNo && (params.mobileNo = req.body.mobileNo);
        req.body.awardCardSerialNo && (params.awardCardSerialNo = req.body.awardCardSerialNo);
        req.body.userNo && (params.userNo = req.body.userNo);
        params.pageNo = req.body.pageNo;
        params.pageSize = req.body.pageSize;
        let option = {
            pageUrl: '/awardMgmt/awardSearch/awardRecord/getTableData.ajax',
            req: req,
            url: apiUrlList.query,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0 && Array.isArray(result.body.rows)) {
                let resultData = {};
                resultData.page = result.body.pageNum;
                resultData.total = result.body.pages;
                resultData.tableData = result.body.rows;
                resultData.tableData.forEach(item => {
                    let showExchangeStatus = '';
                    if(item.exchangeStatus == 0){
                        showExchangeStatus = '失败';
                    }
                    if(item.exchangeStatus == 1){
                        showExchangeStatus = '尝试兑换';
                    }
                    if(item.exchangeStatus == 2){
                        showExchangeStatus = '成功';
                    }
                    item.showExchangeStatus = showExchangeStatus;
                });
                res.send({error: 0, msg: '查询成功', data: resultData});
            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: 1, msg: '查询失败'});
            }
        });
    });
};
