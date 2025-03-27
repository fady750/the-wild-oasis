import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner"
import { useRecentStays } from "./useRecentStays";
import {useCabins} from "../cabins/useCabins"
import Stats from "./Stats";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity"
import { useTodayActivity } from "../check-in-out/useTodayActivity";
const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const {isLoading:isLoading1, bookings} = useRecentBookings();
  const {isLoading:isLoading2,  confirmedStays, numDays} = useRecentStays();
  const {isLoading:isLoading3, cabins} = useCabins();
  const {isLoading:isLoading4, stays} = useTodayActivity()
  // console.log(stays)
  if(isLoading1||isLoading2||isLoading3||isLoading4) return <Spinner/>
  return (
    <StyledDashboardLayout>
      <Stats bookings={bookings} confirmedStays={confirmedStays} numDays={numDays} cabinsCount={cabins.length} />
      <TodayActivity stays={stays} />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  )
}

export default DashboardLayout
