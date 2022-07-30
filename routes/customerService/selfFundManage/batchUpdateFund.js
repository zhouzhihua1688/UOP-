const request = require('./../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').selfFundManage.batchUpdateFund;
module.exports = function (app) {

    // 获取  初始数据和查询
    app.post('/customerService/selfFundManage/batchUpdateFund/getList.ajax', (req, res, next) => {
        let params = req.body,
            userName = req.session.loginInfo.username;
        let option = {
            req,
            url: apiUrl.getList,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/customerService/selfFundManage/batchUpdateFund/getList.ajax option:', {
            ...option,
            req: '#'
        });
        request(option, (error, response, body) => {
            console.log('/customerService/selfFundManage/batchUpdateFund/getList.ajax error:', error);
            console.log('/customerService/selfFundManage/batchUpdateFund/getList.ajax statusCode:', response && response.statusCode);
            console.log('/customerService/selfFundManage/batchUpdateFund/getList.ajax body:', {
                ...body,
                ['body']: '*****'
            });
            if (error) {
                return res.send({
                    error: 1,
                    msg: '数据获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {

                res.send({
                    error: 0,
                    msg: '调用成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '数据获取失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
    // 获取  提交修改后数据
    app.post('/customerService/selfFundManage/batchUpdateFund/submitData.ajax', (req, res, next) => {
        let params = JSON.parse(req.body.data);
        let option = {
            req,
            url: apiUrl.submitData,
            headers: {
                operator: req.session.loginInfo.userid
            },
            body: params,
            timeout: 15000,
            json: true
        };
        console.log('/customerService/selfFundManage/batchUpdateFund/submitData.ajax option:', {
            ...option,
            req: '#'
        });
        request.put(option, (error, response, body) => {
            console.log('/customerService/selfFundManage/batchUpdateFund/submitData.ajax error:', error);
            console.log('/customerService/selfFundManage/batchUpdateFund/submitData.ajax statusCode:', response && response.statusCode);
            console.log('/customerService/selfFundManage/batchUpdateFund/submitData.ajax body:', body);
            if (error) {
                return res.send({
                    error: 1,
                    msg: '提交失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {

                res.send({
                    error: 0,
                    msg: '提交修改成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '提交失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });

    // 批量修改模板--查询接口
    app.post('/customerService/selfFundManage/batchUpdateFund/updateByExcel.ajax', (req, res, next) => {
        try {
            let arrData = JSON.parse(req.body.ExcelData);

            const obj = {
                姓名: 'invnm',
                证件号码: 'idNo',
                银行卡号: 'bankAcco',
                本金调整后: 'modifyPrincipal',
            }
            const ExcelData = arrData.map(item => {  //把中文key替换成英文
                const newObj = {}
                Object.keys(obj).forEach(subitem => {
                    newObj[obj[subitem]] = item[subitem]
                })
                return newObj
            })
            // let ExcelData = JSON.parse(req.body.ExcelData);

            console.log("ExcelData:", ExcelData);

            if (!Array.isArray(ExcelData)) {
                return res.send({error: 1, msg: '解析Excel表格数据出错,请检查格式是否正确', data: null});
            }
            if (ExcelData.length === 0) {
                return res.send({error: 1, msg: 'Excel表格无数据', data: null});
            }
            let errorDataIndex = [];

            // 检查每条数据格式是否正确,若不正确,指出具体那条数据
            function checkTemplate(item) {
                if (!item.invnm || !item.idNo || !item.bankAcco) {
                    return false;
                }
                return true;
            }

            for (let i = 0; i < ExcelData.length; i++) {
                if (!checkTemplate(ExcelData[i])) {
                    errorDataIndex.push(i + 1);
                }
            }
            if (errorDataIndex.length > 0) {
                return res.send({error: 1, msg: `解析Excel表格第${errorDataIndex.join('，')}行数据出错,请检查格式是否正确`, data: null});
            }
            let finalData = ExcelData.map(item => {
                let params = {};
                params.invnm = item.invnm;
                params.idNo = item.idNo;
                params.bankAcco = item.bankAcco;
                // params.modifyPrincipal = item.modifyPrincipal;

                // params.bankChannelName= item.bankChannelName;
                // params.branchCode=item.branchCode;
                // params.currentPrincipal=item.currentPrincipal;
                return params;
            });
            console.log("finalData", finalData);
            new Promise((resolve, reject) => {
                // let option = {
                //     pageUrl: '/customerService/selfFundManage/batchUpdateFund/updateByExcel.ajax',
                //     req: req,
                //     operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
                //     url: apiUrlList.update,
                //     body: item,
                //     timeout: 15000,
                //     json: true
                // };
                let option = {
                    req,
                    url: apiUrl.queryData,
                    headers: {
                        operator: req.session.loginInfo.userid
                    },
                    body: finalData, //换成数组
                    timeout: 15000,
                    json: true
                };
                request.post(option, (error, response, body) => {
                    if (error) {
                        // reject();
                        return res.send({
                            error: 1,
                            msg: '查询失败'
                        });
                    }
                    if (body && body.returnCode === 0) {
                        // resolve(body.body);
                        console.log("后台返回数据:", body.body);
                        let resultData = {};
                        for (var i = 0; i < ExcelData.length; i++) {   //把Excel已经填好修改本金的modifyPrincipal数据做替换显示到页面
                            for (var j = 0; j < body.body.length; j++) {
                                if (ExcelData[i].idNo == body.body[j].idNo && ExcelData[i].bankAcco == body.body[j].bankAcco) {
                                    body.body[j].modifyPrincipal = ExcelData[i].modifyPrincipal;
                                }
                            }
                        }
                        resultData.tableData = body.body.filter(item => item.status == 1);//成功数据：status: 状态:0-无效,1-有效
                        resultData.queryFailData = body.body.filter(item => item.status == 0);//失败数据：
                        return res.send({
                            error: 0,
                            msg: '批量查询成功',
                            data: resultData
                        });
                    }
                    else if (body && body.returnCode == 9999) {
                        res.send({
                            error: 1,
                            msg: '批量查询失败'
                        });
                    }
                    else {
                        // reject();
                        res.send({
                            error: 1,
                            msg: result.returnMsg
                        });
                    }
                });
            });


            // function sendTemplate(item) {
            //     console.log("item:",item);
            //     return new Promise((resolve, reject) => {
            //         // let option = {
            //         //     pageUrl: '/customerService/selfFundManage/batchUpdateFund/updateByExcel.ajax',
            //         //     req: req,
            //         //     operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            //         //     url: apiUrlList.update,
            //         //     body: item,
            //         //     timeout: 15000,
            //         //     json: true
            //         // };
            //         let option = {
            //             req,
            //             url: apiUrl.queryData,
            //             headers: {
            //                 operator: req.session.loginInfo.userid
            //             },
            //             body:[item], //换成数组
            //             timeout: 15000,
            //             json: true
            //         };
            //         request.post(option, (error, response, body) => {
            //             if (error) {
            //                 reject();
            //             }
            //             if (body && body.returnCode === 0) {
            //                 resolve(body.body);
            //             }
            //             else {
            //                 reject();
            //             }
            //         });
            //     });
            // }

            // let allParams = finalData.map(item => sendTemplate(item));
            // console.log("allParams",allParams);
            // Promise.all(allParams).then((result) => {
            //     let resultObject = {};
            //     resultObject.fundGroupTypeList = result;
            //     console.log("resultObject",resultObject);
            //     res.send({error: 0, msg: '批量修改成功', data: result});
            // }).catch(error => {
            //     res.send({error: 1, msg: '修改失败', data: null});
            // });
        } catch (error) {
            console.log('/customerService/selfFundManage/batchUpdateFund/updateByExcel.ajax error:', error.message);
            return res.send({error: 1, msg: '解析Excel表格数据出错,请检查格式是否正确', data: null});
        }
    });
};