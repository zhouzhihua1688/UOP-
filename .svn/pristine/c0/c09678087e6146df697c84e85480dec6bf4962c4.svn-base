const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').badgeManagement.badgeManagement;
const  apiConfig =  require('../apiConfig');
const filePathExternal = apiConfig.filePathExternal + '/badgeManagement';
const filePathExternal_url = apiConfig.filePafilePathExternalthUrl + '/badgeManagement';
const path = require('path');
const fs = require('fs');
const formidable = require('formidable');
// const fileName = 'miniMakeFuture_config.json';
function myreverse(arr) {
    for (let i = 0; i < Math.floor(arr.length / 2); i++) {
        [arr[i], arr[arr.length - 1 - i]] = [arr[arr.length - 1 - i], arr[i]]
    }
}
module.exports = function (app) {
    //图片文件上传
    app.post('/clientMgmt/badgeManagement/badgeManagement/uploadPostPicFile.ajax', (req, res, next) => {
        try {
            !fs.existsSync(apiConfig.filePathExternal) && fs.mkdirSync(apiConfig.filePathExternal);
            !fs.existsSync(filePathExternal) && fs.mkdirSync(filePathExternal);
            const postPicFilePath = filePathExternal + '/poster';
            !fs.existsSync(postPicFilePath) && fs.mkdirSync(postPicFilePath);
            let form = new formidable.IncomingForm();
            form.uploadDir = postPicFilePath;
            form.keepExtensions = true;
            form.parse(req, (err, fields, files) => {
                console.log('数据接收完毕:', fields);
                console.log('文件接收完毕:', files);
                let originFilePath = path.resolve(files.file.path);
                fs.createReadStream(originFilePath).pipe(fs.createWriteStream(`${postPicFilePath}/${files.file.name}`));
                fs.unlinkSync(originFilePath);
                res.send({
                    error: 0,
                    msg: '上传成功',
                    data: {
                        // filePath: `${filePathExternal}/poster/${files.file.name}`
                        filePath: `${filePathExternal_url}/poster/${files.file.name}`
                    }
                });
            });
        } catch (error) {
            res.send({
                error: 0,
                msg: '上传失败',
                data: null
            });
        }
    });
    // 根据名称和状态获取初始数据和查询
    app.post('/clientMgmt/badgeManagement/badgeManagement/getTableData.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/clientMgmt/badgeManagement/badgeManagement/getTableData.ajax',
            req,
            url: apiUrlList.getTableData,
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
            if (result && result.returnCode == '0') {
                let resultData = {};
                resultData.tableData = result.body
                myreverse(resultData.tableData)
                return res.send({
                    error: 0,
                    msg: '查询成功',
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
                    msg: '查询失败'
                });
            }
        });
    });
    //查询查询徽章所属的徽章组  getBadgeGrpNm
    app.post('/clientMgmt/badgeManagement/badgeManagement/getBadgeGrpNm.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/clientMgmt/badgeManagement/badgeManagement/getBadgeGrpNm.ajax',
            req,
            url: apiUrlList.getBadgeGrpNm+`?badgeIds=${req.body}`,
            qs: req.body,
            timeout: 15000,
            json: true
        };
        console.log('getBadgeGrpNm',option.url);
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '查询失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {
                let resultData = {};
                resultData.tableData = result.body
                myreverse(resultData.tableData)
                return res.send({
                    error: 0,
                    msg: '查询成功',
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
                    msg: '查询失败'
                });
            }
        });
    });

    //新增数据
    app.post('/clientMgmt/badgeManagement/badgeManagement/addBadge.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/clientMgmt/badgeManagement/badgeManagement/addBadge.ajax',
            req,
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.addBadge,
            body: req.body,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '保存失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                let resultData = {};
                resultData.tableData = result.body
                return res.send({
                    data: resultData,
                    error: 0,
                    msg: '保存成功'
                });
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '保存失败'
                });
            }
        });
    });
    //关联 徽章Id和徽章组id
    app.post('/clientMgmt/badgeManagement/badgeManagement/relevance.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/clientMgmt/badgeManagement/badgeManagement/relevance.ajax',
            req,
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.relevance[0] + req.body.badgeGrpId + apiUrlList.relevance[1],
            body: req.body,
            timeout: 15000,
            json: true
        };
        console.log(apiUrlList.relevance[0] + req.body.badgeGrpId + apiUrlList.relevance[1], 'badgeGroupId');
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '保存失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                let resultData = {};
                resultData.tableData = result.body
                return res.send({
                    data: resultData,
                    error: 0,
                    msg: '保存成功'
                });
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '保存失败'
                });
            }
        });
    });

    //修改徽章
    app.post('/clientMgmt/badgeManagement/badgeManagement/updateBadge.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/clientMgmt/badgeManagement/badgeManagement/updateBadge.ajax',
            req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.updateBadge + req.body.badgeId,
            body: req.body,
            timeout: 15000,
            json: true
        };
        console.log(apiUrlList.updateBadge + req.body.badgeId, '+++++++++++')
        request.put(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '修改失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                return res.send({
                    error: 0,
                    msg: '修改成功'
                });
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '修改失败'
                });
            }
        });
    });

    app.post('/clientMgmt/badgeManagement/badgeManagement/getCustTagInfos.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/clientMgmt/badgeManagement/badgeManagement/getCustTagInfos.ajax',
            req,
            // operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.getCustTagInfos,
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
            if (result && result.returnCode == 0) {
                let resultData = {};
                resultData.tableData = result.body
                return res.send({
                    data: resultData,
                    error: 0,
                    msg: '查询成功'
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