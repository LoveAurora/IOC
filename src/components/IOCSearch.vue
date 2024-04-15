<template>
  <div>
    <Header />
    <el-container>
      <el-header>威胁分析</el-header>
      <el-main>
        <el-row align="middle" class="search-row">
          <el-col :span="10">
            <el-input
              v-model="inputValue"
              placeholder="请输入IP,域名,文件MD5值,威胁团伙名或直接上传本地文件"
              class="search-input"
            ></el-input>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" icon="el-icon-search" v-on:click="print"
              >搜索</el-button
            >
          </el-col>
          <el-col :span="3">
            <el-button type="primary"
              >上传文件 <el-icon><Upload /></el-icon
              ><i class="el-icon-upload el-icon--right"></i
            ></el-button>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="16">
            <h3>热门IOC示例</h3>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="16" class="col">
            <el-table :data="tableData" :stripe="true" style="width: 100%">
              <el-table-column prop="ip" label="IP" width="180" />
              <el-table-column prop="domain" label="域名" width="180" />
              <el-table-column prop="md5" label="文件MD5" />
            </el-table>
          </el-col> </el-row
      ></el-main>
    </el-container>
  </div>
</template>

<script>
import Header from "./Header.vue";

export default {
  components: {
    Header,
  },
  data() {
    return {
      inputValue: "",
      tableData: [
        { ip: "36.150.168.184", domain: "www.usspuh.top", md5: "" },
        { ip: "14.17.80.189", domain: "www.osterdjk.it", md5: "" },
        { ip: "36.150.168.184", domain: "www.usspuh.top", md5: "" },
        { ip: "14.17.80.189", domain: "www.osterdjk.it", md5: "" },
      ],
    };
  },
  methods: {
    print() {
      console.log(this.inputValue);
    },
  },
};
</script>
<style scoped>
.el-container {
  margin-top: 80px;
}
.el-header {
  background-color: #b3c0d1;
  color: var(--el-text-color-primary);
  text-align: center;
  font-weight: bold;
  line-height: 60px;
  font-size: xx-large;
}
.el-main {
  flex: 1; /* 使得 .el-main 能够填充所在容器中所有可用的空间 */
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 8px; /* 边框圆角 */
}

.content {
  margin-top: 80px;
}
.col {
  padding: 16px; /* 内边距 */
  border: 1px solid #ddd; /* 边框 */
  border-radius: 8px; /* 边框圆角 */
  /* 基础阴影效果 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out; /* 平滑的过渡效果 */
}

/* 当鼠标悬停在.col元素上时应用以下样式 */
.col:hover {
  transform: translateY(-5px); /* 使元素向上移动 */
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); /* 悬停时的阴影效果 */
  background-image: linear-gradient(
    to right,
    #3498db,
    #9b59b6
  ); /* 渐变背景色 */
}

.search-bar {
  display: flex; /* 使用 Flexbox 布局 */
  align-items: center; /* 垂直居中 */
}

.search-input {
  flex: 1; /* 填充剩余空间 */
  margin-right: 10px; /* 右边距 */
}

.el-button {
  min-width: auto; /* 移除按钮的最小宽度限制 */
}

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}

.el-table {
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.custom-table .el-table__row:hover {
  transform: translateY(-5px); /* 使元素向上移动 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 增加阴影 */
  background-image: linear-gradient(
    to bottom,
    rgba(30, 144, 255, 0.8),
    rgba(70, 130, 180, 0.8)
  );
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.el-col {
  display: flex;
  justify-content: center;
}
.search-row {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  display: flex;
}
.search-row > .el-col {
  margin: 0 2px !important;
}
</style>
