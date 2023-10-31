"use client"

import React, { useContext } from 'react';
import { CurrencyContext } from '../../context/CurrencyContext';
import { currencies } from '@/lib/currency';

const CurrencyDisplay = ({ price, className = null }) => {
    const { currency } = useContext(CurrencyContext);
    const { symbol } = currencies[currency];

    return <span className={className}>{symbol}{price}</span>;
};

export default CurrencyDisplay;
