import styles from './styles'
import clsx from 'clsx'
import { useQuery } from 'react-query'
import getFileApi from 'Apis/core/get-file'
import { useEffect, useRef, useState } from 'react'
import BarLoader from 'Components/library/Loaders/BarLoader/BarLoader'
import { useGlobalPlayer } from 'Components/providers/GlobalPlayerProvider'

const Track = ({
  className,
  onClick,
  active,
  track = {}
}) => {
  const c = styles()
  const [blobUrl, setBlobUrl] = useState(undefined)
  const audioRef = useRef()
  const globalPlayer = useGlobalPlayer()

  const [download, setDownload] = useState(false)
  const downloadedFile = useQuery(['track', track?.id], async () =>
    getFileApi({ id: track.id, contentType: track.content_type }), {
    enabled: Boolean(track?.id) && download,
    refetchOnWindowFocus: false
  })

  // if file is in cache, don't download and call the audio player to play it
  async function handleInternalClick () {
    if (globalPlayer.audioStore[track.id]?.blobUrl) {
      await globalPlayer.loadAndPlay(track.id)
    } else {
      setDownload(true)
    }
  }

  useEffect(() => {
    if (downloadedFile.data) {
      console.log(downloadedFile.data)
      const blob = new Blob([downloadedFile.data], { type: track.content_type })
      const url = window.URL.createObjectURL(blob)
      setBlobUrl(url)
      setDownload(false)
    }
  }, [downloadedFile.data, track.content_type])

  // when the blob url is ready, cache it with the player
  useEffect(() => {
    if (blobUrl && !globalPlayer.audioStore[track.id]) {
      // audioRef.current.load()
      // audioRef.current.play()
      globalPlayer.handleNewTrack(track, blobUrl, audioRef.current)
    }
  }, [blobUrl, globalPlayer, track])

  return <>
    <div
      key={track.id}
      className={clsx(
        c.root,
        className,
        active && `${c.root}--active`
      )}
      onClick={() => {
        onClick()
        handleInternalClick()
      }}
    >
      <div className={c.dataBlock}>
        <div className={c.title}>
          {track.artist}
        </div>
        <div className={c.text}>
          {track.display_name}
        </div>
      </div>
      {downloadedFile.isLoading && <div className={c.dataBlock}>
        <BarLoader />
      </div>}
    </div>
    <audio id={`audio-for-${track.id}`} ref={audioRef} style={{ display: 'none' }}>
      <source src={blobUrl} type={track.content_type} />
    </audio>
  </>
}

export default Track
