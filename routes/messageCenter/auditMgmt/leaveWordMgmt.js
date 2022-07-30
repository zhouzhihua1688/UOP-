const request = require('../../../local_data/requestWrapper');
const XLSX = require('xlsx');
const fs = require('fs');
const apiUrlList = require('../apiConfig').auditMgmt.leaveWordMgmt;

module.exports = function (app) {
    // 获取下拉框所需数据
    app.post('/messageCenter/auditMgmt/leaveWordMgmt/getSelectData.ajax', (req, res, next) => {
        // 获取对象类型
        let getItemType = new Promise((resolve, reject) => {
            let option = {
                pageUrl: '/messageCenter/auditMgmt/leaveWordMgmt/getSelectData.ajax',
                req: req,
                url: apiUrlList.getItemType,
                timeout: 15000,
                json: true
            };
            request(option, (error, response, body) => {
                if (error) {
                    // reject({message: '操作失败'});
                    return resolve([]);
                }
                let result = typeof body === 'string' ? JSON.parse(body) : body;
                if (result && result.returnCode == 0 && Array.isArray(result.body)) {
                    resolve(result.body);
                }
                else {
                    resolve([]);
                }
            });
        });
        // 基金经理列表
        let getManagerList = new Promise((resolve, reject) => {
            let option = {
                pageUrl: '/messageCenter/auditMgmt/leaveWordMgmt/getSelectData.ajax',
                req: req,
                url: apiUrlList.managerList,
                timeout: 15000,
                json: true
            };
            request(option, (error, response, body) => {
                if (error) {
                    // return res.send({error: 1, msg: '操作失败'});
                    return resolve({});
                }
                let result = typeof body === 'string' ? JSON.parse(body) : body;
                if (result && result.returnCode == 0 && Array.isArray(result.body)) {
                    let resultObj = {};
                    result.body.forEach((item) => {
                        resultObj = Object.assign(resultObj, item);
                    });
                    resolve(resultObj);
                }
                else {
                    resolve({});
                }
            });
        });
        Promise.all([getItemType, getManagerList]).then(([itemList, managerList]) => {
            res.send({error: 0, msg: '调用成功', data: {itemList, managerList}});
        }).catch(error => {
            res.send({error: 1, msg: error.message, data: null});
        });
    });
    // 获取列表数据
    app.post('/messageCenter/auditMgmt/leaveWordMgmt/search.ajax', (req, res, next) => {
        let getTableList = new Promise((resolve, reject) => {
            let params = req.body;
            let option = {
                // pageUrl: '/messageCenter/auditMgmt/leaveWordMgmt/search.ajax',
                req: req,
                url: apiUrlList.queryList,
                qs: params,
                timeout: 15000,
                json: true
            };
            console.log(`/messageCenter/auditMgmt/leaveWordMgmt/search.ajax option:`, option.req ? {...option, req: '#'} : option);
            request(option, (error, response, body) => {
                console.log(`/messageCenter/auditMgmt/leaveWordMgmt/search.ajax error:`, error);
                console.log(`/messageCenter/auditMgmt/leaveWordMgmt/search.ajax statusCode:`, response && response.statusCode);
                console.log(`/messageCenter/auditMgmt/leaveWordMgmt/search.ajax body: ******`);
                if (error) {
                    return resolve({});
                }
                let result = typeof body === 'string' ? JSON.parse(body) : body;
                if (result && result.returnCode == 0 && Array.isArray(result.body.rows)) {
                    resolve(result.body);
                }
                else if (result && result.returnCode != 9999) {
                    resolve({});
                }
                else {
                    resolve({});
                }
            });
        });
        let getItemType = new Promise((resolve, reject) => {
            let option = {
                pageUrl: '/messageCenter/auditMgmt/leaveWordMgmt/search.ajax --getItemType',
                req: req,
                url: apiUrlList.getItemType,
                timeout: 15000,
                json: true
            };
            request(option, (error, response, body) => {
                if (error) {
                    return resolve([]);
                }
                let result = typeof body === 'string' ? JSON.parse(body) : body;
                if (result && result.returnCode == 0 && Array.isArray(result.body)) {
                    resolve(result.body);
                }
                else if (result && result.returnCode != 9999) {
                    resolve([]);
                }
                else {
                    resolve([]);
                }
            });
        });
        let getTitleList = new Promise((resolve, reject) => {
            let option = {
                pageUrl: '/messageCenter/auditMgmt/leaveWordMgmt/search.ajax --getTitleList',
                req: req,
                url: apiUrlList.getTitleList,
                timeout: 15000,
                json: true
            };
            request(option, (error, response, body) => {
                if (error) {
                    return resolve({});
                }
                let result = typeof body === 'string' ? JSON.parse(body) : body;
                if (result && result.returnCode == 0) {
                    resolve(result.body);
                }
                else if (result && result.returnCode != 9999) {
                    resolve({});
                }
                else {
                    resolve({});
                }
            });
        });
        Promise.all([getTableList, getItemType, getTitleList]).then(([tableData, itemList, titleObj]) => {
            tableData.rows.forEach(item => {
                item.updateTime = item.updateTime ? item.updateTime.slice(0, -2) : '';
                item.commentTime = formatTime(item.commentTime);
                item.commentToItemTp_desc = item.commentToItemTp;
                if (item.commentContext.length > 50) {
                    item.commentContext_desc = item.commentContext.slice(0, 50) + '...';
                }
                else {
                    item.commentContext_desc = item.commentContext;
                }
                item.commentToItemName_desc = item.commentToItemId;
                if (item.commentToItemTp == 4) {
                    item.commentToItemName_desc = titleObj[item.commentToItemId] ? titleObj[item.commentToItemId] : item.commentToItemId;
                }
                else if (item.commentToItemTp == 1) {
                    item.commentToItemName_desc = item.commentToItemName;
                }
                item.commentStatus_desc = item.commentStatus;
                // 当基金经理或者文章留言时,0:未公开,1:已公开
                if (item.commentToItemTp != 5) {
                    if (item.commentStatus == 0) {
                        item.commentStatus_desc = '未公开';
                    }
                    else if (item.commentStatus == 1) {
                        item.commentStatus_desc = '已公开';
                    }
                }
                // 当实盘时,0:待审核,1:已公开,2:未公开,3:待初审
                else if (item.commentToItemTp == 5) {
                    if (item.commentStatus == 0) {
                        item.commentStatus_desc = '待审核';
                    }
                    else if (item.commentStatus == 1) {
                        item.commentStatus_desc = '已公开';
                    }
                    else if (item.commentStatus == 2) {
                        item.commentStatus_desc = '未公开';
                    }
                    else if (item.commentStatus == 3) {
                        item.commentStatus_desc = '待初审';
                    }
                }
                for (let i = 0; i < itemList.length; i++) {
                    if (item.commentToItemTp == itemList[i].type) {
                        item.commentToItemTp_desc = itemList[i].desc;
                        break;
                    }
                }
            });
            res.send({error: 0, msg: '调用成功', data: tableData});
        }).catch(error => {
            res.send({error: 1, msg: error.message, data: null});
        });
    });
    // 刷新基金经理列表
    app.post('/messageCenter/auditMgmt/leaveWordMgmt/refreshFundManage.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/messageCenter/auditMgmt/leaveWordMgmt/refreshFundManage.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.refreshFundManage,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                res.send({error: 0, msg: '刷新成功', data: null});
            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg, data: null});
            }
            else {
                res.send({error: 1, msg: '刷新失败', data: null});
            }
        });
    });
    // 新增回复留言
    app.post('/messageCenter/auditMgmt/leaveWordMgmt/addMessage.ajax', (req, res, next) => {
        let params = {};
        params.commentId = req.body.commentId;
        params.replyContext = req.body.replyContext;
        params.commentToItemTp = req.body.commentToItemTp;
        params.modifyBy = req.session.loginInfo.username;
        if (req.body.commentToItemTp == 1) {
            params.fundManageId = req.body.fundManageId;
        }
        else if (req.body.commentToItemTp == 4) {
            params.fundManageId = '';
        }
        let option = {
            pageUrl: '/messageCenter/auditMgmt/leaveWordMgmt/addMessage.ajax',
            req: req,
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.addMessage,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                res.send({error: 0, msg: '查询成功', data: result.body});
            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: 1, msg: '查询失败'});
            }
        });
    });
    // 修改公开和不公开状态
    app.post('/messageCenter/auditMgmt/leaveWordMgmt/updateStatus.ajax', (req, res, next) => {
        let params = {};
        params.commentId = req.body.commentId;
        params.commentStatus = req.body.commentStatus;
        params.modifyBy = req.session.loginInfo.username;
        let option = {
            pageUrl: '/messageCenter/auditMgmt/leaveWordMgmt/updateStatus.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.updateStatus,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {

                res.send({error: 0, msg: '查询成功', data: result.body});
            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: 1, msg: '查询失败'});
            }
        });
    });
    // 获取留言详情列表
    app.post('/messageCenter/auditMgmt/leaveWordMgmt/getMessage.ajax', (req, res, next) => {
        let getTableList = new Promise((resolve, reject) => {
            let params = {};
            params.commentId = req.body.commentId;
            params.pageNo = 1;
            params.pageSize = 999999999;
            let option = {
                pageUrl: '/messageCenter/auditMgmt/leaveWordMgmt/getMessage.ajax',
                req: req,
                url: apiUrlList.getMessage,
                qs: params,
                timeout: 15000,
                json: true
            };
            request(option, (error, response, body) => {
                if (error) {
                    // return reject({message: '操作失败'});
                    return resolve({});
                }
                let result = typeof body === 'string' ? JSON.parse(body) : body;
                if (result && result.returnCode == 0 && Array.isArray(result.body.rows)) {
                    result.body.rows.forEach(item => {
                        if (item.replyContext.length > 20) {
                            item.replyContext_desc = item.replyContext.slice(0, 20) + '...';
                        }
                        else {
                            item.replyContext_desc = item.replyContext;
                        }
                        item.replyTime = formatTime(item.replyTime);
                        item.updateTime = item.updateTime ? item.updateTime.slice(0, -2) : '';
                    });
                    resolve(result.body.rows);
                }
                else if (result && result.returnCode != 9999) {
                    // reject({message: result.returnMsg});
                    resolve({});
                }
                else {
                    // reject({message: '查询失败'});
                    resolve({});
                }
            });
        });
        // 基金经理列表
        let getManagerList = new Promise((resolve, reject) => {
            let option = {
                pageUrl: '/messageCenter/auditMgmt/leaveWordMgmt/getMessage.ajax',
                req: req,
                url: apiUrlList.managerList,
                timeout: 15000,
                json: true
            };
            request(option, (error, response, body) => {
                if (error) {
                    // return res.send({error: 1, msg: '操作失败'});
                    return resolve({});
                }
                let result = typeof body === 'string' ? JSON.parse(body) : body;
                if (result && result.returnCode == 0 && Array.isArray(result.body)) {
                    let resultObj = {};
                    result.body.forEach((item) => {
                        resultObj = Object.assign(resultObj, item);
                    });
                    resolve(resultObj);
                }
                else if (result && result.returnCode != 9999) {
                    resolve({});
                }
                else {
                    resolve({});
                }
            });
        });
        Promise.all([getTableList, getManagerList]).then(([itemList, managerList]) => {
            itemList.forEach(item => {
                item.fundManageId_desc = item.fundManageId;
                if (managerList[item.fundManageId]) {
                    item.fundManageId_desc = managerList[item.fundManageId];
                }
            });
            res.send({error: 0, msg: '调用成功', data: itemList});
        }).catch(error => {
            console.log('/messageCenter/auditMgmt/leaveWordMgmt/getMessage.ajax error:', error.message);
            res.send({
                error: 0, msg: '调用出错', data: {
                    itemList: [],
                    managerList: {}
                }
            });
        });
    });
    // 删除留言内容接口
    app.post('/messageCenter/auditMgmt/leaveWordMgmt/deleteMessage.ajax', (req, res, next) => {
        var params = req.body;
        let option = {
            pageUrl: '/messageCenter/auditMgmt/leaveWordMgmt/deleteMessage.ajax',
            req: req,
            operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.deleteMessage,
            qs: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                res.send({error: 0, msg: '查询成功', data: result.body});
            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: 1, msg: '查询失败'});
            }
        });
    });
    // 修改留言内容接口
    app.post('/messageCenter/auditMgmt/leaveWordMgmt/modifyMessage.ajax', (req, res, next) => {
        let params = {};
        params.replyId = req.body.replyId;
        params.commentId = req.body.commentId;
        params.replyContext = req.body.replyContext;
        params.commentToItemTp = req.body.commentToItemTp;
        params.modifyBy = req.session.loginInfo.username;
        if (req.body.commentToItemTp == 1) {
            params.fundManageId = req.body.fundManageId;
        }
        else if (req.body.commentToItemTp == 4) {
            params.fundManageId = '';
        }
        let option = {
            pageUrl: '/messageCenter/auditMgmt/leaveWordMgmt/modifyMessage.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.modifyMessage,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                res.send({error: 0, msg: '查询成功', data: result.body});
            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: 1, msg: '查询失败'});
            }
        });
    });
    // 导出Excel表格
    app.get('/messageCenter/auditMgmt/leaveWordMgmt/exportExcel.ajax', (req, res, next) => {
        let params = req.query;
        let option = {
            pageUrl: '/messageCenter/auditMgmt/leaveWordMgmt/exportExcel.ajax',
            req: req,
            url: apiUrlList.queryList,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                let data = result.body.rows;
                if (data && Array.isArray(data) && data.length > 0) {
                    var arr = [["留言编号", "用户编号", "姓名", '昵称', '手机号', '留言内容', '留言对象', '留言时间', '公开人', '公开时间']];
                    data.forEach(function (item) {
                        arr.push([item.commentId, item.custNo, item.custName, item.nickname, item.mobileNo, item.commentContext, item.commentToItemName, formatTime(item.commentTime), item.modifyBy, item.updateTime])
                    });
                    const stream = require('stream');
                    const book = XLSX.utils.book_new();
                    const sheet = XLSX.utils.aoa_to_sheet(arr);
                    XLSX.utils.book_append_sheet(book, sheet, "test");
                    const fileContents = XLSX.write(book, {type: 'buffer', bookType: 'xlsx', bookSST: false});
                    let readStream = new stream.PassThrough();
                    readStream.end(fileContents);
                    let fileName = params.startTime + '~' + params.endTime + ".xlsx";
                    res.set('Content-disposition', 'attachment; filename=' + fileName);
                    res.set('Content-Type', 'text/plain');
                    readStream.pipe(res);
                } else {
                    res.send('该时间段无有效数据');
                }

            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: 1, msg: '查询失败'});
            }
        });
    });
};

function formatTime(date) {
    let d = new Date(date);
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let day = d.getDate();
    let hour = d.getHours();
    let minute = d.getMinutes();
    let second = d.getSeconds();

    function fixZero(n) {
        return n < 10 ? '0' + n : n;
    }

    return [year, month, day].map(fixZero).join('-') + ' ' + [hour, minute, second].map(fixZero).join(':');
}
