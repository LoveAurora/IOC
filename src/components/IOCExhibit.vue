<template>
  <div>
    <Header />
    <div class="content">
      <el-container>
        <el-header>数据展示</el-header>
      </el-container>
      <el-table
        :data="data.data"
        class="center-table"
        row-class-name="row-hover"
        border
        style="width: 50%"
      >
        <el-table-column prop="category" label="分类" align="center" />
        <el-table-column prop="address" label="地址" align="center" />
      </el-table>
    </div>
  </div>
</template>

<script>
import Header from "./Header.vue";
import axios from "axios";

export default {
  components: {
    Header,
  },
  data() {
    return {
      data: [],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get("http://192.168.32.249:7777/ioc");
        // 实际的数据接口地址
        this.data = response.data;
        console.log(this.data);
        await this.$nextTick(); // 等待DOM更新完成
      } catch (error) {
        console.error("Error:", error);
      }
    },
  },
  rowHover({ rowIndex }) {
    if (rowIndex === -1) {
      return "";
    }
    return "hover-row-class";
  },
};
</script>
<style scoped>
/* Your component styles here */
.content {
  margin-top: 80px;
}
.center-table {
  margin: 0 auto;
  margin-top: 40px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
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
  border-radius: 8px; /* 边框圆角 */
}

.el-table .hover-row-class:hover {
  background-image: linear-gradient(
    to right,
    #3498db,
    #9b59b6
  ); /* 渐变背景色 */
}
</style>
