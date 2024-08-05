import { Cloudinary } from '@cloudinary/url-gen'

// Create your instance
const cld = new Cloudinary({
  cloud: {
    cloudName: 'dilajt5zl'
  },
  url: {
    secure: true // force https, set to false to force http
  }
})
export default cld
