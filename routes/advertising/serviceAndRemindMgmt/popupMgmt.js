const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').serviceAndRemindMgmt.popupMgmt;
const baseUrl = '/advertising/serviceAndRemindMgmt/popupMgmt';
module.exports = function (app) {
    // 获取初始数据和查询
    app.post('/advertising/serviceAndRemindMgmt/popupMgmt/getTableData.ajax', (req, res, next) => {
        let params = {};
        params.module = req.body.module;
        params.popupType = req.body.popupType;
        params.searchInfo= req.body.searchInfo;
        params.page = req.body.page;
        params.size = req.body.size;
        params.startTime = req.body.startTime;
        params.endTime = req.body.endTime;
        let option = {
            pageUrl: '/advertising/productMaterialMgmt/productList/getTableData.ajax',
            req,
            url: apiUrlList.getTableData,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '查询失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            console.log("body==", body);
            console.log("result==", result);
            if (result && result.returnCode === 0) {
                return res.send({
                    error: 0,
                    msg: '查询成功',
                    data: body
                });
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '查询失败'
                });
            }
        });
    });
    // 新增
    app.post(`${baseUrl}/add.ajax`, (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: `${baseUrl}/add.ajax`,
            req: req,
            // operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.add,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '保存失败',
                    data: null
                });
            }
            if (body.returnCode === 0) {
                res.send({
                    error: 0,
                    msg: '保存成功',
                    data: null
                });
            } else if (body && body.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: body.returnMsg,
                    data: null
                });
            } else {
                res.send({
                    error: 1,
                    msg: '保存失败',
                    data: null
                });
            }
        });
    });
    // 查询单个弹窗信息
    app.post('/advertising/serviceAndRemindMgmt/popupMgmt/searchSingle.ajax', (req, res, next) => {
        let params = {};
        params.popup = req.body.id;
        let option = {
            pageUrl: '/advertising/serviceAndRemindMgmt/popupMgmt/searchSingle.ajax',
            req,
            // operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.searchSingle + `/${req.body.id}`,
            // qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '查询单个产品失败',
                    data: null
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode === 0) {
                return res.send({
                    error: 0,
                    msg: '查询单个产品成功',
                    data: body
                });
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '查询单个产品失败',
                    data: null
                });
            }
        });
    });

    // 修改
    app.post(`${baseUrl}/update.ajax`, (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: `${baseUrl}/update.ajax`,
            req: req,
            // operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.update + `/${req.body.id}`,
            body: params,
            timeout: 15000,
            json: true
        };
        request.patch(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '修改失败',
                    data: null
                });
            }
            if (body.returnCode === 0) {
                res.send({
                    error: 0,
                    msg: '修改成功',
                    data: null
                });
            } else if (body && body.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: body.returnMsg,
                    data: null
                });
            } else {
                res.send({
                    error: 1,
                    msg: '修改失败',
                    data: null
                });
            }
        });
    });

    // 删除
    app.post('/advertising/serviceAndRemindMgmt/popupMgmt/deleteParam.ajax', (req, res, next) => {
        let params = {};
        params.id = req.body.id;
        let option = {
            pageUrl: '/advertising/serviceAndRemindMgmt/popupMgmt/deleteParam.ajax',
            req,
            operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.deleteParam + `/${req.body.id}`,
            // qs: params,
            timeout: 15000,
            json: true
        };
        request.delete(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '删除失败',
                    data: null
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode === 0) {
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

    // 文章列表修改发布的状态-开关
    app.post('/advertising/serviceAndRemindMgmt/popupMgmt/switchUpdate.ajax', (req, res, next) => {
        let params = {};
        params.id = req.body.id;
        params.publishStatus = req.body.publishStatus;
        let option = {
            pageUrl: '/advertising/serviceAndRemindMgmt/popupMgmt/switchUpdate.ajax',
            req,
            url: apiUrlList.switchUpdate,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '操作发布的状态失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            console.log("body==", body);
            console.log("result==", result);
            if (result && result.returnCode === 0) {
                return res.send({
                    error: 0,
                    msg: '操作发布的状态成功',
                    data: body
                });
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '操作发布的状态失败'
                });
            }
        });
    });

    // 查询弹窗里文章列表数据
    app.post('/advertising/serviceAndRemindMgmt/popupMgmt/getPvData.ajax', (req, res, next) => {
        let params = {};
        params.searchTitle=req.body.searchTitle;
        params.sourceMaterialType=req.body.sourceMaterialType;
        params.page=req.body.page;
        params.size=req.body.size;
        params.startTime=req.body.startTime;
        params.endTime=req.body.endTime;
        let option = {
            pageUrl: '/advertising/serviceAndRemindMgmt/popupMgmt/searchSingle.ajax',
            req,
            // operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.getPvData,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '查询文章列表失败',
                    data: null
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode === 0) {
                return res.send({
                    error: 0,
                    msg: '查询文章列表成功',
                    data: body
                });
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }else if (result && result.returnCode== 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
            else {
                return res.send({
                    error: 1,
                    msg: '查询文章列表失败',
                    data: null
                });
            }
        });
    });

    // 刷新最新文章
    app.post('/advertising/serviceAndRemindMgmt/popupMgmt/getRefresh.ajax', (req, res, next) => {
        // let params = {};

        let option = {
            pageUrl: '/advertising/serviceAndRemindMgmt/popupMgmt/getRefresh.ajax',
            req,
            // operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.getRefresh,
            // body: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '刷新失败',
                    data: null
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode === 0) {
                return res.send({
                    error: 0,
                    msg: '查询文章列表成功',
                    data: null
                });
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }else if (result && result.returnCode== 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
            else {
                return res.send({
                    error: 1,
                    msg: '刷新失败',
                    data: null
                });
            }
        });
    });

}