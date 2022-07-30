const request = require('../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').topUpOrtake.dealQuota;
module.exports = function (app) {

    // 获取  初始数据和查询
    app.post('/customerService/topUpOrtake/dealQuota/getTableData.ajax', (req, res, next) => {
        let option = {
            // session: req.session,
            req: req,
            url: apiUrl.getTableData,
            // qs: params,
            timeout: 15000,
            json: true
        };
        // console.log('/customerService/topUpOrtake/dealQuota/getTableData.ajax option:', option);
        console.log('/customerService/topUpOrtake/dealQuota/getTableData.ajax option:', option.req ? {
            ...option,
            req: '#',
            body: '******'
        } : option);
        request(option, (error, response, body) => {
            console.log('/customerService/topUpOrtake/dealQuota/getTableData.ajax error:', error);
            console.log('/customerService/topUpOrtake/dealQuota/getTableData.ajax statusCode:', response && response.statusCode);
            console.log('/customerService/topUpOrtake/dealQuota/getTableData.ajax body: ******');
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
    //新增
    app.post('/customerService/topUpOrtake/dealQuota/submitData.ajax', (req, res, next) => {
        let params ={}
            params.branchnm=req.body.branchnm,
            params.branchcode=req.body.branchcode,
            params.apkind=req.body.apkind,
            params.subapkind= req.body.subapkind,
            params.daydef=req.body.daydef,
            params.remark=req.body.remark,
            params.seqid=req.body.seqid,
            params.starttm=req.body.starttm,
            params.endtm=req.body.endtm,
            params.type=req.body.type
        let option = {
            // session: req.session,
            pageUrl: '/customerService/topUpOrtake/dealQuota/submitData.ajax',
            req: req,
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrl.submitData,
            // headers: {
            //     operator: req.session.loginInfo.userid
            // },
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '提交失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {

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

    //修改
    app.post('/customerService/topUpOrtake/dealQuota/submitUpdate.ajax', (req, res, next) => {
        let params ={}
        params.branchnm=req.body.branchnm,
            params.branchcode=req.body.branchcode,
            params.apkind=req.body.apkind,
            params.subapkind= req.body.subapkind,
            params.daydef=req.body.daydef,
            params.remark=req.body.remark,
            params.seqid=req.body.seqid,
            params.starttm=req.body.starttm,
            params.endtm=req.body.endtm,
            params.type=req.body.type
        let option = {
            // session: req.session,
            pageUrl: '/customerService/topUpOrtake/dealQuota/submitUpdate.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrl.submitUpdate,
            // headers: {
            //     operator: req.session.loginInfo.userid
            // },
            body: params,
            timeout: 15000,
            json: true
        };
        request.put(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '提交失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {

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

    //获取渠道信息列表
    app.post('/customerService/topUpOrtake/dealQuota/getChannel.ajax', (req, res, next) => {
        let option = {
            session: req.session,
            url: apiUrl.getChannel,
            // qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/customerService/topUpOrtake/dealQuota/getChannel.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/customerService/topUpOrtake/dealQuota/getChannel.ajax error:', error);
            console.log('/customerService/topUpOrtake/dealQuota/getChannel.ajax statusCode:', response && response.statusCode);
            console.log('/customerService/topUpOrtake/dealQuota/getChannel.ajax body: ******');
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
};