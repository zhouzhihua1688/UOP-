const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').daoLeWechatRedPackeMgmt.redPacketQuery;
module.exports = function (app) {
    // 查询
    app.post('/awardMgmt/daoLeWechatRedPackeMgmt/redPacketQuery/query.ajax', (req, res, next) => {
        let params = {};
        req.body.custNo && (params.custNo = req.body.custNo);
        req.body.envelopNo && (params.envelopNo = req.body.envelopNo);
        params.pageNo = req.body.pageNo;
        params.pageSize = req.body.pageSize;
        let option = {
            pageUrl: '/awardMgmt/daoLeWechatRedPackeMgmt/redPacketQuery/query.ajax',
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
                res.send({
                    error: 0,
                    msg: '查询成功',
                    data: {
                        total: body.body.total,
                        pages: body.body.pages,
                        pageNum: body.body.pageNum,
                        body: body.body.rows
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