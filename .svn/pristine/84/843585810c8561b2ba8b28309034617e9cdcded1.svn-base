const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').automatedOperation.modelMgmt.modelConfigMgmt;
module.exports = function (app) {
    //查询list
    app.post('/automatedOperation/modelMgmt/modelConfigMgmt/searchList.ajax', (req, res, next) => {
        let params = req.body;
        params.pageNo = parseInt(params.pageNo);
        params.pageSize = parseInt(params.pageSize);
        let userId = req.session.loginInfo.userid;
        let option = {
            pageUrl: '/automatedOperation/modelMgmt/modelConfigMgmt/searchList.ajax',
            req: req,
            url: apiUrlList.queryInfo,
            qs: params,
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
                data.userId = userId;
                data.pages = Math.ceil(data.total / params.pageSize); //最大页码
                data.pageNum = params.pageNo; //当前页
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
    //新增
    app.post('/automatedOperation/modelMgmt/modelConfigMgmt/add.ajax', (req, res, next) => {

        let option = {
            pageUrl: '/automatedOperation/modelMgmt/modelConfigMgmt/add.ajax',
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
                    msg: '操作失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: '添加成功'
                });
            } else if (result && result.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                res.send({
                    error: 1,
                    msg: '添加失败'
                });
            }
        });
    });
    //修改
    app.post('/automatedOperation/modelMgmt/modelConfigMgmt/update.ajax', (req, res, next) => {

        let option = {
            pageUrl: '/automatedOperation/modelMgmt/modelConfigMgmt/update.ajax',
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
                    msg: '操作失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: '修改成功'
                });
            } else if (result && result.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                res.send({
                    error: 1,
                    msg: '修改失败'
                });
            }
        });
    });
    //发布状态
    app.post('/automatedOperation/modelMgmt/modelConfigMgmt/releaseStatus.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/automatedOperation/modelMgmt/modelConfigMgmt/releaseStatus.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.releaseStatus,
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
                res.send({
                    error: 0,
                    msg: '操作成功',
                    data: null
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
    //查询模型子块list
    app.post('/automatedOperation/modelMgmt/modelConfigMgmt/searchBlock.ajax', (req, res, next) => {
        // 拉取子块的list
        function getBlockList() {
            return new Promise((resolve, reject) => {
                let params = req.body;
                params.pageNo = parseInt(params.pageNo);
                params.pageSize = parseInt(params.pageSize);
                params.modelId = params.modelId;
                let option = {
                    pageUrl: '/automatedOperation/modelMgmt/modelConfigMgmt/searchBlock.ajax--tableList',
                    req: req,
                    url: apiUrlList.queryModelBlock,
                    qs: params,
                    timeout: 15000,
                    json: true
                };
                request(option, (error, response, body) => {
                    if (error) {
                        reject({
                            message: '数据获取失败'
                        });
                    }
                    if (body && body.returnCode == 0) {
                        let data = body.body;
                        data.pages = Math.ceil(data.total / params.pageSize); //最大页码
                        data.pageNum = params.pageNo; //当前页
                        return resolve(data)
                    } else if (body && body.returnCode != 9999) {
                        reject({
                            message: body.returnMsg
                        });
                    } else {
                        reject({
                            message: '数据获取失败'
                        });
                    }
                });
            })

        }
        // 拉取推荐系统list
        function getRecommendList() {
            return new Promise((resolve, reject) => {
                let params = {};
                params.pageSize = 9999;
                params.pageNo = 1;
                let option = {
                    pageUrl: '/automatedOperation/modelMgmt/modelConfigMgmt/searchBlock.ajax--recommendList',
                    req: req,
                    url: apiUrlList.queryRecommend,
                    qs: params,
                    timeout: 15000,
                    json: true
                };
                request(option, (error, response, body) => {
                    if (error) {
                        return resolve();
                    }
                    if (body && body.returnCode == 0) {
                        return resolve(body.body);
                    } else if (body && body.returnCode != 9999) {
                        return resolve();
                    } else {
                        return resolve();
                    }
                });
            })
        }
        // 拉取消息中心list
        function getMessageCenterList() {
            return new Promise((resolve, reject) => {
                let params = {ruleSource:'AOS'};
                // params.pageSize = 9999;
                // params.pageNo = 1;
                let option = {
                    pageUrl: '/automatedOperation/modelMgmt/modelConfigMgmt/searchBlock.ajax--messageCenterList',
                    req: req,
                    url: apiUrlList.queryMessageCenter,
                    qs: params,
                    timeout: 15000,
                    json: true
                };
                request(option, (error, response, body) => {
                    if (error) {
                        return resolve();
                    }
                    if (body && body.returnCode == 0) {
                        return resolve(body.body);
                    } else if (body && body.returnCode != 9999) {
                        return resolve();
                    } else {
                        return resolve();
                    }
                });
            })
        }
        // 拉取奖励系统list
        function getAwardMgmtList() {
            return new Promise((resolve, reject) => {
                let params = {};
                params.pageSize = 9999;
                params.pageNo = 1;
                let option = {
                    pageUrl: '/automatedOperation/modelMgmt/modelConfigMgmt/searchBlock.ajax--awardMgmtList',
                    req: req,
                    url: apiUrlList.queryAwardMgmt,
                    qs: params,
                    timeout: 15000,
                    json: true
                };
                request(option, (error, response, body) => {
                    if (error) {
                        return resolve();
                    }
                    if (body && body.returnCode == 0) {
                        return resolve(body.body)
                    } else if (body && body.returnCode != 9999) {
                        return resolve();
                    } else {
                        return resolve();
                    }
                });
            })
        }

        Promise.all([getBlockList(),getRecommendList(), getMessageCenterList(), getAwardMgmtList()]).then(([getBlockList,getRecommendList,getMessageCenterList,getAwardMgmtList]) => {
            getBlockList.rows.forEach(function(item){
                if(item.triggerTargetType=='1'){
                    getRecommendList.rows.forEach(function (item1) {
                        if(item1.id==item.triggerTargetContent){
                            item.translateContent=item1.recomdDesc;
                        }
                    })
                }else if(item.triggerTargetType=='2'){
                    getMessageCenterList.forEach(function(item2){
                        if(item2.ruleId==item.triggerTargetContent){
                            item.translateContent=item2.ruleName;
                        }
                    })
                }else{
                    getAwardMgmtList.rows.forEach(function (item3) {
                        if(item3.id==item.triggerTargetContent){
                            item.translateContent=item3.awardsPkgName;
                        }
                    })
                }
            })
            res.send({error: 0, msg: '数据获取成功', data: getBlockList});
        }).catch((error)=>{
            res.send({error: 1, msg: error.message, data: null});
        })
    });
    //新增
    app.post('/automatedOperation/modelMgmt/modelConfigMgmt/addModelBlock.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/automatedOperation/modelMgmt/modelConfigMgmt/addModelBlock.ajax',
            req: req,
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.addModelBlock,
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
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: '添加成功'
                });
            } else if (result && result.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                res.send({
                    error: 1,
                    msg: '添加失败'
                });
            }
        });
    });
    //修改
    app.post('/automatedOperation/modelMgmt/modelConfigMgmt/updateModelBlock.ajax', (req, res, next) => {

        let option = {
            pageUrl: '/automatedOperation/modelMgmt/modelConfigMgmt/updateModelBlock.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.updateModelBlock,
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
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: '修改成功'
                });
            } else if (result && result.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                res.send({
                    error: 1,
                    msg: '修改失败'
                });
            }
        });
    });
    //是否禁用
    app.post('/automatedOperation/modelMgmt/modelConfigMgmt/isEnable.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/automatedOperation/modelMgmt/modelConfigMgmt/isEnable.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.isEnable,
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
                res.send({
                    error: 0,
                    msg: '操作成功',
                    data: null
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
    //查询推荐系统
    app.post('/automatedOperation/modelMgmt/modelConfigMgmt/recommendList.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/automatedOperation/modelMgmt/modelConfigMgmt/recommendList.ajax',
            req: req,
            url: apiUrlList.queryRecommend,
            qs: req.body,
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
                res.send({
                    error: 0,
                    msg: '查询成功',
                    data: body.body
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
    //查询消息中心列表
    app.post('/automatedOperation/modelMgmt/modelConfigMgmt/messageCenterList.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/automatedOperation/modelMgmt/modelConfigMgmt/messageCenterList.ajax',
            req: req,
            url: apiUrlList.queryMessageCenter,
            qs: req.body,
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
                res.send({
                    error: 0,
                    msg: '查询成功',
                    data: body.body
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
    //查询奖励系统列表
    app.post('/automatedOperation/modelMgmt/modelConfigMgmt/awardMgmtList.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/automatedOperation/modelMgmt/modelConfigMgmt/awardMgmtList.ajax',
            req: req,
            url: apiUrlList.queryAwardMgmt,
            qs: req.body,
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
                res.send({
                    error: 0,
                    msg: '查询成功',
                    data: body.body
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
    //查询触发节点类型列表
    app.post('/automatedOperation/modelMgmt/modelConfigMgmt/queryNodeType.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/automatedOperation/modelMgmt/modelConfigMgmt/queryNodeType.ajax',
            req: req,
            url: apiUrlList.queryNodeType,
            qs: req.body,
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
                res.send({
                    error: 0,
                    msg: '查询成功',
                    data: body.body
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
    //查询触发节点配置列表
    app.post('/automatedOperation/modelMgmt/modelConfigMgmt/queryNodeConfig.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/automatedOperation/modelMgmt/modelConfigMgmt/queryNodeConfig.ajax',
            req: req,
            url: apiUrlList.queryNodeConfig,
            qs: req.body,
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
                res.send({
                    error: 0,
                    msg: '查询成功',
                    data: body.body
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
    //刷新
    app.post('/automatedOperation/modelMgmt/modelConfigMgmt/refresh.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/automatedOperation/modelMgmt/modelConfigMgmt/refresh.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.refreshBlockModel,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '刷新失败'
                });
            }
            if (body && body.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: '刷新成功',
                    data: null
                });
            } else if (body && body.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: body.returnMsg
                });
            } else {
                res.send({
                    error: 1,
                    msg: '刷新失败'
                });
            }
        });
    });
    //模型发布
    app.post('/automatedOperation/modelMgmt/modelConfigMgmt/releaseModel.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/automatedOperation/modelMgmt/modelConfigMgmt/releaseModel.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.releaseModel,
            qs: req.body,
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
                res.send({
                    error: 0,
                    msg: '操作成功',
                    data: null
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
    //模型下线
    app.post('/automatedOperation/modelMgmt/modelConfigMgmt/offlineModel.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/automatedOperation/modelMgmt/modelConfigMgmt/offlineModel.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.offlineModel,
            qs: req.body,
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
                res.send({
                    error: 0,
                    msg: '操作成功',
                    data: null
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
    //刷新当前数据
    app.post('/automatedOperation/modelMgmt/modelConfigMgmt/refreshModel.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/automatedOperation/modelMgmt/modelConfigMgmt/refreshModel.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.refreshCurrent,
            qs: req.body,
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
                res.send({
                    error: 0,
                    msg: '操作成功',
                    data: null
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
    //请求目标用户组
    app.post('/automatedOperation/modelMgmt/modelConfigMgmt/userGroup.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/automatedOperation/modelMgmt/modelConfigMgmt/userGroup.ajax',
            req: req,
            url: apiUrlList.userGroup,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '客群数据获取失败'
                });
            }
            if (body && body.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: '客群数据获取成功',
                    data: body.body
                });
            } else if (body && body.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: body.returnMsg
                });
            } else {
                res.send({
                    error: 1,
                    msg: '客群数据获取失败'
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