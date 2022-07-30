const request = require('../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').topUpOrtake.specialCust;
module.exports = function (app) {

    // 获取  初始数据和查询
    app.post('/customerService/topUpOrtake/specialCust/getTableData.ajax', (req, res, next) => {
        let params ={};
        params.invNm=req.body.invnm;
        params.idNo=req.body.idno;
        params.invTp="1";
        params.idTp="0";
            // userName = req.session.loginInfo.username;
        let option = {
            // session: req.session,
            // pageUrl: '/customerService/topUpOrtake/specialCust/getTableData.ajax',
            req: req,
            url: apiUrl.getTableData,
            qs: params,
            timeout: 15000,
            json: true
        };
        // console.log('/customerService/topUpOrtake/specialCust/getTableData.ajax option:', option);
        console.log('/customerService/topUpOrtake/specialCust/getTableData.ajax option:', option.req ? {
            ...option,
            req: '#',
            body: '******'
        } : option);
        request(option, (error, response, body) => {
            console.log('/customerService/topUpOrtake/specialCust/getTableData.ajax error:', error);
            console.log('/customerService/topUpOrtake/specialCust/getTableData.ajax statusCode:', response && response.statusCode);
            console.log('/customerService/topUpOrtake/specialCust/getTableData.ajax body: ******');
            if (error) {
                return res.send({
                    error: 1,
                    msg: '数据获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {

                res.send({
                    error: 0,
                    msg: '调用成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '数据获取失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
    // 获取客户数据和查询
    app.post('/customerService/topUpOrtake/specialCust/geiInfo.ajax', (req, res, next) => {
        let params ={};
        params.custno=req.body.custno;
        params.branchCode=req.body.branchCode;
        let option = {
            // session: req.session,
            // pageUrl: '/customerService/topUpOrtake/specialCust/getTableData.ajax',
            req: req,
            url: apiUrl.geiInfo,
            qs: params,
            timeout: 15000,
            json: true
        };
        // console.log('/customerService/topUpOrtake/specialCust/getTableData.ajax option:', option);
        console.log('/customerService/topUpOrtake/specialCust/geiInfo.ajax option:', option.req ? {
            ...option,
            req: '#',
            body: '******'
        } : option);
        request(option, (error, response, body) => {
            console.log('/customerService/topUpOrtake/specialCust/geiInfo.ajax error:', error);
            console.log('/customerService/topUpOrtake/specialCust/geiInfo.ajax statusCode:', response && response.statusCode);
            console.log('/customerService/topUpOrtake/specialCust/geiInfo.ajax body: ******');
            if (error) {
                return res.send({
                    error: 1,
                    msg: '数据获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {

                res.send({
                    error: 0,
                    msg: '调用成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '数据获取失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
    // 提交
    app.post('/customerService/topUpOrtake/specialCust/submitData.ajax', (req, res, next) => {
        let params ={};
            params.daydef=req.body.daydef;
            params.endtm=req.body.endtm;
            params.idno=req.body.idno;
            params.invnm=req.body.invnm;
            params.monthdef=req.body.monthdef;
            params.singledef=req.body.singledef;
            params.starttm=req.body.starttm;
        let option = {
            // session: req.session,
            pageUrl: '/customerService/topUpOrtake/specialCust/submitData.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrl.savaData,
            body: params,
            timeout: 15000,
            json: true
        };
        // console.log('/customerService/topUpOrtake/specialCust/submitData.ajax option:', option);
        request.post(option, (error, response, body) => {
            // console.log('/customerService/topUpOrtake/specialCust/submitData.ajax error:', error);
            // console.log('/customerService/topUpOrtake/specialCust/submitData.ajax statusCode:', response && response.statusCode);
            // console.log('/customerService/topUpOrtake/specialCust/submitData.ajax body:', body);
            if (error) {
                return res.send({
                    error: 1,
                    msg: '数据获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {

                res.send({
                    error: 0,
                    msg: '调用成功',
                    data:null
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '数据获取失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });


    // 获取  提交修改后数据
    // app.post('/customerService/selfFundManage/staticFund/submitData.ajax', (req, res, next) => {
    //     let params = JSON.parse(req.body.data);
    //     let option = {
    //         session: req.session,
    //         url: apiUrl.submitData,
    //         headers: {
    //             operator: req.session.loginInfo.userid
    //         },
    //         body: params,
    //         timeout: 15000,
    //         json: true
    //     };
    //     console.log('/customerService/selfFundManage/staticFund/submitData.ajax option:', option);
    //     request.put(option, (error, response, body) => {
    //         console.log('/customerService/selfFundManage/staticFund/submitData.ajax error:', error);
    //         console.log('/customerService/selfFundManage/staticFund/submitData.ajax statusCode:', response && response.statusCode);
    //         console.log('/customerService/selfFundManage/staticFund/submitData.ajax body:', body);
    //         if (error) {
    //             return res.send({
    //                 error: 1,
    //                 msg: '提交失败'
    //             });
    //         }
    //         let result = typeof body === 'string' ? JSON.parse(body) : body;
    //         if (result && result.returnCode == '0') {
    //
    //             res.send({
    //                 error: 0,
    //                 msg: '提交成功',
    //                 data: result.body
    //             });
    //         } else if (result && result.returnCode == 9999) {
    //             res.send({
    //                 error: 1,
    //                 msg: '提交失败'
    //             });
    //         } else {
    //             res.send({
    //                 error: 1,
    //                 msg: result.returnMsg
    //             });
    //         }
    //     });
    // });

};