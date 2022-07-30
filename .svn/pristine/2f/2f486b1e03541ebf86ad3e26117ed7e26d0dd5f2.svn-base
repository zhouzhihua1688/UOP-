const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').wechatPublicMgmt.replyMessageTemplateMgmt;
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
module.exports = function (app) {
    //查询
    // 获取初始数据和查询
    app.post('/publicConfig/wechatPublicMgmt/replyMessageTemplateMgmt/getTableData.ajax', (req, res, next) => {
        let params = {};
        params.system = req.body.system;
        params.mateKey = req.body.mateKey;
        params.fuzzyKey = req.body.fuzzyKey;
        params.ruleName = req.body.ruleName;
        let option = {
            pageUrl: '/publicConfig/wechatPublicMgmt/replyMessageTemplateMgmt/getTableData.ajax',
            req: req,
            url: apiUrlList.getTableData,
            qs: params,
            timeout: 15000,
            json: true
        };
        request.get(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '查询失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            console.log(result, '---result----');
            if (result && result.returnCode == '0') {
                // var resultData=result.body;
                // resultData.forEach((item) => {
                //     item.check = false;
                // });
                let resultData = {};
                resultData.tableData = result.body
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

    // 添加
    app.post('/publicConfig/wechatPublicMgmt/replyMessageTemplateMgmt/saveParam.ajax', (req, res, next) => {
        let params = {};
        params.articleDes=req.body.articleDes;//图文说明
        params.articlePicurl= req.body.articlePicurl;//图文图片地址
        params.articleTitle=req.body.articleTitle;//图文TITLE
        params.articleUrl= req.body.articleUrl;//图文地址
        params.binding=req.body.binding;//是否绑定
        params.content= req.body.content;//文本内容
        params.enable=req.body.enable;//是否可用：0-不可用，1-可用
        params.fuzzyKey=req.body.fuzzyKey;//不需要全匹配关键字
        params.groupId=req.body.groupId;//组合图文groupID
        params.groupOrder=req.body.groupOrder;//组合图文group中的排序
        params.hqmusicUrl=req.body.hqmusicUrl;//高清音频地址
        params.mateKey=req.body.mateKey;//需要全匹配关键字
        params.msgType= req.body.msgType;// 0:TEXT 1:AUDIO 2:ARTICLE
        params.musicDes= req.body.musicDes;//音频说明
        params.musicTitle=req.body.musicTitle;//音频TITLE
        params.musicUrl=req.body.musicUrl;// 音频地址
        params.ruleName=req.body.ruleName; //规则名
        params.ruleType=req.body.ruleType ;//0:被添加时自动回复,1:消息自动回复,2:关键字自动回复 ,
        params.serverType=req.body.serverType;//服务类型
        params.subType=req.body.subType;  //子类型
        params.system=req.body.system;
        params.mediaId=req.body.mediaId;
        let option = {
            pageUrl: '/publicConfig/wechatPublicMgmt/replyMessageTemplateMgmt/saveParam.ajax',
            req,
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.saveParam,
            body: params,
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
                return res.send({
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
    // 修改
    app.post('/publicConfig/wechatPublicMgmt/replyMessageTemplateMgmt/update.ajax', (req, res, next) => {
        let params = {};
        params.articleDes=req.body.articleDes;//图文说明
        params.articlePicurl= req.body.articlePicurl;//图文图片地址
        params.articleTitle=req.body.articleTitle;//图文TITLE
        params.articleUrl= req.body.articleUrl;//图文地址
        params.binding=req.body.binding;//是否绑定
        params.content= req.body.content;//文本内容
        params.enable=req.body.enable;//是否可用：0-不可用，1-可用
        params.fuzzyKey=req.body.fuzzyKey;//不需要全匹配关键字
        params.groupId=req.body.groupId;//组合图文groupID
        params.groupOrder=req.body.groupOrder;//组合图文group中的排序
        params.hqmusicUrl=req.body.hqmusicUrl;//高清音频地址
        params.mateKey=req.body.mateKey;//需要全匹配关键字
        params.msgType= req.body.msgType;// 0:TEXT 1:AUDIO 2:ARTICLE
        params.musicDes= req.body.musicDes;//音频说明
        params.musicTitle=req.body.musicTitle;//音频TITLE
        params.musicUrl=req.body.musicUrl;// 音频地址
        params.ruleName=req.body.ruleName; //规则名
        params.ruleType=req.body.ruleType ;//0:被添加时自动回复,1:消息自动回复,2:关键字自动回复 ,
        params.serverType=req.body.serverType;//服务类型
        params.subType=req.body.subType;  //子类型
        params.system=req.body.system;
        params.id=req.body.id; //依据Id修改
        params.mediaId=req.body.mediaId;
        let option = {
            pageUrl: '/publicConfig/wechatPublicMgmt/replyMessageTemplateMgmt/update.ajax',
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
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: '修改成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '修改失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });

    // 删除
    app.post('/publicConfig/wechatPublicMgmt/replyMessageTemplateMgmt/deleteParam.ajax', (req, res, next) => {
        let params = {};
        params.id = req.body.id;
        let option = {
            pageUrl: '/publicConfig/wechatPublicMgmt/replyMessageTemplateMgmt/deleteParam.ajax',
            req,
            operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.deleteParam,
            qs: params,
            timeout: 15000,
            json: true
        };
        request.get(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '删除失败',
                    data: null
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
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

    // 刷新
    app.post('/publicConfig/wechatPublicMgmt/replyMessageTemplateMgmt/refresh.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/publicConfig/wechatPublicMgmt/replyMessageTemplateMgmt/refresh.ajax',
            req,
            url: apiUrlList.refresh,
            // qs: params,
            timeout: 15000,
            json: true
        };
        request.get(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '刷新失败',
                    data: null
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                return res.send({
                    error: 0,
                    msg: '刷新成功',
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
                    msg: '刷新失败',
                    data: null
                });
            }
        });
    });

    // 新增页面图片文件上传
    app.post('/publicConfig/wechatPublicMgmt/replyMessageTemplateMgmt/upload.ajax', (req, res, next) => {
        let form = new formidable.IncomingForm();
        form.keepExtensions = true;
        form.parse(req, (err, fields, files) => {
            console.log("fields",fields);
            let systemType=fields.systemType;
            console.log("systemType",systemType);
            if (err) {
                return res.send({error: 1, msg: '上传图片文件失败', data: null});
            }
            console.log('前端上传文件:', files);
            let option = {
                pageUrl: '/publicConfig/wechatPublicMgmt/replyMessageTemplateMgmt/upload.ajax',
                req: req,
                url: apiUrlList.uploadImage+'?systemType='+systemType,
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
                    res.send({error: 0, msg: '上传成功', data: body.body});
                } else if (body.returnCode != 0 && body.returnCode != 9999) {
                    res.send({error: 1, msg: body.returnMsg, data: null});
                } else {
                    res.send({error: 1, msg: '文件上传失败', data: null});
                }
            });
        });
    });
};