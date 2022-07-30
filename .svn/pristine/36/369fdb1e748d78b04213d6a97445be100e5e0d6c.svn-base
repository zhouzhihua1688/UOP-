const request = require('../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').awardSearch.userDetail;
module.exports = function (app) {

    // 获取  初始数据和查询
    app.post('/awardMgmt/awardSearch/userDetail/getList.ajax', (req, res, next) => {
        let params = req.body,
        userName = req.session.loginInfo.username;
        let option = {
            pageUrl: '/awardMgmt/awardSearch/userDetail/getList.ajax',
            req: req,
            url: apiUrl.query,
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
            if (result && result.returnCode == '0') {
                result.body.userName=userName;
                res.send({
                    error: 0,
                    msg: '调用成功',
                    userName,
                    data: result.body
                });
            } else {
                res.send({
                    error: 1,
                    userName,
                    msg: '获取数据失败'
                });
            }
        });
    });

};