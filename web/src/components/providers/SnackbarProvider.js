import { createContext, useState, useMemo, useCallback, useContext } from 'react'

export const SnackbarCtx = createContext({})
export const useSnackbar = () => useContext(SnackbarCtx)

const initialState = {
  open: false,
  error: false,
  message: '',
  status: undefined,
  variant: 'error',
  autoHideDuration: 3000
}

export default function SnackbarProvider ({ children }) {
  const [state, _setSnackbar] = useState(initialState)

  const setSnackbar = useCallback(action => {
    _setSnackbar({
      open: true,
      error: action.error,
      message: action.message,
      status: action.status,
      variant: action.variant || initialState.variant,
      err: action.err,
      autoHideDuration: action.autoHideDuration
    })
  }, [])

  const clearSnackbar = useCallback(() => {
    // set variant to the prev variant so the color of the snackbar doesn't flash to another variant color on close
    _setSnackbar(prev => ({ ...initialState, variant: prev.variant }))
  }, [])

  const ctxValue = useMemo(() => ({
    state,
    setSnackbar,
    clearSnackbar
  }), [clearSnackbar, setSnackbar, state])

  return <SnackbarCtx.Provider value={ctxValue}>
    {children}
  </SnackbarCtx.Provider>
}
