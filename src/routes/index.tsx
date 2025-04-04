import React, { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import homeRoutes from "./home";

const LoginLayout : React.LazyExoticComponent<any> = lazy(() => import("../layouts/LoginLayout"))
const LoginPage : React.LazyExoticComponent<any> = lazy(() => import("../pages/Login"))
const SignUpPage : React.LazyExoticComponent<any> = lazy(() => import("../pages/Signup"))

function Router() {
    const routes = createBrowserRouter([
        {
            path : "",
            element : <LoginLayout />,
            errorElement : "",
            children : [
                {
                    path  : "/",
                    element : <LoginPage />,
                    errorElement : ""
                },
                {
                    path  : "cadastro",
                    element : <SignUpPage />,
                    errorElement : ""
                },
            ]
        },
        homeRoutes
    ])

    return (
        <RouterProvider router={routes}/>
    )
}

export default Router


