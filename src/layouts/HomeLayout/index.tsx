import { Outlet } from "react-router-dom";
import Menu from "../../templates/Menu";
import { useState } from "react";
import { RxHamburgerMenu, RxExit } from "react-icons/rx";

export default function HomeLayout() {

    const [menuAberto, setMenuAberto] = useState(window.localStorage.getItem("menuaberto") === "true")

    const handleMenu = () => {
        setMenuAberto(!menuAberto)
        window.localStorage.setItem("menuaberto", !menuAberto ? "true" : "false")
    }

    return (
    <div className="flex flex-row w-screen h-screen overflow-hidden">
        <div className="h-full">
            <Menu menuAberto={menuAberto} itens={undefined} />
        </div>

        <div className="flex flex-col flex-grow h-full">
            {/* Barra superior */}
            <div className="h-[56px] bg-white shadow flex items-center px-4 justify-between">
                <button className="hover:cursor-pointer" onClick={handleMenu}>
                    <RxHamburgerMenu size={20} />
                </button>
                <h2 className="text-black">borda</h2>
                <button
                    onClick={undefined}
                    className="flex flex-row gap-2 px-4 pr-6 items-center cursor-pointer"
                >
                    <span>Sair</span>
                    <RxExit />
                </button>
            </div>

            {/* Conteúdo com scroll interno */}
            <div className="flex-grow overflow-y-auto bg-gray-100 w-full p-4">
                <Outlet />
            </div>
        </div>
    </div>
);
}