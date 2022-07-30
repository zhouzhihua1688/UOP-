const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').scenceMgmt.scenceList;

module.exports = function (app) {
    //查询
    app.post('/messageCenter/scenceMgmt/scenceList/search.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/messageCenter/scenceMgmt/scenceList/search.ajax',
            req: req,
            url: apiUrlList.search,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode === 0 && Array.isArray(result.body)) {
                result.body.forEach(item => {
                    item.createTime = format(item.createTime);
                    item.updateTime = format(item.updateTime);
                });
                res.send({error: 0, msg: '查询成功', data: result.body});
            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: 1, msg: '查询失败'});
            }
        });
    });
};
function add0(m) {
    return m < 10 ? '0' + m : m
}
function format(num) {
    var time = new Date(num);
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
}