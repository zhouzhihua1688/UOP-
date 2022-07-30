const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').recommendSystem.recommendViewMgmt.platformPageMgmt;
module.exports = function (app) {
    //获取未分页全部数据
    app.post('/recommendSystem/recommendViewMgmt/platformPageMgmt/queryFullData.ajax', (req, res, next) => {
            let params = req.body;
            let option = {
                pageUrl: '/recommendSystem/recommendViewMgmt/platformPageMgmt/queryFullData.ajax',
                req: req,
                url: apiUrlList.queryFullData,
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
    //获取详情组数据
    app.post('/recommendSystem/recommendViewMgmt/platformPageMgmt/queryDetail.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/recommendSystem/recommendViewMgmt/platformPageMgmt/queryDetail.ajax',
            req: req,
            url: apiUrlList.queryDetail,
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
    //删除单个次级数据
    app.post('/recommendSystem/recommendViewMgmt/platformPageMgmt/delSingle.ajax', (req, res, next) => {
            let params = req.body;
            let option = {
                pageUrl: '/recommendSystem/recommendViewMgmt/platformPageMgmt/delSingle.ajax',
                req: req,
                operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
                url: apiUrlList.delSingle,
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
    //删除一组数据
    app.post('/recommendSystem/recommendViewMgmt/platformPageMgmt/deleteGroup.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/recommendSystem/recommendViewMgmt/platformPageMgmt/deleteGroup.ajax',
            req: req,
            operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.delGroup,
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
    app.post('/recommendSystem/recommendViewMgmt/platformPageMgmt/add.ajax', (req, res, next) => {
        let params=req.body;
        let userId= req.session.loginInfo.userid;
        if(params.resPlaformPagesManagementList.length>0){
            params.resPlaformPagesManagementList.forEach((item)=>{
                item.modifyBy=userId;
            })
        }
        let option = {
            pageUrl: '/recommendSystem/recommendViewMgmt/platformPageMgmt/add.ajax',
            req: req,
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.add,
            body:params,
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
    app.post('/recommendSystem/recommendViewMgmt/platformPageMgmt/update.ajax', (req, res, next) => {
        let params=req.body;
        let userId= req.session.loginInfo.userid;
        if(params.resPlaformPagesManagementList.length>0){
            params.resPlaformPagesManagementList.forEach((item)=>{
                item.modifyBy=userId;
            })
        }
        let option = {
            pageUrl: '/recommendSystem/recommendViewMgmt/platformPageMgmt/update.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.update,
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
    //获取channelMenu
    app.post('/recommendSystem/recommendViewMgmt/platformPageMgmt/channelMenu.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/recommendSystem/recommendViewMgmt/platformPageMgmt/channelMenu.ajax',
            req: req,
            url: apiUrlList.channelMenu,
            qs: req.body,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '内容类型获取失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0&&result.body) {
                res.send({error: 0, msg: '内容类型获取失败',data:result.body});
            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: 1, msg: '内容类型获取失败'});
            }
        });
    });
};
