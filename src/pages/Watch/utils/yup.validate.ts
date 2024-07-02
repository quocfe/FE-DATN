import * as yup from 'yup'
import PRIVACY from '.'

export const validationFormCreateVideo = yup.object({
  content: yup.string().trim().default(''),
  privacy: yup.string().default(PRIVACY[0].key),
  video: yup.mixed().default('')
})

export type FormCreateVideoType = yup.InferType<typeof validationFormCreateVideo>
