import React from 'react'

export const IdeaCard = ({ idea }: { idea: any }) => {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-indigo-600">{idea.name}</div>
        <p className="text-gray-700 text-base mb-4">
          {idea.description}
        </p>
        <p className="text-sm text-gray-500 italic mb-2">
          {idea.entityInspiration}
        </p>
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-900">Target Market</h3>
          <p className="text-sm text-gray-600">{idea.targetMarket}</p>
        </div>
        <div className="mt-2">
          <h3 className="text-sm font-medium text-gray-900">Potential Revenue</h3>
          <p className="text-sm text-gray-600">{idea.potentialRevenue}</p>
        </div>
      </div>
      <div className="px-6 py-4 bg-gray-50">
        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
          Develop This Idea
        </button>
      </div>
    </div>
  )
}
