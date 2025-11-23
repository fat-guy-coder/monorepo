import { message } from 'ant-design-vue'

export const abortController = new AbortController()

export const baseUrl = '/api'

export const contentTypeMap = {
  json: 'application/json',
  formData: 'multipart/form-data',
  urlencoded: 'application/x-www-form-urlencoded',
  binary: 'application/octet-stream',
  text: 'text/plain',
  html: 'text/html',
  xml: 'text/xml',
  csv: 'text/csv',
  image: 'image/png',
  video: 'video/mp4',
  audio: 'audio/mpeg',
  pdf: 'application/pdf',
  word: 'application/msword',
  excel: 'application/vnd.ms-excel',
  powerpoint: 'application/vnd.ms-powerpoint',
}

interface RequestOptions {
  type?: keyof typeof contentTypeMap | 'query'
  data?: any
  query?: Record<string, string | number | boolean>
}


const getRequsetBody = (type: keyof typeof contentTypeMap | 'query', data: any) => {
  switch (type) {
    case 'json':
      return JSON.stringify(data)
    case 'formData':
      return new FormData(data)
    case 'urlencoded':
      return new URLSearchParams(data).toString()
    case 'binary':
      return data
    case 'text':
      return data
    case 'query':
      return undefined
  }
}

export const request = (url: string, options: RequestInit & { type?: keyof typeof contentTypeMap | 'query', data?: any } = { method: 'GET', type: 'query', data: {} }) => {
  return fetch(`${baseUrl}${url}${options.type === 'query' ? '?' + Object.entries(options.data).map(([key, value]) => `${key}=${value}`).join('&') : ''}`, {
    method: options.method,
    signal: abortController.signal,
    headers: { 'Content-Type': options?.type ? contentTypeMap[options.type as keyof typeof contentTypeMap] : contentTypeMap.json },
    mode: 'cors',
    body: getRequsetBody(options.type as keyof typeof contentTypeMap, options.data),
    ...options,
  }).then((res) => {
    if (res.ok) {
      switch (options?.type) {
        case 'json':
          return res.json()
        case 'text':
          return res.text()
        case 'image':
          return res.blob()
        default:
          return res.json()
      }
    }
    return Promise.reject(res.statusText)
  }).catch((error) => {
    message.error(error)
  })
}
