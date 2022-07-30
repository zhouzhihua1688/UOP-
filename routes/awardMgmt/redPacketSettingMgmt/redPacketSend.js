const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').redPacketSettingMgmt.redPacketSend;
module.exports = function (app) {
    // 查询
    app.post('/awardMgmt/redPacketSettingMgmt/redPacketSend/getEnvelopList.ajax', (req, res, next) => {
        let params = {};
        params.pageNo = 1;
        params.pageSize = 999999999;
        let option = {
            pageUrl: '/awardMgmt/redPacketSettingMgmt/redPacketSend/getEnvelopList.ajax',
            req: req,
            url: apiUrlList.getEnvelopList,
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
                    obj.envelopNo = item.envelopNo;
                    obj.name = item.envelopName;
                    obj.value = item.envelopValue;
                    obj.value_max = item.maxValue;
                    obj.value_min = item.minValue;
                    obj.type = item.grantMode;
                    obj.value_show = item.grantMode == 0 ? item.envelopValue : `${item.minValue}-${item.maxValue}`
                    return obj;
                });
                res.send({error: 0, msg: '查询成功', data: resultArr});
            }
            else if (body.returnCode != 0 && body.returnCode != 9999) {
                res.send({error: 1, msg: body.returnMsg, data: null});
            }
            else {
                res.send({error: 1, msg: '查询失败', data: null});
            }
        });
    });
    // 发送
    app.post('/awardMgmt/redPacketSettingMgmt/redPacketSend/send.ajax', (req, res, next) => {
        let params = JSON.parse(req.body.envelopInfo).map(item => {
            let obj = {};
            obj.redEnvelopNo = item.redEnvelopNo;
            obj.custNo = item.custNo;
            obj.redEnvelopValue = item.redEnvelopValue;
            obj.sourceDetail = item.sourceDetail;
            obj.source = 'UOP';
            obj.creator = req.session.loginInfo.username;
            return obj;
        });
        let option = {
            pageUrl: '/awardMgmt/redPacketSettingMgmt/redPacketSend/send.ajax',
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
                    msg: `发送成功${body.body.sendSuccessedCount}条，失败${body.body.sendFailedCount}条`,
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
    // 批量发送
    app.post('/awardMgmt/redPacketSettingMgmt/redPacketSend/dataAddBatch.ajax', (req, res, next) => {
        let params = JSON.parse(req.body.ExcelData).map(item => {
            let obj = {};
            obj.redEnvelopNo = String(item.redEnvelopNo).trim();
            obj.custNo = String(item.custNo).trim();
            obj.redEnvelopValue = String(item.redEnvelopValue).trim();
            obj.sourceDetail = String(item.sourceDetail).trim();
            obj.source = 'UOP';
            obj.creator = req.session.loginInfo.username;
            return obj;
        });

        function setPromiseParams(params) {
            return new Promise((resolve, reject) => {
                let option = {
                    pageUrl: '/awardMgmt/redPacketSettingMgmt/redPacketSend/dataAddBatch.ajax',
                    req: req,
                    operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
                    url: apiUrlList.send,
                    body: params,
                    json: true
                };
                request.post(option, (error, response, body) => {
                    if (error) {
                        reject({message: '调用失败'});
                    }
                    if (body && body.returnCode == 0) {
                        resolve(body.body);
                    }
                    else {
                        reject({message: '调用失败'});
                    }
                });
            });
        }

        setPromiseParams(params).then((detail) => {
            res.send({error: 0, msg: `发送成功${detail.sendSuccessedCount}条，失败${detail.sendFailedCount}条`, data: null});
        }).catch(error => {
            res.send({error: 1, msg: '发送失败', data: null});
        });
    });
};
