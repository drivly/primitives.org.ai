import React from 'react'

export const LandingPagePreview = ({ landingPage }: { landingPage: any }) => {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
      <div className="px-6 py-4 bg-indigo-50 border-b border-indigo-100">
        <h2 className="text-xl font-bold text-indigo-700">Landing Page Preview</h2>
        <p className="text-sm text-indigo-600">{landingPage.title}</p>
      </div>
      
      <div className="p-6">
        {/* Hero Section */}
        <div className="text-center mb-8 pb-8 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{landingPage.title}</h1>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">{landingPage.description}</p>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg">
            {landingPage.cta}
          </button>
        </div>
        
        {/* Problem/Solution Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">The Problem</h2>
            <p className="text-gray-600">{landingPage.problem}</p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Our Solution</h2>
            <p className="text-gray-600">{landingPage.solution}</p>
          </div>
        </div>
        
        {/* Features Section */}
        <div className="mb-8 pb-8 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {landingPage.features.map((feature: string, index: number) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Feature {index + 1}</h3>
                <p className="text-sm text-gray-600">{feature}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Benefits Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {landingPage.benefits.map((benefit: string, index: number) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-indigo-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="ml-3 text-gray-600">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Waitlist Form */}
        <div className="bg-indigo-50 p-6 rounded-lg text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Join the Waitlist</h2>
          <p className="text-gray-600 mb-4">Be the first to know when we launch.</p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg">
              Join Now
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">We respect your privacy. Unsubscribe at any time.</p>
        </div>
      </div>
    </div>
  )
}
