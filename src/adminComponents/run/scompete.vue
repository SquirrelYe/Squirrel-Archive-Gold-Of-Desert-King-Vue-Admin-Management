<template>
  <div class="container">
    <!-- Page-Title -->
    <div class="row">
      <div class="col-sm-12">
        <h4 class="pull-left page-title">竞拍管理</h4>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-12">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">Sway商战大赛-竞拍资产</h3>
          </div>

          <div class="panel-body">
            <div class="col-lg-12">
              <ul class="nav nav-tabs navtab-bg">
                <li class="active" @click="showMining()">
                  <a href="#home" data-toggle="tab" aria-expanded="true">
                    <span class="visible-xs">
                      <i class="fa fa-home"></i>
                    </span>
                    <span class="hidden-xs">矿区</span>
                  </a>
                </li>
                <li class @click="showIndus()">
                  <a href="#profile" data-toggle="tab" aria-expanded="false">
                    <span class="visible-xs">
                      <i class="fa fa-user"></i>
                    </span>
                    <span class="hidden-xs">工业用地</span>
                  </a>
                </li>
                <li class @click="showCommer()">
                  <a href="#messages" data-toggle="tab" aria-expanded="false">
                    <span class="visible-xs">
                      <i class="fa fa-envelope-o"></i>
                    </span>
                    <span class="hidden-xs">商业用地</span>
                  </a>
                </li>
              </ul>
              <div class="tab-content">
                <!-- 矿区展示处 -->
                <div class="tab-pane active" id="home">
                <div class="row">
                    <div class="col-sm-6">
                        <div class="m-b-30">
                            <button id="addToTable" class="btn btn-primary waves-effect waves-light" data-toggle="modal" data-target="#myModal">发布矿区竞拍<i class="fa fa-plus"></i></button>
                        </div>
                    </div>
                </div>
                  <div class="row">                      
                    <div class="col-md-12 col-sm-12 col-xs-12">
                      <table class="table table-striped table-hover" style id="datatable-editable">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>唯一标识符</th>
                            <th>矿区星级</th>
                            <th>属性</th>
                            <th>元素储量</th>
                            <th>折旧减免</th>
                            <th>回购价值</th>
                            <th>起拍价</th>
                            <th>状态</th>
                            <th>成交价</th>
                            <th>成交公司</th>
                            <th>出现财年</th>
                            <th>操作</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item,index) in showItems" :key="index">
                            <td>{{index}}</td>
                            <td>M{{item.id}}</td>
                            <td>{{item.star|formatStar}}</td>
                            <td>{{item.source_id|formatSource}}</td>
                            <td>{{item.totalreserve}}</td>
                            <td>{{item.deprelief}}</td>
                            <td>{{item.repurchase}}</td>
                            <td>{{item.startprice}}</td>
                            <td>{{item.condition|formatCondition}}</td>
                            <td>{{item.price}}</td>
                            <td v-if="item.company">{{item.company.name}}</td>
                            <td v-else></td>
                            <td>{{item.Yearid}}</td>
                            <td class="actions">
                              <a class="waves-effect waves-light" @click="start(item,1)" data-toggle="tooltip" data-placement="top" title="开始竞拍">
                                <i class="fa  fa-play"></i>
                              </a>
                              <a class="waves-effect waves-light" @click="stop(item,1)" data-toggle="tooltip" data-placement="top" title="结束竞拍">
                                <i class="fa  fa-stop"></i>
                              </a>
                              <a class="waves-effect waves-light" @click="opensetting(item,1,1)" data-toggle="tooltip" data-placement="top" title="定向公司发送">
                                <i class="fa  fa-tags"  data-toggle="modal" data-target="#company" ></i>
                              </a>
                              <a class="waves-effect waves-light" @click="opensetting(item,1,2)" data-toggle="tooltip" data-placement="top" title="竞价排名">
                                <i class="fa  fa-sort-amount-desc" data-toggle="modal" data-target="#desc"></i>
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="row">
                    <div class="col-sm-6">
                      <div class="dataTables_info float-left" id="datatable-editable_info" role="status" aria-live="polite" >展示 {{PageShowSum}} 总共 {{items.length}} 项</div>
                    </div>
                    <div class="col-sm-6">
                      <div class="dataTables_paginate paging_simple_numbers" id="datatable-editable_paginate" >
                        <ul class="pagination" style="float:right">
                          <li class="paginate_button previous" :class="{ disabled: currentPage=='0' }">
                            <a href="javascript:void(0)" @click="previousPage()">上一页</a>
                          </li>
                          <li class="paginate_button" v-for="(item,index) in sumPage" :key="index" :class="{ active: currentPage==index }" >
                            <a href="javascript:void(0)" @click="switchPage(index)">{{++index}}</a>
                          </li>
                          <li class="paginate_button next" :class="{ disabled: currentPage==sumPage-1 }">
                            <a href="javascript:void(0)" @click="nextPage()">下一页</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  </div>
                  <hr>
                  <p><strong>注意：拍卖过程分为明拍与暗拍两种，暗拍点击竞价排名选择最高者发送，明拍根据线下竞拍场景点击定向公司发送，输入竞拍价后发送。以上价钱单位均为万元</strong>。</p>
                </div>
                <!-- 工业用地展示处 -->
                <div class="tab-pane" id="profile">
                <div class="row">
                    <div class="col-sm-6">
                        <div class="m-b-30" data-toggle="modal" data-target="#myindus">
                            <button id="addToTable" class="btn btn-primary waves-effect waves-light">发布工业用地竞拍<i class="fa fa-plus"></i></button>
                        </div>
                    </div>
                </div>
                  <div class="row">
                    <div class="col-md-12 col-sm-12 col-xs-12">
                      <table class="table table-striped table-hover" style id="datatable-editable">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>唯一标识符</th>
                            <th>型号</th>
                            <th>土地面积</th>
                            <th>生产效率提升</th>
                            <th>产线价值折旧减免</th>
                            <th>改良花费</th>
                            <th>起拍价</th>
                            <th>状态</th>
                            <th>成交价</th>
                            <th>成交公司</th>
                            <th>出现财年</th>
                            <th>操作</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item,index) in showItems" :key="index">
                            <td>{{index}}</td>
                            <td>I{{item.id}}</td>
                            <td>{{item.model|formatmodel}}</td>
                            <td>{{item.measure}}</td>
                            <td>{{item.efficient}}</td>
                            <td>{{item.repurchase}}</td>
                            <td>{{item.improve}}</td>
                            <td>{{item.startprice}}</td>
                            <td>{{item.condition|formatCondition}}</td>
                            <td>{{item.price}}</td>
                            <td v-if="item.company">{{item.company.name}}</td>
                            <td v-else></td>
                            <td>{{item.Yearid}}</td>
                            <td class="actions">
                              <a class="waves-effect waves-light" @click="start(item,2)" data-toggle="tooltip" data-placement="top" title="开始竞拍">
                                <i class="fa  fa-play"></i>
                              </a>
                              <a class="waves-effect waves-light" @click="stop(item,2)" data-toggle="tooltip" data-placement="top" title="结束竞拍">
                                <i class="fa  fa-stop"></i>
                              </a>
                              <a class="waves-effect waves-light" @click="opensetting(item,2,1)" data-toggle="tooltip" data-placement="top" title="定向公司发送">
                                <i class="fa  fa-tags"  data-toggle="modal" data-target="#company" ></i>
                              </a>
                              <a class="waves-effect waves-light" @click="opensetting(item,2,2)" data-toggle="tooltip" data-placement="top" title="竞价排名">
                                <i class="fa  fa-sort-amount-desc" data-toggle="modal" data-target="#desc"></i>
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="row">
                    <div class="col-sm-6">
                      <div class="dataTables_info float-left" id="datatable-editable_info" role="status" aria-live="polite" >展示 {{PageShowSum}} 总共 {{items.length}} 项</div>
                    </div>
                    <div class="col-sm-6">
                      <div class="dataTables_paginate paging_simple_numbers" id="datatable-editable_paginate" >
                        <ul class="pagination" style="float:right">
                          <li class="paginate_button previous" :class="{ disabled: currentPage=='0' }">
                            <a href="javascript:void(0)" @click="previousPage()">上一页</a>
                          </li>
                          <li class="paginate_button" v-for="(item,index) in sumPage" :key="index" :class="{ active: currentPage==index }" >
                            <a href="javascript:void(0)" @click="switchPage(index)">{{++index}}</a>
                          </li>
                          <li class="paginate_button next" :class="{ disabled: currentPage==sumPage-1 }">
                            <a href="javascript:void(0)" @click="nextPage()">下一页</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  </div>
                  <hr>
                  <p><strong>注意：拍卖过程分为明拍与暗拍两种，暗拍点击竞价排名选择最高者发送，明拍根据线下竞拍场景点击定向公司发送，输入竞拍价后发送。以上价钱单位均为万元</strong>。</p>
                </div>
                <!-- 商业用地展示处 -->
                <div class="tab-pane" id="messages">
                <div class="row">
                    <div class="col-sm-6">
                        <div class="m-b-30" data-toggle="modal" data-target="#commerland">
                            <button id="addToTable" class="btn btn-primary waves-effect waves-light">发布商业用地竞拍<i class="fa fa-plus"></i></button>
                        </div>
                    </div>
                </div>
                  <div class="row">
                    <div class="col-md-12 col-sm-12 col-xs-12">
                      <table class="table table-striped table-hover" style id="datatable-editable">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>唯一标识符</th>
                            <th>等级</th>
                            <th>品牌提升</th>
                            <th>增值空间</th>
                            <th>起拍价</th>
                            <th>状态</th>
                            <th>成交价</th>
                            <th>成交公司</th>
                            <th>出现财年</th>
                            <th>操作</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item,index) in showItems" :key="index">
                            <td>{{index}}</td>
                            <td>C{{item.id}}</td>
                            <td>{{item.level|formatlevel}}</td>
                            <td>{{item.brand}}</td>
                            <td>{{item.increment}}</td>
                            <td>{{item.startprice}}</td>
                            <td>{{item.condition|formatCondition}}</td>
                            <td>{{item.price}}</td>
                            <td v-if="item.company">{{item.company.name}}</td>
                            <td v-else></td>
                            <td>{{item.Yearid}}</td>
                            <td class="actions">
                              <a class="waves-effect waves-light" @click="start(item,3)" data-toggle="tooltip" data-placement="top" title="开始竞拍">
                                <i class="fa  fa-play"></i>
                              </a>
                              <a class="waves-effect waves-light" @click="stop(item,3)" data-toggle="tooltip" data-placement="top" title="结束竞拍">
                                <i class="fa  fa-stop"></i>
                              </a>
                              <a class="waves-effect waves-light" @click="opensetting(item,3,1)" data-toggle="tooltip" data-placement="top" title="定向公司发送">
                                <i class="fa  fa-tags"  data-toggle="modal" data-target="#company" ></i>
                              </a>
                              <a class="waves-effect waves-light" @click="opensetting(item,3,2)" data-toggle="tooltip" data-placement="top" title="竞价排名">
                                <i class="fa  fa-sort-amount-desc" data-toggle="modal" data-target="#desc"></i>
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="row">
                    <div class="col-sm-6">
                      <div class="dataTables_info float-left" id="datatable-editable_info" role="status" aria-live="polite" >展示 {{PageShowSum}} 总共 {{items.length}} 项</div>
                    </div>
                    <div class="col-sm-6">
                      <div class="dataTables_paginate paging_simple_numbers" id="datatable-editable_paginate" >
                        <ul class="pagination" style="float:right">
                          <li class="paginate_button previous" :class="{ disabled: currentPage=='0' }">
                            <a href="javascript:void(0)" @click="previousPage()">上一页</a>
                          </li>
                          <li class="paginate_button" v-for="(item,index) in sumPage" :key="index" :class="{ active: currentPage==index }" >
                            <a href="javascript:void(0)" @click="switchPage(index)">{{++index}}</a>
                          </li>
                          <li class="paginate_button next" :class="{ disabled: currentPage==sumPage-1 }">
                            <a href="javascript:void(0)" @click="nextPage()">下一页</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  </div>
                  <hr>
                  <p><strong>注意：拍卖过程分为明拍与暗拍两种，暗拍点击竞价排名选择最高者发送，明拍根据线下竞拍场景点击定向公司发送，输入竞拍价后发送。以上价钱单位均为万元</strong>。</p>
                </div>
              </div>
            </div>            
          </div>
        </div>
      </div>
    </div>

    <!-- mining -->
    <div id="myModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h4 class="modal-title" id="myModalLabel">发布竞拍</h4>
            </div>
            <!-- 内容 -->
            <div class="modal-body" align='center'>
              <div class="row">
                <div class="col-sm-12">
                    <div class="panel panel-default">
                        <div class="panel-heading"><h4>发布新的矿区</h4></div>
                        <div class="panel-body">
                            <form class="form-horizontal" role="form">                                    
                                <div class="form-group">
                                    <label class="col-md-2 control-label">矿区星级</label>
                                    <div class="col-md-10">
                                        <select class="form-control" v-model="mstar" @change="getstar()">
                                            <option v-for="(item,index) in star" :key="index" :value="item">{{item | formatStar}}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-2 control-label" for="example-email">原料属性</label>
                                    <div class="col-md-10">
                                        <select class="form-control" v-model="msource_id">
                                            <option v-for="(item,index) in source" :key="index" :value="item">{{item | formatSource}}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-2 control-label">原料储量</label>
                                    <div class="col-md-10">
                                        <input type="number" disabled class="form-control" :value="mreserve">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-2 control-label">折旧减免</label>
                                    <div class="col-md-10">
                                        <input type="number" disabled class="form-control" :value="mdeprelief">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-2 control-label">回购价值</label>
                                    <div class="col-md-10">
                                        <input type="number" disabled class="form-control" :value="mrepurchase">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-2 control-label">起拍价</label>
                                    <div class="col-md-10">
                                        <input type="number" class="form-control" v-model="mstartprice">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-2 control-label">出现财年</label>
                                    <div class="col-md-10">
                                        <input type="number" class="form-control" v-model="myear">
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>         
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-default waves-effect" data-dismiss="modal">关闭</button>
            <button type="button" class="btn btn-primary waves-effect waves-light" data-dismiss="modal" @click="sendCompete(1)">发布竞拍</button>
            </div>
        </div>
      </div>
    </div>

    <!-- myindus -->
    <div id="myindus" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h4 class="modal-title" id="myModalLabel">发布竞拍</h4>
            </div>
            <!-- 内容 -->
            <div class="modal-body" align='center'>
              <div class="row">
                <div class="col-sm-12">
                    <div class="panel panel-default">
                        <div class="panel-heading"><h4>发布新的工业用地</h4></div>
                        <div class="panel-body">
                            <form class="form-horizontal" role="form">                                    
                                <div class="form-group">
                                    <label class="col-md-2 control-label">型号</label>
                                    <div class="col-md-10">
                                        <select class="form-control" v-model="imodel" @change="getModel()">
                                            <option v-for="(item,index) in model" :key="index" :value="item">{{item | formatmodel}}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-2 control-label" for="example-email">土地面积</label>
                                    <div class="col-md-10">
                                      <input type="number" disabled class="form-control" v-model="imeasure">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-2 control-label">效率提升</label>
                                    <div class="col-md-10">
                                        <input type="number" disabled class="form-control" v-model="iefficient">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-2 control-label">折旧减免</label>
                                    <div class="col-md-10">
                                        <input type="number" disabled class="form-control" v-model="irepurchase">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-2 control-label">改良花费</label>
                                    <div class="col-md-10">
                                        <input type="number" disabled class="form-control" v-model="iimprove">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-2 control-label">起拍价</label>
                                    <div class="col-md-10">
                                        <input type="number" class="form-control" v-model="istartprice">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-2 control-label">出现财年</label>
                                    <div class="col-md-10">
                                        <input type="number" class="form-control" v-model="iyear">
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>         
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-default waves-effect" data-dismiss="modal">关闭</button>
            <button type="button" class="btn btn-primary waves-effect waves-light" data-dismiss="modal" @click="sendCompete(2)">发布竞拍</button>
            </div>
        </div>
      </div>
    </div>

    <!-- commerland -->
    <div id="commerland" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h4 class="modal-title" id="myModalLabel">发布竞拍</h4>
            </div>
            <!-- 内容 -->
            <div class="modal-body" align='center'>
              <div class="row">
                <div class="col-sm-12">
                    <div class="panel panel-default">
                        <div class="panel-heading"><h4>发布新的商业用地</h4></div>
                        <div class="panel-body">
                            <form class="form-horizontal" role="form">                                    
                                <div class="form-group">
                                    <label class="col-md-2 control-label">土地等级</label>
                                    <div class="col-md-10">
                                        <select class="form-control" v-model="clevel" @change="getLevel()">
                                            <option v-for="(item,index) in level" :key="index" :value="item">{{item | formatlevel}}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-2 control-label">品牌提升</label>
                                    <div class="col-md-10">
                                        <input type="number" disabled class="form-control" v-model="cbrand">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-2 control-label">增值空间</label>
                                    <div class="col-md-10">
                                        <input type="number" disabled class="form-control" v-model="cincrement">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-2 control-label">起拍价</label>
                                    <div class="col-md-10">
                                        <input type="number" class="form-control" v-model="cstartprice">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-2 control-label">出现财年</label>
                                    <div class="col-md-10">
                                        <input type="number" class="form-control" v-model="cyear">
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>         
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-default waves-effect" data-dismiss="modal">关闭</button>
            <button type="button" class="btn btn-primary waves-effect waves-light" data-dismiss="modal" @click="sendCompete(3)">发布竞拍</button>
            </div>
        </div>
      </div>
    </div>

    <!-- company -->
    <div id="company" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h4 class="modal-title" id="myModalLabel">定向发送</h4>
            </div>
            <!-- 内容 -->
            <div class="modal-body" align='center'>
              <div class="row">
                <div class="col-sm-12">
                    <div class="panel panel-default">
                        <div class="panel-heading"><h4>发放固定资产到指定公司</h4></div>
                        <div class="panel-body">
                            <form class="form-horizontal" role="form">                                    
                                <div class="form-group">
                                    <label class="col-md-2 control-label">公司名称</label>
                                    <div class="col-md-10">
                                        <select class="form-control" v-model="company_id">
                                            <option v-for="(item,index) in company" :key="index" :value="item.id">{{item.name}}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                  <label class="col-sm-2 control-label">支付金额</label>
                                  <div class="col-sm-10">
                                      <input type="number" class="form-control"  v-model="givePrice">
                                  </div>
                              </div>                         
                            </form>
                        </div>
                    </div>
                </div>
            </div>         
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-default waves-effect" data-dismiss="modal">关闭</button>
            <button type="button" class="btn btn-primary waves-effect waves-light" data-dismiss="modal" @click="sendToCompany()">发放到公司</button>
            </div>
        </div>
      </div>
    </div>

    <!-- desc -->
    <div id="desc" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h4 class="modal-title" id="myModalLabel">当前拍卖情况</h4>
            </div>
            <!-- 内容 -->
            <div class="modal-body" align='center'>
              <div class="row">
                <div class="col-sm-12">
                    <div class="panel panel-default">
                        <div class="panel-heading"><h4>按照出价排名发放固定资产到指定公司</h4></div>
                        <div class="col-md-12 col-sm-12 col-xs-12">
                      <table class="table table-striped table-hover" style id="datatable-editable">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>公司名称</th>
                            <th>出价</th>
                            <th>操作</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item,index) in showDesc" :key="index">
                            <td>{{index}}</td>
                            <td v-if="item.company">{{item.company.name}}</td>
                            <td v-else></td>
                            <td>{{item.auction}}</td>
                            <td class="actions" align="center">
                              <a class="waves-effect waves-light" data-dismiss="modal" @click="getit(item)"  data-toggle="tooltip" data-placement="top" title="发送给此公司">
                                <i class="fa fa-tags"></i>
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
    </div>

  </div>
