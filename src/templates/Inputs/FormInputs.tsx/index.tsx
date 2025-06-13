import { InputHTMLAttributes, ReactNode, useState } from "react";
import classNames from "../../../utils/classNames";
import { Input } from "../../../components/Inputs";
import { InputMask } from "@react-input/mask";
import { NumericFormat } from 'react-number-format';
import { Combobox, ComboboxOptions, ComboboxInput, ComboboxOption, ComboboxButton } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { Controller } from "react-hook-form";

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

const people = [
    { id: 1, name: 'Durward Reynolds' },
    { id: 2, name: 'Kenton Towne' },
    { id: 3, name: 'Therese Wunsch' },
    { id: 4, name: 'Benedict Kessler' },
    { id: 5, name: 'Katelyn Rohan' },
]

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
                    <input type="text" {...rest} name={name} control={control} {...register && register(name)} className={classNames("bg-white rounded-md w-full border border-slate-300 text-[15px] h-[40px] block px-2", className)} />
                </label>
            ) : <input type="text" {...rest} control={control} {...register && register(name)} className={classNames("bg-white rounded-md p-2 w-full border border-slate-300 text-[15px] h-[40px] block px-2", className)} />}
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

function TextArea(props: any & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
    const {
        name,
        onChange,
        disabled,
        register,
        className,
        placeholder,
        label,
        labelClassName,
        columns,
        rows,
        required,
        ...rest
    } = props;

    const textAreaElement = (
        <textarea
            rows={rows ?? 3}
            cols={columns ?? 3}
            name={name}
            placeholder={placeholder}
            {...(register && register(name))}
            {...rest}
            onChange={(e) => {
                register?.(name)?.onChange(e);
                onChange?.(e);
            }}
            className={classNames(
                "bg-white rounded-md w-full border border-slate-300 text-[15px] h-auto p-2 resize-none block",
                className
            )}
            disabled={disabled}
        />
    );

    return label ? (
        <label className={classNames("block", labelClassName)}>
            {required ? (
                <>
                    {label}
                    <strong className="text-red-500"> *</strong>
                </>
            ) : label}
            {textAreaElement}
        </label>
    ) : (
        textAreaElement
    );
}

function SelectOption(props: any) {
    const {
        name, dados, register, className, label, labelClassName,
        valor, formState, setValue, defaultOpt, defaultOptTitle, required
    } = props;

    return (
        <>
            {label ? (
                <label className={labelClassName}>
                    {required ? (
                        <>
                            {label}
                            <strong className="text-red-500"> *</strong>
                        </>
                    ) : label}
                    <select
                        {...(register && register(name))}
                        className={classNames("bg-white rounded-md w-full border border-slate-300 text-[15px] h-[40px] block px-1", className)}
                        onChange={(e) => {
                            const v = e.target.value;
                            if (v == "padrao" && !defaultOpt) {
                                const dfVal = formState.defaultValue?.[name] ?? "";
                                setValue(name, dfVal);
                            } else {
                                setValue(name, v);
                            }
                        }}
                    >
                        {defaultOpt && (
                            <option value="padrao">{defaultOptTitle || "Selecione"}</option>
                        )}
                        {dados?.map((item: any) => (
                            <option key={item.id} value={
                                valor === "id" ? item.id :
                                    valor === "nome" ? item.nome :
                                        item.val
                            }>
                                {item.nome}
                            </option>
                        ))}
                    </select>
                </label>
            ) : (
                <select
                    {...(register && register(name))}
                    className={classNames("bg-white rounded-md w-full border border-slate-300 text-[15px] h-[40px] block px-1", className)}
                    onChange={(e) => {
                        const v = e.target.value;
                        if (v == "padrao" && !defaultOpt) {
                            const dfVal = formState.defaultValue?.[name] ?? "";
                            setValue(name, dfVal);
                        } else {
                            setValue(name, v);
                        }
                    }}
                >
                    {defaultOpt && (
                        <option value="padrao">{defaultOptTitle || "Selecione"}</option>
                    )}
                    {dados?.map((item: any) => (
                        <option key={item.id}>{item.nome}</option>
                    ))}
                </select>
            )}
        </>
    );
}

type Option = {
    id: number;
    name: string;
};

