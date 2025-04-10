import FormInput from "../Inputs/FormInputs.tsx"
import { FormData } from "../../components/Inputs"

type props = {
    control: any
    register: any
    usuarios: any
}

export default function Filtros(props: props) {

    return (
        <div className="">
            <FormData className="grid grid-cols-4 bg-white border-0 justify-center px-10 gap-2">
                <FormInput.inputTxt name="pesquisa" register={props.register} control={props.control} placeholder="Pesquisar...." className="placeholder:text-sm text-black font-normal placeholder:italic w-full" label="Pesquisa (Nome, endereço, telefone, Identificação)" labelClassName="text-sm font-semibold col-span-3"
                />
                <FormInput.inputSelect name="usuario" control={props.control} register={props.register} dados={props.usuarios} className="h-[40px] text-base w-full font-normal"
                    label={"Cadastrado por"} labelStyle="text-sm font-semibold col-span-1" valor={"id"} />
                <FormInput.Date name="data" register={props.register} className="border border-slate-300 rounded-md h-[40px] px-2 w-full font-normal" label="Data Início" placeholder="dd/mm/aaaa" labelClassName="col-span-1 font-semibold text-sm"
                />
                <FormInput.Date name="fdata" register={props.register} className="border border-slate-300 rounded-md h-[40px] px-2 w-full font-normal" label="Data Fim" placeholder="dd/mm/aaaa" labelClassName="col-span-1 font-semibold text-sm" 
                />
            </FormData>
        </div>
    )
}