const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').auditMgmt.nicknameToReview;
const request_obs = require('../../../local_data/request_obs');

module.exports = function (app) {
    //获取列表
    app.post('/messageCenter/auditMgmt/headToReview/getList.ajax', (req, res, next) => {
        function getList() {
            return new Promise((resolve, reject) => {
                let params = req.body;
                let userId = req.session.loginInfo.userid;
                let option = {
                    // pageUrl: '/messageCenter/auditMgmt/headToReview/getList.ajax',
                    req: req,
                    url: apiUrlList.nicknameGetList,
                    body: params,
                    timeout: 15000,
                    json: true
                };
                console.log(`/messageCenter/auditMgmt/headToReview/getList.ajax option:`, option.req ? {...option, req: '#'} : option);
                request.post(option, (error, response, body) => {
                    console.log(`/messageCenter/auditMgmt/headToReview/getList.ajax error:`, error);
                    console.log(`/messageCenter/auditMgmt/headToReview/getList.ajax statusCode:`, response && response.statusCode);
                    console.log(`/messageCenter/auditMgmt/headToReview/getList.ajax body: ******`);
                    if (error) {
                        reject({message: '数据获取失败'});
                    }
                    if (body && body.returnCode == 0 && Array.isArray(body.body.apps)) {
                        let data = body.body;
                        data.userId = userId;
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

        function getImage(item) {
            return new Promise(((resolve, reject) => {
                item.imgdata = '';
                if (!item.custAttchmnt) {
                    return resolve();
                }
                let option = {
                    body: {
                        container: 'custAvatar',
                        objectName: item.custAttchmnt[0].fileName
                    }
                };
                request_obs(option).then(body => {
                    body.on('response', function (response) {
                        if (response.statusCode !== 200) {
                            console.log(response.statusCode,'------response.statusCode -----');
                            resolve();
                        }
                        else {
                            let chunks = [];
                            body.on('data', function (chunk) {
                                chunks.push(chunk);
                            });
                            body.on('end', function (err) {
                                let data = Buffer.concat(chunks);
                                item.imgdata = data.toString('base64');
                                resolve();
                            });
                        }
                    });
                }).catch(error => {
                    // console.log(error.message,'--------error.message-------');
                    resolve();
                });
            }));
        }

        getList().then(list => {
            Promise.all(list.apps.map(item => getImage(item))).then(() => {
                res.send({error: 0, msg: '数据请求成功', data: list});
            }).catch(error => {
                // console.log('get image by obs error:', error,message);
                res.send({error: 0, msg: '数据请求成功', data: list});
            });
        }).catch(error => {
            res.send({error: 1, msg: error.message, data: null});
        });
    });
    //审核通过
    app.post('/messageCenter/auditMgmt/headToReview/passCheck.ajax', (req, res, next) => {
            let params = req.body;
            let option = {
                pageUrl: '/messageCenter/auditMgmt/headToReview/passCheck.ajax',
                req: req,
                operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
                url: apiUrlList.headImageCheck,
                body: params,
                timeout: 15000,
                json: true
            };
            request.put(option, (error, response, body) => {
                if (error) {
                    return res.send({error: 1, msg: '操作失败'});
                }
                if (body && body.returnCode == 0) {
                    let data = body.body;
                    res.send({error: 0, msg: '查询成功', data: data});
                }
                else if (body && body.returnCode != 9999) {
                    res.send({error: 1, msg: body.returnMsg});
                }
                else {
                    res.send({error: 1, msg: '查询失败'});
                }
            });
        }
    );
    //审核未通过
    app.post('/messageCenter/auditMgmt/headToReview/rejectCheck.ajax', (req, res, next) => {
            let params = req.body;
            let option = {
                pageUrl: '/messageCenter/auditMgmt/headToReview/rejectCheck.ajax',
                req: req,
                operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
                url: apiUrlList.headImageCheck,
                body: params,
                timeout: 15000,
                json: true
            };
            request.put(option, (error, response, body) => {
                if (error) {
                    return res.send({error: 1, msg: '操作失败'});
                }
                if (body && body.returnCode == 0) {
                    let data = body.body;
                    res.send({error: 0, msg: '查询成功', data: data});
                }
                else if (body && body.returnCode != 9999) {
                    res.send({error: 1, msg: body.returnMsg});
                }
                else {
                    res.send({error: 1, msg: '查询失败'});
                }
            });
        }
    );
};
