/**
 * @ALL Tất cả
 * @FRIEND Bạn bè
 * @ONLY Chỉ mình tôi
 *
 */

const PRIVACY = [
  {
    title: 'Công khai',
    key: 'ALL',
    icon: 'https://static.xx.fbcdn.net/rsrc.php/v3/yD/r/KV7QFf-Yspp.png?_nc_eui2=AeE3Fpidk3GSztwFCQdU6-d1ZBJ6bsdKgsJkEnpux0qCwk6Ucntd0AoPDUL_CIwNj_eUlWIhOxcNO1OT2URDKxHQ'
  },

  {
    title: 'Bạn bè',
    key: 'FRIEND',
    icon: 'https://static.xx.fbcdn.net/rsrc.php/v3/yJ/r/S__jp-Cgqt_.png?_nc_eui2=AeH6UGmLnSY7eYix4yetMCA1fQZGpCf2N7V9BkakJ_Y3tUCg_EhGxKrPT62gcgWyRNQkD4v2ZOrRT7JGqyv3aAxe'
  },
  {
    title: 'Chỉ mình tôi',
    key: 'ONLY',
    icon: 'https://static.xx.fbcdn.net/rsrc.php/v3/yJ/r/JgqJqE4kFfK.png?_nc_eui2=AeEnIidsIpMwVcQaiSoKlzeoi1Mao9O5Cl2LUxqj07kKXYIFWDRW7L5DKqhkdYHVQmgks-gAa70S1Vev_Hx023Fd'
  }
] as const

// Extracting keys from PRIVACY
export const PRIVACY_KEYS = PRIVACY.map((item) => item.key)

// Defining the Yup schema
// const PrivacySchema = yup.string().oneOf(PRIVACY_KEYS)

// Defining a type based on PRIVACY
export type PrivacyKeyType = (typeof PRIVACY)[number]['key']

export default PRIVACY
