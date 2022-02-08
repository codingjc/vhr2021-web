<template>
  <div>
    <div>
      <el-input
          size="small"
          placeholder="添加职位..."
          class="addInput"
          prefix-icon="el-icon-plus"
          v-model="pos.search"
          @keydown.enter.native="addPosition">
      </el-input>

      <el-button type="primary" size="small" icon="el-icon-plus" @click="addPosition">添加</el-button>
    </div>

    <div class="posManaMain">
      <el-table
          :data="positions"
          border
          stripe
          el-table-column
          @selection-change="handleSelectionChange"
          size="small"
          style="width: 961px">
        <el-table-column
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column
            prop="id"
            label="序号"
            width="55">
        </el-table-column>
        <el-table-column
            prop="name"
            label="职位名称"
            width="150">
        </el-table-column>
        <el-table-column
            prop="createDate"
            label="创建时间"
            width="200">
        </el-table-column>
        <el-table-column
            prop="enabled"
            label="是否启用"
            width="200">
          <template slot-scope="scope">
            <el-tag size="small" type="success" v-if="scope.row.enabled">已启用</el-tag>
            <el-tag size="small" type="warn" v-else>未启用</el-tag>
          </template>
        </el-table-column>
        <el-table-column
            label="操作"
            width="300">
          <template slot-scope="scope">
            <el-button
                size="mini"
                type="primary"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="footer">
      <!--   批量删除  -->
      <el-button size="small" type="danger" :disabled="multipleSelection.length == 0" @click="deleteBatch">批量删除</el-button>

      <!-- 分页 -->
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[2, 4, 6, 12]"
          :page-size="pageSize"
          layout="sizes, prev, pager, next"
          :total="totalNum"
          class="pageHelper">
      </el-pagination>
    </div>

    <!--  对话框  -->
    <el-dialog title="修改职位" :visible.sync="dialogFormVisible" width="30%">
      <div>
        <table>
          <tr>
            <td>
              <el-tag>职位名称</el-tag>
            </td>
            <td>
              <el-input v-model="updatePos.name" size="small" ></el-input>
            </td>
          </tr>

          <tr>
            <td>
              <el-tag>是否启用</el-tag>
            </td>
            <td>
              <el-switch
                  v-model="updatePos.enabled"
                  active-text="启用"
                  inactive-text="禁用">
              </el-switch>
            </td>
          </tr>
        </table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="doUpdate">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: "PosMana",
  data(){
    return{
      totalNum: 0,
      currentPage: 1,
      pageSize: 12,
      pos:{
        search:''
      },
      positions: [],
      dialogFormVisible: false,
      updatePos: {
        name: '',
        enabled: false
      },
      multipleSelection:[]
    }
  },
  methods:{
    doUpdate(){
      this.putRequest('/system/basic/pos/', this.updatePos).then(resp => {
        if(resp){
          this.initPosition();
          this.updatePos.name = '';
          this.dialogFormVisible = false;
        }
      })
    },
    handleEdit(index, row){
      console.log(this.updatePos.name)
      this.updatePos = Object.assign(this.updatePos, row)
      console.log(this.updatePos.name)
      this.dialogFormVisible = true;
    },
    handleDelete(index, row){
      this.$confirm('此操作将永久删除该【'+ row.name +'】职位, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteRequest('/system/basic/pos/?id=' + row.id).then(resp => {
          if (resp) {
            this.initPosition();
          }
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    addPosition(){
      if(this.pos.search){
        this.postRequest('/system/basic/pos/add', {"name": this.pos.search}).then(resp => {
          if (resp) {
            this.initPosition();
            this.pos.search = '';
          }
        })
      } else {
        this.$message.error('请输入名称！');
      }

    },
    handleSizeChange(sizeNum){
      this.getListByPage(this.currentPage, sizeNum);
    },
    handleCurrentChange(currentNum){
      this.getListByPage(currentNum, this.pageSize);
    },
    initPosition(){
      this.getListByPage(1, 12);
    },
     getListByPage(pageNum, sizeNum){
      let pageBean = {
        "pageNum": pageNum,
        "pageSize": sizeNum
      }
      this.postRequest("/system/basic/pos/list", pageBean).then(resp => {
        if(resp){
          this.positions = resp.data;
          this.totalNum = resp.totalNum;
        }
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    deleteBatch(){
      this.$confirm('此操作将永久删除当前'+ this.multipleSelection.length+'个职位, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids = '?';
        this.multipleSelection.forEach(item => {
          ids += 'ids=' + item.id + '&';
        })
        this.deleteRequest('/system/basic/pos/batch' + ids).then(resp => {
          if(resp){
            this.initPosition();
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  },
    mounted() {
      this.initPosition();
  }
}
</script>

<style>
  .addInput{
    width: 300px;
    margin-right: 10px
  }
  .posManaMain{
    margin-top: 10px
  }

  .pageHelper{
    margin-left: 350px;
  }

  .footer{
    display: flex;
    margin-top: 10px;
  }
</style>