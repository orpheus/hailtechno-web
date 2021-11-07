import { useEffect } from 'react'

export const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = event => {
      if (!ref.current || ref.current.contains(event.target)) {
        return
      }
      // eslint-disable-next-line no-unused-expressions
      handler?.(event)
    }
    document.addEventListener('mousedown', listener)
    return () => {
      document.removeEventListener('mousedown', listener)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handler])
}
