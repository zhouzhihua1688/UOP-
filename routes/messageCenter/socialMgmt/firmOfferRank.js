const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').socialMgmt.firmOfferRank;
module.exports = function (app) {
    // 获取初始数据和查询
    app.post('/messageCenter/socialMgmt/firmOfferRank/getTableData.ajax', (req, res, next) => {
        let params = {};
        req.body.firmOfferId && (params.firmOfferId = req.body.firmOfferId);
        req.body.firmOfferName && (params.firmOfferName = req.body.firmOfferName);
        req.body.custNo && (params.custNo = req.body.custNo);
        req.body.rankField && (params.rankField = req.body.rankField);
        req.body.groupType && (params.groupType = req.body.groupType);
        if(req.body.firmOfferStatus && JSON.parse(req.body.firmOfferStatus).length > 0){
            params.firmOfferStatusList = JSON.parse(req.body.firmOfferStatus);
        }
        params.pageNo = req.body.pageNo;
        params.pageSize = req.body.pageSize;
        let option = {
            pageUrl: '/messageCenter/socialMgmt/firmOfferRank/getTableData.ajax',
            req: req,
            url: apiUrlList.getTableData,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '查询失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode === 0 && result.body && Array.isArray(result.body.rows)) {
                result.body.rows.forEach(item => {
                    item.showUpdateTime = item.updateTime.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3');
                    item.firmOfferStatus_show = item.firmOfferStatus;
                    if (item.firmOfferStatus == 0) {
                        item.firmOfferStatus_show = '初始化';
                    }
                    else if (item.firmOfferStatus == 2) {
                        item.firmOfferStatus_show = '申请公开';
                    }
                    else if (item.firmOfferStatus == 3) {
                        item.firmOfferStatus_show = '不公开';
                    }
                    else if (item.firmOfferStatus == 4) {
                        item.firmOfferStatus_show = '申请失败';
                    }
                    else if (item.firmOfferStatus == 6) {
                        item.firmOfferStatus_show = '公开';
                    }
                    else if (item.firmOfferStatus == 9) {
                        item.firmOfferStatus_show = '解散';
                    }
                });
                return res.send({error: 0, msg: '查询成功', data: result.body});
            }
            else if (result && result.returnCode != 9999) {
                return res.send({error: 1, msg: result.returnMsg});
            }
            else {
                return res.send({error: 1, msg: '查询失败'});
            }
        });

    });
    // 查看实盘详情
    app.post('/messageCenter/socialMgmt/firmOfferRank/checkParams.ajax', (req, res, next) => {
        let params = {};
        params.groupId = req.body.groupId;
        let option = {
            pageUrl: '/messageCenter/socialMgmt/firmOfferRank/checkParams.ajax',
            req: req,
            url: apiUrlList.checkParams,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '获取失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                return res.send({error: 0, msg: '获取成功', data: result.body});
            }
            else if (result && result.returnCode != 9999) {
                return res.send({error: 1, msg: result.returnMsg, data: null});
            }
            else {
                return res.send({error: 1, msg: '获取失败', data: null});
            }
        });
    });

    // 2021-03-02 获取实盘总额等等参数
    app.post('/messageCenter/socialMgmt/firmOfferRank/statistical.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/messageCenter/socialMgmt/firmOfferRank/statistical.ajax',
            req: req,
            url: apiUrlList.statistical,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '获取实盘统计信息失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                return res.send({error: 0, msg: '获取成功', data: result.body});
            }
            else if (result && result.returnCode != 9999) {
                return res.send({error: 1, msg: result.returnMsg, data: null});
            }
            else {
                return res.send({error: 1, msg: '获取实盘统计信息失败', data: null});
            }
        });
    });
};

