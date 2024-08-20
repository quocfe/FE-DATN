export async function getAspectRatio(imageUrl: string): Promise<number> {
  return new Promise((resolve) => {
    const img = new Image()
    img.addEventListener('load', () => {
      resolve(img.width / img.height)
    })
    img.src = imageUrl
  })
}
