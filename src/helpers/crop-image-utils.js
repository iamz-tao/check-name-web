export const cropImage = async (e, uploadImage, updateImage) => {
  const reader = new FileReader()
  reader.readAsBinaryString(e)
  reader.onload = async ({ target }) => {
    const arrayBuffer = target.result
    const encoded = btoa(arrayBuffer)
    uploadImage({
      content: encoded,
      updateImage
    })
  }
}
