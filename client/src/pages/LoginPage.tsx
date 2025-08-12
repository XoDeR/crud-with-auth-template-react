import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useAuth";

const LoginPage = () => {
  const { register, handleSubmit } = useForm();
  const loginMutation = useLogin();
  const navigate = useNavigate();
  const onSubmit = (data: any) => {
    loginMutation.mutate(data, {
      onSuccess: () => navigate('/posts'),
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('username')} type="text" placeholder="Username"/>
      <input {...register('password')} type="password" placeholder="Password" />
      <button type="submit" >Login</button>
      {loginMutation.isError && <p>Error: {loginMutation.error.message}</p>}
    </form>
  )
}

export default LoginPage;