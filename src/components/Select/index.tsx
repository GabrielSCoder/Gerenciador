import * as Select from "@radix-ui/react-select";
import { forwardRef, ReactNode } from "react";
import {
    CheckIcon,
    ChevronDownIcon,
    ChevronUpIcon,
} from "@radix-ui/react-icons";
import classNames from "../../utils/classNames";

const style = "text-black dark:text-gray-600 inline-flex h-[56px] w-full items-center justify-between gap-[5px] rounded bg-white dark:bg-black px-[10px] text-[15px]shadow-sm outline-none dark:hover:bg-gray-900 hover:bg-gray-100 dark:text-gray-500focus:border-blue-500 border "

export const SelectMain = ({
    children,
    value,
    onChange,
    placeholder = "Selecione uma opção...",
    errors
}: {
    children: ReactNode;
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    errors?: any
}) => (
    <div>
        <Select.Root value={value} onValueChange={onChange}>
            <Select.Trigger
                className={classNames(style, errors && "border-red-500")}
            >
                <Select.Value placeholder={placeholder} />
                <Select.Icon className="dark:text-gray-600 text-black">
                    <ChevronDownIcon />
                </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
                <Select.Content
                    className="w-[310px] mt-1 
                   rounded-md bg-white dark:bg-black border border-gray-300"
                    position="popper"
                >
                    <Select.ScrollUpButton className="flex h-[25px] cursor-default items-center justify-center text-white">
                        <ChevronUpIcon />
                    </Select.ScrollUpButton>
                    <Select.Viewport className="p-[5px] min-h-[50px] w-[300px]">
                        <Select.Group>{children}</Select.Group>
                    </Select.Viewport>
                    <Select.ScrollDownButton className="flex h-[25px] cursor-default items-center justify-center text-white">
                        <ChevronDownIcon />
                    </Select.ScrollDownButton>
                </Select.Content>
            </Select.Portal>
        </Select.Root>
        {errors && <p className="text-red-500 text-sm">{errors.message}</p>}
    </div>

);

// 🟢 Componente de Item do Select
const SelectItem = forwardRef<HTMLDivElement, { value: string; children: ReactNode }>(
    ({ children, ...props }, forwardedRef) => {
        return (
            <Select.Item ref={forwardedRef} {...props} className="w-full flex h-[35px] select-none items-center rounded-[3px] pl-[10px] pr-[35px] text-[13px] leading-none dark:text-white text-black data-[disabled]:pointer-events-none 
            hover:bg-gray-800">
                <Select.ItemText>{children}</Select.ItemText>
                <Select.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center dark:text-white text-black">
                    <CheckIcon />
                </Select.ItemIndicator>
            </Select.Item>
        );
    }
);
SelectItem.displayName = "SelectItem";


const SelectLabel = ({ children }: { children: ReactNode }) => {
    return <Select.Label className="px-[10px] text-xs leading-[25px] dark:text-gray-500 text-black">{children}</Select.Label>;
};

SelectMain.Item = SelectItem;
SelectMain.Label = SelectLabel;
