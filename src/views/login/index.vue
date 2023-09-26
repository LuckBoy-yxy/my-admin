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
  <div class="login">
    <div class="login-form">
      <div class="form-title">
        <h3>{{ $t('msg.login.title') }}</h3>
        <LangSelect class="lang-select" />
      </div>

      <el-form
        ref="form"
        :model="formData"
        :rules="loginRules"
        atuocomplete="off"
      >
        <el-form-item prop="username">
          <span class="svg">
            <SvgIcon icon="user" />
          </span>

          <el-input
            name="username"
            type="text"
            :placeholder="$t('msg.login.userPlaceholder')"
            v-model="formData.username"
          ></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <span class="svg">
            <SvgIcon icon="password" />
          </span>

          <el-input
            class="pwd"
            name="password"
            :type="passwordType"
            :placeholder="$t('msg.login.pwdPlaceholder')"
            v-model="formData.password"
          ></el-input>

          <span class="show-pwd" @click="isShowPwd = !isShowPwd">
            <SvgIcon v-if="!isShowPwd" icon="eye" />
            <SvgIcon v-else icon="eye-open" />
          </span>
        </el-form-item>

        <el-button
          type="primary"
          style="width: 100%; margin-top: 10px; margin-bottom: 30px;"
          :loading="loading"
          @click="handleLoginClick"
        >{{ $t('msg.login.loginBtn') }}</el-button>

        <div class="tips" v-html="$t('msg.login.desc')"></div>
      </el-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-color: $bg;

  .login-form {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 520px;
    transform: translate(-50%, -50%);

    .form-title {
      position: relative;
      margin-bottom: 40px;
      text-align: center;
      font-size: 40px;
      color: #fff;
      font-weight: bold;
      :deep(.lang-select) {
        position: absolute;
        top: 19px;
        right: 0;
        padding: 4px;
        font-size: 22px;
        border-radius: 4px;
        background-color: #fff;
        cursor: pointer;
      }
    }
    
    ::v-deep .el-form-item__content {
      position: relative;
      display: flex;
      align-items: center;
      height: 45px;
      color: #454545;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 5px;
      background: rgba(0, 0, 0, 0.1);

      .svg {
        padding: 6px 15px 6px 15px;
        color: $dark_gray;
      }

      input {
        height: 45px;
        color: $light_gray;
        border: 0;
        border-radius: 0;
        background-color: transparent;
        caret-color: $cursor;
      }

      .pwd {
        padding-right: 13px;
      }

      .show-pwd {
        position: absolute;
        right: 10px;
        top: 5px;
        font-size: 16px;
        color: $dark_gray;
        cursor: pointer;
        user-select: none;
      }
    }

    .tips {
      color: #fff;
    }
  }
}
</style>