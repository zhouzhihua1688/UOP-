const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').appSearchConfig.polyphoneConfig;
module.exports = function(app) {
	//查询
	app.post('/publicConfig/appSearchConfig/polyphoneConfig/query.ajax', (req, res, next) => {
		let params = {};
		req.body.chinese && (params.chinese = req.body.chinese);
		req.body.pinyin && (params.pinyin = req.body.pinyin);
		let option = {
            pageUrl: '/publicConfig/appSearchConfig/polyphoneConfig/query.ajax',
            req: req,
			url: apiUrlList.query,
			qs: params,
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
			if (body.returnCode === 0) {
				res.send({
					error: 0,
					msg: '查询成功',
					data: body.body
				});
			} else if (body && body.returnCode != 9999) {
				res.send({
					error: 1,
					msg: body.returnMsg,
					data: null
				});
			} else {
				res.send({
					error: 1,
					msg: '查询失败',
					data: null
				});
			}
		});
	});
	// 添加
	app.post('/publicConfig/appSearchConfig/polyphoneConfig/add.ajax', (req, res, next) => {
		let params = {};
		params.chinese = req.body.chinese;
		params.pinyin = req.body.pinyin;
		let option = {
            pageUrl: '/publicConfig/appSearchConfig/polyphoneConfig/add.ajax',
            req: req,
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
			url: apiUrlList.add,
			qs: params,
			timeout: 15000,
			json: true
		};
		request.post(option, (error, response, body) => {
			if (error) {
				return res.send({
					error: 1,
					msg: '保存失败',
					data: null
				});
			}
			if (body.returnCode === 0) {
				res.send({
					error: 0,
					msg: '保存成功',
					data: null
				});
			} else if (body && body.returnCode != 9999) {
				res.send({
					error: 1,
					msg: body.returnMsg,
					data: null
				});
			} else {
				res.send({
					error: 1,
					msg: '保存失败',
					data: null
				});
			}
		});
	});

	//删除
	app.post('/publicConfig/appSearchConfig/polyphoneConfig/del.ajax', (req, res, next) => {
		let params = {};
		params.chinese = req.body.chinese;
		let option = {
            pageUrl: '/publicConfig/appSearchConfig/polyphoneConfig/del.ajax',
            req: req,
            operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
			url: apiUrlList.del,
			qs: params,
			timeout: 15000,
			json: true
		};
		request.del(option, (error, response, body) => {
			if (error) {
				return res.send({
					error: 1,
					msg: '删除失败',
					data: null
				});
			}
			if (body.returnCode === 0) {
				res.send({
					error: 0,
					msg: '删除成功',
					data: null
				});
			} else if (body && body.returnCode != 9999) {
				res.send({
					error: 1,
					msg: body.returnMsg,
					data: null
				});
			} else {
				res.send({
					error: 1,
					msg: '删除失败',
					data: null
				});
			}
		});
	});
};
