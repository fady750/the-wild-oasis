import supabase from "./supabase";

export async function getGuest(id){
    let { data, error } = await supabase
    .from('guests')
    .select('*')
    .eq("id", id)
    .single();
    if(error){
        console.error(error);
        throw new Error("Cabins could not be loaded");
    }
    return data;
}