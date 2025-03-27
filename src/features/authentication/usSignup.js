import { useMutation } from "@tanstack/react-query";
import { signup as signupAPI } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup(){
    const {mutate:signup, isLoading} = useMutation({
        mutationFn : ({fullName, email, password})=> signupAPI({fullName, email, password}),
        onSuccess : (user)=>{
            console.log(user);
            toast.success("account successfully created");
        },
        onError : (error)=>{
            toast.error("there was an error happen while signup user");
            console.log(error);
        }
    })
    return{signup, isLoading};
}