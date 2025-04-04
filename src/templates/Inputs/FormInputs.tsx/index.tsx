import { InputHTMLAttributes, ReactNode } from "react";
import classNames from "../../../utils/classNames";

type props = {
    name : string
    control : any
    register : any
    label ?: string
    className ?: string
    required ?: boolean
    labelClassName ?: string
}

function FormInput(children: ReactNode) {
    return (
        <>
            {children}
        </>
    )
}

const inputText = ({control, name, register, className, label, labelClassName, required, ...rest} : props & InputHTMLAttributes<HTMLInputElement>) => {
    return (
        <>
            {label ? (
                <label className={labelClassName}> {required ? (<>{label}<strong className="text-red-500"> *</strong></>) : name}
                    <input type="text" {...rest} name={name} control={control} {...register && register(name)} className={classNames("bg-white rounded-md w-full p-2 border border-slate-300 text-[15px] h-[40px] block", className)} />
                </label>
            ) :  <input type="text" {...rest} control={control} {...register && register(name)} className={classNames("bg-white rounded-md p-2 w-full border border-slate-300 text-[15px] h-[40px] block", className)} />}
        </>

    )
}


FormInput.inputTxt = inputText

export default FormInput