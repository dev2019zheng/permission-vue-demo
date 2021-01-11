<template>
  <div class="auth-page">
    <h2>权限控制页面-控制粒度到页面上每个元素</h2>
    <i-row :gutter="15" class="mt-15">
      <i-col :span="12">
        <PanelCard title="测试权限1">
          <div v-has="authCodes[0]">
            <h3>权限元素测试</h3>
            <p>...其他代码</p>
          </div>
        </PanelCard>
      </i-col>
      <i-col :span="12">
        <PanelCard title="测试权限2">
          <div v-has="authCodes[1]">
            <h3>权限元素测试</h3>
            <p>权限代码: [{{ authCodes[1] }}]</p>
          </div>
        </PanelCard>
      </i-col>
      <i-col :span="24" class="mt-15">
        <PanelCard title="报表数据请求权限">
          <div class="pd-24">
            <Table stripe :columns="columns1" :data="data"></Table>
          </div>
        </PanelCard>
      </i-col>
    </i-row>
  </div>
</template>

<script>
import { fetchExampleData } from "@/api/data";

export default {
  name: "AuthPage",
  data() {
    return {
      authCodes: [
        "2A7632FA-D0D8-4C6F-B0DB-20695901E193",
        "7196392F-C6C0-4E5D-BAA9-3BAC15365A0C",
        "873D2E66-68F9-44CE-90F6-CEC00828B3EF"
      ],
      columns1: [
        {
          title: "月份",
          key: "month"
        },
        {
          title: "月营收",
          key: "sum"
        },
        {
          title: "审核人",
          key: "check"
        }
      ],
      data: []
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      // 判断有没有接口请求权限
      if (this.$_has(this.authCodes[2])) {
        // 请求数据
        fetchExampleData().then(list => {
          this.data = list;
        });
      }
    }
  }
};
</script>

<style scoped>
.mt-15 {
  margin-top: 15px;
}

.pd-24 {
  padding: 24px;
}

.pd-12 {
  padding: 12px;
}
</style>
