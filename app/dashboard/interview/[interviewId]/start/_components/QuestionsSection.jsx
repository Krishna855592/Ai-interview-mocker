import { index } from 'drizzle-orm/gel-core'
import React from 'react'
import { Lightbulb, Volume2 } from 'lucide-react';

function QuestionsSection({ mockInterviewQuestion, activeQuestionIndex }) {

  const textToSpeach = (text) =>{
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    }
    else{
      alert('Sorry, your browser does not support text to speech!')
    }
  }
  return mockInterviewQuestion&& (
    <div className='p-5 border rounded-lg my-10'>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {mockInterviewQuestion && mockInterviewQuestion.map((question, index) => (
          <h2
            key={index}
            className={`p-2 rounded-full text-xs md:text-sm text-center cursor-pointer 
            shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out
            ${activeQuestionIndex === index 
              ? 'bg-blue-500 text-white' 
              : 'bg-secondary text-black'}`}
          >
            Question #{index + 1}
          </h2>
        ))}

        <h2>
          {mockInterviewQuestion[activeQuestionIndex]?.question}
        </h2>
      </div>
      <h2 className='my-5 text-md md:text-lg '>
          {mockInterviewQuestion[activeQuestionIndex]?.Question}
        </h2>
        <Volume2 className='cursor-pointer' onClick={()=>textToSpeach(mockInterviewQuestion[activeQuestionIndex]?.Question)}/>
        <div className='border rounded-lg p-5 bg-blue-100 mt-20'>
          <h2 className='flex gap-2 items-center text-blue-700'>
          <Lightbulb/>
          <strong>Note:</strong>
          </h2>
          <h2 className='text-sm text-blue-700 my-2'>{process.env.NEXT_PUBLIC_QUESTION_NOTE}</h2>
        </div>

    </div>
  )
}

export default QuestionsSection
