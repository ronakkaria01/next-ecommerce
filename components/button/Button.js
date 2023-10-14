"use client"
import { useState } from 'react';

const Button = ({ onClick, label, className }) => {
    const [isLoading, setIsLoading] = useState(false);
    const baseClasses = "bg-blue-500 text-white font-bold py-2 px-4 rounded";
    const dynamicClasses = isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
    const mergedClasses = `${baseClasses} ${dynamicClasses} ${className || ''}`;
    const handleClick = async () => {
        setIsLoading(true);
        try {
            await onClick();
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            className={`${mergedClasses}`}
            onClick={onClick ? handleClick : null}
            disabled={isLoading}
        >
            {isLoading ? 'Loading...' : label}
        </button>
    );
};

export default Button;
