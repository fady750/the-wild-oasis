import { useForm } from "react-hook-form";


import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useCreateAndEditCabins } from "./useCreateAndEditCabin";


function CreateCabinForm({cabin={}, onCloseModal}){

  const {id:editId, ...editValues} = cabin;
  const isEditSession = Boolean(editId);

  const {register, handleSubmit, reset, getValues, formState} = useForm({
    defaultValues: isEditSession && editValues,
  });
  const {errors}  = formState

  const {isWorking, createAndEdit} = useCreateAndEditCabins(isEditSession, reset, onCloseModal);




  async function onSubmit(data){
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if(isEditSession){
      const newCabin = { ...data ,id:cabin.id ,image}
      createAndEdit({newCabin , prevImage: cabin.image})
    }
    else
      createAndEdit({...data, image:data.image[0]})
  }

  function onError(massage){
    console.log(massage);
  }


  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type={onCloseModal ? "modal" : "regular"} >


      <FormRow error={errors?.name?.message} label="Cabin name"  >
        <Input type="text" id="name" {...register("name", 
          {required:"This filed is required",min:{value:1,message:"capacity Should be at least one",},})}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow error={errors?.maxCapacity?.message} label="Maximum capacity" >
        <Input type="number" id="maxCapacity" {...register("maxCapacity", 
          {required:"This filed is required",
            min:{value:1,message:"capacity Should be at least one",},})}
            disabled={isWorking}    
        />
      </FormRow>

      <FormRow error={errors?.regularPrice?.message} label="Regular price" >
        <Input type="number" id="regularPrice" {...register("regularPrice", {required:"This filed is required",})} 
          disabled={isWorking}
        />
      </FormRow>

      <FormRow error={errors?.discount?.message} label="Discount" >
        <Input type="number" id="discount" defaultValue={0} {...register("discount", {required:"This filed is required",
          validate: (value) => +value <= +getValues().regularPrice || "discount should be less than regular price"})} 
          disabled={isWorking}
          />
      </FormRow>

      <FormRow error={errors?.description?.message} label="Description for website" >
        <Textarea type="number" id="description" defaultValue="" {...register("description", {required:"This filed is required",})} />
      </FormRow>

      <FormRow label="Cabin photo" >
        <FileInput id="image" accept="image/*" disabled={isWorking}
        {...register("image", {required: isEditSession ? false :  "This filed is required",})}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={() => onCloseModal?.()} >Cancel</Button>
        <Button disabled={isWorking} >{ isEditSession ? "Edit cabin" : "Create new  cabin"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
// 