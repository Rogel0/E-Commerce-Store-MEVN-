<template>
  <el-dialog
    v-model="uiState.loginDialogOpen"
    @close="uiState.loginDialogOpen = false"
    align-center
    width="450"
    height="600"
  >
    <el-tabs stretch>
      <el-tab-pane label="Login">
        <el-form
          :model="loginForm"
          :rules="loginRules"
          ref="loginFormRef"
          style="padding-inline: 20px; padding-top: 10px; padding-bottom: 20px"
        >
          <el-form-item prop="phoneOrEmail">
            <el-input
              v-model="loginForm.phoneOrEmail"
              placeholder="Please enter your Phone or Email"
              class="input"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              placeholder="Please enter your password"
              class="input"
              show-password
            />
          </el-form-item>
          <el-col align="end" style="padding-bottom: 20px">
            <el-text style="width: 100%; text-align: end"><a href="">Forgot Password?</a></el-text>
          </el-col>

          <el-row>
            <el-col align="center">
              <el-button style="width: 100%" class="login-btn" @click="onLogin">Login</el-button>
            </el-col>
            <el-col style="padding-top: 40px" align="center">
              <el-text>Or, login with</el-text>
            </el-col>
            <el-row style="width: 100%; margin-top: 20px">
              <el-col :span="12" align="center">
                <el-image
                  :src="Google"
                  alt="Google"
                  style="width: 24px; vertical-align: middle; margin-right: 8px"
                />
                <el-text>Google</el-text>
              </el-col>
              <el-col :span="12" align="center">
                <el-image
                  :src="Facebook"
                  alt="Facebook"
                  style="width: 24px; vertical-align: middle; margin-right: 8px"
                />
                <el-text>Facebook</el-text>
              </el-col>
            </el-row>
          </el-row>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="Signup">
        <el-form
          :model="registerForm"
          :rules="rules"
          ref="registerFormRef"
          style="padding-inline: 20px; padding-top: 10px; padding-bottom: 20px"
        >
          <el-form-item prop="fullName">
            <el-input
              v-model="registerForm.fullName"
              placeholder="Please enter your Full Name"
              class="input"
            />
          </el-form-item>
          <el-form-item prop="email">
            <el-input
              v-model="registerForm.email"
              placeholder="Please enter your Email Address"
              class="input"
            />
          </el-form-item>
          <el-form-item prop="phoneNumber">
            <el-input
              v-model="registerForm.phoneNumber"
              placeholder="Please enter your Phone Number"
              class="input"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="registerForm.password"
              placeholder="Please enter your Password"
              class="input"
              show-password
            />
          </el-form-item>
          <el-row>
            <el-col align="center">
              <el-button style="width: 100%" class="login-btn" @click="onRegister"
                >Register</el-button
              >
            </el-col>

            <el-col style="padding-top: 40px" align="center">
              <el-text>Or, login with</el-text>
            </el-col>
            <el-row style="width: 100%; margin-top: 20px">
              <el-col :span="12" align="center">
                <el-image
                  :src="Google"
                  alt="Google"
                  style="width: 24px; vertical-align: middle; margin-right: 8px"
                />
                <el-text>Google</el-text>
              </el-col>
              <el-col :span="12" align="center">
                <el-image
                  :src="Facebook"
                  alt="Facebook"
                  style="width: 24px; vertical-align: middle; margin-right: 8px"
                />
                <el-text>Facebook</el-text>
              </el-col>
            </el-row>
          </el-row>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script setup lang="ts">
import Google from '@/assets/svg/google.svg'
import Facebook from '@/assets/svg/facebook.svg'
import type { FormRules, FormInstance } from 'element-plus'
import { ref } from 'vue'
import { useUserStore } from '@/stores/useUserStore'
import { ElMessage, ElLoading } from 'element-plus'
import { useRouter } from 'vue-router'
import { useUiStateStore } from '@/stores/useUiStateStore'

const uiState = useUiStateStore()

const router = useRouter()
const userStore = useUserStore()

const storeOwner = ref({
  fullName: 'Store Owner',
  email: 'owner@gmail.com',
  phoneNumber: '09613835297',
  password: 'owner123',
})

const loginForm = ref({
  phoneOrEmail: '',
  password: '',
})

const registerForm = ref({
  fullName: '',
  email: '',
  phoneNumber: '',
  password: '',
})

const registerFormRef = ref<FormInstance>()
const loginFormRef = ref<FormInstance>()

const rules = ref<FormRules>({
  fullName: [
    { required: true, message: 'Full Name is required', trigger: 'blur' },
    { min: 3, message: 'Full Name must be at least 3 characters', trigger: 'blur' },
  ],
  email: [
    { required: true, message: 'Email is required', trigger: 'blur' },
    { type: 'email', message: 'Email must be valid', trigger: ['blur', 'change'] },
  ],
  phoneNumber: [
    { required: true, message: 'Phone Number is required', trigger: 'blur' },
    { pattern: /^\d{10,15}$/, message: 'Phone Number must be 10-15 digits', trigger: 'blur' },
  ],
  password: [
    { required: true, message: 'Password is required', trigger: 'blur' },
    { min: 6, message: 'Password must be at least 6 characters', trigger: 'blur' },
  ],
})

