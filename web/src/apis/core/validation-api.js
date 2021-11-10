import { validationController } from 'Constants/urls'
import { post } from 'Utility/request-wrapper'

export default async function validationApi ({
  accessCode,
  options,
  email
}) {
  if (!accessCode) {
    throw Error('Missing access code for validation.')
  }
  return post({
    route: validationController,
    data: { email },
    accessCode,
    ...options
  })
}
