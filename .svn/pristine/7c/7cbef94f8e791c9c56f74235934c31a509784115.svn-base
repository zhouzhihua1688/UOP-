const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').labelApplication.modelConfigurationMgmt;

module.exports = function (app) {
    // 获取列表数据
    // app.post('/clientMgmt/labelApplication/modelConfigurationMgmt/getTableData.ajax', (req, res, next) => {
    //     let params = {};
    //     params.mdlId =req.body.mdlId;
    //     params.mdlVer = req.body.mdlVer;
    //     let option = {
    //         // pageUrl: '/clientMgmt/information/informationQuery/getTableData.ajax',
    //         req: req,
    //         url: apiUrlList.getTableData+'/'+req.body.mdlId+'/'+req.body.mdlVer,
    //         // body: params,
    //         timeout: 15000,
    //         json: true
    //     };
    //     console.log('/clientMgmt/labelApplication/modelConfigurationMgmt/getTableData.ajax option:', option.req ? {
    //         ...option,
    //         req: '#',
    //         body: '******'
    //     } : option);
    //     request(option, (error, response, body) => {
    //         console.log('/clientMgmt/labelApplication/modelConfigurationMgmt/getTableData.ajax error:', error);
    //         console.log('/clientMgmt/labelApplication/modelConfigurationMgmt/getTableData.ajax statusCode:', response && response.statusCode);
    //         console.log('/clientMgmt/labelApplication/modelConfigurationMgmt/getTableData.ajax body: ******');
    //         if (error) {
    //             return res.send({
    //                 error: 1,
    //                 msg: '查询失败'
    //             });
    //         }
    //         let result = typeof body === 'string' ? JSON.parse(body) : body;
    //         if (result.returnCode == 0 && Array.isArray(result.body.riskAssesses)) {
    //             let resultData = {};
    //             resultData.pageNo = params.pageNo; //页数
    //             // resultData.pageNum = result.body.pageNum; //页数
    //             resultData.totalSize = Math.ceil(result.body.total / params.pageSize); //总页数d;//总页数
    //             // resultData.totalSize =result.body.total;
    //             resultData.tableData = result.body.riskAssesses;
    //             return res.send({
    //                 error: 0,
    //                 msg: '查询成功',
    //                 data: resultData
    //             });
    //         } else if (result && result.returnCode != 9999) {
    //             return res.send({
    //                 error: 1,
    //                 msg: result.returnMsg
    //             });
    //         } else {
    //             return res.send({
    //                 error: 1,
    //                 msg: '查询失败'
    //             });
    //         }
    //     });
    //
    // });

    // 根据名称和状态获取初始数据和查询
    app.post('/clientMgmt/labelApplication/modelConfigurationMgmt/getTableData.ajax', (req, res, next) => {
        let params = {};
            if(req.body.mdlNm==""&&req.body.mdlSt==""){
                params.pageNo =req.body.pageNo;
                params.pageSize =req.body.pageSize;
            }else{
                params.pageNo =req.body.pageNo;
                params.pageSize =req.body.pageSize;
                params.mdlNm =req.body.mdlNm;
                params.mdlSt = req.body.mdlSt;
            }
        let option = {
            pageUrl: '/businessMgmt/productInfoConfig/freeRideProductConfig/getTableData.ajax',
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
                    msg: '查询失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            console.log(result, '---result----');
            if (result && result.returnCode == '0') {
                // var resultData=result.body;
                // resultData.forEach((item) => {
                //     item.check = false;
                // });
                let resultData = {};
                resultData.tableData = result.body
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
                    msg: '查询失败'
                });
            }
        });
    });

    //新增数据
    app.post('/clientMgmt/labelApplication/modelConfigurationMgmt/saveParam.ajax', (req, res, next) => {
        let params = {};
        params.mdlDesc=req.body.mdlDesc;//模型描述
        params.mdlNm=req.body.mdlNm;   //模型名称
        params.mdlSt=req.body.mdlSt;  //模型状态
        params.mdlTp=req.body.mdlTp;      //模型类型-----待定
        params.scenario=req.body.scenario;//模型适用场景
        params.prds=req.body.prds;
        params.custTags=req.body.custTags;
        params.formulas=req.body.formulas;
        params.recoms=req.body.recoms;
        params.terminal=req.body.terminal;
        let option = {
            pageUrl: '/clientMgmt/labelApplication/modelConfigurationMgmt/saveParam.ajax',
            req,
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.saveParam,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '保存失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                return res.send({
                    error: 0,
                    msg: '保存成功'
                });
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '保存失败'
                });
            }
        });
    });

    //修改数据
    app.post('/clientMgmt/labelApplication/modelConfigurationMgmt/update.ajax', (req, res, next) => {
        let params = {};
        params.mdlId=req.body.mdlId;//模型描述
        params.mdlVer=req.body.mdlVer;   //模型名称
        params.mdlDesc=req.body.mdlDesc;//模型描述
        params.mdlNm=req.body.mdlNm;   //模型名称
        params.mdlSt=req.body.mdlSt;  //模型状态
        params.mdlTp=req.body.mdlTp;      //模型类型-----待定
        params.scenario=req.body.scenario;//模型适用场景
        params.prds=req.body.prds;
        params.custTags=req.body.custTags;
        params.formulas=req.body.formulas;
        params.recoms=req.body.recoms;
        params.terminal=req.body.terminal;
        let option = {
            pageUrl: '/clientMgmt/labelApplication/modelConfigurationMgmt/update.ajax',
            req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.update+'/'+req.body.mdlId+'/'+req.body.mdlVer,
            body: params,
            timeout: 15000,
            json: true
        };
        request.put(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '修改失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                return res.send({
                    error: 0,
                    msg: '修改成功'
                });
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '修改失败'
                });
            }
        });
    });

    // 失效
    app.post('/clientMgmt/labelApplication/modelConfigurationMgmt/invalidParam.ajax', (req, res, next) => {
        let params = {};
        let option = {
            pageUrl: '/clientMgmt/labelApplication/modelConfigurationMgmt/invalidParam.ajax',
            req,
            url: apiUrlList.invalidParam+'/'+req.body.mdlId+'/'+req.body.mdlVer+'/mdl-st/c',
            body: params,
            timeout: 15000,
            json: true
        };
        request.put(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '操作失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                return res.send({
                    error: 0,
                    msg: '操作成功'
                });
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '操作失败'
                });
            }
        });
    });

    // 版本记录
    app.post('/clientMgmt/labelApplication/modelConfigurationMgmt/versionRecord.ajax', (req, res, next) => {
        let params = {};
        let option = {
            pageUrl: '/clientMgmt/labelApplication/modelConfigurationMgmt/versionRecord.ajax',
            req,
            url: apiUrlList.versionRecord+'/'+req.body.mdlId+'/mdl-vers',
            body: params,
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
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {

                var num = new Array();
                for(var i in result.body){
                    num.push(result.body[i].mdlVer);
                }
                num.sort(function(num1,num2){  //获取最大版本记录
                    return num1-num2;
                })
                var maxVer= eval(num[num.length-1]);//获取最大版本记录

                result.body.map(function(item){
                    return item.maxVer=maxVer;
                })
                return res.send({
                    error: 0,
                    msg:"操作成功",
                    data:result.body
                });
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '操作失败'
                });
            }
        });
    });

    // 版本记录里查看回退
    app.post('/clientMgmt/labelApplication/modelConfigurationMgmt/lookVersion.ajax', (req, res, next) => {
        let params = {};
        params.mdlId =req.body.mdlId;
        params.mdlVer = req.body.mdlVer;
        let option = {
            pageUrl: '/clientMgmt/labelApplication/modelConfigurationMgmt/lookVersion.ajax',
            req,
            url: apiUrlList.lookVersion+'/'+req.body.mdlId+'/'+req.body.mdlVer,
            // qs: params,
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
            console.log(result, '---result----');
            if (result && result.returnCode == '0') {
                // var resultData=result.body;
                // resultData.forEach((item) => {
                //     item.check = false;
                // });
                let resultData = {};
                resultData.tableData = result.body
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
                    msg: '查询失败'
                });
            }
        });
    });
    //获取适用场景信息
    app.post('/clientMgmt/labelApplication/modelConfigurationMgmt/scenarioParam.ajax', (req, res, next) => {
        let params = {};
        params.pmst = req.body.pmst;
        params.pmkey = req.body.pmkey;
        params.pmco = req.body.pmco;
        let option = {
            pageUrl: '/clientMgmt/labelApplication/modelConfigurationMgmt/scenarioParam.ajax',
            req,
            url: apiUrlList.scenarioParam,
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
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0) {
                return res.send({
                    error: 0,
                    msg: '获取成功',
                    data: result
                });
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '获取失败'
                });
            }
        });

    });

    //标签名称
    app.post('/clientMgmt/labelApplication/modelConfigurationMgmt/lableNameParam.ajax', (req, res, next) => {
        let params = {};
        params.tagScenario=req.body.tagScenario;   //20211112新添加查询参数
        let option = {
            pageUrl: '/clientMgmt/labelApplication/modelConfigurationMgmt/lableNameParam.ajax',
            req,
            url: apiUrlList.lableNameParam2,
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
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0) {
                return res.send({
                    error: 0,
                    msg: '获取成功',
                    data: result
                });
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '获取失败'
                });
            }
        });

    });

    //根据模型ID和版本号获取数据和查询
    app.post('/clientMgmt/labelApplication/modelConfigurationMgmt/queryLableData.ajax', (req, res, next) => {
        let params = {};
        params.mdlId =req.body.mdlId;
        params.mdlVer = req.body.mdlVer;
        let option = {
            pageUrl: '/businessMgmt/productInfoConfig/freeRideProductConfig/queryLableData.ajax',
            req,
            url: apiUrlList.queryLableData+'/'+req.body.mdlId+'/'+req.body.mdlVer,
            // qs: params,
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
            console.log(result, '---result----');
            if (result && result.returnCode == '0') {
                // var resultData=result.body;
                // resultData.forEach((item) => {
                //     item.check = false;
                // });
                let resultData = {};
                resultData.tableData = result.body
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
                    msg: '查询失败'
                });
            }
        });
    });
};