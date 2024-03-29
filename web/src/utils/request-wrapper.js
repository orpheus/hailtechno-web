import axios from 'axios'

const requestWrapper = async (method, options) => {
  if (process.env.NODE_ENV === 'test') return
  if (!options) throw new Error('Route has not been set.')

  const response = await axios({
    method,
    url: options.route,
    params: options.params,
    data: options.data,
    json: options.contentType === 'application/json',
    responseType: options.responseType === 'application/json' ? 'json' : options.responseType,
    headers: {
      'HT-ACCESS-CODE': options.accessCode,
      // Authorization: `Bearer ${window.localStorage.getItem('jwt')}`, // <- or have it on all calls,
      'content-type': options.contentType || 'application/json',
      Accept: options.contentType || 'application/json',
      'Cache-Control':
          'no-cache, no-store, must-revalidate, private, max-age=0',
      ...options.headers
    },
    withCredentials: options.withCredentials,
    auth: options.auth,
    onUploadProgress: options.onUploadProgress,
    cancelToken: options.cancelToken
  })

  return response.data
}

export const
  get = (data, options) =>
    typeof data === 'string'
      ? requestWrapper('get', { route: data, ...options })
      : requestWrapper('get', data)
export const post = data => requestWrapper('post', data)
export const deleteRequest = data => requestWrapper('delete', data)
export const putRequest = data => requestWrapper('put', data)
export const patch = data => requestWrapper('patch', data)
