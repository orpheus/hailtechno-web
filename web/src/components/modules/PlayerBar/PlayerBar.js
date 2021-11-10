import styles from './styles'
import clsx from 'clsx'
import { useLocation } from 'react-router-dom'
import { OFF, ON, useGlobalPlayer } from 'Components/providers/GlobalPlayerProvider'

const PlayBar = ({ active }) => {
  const c = styles()
  const { pathname } = useLocation()
  const { play, pause, playState } = useGlobalPlayer()

  if (pathname !== '/tracks') {
    return null
  }

  async function handlePlay () {
    console.log('-> handle play')
    await play()
  }

  async function handleStop () {
    console.log('-> handle stop')
    await pause()
  }
  return <div className={clsx(
    c.root,
    active && `${c.root}--active`
  )}>
    {playState === ON && <button className={c.stopButton} onClick={handleStop}/>}
    {playState === OFF && <button className={c.playButton} onClick={handlePlay}/>}

  </div>
}

export default PlayBar
