import { useTranslation } from 'react-i18next'
import styles from './styles'
import Link from 'Components/library/Link/Link'
import { useState } from 'react'
import clsx from 'clsx'

const links = t => [
  {
    to: '/tracks',
    child: t('tracks')
  },
  {
    to: '/mixes',
    child: t('mixes')
  },
  {
    to: '/art',
    child: t('art')
  },
  {
    to: '/about',
    child: t('about')
  }
]

const AppNav = () => {
  const c = styles()
  const { t } = useTranslation()
  const [active, setActive] = useState()

  return <div className={c.root}>
    <div className={c.linkBlock}>
      {links(t).map(link =>
        <Link
          key={link.to}
          to={link.to}
          children={link.child}
          className={clsx(c.link, active === link.to && `${c.link}--active`)}
          onClick={() => setActive(link.to)}
          // active={active === link.to}
        />
      )}
    </div>
  </div>
}

export default AppNav
