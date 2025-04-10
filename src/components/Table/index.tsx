import { ReactNode } from "react"

type TableProps = {
    children: ReactNode;
    ClassName?: string;
}

export default function Table(props: TableProps) {

    const { children, ClassName } = props;

    return (
        <>
            <table className={ClassName}>
                {children}
            </table>
        </>
    )
}

const THead = (props: TableProps) => {
    const { children, ClassName } = props;

    return (
        <th className={ClassName}>
            {children}
        </th>
    )
}

const TRow = (props: TableProps) => {

    const { children, ClassName } = props;

    return (
        <tr className={ClassName}>
            {children}
        </tr>
    )
}

const ColumnBody = (props: TableProps) => {

    const { children, ClassName } = props;

    return (
        <>
            <td className={ClassName}>
                {children}
            </td>
        </>
    )
}

const Header = (props: TableProps) => {

    const { children, ClassName } = props;

    return (
        <thead className={ClassName}>
            {children}
        </thead>
    )
}

const Body = (props: TableProps) => {

    const { children, ClassName } = props;

    return (
        <tbody className={ClassName}>
            {children}
        </tbody>
    )
}

const Foot = (props: TableProps) => {

    const { children , ClassName} = props;

    return (
        <tfoot className={ClassName}>
            {children}
        </tfoot>
    )
}

Table.Header = Header;
Table.Head = THead;
Table.Body = Body;
Table.Foot = Foot;
Table.Row = TRow;
Table.Column = ColumnBody;
