const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').experienceGold.sendMgmt;
module.exports = function (app) {
    // 查询
    app.post('/awardMgmt/experienceGold/sendMgmt/getList.ajax', (req, res, next) => {
        let params = {};
        params.pageNo = 1;
        params.pageSize = 999999999;
        let option = {
            pageUrl: '/awardMgmt/experienceGold/sendMgmt/getList.ajax',
            req: req,
            url: apiUrlList.getList,
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
    // 发送
    app.post('/awardMgmt/experienceGold/sendMgmt/send.ajax', (req, res, next) => {
        let params = JSON.parse(req.body.experienceCouponInfo).map(item => {
            let obj = {};
            obj.experienceCouponId = item.experienceCouponId;
            obj.custNo = item.custNo;
            obj.sourceDetail = item.sourceDetail;
            obj.source = '0';
            return obj;
        });
        let option = {
            pageUrl: '/awardMgmt/experienceGold/sendMgmt/send.ajax',
            req: req,
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.send,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败', data: null});
            }
            if (body.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: `发送成功${body.body.successCount}条，失败${body.body.failCount}条`,
                    data: null
                });
            }
            else if (body.returnCode != 0 && body.returnCode != 9999) {
                res.send({error: 1, msg: body.returnMsg, data: null});
            }
            else {
                res.send({error: 1, msg: '发送失败', data: null});
            }
        });
    });
};
