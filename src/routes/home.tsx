import { lazy } from "react";
import CriarCliente from "../pages/Cliente/CriarCliente";
import ListaCliente from "../pages/Cliente/ListaClientes";
import VisualizarCliente from "../pages/Cliente/Visualizar";
import CriarConsulta from "../pages/Consulta/CriarConsulta";
import VisualizarConsulta from "../pages/Consulta/VisualizarConsulta";
import ListaConsulta from "../pages/Consulta/ListaConsultas";
import VisualizarCalendario from "../pages/Calendario";


const HomeLayout: React.LazyExoticComponent<any> = lazy(() => import("../layouts/HomeLayout"))
const HomePage: React.LazyExoticComponent<any> = lazy(() => import("../pages/Home"))

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
            element: <CriarConsulta />
        },
        {
            path: "/consulta/editar/:id",
            element: <CriarConsulta />
        },
        {
            path: "/consulta/:id",
            element: <VisualizarConsulta />
        },
        {
            path: "/consulta/lista",
            element: <ListaConsulta />
        },
        {
            path: "/cliente",
            element: <CriarCliente />
        },
        {
            path: "/cliente/editar/:id",
            element: <CriarCliente />
        },
        {
            path: "/cliente/:id",
            element: <VisualizarCliente />
        },
        {
            path: "/cliente/lista",
            element: <ListaCliente />
        },
        {
            path: "/calendario",
            element: <VisualizarCalendario />
        }
    ]
}




export default homeRoutes