import { useTranslation } from 'react-i18next'
import useDocumentTitle from 'Hooks/useDocumentTitle'
import styles from './styles'
import { useQuery } from 'react-query'
import getTracksApi from 'Apis/core/get-tracks'
import Track from 'Components/modules/Track/Track'
import { useAccessState } from 'Components/providers/AccessStateProvider'
import { useState } from 'react'

const TrackPage = () => {
  const c = styles()
  const { t } = useTranslation()
  const { accessToken } = useAccessState()
  const [activeTrack, setActiveTrack] = useState()

  useDocumentTitle(t('tracks'))

  const tracks = useQuery('tracks', getTracksApi)

  function handleTrackClick (track) {
    setActiveTrack(track)
  }

  const { data = [] } = tracks
  return <div className={c.root}>
    {data.map(track => {
      return <Track
        key={track.id}
        onClick={() => handleTrackClick(track)}
        active={activeTrack?.id === track.id}
        track={track}
        accessCode={accessToken?.id}
      />
    })}
  </div>
}

export default TrackPage