const loginRules = ref<FormRules>({
  phoneOrEmail: [
    { required: true, message: 'Phone or Email is required', trigger: 'blur' },
    { min: 3, message: 'Must be at least 3 characters', trigger: 'blur' },
  ],
  password: [
    { required: true, message: 'Password is required', trigger: 'blur' },
    { min: 6, message: 'Password must be at least 6 characters', trigger: 'blur' },
  ],
})

const onRegister = () => {
  registerFormRef.value?.validate((valid) => {
    const loading = ElLoading.service({
      lock: true,
      text: 'Registering...',
      background: 'rgba(0, 0, 0, 0.7)',
    })
    setTimeout(() => {
      loading.close()
    }, 2000)
    setTimeout(() => {
      if (!valid) return
      const user = {
        userId: Date.now(),
        email: registerForm.value.email,
        phoneNumber: Number(registerForm.value.phoneNumber),
        fullName: registerForm.value.fullName,
        password: registerForm.value.password,
      }

      userStore.handleRegister(user)
      uiState.loginDialogOpen = false
      ElMessage.success('Registration successful! You can now log in.')
      resetRegisterForm()
    }, 2000)
  })
}

const resetRegisterForm = () => {
  registerForm.value.email = ''
  registerForm.value.phoneNumber = ''
  registerForm.value.fullName = ''
  registerForm.value.password = ''
}

const onLogin = () => {
  loginFormRef.value?.validate((valid) => {
    if (!valid) return

    if (
      loginForm.value.phoneOrEmail === storeOwner.value.email &&
      loginForm.value.password === storeOwner.value.password
    ) {
      const user = {
        userId: Date.now(),
        email: storeOwner.value.email,
        phoneNumber: Number(storeOwner.value.phoneNumber),
        fullName: storeOwner.value.fullName,
        password: storeOwner.value.password,
      }
      const token = 'mock-token-store-owner-' + Date.now()
      userStore.handleLogin(user, token)
      uiState.loginDialogOpen = false
      ElMessage.success('Store owner login successful!')
      router.push('/dashboard')
      return
    }

    const storedUser = JSON.parse(localStorage.getItem('user') || 'null')
    if (!storedUser) {
      ElMessage.error('No registered user found. Please sign up first.')
      return
    }
    const isEmail = loginForm.value.phoneOrEmail.includes('@')
    const isMatch =
      ((isEmail && loginForm.value.phoneOrEmail === storedUser.email) ||
        (!isEmail && Number(loginForm.value.phoneOrEmail) === storedUser.phoneNumber)) &&
      loginForm.value.password === storedUser.password
    if (!isMatch) {
      ElMessage.error('Invalid credentials. Please try again.')
      return
    }
    // Credentials correct, log in
    const user = {
      userId: storedUser.userId,
      email: storedUser.email,
      phoneNumber: storedUser.phoneNumber,
      fullName: storedUser.fullName,
      password: storedUser.password,
    }
    const token = 'mock-token-' + Date.now()
    userStore.handleLogin(user, token)
    uiState.loginDialogOpen = false
    ElMessage.success('Login successful!')
  })
}
</script>

<style scoped>
* {
  font-family: 'Poppins', sans-serif;
}

:deep(.el-tabs__active-bar) {
  display: none;
}
:deep(.el-tabs__nav-wrap::after) {
  display: none;
}

:deep(.el-tabs__nav) {
  position: relative;
}
:deep(.el-tabs__nav)::before {
  content: '';
  position: absolute;
  top: 20%;
  bottom: 20%;
  left: 50%;
  width: 1px;
  background: #e5e7ea;
  transform: translateX(-50%);
  z-index: 1;
}

:deep(.is-active) {
  color: #39b97e !important;
  font-weight: 600 !important;
}

:deep(.el-tabs__item) {
  font-family: 'Poppins', sans-serif;
  color: #aeafb3;
  font-weight: 600;
}

.input {
  /* box-shadow: 2px 2px 8px 0 #39b97e33; */
  border-radius: 5px;
  height: 50px;
}

.login-btn {
  height: 45px;
  color: white;
  background-color: #f57224;
  font-size: 1.2em;
  font-weight: 600;
  border-radius: 10px;
}

.whatsapp-btn {
  background-color: none;
  height: 45px;
  font-weight: 600;
  border-radius: 10px;
  border: 1px solid #f57224;
  color: #f57224;
}

a {
  text-decoration: none;
  color: #aeafb3;
}

.signup {
  color: #68a0ff !important;
}
</style>
