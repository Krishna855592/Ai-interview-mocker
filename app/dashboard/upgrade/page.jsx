"use client";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { BiSolidQuoteAltLeft } from "react-icons/bi";

export default function UpgradePage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-50 via-white to-purple-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg max-w-4xl w-full p-8 space-y-10">
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-purple-700 mb-2">
            Upgrade to <span className="text-purple-500">Pro</span>
          </h1>
          <p className="text-gray-600 text-lg">
            Unlock full access to premium tools and expert support.
          </p>
        </div>

        {/* Features Section */}
        <div className="border-t border-b border-gray-200 py-6">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-sm">
            {[
              "Unlimited mock interviews with real-time feedback",
              "AI-powered insights tailored to your performance",
              "Downloadable, detailed performance reports",
              "Priority access to support and feature updates",
            ].map((feature, index) => (
              <li key={index} className="flex items-center">
                <FaCheckCircle className="text-purple-500 mr-2" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Comparison Table */}
        <div>
          <h2 className="text-xl font-bold text-purple-700 mb-4 text-center">Compare Plans</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border border-gray-200 rounded-md overflow-hidden">
              <thead className="bg-purple-100 text-gray-700">
                <tr>
                  <th className="py-2 px-4 text-left">Features</th>
                  <th className="py-2 px-4 text-center">Free</th>
                  <th className="py-2 px-4 text-center">Pro</th>
                </tr>
              </thead>
              <tbody className="bg-white text-center">
                {[
                  ["Mock Interviews", "Limited", "Unlimited"],
                  ["AI Insights", "Basic", "Advanced & Personalized"],
                  ["Reports", "No", "Yes (Downloadable)"],
                  ["Support", "Standard", "Priority"],
                ].map(([feature, free, pro], index) => (
                  <tr key={index} className="border-t border-gray-200">
                    <td className="py-2 px-4 text-left">{feature}</td>
                    <td className="py-2 px-4">{free}</td>
                    <td className="py-2 px-4 text-purple-600 font-semibold">{pro}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-purple-50 p-6 rounded-md shadow-inner">
          <h2 className="text-xl font-bold text-purple-700 mb-4 text-center">What our users say</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                quote:
                  "Pro membership gave me the edge I needed to land my dream job. The AI feedback was incredibly insightful.",
                name: "Ritika Shah",
              },
              {
                quote:
                  "I saw real improvement in my confidence after just a few mock sessions. Totally worth it!",
                name: "Aman Verma",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-md border border-purple-200 shadow-sm"
              >
                <BiSolidQuoteAltLeft className="text-purple-400 text-2xl mb-2" />
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                <p className="mt-2 font-semibold text-purple-700">– {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-md shadow cursor-pointer transition duration-300">
            Upgrade for ₹499/month
          </button>
          <p className="text-xs text-gray-500 mt-2">Cancel anytime. No hidden fees.</p>
        </div>

        {/* TODO: Payment Gateway Integration */}
        {/* Placeholder for Razorpay / Stripe */}
      </div>
    </div>
  );
}
