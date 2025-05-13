"use client"
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { eq } from 'drizzle-orm'
import Webcam from 'react-webcam'
import Link from 'next/link'
import { WebcamIcon, Lightbulb } from 'lucide-react'
import { Button } from '@/components/ui/button'

function Interview() {
  const [interviewData, setInterviewData] = useState()
  const [webCamEnabled, setWebCamEnabled] = useState(false)
  const [permissionError, setPermissionError] = useState(null)

  const params = useParams()

  useEffect(() => {
    console.log(params.interviewId)
    GetInterviewDetails()
  }, [])

  const GetInterviewDetails = async () => {
    const result = await db.select().from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId))
    setInterviewData(result[0])
  }

  const requestPermissions = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      setWebCamEnabled(true)
    } catch (error) {
      console.error("Permission denied or error:", error)
      setPermissionError("Please allow camera and microphone access in your browser settings.")
    }
  }

  return (
    <div className='my-10'>
      <h2 className='font-bold text-2xl'>Let's Get Started</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        
        {/* LEFT SIDE - Interview Info */}
        <div className='flex flex-col my-5 gap-5'>
          <div className='flex flex-col p-5 rounded-lg border gap-5'>
            {interviewData ? (
              <>
                <h2 className='text-lg'>
                  <strong>Job Role/Job Position: </strong>{interviewData.jobPosition}
                </h2>
                <h2 className='text-lg'>
                  <strong>Job Description/Tech Stack: </strong>{interviewData.jobDesc}
                </h2>
                <h2 className='text-lg'>
                  <strong>Years of Experience: </strong>{interviewData.jobExperience}
                </h2>
              </>
            ) : (
              <h2>Loading interview details...</h2>
            )}
          </div>
          <div className='p-5 border rounded-lg border-yellow-300 bg-yellow-100'>
            <h2 className='flex gap-2 items-center text-yellow-500'><Lightbulb /><strong>Information</strong></h2>
            <h2 className='mt-3 text-yellow-500'>{process.env.NEXT_PUBLIC_INFORMATION}</h2>
          </div>
        </div>

        {/* RIGHT SIDE - Webcam */}
        <div>
          {webCamEnabled ? (
            <Webcam
              onUserMedia={() => setWebCamEnabled(true)}
              onUserMediaError={() => setWebCamEnabled(false)}
              mirrored={true}
              style={{ height: 300, width: 300 }}
            />
          ) : (
            <>
              <WebcamIcon className='h-72 w-full my-7 p-20 bg-secondary rounded-lg border' />
              <Button
                variant="ghost"
                onClick={requestPermissions}
                className="w-full bg-[#4845d2] text-white px-6 py-3 rounded-lg text-lg shadow-md hover:brightness-110"
              >
                Enable Web Cam and Microphone
              </Button>
              {permissionError && (
                <p className="text-red-600 mt-2">{permissionError}</p>
              )}
            </>
          )}
        </div>
      </div>

      {/* Start Interview Button */}
      <div className='flex justify-end items-end mt-5'>
        <Link href={`/dashboard/interview/${params.interviewId}/start`}>
          <Button className="bg-[#4845d2] text-white px-6 py-3 rounded-lg text-lg shadow-md hover:brightness-110">
            Start Interview
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default Interview
