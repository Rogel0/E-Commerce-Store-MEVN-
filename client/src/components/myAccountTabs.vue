<template>
  <el-container class="my-account">
    <el-tabs tab-position="left" class="left-aligned-tabs bg custom-tabs">
      <el-tab-pane label="Profile"> </el-tab-pane>
      <el-tab-pane label="Banks & Cards">Banks & Cards</el-tab-pane>
      <el-tab-pane label="Addresses">Addresses</el-tab-pane>
      <el-tab-pane label="Change Password">Change Password</el-tab-pane>
      <el-tab-pane label="Privacy Settings">Privacy Settings</el-tab-pane>
      <el-tab-pane label="Notifications Settings">Notification Settings</el-tab-pane>
    </el-tabs>
  </el-container>
</template>

<script setup lang="ts">
import { useUser } from '@clerk/vue'

const { user } = useUser()
</script>

<style scoped>
.my-account {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.bg {
  background-color: #ffffff;
}

:deep(.el-tabs--left .el-tabs__item.is-left, .el-tabs--right .el-tabs__item.is-left) {
  justify-content: flex-start;
  align-items: center;
}

:deep(.el-tabs__item) {
  width: 100% !important;
  box-sizing: border-box;
  justify-content: flex-start;
  align-items: center;
  display: flex;
}

:deep(.el-tabs__nav) {
  width: 100%;
}

:deep(.el-tabs__nav-scroll) {
  width: 300px;
  background-color: #ffffff !important;
}

.custom-tabs {
  width: 1400px;
  height: 700px;
}
</style>
