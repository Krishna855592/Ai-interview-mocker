"use client"
import React, { useState } from 'react'

const mockQuestions = [
  {
    id: 1,
    question: "What is the difference between REST and GraphQL?",
    category: "Backend",
    difficulty: "Intermediate",
    answer: "REST uses fixed endpoints and multiple HTTP requests, whereas GraphQL allows clients to request exactly what they need in a single query."
  },
  {
    id: 2,
    question: "Explain the concept of closures in JavaScript.",
    category: "Frontend",
    difficulty: "Easy",
    answer: "A closure is a function that has access to its own scope, the outer function's scope, and the global scope."
  },
  {
    id: 3,
    question: "How does the virtual DOM work in React?",
    category: "Frontend",
    difficulty: "Intermediate",
    answer: "The virtual DOM is a lightweight copy of the real DOM. React uses it to detect changes and update only the parts of the real DOM that changed."
  },
  {
    id: 4,
    question: "What is normalization in databases?",
    category: "Database",
    difficulty: "Easy",
    answer: "Normalization is the process of organizing data to reduce redundancy and improve data integrity."
  },
];

export default function QuestionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visibleAnswers, setVisibleAnswers] = useState({});

  const toggleAnswer = (id) => {
    setVisibleAnswers(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredQuestions = mockQuestions.filter(q => {
    const matchesCategory = selectedCategory === "All" || q.category === selectedCategory;
    const matchesSearch = q.question.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="p-10 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-700 mb-2">Interview Questions</h1>
      <p className="text-gray-600 mb-6">Browse and practice commonly asked technical questions by category and difficulty level.</p>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search questions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded-md w-full md:w-1/2 shadow-sm focus:outline-blue-400"
        />
        <select
          className="px-4 py-2 border rounded-md w-full md:w-1/4 shadow-sm"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="Database">Database</option>
        </select>
      </div>

      {/* Feature Teaser */}
      <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="font-semibold text-blue-700 mb-1">🚀 Upcoming Features:</p>
        <ul className="list-disc ml-6 text-sm text-blue-700 space-y-1">
          <li>Track performance per question</li>
          <li>View correct vs. user answers</li>
          <li>Save favorite questions</li>
          <li>Filter by difficulty level</li>
          <li>Mock quiz mode</li>
        </ul>
      </div>

      {/* Question List */}
      {filteredQuestions.length === 0 ? (
        <p className="text-gray-400 text-sm">No questions found for your search.</p>
      ) : (
        <ul className="space-y-4">
          {filteredQuestions.map(q => (
            <li
              key={q.id}
              className="p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition"
            >
              <h3 className="font-semibold text-gray-800">{q.question}</h3>
              <div className="flex gap-3 text-sm text-gray-600 mt-2 mb-2">
                <span className="bg-blue-100 px-2 py-0.5 rounded-full text-blue-700">{q.category}</span>
                <span className="bg-green-100 px-2 py-0.5 rounded-full text-green-700">{q.difficulty}</span>
              </div>
              <button
                className="text-sm text-blue-500 hover:underline cursor-pointer"
                onClick={() => toggleAnswer(q.id)}
              >
                {visibleAnswers[q.id] ? "Hide Answer" : "Show Answer"}
              </button>
              {visibleAnswers[q.id] && (
                <p className="mt-2 text-gray-700 bg-gray-50 border-l-4 border-blue-300 pl-4 py-2 rounded">
                  {q.answer}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
