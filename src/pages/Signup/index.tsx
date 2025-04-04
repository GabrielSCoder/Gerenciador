import { useForm } from "react-hook-form";
import SignupForm from "../../templates/SignupForm";


export default function Signup() {

    const { control, register, handleSubmit } = useForm({
        defaultValues: {
            nome: "",
            email: "",
            senha: ""
        }
    })

    const submit = (data: any) => {
        console.log(data)
    }

    return (
        <SignupForm control={control} register={register} handleFunction={handleSubmit(submit)} />
    )
}