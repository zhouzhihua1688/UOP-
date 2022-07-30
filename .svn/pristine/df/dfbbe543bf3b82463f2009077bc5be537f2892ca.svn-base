const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').integralSettingMgmt.integralExchange;
module.exports = function (app) {
    // 获取初始数据和查询
    app.post('/awardMgmt/integralSettingMgmt/integralExchange/getTableData.ajax', (req, res, next) => {
        // let params = {};
        // req.body.pageNo && (params.pageNo = req.body.pageNo);
        // req.body.pageSize && (params.pageSize = req.body.pageSize);
        let option = {
            pageUrl: '/awardMgmt/integralSettingMgmt/integralExchange/getTableData.ajax',
            req: req,
            url: apiUrlList.getTableData,
            // qs: params,
            timeout: 15000,
            json: true
        };
        request.get(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '查询失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0 && Array.isArray(result.body)) {
                let resultData = {};
                // resultData.pageNo = result.body.pageNo; //页数
                // resultData.pageNum = result.body.pageNum; //页数
                // resultData.totalSize = Math.ceil(result.body.total / req.body.pageSize);//总页数
                resultData.tableData = result.body;
                return res.send({error: 0, msg: '查询成功', data: resultData});
            } else if (result && result.returnCode != 9999) {
                return res.send({error: 1, msg: result.returnMsg});
            } else {
                return res.send({error: 1, msg: '查询失败'});
            }
        });

    });
    //根据ID查询
    app.post('/awardMgmt/integralSettingMgmt/integralExchange/search.ajax', (req, res, next) => {
        let params = {};
        req.body.productId && (params.productId = req.body.productId);
        req.body.productName && (params.productName = req.body.productName);
        let option = {
            pageUrl: '/awardMgmt/integralSettingMgmt/integralExchange/search.ajax',
            req: req,
            url: apiUrlList.search,
            qs: params,
            timeout: 15000,
            json: true
        };
        request.get(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '查询失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0) {
                let resultData = {};
                resultData.tableData = result.body;
                return res.send({error: 0, msg: '查询成功', data: resultData});
            } else if (result && result.returnCode != 9999) {
                return res.send({error: 1, msg: result.returnMsg});
            } else {
                return res.send({error: 1, msg: '查询失败'});
            }
        });

    });
    //新增数据
    app.post('/awardMgmt/integralSettingMgmt/integralExchange/saveParam.ajax', (req, res, next) => {
        let params = {};
        params.productName = req.body.productName;
        params.productDesc = req.body.productDesc;
        params.productType = req.body.productType;
        params.exchangeType = req.body.exchangeType;
        params.onSale = req.body.onSale;
        params.productTotalCount = req.body.productTotalCount;
        params.hadExchangeCount = req.body.hadExchangeCount;
        params.productImg = req.body.productImg;
        params.productUrl = req.body.productUrl;
        params.maxExchangeCountOfDay = req.body.maxExchangeCountOfDay;
        params.maxExchangeCountOfWeek = req.body.maxExchangeCountOfWeek;
        params.maxExchangeCountOfMonth = req.body.maxExchangeCountOfMonth;
        params.supportUserType = req.body.supportUserType;
        params.productValue = req.body.productValue;
        params.productBeWorth = req.body.productBeWorth;
        params.exchangePoints = req.body.exchangePoints;
        params.maxExchangeCount = req.body.maxExchangeCount;
        params.minExchargeCount = req.body.minExchargeCount;
        params.groupId = req.body.groupId;    //客群 add 20200212
        params.messageRemark = req.body.messageRemark;
        params.expireTimeType = req.body.expireTimeType;
        params.expireTime = req.body.expireTimeType == 0 ? req.body.expireTime : '';
        params.expireRelativeTime = req.body.expireTimeType == 1 ? req.body.expireRelativeTime : '';
        let option = {
            pageUrl: '/awardMgmt/integralSettingMgmt/integralExchange/saveParam.ajax',
            req: req,
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.saveParam,
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
            console.log("***", result)
            if (result && result.returnCode == 0) {
                return res.send({error: 0, msg: '保存成功'});
            } else if (result && result.returnCode != 9999) {
                return res.send({error: 1, msg: result.returnMsg});
            } else {
                return res.send({error: 1, msg: '保存失败'});
            }
        });
    });
    //修改数据
    app.post('/awardMgmt/integralSettingMgmt/integralExchange/update.ajax', (req, res, next) => {
        let params = {};
        params.productId = req.body.productId;
        params.productName = req.body.productName;
        params.productDesc = req.body.productDesc;
        params.productType = req.body.productType;
        params.exchangeType = req.body.exchangeType;
        params.onSale = req.body.onSale;
        params.productTotalCount = req.body.productTotalCount;
        params.hadExchangeCount = req.body.hadExchangeCount;
        params.productImg = req.body.productImg;
        params.productUrl = req.body.productUrl;
        params.maxExchangeCountOfDay = req.body.maxExchangeCountOfDay;
        params.maxExchangeCountOfWeek = req.body.maxExchangeCountOfWeek;
        params.maxExchangeCountOfMonth = req.body.maxExchangeCountOfMonth;
        params.supportUserType = req.body.supportUserType;
        params.productValue = req.body.productValue;
        params.productBeWorth = req.body.productBeWorth;
        params.exchangePoints = req.body.exchangePoints;
        params.maxExchangeCount = req.body.maxExchangeCount;
        params.minExchargeCount = req.body.minExchargeCount;
        params.groupId = req.body.groupId;    //客群 add 20200212
        params.messageRemark = req.body.messageRemark;
        params.expireTimeType = req.body.expireTimeType;
        params.expireTime = req.body.expireTimeType == 0 ? req.body.expireTime : '';
        params.expireRelativeTime = req.body.expireTimeType == 1 ? req.body.expireRelativeTime : '';
        let option = {
            pageUrl: '/awardMgmt/integralSettingMgmt/integralExchange/update.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.update,
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
            if (result && result.returnCode == 0) {
                return res.send({error: 0, msg: '修改成功'});
            } else if (result && result.returnCode != 9999) {
                return res.send({error: 1, msg: result.returnMsg});
            } else {
                return res.send({error: 1, msg: '修改失败'});
            }
        });
    });
    //下拉列表数据(新增、修改dialog，客群)
    app.post('/awardMgmt/integralSettingMgmt/integralExchange/getUserGroupList.ajax', (req, res, next) => {
        // let params = {};
        let option = {
            pageUrl: '/awardMgmt/integralSettingMgmt/integralExchange/getUserGroupList.ajax',
            req: req,
            url: apiUrlList.getUserGroupList,
            // body: params,
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
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                return res.send({error: 0, msg: '查询成功', data: body});
            } else if (result && result.returnCode != 9999) {
                return res.send({error: 1, msg: result.returnMsg});
            } else {
                return res.send({error: 1, msg: '查询失败'});
            }
        });
    });
};

