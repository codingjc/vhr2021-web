<template>
  <el-container>
    <el-header class="homeHeader">
      <!--   标题   -->
      <div class="title">vhr</div>
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
        <el-menu router>
          <el-submenu index="1" v-for="(item, index) in this.$router.options.routes" v-if="!item.hidden" :key="index">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.name}}</span>
            </template>
            <el-menu-item v-for="(child, indexj) in item.children" :index="child.path" :key="indexj">{{child.name}}</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-main>
        <router-view/>
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
</style>