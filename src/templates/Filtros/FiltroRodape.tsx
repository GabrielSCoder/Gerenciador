import classNames from "../../utils/classNames"

type props = {
    quantidadePaginas: number
    paginaAtual: number
    quantidadeRegistros: number
    quantidadePorPaginas: number
    setTamanhoPagina: any
    setPaginaAtual: any
}


export default function FiltroRodape(props: props) {

    const { paginaAtual, quantidadePaginas, quantidadeRegistros, quantidadePorPaginas, setTamanhoPagina, setPaginaAtual } = props

    const MakeN = () => {

        let rows: any[] = []

        if (quantidadePaginas >= 1 && quantidadePaginas <= 5) {
            for (let i = 1; i <= quantidadePaginas; i++) {
                rows.push(
                    <button key={i} className={classNames("border border-slate-300 h-[30px] w-[40px] rounded-md col-span-1 flex items-center justify-center hover:cursor-pointer", i == paginaAtual ? "bg-sky-500 text-white" : "bg-transparent")} onClick={() => setPaginaAtual(i)}>{i}</button>
                )
            }
        } else {
            <>
                {/* <div className="border border-slate-300 h-[30px] w-[40px] rounded-md col-span-1 flex items-center justify-center">1</div>
                <div className="border border-slate-300 h-[30px] w-[40px] rounded-md col-span-1 flex items-center justify-center"></div>
                <div className="border border-slate-300 h-[30px] w-[40px] rounded-md col-span-1 flex items-center justify-center">{i}</div>
                <div className="border border-slate-300 h-[30px] w-[40px] rounded-md col-span-1 flex items-center justify-center">{i}</div>
                <div className="border border-slate-300 h-[30px] w-[40px] rounded-md col-span-1 flex items-center justify-center">{i}</div>
                <div className="border border-slate-300 h-[30px] w-[40px] rounded-md col-span-1 flex items-center justify-center">{i}</div>
                <div className="border border-slate-300 h-[30px] w-[40px] rounded-md col-span-1 flex items-center justify-center">{i}</div> */}
            </>
        }

        return rows
    }

    const pA = paginaAtual == 1 ? paginaAtual :  Number(quantidadePorPaginas) * Number(paginaAtual - 1) + 1
    const pB = paginaAtual == quantidadePaginas ? quantidadeRegistros : quantidadeRegistros < quantidadePorPaginas ? quantidadeRegistros :  quantidadePorPaginas * (paginaAtual > 0 ? paginaAtual : 1)

    return (
        <div className=" flex-row justify-between w-full bg-white items-center px-10 py-1 rounded-md grid grid-cols-3">
            <div className="flex w-full gap-2 col-span-1">
                <h2>Itens por página  </h2>
                <input type="number" defaultValue={quantidadePorPaginas} min={1} onChange={(e: any) => { setTamanhoPagina(e.target.value) }}
                    className="w-[40px] text-center border-b text-sm focus:outline-none" />
            </div>
            <div className="w-full col-span-1">
                <p>Exibindo {pA} até {pB} de {quantidadeRegistros} registros</p>
            </div>
            <div className="flex col-span-1 justify-end gap-2 ">
                <MakeN />
            </div>
        </div>
    )
}