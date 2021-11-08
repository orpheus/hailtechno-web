import { get } from 'Utility/request-wrapper'
import { tracksController } from 'Constants/urls'

export default function getTracksApi (options) {
  return get({
    route: tracksController,
    ...options
  })
}
