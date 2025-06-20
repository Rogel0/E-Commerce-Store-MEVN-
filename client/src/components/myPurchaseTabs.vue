<template>
  <el-container class="my-purchase">
    <el-tabs stretch>
      <el-input
        size="large"
        class="search"
        :prefix-icon="Search"
        placeholder="You can search by Seller Name, Order ID or Product name"
      />
      <el-tab-pane label="All">
        <div></div>
      </el-tab-pane>
      <el-tab-pane label="To Pay">To Pay</el-tab-pane>
      <el-tab-pane label="To Ship">To Ship</el-tab-pane>
      <el-tab-pane label="To Receive">To Receive</el-tab-pane>
      <el-tab-pane label="Completed">Completed</el-tab-pane>
      <el-tab-pane label="Cancelled">Cancelled</el-tab-pane>
      <el-tab-pane label="Retrun Refund">Return Refund</el-tab-pane>
    </el-tabs>
  </el-container>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
</script>

<style scoped>
.my-purchase {
  display: flex;
  justify-content: center;
  padding-top: 5%;
  height: 100vh;
}

.el-tabs {
  width: 1400px;
}

.search {
  margin-bottom: 20px;
}

:deep(.el-tabs__nav-scroll) {
  background-color: #ffffff;
  height: 60px;
}
:deep(.el-tabs__nav) {
  height: 100%;
}
:deep(.el-tabs__item) {
  font-size: 1em;
  height: 100%;
  display: flex;
  align-items: center;
}
</style>
