"use client";
import 'flowbite';
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Link from 'next/link';
import { examType, questionType } from '../_interfaces/Home.type';
function Page() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [questions, setQuestions] = useState<questionType[]>([]);
  const [data, setData] = useState<examType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);  
  const itemsPerPage = 1; // Questions per page
  const [correct,setCorrect]=useState(0);
  const [incorrect,setInCorrect]=useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [selectedKeys, setSelectedKeys] = useState<Record<string, string>>({});
  const [isQuizCompleted,setIsQuizCompleted]=useState(false);
  const handleAnswerSelection = (questionId: string, answerValue: string,answerKey:string,questionKey:string) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: answerValue }));
    console.log("Selected Answers:", { ...selectedAnswers, [questionId]: answerValue });
    setSelectedKeys((prev) => ({ ...prev, [questionId]: answerKey }));
    console.log("Selected Keys:", { ...selectedKeys, [questionId]: answerKey });
    if(questionKey==answerKey){
      setCorrect((prev)=>prev+1)
      localStorage.setItem("correct",correct.toString());
      
    }
    else{
      setInCorrect((prev)=>prev+1)
      localStorage.setItem("incorrect",incorrect.toString());
    }
  };
  const { id } = useParams();
// Function to fetch exams
async function getExamBySubject() {
  const headers = { token: localStorage.getItem("userToken") };
  try {
    const response = await axios.get(`https://exam.elevateegy.com/api/v1/exams?subject=${id}`, { headers });
    setData(response.data.exams);
  } catch (error) {
    console.error(error);
  }
}

  // Function to fetch questions
  async function fetchQuestions(examId: string) {
    const headers = { token: localStorage.getItem("userToken") };
    try {
      const response = await axios.get(`https://exam.elevateegy.com/api/v1/questions?exam=${examId}`, { headers });
      setQuestions(response.data.questions);
      setIsModal(true);
      setIsModalVisible(false);
      console.log(response)
    } catch (error) {
      console.error(error);
    }
  }
  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);
// Pagination controls
const totalPages = Math.ceil(questions.length / itemsPerPage);

const handleNextPage = () => {
  if (currentPage < totalPages) {
    setCurrentPage(currentPage + 1);
  }
  else{
    setIsQuizCompleted(true);
  }
 
};

const handlePrevPage = () => {
  if (currentPage > 1) {
    setCurrentPage(currentPage - 1);
  }
};

const paginatedQuestions = questions.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
);


  useEffect(() => {
    getExamBySubject();
  }, []);
  return (
    <>
      <h1 className="bg-[#4461F2] text-white text-center px-4 py-5 text-3xl font-bold">
        Select Diploma
      </h1>
      <h5>Front-End Quiz</h5>
      {data.map((exam) => (
        <div className="container mx-auto" key={exam._id}>
          <div className="bg-white px-3 py-2 flex justify-between items-center shadow-gray-900 m-10">
            <div className="flex flex-col justify-center items-center">
              <p>{exam.title}</p>
              <p>{exam.numberOfQuestions}</p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <p>{exam.duration}</p>
              <button
                onClick={openModal}
                className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                type="button"
              >
                Start Quiz
              </button>
              {isModalVisible && (
                <div
                  className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
                  onClick={closeModal}
                >
                  <div
                    className="relative p-4 w-full max-w-md bg-white rounded-lg shadow"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={closeModal}
                      className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8"
                    >
                      ✕
                    </button>
                    <h3 className="mb-4 text-lg font-normal">Instructions</h3>
                    <ul className="mb-4">
                      <li>Lorem ipsum dolor sit amet consectetur.</li>
                      <li>Lorem ipsum dolor sit amet consectetur.</li>
                      <li>Lorem ipsum dolor sit amet consectetur.</li>
                    </ul>
                    <button
                      onClick={() => fetchQuestions(exam._id)}
                      className="text-white bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-lg"
                    >
                      Start
                    </button>
                  </div>
                </div>
              )}
 {isModal && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                  <div className="relative p-4 w-full max-w-md bg-white rounded-lg shadow">
                  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                   Your Score
                </h3>
                <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="select-modal">
                   
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
            {!isQuizCompleted ? (
  // Render pagination if the quiz is completed
  <>
    {paginatedQuestions.map((question) => (
      <div key={question._id}>
        <p>{question.question}</p>
        <ul>
          {question.answers.map((answer, index) => (
            <li key={index}>
              <label className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500 mb-3 p-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    value={answer.answer}
                    onChange={() =>
                      handleAnswerSelection(question._id, answer.answer, answer.key, question.correct)
                    }
                    name={`question-${question._id}`}
                    className="peer"
                  />
                  <div className="w-full text-lg font-semibold ms-2">{answer.answer}</div>
                </div>
              </label>
              </li>
          ))}
        </ul>
      </div>
    ))}
 <div className="flex justify-between mt-4">
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className="bg-gray-800 text-white px-4 py-2 rounded"
      >
        Prev
      </button>
      <button
        onClick={handleNextPage}
        className="bg-gray-800 text-white px-4 py-2 rounded"
      >
        Next
      </button>
    </div>
  </>
) : (
  // Render results if the quiz is  completed
  <div className="text-center">
    <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
    <div className='flex flex-col justify-end items-center'>
    <p>correct:{correct}</p>
    <p>incorrect:{incorrect}</p>
    </div>
    <div className="flex justify-between mt-4">
      <button
       
        className="bg-gray-800 text-white px-4 py-2 rounded"
      >
        Back
      </button>
      <Link href={'/QuizHistory'}>
      <button
        
        className="bg-gray-800 text-white px-4 py-2 rounded"
      >
        show results
      </button>
      </Link>
    </div>
   
  </div>
)}
                  </div>
                </div>
              )}
            </div>

            </div>
        </div>
      ))}
    </>
  );
}

export default Page;