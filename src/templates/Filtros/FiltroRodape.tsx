import classNames from "../../utils/classNames"

type props = {
    quantidadePaginas: number
    paginaAtual: number
    quantidadeRegistros: number
    quantidadePorPaginas: number
    setTamanhoPagina: any
    setPaginaAtual: any
    avancar: any
    retroceder: any
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

            return rows

        } else {

            return (
                <div className="flex items-center gap-2">
              
                {paginaAtual > 1 && (
                  <button
                    onClick={() => setPaginaAtual(paginaAtual - 1)}
                    className="border border-slate-300 h-[30px] w-[80px] rounded-md flex items-center justify-center hover:bg-slate-100 hover:cursor-pointer"
                  >
                    Anterior
                  </button>
                )}
              
               
                {[1, 2].map((page) => (
                  <button
                    key={page}
                    onClick={() => setPaginaAtual(page)}
                    className={classNames(
                      "border border-slate-300 h-[30px] min-w-[40px] rounded-md flex items-center justify-center hover:cursor-pointer",
                      paginaAtual === page ? "bg-sky-500 text-white" : "hover:bg-slate-100"
                    )}
                  >
                    {page}
                  </button>
                ))}
              
                
                {paginaAtual > 4 && <span className="px-2">...</span>}
              
               
                {[-1, 0, 1].map((offset) => {
                  const page = paginaAtual + offset;
                  if (page > 2 && page < quantidadePaginas - 1) {
                    return (
                      <button
                        key={page}
                        onClick={() => setPaginaAtual(page)}
                        className={classNames(
                          "border border-slate-300 h-[30px] min-w-[40px] rounded-md flex items-center justify-center hover:cursor-pointer",
                          paginaAtual === page ? "bg-sky-500 text-white" : "hover:bg-slate-100"
                        )}
                      >
                        {page}
                      </button>
                    );
                  }
                  return null;
                })}
              
               
                {paginaAtual < quantidadePaginas - 3 && <span className="px-2">...</span>}
              
              
                {[quantidadePaginas - 1, quantidadePaginas].map((page) => (
                  <button
                    key={page}
                    onClick={() => setPaginaAtual(page)}
                    className={classNames(
                      "border border-slate-300 h-[30px] min-w-[40px] rounded-md flex items-center justify-center hover:cursor-pointer",
                      paginaAtual === page ? "bg-sky-500 text-white" : "hover:bg-slate-100"
                    )}
                  >
                    {page}
                  </button>
                ))}
              
              
                {paginaAtual < quantidadePaginas && (
                  <button
                    onClick={() => setPaginaAtual(paginaAtual + 1)}
                    className="border border-slate-300 h-[30px] w-[80px] rounded-md flex items-center justify-center hover:bg-slate-100 hover:cursor-pointer"
                  >
                    Próximo
                  </button>
                )}
              </div>
              
            )
        }

    }

    const pA = quantidadeRegistros == 0 ? 0 : paginaAtual == 1 ? paginaAtual : Number(quantidadePorPaginas) * Number(paginaAtual - 1) + 1
    const pB = paginaAtual == quantidadePaginas ? quantidadeRegistros : quantidadeRegistros < quantidadePorPaginas ? quantidadeRegistros : quantidadePorPaginas * (paginaAtual > 0 ? paginaAtual : 1)

    return (
        <div className=" flex-row justify-between w-full bg-white items-center px-10 py-1 rounded-md grid grid-cols-3">
            {/* <div className="flex w-full gap-2 col-span-1">
                <h2>Itens por página  </h2>
                <input type="number" defaultValue={quantidadePorPaginas} min={1} onChange={(e: any) => { setTamanhoPagina(e.target.value) }}
                    className="w-[40px] text-center border-b text-sm focus:outline-none" />
            </div> */}
            <div className="w-full col-span-1">
                <p>Exibindo {pA} até {pB} de {quantidadeRegistros} registros</p>
            </div>
            <div className="flex col-span-2 justify-end gap-2 ">
                <MakeN />
            </div>
        </div>
    )
}