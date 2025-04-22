import * as  AlertDialog from "@radix-ui/react-alert-dialog";
import { ReactNode } from "react";

type props = {
    titulo: string
    textoTrigger ?: string
    texto: string
    cancelarBtn?: string
    confirmarBtn?: string
    trigger?: ReactNode
    typeBtn: "confirm" | "delete" | "check"
    openState ?: boolean
}

export default function Alert(props: props) {
    return (
        <AlertDialog.Root open={props.openState ? props.openState : false}>
            {props.textoTrigger ? (
                <AlertDialog.Trigger asChild>
                    <button className="inline-flex h-[35px] items-center justify-center rounded bg-violet4 px-[15px] font-medium leading-none text-violet11 outline-none outline-offset-1 hover:bg-mauve3 focus-visible:outline-2 focus-visible:outline-violet6 select-none">
                        {props.textoTrigger}
                    </button>
                </AlertDialog.Trigger>
            ) : ""}
            <AlertDialog.Portal>
                <AlertDialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-overlayShow" />
                <AlertDialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-[25px] shadow-[var(--shadow-6)] focus:outline-none data-[state=open]:animate-contentShow">
                    <AlertDialog.Title className="m-0 text-[17px] font-bold text-mauve12">
                        {props.titulo}
                    </AlertDialog.Title>
                    <AlertDialog.Description className="mb-5 mt-[15px] text-[15px] leading-normal text-mauve11">
                        {props.texto}
                    </AlertDialog.Description>
                    <div className="flex justify-end gap-[25px]">
                        {props.cancelarBtn ? (
                            <AlertDialog.Cancel asChild>
                            <button className="inline-flex h-[35px] items-center justify-center rounded bg-mauve4 px-[15px] font-medium leading-none text-mauve11 outline-none outline-offset-1 hover:bg-mauve5 focus-visible:outline-2 focus-visible:outline-mauve7 select-none">
                                {props.cancelarBtn}
                            </button>
                        </AlertDialog.Cancel>
                        ) : ""}
                        <AlertDialog.Action asChild>
                            <button className="inline-flex h-[35px] items-center justify-center rounded bg-red4 px-[15px] font-medium leading-none text-red11 outline-none outline-offset-1 hover:bg-red5 focus-visible:outline-2 focus-visible:outline-red7 select-none">
                                {props.confirmarBtn}
                            </button>
                        </AlertDialog.Action>
                    </div>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>
    )
}
