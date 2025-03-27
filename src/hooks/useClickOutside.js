import { useEffect, useRef } from "react";

export function useClickOutside( onClose, listenCaptured = true){
    const windowRef = useRef();
    useEffect(function(){
        function handleClick(e){
        if(windowRef.current && !windowRef.current.contains(e.target)){
            onClose();
        }
        }
    
        document.addEventListener("click", handleClick, listenCaptured);
    
    
        return () =>  document.removeEventListener("click", handleClick, listenCaptured);
    
    }, [onClose, listenCaptured]);
    return windowRef;
}