const req=require('../axios')
module.exports={
    // 赛事信息
    getAllGame(){ return req.post_Param('api/ass/game',{'judge':0}) },
    getOneGameById(id){ return req.post_Param('api/ass/game',{'judge':1,'game_id':id}) },
    getGameByCondition(condition){ return req.post_Param('api/ass/game',{'judge':2,'condition':condition}) },
    delOneGameById(id){ return req.post_Param('/api/ent/game',{'judge':2,'id':id}) },
    updateOneGameById(id,condition){ return req.post_Param('/api/ent/game',{'judge':3,'id':id, 'condition':condition}) },
    updateOneGameDayById(id,day){ return req.post_Param('/api/ent/game',{'judge':3,'id':id, 'day_id':day}) },
    getAllThing(){ return req.post_Param('api/ent/module',{'judge':0}) },
    updateGameJudgeWhetherById(id,j){ return req.post_Param('/api/ent/game',{'judge':3,'id':id, 'judgewhether':j}) },
    // 参赛者信息
    getAllUserByType(type){ return req.post_Param('/api/ass/user',{'judge':2,'type':type}) },
    getOneUserById(id){ return req.post_Param('/api/ass/user',{'judge':3,'user_id':id}) },
    delOneUserById(id){ return req.post_Param('/api/ent/user',{'judge':3,'id':id}) },
    // 团队信息
    getAllTeam(){ return req.post_Param('/api/ass/team',{'judge':2}) },
    getAllTeamByGameId(game_id){ return req.post_Param('/api/ass/team',{'judge':4,'game_id':game_id}) },
    getOneTeamById(id){ return req.post_Param('/api/ass/team',{'judge':3,'team_id':id}) },
    delOneTeamById(id){ return req.post_Param('/api/ent/team',{'judge':2,'id':id}) },
    updateOneTeamCondition(id,c){ return req.post_Param('/api/ent/team',{'judge':3,'id':id ,'condition':c }) },
    updateOneTeamLose(id,l){ return req.post_Param('/api/ent/team',{'judge':3,'id':id ,'lose':l }) },
    // 交易信息
    getAllTransaction(){ return req.post_Param('api/ass/transaction',{'judge':0}) },
    getAllTransationByTeamId(id){ return req.post_Param('api/ass/transaction',{'judge':4, 'team_id':id}) },
    addOneTran(g,t,m,o,p,n,mo,c,d){ return req.post_Param('api/ent/transaction', {'judge':1, 'game_id':g, 'type':t, 'me':m, 'other':o, 'price':p, 'number':n, 'module_id':mo, 'condition':c, 'detail':d}) },
    // 团队资产信息    
    getAllStatisticByGameId(id){ return req.post_Param('api/ass/statistic',{'judge':2, 'game_id':id}) },
    creatOneStatistic(gameid,teamid,money,load){ return req.post_Param('api/ent/statistic',{'judge':1, 'game_id':gameid, 'team_id':teamid, 'money':money,'load':load, 'food':0,'water':0 ,'compass':0,'tent':0,'secret':0,'gold':0})} ,
    deleteAllByStatisticGameId(gameid){ return req.post_Param('api/ent/statistic',{'judge':4, 'game_id':gameid}) },
    getOneStastisticById(id){ return req.post_Param('api/ent/statistic',{'judge':5, 'id':id}) },
    updateMoney(id, money){ return req.post_Param('api/ent/statistic',{'judge':3, 'id':id , 'money':money }) },
    updateLoad(id, load){ return req.post_Param('api/ent/statistic',{'judge':3, 'id':id , 'load':load }) },
    findTeamStock(statistic_id){ return req.post_Param('api/ass/statistic_module',{'judge':4, 'statistic_id':statistic_id}) },

    findOrCreate(statistic_id,module_id,number,use){ return req.post_Param('api/ass/statistic_module',{'judge':1, 'statistic_id':statistic_id, 'module_id':module_id, 'number':number, 'use':use}) },
    update_number(id,statistic_id,module_id,number,use){ return req.post_Param('api/ass/statistic_module',{'judge':2,'id':id, 'statistic_id':statistic_id, 'module_id':module_id, 'number':number, 'use':use}) },
    updateFoodWaternumber(id,number){ return req.post_Param('api/ass/statistic_module',{'judge':2,'id':id, 'number':number }) },

}