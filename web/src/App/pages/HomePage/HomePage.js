import { useTranslation } from 'react-i18next'
import useDocumentTitle from 'Hooks/useDocumentTitle'
import hailtechnoBg from '../../../../public/assets/video/hailtechno_bg.mp4'
import styles from './styles'

const HomePage = () => {
  const c = styles()
  const { t } = useTranslation()

  useDocumentTitle(t('app.title'))

  return <div className={c.homePageRoot}>
    <video autoPlay muted loop id="hailtechno_tv_bg" className={c.videobg}>
      <source src={hailtechnoBg} type="video/mp4" />
    </video>
  </div>
}

export default HomePage
