import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export default function useDocumentTitle (text) {
  const { t } = useTranslation()
  useEffect(() => {
    let title = t('app.title')
    if (text) {
      title = `${t('app.title')} - ${text}`
    }
    window.document.title = title
  }, [text, t])
}
