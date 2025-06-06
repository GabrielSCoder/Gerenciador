import { JSX } from "react";
import classNames from "../../utils/classNames"

type props = {
    id?: string;
    text: string;
    className?: string;
    disabled?: boolean;
    loading?: boolean;
    type?: "submit" | "delete" | "submitt";
    children?: JSX.Element;
    onClick: any;
}

const Button = (props: props) => {
    const { id, text, className, disabled, loading, type, children, onClick } = props
    return (
        <button
            id={id}
            disabled={disabled || loading}
            onClick={onClick}
            className={classNames(
                " text-black rounded-3xl p-2 w-fit font-semibold hover:cursor-pointer",
                loading && "cursor-not-allowed grayscale-[50%]",
                type == "submit" && "text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br ring-inset ring-1 focus:ring-2 focus:outline-none focus:ring-green-400 dark:focus:ring-green-800 font-bold rounded-md text-sm py-2.5 text-center mb-2",
                type == "delete" && "bg-red-500",
                type == "submitt" && "bg-green-500 hover:bg-green-400 dark:bg-white hover:dark:bg-neutral-200 disabled:bg-neutral-600 disabled:hover:bg-neutral-600",
                className
            )
        }>
            {text}{children}
        </button>
    )
}

export default Button