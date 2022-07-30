const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').livingPay;
module.exports = function (app) {

    app.post('/cashMgmt/livingPay/districtMgmt/districtCodeList.ajax', (req, res, next) => {
        let para = req.body;
        let params={};
        for(o in para){
            params[o]=para[o];
        }
        console.log('/cashMgmt/livingPay/districtMgmt/districtCodeList.ajax params:', params);
        let option = {
            session: req.session,
            url: apiUrlList.districtCodeList,
            timeout: 15000,
            json: true,
            formData:params
        };
        console.log('/cashMgmt/livingPay/districtMgmt/districtCodeList.ajax option:', option);
        request.post(option, (error, response, body) => {
            console.log('/cashMgmt/livingPay/districtMgmt/districtCodeList.ajax error:', error);
            console.log('/cashMgmt/livingPay/districtMgmt/districtCodeList.ajax statusCode:', response && response.statusCode);
            console.log('/cashMgmt/livingPay/districtMgmt/districtCodeList.ajax body:', body);
            if (error) {
                return res.send({ error: -1, msg: '获取数据失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                // res.send({error: 0, msg: '获取成功', result});
                let data = result.body;
                if (data && Array.isArray(data.formList)) {
                    data.formList.forEach((item) => {
                        item.check = false;
                    });
                }
                res.send({ error: 0, msg: '获取数据成功', result: data});
            }
            else {
                res.send({error:1, msg: '获取数据失败'});
            }
        });
    });
    //取消支持
    app.post('/cashMgmt/livingPay/districtMgmt/inSupport.ajax', (req, res, next) => {
        var params=req.query.codes;
        console.log('/cashMgmt/livingPay/districtMgmt/inSupport.ajax params:'+params);
        let option = {
            session: req.session,
            url: apiUrlList.inSupport+"?codes="+params,
            timeout: 15000,
            json: true
        };
        console.log('/cashMgmt/livingPay/districtMgmt/inSupport.ajax option:', option);
        request.post(option, (error, response, body) => {
            console.log('/cashMgmt/livingPay/districtMgmt/inSupport.ajax error:', error);
            console.log('/cashMgmt/livingPay/districtMgmt/inSupport.ajax statusCode:', response && response.statusCode);
            console.log('/cashMgmt/livingPay/districtMgmt/inSupport.ajax body:', body);
            if (error) {
                return res.send({ error: -1, msg: '取消区域失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;

            if (result && result.returnCode == 0) {
                res.send({error:0,msg:"取消区域成功", data: result.body});
            }
            else {
                res.send({error: 1, msg: '取消区域失败'});
            }
        });
    });
    //支持
    app.post('/cashMgmt/livingPay/districtMgmt/beSupport.ajax', (req, res, next) => {
        var params=req.query.codes;
        console.log('/cashMgmt/livingPay/districtMgmt/beSupport.ajax params:'+params);
        let option = {
            session: req.session,
            url: apiUrlList.beSupport+"?codes="+params,
            timeout: 15000,
            json: true
        };
        console.log('/cashMgmt/livingPay/districtMgmt/beSupport.ajax option:', option);
        request.post(option, (error, response, body) => {
            console.log('/cashMgmt/livingPay/districtMgmt/beSupport.ajax error:', error);
            console.log('/cashMgmt/livingPay/districtMgmt/beSupport.ajax statusCode:', response && response.statusCode);
            console.log('/cashMgmt/livingPay/districtMgmt/beSupport.ajax body:', body);
            if (error) {
                return res.send({ error: -1, msg: '支持区域失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;

            if (result && result.returnCode == 0) {
                res.send({error:0,msg:"支持区域成功",data: result.body});
            }
            else {
                res.send({error: 1, msg: '支持区域失败'});
            }
        });
    });
    //新增
    app.post('/cashMgmt/livingPay/districtMgmt/districtCodeAdd.ajax', (req, res, next) => {
        let para = req.body;
        let params={};
        for(var o in para){
            console.log(o + ":" + para[o]);
            params[o]=para[o];
        }
        let option = {
            session: req.session,
            url: apiUrlList.districtCodeAdd,
            timeout: 15000,
            json: true,
            body: params
        };
        console.log('/cashMgmt/livingPay/districtMgmt/districtCodeAdd.ajax option:', option);
        request.post(option, (error, response, body) => {
            console.log('/cashMgmt/livingPay/districtMgmt/districtCodeAdd.ajax error:', error);
            console.log('/cashMgmt/livingPay/districtMgmt/districtCodeAdd.ajax statusCode:', response && response.statusCode);
            console.log('/cashMgmt/livingPay/districtMgmt/districtCodeAdd.ajax body:', body);
            if (error) {
                return res.send({ error: -1, msg: '新增区域失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;

            if (result && result.returnCode == 0) {
                res.send({error:0,msg:"新增区域成功", data: result.body});
            }
            else {
                res.send({ error: 1, msg: '新增区域失败'});
            }
        });
    });
    //删除
    app.post('/cashMgmt/livingPay/districtMgmt/deleteEven.ajax', (req, res, next) => {
        var params=req.query.codes;
        let option = {
            session: req.session,
            url: apiUrlList.districtCodeDelete+"?codes="+params,
            timeout: 15000,
            json: true
        };
        console.log('/cashMgmt/livingPay/districtMgmt/deleteEven.ajax option:', option);
        request.post(option, (error, response, body) => {
            console.log('/cashMgmt/livingPay/districtMgmt/deleteEven.ajax error:', error);
            console.log('/cashMgmt/livingPay/districtMgmt/deleteEven.ajax statusCode:', response && response.statusCode);
            console.log('/cashMgmt/livingPay/districtMgmt/deleteEven.ajax body:', body);
            if (error) {
                return res.send({ error: 1, msg: '删除区域失败' });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                res.send({ error: 0, msg: '删除区域成功', data: result.body});
            }
            else {
                res.send({ error: 1, msg: '删除区域失败'});
            }
        });
    });
};