export function checkBodyMessage(type: number) {
  let result

  switch (type) {
    case 2:
      result = 'đã gửi một ảnh'
      break
    case 4:
      result = 'đã gửi một video'
      break
    case 5:
      result = 'đã gửi một tin nhắn thoại'
      break
    case 6:
      result = 'cuộc gọi'
      break
    default:
      result = 'đã gửi một tin nhắn'
      break
  }

  return result
}
