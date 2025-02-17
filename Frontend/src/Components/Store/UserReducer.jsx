const IntialState={
    users:[],
    token:localStorage.getItem("token_jwt"),
    user:JSON.parse(localStorage.getItem("user")),
    userUpdated:{},


}

export function UserReducer(state=IntialState,action){
    if(action.type==="logout"){
        localStorage.removeItem("user")
        localStorage.removeItem("token_jwt")
        return {...state,user:null,token:null}
    }
    if(action.type==="login"){
        localStorage.setItem("token_jwt",action.payload.token);
        localStorage.setItem("user",JSON.stringify(action.payload.user));
        return {...state,user:action.payload.user,token:action.payload.token} 
    }
    if(action.type==="register"){
        localStorage.setItem("token_jwt",action.payload.token);
        localStorage.setItem("user",JSON.stringify(action.payload.user));
        return {...state,user:action.payload.user,token:action.payload.token}
    }
    if(action.type==="FetchUsers"){
        return {...state,users:action.payload}
    }
    if(action.type==="deletUser"){
        return {...state,users:state.users.filter((ele)=>ele.id!==action.payload)}
    }
    if(action.type==="FindUser"){
        return {...state,userUpdated:state.users.find((ele)=>ele.id===action.payload)}
    }
    if(action.type==="updateUser"){
        return {...state,users:state.users.map((ele)=>(ele.id===action.payload.id? {...ele,...action.payload.data} :ele  ))}
    }
    
    
    return  state
}