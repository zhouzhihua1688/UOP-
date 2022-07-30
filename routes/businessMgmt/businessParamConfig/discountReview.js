const request = require('./../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').businessParamConfig.discountReview;
const tableName = 'bm_bpc_discount';

module.exports = function (app) {
    // 获取下拉列表数据
    app.post('/businessMgmt/businessParamConfig/discountReview/getDialogList.ajax', (req, res, next) => {
        // 获取交易类型翻译
        let tradeTypeList = new Promise(resolve => {
            let option = {
                pageUrl: '/businessMgmt/businessParamConfig/discountReview/getServiceList.ajax --tradeTypeList',
                req,
                url: apiUrl.translate,
                qs: {
                    pmst: 'COMMONSERVICE',
                    pmkey: 'DISC_TRADETYPE'
                },
                timeout: 15000,
                json: true
            };
            request(option, (error, response, body) => {
                if (error) {
                    return resolve([]);
                }
                if (body && body.returnCode == 0 && Array.isArray(body.body)) {
                    resolve(body.body.map(item => {
                        let obj = {};
                        obj.key = item.pmco;
                        obj.value = item.pmnm;
                        return obj;
                    }));
                } else {
                    resolve([]);
                }
            });
        });
        // 获取渠道翻译
        let channelList = new Promise(resolve => {
            let option = {
                pageUrl: '/businessMgmt/businessParamConfig/discountReview/getServiceList.ajax --channelList',
                req,
                url: apiUrl.translate,
                qs: {
                    pmst: 'COMMONSERVICE',
                    pmkey: 'CHANNEL'
                },
                timeout: 15000,
                json: true
            };
            request(option, (error, response, body) => {
                if (error) {
                    return resolve([]);
                }
                if (body && body.returnCode == 0 && Array.isArray(body.body)) {
                    resolve(body.body.map(item => {
                        let obj = {};
                        obj.key = item.pmco;
                        obj.value = item.pmnm;
                        return obj;
                    }));
                } else {
                    resolve([]);
                }
            });
        });
        // 获取产品列表
        let fundList = new Promise(resolve => {
            let option = {
                pageUrl: '/businessMgmt/businessParamConfig/discountReview/getServiceList.ajax --fundList',
                req,
                url: apiUrl.collection,
                qs: {
                    fundTypeCustomized: 'all'
                },
                timeout: 15000,
                json: true
            };
            request(option, (error, response, body) => {
                if (error) {
                    return resolve([]);
                }
                if (body && body.returnCode == 0 && Array.isArray(body.body)) {
                    resolve(body.body.map(item => {
                        return {
                            fundId: item.fundId || item.fundid,
                            fundName: item.fundName || item.fundnm,
                        };
                    }));
                } else {
                    resolve([]);
                }
            });
        });
        // 获取客户类型翻译
        let custTypeList = new Promise(resolve => {
            let option = {
                pageUrl: '/businessMgmt/businessParamConfig/discountReview/getServiceList.ajax --custTypeTranslate',
                req,
                url: apiUrl.translate,
                qs: {
                    pmst: 'COMMONSERVICE',
                    pmkey: 'CUSTTYPE'
                },
                timeout: 15000,
                json: true
            };
            request(option, (error, response, body) => {
                if (error) {
                    return resolve([]);
                }
                if (body && body.returnCode == 0 && Array.isArray(body.body)) {
                    resolve(body.body.map(item => {
                        let obj = {};
                        obj.key = item.pmco;
                        obj.value = item.pmnm;
                        return obj;
                    }));
                } else {
                    resolve([]);
                }
            });
        });
        // 获取组合列表
        let groupList = new Promise(resolve => {
            let option = {
                pageUrl: '/businessMgmt/businessParamConfig/discountReview/getServiceList.ajax --groupList',
                req,
                // url: apiUrl.translate,
                // qs: {
                //     pmst: 'SYSTEM',
                //     pmkey: 'BRANCHCODE'
                // },
                url: apiUrl.fundGroups,
                qs: {
                    groupId: 'ALL',
                },
                timeout: 15000,
                json: true
            };
            request(option, (error, response, body) => {
                if (error) {
                    return resolve([]);
                }
                if (body && body.returnCode == 0 && Array.isArray(body.body)) {
                    // resolve(body.body.filter(item => item.pmv1 === 'A').map(item => {
                    //     return {
                    //         fundId: item.pmco,
                    //         fundName: item.pmnm,
                    //     };
                    // }));
                    resolve(body.body.map(item => {
                        return {
                            fundId: item.groupId,
                            fundName: item.groupName,
                        };
                    }));
                } else {
                    resolve([]);
                }
            });
        });

        let promiseAllParams = [];
        promiseAllParams.push(tradeTypeList);
        promiseAllParams.push(channelList);
        promiseAllParams.push(custTypeList);
        promiseAllParams.push(groupList);
        promiseAllParams.push(fundList);

        Promise.all(promiseAllParams).then(resultArr => {
            let tradeTypeList = resultArr[0];
            let channelList = resultArr[1];
            let custTypeList = resultArr[2];
            let groupList = resultArr[3];
            let fundList = resultArr[4].concat(groupList);
            let resultObj = {
                tradeTypeList,
                channelList,
                custTypeList,
                fundList
            };
            res.send({
                error: 0,
                msg: '请求成功',
                data: resultObj
            });
        });
    });
    // 获取本地数据
    app.post('/businessMgmt/businessParamConfig/discountReview/getLocalList.ajax', (req, res, next) => {
        // 获取客户类型翻译
        let custTypeTranslate = new Promise(resolve => {
            let option = {
                pageUrl: '/businessMgmt/businessParamConfig/discountReview/getServiceList.ajax --custTypeTranslate',
                req,
                url: apiUrl.translate,
                qs: {
                    pmst: 'COMMONSERVICE',
                    pmkey: 'CUSTTYPE'
                },
                timeout: 15000,
                json: true
            };
            request(option, (error, response, body) => {
                if (error) {
                    return resolve({});
                }
                if (body && body.returnCode == 0 && Array.isArray(body.body)) {
                    let obj = {};
                    body.body.forEach(item => {
                        obj[item.pmco] = item.pmnm;
                    });
                    resolve(obj);
                } else {
                    resolve({});
                }
            });
        });
        // 获取交易类型翻译
        let tradeTypeTranslate = new Promise(resolve => {
            let option = {
                pageUrl: '/businessMgmt/businessParamConfig/discountReview/getServiceList.ajax --tradeTypeTranslate',
                req,
                url: apiUrl.translate,
                qs: {
                    pmst: 'COMMONSERVICE',
                    pmkey: 'DISC_TRADETYPE'
                },
                timeout: 15000,
                json: true
            };
            request(option, (error, response, body) => {
                if (error) {
                    return resolve({});
                }
                if (body && body.returnCode == 0 && Array.isArray(body.body)) {
                    let obj = {};
                    body.body.forEach(item => {
                        obj[item.pmco] = item.pmnm;
                    });
                    resolve(obj);
                } else {
                    resolve({});
                }
            });
        });
        // 获取网点翻译
        let branchCodeTranslate = new Promise(resolve => {
            let option = {
                pageUrl: '/businessMgmt/businessParamConfig/discountReview/getServiceList.ajax --branchCodeTranslate',
                req,
                url: apiUrl.translate,
                qs: {
                    pmst: 'SYSTEM',
                    pmkey: 'BRANCHCODE'
                },
                timeout: 15000,
                json: true
            };
            request(option, (error, response, body) => {
                if (error) {
                    return resolve({});
                }
                if (body && body.returnCode == 0 && Array.isArray(body.body)) {
                    let obj = {};
                    body.body.filter(item => item.pmv1 !== 'A' && item.pmv1 !== 'C').forEach(item => {
                        obj[item.pmco] = item.pmnm;
                    });
                    resolve(obj);
                } else {
                    resolve({});
                }
            });
        });
        // 获取渠道翻译
        let channelTranslate = new Promise(resolve => {
            let option = {
                pageUrl: '/businessMgmt/businessParamConfig/discountReview/getServiceList.ajax --channelTranslate',
                req,
                url: apiUrl.translate,
                qs: {
                    pmst: 'COMMONSERVICE',
                    pmkey: 'CHANNEL'
                },
                timeout: 15000,
                json: true
            };
            request(option, (error, response, body) => {
                if (error) {
                    return resolve({});
                }
                if (body && body.returnCode == 0 && Array.isArray(body.body)) {
                    let obj = {};
                    body.body.forEach(item => {
                        obj[item.pmco] = item.pmnm;
                    });
                    resolve(obj);
                } else {
                    resolve({});
                }
            });
        });
        // 获取本地数据库列表
        let getTableData = new Promise((resolve, reject) => {
            pool.getConnection(function (error, connection) {
                if (error) {
                    console.log('/businessMgmt/businessParamConfig/discountReview/getLocalList.ajax 链接本地数据库失败', error.message);
                    reject({
                        error: '链接本地数据库失败'
                    });
                }
                let SQL = `SELECT * FROM ${tableName} WHERE delete_flag='F' AND status!=1`;
                if (req.body.product) {
                    SQL += ` AND JSON_EXTRACT(content, '$.product')='${req.body.product}'`;
                }
                if (req.body.tradeType) {
                    SQL += ` AND JSON_EXTRACT(content, '$.tradeType')='${req.body.tradeType}'`;
                }
                if (req.body.oproduct) {
                    SQL += ` AND JSON_EXTRACT(content, '$.oproduct')='${req.body.oproduct}'`;
                }
                if (req.body.channel) {
                    SQL += ` AND JSON_EXTRACT(content, '$.channel')='${req.body.channel}'`;
                }
                if (req.body.accoType) {
                    SQL += ` AND JSON_EXTRACT(content, '$.accoType')='${req.body.accoType}'`;
                }
                if (req.body.operate) {
                    SQL += ` AND operate='${req.body.operate}'`;
                }
                if (req.body.status) {
                    SQL += ` AND status='${req.body.status}'`;
                }
                SQL += ' ORDER BY update_timestamp DESC';
                console.log('/businessMgmt/businessParamConfig/discountReview/getLocalList.ajax run SQL: ', SQL);
                connection.query(SQL, function (error, results) {
                    console.log('/businessMgmt/businessParamConfig/discountReview/getLocalList.ajax run SQL error', error);
                    console.log('/businessMgmt/businessParamConfig/discountReview/getLocalList.ajax run SQL results:', results);
                    if (error) {
                        reject({
                            error: '运行SQL语句失败'
                        });
                    }
                    resolve(Array.from(results));
                });
                connection.release();
            });
        });
        // 获取服务端列表
        let getServiceData = new Promise(resolve => {
            let params = {};
            params.pageNo = 1;
            params.pageSize = 999999999;
            let option = {
                pageUrl: '/businessMgmt/businessParamConfig/discountReview/getServiceList.ajax --getServiceData',
                req,
                url: apiUrl.getTableData,
                qs: params,
                timeout: 15000,
                json: true
            };
            request(option, (error, response, body) => {
                if (error) {
                    resolve({
                        error: 1,
                        data: []
                    });
                }
                if (body && body.returnCode == 0 && body.body && Array.isArray(body.body.ruleDiscountList)) {
                    resolve({
                        error: 0,
                        data: body.body.ruleDiscountList
                    });
                } else {
                    resolve({
                        error: 1,
                        data: []
                    });
                }
            });
        });

        let promiseAllParams = [];
        promiseAllParams.push(custTypeTranslate);
        promiseAllParams.push(tradeTypeTranslate);
        promiseAllParams.push(branchCodeTranslate);
        promiseAllParams.push(channelTranslate);
        promiseAllParams.push(getTableData);
        promiseAllParams.push(getServiceData);

        Promise.all(promiseAllParams).then(resultArr => {
            let custTypeTranslate = resultArr[0];
            let tradeTypeTranslate = resultArr[1];
            let branchCodeTranslate = resultArr[2];
            let channelTranslate = resultArr[3];
            let getTableData = resultArr[4];
            let getServiceData = resultArr[5];
            let tableData = getTableData.map(item => {
                let obj = {
                    local_id: item.local_id,
                    service_id: item.service_id,
                    creator: item.creator,
                    operator: item.operator,
                    createTime: formatTimeStamp(item.create_timestamp),
                    updateTime: formatTimeStamp(item.update_timestamp),
                    operate: item.operate,
                    status: item.status,
                    reviewer: item.reviewer,
                    reviewTime: item.review_time,
                    remark: item.remark
                };
                if (obj.status == 0) {
                    obj.showStatus = '复核通过';
                } else if (obj.status == 1) {
                    obj.showStatus = '编辑中';
                } else if (obj.status == 2) {
                    obj.showStatus = '待复核';
                } else if (obj.status == 9) {
                    obj.showStatus = '复核驳回';
                } else {
                    obj.showStatus = obj.status;
                }
                if (obj.operate == 1) {
                    obj.showOperate = '新增';
                } else if (obj.operate == 2) {
                    obj.showOperate = '修改';
                } else if (obj.operate == 3) {
                    obj.showOperate = '删除';
                } else {
                    obj.showOperate = obj.operate;
                }
                let content = JSON.parse(item.content);
                obj.product = content.product;
                obj.custType = content.custType;
                obj.showCustType = custTypeTranslate[content.custType] || content.custType;
                obj.tradeType = content.tradeType;
                obj.showTradeType = tradeTypeTranslate[content.tradeType] || content.tradeType;
                obj.branchCode = content.branchCode;
                obj.showBranchCode = branchCodeTranslate[content.branchCode] || content.branchCode;
                obj.channel = content.channel;
                obj.showChannel = channelTranslate[content.channel] || content.channel;
                obj.oproduct = content.oproduct;
                obj.accoType = content.accoType;
                obj.bankNo = content.bankNo;
                obj.startAmount = content.startAmount;
                obj.endAmount = content.endAmount;
                obj.displayDiscount = content.displayDiscount;
                obj.tradeDiscount = content.tradeDiscount;
                obj.startTime = content.startTime;
                obj.endTime = content.endTime;
                obj.remark_service = content.remark;
                obj.priority = content.priority;
                if (obj.operate == 2) {
                    if (getServiceData.error) {
                        obj.originData = {};
                        obj.originData.product = '服务端数据获取失败';
                        obj.originData.custType = '服务端数据获取失败';
                        obj.originData.showCustType = '服务端数据获取失败';
                        obj.originData.tradeType = '服务端数据获取失败';
                        obj.originData.showTradeType = '服务端数据获取失败';
                        obj.originData.branchCode = '服务端数据获取失败';
                        obj.originData.showBranchCode = '服务端数据获取失败';
                        obj.originData.channel = '服务端数据获取失败';
                        obj.originData.showChannel = '服务端数据获取失败';
                        obj.originData.oproduct = '服务端数据获取失败';
                        obj.originData.accoType = '服务端数据获取失败';
                        obj.originData.bankNo = '服务端数据获取失败';
                        obj.originData.startAmount = '服务端数据获取失败';
                        obj.originData.endAmount = '服务端数据获取失败';
                        obj.originData.displayDiscount = '服务端数据获取失败';
                        obj.originData.tradeDiscount = '服务端数据获取失败';
                        obj.originData.startTime = '服务端数据获取失败';
                        obj.originData.endTime = '服务端数据获取失败';
                        obj.originData.remark = '服务端数据获取失败';
                    } else {
                        for (let i = 0; i < getServiceData.data.length; i++) {
                            if (obj.service_id == getServiceData.data[i].id) {
                                obj.originData = {};
                                obj.originData.product = getServiceData.data[i].product;
                                obj.originData.custType = getServiceData.data[i].custType;
                                obj.originData.showCustType = custTypeTranslate[getServiceData.data[i].custType] || getServiceData.data[i].custType;
                                obj.originData.tradeType = getServiceData.data[i].tradeType;
                                obj.originData.showTradeType = tradeTypeTranslate[getServiceData.data[i].tradeType] || getServiceData.data[i].tradeType;
                                obj.originData.branchCode = getServiceData.data[i].branchCode;
                                obj.originData.showBranchCode = branchCodeTranslate[getServiceData.data[i].branchCode] || getServiceData.data[i].branchCode;
                                obj.originData.channel = getServiceData.data[i].channel;
                                obj.originData.showChannel = channelTranslate[getServiceData.data[i].channel] || getServiceData.data[i].channel;
                                obj.originData.oproduct = getServiceData.data[i].oproduct;
                                obj.originData.accoType = getServiceData.data[i].accoType;
                                obj.originData.bankNo = getServiceData.data[i].bankNo;
                                obj.originData.startAmount = getServiceData.data[i].startAmount;
                                obj.originData.endAmount = getServiceData.data[i].endAmount;
                                obj.originData.displayDiscount = getServiceData.data[i].displayDiscount;
                                obj.originData.tradeDiscount = getServiceData.data[i].tradeDiscount;
                                obj.originData.startTime = getServiceData.data[i].startTime;
                                obj.originData.endTime = getServiceData.data[i].endTime;
                                obj.originData.remark = getServiceData.data[i].remark;
                                break;
                            }
                        }
                    }
                }
                return obj;
            });
            res.send({
                error: 0,
                msg: '请求成功',
                data: tableData
            });
        }).catch(error => {
            res.send({
                error: 1,
                msg: error.message,
                data: null
            });
        });
    });
    // 获取查询服务端数据
    app.post('/businessMgmt/businessParamConfig/discountReview/getServiceList.ajax', (req, res, next) => {
        // 获取客户类型翻译
        let custTypeTranslate = new Promise(resolve => {
            let option = {
                pageUrl: '/businessMgmt/businessParamConfig/discountReview/getServiceList.ajax --custTypeTranslate',
                req,
                url: apiUrl.translate,
                qs: {
                    pmst: 'COMMONSERVICE',
                    pmkey: 'CUSTTYPE'
                },
                timeout: 15000,
                json: true
            };
            request(option, (error, response, body) => {
                if (error) {
                    return resolve({});
                }
                if (body && body.returnCode == 0 && Array.isArray(body.body)) {
                    let obj = {};
                    body.body.forEach(item => {
                        obj[item.pmco] = item.pmnm;
                    });
                    resolve(obj);
                } else {
                    resolve({});
                }
            });
        });
        // 获取交易类型翻译
        let tradeTypeTranslate = new Promise(resolve => {
            let option = {
                pageUrl: '/businessMgmt/businessParamConfig/discountReview/getServiceList.ajax --tradeTypeTranslate',
                req,
                url: apiUrl.translate,
                qs: {
                    pmst: 'COMMONSERVICE',
                    pmkey: 'DISC_TRADETYPE'
                },
                timeout: 15000,
                json: true
            };
            request(option, (error, response, body) => {
                if (error) {
                    return resolve({});
                }
                if (body && body.returnCode == 0 && Array.isArray(body.body)) {
                    let obj = {};
                    body.body.forEach(item => {
                        obj[item.pmco] = item.pmnm;
                    });
                    resolve(obj);
                } else {
                    resolve({});
                }
            });
        });
        // 获取网点翻译
        let branchCodeTranslate = new Promise(resolve => {
            let option = {
                pageUrl: '/businessMgmt/businessParamConfig/discountReview/getServiceList.ajax --branchCodeTranslate',
                req,
                url: apiUrl.translate,
                qs: {
                    pmst: 'SYSTEM',
                    pmkey: 'BRANCHCODE'
                },
                timeout: 15000,
                json: true
            };
            request(option, (error, response, body) => {
                if (error) {
                    return resolve({});
                }
                if (body && body.returnCode == 0 && Array.isArray(body.body)) {
                    let obj = {};
                    body.body.filter(item => item.pmv1 !== 'A' && item.pmv1 !== 'C').forEach(item => {
                        obj[item.pmco] = item.pmnm;
                    });
                    resolve(obj);
                } else {
                    resolve({});
                }
            });
        });
        // 获取渠道翻译
        let channelTranslate = new Promise(resolve => {
            let option = {
                pageUrl: '/businessMgmt/businessParamConfig/discountReview/getServiceList.ajax --channelTranslate',
                req,
                url: apiUrl.translate,
                qs: {
                    pmst: 'COMMONSERVICE',
                    pmkey: 'CHANNEL'
                },
                timeout: 15000,
                json: true
            };
            request(option, (error, response, body) => {
                if (error) {
                    return resolve({});
                }
                if (body && body.returnCode == 0 && Array.isArray(body.body)) {
                    let obj = {};
                    body.body.forEach(item => {
                        obj[item.pmco] = item.pmnm;
                    });
                    resolve(obj);
                } else {
                    resolve({});
                }
            });
        });
        // 获取服务端列表
        let getTableData = new Promise((resolve, reject) => {
            let params = {};
            req.body.product && (params.product = req.body.product);
            req.body.tradeType && (params.tradeType = req.body.tradeType);
            req.body.oproduct && (params.oproduct = req.body.oproduct);
            req.body.channel && (params.channel = req.body.channel);
            req.body.accoType && (params.accoType = req.body.accoType);
            params.pageNo = 1;
            params.pageSize = 999999999;
            let option = {
                pageUrl: '/businessMgmt/businessParamConfig/discountReview/getServiceList.ajax --getTableData',
                req,
                url: apiUrl.getTableData,
                qs: params,
                timeout: 15000,
                json: true
            };
            request(option, (error, response, body) => {
                if (error) {
                    reject({
                        message: '获取服务端数据失败'
                    });
                }
                if (body && body.returnCode == 0 && body.body && Array.isArray(body.body.ruleDiscountList)) {
                    resolve(body.body.ruleDiscountList);
                } else if (body && body.returnCode != 0 && body.returnCode != 9999) {
                    reject({
                        message: body.returnMsg
                    });
                } else {
                    reject({
                        message: '获取基金列表失败'
                    });
                }
            });
        });

        let promiseAllParams = [];
        promiseAllParams.push(custTypeTranslate);
        promiseAllParams.push(tradeTypeTranslate);
        promiseAllParams.push(branchCodeTranslate);
        promiseAllParams.push(channelTranslate);
        promiseAllParams.push(getTableData);

        Promise.all(promiseAllParams).then(resultArr => {
            let custTypeTranslate = resultArr[0];
            let tradeTypeTranslate = resultArr[1];
            let branchCodeTranslate = resultArr[2];
            let channelTranslate = resultArr[3];
            let getTableData = resultArr[4];
            let tableData = getTableData.map(item => {
                item.showCustType = custTypeTranslate[item.custType] || item.custType;
                item.showTradeType = tradeTypeTranslate[item.tradeType] || item.tradeType;
                item.showBranchCode = branchCodeTranslate[item.branchCode] || item.branchCode;
                item.showChannel = channelTranslate[item.channel] || item.channel;
                return item;
            });
            res.send({
                error: 0,
                msg: '请求成功',
                data: tableData
            });
        }).catch(error => {
            res.send({
                error: 1,
                msg: error.message,
                data: null
            });
        });
    });
    // 驳回
    app.post('/businessMgmt/businessParamConfig/discountReview/reviewReject.ajax', (req, res, next) => {
        if (req.body.creator === req.session.loginInfo.userid && !req.session.loginInfo.isAdmin) {
            return res.send({
                error: 1,
                msg: '禁止复核自己提交的申请',
                data: null
            });
        }
        pool.getConnection(function (error, connection) {
            if (error) {
                console.log('/businessMgmt/businessParamConfig/discountReview/reviewReject.ajax 链接本地数据库失败', error.message);
                return res.send({
                    error: 1,
                    msg: '链接本地数据库失败',
                    data: null
                });
            }
            let SQL = `UPDATE ${tableName} SET status=9,remark='${req.body.remark}',reviewer='${req.session.loginInfo.userid}',review_time='${formatTimeStamp(new Date().getTime())}' WHERE local_id=${req.body.local_id} AND update_timestamp='${req.body.updateTime}'`;
            console.log('/businessMgmt/businessParamConfig/discountReview/reviewReject.ajax run business SQL:', SQL);
            connection.query(SQL, function (error, results) {
                console.log('/businessMgmt/businessParamConfig/discountReview/reviewReject.ajax run business SQL error:', error);
                console.log('/businessMgmt/businessParamConfig/discountReview/reviewReject.ajax run business SQL results:', results);
                if (error) {
                    return res.send({
                        error: 1,
                        msg: error.message,
                        data: null
                    });
                }
                if (results.changedRows) {
                    res.send({
                        error: 0,
                        msg: '调用成功',
                        data: null
                    });
                } else {
                    res.send({
                        error: 1,
                        msg: '数据不存在或已更新,请刷新页面',
                        data: null
                    });
                }
            });
            connection.release();
        });
    });
    // 通过
    app.post('/businessMgmt/businessParamConfig/discountReview/reviewAccept.ajax', (req, res, next) => {
        if (req.body.creator === req.session.loginInfo.userid && !req.session.loginInfo.isAdmin) {
            return res.send({
                error: 1,
                msg: '禁止复核自己提交的申请',
                data: null
            });
        }
        pool.getConnection(function (error, connection) {
            if (error) {
                console.log('/businessMgmt/businessParamConfig/discountReview/reviewAccept.ajax 链接本地数据库失败', error.message);
                return res.send({
                    error: 1,
                    msg: '链接本地数据库失败',
                    data: null
                });
            }
            // 检查该条数据是否存在
            let checkHasSubmit = new Promise((resolve, reject) => {
                let SQL = `SELECT * FROM ${tableName} WHERE local_id=${req.body.local_id} AND update_timestamp='${req.body.updateTime}'`;
                console.log('/businessMgmt/businessParamConfig/discountReview/reviewAccept.ajax run check SQL: ', SQL);
                connection.query(SQL, function (error, results) {
                    console.log('/businessMgmt/businessParamConfig/discountReview/reviewAccept.ajax run check SQL error: ', error);
                    console.log('/businessMgmt/businessParamConfig/discountReview/reviewAccept.ajax run check SQL results: ', results);
                    if (error) {
                        reject({
                            message: '检查该条数据是否已被审核SQL语句失败'
                        });
                    }
                    resolve(Array.from(results).length);
                });
            });
            // 操作服务端数据
            let operateService = function (item) {
                return new Promise((resolve, reject) => {
                    let url = apiUrl.operate;
                    let params = {};
                    let method = '';
                    let paramsType = '';
                    if (item.operate == 1) { // 新增操作
                        params.product = req.body.product;
                        params.custType = req.body.custType;
                        params.tradeType = req.body.tradeType;
                        params.branchCode = req.body.branchCode;
                        params.channel = req.body.channel;
                        params.bankNo = req.body.bankNo;
                        params.oproduct = req.body.oproduct;
                        params.displayDiscount = req.body.displayDiscount;
                        params.tradeDiscount = req.body.tradeDiscount;
                        params.startTime = req.body.startTime;
                        params.endTime = req.body.endTime;
                        params.startAmount = item.startAmount;
                        params.endAmount = item.endAmount;
                        params.remark = item.remark_service;
                        // params.accoType = '*';
                        params.accoType = req.body.accoType;
                        method = 'PUT';
                        paramsType = 'body';

                        params.operator = item.operator;
                        params.checker = req.session.loginInfo.userid
                        params.priority = req.body.priority;
                        console.log("新增传过去的参数---", params)
                    } else if (item.operate == 2) { // 修改操作
                        params.id = req.body.service_id;
                        params.product = req.body.product;
                        params.custType = req.body.custType;
                        params.tradeType = req.body.tradeType;
                        params.branchCode = req.body.branchCode;
                        params.channel = req.body.channel;
                        params.bankNo = req.body.bankNo;
                        params.oproduct = req.body.oproduct;
                        params.displayDiscount = req.body.displayDiscount;
                        params.tradeDiscount = req.body.tradeDiscount;
                        params.startTime = req.body.startTime;
                        params.endTime = req.body.endTime;
                        params.startAmount = item.startAmount;
                        params.endAmount = item.endAmount;
                        params.remark = item.remark_service;
                        // params.accoType = '*';
                        params.accoType = req.body.accoType;
                        method = 'POST';
                        paramsType = 'body';

                        params.operator = item.operator;
                        params.checker = req.session.loginInfo.userid
                        params.priority = req.body.priority;
                        console.log("修改传过去的参数---", params)
                    } else if (item.operate == 3) { // 删除操作
                        params.id = req.body.service_id;
                        method = 'DELETE';
                        paramsType = 'qs';
                    } else {
                        return reject({
                            message: '操作类型有误，请检查数据是否合法'
                        });
                    }
                    // 给空字符串添加 * 字符
                    for (let key in params) {
                        if (params[key] === '') {
                            params[key] = '*';
                        }
                    }
                    let option = {
                        pageUrl: '/businessMgmt/businessParamConfig/discountReview/reviewAccept.ajax',
                        req,
                        operateType: item.operate, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
                        url: url,
                        method: method,
                        timeout: 15000,
                        json: true
                    };
                    option[paramsType] = params;
                    request(option, (error, response, body) => {
                        if (error) {
                            reject({
                                message: '调用服务端数据失败'
                            });
                        }
                        if (body && body.returnCode == 0) {
                            resolve();
                        } else if (body.returnCode != 0 && body.returnCode != 9999) {
                            reject({
                                message: body.returnMsg
                            });
                        } else {
                            reject({
                                message: '调用服务端数据失败'
                            });
                        }
                    });
                });
            };
            // 操作本地数据
            let operateLocal = function () {
                return new Promise((resolve, reject) => {
                    let SQL = `UPDATE ${tableName} SET status=0,reviewer='${req.session.loginInfo.userid}',review_time='${formatTimeStamp(new Date().getTime())}' WHERE local_id=${req.body.local_id}`;
                    console.log('/businessMgmt/businessParamConfig/discountReview/reviewReject.ajax run business SQL:', SQL);
                    connection.query(SQL, function (error, results) {
                        console.log('/businessMgmt/businessParamConfig/discountReview/reviewReject.ajax run business SQL error:', error);
                        console.log('/businessMgmt/businessParamConfig/discountReview/reviewReject.ajax run business SQL results:', results);
                        if (error) {
                            reject({
                                message: '操作本地数据库出错，请核对校验本地数据'
                            });
                        }
                        resolve();
                    });
                });
            };
            checkHasSubmit.then(hasSubmit => {
                if (hasSubmit === 0) {
                    connection.release();
                    return res.send({
                        error: 1,
                        msg: '数据不存在',
                        data: null
                    });
                }
                operateService(req.body).then(() => {
                    operateLocal().then(() => {
                        connection.release();
                        res.send({
                            error: 0,
                            msg: '调用成功',
                            data: null
                        });
                    }).catch(error => {
                        connection.release();
                        res.send({
                            error: 1,
                            msg: error.message,
                            data: null
                        });
                    });
                }).catch(error => {
                    connection.release();
                    res.send({
                        error: 1,
                        msg: error.message,
                        data: null
                    });
                });
            }).catch(error => {
                connection.release();
                res.send({
                    error: 1,
                    msg: error.message,
                    data: null
                });
            });
        });
    });
};

function formatTimeStamp(timestamp) {
    let d = new Date(timestamp);
    let fixZero = function (num) {
        return num < 10 ? '0' + num : num;
    };
    return [d.getFullYear(), d.getMonth() + 1, d.getDate()].map(value => fixZero(value)).join('-') +
        ' ' + [d.getHours(), d.getMinutes(), d.getSeconds()].map(value => fixZero(value)).join(':');
}