import styles from './styles'
import { useRef, useState } from 'react'
import Validation from 'Components/modules/UploadWizard/Validation/Validation'
import Upload from 'Components/modules/UploadWizard/Upload/Upload'
import { useOnClickOutside } from 'Hooks/useOnClickOutside'
import { useMutation } from 'react-query'
import validationApi from 'Apis/core/validation-api'
import { useTranslation } from 'react-i18next'
import uploadFileApi from 'Apis/core/upload-file'
import { fileTypeController } from 'Constants/urls'
import { useAccessState } from 'Components/providers/AccessStateProvider'

const UploadWizard = ({ handleClose }) => {
  const c = styles()
  const { t } = useTranslation()
  const modalRef = useRef()

  const {
    email,
    setEmail,
    artist,
    setArtist,
    accessToken,
    setAccessToken
  } = useAccessState()

  const [accessCode, setAccessCode] = useState()

  const [uploadType, setUploadType] = useState(t('track'))
  const [displayName, setDisplayName] = useState()

  // eslint-disable-next-line no-unused-vars
  const [validationError, setValidationError] = useState()

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
    await uploadFn.mutate({
      controller: fileTypeController.track,
      accessCode: accessToken?.id,
      formData: formData
    })
  }

  return <div className={c.root} ref={modalRef}>
    {!accessToken &&
    <Validation
      c={c}
      email={email}
      setEmail={setEmail}
      accessCode={accessCode}
      setAccessCode={setAccessCode}
      handleValidation={handleValidation}
      validationError={validationError}
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
