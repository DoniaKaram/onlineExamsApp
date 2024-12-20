"use client"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {catogeryType} from '@/app/_interfaces/Home.type';
let initialState:{catogries:catogeryType[]|null}={
  catogries:null
}
let headers={
  token:localStorage.getItem("userToken")
}
export let getCatogries=createAsyncThunk("catogries/getCatogries",async function(){
  return await axios.get("https://exam.elevateegy.com/api/v1/subjects",{headers})
  .then((res)=>{
    console.log(res)
   return res;
  })
  .catch((error)=>{
    console.log(error)
    return error;
  });
  
})
export let catogriesSlice=createSlice({
  name:"catogries",
  initialState,
  reducers:{

  },
  extraReducers:(builder) =>{
      builder.addCase(getCatogries.fulfilled,(state,action)=>{
        console.log(action)
        state.catogries=action.payload.data.subjects;
      })
  },
})
export let catogriesReducer=catogriesSlice.reducer 
