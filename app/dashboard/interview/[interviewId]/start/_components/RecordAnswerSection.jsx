"use client"
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import Webcam from 'react-webcam'
import { Button } from '@/components/ui/button'
import useSpeechToText from 'react-hook-speech-to-text'
import { Mic } from 'lucide-react'
import { toast } from 'sonner'
import { chatSession } from '@/utils/GeminiAiModel'
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'

function RecordAnswerSection({ mockInterviewQuestion, activeQuestionIndex, interviewData }) {
  const [userAnswer, setUserAnswer] = useState('')
  const { user } = useUser()
  const [loading, setLoading] = useState(false)

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  })

  // Append each result to the answer
  useEffect(() => {
    results.map((result) => {
      setUserAnswer(prevAns => prevAns + result?.transcript)
    })
  }, [results])

  // Run after recording ends and userAnswer is available
  useEffect(() => {
    if (!isRecording) {
      if (userAnswer.length >= 10) {
        UpdateUserAnswer()
      } else {
        setLoading(false)
        toast.error('Answer too short. Please record again.')
      }
    }
  }, [isRecording])

  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText()
    } else {
      setUserAnswer('')
      startSpeechToText()
    }
  }

  const UpdateUserAnswer = async () => {
    setLoading(true)
    console.log('User Answer:', userAnswer)

    const feedbackPrompt =
      "Question: " + mockInterviewQuestion[activeQuestionIndex]?.Question +
      ", User Answer: " + userAnswer +
      ". Based on this question and answer, give a short JSON with rating (1-5) and feedback (3-5 lines of improvement). Respond only with JSON."

    try {
      const result = await chatSession.sendMessage(feedbackPrompt)
      const rawText = await result.response.text()
      console.log('Raw Response:', rawText)

      const cleanText = rawText.replace('```json', '').replace('```', '')
      const JsonFeedbackResp = JSON.parse(cleanText)
      console.log('Parsed Feedback:', JsonFeedbackResp)

      const answerObj = {
        mockIdRef: interviewData?.mockId,
        question: mockInterviewQuestion[activeQuestionIndex]?.Question,
        correctAns: mockInterviewQuestion[activeQuestionIndex]?.Answer,
        userAns: userAnswer,
        feedback: JsonFeedbackResp?.feedback,
        rating: JsonFeedbackResp?.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format('DD-MM-yyyy'),
      }

      console.log('Saving to DB:', answerObj)

      const resp = await db.insert(UserAnswer).values(answerObj)

      if (resp) {
        toast.success('User Answer Recorded Successfully')
        setResults([]);
      }
      setResults([]);

    } catch (error) {
      console.error('Error:', error)
      toast.error('Error processing your answer. Try again.')
    }

    setUserAnswer('')
    setLoading(false)
  }

  return (
    <div className='flex items-center justify-center flex-col'>
      <div className='flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5'>
        <Image src={'/webcam.png'} width={200} height={200} className='absolute' />
        <Webcam
          mirrored={true}
          style={{
            height: 300,
            width: '100%',
            zIndex: 10,
          }}
        />
      </div>

      <Button
        disabled={loading}
        variant="outline"
        className="my-10 flex items-center gap-2 text-lg px-6 py-4 border-2 border-gray-300 hover:bg-gray-100 transition-all duration-300"
        onClick={StartStopRecording}
      >
        <Mic className={isRecording ? 'text-red-500 animate-pulse' : 'text-black'} />
        {isRecording ? 'Stop Recording' : 'Record Answer'}
      </Button>

      
    </div>
  )
}

export default RecordAnswerSection
