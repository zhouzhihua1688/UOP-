const request = require('./../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').IPOMgmtOCReview.transferWhitelist;

module.exports = function (app) {
    // 获取基金id数据
    app.post('/businessMgmt/IPOMgmtOCReview/transferWhitelist/fundIdNameList.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/businessMgmt/IPOMgmtOCReview/transferWhitelist/fundIdNameList.ajax',
            req,
            url: apiUrlList.fundIdNameList,
            timeout: 15000,
            json: true
        };
        request(option, callback2page(res, '获取基金ID列表数据失败'));
    });
    // 查询基金列表数据
    app.post('/businessMgmt/IPOMgmtOCReview/transferWhitelist/tableData.ajax', (req, res, next) => {
        let params = req.body
        let option = {
            pageUrl: '/businessMgmt/IPOMgmtOCReview/transferWhitelist/tableData.ajax',
            req,
            url: apiUrlList.tableData,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option, callback2page(res, '获取基金列表数据失败'));
    });
    //新增更新
    app.post('/businessMgmt/IPOMgmtOCReview/transferWhitelist/add.ajax', (req, res, next) => {
        try {
            
            let params = {};
            params.exportFundid = req.body.exportFundid;
            params.importFundid = req.body.importFundid;
            let option = {
                pageUrl: '/businessMgmt/IPOMgmtOCReview/transferWhitelist/add.ajax',
                req,
                operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
                url: apiUrlList.add,
                body: [params],   //参数为数组
                timeout: 15000,
                json: true
            };
            request.post(option, callback2page(res));
        } catch (error) {
            console.log('error=', error)
        }
    });
    //删除
    app.post('/businessMgmt/IPOMgmtOCReview/transferWhitelist/delete.ajax', (req, res, next) => {
        let params = {};
        params.exportFundid = req.body.exportFundid;
        params.importFundid = req.body.importFundid;
        params.serialno = req.body.serialno;
        let option = {
            pageUrl: '/businessMgmt/IPOMgmtOCReview/transferWhitelist/delete.ajax',
            req,
            operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.delete,
            body: [params],   //参数为数组
            timeout: 15000,
            json: true
        };
        request.del(option, callback2page(res));
    });

    let callback2page = (res, errorMsg) => {
        return (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: errorMsg ? errorMsg : '操作失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: '操作成功',
                    data: result.body
                });
            } else if (result && result.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                res.send({
                    error: 1,
                    msg: errorMsg ? errorMsg : '操作失败'
                });
            }
        };
    }


    // // 复核
    // app.post('/businessMgmt/IPOMgmtOCReview/transferWhitelist/approve.ajax', (req, res, next) => {
    //     let params = req.body
    //     params.approveUser = req.session.loginInfo.userid;
    //     let option = {
    //         pageUrl: '/businessMgmt/IPOMgmtOCReview/transferWhitelist/approve.ajax',
    //         req,
    //         operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
    //         url: apiUrlList.approve,
    //         body: params,
    //         timeout: 15000,
    //         json: true
    //     };
    //     request.post(option, (error, response, body) => {
    //         if (error) {
    //             return res.send({
    //                 error: 1,
    //                 msg: '操作失败',
    //                 data: null
    //             });
    //         }
    //         if (body && body.returnCode == 0) {
    //             res.send({
    //                 error: 0,
    //                 msg: '操作成功',
    //                 data: body.body
    //             });
    //         } else if (body.returnCode != 0 && body.returnCode != 9999) {
    //             res.send({
    //                 error: 1,
    //                 msg: body.returnMsg,
    //                 data: null
    //             });
    //         } else {
    //             res.send({
    //                 error: 1,
    //                 msg: '操作失败',
    //                 data: null
    //             });
    //         }
    //     });
    // });


};