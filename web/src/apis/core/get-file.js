import { get } from 'Utility/request-wrapper'
import { fileController } from 'Constants/urls'

export default async function getFileApi ({ id, contentType }) {
  return get({
    route: fileController(id),
    responseType: 'blob'
  })
}
