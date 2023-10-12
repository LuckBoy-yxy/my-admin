<script setup>
  import { reactive, ref, computed } from 'vue'
  import { useStore } from 'vuex'
  import { useRouter } from 'vue-router'
  import { ElMessage } from 'element-plus'
  import { useI18n } from 'vue-i18n'

  import LangSelect from '@/components/LangSelect/index.vue'
  import { validatePwd } from '@/utils/rules'
  import { setTimeStamp } from '@/utils/auth'

  const i18n = useI18n()
  const formData = reactive({
    username: 'super-admin',
    password: '123456'
  })

  const loginRules = reactive({
    username: [
      { required: true, message: i18n.t('msg.login.usernameRule'), trigger: 'blur' }
    ],
    password: [
      { 
        required: true,
        trigger: 'blur',
        validator: validatePwd()
      }
    ]
  })

  const isShowPwd = ref(false)
  const passwordType = computed(() => {
    return isShowPwd.value ? 'text' : 'password'
  })

  const store = useStore()
  const router = useRouter()
  const loading = ref(false)
  const form = ref(null)
  const handleLoginClick = () => {
    form.value.validate(valid => {
      if (!valid) return

      loading.value = true
      store
        .dispatch('user/handleLogin', formData)
        .then(res => {
          if (res.token) {
            ElMessage.success(i18n.t('msg.toast.loginSuccess'))
            setTimeStamp()
            router.push('/')
          }
        })
        .catch(err => {
          console.log(err)
        })
      loading.value = false
    })
  }
</script>

<template>
  <div class="login-container">
    <el-form
      class="login-form"
      ref="form"
      :model="formData"
      :rules="loginRules"
    >
      <div class="title-container">
        <h3 class="title">{{ $t('msg.login.title') }}</h3>
        <lang-select class="lang-select" effect="light"></lang-select>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon="user" />
        </span>
        <el-input
          placeholder="username"
          name="username"
          type="text"
          v-model="formData.username"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon="password" />
        </span>
        <el-input
          placeholder="password"
          name="password"
          :type="passwordType"
          v-model="formData.password"
        />
        <span class="show-pwd">
          <svg-icon
            :icon="isShowPwd ? 'eye-open' : 'eye'"
            @click="isShowPwd = !isShowPwd"
          />
        </span>
      </el-form-item>

      <el-button
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        :loading="loading"
        @click="handleLoginClick"
        >{{ $t('msg.login.loginBtn') }}</el-button
      >

      <div class="tips" v-html="$t('msg.login.desc')"></div>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    ::v-deep .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    ::v-deep .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;
      }
    }
  }

  .tips {
    font-size: 16px;
    line-height: 28px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    ::v-deep .lang-select {
      position: absolute;
      top: 4px;
      right: 0;
      background-color: white;
      font-size: 22px;
      padding: 4px;
      border-radius: 4px;
      cursor: pointer;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>