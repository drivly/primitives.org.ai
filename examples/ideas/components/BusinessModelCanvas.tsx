import React from 'react'

export const BusinessModelCanvas = ({ businessModel }: { businessModel: any }) => {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
      <div className="px-6 py-4 bg-indigo-50 border-b border-indigo-100">
        <h2 className="text-xl font-bold text-indigo-700">Business Model Canvas</h2>
        <p className="text-sm text-indigo-600">{businessModel.productName}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Customer Segments</h3>
            <ul className="mt-1 text-sm text-gray-600 list-disc pl-5">
              {businessModel.customerSegments.map((segment: string, index: number) => (
                <li key={index}>{segment}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-900">Value Proposition</h3>
            <p className="mt-1 text-sm text-gray-600">{businessModel.valueProposition}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-900">Channels</h3>
            <ul className="mt-1 text-sm text-gray-600 list-disc pl-5">
              {businessModel.channels.map((channel: string, index: number) => (
                <li key={index}>{channel}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-900">Customer Relationships</h3>
            <ul className="mt-1 text-sm text-gray-600 list-disc pl-5">
              {businessModel.customerRelationships.map((relationship: string, index: number) => (
                <li key={index}>{relationship}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-900">Revenue Streams</h3>
            <ul className="mt-1 text-sm text-gray-600 list-disc pl-5">
              {businessModel.revenueStreams.map((stream: string, index: number) => (
                <li key={index}>{stream}</li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Key Resources</h3>
            <ul className="mt-1 text-sm text-gray-600 list-disc pl-5">
              {businessModel.keyResources.map((resource: string, index: number) => (
                <li key={index}>{resource}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-900">Key Activities</h3>
            <ul className="mt-1 text-sm text-gray-600 list-disc pl-5">
              {businessModel.keyActivities.map((activity: string, index: number) => (
                <li key={index}>{activity}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-900">Key Partners</h3>
            <ul className="mt-1 text-sm text-gray-600 list-disc pl-5">
              {businessModel.keyPartners.map((partner: string, index: number) => (
                <li key={index}>{partner}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-900">Cost Structure</h3>
            <ul className="mt-1 text-sm text-gray-600 list-disc pl-5">
              {businessModel.costStructure.map((cost: string, index: number) => (
                <li key={index}>{cost}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
