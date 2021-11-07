import { useState } from 'react'
import serializeImageFile from 'Utility/serializeImageFile'
import postImageApi from 'Apis/image/post-image-api'
import axios from 'axios'

export default function useImageUpload ({
  postImage,
  returnClosure,
  onSuccess,
  onError
}) {
  const [uploadedImages, setUploadedImages] = useState([])
  const [pending, setPending] = useState(false)
  const [progress, setProgress] = useState(0)
  const [cancelToken, setCancelToken] = useState()

  function cancelCurrentRequest () {
    if (cancelToken) {
      cancelToken.cancel()
    }
  }

  async function createAndSaveFile (File, id) {
    const image = await serializeImageFile(File)

    if (postImage) {
      setPending(true)
      setProgress(0)
      const source = axios.CancelToken.source()
      setCancelToken(source)

      // create FormData
      const formData = new FormData() // eslint-disable-line
      formData.append('file', image.file)

      try {
        await postImageApi({
          id: image.id,
          formData,
          cancelToken: source.token,
          onUploadProgress: (prog) => {
            console.log('progress: ', prog.loaded / prog.total)
            // limit it till 99% until we're out of the async call so that the progress bar matches
            // the pending state. The progress hits 1 (or 100%) much quicker than it sets pending to false
            // so it creates out of sync user interface states
            setProgress(Math.min((prog.loaded / prog.total), 0.99))
          }
        })
        console.log('Uploaded Image')
        setPending(false)
        setProgress(1)
        image.uploaded = true
      } catch (err) {
        setPending(false)
        console.log('cancelled: ', axios.isCancel(err))
        onError && onError({ err, image, id })
      } finally {
        setCancelToken(undefined)
      }
    }

    setUploadedImages(prev => [...prev, image])
    if (onSuccess) onSuccess(image, id)
  }

  async function handleFileUpload (FileList, id) {
    for (let i = 0; i < FileList.length; i++) {
      await createAndSaveFile(FileList[i], id)
    }
  }

  let closureCallback
  if (returnClosure) {
    closureCallback = (id) => {
      return async (FileList) => {
        await handleFileUpload(FileList, id)
      }
    }
  }

  const uploadCb = returnClosure ? closureCallback : handleFileUpload
  return {
    uploadImages: uploadCb,
    cancelCurrentRequest,
    uploadedImages,
    pending,
    setPending,
    progress,
    setProgress
  }
}
