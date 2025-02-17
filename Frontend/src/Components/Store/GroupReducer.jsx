const IntialState={
    

    // groups data
    listGroups:[],
    groupUpdate:{}
}

export function GroupReducer(state=IntialState,action){
    
    if(action.type==="FetchGroups"){
        return {...state,listGroups:action.payload}
    }
    if(action.type==="AddGroups"){
        return {...state,listGroups:[...listGroups,{...action.payload}]}
    }
    if(action.type==="FindGroup"){
        return {...state,groupUpdate:state.listGroups.find((ele)=>ele.id==action.payload)}
    }
    if(action.type==="UpdateGroup"){
        return {...state,listGroups:state.listGroups.map((ele)=>(ele.id===action.payload.id ? {...ele,...action.payload.data} :ele  ))}
    }
    if(action.type==="DeleteGroup"){
        return {...state,listGroups:state.listGroups.filter((ele)=>ele.id!==action.payload)}
    }
    
    return  state
}