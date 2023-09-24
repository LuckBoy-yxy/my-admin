<script setup>
import { UserFilled, Lock, View } from '@element-plus/icons'
import { reactive } from 'vue'

const formData = reactive({
  username: '',
  password: ''
})
</script>

<template>
  <div class="login">
    <div class="login-form">
      <div class="form-title">用户登录</div>

      <el-form>
        <el-form-item>
          <span class="svg">
            <el-icon><UserFilled /></el-icon>
          </span>

          <el-input
            name="username"
            type="text"
            placeholder="Please enter your username"
            v-model="formData.username"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <span class="svg">
            <el-icon><Lock /></el-icon>
          </span>

          <el-input
            class="pwd"
            name="password"
            type="password"
            placeholder="Please enter your PIN"
            v-model="formData.password"
          ></el-input>

          <span class="show-pwd">
            <el-icon><View /></el-icon>
          </span>
        </el-form-item>

        <el-button
          type="primary"
          style="width: 100%; margin-top: 30px;"
        >登录</el-button>
      </el-form>
    </div>
  </div>
</template>