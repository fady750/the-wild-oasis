import { useSearchParams } from "react-router-dom"
import Select from "./Select"

function SortBy({options}){
    const [searchParams, setSearchParams] = useSearchParams();
    const value = searchParams.get("sortBy") || ""
    function handleOnChange(e){

        searchParams.set("sortBy", e.target.value);
        setSearchParams(searchParams);
    }
    return (

        <Select onChange={handleOnChange} value={value} options={options} type="white" />

    )
}

export default SortBy
