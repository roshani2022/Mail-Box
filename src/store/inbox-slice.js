import { createSlice } from "@reduxjs/toolkit";

const inboxInitialState = {
    inboxItem : [],
    unreadMessagesCount: 0,
    
}

const inboxSlice = createSlice({
    name:"inbox",
    initialState:inboxInitialState,
    reducers:{
       addItems(state,action){
        state.inboxItem=action.payload
        state.unreadMessagesCount = action.payload.filter((email) => email.unRead).length;
       
       },
       markRead(state,action){
        const emailId = action.payload;
        const email = state.inboxItem.find((item) => item.id === emailId);
        if (email) {
          
          state.unreadMessagesCount -= 1;
        }
       }
    }

})

export const inboxActions = inboxSlice.actions

export default inboxSlice.reducer