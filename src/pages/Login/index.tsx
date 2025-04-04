import { useForm } from "react-hook-form";
import LoginForm from "../../templates/LoginForm";
import { login } from "../../services/auth";
import { useNavigate } from "react-router-dom";


export default function Login() {

  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      senha: ""
    }
  });

  const nav = useNavigate()

  const submit = async (data: any) => {
    const resp = await login(data)
    if (resp.data.success) {
      window.localStorage.setItem("profile", resp.data.dados)
      nav("/home")
    }
  }

  return (
    <LoginForm control={control} register={register} handleFunction={handleSubmit(submit)} />
  )
}