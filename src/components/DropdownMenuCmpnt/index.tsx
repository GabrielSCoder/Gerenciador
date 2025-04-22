import * as DropDown from "@radix-ui/react-dropdown-menu"
import { ReactNode } from "react"

type props = {
    children : ReactNode
    data ?: any
    nav : any
    setDeleteModal : any
}

export default function DropdownMenuCmpnt(props: props) {

    return (
        <DropDown.Root >
            <DropDown.Trigger asChild>
                {props.children}
            </DropDown.Trigger>
            <DropDown.Content className="flex flex-col gap-2 bg-white py-6 px-4 shadow rounded-md">
                <DropDown.Item onClick={() => props.nav(`/cliente/${props.data.id}`)} className="relative flex h-[25px] select-none items-center rounded-[3px] text-[13px] leading-none text-black outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-green-500 data-[highlighted]:text-white">
                    Editar
                </DropDown.Item>
                <DropDown.Item className="relative flex h-[25px] select-none items-center rounded-[3px] text-[13px] leading-none text-black outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-green-500 data-[highlighted]:text-white" onClick={() => props.setDeleteModal(true)}>
                    Excluir
                </DropDown.Item>
            </DropDown.Content>
        </DropDown.Root>
    )
}