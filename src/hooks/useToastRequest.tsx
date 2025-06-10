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
            const raw = typeof err === "string"
              ? err
              : err.message || err.dados || "Erro inesperado";

        
            const mensagens = Array.isArray(raw)
              ? raw
              : raw
                .split(/\s*(\||<br\s*\/?>)\s*/i) 
                .filter((msg: string) => msg && msg !== "|" && !msg.match(/^<br\s*\/?>$/i)) 
                .map((msg: string) => msg.trim());

            return (
              <div>
                {mensagens.map((msg : any, idx : number) => (
                  <div key={idx}>{msg}</div> 
                ))}
              </div>
            );
          },
        },
      },
      {
        position: "bottom-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
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

export function useToastRequest3<T extends (...args: any[]) => Promise<any>>(
  func: T,
  data: { pending: string; success: string; error: string }
) {
  const notify = async (...args: Parameters<T>): Promise<ReturnType<T> | undefined> => {
    toast.loading(data.pending, { toastId: "pending" });

    try {
      const result = await func(...args);
      toast.dismiss("pending");
      toast.success(data.success);
      return result;
    } catch (error: any) {
      toast.dismiss("pending");

      const raw = typeof error === "string"
        ? error
        : error.dados || error.message || "Erro inesperado";

      // notifyErrors3(raw);
      return undefined;
    }
  };

  return { notify };
}


export function notifyErrors(mensagem: string | string[]) {
  const mensagens = Array.isArray(mensagem)
    ? mensagem
    : mensagem.replace(/\|/g, '\n');

  console.log(mensagens)

  toast.error(mensagens);
}

export function formatErrorMessages(mensagem: string | string[]): string {
  const mensagens = Array.isArray(mensagem)
    ? mensagem.join("\n")
    : mensagem.split("|").map(m => m.trim()).filter(Boolean).join("\n");

  return mensagens;
}
