import { useTranslation } from 'react-i18next'
import useDocumentTitle from 'Hooks/useDocumentTitle'
import styles from './styles'

const AboutPage = () => {
  const c = styles()
  const { t } = useTranslation()

  useDocumentTitle(t('about'))

  return <div className={c.root}>
  </div>
}

export default AboutPage
