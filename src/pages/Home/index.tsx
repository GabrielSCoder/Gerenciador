import { useForm } from "react-hook-form";
import ClientForm from "../../templates/ClientForm";

export default function HomePage () {
    const {register, control, handleSubmit} = useForm()

    const handle = (data : any) => {
        console.log(data)
    }
    return (
        <div className="h-full w-full">
            <ClientForm control={control} register={register} handleFunction={handleSubmit(handle)}/>
        </div> 
    )
}