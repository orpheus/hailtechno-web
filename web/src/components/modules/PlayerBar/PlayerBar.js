import styles from './styles'
import clsx from 'clsx'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'

const PlayBar = ({ active }) => {
  const c = styles()
  const [play, setPlay] = useState(false)
  const { pathname } = useLocation()
  if (pathname === '/' || pathname === '/art') {
    return null
  }

  function handlePlay () {
    setPlay(true)
  }

  function handleStop () {
    setPlay(false)
  }
  const stop = !play
  return <div className={clsx(
    c.root,
    active && `${c.root}--active`
  )}>
    {play && <button className={c.stopButton} onClick={handleStop}/>}
    {stop && <button className={c.playButton} onClick={handlePlay}/>}

  </div>
}

export default PlayBar
