<template>
  <el-container class="hero-section">
    <el-row align="middle" justify="space-between" style="width: 100%">
      <el-col class="centered-col">
        <el-container class="left-hero">
          <h4 style="font-size: 1em; color: #bec2c7">Starting at</h4>
          <h1 style="font-size: 4em; width: 500px; font-weight: 800; line-height: 0.9">
            The best Items Collection 2025
          </h1>
          <h3 style="font-family: var(--secondary-font)">
            Exclusive offer <span style="color: yellow">-35%</span>off this week
          </h3>
          <el-button class="shop-now" style="font-weight: 700; padding: 20px; margin-top: 20px">
            Shop Now
            <el-icon style="margin-left: 8px"><ShoppingCart size="large" /></el-icon>
          </el-button>
        </el-container>
        <el-container class="right-hero"> </el-container>
      </el-col>
    </el-row>
  </el-container>
</template>

<script setup lang="ts"></script>

<style scoped>
.shop-now:hover {
  scale: 1.1;
  color: green;
}

.centered-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  height: 100%;
  width: 100%;
}

.left-hero {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
}

.right-hero {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.hero-section {
  background-color: #d9f1e7;
  min-height: 400px;
  margin-top: 80px;
  padding-left: 20%;
  padding-right: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
