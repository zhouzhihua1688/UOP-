const request = require('../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').whiteList.setting;

module.exports = function (app) {
    // 获取列表数据
    app.post('/clientMgmt/whiteList/setting/getList.ajax', (req, res, next) => {
        let promise = new Promise((resolve, reject) => {
            let params = {};
            params.custNo = req.body.custNo;
            params.custId = req.body.custId;
            params.phone = req.body.phone;
            params.userName = req.body.userName;
            params.appId = req.body.appId;
            let option = {
                // pageUrl: '/clientMgmt/whiteList/setting/getList.ajax',
                req: req,
                url: apiUrl.dataList,
                qs: params,
                timeout: 15000,
                json: true
            };
            console.log(`/clientMgmt/whiteList/setting/getList.ajax option:`, option.req ? {...option, req: '#'} : option);
            request(option, (error, response, body) => {
                console.log(`/clientMgmt/whiteList/setting/getList.ajax error:`, error);
                console.log(`/clientMgmt/whiteList/setting/getList.ajax statusCode:`, response && response.statusCode);
                console.log(`/clientMgmt/whiteList/setting/getList.ajax body: ******`);
                if (error) {
                    reject({message: '数据获取失败'});
                }
                if (body && body.returnCode == 0 && Array.isArray(body.body)) {
                    resolve(body.body);
                }
                else if (body && body.returnCode == 9999) {
                    reject({message: body.returnMsg});
                }
                else {
                    reject({message: '数据获取失败'});
                }
            });
        });
        promise.then(list => {
            list.forEach(item => item.check = false);
            res.send({error: 0, msg: '请求成功', data: list});
        }).catch(error => {
            res.send({error: 1, msg: error.message, data: null});
        });
    });
    // 新增 
    app.post('/clientMgmt/whiteList/setting/dataAdd.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/clientMgmt/whiteList/setting/dataAdd.ajax',
            req: req,
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrl.dataAdd,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '新增失败', data: null});
            }
            if (body && body.returnCode == 0) {
                res.send({error: 0, msg: '新增成功', data: null});
            }
            else if (body && body.returnCode == 9999) {
                res.send({error: 1, msg: body.returnMsg, data: null});
            }
            else {
                res.send({error: 1, msg: '新增失败', data: null});
            }
        });
    });
    // 更新
    app.post('/clientMgmt/whiteList/setting/dataUpd.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/clientMgmt/whiteList/setting/dataUpd.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrl.dataUpd,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '修改失败', data: null});
            }
            if (body && body.returnCode == 0) {
                res.send({error: 0, msg: '修改成功', data: null});
            }
            else if (body && body.returnCode == 9999) {
                res.send({error: 1, msg: body.returnMsg, data: null});
            }
            else {
                res.send({error: 1, msg: '修改失败', data: null});
            }
        });
    });
    // 删除
    app.post('/clientMgmt/whiteList/setting/dataDel.ajax', (req, res, next) => {
        let params = {
            custNo: req.body.custNo
        };
        let option = {
            pageUrl: '/clientMgmt/whiteList/setting/dataDel.ajax',
            req: req,
            operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrl.dataDel,
            qs: params,
            timeout: 15000,
            json: true
        };
        request.del(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '删除失败', data: null});
            }
            if (body && body.returnCode == 0) {
                res.send({error: 0, msg: '删除成功', data: null});
            }
            else if (body && body.returnCode == 9999) {
                res.send({error: 1, msg: body.returnMsg, data: null});
            }
            else {
                res.send({error: 1, msg: '删除失败', data: null});
            }
        });
    });
    // 批量删除
    app.post('/clientMgmt/whiteList/setting/dataDelBatch.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/clientMgmt/whiteList/setting/dataDelBatch.ajax',
            req: req,
            operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrl.batchDel,
            body: JSON.parse(req.body.custNoList).map(item => item.custNo),
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '批量删除失败', data: null});
            }
            if (body && body.returnCode == 0) {
                res.send({error: 0, msg: '批量删除成功', data: null});
            }
            else if (body && body.returnCode == 9999) {
                res.send({error: 1, msg: body.returnMsg, data: null});
            }
            else {
                res.send({error: 1, msg: '批量删除失败', data: null});
            }
        });
    });
    // 批量新增
    app.post('/clientMgmt/whiteList/setting/dataAddBatch.ajax', (req, res, next) => {
        let ExcelData = JSON.parse(req.body.ExcelData);
        let errorIds = [];
        ExcelData.forEach((item, index) => {
            for (let prop in item) {
                if (!item[prop]) {
                    errorIds.push(index + 1);
                    return;
                }
                item[prop] = String(item[prop]);
            }
            if (!item.custNo || item.custNo.length !== 10) {
                errorIds.push(index + 1);
                return;
            }
            if (!item.custId) {
                errorIds.push(index + 1);
                return;
            }
            if (item.phone && item.phone.length !== 11) {
                errorIds.push(index + 1);
                return;
            }
        });
        if (errorIds.length > 0) {
            return res.send({error: 1, msg: `检测第${errorIds.join(',')}行数据格式有误,请重新确认`, data: null});
        }
        let option = {
            pageUrl: '/clientMgmt/whiteList/setting/dataAddBatch.ajax',
            req: req,
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrl.batchAdd,
            body: ExcelData,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '批量导入失败', data: null});
            }
            if (body && body.returnCode == 0) {
                res.send({error: 0, msg: '批量导入成功', data: null});
            }
            else if (body && body.returnCode == 9999) {
                res.send({error: 1, msg: body.returnMsg, data: null});
            }
            else {
                res.send({error: 1, msg: '批量导入失败', data: null});
            }
        });
    });
};