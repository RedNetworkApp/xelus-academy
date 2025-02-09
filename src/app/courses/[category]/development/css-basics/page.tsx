'use client';

export default function CSSBasics() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">CSS Basics: Style with Magic!</h1>
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Course Overview</h2>
          <p className="text-gray-700">
            Transform your web pages with the power of CSS! Learn styling, layouts, and animations.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">What You'll Learn</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>CSS selectors and properties</li>
            <li>Box model and layouts</li>
            <li>Flexbox and Grid systems</li>
            <li>Responsive design</li>
            <li>Animations and transitions</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
