import { useTranslation } from 'react-i18next'
import styles from './styles'
import Link from 'Components/library/Link/Link'

const AppNav = () => {
  const c = styles()
  const { t } = useTranslation()

  return <div className={c.root}>
    <div className={c.linkBlock}>
      <Link to={'/tracks'} children={t('tracks')} c={c.link} />
      <Link to={'/mixes'} children={t('mixes')} c={c.link} />
      <Link to={'/art'} children={t('art')} c={c.link}/>
      <Link to={'/about'} children={t('about')} c={c.link} />
    </div>
  </div>
}

export default AppNav
