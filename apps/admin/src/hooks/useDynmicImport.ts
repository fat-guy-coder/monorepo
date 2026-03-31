import { nextTick } from "vue"

export const useDynmicImport = async (path: string) => {
  const { default: data = [] } = await import(path)
  return data
}
