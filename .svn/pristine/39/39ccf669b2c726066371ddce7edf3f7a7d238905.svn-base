const request = require('../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').monitoring.reportForms;
module.exports = function (app) {
	// 获取  查询列表
	app.post('/productIndexes/monitoring/reportForms/tableData.ajax', (req, res, next) => {
		let params = req.body;
		params.user = req.session.loginInfo.userid
		let option = {
			req,
			pageUrl: '/productIndexes/monitoring/reportForms/tableData.ajax',
			url: apiUrl.tableData,
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
				let resultData = result.body;
				let resultDataCopy = JSON.parse(JSON.stringify(resultData));
				resultDataCopy.forEach(item => {
					let allIndexShowVOList = [];
					item.productAllPrdMonitorDetailVOList.forEach(item => {
						allIndexShowVOList = allIndexShowVOList.concat(item.prdMonitorIndexShowVOList)
					})
					let obj = {};
					// 聚合后的所有的indexIDList	
					allIndexShowVOList = allIndexShowVOList.reduce((item, next) => {
						obj[next.indexId] ? '' : obj[next.indexId] = true && item.push(next);
						return item;
					}, []);
					item.productAllPrdMonitorDetailVOList.forEach(iitem => {
						// 当前item所有的indexID
						// console.log(currentIndexShowVOList);
						// let arr = [];
						let copyAllIndexShowVOList = JSON.parse(JSON.stringify(allIndexShowVOList)).map((item) => {
							item.indexValue = null;
							item.indexValueDesc = '--';
							item.showColor = 0;
							item.targetValue = null;
							item.alarmValue = null;
							item.alarmTrigger = null;
							item.resultRemark = '';
							item.sort = 0; //排序默认0为不排序
							return item
						})
						// console.log(object);
						iitem.prdMonitorIndexShowVOList = copyAllIndexShowVOList.map((item) => {
							iitem.prdMonitorIndexShowVOList.forEach(citem => {
								if (item.indexId == citem.indexId) {
									item.indexValue = citem.indexValue;
									item.indexValueDesc = citem.indexValueDesc;
									item.showColor = citem.showColor;
									item.targetValue = citem.targetValue;
									item.alarmValue = citem.alarmValue;
									item.alarmTrigger = citem.alarmTrigger;
									item.resultRemark = citem.resultRemark;
								}
							})
							return item
						})
					})
				})
				res.send({
					error: 0,
					msg: '调用成功',
					data: resultDataCopy
				});
			} else if (result && result.returnCode == 9999) {
				res.send({
					error: 1,
					msg: '调用失败'
				});
			} else {
				res.send({
					error: 1,
					msg: result.returnMsg
				});
			}
		});
	});
	// 获取  平台专区产品
	app.post('/productIndexes/monitoring/reportForms/labels.ajax', (req, res, next) => {
		let params = req.body;
		let option = {
			req,
			pageUrl: '/productIndexes/monitoring/reportForms/labels.ajax',
			session: req.session,
			qs: params,
			url: apiUrl.labels,
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
			} else if (result && result.returnCode == 9999) {
				res.send({
					error: 1,
					msg: '调用失败'
				});
			} else {
				res.send({
					error: 1,
					msg: result.returnMsg
				});
			}
		});
	});
	// 获取指标值
	app.post('/productIndexes/monitoring/reportForms/monitorIndex.ajax', (req, res, next) => {
		let option = {
			req,
			pageUrl: '/productIndexes/monitoring/reportForms/monitorIndex.ajax',
			url: apiUrl.monitorIndex,
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
			} else if (result && result.returnCode == 9999) {
				res.send({
					error: 1,
					msg: '调用失败'
				});
			} else {
				res.send({
					error: 1,
					msg: result.returnMsg
				});
			}
		});
	});
	//添加监控指标配置
	app.post('/productIndexes/monitoring/reportForms/addMonitor.ajax', (req, res, next) => {
		let params = req.body;
		params.author = req.session.loginInfo.userid;
		let option = {
			req,
			pageUrl: '/productIndexes/monitoring/reportForms/addMonitor.ajax',
			operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
			body: params,
			url: apiUrl.addMonitor,
			timeout: 15000,
			json: true
		};

		request.post(option, (error, response, body) => {
			if (error) {
				return res.send({
					error: 1,
					msg: '数据配置失败'
				});
			}
			let result = typeof body === 'string' ? JSON.parse(body) : body;
			if (result && result.returnCode == '0' && result.body) {
				res.send({
					error: 0,
					msg: '配置成功',
					data: result.body
				});
			} else if (result && result.returnCode == 9999) {
				res.send({
					error: 1,
					msg: '配置失败'
				});
			} else {
				res.send({
					error: 1,
					msg: result.returnMsg
				});
			}
		});
	});
	//获取曾经的指标配置、
	app.post('/productIndexes/monitoring/reportForms/queryHasMonitor.ajax', (req, res, next) => {
		let params = req.body;
		let option = {
			req,
			pageUrl: '/productIndexes/monitoring/reportForms/queryHasMonitor.ajax',
			qs: params,
			url: apiUrl.monitorQuery,
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
			if (result && result.returnCode == '0' && result.body) {
				res.send({
					error: 0,
					msg: '获取成功',
					data: result.body
				});
			} else if (result && result.returnCode == 9999) {
				res.send({
					error: 1,
					msg: '获取失败'
				});
			} else {
				res.send({
					error: 1,
					msg: result.returnMsg
				});
			}
		});
	});
	//自定义指标
	app.post('/productIndexes/monitoring/reportForms/createIndex.ajax', (req, res, next) => {
		let params = req.body;
		params.indexName = `${params.indexName}(自定义${req.session.loginInfo.userid})`;
		let option = {
			req,
			pageUrl: '/productIndexes/monitoring/reportForms/createIndex.ajax',
			operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
			body: params,
			url: apiUrl.createIndex,
			timeout: 15000,
			json: true
		};
		request.post(option, (error, response, body) => {
			if (error) {
				return res.send({
					error: 1,
					msg: '数据自定义失败'
				});
			}
			let result = typeof body === 'string' ? JSON.parse(body) : body;
			if (result && result.returnCode == '0' && result.body) {
				res.send({
					error: 0,
					msg: '自定义成功',
					data: result.body
				});
			} else if (result && result.returnCode == 9999) {
				res.send({
					error: 1,
					msg: '自定义失败'
				});
			} else {
				res.send({
					error: 1,
					msg: result.returnMsg
				});
			}
		});
	});
	// 获取  试算
	app.post('/productIndexes/monitoring/reportForms/calc.ajax', (req, res, next) => {
		let params = req.body;
		let option = {
			req,
			pageUrl: '/productIndexes/monitoring/reportForms/calc.ajax',
			url: apiUrl.calc,
			body: params,
			timeout: 15000,
			json: true
		};

		request.post(option, (error, response, body) => {
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
			} else if (result && result.returnCode == 9999) {
				res.send({
					error: 1,
					msg: '调用失败'
				});
			} else {
				res.send({
					error: 1,
					msg: result.returnMsg
				});
			}
		});
	});
};