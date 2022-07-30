
let tagMgmt = '';

if (global.envConfig.tagMgmt) {
    tagMgmt = global.envConfig.tagMgmt;
} else {
    tagMgmt = global.envConfig.inner_gateway;
}
tagMgmt += '/ncms/admin/v1';  

// 基金代码
let highFinancialMgmt = '';
if (global.envConfig.highFinancialMgmt) {
    highFinancialMgmt = global.envConfig.highFinancialMgmt;
} else {
    highFinancialMgmt = global.envConfig.inner_gateway;
}
highFinancialMgmt += '/vip/v1';

// 基金经理
let fundTag = '';
if (global.envConfig.fundTag) {
    fundTag = global.envConfig.fundTag;
} else {
    fundTag = global.envConfig.inner_gateway;
}
fundTag += '/productcenter/v1';

// ess
let ess = '';
console.log('ess=',global.envConfig.ess);
if (global.envConfig.ess) {
	ess = global.envConfig.ess;
} else {
	ess = global.envConfig.inner_gateway;
}
ess += '/ess/v1';
// 产品中心
let productcenter = '';
if (global.envConfig.productcenter) {
	productcenter = global.envConfig.productcenter;
} else {
	productcenter = global.envConfig.inner_gateway;
}
productcenter += '/productcenter/v1';
// common service
let commonService = '';
if (global.envConfig.commonService) {
	commonService = global.envConfig.commonService;
} else {
	commonService = global.envConfig.inner_gateway;
}
commonService += '/common-services/v1';

//fcs
let fcs = '';
if (global.envConfig.fcs) {
	fcs = global.envConfig.fcs;
} else {
	fcs = global.envConfig.inner_gateway;
}
fcs += '/fcs/v1';

let messageCenter = '';
if (global.envConfig.messageCenter) {
    messageCenter = global.envConfig.messageCenter;
} else {
    messageCenter = global.envConfig.inner_gateway;
}
messageCenter += '/message-center/v1';  

