const request = require('../../../local_data/requestWrapper');
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
const apiUrlList = require('../apiConfig').recommendSystem.recommendSystemConfigMgmt.positionTheThemeMgmt;
module.exports = function (app) {
	//获取关联数据信息
	app.post('/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/linkDataInfo.ajax', (req, res, next) => {
		//fundgroup,loadpage,funcbtn,manager,wx_funcbtn
		let params = req.body;
		let realParams = {};
		if (params.urlJoin == 'res-fund-group-config' || params.urlJoin == 'res-loadpage-config' || params.urlJoin == 'res-pagefuncbtn-config' || params.urlJoin == 'res-fund-manager-config' || params.urlJoin == 'res-wx-funcbtn-info' || params.urlJoin == 'res-appfuncbtn-info' || params.urlJoin == 'res-template-tags-config') {
			realParams.pageNo = 1;
			realParams.pageSize = 2000;
			realParams.isEnable = 1;
			realParams.channelId = params.channelId;
			realParams.previewTemid = params.previewTemid;
		} else {
			realParams.pageNo = 1;
			realParams.pageSize = 2000;
			realParams.channelId = params.channelId;
			realParams.previewTemid = params.previewTemid;
		}
		let option = {
			pageUrl: '/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/linkDataInfo.ajax.ajax',
			req: req,
			url: apiUrlList.linkDataInfo + params.urlJoin + '/query-list',
			qs: realParams,
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
			if (body && body.returnCode == 0) {
				let data = body.body;
				res.send({
					error: 0,
					msg: '查询成功',
					data: data
				});
			} else if (body && body.returnCode != 9999) {
				res.send({
					error: 1,
					msg: body.returnMsg
				});
			} else {
				res.send({
					error: 1,
					msg: '查询失败'
				});
			}
		});
	});
	//查询主题对应内容类型
	app.post('/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/queryContentTp.ajax', (req, res, next) => {
		let option = {
			pageUrl: '/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/queryContentTp.ajax',
			req: req,
			url: apiUrlList.contentTp,
			qs: req.body,
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
			if (body && body.returnCode == 0) {
				res.send({
					error: 0,
					msg: '操作成功',
					data: body.body
				});
			} else if (body && body.returnCode != 9999) {
				res.send({
					error: 1,
					msg: body.returnMsg
				});
			} else {
				res.send({
					error: 1,
					msg: '操作失败'
				});
			}
		});
	});
	//查询一级菜单列表
	app.post('/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/queryMenuList.ajax', (req, res, next) => {
		if (req.body.channelId) {
			let option = {
				pageUrl: '/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/queryMenuList.ajax',
				req: req,
				qs: req.body,
				url: apiUrlList.queryMenuList,
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
				if (body && body.returnCode == 0) {
					let dataObj = {}
					dataObj.firstMenuList = body.body;
					res.send({
						error: 0,
						msg: '操作成功',
						data: dataObj
					});
				} else if (body && body.returnCode != 9999) {
					res.send({
						error: 1,
						msg: body.returnMsg
					});
				} else {
					res.send({
						error: 1,
						msg: '操作失败'
					});
				}
			});
		} else {
			let getChannelList = new Promise((resolve, reject) => {
				let option = {
					pageUrl: '/recommendSystem/recommendSystemTemplateConfig/positionTheThemeMgmt/queryInfo.ajax ---getOneChannel',
					req: req,
					url: apiUrlList.channelMenu,
					qs: {
						pageNo: 1,
						pageSize: 9999
					},
					timeout: 15000,
					json: true
				};
				request(option, (error, response, body) => {
					if (error) {
						return reject({
							error: 1,
							msg: '操作失败'
						});
					}
					if (body && body.returnCode == 0) {
						let data = body.body;
						return resolve(data);
					} else if (body && body.returnCode != 9999) {
						return reject({
							error: 1,
							msg: body.returnMsg
						});
					} else {
						return reject({
							error: 1,
							msg: '查询失败'
						});
					}
				});
			})
			getChannelList.then((result) => {
				let channelList = result.rows;
				let firstChannel = channelList && channelList[0] ? channelList[0].channelId : '';
				if (firstChannel) {
					let option = {
						pageUrl: '/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/queryMenuList.ajax',
						req: req,
						qs: {
							channelId: firstChannel
						},
						url: apiUrlList.queryMenuList,
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
						if (body && body.returnCode == 0) {
							let dataObj = {}
							dataObj.firstMenuList = body.body;
							dataObj.channelList = channelList;
							res.send({
								error: 0,
								msg: '操作成功',
								data: dataObj
							});
						} else if (body && body.returnCode != 9999) {
							res.send({
								error: 1,
								msg: body.returnMsg
							});
						} else {
							res.send({
								error: 1,
								msg: '操作失败'
							});
						}
					});
				} else {
					res.send({
						error: 1,
						msg: '查询失败'
					});
				}
			}, (error) => {
				res.send({
					error: 1,
					msg: error.msg
				});
			})
		}



	});
	//查询二级/三级菜单列表
	app.post('/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/querySubmenuList.ajax', (req, res, next) => {
		let option = {
			pageUrl: '/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/querySubmenuList.ajax',
			req: req,
			url: apiUrlList.querySubmenuId,
			qs: req.body,
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
			if (body && body.returnCode == 0) {
				res.send({
					error: 0,
					msg: '操作成功',
					data: body.body
				});
			} else if (body && body.returnCode != 9999) {
				res.send({
					error: 1,
					msg: body.returnMsg
				});
			} else {
				res.send({
					error: 1,
					msg: '操作失败'
				});
			}
		});
	});
	//获取主题信息
	app.post('/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/queryThemeInfo.ajax', (req, res, next) => {
		let userId = req.session.loginInfo.userid;
		let option = {
			pageUrl: '/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/queryThemeInfo.ajax',
			req: req,
			url: apiUrlList.themeInfos,
			qs: req.body,
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
			if (body && body.returnCode == 0) {
				res.send({
					error: 0,
					msg: '操作成功',
					data: body.body,
					user: userId
				});
			} else if (body && body.returnCode != 9999) {
				res.send({
					error: 1,
					msg: body.returnMsg
				});
			} else {
				res.send({
					error: 1,
					msg: '操作失败'
				});
			}
		});
	});
	//启用禁用在主页面table 表格
	app.post('/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/enableHome.ajax', (req, res, next) => {
		let option = {
			pageUrl: '/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/enableHome.ajax',
			req: req,
			operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
			url: apiUrlList.enable,
			qs: req.body,
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
			if (body && body.returnCode == 0 && body.body) {
				res.send({
					error: 0,
					msg: '操作成功',
					data: null
				});
			} else if (body && body.returnCode != 9999) {
				res.send({
					error: 1,
					msg: body.returnMsg
				});
			} else {
				res.send({
					error: 1,
					msg: '操作失败'
				});
			}
		});
	});
	//删除
	app.post('/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/delete.ajax', (req, res, next) => {
		let params = req.body;
		let option = {
			pageUrl: '/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/delete.ajax',
			req: req,
			operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
			url: apiUrlList.deleteInfo,
			qs: params,
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
			if (body && body.returnCode == 0) {
				res.send({
					error: 0,
					msg: '操作成功',
					data: null
				});
			} else if (body && body.returnCode != 9999) {
				res.send({
					error: 1,
					msg: body.returnMsg
				});
			} else {
				res.send({
					error: 1,
					msg: '操作失败'
				});
			}
		});
	});
	//新增
	app.post('/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/add.ajax', (req, res, next) => {

		let option = {
			pageUrl: '/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/add.ajax',
			req: req,
			operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
			url: apiUrlList.addThemeInfos,
			body: req.body,
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
			if (result.returnCode == 0) {
				res.send({
					error: 0,
					msg: '添加成功'
				});
			} else if (result && result.returnCode != 9999) {
				res.send({
					error: 1,
					msg: result.returnMsg
				});
			} else {
				res.send({
					error: 1,
					msg: '添加失败'
				});
			}
		});
	});
	//修改
	app.post('/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/update.ajax', (req, res, next) => {
		let option = {
			pageUrl: '/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/update.ajax',
			req: req,
			operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
			url: apiUrlList.updateThemeInfos,
			body: req.body,
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
			if (result.returnCode == 0) {
				res.send({
					error: 0,
					msg: '修改成功'
				});
			} else if (result && result.returnCode != 9999) {
				res.send({
					error: 1,
					msg: result.returnMsg
				});
			} else {
				res.send({
					error: 1,
					msg: '修改失败'
				});
			}
		});
	});
	//复制
	app.post('/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/copyInfo.ajax', (req, res, next) => {
		let option = {
			pageUrl: '/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/copyInfo.ajax',
			req: req,
			url: apiUrlList.copyInfo,
			body: req.body,
			qs: req.body,
			timeout: 15000,
			json: true
		};
		request(option, (error, response, body) => {
			if (error) {
				return res.send({
					error: 1,
					msg: '复制失败'
				});
			}
			if (body && body.returnCode == 0) {
				res.send({
					error: 0,
					msg: '复制成功',
					data: body.body
				});
			} else if (body && body.returnCode != 9999) {
				res.send({
					error: 1,
					msg: body.returnMsg
				});
			} else {
				res.send({
					error: 1,
					msg: '复制失败'
				});
			}
		});
	});
	//二级新增修改删除
	//删除
	app.post('/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/delete1.ajax', (req, res, next) => {
		let params = req.body;
		let option = {
			pageUrl: '/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/delete1.ajax',
			req: req,
			operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
			url: apiUrlList.deleteSecond,
			qs: params,
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
			if (body && body.returnCode == 0) {
				res.send({
					error: 0,
					msg: '操作成功',
					data: null
				});
			} else if (body && body.returnCode != 9999) {
				res.send({
					error: 1,
					msg: body.returnMsg
				});
			} else {
				res.send({
					error: 1,
					msg: '操作失败'
				});
			}
		});
	});
	//新增
	app.post('/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/add1.ajax', (req, res, next) => {
		let option = {
			pageUrl: '/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/add1.ajax',
			req: req,
			operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
			url: apiUrlList.addSecond,
			body: req.body,
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
			if (result.returnCode == 0) {
				res.send({
					error: 0,
					msg: '添加成功'
				});
			} else if (result && result.returnCode != 9999) {
				res.send({
					error: 1,
					msg: result.returnMsg
				});
			} else {
				res.send({
					error: 1,
					msg: '添加失败'
				});
			}
		});
	});
	//修改
	app.post('/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/update1.ajax', (req, res, next) => {
		let option = {
			pageUrl: '/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/update1.ajax',
			req: req,
			operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
			url: apiUrlList.updateSecond,
			body: req.body,
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
			if (result.returnCode == 0) {
				res.send({
					error: 0,
					msg: '修改成功'
				});
			} else if (result && result.returnCode != 9999) {
				res.send({
					error: 1,
					msg: result.returnMsg
				});
			} else {
				res.send({
					error: 1,
					msg: '修改失败'
				});
			}
		});
	});
	//上传图片
	app.post('/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/upload1.ajax', (req, res, next) => {
		let form = new formidable.IncomingForm();
		form.keepExtensions = true;
		form.parse(req, (err, fields, files) => {
			console.log('图片接收完毕:', files);
			let formData = {
				file: fs.createReadStream(path.resolve(files.file.path))
			};
			let option = {
				session: req.session,
				url: apiUrlList.upload,
				timeout: 30000,
				formData: formData
			};
			console.log('/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/upload1.ajax:', option);
			request.post(option, (error, response, body) => {
				console.log('/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/upload1.ajax error:', error);
				console.log('/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/upload1.ajax statusCode:', response && response.statusCode);
				console.log('/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/upload1.ajax body:', body);
				if (error) {
					return res.send({
						error: 1,
						msg: '上传失败'
					});
				}
				let result = typeof body === 'string' ? JSON.parse(body) : body;
				if (result && result.returnCode == 0) {
					res.send({
						error: 0,
						msg: '上传成功',
						data: result.returnMsg
					});
				} else if (result && result.responseCode != 9999) {
					res.send({
						error: 1,
						msg: result.returnMsg
					});
				} else {
					res.send({
						error: 1,
						msg: '上传失败'
					});
				}
			});
		});
	});
	app.post('/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/upload2.ajax', (req, res, next) => {
		let form = new formidable.IncomingForm();
		form.keepExtensions = true;
		form.parse(req, (err, fields, files) => {
			console.log('图片接收完毕:', files);
			let formData = {
				file: fs.createReadStream(path.resolve(files.file.path))
			};
			let option = {
				session: req.session,
				url: apiUrlList.upload,
				timeout: 30000,
				formData: formData
			};
			console.log('/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/upload2.ajax:', option);
			request.post(option, (error, response, body) => {
				console.log('/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/upload2.ajax error:', error);
				console.log('/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/upload2.ajax statusCode:', response && response.statusCode);
				console.log('/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/upload2.ajax body:', body);
				if (error) {
					return res.send({
						error: 1,
						msg: '上传失败'
					});
				}
				let result = typeof body === 'string' ? JSON.parse(body) : body;
				if (result && result.returnCode == 0) {
					res.send({
						error: 0,
						msg: '上传成功',
						data: result.returnMsg
					});
				} else if (result && result.responseCode != 9999) {
					res.send({
						error: 1,
						msg: result.returnMsg
					});
				} else {
					res.send({
						error: 1,
						msg: '上传失败'
					});
				}
			});
		});
	});
	app.post('/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/upload3.ajax', (req, res, next) => {
		let form = new formidable.IncomingForm();
		form.keepExtensions = true;
		form.parse(req, (err, fields, files) => {
			console.log('图片接收完毕:', files);
			let formData = {
				file: fs.createReadStream(path.resolve(files.file.path))
			};
			let option = {
				session: req.session,
				url: apiUrlList.upload,
				timeout: 30000,
				formData: formData
			};
			console.log('/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/upload3.ajax:', option);
			request.post(option, (error, response, body) => {
				console.log('/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/upload3.ajax error:', error);
				console.log('/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/upload3.ajax statusCode:', response && response.statusCode);
				console.log('/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/upload3.ajax body:', body);
				if (error) {
					return res.send({
						error: 1,
						msg: '上传失败'
					});
				}
				let result = typeof body === 'string' ? JSON.parse(body) : body;
				if (result && result.returnCode == 0) {
					res.send({
						error: 0,
						msg: '上传成功',
						data: result.returnMsg
					});
				} else if (result && result.responseCode != 9999) {
					res.send({
						error: 1,
						msg: result.returnMsg
					});
				} else {
					res.send({
						error: 1,
						msg: '上传失败'
					});
				}
			});
		});
	});
	app.post('/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/upload5.ajax', (req, res, next) => {
		let form = new formidable.IncomingForm();
		form.keepExtensions = true;
		form.parse(req, (err, fields, files) => {
			console.log('图片接收完毕:', files);
			let formData = {
				file: fs.createReadStream(path.resolve(files.file.path))
			};
			let option = {
				session: req.session,
				url: apiUrlList.upload,
				timeout: 30000,
				formData: formData
			};
			console.log('/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/upload5.ajax:', option);
			request.post(option, (error, response, body) => {
				console.log('/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/upload5.ajax error:', error);
				console.log('/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/upload5.ajax statusCode:', response && response.statusCode);
				console.log('/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/upload5.ajax body:', body);
				if (error) {
					return res.send({
						error: 1,
						msg: '上传失败'
					});
				}
				let result = typeof body === 'string' ? JSON.parse(body) : body;
				if (result && result.returnCode == 0) {
					res.send({
						error: 0,
						msg: '上传成功',
						data: result.returnMsg
					});
				} else if (result && result.responseCode != 9999) {
					res.send({
						error: 1,
						msg: result.returnMsg
					});
				} else {
					res.send({
						error: 1,
						msg: '上传失败'
					});
				}
			});
		});
	});
	app.post('/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/upload6.ajax', (req, res, next) => {
		let form = new formidable.IncomingForm();
		form.keepExtensions = true;
		form.parse(req, (err, fields, files) => {
			console.log('图片接收完毕:', files);
			let formData = {
				file: fs.createReadStream(path.resolve(files.file.path))
			};
			let option = {
				session: req.session,
				url: apiUrlList.upload,
				timeout: 30000,
				formData: formData
			};
			console.log('/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/upload6.ajax:', option);
			request.post(option, (error, response, body) => {
				console.log('/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/upload6.ajax error:', error);
				console.log('/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/upload6.ajax statusCode:', response && response.statusCode);
				console.log('/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/upload6.ajax body:', body);
				if (error) {
					return res.send({
						error: 1,
						msg: '上传失败'
					});
				}
				let result = typeof body === 'string' ? JSON.parse(body) : body;
				if (result && result.returnCode == 0) {
					res.send({
						error: 0,
						msg: '上传成功',
						data: result.returnMsg
					});
				} else if (result && result.responseCode != 9999) {
					res.send({
						error: 1,
						msg: result.returnMsg
					});
				} else {
					res.send({
						error: 1,
						msg: '上传失败'
					});
				}
			});
		});
	});
	// 删除图片url
	app.post('/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/delImage.ajax', (req, res, next) => {
		let option = {
			pageUrl: '/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/delImage.ajax',
			req: req,
			url: apiUrlList.delImage,
			qs: req.body,
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
			if (body && body.returnCode == 0) {
				res.send({
					error: 0,
					msg: '操作成功',
					data: null
				});
			} else if (body && body.returnCode != 9999) {
				res.send({
					error: 1,
					msg: body.returnMsg
				});
			} else {
				res.send({
					error: 1,
					msg: '操作失败'
				});
			}
		});
	});
	//上传excel文件
	app.post('/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/upload4.ajax', (req, res, next) => {
		let form = new formidable.IncomingForm();
		form.keepExtensions = true;
		form.parse(req, (err, fields, files) => {
			console.log('excel接收完毕:', files);
			console.log('excel all:', req);

			let formData = {
				file: fs.createReadStream(path.resolve(files.file.path))
			};
			let option = {
				session: req.session,
				url: apiUrlList.uploadExcel,
				timeout: 30000,
				formData: formData
			};
			console.log('/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/upload4.ajax:', option);
			request.post(option, (error, response, body) => {
				console.log('/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/upload4.ajax error:', error);
				console.log('/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/upload4.ajax statusCode:', response && response.statusCode);
				console.log('/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/upload4.ajax body:', body);
				if (error) {
					return res.send({
						error: 1,
						msg: '上传失败'
					});
				}
				let result = typeof body === 'string' ? JSON.parse(body) : body;
				if (result && result.returnCode == 0) {
					res.send({
						error: 0,
						msg: '上传成功',
						data: result.body
					});
				} else if (result && result.responseCode != 9999) {
					res.send({
						error: 1,
						msg: result.returnMsg
					});
				} else {
					res.send({
						error: 1,
						msg: '上传失败'
					});
				}
			});
		});
	});
	//导入excel内容
	app.post('/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/uploadExcel.ajax', (req, res, next) => {
		let params = req.body;
		let option = {
			pageUrl: '/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/uploadExcel.ajax',
			req: req,
			operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
			url: apiUrlList.importExcel,
			qs: params,
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
			if (body && body.returnCode == 0 || body.body == '导入完成') {
				res.send({
					error: 0,
					msg: '操作成功',
					data: body.body
				});
				return false;
			} else if (body && body.returnCode != 9999) {
				res.send({
					error: 1,
					msg: body.body
				});
			} else {
				res.send({
					error: 1,
					msg: '操作失败'
				});
			}
		});
	});
	//查看主题内容
	app.post('/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/checkThemeContent.ajax', (req, res, next) => {
		let params = req.body;
		let option = {
			pageUrl: '/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/checkThemeContent.ajax',
			req: req,
			url: apiUrlList.checkThemeContent,
			qs: params,
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
			if (body && body.returnCode == 0) {
				res.send({
					error: 0,
					msg: '操作成功',
					data: body.body
				});
			} else if (body && body.returnCode != 9999) {
				res.send({
					error: 1,
					msg: body.returnMsg
				});
			} else {
				res.send({
					error: 1,
					msg: '操作失败'
				});
			}
		});
	});
	//获取分组管理列表
	app.post('/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/queryDetail.ajax', (req, res, next) => {
		let userId = req.session.loginInfo.userid;
		let option = {
			pageUrl: '/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/queryDetail.ajax',
			req: req,
			url: apiUrlList.queryDetail,
			qs: req.body,
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
			if (body && body.returnCode == 0) {
				res.send({
					error: 0,
					msg: '操作成功',
					data: body.body
				});
			} else if (body && body.returnCode != 9999) {
				res.send({
					error: 1,
					msg: body.returnMsg
				});
			} else {
				res.send({
					error: 1,
					msg: '操作失败'
				});
			}
		});
	});
	//获取userGroupList
	app.post('/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/getUserGroupList.ajax', (req, res, next) => {
		let option = {
			pageUrl: '/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/getUserGroupList.ajax',
			req: req,
			url: apiUrlList.userGroupList,
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
			if (body && body.returnCode == 0) {
				res.send({
					error: 0,
					msg: '操作成功',
					data: body.body
				});
			} else if (body && body.returnCode != 9999) {
				res.send({
					error: 1,
					msg: body.returnMsg
				});
			} else {
				res.send({
					error: 1,
					msg: '操作失败'
				});
			}
		});
	});
	//更新分组管理列表
	app.post('/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/saveData.ajax', (req, res, next) => {
		let option = {
			pageUrl: '/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/saveData.ajax',
			req: req,
			operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
			url: apiUrlList.updateFrom,
			qs: req.body,
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
			if (body && body.returnCode == 0) {
				res.send({
					error: 0,
					msg: '操作成功',
					data: body.body
				});
			} else if (body && body.returnCode != 9999) {
				res.send({
					error: 1,
					msg: body.returnMsg
				});
			} else {
				res.send({
					error: 1,
					msg: '操作失败'
				});
			}
		});
	});
	//刷新
	app.post('/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/fresh.ajax', (req, res, next) => {
		function fresh1() {
			return new Promise((resolve, reject) => {
				let option = {
					pageUrl: '/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/fresh1.ajax',
					req: req,
					operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
					url: apiUrlList.fresh1,
					timeout: 15000,
					json: true
				};
				request(option, (error, response, body) => {
					if (error) {
						return reject({
							message: '刷新失败'
						});
					}
					if (body && body.returnCode == 0) {
						resolve({
							error: 0,
							msg: '刷新成功',
							data: null
						});
					} else if (body && body.returnCode != 9999) {
						reject({
							message: body.returnMsg
						});
					} else {
						reject({
							message: '刷新失败'
						});
					}
				});
			});
		}

		function fresh2() {
			return new Promise((resolve, reject) => {
				let option = {
					pageUrl: '/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/fresh2.ajax',
					req: req,
					operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
					url: apiUrlList.fresh2,
					timeout: 15000,
					json: true
				};
				request(option, (error, response, body) => {
					if (error) {
						return reject({
							message: '刷新失败'
						});
					}
					if (body && body.returnCode == 0) {
						resolve({
							error: 0,
							msg: '刷新成功',
							data: null
						});
					} else if (body && body.returnCode != 9999) {
						reject({
							message: body.returnMsg
						});
					} else {
						reject({
							message: '刷新失败'
						});
					}
				});
			});
		}

		function fresh3() {
			return new Promise((resolve, reject) => {
				let option = {
					pageUrl: '/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/fresh3.ajax',
					req: req,
					operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
					url: apiUrlList.fresh3,
					timeout: 15000,
					json: true
				};
				request(option, (error, response, body) => {
					if (error) {
						return reject({
							message: '刷新失败'
						});
					}
					if (body && body.returnCode == 0) {
						resolve({
							error: 0,
							msg: '刷新成功',
							data: null
						});
					} else if (body && body.returnCode != 9999) {
						reject({
							message: body.returnMsg
						});
					} else {
						reject({
							message: '刷新失败'
						});
					}
				});
			});
		}
		Promise.all([fresh1(), fresh2(), fresh3()]).then(() => {
			res.send({
				error: 0,
				msg: '操作成功',
				data: null
			});
		}).catch(error => {
			res.send({
				error: 1,
				msg: error.message,
				data: null
			});
		})
	});
	//数据场景值列表获取
	app.post('/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/queryScenekeyList.ajax', (req, res, next) => {
		let option = {
			pageUrl: '/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/queryScenekeyList.ajax',
			req: req,
			url: apiUrlList.scenekeyList,
			qs: {
				pageNo: 1,
				pageSize: 9999,
				isEnable: '1'
			},
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
			if (body && body.returnCode == 0) {
				res.send({
					error: 0,
					msg: '操作成功',
					data: body.body
				});
			} else if (body && body.returnCode != 9999) {
				res.send({
					error: 1,
					msg: body.returnMsg
				});
			} else {
				res.send({
					error: 1,
					msg: '操作失败'
				});
			}
		});
	});
	// 这里是外部媒体现有材料的接口配置
	// 查询一二级分类、
	app.post(`/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/classifyListMaterial.ajax`, (req, res, next) => {
		let option = {
			pageUrl: `/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/classifyListMaterial.ajax`,
			req,
			url: apiUrlList.classifyList,
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
			console.log("body==", body);
			console.log("result==", result);
			if (result && result.returnCode === 0) {
				return res.send({
					error: 0,
					msg: '查询成功',
					data: result.body
				});
			} else if (result && result.returnCode != 9999) {
				return res.send({
					error: 1,
					msg: result.returnMsg
				});
			} else {
				return res.send({
					error: 1,
					msg: '查询失败'
				});
			}
		});
	});
	// 查询三级分类、
	app.post(`/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/threeClassifyListMaterial.ajax`, (req, res, next) => {
		let option = {
			pageUrl: `/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/threeClassifyListMaterial.ajax`,
			req,
			url: apiUrlList.threeClassifyList,
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
			let result = typeof body === 'string' ? JSON.parse(body) : body;
			console.log("body==", body);
			console.log("result==", result);
			if (result && result.returnCode === 0) {
				return res.send({
					error: 0,
					msg: '查询成功',
					data: result.body
				});
			} else if (result && result.returnCode != 9999) {
				return res.send({
					error: 1,
					msg: result.returnMsg
				});
			} else {
				return res.send({
					error: 1,
					msg: '查询失败'
				});
			}
		});
	});
	// 获取现有材料列表
	app.post(`/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/getExistingMaterialList.ajax`, (req, res, next) => {
		let option = {
			pageUrl: `/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/getExistingMaterialList.ajax`,
			req,
			url: apiUrlList.getExistingMaterials,
			body: req.body,
			timeout: 15000,
			json: true
		};
		request.post(option, (error, response, body) => {
			if (error) {
				return res.send({
					error: 1,
					msg: '查询失败'
				});
			}
			let result = typeof body === 'string' ? JSON.parse(body) : body;
			console.log("body==", body);
			console.log("result==", result);
			if (result && result.returnCode === 0) {
				return res.send({
					error: 0,
					msg: '查询成功',
					data: result.body
				});
			} else if (result && result.returnCode != 9999) {
				return res.send({
					error: 1,
					msg: result.returnMsg
				});
			} else {
				return res.send({
					error: 1,
					msg: '查询失败'
				});
			}
		});
	});
	// 外部素材接口调用更改素材状态
	app.post(`/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/modifyReleasedStatus.ajax`, (req, res, next) => {
		let option = {
			pageUrl: `/recommendSystem/recommendSystemConfigMgmt/positionTheThemeMgmt/modifyReleasedStatus.ajax`,
			req,
			url: apiUrlList.modifyReleasedStatus,
			body: req.body,
			timeout: 15000,
			json: true
		};
		request.post(option, (error, response, body) => {
			if (error) {
				return res.send({
					error: 1,
					msg: '查询失败'
				});
			}
			let result = typeof body === 'string' ? JSON.parse(body) : body;
			console.log("body==", body);
			console.log("result==", result);
			if (result && result.returnCode === 0) {
				return res.send({
					error: 0,
					msg: '查询成功',
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
					msg: '查询失败'
				});
			}
		});
	});
};