import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";
import {useSettings} from "../settings/useSettings"

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const {booking, isLoading} = useBooking()
  const {checkin, isCheckingIn} = useCheckin()
  const {settings, isLoading:LoadingSettings} = useSettings();
  const moveBack = useMoveBack();
  
  useEffect(()=>{ setConfirmPaid(booking?.isPaid || false) }, [booking?.isPaid]);
  useEffect(()=>{ setAddBreakfast(booking?.hasBreakfast || false) }, [booking?.hasBreakfast]);
  
  if(isLoading || LoadingSettings) return <Spinner/>
  
  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;
  const optionalBreakfast  = settings.breakfastPrice * numGuests * numNights; 

  function handleCheckin() {
    if(!confirmPaid)
      return
    if(addBreakfast){
      const breakfast = {
        hasBreakfast:true,
        extrasPrice:optionalBreakfast,
        totalPrice:totalPrice+optionalBreakfast,
      }
      checkin({breakfast});
    }
    else{

      checkin();
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      
      { 
        !booking?.hasBreakfast
        && 
        <Box>
          <Checkbox checked={addBreakfast} id="breakfast" onChange={() => {
              setAddBreakfast((e)=>!e)
              setConfirmPaid(false);
            }}>
              Want to add breakfast for { formatCurrency(optionalBreakfast)} ?
            </Checkbox>
        </Box>
      }
      
      <Box>
        <Checkbox checked={confirmPaid} id="confirm" onChange={() => setConfirmPaid((e) => !e)} disabled={confirmPaid || isCheckingIn}>
          i confirmed that {booking.fullName} has paid the total amount of {!addBreakfast ? formatCurrency(booking.totalPrice) : 
          `${formatCurrency(booking.totalPrice + optionalBreakfast)} ($${booking.totalPrice} + $${optionalBreakfast})`}
          </Checkbox>
      </Box>
      


      <ButtonGroup>
        <Button disabled={!confirmPaid || isCheckingIn}  onClick={handleCheckin}>Check in booking #{bookingId}</Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
// {formatCurrency(booking.totalPrice)} 