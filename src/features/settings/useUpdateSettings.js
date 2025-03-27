import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useUpdateSettings(){
    const queryClient = useQueryClient();
    const {isLoading, mutate, error} = useMutation({
        mutationFn : updateSetting,
        onSuccess : () => {
            toast.success("settings updated successfully");
            queryClient.invalidateQueries({
                queryKey:["settings"],
            });
        },
        onError:(err)=> toast.error(err.message),
    })
    return {isLoading, mutate};
}