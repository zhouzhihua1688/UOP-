const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').channelMaintain;
module.exports = function (app) {
    //查询 
    app.get('/thirdPartyOperation/channelMaintain/contactMaintain/search.ajax', (req, res, next) => {
        let params = {};
       // req.body.branchcode && (params.branchcode = req.body.branchcode);
       //req.body.shortnm && (params.shortnm = req.body.shortnm);
       if (req.query.branchcode) {
            params.branchcode = req.query.branchcode;
        }
        if (req.query.shortnm) {
            params.shortnm = req.query.shortnm;
        } 
        
        let option = {
            session:req.session,
            url: apiUrlList.contactMaintain.search,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/channelMaintain/contactMaintain/search.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/thirdPartyOperation/channelMaintain/contactMaintain/search.ajax error:', error);
            console.log('/thirdPartyOperation/channelMaintain/contactMaintain/search.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/channelMaintain/contactMaintain/search.ajax body:', body);
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
    app.get('/thirdPartyOperation/channelMaintain/contactMaintain/delete.ajax', (req, res, next) => {
        let params = {};
        if (req.query.userid) {
            params.userid = req.query.userid;
        } 
        let option = {
            session:req.session,
            url: apiUrlList.contactMaintain.delete,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/channelMaintain/contactMaintain/delete.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/thirdPartyOperation/channelMaintain/contactMaintain/delete.ajax error:', error);
            console.log('/thirdPartyOperation/channelMaintain/contactMaintain/delete.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/channelMaintain/contactMaintain/delete.ajax body:', body);
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
    app.get('/thirdPartyOperation/channelMaintain/contactMaintain/add.ajax', (req, res, next) => {
        let params = {};
       // req.body.branchcode && (params.branchcode = req.body.branchcode);
       //req.body.shortnm && (params.shortnm = req.body.shortnm);
        if (req.query.branchcode) {
            params.branchcode = req.query.branchcode;
        }
        if (req.query.shortnm) {
            params.shortnm = req.query.shortnm;
        } 
        if (req.query.username) {
            params.username = req.query.username;
        }
        if (req.query.email) {
            params.email = req.query.email;
        } 
        if (req.query.mobile) {
            params.mobile = req.query.mobile;
        }
        if (req.query.userid) {
            params.userid = req.query.userid;
        }
        if (req.query.userpw) {
            params.userpw = req.query.userpw;
        }
        let option = {
            session:req.session,
            url: apiUrlList.contactMaintain.add,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/channelMaintain/contactMaintain/add.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/thirdPartyOperation/channelMaintain/contactMaintain/add.ajax error:', error);
            console.log('/thirdPartyOperation/channelMaintain/contactMaintain/add.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/channelMaintain/contactMaintain/add.ajax body:', body);
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
    //查询渠道简称
    app.get('/thirdPartyOperation/channelMaintain/contactMaintain/queryShortnm.ajax', (req, res, next) => {
        let params = {};
        if (req.query.branchcode) {
            params.branchcode = req.query.branchcode;
        } 
        let option = {
            session:req.session,
            url: apiUrlList.contactMaintain.queryShortnm,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/channelMaintain/contactMaintain/queryShortnm.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/thirdPartyOperation/channelMaintain/contactMaintain/queryShortnm.ajax error:', error);
            console.log('/thirdPartyOperation/channelMaintain/contactMaintain/queryShortnm.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/channelMaintain/contactMaintain/queryShortnm.ajax body:', body);
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
    app.get('/thirdPartyOperation/channelMaintain/contactMaintain/update.ajax', (req, res, next) => {
        let params = {};
        if (req.query.userid) {
            params.userid = req.query.userid;
        } 
        if (req.query.email) {
            params.email = req.query.email;
        } 
        if (req.query.mobile) {
            params.mobile = req.query.mobile;
        }
        let updateby=req.session.loginInfo.userid;
        let option = {
            session:req.session,
            url: apiUrlList.contactMaintain.update+'?updateby='+updateby,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/channelMaintain/contactMaintain/update.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/thirdPartyOperation/channelMaintain/contactMaintain/update.ajax error:', error);
            console.log('/thirdPartyOperation/channelMaintain/contactMaintain/update.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/channelMaintain/contactMaintain/update.ajax body:', body);
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