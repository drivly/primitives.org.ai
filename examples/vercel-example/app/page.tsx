import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold mb-8">Next.js Platform Example</h1>
        
        <div className="w-full max-w-2xl bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Platform Features</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Next.js 15 App Router Architecture</li>
            <li>TypeScript & React 19</li>
            <li>Tailwind CSS for styling</li>
            <li>Platform-specific deployment configuration</li>
            <li>Zero-config deployment experience</li>
          </ul>
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row mt-8">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://primitives.org.ai"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn More
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://github.com/drivly/primitives.org.ai"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Source
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <span>Built with Next.js and Primitives.org.ai</span>
      </footer>
    </div>
  );
}
