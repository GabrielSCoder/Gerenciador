export function CountChars(props: { data: number, max : number }) {

    const getcolor = (value: number) => {
        if (value >= 100) {
            return "red"
        } else if (value >= 70) {
            return "#ded70d"
        }
    }

    const getValue = () => {
        const calc = Math.floor((props.data / props.max) * 100)
        return calc < 100 ? calc : 100
    }

    return (
        <div className="relative w-[30px] h-[30px] flex items-center justify-center">
            <div
                className="box"
                style={{ "--p": getValue(), "--color": getcolor(getValue()) } as React.CSSProperties}
            ></div>
            {props.data >= 140 && (
                <span className="absolute text-white font-medium text-sm flex items-center justify-center">
                    {props.max - props.data}
                </span>
            )}
        </div>
    );
}