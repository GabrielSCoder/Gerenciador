import { useForm } from "react-hook-form";
import FormInput from "../Inputs/FormInputs.tsx";
import { FormData, Input } from "../../components/Inputs";
import { useEffect, useState } from "react";
import { getUsuarioSelect } from "../../services/usuario.ts";

export default function ConsultaForm() {

    const { register, control } = useForm()
    const [data, setData] = useState()


    const getData = async () => {
        const resp = await getUsuarioSelect()
        if (resp.data.success) {
            setData(resp.data.dados)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    if (!data) {
        return <h2>Carregando</h2>
    }

    return (
        <FormData className="grid grid-cols-2 max-w-[800px] bg-white" >
            <FormInput.inputSelect name="usuario" dados={data} register={register} control={control} />
            <FormInput.inputAreaTxt register={register} name="desc" className="col-span-2 border border-slate-300" label="Descricao do procedimento" labelClassName="text-black" />
            <FormInput.inputSelect name="usuario" dados={data} register={register} control={control} />
            <Input.CheckBox name="fixo" control={control} label="Horario fixo" />
        </FormData>
    )
}