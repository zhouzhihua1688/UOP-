const request = require('../../../local_data/requestWrapper');
const config = require('../apiConfig');
const apiUrlList = config.socialMgmt.article;
const baseUrl = '/messageCenter/socialMgmt/article';
const fs = require('fs');
const path = require('path');
let communityFilesPath = config.communityFilesPath;
let communityFilesPathJoin = path.join(communityFilesPath, '/article');
let communityFilesPath_url = `${config.communityFilesPath_url}/article`;
const formidable = require('formidable');
const XLSX = require('xlsx');

module.exports = function (app) {
    // // 处理附件链接
    // // 处理附件链接
    // app.get(`/sfs/admin/v1/file/attach/download`, (req, res, next) => {
    //     console.log('=================================req.path', req.path);
    //     let path = req.path;
    //     // /sfs/admin/v1/file/attach/download?attachId=21071907122L0Q5O
    //     let url_prefix = global.envConfig.inner_gateway;
    //     let filePath = url_prefix + path;
    //     res.pipe(request(filePath));
    // })

    //查询话题列表
    app.post(`${baseUrl}/topicLIst.ajax`, (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: `${baseUrl}/topicLIst.ajax`,
            req: req,
            url: apiUrlList.topicLIst,
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
            if (body.returnCode === 0) {
                res.send({
                    error: 0,
                    msg: '查询成功',
                    data: body.body
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
                    msg: '查询失败',
                    data: null
                });
            }
        });
    });
    //查询作者列表
    app.post(`${baseUrl}/accountList.ajax`, (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: `${baseUrl}/accountList.ajax`,
            req: req,
            url: apiUrlList.accountList,
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
            if (body.returnCode === 0) {
                res.send({
                    error: 0,
                    msg: '查询成功',
                    data: body.body
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
                    msg: '查询失败',
                    data: null
                });
            }
        });
    });
    // 文章置顶
    app.post(`${baseUrl}/levelModify.ajax`, (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: `${baseUrl}/levelModify.ajax`,
            req: req,
            // operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.levelModify,
            qs: params,
            timeout: 15000,
            json: true
        };
        request.put(option, (error, response, body) => {
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
    //查询列表
    app.post(`${baseUrl}/tableData.ajax`, (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: `${baseUrl}/tableData.ajax`,
            req: req,
            url: apiUrlList.tableData,
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
            if (body.returnCode === 0) {
                res.send({
                    error: 0,
                    msg: '查询成功',
                    data: body.body
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
                    msg: '查询失败',
                    data: null
                });
            }
        });
    });
    app.post(`${baseUrl}/tableData2.ajax`, (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: `${baseUrl}/tableData2.ajax`,
            req: req,
            url: apiUrlList.tableData2,
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
            if (body.returnCode === 0) {
                res.send({
                    error: 0,
                    msg: '查询成功',
                    data: body.body
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
                    msg: '查询失败',
                    data: null
                });
            }
        });
    });
    // 新增
    app.post(`${baseUrl}/add.ajax`, (req, res, next) => {
        let params = req.body;
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

    //查询单个页面
    app.post(`${baseUrl}/querySingle.ajax`, (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: `${baseUrl}/querySingle.ajax`,
            req: req,
            url: `${apiUrlList.querySingle}${params.postId}`,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            console.log('链接和音频',body.body)
            if (error) {
                return res.send({
                    error: 1,
                    msg: '查询失败'
                });
            }
            if (body.returnCode === 0) {
                res.send({
                    error: 0,
                    msg: '查询成功',
                    data: body.body
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
                    msg: '查询失败',
                    data: null
                });
            }
        });
    });


    // 修改
    app.post(`${baseUrl}/modifyRelatedMail.ajax`, (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: `${baseUrl}/modifyRelatedMail.ajax`,
            req: req,
            // operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.modifyRelatedMail,
            body: params,
            timeout: 15000,
            json: true
        };
        request.put(option, (error, response, body) => {
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
    app.post(`${baseUrl}/relatedMail.ajax`, (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: `${baseUrl}/relatedMail.ajax`,
            req: req,
            // operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.relatedMail,
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
    app.post(`${baseUrl}/modify.ajax`, (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: `${baseUrl}/modify.ajax`,
            req: req,
            // operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.modify,
            body: params,
            timeout: 15000,
            json: true
        };
        request.put(option, (error, response, body) => {
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
	// 状态修改
	// /sfs/admin/v1/post/approve
	app.post(`${baseUrl}/newModifyStatus.ajax`, (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: `${baseUrl}/newModifyStatus.ajax`,
            req: req,
            // operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.modifyStatus,
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
    app.post(`${baseUrl}/publishArticle.ajax`, (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: `${baseUrl}/publishArticle.ajax`,
            req: req,
            url: apiUrlList.publishArticle,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '发布失败',
                    data: null
                });
            }
            if (body.returnCode === 0) {
                res.send({
                    error: 0,
                    msg: '发布成功',
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
                    msg: '发布失败',
                    data: null
                });
            }
        });
    });
    // 删除
    app.post(`${baseUrl}/del.ajax`, (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: `${baseUrl}/del.ajax`,
            req: req,
            // operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.del,
            qs: params,
            timeout: 15000,
            json: true
        };
        request.delete(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '删除失败',
                    data: null
                });
            }
            if (body.returnCode === 0) {
                res.send({
                    error: 0,
                    msg: '删除成功',
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
                    msg: '删除失败',
                    data: null
                });
            }
        });
    });

    //文件上传
    app.post(`${baseUrl}/uploadImage.ajax`, (req, res, next) => {
        let form = new formidable.IncomingForm();
        let filePath = communityFilesPathJoin;
        try {
            if (!fs.existsSync(communityFilesPath)) {
                fs.mkdirSync(communityFilesPath)
            }
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath)
            }
        } catch (error) {
            console.log('文件夹不存在', error)
            return res.send({
                error: 1,
                msg: '上传失败，文件夹不存在',
                data: null
            });
        }
        form.uploadDir = filePath;
        form.keepExtensions = true;
        form.parse(req, (err, fields, files) => {
            // let formData;
            if (err) {
                console.log(`${baseUrl}/uploadImage.ajax:`, err);
                return res.send({
                    error: 1,
                    msg: '上传失败',
                    data: null
                });
            }
            console.log('参数表管理页面表单接收完毕:', fields);
            console.log('参数表管理页面表单文件接收完毕:', files);

            try {
                fs.renameSync(files.file.path, form.uploadDir + "/" + files.file.name) //文件改名
            } catch (err) {
                res.send({
                    error: 0,
                    msg: '上传失败',
                    data: files.file.name
                })
            }
            res.send({
                error: 0,
                msg: '上传成功',
                data: `${communityFilesPath_url}/${files.file.name}`
            })

        });
    });

    //文件删除
    app.post(`${baseUrl}/delFile.ajax`, (req, res, next) => {
        try {
            fs.unlinkSync(path.join(communityFilesPath, req.body.file))
        } catch (error) {
            console.log('文件不存在', error)
            return res.send({
                error: 1,
                msg: '删除失败，文件不存在',
                data: false
            });
        }
        return res.send({
            error: 0,
            msg: '删除成功',
            data: true
        })
    });

    //邮件导入页面
    //查询单个页面
    app.post(`${baseUrl}/mailDetail.ajax`, (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: `${baseUrl}/mailDetail.ajax`,
            req: req,
            url: apiUrlList.mailDetail,
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
            if (body.returnCode === 0) {
                res.send({
                    error: 0,
                    msg: '查询成功',
                    data: body.body
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
                    msg: '查询失败',
                    data: null
                });
            }
        });
    });

    //获取投票列表
    app.post(`${baseUrl}/voteList.ajax`, (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: `${baseUrl}/voteList.ajax`,
            req: req,
            url: apiUrlList.voteList,
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
            if (body.returnCode === 0) {
                res.send({
                    error: 0,
                    msg: '查询成功',
                    data: body.body
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
                    msg: '查询失败',
                    data: null
                });
            }
        });
    });
    // 评论-回复
    app.post(`${baseUrl}/remarksAnswer.ajax`, (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: `${baseUrl}/remarksAnswer.ajax`,
            req: req,
            // operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.remarksAnswer,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '操作失败',
                    data: null
                });
            }
            if (body.returnCode === 0) {
                res.send({
                    error: 0,
                    msg: '操作成功',
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
                    msg: '操作失败',
                    data: null
                });
            }
        });
    });
    // 评论-置顶
    app.post(`${baseUrl}/remarksTop.ajax`, (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: `${baseUrl}/remarksTop.ajax`,
            req: req,
            // operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.remarksTop,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '操作失败',
                    data: null
                });
            }
            if (body.returnCode === 0) {
                res.send({
                    error: 0,
                    msg: '操作成功',
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
                    msg: '操作失败',
                    data: null
                });
            }
        });
    });
    // 评论-奖励
    app.post(`${baseUrl}/remarksReward.ajax`, (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: `${baseUrl}/remarksReward.ajax`,
            req: req,
            // operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.remarksReward,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '操作失败',
                    data: null
                });
            }
            if (body.returnCode === 0) {
                res.send({
                    error: 0,
                    msg: '操作成功',
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
                    msg: '操作失败',
                    data: null
                });
            }
        });
    });
    // 隐藏/展开
    app.post(`${baseUrl}/handleCheck.ajax`, (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: `${baseUrl}/handleCheck.ajax`,
            req: req,
            // operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.handleCheck,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '操作失败',
                    data: null
                });
            }
            if (body.returnCode === 0) {
                res.send({
                    error: 0,
                    msg: '操作成功',
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
                    msg: '操作失败',
                    data: null
                });
            }
        });
    });
    // 查看评论列表
    app.post(`${baseUrl}/remarksList.ajax`, (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: `${baseUrl}/remarksList.ajax`,
            req: req,
            url: apiUrlList.remarksList,
            // url: "http://10.50.16.114:8064/sfs/admin/v1/comment/page-list",
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
            if (body.returnCode === 0) {
                res.send({
                    error: 0,
                    msg: '查询成功',
                    data: body.body
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
                    msg: '查询失败',
                    data: null
                });
            }
        });



    });
    //评论删除
    app.post(`${baseUrl}/remarksDelete.ajax`, (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: `${baseUrl}/remarksDelete.ajax`,
            req: req,
            // operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.remarksDelete,
            qs: params,
            timeout: 15000,
            json: true
        };
        request.delete(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '操作失败',
                    data: null
                });
            }
            if (body.returnCode === 0) {
                res.send({
                    error: 0,
                    msg: '操作成功',
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
                    msg: '操作失败',
                    data: null
                });
            }
        });
    });
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
    // 导出Excel表格
    app.get(`${baseUrl}/exportRemarksExcel.ajax`, (req, res, next) => {
        let params = req.query;
        var timestamp = formatTime(Date.parse(new Date()))
        let option = {
            pageUrl: `${baseUrl}/exportRemarksExcel.ajax`,
            req: req,
            url: apiUrlList.exportRemarksExcel,
            // qs: params,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '操作失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                let data = result.body.rows;
             
                if (data && Array.isArray(data) && data.length > 0) {
                    var arr = [
                        // 新增 评论对象，对象id，评论时间
                        ["评论ID", "评论内容","评论对象","对象ID", "用户昵称", '用户编号', '对应客户号', '评论时间',  '状态']
                    ];
                    data.forEach(function (item) {
                        if (item.itemType == 1) {
                            item.itemType = '文章或动态'
                        } else if (item.itemType == 2) {
                            item.itemType = '评论'
                        }
                        if (item.status == 5) {
                            item.status = '禁用'
                        } else if (item.status == 1) {
                            item.status = '正常'
                        } else if (item.status == 8) {
                            item.status = '下架'
                        }
                        arr.push([item.id, item.content, item.itemType, item.itemId, item.nickname, item.userId, item.userInfo.custNo,
                        item.createTime,item.status])
                        });
                    const stream = require('stream');
                    const book = XLSX.utils.book_new();
                    const sheet = XLSX.utils.aoa_to_sheet(arr);
                    XLSX.utils.book_append_sheet(book, sheet, "test");
                    const fileContents = XLSX.write(book, {
                        type: 'buffer',
                        bookType: 'xlsx',
                        bookSST: false
                    });
                    let readStream = new stream.PassThrough();
                    readStream.end(fileContents);
                    let fileName = timestamp +'remarks' + ".xlsx";
                    res.set('Content-disposition', 'attachment; filename=' + fileName);
                    res.set('Content-Type', 'text/plain');
                    readStream.pipe(res);
                } else {
                    res.send('暂无数据');
                }

            } else if (result && result.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                res.send({
                    error: 1,
                    msg: '查询失败'
                });
            }
        });
    });

        //文件上传
        app.post(`${baseUrl}/upload.ajax`, (req, res, next) => {
            let form = new formidable.IncomingForm();
            form.keepExtensions = true;
            form.parse(req, (err, fields, files) => {
                if (err) {
                    return res.send({error: 1, msg: '上传文件失败', data: null});
                }
                console.log('前端上传文件:', files);
                let option = {
                    pageUrl: `${baseUrl}/upload.ajax`,
                    req: req,
                    url: apiUrlList.upload,
                    formData: {
                        file: fs.createReadStream(path.resolve(files.file.path))
                    },
                    timeout: 15000,
                    json: true
                };
                console.log('option:', option);
                request.post(option, (error, response, body) => {
                    if (error) {
                        return res.send({error: 1, msg: '文件上传失败', data: null});
                    }
                    if (body && body.returnCode == 0) {
                        res.send({error: 0, msg: '上传成功', data: body.body});
                    } else if (body.returnCode != 0 && body.returnCode != 9999) {
                        res.send({error: 1, msg: body.returnMsg, data: null});
                    } else {
                        res.send({error: 1, msg: '文件上传失败', data: null});
                    }
                });
            });
        });

         // 批量修改
    app.post(`${baseUrl}/handleCheckBatch.ajax`, (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: `${baseUrl}/handleCheckBatch.ajax`,
            req: req,
            // operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.handleCheckBatch,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '操作失败',
                    data: null
                });
            }
            if (body.returnCode === 0) {
                res.send({
                    error: 0,
                    msg: '操作成功',
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
                    msg: '操作失败',
                    data: null
                });
            }
        });
    });
};
