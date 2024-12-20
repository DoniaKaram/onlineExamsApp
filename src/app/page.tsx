"use client"
import Image from "next/image";
import elevateLogo from "./assets/images/Final Logo 1.png";
import profilePic from "./assets/images/Frame 40.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCatogries } from "@/lib/catogerySlice";
import {store} from '@/lib/store'
import Link from 'next/link'
export default function Home() {
   let dispatch=useDispatch<typeof store.dispatch>();
   let {catogries}=useSelector((state:ReturnType <typeof store.getState> )=>state.catogriesReduce)
   console.log(catogries);
   useEffect(()=>{
       dispatch(getCatogries())
   },[]);
    return (

        <>
<h1 className=" bg-[#4461F2] text-white text-center px-4 py-5 text-3xl font-bold">Dashboard</h1>
<div className="grid grid-cols-3 ">
<aside id="logo-sidebar" className="w-64 h-screen pt-20 transition-transform -translate-x-full   sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
    <Image src={elevateLogo} alt="Elevate" className="ms-2 mb-3"></Image>
   <div className="h-full px-3 pb-4 overflow-y-auto dark:bg-gray-800">
      <ul className="space-y-2 font-medium">
         <Link href={'/'}>
         <li>
            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
               </svg>
               <span className="ms-3">Dashboard</span>
            </a>
         </li>
         </Link>
        <Link href={'/QuizHistory'}>
        <li>
            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                  <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
               </svg>
               <span className="flex-1 ms-3 whitespace-nowrap">Quiz History</span>
              
            </a>
         </li>
        </Link>
        
         <li>
            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z"/>
               </svg>
               <span className="flex-1 ms-3 whitespace-nowrap">Logout</span>
              
            </a>
         </li>
       
       
       
        
      </ul>
   </div>
</aside>

<div className="home col-span-2 container mx-auto"> 
<nav className="flex justify-between items-center mt-10">
  
    
   <div className="w-1/2">
   <input type="search" placeholder="search quiz" className="border-0 outline-0 rounded w-full shadow-gray-900 cols-span-2"/>
   </div>
  
       
      
       <div className="">
       <button className="rounded text-white bg-[#4461F2] px-3 py-2 ">start quiz</button>
       </div>
     
            
            <div className="">
            <img className="w-10 h-10 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo"/>
            </div>
        
             
           
         
        
  

</nav>
<div className="containr mx-auto profile grid grid-cols-4 mt-10 me-10 bg-white rounded border-gray-800 shadow-gray-900 px-4 py-3">
 <div className="image">
 
<Image src={profilePic} alt="Elevate Logo"></Image>
   
 </div>
 <div className="profileInfo  col-span-2">
    <h3 className="bg-color text-2xl font-bold">Ahmed Mohamed</h3>
    <p className="text-gray-400">Voluptatem aut</p>
   
<div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
  <div className="bg-blue-600 h-2.5 rounded-full w-45" ></div>
</div>

 </div>
</div>
<div className="Catogries bg-white rounded border-gray-800 shadow-gray px-4 py-3 mt-10 me-10 shadow-gray-900">
 <div  className="flex justify-between">
  <p className="bg-color">Quizes</p>
 </div>
 <div className="grid lg:grid-cols-3 sm:grid-cols-1 gap-10 ">
 {catogries?.map((category)=>{
  
   return <Link href={category._id}><div key={category._id}>
         <img src={category.icon} alt="exam_img" ></img>
         <div className="card-info bg-[#1935CA66] p-3 text-white ">
            <h3 className="font-bold">{category.name}</h3>
            <p>Voluptatem aut</p>
         </div>
   </div></Link>
 })}
</div>

</div>
</div>


</div>


     



  
</>
    );
}
