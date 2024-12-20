"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import elevateImage from "../assets/images/welcomeToElevate.png";
import github from "../assets/images/pngwing.com.png";
import facebook from "../assets/images/Logo-facebook.png";
import google from "../assets/images/Logo Google.png";
import apple from "../assets/images/Logo-apple.png";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Welcome from "../Welcome/page";
import { useDispatch } from "react-redux";
import {store}from '@/lib/store'
import { userLogin } from "@/lib/authSlice";
import { useRouter } from 'next/navigation';
export default function signin() {
  const router=useRouter();
  let dispatch=useDispatch<typeof store.dispatch>()
   const [userMessage,setUserMessage]=useState(null);
   const [error,setError]=useState(null)
  let validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Enter valid Password"
      ),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit:  (values)=> {
      console.log(values);   
      dispatch(userLogin(values)).then((res)=>{
        console.log(res)
        if(res.payload.data.message==="success"){
            localStorage.setItem("userToken",res.payload.data.token)
            router.push('/');
        } 
      }).catch((err)=>{
         console.log(err)
      });
      
    },
    validationSchema,
  });
 
  return (
    <>
      <div className="container mx-auto my-10 w-2/4  flex shadow-sm border-spacing-5">
      <Welcome></Welcome>
        <div className="w-1/2 p-14 flex flex-col	">
          <div className="mt-14">
            <h5 className="font-bold text-l">Sign in</h5>
            {userMessage?<div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-green-800 dark:text-green-400" role="alert">
   {userMessage}
 </div>:null}
         {error?<div className="p-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-800 dark:text-red-300" role="alert">
             {error}
           </div>:null}
            <form onSubmit={formik.handleSubmit}>
              <input
              id="email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
                className="w-full bg-[#F9F9F9] rounded-md my-3 p-2"
                type="email"
                placeholder="Enter Email"
              />
              {formik.touched.email && formik.errors.email ? (
         <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">{formik.errors.email}</div>
       ) : null}
              <input
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={formik.handleBlur}
                className="w-full bg-[#F9F9F9] rounded-md p-2"
                type="password"
                placeholder="Enter Password"
              />
               {formik.touched.password && formik.errors.password ? (
         <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">{formik.errors.email}</div>
       ) : null}
              <h6 className="text-[#4461F2] text-xs my-2 justify-self-end cursor-pointer">
                <Link href="/forgetpassword">Forgot Password?</Link>
              </h6>
              <button
                className="bg-[#4461F2] text-xs text-white w-full p-2 rounded-md mt-3 shadow-lg"
                type="submit"
              >
                Sign in
              </button>
              <p className="or my-5 text-xs text-center text-[#6C737F]">
                Or Continue with
              </p>
              <div id="icons" className="flex justify-center gap-4">
                <div
                  onClick={() => signIn("github", { callbackUrl: "/" })}
                  className="shadow-md w-8 h-8 flex justify-center items-center rounded-lg cursor-pointer"
                >
                  <Image src={github} alt="github"></Image>
                </div>
                <div className="shadow-md w-8 h-8 flex justify-center items-center rounded-lg cursor-pointer">
                  <Image src={facebook} alt="facebook"></Image>
                </div>
                <div className="shadow-md w-8 h-8 flex justify-center items-center rounded-lg cursor-pointer">
                  <Image
                    onClick={() => signIn("google", { callbackUrl: "/" })}
                    src={google}
                    alt="google"
                  ></Image>
                </div>
                <div className="shadow-md w-8 h-8 flex justify-center items-center rounded-lg cursor-pointer">
                  <Image src={apple} alt="apple"></Image>
                </div>
              </div>
            </form>
          </div>
          
        </div>
      </div>
    </>
  );
}
