const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').socialMgmt.hotChat;
module.exports = function (app) {
    // 通用返回处理
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

    // 获取初始数据和查询
    app.post('/messageCenter/socialMgmt/hotChat/getTableData.ajax', (req, res, next) => {
        let params = req.body;
        // req.body.pageNo && (params.pageNo = req.body.pageNo);
        // req.body.pageSize && (params.pageSize = req.body.pageSize);
        // req.body.recommendType && (params.recommendType = req.body.recommendType);
        // req.body.recommendProduct && (params.recommendProduct = req.body.recommendProduct);
        let option = {
            pageUrl: '/messageCenter/socialMgmt/hotChat/getTableData.ajax',
            req: req,
            url: apiUrlList.getTableData,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, callback2page(res));
    });

    // 获取收益率
    app.post('/messageCenter/socialMgmt/hotChat/getYield.ajax', (req, res, next) => {
        let params = {};
        let option = {
            pageUrl: '/messageCenter/socialMgmt/hotChat/getYield.ajax',
            req: req,
            url: apiUrlList.getYield,
            // body: params,
            timeout: 15000,
            json: true
        };
        request(option, callback2page(res, '获取收益率类型失败'));
    });

    //新增数据
    app.post('/messageCenter/socialMgmt/hotChat/add.ajax', (req, res, next) => {
        let params = {};
        params.recommendProduct =req.body.recommendProduct;
        params.yieldType =req.body.yieldType;
        params.orderNo =req.body.orderNo;
        params.status =req.body.status;
        params.recommentType =req.body.recommentType;
        let option = {
            pageUrl: '/messageCenter/socialMgmt/hotChat/add.ajax',
            req: req,
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.add,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, callback2page(res, '保存失败'));
    });
    //修改数据
    app.post('/messageCenter/socialMgmt/hotChat/update.ajax', (req, res, next) => {
        let params = {};
        params.recommendId=req.body.recommendId;
        params.recommendProduct =req.body.recommendProduct;
        params.yieldType =req.body.yieldType;
        params.orderNo =req.body.orderNo;
        params.status =req.body.status;
        let option = {
            pageUrl: '/messageCenter/socialMgmt/hotChat/update.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.update,
            body: params,
            timeout: 15000,
            json: true
        };
        request.put(option, callback2page(res, '修改失败'));
    });

    //修改状态-是否禁用-正常
    app.post('/messageCenter/socialMgmt/hotChat/updateStatus.ajax', (req, res, next) => {
        let params = {};
        params.recommendId=req.body.recommendId;
        params.status =req.body.status;
        console.log(params);
        let option = {
            pageUrl: '/messageCenter/socialMgmt/hotChat/updateStatus.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.updateStatus,
            body: params,
            timeout: 15000,
            json: true
        };
        request.put(option, callback2page(res, '修改失败'));
    });

    //删除数据
    app.post('/messageCenter/socialMgmt/hotChat/deleteParam.ajax', (req, res, next) => {
        let params = {};
        params.recommendId = req.body.recommendId;
        let option = {
            pageUrl: '/messageCenter/socialMgmt/hotChat/deleteParam.ajax',
            req: req,
            operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.deleteParam,
            qs: params,
            timeout: 15000,
            json: true
        };
        request.del(option, callback2page(res, '删除失败'));
    });
};

