"use client";
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import QuestionsSection from './_components/QuestionsSection';
import RecordAnswerSection from './_components/RecordAnswerSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';



function StartInterview({ params }) {
  const [interviewData, setInterviewData] = useState(null);
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState(null);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    try {
      if (!params?.interviewId) {
        console.error("interviewId param missing");
        return;
      }

      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId));

      if (result.length === 0) {
        console.warn("No interview found");
        return;
      }

      const jsonMockResp = JSON.parse(result[0].jsonMockResp);
      console.log(jsonMockResp);

      setMockInterviewQuestion(jsonMockResp);
      setInterviewData(result[0]);
    } catch (err) {
      console.error("Error fetching interview details:", err);
    }
  };

  return (
    <div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
            {/* Questions */}
            <QuestionsSection 
            mockInterviewQuestion={mockInterviewQuestion}
            activeQuestionIndex={activeQuestionIndex}
            />
            {/* video/Audio recording */}
            <RecordAnswerSection
            mockInterviewQuestion={mockInterviewQuestion}
            activeQuestionIndex={activeQuestionIndex}
            interviewData={interviewData}
            />

        </div>
        <div className='flex justify-end gap-6'>
          {activeQuestionIndex>0 &&
          <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex-1)} className="bg-[#4845d2]">Previous Question</Button>}
          {activeQuestionIndex!=mockInterviewQuestion?.length-1 &&
          <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex+1)} className="bg-[#4845d2]">Next Question</Button>}
          {activeQuestionIndex==mockInterviewQuestion?.length-1 &&
          <Link href={'/dashboard/interview/'+interviewData?.mockId+'/feedback'}>
          <Button className="bg-[#4845d2]">End Interview</Button>
          </Link>}
        </div>



      
    </div>
  );
  
}

export default StartInterview;
