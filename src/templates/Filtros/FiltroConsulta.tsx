import FormInput from "../Inputs/FormInputs.tsx"
import { FormData } from "../../components/Inputs"

type props = {
    control: any
    register: any
    usuarios: any
    formState : any
    setValue : any
}

const ss = [
    { id: 1, nome: "Nome", val : "nome" },
    { id: 2, nome: "Data de cadastro", val : "data_criacao" },
    { id: 3, nome: "Data de modificação", val : "data_modificacao" }
]

const ord = [
    { id: 1, nome: "Crescente", val : "ASC" },
    { id: 2, nome: "Decrescente", val : "DESC" }
]

export default function FiltroConsulta(props: props) {

    return (
        <div className="">
            <FormData className="grid grid-cols-4 bg-white border-0 justify-center px-10 gap-2">
                <FormInput.inputTxt name="pesquisa" register={props.register} control={props.control} placeholder="Pesquisar...." className="placeholder:text-sm text-black font-normal placeholder:italic w-full" label="Pesquisa (Nome, endereço, telefone, Identificação)" labelClassName="text-sm font-semibold col-span-3"
                />
                <FormInput.inputSelect name="usuario" control={props.control} register={props.register} dados={props.usuarios} className="h-[40px] text-base w-full font-normal"
                    label={"Cadastrado por"} labelStyle="text-sm font-semibold col-span-1" formState={props.formState} setValue={props.setValue} valor={"id"} defaultOpt defaultOptTitle={"Todos"} />

                <FormInput.inputSelect name="mod" control={props.control} register={props.register} dados={ss} className="h-[40px] text-base w-full font-normal"
                    label={"Ordenar por"} labelStyle="text-sm font-semibold col-span-1" valor={"val"} formState={props.formState} setValue={props.setValue} />

                <FormInput.inputSelect name="ordem" control={props.control} register={props.register} dados={ord} className="h-[40px] text-base w-full font-normal"
                    label={"Ordem"} labelStyle="text-sm font-semibold col-span-1" valor={"val"} formState={props.formState} setValue={props.setValue}/>

                <FormInput.Date name="data" register={props.register} className="border border-slate-300 rounded-md h-[40px] px-2 w-full font-normal" label="Data Início" placeholder="dd/mm/aaaa" labelClassName="col-span-1 font-semibold text-sm"
                />
                <FormInput.Date name="fdata" register={props.register} className="border border-slate-300 rounded-md h-[40px] px-2 w-full font-normal" label="Data Fim" placeholder="dd/mm/aaaa" labelClassName="col-span-1 font-semibold text-sm"
                />
            </FormData>
        </div>
    )
}