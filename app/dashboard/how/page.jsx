"use client";
import React from "react";

export default function HowItWorksPage() {
  const steps = [
    {
      emoji: "📚",
      title: "Choose Your Topic",
      description: "Select a mock interview type or topic from your personalized dashboard.",
    },
    {
      emoji: "🎤",
      title: "Practice in Real-Time",
      description: "Answer AI-generated questions like a real interview — anytime, anywhere.",
    },
    {
      emoji: "⚡",
      title: "Get Instant Feedback",
      description: "Receive your score, strengths, and improvement tips right after the session.",
    },
    {
      emoji: "📈",
      title: "Track Your Progress",
      description: "View your performance history and measure your improvement over time.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-50 to-white flex justify-center items-center p-6">
      <div className="max-w-3xl w-full bg-white rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-extrabold text-green-700 mb-6 text-center">
          How It Works
        </h1>
        <div className="space-y-6">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="text-2xl">{step.emoji}</div>
              <div>
                <h2 className="font-semibold text-gray-800">{step.title}</h2>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
