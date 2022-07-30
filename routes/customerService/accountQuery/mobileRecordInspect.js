const request = require('./../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').accountQuery.mobileRecordInspect;
module.exports = function (app) {

    app.post('/customerService/accountQuery/mobileRecordInspect/tableList.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            session: req.session,
            req,
            url: apiUrl.tableList,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/customerService/accountQuery/mobileRecordInspect/tableList.ajax option:', {
            ...option,
            req: '#'
        });
        request(option, (error, response, body) => {
            console.log('/customerService/accountQuery/mobileRecordInspect/tableList.ajax error:', error);
            console.log('/customerService/accountQuery/mobileRecordInspect/tableList.ajax statusCode:', response && response.statusCode);
            console.log('/customerService/accountQuery/mobileRecordInspect/tableList.ajax body:',{
                ...body,
                ['body']: '*****'
            });
            if (error) {
                return res.send({
                    error: 1,
                    msg: '查询失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {
                res.send({
                    error: 0,
                    msg: '查询成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '查询失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });


};