import { validationController } from 'Constants/urls'
import { post } from 'Utility/request-wrapper'

export default function validationApi ({
  accessCode,
  options,
  email
}) {
  if (!accessCode) {
    throw Error('Missing access code for validation.')
  }
  console.log('Validate: ', accessCode, email)
  return post({
    route: validationController,
    data: { email },
    accessCode,
    ...options
  })
}
