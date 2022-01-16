<template>
  <el-container>
    <el-header class="homeHeader">
      <!--   标题   -->
      <div class="title">财务管理系统</div>
      <!--  下拉菜单  -->
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

        <div class="homeWelcome" v-show="this.$router.currentRoute.path == '/home'">欢迎来到我的世界</div>
        <router-view class="homeRouteView"/>

      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    name: "Home",
    data() {
      return {
        user: JSON.parse(window.sessionStorage.getItem("user"))
      }
    },
    computed:{
      routes(){
        return this.$store.state.routes;
      }
    },
    methods: {
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
    text-align: center;
    font-size: 30px;
    color: #409eff;
    padding-top: 50px;
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
</style>