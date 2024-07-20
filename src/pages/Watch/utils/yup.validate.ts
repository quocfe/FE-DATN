import * as yup from 'yup'
import PRIVACY from '.'

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

export const validationFormCreateVideo = yup.object({
  content: yup
    .array()
    .of(descendantSchema)
    .default([
      {
        type: 'paragraph',
        children: [{ text: '' }]
      }
    ]),
  privacy: yup.string().default(PRIVACY[0].key),
  video: yup.mixed().default('')
})

export type FormCreateVideoType = yup.InferType<typeof validationFormCreateVideo>
