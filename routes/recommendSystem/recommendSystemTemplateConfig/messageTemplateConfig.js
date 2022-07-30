const request = require('../../../local_data/requestWrapper');
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
const apiUrlList = require('../apiConfig').recommendSystem.recommendSystemTemplateConfig.messageTemplateConfig;
module.exports = function (app) {
    //获取分页查询列表
    app.post('/recommendSystem/recommendSystemTemplateConfig/messageTemplateConfig/queryInfo.ajax', (req, res, next) => {
					if (req.body.channelId) {
						let params = req.body;
						params.pageNo = parseInt(params.pageNo);
						params.pageSize = parseInt(params.pageSize);
						let userId = req.session.loginInfo.userid;
						let option = {
							pageUrl: '/recommendSystem/recommendSystemTemplateConfig/messageTemplateConfig/queryInfo.ajax',
							req: req,
							url: apiUrlList.queryInfo,
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
							if (body && body.returnCode == 0) {
								let data = body.body;
								data.userId = userId;
								data.pages = Math.ceil(data.total / params.pageSize); //最大页码
								data.pageNum = params.pageNo; //当前页
								if (data.rows && Array.isArray(data.rows) && data.rows.length > 0) {
									data.rows.forEach((item) => {
										item.check = false;
									});
								}
								res.send({
									error: 0,
									msg: '查询成功',
									data: data
								});
							} else if (body && body.returnCode != 9999) {
								res.send({
									error: 1,
									msg: body.returnMsg
								});
							} else {
								res.send({
									error: 1,
									msg: '查询失败'
								});
							}
						});
					} else {
						// 获取渠道列表中的第一个渠道
						let getChannelList = new Promise((resolve, reject) => {
							let option = {
								pageUrl: '/recommendSystem/recommendSystemTemplateConfig/messageTemplateConfig/queryInfo.ajax ---getOneChannel',
								req: req,
								url: apiUrlList.channelMenu,
								qs: {
									pageNo: 1,
									pageSize: 9999
								},
								timeout: 15000,
								json: true
							};
							request(option, (error, response, body) => {
								if (error) {
									return reject({
										error: 1,
										msg: '操作失败'
									});
								}
								if (body && body.returnCode == 0) {
									let data = body.body;
									return resolve(data);
								} else if (body && body.returnCode != 9999) {
									return reject({
										error: 1,
										msg: body.returnMsg
									});
								} else {
									return reject({
										error: 1,
										msg: '查询失败'
									});
								}
							});
						})
						getChannelList.then((result) => {
							let channelList = result.rows;
							let firstChannel = channelList && channelList[0] ? channelList[0].channelId : '';
							if (firstChannel) {
								let params = req.body;
								params.pageNo = parseInt(params.pageNo);
								params.pageSize = parseInt(params.pageSize);
								!params.msgConfigId&&(params.channelId = firstChannel);
								let userId = req.session.loginInfo.userid;
								let option = {
									pageUrl: '/recommendSystem/recommendSystemTemplateConfig/messageTemplateConfig/queryInfo.ajax',
									req: req,
									url: apiUrlList.queryInfo,
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
									if (body && body.returnCode == 0) {
										let data = body.body;
										data.userId = userId;
										data.pages = Math.ceil(data.total / params.pageSize); //最大页码
										data.pageNum = params.pageNo; //当前页
										if (data.rows && Array.isArray(data.rows) && data.rows.length > 0) {
											data.rows.forEach((item) => {
												item.check = false;
											});
										}
										data.channelList = channelList;
										res.send({
											error: 0,
											msg: '查询成功',
											data: data
										});
									} else if (body && body.returnCode != 9999) {
										res.send({
											error: 1,
											msg: body.returnMsg
										});
									} else {
										res.send({
											error: 1,
											msg: '查询失败'
										});
									}
								});
							} else {
								res.send({
									error: 1,
									msg: '查询失败'
								});
							}
						}, (error) => {
							res.send({
								error: 1,
								msg: error.msg
							});
						})
					}
        }
    );
    //启用或禁用
    app.post('/recommendSystem/recommendSystemTemplateConfig/messageTemplateConfig/enable.ajax', (req, res, next) => {
            let params = req.body;
            let option = {
                pageUrl: '/recommendSystem/recommendSystemTemplateConfig/messageTemplateConfig/enable.ajax',
                req: req,
                operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
                url: apiUrlList.enable,
                qs: params,
                timeout: 15000,
                json: true
            };
            request(option, (error, response, body) => {
                if (error) {
                    return res.send({error: 1, msg: '操作失败'});
                }
                if (body && body.returnCode == 0) {
                    res.send({error: 0, msg: '操作成功', data: null});
                }
                else if (body && body.returnCode != 9999) {
                    res.send({error: 1, msg: body.returnMsg});
                }
                else {
                    res.send({error: 1, msg: '操作失败'});
                }
            });
        }
    );
    //删除
    app.post('/recommendSystem/recommendSystemTemplateConfig/messageTemplateConfig/delete.ajax', (req, res, next) => {
            let params = req.body;
            let option = {
                pageUrl: '/recommendSystem/recommendSystemTemplateConfig/messageTemplateConfig/delete.ajax',
                req: req,
                operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
                url: apiUrlList.deleteInfo,
                qs: params,
                timeout: 15000,
                json: true
            };
            request(option, (error, response, body) => {
                if (error) {
                    return res.send({error: 1, msg: '操作失败'});
                }
                if (body && body.returnCode == 0) {
                    res.send({error: 0, msg: '操作成功', data: null});
                }
                else if (body && body.returnCode != 9999) {
                    res.send({error: 1, msg: body.returnMsg});
                }
                else {
                    res.send({error: 1, msg: '操作失败'});
                }
            });
        }
    );
    //新增
    app.post('/recommendSystem/recommendSystemTemplateConfig/messageTemplateConfig/add.ajax', (req, res, next) => {

        let option = {
            pageUrl: '/recommendSystem/recommendSystemTemplateConfig/messageTemplateConfig/add.ajax',
            req: req,
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.add,
            body: req.body,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0) {
                res.send({error: 0, msg: '添加成功'});
            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: 1, msg: '添加失败'});
            }
        });
    });
    //修改
    app.post('/recommendSystem/recommendSystemTemplateConfig/messageTemplateConfig/update.ajax', (req, res, next) => {

        let option = {
            pageUrl: '/recommendSystem/recommendSystemTemplateConfig/messageTemplateConfig/update.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.update,
            body: req.body,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0) {
                res.send({error: 0, msg: '修改成功'});
            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: 1, msg: '修改失败'});
            }
        });
    });
    //刷新缓存
    app.post('/recommendSystem/recommendSystemTemplateConfig/messageTemplateConfig/fresh.ajax', (req, res, next) => {
            let option = {
                pageUrl: '/recommendSystem/recommendSystemTemplateConfig/messageTemplateConfig/fresh.ajax',
                req: req,
                operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
                url: apiUrlList.fresh,
                timeout: 15000,
                json: true
            };
            request(option, (error, response, body) => {
                if (error) {
                    return res.send({error: 1, msg: '操作失败'});
                }
                if (body && body.returnCode == 0) {
                    res.send({error: 0, msg: '操作成功', data: null});
                }
                else if (body && body.returnCode != 9999) {
                    res.send({error: 1, msg: body.returnMsg});
                }
                else {
                    res.send({error: 1, msg: '操作失败'});
                }
            });
        }
    );
    //Viewlist
    app.post('/recommendSystem/recommendSystemTemplateConfig/messageTemplateConfig/viewList.ajax', (req, res, next) => {
            let option = {
                pageUrl: '/recommendSystem/recommendSystemTemplateConfig/messageTemplateConfig/viewList.ajax',
                req: req,
                url: apiUrlList.viewList,
                qs: req.body,
                timeout: 15000,
                json: true
            };
            request(option, (error, response, body) => {
                if (error) {
                    return res.send({error: 1, msg: '操作失败'});
                }
                if (body && body.returnCode == 0) {
                    if (body.body && body.body.rows) {
                        body.body.rows.forEach(function (item) {
                            item.previewImgurl = global.envConfig.pagePreviewImgurl + item.previewImgurl;
                        })
                    }
                    let data = body.body;
                    res.send({
                        error: 0,
                        msg: '查询成功',
                        data: data
                    });
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
    //渠道列表
    app.post('/recommendSystem/recommendSystemTemplateConfig/messageTemplateConfig/channelMenu.ajax', (req, res, next) => {
            let option = {
                pageUrl: '/recommendSystem/recommendSystemTemplateConfig/messageTemplateConfig/channelMenu.ajax',
                req: req,
                url: apiUrlList.channelMenu,
                qs: req.body,
                timeout: 15000,
                json: true
            };
            request(option, (error, response, body) => {
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
