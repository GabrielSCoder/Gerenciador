import { useState } from "react";



export default function usePaginacao () {
    const [totalPaginas, setTotalPaginas] = useState(0)
    const [paginaAtual, setPaginaAtual] = useState(1)
    const [totalRegistros, setTotalRegistros] = useState(0)

    const avancar = () => {
        if (paginaAtual < totalPaginas && paginaAtual + 1 <= totalPaginas) 
            setPaginaAtual(paginaAtual + 1)
    }

    const retroceder = () => {
        if (paginaAtual <= totalPaginas && (paginaAtual - 1) > 0)
            setPaginaAtual(paginaAtual - 1)
    }

    const paginaSetter = (n : number) => {
        if (paginaAtual <= totalPaginas && (n - 1) >= 0)
            setPaginaAtual(n)
    }

    return {
        avancar,
        retroceder,
        totalPaginas,
        paginaAtual,
        totalRegistros,
        setTotalRegistros,
        paginaSetter,
        setTotalPaginas
    }
}