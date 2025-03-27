import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings"
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constant";
export function useBookings () {
    const [searchParams] = useSearchParams();
    const queryClient =  useQueryClient()
    // filter
    const filterValue = searchParams.get("status");
    let filter =  !filterValue || filterValue === "all" ? null : {filter:"status" , value:filterValue};
    // sort
    const sortBySearch = searchParams.get("sortBy") || "startDate-desc";
    const [filed, value ] = sortBySearch.split("-");
    const sortBy = {filed, value};
    // pagination
    const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"))

    const {isLoading, error, data:{ data : bookings , count } ={} }  = useQuery({
        queryKey:["bookings", filter, sortBy, page],
        queryFn: () => getBookings({filter, sortBy, page}),
    }) 

    // preFetching 
    const pageCount = Math.ceil(count / PAGE_SIZE);
    if(page <  pageCount ){
        queryClient.prefetchQuery({
            queryKey:["bookings", filter, sortBy, page+1],
            queryFn: () => getBookings({filter, sortBy, page:page+1}),
        })
    }    
    if(page > 1 ){
        queryClient.prefetchQuery({
            queryKey:["bookings", filter, sortBy, page-1],
            queryFn: () => getBookings({filter, sortBy, page:page-1}),
        })
    }
    return{isLoading, error, bookings, count}
}
