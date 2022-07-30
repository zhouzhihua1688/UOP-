const request = require('./../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').activeDataQuery.joinDetail;
module.exports = function (app) {

    // 获取  初始数据和查询
    app.post('/marketingActive/activeDataQuery/joinDetail/getList.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            req,
            url: apiUrl.dataList,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/marketingActive/activeDataQuery/joinDetail/getList.ajax option:', {
            ...option,
            req: '#'
        });
        request(option, (error, response, body) => {
            console.log('/marketingActive/activeDataQuery/joinDetail/getList.ajax error:', error);
            console.log('/marketingActive/activeDataQuery/joinDetail/getList.ajax statusCode:', response && response.statusCode);
            console.log('/marketingActive/activeDataQuery/joinDetail/getList.ajax body:', {
                ...body,
                ['body']: '*****'
            });
            if (error) {
                return res.send({
                    error: 1,
                    msg: '数据获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {
                if (!result.body.rows) {
                    res.send({
                        error: 1,
                        msg: '数据为空',
                        data: result.body
                    });
                } else {
                    res.send({
                        error: 0,
                        msg: '调用成功',
                        data: result.body
                    });
                }
            } else {
                res.send({
                    error: 1,
                    msg: '获取数据失败'
                });
            }
        });
    });

};