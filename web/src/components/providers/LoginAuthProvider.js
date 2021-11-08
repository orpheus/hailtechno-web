import { createContext, useState, useContext, useCallback, useMemo, useEffect } from 'react'
import jwtDecode from 'jwt-decode'
import usePageTimeout from 'Hooks/usePageTimeout'

export const LoginAuthCtx = createContext({})
export const useLoginAuth = () => {
  const ctx = useContext(LoginAuthCtx)
  if (!ctx) {
    throw new Error('useLoginAuth must be used within a LoginAuthProvider')
  }
  return ctx
}

export const initialState = {
  accessToken: undefined,
  authorized: false,
  user: undefined
}

export const storeJWT = token => {
  try {
    window.localStorage.setItem('jwt', token)
  } catch (err) {
    console.error(`Failed to set jwt to localstorage: ${err.message}`)
  }
}

const STORAGE_KEY = '__loginAuth'
function setStateToStorage (state) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  // for request-wrapper
  window.localStorage.setItem('jwt', state.accessToken)
}

function getStateFromStorage () {
  return JSON.parse(window.localStorage.getItem(STORAGE_KEY))
}

function clearStorage () {
  window.localStorage.clear()
}

/**
 * returns true if expired, false if still active
 * @param token - JWT
 * @returns {boolean}
 */
function jwtIsExpired (token) {
  try {
    // if jwt is not expired then user is still authorized
    const decoded = jwtDecode(token)
    const expiration = decoded.exp * 1e3 // convert to ms
    return (Date.now() - expiration) > 0
  } catch (err) {
    console.error(`Error validating JWT: ${token}`, err)
    return true
  }
}

function isAuthorized (state) {
  // check state first
  if (state.authorized) {
    return !jwtIsExpired(state.accessToken)
  }
  // if no state, check localStorage for cached state
  if (getStateFromStorage()?.authorized) {
    return !jwtIsExpired(getStateFromStorage().accessToken)
  }
  // return false by default
  return false
}

/**
 * Handles user object, token, and authorized state.
 * Provides these globally through context.
 * Handles state/user persistence on page re-locations.
 * Initiates a page timeout and logout
 */
export default function LoginAuthProvider ({ children }) {
  const [state, setState] = useState(initialState)
  const authorized = useMemo(() => isAuthorized(state), [state])
  const [cacheCleanup, setCacheCleanup] = useState({ time: undefined })

  const cacheLoginState = useCallback(() => {
    // set the state to localStorage and mark this current tab as 'caching'
    setStateToStorage(state)
    // cleanup cache in a minute
    setCacheCleanup({ time: 60 * 1000 })
  }, [state])

  /**
   * Safely clean up user cache with a timer
   */
  useEffect(() => {
    function handler () {
      if (localStorage.getItem(STORAGE_KEY)) {
        console.log('Cleanup user cache.')
        localStorage.removeItem(STORAGE_KEY)
      }
    }
    if (cacheCleanup.time !== undefined) {
      const id = setTimeout(handler, cacheCleanup.time)
      return () => { clearTimeout(id) }
    }
    // set to an object so the timer will re-trigger on changes
  }, [cacheCleanup])

  /**
   * On unload/before refresh, cache user state
   */
  useEffect(() => {
    window.onunload = () => {
      console.log('Window Unloading: Caching User State')
      cacheLoginState()
    }
  }, [cacheLoginState])

  const logout = useCallback(() => {
    setState(initialState)
    clearStorage()
  }, [])

  // ON_APP_MOUNT_ONLY, check the token expiration authentication variable
  // if token is expired or user authentication is false, then logout, clearing state, and rerouting to login page
  useEffect(() => {
    // console.log('App Mounted: Authorized With Valid Token:', JSON.stringify(authorized))
    if (!authorized) {
      logout()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /**
   * Add a window event listener to check for authorization on window refocus
   */
  useEffect(() => {
    const handleFocus = () => {
      // console.log('Window Refocused: Authorized With Valid Token:', authorized)
      if (!authorized) {
        logout()
      }
    }
    window.addEventListener('focus', handleFocus, false)

    return () => {
      window.removeEventListener('focus', handleFocus)
    }
  }, [authorized, logout])

  /**
   * On window navigation re-initialize the state from storage
   */
  useEffect(() => {
    let p

    // https://stackoverflow.com/questions/5004978/check-if-page-gets-reloaded-or-refreshed-in-javascript/53307588#53307588
    // window.performance.navigation is deprecated in most browsers
    if (window.performance.navigation) {
      p = window.performance.navigation.type
    }

    // PerformanceNavigationTiming
    if (window.performance.getEntriesByType('navigation')) {
      p = performance.getEntriesByType('navigation')[0].type
    }

    let localStorageState
    switch (p) {
      case window.performance.navigation.TYPE_NAVIGATE:
      case window.performance.navigation.TYPE_RELOAD:
      case window.performance.navigation.TYPE_BACK_FORWARD:
      case 'navigate':
      case 'reload':
      case 'back_forward':
        localStorageState = getStateFromStorage()
        if (localStorageState) {
          console.log('Navigation Completed: Restoring User Cache')
          setState(localStorageState)

          // cleanup cache in a minute, let pages/tabs load
          setCacheCleanup({ time: 60 * 1000 })
        }
        break
      default:
        break
    }
  }, [])

  const setLoginData = useCallback(async (loginData) => {
    setState(loginData)
  }, [])

  const authorize = useCallback((auth) => {
    setLoginData(state => {
      return {
        ...state,
        authorized: auth
      }
    })
  }, [setLoginData])

  usePageTimeout({ logout, activate: state.user })

  const contextValue = useMemo(() => ({
    state,
    setLoginData,
    authorize,
    authorized,
    logout,
    cacheLoginState
  }), [state, setLoginData, authorize, authorized, logout, cacheLoginState])

  return <LoginAuthCtx.Provider value={contextValue}>
    {children}
  </LoginAuthCtx.Provider>
}
