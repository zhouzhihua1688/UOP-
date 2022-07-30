const request = require('./../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').investmentStrategyMonitoring.productIndexesForms;
const XLSX = require('xlsx');
module.exports = function (app) {
	// 获取  平台
	app.post('/investmentMgmt/investmentStrategyMonitoring/productIndexesForms/labels.ajax', (req, res, next) => {
		let params = {}
		params.groupId = "ALL";
		let option = {
			req,
			pageUrl: '/investmentMgmt/investmentStrategyMonitoring/productIndexesForms/labels.ajax',
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
					msg: '操作失败'
				});
			}
			let result = typeof body === 'string' ? JSON.parse(body) : body;
			if (result.returnCode == 0) {
				let resultData = result.body.filter((item) => {
					return item.isInvestment == 'Y' && (item.fundgroupType == '13' || item.fundgroupType == '14' || item.fundgroupType == '15' || item.fundgroupType == '16' || item.fundgroupType == '17')
				});
				return res.send({
					error: 0,
					msg: '获取成功',
					data: resultData
				});
			} else if (result && result.returnCode != 9999) {
				return res.send({
					error: 1,
					msg: result.returnMsg
				});
			} else {
				return res.send({
					error: 1,
					msg: '获取失败'
				});
			}
		});
	});
	// 获取  查询列表
	app.post('/investmentMgmt/investmentStrategyMonitoring/productIndexesForms/tableData.ajax', (req, res, next) => {
		let params = req.body;
		let option = {
			req,
			pageUrl: '/investmentMgmt/investmentStrategyMonitoring/productIndexesForms/tableData.ajax',
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
	// 获取  查询饼图
	app.post('/investmentMgmt/investmentStrategyMonitoring/productIndexesForms/pieData.ajax', (req, res, next) => {
		let pieData = new Promise((resolve, reject) => {
			let params = req.body;
			let option = {
				req,
				pageUrl: '/investmentMgmt/investmentStrategyMonitoring/productIndexesForms/pieData.ajax',
				url: apiUrl.pieData,
				qs: params,
				timeout: 15000,
				json: true
			};

			request(option, (error, response, body) => {
				if (error) {
					return reject({
						error: 1,
						msg: '饼图数据 获取失败'
					})
				}
				let result = typeof body === 'string' ? JSON.parse(body) : body;
				if (result && result.returnCode == '0') {
					return resolve(result.body)
				} else if (result && result.returnCode == 9999) {
					return reject({
						error: 1,
						msg: '饼图数据获取失败'
					})
				} else {
					reject({
						error: 1,
						msg: result.returnMsg
					})
				}
			});
		});

		function getFundStatus(fundId, sourceType = '', pieData) {
			let pieDatas = pieData;
			return new Promise((resolve, reject) => {
				let params = {
					fundIdList: fundId,
					acceptMode: '',
					sourceType
				};
				let option = {
					req,
					pageUrl: '/investmentMgmt/investmentStrategyMonitoring/productIndexesForms/pieData.ajax ----fundStatus',
					url: apiUrl.fundStatus,
					qs: params,
					timeout: 15000,
					json: true
				};
				request(option, (error, response, body) => {
					if (error) {
						return reject({
							error: 1,
							msg: '基金状态数据获取失败'
						});
					}
					let result = typeof body === 'string' ? JSON.parse(body) : body;
					if (result && result.returnCode == '0') {
						let fundList = result.body;
						console.log('------------fundlist', fundList, '---------fundEdn');
						let itemData = {}
						pieDatas.forEach((item) => {
							if (item.fundId == fundList[0].fundId) {
								item.showFundStatus = showTradeStatus(fundList[0]);
								itemData = item
							}
						})

						console.log('---u=yahaha---', itemData);
						resolve(itemData);
					} else if (result && result.returnCode == 9999) {
						reject({
							error: 1,
							msg: '基金状态数据获取失败'
						});
					} else {
						reject({
							error: 1,
							msg: result.returnMsg
						});
					}
				});
			})
		}
		pieData.then((result) => {
			new Promise((resolve, reject) => {
				let pieData = result;
				let fundIdList = result.map((item) => {
					return item.fundId
				})
				let params = {
					fundIdList: fundIdList.join(','),
					acceptMode: '',
					sourceType: ''
				};
				let option = {
					req,
					pageUrl: '/investmentMgmt/investmentStrategyMonitoring/productIndexesForms/pieData.ajax ----fundStatus',
					url: apiUrl.fundStatus,
					qs: params,
					timeout: 15000,
					json: true
				};

				request(option, (error, response, body) => {
					if (error) {
						return reject({
							error: 1,
							msg: '基金状态数据获取失败'
						});
					}
					let result = typeof body === 'string' ? JSON.parse(body) : body;
					if (result && result.returnCode == '0') {
						let fundList = result.body;
						pieData.forEach((item) => {
							fundList.forEach((citem) => {
								if (item.fundId == citem.fundId) {
									item.sourceType = citem.isFromHuitianfu === 'Y' ? '247' : '307';
								}
							})
						})
						resolve(pieData);
					} else if (result && result.returnCode == 9999) {
						reject({
							error: 1,
							msg: '基金状态数据获取失败'
						});
					} else {
						reject({
							error: 1,
							msg: result.returnMsg
						});
					}
				});
			}).then((result) => {
				Promise.all(result.map((item) => getFundStatus(item.fundId, item.sourceType, result))).then((result) => {
					let pieData = result;
					let fundTypeArr = pieData.filter((item) => {
						return item.fundPercent != 0
					})
					let typePrecent = {};
					if (fundTypeArr.length > 0) {
						typePrecent = calcPrecent(fundTypeArr);
					}
					let objData = {
						pieData,
						typePrecent
					}
					res.send({
						error: 0,
						msg: '调用成功',
						data: objData
					});

				}).catch((error) => {
					res.send(error);
				})
			}).catch((error) => {
				res.send(error);
			})
		}).catch((error) => {
			res.send(error);
		})

	});
	// 获取  查询折线图
	app.post('/investmentMgmt/investmentStrategyMonitoring/productIndexesForms/brokenLineData.ajax', (req, res, next) => {
		let params = req.body;
		let option = {
			req,
			pageUrl: '/investmentMgmt/investmentStrategyMonitoring/productIndexesForms/brokenLineData.ajax',
			url: apiUrl.brokenLineData,
			qs: params,
			timeout: 15000,
			json: true
		};

		request(option, (error, response, body) => {
			if (error) {
				return res.send({
					error: 1,
					msg: '折线图数据 获取失败'
				});
			}
			let result = typeof body === 'string' ? JSON.parse(body) : body;
			if (result && result.returnCode == '0') {
				result.body.forEach(function (item) {
					item.groupYield = (item.groupYield * 100).toFixed(2)
					item.comparisonYield = (item.comparisonYield * 100).toFixed(2)
				})

				var i = 0,
					j, num, oneMax, oneMin, twoMax, twoMin;

				var length = result.body.length;

				while (i < length - 1) {
					j = i + 1;
					num = result.body[i].groupYield - result.body[j].groupYield
					if (num > 0) {
						if (oneMax) {
							if (twoMax) {
								if (Number(result.body[i].groupYield) > Number(twoMax.groupYield)) {
									if ((twoMax.groupYield - twoMin.groupYield) > (oneMax.groupYield - oneMin.groupYield)) {
										oneMax = twoMax;
										oneMin = twoMin;
										twoMax = result.body[i];
										twoMin = result.body[j];
									} else {
										twoMax = result.body[i];
										twoMin = result.body[j];
									}
								} else if (Number(result.body[j].groupYield) < Number(twoMin.groupYield)) {
									twoMin = result.body[j];
								}
							} else {
								if (Number(result.body[i].groupYield) > Number(oneMax.groupYield)) {
									twoMax = result.body[i];
									twoMin = result.body[j];
								} else if (Number(result.body[j].groupYield) < Number(oneMin.groupYield)) {
									oneMin = result.body[j];
								}
							}
						} else {
							oneMax = result.body[i];
							oneMin = result.body[j];
						}

					}
					i++;
				}
				res.send({
					error: 0,
					msg: '调用成功',
					data: {
						list: result.body,
						markPoint: {
							oneMax,
							oneMin,
							twoMax,
							twoMin
						}
					}
				});
			} else if (result && result.returnCode == 9999) {
				res.send({
					error: 1,
					msg: '折线图数据获取失败'
				});
			} else {
				res.send({
					error: 1,
					msg: result.returnMsg
				});
			}
		});
	});

	// 净值导出
	app.get('/investmentMgmt/investmentStrategyMonitoring/productIndexesForms/navExport.ajax', (req, res, next) => {
		var params = req.query;
		let option = {
			session: req.session,
			url: apiUrl.navExport,
			qs: params,
			timeout: 15000,
			json: true
		};
		console.log('/investmentMgmt/investmentStrategyMonitoring/productIndexesForms/navExport.ajax option:', {
			...option,
			req: '#'
		});
		// request(option).pipe(res);
		request(option, (error, response, body) => {
			console.log('/investmentMgmt/investmentStrategyMonitoring/productIndexesForms/navExport.ajax error:', error);
			console.log('/investmentMgmt/investmentStrategyMonitoring/productIndexesForms/navExport.ajax statusCode:', response && response.statusCode);
			console.log('/investmentMgmt/investmentStrategyMonitoring/productIndexesForms/navExport.ajax body:', {
				...body,
				['body']: '*****'
			});
			if (error) {
				return res.send({
					error: 1,
					msg: '操作失败'
				});
			}
			let result = typeof body === 'string' ? JSON.parse(body) : body;
			// console.log(result);
			if (result && result.returnCode == 0) {
				let data = result.body;
				data = data && data.productNav;
				if (data && Array.isArray(data) && data.length > 0) {
					console.log("----------", data)
					var arr = [
						['产品代码', '产品名称', '净值日期', '单位净值', '复权净值', '累计净值']
					];
					// var obj = {
					//     "1": "收益",
					//     "2": "波动",
					//     "3": "风险",
					//     "4": "胜率",
					// }
					data.forEach(function (item) {
						arr.push([item.productId, item.productName, item.navDate, item.unitNv, item.restoredNv, item.accumulatedNv])
					});
					const stream = require('stream');
					const book = XLSX.utils.book_new();
					const sheet = XLSX.utils.aoa_to_sheet(arr);
					XLSX.utils.book_append_sheet(book, sheet, "test");
					const fileContents = XLSX.write(book, {
						type: 'buffer',
						bookType: 'xlsx',
						bookSST: false
					});
					let readStream = new stream.PassThrough();
					readStream.end(fileContents);
					let fileName = new Date().toLocaleDateString() + ".xlsx";
					res.set('Content-disposition', 'attachment; filename=' + fileName);
					res.set('Content-Type', 'text/plain');
					readStream.pipe(res);
				} else {
					res.send('没有数据');
				}
			} else if (result && result.returnCode != 9999) {
				res.send({
					error: 1,
					msg: result.returnMsg
				});
			} else {
				res.send({
					error: 1,
					msg: '查询失败'
				});
			}
		});
	});


};
// 
function showTradeStatus(item) {
	if (item.canBePurchased && item.canBeRedemed) {
		if (item.canBePurchased == 'Y' && item.canBeRedemed == 'Y') {
			return '正常交易'
		} else if (item.canBePurchased == 'N' && item.canBeRedemed == 'Y') {
			return '暂停申购'
		} else if (item.canBePurchased == 'Y' && item.canBeRedemed == 'N') {
			return '暂停赎回'
		} else if (item.canBePurchased == 'N' && item.canBeRedemed == 'N') {
			return '暂停交易'
		} else {
			return '暂无状态'
		}
	} else {
		return '暂无状态'
	}
}
// 计算百分比配比
function calcPrecent(arr) {
	let obj = {
		R: 0,
		O: 0,
		V: 0,
		F: 0
	};
	arr.forEach((item) => {
		if (item.fundApkind in obj) {
			obj[item.fundApkind] += item.fundPercent
		}
	})
	for (let key in obj) {
		if (obj[key] == 0) {
			delete obj[key]
		}
	}
	return obj;
}