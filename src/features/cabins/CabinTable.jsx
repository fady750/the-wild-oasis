import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";



function CabinTable() {
  const {isLoading, cabins} = useCabins();
  const [searchParams] = useSearchParams();

  if(isLoading) return  <Spinner/>
  // 1) filter
  const filterValue = searchParams.get("discount") || "all";
  // const sortValue = searchParams.get("sortBy");

  let filteredCabins;
  
  if(filterValue === "all"){
    filteredCabins = cabins;
  }
  else if(filterValue === "no-discount"){
    filteredCabins = cabins.filter((ele) => !ele.discount)
  }
  else{
    filteredCabins = cabins.filter((ele) => ele.discount)
  }


  // 2) sortBy
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  let sortedCabins = filteredCabins.sort((a, b) => ( a[field] - b[field] ) * modifier ) 

  return (
    <Menus>
      <Table role="table" columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabins</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
          <Table.Body data={sortedCabins} render={(cabin) => <CabinRow cabin={cabin} key={cabin.id}/>} />
      </Table>
    </Menus>
  )
}

export default CabinTable
