import { ReactNode } from "react"

type TableProps = {
    children: ReactNode;
    classes?: string;
}

export default function Table(props: TableProps) {

    const { children, classes } = props;

    return (
        <>
            <table className={classes}>
                {children}
            </table>
        </>
    )
}

const THead = (props: TableProps) => {
    const { children, classes } = props;

    return (
        <th className={classes}>
            {children}
        </th>
    )
}

const TRow = (props: TableProps) => {

    const { children, classes } = props;

    return (
        <tr className={classes}>
            {children}
        </tr>
    )
}

const ColumnBody = (props: TableProps) => {

    const { children, classes } = props;

    return (
        <>
            <td className={classes}>
                {children}
            </td>
        </>
    )
}

const Header = (props: TableProps) => {

    const { children, classes } = props;

    return (
        <thead className={classes}>
            {children}
        </thead>
    )
}

const Body = (props: TableProps) => {

    const { children, classes } = props;

    return (
        <tbody className={classes}>
            {children}
        </tbody>
    )
}

const Foot = (props: TableProps) => {

    const { children , classes} = props;

    return (
        <tfoot className={classes}>
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
