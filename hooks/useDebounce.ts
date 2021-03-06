import { useEffect, useRef } from 'react'

// this version debounces when obj is changed.
export function useDebounceObject(obj: unknown, callback: () => void, timeout: number) {
  useEffect(() => {
    const timer = setTimeout(callback, timeout)
    return () => {
      clearTimeout(timer)
    }
    // disable rule, since we explicitly want this to only change when obj change
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [obj])
}

// This object debounces when the returned function is called
// Do note that the callback closes over a potentially stale render, which is a problem
export function useDebounceCallback(callback: () => void, timeout: number) {
  const timerRef = useRef<NodeJS.Timeout>()
  return () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    timerRef.current = setTimeout(callback, timeout)
  }
}
