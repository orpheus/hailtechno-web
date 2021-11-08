import { useTranslation } from 'react-i18next'
import useDocumentTitle from 'Hooks/useDocumentTitle'
import styles from './styles'

const MixPage = () => {
  const c = styles()
  const { t } = useTranslation()

  useDocumentTitle(t('mixes'))

  return <div className={c.root}>
  </div>
}

export default MixPage
