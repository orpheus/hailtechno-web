import { createContext, useContext, useMemo, useState } from 'react'

export const GlobalPlayerCtx = createContext(undefined)
export const useGlobalPlayer = () => useContext(GlobalPlayerCtx)

export default function GlobalPlayerProvider ({ children }) {
  const [activeTrack, setActiveTrack] = useState()

  const value = useMemo(() => ({
    activeTrack,
    setActiveTrack
  }), [activeTrack])

  return <GlobalPlayerCtx.Provider value={value}>
    {children}
  </GlobalPlayerCtx.Provider>
}
