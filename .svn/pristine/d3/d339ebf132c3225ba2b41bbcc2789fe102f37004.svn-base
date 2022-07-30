const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').channelMaintain;
module.exports = function (app) {
    //查询
    app.get('/thirdPartyOperation/channelMaintain/partnerSelling/search.ajax', (req, res, next) => {

        let params = {};

        if (req.query.branchcode) {
            params.branchcode = req.query.branchcode;
        }
        if (req.query.shortnm) {
            params.shortnm = req.query.shortnm;
        }
        if (req.query.branchtype) {
            params.branchtype = req.query.branchtype;
        }
        let option = {
            session:req.session,
            url: apiUrlList.partnerSelling.search,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/channelMaintain/partnerSelling/search.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/thirdPartyOperation/channelMaintain/partnerSelling/search.ajax error:', error);
            console.log('/thirdPartyOperation/channelMaintain/partnerSelling/search.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/channelMaintain/partnerSelling/search.ajax body:', body);
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

    //删除
    app.get('/thirdPartyOperation/channelMaintain/partnerSelling/delete.ajax', (req, res, next) => {
        let params = {};
        if (req.query.branchcode) {
            params.branchcode = req.query.branchcode;
        }
        let option = {
            session:req.session,
            url: apiUrlList.partnerSelling.delete,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/channelMaintain/partnerSelling/delete.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/thirdPartyOperation/channelMaintain/partnerSelling/delete.ajax error:', error);
            console.log('/thirdPartyOperation/channelMaintain/partnerSelling/delete.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/channelMaintain/partnerSelling/delete.ajax body:', body);
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
    //从CRM获取渠道信息
    app.get('/thirdPartyOperation/channelMaintain/partnerSelling/crm.ajax', (req, res, next) => {
        let params = {};
        // req.body.branchcode && (params.branchcode = req.body.branchcode);
        //req.body.shortnm && (params.shortnm = req.body.shortnm);
        if (req.query.branchcode) {
            params.branchcode = req.query.branchcode;
        }


        let option = {
            session:req.session,
            url: apiUrlList.partnerSelling.crm,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/channelMaintain/partnerSelling/crm.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/thirdPartyOperation/channelMaintain/partnerSelling/crm.ajax error:', error);
            console.log('/thirdPartyOperation/channelMaintain/partnerSelling/crm.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/channelMaintain/partnerSelling/crm.ajax body:', body);
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
    //添加
    app.post('/thirdPartyOperation/channelMaintain/partnerSelling/add.ajax', (req, res, next) => {
        let option = {
            session:req.session,
            url: apiUrlList.partnerSelling.add,
            body: req.body,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/channelMaintain/partnerSelling/add.ajax option:', option);
        request.post(option, (error, response, body) => {
            console.log('/thirdPartyOperation/channelMaintain/partnerSelling/add.ajax error:', error);
            console.log('/thirdPartyOperation/channelMaintain/partnerSelling/add.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/channelMaintain/partnerSelling/add.ajax body:', body);
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


    //更新
    app.post('/thirdPartyOperation/channelMaintain/partnerSelling/update.ajax', (req, res, next) => {

        let option = {
            session:req.session,
            url: apiUrlList.partnerSelling.update,
            body: req.body,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/channelMaintain/partnerSelling/update.ajax option:', option);
        request.post(option, (error, response, body) => {
            console.log('/thirdPartyOperation/channelMaintain/partnerSelling/update.ajax error:', error);
            console.log('/thirdPartyOperation/channelMaintain/partnerSelling/update.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/channelMaintain/partnerSelling/update.ajax body:', body);
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

};