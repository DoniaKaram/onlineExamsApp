"use client"
import React from 'react';
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from 'next/navigation'; 
import * as Yup from "yup";
import Welcome from '../Welcome/page';
function SetPassword() {
  const router=useRouter();
  let validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required") ,
      newPassword:Yup.string().required("password is required")
  });
  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword:"",
    },
    onSubmit: function (values) {
      console.log(values);   
      resetPassword(values);
    },
    validationSchema,
  });
  async function resetPassword (values:object){
    return await axios.put("https://exam.elevateegy.com/api/v1/auth/resetPassword",values)
    .then((data)=>{
      console.log(data)
      router.push('/signin');
    })
    .catch((error)=>{
      console.log(error)
    });
  }
  return (
    <>
    <div className="container mx-auto my-10 w-2/4  flex shadow-sm border-spacing-5">
       <Welcome></Welcome>
      <div className="w-1/2 p-14 flex flex-col ">
      <div className='mt-14'>
        <form  onSubmit={formik.handleSubmit}>
        <h1 className='text-dark-900 text-2xl my-3'>Set a Password</h1>
     
     <div className='my-2'>
        
         <input type="text" id="email" name='email' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Create Password"  onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur} />
     </div>
     {formik.touched.email && formik.errors.email ? (
         <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">{formik.errors.email}</div>
       ) : null}
     <div className='my-2'>
         
         <input type="text" id="newPassword" name='newPassword' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Re-enter Password"  onChange={formik.handleChange}
                value={formik.values.newPassword}
                onBlur={formik.handleBlur} />
     </div>
     {formik.touched.newPassword && formik.errors.newPassword ? (
         <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">{formik.errors.newPassword}</div>
       ) : null}
     <div className='text-center'>
     <button type="submit" className="bg-[#4461F2] text-white font-light text-sm w-full p-3 rounded-2xl">Sign In</button>
     </div>
        </form>
     </div>
     </div>
     </div>
    </>
  );
}

export default SetPassword;
