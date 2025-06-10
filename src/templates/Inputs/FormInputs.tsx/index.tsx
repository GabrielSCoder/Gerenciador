import { InputHTMLAttributes, ReactNode, useState } from "react";
import classNames from "../../../utils/classNames";
import { Input } from "../../../components/Inputs";
import { InputMask } from "@react-input/mask";
import { NumericFormat } from 'react-number-format';
import { Combobox, ComboboxOptions, ComboboxInput, ComboboxOption, ComboboxButton } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";

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

function DynamicSelect(props: { pesquisa: string, setPesquisa: any, selecionado: any, setSelecionado: any, dados: any[] }) {

    const [query, setQuery] = useState('')
    const {dados, pesquisa, selecionado, setPesquisa, setSelecionado} = props

    const filteredPeople =
        query === ''
            ? dados
            : dados.filter((person) => {
                return person.name.toLowerCase().includes(query.toLowerCase())
    })

    return (
        <div className="">
            <Combobox value={selecionado} onChange={(value) => setSelecionado(value)} onClose={() => setQuery('')}>
                <div className="relative">
                    <ComboboxInput
                        className={classNames(
                            'w-full rounded-lg border-none bg-white/5 py-1.5 pr-8 pl-3 text-sm/6 text-white border border-slate-300',
                            'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25 border border-slate-300'
                        )}
                        displayValue={(person) => person?.nome}
                        onChange={(event) => setQuery(event.target.value)}
                    />
                    <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
                        <ChevronDownIcon className="size-4 fill-white/60 group-data-hover:fill-white" />
                    </ComboboxButton>
                </div>

                <ComboboxOptions
                    anchor="bottom"
                    transition
                    className={classNames(
                        'w-(--input-width) rounded-xl border border-white/5 bg-white/5 p-1 [--anchor-gap:--spacing(1)] empty:invisible',
                        'transition duration-100 ease-in data-leave:data-closed:opacity-0'
                    )}
                >
                    {filteredPeople.map((person) => (
                        <ComboboxOption
                            key={person.id}
                            value={person}
                            className="group flex cursor-default items-center gap-2 rounded-lg px-3 py-1.5 select-none data-focus:bg-white/10"
                        >
                            <CheckIcon className="invisible size-4 fill-white group-data-selected:visible" />
                            <div className="text-sm/6 text-white">{person.name}</div>
                        </ComboboxOption>
                    ))}
                </ComboboxOptions>
            </Combobox>
        </div>
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

const MoneyInput = (props: props) => {
    const { name, register, className, label, labelClassName, required, placeholder } = props;

    return (
        <>
            {label ? (
                <label className={labelClassName}>
                    {required ? (
                        <>
                            {label}
                            <strong className="text-red-500"> *</strong>
                        </>
                    ) : (
                        label
                    )}
                    <NumericFormat
                        thousandSeparator="."
                        decimalSeparator=","
                        prefix="R$ "
                        decimalScale={2}
                        fixedDecimalScale
                        allowNegative={false}
                        className={classNames("block border border-slate-300 rounded-md px-2 w-full text-[15px] h-[40px]", className)}
                        placeholder={placeholder || "R$ 0,00"}
                        {...(register ? register(name) : {})}
                    />
                </label>
            ) : (
                <NumericFormat
                    thousandSeparator="."
                    decimalSeparator=","
                    prefix="R$ "
                    decimalScale={2}
                    fixedDecimalScale
                    allowNegative={false}
                    className={classNames("block border border-slate-300 rounded-md px-2 w-full text-[15px] h-[40px]", className)}
                    placeholder={placeholder || "R$ 0,00"}
                    {...(register ? register(name) : {})}
                />
            )}
        </>
    );
};

FormInput.inputTxt = inputText
FormInput.inputAreaTxt = TextArea
FormInput.inputSelect = SelectOption
FormInput.Number = Number
FormInput.Date = Dte
FormInput.real = MoneyInput
FormInput.DateAndTime = DteTime
FormInput.DynSelect = DynamicSelect

export default FormInput