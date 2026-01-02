import { onMounted, reactive, toRaw, toRefs } from 'vue'
import { defineStore } from 'pinia'


export interface DeviceInfo {
  isMobile: boolean
  platform: string
  os: { name: string; version?: string }
  cpu: { architecture?: string; logicalCores?: number; deviceMemoryGB?: number | null }
  browser: { name: string; version: string }
  screen: {
    width: number
    height: number
    availWidth: number
    availHeight: number
    pixelRatio: number
    resolution: string // e.g. 1920x1080 (physical CSS pixels)
    colorDepth: number
  }
  viewport: { width: number; height: number }
  refreshRateHz: number | null
}


export const useDeviceStore = defineStore('device', () => {
  const device = reactive<DeviceInfo>({
    isMobile: window.innerWidth < 768,
    platform: navigator.platform,
    os: { name: '', version: '' },
    cpu: { architecture: '', logicalCores: 0, deviceMemoryGB: null },
    browser: { name: '', version: '' },
    screen: { width: 0, height: 0, availWidth: 0, availHeight: 0, pixelRatio: 0, resolution: '', colorDepth: 0 },
    viewport: { width: 0, height: 0 },
    refreshRateHz: null,
  })

  const setDevice = (newDevice: Partial<DeviceInfo>) => {
    Object.assign(device, newDevice)
  }

    onMounted(() => {
    useDeviceStore().$subscribe(() => {
      localStorage.setItem('device', JSON.stringify(device))
    }, { flush: 'sync' })
  })

  return { ...device, setDevice }
})

