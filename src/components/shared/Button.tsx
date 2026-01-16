'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  fullWidth?: boolean;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  fullWidth = false,
  className = '',
  disabled = false,
  type = 'button',
  onClick,
}: ButtonProps) {
  const baseStyles = `
    inline-flex items-center justify-center
    font-semibold
    rounded-full
    transition-all duration-300
    focus:outline-none focus:ring-4 focus:ring-offset-2
  `;

  const variants = {
    primary: `
      bg-[#01278b] text-white
      hover:bg-[#0339b8]
      focus:ring-[#01278b]/30
      shadow-md hover:shadow-lg
    `,
    secondary: `
      bg-[#ebe4f7] text-[#01278b]
      hover:bg-[#c7b8e8]
      focus:ring-[#c7b8e8]/30
    `,
    outline: `
      border-2 border-gray-200 text-gray-700
      hover:border-[#01278b] hover:text-[#01278b]
      focus:ring-gray-200
      bg-white
    `,
    ghost: `
      text-gray-700
      hover:bg-gray-100
      focus:ring-gray-200
    `,
  };

  const sizes = {
    sm: 'px-6 py-2.5 text-sm',
    md: 'px-8 py-3 text-base',
    lg: 'px-10 py-4 text-lg',
  };

  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  const widthStyles = fullWidth ? 'w-full' : '';

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.03 } : {}}
      whileTap={!disabled ? { scale: 0.97 } : {}}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabledStyles} ${widthStyles} ${className}`}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}
