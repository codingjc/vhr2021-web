<template>
  <div>
    <div style="margin-top: 10px; display: flex; justify-content: center">
      <el-input prefix-icon="el-icon-search" v-model="keyWord" placeholder="默认展示部分用户，可以通过用户名搜索更多用户..." style="width: 400px"></el-input>
      <el-button type="primary" icon="el-icon-search" style="margin-left: 10px">搜索</el-button>
    </div>

    <div class="hr-container">
      <el-card class="hr-card" v-for="(hr, index) in hrs" :key="index">
        <div slot="header" class="clearfix">
          <span>{{ hr.name }}</span>
          <el-button style="float: right; padding: 3px 0; color: red" type="text" icon="el-icon-delete"></el-button>
        </div>
        <div>
          <!--     头像     -->
          <div class="img-container">
            <img :src="hr.userface" :alt="hr.name" :title="hr.name" class="userface-img">
          </div>
          <!--     信息     -->
          <div class="userinfo-container">
            <div>用户名：<span style="margin-left: 20px">{{hr.name}}</span></div>
            <div>手机号码：<span style="margin-left: 6px"></span>{{hr.phone}}</div>
            <div>电话号码：<span style="margin-left: 6px"></span>{{hr.telephone}}</div>
            <div>地址：<span style="margin-left: 34px"></span>{{hr.address}}
<!--              <el-button style="color: blue" size="normal" type="text" icon="el-icon-map-location"></el-button>-->

<!--              <el-popover-->
<!--                  placement="top" width="500">-->

<!--                <div>-->
<!--                  <baidu-map :center="{lng: 120.21551, lat: 30.253363}" :zoom="zoom"  class="bm-view" :scroll-wheel-zoom="true">-->
<!--                    <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>-->
<!--                    <bm-geolocation anchor="BMAP_ANCHOR_TOP_LEFT" :show-address-bar="true" :auto-location="true"></bm-geolocation>-->
<!--                    <bm-marker :position="one" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">-->
<!--&lt;!&ndash;                      <bm-label :content="markerName" :label-style="{color: 'red', fontSize: '24px'}" :offset="{width: -35, height: 30}"></bm-label>&ndash;&gt;-->
<!--                    </bm-marker>-->
<!--&lt;!&ndash;                    <bm-panorama anchor="BMAP_ANCHOR_TOP_LEFT"></bm-panorama>&ndash;&gt;-->
<!--                  </baidu-map>-->
<!--                </div>-->

<!--                <el-button @click="changeCity(hr.name)" slot="reference" style="color: blue" size="normal" type="text" icon="el-icon-map-location"></el-button>-->
<!--              </el-popover>-->

              <el-button @click="changeCity(hr.name)" style="color: blue" size="normal" type="text" icon="el-icon-map-location"></el-button>
            </div>
            <div>用户状态：
              <el-switch
                  v-model="hr.enabled"
                  active-text="启用"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  @change="changeStatus(hr)"
                  inactive-text="禁用">
              </el-switch>
            </div>
            <div>用户角色：
              <el-tag type="success" style="margin-left: 4px" v-for="(role, indexj) in hr.roles"
                      :key="indexj">{{role.nameZh}}</el-tag>
              <el-button icon="el-icon-more" type="text" style="margin-left: 4px"></el-button>
            </div>
          </div>
        </div>
      </el-card>

      <el-dialog
          title="详情"
          :visible.sync="dialogVisible"
          :before-close="handleClose"
          width="40%">
        <div>
          <baidu-map :center="center" :zoom="zoom"  class="bm-view" :scroll-wheel-zoom="true">
            <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
            <bm-geolocation anchor="BMAP_ANCHOR_TOP_LEFT" :show-address-bar="true" :auto-location="true"></bm-geolocation>
            <bm-marker :position="{'lat': lat, 'lng': lng}" :dragging="false" animation="BMAP_ANIMATION_BOUNCE"></bm-marker>
          </baidu-map>
        </div>
      </el-dialog>

    </div>
  </div>
</template>

<script>
  // import {BaiduMap} from "@/util/map";
  import BaiduMap from 'vue-baidu-map'
  import Vue from 'vue'

  export default {
    name: "SysHr",
    watch: {
        lng(val, oldVal) {
        console.log("new = " + val + " , new = " + oldVal)
      }
    },
    methods: {
      handleClose(){
        this.dialogVisible = false;
      },
      changeStatus(hr){
        console.log(hr);
        delete hr.authorities;
        delete hr.roles;
        this.putRequest('/system/hr/', hr).then(resp => {
          if (resp) {
            this.initHrs();
          }
        })
      },
      changeCity(name){
        if ((name == '懒洋洋')||(name=='维尼')) {
          this.lng = this.hz.lng;
          this.lat = this.hz.lat;
          this.center.lng = this.hz.lng;
          this.center.lat = this.hz.lat;
          // this.markerName = '杭州市';
        }
        if (name == '多啦B梦') {
          this.lng = this.jx.lng;
          this.lat = this.jx.lat;
          this.center.lng = this.jx.lng;
          this.center.lat = this.jx.lat;
          // this.markerName = '嘉兴市';
        }
        this.dialogVisible = true;
      },
      handler ({BMap, map}) {
        this.center.lng = this.lng;
        this.center.lat = this.lat;
        this.zoom = 11
      },
      initHrs(){
        this.getRequest('/system/hr/').then(resp => {
          if(resp){
            this.hrs = resp;
          }
        })
      }
    },
    data(){
      return{
        keyWord: '',
        hrs:[],
        // center: {lng: 120.21551, lat: 30.253363},  //经纬度
        center: {lng: 0, lat: 0},  //经纬度
        zoom: 16,　 //地图展示级别
        hz: {
          lng: 120.21551,
          lat: 30.253363
        },
        jx: {
          lng: 120.763836,
          lat: 30.753208
        },
          lng: 0,
          lat: 0,
        markerName: '',
        dialogVisible: false
      }
    },
    mounted() {
      this.initHrs();

    }
  }
  Vue.use(BaiduMap, {
    /* Visit http://lbsyun.baidu.com/apiconsole/key for details about app key. */
    ak: '3mG9TtuFtEY7SK3070gZ2QUvOsyN7zR7'
  })
</script>

<style>
  .userinfo-container div{
    font-size: 14px;
    color: #5ac3ff;
  }
  .userinfo-container{
    margin-top: 20px;
  }
  .hr-container {
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .hr-card{
    width: 350px;
    margin-bottom: 20px;
  }
  .userface-img{
    width: 72px;
    height: 72px;
    border-radius: 72px;
  }
  .img-container{
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .bm-view {
    width: 100%;
    height: 400px;
  }
</style>