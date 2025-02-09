import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TerminalLineProps {
  command: string;
  output: string;
  onComplete?: () => void;
}

const TerminalLine: React.FC<TerminalLineProps> = ({ command, output, onComplete }) => {
  const [displayCommand, setDisplayCommand] = useState('');
  const [displayOutput, setDisplayOutput] = useState<string[]>([]);
  const [isTypingCommand, setIsTypingCommand] = useState(true);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  
  const lines = output.split('\n');
  const currentLine = lines[currentLineIndex];
  const words = currentLine ? currentLine.split(' ') : [];

  useEffect(() => {
    if (isTypingCommand && currentCharIndex < command.length) {
      const timeout = setTimeout(() => {
        setDisplayCommand(prev => prev + command[currentCharIndex]);
        setCurrentCharIndex(prev => prev + 1);
      }, 50);
      return () => clearTimeout(timeout);
    } else if (isTypingCommand && currentCharIndex === command.length) {
      setIsTypingCommand(false);
      setCurrentCharIndex(0);
    }
  }, [command, currentCharIndex, isTypingCommand]);

  useEffect(() => {
    if (!isTypingCommand) {
      if (currentLineIndex < lines.length) {
        if (currentWordIndex < words.length) {
          const timeout = setTimeout(() => {
            if (currentWordIndex === 0) {
              setDisplayOutput(prev => [...prev, '']);
            }
            setDisplayOutput(prev => {
              const newOutput = [...prev];
              const lastIndex = newOutput.length - 1;
              newOutput[lastIndex] = newOutput[lastIndex] + 
                (currentWordIndex === 0 ? '' : ' ') + 
                words[currentWordIndex];
              return newOutput;
            });
            setCurrentWordIndex(prev => prev + 1);
          }, 100);
          return () => clearTimeout(timeout);
        } else {
          setCurrentLineIndex(prev => prev + 1);
          setCurrentWordIndex(0);
        }
      } else if (onComplete) {
        setTimeout(onComplete, 500);
      }
    }
  }, [isTypingCommand, currentLineIndex, currentWordIndex, lines.length, words.length, words, onComplete]);

  const formatOutput = (line: string) => {
    if (line.startsWith('>')) {
      return <span className="text-blue-400">{line}</span>;
    } else if (line.startsWith('✓')) {
      return <span className="text-green-400">{line}</span>;
    } else if (line.startsWith('➤')) {
      return <span className="text-yellow-400">{line}</span>;
    } else if (line.startsWith('⚪')) {
      return <span className="text-gray-400">{line}</span>;
    } else if (line.includes('Learning Progress:') || line.includes('Available Learning Paths:')) {
      return <span className="text-purple-400 font-bold">{line}</span>;
    }
    return line;
  };

  return (
    <div className="mb-6">
      <div className="text-green-400 mb-2 flex items-center">
        <span className="text-blue-400">student@xelus</span>
        <span className="text-purple-400">:~$ </span>
        <span className="ml-2">{displayCommand}</span>
        {isTypingCommand && (
          <span className="ml-1 animate-pulse">▊</span>
        )}
      </div>
      {!isTypingCommand && displayOutput.length > 0 && (
        <motion.div 
          className="text-white whitespace-pre-line"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {displayOutput.map((line, index) => (
            <div key={index} className="leading-relaxed">
              {formatOutput(line)}
            </div>
          ))}
          {currentLineIndex < lines.length && (
            <span className="ml-1 animate-pulse">▊</span>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default TerminalLine;
