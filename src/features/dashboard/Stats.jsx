import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import Stat from "./Stat"
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";
function Stats({bookings=[], confirmedStays=[], numDays, cabinsCount}) {
    // 1
    const bookingNum = bookings.length;
    // 2
    const Sales = bookings.reduce((acc, curr) => acc + curr.totalPrice, 0 )
    // 3
    const checkins = confirmedStays.length
    // 4
    const occupation = confirmedStays.reduce((acc, curr) => acc + curr.numNights, 0) / (numDays * cabinsCount)

    return (
        <>
            <Stat
                title="Bookings"
                color="blue"
                icon={<HiOutlineBriefcase/>}
                value={bookingNum}
            />
            <Stat
                title="Sales"
                color="green"
                icon={<HiOutlineBanknotes/>}
                value={ formatCurrency(Sales)}
            />
            <Stat
                title="Check ins"
                color="indigo"
                icon={<HiOutlineCalendarDays/>}
                value={checkins}
            />
            <Stat
                title="occupancy rate"
                color="yellow"
                icon={<HiOutlineChartBar/>}
                value={ Math.round(occupation*100)+"%"}
            />

        </>
    )
}

export default Stats
