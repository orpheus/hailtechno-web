import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = '__ht_access_state'
function setStateToStorage (state) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  // for request-wrapper
  window.localStorage.setItem('jwt', state.accessToken)
}

function getStateFromStorage () {
  return JSON.parse(window.localStorage.getItem(STORAGE_KEY))
}

// function clearStorage () {
//   window.localStorage.clear()
// }

export default function useLocalStorageCache (getState, setState) {
  const [cacheCleanup, setCacheCleanup] = useState({ time: undefined })
  const cacheLoginState = useCallback(() => {
    // set the state to localStorage and mark this current tab as 'caching'
    setStateToStorage(getState())
    // cleanup cache in a minute
    setCacheCleanup({ time: 60 * 1000 })
  }, [getState])

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
      p = performance.getEntriesByType('navigation')[0]?.type
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
  }, [setState])
}
