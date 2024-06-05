const pdfUrl = 'https://res.cloudinary.com/dilajt5zl/image/upload/v1717571233/uploads/pe95kgygsdkyl6qzqym0.pdf'
const fileName = 'example.pdf' // Set your desired file name

type Props = {
  pdfUrl: string
  fileName: string
}

export const downloadFileFormLink = async ({ pdfUrl, fileName }: Props) => {
  try {
    const response = await fetch(pdfUrl)
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.setAttribute('download', fileName)
    document.body.appendChild(a)
    a.click()
    a.remove()
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Error downloading the PDF:', error)
  }
}
