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

  const { data = [] } = tracks
  console.log(data)
  return <div className={c.root}>
    <div className={c.header}/>
    {data.map(track => {
      return <div
        key={track.id}
        className={c.trackRow}>
        <div className={c.title}>
          {track.artist}
        </div>
        <div className={c.text}>
          {track.display_name}
        </div>
      </div>
    })}
  </div>
}

export default TrackPage
