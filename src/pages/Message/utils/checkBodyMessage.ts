export function checkBodyMessage(url: string) {
  // Tạo một mảng chứa các đuôi file hình ảnh được cho phép
  let result
  let ImgExtensions = ['jpg', 'jpeg', 'png']
  let videoExtensions = ['mp4', 'mpeg', 'webm']

  // Tách phần mở rộng từ URL bằng cách sử dụng phương thức split('.')

  let urlParts = url?.split('.')
  let extension = urlParts[urlParts?.length - 1]?.toLowerCase() // Lấy phần mở rộng và chuyển đổi thành chữ thường

  // Kiểm tra xem phần mở rộng có trong danh sách cho phép không
  if (ImgExtensions.includes(extension)) {
    result = 'đã gửi một ảnh'
  } else if (videoExtensions.includes(extension)) {
    result = 'đã gửi một video'
  } else {
    result = url
  }

  return result
}
