const request = require('./../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').tradeMonitor.tradeExecuteSurvey;
module.exports = function (app) {
    
    // 查询规则列表
    app.post('/investmentMgmt/tradeMonitor/tradeExecuteSurvey/query.ajax', (req, res, next) => {
        // 查询统计次数
        let querySum = new Promise((resolve,reject)=>{
            let option = {
                pageUrl: '/investmentMgmt/tradeMonitor/tradeExecuteSurvey/query.ajax---sum',
                req,
                url: apiUrl.querySum,
                qs: {transactionDate:req.body.transactionDate},
                timeout: 15000,
                json: true
            };
            request(option, (error, response, body) => {
                if (error) {
                    return resolve();
                }
                if (body.returnCode == 0) {
                    return resolve(body.body)
                } else if (body.returnCode != 9999) {
                    return resolve();
                } else {
                    return resolve();
                }
            });
        })
        querySum.then((firstRes)=>{
            console.log('统计',firstRes);
            let option = {
                pageUrl: '/investmentMgmt/tradeMonitor/tradeExecuteSurvey/query.ajax',
                req,
                url: apiUrl.query,
                qs: req.body,
                timeout: 15000,
                json: true
            };
            request(option, (error, response, body) => {
                if (error) {
                    return res.send({error: 1, msg: '查询失败'});
                }
                if (body.returnCode == 0 && Array.isArray(body.body.trades)) {
                    let data = {list:body.body.trades};
                    if(firstRes&&(typeof firstRes === 'object')){
                        Object.assign(data,firstRes)
                    }
                    return res.send({error: 0, msg: '查询成功', data});
                } else if (body.returnCode != 9999) {
                    return res.send({error: 1, msg: body.returnMsg, data: null});
                } else {
                    return res.send({error: 1, msg: '查询失败', data: null});
                }
            });
        })
        
    });
};