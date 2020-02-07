export const saveFile = (content, filename) => {
  const a = document.createElement('a')
  document.body.appendChild(a)
  a.download = filename
  a.href = `data:application/octet-stream;base64,${content}`
  a.click()
}
