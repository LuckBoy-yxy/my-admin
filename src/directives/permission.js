import store from '@/store'

function checkPermission(el, binding) {
  const { value } = binding
  const points = store.getters.userInfo.permission.points

  if (value && value instanceof Array) {
    const hasPermission = value.some(item => {
      return points.includes(item)
    })

    if (!hasPermission) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  } else {
    throw new Error('v-permission value is ["admin","editor"...]')
  }
}

export default {
  mounted(el, binding) {
    checkPermission(el, binding)
  },
  update(el, binding) {
    checkPermission(el, binding)
  }
}