const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').automatedOperation.reachContentMgmt.recommendSystemConfig;
module.exports = function (app) {
    //查询
    app.post('/automatedOperation/reachContentMgmt/recommendSystemConfig/searchList.ajax', (req, res, next) => {
        let params = req.body;
        params.pageNo=parseInt(params.pageNo);
        params.pageSize=parseInt(params.pageSize);
        let userId= req.session.loginInfo.userid;
        let option = {
            pageUrl: '/automatedOperation/reachContentMgmt/recommendSystemConfig/searchList.ajax',
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
                data.userId=userId;
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
    });
    //新增
    app.post('/automatedOperation/reachContentMgmt/recommendSystemConfig/add.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/automatedOperation/reachContentMgmt/recommendSystemConfig/add.ajax',
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
    app.post('/automatedOperation/reachContentMgmt/recommendSystemConfig/update.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/automatedOperation/reachContentMgmt/recommendSystemConfig/update.ajax',
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
    //推荐系统系统内接口
    //查询一级菜单列表
    app.post('/automatedOperation/reachContentMgmt/recommendSystemConfig/queryMenuList.ajax', (req, res, next) => {
            let option = {
                pageUrl: '/automatedOperation/reachContentMgmt/recommendSystemConfig/queryMenuList.ajax',
                req: req,
                url: apiUrlList.queryMenuList,
                timeout: 15000,
                json: true
            };
            request(option, (error, response, body) => {
                if (error) {
                    return res.send({error: 1, msg: '操作失败'});
                }
                if (body && body.returnCode == 0) {
                    res.send({error: 0, msg: '操作成功', data: body.body});
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
    //查询二级/三级菜单列表
    app.post('/automatedOperation/reachContentMgmt/recommendSystemConfig/querySubmenuList.ajax', (req, res, next) => {
            let option = {
                pageUrl: '/automatedOperation/reachContentMgmt/recommendSystemConfig/querySubmenuList.ajax',
                req: req,
                url: apiUrlList.querySubmenuId,
                qs:req.body,
                timeout: 15000,
                json: true
            };
            request(option, (error, response, body) => {
                if (error) {
                    return res.send({error: 1, msg: '操作失败'});
                }
                if (body && body.returnCode == 0) {
                    res.send({error: 0, msg: '操作成功', data: body.body});
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
    //获取主题信息
    app.post('/automatedOperation/reachContentMgmt/recommendSystemConfig/queryThemeInfo.ajax', (req, res, next) => {
            let option = {
                pageUrl: '/automatedOperation/reachContentMgmt/recommendSystemConfig/queryThemeInfo.ajax',
                req: req,
                url: apiUrlList.themeInfos,
                qs:req.body,
                timeout: 15000,
                json: true
            };
            request(option, (error, response, body) => {
                if (error) {
                    return res.send({error: 1, msg: '操作失败'});
                }
                if (body && body.returnCode == 0) {
                    res.send({error: 0, msg: '操作成功', data: body.body});
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
    //获取分组管理列表
    app.post('/automatedOperation/reachContentMgmt/recommendSystemConfig/queryDetail.ajax', (req, res, next) => {
            let option = {
                pageUrl: '/automatedOperation/reachContentMgmt/recommendSystemConfig/queryDetail.ajax',
                req: req,
                url: apiUrlList.queryDetail,
                qs:req.body,
                timeout: 15000,
                json: true
            };
            request(option, (error, response, body) => {
                if (error) {
                    return res.send({error: 1, msg: '操作失败'});
                }
                if (body && body.returnCode == 0) {
                    res.send({error: 0, msg: '操作成功', data: body.body});
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
    //获取关联数据信息
    app.post('/automatedOperation/reachContentMgmt/recommendSystemConfig/linkDataInfo.ajax', (req, res, next) => {
            //fundgroup,loadpage,funcbtn,manager,wx_funcbtn
            let params = req.body;
            let realParams={};
            if(params.urlJoin=='res-fund-group-config'||params.urlJoin=='res-loadpage-config'||params.urlJoin=='res-pagefuncbtn-config'||params.urlJoin=='res-fund-manager-config'||params.urlJoin=='res-wx-funcbtn-info'||params.urlJoin=='res-appfuncbtn-info'||params.urlJoin=='res-template-tags-config') {
                realParams.pageNo=1;
                realParams.pageSize=2000;
                realParams.isEnable=1;
                realParams.channelId=params.channelId;
            }else{
                realParams.pageNo=1;
                realParams.pageSize=2000;
                realParams.channelId=params.channelId;
            }
            let option = {
                pageUrl: '/automatedOperation/reachContentMgmt/recommendSystemConfig/linkDataInfo.ajax',
                req: req,
                url: apiUrlList.linkDataInfo+params.urlJoin+'/query-list',
                qs:realParams,
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
    //刷新
    app.post('/automatedOperation/reachContentMgmt/recommendSystemConfig/refresh.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/automatedOperation/reachContentMgmt/recommendSystemConfig/refresh.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.refresh,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '刷新失败'});
            }
            if (body && body.returnCode == 0) {
                res.send({error: 0, msg: '刷新成功', data: null});
            }
            else if (body && body.returnCode != 9999) {
                res.send({error: 1, msg: body.returnMsg});
            }
            else {
                res.send({error: 1, msg: '刷新失败'});
            }
        });
    });
};
