const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').integralSettingMgmt.integralQuery;
module.exports = function (app) {
    // 查询
    app.post('/awardMgmt/integralSettingMgmt/integralQuery/query.ajax', (req, res, next) => {
        let params = {};
        req.body.operateType && (params.operateType = req.body.operateType);
        req.body.custNo && (params.custNo = req.body.custNo);
        req.body.pointStatus && (params.pointStatus = req.body.pointStatus);
        params.source=req.body.source;
        params.sourceDetail=req.body.sourceDetail;
        params.expendType=req.body.expendType;
        params.expendMore=req.body.expendMore;
        params.startTime=req.body.startTime;
        params.endTime=req.body.endTime;
        let option = {
            pageUrl: '/awardMgmt/integralSettingMgmt/integralQuery/query.ajax',
            req: req,
            url: apiUrlList.query,
            body: {
                custOperatePointFlowResDto: params,
                pageNo: req.body.pageNo,
                pageSize: req.body.pageSize
            },
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败', data: null});
            }
            if (body.returnCode == 0 && Array.isArray(body.body.rows)) {
                let resultArr = body.body.rows.map(item => {
                    let obj = {};
                    obj.pointOperateSerialNo = item.pointOperateSerialNo;
                    obj.custNo = item.custNo;
                    obj.pointNo = item.pointNo;
                    switch (item.operateType) {
                        case '1':
                            obj.operateType_desc = '积分增加';
                            break;
                        case '2':
                            obj.operateType_desc = '积分消耗';
                            break;
                        default:
                            obj.operateType_desc = item.operateType;
                    }
                    switch (item.pointStatus) {
                        case '1':
                            obj.pointStatus_desc = '正常';
                            break;
                        case '2':
                            obj.pointStatus_desc = '冻结';
                            break;
                        case '9':
                            obj.pointStatus_desc = '失效';
                            break;
                        default:
                            obj.pointStatus_desc = item.pointStatus;
                    }
                    obj.operatePoints = item.operatePoints;
                    switch (item.source) {
                        case '0':
                            obj.source_desc = '人工发放';
                            break;
                        case '1':
                            obj.source_desc = '营销活动';
                            break;
                        case '2':
                            obj.source_desc = '积分赠送';
                            break;
                        default:
                            obj.source_desc = item.source;
                    }
                    obj.sourceDetail = item.sourceDetail;
                    switch (item.expendType) {
                        case '1':
                            obj.expendType_desc = '商品兑换';
                            break;
                        case '2':
                            obj.expendType_desc = '积分转赠';
                            break;
                        case '3':
                            obj.expendType_desc = '积分三方输出';
                            break;
                        default:
                            obj.expendType_desc = item.expendType;
                    }
                    obj.expendMore = item.expendMore;
                    obj.operateTime = item.operateTime;
                    return obj;
                });
                res.send({
                    error: 0,
                    msg: '查询成功',
                    data: {
                        total: body.body.total,
                        pages: body.body.pages,
                        body: resultArr
                    }
                });
            }
            else if (body.returnCode != 0 && body.returnCode != 9999) {
                res.send({error: 1, msg: body.returnMsg, data: null});
            }
            else {
                res.send({error: 1, msg: '查询失败', data: null});
            }
        });
    });
    // 获取积分来源类型
    app.post('/awardMgmt/integralSettingMgmt/integralQuery/getIntegral.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/awardMgmt/integralSettingMgmt/integralQuery/getIntegral.ajax',
            req,
            url: apiUrlList.integral,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '积分类型查询失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {
                return res.send({
                    error: 0,
                    msg: '积分类型查询成功',
                    data: body
                });
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '积分类型查询失败'
                });
            }
        });
    });
    // 获取消费类型
    app.post('/awardMgmt/integralSettingMgmt/integralQuery/getConsumption.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/awardMgmt/integralSettingMgmt/integralQuery/getConsumption.ajax',
            req,
            url: apiUrlList.consumption,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '消费类型查询失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {
                return res.send({
                    error: 0,
                    msg: '消费类型查询成功',
                    data: body
                });
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '消费类型查询失败'
                });
            }
        });
    });
};