</template>

<script>
const s_alert = require("../../utils/alert");
const ses = require("../../utils/ses");
const req = require("../../utils/axios");
const print = require("../../utils/print");
const apis = require("../../utils/api/apis");

import app from "../../App.vue";
const moment = require("moment");
var App = app;

export default {
  name: "docompete",
  data() {
    return {
      Yearid:'',

      showMiningItems: "",
      showInduslandItems: "",
      showCommerlandItems: "",
      
      model:"",
      price:'',
      givePrice:'',

      //默认数据
      star:[1,2,3,4,5],
      source:[1,2,3,4,5],
      model:[1,2,3,4],
      measure:[1,2,3,4],
      level:[1,2,3,4],

      //发布竞拍 - 矿区
      mstar:0,
      msource_id:0,
      mreserve:0,
      mdeprelief:0,
      mrepurchase:0,
      mstartprice:0,
      myear:0,

      //发布竞拍 - 工业用地
      imodel:0,
      imeasure:0,
      iefficient:0,
      irepurchase:0,
      iimprove:0,
      istartprice:0,
      iyear:0,

      //发布竞拍 - 商业用地
      clevel:0,
      cbrand:0,
      cincrement:0,
      cstartprice:0,
      cyear:0,

      //选择
      chooseItem:'',
      chooseType:1,

      //定向发送
      company:'',
      company_id:'',
      givePrice:'',

      //排序表
      showDesc:'',

      //储存钱
      money:'',

      // 分页数据
      items: [],
      showItems: [],
      PageShowSum: 10,
      currentPage: "0",
      sumPage: null,
    };
  },
  beforeMount() {
    this.Yearid = JSON.parse(ses.getSes("gameinfo")).Yearid;
  },
  mounted() {
    this.showMining();
    this.getAllCompany();
    // 实时获取info
    setTimeout(() => {
    this.getInfo();
    }, 10000);
  },
  updated() {    
    $(function () { $("[data-toggle='tooltip']").tooltip(); });
  },
  filters: {
    formatTime(x) {
      return moment(x).format("YYYY-MM-DD HH:mm:ss");
    },
    formatCondition(x){
      if(x==-2) return '竞拍未开始'
      if(x==-1) return '产品流拍'
      if(x==0) return '竞拍中'
      if(x==1) return '竞拍已结束'
      if(x==2) return '定向公司发送'
      if(x==3) return '资产已发送'
    },
    formatStar(x){
      if(x==1) return '一星矿区'
      if(x==2) return '二星矿区'
      if(x==3) return '三星矿区'
      if(x==4) return '四星矿区'
      if(x==5) return '五星矿区'
    },
    formatSource(x){
      if(x==1) return '金'
      if(x==2) return '木'
      if(x==3) return '水'
      if(x==4) return '火'
      if(x==5) return '土'
    },
    formatmodel(x){
      if(x==1) return 'A'
      if(x==2) return 'Z'
      if(x==3) return 'C'
      if(x==4) return 'S'
    },
    formatlevel(x){
      if(x==1) return '投契级'
      if(x==2) return '机构级'
      if(x==3) return '投资级'
      if(x==4) return '地标级'
    }
  },
  methods: {
    getInfo(){
      this.company_id = JSON.parse(ses.getSes("userinfo")).company_id;
      this.Yearid = JSON.parse(ses.getSes("gameinfo")).Yearid;
    },
    init(){
        this.showMining();
        this.showIndus();
        this.showCommer();
        this.getAllCompany();
    },
    sendCompete(index){
      //矿区
      if(index==1){
        let s=`api/mining?judge=1&star=${this.mstar}&totalreserve=${this.mreserve}&reserve=${this.mreserve}&deprelief=${this.mdeprelief}&repurchase=${this.mrepurchase}&startprice=${this.mstartprice}&condition=-2&Yearid=${this.myear}&source_id=${this.msource_id}`
        print.log(s)
        this.tempSendCompete(s,index)
        
        this.mstar=0
        this.msource_id=0
        this.mreserve=0
        this.mdeprelief=0
        this.mrepurchase=0
        this.mstartprice=0
        this.myear=0
      }
      //工业用地
      if(index==2){
        let s=`api/indusland?judge=1&model=${this.imodel}&measure=${this.imeasure}&efficient=${this.iefficient}&repurchase=${this.irepurchase}&isimprove=0&improve=${this.iimprove}&startprice=${this.istartprice}&condition=-2&Yearid=${this.iyear}`
        print.log(s)
        this.tempSendCompete(s,index)
        
        this.imodel=0
        this.imeasure=0
        this.iefficient=0
        this.irepurchase=0
        this.iimprove=0
        this.istartprice=0
        this.iyear=0
      }
      //商业用地
      if(index==3){
        let s=`api/commerland?judge=1&level=${this.clevel}&brand=${this.cbrand}&increment=${this.cincrement}&startprice=${this.istartprice}&condition=-2&Yearid=${this.cyear}`
        print.log(s)
        this.tempSendCompete(s,index) 
        
        this.clevel=0
        this.cbrand=0
        this.cincrement=0
        this.cstartprice=0
        this.cyear=0
      }
    },
    //发布订单模板
    tempSendCompete(s,index){
        req.post(s)
        .then(res => {
            print.log(res.data);
            s_alert.Success("发布竞拍成功", "注意，默认为未开启竞拍状态，点击开始按钮开始竞拍", "success");
            if(index==1) this.showMining();
            if(index==2) this.showIndus();
            if(index==3) this.showCommer();
        })
    },
    //开始竞拍
    start(item,index){
        if(index==1){
          let s=`api/mining?judge=2&condition=0&id=${item.id}`
          this.StartCompeteUpdateCondition(s)
        }
        else if(index==2){
          let s=`api/indusland?judge=2&condition=0&id=${item.id}`
          this.StartCompeteUpdateCondition(s)
        }
        else if(index==3){
          let s=`api/commerland?judge=2&condition=0&id=${item.id}`
          this.StartCompeteUpdateCondition(s)
        }else{
          s_alert.Success("发布竞拍失败", "请联系管理人员", "warning");
        }
    },
    // 结束竞拍 
    stop(item,index){
        if(index==1){
          let s=`api/mining?judge=2&condition=1&id=${item.id}`
          this.StartCompeteUpdateCondition(s)
        }
        else if(index==2){
          let s=`api/indusland?judge=2&condition=1&id=${item.id}`
          this.StartCompeteUpdateCondition(s)
        }
        else if(index==3){
          let s=`api/commerland?judge=2&condition=1&id=${item.id}`
          this.StartCompeteUpdateCondition(s)
        }else{
          s_alert.Success("发布竞拍失败", "请联系管理人员", "warning");
        }
    },
    // 定向公司发布 & 竞价排名
    opensetting(item,type,func){    //选择发放
        this.chooseItem=item
        this.chooseType=type
        // 初始化定向公司发布信息
        this.company_id=''
        this.givePrice=0
        print.log(item,type)
        if(func==2){
          // 获取竞价排名
          this.getDesc(item,type)
        }
    },
    // 定向公司发布
    sendToCompany(){
        if(this.chooseType==1){
            // 获取个人资产
            apis.getOneStatisticByCompanyId(this.company_id)
            .then(res=>{
              print.log('获取个人资产',res.data)
              if(this.givePrice<=res.data.float){
                // 更新自己资产信息
                let float=res.data.float-this.givePrice;
                let total=res.data.total-this.givePrice;
                // 更新拍得公司资产信息
                req.post_Param('api/statistic',{
                    'judge':4,
                    'total':total,
                    'float':float,
                    'company_id':this.company_id
                })
                // 更新竞拍状态
                let s=`api/mining?judge=2&condition=3&id=${this.chooseItem.id}&company_id=${this.company_id}&price=${this.givePrice}`
                this.StartCompeteUpdateCondition(s)
                // 写入交易信息
                req.post_Param('api/transaction',{
                    'judge':1,
                    'id':0,
                    'Yearid':this.Yearid,
                    'inout':1,
                    'type':4,
                    'kind':3,
                    'price':this.givePrice,
                    'number':1,
                    'me':this.company_id,
                    'detail':`竞拍：资产类别${this.chooseType},资产编号${this.chooseItem.id}`
                }) 
              }else{
                swal("竞拍失败!", "可用流动资金不足", "warning");
              }
            })
        }else if(this.chooseType==2){
            // 获取个人资产
            apis.getOneStatisticByCompanyId(this.company_id)
            .then(res=>{
              print.log('获取个人资产',res.data)
              if(this.givePrice<=res.data.float){
                // 更新自己资产信息
                let float=res.data.float-this.givePrice;
                let total=res.data.total-this.givePrice;
                // 更新拍得公司资产信息
                req.post_Param('api/statistic',{
                    'judge':4,
                    'total':total,
                    'float':float,
                    'company_id':this.company_id
                })
                // 更新竞拍状态
                let s=`api/indusland?judge=2&condition=3&id=${this.chooseItem.id}&company_id=${this.company_id}&price=${this.givePrice}`
                this.StartCompeteUpdateCondition(s)
                // 写入交易信息
                req.post_Param('api/transaction',{
                    'judge':1,
                    'id':0,
                    'Yearid':this.Yearid,
                    'inout':1,
                    'type':4,
                    'kind':3,
                    'price':this.givePrice,
                    'number':1,
                    'me':this.company_id,
                    'detail':`竞拍：资产类别${this.chooseType},资产编号${this.chooseItem.id}`
                }) 
              }else{
                swal("竞拍失败!", "可用流动资金不足", "warning");
              }
            })
        }else if(this.chooseType==3){
            // 获取个人资产
            apis.getOneStatisticByCompanyId(this.company_id)
            .then(res=>{
              print.log('获取个人资产',res.data)
              if(this.givePrice<=res.data.float){
                // 更新自己资产信息
                let float=res.data.float-this.givePrice;
                let total=res.data.total-this.givePrice;
                // 更新拍得公司资产信息
                req.post_Param('api/statistic',{
                    'judge':4,
                    'total':total,
                    'float':float,
                    'company_id':this.company_id
                })
                // 更新竞拍状态
                let s=`api/commerland?judge=2&condition=3&id=${this.chooseItem.id}&company_id=${this.company_id}&price=${this.givePrice}`
                this.StartCompeteUpdateCondition(s)
                // 写入交易信息
                req.post_Param('api/transaction',{
                    'judge':1,
                    'id':0,
                    'Yearid':this.Yearid,
                    'inout':1,
                    'type':4,
                    'kind':3,
                    'price':this.givePrice,
                    'number':1,
                    'me':this.company_id,
                    'detail':`竞拍：资产类别${this.chooseType},资产编号${this.chooseItem.id}`
                }) 
              }else{
                swal("竞拍失败!", "可用流动资金不足", "warning");
              }
            })
        }
    },
    // 获取竞价排名
    getDesc(item,type){
        req.post_Param('api/compete',{
            'judge':7,
            'type':type,
            'thingid':item.id
        })
        .then(res => {
            this.showDesc=res.data;
            print.log('竞价排名',this.showDesc)
        })
    },
    // 根据竞价排名发给公司
    getit(item){
        print.log('根据竞价排名发给公司',item,this.chooseItem)
        if(this.chooseType==1){
            let s=`api/mining?judge=2&condition=1&id=${this.chooseItem.id}&company_id=${item.company.id}&price=${item.auction}`
            print.log(s)
            this.StartCompeteUpdateCondition(s) 
            // 更新竞拍单状态
            apis.updateOneCompeteConditionById(item.id,1);
            // 更新资产
            // let m=`api/statistic?judge=5&company_id=${item.company.id}`
            // this.updateFixedAssets(m,item.auction,item.company.id)
        }else if(this.chooseType==2){
            let s=`api/indusland?judge=2&condition=1&id=${this.chooseItem.id}&company_id=${item.company.id}&price=${item.auction}`
            print.log(s)
            this.StartCompeteUpdateCondition(s)
            // 更新竞拍单状态
            apis.updateOneCompeteConditionById(item.id,1);
            // 更新资产
            // let m=`api/statistic?judge=5&company_id=${item.company.id}`
            // this.updateFixedAssets(m,item.auction,item.company.id)   
        }else if(this.chooseType==3){
            let s=`api/commerland?judge=2&condition=1&id=${this.chooseItem.id}&company_id=${item.company.id}&price=${item.auction}`
            print.log(s)
            this.StartCompeteUpdateCondition(s)
            // 更新竞拍单状态
            apis.updateOneCompeteConditionById(item.id,1);
            // 更新资产
            // let m=`api/statistic?judge=5&company_id=${item.company.id}`
            // 更新商业用地 固定资产
            // this.updateFixedAssetsForCommerland(m,item)
        }
    },     
    //更新资产信息  
    updateFixedAssetsForCommerland(m,item){  
        // 获取资产信息
        req.post(m)
        .then(res => {
            print.log('商业用地资产信息',res.data)
            // 计算资产差值
            let fix=item.auction;  //this.chooseItem.startprice+(item.auction-this.chooseItem.startprice)*this.chooseItem.increment
            //商业用地固定资产 = 目前价值 + （平均成交价 - 目前价值）* 增值空间 ，暂时这样用着。
            let fixed=res.data.fixed+fix;
            let total=res.data.total+fix-item.auction;
            let float=res.data.float-item.auction;
            let brand=(res.data.brand)*(1+this.chooseItem.brand);
            print.log('更新品牌价值',brand)
            // 更新资产信息
            req.post_Param('api/statistic',{
                'judge':4,
                'fixed':fixed,
                'total':total,
                'float':float,
                'brand':brand,
                'company_id':item.company.id
            })
            .then(res => {
                print.log(res.data);
                if(this.chooseType==1) this.showMining();
                if(this.chooseType==2) this.showIndus();
                if(this.chooseType==3) this.showCommer();
            })
        })
    },
     //竞拍状态更新模板
    StartCompeteUpdateCondition(s){    
        req.post(s)
        .then(res => {
            if(res.data.success){
                s_alert.Success("竞拍状态更新成功", "", "success");
                if(this.chooseType==1) this.showMining();
                if(this.chooseType==2) this.showIndus();
                if(this.chooseType==3) this.showCommer();
            }else{
                s_alert.Success("竞拍状态更新失败", "", "warning");
                if(this.chooseType==1) this.showMining();
                if(this.chooseType==2) this.showIndus();
                if(this.chooseType==3) this.showCommer();
            }
        })
    },
    //更新固定资产
    updateFixedAssets(s,m,c){
        req.post(s)
        .then(res => {
            this.money=res.data
            let float=res.data.float-m;
            let total=res.data.total-m;
            // 更新拍得公司资产信息
            req.post_Param('api/statistic',{
                'judge':4,
                'total':total,
                'float':float,
                'company_id':c
            })
            .then(res => {
                swal("资金信息更新成功!", "参赛者资产信息更新成功", "success");
                if(this.chooseType==1) this.showMining();
                if(this.chooseType==2) this.showIndus();
                if(this.chooseType==3) this.showCommer();
            })
        })
    },
    //获取公司列表
    getAllCompany(){        
        apis.getAllCompany()
        .then(res => {
          this.company = res.data;
          print.log('所有公司列表->',res.data)
        })
    },
    // 根据星级设置矿区储量
    getstar(){
        if(this.mstar==1){ this.mreserve = Math.round(Math.random()*(6000-4000)+4000);this.mdeprelief=0;this.mrepurchase=120;}
        if(this.mstar==2){ this.mreserve = Math.round(Math.random()*(10000-8000)+8000);this.mdeprelief=0.1;this.mrepurchase=160;}
        if(this.mstar==3){ this.mreserve = Math.round(Math.random()*(15000-12000)+12000);this.mdeprelief=0.2;this.mrepurchase=200;}
        if(this.mstar==4){ this.mreserve = Math.round(Math.random()*(24000-18000)+18000);this.mdeprelief=0.25;this.mrepurchase=300;}
        if(this.mstar==5){ this.mreserve = Math.round(Math.random()*(32000-26000)+26000);this.mdeprelief=0.3;this.mrepurchase=450;}
    },
    // 根据工业用地型号设置面积等等信息
    getModel(){
      if(this.imodel==1){ this.imeasure=5; this.iefficient=0; this.irepurchase=0; this.iimprove=0}
      if(this.imodel==2){ this.imeasure=5; this.iefficient=0.1; this.irepurchase=0.4; this.iimprove=500}
      if(this.imodel==3){ this.imeasure=10; this.iefficient=0.2; this.irepurchase=0.1; this.iimprove=500}
      if(this.imodel==4){ this.imeasure=8; this.iefficient=0.3; this.irepurchase=0.1; this.iimprove=500}
    },
    // 根据商业用地等级设置品牌提升等等信息
    getLevel(){
      if(this.clevel==1){ this.cbrand=0; this.cincrement=0.1; }
      if(this.clevel==2){ this.cbrand=0.1; this.cincrement=0.3; }
      if(this.clevel==3){ this.cbrand=0.2; this.cincrement=0.8; }
      if(this.clevel==4){ this.cbrand=0.3; this.cincrement=1.2; }
    },
    //获取政府矿区竞拍汇总表
    showMining() {
        req.post_Param('api/mining',{'judge':0})
        .then(res => {
          this.showMiningItems = res.data;
          this.chooseType=1;
          // 分页
          this.currentPage='0'
          this.show(res.data)
        })
    },
    //获取政府工业用地竞拍汇总表
    showIndus() {
        req.post_Param('api/indusland',{'judge':0})
        .then(res => {
          print.log('工业用地竞拍汇总表',res.data)
          this.showInduslandItems = res.data;
          this.chooseType=2;
          // 分页
          this.currentPage='0'
          this.show(res.data)
        })
    },
    //获取政府商业用地竞拍汇总表
    showCommer() {
        req.post_Param('api/commerland',{'judge':0})
        .then(res => {
          this.showCommerlandItems = res.data;
          this.chooseType=3;
          // 分页
          this.currentPage='0'
          this.show(res.data)
        })
    },

    // -----------------------------------------------------------分页模板-------------------------------------------------------------
    show(items) {
      this.items=items;
      this.sumPage = Math.ceil(this.items.length / this.PageShowSum);
      //页面加载完成，默认加载第一页
      let page = Number(this.currentPage) + 1;
      this.showEachPage(page);
      print.log("当前数据总页为：--->", this.sumPage);
    },
    switchPage(page) {
      let p = page - 1;
      this.currentPage = `${p}`;
      print.log("当前-->", page);
      this.showEachPage(page);
    },
    showEachPage(page) {
      let all = this.items;
      this.showItems = [];
      for (
        let i = (page - 1) * this.PageShowSum;
        i < page * this.PageShowSum;
        i++
      ) {
        if (all[i] == null) {
          break;
        } else {
          this.showItems.push(all[i]);
        }
      }
    },
    nextPage() {
      if (this.currentPage == this.sumPage - 1) {
        s_alert.basic("已经到达最后一页了……");
      } else {
        let p = Number(this.currentPage) + 1;
        this.currentPage = `${p}`;
        print.log("当前-->", p + 1);
        this.showEachPage(p + 1);
      }
    },
    previousPage() {
      if (this.currentPage == "0") {
        s_alert.basic("已经到达最前面了……");
      } else {
        let p = Number(this.currentPage) - 1;
        this.currentPage = `${p}`;
        print.log("当前-->", p + 1);
        this.showEachPage(p + 1);
      }
    }
  }
};
</script>

<style>

</style>
