const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').fundTag.filterMgmt;

module.exports = function (app) {
    // 获取初始数据和查询
    app.post('/businessMgmt/fundTag/filterMgmt/getTableData.ajax', (req, res, next) => {
        
        let option = {
            pageUrl: '/businessMgmt/fundTag/filterMgmt/getTableData.ajax',
            req,
            url: apiUrlList.getTableData,
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
            if (result && result.returnCode == '0') {
                return res.send({
                    error: 0,
                    msg: '查询成功',
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
                    msg: '查询失败'
                });
            }
        });
    }); //condition更新筛选条件
    app.post('/businessMgmt/fundTag/filterMgmt/upCondition.ajax', (req, res, next) => {
        let params = {};
        req.body && (params = req.body);
      
        let option = {
            pageUrl: '/businessMgmt/fundTag/filterMgmt/upCondition.ajax',
            req,
            url: apiUrlList.upCondition,
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
                return res.send({
                    error: 0,
                    msg: '修改成功'
                });
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '修改失败'
                });
            }
        });
    });
};