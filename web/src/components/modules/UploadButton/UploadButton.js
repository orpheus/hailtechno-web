import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './styles'
import UploadWizard from 'Components/modules/UploadWizard/UploadWizard'

const UploadButton = () => {
  const c = styles()
  const { t } = useTranslation()
  const [uploadWizardActivated, setUploadWizardActivated] = useState(false)

  function openUploadWizard () {
    setUploadWizardActivated(true)
  }

  function closeUploadWizard () {
    setUploadWizardActivated(false)
  }

  return <>
    <button className={c.root} onClick={openUploadWizard}>
      {t('upload')}
    </button>
    {uploadWizardActivated && <UploadWizard handleClose={closeUploadWizard}/>}
  </>
}

export default UploadButton
