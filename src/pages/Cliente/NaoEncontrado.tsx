export default function NaoEncontrado(props : {elemento : string}) {
    return (
        <div className="flex justify-center items-center bg-white rounded-md p-8">
            <h2 className="text-[16px] font-semibol text-black">{props.elemento} não encontrado(a)!</h2>
        </div>
    )
}