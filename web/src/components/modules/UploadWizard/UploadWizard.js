import styles from './styles'
import { useRef, useState } from 'react'
import Validation from 'Components/modules/UploadWizard/Validation/Validation'
import Upload from 'Components/modules/UploadWizard/Upload/Upload'
import { useOnClickOutside } from 'Hooks/useOnClickOutside'

const UploadWizard = ({ handleClose }) => {
  const c = styles()
  const modalRef = useRef()

  const [email, setEmail] = useState()
  const [accessCode, setAccessCode] = useState()

  const [uploadType, setUploadType] = useState()
  const [displayName, setDisplayName] = useState()
  const [artist, setArtist] = useState()

  // eslint-disable-next-line no-unused-vars
  const [accessToken, setAccessToken] = useState(true)

  useOnClickOutside(modalRef, handleClose)

  function handleValidation () {

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
