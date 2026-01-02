import { onMounted, onUnmounted, reactive } from 'vue'
import { debounce } from '@/function/common'
import type { DeviceInfo } from '@/stores/device'



function parseOS(ua: string): { name: string; version?: string } {
  ua = ua || ''
  if (/windows nt/i.test(ua)) {
    const map: Record<string, string> = {
      '10.0': '10',
      '6.3': '8.1',
      '6.2': '8',
      '6.1': '7',
      '6.0': 'Vista',
      '5.1': 'XP',
    }
    const m = ua.match(/Windows NT ([0-9.]+)/i)
    const ver = m?.[1]
    return { name: 'Windows', version: ver ? map[ver] || ver : undefined }
  }
  if (/android/i.test(ua)) {
    const m = ua.match(/Android\s([0-9.]+)/i)
    return { name: 'Android', version: m?.[1] }
  }
  if (/iphone|ipad|ipod/i.test(ua)) {
    const m = ua.match(/OS\s([0-9_]+)/i)
    return { name: 'iOS', version: m?.[1]?.replace(/_/g, '.') }
  }
  if (/mac os x/i.test(ua)) {
    const m = ua.match(/Mac OS X\s([0-9_]+)/i)
    return { name: 'macOS', version: m?.[1]?.replace(/_/g, '.') }
  }
  if (/linux/i.test(ua)) return { name: 'Linux' }
  return { name: 'Unknown' }
}

function parseBrowser(ua: string): { name: string; version: string } {
  ua = ua || ''
  // Edge (Chromium)
  let m = ua.match(/Edg\/(\d+\.\d+\.\d+\.\d+|\d+\.\d+)/)
  if (m) return { name: 'Edge', version: m[1] }
  // Chrome (ignore Edge/Opera)
  m = ua.match(/Chrome\/(\d+\.\d+\.\d+\.\d+|\d+\.\d+)/)
  if (m && !/OPR\//.test(ua) && !/Edg\//.test(ua)) return { name: 'Chrome', version: m[1] }
  // Firefox
  m = ua.match(/Firefox\/(\d+\.\d+)/)
  if (m) return { name: 'Firefox', version: m[1] }
  // Safari (Version/x.y Safari)
  m = ua.match(/Version\/(\d+\.\d+(?:\.\d+)?)\s+Safari\//)
  if (m && /Safari\//.test(ua) && !/Chrome\//.test(ua)) return { name: 'Safari', version: m[1] }
  // Opera
  m = ua.match(/OPR\/(\d+\.\d+)/)
  if (m) return { name: 'Opera', version: m[1] }
  return { name: 'Unknown', version: '' }
}

function detectArchitecture(ua: string): string | undefined {
  if ((navigator as any).userAgentData?.architecture) return (navigator as any).userAgentData.architecture
  if (/arm64|aarch64/i.test(ua)) return 'arm64'
  if (/arm/i.test(ua)) return 'arm'
  if (/wow64|win64|x64|amd64/i.test(ua)) return 'x64'
  if (/i686|x86/i.test(ua)) return 'x86'
  return undefined
}

async function estimateRefreshRate(durationMs = 800): Promise<number | null> {
  if (typeof window === 'undefined' || typeof requestAnimationFrame === 'undefined') return null
  return new Promise((resolve) => {
    const stamps: number[] = []
    let start = performance.now()
    let last = start

    function step(ts: number) {
      stamps.push(ts - last)
      last = ts
      if (ts - start >= durationMs) {
        const valid = stamps.filter((d) => d > 0)
        if (!valid.length) return resolve(null)
        const avg = valid.reduce((a, b) => a + b, 0) / valid.length
        const hz = Math.round(1000 / avg)
        // Snap to common refresh rates
        const candidates = [60, 75, 90, 100, 120, 144, 165, 240]
        let closest = hz
        let minDiff = Infinity
        for (const c of candidates) {
          const diff = Math.abs(c - hz)
          if (diff < minDiff) { minDiff = diff; closest = c }
        }
        resolve(closest)
      } else {
        requestAnimationFrame(step)
      }
    }
    requestAnimationFrame(step)
  })
}

interface Options {
  debounceTime?: number
}

export function useDetectDevice(callback: (device: DeviceInfo) => void, options: Options = {}) {
  const { debounceTime = 200 } = options
  const device = reactive<DeviceInfo>({
    isMobile: false,
    platform: typeof navigator !== 'undefined' ? (navigator as any).userAgentData?.platform || navigator.platform || '' : '',
    os: { name: 'Unknown' },
    cpu: { architecture: undefined, logicalCores: undefined, deviceMemoryGB: null },
    browser: { name: 'Unknown', version: '' },
    screen: {
      width: 0,
      height: 0,
      availWidth: 0,
      availHeight: 0,
      pixelRatio: 1,
      resolution: '0x0',
      colorDepth: 24,
    },
    viewport: { width: 0, height: 0 },
    refreshRateHz: null,
  })

  const resizeHandler = debounce(() => {
    device.viewport.width = window.innerWidth
    device.viewport.height = window.innerHeight
    device.isMobile = device.viewport.width < 768
    // screen info (won't change often but update on resize for safety)
    device.screen.width = window.screen.width
    device.screen.height = window.screen.height
    device.screen.availWidth = window.screen.availWidth
    device.screen.availHeight = window.screen.availHeight
    device.screen.pixelRatio = window.devicePixelRatio || 1
    device.screen.resolution = `${window.screen.width}x${window.screen.height}`
    device.screen.colorDepth = window.screen.colorDepth || 24
    callback(device)
  }, debounceTime)

  const visibilityHandler = debounce(() => {
    // 当页面从后台回到前台时，可能刷新率会改变（外接显示器/系统设置变更）
    if (document.visibilityState === 'visible') {
      estimateRefreshRate().then((hz) => (device.refreshRateHz = hz))
    }
  }, debounceTime)

  const initStaticInfo = async () => {
    const ua = typeof navigator !== 'undefined' ? navigator.userAgent : ''
    device.os = parseOS(ua)
    device.browser = parseBrowser(ua)
    device.cpu.architecture = detectArchitecture(ua)
    device.cpu.logicalCores = typeof navigator !== 'undefined' ? navigator.hardwareConcurrency : undefined
    device.cpu.deviceMemoryGB = typeof (navigator as any).deviceMemory === 'number' ? (navigator as any).deviceMemory : null
    resizeHandler()
    device.refreshRateHz = await estimateRefreshRate()
  }

  onMounted(() => {
    initStaticInfo()
    window.addEventListener('resize', resizeHandler, { passive: true })
    document.addEventListener('visibilitychange', visibilityHandler)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', resizeHandler)
    document.removeEventListener('visibilitychange', visibilityHandler)
  })

  const refresh = () => initStaticInfo()

  return { device, refresh }
}
