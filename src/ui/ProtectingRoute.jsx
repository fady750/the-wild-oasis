import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser"
import Spinner from "./Spinner";
import { useEffect } from "react";
import styled from "styled-components";

const FullPage = styled.div`
    height: 100vh;
    background-color: var(--color-gray-50);
    display: flex;
    align-items: center;
    justify-content: center;
`



function ProtectingRoute({children}) {
    // 1 first we need to get data from back end to know if user authenticated or not
    const { isLoading, isAuthenticated} = useUser();
    const navigate = useNavigate();

    // 2 if not authenticated and isLoading true navigate to login page 
    useEffect(function(){
        if(!isAuthenticated && !isLoading)
            navigate("/login");
    }, [isAuthenticated, isLoading, navigate]);
    // 3 if app try to get data return spinner but in full page 
    if(isLoading) return (
        <FullPage>
            <Spinner/>
        </FullPage>)
    

    
    
    
    // return app content if user authenticated 
    return (
        children
    )
}

export default ProtectingRoute
