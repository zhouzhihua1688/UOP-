const request = require('../../../local_data/requestWrapper');
let apiUrlList=require('../apiConfig').expenseMgmt;
module.exports = function (app) {
    app.post('/thirdPartyOperation/expenseMgmt/procedureSum/search.ajax', (req, res, next) => {
    	let params = {};

    	if (req.body.ymonth) {
            params.ymonth = req.body.ymonth;
        }
        // if (req.SummarDate.ymonth) {
        //     params.ymonth =req.SummarDate.ymonth; 
        // }
        if (req.body.status) {
            params.status = req.body.status;
        }
        let option = {
            session:req.session,
            url: apiUrlList.procedureSum.search,
            // url:"http://10.50.115.48/mock_data/expenseMgmt/procedureSum.json",
            qs: params,
            // qs: req.body,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/expenseMgmt/procedureSum/search.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/thirdPartyOperation/expenseMgmt/procedureSum/search.ajax error:', error);
            console.log('/thirdPartyOperation/expenseMgmt/procedureSum/search.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/expenseMgmt/procedureSum/search.ajax body:', body);
            // return res.send(body);
            if (error) {
                return res.send({ 
                	error: 1,
                	msg: '数据获取失败' 
                	});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.responseCode === '0000') {
                res.send({
                	error: 0, 
                	msg: '数据获取成功', 
                	data:result.data 
                });
            }
            else if (result && result.responseCode != '9999') {
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
    // 下载=全量
         app.get('/thirdPartyOperation/expenseMgmt/procedureSum/download.ajax', (req, res, next) => {
        var params = {};
        params.ymonth = req.query.ymonth;
        params.type = req.query.type;
        let option = {
            session:req.session,
            url:apiUrlList.procedureSum.download,
            qs: params,
            // qs:req.body,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/expenseMgmt/procedureSum/download.ajax option:', option);
        request(option).pipe(res);
    });
    //重新初算
    app.get('/thirdPartyOperation/expenseMgmt/procedureSum/recalculation.ajax', (req, res, next) => {
    	let params = {};

    	if (req.query.ymonth) {
            params.ymonth = req.query.ymonth;
        }
        if (req.query.faretype) {
            params.faretype = req.query.faretype;
        }
        let option = {
            session:req.session,
            url: apiUrlList.procedureSum.recalculation,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/expenseMgmt/procedureSum/recalculation.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/thirdPartyOperation/expenseMgmt/procedureSum/recalculation.ajax error:', error);
            console.log('/thirdPartyOperation/expenseMgmt/procedureSum/recalculation.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/expenseMgmt/procedureSum/recalculation.ajax body:', body);
            if (error) {
                return res.send({ 
                	error: 1,
                	msg: '数据获取失败' 
                	});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.responseCode === '0000') {
                res.send({
                	error: 0, 
                	msg: '数据获取成功', 
                	data:result.data 
                });
            }
            else if (result && result.responseCode != '9999') {
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
};

