import { getPayload } from 'payload'
import config from '../payload.config.js'

let cachedPayload: any = null

export const initializePayload = async () => {
  if (!cachedPayload) {
    cachedPayload = await getPayload({
      config,
    })
  }
  
  return cachedPayload
}
