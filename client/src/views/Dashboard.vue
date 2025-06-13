<template>
  <div class="common-layout">
    <el-container>
      <el-aside
        width="200px"
        :style="{
          backgroundColor: COLORS.primary,
          height: '100vh',
          borderRadius: '0 30px 30px 0',
          padding: '10px',
          position: 'relative',
        }"
      >
        <!-- <div :style="{ display: 'flex', alignItems: 'center', marginBottom: '20px' }">
          <el-image
            :src="owner"
            fit="cover"
            :style="{ borderRadius: '99px', width: '50px', marginRight: '10px' }"
          />
          <el-text :style="{ fontFamily: 'bold', color: COLORS.secondary, fontSize: '20px' }">
            Owner
          </el-text>
        </div> -->

        <div :style="{ display: 'flex', alignItems: 'center', gap: '10px' }">
          <Shop :style="{ color: COLORS.secondary, height: '26px', width: '26px' }" />
          <el-text :style="{ fontFamily: 'bold', color: COLORS.secondary, fontSize: '26px' }">
            MatStore
          </el-text>
        </div>

        <div
          :style="{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            marginTop: '10px',
            backgroundColor: COLORS.secondary,
            padding: '10px',
            borderRadius: '10px',
          }"
        >
          <div
            :style="{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }"
            @click="manageUsers"
          >
            <UserFilled :style="{ color: COLORS.primary, height: '16px', width: '16px' }" />
            <el-text :style="{ fontFamily: 'bold', color: COLORS.primary, fontSize: '16px' }">
              Users
            </el-text>
          </div>
          <el-divider :style="{ margin: 0 }" />
          <div
            :style="{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }"
            @click="manageProducts"
          >
            <Menu :style="{ color: COLORS.primary, height: '16px', width: '16px' }" />
            <el-text :style="{ fontFamily: 'bold', color: COLORS.primary, fontSize: '16px' }">
              Products
            </el-text>
          </div>
        </div>

        <div
          :style="{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            position: 'absolute',
            bottom: '20px',
            left: '10px',
          }"
          @click="onLogout"
        >
          <ArrowLeftBold :style="{ color: COLORS.secondary, height: '16px', width: '16px' }" />
          <el-text :style="{ fontFamily: 'bold', color: COLORS.secondary, fontSize: '16px' }">
            Logout
          </el-text>
        </div>
      </el-aside>
      <el-container>
        <el-header
          :style="{
            backgroundColor: COLORS.secondary,
            margin: '10px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }"
        >
          <el-text
            v-if="manage === 'users'"
            :style="{ fontFamily: 'bold', color: COLORS.primary, fontSize: '24px' }"
          >
            Manage Users
          </el-text>

          <el-text
            v-if="manage === 'products'"
            :style="{ fontFamily: 'bold', color: COLORS.primary, fontSize: '24px' }"
          >
            Manage Products
          </el-text>
        </el-header>
        <el-main :style="{ backgroundColor: COLORS.primary, margin: '10px', borderRadius: '10px' }">
          <div v-if="manage === 'users'">
            <form @submit.prevent="addUser">
              <input
                v-model="newUser"
                placeholder="New User Name"
                :style="{
                  border: '1px solid ' + COLORS.secondary,
                  borderRadius: '4px',
                  padding: '8px',
                  fontFamily: 'regular',
                }"
              />
              <button
                type="submit"
                :style="{
                  backgroundColor: COLORS.secondary,
                  color: COLORS.primary,
                  border: 'none',
                  borderRadius: '4px',
                  padding: '10px',
                  cursor: 'pointer',
                  fontFamily: 'bold',
                }"
              >
                Add User
              </button>
            </form>
            <el-table :data="users" style="width: 100%">
              <el-table-column
                prop="name"
                label="User Name"
                width="200"
                :style="{ fontFamily: 'regular', color: COLORS.secondary }"
              >
              </el-table-column>
              <el-table-column label="Actions" width="200">
                <template #default="{ row, $index }">
                  <button @click="removeUser($index)">Remove</button>
                </template>
              </el-table-column>
            </el-table>
          </div>

          <div v-else-if="manage === 'products'">
            <form @submit.prevent="addProduct">
              <input
                v-model="newProduct.name"
                placeholder="Product Name"
                :style="{
                  border: '1px solid ' + COLORS.secondary,
                  borderRadius: '4px',
                  padding: '8px',
                  fontFamily: 'regular',
                }"
              />
              <input
                v-model="newProduct.price"
                placeholder="Product Price"
                type="number"
                :style="{
                  border: '1px solid ' + COLORS.secondary,
                  borderRadius: '4px',
                  padding: '8px',
                  fontFamily: 'regular',
                }"
              />
              <button
                type="submit"
                :style="{
                  backgroundColor: COLORS.secondary,
                  color: COLORS.primary,
                  border: 'none',
                  borderRadius: '4px',
                  padding: '10px',
                  cursor: 'pointer',
                  fontFamily: 'bold',
                }"
              >
                Add Product
              </button>
            </form>
            <el-table :data="products" :style="{ width: '100%' }">
              <el-table-column prop="name" label="Product Name" width="200"></el-table-column>
              <el-table-column prop="price" label="Product Price" width="200"></el-table-column>
              <el-table-column label="Actions" width="200">
                <template #default="{ row, $index }">
                  <button @click="removeProduct($index)">Remove</button>
                  <button @click="editProduct($index)">Edit</button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElLoading } from 'element-plus'
