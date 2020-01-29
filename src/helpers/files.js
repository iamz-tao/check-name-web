export const uploadFile = (props) => {
  const {
    order_id,
    files,
    type,
    cb,
  } = props

  const reader = new FileReader()

  for (let i = 0; i < files.length; i += 1) {
    reader.onload = ({ target }) => {
      const filename = files[i].name
      const arrayBuffer = target.result
      const content = btoa(arrayBuffer)

      const proofPayload = {
        order_id,
        type,
        content,
        filename,
        other: {},
      }

      cb(proofPayload)
    }

    reader.readAsBinaryString(files[i])
  }
}
