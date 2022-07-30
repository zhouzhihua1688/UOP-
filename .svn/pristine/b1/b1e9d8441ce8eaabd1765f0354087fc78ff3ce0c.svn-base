const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').automatedOperation.systemConfig.eventRelevantConfig;
module.exports = function (app) {
    // 事件tab页---start---
    //查询
    app.post('/automatedOperation/systemConfig/eventRelevantConfig/searchEventList.ajax', (req, res, next) => {
        let params = req.body;
        params.pageNo = parseInt(params.pageNo);
        params.pageSize = parseInt(params.pageSize);
        let userId = req.session.loginInfo.userid;
        let option = {
            pageUrl: '/automatedOperation/systemConfig/eventRelevantConfig/searchEventList.ajax',
            req: req,
            url: apiUrlList.queryInfo1,
            qs: params,
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
    app.post('/automatedOperation/systemConfig/eventRelevantConfig/add1.ajax', (req, res, next) => {
    
        let option = {
            pageUrl: '/automatedOperation/systemConfig/eventRelevantConfig/add1.ajax',
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
                    data: ''
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
    app.post('/automatedOperation/systemConfig/eventRelevantConfig/update1.ajax', (req, res, next) => {
       
        let option = {
            pageUrl: '/automatedOperation/systemConfig/eventRelevantConfig/update1.ajax',
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
    // 删除
    app.post('/automatedOperation/systemConfig/eventRelevantConfig/delete1.ajax', (req, res, next) => {
        // 
        let option = {
            pageUrl: '/automatedOperation/systemConfig/eventRelevantConfig/delete1.ajax',
            req: req,
            operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.delete1,
            qs: req.body,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '删除失败'});
            }
            if (body && body.returnCode == 0) {
                res.send({error: 0, msg: '删除成功', data: '删除成功'});
            }
            else if (body && body.returnCode != 9999) {
                res.send({error: 1, msg: body.returnMsg});
            }
            else {
                res.send({error: 1, msg: '删除失败'});
            }
        });
    });
    //查询表达式配置模板
    app.post('/automatedOperation/systemConfig/eventRelevantConfig/searchTemplateList.ajax', (req, res, next) => {
        let userId = req.session.loginInfo.userid;
        let option = {
            pageUrl: '/automatedOperation/systemConfig/eventRelevantConfig/searchTemplateList.ajax',
            req: req,
            url: apiUrlList.queryTemplate,
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
    // 事件tab页---end---
     // 业务节点tab页---start---
    //查询
    app.post('/automatedOperation/systemConfig/eventRelevantConfig/searchBusinessList.ajax', (req, res, next) => {
        let params = req.body;
        params.pageNo = parseInt(params.pageNo);
        params.pageSize = parseInt(params.pageSize);
        let userId = req.session.loginInfo.userid;
        let option = {
            pageUrl: '/automatedOperation/systemConfig/eventRelevantConfig/searchBusinessList.ajax',
            req: req,
            url: apiUrlList.queryInfo2,
            qs: params,
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
    app.post('/automatedOperation/systemConfig/eventRelevantConfig/add2.ajax', (req, res, next) => {
    
        let option = {
            pageUrl: '/automatedOperation/systemConfig/eventRelevantConfig/add2.ajax',
            req: req,
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.add2,
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
                    data: ''
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
    app.post('/automatedOperation/systemConfig/eventRelevantConfig/update2.ajax', (req, res, next) => {
       
        let option = {
            pageUrl: '/automatedOperation/systemConfig/eventRelevantConfig/update2.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.update2,
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
    // 删除
    app.post('/automatedOperation/systemConfig/eventRelevantConfig/delete2.ajax', (req, res, next) => {
        // 
        let option = {
            pageUrl: '/automatedOperation/systemConfig/eventRelevantConfig/delete2.ajax',
            req: req,
            operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.delete2,
            qs: req.body,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '删除失败'});
            }
            if (body && body.returnCode == 0) {
                res.send({error: 0, msg: '删除成功', data: '删除成功'});
            }
            else if (body && body.returnCode != 9999) {
                res.send({error: 1, msg: body.returnMsg});
            }
            else {
                res.send({error: 1, msg: '删除失败'});
            }
        });
    });
    // 业务节点tab页---end---
    // 节点类型tab页---start---
    app.post('/automatedOperation/systemConfig/eventRelevantConfig/searchNodeTypeList.ajax', (req, res, next) => {
        let params = req.body;
        params.pageNo = parseInt(params.pageNo);
        params.pageSize = parseInt(params.pageSize);
        let userId = req.session.loginInfo.userid;
        let option = {
            pageUrl: '/automatedOperation/systemConfig/eventRelevantConfig/searchNodeTypeList.ajax',
            req: req,
            url: apiUrlList.queryInfo3,
            qs: params,
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
    app.post('/automatedOperation/systemConfig/eventRelevantConfig/add3.ajax', (req, res, next) => {
    
        let option = {
            pageUrl: '/automatedOperation/systemConfig/eventRelevantConfig/add3.ajax',
            req: req,
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.add3,
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
                    data: ''
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
    app.post('/automatedOperation/systemConfig/eventRelevantConfig/update3.ajax', (req, res, next) => {
       
        let option = {
            pageUrl: '/automatedOperation/systemConfig/eventRelevantConfig/update3.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.update3,
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
    // 删除
    app.post('/automatedOperation/systemConfig/eventRelevantConfig/delete3.ajax', (req, res, next) => {
        // 
        let option = {
            pageUrl: '/automatedOperation/systemConfig/eventRelevantConfig/delete3.ajax',
            req: req,
            operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.dalete3,
            qs: req.body,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '删除失败'});
            }
            if (body && body.returnCode == 0) {
                res.send({error: 0, msg: '删除成功', data: '删除成功'});
            }
            else if (body && body.returnCode != 9999) {
                res.send({error: 1, msg: body.returnMsg});
            }
            else {
                res.send({error: 1, msg: '删除失败'});
            }
        });
    });
    // 节点类型tab页---end---
    // 参数tab页---start---
    app.post('/automatedOperation/systemConfig/eventRelevantConfig/searchParamList.ajax', (req, res, next) => {
        let params = req.body;
        params.pageNo = parseInt(params.pageNo);
        params.pageSize = parseInt(params.pageSize);
        let userId = req.session.loginInfo.userid;
        let option = {
            pageUrl: '/automatedOperation/systemConfig/eventRelevantConfig/searchParamList.ajax',
            req: req,
            url: apiUrlList.queryInfo4,
            qs: params,
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
    app.post('/automatedOperation/systemConfig/eventRelevantConfig/add4.ajax', (req, res, next) => {
    
        let option = {
            pageUrl: '/automatedOperation/systemConfig/eventRelevantConfig/add4.ajax',
            req: req,
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.add4,
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
                    data: ''
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
    app.post('/automatedOperation/systemConfig/eventRelevantConfig/update4.ajax', (req, res, next) => {
       
        let option = {
            pageUrl: '/automatedOperation/systemConfig/eventRelevantConfig/update4.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.update4,
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
    // 删除
    app.post('/automatedOperation/systemConfig/eventRelevantConfig/delete4.ajax', (req, res, next) => {
        // 
        let option = {
            pageUrl: '/automatedOperation/systemConfig/eventRelevantConfig/delete4.ajax',
            req: req,
            operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.dalete4,
            qs: req.body,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '删除失败'});
            }
            if (body && body.returnCode == 0) {
                res.send({error: 0, msg: '删除成功', data: '删除成功'});
            }
            else if (body && body.returnCode != 9999) {
                res.send({error: 1, msg: body.returnMsg});
            }
            else {
                res.send({error: 1, msg: '删除失败'});
            }
        });
    });
    // 参数tab页---end---
    //查询触发数据类型
     app.post('/automatedOperation/systemConfig/eventRelevantConfig/queryTriggerDataTp.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/automatedOperation/systemConfig/eventRelevantConfig/queryTriggerDataTp.ajax',
            req: req,
            url: apiUrlList.queryDataTp,
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
    //查询触发数据来源
    app.post('/automatedOperation/systemConfig/eventRelevantConfig/queryTriggerDataFrom.ajax', (req, res, next) => {
        let userId = req.session.loginInfo.userid;
        let option = {
            pageUrl: '/automatedOperation/systemConfig/eventRelevantConfig/queryTriggerDataFrom.ajax',
            req: req,
            url: apiUrlList.queryDataFrom,
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