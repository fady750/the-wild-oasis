import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser as updateUserAPI } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser(){
    const queryClient = useQueryClient();
    const {mutate:updateUser, isLoading} = useMutation({
        mutationFn: updateUserAPI,
        onSuccess:()=>{
            toast.success("user update data successfully");
            queryClient.invalidateQueries({queryKey:["user"]});
        },
        onError:(error)=>{
            toast.error("failed to update user data");
            console.log(error);
        }
    })
    return {updateUser, isLoading};
}