const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').sendCount.upReplyQuery;


module.exports = function (app) {
    app.post('/messageCenter/sendCount/upReplyQuery/search.ajax', (req, res, next) => {
        let qscontent = req.body.content;
        console.log(qscontent);
        if(qscontent){
            let option = {
                pageUrl: '/messageCenter/sendCount/upReplyQuery/search.ajax',
                req: req,
                url: apiUrlList.queryData,
                qs:{content:qscontent},
                timeout: 15000,
                json: true
            };
            request(option, (error, response, body) => {
                if (error) {
                    return res.send({error: 1, msg: '操作失败'});
                }
                let result = typeof body === 'string' ? JSON.parse(body) : body;
                if (result && result.code == 0) {
                    let bundleData=result.body;
                    bundleData.forEach((item)=>{
                        item.showCreateTime = formatTime(item.createTime)
                    })
                    res.send({error:0,data:bundleData});
                }
                else if(result && result.code != 9999){
                    res.send({error: 1, msg: result.returnMsg});
                }
                else {
                    res.send({error: 1, msg: '查询失败'});
                }
            });
        }else{
            let filterQueryData = new Promise((resolve,reject)=>{
                let option = {
                    pageUrl: '/messageCenter/sendCount/upReplyQuery/search.ajax',
                    req: req,
                    url: apiUrlList.queryRule,
                    timeout: 15000,
                    json: true
                };
                request(option, (error, response, body) => {
                    if (error) {
                        return reject({error: 1, msg: '操作失败'});
                    }
                    let result = typeof body === 'string' ? JSON.parse(body) : body;
                    if (result && result.returnCode == 0) {
                        console.log('-------upReplyQuery-------',result);
                        let next = result.body.map((item)=>{
                            return item.content
                        })
                        resolve(next);
                    }
                    else if(result && result.returnCode != 9999){
                        reject({error: 1, msg: result.returnMsg});
                    }
                    else {
                        reject({error: 1, msg: '查询失败'});
                    }
                });
            })
            filterQueryData.then((reslut)=>{
                let content = '';
                if(reslut.length>0){
                    content=reslut.join();
                }else{
                    return res.send({error: 1, msg: '未查询到content'});
                }
                let option = {
                    pageUrl: '/messageCenter/sendCount/upReplyQuery/search.ajax',
                    req: req,
                    url: apiUrlList.queryData,
                    qs:{content},
                    timeout: 15000,
                    json: true
                };
                request(option, (error, response, body) => {
                    if (error) {
                        return res.send({error: 1, msg: '操作失败'});
                    }
                    let result = typeof body === 'string' ? JSON.parse(body) : body;
                    if (result && result.code == 0) {
                        let bundleData=result.body;
                        bundleData.forEach((item)=>{
                            item.showCreateTime = formatTime(item.createTime)
                        })
                        res.send({error:0,data:bundleData});
                    }
                    else if(result && result.code != 9999){
                        res.send({error: 1, msg: result.returnMsg});
                    }
                    else {
                        res.send({error: 1, msg: '查询失败'});
                    }
                });
            },(err)=>{
                res.send(err)
            })
        }
       
        
    });
    // //导出
    // app.post('/messageCenter/sendCount/sendCount/download.ajax', (req, res, next) => {
    //     let params = {};
    //     req.body.batchId && (params.batchId = req.body.batchId);
    //     req.body.ruleId && (params.ruleId = req.body.ruleId);
    //     req.body.pageNo && (params.pageNo = req.body.pageNo);
    //     req.body.pageSize && (params.pageSize = req.body.pageSize);
    //     let option = {
    //         pageUrl: '/messageCenter/sendCount/sendCount/download.ajax',
    //         req: req,
    //         url: apiUrlList.download,
    //         body: params,
    //         timeout: 15000,
    //         json: true
    //     };
    //     request.post(option, (error, response, body) => {
    //         if (error) {
    //             return res.send({error: 1, msg: '操作失败'});
    //         }
    //         let result = typeof body === 'string' ? JSON.parse(body) : body;
    //         if (result && result.returnCode == 0 && Array.isArray(result.body)) {
    //             formatDownloadData(result.body);
    //             res.send({error: 0, msg: '查询表格数据成功', data: result.body});
    //         }
    //         else if(result && result.returnCode != 9999){
    //             res.send({error: 1, msg: result.returnMsg});
    //         }
    //         else {
    //             res.send({error: 1, msg: '查询表格数据失败'});
    //         }
    //     });
    // });
    
};
function formatTime(date) {
    let d = new Date(date);
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let day = d.getDate();
    let hour = d.getHours();
    let minute = d.getMinutes();
    let second = d.getSeconds();

    function fixZero(n) {
        return n < 10 ? '0' + n : n;
    }

    return [year, month, day].map(fixZero).join('-') + ' ' + [hour, minute, second].map(fixZero).join(':');
}
function formatDownloadData(arr) {
    arr.forEach((item) => {
        item.templateType = item.templateType == 0 ? '纯文字' : '图文';
        if (item.status == 0) {
            item.status = '开始';
        }
        if (item.status == 1) {
            item.status = '免打扰';
        }
        if (item.status == 2) {
            item.status = '失败';
        }
        if (item.status == 3) {
            item.status = '成功';
        }
        if (item.status == 4) {
            item.status = '无pushToken';
        }
        item.read = item.read ? '是' : '否';
    });
}