const IntialState={
    user:JSON.parse(localStorage.getItem('user'))||null,
    token:localStorage.getItem('token')||null
}

export const Reducer=(state=IntialState,action)=>{

    if(action.type==="login"){
        localStorage.setItem("user",JSON.stringify(action.payload.user))
        localStorage.setItem("token",action.payload.token)
        return {...state,user:action.payload.user,token:action.payload.token}
    }
    if(action.type==="logout"){
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        return {...state,user:null,token:null}
    }
    return  state
}