const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').wechatPublicMgmt.customMenuMgmt;
module.exports = function (app) {
    //查询
    // 获取初始数据和查询
    app.post('/publicConfig/wechatPublicMgmt/customMenuMgmt/getTableData.ajax', (req, res, next) => {
        let params = {};
        params.weixinSystem = req.body.weixinSystem;
        let option = {
            pageUrl: '/publicConfig/wechatPublicMgmt/customMenuMgmt/getTableData.ajax',
            req: req,
            url: apiUrlList.getTableData,
            qs: params,
            timeout: 15000,
            json: true
        };
        request.get(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '查询失败或请求超过相应次数'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            console.log(result, '---result----');
            if (result && result.returnCode == '0') {
                // var resultData=result.body;
                // resultData.forEach((item) => {
                //     item.check = false;
                // });
                let resultData = {};
                resultData.tableData = result.body;
                resultData.tableData.map(function(item){
                    item.noDisabled=true;
                })
                return res.send({
                    error: 0,
                    msg: '查询成功',
                    data: resultData
                });
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '查询失败或请求超过相应次数'
                });
            }
        });
    });

    // 添加
    // app.post('/publicConfig/wechatPublicMgmt/systemConfigMgmt/saveParam.ajax', (req, res, next) => {
    //     let params = {};
    //     params.system = req.body.system;
    //     params.pkey = req.body.pkey;
    //     params.version = req.body.version;
    //     params.pname=req.body.pname;
    //     params.plevel = req.body.plevel;
    //     params.pvalue = req.body.pvalue;
    //     params.remark=req.body.remark;
    //     params.enable=req.body.enable;
    //     let option = {
    //         pageUrl: '/publicConfig/wechatPublicMgmt/systemConfigMgmt/saveParam.ajax',
    //         req,
    //         operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
    //         url: apiUrlList.saveParam,
    //         body: params,
    //         timeout: 15000,
    //         json: true
    //     };
    //     request.post(option, (error, response, body) => {
    //         if (error) {
    //             return res.send({
    //                 error: 1,
    //                 msg: '保存失败'
    //             });
    //         }
    //         let result = typeof body === 'string' ? JSON.parse(body) : body;
    //         if (result && result.returnCode == 0) {
    //             return res.send({
    //                 error: 0,
    //                 msg: '保存成功'
    //             });
    //         } else if (result && result.returnCode != 9999) {
    //             return res.send({
    //                 error: 1,
    //                 msg: result.returnMsg
    //             });
    //         } else {
    //             return res.send({
    //                 error: 1,
    //                 msg: '保存失败'
    //             });
    //         }
    //     });
    // });
    
    // 修改
    app.post('/publicConfig/wechatPublicMgmt/customMenuMgmt/update.ajax', (req, res, next) => {
        let params = {};
        params.weixinSystem = req.body.weixinSystem;
        var  menuButtonList=JSON.parse(JSON.parse(req.body.menuButtonList))
        let option = {
            pageUrl: '/publicConfig/wechatPublicMgmt/customMenuMgmt/update.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.update,
            body:menuButtonList,
            qs:params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '修改失败',
                    data: null
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: '修改成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '修改失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });

    // 删除
    app.post('/publicConfig/wechatPublicMgmt/systemConfigMgmt/deleteParam.ajax', (req, res, next) => {
        let params = {};
        params.system = req.body.system;
        params.pKey = req.body.pkey;
        params.version = req.body.version;
        let option = {
            pageUrl: '/publicConfig/wechatPublicMgmt/systemConfigMgmt/deleteParam.ajax',
            req,
            operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.deleteParam,
            qs: params,
            timeout: 15000,
            json: true
        };
        request.get(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '删除失败',
                    data: null
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                return res.send({
                    error: 0,
                    msg: '删除成功',
                    data: null
                });
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '删除失败',
                    data: null
                });
            }
        });
    });
};