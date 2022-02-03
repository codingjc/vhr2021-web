<template>
  <div>
    <div>
      <el-input
          size="small"
          placeholder="添加职称..."
          prefix-icon="el-icon-plus" style="width: 300px"
          v-model="jobLevel.name">
      </el-input>

      <el-select v-model="jobLevel.jobLevel" placeholder="职称等级" size="small" style="margin-left: 10px">
        <el-option
            v-for="item in titleLevels"
            :key="item"
            :label="item"
            :value="item">
        </el-option>
      </el-select>

      <el-button size="small" type="primary" style="margin-left: 10px" @click="addJobLevel">添加</el-button>
    </div>

    <div style="margin-top: 10px">
      <el-table
          :data="jobLevels"
          border
          stripe
          el-table-column
          @selection-change="handleSelectionChange"
          size="small"
          style="width: 1161px">
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
            label="职称名称"
            width="150">
        </el-table-column>
        <el-table-column
            prop="titleLevel"
            label="职称级别"
            width="200">
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
          class="pageHelper" style="margin-left: 700px">
      </el-pagination>
    </div>

      <!--  模态框  -->
      <el-dialog title="修改职称" :visible.sync="dialogFormVisible" width="30%">

        <div>
          <table>
            <tr>
              <td>
                <el-tag size="small">职称名称</el-tag>
              </td>
              <td>
                <el-input size="small" style="margin-left: 8px" v-model="updateJobLevel.name"></el-input>
              </td>
            </tr>

            <tr>
              <td>
                <el-tag size="small">职称级别</el-tag>
              </td>
              <td>
                <el-select v-model="updateJobLevel.titleLevel" placeholder="职称等级" size="small" style="margin-left: 10px">
                  <el-option
                      v-for="item in titleLevels"
                      :key="item"
                      :label="item"
                      :value="item">
                  </el-option>
                </el-select>
              </td>
            </tr>

            <tr>
              <td>
                <el-tag size="small">是否启用</el-tag>
              </td>
              <td>
                <el-switch
                    size="small"
                    style="display: block; margin-left: 8px"
                    v-model="updateJobLevel.enabled"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    active-text="开启"
                    inactive-text="关闭">
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
  name: "JobLevelMana",
  data(){
    return{
      jobLevels:[],
      jobLevel: {
        name:'',
        jobLevel:''
      },
      titleLevels: [
          '正高级',
          '副高级',
          '初级',
          '中级',
          '员级'
      ],
      totalNum: 0,
      currentPage: 1,
      pageSize: 12,
      multipleSelection: [],
      dialogFormVisible: false,
      updateJobLevel: {
        name:'',
        titleLevel:'',
        enabled: false
      }
    }
  },
  methods:{
    initJoblevel(){
      this.getListByPage(1, 12);
    },
    doUpdate(){
      this.putRequest('/system/basic/job/', this.updateJobLevel).then(resp =>{
        if(resp) {
          this.initJoblevel();
          this.dialogFormVisible = false;
        }
      })
    },
    addJobLevel(){
      if (this.jobLevel.name && this.jobLevel.jobLevel) {
        this.postRequest('/system/basic/job/add', this.jobLevel).then(resp => {
          if(resp){
            this.jobLevel.name = '';
            this.jobLevel.jobLevel = '';
            this.initJoblevel();
          }
        })
      } else {
        this.$message.error('请输入职称名称或等级！');
      }
    },
    getListByPage(pageNum, sizeNum){
      let pageBean = {
        "pageNum": pageNum,
        "pageSize": sizeNum
      }
      this.postRequest("/system/basic/job/list", pageBean).then(resp => {
        if(resp){
          this.jobLevels = resp.data;
          this.totalNum = resp.totalNum;
        }
      })
    },
    handleSelectionChange(val){
      this.multipleSelection = val;
    },
    handleEdit(index, row){
      Object.assign(this.updateJobLevel, row);
      this.dialogFormVisible = true;
    },
    handleDelete(index, row){
      this.$confirm('此操作将永久删除该【'+ row.name +'】职位, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteRequest('/system/basic/job/?id=' + row.id).then(resp => {
          if (resp) {
            this.initJoblevel();
          }
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    handleSizeChange(sizeNum){
      console.log(this.currentPage + ":" + sizeNum)
      this.pageSize = sizeNum;
      this.getListByPage(this.currentPage, sizeNum);
    },
    handleCurrentChange(currentNum){
      this.getListByPage(currentNum, this.pageSize);
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
        this.deleteRequest('/system/basic/job/batch' + ids).then(resp => {
          if(resp){
            this.initJoblevel();
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
    this.initJoblevel();
  }
}
</script>

<style>
  .footer{
    display: flex;
    margin-top: 10px;
  }
  .updateJobInput{
    width: 10px;
    margin-left: 10px;
  }
</style>