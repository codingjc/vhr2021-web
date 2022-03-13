<template>
  <div>
    <div style="width: 500px">
      <el-input
          prefix-icon="el-icon-search"
          placeholder="输入关键字"
          v-model="filterText">
      </el-input>

      <el-tree
          class="filter-tree"
          :data="deps"
          :props="defaultProps"
          :filter-node-method="filterNode"
          ref="tree">

        <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ data.name }}</span>
        <span>
          <el-button
              type="text"
              size="mini"
              @click="() => append(data)">
            Append
          </el-button>
          <el-button
              type="text"
              size="mini"
              @click="() => remove(node, data)">
            Delete
          </el-button>
        </span>
      </span>

      </el-tree>
    </div>
  </div>
</template>

<script>
export default {
name: "DepMana",
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  data(){
    return{
      filterText: '',
      deps:[],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  methods: {
    initDeps(){
      this.getRequest('/system/basic/department/').then(resp => {
        if (resp) {
          this.deps = resp;
        }
      })
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    }
  },
  mounted() {
    this.initDeps();
  }
}
</script>

<style scoped>
  custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>