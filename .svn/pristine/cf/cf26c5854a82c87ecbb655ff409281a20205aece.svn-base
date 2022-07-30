const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').productMaterialMgmt.contentList;
const baseUrl = '/advertising/productMaterialMgmt/contentList';
const apiConfig = require('../apiConfig');
const filePathExternal = apiConfig.filePathExternal + '/productMaterialMgmt';
const filePathExternalReal = apiConfig.filePathExternal + '/productMaterialMgmt/contentList';
const filePathExternalBak = apiConfig.filePathExternal + '/productMaterialMgmt/contentList/bak';
const filePathExternal_url = apiConfig.filePafilePathExternalthUrl + '/productMaterialMgmt/contentList';//返回给前端的路径
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
module.exports = function(app){
    // 获取初始数据和查询
    app.post('/advertising/productMaterialMgmt/contentList/getTableData.ajax', (req, res, next) => {
        let params = {};
        params.searchKey = req.body.searchKey;
        params.isSeparate = req.body.isSeparate;
        params.page=req.body.page;
        params.size=req.body.size;
        params.startTime=req.body.startTime;
        params.endTime=req.body.endTime;
        params.materialType=req.body.materialType;
        params.searchMaterialTitle=req.body.searchMaterialTitle;
        let option = {
            pageUrl: '/advertising/productMaterialMgmt/contentList/getTableData.ajax',
            req,
            url: apiUrlList.getTableData,
            body: params,
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
            console.log("body==",body);
            console.log("result==",result);
            if (result&&result.returnCode === 0) {
                return res.send({
                    error: 0,
                    msg: '查询成功',
                    data: body
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

    //获取内容分类枚举数据
    app.post('/advertising/productMaterialMgmt/contentList/getContentType.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/advertising/productMaterialMgmt/contentList/getContentType.ajax',
            req,
            url: apiUrlList.getContentType,
            // body: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '获取内容分类失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            console.log("body==",body);
            console.log("result==",result);
            if (result&&result.returnCode === 0) {
                return res.send({
                    error: 0,
                    msg: '获取内容分类成功',
                    data: body
                });
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '获取内容分类失败'
                });
            }
        });
    });

    //获取已有的产品列表
    app.post('/advertising/productMaterialMgmt/productList/getProductList.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/advertising/productMaterialMgmt/productList/getProductList.ajax',
            req,
            url: apiUrlList.getProductList,
            // body: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '获取产品代码失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            console.log("body==",body);
            console.log("result==",result);
            if (result&&result.returnCode === 0) {
                return res.send({
                    error: 0,
                    msg: '获取产品代码成功',
                    data: body
                });
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '获取产品代码失败'
                });
            }
        });
    });
    // 新增
    app.post(`${baseUrl}/add.ajax`, (req, res, next) => {
        let params ={};
        params.fundCode = req.body.fundCode;
        params.fundName = req.body.fundName;
        params.posterDate = req.body.posterDate;
        params.title = req.body.title;
        params.contentDescription=req.body.contentDescription;//内容描述
        params.category = req.body.category;
        params.contentType = req.body.contentType;
        params.coverImageUrl = req.body.coverImageUrl;
        params.riskWarning = req.body.riskWarning; //富文本
        params.status = req.body.status;
        params.fileUrl = req.body.fileUrl;
        params.videoUrl = req.body.videoUrl;
        params.imageUrl =req.body.imageUrl;
        params.linkUrl = req.body.linkUrl;
        params.word = req.body.word;
        params.rankingIndex =Number(req.body.rankingIndex) ;
        console.log('params==',params);
        let option = {
            pageUrl: `${baseUrl}/add.ajax`,
            req: req,
            // operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
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
    // 查询单个内容信息
    app.post('/advertising/productMaterialMgmt/contentList/searchSingle.ajax', (req, res, next) => {
        let params = {};
        params.materialId = req.body.materialId;
        let option = {
            pageUrl: '/advertising/productMaterialMgmt/contentList/searchSingle.ajax',
            req,
            // operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.searchSingle+`/${req.body.materialId}`,
            // qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '查询单个内容失败',
                    data: null
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result&&result.returnCode === 0) {
                return res.send({
                    error: 0,
                    msg: '查询单个内容成功',
                    data: body
                });
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '查询单个内容失败',
                    data: null
                });
            }
        });
    });

    // 修改
    app.post(`${baseUrl}/update.ajax`, (req, res, next) => {
        let params ={};
        params.id = Number(req.body.id);
        params.fundCode = req.body.fundCode;
        params.fundName = req.body.fundName;
        params.posterDate = req.body.posterDate;
        params.title = req.body.title;
        params.contentDescription=req.body.contentDescription;//内容描述
        params.category = req.body.category;
        params.contentType = req.body.contentType;
        params.coverImageUrl = req.body.coverImageUrl;
        params.riskWarning = req.body.riskWarning; //富文本
        params.status = req.body.status;
        params.fileUrl = req.body.fileUrl;
        params.videoUrl = req.body.videoUrl;
        params.imageUrl =req.body.imageUrl;
        params.linkUrl = req.body.linkUrl;
        params.word = req.body.word;
        params.rankingIndex =Number(req.body.rankingIndex) ;
        console.log('params==',params);
        let option = {
            pageUrl: `${baseUrl}/update.ajax`,
            req: req,
            // operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.update,
            body: params,
            timeout: 15000,
            json: true
        };
        request.put(option, (error, response, body) => {
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

    // 删除
    app.post('/advertising/productMaterialMgmt/contentList/deleteParam.ajax', (req, res, next) => {
        let params = {};
        params.materialId = req.body.materialId;
        let option = {
            pageUrl: '/advertising/productMaterialMgmt/contentList/deleteParam.ajax',
            req,
            operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.deleteParam+`/${req.body.materialId}`,
            // qs: params,
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
            if (result&&result.returnCode === 0) {
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

    // 内容列表修改产品的状态-开关
    app.post('/advertising/productMaterialMgmt/contentList/switchUpdate.ajax', (req, res, next) => {
        let params = {};
        // params.fundCode = req.body.fundCode;
        params.enableFlag = req.body.enableFlag;
        let option = {
            pageUrl: '/advertising/productMaterialMgmt/contentList/switchUpdate.ajax',
            req,
            url: apiUrlList.switchUpdate+`/${req.body.materialId}`,
            qs: params,
            timeout: 15000,
            json: true
        };
        request.patch(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '操作失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            console.log("body==",body);
            console.log("result==",result);
            if (result&&result.returnCode === 0) {
                return res.send({
                    error: 0,
                    msg: '操作成功',
                    data: body
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

    //获取用户类型列表
    app.post('/advertising/productMaterialMgmt/contentList/getUserParam.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/advertising/productMaterialMgmt/contentList/getUserParam.ajax',
            req,
            url: apiUrlList.getUserParam,
            // body: params,
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
            console.log("body==",body);
            console.log("result==",result);
            if (result&&result.returnCode === 0) {
                return res.send({
                    error: 0,
                    msg: '查询成功',
                    data: body
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

    //获取渠道
    app.post('/advertising/productMaterialMgmt/contentList/getChannel.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/advertising/productMaterialMgmt/contentList/getChannel.ajax',
            req,
            url: apiUrlList.getChannel,
            // body: params,
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
            console.log("body==",body);
            console.log("result==",result);
            if (result&&result.returnCode === 0) {
                return res.send({
                    error: 0,
                    msg: '查询成功',
                    data: body
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

    //点击查询PV,UV的数据
    app.post('/advertising/productMaterialMgmt/contentList/getPvData.ajax', (req, res, next) => {
        let params = {};

        params.page=req.body.page;
        params.size=req.body.size;
        params.channelCode=req.body.channelCode;
        params.endTime=req.body.endTime
        params.isSeparate=req.body.isSeparate;
        params.startTime=req.body.startTime;
        params.userType=req.body.userType;
        let option = {
            pageUrl: '/advertising/productMaterialMgmt/contentList/getPvData.ajax',
            req,
            url: apiUrlList.getPvData+`/${req.body.materialId}`+'/pvuv',
            body: params,
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
            console.log("body==",body);
            console.log("result==",result);
            if (result&&result.returnCode === 0) {
                return res.send({
                    error: 0,
                    msg: '查询成功',
                    data: body
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

    //上传图片
    app.post('/advertising/productMaterialMgmt/contentList/uploadImg.ajax', (req, res, next) => {
				try {
					!fs.existsSync(apiConfig.filePathExternal) && fs.mkdirSync(apiConfig.filePathExternal);
          !fs.existsSync(filePathExternal) && fs.mkdirSync(filePathExternal);
          !fs.existsSync(filePathExternalReal) && fs.mkdirSync(filePathExternalReal);
          !fs.existsSync(filePathExternalBak) && fs.mkdirSync(filePathExternalBak);
					let form = new formidable.IncomingForm();
					form.uploadDir = filePathExternalReal;
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
								if(fs.existsSync(path.resolve(filePathExternalReal,originFileName))){
									const fileReName  = `${simplifyName}-${new Date().getTime()}${fileExtname}`;
									// const fileReName  = `${simplifyName}-${currentCST()}${fileExtname}`;
									const oldPath = path.resolve(filePathExternalReal,originFileName);
									const newPath = path.resolve(filePathExternalBak,fileReName);
									console.log('historyBakPath:',newPath);
									console.log('historyBakName:',fileReName);
									fs.renameSync(oldPath,newPath);
								}
								let reader = fs.createReadStream(originFilePath);
								let writer = fs.createWriteStream(`${filePathExternalReal}/${originFileName}`);
								console.log('uploadFilePath:',`${filePathExternalReal}/${originFileName}`);
								reader.pipe(writer);
								writer.on('finish',()=>{
										// 写入成功后执行
										try {
												fs.unlinkSync(originFilePath);
												res.send({
														error: 0,
														msg: '上传成功',
														data: {
															imageUrl: `${filePathExternal_url}/${originFileName}`
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
					console.log('/advertising/productMaterialMgmt/contentList/uploadImg.ajax -------- 文件上传失败error:', error);
            res.send({
                error: 0,
                msg: '上传失败',
                data: null
            });
				}
    });
    // 删除图片、文件
    app.post('/advertising/productMaterialMgmt/contentList/delFile.ajax', (req, res, next) => {
  
        let fileUrl=req.body.fileUrl
        
        let option = {
            pageUrl: '/advertising/productMaterialMgmt/contentList/delFile.ajax',
            req,
            // url: apiUrlList.delFile+`/${fileUrl}`,
            url:fileUrl,
            timeout: 30000,
            json:true, 
            session: req.session,
            advertisingUrlFlag: true,  // 添加 添富赢家urlFlag，根据这个flag判断添加添富赢家授权

        };
        console.log('/advertising/productMaterialMgmt/contentList/delFile.ajax:', option);
        request.delete(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '删除失败',
                    data: null
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            console.log('----result-----',result)
            if (result && result.returnCode === 0) {
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
    // 导出主数据
    app.post('/advertising/productMaterialMgmt/contentList/exportAll.ajax', (req, res, next) => {
        let params = {};

        params.searchKey = req.body.searchKey;  //产品名称代码
        params.materialType = req.body.materialType;  //内容分类
        params.searchMaterialTitle = req.body.searchMaterialTitle;  //内容名称搜索
        params.startTime = req.body.startTime;
        params.endTime = req.body.endTime;
        params.isSeparate = req.body.isSeparate;
        params.emailUser = req.session.loginInfo.userid;   //上生产前需恢复
        // params.emailUser='zhulu';//先固定传zhulu测试用---req.session.loginInfo.userid;
        console.log('===',params)
        let option = {
            pageUrl: '/advertising/productMaterialMgmt/contentList/exportAll.ajax',
            req,
            url: apiUrlList.exportAll,
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
            console.log("body==", body);
            console.log("result==", result);
            if (result && result.returnCode === 0) {
                return res.send({
                    error: 0,
                    msg: '数据导出中，请稍后至邮箱查看。',
                    data: body
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

    // 导出PV，UV弹窗数据
    // app.get('/advertising/productMaterialMgmt/contentList/exportPvData.ajax', (req, res, next) => {
    //     let params = {};
    //     params.materialId=req.query.materialId;
    //     params.page=1;
    //     params.size=9999;
    //     let option = {
    //         pageUrl: '/advertising/productMaterialMgmt/contentList/exportPvData.ajax',
    //         req,
    //         url: apiUrlList.exportPvData+`/${req.body.materialId}`+'/pvuv',
    //         body: params,
    //         timeout: 15000,
    //         json: true
    //     };
    //     // request(option).pipe(res);
    //     request.post(option, (error, response, body) => {
    //         if (error) {
    //             return res.send({
    //                 error: 1,
    //                 msg: '操作失败'
    //             });
    //         }
    //         let result = typeof body === 'string' ? JSON.parse(body) : body;
    //         if (result && result.returnCode == 0) {
    //             let data = result.body.data;
    //             console.log("下载",data);
    //             if (data && Array.isArray(data) && data.length > 0) {
    //                 console.log("----------", data)
    //                 var arr = [
    //                     ['用户ID','用户姓名', '用户类型','所在渠道', '本人PV', '带来PV','带来UV',]
    //                 ];
    //                 data.forEach(function (item) {
    //                     arr.push([item.userId,item.username, item.userType, item.channel,])
    //                 });
    //                 const stream = require('stream');
    //                 const book = XLSX.utils.book_new();
    //                 const sheet = XLSX.utils.aoa_to_sheet(arr);
    //                 XLSX.utils.book_append_sheet(book, sheet, "test");
    //                 const fileContents = XLSX.write(book, {
    //                     type: 'buffer',
    //                     bookType: 'xlsx',
    //                     bookSST: false
    //                 });
    //                 let readStream = new stream.PassThrough();
    //                 readStream.end(fileContents);
    //                 var myDate = new Date();
    //                 var mytime = myDate.toLocaleDateString();
    //                 let fileName = mytime + ".xlsx";
    //                 res.set('Content-disposition', 'attachment; filename=' + fileName);
    //                 res.set('Content-Type', 'text/plain');
    //                 readStream.pipe(res);
    //             } else {
    //                 res.send('没有数据');
    //             }
    //         } else if (result && result.returnCode != 9999) {
    //             res.send({
    //                 error: 1,
    //                 msg: result.returnMsg
    //             });
    //         } else {
    //             res.send({
    //                 error: 1,
    //                 msg: '查询失败'
    //             });
    //         }
    //     });
    // });

   app.post('/advertising/productMaterialMgmt/contentList/exportPvData.ajax', (req, res, next) => {
        let params = {};

        params.materialId = req.body.materialId;
        params.userType = req.body.userType;
        params.channelCode = req.body.channelCode;
        params.isSeparate = req.body.isSeparate;
        params.endTime = req.body.endTime;
        params.startTime = req.body.startTime;
        params.emailUser = req.session.loginInfo.userid;   //上生产前需恢复
        // params.emailUser='zhulu';//先固定传zhulu测试用---req.session.loginInfo.userid;
        console.log('===',params)
        let option = {
            pageUrl: '/advertising/productMaterialMgmt/contentList/exportPvData.ajax',
            req,
            url: apiUrlList.exportPvData + `/${req.body.materialId}` + '/export',
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
            console.log("body==", body);
            console.log("result==", result);
            if (result && result.returnCode === 0) {
                return res.send({
                    error: 0,
                    msg: '数据导出中，请稍后至邮箱查看。',
                    data: body
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
}
function currentCST() {
	// GMT+0800 (CST)
	var d = new Date();
	var timezoneOffset = d.getTimezoneOffset(); //minutes, -480
	var ddd = new Date(d.getTime() - timezoneOffset * 60000);   //local date.

	return ddd.toJSON();
}