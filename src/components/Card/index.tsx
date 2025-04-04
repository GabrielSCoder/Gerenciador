import { ReactNode } from "react";
import classNames from "../../utils/classNames";

type cardProps = {
    className ?: string;
    children : ReactNode;
    click? : Function;
    onBlur ?: Function
    onMouseDown ?: Function
}


export default function Card({className, children, click, onBlur, onMouseDown} : cardProps) {

    const clickC = () => {
        click ? click() : null 
    }

    return (
        <div className={classNames("flex ", className)} onClick={clickC} onBlur={(e) => {onBlur ? onBlur(e) : ""}} onMouseDown={(e) => {onMouseDown ? onMouseDown(e) : ""}}>
            {children}
        </div>
    )
}