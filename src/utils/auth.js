import { TIME_STAMP, TOKEN_TIMEOUT_VALUE } from '@/constant'
import { setItem, getItem } from './storage.js'

export const getTimeStamp = () => {
  return getItem(TIME_STAMP)
}

export const setTimeStamp = () => {
  return setItem(TIME_STAMP, Date.now())
}

export const isCheckTimeout = () => {
  const currentTime = Date.now()
  const timeStamp = getTimeStamp()
  return currentTime - timeStamp > TOKEN_TIMEOUT_VALUE
}