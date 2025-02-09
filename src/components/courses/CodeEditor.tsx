import { useState, useEffect } from 'react';
import { FaPlay, FaCheck, FaTimes } from 'react-icons/fa';
import confetti from 'canvas-confetti';

interface CodeEditorProps {
  initialCode: string;
  expectedOutput: string;
  onComplete: () => void;
  hint?: string;
}

export default function CodeEditor({ 
  initialCode, 
  expectedOutput, 
  onComplete,
  hint 
}: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const checkCode = () => {
    // For heading validation
    if (expectedOutput.includes('<h1>')) {
      const valid = code.match(/<h1>[^<]+<\/h1>/i);
      if (valid) {
        setIsCorrect(true);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        onComplete();
        return;
      }
    }
    
    // For paragraph validation
    if (expectedOutput.includes('<p>')) {
      // Check for at least two paragraphs with any content
      const paragraphs = code.match(/<p>[^<]+<\/p>/gi);
      if (paragraphs && paragraphs.length >= 2) {
        setIsCorrect(true);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        onComplete();
        return;
      }
    }
    
    // For link validation
    if (expectedOutput.includes('<a href=')) {
      const valid = code.match(/<a\s+href=["'](https?:\/\/[^"']+)["'][^>]*>[^<]+<\/a>/i);
      if (valid) {
        setIsCorrect(true);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        onComplete();
        return;
      }
    }

    // For image validation
    if (expectedOutput.includes('<img')) {
      const valid = code.match(/<img\s+src=["'][^"']+["']\s+alt=["'][^"']+["']\s*\/?>/i);
      if (valid) {
        setIsCorrect(true);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        onComplete();
        return;
      }
    }

    // For list validation
    if (expectedOutput.includes('<ul>')) {
      const valid = code.match(/<ul>(\s*<li>[^<]+<\/li>\s*){2,}<\/ul>/i);
      if (valid) {
        setIsCorrect(true);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        onComplete();
        return;
      }
    }

    // For other HTML elements, use the original comparison
    const normalizedCode = code.replace(/\s+/g, '').toLowerCase();
    const normalizedExpected = expectedOutput.replace(/\s+/g, '').toLowerCase();
    const correct = normalizedCode === normalizedExpected;
    setIsCorrect(correct);
    
    if (correct) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      onComplete();
    }

    // Simple HTML validation and preview
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(code, 'text/html');
      setOutput(doc.body.innerHTML);
    } catch (error) {
      setOutput('Invalid HTML');
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg p-4">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="flex space-x-2">
            {hint && (
              <button
                onClick={() => setShowHint(!showHint)}
                className="text-sm text-gray-400 hover:text-gray-300"
              >
                Need a hint?
              </button>
            )}
            <button
              onClick={checkCode}
              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
            >
              <FaPlay className="text-sm" />
              <span>Run Code</span>
            </button>
          </div>
        </div>
        
        {showHint && hint && (
          <div className="bg-blue-900/50 text-blue-200 p-3 rounded mb-3 text-sm">
            💡 Hint: {hint}
          </div>
        )}

        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-32 bg-gray-800 text-green-400 p-4 rounded font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Write your HTML code here..."
        />
      </div>

      <div className="border-t border-gray-700 pt-4">
        <h4 className="text-gray-400 text-sm mb-2">Output Preview:</h4>
        <div className="bg-white rounded p-4 min-h-[100px]">
          <div dangerouslySetInnerHTML={{ __html: output }} />
        </div>
      </div>

      {output && (
        <div className={`mt-4 flex items-center space-x-2 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
          {isCorrect ? (
            <>
              <FaCheck />
              <span>Perfect! You've completed the challenge!</span>
            </>
          ) : (
            <>
              <FaTimes />
              <span>Not quite right. Try again!</span>
            </>
          )}
        </div>
      )}
    </div>
  );
}
