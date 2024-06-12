import * as yup from 'yup'

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

export const registerSchema = authSchema
export const loginSchema = authSchema.pick(['email', 'password'])
export const messageSchema = yup.object({
  body: yup.string().required('Vui điền đầy đủ nội dung tin nhắn!')
})

export type RegisterForm = yup.InferType<typeof registerSchema>
export type LoginForm = yup.InferType<typeof loginSchema>
export type MessageForm = yup.InferType<typeof messageSchema>
export type ChangePasswordForm = yup.InferType<typeof changePasswordSchema>
