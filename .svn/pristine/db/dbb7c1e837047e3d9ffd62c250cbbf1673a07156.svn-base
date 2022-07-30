const request = require('../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').automatedTool.webPicGenerator;
const pagePreviewImgurl = `${apiUrl.pagePreviewImgurl}/wtk/html2img`;
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
module.exports = function (app) {

	// 获取  初始数据和查询
	app.post('/publicConfig/automatedTool/webPicGenerator/getList.ajax', (req, res, next) => {
		let params = req.body
		let option = {
			pageUrl: '/publicConfig/automatedTool/webPicGenerator/getList.ajax',
			req,
			url: apiUrl.dataList,
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
				result.body.forEach(item => {
					item.showImagePath = pagePreviewImgurl +'/'+ item.imagePath;
					item.showUpdateTime = formatTime(item.updateTimestamp)
				});
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
	app.post('/publicConfig/automatedTool/webPicGenerator/dataAdd.ajax', (req, res, next) => {
		let params = {
			...req.body,
			operator: req.session.loginInfo.userid,
			refreshFrequency:'H' //按小时刷新
		};
		let option = {
			pageUrl: '/publicConfig/automatedTool/webPicGenerator/dataAdd.ajax',
			req,
			url: apiUrl.dataAdd,
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
			let result = typeof body === 'string' ? JSON.parse(body) : body;
			if (result && result.returnCode == '0') {
				res.send({
					error: 0,
					msg: '操作成功',
					data: result.body
				});
			} else {
				res.send({
					error: 1,
					msg: '操作失败'
				});
			}
		});
	});
	// 修改
	app.post('/publicConfig/automatedTool/webPicGenerator/dataChange.ajax', (req, res, next) => {
		let params = {...req.body,operator: req.session.loginInfo.userid,refreshFrequency:'H'};//按小时刷新

		let option = {
			pageUrl: '/publicConfig/automatedTool/webPicGenerator/dataChange.ajax',
			req,
			url: apiUrl.dataChange,
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
	app.post('/publicConfig/automatedTool/webPicGenerator/dataDelete.ajax', (req, res, next) => {
		function deleteZipData() {
			return new Promise((resolve, reject) => {
				let params = req.body;
				let option = {
					pageUrl: '/publicConfig/automatedTool/webPicGenerator/dataDelete.ajax--deleteZipData',
					req,
					url: apiUrl.deleteZipData, //删除zip包
					qs: {
						fileName: params.fileName,
						resourceType: 'web-autopic'
					},
					timeout: 15000,
					json: true
				};
				request(option, (error, response, body) => {
					if (error) {
						return reject({
							error: 1,
							msg: '调用失败'
						});
					}
					let result = typeof body === 'string' ? JSON.parse(body) : body;
					if (result && result.returnCode == '0') {
						return resolve();
					} else {
						return reject({
							error: 1,
							msg: '调用失败'
						});
					}
				});
			})
		}

		function deleteUrl() {
			return new Promise((resolve, reject) => {
				let params = req.body;
				let option = {
					pageUrl: '/publicConfig/automatedTool/webPicGenerator/dataDelete.ajax--deleteUrl',
					req,
					url: apiUrl.dataDelete,
					qs: {
						url: params.url
					},
					timeout: 15000,
					json: true
				};
				request.delete(option, (error, response, body) => {
					if (error) {
						return reject({
							error: 1,
							msg: '调用失败'
						});
					}
					let result = typeof body === 'string' ? JSON.parse(body) : body;
					if (result && result.returnCode == '0') {
						return resolve({
							error: 0,
							msg: '调用成功',
							data: result.body
						});
					} else {
						reject({
							error: 1,
							msg: '调用失败'
						});
					}
				});
			})
		}
		deleteZipData().then(()=>{
			deleteUrl().then((result)=>{
				res.send(result)
			},error=>{
				res.send(error)
			})
		}).catch(error=>{
			res.send(error)
		})
	});
	//文件上传
	app.post('/publicConfig/automatedTool/webPicGenerator/upLoad.ajax', (req, res, next) => {
		let form = new formidable.IncomingForm();
		//保留原始文件的扩展名
		form.keepExtensions = true;
		form.parse(req, (err, fields, files) => {
			let formData;
			console.log('form.uploadDir==', form.uploadDir);
			console.log('参数表管理页面表单接收完毕:', fields);
			console.log('参数表管理页面表单文件接收完毕:', files);
			// 为上传的文件重命名：其中files.file.path可以获取文件的上传路径
			try {
				fs.renameSync(files.file.path, form.uploadDir + "/" + files.file.name) //文件改名
				files.file.path = form.uploadDir + "/" + files.file.name //文件改名
			} catch (error) {
				console.log('/publicConfig/automatedTool/webPicGenerator/upLoad.ajax option:', '文件改名失败')
				return res.send({
					error: 1,
					msg: '上传失败',
					data: '上传失败'
				});
			}
			try {
				formData = {
					file: fs.createReadStream(path.resolve(files.file.path)),
					resourceType: 'web-autopic'
				};
			} catch (error) {
				return res.send({
					error: 1,
					msg: '上传失败',
					data: '上传失败'
				});
			}
			let option = {
				url: apiUrl.upload,
				pageUrl: '/publicConfig/automatedTool/webPicGenerator/upLoad.ajax',
				req,
				timeout: 30000,
				formData: formData
			};
			request.post(option, (error, response, body) => {
				// res.setHeader("Content-Type", "text/plain;charset=utf-8");
				if (error) {
					return res.send({
						error: 1,
						msg: '上传失败'
					});
				}
				let result = typeof body === 'string' ? JSON.parse(body) : body;

				if (result && result.returnCode == '0') {
					result.body.fileName = files.file.name
					res.send({
						error: 0,
						msg: '上传成功',
						data: result.body
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
	// 文件check
	app.post('/publicConfig/automatedTool/webPicGenerator/checkFile.ajax', (req, res, next) => {
		let params = {...req.body};
		params.resourceType = 'web-autopic';
		let option = {
			pageUrl: '/publicConfig/automatedTool/webPicGenerator/checkFile.ajax',
			req,
			url: apiUrl.checkFile,
			qs: params,
			timeout: 15000,
			json: true
		};
		request(option, (error, response, body) => {
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
	// 下载
	app.get('/publicConfig/automatedTool/webPicGenerator/downloadFile.ajax', (req, res, next) => {
		var params = {};
		params.fileName = req.query.fileName;
		params.resourceType = 'web-autopic';
		let option = {
			pageUrl: '/publicConfig/automatedTool/webPicGenerator/downloadFile.ajax',
			req,
			url: apiUrl.downloadFile,
			qs: params,
			timeout: 15000,
			json: true
		};
		request(option).pipe(res);
	});
};

function formatTime(timestamp) {
	var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
	var Y = date.getFullYear() + '-';
	var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
	var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
	var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
	var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
	return Y + M + D + h + m + s;
}