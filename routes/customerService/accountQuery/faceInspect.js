const request = require('./../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').accountQuery.faceInspect;
const request_obs = require('../../../local_data/request_obs');
const original_request = require('request');
const formidable = require('formidable');
const fs = require('fs');
module.exports = function (app) {


    //图片上传
    app.post('/customerService/accountQuery/faceInspect/upload.ajax', (req, res, next) => {
        let form = new formidable.IncomingForm();
        form.keepExtensions = true;
        form.parse(req, (err, fields, files) => {
            if (err) {
                console.log('/customerService/accountQuery/faceInspect/upload.ajax:', err);
                return res.send({
                    error: 1,
                    msg: '上传文件失败',
                    data: null
                });
            }
            console.log('文件接收完毕:', files);
            console.log('数据接收完毕:', fields);
            let fileName = `uop_face_${fields.idno}_${getDate()}_raw_img`;
            let option = {
                body: {
                    container: 'faceImages',
                    keyStoneName: "uop",
                    keyStonePassword: "uop",
                    objectName: fileName,
                }
            };
            request_obs(option).then(tokenInfo => {
                let tokenParams = {
                    url: tokenInfo.uri.href,
                    headers: tokenInfo.headers,
                };
                console.log('/customerService/accountQuery/faceInspect/upload.ajax --tokenParams:', tokenParams);
                fs.createReadStream(files.file.path).pipe(original_request.put(tokenParams))
                let option = {
                    req,
                    // operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
                    url: apiUrl.validate,
                    body: {
                        idno: fields.idno,
                        invnm: fields.invnm,
                        busiCode: "uop",
                        faceComparison: {
                            comparisionType: "1",
                            faceImageType: "raw_image",
                            uploadedImage: fileName
                        }

                    },
                    timeout: 15000,
                    json: true
                };
                console.log('/customerService/accountQuery/faceInspect/upload.ajax  --validate  option:', {
                    ...option,
                    req: '#'
                });
                request.post(option, (error, response, body) => {
                    console.log('/customerService/accountQuery/faceInspect/upload.ajax  --validate error:', error);
                    console.log('/customerService/accountQuery/faceInspect/upload.ajax  --validate statusCode:', response && response.statusCode);
                    console.log('/customerService/accountQuery/faceInspect/upload.ajax  --validate body:', body);
                    if (error) {
                        return res.send({
                            error: 1,
                            msg: '上传图片成功,验证失败'
                        });
                    }
                    let result = typeof body === 'string' ? JSON.parse(body) : body;
                    if (result && result.returnCode == 0) {
                        return res.send({
                            error: 0,
                            msg: result.returnMsg,
                            data: result.body
                        });
                    } else if (result && result.returnCode != 9999) {
                        return res.send({
                            error: 1,
                            msg: result.returnMsg,
                            data: result.body
                        });
                    } else {
                        return res.send({
                            error: 1,
                            msg: '上传图片成功,验证失败',
                            data: null
                        });
                    }
                });
            }).catch(error => {
                return res.send({
                    error: 1,
                    msg: '上传图片失败',
                    data: null
                });
            });
        });
    });
};

function getDate() {
    var date = new Date();
    // 日期分割符号
    var nowDate = `${date.getFullYear()}${ zero(date.getMonth() + 1)}${zero(date.getDate())}${zero(date.getHours())}${zero(date.getMinutes())}${zero(date.getSeconds())}${date.getMilliseconds()}`
    return nowDate;
}

function zero(time) {
    if (time >= '10') {
        return time
    } else {
        return '0' + time
    }
}