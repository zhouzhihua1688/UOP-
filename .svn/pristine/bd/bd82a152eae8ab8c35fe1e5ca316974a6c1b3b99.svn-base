const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').auditMgmt.idCardReview;
const request_obs = require('../../../local_data/request_obs');
const cipher = require('../../../local_data/cipher');
const tableName = 'mc_adm_idcard';
module.exports = function (app) {
    //获取列表
    app.post('/messageCenter/auditMgmt/idCardReview/getList.ajax', (req, res, next) => {
        // 获取服务端列表
        function getList() {
            return new Promise((resolve, reject) => {
                let params = req.body;
                let option = {
                    // pageUrl: '/messageCenter/auditMgmt/idCardReview/getList.ajax',
                    req: req,
                    url: apiUrlList.getServerList,
                    body: params,
                    timeout: 15000,
                    json: true
                };
                console.log(`/messageCenter/auditMgmt/idCardReview/getList.ajax option:`, option.req ? {...option, req: '#'} : option);
                request.post(option, (error, response, body) => {
                    console.log(`/messageCenter/auditMgmt/idCardReview/getList.ajax error:`, error);
					console.log(`/messageCenter/auditMgmt/idCardReview/getList.ajax statusCode:`, response && response.statusCode);
					console.log(`/messageCenter/auditMgmt/idCardReview/getList.ajax body: ******`);
                    if (error) {
                        reject({message: '数据获取失败'});
                    }
                    if (body && body.returnCode == 0 && Array.isArray(body.body.apps)) {
                        let data = body.body;
                        data.apps.forEach(item => {
							item.showEx1 = item.custAttchmnt.map(custAttchmntItem => {
								if (custAttchmntItem && custAttchmntItem.ex1) {
									return JSON.parse(custAttchmntItem.ex1);
								}
							});
						});
                        data.userId = req.session.loginInfo.userid;
                        data.pages = Math.ceil(data.total / params.pageSize);//最大页码
                        data.pageNum = params.pageNo;//当前页
                        resolve(data);
                    }
                    else if (body && body.returnCode != 9999) {
                        reject({message: body.returnMsg});
                    }
                    else {
                        reject({message: '查询失败'});
                    }
                });
            });
        }

        // 获取翻译字段
        function getTranslate() {
            return new Promise((resolve, reject) => {
                let params = {pmst: 'ICIF', pmkey: 'ACCPTMD'};
                let option = {
                    pageUrl: '/messageCenter/auditMgmt/idCardReview/getList.ajax --getTranslate',
                    req: req,
                    url: apiUrlList.getTranslate,
                    qs: params,
                    timeout: 15000,
                    json: true
                };
                request(option, (error, response, body) => {
                    if (error) {
                        return resolve()
                    }
                    if (body && body.returnCode == 0 && Array.isArray(body.body)) {
                        let data = body.body;
                        resolve(data);
                    }
                    else if (body && body.returnCode != 9999) {
                        return resolve()
                    }
                    else {
                        return resolve()
                    }
                });
            });
        }

        Promise.all([getList(), getTranslate()]).then(([list, ts]) => {
            list.apps.forEach(function (item) {
                item.imgData = '图片获取中...';
                if (ts && Array.isArray(ts)) {
                    for (let translateCashFrom of ts) {
                        if (item.accptMd == translateCashFrom.pmco) {
                            item.accptMdTs = translateCashFrom.pmnm;
                            break;
                        }
                    }
                }
            });
            res.send({error: 0, msg: '数据请求成功', data: list});
        }).catch(error => {
            res.send({error: 1, msg: error.message, data: null});
        });
    });
    //拉取本地数据
    app.post('/messageCenter/auditMgmt/idCardReview/getLocalList.ajax', (req, res, next) => {
        pool.getConnection((error, connection) => {
            if (error) {
                console.log('/messageCenter/auditMgmt/idCardReview/getLocalList.ajax 链接本地数据库失败', error.message);
                return res.send({error: 1, msg: '链接本地数据库失败', data: null});
            }
            let SQL = `SELECT * FROM ${tableName} WHERE delete_flag='F'`;
            if (req.body.custNo) {
                SQL += ` AND JSON_EXTRACT(content, '$.custNo')='${req.body.custNo}'`;
            }
            if (req.body.invNm) {
                SQL += ` AND JSON_EXTRACT(content, '$.invNm')='${req.body.invNm}'`;
            }
            if (req.body.idTp) {
                SQL += ` AND JSON_EXTRACT(content, '$.idTp')='${req.body.idTp}'`;
            }
            if (req.body.operate) {
                SQL += ` AND operate='${req.body.operate}'`;
            }
            if (req.body.status) {
                SQL += ` AND status='${req.body.status}'`;
            }
            SQL += ' ORDER BY update_timestamp DESC';
            console.log('/messageCenter/auditMgmt/idCardReview/getLocalList.ajax run SQL: ', SQL);
            connection.query(SQL, function (error, results) {
                console.log('/messageCenter/auditMgmt/idCardReview/getLocalList.ajax run SQL error', error);
                connection.release();
                if (error) {
                    return res.send({error: 1, msg: '运行SQL语句失败', data: null});
                }
                let data = Array.from(results);
                let start = (req.body.pageNo - 1) * req.body.pageSize;
                let end = start + req.body.pageSize;
                let useData = data.slice(start, end).map((item) => {
                    let obj = {
                        local_id: item.local_id,
                        creator: item.creator,
                        operator: item.operator,
                        createTime: formatTimeStamp(item.create_timestamp),
                        updateTime: formatTimeStamp(item.update_timestamp),
                        operate: item.operate,
                        status: item.status,
                        reviewer: item.reviewer,
                        reviewTime: item.review_time,
                        remark: item.remark,
                        necessaryRemark :item.necessary_remark
                    };
                    if (obj.status == 0) {
                        obj.showStatus = '复核通过';
                    }
                    else if (obj.status == 1) {
                        obj.showStatus = '待复核';
                    }
                    else if (obj.status == 9) {
                        obj.showStatus = '复核驳回';
                    }
                    else {
                        obj.showStatus = obj.status;
                    }
                    if (obj.operate == 1) {
                        obj.showOperate = '审核通过';
                    }
                    else if (obj.operate == 2) {
                        obj.showOperate = '审核拒绝';
                    }
                    else {
                        obj.showOperate = obj.operate;
                    }
                    let content = JSON.parse(item.content);
                    obj.custNo = content.custNo;
                    obj.invNm = content.invNm;
                    obj.idTp = content.idTp;
                    obj.idTpName = content.idTpName;
                    obj.idNo = content.idNo;
                    obj.idValiDate = content.idValiDate;
                    obj.custAttchmnt = content.custAttchmnt || [];
                    obj.showEx1 = obj.custAttchmnt.map(custAttchmntItem => {
                        if (custAttchmntItem && custAttchmntItem.ex1) {
                            return JSON.parse(custAttchmntItem.ex1);
                        }
                    });
                    //身份证图片信息
                    obj.imgData = content.imgData ? content.imgData : '图片获取中...';
                    obj.accptMd = content.accptMd;
                    obj.accptMdTs = content.accptMdTs;
                    obj.serialNo = content.serialNo;
                    return obj;
                });
                let total = data.length;
                let pages = Math.ceil(total / req.body.pageSize); //最大页码
                let pageNum = req.body.pageNo; //当前页
                let useData_for_log = useData.filter(item => !Array.isArray(item.imgData)).map(item => {
                    let obj = JSON.parse(JSON.stringify(item));
                    obj.idNo = cipher(obj.idNo);
                    obj.invNm = cipher(obj.invNm);
                    return obj;
                });
                console.log('/messageCenter/auditMgmt/idCardReview/getLocalList.ajax run SQL results:', useData_for_log);
                res.send({error: 0, msg: '调用成功', data: {useData, total, pages, pageNum}});
            });
        });
    });
    // 获取图片base64
    app.post('/messageCenter/auditMgmt/idCardReview/getBase64.ajax', (req, res, next) => {
        let getImageByCustAttchmnt = custAttchmntItem => {
            return new Promise(((resolve, reject) => {
                if (!custAttchmntItem) {
                    return resolve();
                }
                let option = {
                    body: {
                        container: custAttchmntItem.filePath,
                        objectName: custAttchmntItem.fileName
                    }
                };
                request_obs(option).then(body => {
                    body.on('response', function (response) {
                        if (response.statusCode !== 200) {
                            console.log(response.statusCode, '------response.statusCode -----');
                            resolve();
                        }
                        else {
                            let chunks = [];
                            body.on('data', function (chunk) {
                                chunks.push(chunk);
                            });
                            body.on('end', function (err) {
                                let data = Buffer.concat(chunks);
                                resolve(data.toString('base64'));
                            });
                        }
                    });
                }).catch(error => {
                    console.log(error, '--------error.message-------');
                    resolve();
                });
            }));
        };
        Promise.all(JSON.parse(req.body.imageInfo).map(custAttchmntItem => getImageByCustAttchmnt(custAttchmntItem))).then(imageArr => {
            imageArr = imageArr.every(value => value) ? imageArr : '图片获取失败';
            res.send({error: 0, msg: '请求成功', data: imageArr});
        }).catch(error => {
            console.log('/messageCenter/auditMgmt/idCardReview/getBase64.ajax error:', error);
            res.send({error: 1, msg: '请求失败', data: '图片获取失败'});
        });
    });
    // 通过
    app.post('/messageCenter/auditMgmt/idCardReview/reviewAccept.ajax', (req, res, next) => {
        if (req.body.creator === req.session.loginInfo.userid && !req.session.loginInfo.isAdmin) {
            return res.send({error: 1, msg: '禁止复核自己提交的申请', data: null});
        }
        pool.getConnection(function (error, connection) {
            if (error) {
                console.log('/messageCenter/auditMgmt/idCardReview/reviewAccept.ajax 链接本地数据库失败', error.message);
                return res.send({error: 1, msg: '链接本地数据库失败', data: null});
            }
            // 检查该条数据是否存在
            let checkHasSubmit = new Promise((resolve, reject) => {
                let SQL = `SELECT * FROM ${tableName} WHERE local_id=${req.body.local_id} AND update_timestamp='${req.body.updateTime}'`;
                console.log('/messageCenter/auditMgmt/idCardReview/reviewAccept.ajax run check SQL: ', SQL);
                connection.query(SQL, function (error, results) {
                    console.log('/messageCenter/auditMgmt/idCardReview/reviewAccept.ajax run check SQL error: ', error);
                    console.log('/messageCenter/auditMgmt/idCardReview/reviewAccept.ajax run check SQL results: ', results);
                    if (error) {
                        reject({message: '检查该条数据是否已被审核SQL语句失败'});
                    }
                    resolve(Array.from(results).length);
                });
            });
            // 操作服务端数据
            let operateService = function (item) {
                return new Promise((resolve, reject) => {
                    let url = apiUrlList.checkPass;
                    console.log(url,'===url---');
                    let params = {};
                    if (item.operate == 1) { // 通过操作
                        // params.accptMd = item.accptMd;
                        params.checkComment = item.necessaryRemark;
                        params.checkFlg = 'Y';
                        params.serialNo = item.serialNo;
                        params.checker=req.session.loginInfo.userid;
                        console.log("通过传过去的参数---",params)
                    }
                    else if (item.operate == 2) { // 拒绝操作
                        // params.accptMd = item.accptMd;
                        params.checkComment = item.necessaryRemark;
                        params.checkFlg = 'F';
                        params.serialNo = item.serialNo;
                        params.checker=req.session.loginInfo.userid;
                        console.log("拒绝传过去的参数---",params)
                    }
                    else {
                        return reject({message: '操作类型有误，请检查数据是否合法'});
                    }
                    // 给空字符串添加 * 字符
                    // for (let key in params) {
                    //     if (params[key] === '') {
                    //         params[key] = '*';
                    //     }
                    // }
                    let option = {
                        pageUrl: '/messageCenter/auditMgmt/idCardReview/reviewAccept.ajax',
                        req: req,
                        operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
                        url: url,
                        timeout: 15000,
                        body:params,
                        json: true
                    };
                    request.put(option, (error, response, body) => {
                        if (error) {
                            reject({message: '调用服务端数据失败'});
                        }
                        if (body && body.returnCode == 0) {
                            resolve();
                        }
                        else if (body.returnCode != 0 && body.returnCode != 9999) {
                            reject({message: body.returnMsg});
                        }
                        else {
                            reject({message: '调用服务端数据失败'});
                        }
                    });
                });
            };
            // 操作本地数据
            let operateLocal = function () {
                return new Promise((resolve, reject) => {
                    let SQL = `UPDATE ${tableName} SET status=0,reviewer='${req.session.loginInfo.userid}',review_time='${formatTimeStamp(new Date().getTime())}' WHERE local_id=${req.body.local_id}`;
                    console.log('/messageCenter/auditMgmt/idCardReview/reviewAccept.ajax run mc SQL:', SQL);
                    connection.query(SQL, function (error, results) {
                        console.log('/messageCenter/auditMgmt/idCardReview/reviewAccept.ajax run mc SQL error:', error);
                        console.log('/messageCenter/auditMgmt/idCardReview/reviewAccept.ajax run mc SQL results:', results);
                        if (error) {
                            reject({message: '操作本地数据库出错，请核对校验本地数据'});
                        }
                        resolve();
                    });
                });
            };
            checkHasSubmit.then(hasSubmit => {
                if (hasSubmit === 0) {
                    connection.release();
                    return res.send({error: 1, msg: '数据不存在', data: null});
                }
                operateService(req.body).then(() => {
                    operateLocal().then(() => {
                        connection.release();
                        res.send({error: 0, msg: '调用成功', data: null});
                    }).catch(error => {
                        connection.release();
                        res.send({error: 1, msg: error.message, data: null});
                    });
                }).catch(error => {
                    connection.release();
                    res.send({error: 1, msg: error.message, data: null});
                });
            }).catch(error => {
                connection.release();
                res.send({error: 1, msg: error.message, data: null});
            });
        });
    });
    // 驳回
    app.post('/messageCenter/auditMgmt/idCardReview/reviewReject.ajax', (req, res, next) => {
        if (req.body.creator === req.session.loginInfo.userid && !req.session.loginInfo.isAdmin) {
            return res.send({error: 1, msg: '禁止复核自己提交的申请', data: null});
        }
        pool.getConnection(function (error, connection) {
            if (error) {
                console.log('/messageCenter/auditMgmt/idCardReview/reviewReject.ajax 链接本地数据库失败', error.message);
                return res.send({error: 1, msg: '链接本地数据库失败', data: null});
            }
            let SQL = `UPDATE ${tableName} SET status=9,remark='${req.body.remark}',operate='${req.body.operate}',reviewer='${req.session.loginInfo.userid}',review_time='${formatTimeStamp(new Date().getTime())}' WHERE local_id=${req.body.local_id} AND update_timestamp='${req.body.updateTime}'`;
            console.log('/messageCenter/auditMgmt/idCardReview/reviewReject.ajax run business SQL:', SQL);
            connection.query(SQL, function (error, results) {
                console.log('/messageCenter/auditMgmt/idCardReview/reviewReject.ajax run business SQL error:', error);
                console.log('/messageCenter/auditMgmt/idCardReview/reviewReject.ajax run business SQL results:', results);
                connection.release();
                if (error) {
                    return res.send({error: 1, msg: error.message, data: null});
                }
                if (results.changedRows) {
                    res.send({error: 0, msg: '调用成功', data: null});
                }
                else {
                    res.send({error: 1, msg: '数据不存在或已更新,请刷新页面', data: null});
                }
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