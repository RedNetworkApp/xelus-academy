'use client';

export default function HTMLBasics() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">HTML Basics: The Fun Way!</h1>
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Course Overview</h2>
          <p className="text-gray-700">
            Learn HTML like a game! Earn points, unlock achievements, and become a web wizard!
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">What You'll Learn</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>HTML fundamentals and structure</li>
            <li>Working with text and links</li>
            <li>Adding images and media</li>
            <li>Creating forms and tables</li>
            <li>Best practices and semantic HTML</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
