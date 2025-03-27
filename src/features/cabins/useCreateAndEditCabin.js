import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editCabin, insertCabins } from "../../services/apiCabins";
import toast from "react-hot-toast";


export function useCreateAndEditCabins(isEditSession=false, reset = ()=>{}, onCloseModal){
    const queryClient = useQueryClient();
    const {isLoading:isWorking, mutate: createAndEdit} = useMutation({
        mutationFn: isEditSession ?   editCabin : insertCabins ,
        onSuccess: ()=>{
            toast.success(isEditSession ? "cabin successfully updated" :  "cabins successfully created");
            queryClient.invalidateQueries({
                queryKey:["cabins"],
            })
            reset();
            onCloseModal?.()
        },
        onError : (err) => toast.error(err.message),
    })
    return {isWorking, createAndEdit}
}