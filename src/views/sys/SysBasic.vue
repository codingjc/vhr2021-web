<template>
  <div>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="部门管理" name="first">
        <span slot="label"><i class="el-icon-date" style="margin-right: 3px"></i>部门管理</span>
        <DepMana></DepMana>
      </el-tab-pane>
      <el-tab-pane label="职位管理" name="secord">
        <span slot="label"><i class="el-icon-notebook-1" style="margin-right: 3px"></i>职位管理</span>
        <PosMana></PosMana></el-tab-pane>
      <el-tab-pane label="职称管理" name="fourth">
        <span slot="label"><i class="el-icon-s-promotion" style="margin-right: 3px"></i>职称管理</span>
        <JobLevelMana></JobLevelMana></el-tab-pane>
      <el-tab-pane label="奖惩规则" name="sixth">
        <span slot="label"><i class="el-icon-user-solid" style="margin-right: 3px"></i>奖惩规则</span>
        <EcMana></EcMana></el-tab-pane>
      <el-tab-pane label="权限组" name="seventh">
        <span slot="label"><i class="el-icon-lock" style="margin-right: 3px"></i>权限组</span>
        <PermissMana></PermissMana></el-tab-pane>
      <el-tab-pane label="地图展示" name="eighth">
        <span slot="label"><i class="el-icon-map-location" style="margin-right: 3px"></i>地图展示</span>
        <BasicMap></BasicMap></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
    import DepMana from "@/components/sys/basic/DepMana";
    import PosMana from "@/components/sys/basic/PosMana";
    import JobLevelMana from "@/components/sys/basic/JobLevelMana";
    import EcMana from "@/components/sys/basic/EcMana";
    import PermissMana from "@/components/sys/basic/PermissMana";
    import BasicMap from "@/components/sys/basic/basicMap";

    export default {
      name: "SysBasic",
      data() {
        return {
          activeName: 'fourth'
        }
      },
      components: {
        DepMana,
        PosMana,
        JobLevelMana,
        EcMana,
        PermissMana,
        BasicMap
      }
    }
</script>

<style scoped>

</style>