"use client"
import { useState } from 'react';

const Button = ({ onClick, label }) => {
    const [isLoading, setIsLoading] = useState(false);
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
            className={`bg-blue-500 text-white font-bold py-2 px-4 rounded ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            onClick={onClick ? handleClick : null}
            disabled={isLoading}
        >
            {isLoading ? 'Loading...' : label}
        </button>
    );
};

export default Button;
