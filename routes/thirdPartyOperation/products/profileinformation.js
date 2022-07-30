const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').products.profileinformation;
const qs = require("qs");
module.exports = function (app) {
    //导出
    app.get('/thirdPartyOperation/products/profileinformation/download.ajax', (req, res, next) => {
        let params = {};
        params.fundId = req.query.fundid;
        params.partnerId = req.query.partnerid;
        params.filePath = req.query.filepath;
        let option = {
            session: req.session,
            url: apiUrlList.export,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/products/profileinformation/download.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/thirdPartyOperation/products/profileinformation/download.ajax error:', error);
            console.log('/thirdPartyOperation/products/profileinformation/download.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/products/profileinformation/download.ajax body:', body);
            // return res.send(body);
            if (error) {
                return res.send({
                    error: 1,
                    msg: '导出失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.responseCode === '0000') {
                res.send({
                    error: 0,
                    msg: result.responseMessage,
                    data: result.data
                });
            } else if (result && result.responseCode != '9999') {
                res.send({error: 1, msg: result.responseMessage});
            } else {
                res.send({
                    error: 1,
                    msg: result.responseMessage
                });
            }
        });
    });
};

