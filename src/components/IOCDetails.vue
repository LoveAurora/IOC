<template>
  <div>
    <Header></Header>
    <div class="content">
      <el-row :justify="'center'">
        <el-container>
          <el-header id="printer">威胁情报分析</el-header>
        </el-container>
      </el-row>
      <el-row class="row">
        <el-col :span="5" class="column-bg">
          <el-card class="shadow-card">
            <el-container>
              <el-header style="background: transparent">
                <span>kinsing</span>
              </el-header>
              <el-main>
                <img
                  src="../assets/dangerous.png"
                  style="width: 110px; height: auto"
                />
                <p>危险等级:1/2/3/4/5</p>
              </el-main>
            </el-container>
          </el-card>
        </el-col>
        <el-col :span="5" class="column-bg">
          <el-card class="shadow-card">
            <el-container>
              <el-header style="background: transparent">
                <span>IOC反馈</span>
              </el-header>
              <el-main>
                <div v-for="(item, index) in threatGroups" :key="index">
                  <p>分类: {{ item.category }}</p>
                  <p>首次发现时间: {{ item.discoveryDate }}</p>
                  <p>攻击目标: {{ item.attackTarget }}</p>
                  <p>分发方式: {{ item.distributionMethod }}</p>
                </div>
              </el-main>
            </el-container>
          </el-card>
        </el-col>
        <el-col :span="5" class="column-bg">
          <el-card class="shadow-card">
            <el-container>
              <el-header style="background: transparent">
                <span>威胁概述</span>
              </el-header>
              <el-main><p>(如域名解析,数字签名,WHOIS等)</p> </el-main>
            </el-container>
          </el-card>
        </el-col>
        <el-col :span="5" class="column-bg">
          <el-card class="shadow-card">
            <el-container>
              <el-header style="background: transparent">
                <span>关联分析</span>
              </el-header>
              <el-main><p>(如关联IP,关联域名,关联漏洞等)</p> </el-main>
            </el-container>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Header from "./Header.vue";
import { Typeit } from "../utils/plug.js";

export default {
  components: {
    Header,
  },
  data() {
    return {
      threatGroups: [
        {
          category: "APT组织",
          discoveryDate: "2021-01-01",
          attackTarget: "政府机构",
          distributionMethod: "邮件附件",
        },
      ],
    };
  },
  mounted() {
    //页面元素加载完成
    var that = this;
    var text = "威胁情报分析"; 
    var timer = setTimeout(function () {
      Typeit(that.$store.state.themeObj.user_start, "#printer", text); //打字机效果
      clearTimeout(timer);
    }, 500);
  },
};
</script>

<style scoped>
.content {
  margin-top: 80px;
}
.row {
  display: flex;
  justify-content: space-evenly;
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
  text-align: center;
  border-radius: 8px; /* 边框圆角 */
  font-size: large;
}

.shadow-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* 使内容分散对齐 */
  height: 100%; /* 卡片填充整个列的高度 */
  border: 1px solid #ddd; /* 边框 */
  border-radius: 8px; /* 边框圆角 */
  /* 基础阴影效果 */
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.shadow-card:hover {
  transform: translateY(-5px); /* 使元素向上移动 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 增加阴影 */
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); /* 悬停时的阴影效果 */
  background-image: linear-gradient(
    to right,
    #3498db,
    #9b59b6
  ); /* 渐变背景色 */
}
.mx-1 {
  margin-left: 10px;
  margin-right: 10px;
  font-size: x-large;
}
.row-bg {
  display: flex;
  margin: 20px;
  display: flex;
  flex-wrap: wrap; /* 如果需要支持多行，这里必须是 wrap */
}
.el-row {
  margin-top: 20px;
}

.column-bg {
  display: flex;
  flex-direction: column;
  flex: 1; /* 让所有列项目都有相同的flex-basis */
  margin: 10px; /* 保持原始的外边距设置 */
}

.el-header > span {
  font-size: 20px; /* 调整文字大小 */
}

.el-header > span:hover {
  background-image: linear-gradient(
    to right,
    #3498db,
    #9b59b6
  ); /* 渐变背景色 */
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
</style>
