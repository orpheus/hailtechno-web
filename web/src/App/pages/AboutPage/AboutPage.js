import { useTranslation } from 'react-i18next'
import useDocumentTitle from 'Hooks/useDocumentTitle'
import styles from './styles'

const AboutPage = () => {
  const c = styles()
  const { t } = useTranslation()

  useDocumentTitle(t('about'))

  return <div className={c.root}>
    <div className={c.header} />
    <pre>
      <code className={c.about}>
        {`  (created-by Ryan Chacon
              (-> aka`}
        <a href={'https://www.soundcloud.com/princepagan'} target={'_blank'} className={c.alias}>
          Prince Pagan
        </a>
        <a href={'https://www.instagram.com/titanroark/'} target={'_blank'} className={c.alias}>
          Titan Roark
        </a>
        <span>
          <a href={'https://www.github.com/orpheus'} target={'_blank'} className={c.alias} style={{ display: 'inline-block' }}>
          Orpheus
          </a>{'))'}</span>

      </code>
    </pre>

  </div>
}

export default AboutPage
