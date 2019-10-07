<template>
<div class="container">
    <div class="row">
        <div class="col-sm-12">
            <h4 class="pull-left page-title">赛事运营</h4>
        </div>
    </div>

    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">沙漠掘金后台管理系统-日程管理</h3>
                </div>
                <!-- 日程管理 -->
                <div class="panel-body">
                    <div class="row">
                        <div class="col-md-12 col-sm-12 col-xs-12">
                            <div class="table-responsive">
                                <div class="panel-heading">
                                    <h3 class="panel-title">当前日程</h3>
                                </div>
                                <table class="table table-bordered table-striped" id="datatable-editable">
                                    <thead>
                                        <tr>
                                            <th>当前赛事</th>
                                            <th>日程持续时间(分钟)</th>
                                            <th>当前日程</th>
                                            <th>开启天气显示</th>
                                            <th>执行操作</th>
                                        </tr>
                                    </thead>
                                    <tbody v-if="showGameItems">
                                        <tr>
                                            <td>{{showGameItems.name}}</td>
                                            <td>{{showGameItems.stay}}</td>
                                            <td style="color:red" v-if="showGameItems.day">{{showGameItems.day.day}}</td>
                                            <td style="color:red">{{showGameItems.judgewhether | formatJudgeWhether}}</td>
                                            <td class="actions" align="center">
                                                <a class="on-default remove-row font-weight-bold" @click="nextYear(showGameItems)" href="javascript:void(0)">进入下一日程</a>
                                                <a class="on-default remove-row font-weight-bold" @click="openWhether(showGameItems)" href="javascript:void(0)">开启天气显示</a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 资金流清算 -->
                <div class="panel-body">
                    <div class="row">
                        <div class="col-md-12 col-sm-12 col-xs-12">
                            <div class="table-responsive">
                                <div class="panel-heading">
                                    <h3 class="panel-title">参赛团队资产清算
                                        <a class="waves-effect waves-light" data-toggle="tooltip" data-placement="top" title="刷新" style="color:red" @click="getTeamItems">
                                            刷新
                                        </a>
                                    </h3>
                                </div>
                                <table class="table table-bordered table-striped" id="datatable-editable">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>团队名称</th>
                                            <th>状态</th>
                                            <th>所处位置</th>
                                            <th>所处日期</th>
                                            <th>可用金币</th>
                                            <th>剩余载重</th>
                                            <th>更新时间</th>
                                            <th>执行操作</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="gradeX" v-for="(item,index) in showStasticsItems" :key="index" :class="{'important' : item.day.day ==showGameItems.day.day}">
                                            <td>{{index}}</td>
                                            <td>{{item.name}}</td>
                                            <td>{{item.condition | formatCondition}}</td>
                                            <td>P{{item.map_id}}</td>
                                            <td v-if="item.day">{{item.day.day}}</td>
                                            <td v-else></td>
                                            <td v-if="item.statistic">{{item.statistic.money}}</td>
                                            <td v-else></td>
                                            <td v-if="item.statistic">{{item.statistic.load}}</td>
                                            <td v-else></td>
                                            <td>{{item.updated_at|formatTime}}</td>
                                            <td class="actions" align="center">
                                                <a class="waves-effect waves-light" data-toggle="tooltip" data-placement="top" title="向团队增减物品" @click="tran(item)">
                                                    <i class="fa  fa-tags" data-toggle="modal" data-target="#toteam"></i>
                                                </a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- 指向团队转账 -->
    <div id="toteam" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h4 class="modal-title" id="myModalLabel">向团队增减物品</h4>
                </div>
                <div class="modal-body" align='center'>
                    <form class="form-horizontal" role="form">
                        <div class="form-group">
                            <label class="col-sm-2 control-label">物品:</label>
                            <div class="col-md-9">
                                <select class="form-control" v-model="thing">
                                    <option v-for="(item,index) in showThingItem" :key="index" :value="item.id">{{item.type | formatType}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">数量:</label>
                            <div class="col-sm-9">
                                <input type="number" class="form-control" v-model="number" placeholder="0">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">计重:</label>
                            <div class="col-md-9">
                                <select class="form-control" v-model="isWeight">
                                    <option value="0">计重</option>
                                    <option value="1">免重</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">备注:</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" v-model="detail" placeholder="请输入转账原因">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-8 control-label">注意：以上输入框——正值增加，负值减少</label>
                        </div>
                    </form>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default waves-effect" data-dismiss="modal">关闭</button>
                    <button type="button" class="btn btn-primary waves-effect waves-light" data-dismiss="modal" @click="updateStatistics()">确认发送</button>
                </div>
            </div>
        </div>
    </div>
    <button @click="test">测试</button>
</div>
</template>

<script>
import {
    now
} from 'moment';
const s_alert = require("../../utils/alert");
const ses = require("../../utils/ses");
const req = require("../../utils/axios");
const print = require("../../utils/print");
const apis = require("../../utils/api/apis");

const async = require('async')
const notify = require("bootstrap-notify");

export default {
    name: "syear",
    data() {
        return {
            gid: null,
            day_id: null,

            showGameItems: null,
            showStasticsItems: null,
            showThingItem: null,

            thing: null,
            number: 0,
            detail: null,
            isWeight: 0, // 0.计重 1.免重

            // 计算折旧
            diggerDeprelief: [],
            lineDeprelief: [],

        };
    },
    mounted() {
        this.init()
    },
    updated() {
        $(function () {
            $("[data-toggle='tooltip']").tooltip();
        });
    },
    filters: {
        formatTime(x) {
            return moment(x).format("YYYY-MM-DD HH:mm:ss");
        },
        formatType(x) {
            if (x == -1) return '金币';
            if (x == 0) return '食物';
            if (x == 1) return '水';
            if (x == 2) return '指南针';
            if (x == 3) return '帐篷';
            if (x == 4) return '智者密函';
            if (x == 5) return '金块';
        },
        formatJudgeWhether(x) {
            if (x == 0) return '关闭';
            if (x == 1) return '开启';
        },
        formatCondition(x) {
            // 小组状态（0.正常、-1.冻结、-2.迷路、-3.死亡、1.使用帐篷、2.使用指南针）
            if (x == 0) return '正常';
            if (x == -1) return '冻结';
            if (x == -2) return '迷路';
            if (x == -3) return '死亡';
            if (x == 1) return '使用帐篷中';
            if (x == 2) return '使用指南针中';
        }
    },
    methods: {
        init() {
            this.getCurrentGameInfo();
            this.getTeamItems();
            this.getThingItem();
        },
        // 封装 notify 方法
        toast(message, type) {
            $.notify({
                message
            }, {
                type,
                timer: 5000
            });
        },
        // 当前赛事信息
        getCurrentGameInfo() {
            apis.getOneGameById(JSON.parse(ses.getSessionStorage("gameinfo")).id)
                .then(res => {
                    print.log('当前赛事信息', res.data)
                    this.showGameItems = res.data
                    this.gid = this.showGameItems.id
                    this.day_id = this.showGameItems.day_id
                })
        },
        // 获取参赛团队资产信息
        getTeamItems() {
            apis.getAllTeamByGameId(JSON.parse(ses.getSessionStorage("gameinfo")).id)
                .then(res => {
                    print.log('获取参赛团队资产信息', res.data);
                    this.showStasticsItems = res.data.rows
                })
        },
        // 获取物品信息
        getThingItem() {
            apis.getAllThing()
                .then(res => {
                    print.log('获取物品信息', res.data.rows)
                    this.showThingItem = res.data.rows
                })
        },
        // 点击转账到此团队，中转信息
        tran(model) {
            print.log('当前选中转移资产团队资产信息', model)
            this.currentStastics = model
        },
        // 更改资产
        async updateStatistics() {
            print.log(this.thing, this.number, this.isWeight, this.detail)
            let team = this.currentStastics
            if (this.number == 0) {
                s_alert.basic('数量不能为零');
                return;
            }
            if (this.isWeight == 0) {
                // -1金币、4智者密函 无重量
                if (this.thing == -1 || this.thing == 4);
                // 重量记录
                // 1水 50，2指南针 10，3帐篷 60，5金块 50 ，6食物 10
                else {
                    let me = await apis.getOneTeamById(this.currentStastics.id);
                    let staid = me.data.statistic.id;
                    let load = me.data.statistic.load;
                    // 更新载重
                    let useload;
                    switch (+this.thing) {
                        case 1:
                            useload = this.number * 50;
                            break;
                        case 2:
                            useload = this.number * 10;
                            break;
                        case 3:
                            useload = this.number * 60;
                            break;
                        case 5:
                            useload = this.number * 50;
                            break;
                        case 6:
                            useload = this.number * 10;
                            break;
                    }
                    let nowload = load - useload;
                    console.log(load, useload, nowload);
                    if (nowload < 0) {
                        s_alert.basic('可用载重不足');
                        return;
                    }
                    await apis.updateLoad(staid, nowload);
                }
            }
            // findOrCreate
            // 物品为 帐篷⛺️ （use）
            if (this.thing == 3) {
                apis.findOrCreate(team.statistic_id, this.thing, this.number, this.number * 3)
                    .then(res => {
                        console.log(res.data)
                        if (res.data[1]) {
                            apis.addOneTran(this.gid, -1, team.id, team.id, 0, this.number, this.thing, 1, '组委会操作' + this.detail)
                            s_alert.Success('团队资产信息更新成功', '', 'success')
                            this.init()
                        } else {
                            // 更新数量
                            let id = res.data[0].id
                            let onumber = this.number
                            let number = Number(res.data[0].number) + Number(this.number)
                            let use = Number(res.data[0].use) + Number(this.number * 3)
                            apis.update_number(id, team.statistic_id, this.thing, number, use)
                                .then(res => {
                                    console.log(res.data)
                                    apis.addOneTran(this.gid, -1, team.id, team.id, 0, onumber, this.thing, 1, '组委会操作' + this.detail)
                                    s_alert.Success('团队资产信息更新成功', '', 'success')
                                    this.init()
                                })
                        }
                    })
            }
            // 物品为 金币
            else if (this.thing == -1) {
                apis.getOneStastisticById(team.statistic_id)
                    .then(res => {
                        console.log(res.data)
                        let onumber = this.number
                        let number = Number(res.data.money) + Number(this.number)
                        apis.updateMoney(team.statistic_id, number)
                            .then(res => {
                                console.log(res.data)
                                apis.addOneTran(this.gid, -1, team.id, team.id, onumber, 1, this.thing, 1, '组委会操作' + this.detail)
                                s_alert.Success('团队资产信息更新成功', '', 'success')
                                this.init()
                            })
                    })
            }
            // 其他物品
            else {
                apis.findOrCreate(team.statistic_id, this.thing, this.number, 0)
                    .then(res => {
                        console.log(res.data)
                        if (res.data[1]) {
                            apis.addOneTran(this.gid, -1, team.id, team.id, 0, this.number, this.thing, 1, '组委会操作' + this.detail)
                            s_alert.Success('团队资产信息更新成功', '', 'success')
                            this.init()
                        } else {
                            // 更新数量
                            let id = res.data[0].id
                            let onumber = this.number
                            let number = Number(res.data[0].number) + Number(this.number)
                            let use = 0
                            apis.update_number(id, team.statistic_id, this.thing, number, use)
                                .then(res => {
                                    console.log(res.data)
                                    apis.addOneTran(this.gid, -1, team.id, team.id, 0, onumber, this.thing, 1, '组委会操作' + this.detail)
                                    s_alert.Success('团队资产信息更新成功', '', 'success')
                                    this.init()
                                })
                        }
                    })
            }
        },
        // 点击进入下一日程
        nextYear(item) {
            print.log('当前比赛信息', item)
            if (confirm("你确定要进入下一日程？这将对参赛者资产进行清算！")) {
                this.updateDay(item);
            }
        },
        // 开启天气显示
        async openWhether(item) {
            print.log('当前比赛信息', item)
            if (item.day.day == 1) {
                s_alert.Warning('比赛未开始，开启失败', '从下一天开始开启')
                return;
            }
            if (item.judgewhether == 1) {
                s_alert.Warning('当前日期天气显示已经开启', '请不要重复开启')
                return;
            }
            if (confirm("你确定要开启天气显示？")) {
                let game = item; // 当前赛事信息
                let team = this.showStasticsItems //  所有团队信息
                // 判断所有团队信息
                let judge = true
                let nteam = []
                for (let i = 0; i < team.length; i++) {
                    const e = team[i].day.day;
                    const curTeam = team[i];
                    // 过滤已经死亡的
                    if (e != game.day.day && curTeam.condition != -3) {
                        judge = false;
                        nteam.push(team[i].name)
                    }
                }
                if (!judge) {
                    s_alert.Success('还有团队未行走', `未操作的团队清单为：${nteam}`, 'warning')
                } else {
                    apis.updateGameJudgeWhetherById(item.id, 1)
                        .then(res => {
                            if (res.data[0] == 1) {
                                s_alert.Success('天气显示更新成功', '', 'success')
                                this.init()
                            }
                        })
                }
            }
        },
        // 更新日程信息
        async updateDay(item) {
            let game = item; // 当前赛事信息
            let team; //  所有团队信息
            let filterTeams = []; // 过滤已经死亡的队伍
            let res = await apis.getAllTeamByGameId(JSON.parse(ses.getSessionStorage("gameinfo")).id)
            team = res.data.rows
            //  判断能否进入下一天（默认时间为1 ，时间最大26，所有人必须位于当前日期）
            if (game.day.day < 26) {
                if (item.judgewhether == 0) {
                    s_alert.Warning('请先开启天气显示 ', '未开启天气显示，参赛人员无法操作');
                    return;
                } else {
                    // 判断所有团队信息
                    for (let i = 0; i < team.length; i++) {
                        const e = team[i].day.day;
                        const curTeam = team[i];
                        // 获取过滤的 存活队伍
                        console.log(curTeam)
                        if (curTeam.condition != -3) filterTeams.push(curTeam);
                    }
                    // 执行资产清算
                    console.log(filterTeams);
                    this.updateRelief(game, filterTeams);
                }
            } else {
                s_alert.Success('最后一天啦', '第25天为最后一天，再无后续日期可以进入！', 'warning')
            }

        },
        // ---------------------------------------------------资产清算---------------------------------------------------
        //   if (x == -1) return '大本营';
        //   if (x == 0) return '晴天';
        //   if (x == 1) return '高温';
        //   if (x == 2) return '沙尘暴';
        //   if (x == 3) return '高温沙尘暴';
        async updateRelief(game, team) {
            s_alert.Warning('正在计算资产信息，请稍等……', '队伍资产更新成功会在右上角显示')
            let judge = 0
            for (let i = 0; i < team.length; i++) {
                let cteam = team[i];
                print.log('执行团队资产信息更新--->', cteam)
                console.group('****<--->****')
                // 找到 地形 & 天气 & 状态
                let land = cteam.map.land
                let cwhether = 0
                // 小组状态（0.正常、-1.冻结、-2.迷路、-3.死亡、1.使用帐篷、2.使用指南针、3.使用智者密函）
                let condition = cteam.condition
                // 地形（0.大本营、1.沙漠、2.绿洲、3.村庄、4.王陵、5.藏宝山）
                // 大本营天气随村庄
                if (land == 0) cwhether = cteam.day.whether_village
                if (land == 1) cwhether = cteam.day.whether_desert
                if (land == 2) cwhether = cteam.day.whether_oasis
                if (land == 3) cwhether = cteam.day.whether_village
                if (land == 4) cwhether = cteam.day.whether_tomb
                if (land == 5) cwhether = cteam.day.whether_gold
                print.log(land, condition, cwhether)
                // 获取背包信息
                let res = await apis.findTeamStock(cteam.statistic_id);
                console.log('获取背包信息->', res.data)
                // 循环计算扣除信息
                let food, water;
                // 状态一 *********************************************************（晴天）
                if (cwhether == 0) {
                    let load = Number(res.data.load) + Number(60) // (1食物 1水 10+50)
                    // 计算消耗
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
                    console.log('计算消耗的剩余食物和水', food, water)
                    await apis.updateLoad(res.data.id, load);
                    this.judgeTeamCondition(food, water, cteam)
                    judge++
                    console.log(judge)
                }
                // 状态二 *********************************************************（高温）
                else if (cwhether == 1) {
                    let load = Number(res.data.load) + Number(160) // (1食物 3水 10+3*50)
                    for (let i = 0; i < res.data.modules.length; i++) {
                        const e = res.data.modules[i];
                        if (e.type == 0) {
                            food = e.statistic_module.number - 1 // 高温消耗 1个食物
                            await apis.updateFoodWaternumber(e.statistic_module.id, food)
                            await apis.addOneTran(this.gid, -1, cteam.id, cteam.id, 0, 1, e.id, 1, '组委会：天气扣除-食物')
                        }
                        if (e.type == 1) {
                            water = e.statistic_module.number - 3 // 高温消耗 3个水
                            await apis.updateFoodWaternumber(e.statistic_module.id, water)
                            await apis.addOneTran(this.gid, -1, cteam.id, cteam.id, 0, 3, e.id, 1, '组委会：天气扣除-水')
                        }
                    }
                    console.log('计算消耗的剩余食物和水', food, water)
                    await apis.updateLoad(res.data.id, load)
                    this.judgeTeamCondition(food, water, cteam)
                    judge++
                    console.log(judge)
                }
                // 状态三 *********************************************************（沙尘暴）
                else if (cwhether == 2) {
                    // 使用帐篷⛺️
                    if (condition == 1) {
                        let load = Number(res.data.load) + Number(60) // (1食物 1水 10+50)
                        for (let i = 0; i < res.data.modules.length; i++) {
                            const e = res.data.modules[i];
                            if (e.type == 0) {
                                food = e.statistic_module.number - 1 // 沙尘暴⛺️消耗 1个食物
                                await apis.updateFoodWaternumber(e.statistic_module.id, food)
                                await apis.addOneTran(this.gid, -1, cteam.id, cteam.id, 0, 1, e.id, 1, '组委会：天气扣除-食物')
                            }
                            if (e.type == 1) {
                                water = e.statistic_module.number - 1 // 沙尘暴⛺️消耗 1个水
                                await apis.updateFoodWaternumber(e.statistic_module.id, water)
                                await apis.addOneTran(this.gid, -1, cteam.id, cteam.id, 0, 1, e.id, 1, '组委会：天气扣除-水')
                            }
                        }
                        console.log('计算消耗的剩余食物和水', food, water)
                        await apis.updateLoad(res.data.id, load)
                        this.judgeTeamCondition(food, water, cteam)
                        judge++
                        console.log(judge)
                    }
                    // 使用指南针
                    else if (condition == 2) {
                        let load = Number(res.data.load) + Number(150) // (5食物 2水 5*10+2*50)
                        for (let i = 0; i < res.data.modules.length; i++) {
                            const e = res.data.modules[i];
                            if (e.type == 0) {
                                food = e.statistic_module.number - 5 // 沙尘暴无⛺️ 消耗 5个食物
                                await apis.updateFoodWaternumber(e.statistic_module.id, food)
                                await apis.addOneTran(this.gid, -1, cteam.id, cteam.id, 0, 5, e.id, 1, '组委会：天气扣除-食物')
                            }
                            if (e.type == 1) {
                                water = e.statistic_module.number - 2 // 沙尘暴无⛺️ 消耗 2个水
                                await apis.updateFoodWaternumber(e.statistic_module.id, water)
                                await apis.addOneTran(this.gid, -1, cteam.id, cteam.id, 0, 2, e.id, 1, '组委会：天气扣除-水')
                            }
                        }
                        console.log('计算消耗的剩余食物和水', food, water)
                        await apis.updateLoad(res.data.id, load)
                        this.judgeTeamCondition(food, water, cteam)
                        judge++
                        console.log(judge)
                    }
                    // 既不使用 帐篷 也不使用 指南针
                    else {
                        let load = Number(res.data.load) + Number(150) // (5食物 2水 5*10+2*50)
                        for (let i = 0; i < res.data.modules.length; i++) {
                            const e = res.data.modules[i];
                            if (e.type == 0) {
                                food = e.statistic_module.number - 5 // 沙尘暴无⛺️ 消耗 5个食物
                                await apis.updateFoodWaternumber(e.statistic_module.id, food)
                                await apis.addOneTran(this.gid, -1, cteam.id, cteam.id, 0, 5, e.id, 1, '组委会：天气扣除-食物')
                            }
                            if (e.type == 1) {
                                water = e.statistic_module.number - 2 // 沙尘暴无⛺️ 消耗 2个水
                                apis.updateFoodWaternumber(e.statistic_module.id, water)
                                apis.addOneTran(this.gid, -1, cteam.id, cteam.id, 0, 2, e.id, 1, '组委会：天气扣除-水')
                            }
                        }
                        console.log('计算消耗的剩余食物和水', food, water)
                        await apis.updateLoad(res.data.id, load)
                        // 更新迷路时间
                        await apis.updateOneTeamLose(cteam.id, 3)
                        // 更新团队状态
                        if (food < 0 || water < 0) {
                            await apis.updateOneTeamCondition(cteam.id, -3) // 死亡
                            console.error('死亡', cteam)
                            this.toast(`${cteam.name}_死亡`, 'warning');
                        } else {
                            await apis.updateOneTeamCondition(cteam.id, -2) // 迷路
                            this.toast(`${cteam.name}_迷路`, 'warning');
                        }
                        judge++
                        console.log(judge)
                    }
                }
                // 状态四 *********************************************************（高温沙尘暴）
                else if (cwhether == 3) {
                    // 判断是否使用帐篷⛺️
                    if (condition == 1) {
                        let load = Number(res.data.load) + Number(160) // (1食物 3水 10+3*50)
                        for (let i = 0; i < res.data.modules.length; i++) {
                            const e = res.data.modules[i];
                            if (e.type == 0) {
                                food = e.statistic_module.number - 1 // 沙尘暴⛺️ 消耗 1个食物
                                await apis.updateFoodWaternumber(e.statistic_module.id, food)
                                await apis.addOneTran(this.gid, -1, cteam.id, cteam.id, 0, 1, e.id, 1, '组委会：天气扣除-食物')
                            }
                            if (e.type == 1) {
                                water = e.statistic_module.number - 3 // 沙尘暴⛺️ 消耗 3个水
                                await apis.updateFoodWaternumber(e.statistic_module.id, water)
                                await apis.addOneTran(this.gid, -1, cteam.id, cteam.id, 0, 3, e.id, 1, '组委会：天气扣除-水')
                            }
                        }
                        console.log('计算消耗的剩余食物和水', food, water)
                        await apis.updateLoad(res.data.id, load)
                        this.judgeTeamCondition(food, water, cteam)
                        judge++
                        console.log(judge)
                    } else if (condition == 2) {
                        let load = Number(res.data.load) + Number(250) //  (5食物 4水 5*10+4*50)
                        for (let i = 0; i < res.data.modules.length; i++) {
                            const e = res.data.modules[i];
                            if (e.type == 0) {
                                food = e.statistic_module.number - 5 // 沙尘暴⛺️ 消耗 5个食物
                                await apis.updateFoodWaternumber(e.statistic_module.id, food)
                                await apis.addOneTran(this.gid, -1, cteam.id, cteam.id, 0, 5, e.id, 1, '组委会：天气扣除-食物')
                            }
                            if (e.type == 1) {
                                water = e.statistic_module.number - 4 // 沙尘暴⛺️ 消耗 4个水
                                await apis.updateFoodWaternumber(e.statistic_module.id, water)
                                await apis.addOneTran(this.gid, -1, cteam.id, cteam.id, 0, 4, e.id, 1, '组委会：天气扣除-水')
                            }
                        }
                        console.log('计算消耗的剩余食物和水', food, water)
                        await apis.updateLoad(res.data.id, load)
                        this.judgeTeamCondition(food, water, cteam)
                        judge++
                        console.log(judge)
                    } else {
                        let load = Number(res.data.load) + Number(250) // (5食物 4水 5*10+4*50)
                        for (let i = 0; i < res.data.modules.length; i++) {
                            const e = res.data.modules[i];
                            if (e.type == 0) {
                                food = e.statistic_module.number - 5 // 沙尘暴无⛺️ 消耗 5个食物
                                await apis.updateFoodWaternumber(e.statistic_module.id, food)
                                await apis.addOneTran(this.gid, -1, cteam.id, cteam.id, 0, 5, e.id, 1, '组委会：天气扣除-食物')
                            }
                            if (e.type == 1) {
                                water = e.statistic_module.number - 4 // 沙尘暴无⛺️ 消耗 4个水
                                await apis.updateFoodWaternumber(e.statistic_module.id, water)
                                await apis.addOneTran(this.gid, -1, cteam.id, cteam.id, 0, 4, e.id, 1, '组委会：天气扣除-水')
                            }
                        }
                        console.log('计算消耗的剩余食物和水', food, water)
                        await apis.updateLoad(res.data.id, load)
                        // 更新迷路时间
                        await apis.updateOneTeamLose(cteam.id, 3)
                        // 更新团队状态
                        if (food < 0 || water < 0) {
                            await apis.updateOneTeamCondition(cteam.id, -3) // 死亡
                            console.error('死亡', cteam)
                            this.toast(`${cteam.name}_死亡`, 'warning');
                        } else {
                            await apis.updateOneTeamCondition(cteam.id, -2) // 迷路
                            this.toast(`${cteam.name}_迷路`, 'warning');
                        }
                        judge++
                        console.log(judge)
                    }
                }

                console.groupEnd();
                if (judge == team.length) {
                    // 更新day_id
                    // await apis.updateOneGameDayById(this.gid, this.day_id + 1);
                    // let res = await apis.updateGameJudgeWhetherById(this.gid, 0);
                    // if (res.data[0] == 1) {
                    //     s_alert.Success('成功进入下一天', '参赛队伍资产更新成功', 'success')
                    //     this.init()
                    // }
                    s_alert.Success('成功进入下一天', '参赛队伍资产更新成功', 'success')
                }
            };
        },
        // 判断队伍状态（迷路与否 适用 - 晴天、高温、沙尘暴使用⛺️、高温沙尘暴使用⛺️）
        async judgeTeamCondition(food, water, cteam) {
            // 如果迷路
            if (cteam.lose >= 1) {
                let lose = cteam.lose - 1;
                // 更新迷路时间 -1
                await apis.updateOneTeamLose(cteam.id, lose);
                // 更新团队状态
                if (food < 0 || water < 0) {
                    await apis.updateOneTeamCondition(cteam.id, -3) // 死亡
                    console.error('死亡', cteam)
                    this.toast(`${cteam.name}_死亡`, 'warning');
                } else {
                    if (lose == 0) apis.updateOneTeamCondition(cteam.id, 0) // 正常
                    else apis.updateOneTeamCondition(cteam.id, -2) // 任然迷路
                    this.toast(`${cteam.name}_资产信息更新成功`, 'success');
                }
            } else {
                // 更新团队状态
                if (food <= 0 || water <= 0) {
                    apis.updateOneTeamCondition(cteam.id, -3) // 死亡
                    console.error('死亡', cteam)
                    this.toast(`${cteam.name}_死亡`, 'warning');
                } else {
                    apis.updateOneTeamCondition(cteam.id, 0) // 正常
                    this.toast(`${cteam.name}_资产信息更新成功`, 'success');
                }
            }
        },
        test() {
            this.toast('lala', 'success')
        }
    }
};
</script>

<style>
.important {
    color: green;
    font-weight: bolder
}
</style>
