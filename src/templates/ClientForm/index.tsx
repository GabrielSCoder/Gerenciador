import Button from "../../components/Button/index.tsx";
import { FormData, Input } from "../../components/Inputs";
import FormInput from "../Inputs/FormInputs.tsx";

type props = {
    control: any
    register: any
    handleFunction: any
}

export default function ClientForm(props: props) {

    const { control, register, handleFunction } = props


    return (
        <FormData className="grid grid-cols-4 gap-2 bg-white w-full max-w-[800px]">

            <FormInput.inputTxt register={register} name="nome" control={control} label="Nome" labelClassName="col-span-4 text-lg" required />

            <FormInput.inputTxt register={register} control={control} name="email" label="Email" labelClassName="col-span-4 text-lg" required />

            <FormInput.inputTxt register={register} control={control} name="rua" label="Rua" labelClassName="col-span-3 text-lg" required />

            <Input.Number register={register} name="numero_residencia" label="Número" className="bg-white border border-slate-300 rounded-md h-[40px]" labelStyle="px-2 col-span-1" />

            <FormInput.inputTxt register={register} control={control} name="telefone" label="Telefone" labelClassName="col-span-4 text-lg" required />

            <div className="w-full col-span-4 flex items-center justify-center">
                <Button type="submit" onClick={handleFunction} text="Confirmar" className="min-w-[150px]" />
            </div>

        </FormData>
    )
}