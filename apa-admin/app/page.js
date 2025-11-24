"use client";

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-10 bg-white rounded-2xl shadow-lg text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Next.js + Tailwind CSS Test
        </h1>
        <p className="text-gray-700 mb-6">
          This is a test page to check if Tailwind CSS is working correctly.
        </p>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Click Me
        </button>
      </div>
    </div>
  );
}
