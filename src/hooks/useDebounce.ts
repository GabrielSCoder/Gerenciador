import { useRef } from "react";
import { useCallback } from "react"

export default function useDebounce(fn : Function, delay : number) {
    const timeoutRef = useRef<null|number>(null);

    function debounceFn(...args : any) {
        if (timeoutRef.current)
            window.clearTimeout(timeoutRef.current);

        timeoutRef.current = window.setTimeout(() => {
            fn(...args);
        }, delay)
    }

    return debounceFn;
}


export function useDebouncedCallback<T extends (...args: any[]) => void>(callback: T, delay: number) {
    const timeoutRef = useRef<any>(null)

    const debouncedFunction = useCallback((...args: Parameters<T>) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }

        timeoutRef.current = setTimeout(() => {
            callback(...args)
        }, delay)
    }, [callback, delay])

    return debouncedFunction
}