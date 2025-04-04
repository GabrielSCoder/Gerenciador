import { lazy } from "react";


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
        }
    ]
}




export default homeRoutes