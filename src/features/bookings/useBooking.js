import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {getBooking} from "../../services/apiBookings"

export function useBooking () {
    const params= useParams();
    const {bookingId} = params
    const {isLoading, error, data:booking}  =useQuery({
        queryKey:["bookingId", bookingId],
        queryFn: () => getBooking(bookingId),
    })
    return{isLoading, error, booking}
}