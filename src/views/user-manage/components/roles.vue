<script setup>
  import { defineProps, defineEmits, ref, watch } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { ElMessage } from 'element-plus'

  import { roleList } from '@/api/role'
  import { userRoles, updateRole } from '@/api/userManager'
  import { watchSwitchLang } from '@/utils/i18n'

  const emits = defineEmits(['update:modelValue'])
  const props = defineProps({
    modelValue: {
      type: Boolean,
      required: true
    },
    userId: {
      type: String,
      required: true
    }
  })

  const allRoleList = ref([])
  const getListData = async () => {
    allRoleList.value = await roleList()
  }
  getListData()
  watchSwitchLang(getListData)

  const userRoleTitleList = ref([])
  const getUserRoles = async () => {
    const res = await userRoles(props.userId)
    userRoleTitleList.value = res.role.map(item => item.title)
  }

  const i18n = useI18n()
  const onConfirm = async () => {
    const roles = userRoleTitleList.value.map(title => {
      return allRoleList.value.find(role => role.title === title)
    })

    await updateRole(props.userId, roles)
    ElMessage.success(i18n.t('msg.role.updateRoleSuccess'))

    closed()
  }

  const closed = () => {
    emits('update:modelValue', false)
    userRoleTitleList.value = []
  }

  watch(() => props.userId, newVal => {
    if (newVal)  getUserRoles()
  })
</script>

<template>
  <el-dialog
    :title="$t('msg.excel.roleDialogTitle')"
    :model-value="modelValue"
    @close="closed"
  >
    <el-checkbox-group v-model="userRoleTitleList">
      <el-checkbox
        v-for="item in allRoleList"
        :key="item.id"
        :label="item.title"
      ></el-checkbox>
    </el-checkbox-group>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.universal.cancel') }}</el-button>
        <el-button type="primary" @click="onConfirm">{{
          $t('msg.universal.confirm')
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>

</style>