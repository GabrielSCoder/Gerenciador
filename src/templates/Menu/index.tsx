import Opts from "../../components/Menu";
import classNames from "../../utils/classNames";

type props = {
    menuAberto: boolean
    itens: any
}

export default function Menu(props: props) {


    const { menuAberto, itens } = props

    return (
        <div className={classNames(
            'select-none',
            'shadow transition duration-300 focus:outline-none',
            menuAberto ? "w-[14vw] min-w-fit" : "w-0",
            'h-full bg-blue-700 flex flex-col gap-2 justify-start',
        )}>

            <div className="w-full px-2 flex flex-col justify-center items-center">
                <h1 className='text-white text-lg pt-1 flex-1 w-full text-center '>
                    <span className='font-bold'>CRM</span>
                </h1>

                <div className="w-[150px] bg-black flex justify-center mt-10 border border-slate-300 rounded-3xl">
                    <img src="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/061.png" className="h-150px w-[150px] object-cover" />
                </div>

                <Opts />

            </div>

        </div>
    )
}