import { lazy } from "react";
import ConsultaForm from "../templates/ConsultaForm";
import CriarCliente from "../pages/Cliente/CriarCliente";
import ListaCliente from "../pages/Cliente/ListaClientes";


const HomeLayout: React.LazyExoticComponent<any> = lazy(() => import("../layouts/HomeLayout"))
const HomePage : React.LazyExoticComponent<any> = lazy(() => import("../pages/Home"))

const homeRoutes =
{
    path: "",
    element: <HomeLayout />,
    errorElement: "",
    children: [
        {
            path: "/home",
            element: <HomePage />
        },
        {
            path: "/consulta",
            element: <ConsultaForm />
        },
        
        {
            path: "/cliente",
            element: <CriarCliente />
        },
        {
            path: "/cliente/:id",
            element: <CriarCliente />
        },
        {
            path: "/cliente/lista",
            element: <ListaCliente />
        }
    ]
}




export default homeRoutes