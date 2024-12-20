"use client"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
let initialState:{token:null|string}={
  token:null
}
export let userLogin=createAsyncThunk("auth/userLogin",async function(values:{email:string,password:string}){
  return await axios.post("https://exam.elevateegy.com/api/v1/auth/signin",values)
  .then((res)=>{
    console.log(res)
   return res;
  })
  .catch((error)=>{
    console.log(error)
    return error;
  });
})
export let authSlice=createSlice({
  name:"auth",
  initialState,
  reducers:{

  },
  extraReducers:(builder) =>{
      builder.addCase(userLogin.fulfilled,(state,action)=>{
        console.log(action)
        state.token=action.payload.data.token;
      })
  },
})
export let authReducer=authSlice.reducer