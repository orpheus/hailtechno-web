import { createContext, useState, useContext, useMemo, useCallback } from 'react'
import useLocalStorageCache from 'Hooks/useLocalStorageCache'

export const AccessStateCtx = createContext(undefined)
export const useAccessState = () => useContext(AccessStateCtx)

const AccessStateProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState()
  const [email, setEmail] = useState()
  // this doesn't really have to do with Validation,
  // more so a convenience
  const [artist, setArtist] = useState()

  const getState = useCallback(() => {
    return { accessToken, email, artist }
  }, [accessToken, email, artist])

  const setState = useCallback(({ artist, email, accessToken }) => {
    setEmail(email)
    setArtist(artist)
    setAccessToken(accessToken)
  }, [])

  useLocalStorageCache(getState, setState)

  const value = useMemo(() => ({
    accessToken,
    setAccessToken,
    email,
    setEmail,
    artist,
    setArtist
  }), [accessToken, email, artist])

  return <AccessStateCtx.Provider value={value}>
    {children}
  </AccessStateCtx.Provider>
}

export default AccessStateProvider
