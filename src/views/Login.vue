<template>
  <div class="back">
    <el-form v-loading="loading"
             :rules="roles"
             ref="loginForm"
             :model="loginForm"
             class="loginContainer">
      <h3 class="loginTitle">Vhr</h3>

      <el-form-item prop="username">
        <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="请输入用户名"></el-input>
      </el-form-item>

      <el-form-item prop="password" >
        <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="请输入密码" @keydown.enter.native="submitLogin"></el-input>
      </el-form-item>

      <el-checkbox class="loginRemember" v-model="checked">记住我</el-checkbox>

      <el-button type="primary" style="width: 100%;" @click="submitLogin">登陆</el-button>
    </el-form>
  </div>
</template>

<script>

  export default {
    name: "Login",
    data() {
      return {
        loading: false,
        loginForm:{
          username: 'admin',
          password: '123'
        },
        roles: {
          username: [{required: true, message:'请输入用户名', trigger: 'blur'}],
          password: [{required: true, message:'请输入密码', trigger: 'blur'}]
        },
        checked: false
      }
    },
    methods: {
      submitLogin(){
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            this.loading = true;
            this.postKeyValueRequest("/doLogin", this.loginForm).then(resp => {
              this.loading = false;
              if (resp) {
                window.sessionStorage.setItem("user", JSON.stringify(resp.data))
                // 获取当前router对象；replace：浏览器不可后退；push：浏览器可后退
                let toPath = this.$route.query.redirect;
                if (toPath == '/' || toPath == undefined) {
                  this.$router.replace('/home');
                } else {
                  this.$router.replace(toPath);
                }
              }
            })
          } else {
            this.$message.error('请输入用户名和密码!');
            return false;
          }
        });
      }
    }
  }
</script>

<style>
   .loginContainer {
     border-radius: 15px;
     background-clip: padding-box;
     margin: 180px auto;
     width: 350px;
     padding: 15px 35px 15px 35px;
     background: #fff;
     border: 1px solid #eaeaea;
     box-shadow: 0 0 25px #cac6c6;
     height: 300px;
   }
   .loginTitle{
     margin: 15px auto 20px auto;
     text-align: center;
     color: #505458;
   }
   .loginRemember{
     text-align: left;
     margin-bottom: 15px;
   }
</style>