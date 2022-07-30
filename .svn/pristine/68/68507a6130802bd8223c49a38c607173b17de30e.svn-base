const request = require('../../../local_data/requestWrapper');
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
const apiUrlList = require('../apiConfig').recommendSystem.recommendSystemConfigMgmt.positionTheGroupConfig;
module.exports = function (app) {
    //查询一级菜单列表
    app.post('/recommendSystem/recommendSystemConfigMgmt/positionTheGroupConfig/queryMenuList.ajax', (req, res, next) => {
					if(req.body.channelId){
						let option = {
							pageUrl: '/recommendSystem/recommendSystemConfigMgmt/positionTheGroupConfig/queryMenuList.ajax',
							req: req,
							qs:req.body,
							url: apiUrlList.queryMenuList,
							timeout: 15000,
							json: true
						};
						request(option, (error, response, body) => {
							if (error) {
									return res.send({error: 1, msg: '操作失败'});
							}
							if (body && body.returnCode == 0) {
									let dataObj = {}
									dataObj.firstMenuList = body.body;
									res.send({error: 0, msg: '操作成功', data: dataObj});
							}
							else if (body && body.returnCode != 9999) {
									res.send({error: 1, msg: body.returnMsg});
							}
							else {
									res.send({error: 1, msg: '操作失败'});
							}
					});
					}else{
						let getChannelList = new Promise((resolve, reject) => {
							let option = {
								pageUrl: '/recommendSystem/recommendSystemTemplateConfig/positionTheGroupConfig/queryInfo.ajax ---getOneChannel',
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
								let option = {
									pageUrl: '/recommendSystem/recommendSystemConfigMgmt/positionTheGroupConfig/queryMenuList.ajax',
									req: req,
									qs:{channelId:firstChannel},
									url: apiUrlList.queryMenuList,
									timeout: 15000,
									json: true
								};
								request(option, (error, response, body) => {
										if (error) {
												return res.send({error: 1, msg: '操作失败'});
										}
										if (body && body.returnCode == 0) {
												let dataObj = {}
												dataObj.firstMenuList = body.body;
												dataObj.channelList = channelList;
												res.send({error: 0, msg: '操作成功', data: dataObj});
										}
										else if (body && body.returnCode != 9999) {
												res.send({error: 1, msg: body.returnMsg});
										}
										else {
												res.send({error: 1, msg: '操作失败'});
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
    //查询二级/三级菜单列表
    app.post('/recommendSystem/recommendSystemConfigMgmt/positionTheGroupConfig/querySubmenuList.ajax', (req, res, next) => {
            let option = {
                pageUrl: '/recommendSystem/recommendSystemConfigMgmt/positionTheGroupConfig/querySubmenuList.ajax',
                req: req,
                url: apiUrlList.querySubmenuId,
                qs:req.body,
                timeout: 15000,
                json: true
            };
            request(option, (error, response, body) => {
                if (error) {
                    return res.send({error: 1, msg: '操作失败'});
                }
                if (body && body.returnCode == 0) {
                    res.send({error: 0, msg: '操作成功', data: body.body});
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
    //获取信息
    app.post('/recommendSystem/recommendSystemConfigMgmt/positionTheGroupConfig/queryDetail.ajax', (req, res, next) => {
            let userId= req.session.loginInfo.userid;
            let option = {
                pageUrl: '/recommendSystem/recommendSystemConfigMgmt/positionTheGroupConfig/queryDetail.ajax',
                req: req,
                url: apiUrlList.queryDetail,
                qs:req.body,
                timeout: 15000,
                json: true
            };
            request(option, (error, response, body) => {
                if (error) {
                    return res.send({error: 1, msg: '操作失败'});
                }
                if (body && body.returnCode == 0) {
                    res.send({error: 0, msg: '操作成功', data: body.body,user:userId});
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

    //获取userGroupList
    app.post('/recommendSystem/recommendSystemConfigMgmt/positionTheGroupConfig/getUserGroupList.ajax', (req, res, next) => {
            let option = {
                pageUrl: '/recommendSystem/recommendSystemConfigMgmt/positionTheGroupConfig/getUserGroupList.ajax',
                req: req,
                url: apiUrlList.userGroupList,
                timeout: 15000,
                json: true
            };
            request(option, (error, response, body) => {
                if (error) {
                    return res.send({error: 1, msg: '操作失败'});
                }
                if (body && body.returnCode == 0) {
                    res.send({error: 0, msg: '操作成功', data: body.body});
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
    //更新分组管理列表
    app.post('/recommendSystem/recommendSystemConfigMgmt/positionTheGroupConfig/saveData.ajax', (req, res, next) => {
            let option = {
                pageUrl: '/recommendSystem/recommendSystemConfigMgmt/positionTheGroupConfig/saveData.ajax',
                req: req,
                operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
                url: apiUrlList.updateFrom,
                qs:req.body,
                timeout: 15000,
                json: true
            };
            request.post(option, (error, response, body) => {
                if (error) {
                    return res.send({error: 1, msg: '操作失败'});
                }
                if (body && body.returnCode == 0) {
                    res.send({error: 0, msg: '操作成功', data: body.body});
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
};
