const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
const compressing = require('compressing');
const publicConfigFilePath = global.envConfig.publicConfigFilePath ? global.envConfig.publicConfigFilePath : `${global.envConfig.devFilePath}/${require('../apiConfig').filePath}`;

module.exports = function (app) {
    //获取前端图片和字符串
    app.post('/publicConfig/automatedTool/sliceTool/createZip.ajax', (req, res) => {
        let curTime = new Date();
        let timezoneOffset = curTime.getTimezoneOffset(); //minutes, -480
        let curTimeStr = new Date(curTime.getTime() - timezoneOffset * 60000);   //local date.
        let fileName = curTimeStr.toJSON().replace(/\./g, '').replace(/:/g, '');
        // 菜单文件路径
        const menuPath = `${publicConfigFilePath}/sliceTool`;
        // 生成文件路径
        const filePath = `${publicConfigFilePath}/sliceTool/${fileName}`;
        // 图片路径
        const imagePath = `${filePath}/img`;
        try {
            if (!fs.existsSync(publicConfigFilePath)) {
                fs.mkdirSync(publicConfigFilePath);
            }
            if (!fs.existsSync(menuPath)) {
                //创建菜单文件路径
                fs.mkdirSync(menuPath);
            }
            //创建文件路径
            fs.mkdirSync(filePath);
            //创建图片文件路径
            fs.mkdirSync(imagePath);
        } catch (e) {
            console.log(e.message);
            return res.send({error: 1, msg: '创建文件/图片路径出错'});
        }
        //保存图片
        let form = new formidable.IncomingForm();
        form.uploadDir = imagePath;
        form.parse(req, function (err, fields, files) {
            if (err) {
                return res.send({error: 1, msg: '解析图片出错'});
            }
            let HTMLstr = fields.HTMLstr ? fields.HTMLstr : '';
            console.log('源HTML字符串:', HTMLstr);
            if (!HTMLstr) {
                return res.send({error: 1, msg: '源HTML字符串为空,无法解析'});
            }
            console.log('接收图片文件: ', files);
            //图片重命名
            let imageNum = Object.keys(files).length;
            let countImageNum = 0;
            for (let imageFileKey in files) {
                let imageFile = files[imageFileKey];
                let oldpath = imageFile.path;
                let newpath = path.join(path.dirname(oldpath), imageFile.name);
                fs.rename(oldpath, newpath, (err) => {
                    if (err) {
                        return res.send({error: 1, msg: '图片重命名出错'});
                    }
                    countImageNum++;
                    if (countImageNum == imageNum) {
                        console.log('图片重命名完毕');
                        fs.writeFile(`${filePath}/index.html`, HTMLstr, function (err) {
                            if (err) {
                                return res.send({error: 1, msg: '写入index文件出错'});
                            }
                            console.log("index文件写入成功");
                            //压缩文件
                            let zipFile = compressing.zip.compressDir(filePath, `${menuPath}/${fileName}.zip`);
                            zipFile.then(() => {
                                console.log('生成压缩包成功');
                                //文件下载
                                res.download(`${menuPath}/${fileName}.zip`);
                            });
                            zipFile.catch(err => {
                                res.send({error: 1, msg: '压缩文件出错'});
                            });
                        });
                    }
                });
            }
        });
    });
    app.post('/publicConfig/automatedTool/sliceTool/create.ajax', (req, res) => {
        let curTime = new Date();
        let timezoneOffset = curTime.getTimezoneOffset(); //minutes, -480
        let curTimeStr = new Date(curTime.getTime() - timezoneOffset * 60000);   //local date.
        let fileName = curTimeStr.toJSON().replace(/\./g, '').replace(/:/g, '');
        // 菜单文件路径
        const menuPath = `${publicConfigFilePath}/sliceTool`;
        // 生成文件路径
        const filePath = `${publicConfigFilePath}/sliceTool/${fileName}`;
        let form = new formidable.IncomingForm();
        form.keepExtensions = true;
        form.parse(req, (err, fields, files) => {
            try {
                if (!fs.existsSync(publicConfigFilePath)) {
                    fs.mkdirSync(publicConfigFilePath);
                }
                if (!fs.existsSync(menuPath)) {
                    //创建菜单文件路径
                    fs.mkdirSync(menuPath);
                }
                //创建文件路径
                fs.mkdirSync(filePath);
            } catch (e) {
                console.log(e.message);
                return res.send({error: 1, msg: '创建文件路径出错'});
            }
            console.log('获取前端字符串:', fields.HTMLstr);
            fs.writeFile(`${filePath}/index.html`, fields.HTMLstr, "utf8", function (err) {
                if (err) {
                    return res.send({error: 1, msg: '写入index文件出错'});
                }
                console.log("index文件写入成功");
                //压缩文件
                let zipFile = compressing.zip.compressDir(filePath, `${menuPath}/${fileName}.zip`);
                zipFile.then(() => {
                    console.log('生成压缩包成功');
                    //文件下载
                    res.download(`${menuPath}/${fileName}.zip`);
                });
                zipFile.catch(err => {
                    res.send({error: 1, msg: '压缩文件出错'});
                });
            });
        });

    });
};

