import React, { useEffect, useState } from 'react';

interface TypeWriterProps {
  text: string;
  delay?: number;
  className?: string;
  onComplete?: () => void;
}

export const TypeWriter: React.FC<TypeWriterProps> = ({ 
  text, 
  delay = 50,
  className = "",
  onComplete
}) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);

      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, delay, text, onComplete]);

  return <span className={className}>{currentText}</span>;
};

interface TypeWriterGroupProps {
  items: {
    text: string;
    className?: string;
  }[];
  delay?: number;
  onComplete?: () => void;
}

export const TypeWriterGroup: React.FC<TypeWriterGroupProps> = ({
  items,
  delay = 50,
  onComplete
}) => {
  const [currentItemIndex, setCurrentItemIndex] = useState(0);

  const handleItemComplete = () => {
    if (currentItemIndex < items.length - 1) {
      setCurrentItemIndex(prevIndex => prevIndex + 1);
    } else if (onComplete) {
      onComplete();
    }
  };

  return (
    <>
      {items.slice(0, currentItemIndex + 1).map((item, index) => (
        <TypeWriter
          key={index}
          text={item.text}
          delay={delay}
          className={item.className}
          onComplete={index === currentItemIndex ? handleItemComplete : undefined}
        />
      ))}
    </>
  );
};
