import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'

export const GlobalPlayerCtx = createContext(undefined)
export const useGlobalPlayer = () => useContext(GlobalPlayerCtx)

export const ON = 'ON'
export const OFF = 'OFF'
export default function GlobalPlayerProvider ({ children }) {
  const audioStore = useRef({})
  const currentAudioRef = useRef()
  const [playState, setPlayState] = useState(OFF)

  const pause = useCallback(async () => {
    console.log('PAUSE')
    await currentAudioRef.current?.pause()
    setPlayState(OFF)
  }, [])

  const play = useCallback(async () => {
    console.log('PLAY')
    await currentAudioRef.current?.play()
    setPlayState(ON)
  }, [])

  const setCurrentAudio = useCallback((id) => {
    console.log('SET CURRENT ', id)
    if (audioStore.current[id]) {
      currentAudioRef.current = audioStore.current[id].audioRef
    }
  }, [])

  const loadAndPlay = useCallback(async (id) => {
    console.log('LOAD AND PLAY ', id)
    if (id) {
      await currentAudioRef.current?.pause()
      setCurrentAudio(id)
    }
    console.log(currentAudioRef.current)
    try {
      await currentAudioRef.current?.load()
      await currentAudioRef.current?.play()
      setPlayState(ON)
    } catch (err) {
      console.warn(err)
    }
  }, [setCurrentAudio])

  const storeAudioData = useCallback(({ track, blobUrl, audioRef }) => {
    console.log('STORE AUDIO DATA')
    audioStore.current[track.id] = { blobUrl, audioRef }
  }, [])

  // when a new track comes in, play it
  const handleNewTrack = useCallback(async (track, blobUrl, audioRef) => {
    console.log('HANDLE NEW TRACK')
    // console.log(track, blobUrl, audioRef)
    storeAudioData({ track, blobUrl, audioRef })
    await loadAndPlay(track.id)
  }, [loadAndPlay, storeAudioData])

  const value = useMemo(() => ({
    handleNewTrack,
    audioStore: audioStore.current,
    loadAndPlay,
    play,
    pause,
    playState
  }), [handleNewTrack, loadAndPlay, play, pause, playState])

  return <GlobalPlayerCtx.Provider value={value}>
    {children}
  </GlobalPlayerCtx.Provider>
}
