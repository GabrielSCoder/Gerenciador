import { useCallback, useRef } from "react";
import { toast } from "react-toastify";

export function useToastRequest<T extends (...args: any[]) => Promise<any>>(
  func: T,
  data: { pending: string; success: string; error: string }
) {
  const delayPost = async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return func(...args);
  };

  const notify = (...args: Parameters<T>) =>
    toast.promise(
      delayPost(...args),
      {
        pending: data.pending,
        success: data.success,
        error: {
          render({ data }) {
            const err = data as any;
            return typeof err === "string" ? err : err.message || "Erro inesperado";
          },
        },
      },
      {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );

  return { notify };
}



export function useToastRequest2<T extends (...args: any[]) => Promise<any>>(
  func: T,
  data: { pending: string, success: string, error: string },
  delay: number = 500
) {
  const timeoutRef = useRef<any | null>(null)

  const notify = useCallback((...args: Parameters<T>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      toast.promise(
        func(...args),
        {
          pending: data.pending,
          success: data.success,
          error: {
            render({ data }) {
              const err = data as any;
              return typeof err === "string" ? err : err.message || "Erro inesperado"
            }
          }
        },
        {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      )
    }, delay)
  }, [func, data, delay])

  return { notify }
}
