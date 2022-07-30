const request = require('./../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').investmentStrategy.publishSetting;
const investTableName = 'uop_log_invest';
module.exports = function (app) {
    // 获取初始数据和查询
    app.post('/investmentMgmt/investmentStrategy/publishSetting/getTableData.ajax', (req, res, next) => {
        let params = {};
        params.pageNo = parseInt(req.body.pageNo);
        params.pageSize = parseInt(req.body.pageSize);
        req.body.groupId && (params.groupId = req.body.groupId)
        req.body.branchCode && (params.branchCode = req.body.branchCode)
        req.body.acceptMode && (params.acceptMode = req.body.acceptMode)
        let option = {
            pageUrl: '/investmentMgmt/investmentStrategy/publishSetting/getTableData.ajax',
            req,
            url: apiUrlList.getTableData,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '查询失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {
                let data = result.body;
                // data.userId=userId;
                // data.pages = Math.ceil(data.total / params.pageSize);//最大页码
                // data.pageNum = params.pageNo;//当前页
                res.send({
                    error: 0,
                    msg: '查询成功',
                    data: data
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
    // 获取所有组合
    app.post('/investmentMgmt/investmentStrategy/publishSetting/fundGroups.ajax', (req, res, next) => {
        let params = {}
        params.groupId = "ALL";
        let option = {
            pageUrl: '/investmentMgmt/investmentStrategy/publishSetting/fundGroups.ajax',
            req,
            url: apiUrlList.fundGroups,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '操作失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0) {
                return res.send({
                    error: 0,
                    msg: '获取成功',
                    data: result
                });
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '获取失败'
                });
            }
        });
    });
    // 获取网点类型下拉数据
    app.post('/investmentMgmt/investmentStrategy/publishSetting/branchCodeList.ajax', (req, res, next) => {
        let params = {};
        params.pmst = req.body.pmst;
        params.pmkey = req.body.pmkey;
        let option = {
            pageUrl: '/investmentMgmt/investmentStrategy/publishSetting/branchCodeList.aja',
            req,
            url: apiUrlList.branchCodeList,
            qs: params,
            timeout: 15000,
            json: true
        };

        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '操作网点号失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0) {
                // return res.send({
                //     error: 0,
                //     msg: '获取成功',
                //     data: result
                // });

                result.body = result.body.filter(item => item.pmv1 !== 'A' && item.pmv1 !== 'C');
                return res.send({
                    error: 0,
                    msg: '获取网点号成功',
                    data: result
                });
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '获取网点号失败'
                });
            }
        });

    });
    // 批量新增
    app.post('/investmentMgmt/investmentStrategy/publishSetting/add.ajax', (req, res, next) => {
        let params = req.body.params;
        console.log('params---', params);
        params = params.map(function (item) {
            delete item.allTime;
            return item
        });
        let options = {
            pageUrl: '/investmentMgmt/investmentStrategy/publishSetting/add.ajax',
            req,
            url: apiUrlList.create,
            params,
            timeout: 15000,
            json: true
        };
        function addSingle(item, index) {
            return new Promise((resolve, reject) => {
                let option = {
                    pageUrl: '/investmentMgmt/investmentStrategy/publishSetting/add.ajax',
                    req,
                    url: apiUrlList.create,
                    body: item,
                    timeout: 15000,
                    json: true
                };
                request.post(option, (error, response, body) => {
                    if (error) {
                        return resolve({
                            error: 1,
                            msg: `第${index}条操作新增失败`,
                            code: item.groupid
                        });
                    }
                    let result = typeof body === 'string' ? JSON.parse(body) : body;
                    if (result.returnCode == 0) {
                        return resolve({
                            error: 0,
                            msg: '操作新增成功',
                            code: item.groupid
                        });
                    } else if (result && result.returnCode != 9999) {
                        return resolve({
                            error: 1,
                            msg: result.returnMsg,
                            code: item.groupid
                        });
                    } else {
                        return resolve({
                            error: 1,
                            msg: result.returnMsg,
                            code: item.groupid
                        });
                    }
                });
            })
        }
        Promise.all(params.map((item, index) => addSingle(item, index))).then((resultArr) => {
            let allSuccses = resultArr.every((item) => {
                return item.error != 1
            })
            if (allSuccses) {
                sysLogger(1,req, options, {result:'新增成功'},investTableName);
                return res.send({
                    error: 0,
                    msg: '新增成功'
                })
            } else {
                let errorMsg = '';
                resultArr.forEach((items, indexs, arr) => {
                    if (indexs + 1 == arr.length) {
                        errorMsg += `${items.code}:${items.msg}`
                    } else {
                        errorMsg += `${items.code}:${items.msg}、`
                    }
                })
                sysLogger(1, req, options, {result:errorMsg},investTableName);
                return res.send({
                    error: 1,
                    msg: errorMsg
                })
            }
        })



    });
    // 删除
    app.post('/investmentMgmt/investmentStrategy/publishSetting/del.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/investmentMgmt/investmentStrategy/publishSetting/del.ajax',
            req,
            operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.del,
            qs: req.body,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                sysLogger(option.operateType, option.req, option, {result:'操作失败'},investTableName);
                return res.send({
                    error: 1,
                    msg: '操作失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0) {
                sysLogger(option.operateType, option.req, option, {result:'操作成功'},investTableName);
                return res.send({
                    error: 0,
                    msg: '操作成功',
                });
            } else if (result && result.returnCode != 9999) {
                sysLogger(option.operateType, option.req, option, {result:result.returnMsg},investTableName);
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                sysLogger(option.operateType, option.req, option, {result:result.returnMsg},investTableName);
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
};