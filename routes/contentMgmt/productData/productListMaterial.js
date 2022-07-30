const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').productData.productListMaterial;
const baseUrl = '/contentMgmt/productData/productList';
const apiConfig = require('../apiConfig');
const filePathExternal = apiConfig.filePathExternal + '/productData';
const filePathExternalReal = apiConfig.filePathExternal + '/productData/productListMaterial';
const filePathExternalBak = apiConfig.filePathExternal + '/productData/productListMaterial/bak';
const filePathExternal_url = apiConfig.filePafilePathExternalthUrl + '/productData/productListMaterial';//返回给前端的路径
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
module.exports = function (app) {
    // 获取初始数据和查询
    app.post(`${baseUrl}/getTableDataMaterial.ajax`, (req, res, next) => {
        let option = {
            pageUrl: `${baseUrl}/getTableDataMaterial.ajax`,
            req,
            url: apiUrlList.tableData,
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
		// 查询一二级分类、
		app.post(`${baseUrl}/classifyListMaterial.ajax`, (req, res, next) => {
			let option = {
					pageUrl: `${baseUrl}/classifyListMaterial.ajax`,
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
		app.post(`${baseUrl}/threeClassifyListMaterial.ajax`, (req, res, next) => {
			let option = {
					pageUrl: `${baseUrl}/threeClassifyListMaterial.ajax`,
					req,
					url: apiUrlList.threeClassifyList,
					qs:req.body,
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
		app.post(`${baseUrl}/getExistingMaterialList.ajax`, (req, res, next) => {
			let option = {
					pageUrl: `${baseUrl}/getExistingMaterialList.ajax`,
					req,
					url: apiUrlList.getExistingMaterials,
					body:req.body,
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
    // 新增
    app.post(`${baseUrl}/addMaterial.ajax`, (req, res, next) => {
        let params = req.body;
				params.createBy = req.session.loginInfo.userid;
        let option = {
            pageUrl: `${baseUrl}/addMaterial.ajax`,
            req: req,
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.add,
            body: params,
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
		// 修改前查询单条数据信息
		app.post(`${baseUrl}/singleQueryMaterial.ajax`, (req, res, next) => {
			let option = {
					pageUrl: `${baseUrl}/singleQueryMaterial.ajax`,
					req,
					url: apiUrlList.singleQuery,
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
    // 修改
    app.post(`${baseUrl}/updateMaterial.ajax`, (req, res, next) => {
        let params = req.body;
				params.modifyBy = req.session.loginInfo.userid;
				if(params.mediaType=='text'&&params.mediaInfo.contentId){
					params.mediaInfo.contentId = Number(params.mediaInfo.contentId)
				}
        let option = {
            pageUrl: `${baseUrl}/updateMaterial.ajax`,
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.update,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '修改失败',
                    data: null
                });
            }
            if (body.returnCode === 0) {
                res.send({
                    error: 0,
                    msg: '修改成功',
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
                    msg: '修改失败',
                    data: null
                });
            }
        });
    });
		//删除
		app.post(`${baseUrl}/deleteMaterial.ajax`, (req, res, next) => {
			let params = req.body;
			let option = {
					pageUrl: `${baseUrl}/deleteMaterial.ajax`,
					req: req,
					operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
					url: apiUrlList.delete,
					body: params,
					timeout: 15000,
					json: true
			};
			request.post(option, (error, response, body) => {
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
		// 获取渠道权限列表
		app.post(`${baseUrl}/getbranchList.ajax`, (req, res, next) => {
			let option = {
					pageUrl: `${baseUrl}/getbranchList.ajax --productListMaterial`,
					req,
					url: apiUrlList.branchList,
					qs: {group:"tfyj"},
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
		//上传所有文件统一接口
    app.post(`${baseUrl}/uploadImgMaterial.ajax`, (req, res, next) => {
			// 以fundId作为独立文件夹存放
			var fundId = req.query.fundId;
			try {
				!fs.existsSync(apiConfig.filePathExternal) && fs.mkdirSync(apiConfig.filePathExternal);
				!fs.existsSync(filePathExternal) && fs.mkdirSync(filePathExternal);
				!fs.existsSync(filePathExternalReal) && fs.mkdirSync(filePathExternalReal);
				!fs.existsSync(filePathExternalBak) && fs.mkdirSync(filePathExternalBak);
				let fundIdPath = filePathExternalReal+'/'+fundId;
				let fundIdPathBack = filePathExternalBak+'/'+fundId;
				let fundIdPathForWeb = filePathExternal_url+'/'+fundId;
				!fs.existsSync(fundIdPath) && fs.mkdirSync(fundIdPath);
				!fs.existsSync(fundIdPathBack) && fs.mkdirSync(fundIdPathBack);
				let form = new formidable.IncomingForm();
				form.uploadDir = fundIdPath;
				form.keepExtensions = true;
				form.parse(req, (err, fields, files) => {
					console.log('数据接收完毕:', fields);
					console.log('文件接收完毕:', files);
					let originFilePath = path.resolve(files.file.path);
					// 带后缀文件名
					let originFileName = files.file.name;
					// 不带后缀
					let fileExtname = path.extname(originFileName);//文件扩展名
					let simplifyName = originFileName.split(fileExtname)[0];//不带扩展名的文件名
					try {
							if(fs.existsSync(path.resolve(fundIdPath,originFileName))){
								const fileReName  = `${simplifyName}-${new Date().getTime()}${fileExtname}`;
								// const fileReName  = `${simplifyName}-${currentCST()}${fileExtname}`;
								const oldPath = path.resolve(fundIdPath,originFileName);
								const newPath = path.resolve(fundIdPathBack,fileReName);
								console.log('historyBakPath:',newPath);
								console.log('historyBakName:',fileReName);
								fs.renameSync(oldPath,newPath);
							}
							// 为文件名加时间戳
							const fileReNames  = `${simplifyName}_${new Date().getTime()}${fileExtname}`;
							let reader = fs.createReadStream(originFilePath);
							let writer = fs.createWriteStream(`${fundIdPath}/${fileReNames}`);
							console.log('uploadFilePath:',`${fundIdPath}/${fileReNames}`);
							reader.pipe(writer);
							writer.on('finish',()=>{
									// 写入成功后执行
									try {
											fs.unlinkSync(originFilePath);
											res.send({
													error: 0,
													msg: '上传成功',
													data: {
														imageUrl: `${fundIdPathForWeb}/${fileReNames}`
													}
											});
									} catch (error) {
											console.log('writer inner--------',error);
											fs.unlinkSync(originFilePath);
											res.send({
													error: 1,
													msg: error,
													data: null
											});
									}
							});
					} catch (error) {
							console.log('writer outter--------',error);
							fs.unlinkSync(originFilePath);
							res.send({
									error: 1,
									msg: error,
									data: null
							});
					}
				});
			} catch (error) {
				console.log(`${baseUrl}/uploadImg.ajax -------- 文件上传失败error:`, error);
					res.send({
							error: 0,
							msg: '上传失败',
							data: null
					});
			}
		});
		// 获取
}