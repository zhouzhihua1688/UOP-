const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').AIPstrategyMgmt.planSetting;
module.exports = function (app) {
    //查询
    app.post('/publicConfig/AIPstrategyMgmt/planSetting/query.ajax', (req, res, next) => {
        let params = {};
        req.body.contractDesc && (params.contractDesc = req.body.contractDesc);
        req.body.strategyType && (params.strategyType = req.body.strategyType);
        req.body.operator && (params.operator = req.body.operator);
        params.pageNo = 1;
        params.pageSize = 999999999;
        let option = {
            pageUrl: '/publicConfig/AIPstrategyMgmt/planSetting/query.ajax',
            req: req,
            url: apiUrlList.query,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '查询失败', data: null});
            }
            if (body.returnCode == 0 && Array.isArray(body.body)) {
                let reuslt = body.body.map(item => {
                    item.contractDesc_show = item.contractDesc.length > 20 ? item.contractDesc.slice(0, 20) + '...' : item.contractDesc;
                    item.productType_show = item.productType;
                    if (item.productType == 1) {
                        item.productType_show = '基金';
                    }
                    else if (item.productType == 2) {
                        item.productType_show = '组合';
                    }
                    item.cycle_show = item.cycle;
                    if (item.cycle == 'QQ') {
                        item.cycle_show = '每季';
                    }
                    else if (item.cycle == 'MM') {
                        item.cycle_show = '每月';
                    }
                    else if (item.cycle == '2W') {
                        item.cycle_show = '每双周';
                    }
                    else if (item.cycle == 'WW') {
                        item.cycle_show = '每周';
                    }
                    else if (item.cycle == 'DD') {
                        item.cycle_show = '每天';
                    }
                    else if (item.cycle == 'SS') {
                        item.cycle_show = '单笔';
                    }
                    item.isSupportPeriod_show = item.isSupportPeriod;
                    if (item.isSupportPeriod == 0) {
                        item.isSupportPeriod_show = '不支持';
                    }
                    else {
                        item.isSupportPeriod_show = '支持';
                    }
                    item.isTargetProfit_show = item.isTargetProfit;
                    if (item.isTargetProfit == 0) {
                        item.isTargetProfit_show = '未设置';
                    }
                    else {
                        item.isTargetProfit_show = '已设置';
                    }
                    item.targetProfit = item.targetProfit * 100;
                    item.isSupportStrategy_show = item.isSupportStrategy;
                    if (item.isSupportStrategy == 0) {
                        item.isSupportStrategy_show = '未设置';
                    }
                    else {
                        item.isSupportStrategy_show = '已设置';
                    }
                    item.strategyType_show = item.strategyType;
                    if (item.strategyType == 0) {
                        item.strategyType_show = '自定义';
                    }
                    else if (item.strategyType == 1) {
                        item.strategyType_show = '进取策略';
                    }
                    else if (item.strategyType == 2) {
                        item.strategyType_show = '稳健策略';
                    }
                    item.achieveUpdateDate = item.achieveUpdateDate.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3');
                    item.achieveTargetPercent = item.achieveTargetPercent * 100;
                    return item;
                });
                res.send({error: 0, msg: '查询成功', data: reuslt});
            }
            else if (body && body.returnCode != 0 && body.returnCode != 9999) {
                res.send({error: 1, msg: body.returnMsg, data: null});
            }
            else {
                res.send({error: 1, msg: '查询失败', data: null});
            }
        });
    });
    // 添加
    app.post('/publicConfig/AIPstrategyMgmt/planSetting/add.ajax', (req, res, next) => {
        let params = {};
        params.contractDesc = req.body.contractDesc;
        params.productId = req.body.productId;
        params.referContentId = req.body.referContentId;
        params.productType = req.body.productType;
        params.cycle = req.body.cycle;
        params.isSupportPeriod = req.body.isSupportPeriod;
        params.periodNumber = req.body.periodNumber;
        params.isTargetProfit = req.body.isTargetProfit;
        params.targetProfit = req.body.targetProfit / 100;
        params.isSupportStrategy = req.body.isSupportStrategy;
        params.strategyType = req.body.strategyType;
        if(req.body.strategyType=='0'){
            params.increaseIndex = req.body.increaseIndex;
            params.decreaseIndex = req.body.decreaseIndex;
        }else{
            params.referIndexCode = req.body.referIndexCode;
            params.referAverageCode = req.body.referAverageCode;
        }
        
        params.achieveTargetPercent = req.body.achieveTargetPercent / 100; // (止盈比例)
        params.achieveTargetDays = req.body.achieveTargetDays; // (止盈天数)
        params.operator = req.session.loginInfo.userid;
        let option = {
            pageUrl: '/publicConfig/AIPstrategyMgmt/planSetting/add.ajax',
            req: req,
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.add,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '保存失败', data: null});
            }
            if (body.returnCode == 0) {
                res.send({error: 0, msg: '保存成功', data: null});
            }
            else if (body && body.returnCode != 0 && body.returnCode != 9999) {
                res.send({error: 1, msg: body.returnMsg, data: null});
            }
            else {
                res.send({error: 1, msg: '保存失败', data: null});
            }
        });
    });
    //更新
    app.post('/publicConfig/AIPstrategyMgmt/planSetting/update.ajax', (req, res, next) => {
        let params = {};
        params.serialNo = req.body.serialNo;
        params.contractDesc = req.body.contractDesc;
        // params.productId = req.body.productId;
        params.referContentId = req.body.referContentId;
        // params.productType = req.body.productType;
        // params.cycle = req.body.cycle;
        // params.isSupportPeriod = req.body.isSupportPeriod;
        // params.periodNumber = req.body.periodNumber;
        // params.isTargetProfit = req.body.isTargetProfit;
        // params.targetProfit = req.body.targetProfit;
        // params.isSupportStrategy = req.body.isSupportStrategy;
        // params.strategyType = req.body.strategyType;
        // params.increaseIndex = req.body.increaseIndex;
        // params.increaseAmt = req.body.increaseAmt;
        // params.decreaseIndex = req.body.decreaseIndex;
        // params.decreaseAmt = req.body.decreaseAmt;
        params.achieveTargetPercent = req.body.achieveTargetPercent / 100; // (止盈比例)
        params.achieveTargetDays = req.body.achieveTargetDays; // (止盈天数)
        params.operator = req.session.loginInfo.userid;
        let option = {
            pageUrl: '/publicConfig/AIPstrategyMgmt/planSetting/update.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.update,
            body: params,
            timeout: 15000,
            json: true
        };
        request.put(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '保存失败', data: null});
            }
            if (body.returnCode == 0) {
                res.send({error: 0, msg: '保存成功', data: null});
            }
            else if (body && body.returnCode != 0 && body.returnCode != 9999) {
                res.send({error: 1, msg: body.returnMsg, data: null});
            }
            else {
                res.send({error: 1, msg: '保存失败', data: null});
            }
        });
    });
    //删除
    app.post('/publicConfig/AIPstrategyMgmt/planSetting/del.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/publicConfig/AIPstrategyMgmt/planSetting/del.ajax',
            req: req,
            operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.del,
            qs: {
                serialNo: req.body.serialNo
            },
            timeout: 15000,
            json: true
        };
        request.put(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '删除失败', data: null});
            }
            if (body.returnCode == 0) {
                res.send({error: 0, msg: '删除成功', data: null});
            }
            else if (body && body.returnCode != 0 && body.returnCode != 9999) {
                res.send({error: 1, msg: body.returnMsg, data: null});
            }
            else {
                res.send({error: 1, msg: '删除失败', data: null});
            }
        });
    });
};
