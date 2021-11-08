import { fileTypeController } from 'Constants/urls'
import { post } from 'Utility/request-wrapper'

export default function uploadFile ({
  formData,
  accessCode,
  options,
  type
}) {
  if (!fileTypeController[type]) {
    throw Error(`Type not found: ${type}`)
  }
  return post({
    route: fileTypeController[type],
    data: formData,
    accessCode,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    ...options
  })
}
