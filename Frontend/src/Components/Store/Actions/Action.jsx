import axios from "axios"


export const logout=(token)=>async (dispatch)=>{
    try{
        await axios
        .get("http://127.0.0.1:8000/api/user/logout",{
          headers:{Authorization:`Bearer ${token}`}
        })
        //vidè le localsotorage
        localStorage.removeItem("user")
        localStorage.removeItem("token_jwt")
        dispatch({type:"logout"})
        
      }catch(err){
        console.error(err)
      }
    }



export const login=(formData)=> async(dispatch)=>{
  try{
    const response=await  axios.post("http://127.0.0.1:8000/api/user/login",formData)
    if(response.data.token  &&  response.data.user){
      dispatch({type:"login",payload:{token:response.data.token,user:response.data.user}})
    }
  }catch(err){
    console.log(err)
    throw  err
  }
}
export const register=(formData)=> async(dispatch)=>{
  try{
    const response=await  axios.post("http://127.0.0.1:8000/api/user/register",formData)
    if(response.data.token  &&  response.data.user){
      dispatch({type:"register",payload:{token:response.data.token,user:response.data.user}})
    }
  }catch(err){
    console.log(err)
    throw  err
  }
}






// fetch all users
export const fetchUsers=()=>async (dispatch)=>{

  try{
      const response =await axios
      .get("http://127.0.0.1:8000/api/users")
      //vidè le localsotorage
      dispatch({type:"FetchUsers",payload:response.data.users})
      
    }catch(err){
      console.error(err)
    }
  }


// delete user
export const deleteUser=(data)=>async (dispatch)=>{
  dispatch({type:"deletUser",payload:data.id})
  try{
      await axios
      .delete(`http://127.0.0.1:8000/api/destroy/${data.id}`,{
        headers:{Authorization:`Bearer ${data.token}`}
         })
      //vidè le localsotorage
      dispatch(fetchUsers())
      
    }catch(err){
      console.error(err)
    }
  }
  //update user
export const UpdateUser=(data)=>async (dispatch)=>{
  dispatch({type:"updateUser",payload:{id:data.id,data:data.formData}})
  try{
      await axios
      .put(`http://127.0.0.1:8000/api/user/update/${data.id}`,data.formData,{
        headers:{Authorization:`Bearer ${data.token}`}
         })
      dispatch(fetchUsers())
      
    }catch(err){
      console.error(err)
      throw err
      
    }
  }
  