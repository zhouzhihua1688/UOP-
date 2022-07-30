const fs = require('fs');
const path = require('path');
const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').resourceMgmt;
const formidable = require('formidable');

module.exports = function (app) {
    //获取所有应用信息
    app.post('/operationMgmt/resourceMgmt/resource/getAppInfoLIst.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/operationMgmt/resourceMgmt/resource/getAppInfoLIst.ajax',
            req: req,
            url: apiUrlList.app,
            qs: {page: 1, rows: 999999},
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0 && Array.isArray(result.body.formList)) {
                let resultArr = [];
                result.body.formList.forEach((item) => {
                    resultArr.push({
                        appId: item.id,
                        appName: item.appName
                    });
                });
                res.send({error: 0, msg: '获取所有应用信息成功', data: resultArr});
            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: 1, msg: '获取所有应用信息失败'});
            }
        });
    });
    //查询资源
    app.post('/operationMgmt/resourceMgmt/resource/getTableData.ajax', (req, res, next) => {
        let params = {};
        req.body.searchField && (params.searchField = req.body.searchField);
        req.body.appId && (params.appId = req.body.appId);
        params.page = req.body.page;
        params.rows = req.body.rows;
        let option = {
            pageUrl: '/operationMgmt/resourceMgmt/resource/getTableData.ajax',
            req: req,
            url: apiUrlList.resource,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0 && Array.isArray(result.body.formList)) {
                result.body.formList.forEach((item) => {
                    item.check = false;
                    if (item.resourceType == 1) {
                        item.showResourceType = '目录';
                    }
                    if (item.resourceType == 2) {
                        item.showResourceType = '菜单';
                    }
                    if (item.resourceType == 3) {
                        item.showResourceType = '按钮';
                    }
                    if (item.resourceType == 4) {
                        item.showResourceType = 'url';
                    }
                    item.method = item.method.toUpperCase();
                });
                let resultData = {};
                resultData.page = result.body.page;
                resultData.records = result.body.records;
                resultData.total = Math.ceil(result.body.total / req.body.rows);
                resultData.tableData = result.body.formList;
                res.send({error: 0, msg: '查询成功', data: resultData});
            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: 1, msg: '查询失败'});
            }
        });
    });
    //根据appId查询资源，返回资源mapping关系
    app.post('/operationMgmt/resourceMgmt/resource/getResourceInfoList.ajax', (req, res, next) => {
        let params = {};
        req.body.appId && (params.appId = req.body.appId);
        params.page = req.body.page;
        params.rows = req.body.rows;
        let option = {
            pageUrl: '/operationMgmt/resourceMgmt/resource/getResourceInfoList.ajax',
            req: req,
            url: apiUrlList.resource,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0 && Array.isArray(result.body.formList)) {
                let resultArr = [];
                result.body.formList.forEach((item) => {
                    resultArr.push({
                        id: item.id,
                        defaultUrl: item.defaultUrl
                    });
                });
                res.send({error: 0, msg: '查询成功', data: resultArr});
            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: 1, msg: '查询失败'});
            }
        });
    });
    //删除资源
    app.post('/operationMgmt/resourceMgmt/resource/delete.ajax', (req, res, next) => {
        let params = {};
        params.ids = req.body.ids;
        let option = {
            pageUrl: '/operationMgmt/resourceMgmt/resource/delete.ajax',
            req: req,
            operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.resource,
            qs: params,
            timeout: 15000,
            json: true
        };
        request.del(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body == 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode === 0) {
                res.send({error: 0, msg: '删除成功'});
            }
            else {
                res.send({error: 1, msg: '删除失败'});
            }
        });
    });
    //新增资源
    app.post('/operationMgmt/resourceMgmt/resource/add.ajax', (req, res, next) => {
        let params = {};
        params.appId = req.body.appId;
        params.defaultUrl = req.body.defaultUrl;
        params.orderNum = req.body.orderNum;
        params.parentId = req.body.parentId;
        params.permCode = req.body.permCode;
        params.method = req.body.method;
        params.wildMatch = req.body.wildMatch;
        params.resourceName = req.body.resourceName;
        params.resourceType = req.body.resourceType;
        let option = {
            pageUrl: '/operationMgmt/resourceMgmt/resource/add.ajax',
            req: req,
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.resource,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0) {
                res.send({error: 0, msg: '添加成功'});
            }
            else {
                res.send({error: 1, msg: '添加失败'});
            }
        });
    });
    //修改资源
    app.post('/operationMgmt/resourceMgmt/resource/update.ajax', (req, res, next) => {
        let params = {};
        params.id = req.body.id;
        params.appId = req.body.appId;
        params.defaultUrl = req.body.defaultUrl;
        params.orderNum = req.body.orderNum;
        params.parentId = req.body.parentId;
        params.permCode = req.body.permCode;
        params.method = req.body.method;
        params.wildMatch = req.body.wildMatch;
        params.resourceName = req.body.resourceName;
        params.resourceType = req.body.resourceType;
        let option = {
            pageUrl: '/operationMgmt/resourceMgmt/resource/update.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.resource,
            body: params,
            timeout: 15000,
            json: true
        };
        request.put(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0) {
                res.send({error: 0, msg: '修改成功'});
            }
            else {
                res.send({error: 1, msg: '修改失败'});
            }
        });
    });
    //通过手动输入批量导入资源
    app.post('/operationMgmt/resourceMgmt/resource/uploadResourceByInput.ajax', (req, res, next) => {
        let params = {
            appCode: req.body.appCode,
            appName: req.body.appName
        };
        let option = {
            pageUrl: '/operationMgmt/resourceMgmt/resource/uploadResourceByInput.ajax',
            req: req,
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.uploadText,
            qs: params,
            body: JSON.parse(req.body.apiDocs),
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0) {
                res.send({error: 0, msg: '批量导入成功'});
            }
            else {
                res.send({error: 1, msg: '批量导入失败'});
            }
        });
    });
    //通过文件上传批量导入资源
    app.post('/operationMgmt/resourceMgmt/resource/uploadResourceByFile.ajax', (req, res, next) => {
        let form = new formidable.IncomingForm();
        form.keepExtensions = true;
        form.parse(req, (err, fields, files) => {
            console.log('txt文件接收完毕:', files);
            let formData = {
                apiDocs: fs.createReadStream(path.resolve(files.file.path))
            };
            let option = {
                pageUrl: '/operationMgmt/resourceMgmt/resource/uploadResourceByFile.ajax',
                req: req,
                url: `${apiUrlList.uploadFile}?appCode=${fields.appCode}&appName=${fields.appName}`,
                timeout: 30000,
                formData: formData
            };
            request.post(option, (error, response, body) => {
                if (error) {
                    return res.send({error: 1, msg: '上传失败'});
                }
                let result = typeof body === 'string' ? JSON.parse(body) : body;
                if (result && result.returnCode == 0) {
                    res.send({error: 0, msg: '批量上传成功'});
                }
                else if (result && result.responseCode != 9999) {
                    res.send({error: 1, msg: result.returnMsg});
                }
                else {
                    res.send({error: 1, msg: '批量上传失败'});
                }
            });
        });
    });
};
