const request = require('../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').keywordQuery.template;

module.exports = function (app) {
	// 获取列表数据
	app.post('/marketingActive/keywordQuery/template/query.ajax', (req, res, next) => {
		let params = req.body;
		let option = {
			pageUrl: '/marketingActive/keywordQuery/template/query.ajax',
			req: req,
			url: apiUrl.query,
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
};