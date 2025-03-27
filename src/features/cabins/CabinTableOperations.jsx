import TableOperations from "../../ui/TableOperations"
import Filter from "../../ui/Filter"
import SortBy from "../../ui/SortBy"
function CabinTableOperations() {
    const discountOptions = [
        {
            label: "All Cabins",
            value:"all",
        },
        {
            label: "No Discount",
            value:"no-discount",
        },
        {
            label: "With Discount",
            value:"with-discount",
        },
    ]
    const sortByOptions = [
        {value:"name-asc", label:"Sort by name (A-Z)"},
        {value:"name-desc", label:"Sort by name (Z-A)"},
        {value:"regularPrice-asc", label:"Sort by price (Low first)"},
        {value:"regularPrice-desc", label:"Sort by price (High first)"},
        {value:"maxCapacity-asc", label:"Sort by max capacity (Low first)"},
        {value:"maxCapacity-desc", label:"Sort by max capacity (High first)"},
    ]
    return (
        <TableOperations>
            <Filter filterName="discount" options={discountOptions} />
            <SortBy options={sortByOptions}/>
        </TableOperations> 
    )
}

export default CabinTableOperations
