const fs = require('fs');
const path = require('path');
const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').awardSetting.cardSetting;
const formidable = require('formidable');
module.exports = function (app) {
    //查询列表
    app.post('/awardMgmt/awardSetting/cardSetting/getTableData.ajax', (req, res, next) => {
        let params = {};
        req.body.rewardCardNo && (params.rewardCardNo = req.body.rewardCardNo);
        params.pageNo = req.body.pageNo;
        params.pageSize = req.body.pageSize;
        let option = {
            pageUrl: '/awardMgmt/awardSetting/cardSetting/getTableData.ajax',
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
    //获取弹窗下拉数据
    app.post('/awardMgmt/awardSetting/cardSetting/getDiaInfoList.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/awardMgmt/awardSetting/cardSetting/getDiaInfoList.ajax',
            req: req,
            url: apiUrlList.getDiaInfoList,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0 && Array.isArray(result.body.mcpAwardTypeConfigs) && Array.isArray(result.body.mcpRewardCardChannels)) {
                let resultData = {
                    mcpAwardTypeConfigs: result.body.mcpAwardTypeConfigs.map(item => {
                        return {id: item.id, typeNm: item.typeNm}
                    }),
                    mcpRewardCardChannels: result.body.mcpRewardCardChannels.map(item => {
                        return {channelNo: item.channelNo, channelNm: item.channelNm}
                    })
                };
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
    app.post('/awardMgmt/awardSetting/cardSetting/add.ajax', (req, res, next) => {
        let params = {};
        params.rewardCardNm = req.body.rewardCardNm;
        params.rewardCardPic = req.body.rewardCardPic;
        params.channelNo = req.body.channelNo;
        params.awardTypeId = req.body.awardTypeId;
        params.awardCardValue = req.body.awardCardValue;
        params.remark = req.body.remark;
        params.msgConfigId=req.body.msgConfigId;
        params.modifyBy = req.session.loginInfo.username;
        let option = {
            pageUrl: '/awardMgmt/awardSetting/cardSetting/add.ajax',
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
    app.post('/awardMgmt/awardSetting/cardSetting/update.ajax', (req, res, next) => {
        let params = {};
        params.id = req.body.id;
        params.rewardCardNm = req.body.rewardCardNm;
        params.rewardCardPic = req.body.rewardCardPic;
        params.channelNo = req.body.channelNo;
        params.awardTypeId = req.body.awardTypeId;
        params.awardCardValue = req.body.awardCardValue;
        params.remark = req.body.remark;
        params.msgConfigId=req.body.msgConfigId;
        params.modifyBy = req.session.loginInfo.username;
        let option = {
            pageUrl: '/awardMgmt/awardSetting/cardSetting/update.ajax',
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
    app.post('/awardMgmt/awardSetting/cardSetting/delete.ajax', (req, res, next) => {
        let params = {};
        params.id = req.body.id;
        params.modifyBy = req.session.loginInfo.username;
        let option = {
            pageUrl: '/awardMgmt/awardSetting/cardSetting/delete.ajax',
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
    //上传图片
    app.post('/awardMgmt/awardSetting/cardSetting/upload.ajax', (req, res, next) => {
        let form = new formidable.IncomingForm();
        form.keepExtensions = true;
        form.parse(req, (err, fields, files) => {
            console.log('图片接收完毕:', files);
            let formData = {
                file: fs.createReadStream(path.resolve(files.file.path))
            };
            let option = {
                pageUrl: '/awardMgmt/awardSetting/cardSetting/upload.ajax',
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
                    res.send({error: 0, msg: '上传成功', data: result.body});
                }
                else if (result && result.responseCode != 9999) {
                    res.send({error: 1, msg: result.returnMsg});
                }
                else {
                    res.send({error: 1, msg: '上传失败'});
                }
            });
        });
    });

    // 消息中心list查询msgRuleList
    app.post('/awardMgmt/awardSetting/cardSetting/msgRuleList.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/awardMgmt/awardSetting/cardSetting/msgRuleList.ajax',
            req: req,
            url: apiUrlList.msgRuleList,
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
};
