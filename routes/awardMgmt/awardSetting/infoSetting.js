const fs = require('fs');
const path = require('path');
const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').awardSetting.infoSetting;
const formidable = require('formidable');
module.exports = function (app) {
    //查询列表
    app.post('/awardMgmt/awardSetting/infoSetting/getTableData.ajax', (req, res, next) => {
        let params = {};
        req.body.awardCardSerialNo && (params.awardCardSerialNo = req.body.awardCardSerialNo);
        req.body.rewardCardNo && (params.rewardCardNo = req.body.rewardCardNo);
        params.pageNo = req.body.pageNo;
        params.pageSize = req.body.pageSize;
        let option = {
            pageUrl: '/awardMgmt/awardSetting/infoSetting/getTableData.ajax',
            req: req,
            url: apiUrlList.getTable,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0 && Array.isArray(result.body.rows)) {
                let resultData = {};
                resultData.page = result.body.pageNum;
                resultData.total = result.body.pages;
                resultData.tableData = result.body.rows;
                resultData.tableData.forEach(item => {
                    let showState = '';
                    if(item.status == 0){
                        showState = '未使用';
                    }
                    if(item.status == 1){
                        showState = '已使用';
                    }
                    if(item.status == 2){
                        showState = '已发送(已兑换)';
                    }
                    if(item.status == 9){
                        showState = '已失效';
                    }
                    item.showState = showState;
                });
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
    //新增
    app.post('/awardMgmt/awardSetting/infoSetting/add.ajax', (req, res, next) => {
        let params = {};
        params.awardCardSerialNo = req.body.awardCardSerialNo;
        params.rewardCardNo = req.body.rewardCardNo;
        params.awardCardPwd = req.body.awardCardPwd;
        params.actId = req.body.actId;
        params.startTime = req.body.startTime;
        params.endTime = req.body.endTime;
        params.remark = req.body.remark;
        params.modifyBy = req.session.loginInfo.username;
        let option = {
            pageUrl: '/awardMgmt/awardSetting/infoSetting/add.ajax',
            req: req,
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.add,
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
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: 1, msg: '添加失败'});
            }
        });
    });
    //修改
    app.post('/awardMgmt/awardSetting/infoSetting/update.ajax', (req, res, next) => {
        let params = {};
        params.id = req.body.id;
        params.awardCardSerialNo = req.body.awardCardSerialNo;
        params.rewardCardNo = req.body.rewardCardNo;
        params.awardCardPwd = req.body.awardCardPwd;
        params.actId = req.body.actId;
        params.startTime = req.body.startTime;
        params.endTime = req.body.endTime;
        params.remark = req.body.remark;
        params.modifyBy = req.session.loginInfo.username;
        let option = {
            pageUrl: '/awardMgmt/awardSetting/infoSetting/update.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.update,
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
                res.send({error: 0, msg: '修改成功'});
            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: 1, msg: '修改失败'});
            }
        });
    });
    //删除
    app.post('/awardMgmt/awardSetting/infoSetting/delete.ajax', (req, res, next) => {
        let params = {};
        params.id = req.body.id;
        params.modifyBy = req.session.loginInfo.username;
        let option = {
            pageUrl: '/awardMgmt/awardSetting/infoSetting/delete.ajax',
            req: req,
            operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.del,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body == 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode === 0) {
                res.send({error: 0, msg: '删除成功'});
            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: 1, msg: '删除失败'});
            }
        });
    });
    //上传
    app.post('/awardMgmt/awardSetting/infoSetting/upload.ajax', (req, res, next) => {
        let form = new formidable.IncomingForm();
        form.keepExtensions = true;
        form.parse(req, (err, fields, files) => {
            console.log('文件接收完毕:', files);
            let formData = {
                modifyBy: req.session.loginInfo.username,
                file: fs.createReadStream(path.resolve(files.file.path))
            };
            let option = {
                pageUrl: '/awardMgmt/awardSetting/infoSetting/upload.ajax',
                req: req,
                url: apiUrlList.upload,
                timeout: 30000,
                formData: formData
            };
            request.post(option, (error, response, body) => {
                if (error) {
                    return res.send({error: 1, msg: '上传失败'});
                }
                let result = typeof body === 'string' ? JSON.parse(body) : body;
                if (result && result.returnCode == 0) {
                    res.send({error: 0, msg: '上传成功'});
                }
                else if (result && result.returnMsg != 9999) {
                    res.send({error: 1, msg: result.returnMsg});
                }
                else {
                    res.send({error: 1, msg: '上传失败'});
                }
            });
        });
    });
};
