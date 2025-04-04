import * as Alert from "@radix-ui/react-alert-dialog"
import { ReactNode } from "react";
import classNames from "../../utils/classNames";

type ModalType = "delete" | "confirm" | "success";

export type modalProps = {
    state: any;
    stateMng: any;
    children: ReactNode;
    title: string;
    cancelText?: string;
    confirmText?: string;
    changeModals ?: Function
    alertType: ModalType;
}

type typeButtonProps = {
    alertType: ModalType;
    cancelText?: string;
    confirmText?: string;
}

function AlertDialog(props: modalProps) {

    const { state, stateMng, children, title, cancelText, confirmText, alertType } = props;

    return (
        <Alert.Root open={state} onOpenChange={stateMng}>
            <Alert.Portal>
                <Alert.Overlay className="fixed inset-0 bg-custom-bg-x data-[state=open]:animate-overlayShow" />
                <Alert.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-md dark:bg-black bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
                    <Alert.Title className="m-0 text-[17px] font-medium text-mauve12">
                        {title}
                    </Alert.Title>
                    <Alert.Description className="mb-5 mt-2.5 text-[15px] leading-normal text-mauve11">
                        {children || null}
                    </Alert.Description>
                    <div className="flex justify-end gap-[25px]">
                       <AlertDialog.Buttons alertType={alertType} cancelText={cancelText} confirmText={confirmText}/>
                    </div>
                </Alert.Content>
            </Alert.Portal>
        </Alert.Root>
    )
}

const AlertTypeComp = (props: typeButtonProps): JSX.Element => {

    const { alertType, confirmText } = props

    return (
        <div>
            <Alert.Action asChild>
                <button className={classNames("inline-flex h-[35px] items-center justify-center rounded px-[15px] font-medium leading-none  outline-none  focus:shadow-[0_0_0_2px]",
                    alertType == "confirm" && "bg-green4 hover:bg-green5 focus:shadow-green7 text-green11",
                    alertType == "delete" && "bg-red4 text-red11 hover:bg-red5 focus:shadow-red7"
                )}>
                    {confirmText || "Confirm"}
                </button>
            </Alert.Action>
        </div>
    )
}

AlertDialog.Buttons = (props: typeButtonProps) => {

    const { alertType, cancelText, confirmText } = props

    return (
        <div className="flex justify-center gap-[25px]">
            {alertType != "success" ? (
                <>
                    <Alert.Cancel asChild>
                        <button className="inline-flex h-[35px] items-center justify-center rounded bg-mauve4 px-[15px] font-medium leading-none text-mauve11 outline-none hover:bg-mauve5 focus:shadow-[0_0_0_2px] focus:shadow-mauve7">
                            {cancelText || "Cancel"}
                        </button>
                    </Alert.Cancel>
                    <AlertTypeComp alertType={alertType} cancelText={cancelText} confirmText={confirmText} />
                </>

            ) : (
                <>
                    <Alert.Action asChild>
                        <button className={"bg-green4 hover:bg-green5 focus:shadow-green7 text-green11 inline-flex h-[35px] items-center justify-center rounded px-[15px] font-medium leading-none  outline-none  focus:shadow-[0_0_0_2px]"}
                        >
                            {confirmText || "confirm"}
                        </button>
                    </Alert.Action>
                </>
            )}

        </div>
    )
}

export default AlertDialog;