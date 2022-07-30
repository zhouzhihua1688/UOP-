const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').wechatPublicMgmt.publicAccountUserQuery;
module.exports = function (app) {
    //查询
    // 获取初始数据和查询
    app.post('/publicConfig/wechatPublicMgmt/publicAccountUserQuery/getTableData.ajax', (req, res, next) => {
        let params = {};
        params.weixinno = req.body.weixinno;
        params.eventKey = req.body.eventKey;
        params.createTime = req.body.createTime;
        params.endTime = req.body.endTime;
        let option = {
            pageUrl: '/publicConfig/wechatPublicMgmt/publicAccountUserQuery/getTableData.ajax',
            req: req,
            url: apiUrlList.getTableData,
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
            console.log(result, '---result----');
            if (result && result.returnCode == '0') {
                // var resultData=result.body;
                // resultData.forEach((item) => {
                //     item.check = false;
                // });
                let resultData = {};
                resultData.tableData = result.body
                return res.send({
                    error: 0,
                    msg: '查询成功',
                    data: resultData
                });
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '查询失败'
                });
            }
        });
    });
};