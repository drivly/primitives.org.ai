import { getPayload } from 'payload'
import config from '../payload.config'

let cachedPayload: any = null

export const initializePayload = async () => {
  if (!cachedPayload) {
    cachedPayload = await getPayload({
      config,
      local: process.env.NODE_ENV === 'development',
    })
  }
  
  return cachedPayload
}
