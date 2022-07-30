const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').integralSettingMgmt.integralCalc;
module.exports = function (app) {
    // 查询
    app.post('/awardMgmt/integralSettingMgmt/integralCalc/getPointList.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/awardMgmt/integralSettingMgmt/integralCalc/getPointList.ajax',
            req: req,
            url: apiUrlList.getPointList,
            timeout: 15000,
            json: true
        };
        request.get(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败', data: null});
            }
            if (body.returnCode == 0 && Array.isArray(body.body)) {
                let resultArr = body.body.map(item => {
                    let obj = {};
                    obj.pointNo = item.pointNo;
                    obj.pointValue = item.pointValue;
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
    app.post('/awardMgmt/integralSettingMgmt/integralCalc/send.ajax', (req, res, next) => {
        let params = {};
        params.custNo = req.body.custNo;
        params.pointNo = req.body.pointNo;
        params.fromCustNo = '';
        params.pointStatus = req.body.pointStatus;
        params.source = req.session.loginInfo.userid;
        params.sourceDetail = req.body.sourceDetail;
        let option = {
            pageUrl: '/awardMgmt/integralSettingMgmt/integralCalc/send.ajax',
            req: req,
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.send,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '发送失败', data: null});
            }
            if (body.returnCode == 0) {
                res.send({error: 0, msg: '发送成功', data: null});
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
    app.post('/awardMgmt/integralSettingMgmt/integralCalc/dataAddBatch.ajax', (req, res, next) => {
        let params = JSON.parse(req.body.ExcelData).map(item => {
            let obj = {};
            obj.custNo = item.custNo;
            obj.pointNo = item.pointNo;
            obj.fromCustNo = '';
            obj.pointStatus = item.pointStatus;
            obj.source = req.session.loginInfo.userid;
            obj.sourceDetail = item.sourceDetail;
            return obj;
        });

        function setPromiseParams(params) {
            return new Promise((resolve, reject) => {
                let option = {
                    pageUrl: '/awardMgmt/integralSettingMgmt/integralCalc/dataAddBatch.ajax',
                    req: req,
                    operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
                    url: apiUrlList.sendBatch,
                    body: params,
                    json: true
                };
                console.log('/awardMgmt/integralSettingMgmt/integralCalc/dataAddBatch.ajax option:', option);
                request.post(option, (error, response, body) => {
                    console.log('/awardMgmt/integralSettingMgmt/integralCalc/dataAddBatch.ajax error:', error);
                    console.log('/awardMgmt/integralSettingMgmt/integralCalc/dataAddBatch.ajax statusCode:', response && response.statusCode);
                    console.log('/awardMgmt/integralSettingMgmt/integralCalc/dataAddBatch.ajax body:', body);
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
