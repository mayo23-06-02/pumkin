'use client'
import React, { useState } from 'react';
import Loader from '../../../assets/images/loader.gif';
import Image from 'next/image';

const Button = ({
  label,
  onClick,
  variant,
  disabled = false,
  className = '',
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const getButtonStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-black hover:bg-white hover:text-black text-white';
      case 'secondary':
        return 'bg-white hover:bg-black text-black hover:text-white';
      case 'tertiary':
        return 'bg-orange-500 hover:bg-orange-600 text-white ';
      default:
        return 'bg-blue-500 hover:bg-blue-600 text-white';
    }
  };

  const handleClick = async () => {
    setIsLoading(true);
    try {
      if (onClick) {
        await onClick(event);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled || isLoading}
      className={`py-5 lg:py-3 flex-nowrap justify-center flex min-w-64 lg:min-w-48 w-full font-bold rounded-full text-sm lg:text- transition-colors duration-300 ${getButtonStyles()} ${className}`}
    >
      {isLoading ? (
        <Image src={Loader} alt="Loading..." className="h-6 w-6 mr-2" width={24} height={24} />
      ) : (
        label
      )}
    </button>
  );
};

export default Button;
