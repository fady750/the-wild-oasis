import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";

import { useDeleteCabin } from "./useDeleteCabin";
import { useCreateAndEditCabins } from "./useCreateAndEditCabin";


import styled from "styled-components";

import { formatCurrency } from "../../utils/helpers";

import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({cabin}) {
  const {isDeleting, deleteCabin} = useDeleteCabin();  
  const {isWorking:isCreating, createAndEdit} = useCreateAndEditCabins(false, ()=>{});

  const {id:cabinId, name, maxCapacity, regularPrice, discount, image} = cabin


  async function DuplicateCabin(){
    const { id, created_at, ...otherValue} = cabin;
    createAndEdit(otherValue);
  }



  const isWorking = isCreating || isDeleting;

  return (

      <Table.Row role="row">
          <Img src={image}/>
          <Cabin>{name}</Cabin>
          <div>Fits up to : {maxCapacity} guests </div>
          <Price>{formatCurrency(regularPrice)}</Price>
          { discount ? <Discount> {formatCurrency(discount)}</Discount> : <span>&mdash;</span>}
          <div>
      

            <Modal>
              <Menus.Menu>
                <Menus.Toggle id={cabinId} />
                <Menus.List id={cabinId}>
                  <Menus.Button onClick={()=> DuplicateCabin()} disabled={isWorking}  icon={<HiSquare2Stack/>} >Duplicate</Menus.Button>
              
                  <Modal.Open opens="update-cabin">
                      <Menus.Button disabled={isWorking}  icon={<HiPencil/>} >Edit</Menus.Button>
                  </Modal.Open>
                  


                  <Modal.Open opens="delete-cabin">
                    <Menus.Button disabled={isWorking}  icon={<HiTrash/>} >Delete</Menus.Button>
                  </Modal.Open>
                </Menus.List>


                <Modal.Window name="update-cabin">
                  <CreateCabinForm cabin={cabin} />
                </Modal.Window>
                <Modal.Window name="delete-cabin">
                  <ConfirmDelete  resourceName={cabin.name} disabled={isWorking} onConfirm={() => deleteCabin(cabinId)}  />
                </Modal.Window>
              </Menus.Menu>
            </Modal>






          </div>
      </Table.Row>
  )
}

export default CabinRow


