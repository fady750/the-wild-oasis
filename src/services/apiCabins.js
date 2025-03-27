import supabase, { supabaseUrl } from "./supabase";



export async function getCabins(){
    let { data, error } = await supabase
    .from('cabins')
    .select('*')
    if(error){
        console.error(error);
        throw new Error("Cabins could not be loaded");
    }
    return data;
}

export async function deleteCabins(id){
    const { data ,error } = await supabase
    .from('cabins')
    .delete()
    .eq('id', id);
    if(error){
        console.error(error);
        throw new Error("Cabins could not be deleted");
    }
    return data 
}

export async function insertCabins(obj){
    
    const haveImagePath = typeof obj.image === "string" ;
    const imageName = haveImagePath ? obj.image : `${Math.random()}-${obj.image.name}`.replaceAll('/', '');
    const imagePath = haveImagePath ? obj.image : `${supabaseUrl}/storage/v1/object/public/cabin-images//${imageName}`;

    //  1- upload obj to cabin table
    const { data, error } = await supabase
    .from('cabins')
    .insert([{...obj, image:imagePath}]);
    if(error){
        console.error(error);
        throw new Error("Cabins could not be created");
    }

    // 2- upload image to storage bucket 
    if(!haveImagePath){
        const  {error:errorOfImage} =  await supabase.storage.from('cabin-images').upload(imageName, obj.image);
        if(errorOfImage){
            const { error } = await supabase
            .from('cabins')
            .delete()
            .eq('id', data.id);
            console.error(errorOfImage);
            throw new Error("Could not to upload image and cabin will be deleted");
        }
    }


    return data;
}


export async function editCabin({newCabin, prevImage}){

    const imageChange = newCabin.image != prevImage;
    const imageName = imageChange ? `${Math.random()}-${newCabin.image.name}`.replaceAll('/', '') : newCabin.image;
    const imagePath = !imageChange ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images//${imageName}`;


    const { data, error } = await supabase
    .from('cabins')
    .update({...newCabin, image:imagePath})
    .eq('id', newCabin.id)
    .select()
    if(error){
        console.error(error);
        throw new Error("Cabins could not be updated");
    }
    
    if(imageChange){
        await supabase.storage.from('cabin-images').remove(prevImage);
        const  {error:errorOfImage} =  await supabase.storage.from('cabin-images').upload(imageName, newCabin.image);
        if(errorOfImage){
            const { error } = await supabase
            .from('cabins')
            .delete()
            .eq('id', data.id);
            console.error(errorOfImage);
            throw new Error("Could not to upload image and cabin will be deleted");
        }
    }
    return data;
}