const apis = require('../../utils/api/apis')

let la = () => {
    console.log('lala')
}
let sun = async (cteam ,food ,water, res) => {
    for (let i = 0; i < res.data.modules.length; i++) {
        const e = res.data.modules[i];
        if (e.type == 0) {
            food = e.statistic_module.number - 1 // 晴天消耗 1食物
            await apis.updateFoodWaternumber(e.statistic_module.id, food)
            await apis.addOneTran(this.gid, -1, cteam.id, cteam.id, 0, 1, e.id, 1, '组委会：天气扣除-食物')
        }
        if (e.type == 1) {
            water = e.statistic_module.number - 1 // 晴天消耗 1水
            await apis.updateFoodWaternumber(e.statistic_module.id, water)
            await apis.addOneTran(this.gid, -1, cteam.id, cteam.id, 0, 1, e.id, 1, '组委会：天气扣除-水')
        }
    }
}
export default  { la, sun }
