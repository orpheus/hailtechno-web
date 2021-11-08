export const url = `${process.env.HAILTECHNO_HOST}:${process.env.HAILTECHNO_PORT}`
const root = (controller) => `${url}/api${controller}`

export const trackController = root('/track')
export const tracksController = root('/tracks')
export const fileController = id => root(`/file/${id}`)
export const validationController = root('/access-code/validate')

export const fileTypeController = {
  track: trackController
}
