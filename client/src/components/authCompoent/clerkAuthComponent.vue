<template>
  <SignedOut>
    <SignInButton mode="modal">
      <el-button :icon="Avatar" text>Login</el-button>
    </SignInButton>
  </SignedOut>
  <SignedIn>
    <UserButton />
  </SignedIn>
</template>

<script setup lang="ts">
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/vue'
import { Avatar } from '@element-plus/icons-vue'
</script>

<style scoped></style>
