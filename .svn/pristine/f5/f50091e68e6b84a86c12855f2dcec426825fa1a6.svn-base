const request = require('./../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').productInfoConfig.productExpandContent;

module.exports = function (app) {
	// 获取基金列表
	app.post('/businessMgmt/productInfoConfig/productExpandContent/getFundList.ajax', (req, res, next) => {
		let option = {
			pageUrl: '/businessMgmt/productInfoConfig/productExpandContent/getFundList.ajax',
			req,
			url: apiUrl.getFundList,
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
				body.body.forEach(item => {
					item.fundid = item.fundid || item.fundId;
					item.fundnm = item.fundnm || item.fundName;
					item.extendCategory = req.body.extendCategory;
				});
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
	// 获取类型列表
	app.post('/businessMgmt/productInfoConfig/productExpandContent/getTypeList.ajax', (req, res, next) => {
		let option = {
			pageUrl: '/businessMgmt/productInfoConfig/productExpandContent/getTypeList.ajax',
			req,
			url: apiUrl.getTypeList,
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
				body.body.forEach(item => {
					item.extValue = '';
				});
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
	// 查询
	app.post('/businessMgmt/productInfoConfig/productExpandContent/query.ajax', (req, res, next) => {
		let getAllType = new Promise((resolve, reject) => {
			let option = {
				pageUrl: '/businessMgmt/productInfoConfig/productExpandContent/query.ajax --getAllType',
				req,
				url: apiUrl.getTypeList,
				qs: {
					extendCategory: req.body.extendCategory
				},
				timeout: 15000,
				json: true
			};
			request(option, (error, response, body) => {
				if (error) {
					return reject({
						message: '获取所有基金类型列表失败'
					});
				}
				if (body.returnCode == 0) {
					return resolve(body.body);
				} else if (body && body.returnCode != 9999) {
					return reject({
						message: body.returnMsg
					});
				} else {
					return reject({
						message: '获取所有基金类型列表失败'
					});
				}
			});
		});

		let getFundType = new Promise((resolve, reject) => {
			let option = {
				pageUrl: '/businessMgmt/productInfoConfig/productExpandContent/getFundList.ajax --getFundType',
				req,
				url: apiUrl.query,
				qs: {
					productId: req.body.productId
				},
				timeout: 15000,
				json: true
			};
			request(option, (error, response, body) => {
				if (error) {
					return reject({
						message: '获取该基金对应扩展信息失败'
					});
				}
				if (body.returnCode == 0) {
					return resolve(body.body);
				} else if (body && body.returnCode != 9999) {
					return reject({
						message: body.returnMsg
					});
				} else {
					return reject({
						message: '获取该基金对应扩展信息失败'
					});
				}
			});
		});

		Promise.all([getAllType, getFundType]).then(([allType, fundType]) => {
			let resultData = allType.map(item => {
				let filterItem = fundType.filter(data => data.extColumn === item.extColumn)[0];
				return {
					extCategory: item.extCategory,
					extColumn: item.extColumn,
					extColumnDesc: item.extColumnDesc,
					productId: req.body.productId,
					extValue: filterItem && filterItem.extValue ? filterItem.extValue : ''
				};
			});
			return res.send({
				error: 0,
				msg: '调用成功',
				data: resultData
			})
		}).catch(error => {
			return res.send({
				error: 1,
				msg: error.message,
				data: null
			})
		});
	});
	// 新增
	app.post('/businessMgmt/productInfoConfig/productExpandContent/operate.ajax', (req, res, next) => {
		let option = {
			pageUrl: '/businessMgmt/productInfoConfig/productExpandContent/operate.ajax',
			req,
			operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
			url: apiUrl.add,
			body: {
				productId: req.body.productId,
				recordList: JSON.parse(req.body.recordList),
			},
			timeout: 15000,
			json: true
		};
		request.post(option, (error, response, body) => {
			if (error) {
				return res.send({
					error: 1,
					msg: '保存失败'
				});
			}
			if (body.returnCode == 0) {
				return res.send({
					error: 0,
					msg: '保存成功',
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
					msg: '保存失败',
					data: null
				});
			}
		});
	});
};