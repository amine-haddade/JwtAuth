import axios from "axios"

export  const FetchGroups =(token)=>async(dispatch)=>{   
    try{
        const response=await axios
        .get("http://127.0.0.1:8000/api/groups",{
            headers:{Authorization:`Bearer ${token}`}
        })
        dispatch({type:"FetchGroups",payload:response.data.groups})
    }catch(err){
        console.log(err)
    }
      
}
export  const AddGroup =(token,formData)=>async(dispatch)=>{   
    try{
        const response=await axios
        .post("http://127.0.0.1:8000/api/groups",formData,
        {
            headers:{Authorization:`Bearer ${token}`}
        })
        dispatch({type:"AddGroup",payload:response.data.group})
    }catch(err){
        console.log(err)
        throw err
    }
      
}
export  const updateGroup =(token,formData,id)=>async(dispatch)=>{   
    dispatch({type:"UpdateGroup",payload:{id:id,data:formData}})
    try{
        await axios
        .put(`http://127.0.0.1:8000/api/groups/${id}`,formData,
            {
                headers:{Authorization:`Bearer ${token}`}
            })
            dispatch(FetchGroups(token))
    }catch(err){
        console.log(err)
        throw err
    }
      
}

// delete group
export const deleteGroup=(token,id)=>async (dispatch)=>{
    dispatch({type:"DeleteGroup",payload:id})
    try{
        await axios
        .delete(`http://127.0.0.1:8000/api/groups/${id}`,{
          headers:{Authorization:`Bearer ${token}`}
           })
        //vidè le localsotorage
        dispatch(FetchGroups(token))
        
      }catch(err){
        console.error(err)
      }
    }