import { createSlice } from "@reduxjs/toolkit";

const inboxInitialState = {
    inboxItem : []
}

const inboxSlice = createSlice({
    name:"inbox",
    initialState:inboxInitialState,
    reducers:{
       addItems(state,action){
        state.inboxItem=action.payload
       }
    }

})

export const inboxActions = inboxSlice.actions

export default inboxSlice.reducer