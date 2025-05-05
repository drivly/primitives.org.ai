import React from 'react';
import { ai } from 'ai-functions';

export default async function Home() {
  const welcomeMessage = await ai`Generate a welcome message for an AI-powered website`;
  
  return (
    <div className="container">
      <h1 className="title">Welcome to your AI-Powered Site</h1>
      <p className="description">{welcomeMessage}</p>
      
      <div className="grid">
        <a href="https://nextjs.org/docs" className="card">
          <h2>Next.js Documentation &rarr;</h2>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <a href="https://www.npmjs.com/package/ai-functions" className="card">
          <h2>AI Functions &rarr;</h2>
          <p>Learn about AI Functions and how to use them in your project.</p>
        </a>

        <a href="https://www.npmjs.com/package/ai-props" className="card">
          <h2>AI Props &rarr;</h2>
          <p>Discover how to use AI Props to enhance your React components.</p>
        </a>
      </div>
    </div>
  );
}
