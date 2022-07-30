const request = require('../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').experienceGold.rewardSetting;
module.exports = function (app) {

    // 获取  初始数据和查询
    app.post('/awardMgmt/experienceGold/rewardSetting/query.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/awardMgmt/experienceGold/rewardSetting/query.ajax',
            req: req,
            url: apiUrl.query,
            qs: params,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '数据获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: '调用成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '获取数据失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
    // 新增
    app.post('/awardMgmt/experienceGold/rewardSetting/saveParam.ajax', (req, res, next) => {
        let params = req.body;
        params.modifyBy = req.session.loginInfo.userid;
        let option = {
            pageUrl: '/awardMgmt/experienceGold/rewardSetting/saveParam.ajax',
            req: req,
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrl.saveParam,
            body: params,
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
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: '新增成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '新增失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }

        });
    });
    // 修改
    app.post('/awardMgmt/experienceGold/rewardSetting/update.ajax', (req, res, next) => {
        let params = req.body;
        params.modifyBy = req.session.loginInfo.userid;
        let option = {
            pageUrl: '/awardMgmt/experienceGold/rewardSetting/update.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrl.update,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '调用失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: '调用成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '调用失败'
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
    app.post('/awardMgmt/experienceGold/rewardSetting/del.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/awardMgmt/experienceGold/rewardSetting/del.ajax',
            req: req,
            operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrl.del,
            qs: params,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '删除失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: '删除成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '删除失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });

    // 获取  奖励金券列表
    app.post('/awardMgmt/experienceGold/rewardSetting/queryExperienceCouponList.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/awardMgmt/experienceGold/rewardSetting/queryExperienceCouponList.ajax',
            req: req,
            url: apiUrl.queryExperienceCouponList,
            qs: params,
            body: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '数据获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: '调用成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '获取数据失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
    // 消息中心list查询msgRuleList
    app.post('/awardMgmt/experienceGold/rewardSetting/msgRuleList.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/awardMgmt/experienceGold/rewardSetting/msgRuleList.ajax',
            req: req,
            url: apiUrl.msgRuleList,
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

    //查询奖励包
    app.post('/awardMgmt/experienceGold/rewardSetting/awardList.ajax', (req, res, next) => {
        let params = req.body,
            userName = req.session.loginInfo.username;
        let option = {
            pageUrl: '/awardMgmt/experienceGold/rewardSetting/awardList.ajax',
            req: req,
            url: apiUrl.awardList,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '数据获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {
                result.body.userName = userName;
                res.send({
                    error: 0,
                    msg: '调用成功',
                    data: result.body
                });
            } else {
                res.send({
                    error: 1,
                    msg: '获取数据失败'
                });
            }
        });
    });

   // 获取 所有活动
   app.post('/awardMgmt/experienceGold/rewardSetting/activeList.ajax', (req, res, next) => {
    // let userName = req.session.loginInfo.username;
    let option = {
        pageUrl: '/awardMgmt/experienceGold/rewardSetting/activeList.ajax',
        req: req,
        url: apiUrl.activeList,
        qs: req.body,
        timeout: 15000,
        json: true
    };
    request(option, (error, response, body) => {
        if (error) {
            return res.send({
                error: 1,
                msg: '数据获取失败'
            });
        }
        let result = typeof body === 'string' ? JSON.parse(body) : body;
        if (result && result.returnCode == '0') {
            // result.body.userName = userName;
            res.send({
                error: 0,
                msg: '调用成功',
                data: result.body
            });
        } else {
            res.send({
                error: 1,
                msg: '获取数据失败'
            });
        }
    });
});

    // 获取  体验金券参数
    app.post('/awardMgmt/experienceGold/rewardSetting/configList.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/awardMgmt/experienceGold/rewardSetting/configList.ajax',
            req: req,
            url: apiUrl.configList,
            body: params,
            qs: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '数据获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: '调用成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '获取数据失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });

};