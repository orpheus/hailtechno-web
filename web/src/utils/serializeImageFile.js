import { v4 as uuidv4 } from 'uuid'

export default async function serializeImageFile (File) {
  return {
    mimeType: File.type,
    id: uuidv4(),
    // string: await File.text(),
    file: File
    // src: URL.createObjectURL(File),
    // local: true
  }
}
