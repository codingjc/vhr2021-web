<template>
  <div>
    <!--   head   -->
    <div class="permissManaTool">
      <el-input placeholder="请输入角色英文名称..." v-model="permission.roleEn" size="small" style="width: 300px">
        <template slot="prepend">ROLE_</template>
      </el-input>

      <el-input placeholder="请输入角色中文名称..." v-model="permission.roleZh" size="small" style="width: 300px; margin-left: 10px"></el-input>

      <el-button type="primary" @click="addPermiss" size="small" style="margin-left: 10px" icon="el-icon-plus">添加</el-button>
    </div>

    <!--  footer  -->
    <div style="margin-top: 10px">

      <el-collapse accordion style="width: 700px" @change="getMenus">
        <el-collapse-item :title="r.nameZh" :name="r.id" v-for="(r, index) in roles" :key="index">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>可访问的资源</span>
              <el-button style="float: right; padding: 3px 0; color: red" icon="el-icon-delete" type="text"></el-button>
            </div>
            <div >
              <el-tree show-checkbox :data="allMenus" :props="defaultProps"></el-tree>
            </div>
          </el-card>
        </el-collapse-item>
      </el-collapse>

    </div>
  </div>
</template>

<script>
export default {
  name: "PermissMana",
  data(){
    return{
      permission:{
        roleEn: '',
        roleZh: ''
      },
      roles:[],
      allMenus:[],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  methods:{
    getMenus(rid){
      if (rid) {
        this.getAllMenus();
      }
    },
    getAllMenus(){
      this.getRequest('/system/basic/permiss/menus').then(resp => {
        if (resp) {
          this.allMenus = resp;
        }
      })
    },
    getAllRoles(){
      this.getRequest('/system/basic/permiss/').then(resp => {
        if(resp){
          this.roles = resp;
        }
      })
    },
    addPermiss(){

    }
  },
  mounted() {
    this.getAllRoles();
  }
}
</script>

<style>
  .permissManaTool .el-input{
    width: 300px;
    margin-right: 4px;
  }

</style>