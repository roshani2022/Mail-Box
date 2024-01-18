import { configureStore } from "@reduxjs/toolkit";

import authReducer from './auth-slice'
import inboxReducer from './inbox-slice'
import sentReducer  from './sent-slice'



const store = configureStore({
    reducer:{auth:authReducer,inbox:inboxReducer,sent:sentReducer}
})

export default store;