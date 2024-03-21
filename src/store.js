// store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'; 
import { setupListeners } from '@reduxjs/toolkit/query'; 
import { api } from './apiSlice';
//import { buildGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';
import { getDefaultMiddleware } from '@reduxjs/toolkit';


const store = configureStore({
  reducer: {
    [api.reducerPath]:api.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),


});


setupListeners(store.dispatch);

export default store;
