import * as yup from 'yup'

const authSchema = yup.object({
  email: yup.string().required('Vui lòng nhập email!').email('Email này không hợp lệ'),
  password: yup.string().required('Vui lòng nhập mật khẩu!')
})

export const loginSchema = authSchema

export type LoginForm = yup.InferType<typeof loginSchema>
