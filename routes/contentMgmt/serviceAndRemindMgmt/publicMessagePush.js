const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').serviceAndRemindMgmt.publicMessagePush;
const baseUrl = '/contentMgmt/serviceAndRemindMgmt/publicMessagePush';
const XLSX = require('xlsx');
const node_xlsx = require('node-xlsx');
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
module.exports = function (app) {
    // 获取初始数据和查询
    app.post('/contentMgmt/serviceAndRemindMgmt/publicMessagePush/getTableData.ajax', (req, res, next) => {
        let params = req.body

        let option = {
            pageUrl: '/contentMgmt/serviceAndRemindMgmt/publicMessagePush/getTableData.ajax',
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
            console.log("body==", body);
            console.log("result==", result);
            if (result && result.returnCode === 0) {
                result.body.forEach(function(item){
					console.log(item.schedulePushTime);
                     item.schedulePushTime = cronTransferTime(item.schedulePushTime);
                })
                return res.send({
                    error: 0,
                    msg: '查询成功',
                    data: body
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
    //公众号消息的内容标题 /api/templateMessageOptions
    app.post('/contentMgmt/serviceAndRemindMgmt/publicMessagePush/getMessageOptions.ajax', (req, res, next) => {
        let params = req.body

        let option = {
            pageUrl: '/contentMgmt/serviceAndRemindMgmt/publicMessagePush/getMessageOptions.ajax',
            req,
            url: apiUrlList.getMessageOptions,
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
            console.log("body==", body);
            console.log("result==", result);
            if (result && result.returnCode === 0) {
                return res.send({
                    error: 0,
                    msg: '查询成功',
                    data: body
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
    //获取已有的产品列表
    app.post('/advertising/serviceAndRemindMgmt/publicMessagePush/getProductList.ajax', (req, res, next) => {
        let params = req.body
        
        let option = {
            pageUrl: '/advertising/serviceAndRemindMgmt/publicMessagePush/getProductList.ajax',
            req,
            url: apiUrlList.getProductList,
            // body: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '获取产品列表失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            console.log("body==", body);
            console.log("result==", result);
            if (result && result.returnCode === 0) {
                return res.send({
                    error: 0,
                    msg: '获取产品列表成功',
                    data: body
                });
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '获取产品列表失败'
                });
            }
        });
    });
    //  getPopupList: `${advertising}/popup/list`,
    app.post('/contentMgmt/serviceAndRemindMgmt/publicMessagePush/getPopupList.ajax', (req, res, next) => {
        let params = req.body
        let option = {
            pageUrl: '/contentMgmt/serviceAndRemindMgmt/publicMessagePush/getPopupList.ajax',
            req,
            url: apiUrlList.getPopupList,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '获取列表失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            console.log("body==", body);
            console.log("result==", result);
            if (result && result.returnCode === 0) {
                return res.send({
                    error: 0,
                    msg: '获取列表成功',
                    data: body
                });
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '获取列表失败'
                });
            }
        });
    });
    // 新增
    app.post(`${baseUrl}/add.ajax`, (req, res, next) => {
		// console.log('scheduleTime====',req.body.setData['scheduleTime']);
		// let scheduleTime = req.body.setData['scheduleTime'];
		// let timeTransfer = timeTransferCron(scheduleTime);
		// console.log('timeTransfer===',timeTransfer);
		req.body.setData['scheduleTime'] = timeTransferCron(req.body.setData['scheduleTime']);
        let params =req.body.setData;
        console.log("====",params)
		// return
        // params.createBy= req.session.loginInfo.userid;
        // params.modifyBy= req.session.loginInfo.userid;
        let option = {
            pageUrl: `${baseUrl}/add.ajax`,
            req: req,
            // operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.add,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '保存失败',
                    data: null
                });
            }
            if (body.returnCode === 0) {
                res.send({
                    error: 0,
                    msg: '保存成功',
                    data: null
                });
            } else if (body && body.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: body.returnMsg,
                    data: null
                });
            } else {
                res.send({
                    error: 1,
                    msg: '保存失败',
                    data: null
                });
            }
        });
    });
    
    // 修改
    app.post(`${baseUrl}/update.ajax`, (req, res, next) => {
        // let getReplace=req.body.setData['scheduleTime'].replace(/\s/g,'').split(',');
        req.body.setData['scheduleTime']= timeTransferCron( req.body.setData['scheduleTime']);
        let params =req.body.setData;
        console.log("====",params)
        // params.createBy= req.session.loginInfo.userid;
        // params.modifyBy= req.session.loginInfo.userid; 
        console.log("ruleId===",req.body.ruleId); 
        let option = {
            pageUrl: `${baseUrl}/update.ajax`,
            req: req,
            // operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.update,
            body: params,
			qs:{ruleId:req.body.ruleId},
            timeout: 15000,
            json: true
        };
        
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '修改失败',
                    data: null
                });
            }
            if (body.returnCode === 0) {
                res.send({
                    error: 0,
                    msg: '修改成功',
                    data: null
                });
            } else if (body && body.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: body.returnMsg,
                    data: null
                });
            } else {
                res.send({
                    error: 1,
                    msg: '修改失败',
                    data: null
                });
            }
        });
    });

    // 删除
    app.post('/contentMgmt/serviceAndRemindMgmt/publicMessagePush/deleteParam.ajax', (req, res, next) => {
        let params = req.body
      
        params.ruleId = req.body.ruleId;
        let option = {
            pageUrl: '/contentMgmt/serviceAndRemindMgmt/publicMessagePush/deleteParam.ajax',
            req,
            operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.deleteParam,
            qs: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '删除失败',
                    data: null
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode === 0) {
                return res.send({
                    error: 0,
                    msg: '删除成功',
                    data: null
                });
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '删除失败',
                    data: null
                });
            }
        });
    });


    // 获取内容选择弹窗的一二级查询分类素材
    app.post('/contentMgmt/serviceAndRemindMgmt/publicMessagePush/getTagAll.ajax', (req, res, next) => {
       
        new Promise(function (resolve, reject) {
            let params = {};
            let option = {
                pageUrl: '/contentMgmt/serviceAndRemindMgmt/publicMessagePush/getTagAll.ajax',
                req,
                url: apiUrlList.allClassifyList,
                // body: params,
                timeout: 15000,
                json: true
            };
            request(option, (error, response, body) => {
                if (error) {
                    return res.send({
                        error: 1,
                        msg: '查询一二级分类失败'
                    });
                }
                let result = typeof body === 'string' ? JSON.parse(body) : body;
                console.log("body==", body);
                console.log("result==", result);
                if (result && result.returnCode === 0) {
                    // return res.send({
                    //     error: 0,
                    //     msg: '查询成功',
                    //     data: body
                    // });

                    let resultData = {};
                    resultData.allTagList = result.body;  //所有分类数据

                    let arr=result.body.filter(function(item){  //过滤拿到投教与策略的数据
                        return item.categoryName=='投教与策略';
                    });
                    resultData.investTag =arr;
                    let getTeachTag=""; 
                    arr.forEach(function(item){
                          item.categoryConfigList.filter(function(secondTag){
                            // return secondTag.categoryName=='投教专区';
                             if(secondTag.categoryName=='投教专区'){  //获取投教专区的
                                getTeachTag=secondTag;
                            }
                          })   
                    });

                    resultData.teachTag=getTeachTag;
                    resolve(resultData);
                    // return res.send({
                    //     error: 0,
                    //     msg: '获取成功',
                    //     data: resultData
                    // });

                } else if (result && result.returnCode != 9999) {
                    return res.send({
                        error: 1,
                        msg: result.returnMsg
                    });
                } else {
                    return res.send({
                        error: 1,
                        msg: '查询一二级分类失败'
                    });
                }
            });
        })
        .then(function (resultData) {
            return new Promise((resolve, reject) => {
                let params = {};
                params.parentCategoryId=resultData.teachTag.categoryId;
                let option = {
                    pageUrl: '/contentMgmt/serviceAndRemindMgmt/publicMessagePush/threeClassifyList.ajax',
                    req,
                    url: apiUrlList.threeClassifyList,
                    qs: params,
                    timeout: 15000,
                    json: true
                };
                request(option, (error, response, body) => {
                    if (error) {
                        return res.send({
                            error: 1,
                            msg: '查询三级分类失败'
                        });
                    }
                    let result = typeof body === 'string' ? JSON.parse(body) : body;
                    console.log("body==", body);
                    console.log("result==", result);
                    if (result && result.returnCode === 0) {
                        resultData.menuList= result.body;
                        return res.send({
                            error: 0,
                            msg: '查询成功',
                            data: resultData
                        });
                    } else if (result && result.returnCode != 9999) {
                        return res.send({
                            error: 1,
                            msg: result.returnMsg
                        });
                    } else {
                        return res.send({
                            error: 1,
                            msg: '查询三级分类失败'
                        });
                    }
                });
            })
        })
        .catch(function (error) {
            return res.send({
                error: 1,
                msg: '查询失败'
            });
        })   
    });

    // 获取三级分类
    app.post('/contentMgmt/serviceAndRemindMgmt/publicMessagePush/threeClassifyList.ajax', (req, res, next) => {
        let params = {};
        params.parentCategoryId=req.body.parentCategoryId;
        let option = {
            pageUrl: '/contentMgmt/serviceAndRemindMgmt/publicMessagePush/threeClassifyList.ajax',
            req,
            url: apiUrlList.threeClassifyList,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '查询三级分类失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            console.log("body==", body);
            console.log("result==", result);
            if (result && result.returnCode === 0) {
                return res.send({
                    error: 0,
                    msg: '查询成功',
                    data: body
                });
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '查询三级分类失败'
                });
            }
        });
    });

    //获取现有素材材料数据
    app.post('/contentMgmt/serviceAndRemindMgmt/publicMessagePush/searchMaterial.ajax', (req, res, next) => {
        // let params = {};
        let params = req.body;
        // params.categoryId =req.body.categoryId; 
        console.log("------------",params);
        let option = {
            pageUrl: '/contentMgmt/serviceAndRemindMgmt/publicMessagePush/searchMaterial.ajax',
            req,
            url: apiUrlList.searchMaterial,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '查询现有材料失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            console.log("body==", body);
            console.log("result==", result);
            if (result && result.returnCode === 0) {
                return res.send({
                    error: 0,
                    msg: '查询成功',
                    data: body
                });
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '查询现有材料失败'
                });
            }
        });
    });


    //用materiaId获取单个素材数据
    app.post('/contentMgmt/serviceAndRemindMgmt/publicMessagePush/getSingleMaterial.ajax', (req, res, next) => {
        let params = {};
        params.templateId =req.body.templateId; 
        console.log("------------",params);
        let option = {
            pageUrl: '/contentMgmt/serviceAndRemindMgmt/publicMessagePush/getSingleMaterial.ajax',
            req,
            url: apiUrlList.getSingleMaterial,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '查询单个材料失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            console.log("body==", body);
            console.log("result==", result);
            if (result && result.returnCode === 0) {
                return res.send({
                    error: 0,
                    msg: '查询成功',
                    data: body
                });
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '查询单个材料失败'
                });
            }
        });
    });

}
function timeTransferCron(val){
	console.log('haha',val);
	let [yyyymmdd,hhmmss] = val.split(' ');
	let [year,month,day] = yyyymmdd.split('-');
	let [hh,mm,ss] = hhmmss.split(':');
	if(Number(hh)<10){
		hh = hh.substring(1,hh.length);
	}
	if(Number(ss)<10){
		ss = ss.substring(1,ss.length);
	}
	if(Number(mm)<10){
		mm = mm.substring(1,mm.length);
	}
	if(Number(day)<10){
		day = day.substring(1,day.length);
	}
	if(Number(month)<10){
		month = month.substring(1,month.length);
	}
	return `${ss} ${mm} ${hh} ${day} ${month} ? ${year}`
}

function cronTransferTime(val){
	let [ss,mm,hh,day,month,week,year] = val.split(' ');
	if(Number(hh)<10){
		hh = '0'+hh;
	}
	if(Number(ss)<10){
		ss = '0'+ss
	}
	if(Number(mm)<10){
		mm = '0'+mm
	}
	if(Number(day)<10){
		day = '0'+day
	}
	if(Number(month)<10){
		month = '0'+month;
	}
	return `${year}-${month}-${day} ${hh}:${mm}:${ss}`
}