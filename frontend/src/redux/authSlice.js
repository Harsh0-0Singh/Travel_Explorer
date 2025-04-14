import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"auth",
    initialState:{
        loading:false,
        userInput:{},
        user:null
    },
    reducers:{
     setLoading:(state,action)=>{
        state.loading = action.payload;
     },
     setUser:(state,action)=>{
       state.user= action.payload;
     },
     setUserInput:(state,action)=>{
      state.userInput = action.payload;
     }
    }
})
export const{setLoading,setUser,setUserInput} = authSlice.actions;
export default authSlice.reducer;