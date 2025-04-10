import { Control, UseFormRegister, Controller } from "react-hook-form"
import classNames from "../../utils/classNames";
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from "react";
import * as Switch from "@radix-ui/react-switch";
import * as Check from "@radix-ui/react-checkbox"
import { CheckIcon } from "@radix-ui/react-icons"
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { inputClasses } from "../classes/inputs";


type SwitchInput = {
    control: Control;
    name: string;
    // label?: boolean;
} & fieldInput

type fieldInput = {
    name: string;
    control?: Control;
    register?: UseFormRegister<any>;
    maxLength?: number;
    disabled?: boolean;
    onChange?: Function;
    className?: string;
    placeholder?: string;
    label?: string;
    labelStyle?: string;
    Isrequired?: boolean
    requiredText?: string
    errors?: any
    value?: any
    required ?: boolean
}

type rootProps = {
    children: ReactNode
    className?: string;
    label?: string;
    labelStyle?: string;
}

type labelProps = {
    children: ReactNode
    className?: string;
}

type textAreaInput = {
    rows?: number;
    columns?: number;
} & fieldInput

type selectInputOptions = {
    id?: number;
    name: string;
    valor?: string;
    control?: Control;
    register?: UseFormRegister<any>;
    dados?: any;
    className?: string
} & fieldInput

export function FormData(props: rootProps) {
    const { children, className } = props

    return (
        <form onSubmit={(e) => e.preventDefault()} className={classNames("flex flex-col space-y-2 border border-slate-300 p-4 rounded-md shadow-md", className)}>
            {children}
        </form>
    )
}

export function Title(labelProps: labelProps) {

    const { children, className } = labelProps;

    return (
        <label className={className}>{children}</label>
    )
}

export function Input(props: rootProps) {

    const { children } = props

    return (
        <>
            {children}
        </>
    )
}

function DateInput(props: fieldInput) {

    const { name, Isrequired, requiredText, control } = props

    return (
        <Controller
            name={name}
            control={control}
            rules={Isrequired ? { required: requiredText || "Campo obrigatório" } : {}}
            render={({ field, fieldState }) => {

                const selectedDate = field.value ? parse(field.value, "dd/MM/yyyy", new Date()) : null;

                return (
                    <div className="">
                        <DatePicker

                            selected={selectedDate}
                            onChange={(date) => {
                                field.onChange(date ? format(date, "dd/MM/yyyy") : "");
                            }}
                            dateFormat="dd/MM/yyyy"
                            locale={ptBR}
                            placeholderText="dd/mm/yyyy"
                            wrapperClassName="datePicker"
                            className={classNames(
                                "react-datepicker__input-container",
                                fieldState.error && "error"
                            )}
                        />
                        {fieldState.error && <p className="text-red-500 text-sm">{fieldState.error.message}</p>}
                    </div>
                );
            }}
        />
    );
}

function TextInput(props: fieldInput & {onFocus ?: Function, onBlur ?: Function }) {

    const { name, onChange, disabled, maxLength, register, className, placeholder, errors, requiredText, Isrequired, value, onFocus, onBlur } = props


    return (
        <>
            <input type="text" value={value} {...(register ? Isrequired ? register(name, { required: requiredText }) : register(name) : {})}
                disabled={disabled}
                maxLength={maxLength}
                className={classNames("text-[15px]", className, errors?.[name] ? "border-red-500 focus:border-red-500" : "border-slate-300")}
                placeholder={placeholder}
                onChange={(e) => {
                    register?.(name)?.onChange(e);
                    onChange?.(e);
                }}
                onFocus={(e) => {onFocus ? onFocus(e) : ""}}
                onBlur={(e) => {onBlur ? onBlur(e) : ""}}
                autoComplete="off"
            />
            {errors?.[name]?.message && <p className="text-red-500 text-sm">{errors?.[name]?.message}</p>}
        </>



    )

}

function VerifyTextInput(props: fieldInput) {

    const { name, disabled, maxLength, register, className, placeholder, errors, Isrequired, requiredText } = props


    return (
        <div>
            <input type="text" {...(register ? Isrequired ? register(name, { required: requiredText }) : register(name) : {})} disabled={disabled} maxLength={maxLength}
                className={classNames(className, "rounded-md w-full text-[15px]", errors?.[name] ? errors?.[name]?.message == "true" ? "border-green-500 focus:border-green-500" : "border-red-500 focus:border-red-500" : "border-slate-300")} placeholder={placeholder} />
            {errors?.[name]?.message && <p className={classNames("text-sm", errors?.[name]?.message == "true" ? "text-green-500" : "text-red-500 ")}>{errors?.[name]?.message == "true" ? "" : errors?.[name]?.message}</p>}
        </div>

    )

}

function TextArea(props: textAreaInput & React.HtmlHTMLAttributes<HTMLTextAreaElement>) {

    const { name, onChange, disabled, register, className, placeholder, label, labelStyle, columns, rows, ...rest } = props

    return (
        <textarea
            rows={rows ? rows : 3}
            cols={columns ? columns : 3}
            name={name}
            placeholder={placeholder}
            {...register?.(name)}
            {...rest}
            onChange={(e) => {
                register?.(name)?.onChange(e);
                onChange?.(e); 
            }}
            className={classNames(className, "resize-none")}
            disabled={disabled}>
        </textarea>
    )
}

