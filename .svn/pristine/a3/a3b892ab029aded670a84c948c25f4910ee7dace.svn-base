const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').recommendSystem.recommendSystemGroupMgmt.groupConfig;
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
module.exports = function(app) {
	//查询
	app.post('/recommendSystem/recommendSystemGroupMgmt/groupConfig/search.ajax', (req, res, next) => {
		let params = {};
		params.groupId = req.body.groupId;
		params.groupName = req.body.groupName;
		params.groupType = req.body.groupType;
		params.status = req.body.status;
		let option = {
            pageUrl: '/recommendSystem/recommendSystemGroupMgmt/groupConfig/search.ajax',
            req: req,
			url: apiUrlList.search,
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
			if (body && body.returnCode === 0 && Array.isArray(body.body)) {
				body.body.forEach(item => {
					item.groupName_desc = item.groupName && item.groupName.length > 20 ? item.groupName + '...' : item.groupName;
					item.groupDesc_desc = item.groupDesc && item.groupDesc.length > 20 ? item.groupDesc + '...' : item.groupDesc;
					item.filePath_desc = item.filePath && item.filePath.length > 20 ? item.filePath + '...' : item.filePath;
					item.groupType_desc = item.groupType && item.groupType.length > 20 ? item.groupType + '...' : item.groupType;
					item.groupType_desc = item.groupType;
					if (item.groupType == 1) {
						item.groupType_desc = '实时客群';
					}
					if (item.groupType == 2) {
						item.groupType_desc = '非实时客群';
					}
					item.status_desc = item.status;
					if (item.status == 0) {
						item.status_desc = '未审核';
					}
					if (item.status == 1) {
						item.status_desc = '审核通过';
					}
					if (item.status == 2) {
						item.status_desc = '待审核';
					}
					item.createTime = formatTime(item.createTime);
					item.updateTime = formatTime(item.updateTime);
				});
				res.send({
					error: 0,
					msg: '查询成功',
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
					msg: '查询失败'
				});
			}
		});
	});
	//删除
	app.post('/recommendSystem/recommendSystemGroupMgmt/groupConfig/del.ajax', (req, res, next) => {
		let params = {};
		params.groupId = req.body.groupId;
		let option = {
            pageUrl: '/recommendSystem/recommendSystemGroupMgmt/groupConfig/del.ajax',
            req: req,
            operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
			qs: params,
			url: apiUrlList.del,
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
			if (result && result.returnCode === 0) {
				res.send({
					error: 0,
					msg: '删除成功'
				});
			} else if (result && result.returnCode != 9999) {
				res.send({
					error: 1,
					msg: result.returnMsg
				});
			} else {
				res.send({
					error: 1,
					msg: '删除失败'
				});
			}
		});
	});
	//新增CustNo
	app.post('/recommendSystem/recommendSystemGroupMgmt/groupConfig/addCustno.ajax', (req, res, next) => {
		function verifyCustNo() {
			return new Promise((resolve, reject) => {
				let params = {};
				params.custNo = req.body.custNo;
				let option = {
					pageUrl: '/recommendSystem/recommendSystemGroupMgmt/groupConfig/verifyCustNo.ajax',
					req: req,
					url: apiUrlList.verifyCustNo,
					timeout: 30000,
					qs: params,
					json: true
				};
				request(option, (error, response, body) => {
					if (error) {
						return reject({
							message: '没有查询到相关记录'
						});
					}
					let result = typeof body === 'string' ? JSON.parse(body) : body;
					if (result && result.returnCode === 0) {
						return resolve({
							data: null
						});
					} else if (result && result.returnCode != 9999) {
						return reject({
							message: result.returnMsg
						});
					} else {
						return reject({
							message: '没有查询到相关记录'
						});
					}
				});
			});
		}

		function addCustNo() {
			return new Promise((resolve, reject) => {
				let option = {
					pageUrl: '/recommendSystem/recommendSystemGroupMgmt/groupConfig/addCustno.ajax',
					req: req,
					operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
					url: apiUrlList.addCustNo,
					timeout: 30000,
					qs: req.body,
					json: true
				};
				request.post(option, (error, response, body) => {
					if (error) {
						reject({
							message: '操作失败'
						});
					}
					let result = typeof body === 'string' ? JSON.parse(body) : body;
					if (result && result.returnCode === 0) {
						resolve({
							data: null
						});
					} else if (result && result.returnCode != 9999) {
						reject({
							message: result.returnMsg
						});
					} else {
						resolve({
							message: '添加失败'
						});
					}
				});
			});
		}

		verifyCustNo().then(() => {
			addCustNo().then(() => {
				res.send({
					error: 0,
					msg: '添加成功',
					data: null
				});
			}).catch(error => {
				res.send({
					error: 1,
					msg: error.message,
					data: null
				});
			})
		}).catch(error => {
			res.send({
				error: 1,
				msg: error.message,
				data: null
			});
		})
	});
	//新增
	app.post('/recommendSystem/recommendSystemGroupMgmt/groupConfig/add.ajax', (req, res, next) => {
		let params = {};
		params.groupName = req.body.groupName;
		params.groupType = req.body.groupType;
		params.groupDesc = req.body.groupDesc;
		req.body.groupUserValidateDay && (params.groupUserValidateDay = Number(req.body.groupUserValidateDay));
		params.filePath = req.body.filePath;
		params.status = 0;
		params.createBy = req.session.loginInfo.userid;
		let option = {
            pageUrl: '/recommendSystem/recommendSystemGroupMgmt/groupConfig/add.ajax',
            req: req,
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
			url: apiUrlList.add,
			timeout: 30000,
			body: params,
			json: true
		};
		request.post(option, (error, response, body) => {
			if (error) {
				return res.send({
					error: 1,
					msg: '操作失败',
					data: null
				});
			}
			let result = typeof body === 'string' ? JSON.parse(body) : body;
			if (result && result.returnCode === 0) {
				res.send({
					error: 0,
					msg: '添加成功',
					data: null
				});
			} else if (result && result.returnCode != 9999) {
				res.send({
					error: 1,
					msg: result.returnMsg,
					data: null
				});
			} else {
				res.send({
					error: 1,
					msg: '添加失败',
					data: null
				});
			}
		});
	});
	//修改
	app.post('/recommendSystem/recommendSystemGroupMgmt/groupConfig/update.ajax', (req, res, next) => {
		let params = {};
		params.groupId = req.body.groupId;
		params.groupName = req.body.groupName;
		params.groupType = req.body.groupType;
		params.groupDesc = req.body.groupDesc;
		req.body.groupUserValidateDay && (params.groupUserValidateDay = Number(req.body.groupUserValidateDay));
		params.filePath = req.body.filePath;
		params.status = 0;
		params.createBy = req.session.loginInfo.userid;
		let option = {
            pageUrl: '/recommendSystem/recommendSystemGroupMgmt/groupConfig/update.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
			url: apiUrlList.update,
			timeout: 30000,
			body: params,
			json: true
		};
		request.post(option, (error, response, body) => {
			if (error) {
				return res.send({
					error: 1,
					msg: '操作失败',
					data: null
				});
			}
			let result = typeof body === 'string' ? JSON.parse(body) : body;
			if (result && result.returnCode === 0) {
				res.send({
					error: 0,
					msg: '修改成功',
					data: null
				});
			} else if (result && result.returnCode != 9999) {
				res.send({
					error: 1,
					msg: result.returnMsg,
					data: null
				});
			} else {
				res.send({
					error: 1,
					msg: '修改失败',
					data: null
				});
			}
		});
	});
	//查找CustNo
	app.post('/recommendSystem/recommendSystemGroupMgmt/groupConfig/findCustno.ajax', (req, res, next) => {
		let option = {
            pageUrl: '/recommendSystem/recommendSystemGroupMgmt/groupConfig/findCustno.ajax',
            req: req,
			url: apiUrlList.findCustNo,
			timeout: 30000,
			qs: req.body,
			json: true
		};
		request(option, (error, response, body) => {
			if (error) {
				return res.send({
					error: 1,
					msg: '操作失败',
					data: null
				});
			}
			let result = typeof body === 'string' ? JSON.parse(body) : body;
			if (result && result.returnCode === 0 && result.body) {
				res.send({
					error: 0,
					msg: '用户在本分组',
					data: null
				});
			} else if (result && result.returnCode != 9999) {
				res.send({
					error: 1,
					msg: result.returnMsg,
					data: null
				});
			} else {
				res.send({
					error: 1,
					msg: '添加失败',
					data: null
				});
			}
		});
	});
	//刷新
	app.post('/recommendSystem/recommendSystemGroupMgmt/groupConfig/fresh.ajax', (req, res, next) => {
		let option = {
            pageUrl: '/recommendSystem/recommendSystemGroupMgmt/groupConfig/fresh.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
			url: apiUrlList.fresh,
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
			if (result && result.returnCode === 0) {
				res.send({
					error: 0,
					msg: '刷新成功'
				});
			} else if (result && result.returnCode != 9999) {
				res.send({
					error: 1,
					msg: result.returnMsg
				});
			} else {
				res.send({
					error: 1,
					msg: '刷新失败'
				});
			}
		});
	});
	//上传Excel文件
	app.post('/recommendSystem/recommendSystemGroupMgmt/groupConfig/uploadExcel.ajax', (req, res, next) => {
		let form = new formidable.IncomingForm();
		form.keepExtensions = true;
		form.parse(req, (err, fields, files) => {
			if (err) {
				return res.send({error: 1, msg: '上传Excel文件失败', data: null});
			}
			console.log('前端上传文件:', files);
			let option = {
				pageUrl: '/recommendSystem/recommendSystemGroupMgmt/groupConfig/uploadExcel.ajax',
				req: req,
				operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
				url: apiUrlList.uploadExcel,
				qs: {
					groupId: fields.groupId
				},
				formData: {
					file: fs.createReadStream(path.resolve(files.file.path))
				},
				timeout: 15000,
				json: true
			};
			request.post(option, (error, response, body) => {
				if (error) {
					return res.send({error: 1, msg: '文件上传失败', data: null});
				}
				if (body && body.returnCode == 0) {
					res.send({error: 0, msg: '上传成功', data: null});
				}
				else if (body.returnCode != 0 && body.returnCode != 9999) {
					res.send({error: 1, msg: body.returnMsg, data: null});
				}
				else {
					res.send({error: 1, msg: '文件上传失败', data: null});
				}
			});
		});
	});
    //删除CustNo
    app.post('/recommendSystem/recommendSystemGroupMgmt/groupConfig/delCustNo.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/recommendSystem/recommendSystemGroupMgmt/groupConfig/delCustNo.ajax',
            req: req,
            url: apiUrlList.delCustNo,
            timeout: 30000,
            qs: req.body,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '操作失败',
                    data: null
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode === 0) {
                res.send({
                    error: 0,
                    msg: '删除成功',
                    data: null
                });
            } else if (result && result.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: result.returnMsg,
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

function formatTime(date) {
	let d = new Date(date);
	let year = d.getFullYear();
	let month = d.getMonth() + 1;
	let day = d.getDate();
	let hour = d.getHours();
	let minute = d.getMinutes();
	let second = d.getSeconds();

	function fixZero(n) {
		return n < 10 ? '0' + n : n;
	}

	return [year, month, day].map(fixZero).join('-') + ' ' + [hour, minute, second].map(fixZero).join(':');
}
