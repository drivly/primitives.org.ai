import React from 'react'

export const StoryBrandMessaging = ({ messaging }: { messaging: any }) => {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
      <div className="px-6 py-4 bg-indigo-50 border-b border-indigo-100">
        <h2 className="text-xl font-bold text-indigo-700">StoryBrand Messaging Framework</h2>
      </div>
      
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-900">Hero (Character)</h3>
          <p className="mt-1 text-sm text-gray-600">{messaging.hero}</p>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-900">Problem</h3>
          <p className="mt-1 text-sm text-gray-600">{messaging.problem}</p>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-900">Guide</h3>
          <p className="mt-1 text-sm text-gray-600">{messaging.guide}</p>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-900">Plan</h3>
          <ul className="mt-1 text-sm text-gray-600 list-disc pl-5">
            {messaging.plan.map((step: string, index: number) => (
              <li key={index}>{step}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-900">Call to Action</h3>
          <p className="mt-1 text-sm text-gray-600">{messaging.callToAction}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Failure (Stakes)</h3>
            <p className="mt-1 text-sm text-gray-600">{messaging.failure}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-900">Success</h3>
            <p className="mt-1 text-sm text-gray-600">{messaging.success}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
