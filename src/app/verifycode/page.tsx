"use client"
import React from 'react';
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from 'next/navigation';
import * as Yup from "yup";
import Welcome from '../Welcome/page';
function VerifyCode() {
  const router=useRouter();
  let validationSchema = Yup.object({
    resetCode: Yup.string()
      .required("resetCode is required") 
  });
  let formik = useFormik({
    initialValues: {
      resetCode:"",
    },
   
  onSubmit: function (values) {
    console.log(values);   
    forgetPassword(values);
  },
  validationSchema,
});
async function forgetPassword(values:object){
  return await axios.post("https://exam.elevateegy.com/api/v1/auth/verifyResetCode",values)
  .then((data:object)=>{
    console.log(data)
    router.push('/setpassword')
   
  })
  .catch((error)=>{
    console.log(error)
  });
}
  return (
    <>
     <div className="container mx-auto my-10 w-2/4  flex shadow-sm border-spacing-5">
    <Welcome></Welcome>
     <div className="w-1/2 p-14 flex flex-col">
     <form  onSubmit={formik.handleSubmit}>
     <h1 className='text-dark-900 text-2xl my-3'>Verify Code</h1>
     
     <div className='my-2'>
         <input type="text" id="resetCode" name='resetCode' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your code"  onChange={formik.handleChange}
                value={formik.values.resetCode}
                onBlur={formik.handleBlur} />
     </div>
     {formik.touched.resetCode && formik.errors.resetCode ? (
         <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">{formik.errors.resetCode}</div>
       ) : null}
     <div className='text-center'>
     <button type="submit" className="bg-[#4461F2] text-white font-light text-sm w-full p-3 rounded-2xl">Verify</button>
     </div>
     </form>
     </div>
     </div>
    </>
  );
}

export default VerifyCode;
