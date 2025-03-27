import supabase, { supabaseUrl } from "./supabase";


export async function signup({email, password, fullName}){
    let { data, error } = await supabase.auth.signUp({
        email, password, options:{
        data:{
            fullName,
            avatar:"",
        }
    }})
    if(error){
        console.log(error);
        throw new Error(error.message);
    }
    return data;
}

export async function login({email, password}){
    let { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    })
    if(error)
        throw new Error(error.message);
    return data;
}

export async function getUser(){
    const {data:session} = await supabase.auth.getSession();
    if(!session.session) return null;
    const {data, error} = await supabase.auth.getUser();
    if(error){
        console.log(error)
        throw new Error(error.message)
    }
    return data?.user;
}

export async function logout(){
    let { error } = await supabase.auth.signOut();
    if(error)
        throw new Error(error.message);
}


export async function updateUser({fullName, password ,avatar }){
    let dataUpdate ;
    if(fullName) dataUpdate={data:{fullName}};
    if(password) dataUpdate={password};
    // update User Data
    const {data, error} = await supabase.auth.updateUser(dataUpdate);
    if(error){
        console.log(error)
        throw new Error(error.message)
    }
    // upload avatar
    if(!avatar) return data;
    const fileName = `avatar-${data.user.id}-${Math.random()}`;
    const { error:storageError} = await supabase.storage.from("avatars").upload(fileName, avatar);
    if(storageError)
        throw new Error(storageError.message);
    // upload the avatar to user;
    const {data:updateUser, error:error1} = await supabase.auth.updateUser({data:{
        avatar:`${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`
    }})
    if(error1){
        console.log(error)
        throw new Error(error.message)
    }
    return updateUser;
}



