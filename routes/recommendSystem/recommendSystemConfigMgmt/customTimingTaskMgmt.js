const request = require('../../../local_data/requestWrapper');
// const fs = require('fs');
// const path = require('path');
// const formidable = require('formidable');
const apiUrlList = require('../apiConfig').recommendSystem.recommendSystemConfigMgmt.customTimingTaskMgmt;
module.exports = function (app) {
    //获取handler
    app.post('/recommendSystem/recommendSystemConfigMgmt/customTimingTaskMgmt/queryHandler.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/recommendSystem/recommendSystemConfigMgmt/customTimingTaskMgmt/queryHandler.ajax',
            req: req,
            url: apiUrlList.queryHandler,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            if (body && body.returnCode == 0) {
                let data = body.body;
                res.send({error: 0, msg: '查询成功', data: data});
            }
            else if (body && body.returnCode != 9999) {
                res.send({error: 1, msg: body.returnMsg});
            }
            else {
                res.send({error: 1, msg: '查询失败'});
            }
        });
    }
);
    //获取分页查询列表
    app.post('/recommendSystem/recommendSystemConfigMgmt/customTimingTaskMgmt/queryInfo.ajax', (req, res, next) => {
            let params = req.body;
            params.pageNo=parseInt(params.pageNo);
            params.pageSize=parseInt(params.pageSize);
            let userId= req.session.loginInfo.userid;
            let option = {
                pageUrl: '/recommendSystem/recommendSystemConfigMgmt/customTimingTaskMgmt/queryInfo.ajax',
                req: req,
                url: apiUrlList.queryInfo,
                qs: params,
                timeout: 15000,
                json: true
            };
            request(option, (error, response, body) => {
                if (error) {
                    return res.send({error: 1, msg: '操作失败'});
                }
                if (body && body.returnCode == 0) {
                    let data = body.body;
                    data.pages = Math.ceil(data.total / params.pageSize);//最大页码
                    data.pageNum = params.pageNo;//当前页
                    res.send({error: 0, msg: '查询成功', data: data});
                }
                else if (body && body.returnCode != 9999) {
                    res.send({error: 1, msg: body.returnMsg});
                }
                else {
                    res.send({error: 1, msg: '查询失败'});
                }
            });
        }
    );
    //删除
    app.post('/recommendSystem/recommendSystemConfigMgmt/customTimingTaskMgmt/delete.ajax', (req, res, next) => {
            let params = req.body;
            let option = {
                pageUrl: '/recommendSystem/recommendSystemConfigMgmt/customTimingTaskMgmt/delete.ajax',
                req: req,
                operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
                url: apiUrlList.delete,
                qs: params,
                timeout: 15000,
                json: true
            };
            request(option, (error, response, body) => {
                if (error) {
                    return res.send({error: 1, msg: '操作失败'});
                }
                if (body && body.returnCode == 0) {
                    res.send({error: 0, msg: '操作成功', data: null});
                }
                else if (body && body.returnCode != 9999) {
                    res.send({error: 1, msg: body.returnMsg});
                }
                else {
                    res.send({error: 1, msg: '操作失败'});
                }
            });
        }
    );
    //新增
    app.post('/recommendSystem/recommendSystemConfigMgmt/customTimingTaskMgmt/add.ajax', (req, res, next) => {
        let params = req.body;
        params.modifyBy=req.session.loginInfo.userid;
        let option = {
            pageUrl: '/recommendSystem/recommendSystemConfigMgmt/customTimingTaskMgmt/add.ajax',
            req: req,
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.add,
            body: req.body,
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
    app.post('/recommendSystem/recommendSystemConfigMgmt/customTimingTaskMgmt/update.ajax', (req, res, next) => {
        let params = req.body;
        params.modifyBy=req.session.loginInfo.userid;
        let option = {
            pageUrl: '/recommendSystem/recommendSystemConfigMgmt/customTimingTaskMgmt/update.ajax',
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
    
};
