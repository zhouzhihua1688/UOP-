const request = require('./../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').activeRun.activeSettingAdd;

module.exports = function (app) {
    // 获取 所有活动
    app.post('/marketingActive/activeRun/activeSetting/addActiveAll.ajax', (req, res, next) => {
        let userName = req.session.loginInfo.username;
        let option = {
            pageUrl: '/marketingActive/activeRun/activeSetting/addActiveAll.ajax',
            req,
            url: apiUrl.activeAll,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '所有活动失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {
                result.body.userName = userName;
                res.send({
                    error: 0,
                    msg: '所有活动调用成功',
                    userName,
                    data: result.body
                });
            } else {
                res.send({
                    error: 1,
                    userName,
                    msg: '所有活动失败'
                });
            }
        });
    });
    // 获取 所有模型
    app.post('/marketingActive/activeRun/activeSetting/addModuleAll.ajax', (req, res, next) => {
        let userName = req.session.loginInfo.username;
        let option = {
            pageUrl: '/marketingActive/activeRun/activeSetting/addModuleAll.ajax',
            req,
            url: apiUrl.moduleAll,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '所有模型获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {
                res.send({
                    error: 0,
                    msg: '所有模型调用成功',
                    userName,
                    data: result.body
                });
            } else {
                res.send({
                    error: 1,
                    userName,
                    msg: '所有模型数据失败'
                });
            }
        });
    });


    // 获取 所有切点
    app.post('/marketingActive/activeRun/activeSetting/addCutAll.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/marketingActive/activeRun/activeSetting/addCutAll.ajax',
            req,
            url: apiUrl.cutAll,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '切点获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {
                res.send({
                    error: 0,
                    msg: '切点获取成功',
                    data: result.body
                });
            } else {
                res.send({
                    error: 1,
                    msg: '切点获取失败'
                });
            }
        });
    });

    // 获取 所有组件
    app.post('/marketingActive/activeRun/activeSetting/addComponentAll.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/marketingActive/activeRun/activeSetting/addComponentAll.ajax',
            req,
            url: apiUrl.componentAll,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '组件获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {
                res.send({
                    error: 0,
                    msg: '组件调用成功',
                    data: result.body
                });
            } else {
                res.send({
                    error: 1,
                    msg: '组件数据失败'
                });
            }
        });
    });


    // 获取 关联推送数据源配置
    app.post('/marketingActive/activeRun/activeSetting/addComponentLargeData.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/marketingActive/activeRun/activeSetting/addComponentLargeData.ajax',
            req,
            url: apiUrl.componentLargeData,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '关联推送数据源配置获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {
                res.send({
                    error: 0,
                    msg: '关联推送数据源配置调用成功',
                    data: result.body
                });
            } else {
                res.send({
                    error: 1,
                    msg: '获取关联推送数据源配置失败'
                });
            }
        });
    });



    // 获取 直接发奖配置
    app.post('/marketingActive/activeRun/activeSetting/addAwardData.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/marketingActive/activeRun/activeSetting/addAwardData.ajax',
            req,
            url: apiUrl.awardData,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '直接发奖配置获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {
                res.send({
                    error: 0,
                    msg: '直接发奖配置调用成功',
                    data: result.body
                });
            } else {
                res.send({
                    error: 1,
                    msg: '获取直接发奖配置失败'
                });
            }
        });
    });


    // 获取  活动短信配置
    app.post('/marketingActive/activeRun/activeSetting/addInfoData.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/marketingActive/activeRun/activeSetting/addInfoData.ajax',
            req,
            url: apiUrl.infoData,
            // qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '获取活动短信配置失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {
                res.send({
                    error: 0,
                    msg: '活动短信配置调用成功',
                    data: result.body
                });
            } else {
                res.send({
                    error: 1,
                    msg: '获取活动短信配置失败'
                });
            }
        });
    });



    // 获取 活动分享配置
    app.post('/marketingActive/activeRun/activeSetting/addShareData.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/marketingActive/activeRun/activeSetting/addShareData.ajax',
            req,
            url: apiUrl.shareData,
            // qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '活动分享配置获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {
                res.send({
                    error: 0,
                    msg: '活动分享配置调用成功',
                    data: result.body
                });
            } else {
                res.send({
                    error: 1,
                    msg: '获取活动分享配置失败'
                });
            }
        });
    });
    // 获取 活动分享配置
    app.post('/marketingActive/activeRun/activeSetting/addEventData.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/marketingActive/activeRun/activeSetting/addEventData.ajax',
            req,
            url: apiUrl.eventData,
            // qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '事件类型获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {
                res.send({
                    error: 0,
                    msg: '事件类型调用成功',
                    data: result.body
                });
            } else {
                res.send({
                    error: 1,
                    msg: '获取事件类型失败'
                });
            }
        });
    });


    // 获取 安全等级配置
    app.post('/marketingActive/activeRun/activeSetting/addSecureData.ajax', (req, res, next) => {
        // let params = req.body;
        let option = {
            pageUrl: '/marketingActive/activeRun/activeSetting/addSecureData.ajax',
            req,
            url: apiUrl.secureData,
            // qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '安全等级获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {
                let obj = [];
                for (const key in result.body) {
                    if (result.body.hasOwnProperty(key)) {
                        obj.push({
                            val: key,
                            showName: result.body[key],
                        })
                    }
                }
                res.send({
                    error: 0,
                    msg: '安全等级调用成功',
                    data: obj
                });
            } else {
                res.send({
                    error: 1,
                    msg: '获取安全等级失败'
                });
            }
        });
    });

    // 获取 活动投放渠道
    app.post('/marketingActive/activeRun/activeSetting/addRoad.ajax', (req, res, next) => {
        // let params = req.body;
        let option = {
            pageUrl: '/marketingActive/activeRun/activeSetting/addRoad.ajax',
            req,
            url: apiUrl.road,
            // qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '活动投放渠道失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {
                res.send({
                    error: 0,
                    msg: '活动投放渠道调用成功',
                    data: result.body
                });
            } else {
                res.send({
                    error: 1,
                    msg: '活动投放渠道失败'
                });
            }
        });
    });




    // 保存 所有配置
    app.post('/marketingActive/activeRun/activeSetting/addKeepData.ajax', (req, res, next) => {
        let params = req.body;
        try {
            params.activityRuleConfig = JSON.parse(params.activityRuleConfig)
            console.log(params.activityRuleConfig.activityBaseComponentsList)
        } catch (error) {
            console.log(error)
        }
        let option = {
            pageUrl: '/marketingActive/activeRun/activeSetting/addKeepData.ajax',
            req,
            url: apiUrl.keepData,
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
            if (result && result.returnCode == '0') {
                res.send({
                    error: 0,
                    msg: '保存成功',
                    data: result.body
                });
            } else {
                result.url = option.url
                res.send({
                    error: 1,
                    msg: '保存失败'
                });
            }
        });
    });

    // 获取 修改数据
    app.post('/marketingActive/activeRun/activeSetting/addActGetData.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/marketingActive/activeRun/activeSetting/addActGetData.ajax',
            req,
            url: apiUrl.actGetData,
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



    // 修改 所有配置
    app.post('/marketingActive/activeRun/activeSetting/addChangeData.ajax', (req, res, next) => {
        let params = req.body;
        params.activityRuleConfig = JSON.parse(params.activityRuleConfig)
        let option = {
            pageUrl: '/marketingActive/activeRun/activeSetting/addChangeData.ajax',
            req,
            url: apiUrl.changeData,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '修改失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {
                res.send({
                    error: 0,
                    msg: '修改成功',
                    data: result.body
                });
            } else {
                result.url = option.url
                res.send({
                    error: 1,
                    msg: '修改失败'
                });
            }
        });
    });


    // 获取 分组配置
    app.post('/marketingActive/activeRun/activeSetting/addUserGroup.ajax', (req, res, next) => {
        // let params = req.body;
        let option = {
            pageUrl: '/marketingActive/activeRun/activeSetting/addUserGroup.ajax',
            req,
            url: apiUrl.userGroup,
            // qs: params,
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
                let data = result.body;
                let checkDefault = data.some(item => {
                    return item.groupId === '00000'
                })
                if (!checkDefault) {
                    data.unshift({
                        groupId: '00000',
                        groupName: '默认分组'
                    })
                }
                res.send({
                    error: 0,
                    msg: '获取成功',
                    data
                });
            } else {
                res.send({
                    error: 1,
                    msg: '获取数据失败'
                });
            }
        });
    });
};