const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').livingPay;
module.exports = function (app) {
    //选框地址获取
    app.post('/cashMgmt/livingPay/companyMgmt/codeList.ajax', (req, res, next) => {
        let option = {
            session: req.session,
            url: apiUrlList.codeList,
            timeout: 15000,
            json: true
        };
        console.log('/cashMgmt/livingPay/companyMgmt/codeList.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/cashMgmt/livingPay/companyMgmt/codeList.ajax error:', error);
            console.log('/cashMgmt/livingPay/companyMgmt/codeList.ajax statusCode:', response && response.statusCode);
            console.log('/cashMgmt/livingPay/companyMgmt/codeList.ajax body:', body);
            if (error) {
                return res.send({ error: 1, msg: '地区获取失败' });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                res.send({ error: 0, msg: '地区获取成功', data: result.body});
            }
            else if (result && result.returnCode != 9999) {
                res.send({ error: 1, msg: result.returnMsg });
            }
            else {
                res.send({error: 1, msg: '地区获取失败'});
            }
        });
    });
    //缴费类型列表
    app.post('/cashMgmt/livingPay/companyMgmt/typeList.ajax', (req, res, next) => {
        let option = {
            session: req.session,
            url: apiUrlList.typeList,
            timeout: 15000,
            json: true
        };
        console.log('/cashMgmt/livingPay/companyMgmt/typeList.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/cashMgmt/livingPay/companyMgmt/typeList.ajax error:', error);
            console.log('/cashMgmt/livingPay/companyMgmt/typeList.ajax statusCode:', response && response.statusCode);
            console.log('/cashMgmt/livingPay/companyMgmt/typeList.ajax body:', body);
            if (error) {
                return res.send({ error: 1, msg: '缴费类型获取失败' });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                res.send({ error: 0, msg: '缴费类型获取成功', data: result.body });
            }
            else if (result && result.returnCode != 9999) {
                res.send({ error: 1, msg: result.returnMsg });
            }
            else {
                res.send({error: 1, msg: '缴费类型获取失败'});
            }
        });
    });
    //表格数据获取
    app.post('/cashMgmt/livingPay/companyMgmt/getList.ajax', (req, res, next) => {
        let para = req.body;
        let params={};
        for(var o in para){
            console.log(o + ":" + para[o]);
            params[o]=para[o];
        }
        let option = {
            session: req.session,
            url: apiUrlList.list,
            timeout: 15000,
            json: true,
            formData: params
        };
        console.log('/cashMgmt/livingPay/companyMgmt/getList.ajax option:', option);
        request.post(option, (error, response, body) => {
            console.log('/cashMgmt/livingPay/companyMgmt/getList.ajax error:', error);
            console.log('/cashMgmt/livingPay/companyMgmt/getList.ajax statusCode:', response && response.statusCode);
            console.log('/cashMgmt/livingPay/companyMgmt/getList.ajax body:', body);
            if (error) {
                return res.send({ error: 1, msg: '查询失败' });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                let data = result.body;

                if (data && Array.isArray(data.formList)) {
                    data.formList.forEach((item) => {
                        item.check = false;
                    });
                }
                res.send({error: 0, msg: '查询成功', data:data});
            } 
            else if (result && result.returnCode != 9999){
                res.send({ error: 1, msg: result.returnMsg });
            }
            else {
                res.send({error: 1, msg: '查询失败'});
            }
        });
    });
    //删除机构
    app.post('/cashMgmt/livingPay/companyMgmt/deleteEven.ajax', (req, res, next) => {
        var params=req.query.ids;
        let option = {
            session: req.session,
            url: apiUrlList.deleteEven+"?ids="+params,
            timeout: 15000,
            json: true
        };
        console.log('/cashMgmt/livingPay/companyMgmt/deleteEven.ajax option:', option);
        request.post(option, (error, response, body) => {
            console.log('/cashMgmt/livingPay/companyMgmt/deleteEven.ajax error:', error);
            console.log('/cashMgmt/livingPay/companyMgmt/deleteEven.ajax statusCode:', response && response.statusCode);
            console.log('/cashMgmt/livingPay/companyMgmt/deleteEven.ajax body:', body);
            if (error) {
                return res.send({ error: 1, msg: '删除机构失败' });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                res.send({ error: 0, msg: '删除机构成功', data: result.body});
            }
            else if (result && result.returnCode != 9999) {
                res.send({ error: 1, msg: result.returnMsg });
            }
            else {
                res.send({ error: 1, msg: '删除机构失败'});
            }
        });
    });
    //修改机构
    app.post('/cashMgmt/livingPay/companyMgmt/companyvo.ajax', (req, res, next) => {
        var params=req.query.companyId;
        console.log('/cashMgmt/livingPay/companyMgmt/companyvo.ajax params:'+params);
        let option = {
            session: req.session,
            url: apiUrlList.companyvo+"?companyId="+params,
            timeout: 15000,
            json: true
        };
        console.log('/cashMgmt/livingPay/companyMgmt/companyvo.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/cashMgmt/livingPay/companyMgmt/companyvo.ajax error:', error);
            console.log('/cashMgmt/livingPay/companyMgmt/companyvo.ajax statusCode:', response && response.statusCode);
            console.log('/cashMgmt/livingPay/companyMgmt/companyvo.ajax body:', body);
            if (error) {
                return res.send({ error: 1, msg: '获取机构失败' });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result) {
                res.send({error: 0, msg: '获取机构成功', data: result.body});
            }
            else if (result && result.returnCode != 9999) {
                res.send({ error: 1, msg: result.returnMsg });
            }
            else {
                res.send({error: 1, msg: '获取机构失败'});
            }
        });
    });
    //新增
    app.post('/cashMgmt/livingPay/companyMgmt/utilityCompany.ajax', (req, res, next) => {
        let para = req.body;
        let params={};
        for(var o in para){
            console.log(o + ":" + para[o]);
            params[o]=para[o];
        }
        if(Array.isArray(params.districtCode)&&params.districtCode.length>0){
            params.districtCode=params.districtCode.join();
        }
        let option = {
            session: req.session,
            url: apiUrlList.utilityCompany,
            timeout: 15000,
            json: true,
            body: params
        };
        console.log('/cashMgmt/livingPay/companyMgmt/utilityCompany.ajax option:', option);
        request.post(option, (error, response, body) => {
            console.log('/cashMgmt/livingPay/companyMgmt/utilityCompany.ajax error:', error);
            console.log('/cashMgmt/livingPay/companyMgmt/utilityCompany.ajax statusCode:', response && response.statusCode);
            console.log('/cashMgmt/livingPay/companyMgmt/utilityCompany.ajax body:', body);
            if (error) {
                return res.send({ error: 1, msg: '机构操作失败' });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                res.send({ error: 0, msg: '机构操作成功', data: result.body });
            }
            else if (result && result.returnCode != 9999) {
                res.send({ error: 1, msg: result.returnMsg });
            }
            else {
                res.send({ error: 1, msg: '机构操作失败' });
            }
        });
    });
    //账单查询测试
    app.post('/cashMgmt/livingPay/companyMgmt/queryBillTest.ajax', (req, res, next) => {
        var params =req.body;
        let option = {
            session: req.session,
            url: apiUrlList.queryBillTest,
            timeout: 15000,
            json: true,
            body: params
        };
        console.log('/cashMgmt/livingPay/companyMgmt/queryBillTest.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/cashMgmt/livingPay/companyMgmt/queryBillTest.ajax error:', error);
            console.log('/cashMgmt/livingPay/companyMgmt/queryBillTest.ajax statusCode:', response && response.statusCode);
            console.log('/cashMgmt/livingPay/companyMgmt/queryBillTest.ajax body:', body);
            if (error) {
                return res.send("测试失败");
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                res.send({ error: 0, msg: '查询账单测试成功', data: result.body });
            }
            else if (result && result.returnCode != 9999) {
                res.send({ error: 1, msg: result.returnMsg });
            }
            else {
                res.send({ error: 1, msg: '查询账单测试失败' });
            }
        });
    });
    //支付测试
    app.post('/cashMgmt/livingPay/companyMgmt/billPayTest.ajax', (req, res, next) => {
        var params =req.body;
        let option = {
            session: req.session,
            url: apiUrlList.billPayTest,
            timeout: 15000,
            json: true,
            body: params
        };
        console.log('/cashMgmt/livingPay/companyMgmt/billPayTest.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/cashMgmt/livingPay/companyMgmt/billPayTest.ajax error:', error);
            console.log('/cashMgmt/livingPay/companyMgmt/billPayTest.ajax statusCode:', response && response.statusCode);
            console.log('/cashMgmt/livingPay/companyMgmt/billPayTest.ajax body:', body);
            if (error) {
                return res.send("测试失败");
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                res.send({ error: 0, msg: '支付账单测试成功', data: result.body });
            }
            else if (result && result.returnCode != 9999) {
                res.send({ error: 1, msg: result.returnMsg });
            }
            else {
                res.send({ error: 1, msg: '支付账单测试失败' });
            }
        });
    });
};
