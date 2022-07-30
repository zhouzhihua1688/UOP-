const request = require('../../../local_data/requestWrapper');
const path = require('path');
const fs = require('fs');
const formidable = require('formidable');
const apiConfig = require('../apiConfig');
const apiUrlList = apiConfig.classMgmt.classMgmt;
const filePathExternal = apiConfig.filePathExternal + '/classMgmt';
const filePathExternal_url = apiConfig.filePathExternal_url + '/classMgmt';
module.exports = function (app) {
    // 查询
    app.post('/messageCenter/classMgmt/classMgmt/search.ajax', (req, res, next) => {
        let params = {};
        req.body.categoryId && (params.categoryId = req.body.categoryId );
        let option = {
            pageUrl: '/messageCenter/classMgmt/classMgmt/search.ajax',
            req: req,
            url: params.categoryId ? apiUrlList.query : apiUrlList.search,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode === 0 && result.body) {
                if (Array.isArray(result.body)) {
                    result.body.forEach(item => {
                        item.showPushType = item.pushType.split(',').map(value => {
                            if (value == 1) {
                                return 'App站内信';
                            }
                            if (value == 2) {
                                return 'App-push';
                            }
                            if (value == 3) {
                                return '短信';
                            }
                            if (value == 4) {
                                return '微信';
                            }
                            if (value == 5) {
                                return '微信高端';
                            }
                            return '';
                        }).join(',');
                        item.showOpenEnable = item.openEnable ? '是' : '否';
                        item.showTimeEnable = item.timeEnable ? '是' : '否';
                        item.showReceiveEnable = item.receiveEnable ? '是' : '否';
                        item.showMultiEnable = item.multiEnable ? '是' : '否';
                        item.showShowStatus = item.showStatus ? '是' : '否';
                        item.showOpenStatus = item.openStatus ? '开' : '关';
                        item.showSubscribeEnable = item.subscribeEnable ? '是' : '否';
                        item.showSubSubscribeEnable = item.subSubscribeEnable ? '是' : '否';
                        item.showDisplayReddot = item.displayReddot=='0' ? '数字' : item.displayReddot=='1'?'红点':'-';
                    });
                    res.send({error: 0, msg: '查询成功', data: result.body});
                }
                else {
                    res.send({error: 0, msg: '查询成功', data: [result.body]});
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
    // 删除
    app.post('/messageCenter/classMgmt/classMgmt/del.ajax', (req, res, next) => {
        let params = {};
        req.body.categoryId && (params.categoryId = req.body.categoryId );
        let option = {
            pageUrl: '/messageCenter/classMgmt/classMgmt/del.ajax',
            req: req,
            operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            qs: params,
            url: apiUrlList.del,
            timeout: 15000,
            json: true
        };
        request.del(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode === 0) {
                res.send({error: 0, msg: '删除成功'});
            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: result.returnCode, msg: '删除失败'});
            }
        });
    });
    // 新增
    app.post('/messageCenter/classMgmt/classMgmt/add.ajax', (req, res, next) => {
        let params = {};
        params.categoryName = req.body.categoryName;
        params.pushType = req.body.pushType;
        params.pushTime = req.body.pushTime;
        params.openEnable = req.body.openEnable === 'true';
        params.timeEnable = req.body.timeEnable === 'true';
        params.receiveEnable = req.body.receiveEnable === 'true';
        params.multiEnable = req.body.multiEnable === 'true';
        params.openStatus = req.body.openStatus === 'true';
        params.showStatus = req.body.showStatus === 'true';
        params.subscribeEnable = req.body.subscribeEnable === 'true';
        params.subSubscribeEnable = req.body.subSubscribeEnable === 'true';
        params.displayReddot = Number(req.body.displayReddot);
        params.imageUrl = req.body.imageUrl;
        params.creator = req.session['loginInfo'].username;
        let option = {
            pageUrl: '/messageCenter/classMgmt/classMgmt/add.ajax',
            req: req,
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.add,
            timeout: 30000,
            body: params,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode === 0) {
                res.send({error: 0, msg: '新增成功'});
            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: result.returnCode, msg: '新增失败'});
            }
        });
    });
    // 修改
    app.post('/messageCenter/classMgmt/classMgmt/update.ajax', (req, res, next) => {
        let params = {};
        params.categoryId = req.body.categoryId;
        params.categoryName = req.body.categoryName;
        params.pushType = req.body.pushType;
        params.pushTime = req.body.pushTime;
        params.openEnable = req.body.openEnable === 'true';
        params.timeEnable = req.body.timeEnable === 'true';
        params.receiveEnable = req.body.receiveEnable === 'true';
        params.multiEnable = req.body.multiEnable === 'true';
        params.openStatus = req.body.openStatus === 'true';
        params.showStatus = req.body.showStatus === 'true';
        params.subscribeEnable = req.body.subscribeEnable === 'true';
        params.subSubscribeEnable = req.body.subSubscribeEnable === 'true';
        params.displayReddot = Number(req.body.displayReddot);
        params.imageUrl = req.body.imageUrl;
        params.creator = req.session['loginInfo'].username;
        let option = {
            pageUrl: '/messageCenter/classMgmt/classMgmt/update.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.update,
            timeout: 30000,
            body: params,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode === 0) {
                res.send({error: 0, msg: '更新成功'});
            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: result.returnCode, msg: '更新失败'});
            }
        });
    });
    // 文件上传
    app.post('/messageCenter/classMgmt/classMgmt/uploadFile.ajax', (req, res, next) => {
        try {
            !fs.existsSync(apiConfig.filePathExternal) && fs.mkdirSync(apiConfig.filePathExternal);
            !fs.existsSync(filePathExternal) && fs.mkdirSync(filePathExternal);
        } catch (error) {
            console.log('文件上传失败：新建文件路径出错------------------------', error);
            return res.send({error: 1, msg: '文件上传失败：新建文件路径出错', data: null});
        }
        let form = new formidable.IncomingForm();
        form.uploadDir = filePathExternal;
        form.keepExtensions = true;
        form.parse(req, (error, fields, files) => {
            if (error) {
                console.log('文件上传出错------------------------', error);
                res.send({error: 1, msg: '文件上传失败', data: null});
            }
            console.log('files=', files);
            // 文件重命名
            try {
                let originFilePath = path.resolve(files.file.path);
                let originFileName = files.file.name.split('.')[0];
                let originFileType = files.file.name.split('.')[1];
                let newFileName = `${originFileName}_${new Date().getTime()}.${originFileType}`;
                fs.rename(originFilePath, `${filePathExternal}/${newFileName}`, error => {
                    if (error) {
                        throw err;
                    }
                });
                return res.send({error: 0, msg: '上传成功', data: `${filePathExternal_url}/${newFileName}`});
            } catch (error) {
                console.log('文件重命名出错------------------------', error);
                return res.send({error: 1, msg: '上传失败：文件重命名出错', data: null});
            }
        });
    });
};