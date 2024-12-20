"use client"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useParams } from "next/navigation";
import {examType} from '@/app/_interfaces/Home.type';
let initialState:{examBySubject:null}={
  examBySubject:null
}
let headers={
  token:localStorage.getItem("userToken")
}
export let getExamBySubject=createAsyncThunk("examBySubject/getExamBySubject",async function(){
  let {id}=useParams();
  return await axios.get(`https://exam.elevateegy.com/api/v1/exams?subject=${id}`,{headers})
  .then((res)=>{
    console.log(res)
    return res;
  })
  .catch((error)=>{
    console.log(error)
    return error;
  });
  
})
export let examSlice=createSlice({
  name:"examBySubject",
  initialState,
  reducers:{

  },
  extraReducers:(builder) =>{
      builder.addCase(getExamBySubject.fulfilled,(state,action)=>{
        console.log(action)
        state.examBySubject=action.payload.data.exams;
      })
  },
})
export let examBySubject=examSlice.reducer 

