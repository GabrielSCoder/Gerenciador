import { useNavigate } from "react-router-dom"

export default function Opts() {

    const nav = useNavigate()

    return (
        <div className="h-full text-white flex flex-col gap-4">
            <button className="bg-sky-500 rounded-3xl hover:cursor-pointer min-w-[100px]" onClick={() => nav("/cliente")}>Cliente</button>
            <button className="bg-green-500 rounded-3xl hover:cursor-pointer" onClick={() => nav("/usuario")} >Usuario</button>
            <button className="bg-purple-500 rounded-3xl hover:cursor-pointer" onClick={() => nav("/consulta")}>Consulta</button>
        </div>
    )
}