import { number } from 'yup'
import { Descendant, Node, Text } from 'slate'

export function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('vi-VN', options)
}

export function formatTime(dateString: string): string {
  return new Date(dateString).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
}

export function calculateTimeAgo(sentAt: string | Date): string {
  const sentTime = new Date(sentAt)
  const currentTime = new Date()
  const milliseconds = currentTime.getTime() - sentTime.getTime()
  const seconds = Math.round(milliseconds / 1000)

  if (seconds < 60) {
    return 'Vừa xong'
  } else if (seconds < 3600) {
    const minutes = Math.round(seconds / 60)
    return minutes + ' phút'
  } else if (seconds < 86400) {
    const hours = Math.round(seconds / 3600)
    return hours + ' giờ'
  } else if (seconds < 2592000) {
    const days = Math.round(seconds / 86400)
    return days + ' ngày'
  } else {
    const months = Math.round(seconds / 2592000)
    return months + ' tháng'
  }
}

export function calculateHoureAgo(sentAt: string | Date): string {
  const sentTime = new Date(sentAt)
  const hours = sentTime.getHours().toString().padStart(2, '0')
  const minutes = sentTime.getMinutes().toString().padStart(2, '0')
  return `${hours}:${minutes}`
}

export const formatTimeDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60) < 0 ? 0 : Math.floor(seconds / 60)
  const secondsRemainder = Math.round(seconds) % 60 < 0 ? 0 : Math.round(seconds) % 60
  const paddedSeconds = `0${secondsRemainder}`.slice(-2)
  return `${minutes}:${paddedSeconds}`
}
export const timeLineVideo = (timeInSeconds: number) => {
  const hours = Math.floor(timeInSeconds / 3600)
  const minutes = Math.floor((timeInSeconds % 3600) / 60)
  const seconds = Math.floor(timeInSeconds % 60)
  if (hours === 0) {
    return `${minutes}:${seconds}`
  }
  return `${hours}:${minutes}:${seconds}`
}

// Hàm để lấy danh sách các chuỗi bắt đầu bằng `@` và `#`
export const extractAtAndHashTags = (nodes: Descendant[]): { atMentions: string[]; hashTags: string[] } => {
  let atMentions: string[] = []
  let hashTags: string[] = []

  // Hàm đệ quy để duyệt qua các node
  const extract = (node: Descendant) => {
    if (Text.isText(node)) {
      // Sử dụng biểu thức chính quy để tìm các chuỗi bắt đầu bằng `@` và `#`
      const atMatches = [...node.text.matchAll(/@\S+?(?=\s|$)/g)].map((match) => match[0])
      const hashMatches = [...node.text.matchAll(/#\S+?(?=\s|$)/g)].map((match) => match[0])
      atMentions.push(...atMatches)
      hashTags.push(...hashMatches)
    } else if ('children' in node) {
      // Nếu node có các children, tiếp tục duyệt qua các children
      node.children.forEach((child: Descendant) => extract(child))
    }
  }

  nodes.forEach((node: Descendant) => extract(node))
  return { atMentions, hashTags }
}

// GET Text data slate react editor
export const getTextContent = (nodes: Descendant[]): string => {
  return nodes
    .map((node) => {
      if (Text.isText(node)) {
        return node.text
      }
      // Nếu node không phải là text, hãy xử lý children của nó
      return Node.string(node)
    })
    .join('\n')
}