function DynamicSelect(props: { pesquisa: string, setPesquisa: any, selecionado: any, setSelecionado: any, dados: any[], divStyle?: string } & props) {

    const [query, setQuery] = useState('')
    const { dados, pesquisa, selecionado, setPesquisa, setSelecionado, register, name, className, labelClassName, required, label, placeholder, divStyle } = props

    const filteredPeople =
        query === ''
            ? dados
            : dados.filter((person) => {
                return person.nome.toLowerCase().includes(query.toLowerCase())
            })

    const comboinpt = (
        <Combobox value={selecionado} onChange={(value) => setSelecionado(value)} onClose={() => setQuery('')}>
            <div className="relative">
                <ComboboxInput
                    className={classNames(
                        'w-full rounded-lg border border-slate-300 bg-white py-2 pl-3 pr-10 text-sm text-slate-800',
                        'focus:outline-none focus:ring-2 focus:ring-slate-black'
                    )}
                    displayValue={(person: any) => person?.nome}
                    placeholder={placeholder || 'Pesquise...'}
                    onChange={(event) => setQuery(event.target.value)}
                />
                <ComboboxButton className="absolute inset-y-0 right-0 flex items-center px-2">
                    <ChevronDownIcon className="w-4 h-4 text-slate-500 group-hover:text-slate-700" />
                </ComboboxButton>

                <ComboboxOptions
                    anchor="bottom"
                    transition
                    className={classNames(
                        'w-(--input-width) rounded-xl border border-slate-300  bg-white p-1 [--anchor-gap:--spacing(1)] empty:invisible',
                        'transition duration-100 ease-in data-leave:data-closed:opacity-0'
                    )}
                >
                    {filteredPeople.length === 0 ? (
                        <div className="p-2 text-sm text-slate-500">Nenhum resultado encontrado.</div>
                    ) : (
                        filteredPeople.map((person) => (
                            <ComboboxOption
                                key={person.id}
                                value={person}
                                className="group flex cursor-default select-none items-center gap-2 rounded-md px-3 py-2 text-sm text-slate-800 hover:bg-slate-100 data-[focus]:bg-slate-100"
                            >
                                <CheckIcon className="invisible h-4 w-4 text-slate-600 group-data-selected:visible" />
                                {person.nome}
                            </ComboboxOption>
                        ))
                    )}
                </ComboboxOptions>
            </div>
        </Combobox>
    )

    return (

        <>
            {!label ? (
                <div className={divStyle}>
                    {comboinpt}
                </div>
            ) : (
                <div className={divStyle}>
                    <label className={labelClassName}> {required ? (<>{label}<strong className="text-red-500"> *</strong></>) : label}
                        {comboinpt}
                    </label >
                </div>
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
                    <InputMask mask="dd/mm/yyyy" replacement={{ d: /\d/, m: /\d/, y: /\d/ }}  {...register && register(name)} className={classNames("block border border-slate-300 h-[40px] w-full rounded-md px-2", className)}
                        placeholder={placeholder} />
                </label>
            )
                : (
                    <InputMask mask="dd/mm/yyyy" replacement={{ d: /\d/, m: /\d/, y: /\d/ }}  {...register && register(name)} className={classNames("block border border-slate-300 h-[40px] w-full rounded-md px-2", className)}
                        placeholder={placeholder} />
                )}
        </>

    )
}

const DteTime = (props: props) => {

    const { name, register, className, label, labelClassName, required, placeholder } = props

    return (
        <>
            {label ? (
                <label className={labelClassName}> {required ? (<>{label}<strong className="text-red-500"> *</strong></>) : label}
                    <input type="datetime-local" {...register && register(name)} className={classNames("block border border-slate-300 h-[40px] w-full rounded-md px-2", className)}
                        placeholder={placeholder} />
                </label>
            )
                : (
                    <input type="datetime-local" {...register && register(name)} className={classNames("block border border-slate-300 h-[40px] w-full rounded-md px-2", className)}
                        placeholder={placeholder} />
                )}
        </>
    )
}

const OnlyDate = (props: props) => {

    const { name, register, className, label, labelClassName, required, placeholder } = props

    return (
        <>
            {label ? (
                <label className={labelClassName}> {required ? (<>{label}<strong className="text-red-500"> *</strong></>) : label}
                    <input type="date" {...register && register(name)} className={classNames("block border border-slate-300 h-[40px] w-full rounded-md px-2", className)}
                        placeholder={placeholder} />
                </label>
            )
                : (
                    <input type="date" {...register && register(name)} className={classNames("block border border-slate-300 h-[40px] w-full rounded-md px-2", className)}
                        placeholder={placeholder} />
                )}
        </>
    )
}

const MoneyInput = ({ control, name, label, labelClassName, required, placeholder, className }: any) => {
    return (
        <div>
            {label && (
                <label className={labelClassName}>
                    {label}
                    {required && <strong className="text-red-500"> *</strong>}
                </label>
            )}

            <Controller
                name={name}
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <NumericFormat
                        {...field}
                        value={field.value ?? ""}
                        thousandSeparator="."
                        decimalSeparator=","
                        prefix="R$ "
                        decimalScale={2}
                        allowNegative={false}
                        placeholder={placeholder || "R$ 0,00"}
                        className={classNames(
                            "block border border-slate-300 rounded-md px-2 w-full text-[15px] h-[40px]",
                            className
                        )}
                        onValueChange={(values) => field.onChange(values.value)}
                    />
                )}
            />
        </div>
    );
};

FormInput.inputTxt = inputText
FormInput.inputAreaTxt = TextArea
FormInput.inputSelect = SelectOption
FormInput.Number = Number
FormInput.Date = Dte
FormInput.real = MoneyInput
FormInput.DateAndTime = DteTime
FormInput.Date = OnlyDate
FormInput.DynSelect = DynamicSelect

export default FormInput