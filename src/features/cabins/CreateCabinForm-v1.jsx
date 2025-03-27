import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { insertCabins } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";

const FormRow2 = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm() {

  const {register, handleSubmit, reset, getValues, formState} = useForm();

  async function onSubmit(data){
    mutate({...data, image:data.image[0]});
  }

  const queryClient = useQueryClient();

  const {errors}  = formState


  const {isLoading:isCreating, mutate} =   useMutation({
    mutationFn: (data) => insertCabins({...data}),
        onSuccess: ()=>{
          toast.success("cabins successfully created");
          queryClient.invalidateQueries({
            queryKey:["cabins"],
          })
          reset();
        },
        onError : (err) => toast.error(err.message),
  })

  function onError(massage){
    console.log(massage);
  }


  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} >


      <FormRow error={errors?.name?.message} label="Cabin name"  >
        <Input type="text" id="name" {...register("name", 
          {required:"This filed is required",min:{value:1,message:"capacity Should be at least one",},})}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow error={errors?.maxCapacity?.message} label="Maximum capacity" >
        <Input type="number" id="maxCapacity" {...register("maxCapacity", 
          {required:"This filed is required",
            min:{value:1,message:"capacity Should be at least one",},})}
            disabled={isCreating}    
        />
      </FormRow>

      <FormRow error={errors?.regularPrice?.message} label="Regular price" >
        <Input type="number" id="regularPrice" {...register("regularPrice", {required:"This filed is required",})} 
          disabled={isCreating}
        />
      </FormRow>

      <FormRow error={errors?.discount?.message} label="Discount" >
        <Input type="number" id="discount" defaultValue={0} {...register("discount", {required:"This filed is required",
          validate: (value) => +value <= +getValues().regularPrice || "discount should be less than regular price"})} 
          disabled={isCreating}
          />
      </FormRow>

      <FormRow error={errors?.description?.message} label="Description for website" >
        <Textarea type="number" id="description" defaultValue="" {...register("description", {required:"This filed is required",})} 
          disabled={isCreating}
        />
      </FormRow>

      <FormRow label="Cabin photo" >
        <FileInput id="image" accept="image/*" disabled={isCreating}
        {...register("image", {required:"This filed is required",})}
        />
      </FormRow>

      <FormRow2>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating} >Add cabin</Button>
      </FormRow2>
    </Form>
  );
}

export default CreateCabinForm;
