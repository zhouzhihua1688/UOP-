const request = require('../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').expenseMgmt.transactionSum;
module.exports = function (app) {
    //交易费/月汇总 初始数据and查询
    app.post('/thirdPartyOperation/expenseMgmt/transactionSum/list.ajax', (req, res, next) => {
        let params = req.body;
        req.body.id && (params.id = req.body.id);
        let option = {
            session:req.session,
            url: apiUrl.list,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/expenseMgmt/transactionSum/list.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/thirdPartyOperation/expenseMgmt/transactionSum/list.ajax error:', error);
            console.log('/thirdPartyOperation/expenseMgmt/transactionSum/list.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/expenseMgmt/transactionSum/list.ajax body:', body);
            if (error) {
                return res.send({
                    error: 1,
                    msg: '数据获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.responseCode == 0000 && Array.isArray(result.data)) {
                res.send({
                    error: 0,
                    msg: '调用成功',
                    data: result.data
                });
            }else if (result && result.responseCode != '9999') {
                res.send({ error: 1, msg: result.responseMessage });
            }
            else {
                res.send({
                    error: 1,
                    msg: result.responseMessage
                });
            }
        });
    });



        // 获取交易费/月汇总  下载
        app.get('/thirdPartyOperation/expenseMgmt/transactionSum/exportDays.ajax', (req, res, next) => {
            var params = {};
            params.ymonth = req.query.ymonth;
            let option = {
                session:req.session,
                url: apiUrl.exportDays,
                qs: params,
                timeout: 15000,
                json: true
            };
            console.log('/thirdPartyOperation/expenseMgmt/transactionSum/exportDays.ajax option:', option);
            request(option).pipe(res);
        });
    //重新初算
    app.get('/thirdPartyOperation/expenseMgmt/transactionSum/recalculation.ajax', (req, res, next) => {
        let params = {};
        if (req.query.faretype) {
            params.faretype = req.query.faretype;
        }
        if (req.query.ymonth) {
            params.ymonth = req.query.ymonth;
        }
        let option = {
            session:req.session,
            url: apiUrl.recalculation,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/expenseMgmt/transactionSum/recalculation.ajax option:', option);
        request(option).pipe(res);
    });
   
            
};