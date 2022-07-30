const request = require('./../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').productInfoConfig.productExpandType;

module.exports = function (app) {
	// 查询
	app.post('/businessMgmt/productInfoConfig/productExpandType/query.ajax', (req, res, next) => {
		let option = {
			pageUrl: '/businessMgmt/productInfoConfig/productExpandType/query.ajax',
			req,
			url: apiUrl.query,
			qs: req.body,
			timeout: 15000,
			json: true
		};
		request(option, (error, response, body) => {
			if (error) {
				return res.send({
					error: 1,
					msg: '查询失败'
				});
			}
			if (body.returnCode == 0) {
				return res.send({
					error: 0,
					msg: '查询成功',
					data: body.body
				});
			} else if (body && body.returnCode != 9999) {
				return res.send({
					error: 1,
					msg: body.returnMsg,
					data: null
				});
			} else {
				return res.send({
					error: 1,
					msg: '查询失败',
					data: null
				});
			}
		});
	});
	// 新增
	app.post('/businessMgmt/productInfoConfig/productExpandType/add.ajax', (req, res, next) => {
		let params = {};
		params.extColumn = req.body.extColumn;
		params.extColumnDesc = req.body.extColumnDesc;
		params.extCategory = req.body.extCategory;
		let option = {
			pageUrl: '/businessMgmt/productInfoConfig/productExpandType/add.ajax',
			req,
			operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
			url: apiUrl.add,
			body: [params],
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
			if (body.returnCode == 0) {
				return res.send({
					error: 0,
					msg: '新增成功',
					data: null
				});
			} else if (body && body.returnCode != 9999) {
				return res.send({
					error: 1,
					msg: body.returnMsg,
					data: null
				});
			} else {
				return res.send({
					error: 1,
					msg: '新增失败',
					data: null
				});
			}
		});
	});
	// 修改
	app.post('/businessMgmt/productInfoConfig/productExpandType/update.ajax', (req, res, next) => {
		let params = {};
		params.serialno = req.body.serialno;
		params.extColumn = req.body.extColumn;
		params.extColumnDesc = req.body.extColumnDesc;
		params.extCategory = req.body.extCategory;
		let option = {
			pageUrl: '/businessMgmt/productInfoConfig/productExpandType/update.ajax',
			req,
			operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
			url: apiUrl.update,
			body: params,
			timeout: 15000,
			json: true
		};
		request.post(option, (error, response, body) => {
			if (error) {
				return res.send({
					error: 1,
					msg: '修改失败'
				});
			}
			if (body.returnCode == 0) {
				return res.send({
					error: 0,
					msg: '修改成功',
					data: null
				});
			} else if (body && body.returnCode != 9999) {
				return res.send({
					error: 1,
					msg: body.returnMsg,
					data: null
				});
			} else {
				return res.send({
					error: 1,
					msg: '修改失败',
					data: null
				});
			}
		});
	});
};