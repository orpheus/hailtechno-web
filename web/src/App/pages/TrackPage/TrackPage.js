import { useTranslation } from 'react-i18next'
import useDocumentTitle from 'Hooks/useDocumentTitle'
import styles from './styles'

const TrackPage = () => {
  const c = styles()
  const { t } = useTranslation()

  useDocumentTitle(t('tracks'))

  return <div className={c.root}>
  </div>
}

export default TrackPage
