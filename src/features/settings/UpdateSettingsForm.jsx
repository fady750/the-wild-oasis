import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import { useSettings } from './useSettings';
import { useUpdateSettings } from './useUpdateSettings';

function UpdateSettingsForm() {
  const {isLoading, settings} = useSettings();
  const {isLoading:isUpdating, mutate:updateFunction } = useUpdateSettings()
  const {breakfastPrice, maxBookingLength, maxGuestsPerBooking, minBookingLength} =  settings || {};
  
  if(isLoading) return(<Spinner/>);
  
  function handleUpdateSettings (e, field){
    const {value} = e.target;
    if(!value) return
    updateFunction({[field]:value});
  }

  return (
    <Form>
      <FormRow label='Minimum nights/booking'> 
        <Input type='number' id='min-nights' defaultValue={minBookingLength} disabled={isUpdating} onBlur={(e) =>{handleUpdateSettings(e, "minBookingLength")} } />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input type='number' id='max-nights' defaultValue={maxBookingLength} disabled={isUpdating} onBlur={(e) =>{handleUpdateSettings(e, "maxBookingLength")} } />
      </FormRow>
      <FormRow label='Maximum guests/booking'> 
        <Input type='number' id='max-guests' defaultValue={maxGuestsPerBooking} disabled={isUpdating} onBlur={(e) =>{handleUpdateSettings(e, "maxGuestsPerBooking")} } />
      </FormRow>
      <FormRow label='Breakfast price'> 
        <Input type='number' id='breakfast-price' defaultValue={breakfastPrice} disabled={isUpdating} onBlur={(e) =>{handleUpdateSettings(e, "breakfastPrice")} } />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;

