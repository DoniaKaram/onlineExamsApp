"use client"
import React,{useState} from 'react';
import Image from 'next/image';
import { useFormik} from 'formik';
import * as Yup from 'yup';
import elevateImage from "../assets/images/welcomeToElevate.png";
import axios from "axios"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Welcome from '../Welcome/page';
function SignUp() {
  const router=useRouter();
   const [userMessage,setUserMessage]=useState(null);
   const [error,setError]=useState(null)
  const formik=useFormik({
    initialValues: {
      username: '',
      firstName:'',
    lastName:'',
    email:'' ,
    password:'',
    rePassword:'',
    phone:''
    },
    validationSchema: Yup.object({
      username:Yup.string().min(4,"should be at less 4 chars").max(25,"can't be more than 25").required('username is required'),
      firstName:Yup.string().required("this is field is required"),
      lastName:Yup.string().required("this is field is required"),
      email:Yup.string().required("this is field is required").email("invalid email"),
      password:Yup.string().required("this failed is required").min(6,"can't be less than 6 chars"),
      rePassword:Yup.string().required("this failed is required").oneOf([Yup.ref("password")]),
      phone:Yup.string().required('this field is required'),

    }),
    onSubmit: values => {
      console.log(values);   
      signup(values);

      
    },
  });
  async function signup(values:object){
    return await axios.post("https://exam.elevateegy.com/api/v1/auth/signup",values)
    .then((data)=>{
      console.log(data)
      setUserMessage(data.data.message)
      router.push('/signin');
    })
    .catch((error)=>{
      console.log(error)
      setError(error.response.data.message)
    });
   
  }
  return (
    <>
    <div className="container mx-auto my-10 w-2/4  flex shadow-sm border-spacing-5">
        <Welcome></Welcome>
      <div className="w-1/2 p-14 flex flex-col">
      {userMessage?<div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-green-800 dark:text-green-400" role="alert">
   {userMessage}
 </div>:null}
         {error?<div className="p-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-800 dark:text-red-300" role="alert">
             {error}
           </div>:null}
        <form  onSubmit={formik.handleSubmit}>

        <h1 className='text-dark-900 text-2xl text-semibold'>Sign Up</h1>
     <div className='my-2'>
           
            <input type="text" id="username" name='username' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="UserName"  onChange={formik.handleChange}
         value={formik.values.username} onBlur={formik.handleBlur}/>
        </div>
        {formik.touched.username && formik.errors.username ? (
         <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">{formik.errors.username}</div>
       ) : null}
        <div className='my-2'>
           
            <input type="text" id="firstName" name='firstName' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="FirstName"  onChange={formik.handleChange}
         value={formik.values.firstName} onBlur={formik.handleBlur}/>
        </div>
        {formik.touched.firstName && formik.errors.firstName ? (
         <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">{formik.errors.firstName}</div>
       ) : null}
        <div className='my-2'>
            
            <input type="text" id="lastName" name='lastName' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="SecondName"   onChange={formik.handleChange}
         value={formik.values.lastName} onBlur={formik.handleBlur}/>
        </div>
        {formik.touched.lastName && formik.errors.lastName ? (
         <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">{formik.errors.lastName}</div>
       ) : null}
        <div className='my-2'>
           
            <input type="text" id="email" name='email' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email"  onChange={formik.handleChange}
         value={formik.values.email} onBlur={formik.handleBlur}/>
        </div>
        {formik.touched.email && formik.errors.email ? (
         <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">{formik.errors.email}</div>
       ) : null}
        <div className='my-2'>
            
            <input type="text" id="password" name='password' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password"   onChange={formik.handleChange}
         value={formik.values.password} onBlur={formik.handleBlur}/>
        </div>
        {formik.touched.password && formik.errors.password? (
         <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">{formik.errors.password}</div>
       ) : null}
        <div className='my-2'>
            
            <input type="text" id="rePassword" name='rePassword' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="rePassword"  onChange={formik.handleChange}
         value={formik.values.rePassword} onBlur={formik.handleBlur}/>
        </div>
        {formik.touched.rePassword && formik.errors.rePassword ? (
         <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">{formik.errors.rePassword}</div>
       ) : null}
        <div className='my-2'> 
            
            <input type="text" id="phone" name='phone' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Phone"  onChange={formik.handleChange}
         value={formik.values.phone} onBlur={formik.handleBlur}/>
          {formik.touched.phone && formik.errors.phone ? (
         <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">{formik.errors.phone}</div>
       ) : null}
        </div>
        <h6 className="text-[#4461F2] text-xs my-2 justify-self-end cursor-pointer">
                <Link href="/signin">Have Already Account?</Link>
              </h6>
        <button
          type="submit"
          className="bg-[#4461F2] text-white font-light text-sm w-full p-3 rounded-2xl"
        >
          Create Account
        </button>
        </form>
    
     </div>
      </div>
      <div/>
    </>
  );
}

export default SignUp;
