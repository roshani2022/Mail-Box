import { createSlice } from "@reduxjs/toolkit";

const sentInitialState = {
    sentItem : []    
}

const sentSlice = createSlice({
    name:"sent",
    initialState:sentInitialState,
    reducers:{
       addItems(state,action){
        state.sentItem=action.payload   
       }, 
       removeMessage(state,action){
         state.sentItem=state.sentItem.filter((message)=>message.id !== action.payload)
       }
    }

})

export const sentActions = sentSlice.actions

export default sentSlice.reducer