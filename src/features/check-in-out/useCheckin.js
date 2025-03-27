import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import toast from "react-hot-toast";
import {updateBooking} from "../../services/apiBookings"

export function useCheckin () {
    const queryClient = useQueryClient();
    const navigate = useNavigate()
    const {bookingId} = useParams();
    const newObj = {status:"checked-in", isPaid:true};
    const {mutate:checkin, isLoading:isCheckingIn} = useMutation({
        mutationFn: ({breakfast = {}}) => updateBooking(bookingId, {...newObj, ...breakfast}),
        onSuccess: (data)=>{
            toast.success(`Booking #${data.id} successfully checked in`);
            queryClient.invalidateQueries({active:true});
            navigate("/dashboard");
        },
        onError : ()=>{
            toast.error("There was an error while checking in ");
        }
    })
    return {checkin, isCheckingIn}
}
