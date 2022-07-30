const request = require('../../../local_data/requestWrapper');
const apiConfig = require('../apiConfig');
const {execSync} = require('child_process');
const filePathExternal = apiConfig.filePathExternal + '/resources';
const filePathExternalZip = apiConfig.filePathExternal + '/resources/zips';
const filePathExternalBak = apiConfig.filePathExternal + '/resources/zips/bak';

const filePathExternal_url = apiConfig.filePafilePathExternalthUrl + '/resources';
const filePathExternalZip_url = apiConfig.filePafilePathExternalthUrl + '/resources/zips';
console.log('filePathExternal_url=============',filePathExternal_url);
console.log('filePathExternalZip_url=============',filePathExternalZip_url);
const path = require('path');
const fs = require('fs');
const formidable = require('formidable');
const fileName = 'index.html';

module.exports = function (app) {
    // 文件上传
    app.post('/publicConfig/alipayConfig/cmbMPConfig/uploadFile.ajax', (req, res, next) => {
        try {
            console.log('apiConfig.filePathExternal',apiConfig.filePathExternal);
            console.log('filePathExternal',filePathExternal);
            // return;
            // publicConfig根目录
            console.log(apiConfig.filePathExternal,'---------');
            !fs.existsSync(apiConfig.filePathExternal) && fs.mkdirSync(apiConfig.filePathExternal);
            // /publicConfig/resources
            !fs.existsSync(filePathExternal) && fs.mkdirSync(filePathExternal);
            // /resources/zip目录
            !fs.existsSync(filePathExternalZip) && fs.mkdirSync(filePathExternalZip);
            //  /resources/zip/bak历史文件目录
            !fs.existsSync(filePathExternalBak) && fs.mkdirSync(filePathExternalBak);
            let form = new formidable.IncomingForm();
            form.uploadDir = filePathExternalZip;
            form.keepExtensions = true;
            form.parse(req, (err, fields, files) => {
                console.log('数据接收完毕:', fields);
                console.log('文件接收完毕:', files);
                let originFilePath = path.resolve(files.file.path);
                // 带后缀
                let originFileName = files.file.name;
                // 不带后缀
                let simplifyName = originFileName.split('.zip')[0];
                if(simplifyName==='zips'){
                    res.send({
                        error: 1,
                        msg: 'zip包名不能为zips',
                        data: null
                    });
                }
                console.log(originFileName);
                try {
                    if(fs.existsSync(path.resolve(filePathExternalZip,originFileName))){
                        const fileReName  = simplifyName+currentCST()+'.zip';
                        const oldPath = path.resolve(filePathExternalZip,originFileName);
                        const newPath = path.resolve(filePathExternalBak,fileReName);
                        console.log('historyBakPath:',newPath);
                        console.log('historyBakName:',fileReName);
                        fs.renameSync(oldPath,newPath);
                    }
                    // 包文件上传到zip文件夹
                    let reader = fs.createReadStream(originFilePath);
                    let writer = fs.createWriteStream(`${filePathExternalZip}/${originFileName}`);
                    console.log('uploadFilePath:',`${filePathExternalZip}/${originFileName}`);
                    reader.pipe(writer);
                    writer.on('finish',()=>{
                        // 写入成功后执行
                        try {
                            fs.unlinkSync(originFilePath);
                            if(fs.existsSync(path.resolve(filePathExternal,simplifyName))){
                                console.log('file path before or after unzip:',path.resolve(filePathExternal,simplifyName));
                                execSync('rm -rf '+simplifyName,{cwd:filePathExternal});
                            }
                            // 解压缩文件到上层目录
                            execSync('unzip -o -d ../ '+originFileName,{cwd:filePathExternalZip});
                            res.send({
                                error: 0,
                                msg: '上传成功',
                                data: {
                                    filePath: `${filePathExternal_url}/${simplifyName}/index.html`
                                }
                            });
                        } catch (error) {
                            console.log('writer inner--------',error);
                            res.send({
                                error: 1,
                                msg: error,
                                data: null
                            });
                        }
                    });
                } catch (error) {
                    console.log('writer outter--------',error);
                    res.send({
                        error: 1,
                        msg: error,
                        data: null
                    });
                }
                
                

                
                // fs.readdir(filePathExternalZip,{encoding:'utf-8'},(err,readFlies)=>{
                //     if(err) {
                //         res.send({
                //             error: 0,
                //             msg: err,
                //             data: null
                //         });
                //     }
                //     // 遍历zip包里是否已经存在同名的包
                //     readFlies.filter((item)=>{
                //         return item.includes('.zip');
                //     }).forEach((item)=>{
                //         if(item==originFileName){
                //             const fileReName  = item.split('.zip')[0]+new Date().getTime()+'.zip';
                //             const oldPath = path.resolve(filePathExternalZip,item);
                //             const newPath = path.resolve(filePathExternalZip,'bak',fileReName);
                //             fs.renameSync(oldPath,newPath);
                //         }
                //     })
                //     // 包文件上传到zip文件夹
                //     let reader = fs.createReadStream(originFilePath);
                //     let writer = fs.createWriteStream(`${filePathExternalZip}/${originFileName}`);
                //     reader.pipe(writer);
                //     writer.on('finish',()=>{
                //         // 写入成功后执行
                //         try {
                //             fs.unlinkSync(originFilePath);
                //             // 解压缩文件到上层目录
                //             fs.readdir(filePathExternal,{encoding:'utf-8'},(err,readfile2)=>{
                //                 readfile2.filter((item)=>{
                //                     return item != 'zips'
                //                 }).forEach((item)=>{
                //                     if(item==originFileName.split('.zip')[0]){
                //                         execSync('rm -rf '+item,{cwd:filePathExternal});
                //                     }
                //                 })
                //                 execSync('unzip -o -d ../ '+originFileName,{cwd:filePathExternalZip});
                //                 res.send({
                //                     error: 0,
                //                     msg: '上传成功',
                //                     data: {
                //                         filePath: `${filePathExternalZip}/${originFileName}`
                //                     }
                //                 });
                //             })
                            
                //         } catch (error) {
                //             console.log(error);
                //             res.send({
                //                 error: 0,
                //                 msg: error,
                //                 data: null
                //             });
                //         }
                        
                //     });
                // })
                // return;
                
            });
        } catch (error) {
            console.log('/publicConfig/alipayConfig/cmbMPConfig/uploadFile.ajax -------- 文件上传失败error:', error);
            res.send({
                error: 0,
                msg: '上传失败',
                data: null
            });
        }
    });
    // 获取文件列表
    app.post('/publicConfig/alipayConfig/cmbMPConfig/getTableData.ajax', (req, res, next) => {
        let fileQuery = req.body.fileName;
        try {
            // publicConfig根目录
            !fs.existsSync(apiConfig.filePathExternal) && fs.mkdirSync(apiConfig.filePathExternal);
            // /publicConfig/resources
            !fs.existsSync(filePathExternal) && fs.mkdirSync(filePathExternal);
            // /resources/zip目录
            !fs.existsSync(filePathExternalZip) && fs.mkdirSync(filePathExternalZip);
            //  /resources/zip/bak历史文件目录
            !fs.existsSync(filePathExternalBak) && fs.mkdirSync(filePathExternalBak);
            fs.readdir(filePathExternalZip,{encoding:'utf-8'},(err,readFlies)=>{
                if(err) {
                    res.send({
                        error: 1,
                        msg: err,
                        data: null
                    });
                }
                let fileList = [];
                // 遍历zip包里是否已经存在同名的包
                readFlies.filter((item)=>{
                    if(fileQuery){
                        return item.includes('.zip')&&item.includes(fileQuery);
                    }else{
                        return item.includes('.zip');
                    }
                }).forEach((item)=>{
                    fileList.push({
                        fileName:item,
                        uploadFilePath:path.resolve(filePathExternalZip,item),
                        downloadFilePath:filePathExternalZip_url+'/'+item,
                        viewablePath:filePathExternal_url+'/'+item.split('.zip')[0]+'/index.html'
                    })
                })
                res.send({
                    error: 0,
                    msg: '读取成功',
                    data: {
                        fileList
                    }
                });
            })
        } catch (error) {
            console.log('/publicConfig/alipayConfig/cmbMPConfig/getFlieList.ajax -------- 读取文件失败error:', error);
            res.send({
                error: 1,
                msg: '读取文件失败',
                data: null
            });
        }
    });
    // 删除文件列表
    app.post('/publicConfig/alipayConfig/cmbMPConfig/del.ajax', (req, res, next) => {
        if(req.body.fileName){
            var delFileName = req.body.fileName;
            var simpleDelFileName = req.body.fileName.split('.zip')[0];
        }else{
            return res.send({
                error: 1,
                msg: '删除失败',
                data: null
            });
        }
        try {
            if(fs.existsSync(`${filePathExternalZip}/${delFileName}`)){
                const fileReName  = simpleDelFileName+currentCST()+'.zip';
                const oldPath = path.resolve(filePathExternalZip,delFileName);
                const newPath = path.resolve(filePathExternalBak,fileReName);
                console.log('historyBakPath:',newPath);
                console.log('historyBakName:',fileReName);
                fs.renameSync(oldPath,newPath);
            }
            if(fs.existsSync(`${filePathExternal}/${simpleDelFileName}`)){
                execSync('rm -rf '+simpleDelFileName,{cwd:filePathExternal});
            }
            res.send({
                error: 0,
                msg: '删除成功',
                data: null
            });
        } catch (error) {
            console.log('/publicConfig/alipayConfig/cmbMPConfig/del.ajax -------- 文件删除失败error:', error);
            res.send({
                error: 1,
                msg: '删除失败',
                data: null
            });
        }
    });
    // 封面图片文件上传
    // app.post('/publicConfig/alipayConfig/cmbMPConfig/uploadPostPicFile.ajax', (req, res, next) => {
    //     try {
    //         !fs.existsSync(apiConfig.filePathExternal) && fs.mkdirSync(apiConfig.filePathExternal);
    //         !fs.existsSync(filePathExternal) && fs.mkdirSync(filePathExternal);
    //         const postPicFilePath = filePathExternal + '/poster';
    //         !fs.existsSync(postPicFilePath) && fs.mkdirSync(postPicFilePath);
    //         let form = new formidable.IncomingForm();
    //         form.uploadDir = postPicFilePath;
    //         form.keepExtensions = true;
    //         form.parse(req, (err, fields, files) => {
    //             console.log('数据接收完毕:', fields);
    //             console.log('文件接收完毕:', files);
    //             let originFilePath = path.resolve(files.file.path);
    //             fs.createReadStream(originFilePath).pipe(fs.createWriteStream(`${postPicFilePath}/${files.file.name}`));
    //             fs.unlinkSync(originFilePath);
    //             res.send({
    //                 error: 0,
    //                 msg: '上传成功',
    //                 data: {
    //                     filePath: `${filePathExternal_url}/poster/${files.file.name}`
    //                 }
    //             });
    //         });
    //     } catch (error) {
    //         console.log('/publicConfig/alipayConfig/cmbMPConfig/uploadPostPicFile.ajax -------- 文件上传失败error:', error);
    //         res.send({
    //             error: 0,
    //             msg: '上传失败',
    //             data: null
    //         });
    //     }
    // });
    // 获取封面图片文件地址
    // app.post('/publicConfig/alipayConfig/cmbMPConfig/getPostPicFilePath.ajax', (req, res, next) => {
    //     const postPicFilePath = filePathExternal + '/poster';
    //     fs.readdir(postPicFilePath, 'utf-8', (error, data) => {
    //         if (error) {
    //             return res.send({
    //                 error: 1,
    //                 msg: 'fail',
    //                 data: error.message
    //             });
    //         }
    //         return res.send({
    //             error: 0,
    //             msg: 'success',
    //             data: data.map(filename => `${filePathExternal_url}/poster/${filename}`)
    //         });
    //     })
    // });
    // 获取文件地址
    // app.post('/publicConfig/alipayConfig/cmbMPConfig/getFilePath.ajax', (req, res, next) => {
    //     res.send({
    //         error: 0,
    //         msg: 'success',
    //         data: {
    //             filePath: `${filePathExternal_url}/${fileName}`
    //         }
    //     });
    // });
    // 获取文件内容
    // app.post('/publicConfig/alipayConfig/cmbMPConfig/getFile.ajax', (req, res, next) => {
    //     fs.readFile(`${filePathExternal}/${fileName}`, 'utf-8', function (err, data) {
    //         if (err) {
    //             res.send({
    //                 error: 1,
    //                 msg: 'fail',
    //                 data: err.message
    //             });
    //         } else {
    //             res.send({
    //                 error: 0,
    //                 msg: 'success',
    //                 data: typeof data === 'string' ? data : JSON.stringify(data)
    //             });
    //         }
    //     });
    // });
};
function currentCST() {
    // GMT+0800 (CST)
    var d = new Date();
    var timezoneOffset = d.getTimezoneOffset(); //minutes, -480
    var ddd = new Date(d.getTime() - timezoneOffset * 60000);   //local date.
    return ddd.toJSON() + " GMT+0800 (CST)";
}