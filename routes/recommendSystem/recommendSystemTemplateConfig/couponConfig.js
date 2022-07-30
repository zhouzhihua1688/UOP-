const request = require('../../../local_data/requestWrapper');
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
const apiUrlList = require('../apiConfig').recommendSystem.recommendSystemTemplateConfig.couponConfig;
module.exports = function (app) {
    //获取分页查询列表
    app.post('/recommendSystem/recommendSystemTemplateConfig/couponConfig/queryInfo.ajax', (req, res, next) => {
            let params = req.body;
            params.pageNo = parseInt(params.pageNo);
            params.pageSize = parseInt(params.pageSize);
            let userId = req.session.loginInfo.userid;
            let option = {
                session: req.session,
                url: apiUrlList.queryInfo,
                qs: params,
                timeout: 15000,
                json: true
            };
            console.log('/recommendSystem/recommendSystemTemplateConfig/couponConfig/queryInfo.ajax option:', option);
            request(option, (error, response, body) => {
                console.log('/recommendSystem/recommendSystemTemplateConfig/couponConfig/queryInfo.ajax error:', error);
                console.log('/recommendSystem/recommendSystemTemplateConfig/couponConfig/queryInfo.ajax statusCode:', response && response.statusCode);
                console.log('/recommendSystem/recommendSystemTemplateConfig/couponConfig/queryInfo.ajax body:', body);
                if (error) {
                    return res.send({error: 1, msg: '操作失败'});
                }
                if (body && body.returnCode == 0) {
                    let data = body.body;
                    data.userId = userId;
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
    app.post('/recommendSystem/recommendSystemTemplateConfig/couponConfig/delete.ajax', (req, res, next) => {
            let params = req.body;
            let option = {
                session: req.session,
                url: apiUrlList.deleteInfo,
                qs: params,
                timeout: 15000,
                json: true
            };
            console.log('/recommendSystem/recommendSystemTemplateConfig/couponConfig/delete.ajax option:', option);
            request(option, (error, response, body) => {
                console.log('/recommendSystem/recommendSystemTemplateConfig/couponConfig/delete.ajax error:', error);
                console.log('/recommendSystem/recommendSystemTemplateConfig/couponConfig/delete.ajax statusCode:', response && response.statusCode);
                console.log('/recommendSystem/recommendSystemTemplateConfig/couponConfig/delete.ajax body:', body);
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
    app.post('/recommendSystem/recommendSystemTemplateConfig/couponConfig/add.ajax', (req, res, next) => {

        let option = {
            session: req.session,
            url: apiUrlList.add,
            body: req.body,
            timeout: 15000,
            json: true
        };
        console.log('/recommendSystem/recommendSystemTemplateConfig/couponConfig/add.ajax option:', option);
        request.post(option, (error, response, body) => {
            console.log('/recommendSystem/recommendSystemTemplateConfig/couponConfig/add.ajax error:', error);
            console.log('/recommendSystem/recommendSystemTemplateConfig/couponConfig/add.ajax statusCode:', response && response.statusCode);
            console.log('/recommendSystem/recommendSystemTemplateConfig/couponConfig/add.ajax body:', body);
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
    app.post('/recommendSystem/recommendSystemTemplateConfig/couponConfig/update.ajax', (req, res, next) => {

        let option = {
            session: req.session,
            url: apiUrlList.update,
            body: req.body,
            timeout: 15000,
            json: true
        };
        console.log('/recommendSystem/recommendSystemTemplateConfig/couponConfig/update.ajax option:', option);
        request.post(option, (error, response, body) => {
            console.log('/recommendSystem/recommendSystemTemplateConfig/couponConfig/update.ajax error:', error);
            console.log('/recommendSystem/recommendSystemTemplateConfig/couponConfig/update.ajax statusCode:', response && response.statusCode);
            console.log('/recommendSystem/recommendSystemTemplateConfig/couponConfig/update.ajax body:', body);
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
