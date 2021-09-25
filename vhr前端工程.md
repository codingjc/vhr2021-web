## 一、搭建前端工程

### 1. Vue CLI 安装

使用一下命令来安装这个新的包

~~~javascript
npm install -g @vue/cli
# or
npm global add @vue/cli
~~~

安装完成，就可以在命名行周访问`vue --version`命令查看版本号。

### 2.   创建工程

1. 命令行`vue create vhehr`，设置项目名
2. 选择Manually select featrues，手动选择需要的组件
3. `Babel、Router`
4.  不选择history模式
5. 选择 `In package.json`

### 3. 启动项目

~~~node
npm run serve
~~~



## 二、前端工程结构

- public：html页面和vue图标
- src
  - assets：存放静态资源文件
  - components：存放响应的组件
  - router：存放路由配置文件
  - views：存放相关页面
  - main.js：相关启动入口



## 三、登陆页面制作

1. 引入element-ui组件库

   ```
   npm i element-ui -S
   ```

2.  在main.js文件中引入

   ```javascript
   import ElementUI from 'element-ui'
   import 'element-ui/lib/theme-chalk/index.css';
   
   Vue.use(ElementUI);
   ```

3. 登陆页面

   1. 配置路由

   ```javascript
    {
       path: '/',
       name: 'Login',
       component: Login
     }
   ```

   2. Vue文件

   ```vue
   <template>
     <div>
       <el-form :rules="roles" ref="loginForm" :model="loginForm" class="loginContainer">
         <h3 class="loginTitle">系统登陆</h3> 
   
         <el-form-item prop="username">
           <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="请输入用户名"></el-input>
         </el-form-item>
   
         <el-form-item prop="password" >
           <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="请输入密码" @keydown.enter.native="submitLogin"></el-input>
         </el-form-item>
   
         <el-checkbox class="loginRemember" v-model="checked"></ el-checkbox>
   
         <el-button type="primary" style="width: 100%;" @click="submitLogin">登陆</el-button>
       </el-form>
     </div>
   </template>
   
   <script>
   
     export default {
       name: "Login",
       data() {
         return {
           loginForm:{
             username: 'admin',
             password: '123'
           },
           roles: {
             username: [{required: true, message:'请输入用户名', trigger: 'blur'}],
             password: [{required: true, message:'请输入密码', trigger: 'blur'}]
           },
           checked: true
         }
       },
       methods: {
         submitLogin(){
           this.$refs.loginForm.validate((valid) => {
             if (valid) {
               this.postKeyValueRequest("/doLogin", this.loginForm).then(resp => {
                 if (resp) {
                   window.sessionStorage.setItem("user", JSON.stringify(resp.data))
                   // 获取当前router对象
                   this.$router.replace('/home');
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
   ```



## 四、处理前端登陆事件

