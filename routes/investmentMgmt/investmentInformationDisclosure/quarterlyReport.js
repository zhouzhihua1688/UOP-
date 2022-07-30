const request = require('../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').investmentInformationDisclosure.quarterlyReport;
// const investTableName = 'uop_log_invest';
module.exports = function (app) {

    // 查询列表
    app.post('/investmentMgmt/investmentInformationDisclosure/quarterlyReport/getTableData.ajax', (req, res, next) => {
        var params={}
        if(req.body.reportName){
        params.reportName=req.body.reportName;
        }
        if(req.body.reportYear){
          params.reportYear=req.body.reportYear;
        }
        if(req.body.reportQuarter){
          params.reportQuarter=req.body.reportQuarter;
        }
        if(req.body.groupId){
          params.groupId=req.body.groupId;
        }
        console.log('params',params)
        let option = {
            pageUrl: '/investmentMgmt/investmentInformationDisclosure/quarterlyReport/getTableData.ajax',
            req,
            qs:params,
            url: apiUrl.getTableData,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '查询列表失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            console.log("body==", body);
            console.log("result==", result);
            if (result && result.returnCode === 0) {
                return res.send({
                    error: 0,
                    msg: '查询列表成功',
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
                    msg: '查询列表失败'
                });
            }
        });
    });
    // 新增
    app.post('/investmentMgmt/investmentInformationDisclosure/quarterlyReport/add.ajax', (req, res, next) => {
        let params = req.body;
        params.creator = req.session.loginInfo.userid;
        let option = {
            pageUrl: '/investmentMgmt/investmentInformationDisclosure/quarterlyReport/add.ajax',
            req,
            operateType:1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            body:params,
            url: apiUrl.add,
            timeout: 15000,
            json: true
            // investBody:req.body,
            // mappingKeyWords:'matterAnnounce'
        };
        request.post(option, (error, response, body) => {
            if (error) {
              return res.send({
                error: 1,
                msg: "新增失败",
              });
            }
            let result = typeof body === "string" ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
              return res.send({
                error: 0,
                msg: "新增成功",
                data: null,
              });
            } else if (result && result.returnCode != 9999) {
              return res.send({
                error: 1,
                msg: result.returnMsg,
                data: null,
              });
            } else {
              return res.send({
                error: 1,
                msg: result.returnMsg,
                data: null,
              });
            }
        });
    });

    //修改
    app.post('/investmentMgmt/investmentInformationDisclosure/quarterlyReport/operate.ajax', (req, res, next) => {
        let params = req.body;
        params.creator = req.session.loginInfo.userid;
        let option = {
            pageUrl: '/investmentMgmt/investmentInformationDisclosure/quarterlyReport/operate.ajax',
            req,
            operateType:2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            body:params,
            url: apiUrl.operate,
            timeout: 15000,
            json: true
            // investBody:req.body,
            // mappingKeyWords:'matterAnnounce'
        };
        request.post(option, (error, response, body) => {
            if (error) {
              return res.send({
                error: 1,
                msg: "修改失败",
              });
            }
            let result = typeof body === "string" ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
              return res.send({
                error: 0,
                msg: "修改成功",
                data: null,
              });
            } else if (result && result.returnCode != 9999) {
              return res.send({
                error: 1,
                msg: result.returnMsg,
                data: null,
              });
            } else {
              return res.send({
                error: 1,
                msg: result.returnMsg,
                data: null,
              });
            }
        });
    });

        // 删除
    app.post('/investmentMgmt/investmentInformationDisclosure/quarterlyReport/del.ajax', (req, res, next) => {
        let params={}
        params.reportSerialNo = req.body.reportSerialNo;
        params.reportType =req.body.reportType;//  季报
        let option = {
            pageUrl: '/investmentMgmt/investmentInformationDisclosure/quarterlyReport/del.ajax',
            operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            req,
            qs:params,
            url: apiUrl.del,
            timeout: 15000,
            json: true,
            // investBody:{title: req.body.title},
            // mappingKeyWords:'matterAnnounce'
        };
        request.post(option, (error, response, body) => {
            // sysLogger(option.operateType, req, option, body, investTableName);
            if (error) {
                return res.send({error: 1, msg: '删除失败'});
            }
            if (body.returnCode == 0) {
                return res.send({error: 0, msg: '删除成功', data:null});
            } else if (body.returnCode != 0 && body.returnCode != 9999) {
                return res.send({error: 1, msg: body.returnMsg, data: null});
            } else {
                return res.send({error: 1, msg: '删除失败', data: null});
            }
        });
    });

    // 查询详情
    app.post('/investmentMgmt/investmentInformationDisclosure/quarterlyReport/details.ajax', (req, res, next) => {
        var params={}
        params.reportSerialNo=req.body.reportSerialNo;
        console.log('params',params)
        let option = {
            pageUrl: '/investmentMgmt/investmentInformationDisclosure/quarterlyReport/details.ajax',
            req,
            qs: params,
            url: apiUrl.details,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '查询详情失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            console.log("body==", body);
            console.log("result==", result);
            if (result && result.returnCode === 0) {
                return res.send({
                    error: 0,
                    msg: '查询详情成功',
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
                    msg: '查询详情失败'
                });
            }
        });
    });

    // 获取所有组合
  app.post("/investmentMgmt/investmentInformationDisclosure/quarterlyReport/fundGroups.ajax",(req, res, next) => {
      let option = {
        pageUrl:"/investmentMgmt/investmentInformationDisclosure/quarterlyReport/fundGroups.ajax",
        req,
        url: apiUrl.fundGroups,
        timeout: 15000,
        json: true,
      };
      request(option, (error, response, body) => {
        if (error) {
          return res.send({
            error: 1,
            msg: "操作失败",
          });
        }
        let result = typeof body === "string" ? JSON.parse(body) : body;
        if (result.returnCode == 0) {
          let resultData = result.body.filter((item) => {
            return (
              item.isInvestment == "Y" &&
              item.fundgroupType >= 13 &&
              item.fundgroupType <= 17
            );
          });
          return res.send({
            error: 0,
            msg: "获取组合成功",
            data: resultData,
          });
        } else if (result && result.returnCode != 9999) {
          return res.send({
            error: 1,
            msg: result.returnMsg,
            data: null,
          });
        } else {
          return res.send({
            error: 1,
            msg: "获取组合失败",
            data: null,
          });
        }
      });
    }
  );
};