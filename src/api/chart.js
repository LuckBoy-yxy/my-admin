import request from '@/utils/request'

// 获取累计收益明细数据
export const getChartTrend = () => {
  return request('/chart/trend', 'get')
}

// 获取日历图示数据
export const getChartCalendar = () => {
  return request('/chart/calendar', 'get')
}