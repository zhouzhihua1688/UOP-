const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').livingPay;
module.exports = function (app) {

    app.post('/cashMgmt/livingPay/companyActive/getList.ajax', (req, res, next) => {
        let para = req.body;
        let params={};
        for(o in para){
            params[o]=para[o];
        }
        console.log('/cashMgmt/livingPay/companyActive/getList.ajax params:', params);
        let option = {
            session: req.session,
            url: apiUrlList.list,
            timeout: 15000,
            json: true,
            formData:params
        };
        console.log('/cashMgmt/livingPay/companyActive/getList.ajax option:', option);
        request.post(option, (error, response, body) => {
            console.log('/cashMgmt/livingPay/companyActive/getList.ajax error:', error);
            console.log('/cashMgmt/livingPay/companyActive/getList.ajax statusCode:', response && response.statusCode);
            console.log('/cashMgmt/livingPay/companyActive/getList.ajax body:', body);
            if (error) {
                return res.send({ error: 1, msg: '机构获取失败' });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                let data = result.body;
                if (data && Array.isArray(data.formList)){
                    data.formList.forEach((item) => {
                        item.check = false;
                    });
                }
                res.send({ error: 0, msg: '机构获取成功', data: data });
            }
            else {
                res.send({ error: 1, msg: '机构获取失败' });
            }
        });
    });
    //无效机构
    app.post('/cashMgmt/livingPay/companyActive/inAvailable.ajax', (req, res, next) => {
        var params=req.query.ids;
        console.log('/cashMgmt/livingPay/companyActive/inAvailable.ajax params:'+params);
        let option = {
            session: req.session,
            url: apiUrlList.inAvailable+"?ids="+params,
            timeout: 15000,
            json: true
        };
        console.log('/cashMgmt/livingPay/companyActive/inAvailable.ajax option:', option);
        request.post(option, (error, response, body) => {
            console.log('/cashMgmt/livingPay/companyActive/inAvailable.ajax error:', error);
            console.log('/cashMgmt/livingPay/companyActive/inAvailable.ajax statusCode:', response && response.statusCode);
            console.log('/cashMgmt/livingPay/companyActive/inAvailable.ajax body:', body);
            if (error) {
                return res.send({ error: 1, msg: '无效机构失败' });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                res.send({ error: 0, msg: '无效机构成功', data: result.body });
            }
            else {
                res.send({ error: 1, msg: '无效机构失败' });
            }
        });
    });
    //有效机构
    app.post('/cashMgmt/livingPay/companyActive/beAvailable.ajax', (req, res, next) => {
        var params=req.query.ids;
        console.log('/cashMgmt/livingPay/companyActive/beAvailable.ajax params:'+params);
        let option = {
            session: req.session,
            url: apiUrlList.beAvailable+"?ids="+params,
            timeout: 15000,
            json: true
        };
        console.log('/cashMgmt/livingPay/companyActive/beAvailable.ajax option:', option);
        request.post(option, (error, response, body) => {
            console.log('/cashMgmt/livingPay/companyActive/beAvailable.ajax error:', error);
            console.log('/cashMgmt/livingPay/companyActive/beAvailable.ajax statusCode:', response && response.statusCode);
            console.log('/cashMgmt/livingPay/companyActive/beAvailable.ajax body:', body);
            if (error) {
                return res.send({ error: 1, msg: '有效机构失败' });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                res.send({ error: 0, msg: '有效机构成功', data: result.body });
            }
            else {
                res.send({ error: 1, msg: '有效机构失败' });
            }
        });
    });

};
