import { toast } from "react-toastify";

export default function useToastRequest(func : Function, data : {pending : string, success : string, error : string }) {

    const delayPost = async () => {
        await new Promise(resolve => setTimeout(resolve, 2000));
        return func()
    };

    const notify = () => toast.promise(
        delayPost,
        {
           pending : data.pending,
           success : data.success,
           error: {
            render({ data }) {
              const err = data as any;
              return typeof err === "string" ? err : err.message || "Erro inesperado";
            }
          }
        }, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    }
    )

    return {
        notify
    }

}