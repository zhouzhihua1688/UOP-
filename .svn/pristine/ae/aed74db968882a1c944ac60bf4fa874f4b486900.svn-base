const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').classMgmt.secondClassMgmt;
const path = require('path');
const fs = require('fs');
const formidable = require('formidable');
const XLSX = require('xlsx');
const apiConfig = require('../apiConfig');
const filePathExternal = apiConfig.filePathExternal + '/secondClassMgmt';
const filePathExternal_url = apiConfig.filePathExternal_url + '/secondClassMgmt';
module.exports = function (app) {
    // 获取分类列表
    app.post('/messageCenter/classMgmt/secondClassMgmt/getClassList.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/messageCenter/classMgmt/secondClassMgmt/getClassList.ajax',
            req: req,
            url: apiUrlList.getClassList,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '获取失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                return res.send({error: 0, msg: '获取成功', data: result.body});
            }
            else if (result && result.returnCode != 9999) {
                return res.send({error: result.returnCode, msg: result.returnMsg, data: null});
            }
            else {
                return res.send({error: 1, msg: '获取失败', data: null});
            }
        });
    });
	// 查询列表
	app.post('/messageCenter/classMgmt/secondClassMgmt/getTableData.ajax', (req, res, next) => {
		let getTableData = new Promise((resolve,reject) => {
            let option = {
                pageUrl: '/messageCenter/classMgmt/secondClassMgmt/getTableData.ajax',
                req: req,
                url: apiUrlList.getTableData,
                timeout: 15000,
                json: true
            };
            request(option, (error, response, body) => {
                if (error) {
                    return reject({message: '获取列表失败'});
                }
                let result = typeof body === 'string' ? JSON.parse(body) : body;
                if (result && result.returnCode == 0) {
                    return resolve(result.body);
                }
                else if (result && result.returnCode != 9999) {
                    return reject({message: result.returnMsg});
                }
                else {
                    return reject({message: '获取列表失败'});
                }
            });
		});

        let getClassList = new Promise((resolve,reject) => {
            let option = {
                pageUrl: '/messageCenter/classMgmt/secondClassMgmt/getTableData.ajax',
                req: req,
                url: apiUrlList.getClassList,
                timeout: 15000,
                json: true
            };
            request(option, (error, response, body) => {
                if (error) {
                    return reject({message: '获取分类列表失败'});
                }
                let result = typeof body === 'string' ? JSON.parse(body) : body;
                if (result && result.returnCode == 0) {
                    return resolve(result.body);
                }
                else if (result && result.returnCode != 9999) {
                    return reject({message: result.returnMsg});
                }
                else {
                    return reject({message: '获取分类列表失败'});
                }
            });
        });

        getTableData.then(body => {
            getClassList.then(classList => {
            	body.forEach(item => {
                    let obj = classList.filter(value => value.categoryId === item.categoryId)[0];
                    item.categoryName = obj ? obj.categoryName : '-';
                    item.showShowStatus = item.showStatus ? '是' : '否';
                    item.hasCheckSubscirbeNum = false;
                });
                return res.send({error: 0, msg: '调用成功', data: body});
			}).catch(error => {
                body.forEach(item => {
                    item.categoryName = '-';
                    item.showShowStatus = item.showStatus ? '是' : '否';
                    item.hasCheckSubscirbeNum = false;
                });
                return res.send({error: 0, msg: '调用成功', data: body});
			});
		}).catch(error => {
            return res.send({error: 1, msg: error.message, data: null});
		});

	});
	// 新增
	app.post('/messageCenter/classMgmt/secondClassMgmt/save.ajax', (req, res, next) => {
		let params = {};
		params.categoryId = req.body.categoryId;
		params.categorySubName = req.body.categorySubName;
		params.categoryRemark = req.body.categoryRemark;
        params.showStatus = req.body.showStatus === 'true';
		params.creator = req.session.loginInfo.userid;
		params.imageUrl = '';
	    let option = {
            pageUrl: '/messageCenter/classMgmt/secondClassMgmt/save.ajax',
            req: req,
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
	        url: apiUrlList.save,
			body: params,
	        timeout: 15000,
	        json: true
	    };
	    request.post(option, (error, response, body) => {
	        if (error) {
	            return res.send({error: 1, msg: '保存失败'});
	        }
	        let result = typeof body === 'string' ? JSON.parse(body) : body;
	        if (result && result.returnCode == 0) {
	            return res.send({error: 0, msg: '保存成功', data: null});
	        }
	        else if (result && result.returnCode != 9999) {
	            return res.send({error: result.returnCode, msg: result.returnMsg, data: null});
	        }
	        else {
	            return res.send({error: 1, msg: '保存失败', data: null});
	        }
	    });
	});
    // 含文件新增
    app.post('/messageCenter/classMgmt/secondClassMgmt/saveWithPic.ajax', (req, res, next) => {
        !fs.existsSync(apiConfig.filePathExternal) && fs.mkdirSync(apiConfig.filePathExternal);
        !fs.existsSync(filePathExternal) && fs.mkdirSync(filePathExternal);
        let form = new formidable.IncomingForm();
        form.uploadDir = filePathExternal;
        form.keepExtensions = true;
        form.parse(req, (err, fields, files) => {
            console.log('表单接收完毕:', fields);
            console.log('表单文件接收完毕:', files);
            let originFilePath = path.resolve(files.file.path);
            let fileArr = files.file.name.split('.');
            let originFileType = fileArr[fileArr.length - 1];
            fileArr.pop();
            let originFileName = fileArr.join('.').trim();
            let newFileName = `${originFileName}_${new Date().getTime()}.${originFileType}`;
            fs.rename(originFilePath, `${filePathExternal}/${newFileName}`, error => {
                let params = {};
                params.categoryId = fields.categoryId;
                params.categorySubName = fields.categorySubName;
                params.categoryRemark = fields.categoryRemark;
                params.showStatus = fields.showStatus === 'true';
                params.creator = req.session.loginInfo.userid;
                params.imageUrl = `${filePathExternal_url}/${newFileName}`;
                let option = {
                    pageUrl: '/messageCenter/classMgmt/secondClassMgmt/saveWithPic.ajax',
                    req: req,
                    operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
                    url: apiUrlList.save,
                    timeout: 30000,
                    body: params,
                    json: true
                };
                request.post(option, (error, response, body) => {
                    if (error) {
                        return res.send({error: 1, msg: '新增失败'});
                    }
                    let result = typeof body === 'string' ? JSON.parse(body) : body;
                    if (result && result.returnCode === 0) {
                        res.send({error: 0, msg: '新增成功'});
                    }
                    else if (result && result.returnCode != 9999) {
                        res.send({error: result.returnCode, msg: result.returnMsg});
                    }
                    else {
                        res.send({error: 1, msg: '新增失败'});
                    }
                });
			});
        });
    });
	// 修改
	app.post('/messageCenter/classMgmt/secondClassMgmt/update.ajax', (req, res, next) => {
		let params = {};
		params.categorySubId = req.body.categorySubId;
        params.categoryId = req.body.categoryId;
        params.categorySubName = req.body.categorySubName;
		params.categoryRemark = req.body.categoryRemark;
        params.showStatus = req.body.showStatus === 'true';
		params.creator = req.session.loginInfo.userid;
	    let option = {
            pageUrl: '/messageCenter/classMgmt/secondClassMgmt/update.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
	        url: apiUrlList.update,
			body: params,
	        timeout: 15000,
	        json: true
	    };
	    request.post(option, (error, response, body) => {
	        if (error) {
	            return res.send({error: 1, msg: '保存失败'});
	        }
	        let result = typeof body === 'string' ? JSON.parse(body) : body;
	        if (result && result.returnCode == 0) {
	            return res.send({error: 0, msg: '保存成功', data: null});
	        }
	        else if (result && result.returnCode != 9999) {
	            return res.send({error: result.returnCode, msg: result.returnMsg, data: null});
	        }
	        else {
	            return res.send({error: 1, msg: '保存失败', data: null});
	        }
	    });
	});
    // 含文件修改
    app.post('/messageCenter/classMgmt/secondClassMgmt/updateWithPic.ajax', (req, res, next) => {
        !fs.existsSync(apiConfig.filePathExternal) && fs.mkdirSync(apiConfig.filePathExternal);
        !fs.existsSync(filePathExternal) && fs.mkdirSync(filePathExternal);
        let form = new formidable.IncomingForm();
        form.uploadDir = filePathExternal;
        form.keepExtensions = true;
        form.parse(req, (err, fields, files) => {
            console.log('表单接收完毕:', fields);
            console.log('表单文件接收完毕:', files);
            let originFilePath = path.resolve(files.file.path);
            let fileArr = files.file.name.split('.');
            let originFileType = fileArr[fileArr.length - 1];
            fileArr.pop();
            let originFileName = fileArr.join('.').trim();
            let newFileName = `${originFileName}_${new Date().getTime()}.${originFileType}`;
            fs.rename(originFilePath, `${filePathExternal}/${newFileName}`, error => {
                let params = {};
                params.categorySubId = fields.categorySubId;
                params.categorySubName = fields.categorySubName;
                params.categoryRemark = fields.categoryRemark;
                params.showStatus = fields.showStatus === 'true';
                params.creator = req.session.loginInfo.userid;
                params.imageUrl = `${filePathExternal_url}/${newFileName}`;
                let option = {
                    pageUrl: '/messageCenter/classMgmt/classMgmt/updateWithPic.ajax',
                    req: req,
                    operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
                    url: apiUrlList.update,
                    timeout: 30000,
                    body: params,
                    json: true
                };
                request.post(option, (error, response, body) => {
                    if (error) {
                        return res.send({error: 1, msg: '修改失败'});
                    }
                    let result = typeof body === 'string' ? JSON.parse(body) : body;
                    if (result && result.returnCode === 0) {
                        res.send({error: 0, msg: '修改成功'});
                    }
                    else if (result && result.returnCode != 9999) {
                        res.send({error: result.returnCode, msg: result.returnMsg});
                    }
                    else {
                        res.send({error: 1, msg: '修改失败'});
                    }
                });
            });
        });
    });
	// 删除
	app.post('/messageCenter/classMgmt/secondClassMgmt/del.ajax', (req, res, next) => {
		let params = {};
		params.categorySubId = req.body.categorySubId;
	    let option = {
            pageUrl: '/messageCenter/classMgmt/secondClassMgmt/del.ajax',
            req: req,
            operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
	        url: apiUrlList.del,
			qs: params,
	        timeout: 15000,
	        json: true
	    };
	    request.del(option, (error, response, body) => {
	        if (error) {
	            return res.send({error: 1, msg: '删除失败'});
	        }
	        let result = typeof body === 'string' ? JSON.parse(body) : body;
	        if (result && result.returnCode == 0) {
	            return res.send({error: 0, msg: '删除成功', data: null});
	        }
	        else if (result && result.returnCode != 9999) {
	            return res.send({error: result.returnCode, msg: result.returnMsg, data: null});
	        }
	        else {
	            return res.send({error: 1, msg: '删除失败', data: null});
	        }
	    });
    });
    // 导出
    app.get('/messageCenter/classMgmt/secondClassMgmt/exportAll.ajax', (req, res, next) => {
        let params = {};
        params.categoryId = req.query.categoryId;
        params.subCategoryId = req.query.subCategoryId;
        let option = {
            pageUrl: '/messageCenter/classMgmt/secondClassMgmt/exportAll.ajax',
            req: req,
            url: apiUrlList.exportData,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                let data = result.body;
                if (data && Array.isArray(data) && data.length > 0) {
                    console.log("----------", data)
                    var arr = [['custNo', 'smsSubscribe', 'wxSubscribe', 'subscribeTime', 'subscribeCategory', 'appSubscribe', 'mssSubscribe', 'openStatus', 'subCategoryId','createTime','updateTime']];
                    data.forEach(function (item) {
                        arr.push([item.custNo,
                            item.smsSubscribe,
                            item.wxSubscribe,
                            item.subscribeTime,
                            item.subscribeCategory,
                            item.appSubscribe,
                            item.mssSubscribe,
                            item.openStatus,
                            item.subCategoryId,
                            item.createTime,
                            item.updateTime]);
                    });
                    const stream = require('stream');
                    const book = XLSX.utils.book_new();
                    const sheet = XLSX.utils.aoa_to_sheet(arr);
                    XLSX.utils.book_append_sheet(book, sheet, "test");
                    const fileContents = XLSX.write(book, {type: 'buffer', bookType: 'xlsx', bookSST: false});
                    let readStream = new stream.PassThrough();
                    readStream.end(fileContents);
                    var myDate = new Date();
                    var mytime = myDate.toLocaleDateString();
                    let fileName = mytime + ".xlsx";
                    res.set('Content-disposition', 'attachment; filename=' + fileName);
                    res.set('Content-Type', 'text/plain');
                    readStream.pipe(res);
                } else {
                    res.send('没有数据');
                }
            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: 1, msg: '查询失败'});
            }
        });
    });
    // 获取订阅人数
    app.post('/messageCenter/classMgmt/secondClassMgmt/getSubscribeNumber.ajax', (req, res, next) => {
        let params = {};
        params.categoryId = req.body.categoryId;
        params.subCategoryId = req.body.subCategoryId;
        let option = {
            pageUrl: '/messageCenter/classMgmt/secondClassMgmt/getSubscribeNumber.ajax',
            req: req,
            url: apiUrlList.exportData,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                res.send({error: 0, msg: 'success', data:result.body.length});
            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: 1, msg: '查询失败'});
            }
        });
    });
};