function CheckBox(props: fieldInput) {


    const { name, className, label, labelStyle, control } = props


    const Check2 = () => {
        return (
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <Check.Root className={classNames("flex justify-center items-center size-[25px] appearance-none rounded", className)}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                    >
                        <Check.Indicator className="text-blue-600">
                            <CheckIcon />
                        </Check.Indicator>
                    </Check.Root>
                )}
            />

        )
    }

    return (
        <Input className={className}>
            {label && !!label ? (

                <div className="flex items-center">
                    <Check2 />
                    <label
                        className={classNames("pl-[15px] text-[15px] leading-none ", labelStyle)}
                        htmlFor="c1"
                    >
                        {label}
                    </label>
                </div>
            ) : (
                <Check2 />
            )}
        </Input>
    )
}

function SelectOption(props: selectInputOptions) {

    const { name, dados, register, className, label, labelStyle } = props

    const Selectt = () => {
        return (
            <select {...register && register(name)} className="rounded-md p-2 w-full border border-slate-300">
                <option className="">Selecione</option>
                {dados && dados.map((item: { id: Key | null | undefined; nome: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }) => (
                    <option key={item.id}>{item.nome}</option>
                ))}
            </select>
        )
    }

    return (
        <Input className={className}>
            {label && !!label ? (
                <label className={classNames("", labelStyle)}> {label}
                    <Selectt />
                </label>
            ) : (
                <Selectt />
            )}
        </Input>

    )
}


function OnlyNumber(props: fieldInput) {

    const { name, disabled, maxLength, register, placeholder, className, label, labelStyle, required } = props

    return (
       <>
            {label ? (
                <label className={labelStyle}>{required ? (<>{label}<strong className="text-red-500"> *</strong></>) : label}
                    <input type="number" name={name} {...register && register(name)} maxLength={maxLength} disabled={disabled} placeholder={placeholder} className={classNames("text-black ", className)} />
                </label>
            ) : (
                <input type="number" name={name} {...register && register(name)} maxLength={maxLength} disabled={disabled} placeholder={placeholder} className={classNames("text-black ", className)} />
            )}
        </>
    )
}

function InputCnpj(props: fieldInput) {
    const { name, label, labelStyle, className, register } = props

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const formattedValue = formatCNPJ(event.target.value);
        event.target.value = formattedValue;
    };

    const CCnpj = () => {
        return (
            <input type="text" name={name} {...register && register(name)} onChange={handleInputChange} className={classNames("text-black rounded-md w-full border-slate-300", className)} />
        )
    }

    return (
        <Input className={className}>
            {label && !!label ? (
                <label className={classNames("", labelStyle)}> {label}
                    <CCnpj />
                </label>
            ) : (
                <CCnpj />
            )}
        </Input>
    )
}

function SwitchIPT(props: SwitchInput) {

    const { name, control, label } = props
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <div className="flex items-center">
                    {label ? (
                        <label
                            className="pr-[15px] text-[15px] leading-none text-black"
                            htmlFor="airplane-mode"
                        >
                            {label}
                        </label>
                    ) : null}

                    <Switch.Root
                        className="relative h-[25px] w-[42px] cursor-default rounded-full bg-gray-400 shadow-[0_2px_10px] shadow-blackA4 outline-none focus:shadow-[0_0_0_2px] focus:shadow-black data-[state=checked]:bg-green-600"
                        id="airplane-mode"

                        checked={field.value}
                        onCheckedChange={field.onChange}
                    >
                        <Switch.Thumb className="block size-[21px] translate-x-0.5 rounded-full bg-white shadow-[0_2px_2px] shadow-blackA4 transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]" />
                    </Switch.Root>
                </div>
            )}
        >
        </Controller>

    )
}

function Password(props: fieldInput & React.InputHTMLAttributes<HTMLInputElement> & { toggled?: boolean }) {
    const [eyeOpen, setEyeOpen] = useState(false)
    const [inputType, setInputType] = useState("password")

    const { register, className, name, placeholder, toggled, errors, ...rest } = props

    const handleToggle = () => {

        setEyeOpen(!eyeOpen)
        if (inputType === "password") {
            setInputType("text")
        } else {
            setInputType("password")
        }
    }

    return (
        <div className="flex flex-col gap-1">
            <div className={classNames("flex border rounded-md h-[56px]", errors?.[name] ? errors?.[name]?.message == "true" ? "border-green-500 focus:border-green-500" : "border-red-500 focus:border-red-500" : "border-slate-300")}>
                <input type={!toggled ? inputType : "password"} {...rest} {...register && register(name)} placeholder={placeholder} className={classNames("dark:bg-black bg-white text-[15px] border-none outline-none w-full px-2 rounded-md dark:text-white text-black ", className)} />
                {!toggled && <p onClick={handleToggle} className="flex items-center justify-center dark:text-white text-black px-2">{eyeOpen ? <LuEye size={25} /> : <LuEyeClosed size={25} />}</p>}
            </div>
            {errors?.[name]?.message && <p className={classNames("text-sm", errors?.[name]?.message == "true" ? "text-green-500" : "text-red-500 ")}>{errors?.[name]?.message == "true" ? "" : errors?.[name]?.message}</p>}
        </div>

    )
}

Input.Switch = SwitchIPT
Input.TextArea = TextArea
Input.VerifyInputText = VerifyTextInput
Input.Number = OnlyNumber
Input.Text = TextInput
Input.CheckBox = CheckBox
Input.Title = Title
Input.Select = SelectOption
Input.Password = Password