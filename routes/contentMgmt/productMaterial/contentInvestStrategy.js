const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').productMaterial.contentInvestStrategy;
const baseUrl = '/contentMgmt/productMaterial/contentInvestStrategy';
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
const apiConfig = require('../apiConfig');
const filePathExternal = apiConfig.filePathExternal + '/productMaterial';
const filePathExternalReal = apiConfig.filePathExternal + '/productMaterial/contentInvestStrategy';
const filePathExternalBak = apiConfig.filePathExternal + '/productMaterial/contentInvestStrategy/bak';
const filePathExternal_url = apiConfig.filePafilePathExternalthUrl + '/productMaterial/contentInvestStrategy';//返回给前端的路径
module.exports = function (app) {
    // 获取初始主页面数据和查询
    app.post('/contentMgmt/productMaterial/contentInvestStrategy/getTableData.ajax', (req, res, next) => {
        // let params = {};
        let params = req.body;
        // params.pageNo=req.body.pageNo;
        // params.pageSize=req.body.pageSize;
        console.log("------------",params);
        let option = {
            pageUrl: '/contentMgmt/productMaterial/contentInvestStrategy/getTableData.ajax',
            req,
            url: apiUrlList.getTableData,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '查询主数据失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            console.log("body==", body);
            console.log("result==", result);
            if (result && result.returnCode === 0) {
                return res.send({
                    error: 0,
                    msg: '查询主数据成功',
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
                    msg: '查询主数据失败'
                });
            }
        });
    });
    // 获取材料主题字段的名字
    app.post('/contentMgmt/productMaterial/contentInvestStrategy/getThemeList.ajax', (req, res, next) => {
        // let params = {};
        let params = req.body;
        let option = {
            pageUrl: '/contentMgmt/productMaterial/contentInvestStrategy/getThemeList.ajax',
            req,
            url: apiUrlList.getThemeList,
            qs: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '查询材料主题失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode === 0) {
                return res.send({
                    error: 0,
                    msg: '查询材料主题成功',
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
                    msg: '查询材料主题失败'
                });
            }
        });
    });

    // 新增
    app.post(`${baseUrl}/add.ajax`, (req, res, next) => {
        let params = req.body;
        params.createBy= req.session.loginInfo.userid;
        params.modifyBy= req.session.loginInfo.userid;
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
        let params = req.body;
        params.createBy= req.session.loginInfo.userid;
        params.modifyBy= req.session.loginInfo.userid;
        let option = {
            pageUrl: `${baseUrl}/update.ajax`,
            req: req,
            // operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.update,
            body: params,
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
    app.post('/contentMgmt/productMaterial/contentInvestStrategy/del.ajax', (req, res, next) => {
        let params = {};
        params.mediaId = req.body.mediaId;
        let option = {
            pageUrl: '/contentMgmt/productMaterial/contentInvestStrategy/del.ajax',
            req,
            operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.del,
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
    // 获取一二级分类
    app.post('/contentMgmt/productMaterial/contentInvestStrategy/classifyList.ajax', (req, res, next) => {
        let params = {};
        // console.log("------------",params)
        let option = {
            pageUrl: '/contentMgmt/productMaterial/contentInvestStrategy/classifyList.ajax',
            req,
            url: apiUrlList.classifyList,
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
                    msg: '查询一二级分类失败'
                });
            }
        });
    });

    // 获取三级分类
    app.post('/contentMgmt/productMaterial/contentInvestStrategy/threeClassifyList.ajax', (req, res, next) => {
        let params = {};
        params.parentCategoryId=req.body.parentCategoryId;
        let option = {
            pageUrl: '/contentMgmt/productMaterial/contentInvestStrategy/threeClassifyList.ajax',
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


    app.post('/contentMgmt/productMaterial/contentInvestStrategy/getTagAll.ajax', (req, res, next) => {
       
        new Promise(function (resolve, reject) {
            let params = {};
            let option = {
                pageUrl: '/contentMgmt/productMaterial/contentInvestStrategy/getTagAll.ajax',
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
                            // return secondTag.categoryName=='内部投资策略';
                             if(secondTag.categoryName=='内部投资策略'){  //获取内部投资策略的
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
                    pageUrl: '/contentMgmt/productMaterial/contentInvestStrategy/threeClassifyList.ajax',
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


    // app.post('/contentMgmt/productMaterial/contentInvestStrategy/getTagAll.ajax', (req, res, next) => {
    //     console.log("=========",11111111111);
    //     function queryClassifyList() {
    //         return new Promise((resolve, reject) => {               
    //             let params = {};
    //             params.parentCategoryId=req.body.parentCategoryId;
    //             console.log(params);
    //             let option = {
    //                 pageUrl: '/contentMgmt/productMaterial/contentInvestStrategy/getTagAll.ajax',
    //                 req,
    //                 url: apiUrlList.allClassifyList,
    //                 // qs:{
    //                 //     parentCategoryId: req.body.parentCategoryId,
    //                 // },
    //                 timeout: 15000,
    //                 json: true
    //             };
    //             request(option, (error, response, body) => {
    //                 if (error) {
    //                     return reject();
    //                 }
    //                 let result = typeof body === 'string' ? JSON.parse(body) : body;
    //                 console.log("body==", body);
    //                 console.log("result==", result);
    //                 if (result && result.returnCode === 0) {
    //                     // return res.send({
    //                     //     error: 0,
    //                     //     msg: '查询成功',
    //                     //     data: body
    //                     // });

    //                     // let resultArr =result.body;

    //                     // let classifyList=result.body.filter(function(item){  //过滤拿到投教与策略的数据
    //                     //     return item.categoryName=='投教与策略';
    //                     // })
                     
    //                     let resultArr =result.body.map(function(item){
    //                         let obj = {};
    //                         obj.tagList = item;
    //                         obj.firstTag=item.filter(function(itemTag){
    //                              return itemTag.categoryName=='投教与策略'
    //                         }) 
    //                         return item; 
    //                     })
    //                     // console.log("-------data:",result.body);
    //                     return resolve(resultArr);
    //                     // return resolve(classifyList);
    //                 } else if (result && result.returnCode != 9999) {
    //                     // return res.send({
    //                     //     error: 1,
    //                     //     msg: result.returnMsg
    //                     // });
    //                     return reject();
    //                 } else {
    //                     // return res.send({
    //                     //     error: 1,
    //                     //     msg: '查询分类失败'
    //                     // });
    //                     return reject();
    //                 }
    //             });
    //         });
    //     }
    //     let finalRequestArr = [];
    //     finalRequestArr.push(queryClassifyList());
    //     Promise.all(finalRequestArr).then(function(result){
    //             return res.send({
    //             error: 0,
    //             msg: '查询成功',
    //             data: result
    //         });
   
    //     }).catch(error => {
    //         return res.send({
    //             error: 1,
    //             msg: '查询失败'
    //         });
    //     });
        
    // });



    // 获取新增里面关联标签
    app.post('/contentMgmt/productMaterial/contentInvestStrategy/getTagList.ajax', (req, res, next) => {
        let params = {};
        let option = {
            pageUrl: '/contentMgmt/productMaterial/contentInvestStrategy/getTagList.ajax',
            req,
            url: apiUrlList.getTagList,
            // qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '查询关联标签失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            console.log("body==", body);
            console.log("result==", result);
            if (result && result.returnCode === 0) {
                return res.send({
                    error: 0,
                    msg: '查询关联标签成功',
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
                    msg: '查询关联标签失败'
                });
            }
        });
    });

     // 获取新增里面关联标签-二级
     app.post('/contentMgmt/productMaterial/contentInvestStrategy/getSecondTagList.ajax', (req, res, next) => {
        let params = {};
        params.tagCategoryId=req.body.tagCategoryId;
        let option = {
            pageUrl: '/contentMgmt/productMaterial/contentInvestStrategy/getSecondTagList.ajax',
            req,
            url: apiUrlList.getSecondTagList,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '查询关联标签失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            console.log("body==", body);
            console.log("result==", result);
            if (result && result.returnCode === 0) {
                return res.send({
                    error: 0,
                    msg: '查询关联标签成功',
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
                    msg: '查询关联标签失败'
                });
            }
        });
    });

    // 获取基金列表
    app.post('/contentMgmt/productMaterial/contentInvestStrategy/fundList.ajax', (req, res, next) => {
        let params = {};
        params.pageNum = '1';
        params.pageSize = '99';
        let option = {
            pageUrl: '/contentMgmt/productMaterial/contentInvestStrategy/fundList.ajax',
            req,
            url: apiUrlList.fundList,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '查询产品代码失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0 && Array.isArray(result.body.fundInfos)) {
                let fundData = {};
                // fundData.pageNum = result.body.pageNum; //页数
                // fundData.totalSize = Math.ceil(result.body.totalSize / req.body.pageSize); //总页数d;//总页数
                fundData.listData = result.body.fundInfos;
                return res.send({
                    error: 0,
                    msg: '查询成功',
                    data: fundData
                });
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '查询产品代码失败'
                });
            }
        });
    });
    // 获取基金经理
    app.post('/contentMgmt/productMaterial/contentInvestStrategy/getManagerList.ajax', (req, res, next) => {
        let params = {};
        let option = {
            pageUrl: '/contentMgmt/productMaterial/contentInvestStrategy/getManagerList.ajax',
            req,
            url: apiUrlList.getManagerList,
            // qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '查询基金经理失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            console.log("body==", body);
            console.log("result==", result);
            if (result && result.returnCode === 0) {
                return res.send({
                    error: 0,
                    msg: '查询基金经理成功',
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
                    msg: '查询基金经理失败'
                });
            }
        });
    });

    // 获取修改的details
    app.post('/contentMgmt/productMaterial/contentInvestStrategy/getUpdateDetails.ajax', (req, res, next) => {
        let params = {};
        params.materiaIdList =req.body.materiaIdList;
        console.log(params);
        let option = {
            pageUrl: '/contentMgmt/productMaterial/contentInvestStrategy/getUpdateDetails.ajax',
            req,
            url: apiUrlList.getUpdateDetails,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '查询详细失败'
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
                    msg: '查询详细失败'
                });
            }
        });
    });

    //获取现有材料数据
    app.post('/contentMgmt/productMaterial/contentInvestStrategy/searchMaterial.ajax', (req, res, next) => {
        // let params = {};
        let params = req.body;
        // params.categoryId =req.body.categoryId; 
        console.log("------------",params);
        let option = {
            pageUrl: '/contentMgmt/productMaterial/contentInvestStrategy/searchMaterial.ajax',
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
     // 获取渠道权限列表
	app.post(`${baseUrl}/getbranchList.ajax`, (req, res, next) => {
        let option = {
                pageUrl: `${baseUrl}/getbranchList.ajax --productMaterial`,
                req,
                url: apiUrlList.branchList,
                qs: {group:"tfyj"},
                timeout: 15000,
                json: true
        };
        request(option, (error, response, body) => {
                if (error) {
                        return res.send({
                                error: 1,
                                msg: '查询渠道权限失败'
                        });
                }
                let result = typeof body === 'string' ? JSON.parse(body) : body;
                if (result && result.returnCode === 0) {
                        return res.send({
                                error: 0,
                                msg: '查询成功',
                                data: result.body
                        });
                } else if (result && result.returnCode != 9999) {
                        return res.send({
                                error: 1,
                                msg: result.returnMsg
                        });
                } else {
                        return res.send({
                                error: 1,
                                msg: '查询渠道权限失败'
                        });
                }
        });
    });

    // 上传材料
    app.post('/contentMgmt/productMaterial/contentInvestStrategy/uploadFile.ajax', (req, res, next) => {
        try {
            !fs.existsSync(apiConfig.filePathExternal) && fs.mkdirSync(apiConfig.filePathExternal);
            !fs.existsSync(filePathExternal) && fs.mkdirSync(filePathExternal);
            !fs.existsSync(filePathExternalReal) && fs.mkdirSync(filePathExternalReal);
            !fs.existsSync(filePathExternalBak) && fs.mkdirSync(filePathExternalBak);
            let form = new formidable.IncomingForm();
            form.uploadDir = filePathExternalReal;
            form.keepExtensions = true;
            form.parse(req, (err, fields, files) => {
                console.log('数据接收完毕:', fields);
                console.log('文件接收完毕:', files);
                let originFilePath = path.resolve(files.file.path);
                // 带后缀文件名
                let originFileName = files.file.name;
                // 不带后缀
                let fileExtname = path.extname(originFileName);//文件扩展名
                let simplifyName = originFileName.split(fileExtname)[0];//不带扩展名的文件名
                try {
                        if(fs.existsSync(path.resolve(filePathExternalReal,originFileName))){
                            const fileReName  = `${simplifyName}-${new Date().getTime()}${fileExtname}`;
                            // const fileReName  = `${simplifyName}-${currentCST()}${fileExtname}`;
                            const oldPath = path.resolve(filePathExternalReal,originFileName);
                            const newPath = path.resolve(filePathExternalBak,fileReName);
                            console.log('historyBakPath:',newPath);
                            console.log('historyBakName:',fileReName);
                            fs.renameSync(oldPath,newPath);
                        }
						const fileReNames  = `${simplifyName}-${new Date().getTime()}${fileExtname}`;
                        let reader = fs.createReadStream(originFilePath);
                        let writer = fs.createWriteStream(`${filePathExternalReal}/${fileReNames}`);
                        console.log('uploadFilePath:',`${filePathExternalReal}/${fileReNames}`);
                        reader.pipe(writer);
                        writer.on('finish',()=>{
                                // 写入成功后执行
                                try {
                                        fs.unlinkSync(originFilePath);
                                        res.send({
                                                error: 0,
                                                msg: '上传成功',
                                                data: {
                                                    imageUrl: `${filePathExternal_url}/${fileReNames}`
                                                }
                                        });
                                } catch (error) {
                                        console.log('writer inner--------',error);
                                        fs.unlinkSync(originFilePath);
                                        res.send({
                                                error: 1,
                                                msg: error,
                                                data: null
                                        });
                                }
                        });
                } catch (error) {
                        console.log('writer outter--------',error);
                        fs.unlinkSync(originFilePath);
                        res.send({
                                error: 1,
                                msg: error,
                                data: null
                        });
                }
            });
        } catch (error) {
            console.log('/contentMgmt/productMaterial/contentInvestStrategy/uploadFile.ajax -------- 文件上传失败error:', error);
                res.send({
                        error: 0,
                        msg: '上传失败',
                        data: null
                });
        }
    });

    // 上传图片
    app.post('/contentMgmt/productMaterial/contentInvestStrategy/uploadImg.ajax', (req, res, next) => {
        try {
            !fs.existsSync(apiConfig.filePathExternal) && fs.mkdirSync(apiConfig.filePathExternal);
            !fs.existsSync(filePathExternal) && fs.mkdirSync(filePathExternal);
            !fs.existsSync(filePathExternalReal) && fs.mkdirSync(filePathExternalReal);
            !fs.existsSync(filePathExternalBak) && fs.mkdirSync(filePathExternalBak);
            let form = new formidable.IncomingForm();
            form.uploadDir = filePathExternalReal;
            form.keepExtensions = true;
            form.parse(req, (err, fields, files) => {
                console.log('数据接收完毕:', fields);
                console.log('文件接收完毕:', files);
                let originFilePath = path.resolve(files.file.path);
                // 带后缀文件名
                let originFileName = files.file.name;
                // 不带后缀
                let fileExtname = path.extname(originFileName);//文件扩展名
                let simplifyName = originFileName.split(fileExtname)[0];//不带扩展名的文件名
                try {
                        if(fs.existsSync(path.resolve(filePathExternalReal,originFileName))){
                            const fileReName  = `${simplifyName}-${new Date().getTime()}${fileExtname}`;
                            // const fileReName  = `${simplifyName}-${currentCST()}${fileExtname}`;
                            const oldPath = path.resolve(filePathExternalReal,originFileName);
                            const newPath = path.resolve(filePathExternalBak,fileReName);
                            console.log('historyBakPath:',newPath);
                            console.log('historyBakName:',fileReName);
                            fs.renameSync(oldPath,newPath);
                        }
						const fileReNames  = `${simplifyName}-${new Date().getTime()}${fileExtname}`;
                        let reader = fs.createReadStream(originFilePath);
                        let writer = fs.createWriteStream(`${filePathExternalReal}/${fileReNames}`);
                        console.log('uploadFilePath:',`${filePathExternalReal}/${fileReNames}`);
                        reader.pipe(writer);
                        writer.on('finish',()=>{
                                // 写入成功后执行
                                try {
                                        fs.unlinkSync(originFilePath);
                                        res.send({
                                                error: 0,
                                                msg: '上传成功',
                                                data: {
                                                    imageUrl: `${filePathExternal_url}/${fileReNames}`
                                                }
                                        });
                                } catch (error) {
                                        console.log('writer inner--------',error);
                                        fs.unlinkSync(originFilePath);
                                        res.send({
                                                error: 1,
                                                msg: error,
                                                data: null
                                        });
                                }
                        });
                } catch (error) {
                        console.log('writer outter--------',error);
                        fs.unlinkSync(originFilePath);
                        res.send({
                                error: 1,
                                msg: error,
                                data: null
                        });
                }
            });
        } catch (error) {
            console.log('/contentMgmt/productMaterial/contentInvestStrategy/uploadImg.ajax -------- 文件上传失败error:', error);
                res.send({
                        error: 0,
                        msg: '上传失败',
                        data: null
                });
        }
    });

    // 上传封面图片
    app.post('/contentMgmt/productMaterial/contentInvestStrategy/uploadImgCover.ajax', (req, res, next) => {
        try {
            !fs.existsSync(apiConfig.filePathExternal) && fs.mkdirSync(apiConfig.filePathExternal);
            !fs.existsSync(filePathExternal) && fs.mkdirSync(filePathExternal);
            !fs.existsSync(filePathExternalReal) && fs.mkdirSync(filePathExternalReal);
            !fs.existsSync(filePathExternalBak) && fs.mkdirSync(filePathExternalBak);
            let form = new formidable.IncomingForm();
            form.uploadDir = filePathExternalReal;
            form.keepExtensions = true;
            form.parse(req, (err, fields, files) => {
                console.log('数据接收完毕:', fields);
                console.log('文件接收完毕:', files);
                let originFilePath = path.resolve(files.file.path);
                // 带后缀文件名
                let originFileName = files.file.name;
                // 不带后缀
                let fileExtname = path.extname(originFileName);//文件扩展名
                let simplifyName = originFileName.split(fileExtname)[0];//不带扩展名的文件名
                try {
                        if(fs.existsSync(path.resolve(filePathExternalReal,originFileName))){
                            const fileReName  = `${simplifyName}-${new Date().getTime()}${fileExtname}`;
                            // const fileReName  = `${simplifyName}-${currentCST()}${fileExtname}`;
                            const oldPath = path.resolve(filePathExternalReal,originFileName);
                            const newPath = path.resolve(filePathExternalBak,fileReName);
                            console.log('historyBakPath:',newPath);
                            console.log('historyBakName:',fileReName);
                            fs.renameSync(oldPath,newPath);
                        }
						const fileReNames  = `${simplifyName}-${new Date().getTime()}${fileExtname}`;
                        let reader = fs.createReadStream(originFilePath);
                        let writer = fs.createWriteStream(`${filePathExternalReal}/${fileReNames}`);
                        console.log('uploadFilePath:',`${filePathExternalReal}/${fileReNames}`);
                        reader.pipe(writer);
                        writer.on('finish',()=>{
                                // 写入成功后执行
                                try {
                                        fs.unlinkSync(originFilePath);
                                        res.send({
                                                error: 0,
                                                msg: '上传成功',
                                                data: {
                                                    imageUrl: `${filePathExternal_url}/${fileReNames}`
                                                }
                                        });
                                } catch (error) {
                                        console.log('writer inner--------',error);
                                        fs.unlinkSync(originFilePath);
                                        res.send({
                                                error: 1,
                                                msg: error,
                                                data: null
                                        });
                                }
                        });
                } catch (error) {
                        console.log('writer outter--------',error);
                        fs.unlinkSync(originFilePath);
                        res.send({
                                error: 1,
                                msg: error,
                                data: null
                        });
                }
            });
        } catch (error) {
            console.log('/contentMgmt/productMaterial/contentInvestStrategy/uploadImgCover.ajax -------- 文件上传失败error:', error);
                res.send({
                        error: 0,
                        msg: '上传失败',
                        data: null
                });
        }
    });

}