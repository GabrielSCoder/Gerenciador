import { ReactNode } from "react";


type props = {
    children: ReactNode
    control: any
    register: any
    handleFunction: any
}
export default function BaseForm(props: props) {

    const { children, handleFunction} = props

    const handle = (e : Event) => {
        e.preventDefault()
        handleFunction()
    }

    return (
        <div className="w-full min-h-screen gradient-bg bg-transparent animate-gradient flex items-center justify-center px-4">
            <main className="my-10 w-full md:max-w-md">
                <form className="h-fit p-5 flex flex-col my-10 bg-white rounded-lg shadow-md py-14" onSubmit={(e : any) => handle(e)}>
                    {children}
                </form>
            </main>
        </div>
    )
}