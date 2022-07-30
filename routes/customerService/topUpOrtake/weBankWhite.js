const request = require('../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').topUpOrtake.weBankWhite;
module.exports = function (app) {

    // 获取  初始数据和查询
    app.post('/customerService/topUpOrtake/weBankWhite/getTableData.ajax', (req, res, next) => {
        let params ={};
        params.invnm=req.body.invnm;
        params.idno=req.body.idno;
        // userName = req.session.loginInfo.username;
        let option = {
            // session: req.session,
            req: req,
            url: apiUrl.getTableData,
            qs: params,
            timeout: 15000,
            json: true
        };
        // console.log('/customerService/topUpOrtake/weBankWhite/getTableData.ajax option:', option);
        console.log('/customerService/topUpOrtake/weBankWhite/getTableData.ajax option:', option.req ? {
            ...option,
            req: '#',
            body: '******'
        } : option);
        request(option, (error, response, body) => {
            console.log('/customerService/topUpOrtake/weBankWhite/getTableData.ajax error:', error);
            console.log('/customerService/topUpOrtake/weBankWhite/getTableData.ajax statusCode:', response && response.statusCode);
            console.log('/customerService/topUpOrtake/weBankWhite/getTableData.ajax body: ******');
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
    // 获取  提交修改后数据
    app.post('/customerService/topUpOrtake/weBankWhite/submitData.ajax', (req, res, next) => {
        // let params = JSON.parse(req.body.data);
        let params={}
        params.custNo=req.body.custNo;
        let option = {
            // session: req.session,
            pageUrl: '/customerService/topUpOrtake/weBankWhite/submitData.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrl.savaParams,
            // headers: {
            //     operator: req.session.loginInfo.userid
            // },
            qs: params,
            timeout: 15000,
            json: true
        };
        // console.log('/customerService/topUpOrtake/weBankWhite/submitData.ajax option:', option);
        request.post(option, (error, response, body) => {
            // console.log('/customerService/topUpOrtake/weBankWhite/submitData.ajax error:', error);
            // console.log('/customerService/topUpOrtake/weBankWhite/submitData.ajax statusCode:', response && response.statusCode);
            // console.log('/customerService/topUpOrtake/weBankWhite/submitData.ajax body:', body);
            if (error) {
                return res.send({
                    error: 1,
                    msg: '提交失败'
                });
            }
            // let result = typeof body === 'string' ? JSON.parse(body) : body;
            let result =body
            if (result.returnCode == '0') {

                res.send({
                    error: 0,
                    msg: '提交成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '提交失败'
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