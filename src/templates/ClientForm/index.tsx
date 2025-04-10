import { toast } from "react-toastify";
import Button from "../../components/Button/index.tsx";
import { FormData, Input } from "../../components/Inputs";
import FormInput from "../Inputs/FormInputs.tsx";
import useToastRequest from "../../hooks/useToastRequest.ts";
import { useState } from "react";
import { useWatch } from "react-hook-form";
import Card from "../../components/Card/index.tsx";

type props = {
    control: any
    register: any
    handleFunction: any
}

export default function ClientForm(props: props) {

    const { control, register, handleFunction } = props
    const { notify } = useToastRequest(handleFunction, { pending: "salvando...", success: "Salvo!", error: "Erro" })
    const tel = useWatch({ control, name: "telefone_adicional" })

    return (
        <FormData className="grid grid-cols-4 gap-2 bg-white w-full max-w-[800px]">

            <FormInput.inputTxt register={register} name="nome" control={control} label="Nome" labelClassName="col-span-4 text-lg" required />

            <FormInput.inputTxt register={register} name="indentificacao" control={control} label="Indentificação (RG/CPF)" labelClassName="col-span-4 text-lg" />

            <FormInput.inputTxt register={register} control={control} name="endereco" required label="Endereço" labelClassName="col-span-3 text-lg" />

            <FormInput.Number register={register} control={control} name="numero" required label="Número" labelClassName="text-lg col-span-1" />

            <FormInput.inputTxt register={register} control={control} name="telefone" className="" label="Telefone" labelClassName="text-lg col-span-4" />

            {tel ? (
                <FormInput.inputTxt register={register} control={control} name="telefone2" label="Telefone extra" labelClassName="col-span-4 text-lg" />
            ) : ""}

            <Input.CheckBox name="telefone_adicional" control={control} register={register} label="Telefone Adicional?" labelStyle="text-black justify-start" className="border border-slate-300"/>

            <div className="w-full col-span-4 flex items-center justify-center">
                <Button type="submit" onClick={notify} text="Confirmar" className="min-w-[150px]" />
            </div>

        </FormData>
    )
}