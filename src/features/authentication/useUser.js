import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../services/apiAuth";

export function useUser(){
    const {isLoading, data:User} = useQuery({
        queryKey:["user"],
        queryFn: getUser,
    })
    return {isLoading, User , isAuthenticated:User?.role === "authenticated"};
}