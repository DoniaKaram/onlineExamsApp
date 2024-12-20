"use client"
import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";
import {catogriesReducer} from './catogerySlice'
import {examBySubject} from './examBySubjectSlice'
export let store=configureStore({
    reducer: {
      authRed:authReducer,
      catogriesReduce:catogriesReducer,
      examReduce:examBySubject
    },
})