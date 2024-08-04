import * as yup from 'yup'
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const authSchema = yup.object({
  first_name: yup.string().required('Vui lòng nhập trường này!').min(2, 'Độ dài tối thiểu 2 kí tự'),
  last_name: yup.string().required('Vui lòng nhập trường này!').min(2, 'Độ dài tối thiểu 2 kí tự'),
  email: yup.string().required('Vui lòng nhập email!').email('Email này không hợp lệ'),
  gender: yup.number().required('Vui lòng chọn giới tính!').oneOf([0, 1], 'Giới tính không hợp lệ!'),
  password: yup
    .string()
    .required('Vui lòng nhập trường này !')
    .min(6, 'Độ dài tối thiếu 6 kí tự !')
    .max(162, 'Độ dài tối đa 162 kí tự'),
  confirm_password: yup
    .string()
    .required('Vui lòng nhập trường này !')
    .min(6, 'Độ dài tối thiếu 6 kí tự !')
    .max(162, 'Độ dài tối đa 162 kí tự')
    .oneOf([yup.ref('password')], 'Mật khẩu xác nhận không chính xác !')
})

export const changePasswordSchema = yup.object({
  currentPassword: yup.string().required('Vui lòng nhập mật khẩu hiện tại'),
  new_password: yup
    .string()
    .required('Vui lòng nhập trường này !')
    .min(6, 'Độ dài tối thiếu 6 kí tự !')
    .max(162, 'Độ dài tối đa 162 kí tự'),
  confirm_password: yup
    .string()
    .required('Vui lòng nhập trường này !')
    .oneOf([yup.ref('new_password')], 'Mật khẩu xác nhận không chính xác !')
    .min(6, 'Độ dài tối thiếu 6 kí tự !')
    .max(162, 'Độ dài tối đa 162 kí tự')
})

export const commentSchema = yup.object({
  content: yup.string().required('Nội dung bình luận không được trống!')
})

export const roleSchema = yup.object({
  name: yup.string().required('Tên vai trò không được để trống!'),
  description: yup.string().required('Mô tả không được để trống!')
})

export const accountSchema = yup.object({
  username: yup.string().required('Tên người dùng không được để trống!'),
  email: yup.string().required('Vui lòng nhập email!').email('Email này không hợp lệ'),
  password: yup
    .string()
    .required('Vui lòng nhập trường này !')
    .min(6, 'Độ dài tối thiếu 6 kí tự !')
    .max(162, 'Độ dài tối đa 162 kí tự'),
  confirm_password: yup
    .string()
    .required('Vui lòng nhập trường này !')
    .min(6, 'Độ dài tối thiếu 6 kí tự !')
    .max(162, 'Độ dài tối đa 162 kí tự')
    .oneOf([yup.ref('password')], 'Mật khẩu xác nhận không chính xác !'),
  status: yup.string().required('Vui lòng chọn trường này'),
  phone_number: yup.string().required('Vui lòng nhập trường này').matches(phoneRegExp, 'Số điện thoại không hợp lệ'),
  address: yup.string().required('Vui lòng nhập trường này!'),
role_id: yup.string().required('Vui lòng nhập trường này!')
})

export const accountUpdateSchema = yup.object({
  username: yup.string(),
  phone_number: yup.string().matches(phoneRegExp, 'Số điện thoại không hợp lệ'),
  role_id: yup.string(),
  status: yup.string(),
  address: yup.string()
})

export const registerSchema = authSchema
export const loginSchema = authSchema.pick(['email', 'password'])

export type RegisterForm = yup.InferType<typeof registerSchema>
export type LoginForm = yup.InferType<typeof loginSchema>
export type ChangePasswordForm = yup.InferType<typeof changePasswordSchema>
export type CommentType = yup.InferType<typeof commentSchema>
export type RoleType = yup.InferType<typeof roleSchema>
export type AccountUpdateForm = yup.InferType<typeof accountUpdateSchema>
