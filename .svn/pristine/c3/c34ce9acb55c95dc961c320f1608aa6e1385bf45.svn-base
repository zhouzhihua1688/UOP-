const request = require('../../../local_data/requestWrapper');
let apiUrlList = require('../apiConfig').expenseMgmt;
module.exports = function (app) {
	app.post('/thirdPartyOperation/expenseMgmt/procedureSum~feedbackSum/adjust.ajax', (req, res, next) => {
		let params = {};
		let userid = req.session.loginInfo.userid;
		if (req.body.ymonth) {
			params.ymonth = req.body.ymonth;
		}
		if (req.body.fundid) {
			params.fundid = req.body.fundid;
		}
		if (req.body.branchcode) {
			params.branchcode = req.body.branchcode;
		}
		let option = {
			session:req.session,
			url: apiUrlList.procedureDetails.adjust,
			qs: params,
			timeout: 15000,
			json: true
		};
		console.log('/thirdPartyOperation/expenseMgmt/procedureSum~feedbackSum/adjust.ajax option:', option);
		request(option, (error, response, body) => {
			console.log('/thirdPartyOperation/expenseMgmt/procedureSum~feedbackSum/adjust.ajax error:', error);
			console.log('/thirdPartyOperation/expenseMgmt/procedureSum~feedbackSum/adjust.ajax statusCode:', response && response.statusCode);
			console.log('/thirdPartyOperation/expenseMgmt/procedureSum~feedbackSum/adjust.ajax body:', body);
			if (error) {
				return res.send({
					error: 1,
					msg: '数据获取失败'
				});
			}
			let result = typeof body === 'string' ? JSON.parse(body) : body;
			if (result && result.responseCode === '0000' && Array.isArray(result.data.saleDaysList)) {
				console.log(result)
				res.send({
					error: 0,
					msg: '数据获取成功',
					userid,
					data: result.data
				});
			}
            else if (result && result.responseCode != '9999') {
                res.send({ error: 1, msg: result.responseMessage });
            }
			else {
				res.send({
					error: 1,
					userid,
					msg: result.responseMessage
				});
			}
		});
	});
	// 历史页版本
	app.post('/thirdPartyOperation/expenseMgmt/procedureSum~feedbackSum/versionDialog.ajax', (req, res, next) => {
		let params = {};
		if (req.body.ymonth) {
			params.ymonth = req.body.ymonth;
		}
		if (req.body.fundid) {
			params.fundid = req.body.fundid;
		}
		if (req.body.branchcode) {
			params.branchcode = req.body.branchcode;
		}
		if (req.body.edition) {
			params.edition = req.body.edition;
		}
		let option = {
			session:req.session,
			url: apiUrlList.procedureDetails.versionDialog,
			// qs:params,
			qs: req.body,
			timeout: 15000,
			json: true
		};
		console.log('/thirdPartyOperation/expenseMgmt/procedureSum~feedbackSum/versionDialog.ajax option:', option);
		request(option, (error, response, body) => {
			console.log('/thirdPartyOperation/expenseMgmt/procedureSum~feedbackSum/versionDialog.ajax error:', error);
			console.log('/thirdPartyOperation/expenseMgmt/procedureSum~feedbackSum/versionDialog.ajax statusCode:', response && response.statusCode);
			console.log('/thirdPartyOperation/expenseMgmt/procedureSum~feedbackSum/versionDialog.ajax body:', body);
			if (error) {
				return res.send({
					error: 1,
					msg: '数据获取失败'
				});
			}
			let result = typeof body === 'string' ? JSON.parse(body) : body;
			if (result && result.responseCode === '0000' && Array.isArray(result.data.saleDaysHisList)) {
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
	// 刷新参数
	app.post('/thirdPartyOperation/expenseMgmt/procedureSum~feedbackSum/breakRatio.ajax', (req, res, next) => {
		let params = {};
		if (req.body.fundid) {
			params.fundid = req.body.fundid;
		}
		if (req.body.branchcode) {
			params.branchcode = req.body.branchcode;
		}
		let option = {
			session:req.session,
			url: apiUrlList.procedureDetails.breakRatio,
			qs: params,
			timeout: 15000,
			json: true
		};
		console.log('/thirdPartyOperation/expenseMgmt/procedureSum~feedbackSum/breakRatio.ajax option:', option);
		request(option, (error, response, body) => {
			console.log('/thirdPartyOperation/expenseMgmt/procedureSum~feedbackSum/breakRatio.ajax error:', error);
			console.log('/thirdPartyOperation/expenseMgmt/procedureSum~feedbackSum/breakRatio.ajax statusCode:', response && response.statusCode);
			console.log('/thirdPartyOperation/expenseMgmt/procedureSum~feedbackSum/breakRatio.ajax body:', body);
			if (error) {
				return res.send({
					error: 1,
					msg: '数据获取失败'
				});
			}
			let result = typeof body === 'string' ? JSON.parse(body) : body;
			if (result && result.responseCode === '0000') {
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
	// 保存
	app.post('/thirdPartyOperation/expenseMgmt/procedureSum~feedbackSum/keepSave.ajax', (req, res, next) => {

		let params = req.body;
		let attachList = JSON.parse(params.attachList);
		
		if(attachList&&Array.isArray(attachList)){
			for(var i=0;i<attachList.length;i++){
				attachList[i].operater=req.session.loginInfo.userid
			}
		};
		delete params.attachList;
		let option = {
			session:req.session,
			url: apiUrlList.procedureDetails.keepSave,
			qs: params,
			body: attachList,
			timeout: 15000,
			json: true
		};
		console.log('/thirdPartyOperation/expenseMgmt/procedureSum~feedbackSum/keepSave.ajax option:', option);
		request.post(option, (error, response, body) => {
			console.log('/thirdPartyOperation/expenseMgmt/procedureSum~feedbackSum/keepSave.ajax error:', error);
			console.log('/thirdPartyOperation/expenseMgmt/procedureSum~feedbackSum/keepSave.ajax statusCode:', response && response.statusCode);
			console.log('/thirdPartyOperation/expenseMgmt/procedureSum~feedbackSum/keepSave.ajax body:', body);
			if (error) {
				return res.send({
					error: 1,
					msg: '数据获取失败'
				});
			}
			let result = typeof body === 'string' ? JSON.parse(body) : body;
			if (result && result.responseCode === '0000') {
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

	// 复核 /v1/sale/checkDone
	app.post('/thirdPartyOperation/expenseMgmt/procedureSum~feedbackSum/checkDone.ajax', (req, res, next) => {

		let params = req.body;
		let attachList = JSON.parse(params.attachList);
		
		if(attachList&&Array.isArray(attachList)){
			for(var i=0;i<attachList.length;i++){
				attachList[i].operater=req.session.loginInfo.userid
			}
		};
		delete params.attachList;
		let option = {
			session:req.session,
			url: apiUrlList.procedureDetails.checkDown,
			qs: params,
			body: attachList,
			timeout: 15000,
			json: true
		};
		console.log('/thirdPartyOperation/expenseMgmt/procedureSum~feedbackSum/checkDone.ajax option:', option);
		request.post(option, (error, response, body) => {
			console.log('/thirdPartyOperation/expenseMgmt/procedureSum~feedbackSum/checkDone.ajax error:', error);
			console.log('/thirdPartyOperation/expenseMgmt/procedureSum~feedbackSum/checkDone.ajax statusCode:', response && response.statusCode);
			console.log('/thirdPartyOperation/expenseMgmt/procedureSum~feedbackSum/checkDone.ajax body:', body);
			if (error) {
				return res.send({
					error: 1,
					msg: '数据获取失败'
				});
			}
			let result = typeof body === 'string' ? JSON.parse(body) : body;
			if (result && result.responseCode === '0000') {
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

};