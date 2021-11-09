import { post } from 'Utility/request-wrapper'

export default function uploadFileApi ({
  formData,
  accessCode,
  controller,
  options
}) {
  if (!controller) {
    throw Error(`Controller not found: ${controller}`)
  }
  return post({
    route: controller,
    data: formData,
    accessCode,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    ...options
  })
}
