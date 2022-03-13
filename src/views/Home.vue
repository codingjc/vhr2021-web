<template>
  <el-container>
    <el-header class="homeHeader">
      <!--   标题   -->
      <div class="title">VHR</div>
      <!--  下拉菜单  -->
      <div>
        <el-popover
            placement="top-start"
            title="天气"
            width="400"
            trigger="hover"
            :content="'实时温度：'+weather.wendu+'℃,今日'+weather.ymd+','+ weather.week+'：'+ weather.low + '-' + weather.high">
<!--          <el-button slot="reference">hover 激活</el-button>-->
          <el-button slot="reference" size="normal" type="text" icon="el-icon-sunny" style="color: white; margin-right: 10px"></el-button>
        </el-popover>

        <el-dropdown class="userInfo" @command="commandHandle">
        <span class="el-dropdown-link">
          {{user.name}}<i><img :src="user.userface" alt="user.name"></i>
        </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="userInfo">个人中心</el-dropdown-item>
            <el-dropdown-item command="setting">设置</el-dropdown-item>
            <el-dropdown-item command="logout" divided>注销登陆</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

    </el-header>

    <el-container>
      <!--   左侧菜单   -->
      <el-aside width="200px">
        <el-menu router unique-opened>
          <el-submenu :index="index+''" v-for="(item, index) in routes" v-if="!item.hidden" :key="index">
            <template slot="title">
              <i style="color: #5ac3ff; margin-right: 5px" :class="item.iconCls"></i>
              <span>{{item.name}}</span>
            </template>
            <el-menu-item v-for="(child, indexj) in item.children" :index="child.path" :key="indexj">{{child.name}}</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-main>
        <!--    面包屑    -->
        <el-breadcrumb separator-class="el-icon-arrow-right" v-show="this.$router.currentRoute.path != '/home'">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{this.$router.currentRoute.name}}</el-breadcrumb-item>
        </el-breadcrumb>

<!--        <div class="homeWelcome" v-show="this.$router.currentRoute.path == '/home'">-->
<!--          实时温度：{{weather.wendu}}℃，今日{{weather.ymd}}, {{weather.week}}：{{weather.low}} - {{weather.high}}-->
<!--        </div>-->

        <el-carousel :interval="3000" type="card" height="450px" v-show="this.$router.currentRoute.path == '/home'">
          <el-carousel-item v-for="item in pics" :key="item">
            <i><img class="picture" :src="item"></i>
          </el-carousel-item>
        </el-carousel>

        <router-view class="homeRouteView"/>

      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import img1 from '@/assets/img/1.jpeg'
  import img2 from '@/assets/img/back.jpeg'
  import img3 from '@/assets/img/death-valley-4250244.jpg'
  import img4 from '@/assets/img/road-5704083.jpg'
  import img5 from '@/assets/img/utah-5641320.jpg'

  export default {
    name: "Home",
    data() {
      return {
        user: JSON.parse(window.sessionStorage.getItem("user")),
        pics: [
            img1,
            img2,
            img3,
            img4,
            img5
        ],
        weather: {
          wendu: 0,
          high: '',
          low: '',
          ymd: '',
          week: '',
          notice: '',
        }
      }
    },
    computed:{
      routes(){
        return this.$store.state.routes;
      }
    },
    mounted() {
      this.queryWeather();
    },
    methods: {
      queryWeather(){
        this.getRequest('/system/config/weather').then(resp => {
          if (resp) {
            this.weather.wendu = resp.data.data.wendu;
            this.weather.high = resp.data.data.forecast[0].high;
            this.weather.low = resp.data.data.forecast[0].low;
            this.weather.ymd = resp.data.data.forecast[0].ymd;
            this.weather.week = resp.data.data.forecast[0].week;
            this.weather.notice = resp.data.data.forecast[0].notice;

          }
        })
      },
      commandHandle(cmd) {
        //注销
        if (cmd=='logout') {
          this.$confirm('将注销【' + this.user.name + '】账户, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.getRequest("/logout", null).then(resp => {
              if (resp) {
                this.$router.push('/')
                window.sessionStorage.removeItem('user')
                this.$store.commit('initRoules', [])
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消注销'
            });
          });
        }
      }
    }
  }
</script>

<style>
  .homeWelcome{
    text-align: right;
    font-size: 15px;
    color: #409eff;
    padding-top: 10px;
    margin-bottom: 20px;
  }
 .homeHeader{
   background-color: #409eff;
   display: flex;
   align-items: center;
   justify-content: space-between;
   padding: 0px 15px;
   box-sizing: border-box;
 }
 .homeHeader .title{
   font-size: 30px;
   font-family: 微软雅黑;
   color: #eaeaea;
 }
 .homeHeader .userInfo{
   cursor: pointer;
   color: #eaeaea;
 }
 .el-dropdown-link{
   display: flex;
   align-items: center;
 }
 .el-dropdown-link img{
   width: 48px;
   height: 48px;
   border-radius: 25px;
   margin-left: 5px;
 }
 .homeRouteView{
   margin-top: 10px;
 }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  .picture{
    height: auto;
    /*width: auto;*/
    max-width: 100%;
    max-height: 100%;
    /*vertical-align: bottom;*/
    /*bottom: 0;*/
    -o-object-fit: cover;
    object-fit: cover;
    /*display: flex;*/
  }
</style>