import { useTranslation } from 'react-i18next'
import styles from './styles'
import Link from 'Components/library/Link/Link'
import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { useLocation } from 'react-router-dom'

const links = t => [
  {
    to: '/tracks',
    child: t('tracks')
  },
  {
    to: '/mixes',
    child: t('mixes'),
    disabled: true
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
  const location = useLocation()

  useEffect(() => {
    if (active !== location.pathname) {
      // setActive(location.pathname)
    }
  }, [active, location.pathname])

  return <div className={c.root}>
    <div className={c.linkBlock}>
      {links(t).map(link =>
        <Link
          key={link.to}
          to={link.to}
          children={link.child}
          className={clsx(c.link,
            active === link.to && `${c.link}--active`,
            link.disabled && `${c.link}--disabled`
          )}
          onClick={() => {
            if (!link.disabled) {
              setActive(link.to)
            }
          }}
          disabled={link.disabled}
          // active={active === link.to}
        />
      )}
    </div>
  </div>
}

export default AppNav
