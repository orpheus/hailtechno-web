import { useTranslation } from 'react-i18next'
import useDocumentTitle from 'Hooks/useDocumentTitle'
import styles from './styles'
import { useQuery } from 'react-query'
import getTracksApi from 'Apis/core/get-tracks'

const TrackPage = () => {
  const c = styles()
  const { t } = useTranslation()

  useDocumentTitle(t('tracks'))
  const tracks = useQuery('tracks', getTracksApi)

  console.log(tracks)
  return <div className={c.root}>
  </div>
}

export default TrackPage
