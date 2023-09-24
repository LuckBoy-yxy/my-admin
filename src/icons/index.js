import SvgIcon from '@/components/SvgIcon/index.vue'

const svgRequire = require.context('./svg', false, /\.svg$/)
svgRequire.keys().forEach(svgPath => svgRequire(svgPath))

const installIcons = app => {
  app.component('SvgIcon' ,SvgIcon)
}

export default installIcons