import styles from './styles'
import { useEffect, useRef, useState } from 'react'
import Validation from 'Components/modules/UploadWizard/Validation/Validation'
import Upload from 'Components/modules/UploadWizard/Upload/Upload'
import { useOnClickOutside } from 'Hooks/useOnClickOutside'
import { useMutation, useQueryClient } from 'react-query'
import validationApi from 'Apis/core/validation-api'
import { useTranslation } from 'react-i18next'
import uploadFileApi from 'Apis/core/upload-file'
import { fileTypeController } from 'Constants/urls'
import { useAccessState } from 'Components/providers/AccessStateProvider'

const UploadWizard = ({ handleClose }) => {
  const c = styles()
  const { t } = useTranslation()
  const modalRef = useRef()
  const queryClient = useQueryClient()

  const {
    email,
    setEmail,
    artist,
    setArtist,
    accessToken,
    setAccessToken
  } = useAccessState()

  const [accessCode, setAccessCode] = useState('')

  const [uploadType, setUploadType] = useState(t('track'))
  const [displayName, setDisplayName] = useState('')

  const [file, setFile] = useState()

  useOnClickOutside(modalRef, handleClose)

  const validateFn = useMutation(validationApi)
  const uploadFn = useMutation(uploadFileApi)

  async function handleValidation () {
    if (validateFn.isLoading) return
    await validateFn.mutate({ email, accessCode }, {
      onSuccess: accessToken => {
        setAccessToken(accessToken)
      }
    })
  }

  async function handleUploadSubmit () {
    if (uploadFn.isLoading) return
    const formData = new FormData()
    formData.append('file', file)
    formData.append('artist', artist)
    formData.append('trackname', displayName)
    formData.append('email', email)
    await uploadFn.mutate({
      controller: fileTypeController.track,
      accessCode: accessToken?.id,
      formData: formData
    }, {
      onSuccess: () => {
        queryClient.invalidateQueries('tracks')
      },
      onError: () => {
        setFile(undefined)
      }
    })
  }

  // Run validation once on mount
  useEffect(() => {
    let current = true
    async function validate () {
      if (accessToken && current) {
        try {
          await validationApi({ accessCode: accessToken.id })
        } catch (err) {
          setAccessToken(undefined)
        }
      }
    }
    validate()
    return () => {
      current = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <div className={c.root} ref={modalRef}>
    {!accessToken &&
    <Validation
      c={c}
      email={email}
      setEmail={setEmail}
      accessCode={accessCode}
      setAccessCode={setAccessCode}
      handleValidation={handleValidation}
      validationError={validateFn.isError}
      validateFn={validateFn}
    />}

    {accessToken &&
    <Upload
      c={c}
      uploadType={uploadType}
      setUploadType={setUploadType}
      displayName={displayName}
      setDisplayName={setDisplayName}
      artist={artist}
      setArtist={setArtist}
      handleUploadSubmit={handleUploadSubmit}
      file={file}
      setFile={setFile}
      uploadFn={uploadFn}
    />}
  </div>
}

export default UploadWizard