import { useUserStore } from '@/stores/useUserStore'
import { useRouter } from 'vue-router'
import { COLORS } from '@/assets/theme'

const userStore = useUserStore()
const newUser = ref('')
const users = ref<{ name: string }[]>([])
const newProduct = ref({ name: '', price: 0 })
const products = ref<{ name: string; price: number }[]>([])
const manage = ref('users')
const route = useRouter()

const manageUsers = () => {
  manage.value = 'users'
}
const manageProducts = () => {
  manage.value = 'products'
}

onMounted(() => {
  const storedUsers = localStorage.getItem('users')
  const storedProducts = localStorage.getItem('products')
  if (storedUsers) users.value = JSON.parse(storedUsers)
  if (storedProducts) products.value = JSON.parse(storedProducts)
})

const addUser = () => {
  if (newUser.value.trim()) {
    users.value.push({ name: newUser.value })
    localStorage.setItem('users', JSON.stringify(users.value))
    newUser.value = ''
  }
}

const removeUser = (index: number) => {
  users.value.splice(index, 1)
  localStorage.setItem('users', JSON.stringify(users.value))
}

const addProduct = () => {
  if (newProduct.value.name.trim() && newProduct.value.price > 0) {
    products.value.push({ ...newProduct.value })
    localStorage.setItem('products', JSON.stringify(products.value))
    newProduct.value = { name: '', price: 0 }
  }
}

const removeProduct = (index: number) => {
  products.value.splice(index, 1)
  localStorage.setItem('products', JSON.stringify(products.value))
}

const editProduct = (index: number) => {
  const product = products.value[index]
  const updatedName = prompt('Enter new name:', product.name)
  const updatedPrice = prompt('Enter new price:', product.price.toString())
  if (updatedName && updatedPrice) {
    products.value[index] = { name: updatedName, price: parseFloat(updatedPrice) }
    localStorage.setItem('products', JSON.stringify(products.value))
  }
}

const onLogout = () => {
  const loading = ElLoading.service({
    lock: true,
    text: 'Logging out...',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  setTimeout(() => {
    loading.close()
    userStore.handleLogout()
    window.location.reload()
  }, 2000)
}
</script>

<style scoped>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.demo-tabs .custom-tabs-label .el-icon {
  vertical-align: middle;
}
.demo-tabs .custom-tabs-label span {
  vertical-align: middle;
  margin-left: 4px;
}
form {
  margin-bottom: 16px;
}
input {
  margin-right: 8px;
}
button {
  margin-left: 8px;
}
</style>
