<template>
  <div>
    <!--   head   -->
    <div class="permissManaTool">
      <el-input placeholder="请输入角色英文名称..." v-model="role.name" size="small" style="width: 300px">
        <template slot="prepend">ROLE_</template>
      </el-input>

      <el-input placeholder="请输入角色中文名称..."
                v-model="role.nameZh"
                size="small"
                style="width: 300px; margin-left: 10px"
                @keydown.enter.native="addPermiss">
      </el-input>

      <el-button type="primary"
                 @click="addPermiss"
                 size="small"
                 style="margin-left: 10px"
                 icon="el-icon-plus">
        添加
      </el-button>
    </div>

    <!--  footer  -->
    <div style="margin-top: 10px">

      <el-collapse v-model='activeName' accordion style="width: 700px" @change="getMenus">
        <el-collapse-item :title="r.nameZh" :name="r.id" v-for="(r, index) in roles" :key="index">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>可访问的资源</span>

              <el-popconfirm
                  style="float: right; padding: 3px 0"
                  confirm-button-text='好的'
                  cancel-button-text='不用了'
                  icon="el-icon-info"
                  icon-color="red"
                  @confirm="confirmDelete(r.id)"
                  :title="'确定删除【' + r.nameZh + '】吗？'"
              >
                <el-button slot="reference" icon="el-icon-delete" type="text" style="color: red"></el-button>
              </el-popconfirm>

<!--              <el-button style="float: right; padding: 3px 0; color: red" icon="el-icon-delete" @click="deleteRole(r.id)" type="text"></el-button>-->
            </div>
            <div >
              <el-tree node-key="id"
                       ref="tree"
                       :key="index"
                       :default-checked-keys="checkedKeys"
                       show-checkbox
                       :data="allMenus"
                       :props="defaultProps">
              </el-tree>

              <div style="display: flex;justify-content: flex-end">
                <el-button size="small" @click="doCalcel">取消修改</el-button>
                <el-button size="small" type="primary" @click="doUpdate(r.id, index)">确认修改</el-button>
              </div>
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
      role: {
        name: '',
        nameZh: ''
      },
      roles:[],
      allMenus:[],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      checkedKeys: [],
      activeName: -1
    }
  },
  methods:{
    doUpdate(rid, index){
      console.log(rid);
      //当前选中的角色的tree
      let tree = this.$refs.tree[index];
      let selectKeys = tree.getCheckedKeys(true);

      let url = '/system/basic/permiss/?rid=' + rid;
      selectKeys.forEach(mid => {
        url += '&mids=' + mid;
      })

      this.putRequest(url).then(resp => {
        if (resp) {
          this.getMenus(rid);
        }
      })
      console.log(selectKeys);
    },
    getMenus(rid){
      if (rid) {
        this.getAllMenus();
        this.getRequest('/system/basic/permiss/' + rid).then(resp => {
          if (resp) {
            this.checkedKeys = resp;
          }
        })
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
      if(this.role.name && this.role.nameZh){
        this.postRequest('/system/basic/permiss/', this.role).then(resp => {
          if (resp) {
            this.getAllRoles();
            this.role.name = '';
            this.role.nameZh = '';
          }
        })
      } else {
        this.$message.error('请输入角色英文或中文名！')
      }
    },
    doCalcel(){
      this.activeName = -1;
    },
    confirmDelete(rid){
      this.deleteRequest('/system/basic/permiss/role/' + rid).then(resp => {
        if (resp) {
          this.getAllRoles();
          this.activeName = -1;
        }
      })
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