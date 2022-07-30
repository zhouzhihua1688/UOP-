const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').automatedOperation.operatePlanMgmt.operatePlanMgmt;
module.exports = function (app) {
    //查询
    app.post('/automatedOperation/operatePlanMgmt/operatePlanMgmt/searchModelList.ajax', (req, res, next) => {
        // 查询modelList
        function getModelList() {
            return new Promise((resolve, reject) => {
                let params = req.body;
                params.pageNo = parseInt(params.pageNo);
                params.pageSize = parseInt(params.pageSize);
                let userId = req.session.loginInfo.userid;
                let option = {
                    pageUrl: '/automatedOperation/operatePlanMgmt/operatePlanMgmt/searchModelList.ajax',
                    req: req,
                    url: apiUrlList.queryInfo,
                    qs: params,
                    timeout: 15000,
                    json: true
                };
                request(option, (error, response, body) => {
                    if (error) {
                        reject({
                            message: '查询失败'
                        });
                    }
                    if (body && body.returnCode == 0) {
                        let data = body.body;
                        data.userId = userId;
                        data.pages = Math.ceil(data.total / params.pageSize); //最大页码
                        data.pageNum = params.pageNo; //当前页
                        resolve(data);
                    } else if (body && body.returnCode != 9999) {

                        reject({
                            message: body.returnMsg
                        });
                    } else {

                        reject({
                            message: '查询失败'
                        });
                    }
                });
            });
        }

        getModelList().then((resultArr) => {
            if(resultArr.rows&&resultArr.rows.length>0){
                resultArr.rows.forEach((item)=>{
                    item.execustCount=[]
                });
                var arr=resultArr.rows.map((item)=>{
                    return new Promise((resolve,reject)=>{
                        let params={modelId:item.modelId};
                        let option = {
                            pageUrl: '/automatedOperation/operatePlanMgmt/operatePlanMgmt/searchModelList.ajax',
                            req: req,
                            url: apiUrlList.execustCount,
                            qs: params,
                            timeout: 15000,
                            json: true
                        };
                        request(option, (error, response, body) => {
                            if (error) {
                                resolve();
                            }
                            if (body && body.returnCode == 0) {
                                item.execustCount=body.body;
                                resolve();
                            } else if (body && body.returnCode != 9999) {
                                resolve();
                            } else {
                                resolve();
                            }
                        });
                    })
                })
                Promise.all(arr).then((resultArr2)=>{
                    res.send({
                        error: 0,
                        msg: '查询成功',
                        data: resultArr
                    });
                })
            }else{
                res.send({
                    error: 0,
                    msg: '查询成功',
                    data: resultArr
                });
            }
            
        }).catch((error) => {
            res.send({
                error: 1,
                msg: error.message,
                data: null
            });
        });
    });
    //新增
    app.post('/automatedOperation/operatePlanMgmt/operatePlanMgmt/add.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/automatedOperation/operatePlanMgmt/operatePlanMgmt/add.ajax',
            req: req,
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.add,
            body: req.body,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '新增失败'
                });
            }
            if (body && body.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: '新增成功',
                    data: '新增成功'
                });
            } else if (body && body.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: body.returnMsg
                });
            } else {
                res.send({
                    error: 1,
                    msg: '新增失败'
                });
            }
        });
    });
    //更新
    app.post('/automatedOperation/operatePlanMgmt/operatePlanMgmt/update.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/automatedOperation/operatePlanMgmt/operatePlanMgmt/update.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.update,
            body: req.body,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '更新失败'
                });
            }
            if (body && body.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: '更新成功',
                    data: '更新成功'
                });
            } else if (body && body.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: body.returnMsg
                });
            } else {
                res.send({
                    error: 1,
                    msg: '更新失败'
                });
            }
        });
    });
    //发布 
    app.post('/automatedOperation/operatePlanMgmt/operatePlanMgmt/release.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/automatedOperation/operatePlanMgmt/operatePlanMgmt/release.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.release,
            qs: req.body,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '发布失败'
                });
            }
            if (body && body.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: '发布成功',
                    data: '发布成功'
                });
            } else if (body && body.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: body.returnMsg
                });
            } else {
                res.send({
                    error: 1,
                    msg: '发布失败'
                });
            }
        });
    });
    //下线
    app.post('/automatedOperation/operatePlanMgmt/operatePlanMgmt/offline.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/automatedOperation/operatePlanMgmt/operatePlanMgmt/offline.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.offline,
            qs: req.body,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '下线失败'
                });
            }
            if (body && body.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: '下线成功',
                    data: '下线成功'
                });
            } else if (body && body.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: body.returnMsg
                });
            } else {
                res.send({
                    error: 1,
                    msg: '下线失败'
                });
            }
        });
    });
    // 删除子任务
    app.post('/automatedOperation/operatePlanMgmt/operatePlanMgmt/deleteSubitem.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/automatedOperation/operatePlanMgmt/operatePlanMgmt/deleteSubitem.ajax',
            req: req,
            operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.deleteSub,
            qs: req.body,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '删除失败'
                });
            }
            if (body && body.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: '删除成功',
                    data: '删除成功'
                });
            } else if (body && body.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: body.returnMsg
                });
            } else {
                res.send({
                    error: 1,
                    msg: '删除失败'
                });
            }
        });
    });
     // 删除父任务
    app.post('/automatedOperation/operatePlanMgmt/operatePlanMgmt/deleteModel.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/automatedOperation/operatePlanMgmt/operatePlanMgmt/deleteModel.ajax',
            req: req,
            operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.deleteModel,
            qs: req.body,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '删除失败'
                });
            }
            if (body && body.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: '删除成功',
                    data: '删除成功'
                });
            } else if (body && body.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: body.returnMsg
                });
            } else {
                res.send({
                    error: 1,
                    msg: '删除失败'
                });
            }
        });
    });
    // 事件list
    app.post('/automatedOperation/operatePlanMgmt/operatePlanMgmt/eventList.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/automatedOperation/operatePlanMgmt/operatePlanMgmt/eventList.ajax',
            req: req,
            url: apiUrlList.eventList,
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
    // 业务节点list查询
    app.post('/automatedOperation/operatePlanMgmt/operatePlanMgmt/nodeList.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/automatedOperation/operatePlanMgmt/operatePlanMgmt/nodeList.ajax',
            req: req,
            url: apiUrlList.nodeList,
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
     // 渠道list查询
    app.post('/automatedOperation/operatePlanMgmt/operatePlanMgmt/channelList.ajax', (req, res, next) => {
        let params={
            pageNo:1,
            pageSize:9999
        };
        let option = {
            pageUrl: '/automatedOperation/operatePlanMgmt/operatePlanMgmt/channelList.ajax',
            req: req,
            url: apiUrlList.channelMenu,
            qs:params,
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
     // 根据渠道查询平台页面管理list
    app.post('/automatedOperation/operatePlanMgmt/operatePlanMgmt/pageByChannel.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/automatedOperation/operatePlanMgmt/operatePlanMgmt/pageByChannel.ajax',
            req: req,
            url: apiUrlList.pageByChannel,
            qs:req.body,
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
    // 弹窗提醒中的contenttp
    app.post('/automatedOperation/operatePlanMgmt/operatePlanMgmt/queryContentTp.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/automatedOperation/operatePlanMgmt/operatePlanMgmt/queryContentTp.ajax',
            req: req,
            url: apiUrlList.queryContentTp,
            qs:req.body,
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
    // 客群list查询
    app.post('/automatedOperation/operatePlanMgmt/operatePlanMgmt/groupList.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/automatedOperation/operatePlanMgmt/operatePlanMgmt/groupList.ajax',
            req: req,
            url: apiUrlList.userGroupList,
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
    // 业务获取list查询
    app.post('/automatedOperation/operatePlanMgmt/operatePlanMgmt/userDataFrom.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/automatedOperation/operatePlanMgmt/operatePlanMgmt/userDataFrom.ajax',
            req: req,
            url: apiUrlList.queryTargetUserFrom,
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
    // 奖励系统List查询
    app.post('/automatedOperation/operatePlanMgmt/operatePlanMgmt/rewardsList.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/automatedOperation/operatePlanMgmt/operatePlanMgmt/rewardsList.ajax',
            req: req,
            url: apiUrlList.rewardsList,
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
    // 消息中心list查询msgRuleList
    app.post('/automatedOperation/operatePlanMgmt/operatePlanMgmt/msgRuleList.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/automatedOperation/operatePlanMgmt/operatePlanMgmt/msgRuleList.ajax',
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
    //  徽章体系查询
    app.post('/automatedOperation/operatePlanMgmt/operatePlanMgmt/badgeList.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/automatedOperation/operatePlanMgmt/operatePlanMgmt/badgeList.ajax',
            req: req,
            url: apiUrlList.badgeList,
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
    // layoutId查询
    app.post('/automatedOperation/operatePlanMgmt/operatePlanMgmt/layoutIdList.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/automatedOperation/operatePlanMgmt/operatePlanMgmt/layoutIdList.ajax',
            req: req,
            url: apiUrlList.layoutIdList,
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
    // 二级菜单查询  funcid position查询
    app.post('/automatedOperation/operatePlanMgmt/operatePlanMgmt/querySubmenuList.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/automatedOperation/operatePlanMgmt/operatePlanMgmt/querySubmenuList.ajax',
            req: req,
            url: apiUrlList.querySubmenuId,
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
    // 查询主题内容
    app.post('/automatedOperation/operatePlanMgmt/operatePlanMgmt/queryThemeInfo.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/automatedOperation/operatePlanMgmt/operatePlanMgmt/queryThemeInfo.ajax',
            req: req,
            url: apiUrlList.queryThemeInfo,
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
    //获取关联数据信息
    app.post('/automatedOperation/operatePlanMgmt/operatePlanMgmt/linkDataInfo.ajax', (req, res, next) => {
        //fundgroup,loadpage,funcbtn,manager,wx_funcbtn
        let params = req.body;
        let realParams = {};
        if (params.urlJoin == 'res-fund-group-config' || params.urlJoin == 'res-loadpage-config' || params.urlJoin == 'res-pagefuncbtn-config' || params.urlJoin == 'res-fund-manager-config' || params.urlJoin == 'res-wx-funcbtn-info' || params.urlJoin == 'res-appfuncbtn-info' || params.urlJoin == 'res-template-tags-config') {
            realParams.pageNo = 1;
            realParams.pageSize = 2000;
            realParams.isEnable = 1;
            // realParams.channelId=params.channelId;
        } else {
            realParams.pageNo = 1;
            realParams.pageSize = 2000;
            // realParams.channelId=params.channelId;
        }
        let option = {
            pageUrl: '/automatedOperation/operatePlanMgmt/operatePlanMgmt/linkDataInfo.ajax',
            req: req,
            url: apiUrlList.linkDataInfo + params.urlJoin + '/query-list',
            qs: realParams,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '操作失败'
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
    //新增子任务
    app.post('/automatedOperation/operatePlanMgmt/operatePlanMgmt/add1.ajax', (req, res, next) => {
        req.body.aosResConfigs && (req.body.aosResConfigs = JSON.parse(req.body.aosResConfigs));
        req.body.aosTriggerPopupNoticesConfigs && (req.body.aosTriggerPopupNoticesConfigs = JSON.parse(req.body.aosTriggerPopupNoticesConfigs));
        let option = {
            pageUrl: '/automatedOperation/operatePlanMgmt/operatePlanMgmt/add1.ajax',
            req: req,
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.add1,
            body: req.body,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '新增失败'
                });
            }
            if (body && body.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: '新增成功',
                    data: '新增成功'
                });
            } else if (body && body.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: body.returnMsg
                });
            } else {
                res.send({
                    error: 1,
                    msg: '新增失败'
                });
            }
        });
    });
    //更新子任务
    app.post('/automatedOperation/operatePlanMgmt/operatePlanMgmt/update1.ajax', (req, res, next) => {
        console.log('---***---', req.body.aosResConfigs, '---***---');
        req.body.aosResConfigs && (req.body.aosResConfigs = JSON.parse(req.body.aosResConfigs));
        req.body.aosTriggerPopupNoticesConfigs && (req.body.aosTriggerPopupNoticesConfigs = JSON.parse(req.body.aosTriggerPopupNoticesConfigs));
        let option = {
            pageUrl: '/automatedOperation/operatePlanMgmt/operatePlanMgmt/update1.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.update1,
            body: req.body,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '更新失败'
                });
            }
            if (body && body.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: '更新成功',
                    data: '更新成功'
                });
            } else if (body && body.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: body.returnMsg
                });
            } else {
                res.send({
                    error: 1,
                    msg: '更新失败'
                });
            }
        });
    });
    // 查询warnList
    app.post('/automatedOperation/operatePlanMgmt/operatePlanMgmt/warnList.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/automatedOperation/operatePlanMgmt/operatePlanMgmt/warnList.ajax',
            req: req,
            url: apiUrlList.warnList,
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
    // 查询resList
    app.post('/automatedOperation/operatePlanMgmt/operatePlanMgmt/resList.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/automatedOperation/operatePlanMgmt/operatePlanMgmt/resList.ajax',
            req: req,
            url: apiUrlList.resList,
            body: JSON.parse(req.body.ids),
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
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
    // 查询popList
    app.post('/automatedOperation/operatePlanMgmt/operatePlanMgmt/popList.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/automatedOperation/operatePlanMgmt/operatePlanMgmt/popList.ajax',
            req: req,
            url: apiUrlList.popList,
            body: JSON.parse(req.body.ids),
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
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
    // 查询对应blockID的eventId
    app.post('/automatedOperation/operatePlanMgmt/operatePlanMgmt/getEventConfig.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/automatedOperation/operatePlanMgmt/operatePlanMgmt/getEventConfig.ajax',
            req: req,
            url: apiUrlList.getEventConfig,
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
    // 子块是否启用
    app.post('/automatedOperation/operatePlanMgmt/operatePlanMgmt/blockIsEnable.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/automatedOperation/operatePlanMgmt/operatePlanMgmt/blockIsEnable.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.blockIsEnable,
            body: req.body,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '操作失败'
                });
            }
            if (body && body.returnCode == 0) {
                let data = body.body;

                res.send({
                    error: 0,
                    msg: '操作成功',
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
                    msg: '操作失败'
                });
            }
        });
    });
    // 从查看页面返回模型子块
    app.post('/automatedOperation/operatePlanMgmt/operatePlanMgmt/queryModelBlock.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/automatedOperation/operatePlanMgmt/operatePlanMgmt/queryModelBlock.ajax',
            req: req,
            url: apiUrlList.queryModelBlock,
            qs: req.body,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '查询模型子块失败'
                });
            }
            if (body && body.returnCode == 0) {
                let data = body.body;

                res.send({
                    error: 0,
                    msg: '查询模型子块成功',
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
                    msg: '查询模型子块失败'
                });
            }
        });
    });
};

function formatTime(date) {
    let d = new Date(date);
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let day = d.getDate();
    let hour = d.getHours();
    let minute = d.getMinutes();
    let second = d.getSeconds();

    function fixZero(n) {
        return n < 10 ? '0' + n : n;
    }

    return [year, month, day].map(fixZero).join('-') + ' ' + [hour, minute, second].map(fixZero).join(':');
}