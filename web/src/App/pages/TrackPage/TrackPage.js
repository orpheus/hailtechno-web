import { useTranslation } from 'react-i18next'
import useDocumentTitle from 'Hooks/useDocumentTitle'
import styles from './styles'
import { useQuery } from 'react-query'
import getTracksApi from 'Apis/core/get-tracks'
import { useGlobalPlayer } from 'Components/providers/GlobalPlayerProvider'
import Track from 'Components/modules/Track/Track'
import { useAccessState } from 'Components/providers/AccessStateProvider'

const TrackPage = () => {
  const c = styles()
  const { t } = useTranslation()
  const globalPlayer = useGlobalPlayer()
  const { accessToken } = useAccessState()

  useDocumentTitle(t('tracks'))

  const tracks = useQuery('tracks', getTracksApi)
  function handleTrackClick (track) {
    globalPlayer.setActiveTrack(track)
  }

  const { data = [] } = tracks
  return <div className={c.root}>
    {data.map(track => {
      return <Track
        key={track.id}
        onClick={() => handleTrackClick(track)}
        active={globalPlayer.activeTrack?.id === track.id}
        track={track}
        accessCode={accessToken?.id}
      />
    })}
  </div>
}

export default TrackPage
