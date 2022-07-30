// 接口总配置
let cashMgmt = '';

let livingPay_1 = '';
let livingPay_2 = '';

if (global.envConfig.cashMgmt) {
    cashMgmt = global.envConfig.cashMgmt;
    livingPay_1 = cashMgmt.livingPay_1;
    livingPay_2 = cashMgmt.livingPay_2;
} else {
    cashMgmt = global.envConfig.inner_gateway;
    livingPay_1 = cashMgmt + '/las/v1';
    livingPay_2 = cashMgmt + '/las-web/v1';
}


module.exports = {
    livingPay: {
        //机构管理
        codeList: livingPay_1 + '/districtCode/codeList', //地区选择
        list: livingPay_1 + '/company/list', //表格数据
        typeList: livingPay_1 + '/company/typeList', //缴费类型
        deleteEven: livingPay_1 + '/company/delete', //删除机构
        companyvo: livingPay_1 + '/company/companyvo', //修改机构
        utilityCompany: livingPay_1 + '/company/utility_company', //新增机构
        queryBillTest:'http://10.50.115.63:8016/company_param_test/query_bill', //账单测试
        billPayTest: 'http://10.50.115.63:8016/company_param_test/pay_bill', //支付测试
        //机构生效
        inAvailable: livingPay_1 + '/company/inAvailable', //无效机构
        beAvailable: livingPay_1 + '/company/beAvailable', //有效机构
        //地区管理
        districtCodeList: livingPay_1 + '/districtCode/list', //地区表格数据
        inSupport: livingPay_1 + '/districtCode/inSupport', //取消支持
        beSupport: livingPay_1 + '/districtCode/beSupport', //支持
        districtCodeAdd: livingPay_1 + '/districtCode/add', //新增地区
        districtCodeDelete: livingPay_1 + '/districtCode/delete', //删除地区（带入参数）
        //机构停运
        companyPauseScheduleList: livingPay_1 + '/companyPause/list', //停运表格数据
        allCompany: livingPay_1 + '/companyPauseSchedule/allCompany', //选择机构select
        scheduleAdd: livingPay_1 + '/companyPause/companyPause', //新增停运、修改停运 公用链接
        // companyPauseScheduleDetail:livingPay_1+'/companyPauseSchedule/companyPauseScheduleDetail',//修改停运
        scheduleDelete: livingPay_1 + '/companyPause/delete', //删除停运
        scheduleQueryOne: livingPay_1 + '/companyPause/companyPauseDetail', //查询单个数据
        //停运公告
        noticeList: livingPay_1 + '/companyAnnouncement/list',
        noticeDelete: livingPay_1 + '/companyAnnouncement/delete',
        noticeAdd: livingPay_1 + '/companyAnnouncement/companyAnnouncement',
        noticeQueryOne: livingPay_1 + '/companyAnnouncement/companyAnnouncementDetail',
    }
};