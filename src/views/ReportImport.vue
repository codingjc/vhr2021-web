<template>
  <div class="upload">
    <el-upload
        class="upload-demo"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传excel文件，且不超过10M</div>
    </el-upload>
  </div>
</template>

<script>
export default {
name: "ReportImport"
}
</script>

<style scoped>
  .upload{
    display: flex;
    background-clip: padding-box;
    justify-content:center;
    margin: 200px auto;

  }
</style>