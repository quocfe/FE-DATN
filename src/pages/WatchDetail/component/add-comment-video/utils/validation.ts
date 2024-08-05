import * as yup from 'yup'

const commentVideoSchema = yup.object({
  reply_id: yup.string(),
  reply_name: yup.string(),
  content: yup.string().required('')
})

export type CommentVideoFromSchema = yup.InferType<typeof commentVideoSchema>

export default commentVideoSchema
