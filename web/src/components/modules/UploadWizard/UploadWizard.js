import styles from './styles'
import { useRef, useState } from 'react'
import Validation from 'Components/modules/UploadWizard/Validation/Validation'
import Upload from 'Components/modules/UploadWizard/Upload/Upload'
import { useOnClickOutside } from 'Hooks/useOnClickOutside'
import { useMutation } from 'react-query'
import validationApi from 'Apis/core/validation-api'
import { useTranslation } from 'react-i18next'

const UploadWizard = ({ handleClose }) => {
  const c = styles()
  const { t } = useTranslation()
  const modalRef = useRef()

  const [email, setEmail] = useState()
  const [accessCode, setAccessCode] = useState()

  const [uploadType, setUploadType] = useState(t('track'))
  const [displayName, setDisplayName] = useState()
  const [artist, setArtist] = useState()

  // eslint-disable-next-line no-unused-vars
  const [accessToken, setAccessToken] = useState()
  const [validationError, setValidationError] = useState()

  useOnClickOutside(modalRef, handleClose)

  const validateFn = useMutation(validationApi)

  async function handleValidation () {
    if (validateFn.isLoading) return
    await validateFn.mutate({ email, accessCode }, {
      onSuccess: setAccessToken,
      onError: setValidationError
    })
  }

  function handleUploadSubmit () {

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
    />}
  </div>
}

export default UploadWizard
