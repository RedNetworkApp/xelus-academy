'use client';

import { ReactNode } from 'react';
import { 
  RadialBar, 
  RadialBarProps 
} from 'recharts';

// Create a custom RadialBar component that omits problematic props
type CustomRadialBarProps = Omit<RadialBarProps, 'minAngle' | 'background' | 'clockWise'> & {
  minAngleValue?: number;
  useBackground?: boolean;
  isClockWise?: boolean;
  children?: ReactNode;
};

export default function CustomRadialBar({
  minAngleValue,
  useBackground,
  isClockWise,
  children,
  ...props
}: CustomRadialBarProps) {
  // Convert our custom props to the official recharts props with any casting
  // This is a workaround for the type issues with recharts
  const enhancedProps = {
    ...props,
  } as any;

  // Apply our custom props if provided
  if (minAngleValue !== undefined) {
    enhancedProps.minAngle = minAngleValue;
  }
  
  if (useBackground !== undefined) {
    enhancedProps.background = useBackground;
  }
  
  if (isClockWise !== undefined) {
    enhancedProps.clockWise = isClockWise;
  }

  return <RadialBar {...enhancedProps}>{children}</RadialBar>;
}