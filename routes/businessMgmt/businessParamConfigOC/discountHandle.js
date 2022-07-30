const request = require('./../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').businessParamConfigOC.discountHandle;
const tableName = 'bm_bpcoc_discount';

module.exports = function (app) {
    // 获取所有列表数据
    app.post('/businessMgmt/businessParamConfigOC/discountHandle/getDialogList.ajax', (req, res, next) => {
        // 获取客户类型翻译
        let custTypeList = new Promise(resolve => {
            let option = {
                pageUrl: '/businessMgmt/businessParamConfigOC/discountHandle/getDialogList.ajax --custTypeList',
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
        // 获取交易类型翻译
        let tradeTypeList = new Promise(resolve => {
            let option = {
                pageUrl: '/businessMgmt/businessParamConfigOC/discountHandle/getDialogList.ajax --tradeTypeList',
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
        // 获取网点翻译
        let branchCodeList = new Promise(resolve => {
            let option = {
                pageUrl: '/businessMgmt/businessParamConfigOC/discountHandle/getDialogList.ajax --branchCodeList',
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
                    return resolve([]);
                }
                if (body && body.returnCode == 0 && Array.isArray(body.body)) {
                    resolve(body.body.filter(item => item.pmv1 !== 'A' && item.pmv1 !== 'C').map(item => {
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
                pageUrl: '/businessMgmt/businessParamConfigOC/discountHandle/getDialogList.ajax --channelList',
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
                    // let filterArr = ['柜台', '网上(含PC/H5/APP)'];
                    // resolve(body.body.filter(item => filterArr.includes(item.pmnm)).map(item => {
                    //     let obj = {};
                    //     obj.key = item.pmco;
                    //     obj.value = item.pmnm;
                    //     return obj;
                    // }));
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
                pageUrl: '/businessMgmt/businessParamConfigOC/discountHandle/getDialogList.ajax --fundList',
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
        // 获取组合列表
        let groupList = new Promise(resolve => {
            let option = {
                pageUrl: '/businessMgmt/businessParamConfigOC/discountHandle/getDialogList.ajax --groupList',
                req,
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
        promiseAllParams.push(custTypeList);
        promiseAllParams.push(tradeTypeList);
        promiseAllParams.push(branchCodeList);
        promiseAllParams.push(channelList);
        promiseAllParams.push(groupList);
        promiseAllParams.push(fundList);

        Promise.all(promiseAllParams).then(resultArr => {
            let custTypeList = resultArr[0];
            let tradeTypeList = resultArr[1];
            let branchCodeList = resultArr[2];
            let channelList = resultArr[3];
            let groupList = resultArr[4];
            let fundList = resultArr[5].concat(groupList);
            let resultObj = {
                custTypeList,
                tradeTypeList,
                branchCodeList,
                channelList,
                fundList
            };
            res.send({
                error: 0,
                msg: '请求成功',
                data: resultObj
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
    app.post('/businessMgmt/businessParamConfigOC/discountHandle/getServiceList.ajax', (req, res, next) => {
        // 获取客户类型翻译
        let custTypeTranslate = new Promise((resolve, reject) => {
            let option = {
                pageUrl: '/businessMgmt/businessParamConfigOC/discountHandle/getServiceList.ajax --custTypeTranslate',
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
                    reject({
                        message: '获取服务端数据失败'
                    });
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
        let tradeTypeTranslate = new Promise((resolve, reject) => {
            let option = {
                pageUrl: '/businessMgmt/businessParamConfigOC/discountHandle/getServiceList.ajax --tradeTypeTranslate',
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
                    reject({
                        message: '获取服务端数据失败'
                    });
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
        let branchCodeTranslate = new Promise((resolve, reject) => {
            let option = {
                pageUrl: '/businessMgmt/businessParamConfigOC/discountHandle/getServiceList.ajax --branchCodeTranslate',
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
                    reject({
                        message: '获取服务端数据失败'
                    });
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
        // 获取渠道翻译
        let channelTranslate = new Promise((resolve, reject) => {
            let option = {
                pageUrl: '/businessMgmt/businessParamConfigOC/discountHandle/getServiceList.ajax --channelTranslate',
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
                    reject({
                        message: '获取服务端数据失败'
                    });
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
            params.pageNo = 1;
            params.pageSize = 999999999;
            let option = {
                pageUrl: '/businessMgmt/businessParamConfigOC/discountHandle/getServiceList.ajax --getTableData',
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
                item.showCustType = item.custType.split(',').map(custType => custTypeTranslate[custType] || custType).join(',');
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
    // 服务端删除操作落本地数据
    app.post('/businessMgmt/businessParamConfigOC/discountHandle/serviceToLocalDelete.ajax', (req, res, next) => {
        pool.getConnection(function (error, connection) {
            if (error) {
                console.log('/businessMgmt/businessParamConfigOC/discountHandle/serviceToLocalDelete.ajax 链接本地数据库失败:', error.message);
                return res.send({
                    error: 1,
                    msg: '链接本地数据库失败',
                    data: null
                });
            }
            let service_id = req.body.service_id;
            let content = req.body.content;
            let creator = req.session.loginInfo.userid;
            let operator = req.session.loginInfo.userid;
            let SQL = `INSERT INTO ${tableName} (service_id,content,creator,operator,operate,status) VALUES ('${service_id}','${content}','${creator}','${operator}',3,2)`;
            console.log('/businessMgmt/businessParamConfigOC/discountHandle/serviceToLocalDelete.ajax run business SQL: ', SQL);
            connection.query(SQL, function (error, results) {
                console.log('/businessMgmt/businessParamConfigOC/discountHandle/serviceToLocalDelete.ajax run business SQL error:', error);
                console.log('/businessMgmt/businessParamConfigOC/discountHandle/serviceToLocalDelete.ajax run business SQL results:', results);
                connection.release();
                if (error) {
                    return res.send({
                        error: 1,
                        msg: error.message,
                        data: null
                    });
                }
                res.send({
                    error: 0,
                    msg: '调用成功',
                    data: null
                });
            });
        });
    });
    // 服务端修改操作落本地数据
    app.post('/businessMgmt/businessParamConfigOC/discountHandle/serviceToLocalUpdate.ajax', (req, res, next) => {
        pool.getConnection((error, connection) => {
            if (error) {
                console.log('/businessMgmt/businessParamConfigOC/discountHandle/serviceToLocalUpdate.ajax 链接本地数据库失败:', error.message);
                return res.send({
                    error: 1,
                    msg: '链接本地数据库失败',
                    data: null
                });
            }
            let service_id = req.body.service_id;
            let content = req.body.content;
            let creator = req.session.loginInfo.userid;
            let operator = req.session.loginInfo.userid;
            let SQL = `INSERT INTO ${tableName} (service_id,content,creator,operator,operate,status) VALUES ('${service_id}','${content}','${creator}','${operator}',2,2)`;
            console.log('/businessMgmt/businessParamConfigOC/discountHandle/serviceToLocalUpdate.ajax run business SQL: ', SQL);
            connection.query(SQL, (error, results) => {
                console.log('/businessMgmt/businessParamConfigOC/discountHandle/serviceToLocalUpdate.ajax run business SQL error:', error);
                console.log('/businessMgmt/businessParamConfigOC/discountHandle/serviceToLocalUpdate.ajax run business SQL results:', results);
                connection.release();
                if (error) {
                    return res.send({
                        error: 1,
                        msg: error.message,
                        data: null
                    });
                }
                res.send({
                    error: 0,
                    msg: '调用成功',
                    data: null
                });
            });
        });
    });
    // 获取本地数据
    app.post('/businessMgmt/businessParamConfigOC/discountHandle/getLocalList.ajax', (req, res, next) => {
        // 获取客户类型翻译
        let custTypeTranslate = new Promise((resolve, reject) => {
            let option = {
                pageUrl: '/businessMgmt/businessParamConfigOC/discountHandle/getLocalList.ajax --custTypeTranslate',
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
                    reject({
                        message: '获取服务端数据失败'
                    });
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
        let tradeTypeTranslate = new Promise((resolve, reject) => {
            let option = {
                pageUrl: '/businessMgmt/businessParamConfigOC/discountHandle/getLocalList.ajax --tradeTypeTranslate',
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
                    reject({
                        message: '获取服务端数据失败'
                    });
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
        let branchCodeTranslate = new Promise((resolve, reject) => {
            let option = {
                pageUrl: '/businessMgmt/businessParamConfigOC/discountHandle/getLocalList.ajax --branchCodeTranslate',
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
                    reject({
                        message: '获取服务端数据失败'
                    });
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
        // 获取渠道翻译
        let channelTranslate = new Promise((resolve, reject) => {
            let option = {
                pageUrl: '/businessMgmt/businessParamConfigOC/discountHandle/getLocalList.ajax --channelTranslate',
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
                    reject({
                        message: '获取服务端数据失败'
                    });
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
                    console.log('/businessMgmt/businessParamConfigOC/discountHandle/getLocalList.ajax 链接本地数据库失败', error.message);
                    reject({
                        error: '链接本地数据库失败'
                    });
                }
                let SQL = `SELECT * FROM ${tableName} WHERE delete_flag='F' AND creator='${req.session.loginInfo.userid}'`;
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
                if (req.body.operate) {
                    SQL += ` AND operate='${req.body.operate}'`;
                }
                if (req.body.status) {
                    SQL += ` AND status='${req.body.status}'`;
                }
                SQL += ' ORDER BY update_timestamp DESC';
                console.log('/businessMgmt/businessParamConfigOC/discountHandle/getLocalList.ajax run SQL: ', SQL);
                connection.query(SQL, function (error, results) {
                    console.log('/businessMgmt/businessParamConfigOC/discountHandle/getLocalList.ajax run SQL error', error);
                    console.log('/businessMgmt/businessParamConfigOC/discountHandle/getLocalList.ajax run SQL results:', results);
                    connection.release();
                    if (error) {
                        reject({
                            error: '运行SQL语句失败'
                        });
                    }
                    resolve(Array.from(results));
                });
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
                obj.showCustType = content.custType.split(',').map(custType => custTypeTranslate[custType] || custType).join(',');
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
    // 向本地数据库添加数据
    app.post('/businessMgmt/businessParamConfigOC/discountHandle/addLocalData.ajax', (req, res, next) => {
        pool.getConnection((error, connection) => {
            if (error) {
                console.log('/businessMgmt/businessParamConfigOC/discountHandle/addLocalData.ajax 链接本地数据库失败', error.message);
                return res.send({
                    error: 1,
                    msg: '链接本地数据库失败',
                    data: null
                });
            }
            let content = req.body.content;
            // 基金产品多选
            let productIds = JSON.parse(content).product;
            // 渠道类型多选
            let channelIds = JSON.parse(content).channel;
            // let contentArr = productIds.split(',').map(productId => {
            //     let obj = JSON.parse(content);
            //     obj.product = productId;
            //     return JSON.stringify(obj);
            // });
            // 多选
            var contentArr = []
            productIds.split(',').forEach(productId => {
                channelIds.split(',').forEach(channelId => {
                    if (productId) {
                        let obj = JSON.parse(content);
                        obj.product = productId;
                        obj.channel = channelId;
                        contentArr.push(JSON.stringify(obj));
                    }
                })
            })
            console.log("---contentArr", contentArr)
            let creator = req.session.loginInfo.userid;
            let operator = req.session.loginInfo.userid;

            let valueStr = contentArr.map(contentStr => {
                return `('${contentStr}','${creator}','${operator}',1,2)`;
            }).join(',');

            // let SQL = `INSERT INTO ${tableName} (content,creator,operator,operate,status) VALUES ('${content}','${creator}','${operator}',1,2)`;
            let SQL = `INSERT INTO ${tableName} (content,creator,operator,operate,status) VALUES ${valueStr}`;
            console.log('/businessMgmt/businessParamConfigOC/discountHandle/addLocalData.ajax run SQL: ', SQL);
            connection.query(SQL, function (error, results) {
                console.log('/businessMgmt/businessParamConfigOC/discountHandle/addLocalData.ajax run SQL error:', error);
                console.log('/businessMgmt/businessParamConfigOC/discountHandle/addLocalData.ajax run SQL results:', results);
                connection.release();
                if (error) {
                    return res.send({
                        error: 1,
                        msg: '运行SQL语句失败',
                        data: null
                    });
                }
                res.send({
                    error: 0,
                    msg: '添加成功',
                    data: results.insertId
                });
            });
        });
    });
    // 本地数据库修改数据
    app.post('/businessMgmt/businessParamConfigOC/discountHandle/updateLocalData.ajax', (req, res, next) => {
        pool.getConnection(function (error, connection) {
            if (error) {
                console.log('/businessMgmt/businessParamConfigOC/discountHandle/updateLocalData.ajax 链接本地数据库失败', error.message);
                return res.send({
                    error: 1,
                    msg: '链接本地数据库失败',
                    data: null
                });
            }
            let local_id = req.body.local_id;
            let content = req.body.content;
            let operator = req.session.loginInfo.userid;
            let updateTime = req.body.updateTime;
            let SQL = `UPDATE ${tableName} SET content='${content}',operator='${operator}' WHERE local_id=${local_id} AND update_timestamp='${updateTime}'`;
            console.log('/businessMgmt/businessParamConfigOC/discountHandle/updateLocalData.ajax run business SQL: ', SQL);
            connection.query(SQL, function (error, results) {
                console.log('/businessMgmt/businessParamConfigOC/discountHandle/updateLocalData.ajax run business SQL error:', error);
                console.log('/businessMgmt/businessParamConfigOC/discountHandle/updateLocalData.ajax run business SQL results:', results);
                connection.release();
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
        });
    });
    // 本地数据库删除数据
    app.post('/businessMgmt/businessParamConfigOC/discountHandle/revertLocalData.ajax', (req, res, next) => {
        pool.getConnection(function (error, connection) {
            if (error) {
                console.log('/businessMgmt/businessParamConfigOC/discountHandle/revertLocalData.ajax  链接本地数据库失败', error.message);
                return res.send({
                    error: 1,
                    msg: '链接本地数据库失败',
                    data: null
                });
            }
            let {
                local_id,
                updateTime
            } = req.body;
            let SQL = `UPDATE ${tableName} SET delete_flag='T',operator='${req.session.loginInfo.userid}' WHERE local_id=${local_id} AND update_timestamp='${updateTime}'`;
            console.log('/businessMgmt/businessParamConfigOC/discountHandle/revertLocalData.ajax run business SQL: ', SQL);
            connection.query(SQL, function (error, results) {
                console.log('/businessMgmt/businessParamConfigOC/discountHandle/revertLocalData.ajax run business SQL error:', error);
                console.log('/businessMgmt/businessParamConfigOC/discountHandle/revertLocalData.ajax run business SQL results:', results);
                connection.release();
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
        });
    });
    // 本地数据库重新提交数据
    app.post('/businessMgmt/businessParamConfigOC/discountHandle/submitLocalDataAgain.ajax', (req, res, next) => {
        pool.getConnection(function (error, connection) {
            if (error) {
                console.log('/businessMgmt/businessParamConfigOC/discountHandle/submitLocalDataAgain.ajax  链接本地数据库失败', error.message);
                return res.send({
                    error: 1,
                    msg: '链接本地数据库失败',
                    data: null
                });
            }
            // 删除原数据
            let deleteOriginData = new Promise((resolve, reject) => {
                let SQL = `UPDATE ${tableName} SET delete_flag='T' WHERE local_id=${req.body.local_id} AND update_timestamp='${req.body.updateTime}'`;
                console.log('/businessMgmt/businessParamConfigOC/discountHandle/submitLocalDataAgain.ajax run deleteOriginData SQL:', SQL);
                connection.query(SQL, function (error, results) {
                    console.log('/businessMgmt/businessParamConfigOC/discountHandle/submitLocalDataAgain.ajax run deleteOriginData SQL error:', error);
                    console.log('/businessMgmt/businessParamConfigOC/discountHandle/submitLocalDataAgain.ajax run deleteOriginData SQL results:', results);
                    if (error) {
                        reject({
                            message: '本地删除原数据失败'
                        });
                    }
                    if (!results.changedRows) {
                        reject({
                            message: '数据不存在或已更新，请刷新列表'
                        });
                    }
                    resolve();
                });
            });
            // 新增申请
            let addNewSubmit = new Promise((resolve, reject) => {
                let creator = req.session.loginInfo.userid;
                let service_id = req.body.service_id;
                let content = req.body.content;
                let operate = req.body.operate;
                let SQL = `INSERT INTO ${tableName} (service_id,content,creator,operator,operate,status) VALUES ('${service_id}','${content}','${creator}','${creator}',${operate},2)`;
                console.log('/businessMgmt/businessParamConfigOC/discountHandle/submitLocalDataAgain.ajax run addNewSubmit SQL:', SQL);
                connection.query(SQL, function (error, results) {
                    console.log('/businessMgmt/businessParamConfigOC/discountHandle/submitLocalDataAgain.ajax run addNewSubmit SQL error:', error);
                    console.log('/businessMgmt/businessParamConfigOC/discountHandle/submitLocalDataAgain.ajax run addNewSubmit SQL results:', results);
                    if (error) {
                        reject({
                            message: '新增申请失败'
                        });
                    }
                    resolve();
                });
            });
            deleteOriginData.then(() => {
                addNewSubmit.then(() => {
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