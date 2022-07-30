const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').sendCount.singlePush;

module.exports = function (app) {
    app.post('/messageCenter/sendCount/singlePush/search.ajax', (req, res, next) => {
        let params = {};
        params.custNo = req.body.custNo;
        params.beginTime = req.body.beginTime;
        params.endTime = req.body.endTime;
        let option = {
            pageUrl: '/messageCenter/sendCount/singlePush/search.ajax',
            req: req,
            url: apiUrlList.search,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            if (body && body.returnCode == 0 && Array.isArray(body.body)) {
                let data = body.body;
                let result = data.map(item => {
                    let obj =  {
                        custNo: item.custNo,
                        ruleId: item.ruleId,
                        templateId: item.templateId,
                        content: item.content,
                        status: item.status,
                        createTime: item.createTime,
                        ruleSource: item.ruleSource
                    };
                    obj.ruleSource.toUpperCase() === 'ICIF' && (obj.ruleSource = '账户系统');
                    obj.ruleSource.toUpperCase() === 'ATS' && (obj.ruleSource = '预约交易系统');
                    obj.ruleSource.toUpperCase() === 'UAA' && (obj.ruleSource = '统一认证授权');
                    obj.ruleSource.toUpperCase() === 'AGS' && (obj.ruleSource = '养老金');
                    obj.ruleSource.toUpperCase() === 'BE' && (obj.ruleSource = '银行引擎');
                    obj.ruleSource.toUpperCase() === 'FUNDPAY' && (obj.ruleSource = '汇闪付');
                    obj.ruleSource.toUpperCase() === 'FUNDGROUP' && (obj.ruleSource = '组合系统');
                    obj.ruleSource.toUpperCase() === 'SMAC' && (obj.ruleSource = '现金宝系统');
                    obj.ruleSource.toUpperCase() === 'HOP' && (obj.ruleSource = '对外合作平台');
                    obj.ruleSource.toUpperCase() === 'DSC' && (obj.ruleSource = '柜台系统');
                    obj.ruleSource.toUpperCase() === 'ACC' && (obj.ruleSource = '活动中心');
                    obj.ruleSource.toUpperCase() === 'MCP' && (obj.ruleSource = '电商直销');
                    obj.status == 0 && (obj.status = '开始');
                    obj.status == 1 && (obj.status = '免打扰');
                    obj.status == 2 && (obj.status = '失败');
                    obj.status == 3 && (obj.status = '成功');
                    obj.status == 4 && (obj.status = '无pushtoken');
                    obj.status == 5 && (obj.status = '遇到挡板未发送状态');
                    obj.status == 6 && (obj.status = '超过频次限额');
                    obj.status == 7 && (obj.status = '客户关闭设置');
                    obj.status == 9 && (obj.status = '已通过短信发送');
                    return obj;
                });
                res.send({error: 0, msg: '查询成功', data: result});
            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: body.returnMsg});
            }
            else {
                res.send({error: 1, msg: '查询失败'});
            }
        });
    });
};
