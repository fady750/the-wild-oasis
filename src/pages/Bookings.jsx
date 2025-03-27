import Heading from "../ui/Heading";
import Row from "../ui/Row";
import BookingTableOperation from "../features/bookings/BookingTableOperations"
import BookingTable from "../features/bookings/BookingTable";
function Bookings() {
  return (
    <>    
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
        <BookingTableOperation/>
      </Row>
      <Row>
        <BookingTable/>
      </Row>
    </>
  );
}

export default Bookings;
