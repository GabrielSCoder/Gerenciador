import * as DropDown from "@radix-ui/react-dropdown-menu"
import { ReactNode, useState } from "react"
import Alert from "../Alert"

type props = {
    children: ReactNode
    data?: any
    nav: any
    setDeleteModal: any
    deleteModal: boolean
    handleFunc: any
    pending: boolean
}

export default function DropdownMenuCmpnt(props: props) {

    const [open, setOpen] = useState(false);

    return (
        <>
            <DropDown.Root open={open} onOpenChange={setOpen}>
                <DropDown.Trigger asChild>
                    {props.children}
                </DropDown.Trigger>
                <DropDown.Content className="flex flex-col gap-2 bg-white py-6 px-4 shadow rounded-md">
                    <DropDown.Item onClick={() => {
                        setOpen(false)
                        props.nav(`/cliente/${props.data.id}`)
                    }} className="relative flex h-[25px] select-none items-center rounded-[3px] text-[13px] leading-none text-black outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-green-500 data-[highlighted]:text-white">
                        Ver
                    </DropDown.Item>
                    <DropDown.Item onClick={() => {
                        setOpen(false)
                        props.nav(`/cliente/editar/${props.data.id}`)
                    }} className="relative flex h-[25px] select-none items-center rounded-[3px] text-[13px] leading-none text-black outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-green-500 data-[highlighted]:text-white">
                        Editar
                    </DropDown.Item>
                    <DropDown.Item className="relative flex h-[25px] select-none items-center rounded-[3px] text-[13px] leading-none text-black outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-green-500 data-[highlighted]:text-white" onClick={() => {
                        setOpen(false)
                        props.setDeleteModal(true)
                    }}>
                        Excluir
                    </DropDown.Item>
                </DropDown.Content>
            </DropDown.Root>
            <Alert texto={`O cliente ${props.data.nome} será deletado.`} titulo="Tem certeza?" confirmarBtn="Deletar" cancelarBtn="Cancelar" typeBtn="confirm" openState={props.deleteModal} setState={props.setDeleteModal} handle={() => props.handleFunc(props.data.id)} id={props.data.id} pending={props.pending} />
        </>
    )
}