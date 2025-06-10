import { useForm } from "react-hook-form";
import FormInput from "../Inputs/FormInputs.tsx";
import { FormData, Input } from "../../components/Inputs";
import { useEffect, useState } from "react";
import { getUsuarioSelect } from "../../services/usuario.ts";
import { BsLayoutSplit } from "react-icons/bs";
import { BsReverseLayoutSidebarReverse } from "react-icons/bs"
import classNames from "../../utils/classNames.ts";
import Button from "../../components/Button/index.tsx";

const pagamentos = [
    { id: 1, nome: "Dinheiro vivo" },
    { id: 2, nome: "Pix" },
    { id: 3, nome: "Cartão débito" },
    { id: 4, nome: "Cartão crédito" },
    { id: 5, nome: "Cheque" },
    { id: 6, nome: "Outro" }
]

const status = [
    { id: 1, nome: "Marcada" },
    { id: 2, nome: "Concluída" },
    { id: 3, nome: "Cancelada" },
]

type props = {
    register : any
    control : any
    setState : any
    clienteDados : any[]
    setPesquisa : any
    usuarioDados : any[]
    setSelecionado : any
    selecionado : any
}

export default function ConsultaForm(props : props) {

    const [layout, setLayout] = useState(1)
    const { control, register, setState, clienteDados, setPesquisa, usuarioDados, setSelecionado, selecionado} = props

    const changeLayout = () => {
        layout == 1 ? setLayout(2) : setLayout(1)
    }


    return (
        <div className={classNames("flex flex-col max-h-full", layout == 2 ? "gap-4" : "")}>
            <div className={classNames("bg-white text-center shadow-md rounded-md flex items-center justify-between relative px-4", layout == 2 ? "h-20 py-4 max-w-[880px]" : "h-12 py-4")}>
                <div className="absolute left-0 right-0 pointer-events-none">
                    <Input.Title className="text-[20px] ">Formulário de consulta</Input.Title>
                </div>
                <div className="invisible w-[120px]"></div>
                <button onClick={() => changeLayout()} className="py-2 px-4 bg-sky-500 text-white rounded-md hover:cursor-pointer">
                    {layout == 1 ? <BsLayoutSplit /> : <BsReverseLayoutSidebarReverse />}
                </button>
            </div>
            {layout == 1 ? (
                <div className="flex gap-2 py-2 max-h-[800px] w-full">
                    <FormData className="grid grid-cols-4 gap-2 bg-black w-1/2 p-2 min-h-[700px]">
                        <FormInput.DynSelect dados={clienteDados} pesquisa="" selecionado={selecionado} setPesquisa={setPesquisa} setSelecionado={setSelecionado}/>
                        {/* <FormInput.inputTxt register={register} name="nome" control={control} label="Paciente" labelClassName="col-span-4 text-lg" required />
                        <FormInput.inputTxt register={register} name="tipo" control={control} label="Tipo" labelClassName="col-span-4 text-lg" required />
                        <FormInput.inputTxt register={register} name="procedimento" control={control} label="Procedimento" labelClassName="col-span-4 text-lg" required />
                        <FormInput.inputTxt register={register} name="dente_afetado" control={control} label="Dente afetado" labelClassName="col-span-4 text-lg" required />
                        <FormInput.inputTxt register={register} name="descricao" control={control} label="Descricão" labelClassName="col-span-4 text-lg" />
                        <FormInput.inputSelect register={register} name="profissional_id" control={control} label="Doutor" labelClassName="col-span-4 text-lg" dados={usuarioDados} required />
                        <FormInput.DateAndTime register={register} name="horario" control={control} label="Data marcada" labelClassName="col-span-4 text-lg" placeholder="" /> */}
                    </FormData>
                    <FormData className="flex flex-col gap-4 bg-black w-1/2 p-2 min-h-[600px]">
                        <FormInput.inputSelect register={register} name="forma_pagamento" control={control} label="Forma de Pagamento" labelClassName="col-span-4 text-lg"
                            required dados={pagamentos} />
                        <FormInput.real register={register} name="preco" label="Valor" labelClassName="text-lg col-span-2" required className="w-1/2" />
                        <FormInput.inputAreaTxt register={register} rows={8} name="observacao" control={control} label="Observações extras" labelClassName="col-span-4 text-lg" />
                        <FormInput.inputSelect register={register} name="status" control={control} label="Status da consulta" labelClassName="col-span-4 text-lg"
                            required dados={status} />
                        <div className=" w-full flex flex-col gap-20 justify-center items-center mt-10">
                            <Input.Switch name="pago" control={control} label="Pago" />
                            <Button onClick={() => setState(true)} loading={false} text="Confirmar" type="submit" />
                        </div>
                    </FormData>
                </div>
            ) : (
                <FormData className="grid grid-cols-4 gap-4 bg-black p-4 max-w-[880px]">
                    <FormInput.inputTxt register={register} name="nome" control={control} label="Paciente" labelClassName="col-span-4 text-lg" required />
                    <FormInput.inputTxt register={register} name="nome" control={control} label="Tipo" labelClassName="col-span-4 text-lg" required />
                    <FormInput.inputTxt register={register} name="nome" control={control} label="Procedimento" labelClassName="col-span-4 text-lg" required />
                    <FormInput.inputTxt register={register} name="nome" control={control} label="Dente afetado" labelClassName="col-span-4 text-lg" required />
                    <FormInput.inputTxt register={register} name="nome" control={control} label="Descricão" labelClassName="col-span-4 text-lg" required />
                    <FormInput.inputSelect register={register} name="nome" control={control} label="Doutor" labelClassName="col-span-4 text-lg" dados={usuarioDados} required />
                    <FormInput.DateAndTime register={register} name="nome" control={control} label="Data marcada" labelClassName="col-span-4 text-lg" placeholder="" />
                    <FormInput.inputSelect register={register} name="nome" control={control} label="Forma de Pagamento" labelClassName="col-span-4 text-lg"
                        required dados={pagamentos} />
                    <FormInput.inputAreaTxt register={register} name="nome" control={control} rows={6} label="Observações extras" labelClassName="col-span-4 text-lg" />
                    <FormInput.real register={register} name="real" label="Valor" labelClassName="text-lg col-span-4" required />
                    <div className="w-full flex flex-col col-span-4 justify-center items-center gap-8">
                        <Input.Switch name="pago" control={control} label="Pago" />
                        <Button onClick={() => setState(true)} loading={false} text="Confirmar" type="submit" />
                    </div>
                </FormData>
            )}
        </div>

    )
}