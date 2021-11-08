import { useTranslation } from 'react-i18next'
import useDocumentTitle from 'Hooks/useDocumentTitle'
import styles from './styles'
import hailtechnoBg from '../../../../public/assets/video/hailtechno_bg.mp4'

const HomePage = () => {
  const c = styles()
  const { t } = useTranslation()

  useDocumentTitle(t('tracks'))

  return <div className={c.homePageRoot}>
    <video autoPlay muted loop id="hailtechno_tv_bg" className={c.videobg}>
      <source src={hailtechnoBg} type="video/mp4" />
    </video>
  </div>
}

export default HomePage
