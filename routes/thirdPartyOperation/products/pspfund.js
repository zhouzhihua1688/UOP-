const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').products;
const qs =require("qs");
module.exports = function (app) {


    //查询hop
    app.get('/thirdPartyOperation/products/pspfund/searchHop.ajax', (req, res, next) => {
        let params = req.query;
        let option = {
            session:req.session,
            url: apiUrlList.pspfund.searchHop,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/products/pspfund/searchHop.ajax option:', option);
        request(option, (error, response, body) => {
            // console.log('/thirdPartyOperation/products/pspfund/searchHop.ajax error:', error);
            // console.log('/thirdPartyOperation/products/pspfund/searchHop.ajax statusCode:', response && response.statusCode);
            // console.log('/thirdPartyOperation/products/pspfund/searchHop.ajax body:', body);
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
    //查询PSP
    app.get('/thirdPartyOperation/products/pspfund/searchPsp.ajax', (req, res, next) => {
        let params = req.query;
        let option = {
            session:req.session,
            url: apiUrlList.pspfund.searchPsp,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/products/pspfund/searchPsp.ajax option:', option);
        request(option, (error, response, body) => {
            // console.log('/thirdPartyOperation/products/pspfund/searchPsp.ajax error:', error);
            // console.log('/thirdPartyOperation/products/pspfund/searchPsp.ajax statusCode:', response && response.statusCode);
            // console.log('/thirdPartyOperation/products/pspfund/searchPsp.ajax body:', body);
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
    //查询投顾输出
    app.get('/thirdPartyOperation/products/pspfund/searchIao.ajax', (req, res, next) => {
        let params = req.query;
        let option = {
            session:req.session,
            url: apiUrlList.pspfund.searchIao,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/products/pspfund/searchIao.ajax option:', option);
        request(option, (error, response, body) => {
            // console.log('/thirdPartyOperation/products/pspfund/searchIao.ajax error:', error);
            // console.log('/thirdPartyOperation/products/pspfund/searchIao.ajax statusCode:', response && response.statusCode);
            // console.log('/thirdPartyOperation/products/pspfund/searchIao.ajax body:', body);
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

    //查询Fisp
    app.get('/thirdPartyOperation/products/pspfund/searchFisp.ajax', (req, res, next) => {
        let params = req.query;
        let option = {
            session:req.session,
            url: apiUrlList.pspfund.searchFisp,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/products/pspfund/searchFisp.ajax option:', option);
        request(option, (error, response, body) => {
            // console.log('/thirdPartyOperation/products/pspfund/searchFisp.ajax error:', error);
            // console.log('/thirdPartyOperation/products/pspfund/searchFisp.ajax statusCode:', response && response.statusCode);
            // console.log('/thirdPartyOperation/products/pspfund/searchFisp.ajax body:', body);
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

    // 获取hop渠道下拉数据
    app.get('/thirdPartyOperation/products/pspfund/getHopPartnerList.ajax', (req, res, next) => {
        let params = req.query;
        let option = {
            pageUrl: 'thirdPartyOperation/products/pspfund/getHopPartnerList.ajax',
            req,
            url: apiUrlList.pspfund.getHopPartnerList,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/products/pspfund/getHopPartnerList.ajax option:', option);
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '操作渠道号失败'
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

    // 获取psp渠道下拉数据
    app.get('/thirdPartyOperation/products/pspfund/getPspPartnerList.ajax', (req, res, next) => {
        let params = req.query;
        let option = {
            pageUrl: 'thirdPartyOperation/products/pspfund/getPspPartnerList.ajax',
            req,
            url: apiUrlList.pspfund.getPspPartnerList,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/products/pspfund/getPspPartnerList.ajax option:', option);
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '操作渠道号失败'
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

    //添加hop
    app.post('/thirdPartyOperation/products/pspfund/addHop.ajax', (req, res, next) => {
        let params =qs.parse(req.body);
        params.userNm = req.session.loginInfo.userid ;
        console.log((params))
        let option = {
            session:req.session,
            url: apiUrlList.pspfund.addHop,
            body:params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/products/pspfund/addHop.ajax option:', option);
        request.post(option, (error, response, body) => {
            console.log('/thirdPartyOperation/products/pspfund/addHop.ajax error:', error);
            console.log('/thirdPartyOperation/products/pspfund/addHop.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/products/pspfund/addHop.ajax body:', body);
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

    //添加投顾输出
    app.post('/thirdPartyOperation/products/pspfund/addIao.ajax', (req, res, next) => {
        let params =qs.parse(req.body);
        params.userNm = req.session.loginInfo.userid ;
        console.log((params))
        let option = {
            session:req.session,
            url: apiUrlList.pspfund.addIao,
            body:params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/products/pspfund/addIao.ajax option:', option);
        request.post(option, (error, response, body) => {
            console.log('/thirdPartyOperation/products/pspfund/addIao.ajax error:', error);
            console.log('/thirdPartyOperation/products/pspfund/addIao.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/products/pspfund/addIao.ajax body:', body);
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
    //添加PSP
    app.post('/thirdPartyOperation/products/pspfund/addPsp.ajax', (req, res, next) => {
        let params =qs.parse(req.body);
        params.operator = req.session.loginInfo.userid ;
        console.log((params))
        let option = {
            session:req.session,
            url: apiUrlList.pspfund.addPsp,
            body:params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/products/pspfund/addPsp.ajax option:', option);
        request.post(option, (error, response, body) => {
            console.log('/thirdPartyOperation/products/pspfund/addPsp.ajax error:', error);
            console.log('/thirdPartyOperation/products/pspfund/addPsp.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/products/pspfund/addPsp.ajax body:', body);
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

    //添加Fisp
    app.post('/thirdPartyOperation/products/pspfund/addFisp.ajax', (req, res, next) => {
        let params =qs.parse(req.body);
        params.userNm = req.session.loginInfo.userid ;
        console.log((params))
        let option = {
            session:req.session,
            url: apiUrlList.pspfund.addFisp,
            body:params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/products/pspfund/addFisp.ajax option:', option);
        request.post(option, (error, response, body) => {
            console.log('/thirdPartyOperation/products/pspfund/addFisp.ajax error:', error);
            console.log('/thirdPartyOperation/products/pspfund/addFisp.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/products/pspfund/addFisp.ajax body:', body);
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

    //修改Psp
    app.post('/thirdPartyOperation/products/pspfund/updatePsp.ajax', (req, res, next) => {
        let params =qs.parse(req.body);
        params.operator = req.session.loginInfo.userid ;
        console.log((params));
        let option = {
            session:req.session,
            url: apiUrlList.pspfund.updatePsp,
            body:params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/products/pspfund/updatePsp.ajax option:', option);
        request.post(option, (error, response, body) => {
            console.log('/thirdPartyOperation/products/pspfund/updatePsp.ajax error:', error);
            console.log('/thirdPartyOperation/products/pspfund/updatePsp.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/products/pspfund/updatePsp.ajax body:', body);
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

    //修改Hop
    app.post('/thirdPartyOperation/products/pspfund/updateHop.ajax', (req, res, next) => {
        let params =qs.parse(req.body);
        params.userNm = req.session.loginInfo.userid ;
        console.log((params));
        let option = {
            session:req.session,
            url: apiUrlList.pspfund.updateHop,
            body:params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/products/pspfund/updateHop.ajax option:', option);
        request.post(option, (error, response, body) => {
            console.log('/thirdPartyOperation/products/pspfund/updateHop.ajax error:', error);
            console.log('/thirdPartyOperation/products/pspfund/updateHop.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/products/pspfund/updateHop.ajax body:', body);
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

    //修改投顾输出
    app.post('/thirdPartyOperation/products/pspfund/updateIao.ajax', (req, res, next) => {
        let params =qs.parse(req.body);
        params.userNm = req.session.loginInfo.userid ;
        console.log((params));
        let option = {
            session:req.session,
            url: apiUrlList.pspfund.updateIao,
            body:params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/products/pspfund/updateIao.ajax option:', option);
        request.post(option, (error, response, body) => {
            console.log('/thirdPartyOperation/products/pspfund/updateIao.ajax error:', error);
            console.log('/thirdPartyOperation/products/pspfund/updateIao.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/products/pspfund/updateIao.ajax body:', body);
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

    //修改Fisp
    app.post('/thirdPartyOperation/products/pspfund/updateFisp.ajax', (req, res, next) => {
        let params =qs.parse(req.body);
        params.userNm = req.session.loginInfo.userid ;
        console.log((params));
        let option = {
            session:req.session,
            url: apiUrlList.pspfund.updateFisp,
            body:params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/products/pspfund/updateFisp.ajax option:', option);
        request.post(option, (error, response, body) => {
            console.log('/thirdPartyOperation/products/pspfund/updateFisp.ajax error:', error);
            console.log('/thirdPartyOperation/products/pspfund/updateFisp.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/products/pspfund/updateFisp.ajax body:', body);
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

    //删除PSP
    app.get('/thirdPartyOperation/products/pspfund/deletePsp.ajax', (req, res, next) => {
        let params =req.query;
        params.operator = req.session.loginInfo.userid ;
        let option = {
            session:req.session,
            url: apiUrlList.pspfund.deletePsp,
            qs: params,
            timeout: 15000,
            json:true
        };
        console.log('/thirdPartyOperation/products/pspfund/deletePsp.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/thirdPartyOperation/products/pspfund/deletePsp.ajax error:', error);
            console.log('/thirdPartyOperation/products/pspfund/deletePsp.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/products/pspfund/deletePsp.ajax body:', body);
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

    //删除Hop
    app.get('/thirdPartyOperation/products/pspfund/deleteHop.ajax', (req, res, next) => {
        let params =req.query;
        let option = {
            session:req.session,
            url: apiUrlList.pspfund.deleteHop,
            qs: params,
            timeout: 15000,
            json:true
        };
        console.log('/thirdPartyOperation/products/pspfund/deleteHop.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/thirdPartyOperation/products/pspfund/deleteHop.ajax error:', error);
            console.log('/thirdPartyOperation/products/pspfund/deleteHop.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/products/pspfund/deleteHop.ajax body:', body);
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

    //删除投顾输出
    app.get('/thirdPartyOperation/products/pspfund/deleteIao.ajax', (req, res, next) => {
        let params =req.query;
        let option = {
            session:req.session,
            url: apiUrlList.pspfund.deleteIao,
            qs: params,
            timeout: 15000,
            json:true
        };
        console.log('/thirdPartyOperation/products/pspfund/deleteIao.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/thirdPartyOperation/products/pspfund/deleteIao.ajax error:', error);
            console.log('/thirdPartyOperation/products/pspfund/deleteIao.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/products/pspfund/deleteIao.ajax body:', body);
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

    //删除Fisp
    app.get('/thirdPartyOperation/products/pspfund/deleteFisp.ajax', (req, res, next) => {
        let params =req.query;
        let option = {
            session:req.session,
            url: apiUrlList.pspfund.deleteFisp,
            qs: params,
            timeout: 15000,
            json:true
        };
        console.log('/thirdPartyOperation/products/pspfund/deleteFisp.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/thirdPartyOperation/products/pspfund/deleteFisp.ajax error:', error);
            console.log('/thirdPartyOperation/products/pspfund/deleteFisp.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/products/pspfund/deleteFisp.ajax body:', body);
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

}