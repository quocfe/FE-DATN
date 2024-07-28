import * as yup from 'yup'
import { PRIVACY } from '~/constants'

const descendantSchema = yup.object().shape({
  type: yup.string().required(),
  children: yup
    .array()
    .of(
      yup.object().shape({
        text: yup.string().required()
      })
    )
    .required()
})

export const FormUpdateVideo = yup.object({
  content: yup
    .array()
    .of(descendantSchema)
    .default([
      {
        type: 'paragraph',
        children: [{ text: '' }]
      }
    ]),
  privacy: yup.string().default(PRIVACY.ALL),
  video: yup.mixed().default('')
})

export type FormUpdateVideoType = yup.InferType<typeof FormUpdateVideo>
