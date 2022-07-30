const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').redPacketSettingMgmt.redPacketQuery;
module.exports = function (app) {
    // 查询
    app.post('/awardMgmt/redPacketSettingMgmt/redPacketQuery/query.ajax', (req, res, next) => {
        let params = {};
        req.body.serialNo && (params.serialNo = req.body.serialNo);
        req.body.custNo && (params.custNo = req.body.custNo);
        req.body.envelopNo && (params.envelopNo = req.body.envelopNo);
        params.pageNo = req.body.pageNo;
        params.pageSize = req.body.pageSize;
        let option = {
            pageUrl: '/awardMgmt/redPacketSettingMgmt/redPacketQuery/query.ajax',
            req: req,
            url: apiUrlList.query,
            qs: params,
            timeout: 15000,
            json: true
        };
        request.get(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败', data: null});
            }
            if (body.returnCode == 0 && Array.isArray(body.body.rows)) {
                let resultArr = body.body.rows.map(item => {
                    let obj = {};
                    obj.serialNo = item.serialNo;
                    obj.envelopNo = item.envelopNo;
                    obj.custNo = item.custNo;
                    obj.summary = item.summary;
                    obj.envelopValue = item.envelopValue;
                    obj.branchCode = item.branchCode;
                    obj.useModeType = item.useModeType;
                    switch (item.useModeType) {
                        case 0:
                            obj.useModeType_show = '手动领取';
                            break;
                        case 1:
                            obj.useModeType_show = '自动充值或购买';
                            break;
                        default:
                            obj.useModeType_show = item.useModeType;
                    }
                    obj.envelopType = item.envelopType;
                    switch (item.envelopType) {
                        case 1:
                            obj.envelopType_show = '普通红包';
                            break;
                        case 2:
                            obj.envelopType_show = '活动红包';
                            break;
                        case 3:
                            obj.envelopType_show = '微信红包';
                            break;
                        case 4:
                            obj.envelopType_show = '空间红包';
                            break;
                        case 5:
                            obj.envelopType_show = '礼券红包';
                            break;
                        case 9:
                            obj.envelopType_show = '第三方红包';
                            break;
                        default:
                            obj.envelopType_show = item.envelopType;
                    }
                    obj.source = item.source;
                    obj.sourceDetail = item.sourceDetail;
                    obj.status = item.status;
                    switch (item.status) {
                        case '0':
                            obj.status_show = '未领取';
                            break;
                        case '1':
                            obj.status_show = '已领取';
                            break;
                        case '2':
                            obj.status_show = '已使用有效';
                            break;
                        case '6':
                            obj.status_show = '已冻结';
                            break;
                        case '7':
                            obj.status_show = '失效(冻结失效)';
                            break;
                        case '8':
                            obj.status_show = '失效(删除)';
                            break;
                        case '9':
                            obj.status_show = '失效(包括已过期)';
                            break;
                        default:
                            obj.status_show = item.status;
                    }
                    obj.creator = item.creator;
                    obj.createTime = item.createTime;
                    obj.updateTime = item.updateTime;
                    obj.expireTime = item.expireTime;
                    obj.receiveTime = item.receiveTime;
                    return obj;
                });
                res.send({
                    error: 0,
                    msg: '查询成功',
                    data: {
                        total: body.body.total,
                        pages: body.body.pages,
                        pageNum: body.body.pageNum,
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
};