export const handleToOldMessage = (message_id: string) => {
  const messageOldId = message_id
  const element = document.getElementById(messageOldId)

  if (element) {
    element?.scrollIntoView()
    element.setAttribute('style', 'border: 2px solid #000 ')
    setTimeout(() => {
      element.setAttribute('style', 'border: 2px solid bg-transparent')
    }, 1000)
  }
}
