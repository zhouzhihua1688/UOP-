const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').channelMaintain;
const qs = require("qs");
module.exports = function (app) {

    //查询
    app.get('/thirdPartyOperation/channelMaintain/partnerTradeAssist/search.ajax', (req, res, next) => {

        let params = {};
        let option = {
            session:req.session,
            url: apiUrlList.partnerTradeAssist.search,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/channelMaintain/partnerTradeAssist/search.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/thirdPartyOperation/channelMaintain/partnerTradeAssist/search.ajax error:', error);
            console.log('/thirdPartyOperation/channelMaintain/partnerTradeAssist/search.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/channelMaintain/partnerTradeAssist/search.ajax body:', body);
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

    //tradeinfos
    app.get('/thirdPartyOperation/channelMaintain/partnerTradeAssist/tradeinfos.ajax', (req, res, next) => {
        let params = req.query;
        let option = {
            session: req.session,
            url: apiUrlList.partnerTradeAssist.tradeinfos,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/channelMaintain/partnerTradeAssist/tradeinfos.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/thirdPartyOperation/channelMaintain/partnerTradeAssist/tradeinfos.ajax error:', error);
            console.log('/thirdPartyOperation/channelMaintain/partnerTradeAssist/tradeinfos.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/channelMaintain/partnerTradeAssist/tradeinfos.ajax body:', body);
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
            } else if (result && result.responseCode != '9999') {
                res.send({error: 1, msg: result.responseMessage});
            } else {
                res.send({
                    error: 1,
                    msg: result.responseMessage
                });
            }
        });
    });
    //下单
    app.post('/thirdPartyOperation/channelMaintain/partnerTradeAssist/redeem.ajax', (req, res, next) => {
        console.log("req.body", req.body);
        let params = req.body;
        let partnerTradeReq = params.partnerTradeReq;
        partnerTradeReq.operator = req.session.loginInfo.userid;
        console.log("partnerTradeReq：",partnerTradeReq);
        params.partnerTradeReq = JSON.stringify(partnerTradeReq);
        console.log((params));
        let option = {
            session: req.session,
            url: apiUrlList.partnerTradeAssist.redeem,
            qs: params,
            body: JSON.parse(req.body.partnerTradeReq),
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/channelMaintain/partnerTradeAssist/redeem.ajax option:', option);
        request.post(option, (error, response, body) => {
            console.log('/thirdPartyOperation/channelMaintain/partnerTradeAssist/redeem.ajax error:', error);
            console.log('/thirdPartyOperation/channelMaintain/partnerTradeAssist/redeem.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/channelMaintain/partnerTradeAssist/redeem.ajax body:', body);
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
            } else if (result && result.responseCode != '9999') {
                res.send({error: 1, msg: result.responseMessage});
            } else {
                res.send({
                    error: 1,
                    msg: result.responseMessage
                });
            }
        });
    });
    //撤单
    app.get('/thirdPartyOperation/channelMaintain/partnerTradeAssist/cancel.ajax', (req, res, next) => {
        let params = req.query;
        params.operator = req.session.loginInfo.userid;
        let option = {
            session: req.session,
            url: apiUrlList.partnerTradeAssist.cancel,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/channelMaintain/partnerTradeAssist/cancel.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/thirdPartyOperation/channelMaintain/partnerTradeAssist/cancel.ajax error:', error);
            console.log('/thirdPartyOperation/channelMaintain/partnerTradeAssist/cancel.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/channelMaintain/partnerTradeAssist/cancel.ajax body:', body);
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
            } else if (result && result.responseCode != '9999') {
                res.send({error: 1, msg: result.responseMessage});
            } else {
                res.send({
                    error: 1,
                    msg: result.responseMessage
                });
            }

        });
    });

};