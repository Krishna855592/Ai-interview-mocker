"use client"
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'


function Feedback({ params }) {
  const [feedbackList, setFeedbackList] = useState([]);
  const router=useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await db.select()
          .from(UserAnswer)
          .where(eq(UserAnswer.mockIdRef, params.interviewId))
          .orderBy(UserAnswer.id);

        // Properly parse feedback string from DB
        const parsedResult = result.map(item => {
          const cleanedFeedback = item.feedback
            ?.replace(/^{|}$/g, '') // Remove curly braces
            .split('","')           // Split by `","`
            .map(f => f.replace(/^"|"$/g, '').trim()); // Clean quotes & trim

          return {
            ...item,
            feedback: cleanedFeedback || []
          };
        });

        setFeedbackList(parsedResult);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };

    fetchData();
  }, [params.interviewId]);
  const getAverageRating = () => {
  if (feedbackList.length === 0) return 0;
  const total = feedbackList.reduce((acc, item) => acc + (Number(item.rating) || 0), 0);
  return (total / feedbackList.length).toFixed(1); // e.g., "7.3"
};


  return (
    <div className='p-10'>
      
      {feedbackList.length==0 ?
      <h2 className='font-bold text-xl text-gray-500'>No Interview Feedback Record Found</h2>
    :
    <>
    <h2 className='text-3xl font-bold text-green-500'>Congratulations!</h2>
      <h2 className='font-bold text-2xl'>Here is your interview feedback</h2>
      <h2 className='text-purple-500 text-lg my-3'>
        Your Overall Interview Rating: <strong>{getAverageRating()}/10</strong>
      </h2>
      <h2 className='text-sm text-gray-500'>
        Find below Interview Questions with Correct answer, Your answer and feedback for improvement
      </h2>

      {feedbackList.map((item, index) => (
        <Collapsible key={index} className='mt-7'>
          <CollapsibleTrigger className='cursor-pointer p-2 bg-secondary rounded-lg flex justify-between my-2 text-left gap-7 w-full'>
            {item.question}
            <ChevronsUpDown className='h-5 w-5' />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className='flex flex-col gap-2'>
              <h2 className='text-red-500 p-2 border rounded-lg'>
                <strong>Rating:</strong> {item.rating}
              </h2>
              <h2 className='p-2 border rounded-lg bg-red-50 text-sm text-red-900'>
                <strong>Your Answer:</strong> {item.userAns}
              </h2>
              <h2 className='p-2 border rounded-lg bg-green-50 text-sm text-green-900'>
                <strong>Correct Answer:</strong> {item.correctAns}
              </h2>
              <div className='p-2 border rounded-lg bg-blue-50 text-sm text-[#4845d2]'>
                <strong>Feedback:</strong>
                <ul className='list-disc list-inside mt-2 space-y-1'>
                  {item.feedback.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      ))}
      </>}
      <Button onClick={()=>router.replace('/dashboard')} className='bg-[#4845d2]'>Go Home</Button>
    </div>
  );
}

export default Feedback;