const devFilePath = global.envConfig.devFilePath;
const uopStaticNcmsFilePath = global.envConfig.uopStaticNcmsFilePath;
const uopStaticNcmsFilePath_url = global.envConfig.uopStaticNcmsFilePath_url;
let advertising = global.envConfig.advertising;
module.exports = {
	  	filePathExternal: uopStaticNcmsFilePath ? (uopStaticNcmsFilePath + '/contentMgmt') : (devFilePath + '/contentMgmt'),
		filePafilePathExternalthUrl: uopStaticNcmsFilePath ? (uopStaticNcmsFilePath_url + '/contentMgmt') : (devFilePath + '/contentMgmt'),
		// 产品列表
		productData:{
			// 一级页面
			productList:{
				// ess产品列表接口
				tableData:`${ess}/fund/wechat/uop/fund-list`,
				// 产品列表 ncms接口拼接ess
				tableDataSplit:`${tagMgmt}/ncms/product-media/query-product-list`,
				// 获取渠道权限列表
				branchList:`${commonService}/branch/top`,
				// 获取common service参数列表接口 现金宝分类，风险等级列表
				commonParams:`${commonService}/param/params`,
				// 产品信息查询新增修改
				querySingleProductInfo:`${productcenter}/new/uop/touli/funds/single/info/query`,
				productInsertOrUpdate:`${productcenter}/new/uop/touli/funds/single/insert-or-update`,
				// 物料包增删改查
				mediaPkbQuery:`${tagMgmt}/ncms/product-media-pkb/query`,
				mediaPkbAdd:`${tagMgmt}/ncms/product-media-pkb/add-product-media-pkb`,
				mediaPkbUpdate:`${tagMgmt}/ncms/product-media-pkb/update-product-media-pkb`,
				mediaPkbDel:`${tagMgmt}/ncms/product-media-pkb/delete-product-media-pkb`,
				// 批量修改
				batchOperation:`${productcenter}/new/uop/touli/funds/batch/update`
			},
			// 产品列表二级页面
			productListMaterial:{
					// 获取渠道权限列表
					branchList:`${commonService}/branch/top`,
					add:`${tagMgmt}/ncms/product-media/add-product-media`,
					tableData:`${tagMgmt}/ncms/product-media/query-product-media-list`,
					// tableData:`${ess}/article/uop/media-list`,
					getExistingMaterials:`${tagMgmt}/ncms/pitching-stategy/query-pitcing-stategy`,
					classifyList:`${tagMgmt}/ncms/category-config/query-first-second-category`, 
					threeClassifyList: `${tagMgmt}/ncms/category-config/query-list-by-id`,
					// 查询单条数据的信息
					singleQuery:`${tagMgmt}/ncms/pitching-stategy/query-materiaInfo-by-mediaIdList`,
					update:`${tagMgmt}/ncms/pitching-stategy/update-pitcing-stategy`,
					delete:`${tagMgmt}/ncms/product-media/delete-product-media`
			}
		},
    // 投教策略
    productMaterial:{
        investPrefecture:{
            getTableData: `${ess}/article/uop/media-list`,  //主数据
            getThemeList:`${tagMgmt}/ncms/pitching-stategy/query-category-name-by-mediaIdList`,  //获取主数据材料主题字段名字
            add:`${tagMgmt}/ncms/pitching-stategy/add-pitching-stategy`, 
            update:`${tagMgmt}/ncms/pitching-stategy/update-pitcing-stategy`, 
            del:`${tagMgmt}/ncms/pitching-stategy/delete-pitching-stategy`,
            classifyList:`${tagMgmt}/ncms/category-config/query-first-second-category`, //一二级分类
            threeClassifyList: `${tagMgmt}/ncms/category-config/query-list-by-id`,     //三级分类
            getTagList: `${tagMgmt}/ncms/tag-category-config/query-list`,             //关联标签
            getSecondTagList: `${tagMgmt}/ncms/tag-category-config/query-tagInfo-by-categoryId `,  //关联标签的二级
            fundList: `${highFinancialMgmt}/uop/cust-group-mapping/fundinfo-list`, //产品名称
            getManagerList: `${fundTag}/fundquery/fundmanager/allfundmanager `,    //基金经理
            allClassifyList:`${tagMgmt}/ncms/category-config/query-first-second-category`, 
            getUpdateDetails:`${tagMgmt}/ncms/pitching-stategy/query-materiaInfo-by-mediaIdList`,   //修改所需要的详细 
            searchMaterial:`${tagMgmt}/ncms/pitching-stategy/query-pitcing-stategy`,   //现有材料详细 
            branchList:`${commonService}/branch/top`,//渠道权限
            
        },
        contentInvestStrategy:{
            getTableData: `${ess}/article/uop/media-list`,  //主数据
            getThemeList:`${tagMgmt}/ncms/pitching-stategy/query-category-name-by-mediaIdList`,  //获取主数据材料主题字段名字
            add:`${tagMgmt}/ncms/pitching-stategy/add-pitching-stategy`, 
            update:`${tagMgmt}/ncms/pitching-stategy/update-pitcing-stategy`, 
            del:`${tagMgmt}/ncms/pitching-stategy/delete-pitching-stategy`,
            classifyList:`${tagMgmt}/ncms/category-config/query-first-second-category`, //一二级分类
            threeClassifyList: `${tagMgmt}/ncms/category-config/query-list-by-id`,     //三级分类
            getTagList: `${tagMgmt}/ncms/tag-category-config/query-list`,             //关联标签
            getSecondTagList: `${tagMgmt}/ncms/tag-category-config/query-tagInfo-by-categoryId `,  //关联标签的二级
            fundList: `${highFinancialMgmt}/uop/cust-group-mapping/fundinfo-list`, //产品名称
            getManagerList: `${fundTag}/fundquery/fundmanager/allfundmanager `,    //基金经理
            allClassifyList:`${tagMgmt}/ncms/category-config/query-first-second-category`, 
            getUpdateDetails:`${tagMgmt}/ncms/pitching-stategy/query-materiaInfo-by-mediaIdList`,   //修改所需要的详细 
            searchMaterial:`${tagMgmt}/ncms/pitching-stategy/query-pitcing-stategy`,   //现有材料详细 
            branchList:`${commonService}/branch/top`,//渠道权限
            
        },
        activity:{
            getTableData: `${ess}/article/uop/media-list`,  //主数据
            getThemeList:`${tagMgmt}/ncms/pitching-stategy/query-category-name-by-mediaIdList`,  //获取主数据材料主题字段名字
            add:`${tagMgmt}/ncms/pitching-stategy/add-pitching-stategy`, 
            update:`${tagMgmt}/ncms/pitching-stategy/update-pitcing-stategy`, 
            del:`${tagMgmt}/ncms/pitching-stategy/delete-pitching-stategy`,
            classifyList:`${tagMgmt}/ncms/category-config/query-first-second-category`, //一二级分类
            threeClassifyList: `${tagMgmt}/ncms/category-config/query-list-by-id`,     //三级分类
            getTagList: `${tagMgmt}/ncms/tag-category-config/query-list`,             //关联标签
            getSecondTagList: `${tagMgmt}/ncms/tag-category-config/query-tagInfo-by-categoryId `,  //关联标签的二级
            fundList: `${highFinancialMgmt}/uop/cust-group-mapping/fundinfo-list`, //产品名称
            getManagerList: `${fundTag}/fundquery/fundmanager/allfundmanager `,    //基金经理
            allClassifyList:`${tagMgmt}/ncms/category-config/query-first-second-category`, 
            getUpdateDetails:`${tagMgmt}/ncms/pitching-stategy/query-materiaInfo-by-mediaIdList`,   //修改所需要的详细 
            searchMaterial:`${tagMgmt}/ncms/pitching-stategy/query-pitcing-stategy`,   //现有材料详细 
            branchList:`${commonService}/branch/top`,//渠道权限
            
        }
    },
     // 运营物料
     operationMaterial:{
        pictureMgmt:{
            getTableData: `${ess}/article/uop/media-list`,  //主数据
            getThemeList:`${tagMgmt}/ncms/pitching-stategy/query-category-name-by-mediaIdList`,  //获取主数据材料主题字段名字
            add:`${tagMgmt}/ncms/pitching-stategy/add-pitching-stategy`, 
            update:`${tagMgmt}/ncms/pitching-stategy/update-pitcing-stategy`, 
            del:`${tagMgmt}/ncms/pitching-stategy/delete-pitching-stategy`,
            classifyList:`${tagMgmt}/ncms/category-config/query-first-second-category`, //一二级分类
            threeClassifyList: `${tagMgmt}/ncms/category-config/query-list-by-id`,     //三级分类
            getTagList: `${tagMgmt}/ncms/tag-category-config/query-list`,             //关联标签
            getSecondTagList: `${tagMgmt}/ncms/tag-category-config/query-tagInfo-by-categoryId `,  //关联标签的二级
            fundList: `${highFinancialMgmt}/uop/cust-group-mapping/fundinfo-list`, //产品名称
            getManagerList: `${fundTag}/fundquery/fundmanager/allfundmanager `,    //基金经理
            allClassifyList:`${tagMgmt}/ncms/category-config/query-first-second-category`, 
            getUpdateDetails:`${tagMgmt}/ncms/pitching-stategy/query-materiaInfo-by-mediaIdList`,   //修改所需要的详细 
            searchMaterial:`${tagMgmt}/ncms/pitching-stategy/query-pitcing-stategy`,   //现有材料详细 
            branchList:`${commonService}/branch/top`,//渠道权限
            
        },
        addRichSign:{
            getTableData: `${ess}/article/uop/media-list`,  //主数据
            add:`${tagMgmt}/ncms/pitching-stategy/add-pitching-stategy`, 
            update:`${tagMgmt}/ncms/pitching-stategy/update-pitcing-stategy`, 
            del:`${tagMgmt}/ncms/pitching-stategy/delete-pitching-stategy`,
            classifyList:`${tagMgmt}/ncms/category-config/query-first-second-category`, //一二级分类
            threeClassifyList: `${tagMgmt}/ncms/category-config/query-list-by-id`,     //三级分类
            getTagList: `${tagMgmt}/ncms/tag-category-config/query-list`,             //关联标签
            getSecondTagList: `${tagMgmt}/ncms/tag-category-config/query-tagInfo-by-categoryId `,  //关联标签的二级
            fundList: `${highFinancialMgmt}/uop/cust-group-mapping/fundinfo-list`, //产品名称
            getManagerList: `${fundTag}/fundquery/fundmanager/allfundmanager `,    //基金经理
            allClassifyList:`${tagMgmt}/ncms/category-config/query-first-second-category`, 
            getUpdateDetails:`${tagMgmt}/ncms/pitching-stategy/query-materiaInfo-by-mediaIdList`,   //修改所需要的详细 
            searchMaterial:`${tagMgmt}/ncms/pitching-stategy/query-pitcing-stategy`,   //现有材料详细 
            branchList:`${commonService}/branch/top`,//渠道权限
            updatePushStatus:`${tagMgmt}/ncms/operate-materia/modify-push-status`,//上架状态
            
        },
        articleResource:{
            getTableData: `${ess}/article/uop/media-list`,  //主数据
            getThemeList:`${tagMgmt}/ncms/pitching-stategy/query-category-name-by-mediaIdList`,  //获取主数据材料主题字段名字
            add:`${tagMgmt}/ncms/pitching-stategy/add-pitching-stategy`, 
            update:`${tagMgmt}/ncms/pitching-stategy/update-pitcing-stategy`, 
            del:`${tagMgmt}/ncms/pitching-stategy/delete-pitching-stategy`,
            classifyList:`${tagMgmt}/ncms/category-config/query-first-second-category`, //一二级分类
            threeClassifyList: `${tagMgmt}/ncms/category-config/query-list-by-id`,     //三级分类
            getTagList: `${tagMgmt}/ncms/tag-category-config/query-list`,             //关联标签
            getSecondTagList: `${tagMgmt}/ncms/tag-category-config/query-tagInfo-by-categoryId `,  //关联标签的二级
            fundList: `${highFinancialMgmt}/uop/cust-group-mapping/fundinfo-list`, //产品名称
            getManagerList: `${fundTag}/fundquery/fundmanager/allfundmanager `,    //基金经理
            allClassifyList:`${tagMgmt}/ncms/category-config/query-first-second-category`, 
            getUpdateDetails:`${tagMgmt}/ncms/pitching-stategy/query-materiaInfo-by-mediaIdList`,   //修改所需要的详细 
            searchMaterial:`${tagMgmt}/ncms/pitching-stategy/query-pitcing-stategy`,   //现有材料详细 
            branchList:`${commonService}/branch/top`,//渠道权限
            checkSetClassify:`${tagMgmt}/ncms/category-config/batch-update-children-category`,  //设置分类
            
        }
    },
    contentClassifyMgmt:{
        firstLevel:{
            getTableData: `${tagMgmt}/ncms/category-config/query-list-by-id`,
            add:`${tagMgmt}/ncms/category-config/add`,
            update:`${tagMgmt}/ncms/category-config/update`,
            deleteParam:`${tagMgmt}/ncms/category-config/delete`,
        },
        secondLevel:{
            getTableData: `${tagMgmt}/ncms/category-config/query-list-by-id`,
            add:`${tagMgmt}/ncms/category-config/add`,
            update:`${tagMgmt}/ncms/category-config/update`,
            deleteParam:`${tagMgmt}/ncms/category-config/delete`,
            getCategoryIdList:`${tagMgmt}/ncms/category-config/query-list-by-id`,
        },
        threeLevel:{
            getTableData: `${tagMgmt}/ncms/category-config/query-list-by-id`,
            add:`${tagMgmt}/ncms/category-config/add`,
            update:`${tagMgmt}/ncms/category-config/update`,
            deleteParam:`${tagMgmt}/ncms/category-config/delete`,
            getCategoryIdList:`${tagMgmt}/ncms/category-config/query-list-by-id`,
        }
    },
    tagMgmt:{
        tagClassifyMgmt:{
            getTableData: `${tagMgmt}/ncms/tag-category-config/query-list`,
            add:`${tagMgmt}/ncms/tag-category-config/add-tag-category`,
            update:`${tagMgmt}/ncms/tag-category-config/update-tag-category`,
            del:`${tagMgmt}/ncms/tag-category-config/delete-tag-category`,
        },
        tagContentMgmt:{
            getTableData: `${tagMgmt}/ncms/tag-config/query-list`,
            add:`${tagMgmt}/ncms/tag-config/add-tag-config`,
            update:`${tagMgmt}/ncms/tag-config/update-tag-config`,
            deleteParam:`${tagMgmt}/ncms/tag-config/delete-tag-config`,
            getTagClassify:`${tagMgmt}/ncms/tag-category-config/query-list`,
        }       
    },
    serviceAndRemindMgmt: {
        popupMgmt: {
            getTableData: `${tagMgmt}/ncms/dim-popup/query-list`,
            add: `${tagMgmt}/ncms/dim-popup/add-dim-popup`,
            update:`${tagMgmt}/ncms/dim-popup/update-dim-popup`,
            deleteParam:`${tagMgmt}/ncms/dim-popup/delete-dim-popup`,
            searchSingle:`${tagMgmt}/ncms/pitching-stategy/query-materiaInfo-by-mediaIdList`,
            // getPvData:`${advertising}/popup/articleOptions`,
            switchUpdate:`${tagMgmt}/ncms/dim-popup/update-enableFlag`,  //修改发布状态
            // getRefresh:`${advertising}/popup/articleOptions/refresh`,
            allClassifyList:`${tagMgmt}/ncms/category-config/query-first-second-category`, //一二级分类
            threeClassifyList: `${tagMgmt}/ncms/category-config/query-list-by-id`,     //三级分类
            searchMaterial:`${tagMgmt}/ncms/pitching-stategy/query-pitcing-stategy`,   //现有素材材料详细 
        },
        publicMessagePush:{
            // wxmessage
            // getTableData: `${messageCenter}/messageRule/rule/ruleSource/get`,
            getTableData: `${messageCenter}/messageRule/tianfu/get`,
            add: `${messageCenter}/rules/tianfu/weixin/create`,
            update:`${messageCenter}/rules/tianfu/weixin/modify`,
            deleteParam:`${messageCenter}/rules/tianfu/weixin/delete`,
            
            getMessageOptions:`${tagMgmt}/ncms/dim-wechat-message/wechat-templates/get-list`,
            getPopupList:`${tagMgmt}/ncms/dim-popup/query-list`,
            // searchSingle:`${advertising}/wxmessage`,
            // switchUpdate:`${advertising}/popup/updateStatus`,
            allClassifyList:`${tagMgmt}/ncms/category-config/query-first-second-category`, //一二级分类
            threeClassifyList: `${tagMgmt}/ncms/category-config/query-list-by-id`,     //三级分类
            searchMaterial:`${tagMgmt}/ncms/pitching-stategy/query-pitcing-stategy`,   //现有素材材料详细 
            getSingleMaterial:`${messageCenter}/messageTemplate/query`,   //单个数据信息-消息中心的
        },
    },
		// 添富提醒
		addRichRemindMgmt:{
			uniformInterface: `${fcs}/tianfu-calendar/notifications`,  //增查全部都是此接口只不过请求方式与参数不同
			uniformInterface2: `${fcs}/tianfu-calendar/notification`,  //删改全部都是此接口只不过请求方式与参数不同
			// 获取渠道权限列表
            branchList:`${commonService}/branch/top`,
            switchUpdate: `${fcs}/tianfu-calendar/notification/shelf-status`,
		}
};

