/**
 * 👍 : U+1F44D
 * ❤️ : U+2764
 * 😍 : U+1F60D
 * 😲 : U+1F632
 * 😢 : U+1F622
 * 😡 : U+1F621
 *
 */

const LIKE_VIDEO_TYPE = {
  'U+1F44D': '👍',
  'U+2764': '❤️',
  'U+1F60D': '😍',
  'U+1F632': '😲',
  'U+1F622': '😢',
  'U+1F621': '😡'
} as const

type LikeVideoType = typeof LIKE_VIDEO_TYPE

export { LIKE_VIDEO_TYPE }

export type { LikeVideoType }
