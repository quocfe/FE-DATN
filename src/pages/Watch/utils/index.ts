

/**
 * @ALL Tất cả
 * @FRIEND Bạn bè
 * @ONLY Chỉ mình tôi
 *
 */

const PRIVACY = [
  {
    title: 'Công khai',
    key: 'ALL'
  },
  {
    title: 'Bạn bè',
    key: 'FRIEND'
  },
  {
    title: 'Chỉ mình tôi',
    key: 'ONLY'
  }
] as const

// Extracting keys from PRIVACY
export const PRIVACY_KEYS = PRIVACY.map((item) => item.key)

// Defining the Yup schema
// const PrivacySchema = yup.string().oneOf(PRIVACY_KEYS)

// Defining a type based on PRIVACY
export type PrivacyKeyType = (typeof PRIVACY)[number]['key']

export default PRIVACY
