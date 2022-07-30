const request = require('../../../local_data/requestWrapper');
let apiUrlList = require('../apiConfig').expenseMgmt;
module.exports = function (app) {
    app.post('/thirdPartyOperation/expenseMgmt/procedureSum~feedbackSum/search.ajax', (req, res, next) => {
        let params = {};
        if (req.body.fundnm) {
            params.fundnm = req.body.fundnm;
        }
        if (req.body.ymonth) {
            params.ymonth = req.body.ymonth;
        }
        if (req.body.branchnm) {
            params.branchnm = req.body.branchnm;
        }
        let option = {
            session: req.session,
            url: apiUrlList.procedureReview.search,
            // qs:req.body,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/expenseMgmt/procedureSum~feedbackSum/search.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/thirdPartyOperation/expenseMgmt/procedureSum~feedbackSum/search.ajax error:', error);
            console.log('/thirdPartyOperation/expenseMgmt/procedureSum~feedbackSum/search.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/expenseMgmt/procedureSum~feedbackSum/search.ajax body:', body);
            // return res.send(body);
            if (error) {
                return res.send({
                    error: 1,
                    msg: '数据获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.responseCode === '0000' && Array.isArray(result.data.monthsList)) {
                console.log(result)
                res.send({
                    error: 0,
                    msg: '数据获取成功',
                    data: result.data
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
    // 月复核保存
    app.post('/thirdPartyOperation/expenseMgmt/procedureSum/keepSave.ajax', (req, res, next) => {
        // let params = {};
        // if (req.body.ymonth) {
        //     params.ymonth = req.body.ymonth;
        // }
        // if (req.body.info) {
        //     params.info = req.body.info;
        // } 
        var params = req.body;
        let option = {
            session: req.session,
            url: apiUrlList.procedureReview.keepSave,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/expenseMgmt/procedureSum/keepSave.ajax option:', option);
        request.post(option, (error, response, body) => {
            console.log('/thirdPartyOperation/expenseMgmt/procedureSum/keepSave.ajax error:', error);
            console.log('/thirdPartyOperation/expenseMgmt/procedureSum/keepSave.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/expenseMgmt/procedureSum/keepSave.ajax body:', body);
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
                    data: result.data
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

    // 复核通过
    app.post('/thirdPartyOperation/expenseMgmt/procedureSum/reviewPass.ajax', (req, res, next) => {
        let month=req.query.month;
        let fareType=req.query.fareType;
        let branchnm=req.query.branchnm;
        let fundnm=req.query.fundnm;
        let info=req.query.remark;
        let operater=req.session.loginInfo.userid;
        var urls='';
        if(fundnm){
            urls='&fundnm='+encodeURI(fundnm)
        }
        if(branchnm){
            urls='&branchnm='+encodeURI(branchnm)
        }
        if(fundnm&&branchnm){
            urls='&fundnm='+encodeURI(fundnm)+'&branchnm='+encodeURI(branchnm);
        }
        if(info&&typeof(info)!='undefined'&&info!=''){
            urls='&info='+encodeURI(info)+'&fundnm='+encodeURI(fundnm)+'&branchnm='+encodeURI(branchnm);
        }
        let option = {
            session: req.session,
            url: apiUrlList.procedureReview.reviewPass+'?month='+month+'&fareType='+fareType+'&operater='+operater+urls,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/expenseMgmt/procedureSum/reviewPass.ajax option:', option);
        request.post(option, (error, response, body) => {
            console.log('/thirdPartyOperation/expenseMgmt/procedureSum/reviewPass.ajax.ajax error:', error);
            console.log('/thirdPartyOperation/expenseMgmt/procedureSum/reviewPass.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/expenseMgmt/procedureSum/reviewPass.ajax body:', body);
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
                    data: result.data
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


    // 复核，查看默认上个月
    app.post('/thirdPartyOperation/expenseMgmt/procedureSum~feedbackSum/reviewSearch.ajax', (req, res, next) => {
        let params = {};

        if (req.body.ymonth) {
            params.ymonth = req.body.ymonth;
        }
        let option = {
            session: req.session,
            url: apiUrlList.procedureReview.review,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/expenseMgmt/procedureSum~feedbackSum/reviewSearch.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/thirdPartyOperation/expenseMgmt/procedureSum~feedbackSum/reviewSearch.ajax.ajax error:', error);
            console.log('/thirdPartyOperation/expenseMgmt/procedureSum~feedbackSum/reviewSearch.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/expenseMgmt/procedureSum~feedbackSum/reviewSearch.ajax body:', body);
            // return res.send(body);
            if (error) {
                return res.send({
                    error: 1,
                    msg: '数据获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.responseCode === '0000') {
                if (Array.isArray(result.data.saleMonthsList)) {
                    result.data.saleMonthsList.forEach((item) => {
                        item.check = false;
                    });
                }
                res.send({
                    error: 0,
                    msg: '数据获取成功',
                    data: result.data
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

    app.post('/thirdPartyOperation/expenseMgmt/procedureSum~feedbackSum/versionSearch.ajax', (req, res, next) => {
        let option = {
            session: req.session,
            url: apiUrlList.procedureReview.versionSearch,
            qs:req.body,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/expenseMgmt/procedureSum~feedbackSum/versionSearch.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/thirdPartyOperation/expenseMgmt/procedureSum~feedbackSum/versionSearch.ajax error:', error);
            console.log('/thirdPartyOperation/expenseMgmt/procedureSum~feedbackSum/versionSearch.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/expenseMgmt/procedureSum~feedbackSum/versionSearch.ajax body:', body);
            // return res.send(body);
            if (error) {
                return res.send({error: 1, msg: '数据获取失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.responseCode === '0000' && Array.isArray(result.data)) {

                result.data.forEach(function (value,index) {
                    value.changetime=formatTime(value.changetime);});
                result.data.changetime= formatTime(result.data.changetime);
                res.send({
                    error: 0,
                    msg: '数据获取成功',
                    data: result.data
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
    //  Feedback导出汇总
    app.get('/thirdPartyOperation/expenseMgmt/feedbackSum/feedbackExport.ajax', (req, res, next) => {
        console.log("----");
        console.log(req.query);
        console.log(req.body);
        let option = {
            session: req.session,
            url: apiUrlList.procedureReview.feedbackExport,
            qs: req.query,
            timeout: 15000,
            json: true
        };
        console.log(option);
        console.log('/thirdPartyOperation/expenseMgmt/feedbackSum/feedbackExport.ajax option:', option);

        request(option).pipe(res);
    });
    // 获取手续费/月复核  导出汇总 全量
    app.get('/thirdPartyOperation/expenseMgmt/procedureSum/exportAll.ajax', (req, res, next) => {
        var params = {};
        params.ymonth = req.query.ymonth;
        params.type = req.query.type;
        let option = {
            session: req.session,
            url: apiUrlList.procedureReview.exportAll,
            qs: params,
            // qs:req.body,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/expenseMgmt/procedureSum/exportAll.ajax option:', option);
        request(option).pipe(res);
    });
    // 对比无误
    app.post('/thirdPartyOperation/expenseMgmt/procedureSum~feedbackSum/balance.ajax', (req, res, next) => {
        let params = {};
        if (req.body.ymonth) {
            params.ymonth = req.body.ymonth;
        }
        if (req.body.faretype) {
            params.faretype = req.body.faretype;
        }
        let option = {
            session: req.session,
            url: apiUrlList.procedureReview.balance,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/expenseMgmt/procedureSum~feedbackSum/balance.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/thirdPartyOperation/expenseMgmt/procedureSum~feedbackSum/balance.ajax.ajax error:', error);
            console.log('/thirdPartyOperation/expenseMgmt/procedureSum~feedbackSum/balance.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/expenseMgmt/procedureSum~feedbackSum/balance.ajax body:', body);
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
                    data: result.data
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
function formatTime(timestamp) {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    return Y + M + D + h + m + s;
}