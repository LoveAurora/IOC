<template>
  <div>
    <Header />
    <div class="underheadbox">
      <el-container>
        <el-header id="printer">威胁团体</el-header>
      </el-container>

      <el-row justify="center" align="middle" class="search-row">
        <el-col :span="4" class="center-col">
          <el-select v-model="selectedRegion" placeholder="选择地区">
            <el-option
              v-for="item in regions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="4" class="center-col">
          <el-select v-model="selectedCategory" placeholder="选择分类">
            <el-option
              v-for="item in categories"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="4" class="center-col">
          <el-input
            v-model="searchText"
            placeholder="输入名称或别名"
          ></el-input>
        </el-col>
        <el-col :span="2" class="center-col">
          <el-button type="primary" icon="el-icon-search" v-on:click="print"
            >搜索</el-button
          >
        </el-col>
      </el-row>
      <el-row class="content">
        <el-col class="col" :span="5" v-for="item in items" :key="item.id">
          <span>{{ item.label }}</span>
          <h2 style="margin-top: 10px">{{ item.title }}</h2>
          <div class="details">
            <p><strong>近期活跃度:</strong> {{ item.activity }}</p>
            <p><strong>疑似来源:</strong> {{ item.source }}</p>
            <p><strong>披露时间:</strong> {{ item.disclosureDate }}</p>
            <p><strong>关联IOC:</strong> {{ item.ioc }}</p>
            <p><strong>简介:</strong> {{ item.description }}</p>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Header from "./Header.vue";
import { Typeit } from "../utils/plug.js";
export default {
  name: "ThreatGang",
  components: {
    Header,
  },
  data() {
    return {
      selectedRegion: "",
      selectedCategory: "",
      searchText: "",
      items: [
        {
          id: 1,
          label: "标签1",
          title: "标题1",
          activity: "活跃度1",
          source: "来源1",
          disclosureDate: "披露时间1",
          ioc: "IOC1",
          description: "描述1",
        },
        {
          id: 2,
          label: "标签2",
          title: "标题2",
          activity: "活跃度2",
          source: "来源2",
          disclosureDate: "披露时间2",
          ioc: "IOC2",
          description: "描述2",
        },
        {
          id: 3,
          label: "标签3",
          title: "标题3",
          activity: "活跃度3",
          source: "来源3",
          disclosureDate: "披露时间3",
          ioc: "IOC3",
          description: "描述3",
        },
        {
          id: 4,
          label: "标签4",
          title: "标题4",
          activity: "活跃度4",
          source: "来源4",
          disclosureDate: "披露时间4",
          ioc: "IOC4",
          description: "描述4",
        },
      ],
      categories: [
        { value: "APT组织", label: "APT组织" },
        { value: "软件家族", label: "软件家族" },
        { value: "组织团伙", label: "组织团伙" },
        { value: "威胁事件", label: "威胁事件" },
        // 添加更多分类...
      ],
      regions: [
        { value: "东亚", label: "东亚" },
        { value: "东南亚", label: "东南亚" },
        { value: "东欧", label: "东欧" },
        { value: "中东", label: "中东" },
        { value: "中东地区", label: "中东地区" },
        { value: "乌兹别克斯坦", label: "乌兹别克斯坦" },
        { value: "伊朗", label: "伊朗" },
        { value: "俄罗斯", label: "俄罗斯" },
        { value: "阿富汗", label: "阿富汗" },
        { value: "孟加拉国", label: "孟加拉国" },
        { value: "印度尼西亚", label: "印度尼西亚" },
        { value: "日本", label: "日本" },
        { value: "泰国", label: "泰国" },
        { value: "越南", label: "越南" },
        { value: "老挝", label: "老挝" },
        { value: "菲律宾", label: "菲律宾" },
        { value: "马来西亚", label: "马来西亚" },
        { value: "新加坡", label: "新加坡" },
        { value: "韩国", label: "韩国" },
        { value: "中亚", label: "中亚" },
      ],
    };
  },
  methods: {
    print() {
      console.log(this.selectedRegion, this.selectedCategory, this.searchText);
    },
  },
  mounted() {
    //页面元素加载完成
    var that = this;
    var text = "威胁团伙"; //打字机效果
    var timer = setTimeout(function () {
      Typeit(that.$store.state.themeObj.user_start, "#printer", text); //打字机效果
      // clearTimeout(timer);
    }, 500);
  },
};
</script>

<style scoped>
.underheadbox {
  margin-top: 80px;
}
.details > p {
  margin-top: 10px;
}
/* 首先定义.col元素的基础样式 */
.col {
  text-align: center;
  background-color: #f5f5f5; /* 背景色 */
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* 过渡效果 */
  padding: 10px; /* 内边距 */
  border: 1px solid #ddd; /* 边框 */
  border-radius: 8px; /* 边框圆角 */
  /* 基础阴影效果 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out; /* 平滑的过渡效果 */
  margin-top: 50px;
  overflow: hidden;
}

/* 当鼠标悬停在.col元素上时应用以下样式 */
.col:hover {
  transform: translateY(-7px); /* 使元素向上移动 */ /* 使元素向上移动 */
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); /* 悬停时的阴影效果 */
  background-image: linear-gradient(
    to right,
    #3498db,
    #9b59b6
  ); /* 渐变背景色 */
}

.el-main {
  padding: 16px; /* 内边距 */
  border: 1px solid #ddd; /* 边框 */
  border-radius: 8px; /* 边框圆角 */
  /* 基础阴影效果 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out; /* 平滑的过渡效果 */
}
.filters {
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.content {
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
.center-col {
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-main {
  background-color: #e9eef3;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 10px;
}
/* body > .el-container {
  margin-bottom: 40px;
} */
.search-row {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>
