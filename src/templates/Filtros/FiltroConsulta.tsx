import FormInput from "../Inputs/FormInputs.tsx"
import { FormData } from "../../components/Inputs"

type props = {
    control: any
    register: any
    usuarios: any
    formState: any
    setValue: any
    selecionado: any
    setSelecionado: any
    clienteDados: any[]
    pesquisa: any
    setPesquisa: any
}

const ss = [
    { id: 1, nome: "Nome", val: "cliente_nome" },
    {id : 4, nome : "Status", val : "status"},
    { id: 5, nome: "Forma de pagamento", val: "forma_pagamento" },
    { id: 2, nome: "Horário", val: "horario" },
    { id: 6, nome: "Data de cadastro", val: "data_criacao" },
    { id: 3, nome: "Data de modificação", val: "data_modificacao" },
]

const ord = [
    { id: 1, nome: "Crescente", val: "ASC" },
    { id: 2, nome: "Decrescente", val: "DESC" }
]


export default function FiltroConsulta(props: props) {

    return (
        <div className="">
            <FormData className="grid grid-cols-4 items-center bg-white border-0 justify-center px-10 gap-2">

                <FormInput.inputTxt name="pesquisa" register={props.register} control={props.control} placeholder="Pesquisar...." className="placeholder:text-sm text-black font-normal placeholder:italic w-full" label="Pesquisa (procedimento, observação, tipo)" labelClassName="text-sm font-semibold col-span-3"
                />

                <FormInput.inputSelect name="usuario" control={props.control} register={props.register} dados={props.usuarios} className="h-[40px] text-base w-full font-normal"
                    label={"Cadastrado por"} labelClassName="text-sm font-semibold col-span-1" formState={props.formState} setValue={props.setValue} valor={"id"} defaultOpt defaultOptTitle={"Todos"} />

                <FormInput.inputSelect name="mod" control={props.control} register={props.register} dados={ss} className="h-[40px] text-base w-full font-normal"
                    label={"Ordenar por"} labelClassName="text-sm font-semibold col-span-1" valor={"val"} formState={props.formState} setValue={props.setValue} />

                <FormInput.inputSelect name="ordem" control={props.control} register={props.register} dados={ord} className="h-[40px] text-base w-full font-normal"
                    label={"Ordem"} labelClassName="text-sm font-semibold col-span-1" valor={"val"} formState={props.formState} setValue={props.setValue} />

                <FormInput.DynSelect dados={props.clienteDados} pesquisa="" selecionado={props.selecionado} setPesquisa={props.setPesquisa}
                    setSelecionado={props.setSelecionado} label="Cliente" labelClassName="text-sm font-semibold" divStyle="col-span-1" name="cliente"
                    register={props.register} placeholder="Pesquisar..."
                />

                <FormInput.inputSelect name="profissional" control={props.control} register={props.register} dados={props.usuarios}
                    className="h-[40px] text-base w-full font-normal" label={"Doutor"} labelClassName="text-sm font-semibold col-span-1" formState={props.formState}
                    setValue={props.setValue} valor={"id"} defaultOpt defaultOptTitle={"Todos"}
                />

                <FormInput.Date name="data" register={props.register} className="border border-slate-300 rounded-md h-[40px] px-2 w-full font-normal" label="Início Data de cadastro" labelClassName="col-span-1 font-semibold text-sm"
                />
                <FormInput.Date name="fdata" register={props.register} className="border border-slate-300 rounded-md h-[40px] px-2 w-full font-normal" label="Fim Data de cadastro" labelClassName="col-span-1 font-semibold text-sm"
                />
                <FormInput.Date name="horario" register={props.register} className="border border-slate-300 rounded-md h-[40px] px-2 w-full font-normal" label="Horário Início" labelClassName="col-span-1 font-semibold text-sm"
                />
                <FormInput.Date name="fhorario" register={props.register} className="border border-slate-300 rounded-md h-[40px] px-2 w-full font-normal" label="Horário Fim" labelClassName="col-span-1 font-semibold text-sm"
                />

            </FormData>
        </div>
    )
}