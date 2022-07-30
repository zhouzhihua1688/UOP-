const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').recommendSystem.recommendSystemConfigMgmt.layoutConfigMgmt;
module.exports = function (app) {
    //获取分页查询列表
    app.post('/recommendSystem/recommendSystemConfigMgmt/layoutConfigMgmt/queryInfo.ajax', (req, res, next) => {
					if (req.body.channelId) {
						let params = req.body;
						params.pageNo = parseInt(params.pageNo);
						params.pageSize = parseInt(params.pageSize);
						let userId = req.session.loginInfo.userid;
						let option = {
							pageUrl: '/recommendSystem/recommendSystemTemplateConfig/layoutConfigMgmt/queryInfo.ajax',
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
								pageUrl: '/recommendSystem/recommendSystemTemplateConfig/layoutConfigMgmt/queryInfo.ajax ---getOneChannel',
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
								params.channelId = firstChannel;
								let userId = req.session.loginInfo.userid;
								let option = {
									pageUrl: '/recommendSystem/recommendSystemTemplateConfig/layoutConfigMgmt/queryInfo.ajax',
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
    //删除
    app.post('/recommendSystem/recommendSystemConfigMgmt/layoutConfigMgmt/delete.ajax', (req, res, next) => {
            let params = req.body;
            let option = {
                pageUrl: '/recommendSystem/recommendSystemConfigMgmt/layoutConfigMgmt/delete.ajax',
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
    app.post('/recommendSystem/recommendSystemConfigMgmt/layoutConfigMgmt/add.ajax', (req, res, next) => {

        let option = {
            pageUrl: '/recommendSystem/recommendSystemConfigMgmt/layoutConfigMgmt/add.ajax',
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
    app.post('/recommendSystem/recommendSystemConfigMgmt/layoutConfigMgmt/update.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/recommendSystem/recommendSystemConfigMgmt/layoutConfigMgmt/update.ajax',
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
    //启用或禁用
    app.post('/recommendSystem/recommendSystemConfigMgmt/layoutConfigMgmt/enable.ajax', (req, res, next) => {
            let params = req.body;
            let option = {
                pageUrl: '/recommendSystem/recommendSystemConfigMgmt/layoutConfigMgmt/enable.ajax',
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
    //模板配置查询
    app.post('/recommendSystem/recommendSystemConfigMgmt/layoutConfigMgmt/queryTemplateInfo.ajax', (req, res, next) => {
            let params={};
            params.layoutId=req.body.layoutId;
            params.pageNo=1;
            params.pageSize=2000;
            let option = {
                pageUrl: '/recommendSystem/recommendSystemConfigMgmt/layoutConfigMgmt/queryTemplateInfo.ajax',
                req: req,
                url: apiUrlList.templateQueryInfo,
                qs: params,
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
    //删除
    app.post('/recommendSystem/recommendSystemConfigMgmt/layoutConfigMgmt/deleteTemplate.ajax', (req, res, next) => {
            let params = req.body;
            let option = {
                pageUrl: '/recommendSystem/recommendSystemConfigMgmt/layoutConfigMgmt/deleteTemplate.ajax',
                req: req,
                operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
                url: apiUrlList.templateDeleteInfo,
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
    app.post('/recommendSystem/recommendSystemConfigMgmt/layoutConfigMgmt/addTemplate.ajax', (req, res, next) => {

        let option = {
            pageUrl: '/recommendSystem/recommendSystemConfigMgmt/layoutConfigMgmt/addTemplate.ajax',
            req: req,
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.templateAdd,
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
    app.post('/recommendSystem/recommendSystemConfigMgmt/layoutConfigMgmt/updateTemplate.ajax', (req, res, next) => {

        let option = {
            pageUrl: '/recommendSystem/recommendSystemConfigMgmt/layoutConfigMgmt/updateTemplate.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.templateUpdate,
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
    //启用或禁用
    app.post('/recommendSystem/recommendSystemConfigMgmt/layoutConfigMgmt/enableTemplate.ajax', (req, res, next) => {
            let params = req.body;
            let option = {
                pageUrl: '/recommendSystem/recommendSystemConfigMgmt/layoutConfigMgmt/enableTemplate.ajax',
                req: req,
                operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
                url: apiUrlList.templateEnable,
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
    //刷新
    app.post('/recommendSystem/recommendSystemConfigMgmt/layoutConfigMgmt/fresh.ajax', (req, res, next) => {
            let option = {
                pageUrl: '/recommendSystem/recommendSystemConfigMgmt/layoutConfigMgmt/fresh.ajax',
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
    //默认布局刷新
    app.post('/recommendSystem/recommendSystemConfigMgmt/layoutConfigMgmt/morenFresh.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/recommendSystem/recommendSystemConfigMgmt/layoutConfigMgmt/morenFresh.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.morenFresh,
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
    });
    //拉取channel列表
    app.post('/recommendSystem/recommendSystemConfigMgmt/layoutConfigMgmt/channelMenu.ajax', (req, res, next) => {
            let params = {};
            params.pageNo=1;
            params.pageSize=9999;
            let option = {
                pageUrl: '/recommendSystem/recommendSystemConfigMgmt/layoutConfigMgmt/channelMenu.ajax',
                req: req,
                url: apiUrlList.channelMenu,
                qs: params,
                timeout: 15000,
                json: true
            };
            request(option, (error, response, body) => {
                if (error) {
                    return res.send({error: 1, msg: '渠道列表获取失败'});
                }
                if (body && body.returnCode == 0) {
                    res.send({error: 0, msg: '操作成功', data: body.body});
                }
                else if (body && body.returnCode != 9999) {
                    res.send({error: 1, msg: body.returnMsg});
                }
                else {
                    res.send({error: 1, msg: '渠道列表获取失败'});
                }
            });
        }
    );
    //拉取template列表
    app.post('/recommendSystem/recommendSystemConfigMgmt/layoutConfigMgmt/templateIdList.ajax', (req, res, next) => {
            let params = {};
            params.pageNo=1;
            params.pageSize=9999;
            let option = {
                pageUrl: '/recommendSystem/recommendSystemConfigMgmt/layoutConfigMgmt/templateIdList.ajax',
                req: req,
                url: apiUrlList.templateIdList,
                qs: params,
                timeout: 15000,
                json: true
            };
            request(option, (error, response, body) => {
                if (error) {
                    return res.send({error: 1, msg: '模板列表获取失败'});
                }
                if (body && body.returnCode == 0) {
                    res.send({error: 0, msg: '操作成功', data: body.body});
                }
                else if (body && body.returnCode != 9999) {
                    res.send({error: 1, msg: body.returnMsg});
                }
                else {
                    res.send({error: 1, msg: '模板列表获取失败'});
                }
            });
        }
    );
};
