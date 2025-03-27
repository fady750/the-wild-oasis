import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {deleteBooking as deleteBookingAPI } from "../../services/apiBookings"

export function useDeleteBooking(){
    const queryClient = useQueryClient();
    const {mutate:deleteBooking,isLoading:isDeletingBooking } = useMutation({
        mutationFn : (bookingId) => deleteBookingAPI(bookingId),
        onSuccess: ()=>{
            toast.success(`booking deleted successfully`);
            queryClient.invalidateQueries({active:true});
        },
        onError : () => {
            toast.error("There was an error while deleting error");
        }
    })
    return {deleteBooking, isDeletingBooking};
}