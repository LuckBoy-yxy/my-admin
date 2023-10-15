import request from '@/utils/request'

// 获取累计收益明细数据
export const getChartTrend = () => {
  return request('/chart/trend', 'get')
}

// 获取日历图示数据
export const getChartCalendar = () => {
  return request('/chart/calendar', 'get')
}

// 获取日金额分析图数据
export const getChartTimeAmount = date => {
  return request('/chart/time/amount', 'get', date)
}

// 获取饼图数据
export const getChartPie = () => {
  return request('/chart/pie', 'get')
}

// 获取文档云图数据
export const getChartWordCloud = () => {
  return request('/chart/wordcloud', 'get')
}

// 获取地图可视化数据
export const getChartMap = () => {
  return request('/chart/bmap', 'get')
}

// 获取大区数据
export const getChartRegions = () => {
  return request('/chart/regions', 'get')
}