const req=require('../axios')
module.exports={
    // 赛事信息
    getAllGame(){
        return req.post_Param('api/game',{'judge':0})
    },
    getOneGameById(id){
        return req.post_Param('api/game',{'judge':4,'id':id})
    },
    getGameByCondition(condition){
        return req.post_Param('api/game',{'judge':5,'condition':condition})
    },
    // 参赛者信息
    getAllSway(){
        return req.post_Param('/api/ass/company_sway',{'judge':3})
    },
    getOneSwayById(id){
        return req.post_Param('/api/sway',{'judge':8,'id':id})
    },
    // 管理员信息
    getAllAdmin(){
        return req.post_Param('/api/admin',{'judge':1})
    },
    getOneAdminById(id){
        return req.post_Param('/api/admin',{'judge':3,'id':id})
    },
    //公司信息
    getAllCompany(){
        return req.post_Param('/api/company',{'judge':0})
    },
    getOneCompanyById(id){
        return req.post_Param('/api/company',{'judge':4,'id':id})
    },
    // 竞拍信息
    updateOneCompeteConditionById(id,condition){
        return req.post_Param('api/compete',{'judge':2,'id':id,'condition':condition})
    },
    // 资产数据
    getAllStatistic(){
        return req.post_Param('/api/statistic',{'judge':0})
    },
    getOneStatisticByCompanyId(company_id){
        return req.post_Param('/api/ass/company_statistic',{'judge':5,'company_id':company_id})
    },
    getAllStatisticWithCompanyInfo(){
        return req.post_Param('/api/ass/company_statistic',{'judge':4})
    },
    // 财年更新
    getGameYear(id){
        return req.post_Param('/api/game',{'judge':4,'id':id})
    },
    getLastGameYear(){
        return req.post_Param('/api/game',{'judge':6})
    },
    // 库存（产品&原料）
    getAllGoodsStock(){
        return req.post_Param('/api/ass/industryyield_commerresearch',{'judge':4})
    },
    getOneGoodsStockByCompanyId(company_id){
        return req.post_Param('/api/ass/industryyield_commerresearch',{'judge':3,'company_id':company_id})
    },
    getAllSourceStock(){
        return req.post_Param('/api/miniyield',{'judge':0})
    },
    getOneSourceStockByCompanyId(company_id){
        return req.post_Param('/api/miniyield',{'judge':4,'company_id':company_id})
    },
    // 公司产品库
    getAllGoods(){
        return req.post_Param('/api/commerresearch',{'judge':0})
    },
    getOneGoodByCompanyId(company_id){
        return req.post_Param('/api/commerresearch',{'judge':5,'company_id':company_id})
    },
    // 交易信息
    getAllTransation(){
        return req.post_Param('/api/transaction',{'judge':0})
    },
    getOneTransationByCompanyId(company_id){
        return req.post_Param('/api/transaction',{'judge':8,'company_id':company_id})
    },
    getOneTransationByCompanyIdAndType(company_id,type){
        return req.post_Param('/api/transaction',{'judge':9,'company_id':company_id,'type':type})
    },
    deleteOneTransationById(id){
        return req.post_Param('api/transaction',{'judge':3,'id':id})
    }
    
}