import styles from './styles'
import clsx from 'clsx'
import { useQuery } from 'react-query'
import getFileApi from 'Apis/core/get-file'
import { useEffect, useRef, useState } from 'react'
import BarLoader from 'Components/library/Loaders/BarLoader/BarLoader'

const Track = ({
  className,
  onClick,
  active,
  track = {}
}) => {
  const c = styles()
  const [blobUrl, setBlobUrl] = useState(undefined)
  const audioRef = useRef()

  const [download, setDownload] = useState(false)
  const downloadedFile = useQuery(['track', track?.id], async () =>
    getFileApi({ id: track.id, contentType: track.content_type }), {
    enabled: Boolean(track?.id) && download,
    refetchOnWindowFocus: false
  })

  function handleInternalClick () {
    setDownload(true)
  }

  useEffect(() => {
    if (downloadedFile.data) {
      console.log(downloadedFile.data)
      const blob = new Blob([downloadedFile.data], { type: track.content_type })
      const url = window.URL.createObjectURL(blob)
      setBlobUrl(url)
    }
  }, [downloadedFile.data, track.content_type])

  // useEffect(() => {
  //   audioRef.current?.addEventListener('loadeddata', e => {
  //     console.log('loaded', e)
  //   })
  //   // audioRef.current?.addEventListener('loadeddata', function () {
  //   //   console.log('loaded data')
  //   //   if (audioRef.current.readyState >= 2) {
  //   //     audioRef.current.play()
  //   //   }
  //   // })
  // }, [])

  useEffect(() => {
    if (blobUrl) {
      audioRef.current.load()
      audioRef.current.play()
    }
  }, [blobUrl])

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
    <audio ref={audioRef} style={{ display: 'none' }}>
      <source src={blobUrl} type={track.content_type} />
    </audio>
  </>
}

export default Track
