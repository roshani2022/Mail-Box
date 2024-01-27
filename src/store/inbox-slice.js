import { createSlice } from "@reduxjs/toolkit";

const inboxInitialState = {
  inboxItem: [],
  unreadMessagesCount: 0,
};

const inboxSlice = createSlice({
  name: "inbox",
  initialState: inboxInitialState,
  reducers: {
    addItems(state, action) {
      state.inboxItem = action.payload;
      state.unreadMessagesCount = action.payload.filter(
        (email) => email.unRead
      ).length;
    },
    markRead(state, action) {
      const email = state.inboxItem.find((item) => item.id === action.payload);
     if(email && email.unRead){
      state.inboxItem = state.inboxItem.map((item) =>
      item.id=== email ? { ...item, unRead: false } : item 
      
    ); 
    state.unreadMessagesCount -= 1;    
     }    
    },
    removeMessage(state,action){
      state.inboxItem=state.inboxItem.filter((message)=>message.id !== action.payload)
    }
  },
});

export const inboxActions = inboxSlice.actions;

export default inboxSlice.reducer;
