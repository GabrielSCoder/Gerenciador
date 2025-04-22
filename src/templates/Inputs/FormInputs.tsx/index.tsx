import { InputHTMLAttributes, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from "react";
import classNames from "../../../utils/classNames";
import { Input } from "../../../components/Inputs";
import { InputMask } from "@react-input/mask";

type props = {
    name: string
    control?: any
    register: any
    label?: string
    className?: string
    required?: boolean
    labelClassName?: string
    placeholder?: string
}

function FormInput(children: ReactNode) {
    return (
        <>
            {children}
        </>
    )
}

const inputText = ({ control, name, register, className, label, labelClassName, required, ...rest }: props & InputHTMLAttributes<HTMLInputElement>) => {
    return (
        <>
            {label ? (
                <label className={labelClassName}> {required ? (<>{label}<strong className="text-red-500"> *</strong></>) : label}
                    <input type="text" {...rest} name={name} control={control} {...register && register(name)} className={classNames("bg-white rounded-md w-full p-2 border border-slate-300 text-[15px] h-[40px] block", className)} />
                </label>
            ) : <input type="text" {...rest} control={control} {...register && register(name)} className={classNames("bg-white rounded-md p-2 w-full border border-slate-300 text-[15px] h-[40px] block", className)} />}
        </>

    )
}

const filterIpt = ({ control, name, register, className, label, labelClassName, required, ...rest }: props & InputHTMLAttributes<HTMLInputElement>) => {

    return (
        <>
            {label ? (
                <label className={labelClassName}> {required ? (<>{label}<strong className="text-red-500"> *</strong></>) : label}
                    <input type="text" {...rest} name={name} control={control} {...register && register(name)} className={classNames("bg-white rounded-md w-full p-2 border border-slate-300 text-[15px] h-[40px] block", className)} />
                </label>
            ) : <input type="text" {...rest} control={control} {...register && register(name)} className={classNames("bg-white rounded-md p-2 w-full border border-slate-300 text-[15px] h-[40px] block", className)} />}
        </>

    )
}

const TextArea = ({ name, register, className }: props) => {

    return (
        <Input.TextArea name={name} register={register} className={className} />
    )

}

function SelectOption(props: any) {

    const { name, dados, register, className, label, labelStyle, valor, formState, setValue, defaultOpt, defaultOptTitle } = props

    return (
        <>
            {label ? (
                <label className={classNames("", labelStyle)}> {label}
                    <select {...register && register(name)} className={classNames("rounded-md p-2 w-full border border-slate-300", className)}
                        onChange={(e) => {
                            const v = e.target.value; if (v == "padrao" && !defaultOpt) { const dfVal = formState.defaultValue?.[name] ?? ""; setValue(name, dfVal) } else { setValue(name, v) }
                        }}
                    >
                        {defaultOpt ? <option className="" value={"padrao"}>{defaultOptTitle ? defaultOptTitle : "Selecione"}</option> : ""}
                        {dados && dados.map((item: any) => (
                            <option key={item.id} value={props.valor == "id" ? item.id : props.valor == "nome" ? item.nome : item.val}>{item.nome}</option>
                        ))}
                    </select>
                </label>
            ) : (
                <select {...register && register(name)} className={classNames("rounded-md p-2 w-full border border-slate-300", className)}
                    onChange={(e) => {
                        const v = e.target.value; if (v == "padrao" && !defaultOpt) { const dfVal = formState.defaultValue?.[name] ?? ""; setValue(name, dfVal) } else { setValue(name, v) }
                    }}
                >
                    {defaultOpt ? <option className="" value={"padrao"}>{defaultOptTitle ? defaultOptTitle : "Selecione"}</option> : ""}
                    {dados && dados.map((item: { id: Key | null | undefined; nome: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }) => (
                        <option key={item.id}>{item.nome}</option>
                    ))}
                </select>
            )}
        </>

    )
}

const Number = (props: props) => {

    const { name, register, control, label, labelClassName, required } = props

    return (
        <Input.Number name={name} register={register} className="border border-slate-300 h-[40px] w-full rounded-md px-2" control={control} labelStyle={labelClassName} label={label}
            required={required} />
    )
}

const Dte = (props: props) => {

    const { name, register, className, label, labelClassName, required, placeholder } = props

    return (
        <>
            {label ? (
                <label className={labelClassName}> {required ? (<>{label}<strong className="text-red-500"> *</strong></>) : label}
                    <InputMask mask="dd/mm/yyyy" replacement={{ d: /\d/, m: /\d/, y: /\d/ }}  {...register && register(name)} className={classNames("block", className)}
                        placeholder={placeholder} />
                </label>
            )
                : (
                    <InputMask mask="dd/mm/yyyy" replacement={{ d: /\d/, m: /\d/, y: /\d/ }}  {...register && register(name)} className={classNames("block", className)}
                        placeholder={placeholder} />
                )}
        </>

    )
}

FormInput.inputTxt = inputText
FormInput.inputAreaTxt = TextArea
FormInput.inputSelect = SelectOption
FormInput.Number = Number
FormInput.Date = Dte

export default FormInput