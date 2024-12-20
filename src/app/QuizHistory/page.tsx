"use client"
import axios from "axios";
import { useState,useEffect } from "react";

function QuizHistory() {
  const [history,setHistory]=useState([]);
async function fetchQuizHistory() {
  const headers = { token: localStorage.getItem("userToken") };
  try {
    const data = await axios.get("https://exam.elevateegy.com/api/v1/questions/history", { headers });
    console.log(data)
    setHistory(data.data.history);
    
  } catch (error) {
    console.error(error);
  }
}
useEffect(()=>{
  fetchQuizHistory();
  
},[])
  return (
    <>
    <h1 className="bg-[#4461F2] text-white text-center px-4 py-5 text-3xl font-bold">
        Quiz History
      </h1>
    </>
  );
}

export default QuizHistory;
