const request = require('../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').shareMgmt.scene;

module.exports = function (app) {
	// 获取接口类型列表
	app.post('/marketingActive/shareMgmt/scene/getShareRventTypeList.ajax', (req, res, next) => {
		let option = {
			pageUrl: '/marketingActive/shareMgmt/scene/getShareRventTypeList.ajax',
			req,
			url: apiUrl.getShareRventTypeList,
			timeout: 15000,
			json: true
		};
		request(option, (error, response, body) => {
			if (error) {
				return res.send({
					error: 1,
					msg: '数据获取失败'
				});
			}
			let result = typeof body === 'string' ? JSON.parse(body) : body;
			if (result && result.returnCode == '0') {
				res.send({
					error: 0,
					msg: '调用成功',
					data: result.body
				});
			} else {
				res.send({
					error: 1,
					msg: '获取数据失败'
				});
			}
		});
	});
	// 获取列表数据
	app.post('/marketingActive/shareMgmt/scene/getList.ajax', (req, res, next) => {
		let params = req.body;
		let option = {
			pageUrl: '/marketingActive/shareMgmt/scene/getList.ajax',
			req,
			url: apiUrl.getList,
			qs: params,
			timeout: 15000,
			json: true
		};
		request(option, (error, response, body) => {
			if (error) {
				return res.send({
					error: 1,
					msg: '数据获取失败'
				});
			}
			let result = typeof body === 'string' ? JSON.parse(body) : body;
			if (result && result.returnCode == '0') {
				res.send({
					error: 0,
					msg: '调用成功',
					data: result.body
				});
			} else {
				res.send({
					error: 1,
					msg: '获取数据失败'
				});
			}
		});
	});
	// 新增
	app.post('/marketingActive/shareMgmt/scene/add.ajax', (req, res, next) => {
		let params = req.body;
		params.modifyBy = req.session['loginInfo'].userid;
		let option = {
			pageUrl: '/marketingActive/shareMgmt/scene/add.ajax',
			req,
			url: apiUrl.add,
			body: params,
			timeout: 15000,
			json: true
		};
		request.post(option, (error, response, body) => {
			if (error) {
				return res.send({
					error: 1,
					msg: '新增失败'
				});
			}
			let result = typeof body === 'string' ? JSON.parse(body) : body;
			if (result && result.returnCode == '0') {
				res.send({
					error: 0,
					msg: '新增成功',
					data: result.body
				});
			} else {
				res.send({
					error: 1,
					msg: '新增失败'
				});
			}
		});
	});
	// 修改
	app.post('/marketingActive/shareMgmt/scene/update.ajax', (req, res, next) => {
		let params = req.body;
		params.modifyBy = req.session['loginInfo'].userid;
		let option = {
			pageUrl: '/marketingActive/shareMgmt/scene/update.ajax',
			req,
			url: apiUrl.update,
			body: params,
			timeout: 15000,
			json: true
		};
		request.post(option, (error, response, body) => {
			if (error) {
				return res.send({
					error: 1,
					msg: '调用失败'
				});
			}
			let result = typeof body === 'string' ? JSON.parse(body) : body;
			if (result && result.returnCode == '0') {
				res.send({
					error: 0,
					msg: '调用成功',
					data: result.body
				});
			} else {
				res.send({
					error: 1,
					msg: '调用失败'
				});
			}
		});
	});
	// 删除
	// app.post('/marketingActive/shareMgmt/scene/delete.ajax', (req, res, next) => {
	// 	let params = req.body;
	// 	let option = {
	// 		session: req.session,
	// 		url: apiUrl.del,
	// 		body: params,
	// 		timeout: 15000,
	// 		json: true
	// 	};
	// 	console.log('/marketingActive/shareMgmt/scene/delete.ajax option:', option);
	// 	request.post(option, (error, response, body) => {
	// 		console.log('/marketingActive/shareMgmt/scene/delete.ajax error:', error);
	// 		console.log('/marketingActive/shareMgmt/scene/delete.ajax statusCode:', response && response.statusCode);
	// 		console.log('/marketingActive/shareMgmt/scene/delete.ajax body:', body);
	// 		if (error) {
	// 			return res.send({
	// 				error: 1,
	// 				msg: '调用失败'
	// 			});
	// 		}
	// 		let result = typeof body === 'string' ? JSON.parse(body) : body;
	// 		if (result && result.returnCode == '0') {
	// 			res.send({
	// 				error: 0,
	// 				msg: '调用成功',
	// 				data: result.body
	// 			});
	// 		} else {
	// 			res.send({
	// 				error: 1,
	// 				msg: '调用失败'
	// 			});
	// 		}
	// 	});
	// });
};