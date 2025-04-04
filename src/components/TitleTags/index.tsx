import { ReactNode } from "react";
import classNames from "../../utils/classNames";

type mainProps = {
    className?: string;
    children : ReactNode;
    onClick ?: Function
} & React.InputHTMLAttributes<HTMLInputElement>


function TitleTag() {

    return (
        <>
        </>
    )
}

const Main = ({ className, children, ...rest }: mainProps) => {
    return <h1 className={classNames("text-2xl font-bold dark:text-neutral-200 text-black", className)} {...rest} >{children}</h1>
}

const Sub = ({ className, children, ...rest  }: mainProps) => {
    return <h2 className={classNames("text-xl font-medium dark:text-neutral-200 text-black", className)} {...rest}>{children}</h2>
}

const Normal = ({ className, children, ...rest  }: mainProps) => {
    return <h3 className={classNames("text-sm ", className)} {...rest} >{children}</h3>
}

const Paragraph = ({ className, children, ...rest  }: mainProps) => {
    return <p className={classNames("dark:text-neutral-200 text-black text-base", className)} {...rest}>{children} </p>
}

TitleTag.Main = Main;
TitleTag.Sub = Sub;
TitleTag.Normal = Normal;
TitleTag.Parag = Paragraph;

export default TitleTag