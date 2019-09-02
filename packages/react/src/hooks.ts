import {useEffect, DependencyList} from 'react'

export function useFetch(
  input: RequestInfo | null,
  init: Omit<RequestInit, 'signal'> | null,
  cb: (data: unknown) => void,
  dependencies?: any[]
): void {
  useEffect(() => {
    if (!input) return

    const abortController = new AbortController()

    async function fetchData() {
      try {
        const response = await fetch(input!, {
          ...init,
          signal: abortController.signal
        })

        cb(await response.json())
      } catch {}
    }

    fetchData()

    return () => abortController.abort()
  }, dependencies)
}

export interface EventListenerEffect<T extends EventTarget, E extends Event> {
  (): [T, string, (e: E) => void]
}

export function useEventListener<T extends EventTarget, E extends Event>(
  effect: EventListenerEffect<T, E>,
  deps?: DependencyList
) {
  useEffect(() => {
    const [target, event, callback] = effect()
    target.addEventListener(event, callback as EventListener)
    return () => target.removeEventListener(event, callback as EventListener)
  }, deps)
}
