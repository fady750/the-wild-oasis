import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutAPI } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogout(){
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const {mutate:logout,isLoading } = useMutation({
        mutationFn : logoutAPI,
        onSuccess : ()=>{
            queryClient.removeQueries();
            navigate("/login",  {replace:true});
        },
        onError: (error)=>{
            console.log(error);
            toast.error("something failed while user trying to logout ");
        }
    })
    return {logout, isLoading};
}