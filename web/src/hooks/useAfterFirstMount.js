import { useEffect, useRef } from 'react'

const useAfterFirstMount = (cb, deps) => {
  const didMount = useRef(false)

  useEffect(() => {
    if (didMount.current) cb()
    else didMount.current = true
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

export default useAfterFirstMount
