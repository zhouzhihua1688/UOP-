const request = require('./../../../local_data/requestWrapper');
const original_request = require('request');
const apiUrlList = require('../apiConfig').combinationProductConfig.reportMgmt;
const request_obs = require('../../../local_data/request_obs');
const XLSX = require('xlsx');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
module.exports = function (app) {
	// 获取所有组合
	app.post('/businessMgmt/combinationProductConfig/reportMgmt/fundGroups.ajax', (req, res, next) => {
		let option = {
			pageUrl: '/businessMgmt/combinationProductConfig/reportMgmt/fundGroups.ajax',
			req,
			url: apiUrlList.fundGroups,
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
				return res.send({
					error: 0,
					msg: '获取成功',
					data: result.body
				});
			} else if (result && result.returnCode != 9999) {
				return res.send({
					error: 1,
					msg: result.returnMsg,
					data: null
				});
			} else {
				return res.send({
					error: 1,
					msg: '获取失败',
					data: null
				});
			}
		});
	});
	// 获取列表数据
	app.post('/businessMgmt/combinationProductConfig/reportMgmt/getTableData.ajax', (req, res, next) => {
		let params = {};
		params.reportId = req.body.reportId;
		params.groupId = req.body.groupId;
		let option = {
			pageUrl: '/businessMgmt/combinationProductConfig/reportMgmt/getTableData.ajax',
			req,
			url: apiUrlList.getTableData,
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
			let result = typeof body === 'string' ? JSON.parse(body) : body;
			if (result && result.returnCode == 0) {
				return res.send({
					error: 0,
					msg: '查询成功',
					data: result.body
				});
			} else if (result && result.returnCode != 9999) {
				return res.send({
					error: 1,
					msg: result.returnMsg,
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
	// app.post('/businessMgmt/combinationProductConfig/reportMgmt/getTableData2.ajax', (req, res, next) => {
	//     let params = {};
	//     params.groupId = req.body.groupId;
	//     let option = {
	//         session: req.session,
	//         url: apiUrlList.getTableData2,
	//         qs: params,
	//         timeout: 15000,
	//         json: true
	//     };
	//     console.log('/businessMgmt/combinationProductConfig/reportMgmt/getTableData2.ajax option:', option);
	//     request(option, (error, response, body) => {
	//         console.log('/businessMgmt/combinationProductConfig/reportMgmt/getTableData2.ajax error:', error);
	//         console.log('/businessMgmt/combinationProductConfig/reportMgmt/getTableData2.ajax statusCode:', response &&
	//             response.statusCode);
	//         console.log('/businessMgmt/combinationProductConfig/reportMgmt/getTableData2.ajax body:', body);
	//         if (error) {
	//             return res.send({
	//                 error: 1,
	//                 msg: '查询失败'
	//             });
	//         }
	//         let result = typeof body === 'string' ? JSON.parse(body) : body;
	//         if (result && result.returnCode == 0) {
	//             return res.send({error: 0, msg: '查询成功', data: result.body
	//             });
	//         } else if (result && result.returnCode != 9999) {
	//             return res.send({
	//                 error: 1,
	//                 msg: result.returnMsg,
	//                 data: null
	//             });
	//         } else {
	//             return res.send({
	//                 error: 1,
	//                 msg: '查询失败',
	//                 data: null
	//             });
	//         }
	//     });
	// });
	// 录入
	app.post('/businessMgmt/combinationProductConfig/reportMgmt/saveParam.ajax', (req, res, next) => {
		let params = {};
		params.reportName = req.body.reportName;
		params.reportUrl = req.body.reportUrl;
		let option = {
			pageUrl: '/businessMgmt/combinationProductConfig/reportMgmt/getsaveParamTableData.ajax',
			req,
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
			url: apiUrlList.saveParam,
			body: params,
			timeout: 15000,
			json: true
		};
		request.post(option, (error, response, body) => {
			if (error) {
				return res.send({
					error: 1,
					msg: '录入失败'
				});
			}
			let result = typeof body === 'string' ? JSON.parse(body) : body;
			if (result && result.returnCode == 0) {
				return res.send({
					error: 0,
					msg: '录入成功',
					data: null
				});
			} else if (result && result.returnCode != 9999) {
				return res.send({
					error: 1,
					msg: result.returnMsg,
					data: null
				});
			} else {
				return res.send({
					error: 1,
					msg: '录入失败',
					data: null
				});
			}
		});
	});
	// 删除
	app.post('/businessMgmt/combinationProductConfig/reportMgmt/deleteParam.ajax', (req, res, next) => {
		let params = {};
		params.reportId = req.body.reportId;
		let option = {
			pageUrl: '/businessMgmt/combinationProductConfig/reportMgmt/deleteParam.ajax',
			req,
            operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
			url: apiUrlList.deleteParam,
			qs: params,
			timeout: 15000,
			json: true
		};
		request.delete(option, (error, response, body) => {
			if (error) {
				return res.send({
					error: 1,
					msg: '删除失败',
					data: null
				});
			}
			let result = typeof body === 'string' ? JSON.parse(body) : body;
			if (result && result.returnCode == 0) {
				return res.send({
					error: 0,
					msg: '删除成功',
					data: null
				});
			} else if (result && result.returnCode != 9999) {
				return res.send({
					error: 1,
					msg: result.returnMsg
				});
			} else {
				return res.send({
					error: 1,
					msg: '删除失败',
					data: null
				});
			}
		});
	});
	// 关联
	app.post('/businessMgmt/combinationProductConfig/reportMgmt/relationParam.ajax', (req, res, next) => {
		let params = {};
		params.groupIdList = JSON.parse(req.body.groupIdList);
		params.reportId = req.body.reportId;
		let option = {
			pageUrl: '/businessMgmt/combinationProductConfig/reportMgmt/relationParam.ajax',
			req,
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
			url: apiUrlList.relationParam,
			body: params,
			timeout: 15000,
			json: true
		};
		request.post(option, (error, response, body) => {
			if (error) {
				return res.send({
					error: 1,
					msg: '操作失败'
				});
			}
			let result = typeof body === 'string' ? JSON.parse(body) : body;
			if (result && result.returnCode == 0) {
				return res.send({
					error: 0,
					msg: '操作成功'
				});
			} else if (result && result.returnCode != 9999) {
				return res.send({
					error: 1,
					msg: result.returnMsg
				});
			} else {
				return res.send({
					error: 1,
					msg: '操作失败'
				});
			}
		});
	});
	//文件上传
	app.post('/businessMgmt/combinationProductConfig/reportMgmt/upload.ajax', (req, res, next) => {
		let form = new formidable.IncomingForm();
		form.keepExtensions = true;
		form.parse(req, (err, fields, files) => {
			if (err) {
				console.log('/businessMgmt/combinationProductConfig/reportMgmt/upload.ajax:', err);
				return res.send({
					error: 1,
					msg: '上传文件失败',
					data: null
				});
			}
			console.log('文件接收完毕:', files);
			let option = {
				body: {
					container: 'groupReport',
                    keyStoneName:"newecc",
                    keyStonePassword:"newecc",
					objectName: encodeURIComponent(files.file.name),
				}
			};

			request_obs(option).then(tokenInfo => {
				// let tokenParams = {
				// 	url: tokenInfo.url,
				// 	headers: {
				// 		'X-Auth-Token': tokenInfo.token
				// 	}
				// };
				let tokenParams = {
					url: tokenInfo.uri.href,
					headers: tokenInfo.headers,
				};
				console.log('/businessMgmt/combinationProductConfig/reportMgmt/upload.ajax --tokenParams:', tokenParams);
				fs.createReadStream(files.file.path).pipe(original_request.put(tokenParams));
				let params = {};
				params.reportName = files.file.name;
				let option = {
					pageUrl: '/businessMgmt/combinationProductConfig/reportMgmt/upload.ajax',
					req,
                    operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
					url: apiUrlList.saveParam,
					body: params,
					timeout: 15000,
					json: true
				};
				request.post(option, (error, response, body) => {
					if (error) {
						return res.send({
							error: 1,
							msg: '上传文件成功,录入失败'
						});
					}
					let result = typeof body === 'string' ? JSON.parse(body) : body;
					if (result && result.returnCode == 0) {
						return res.send({
							error: 0,
							msg: '上传文件成功并录入成功',
							data: null
						});
					} else if (result && result.returnCode != 9999) {
						return res.send({
							error: 1,
							msg: result.returnMsg,
							data: null
						});
					} else {
						return res.send({
							error: 1,
							msg: '上传文件成功但录入失败',
							data: null
						});
					}
				});
			}).catch(error => {
				return res.send({
					error: 1,
					msg: '上传文件失败',
					data: null
				});
			});
		});
	});
	// 下载
	app.get('/businessMgmt/combinationProductConfig/reportMgmt/exportFile.ajax', (req, res, next) => {
		let option = {
			body: {
                container: 'groupReport',
                keyStoneName:"newecc",
                keyStonePassword:"newecc",
				objectName: encodeURIComponent(req.query.reportName),
			}
		};
		request_obs(option).then(tokenInfo => {
			// console.log("---",tokenInfo)
			let tokenParams = {
				url: tokenInfo.uri.href,
				headers: tokenInfo.headers,
			};
			// let tokenParams = {
			//     url: tokenInfo.url,
			//     headers: {
			//         'X-Auth-Token': tokenInfo.token
			//     }
			// };
			console.log('/businessMgmt/combinationProductConfig/reportMgmt/exportFile.ajax --tokenParams:', tokenParams);
			let body = original_request(tokenParams);
			body.on('response', function (response) {
				if (response.statusCode !== 200) {
					return res.send({
						error: 1,
						msg: '该报告文件是执行录入操作,不是PDF文件,因此下载失败,请执行上传操作才可以下载',
						data: null
					});
				} else {
					return body.pipe(res);
				}
			});
		}).catch(error => {
			res.send({
				error: 1,
				msg: '下载失败',
				data: null
			})
		});
	});
	// 获取编辑信息
	app.post('/businessMgmt/combinationProductConfig/reportMgmt/getReportInfo.ajax', (req, res, next) => {
		let params = {};
		params.reportId = req.body.reportId;
		let option = {
			pageUrl: '/businessMgmt/combinationProductConfig/reportMgmt/getReportInfo.ajax',
			req,
			url: apiUrlList.getReportInfo,
			qs: params,
			timeout: 15000,
			json: true
		};
		request(option, (error, response, body) => {
			if (error) {
				return res.send({error: 1, msg: '查询失败'});
			}
			if (body.returnCode == 0) {
				return res.send({error: 0, msg: '查询成功', data: body.body});
			} else if (body.returnCode != 9999) {
				return res.send({error: 1, msg: body.returnMsg, data: null});
			} else {
				return res.send({error: 1, msg: '查询失败', data: null});
			}
		});
	});
	// 保存编辑信息
	app.post('/businessMgmt/combinationProductConfig/reportMgmt/saveReportInfo.ajax', (req, res, next) => {
		let option = {
			pageUrl: '/businessMgmt/combinationProductConfig/reportMgmt/saveReportInfo.ajax',
			req,
			url: apiUrlList.saveReportInfo,
			body: req.body,
			timeout: 15000,
			json: true
		};
		request.post(option, (error, response, body) => {
			if (error) {
				return res.send({error: 1, msg: '修改失败'});
			}
			if (body.returnCode == 0) {
				return res.send({error: 0, msg: '修改成功', data: null});
			} else if (body.returnCode != 9999) {
				return res.send({error: 1, msg: body.returnMsg, data: null});
			} else {
				return res.send({error: 1, msg: '修改失败', data: null});
			}
		});
	});
};